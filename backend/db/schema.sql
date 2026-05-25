-- Second-Order Resonance: relational core schema for auth-linked progress and gamification
-- Auth itself is handled by Firebase Auth; this DB references the external uid.

create table if not exists app_user (
  id uuid primary key,
  firebase_uid text not null unique,
  email text not null unique,
  display_name text not null,
  avatar_url text,
  hearts_enabled boolean not null default false,
  hearts_max smallint not null default 5,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists level_catalog (
  level_id smallint primary key,
  code text not null unique,
  title text not null,
  sort_order smallint not null,
  completion_unlock_threshold numeric(4,3) not null default 0.800,
  check (level_id between 1 and 6)
);

create table if not exists lesson_catalog (
  id uuid primary key,
  level_id smallint not null references level_catalog(level_id),
  lesson_code text not null unique,
  title text not null,
  sort_order integer not null,
  exercise_count integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists user_level_progress (
  user_id uuid not null references app_user(id) on delete cascade,
  level_id smallint not null references level_catalog(level_id),
  completed_lessons integer not null default 0,
  total_lessons integer not null default 0,
  completion_ratio numeric(5,4) not null default 0,
  unlocked boolean not null default false,
  xp_total integer not null default 0,
  correct_answers integer not null default 0,
  total_answers integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, level_id)
);

create table if not exists user_lesson_progress (
  user_id uuid not null references app_user(id) on delete cascade,
  lesson_id uuid not null references lesson_catalog(id) on delete cascade,
  completed boolean not null default false,
  completion_ratio numeric(5,4) not null default 0,
  xp_earned integer not null default 0,
  correct_answers integer not null default 0,
  total_answers integer not null default 0,
  last_activity_at timestamptz,
  primary key (user_id, lesson_id)
);

create table if not exists exercise_attempt (
  id uuid primary key,
  user_id uuid not null references app_user(id) on delete cascade,
  lesson_id uuid not null references lesson_catalog(id) on delete cascade,
  is_correct boolean not null,
  xp_delta integer not null,
  hearts_delta smallint not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_exercise_attempt_user_created
  on exercise_attempt(user_id, created_at desc);

create table if not exists user_daily_activity (
  user_id uuid not null references app_user(id) on delete cascade,
  activity_date date not null,
  attempt_count integer not null default 0,
  xp_earned integer not null default 0,
  primary key (user_id, activity_date)
);

create table if not exists user_streak (
  user_id uuid primary key references app_user(id) on delete cascade,
  current_streak integer not null default 0,
  best_streak integer not null default 0,
  last_activity_date date,
  updated_at timestamptz not null default now()
);

create table if not exists user_weekly_xp (
  user_id uuid not null references app_user(id) on delete cascade,
  iso_year integer not null,
  iso_week integer not null,
  xp_total integer not null default 0,
  rank_position integer,
  updated_at timestamptz not null default now(),
  primary key (user_id, iso_year, iso_week)
);

create index if not exists idx_user_weekly_xp_week_rank
  on user_weekly_xp(iso_year, iso_week, xp_total desc);

create table if not exists task_suggestion (
  id uuid primary key,
  title text not null,
  level_id smallint not null,
  topic text not null,
  description text not null,
  contact_email text,
  screenshot_url text,
  status text not null default 'submitted',
  source text not null default 'website',
  moderation_score smallint not null default 0,
  moderation_notes text[] not null default '{}',
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (level_id between 1 and 6),
  check (status in ('submitted', 'triage', 'needs_revision', 'accepted', 'rejected', 'archived')),
  check (source in ('website', 'app', 'import')),
  check (moderation_score between 0 and 100)
);

create index if not exists idx_task_suggestion_status_submitted
  on task_suggestion(status, submitted_at desc);

create index if not exists idx_task_suggestion_level_topic
  on task_suggestion(level_id, topic);

create table if not exists task_suggestion_moderation_event (
  id uuid primary key,
  suggestion_id uuid not null references task_suggestion(id) on delete cascade,
  from_status text not null,
  to_status text not null,
  moderator_user_id uuid references app_user(id) on delete set null,
  note text,
  created_at timestamptz not null default now(),
  check (from_status in ('submitted', 'triage', 'needs_revision', 'accepted', 'rejected', 'archived')),
  check (to_status in ('submitted', 'triage', 'needs_revision', 'accepted', 'rejected', 'archived'))
);

create index if not exists idx_task_suggestion_event_suggestion
  on task_suggestion_moderation_event(suggestion_id, created_at desc);

create or replace view admin_registered_accounts as
select
  u.id as user_id,
  u.firebase_uid,
  u.email,
  u.display_name,
  u.created_at,
  u.updated_at,
  s.last_activity_date,
  coalesce(s.current_streak, 0) as current_streak,
  coalesce(sum(lp.xp_total), 0) as total_xp
from app_user u
left join user_streak s on s.user_id = u.id
left join user_level_progress lp on lp.user_id = u.id
group by
  u.id,
  u.firebase_uid,
  u.email,
  u.display_name,
  u.created_at,
  u.updated_at,
  s.last_activity_date,
  s.current_streak;
