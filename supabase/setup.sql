-- =====================================================================
-- Second-Order Resonance: Datenbank für dauerhafte Konten
-- Einmal komplett im Supabase SQL Editor ausführen (Run). Mehrfaches Ausführen schadet nicht.
-- Anleitung: docs/supabase-setup.md
-- =====================================================================

-- 1) Profile: ein Datensatz je Konto
create table if not exists public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  role         text not null default 'schueler' check (role in ('schueler', 'lehrkraft')),
  grade        int  check (grade between 1 and 13),
  city_id      text check (city_id ~ '^[a-z0-9-]{2,40}$'),
  progress     jsonb not null default '{}'::jsonb,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- 2) Row Level Security: jede Person sieht und ändert nur ihr eigenes Profil
alter table public.profiles enable row level security;
drop policy if exists "eigenes Profil lesen" on public.profiles;
drop policy if exists "eigenes Profil ändern" on public.profiles;
create policy "eigenes Profil lesen"  on public.profiles for select using (auth.uid() = id);
create policy "eigenes Profil ändern" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
-- Feste Rechte: unabhängig von "Automatically expose new tables"
revoke all on table public.profiles from anon, authenticated;
grant select, update on table public.profiles to authenticated;
-- Begrenzung der Datenmenge je Profil (Schutz vor Missbrauch)
alter table public.profiles drop constraint if exists progress_size;
alter table public.profiles add constraint progress_size check (pg_column_size(progress) < 200000);

-- 3) Mail an den Betreiber über Brevo (EU, optional, siehe Anleitung Schritt 5)
create extension if not exists pg_net with schema extensions;

create or replace function public.notify_new_account(p public.profiles)
returns void language plpgsql security definer set search_path = public, extensions as $$
declare
  k text;
  body text;
begin
  select decrypted_secret into k from vault.decrypted_secrets where name = 'brevo_api_key' limit 1;
  if k is null then return; end if;
  body := 'Neuer Account auf secondorderresonance.de' || chr(10) || chr(10) ||
          'Name:   ' || coalesce(nullif(p.display_name, ''), '(ohne Namen)') || chr(10) ||
          'Rolle:  ' || case when p.role = 'lehrkraft' then 'Lehrkraft' else 'Lernende Person' end || chr(10) ||
          'Klasse: ' || coalesce(p.grade::text, '-') || chr(10) ||
          'Ort:    ' || coalesce(p.city_id, '-') || chr(10) ||
          'Zeit:   ' || to_char(p.created_at at time zone 'Europe/Berlin', 'DD.MM.YYYY HH24:MI') || ' Uhr' || chr(10) || chr(10) ||
          'Alle Konten: Supabase Dashboard > Authentication > Users';
  perform net.http_post(
    url     := 'https://api.brevo.com/v3/smtp/email',
    headers := jsonb_build_object('api-key', k, 'Content-Type', 'application/json', 'Accept', 'application/json'),
    body    := jsonb_build_object(
      'sender',      jsonb_build_object('name', 'Second-Order Resonance', 'email', 'noreply@secondorderresonance.de'),
      'to',          jsonb_build_array(jsonb_build_object('email', 'secondorderresonance@gmail.com')),
      'subject',     'Neuer Account: ' || coalesce(nullif(p.display_name, ''), 'ohne Namen'),
      'textContent', body)
  );
exception when others then
  -- Die Registrierung darf nie an der Mail scheitern
  return;
end $$;
revoke all on function public.notify_new_account(public.profiles) from public, anon, authenticated;

-- 4) Beim Registrieren automatisch ein Profil anlegen und die Mail auslösen
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  m jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  g int;
  c text;
  p public.profiles;
begin
  begin g := nullif(m->>'grade', '')::int; exception when others then g := null; end;
  if g is not null and (g < 1 or g > 13) then g := null; end if;
  c := nullif(m->>'city_id', '');
  if c is not null and c !~ '^[a-z0-9-]{2,40}$' then c := null; end if;
  insert into public.profiles (id, display_name, role, grade, city_id)
  values (new.id, left(coalesce(m->>'display_name', ''), 30),
          case when m->>'role' = 'lehrkraft' then 'lehrkraft' else 'schueler' end, g, c)
  on conflict (id) do nothing
  returning * into p;
  if p.id is not null then perform public.notify_new_account(p); end if;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- 5) Eigenes Konto löschen (Recht auf Löschung)
create or replace function public.delete_my_account()
returns void language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  delete from auth.users where id = auth.uid();
end $$;
revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;

-- 6) Weltkugel: nur die Anzahl bestätigter Konten je Ort, keine Namen und keine Mailadressen.
--    Konten ohne Ortsangabe zählen unter '_none' (nur für die Gesamtzahl).
create or replace function public.globe_points()
returns table (city_id text, n bigint) language sql security definer set search_path = public stable as $$
  select coalesce(p.city_id, '_none') as city_id, count(*) as n
  from public.profiles p join auth.users u on u.id = p.id
  where u.email_confirmed_at is not null
  group by 1
$$;
revoke all on function public.globe_points() from public;
grant execute on function public.globe_points() to anon, authenticated;
