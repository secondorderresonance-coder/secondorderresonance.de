# Dauerhafte Konten einrichten (Supabase, EU)

Dauer: etwa 20 Minuten. Kosten: 0 € (Free-Plan von Supabase und Resend).
Danach gibt es Online-Konten mit Fortschritt auf jedem Gerät, die Weltkugel füllt sich, und bei jeder Registrierung kommt eine Mail an secondorderresonance@gmail.com.

## 1. Projekt anlegen
1. Auf https://supabase.com mit „Start your project“ ein Konto erstellen (am besten mit secondorderresonance@gmail.com).
2. „New project“: Name `secondorderresonance`, ein starkes Datenbank-Passwort (sicher aufbewahren, wird hier nicht gebraucht), **Region: Central EU (Frankfurt)**. Plan: Free.
3. Warten, bis das Projekt bereit ist (1 bis 2 Minuten).

## 2. URL und öffentlichen Schlüssel kopieren
1. Oben im Projekt auf **Connect** klicken, oder links **Project Settings → API Keys** (die URL steht auch unter **Project Settings → Data API**).
2. Kopieren:
   - **Project URL**, sieht aus wie `https://abcdefghijklm.supabase.co`
   - **Publishable key** (beginnt mit `sb_publishable_`). Falls das Projekt nur den Reiter „Legacy API Keys“ zeigt, stattdessen den Schlüssel **anon public** (beginnt mit `eyJ`).
3. **Nicht** kopieren und nirgends weitergeben: `secret` bzw. `service_role`. Dieser Schlüssel umgeht alle Schutzregeln.
4. Beides an Claude schicken oder selbst in `app/data/cloud-config.js` eintragen:
   ```js
   window.SOR_CLOUD_CONFIG = { url: "https://abcdefghijklm.supabase.co", key: "sb_publishable_..." };
   ```
   Der öffentliche Schlüssel darf im Code stehen. Die Daten schützt die Row Level Security aus Schritt 3.

## 3. Datenbank einrichten
1. Links **SQL Editor** → „New query“.
2. Den kompletten Inhalt von `supabase/setup.sql` einfügen → **Run**. Erwartet: „Success. No rows returned“.
   Das legt die Tabelle `profiles` mit Schutzregeln an, das Löschen des eigenen Kontos, die anonyme Zählung für die Weltkugel und die Mail an den Betreiber.

## 4. Anmeldung einstellen
1. **Authentication → URL Configuration**: Site URL `https://secondorderresonance.de`, bei Redirect URLs `https://secondorderresonance.de/app/konto.html` hinzufügen.
2. **Authentication → Sign In / Providers → Email**: aktiviert lassen.
3. **Schneller Start (ohne eigene Mail-Domain):** „Confirm email“ ausschalten. Dann ist ein Konto sofort nach der Registrierung aktiv.
   Grund: Der eingebaute Mailversand von Supabase schickt nur an Team-Mitglieder und höchstens 2 Mails pro Stunde. Bestätigungs- und Passwort-Mails kämen bei Nutzern nicht an. Solange „Passwort vergessen“ ohne Schritt 6 nicht funktioniert, kann Claude ein Passwort im Dashboard zurücksetzen (Authentication → Users).

## 5. Mail an dich bei jeder Registrierung (Resend)
1. Auf https://resend.com mit **secondorderresonance@gmail.com** registrieren (wichtig: dieselbe Adresse, ohne eigene Domain darf Resend nur an die Konto-Adresse schicken).
2. **API Keys → Create API Key** (Permission: Sending access). Den Schlüssel (`re_...`) kopieren.
3. In Supabase im **SQL Editor** ausführen (Schlüssel einsetzen):
   ```sql
   select vault.create_secret('re_DEIN_SCHLUESSEL', 'resend_api_key');
   ```
4. Test: auf der Website ein Konto anlegen. Die Mail „Neuer Account: …“ kommt nach wenigen Sekunden. Inhalt: Name, Rolle, Klasse, Stadt, Uhrzeit. Die Mailadresse der Person steht bewusst nicht drin (Datensparsamkeit), sie ist im Dashboard unter Authentication → Users sichtbar.

## 6. Später empfohlen: eigener Mailversand für Bestätigung und Passwort
1. In Resend **Domains → Add Domain** `secondorderresonance.de`, die angezeigten DNS-Einträge beim Domain-Anbieter eintragen, auf „Verified“ warten.
2. In Supabase **Authentication → Emails → SMTP Settings**: Custom SMTP an, Host `smtp.resend.com`, Port `465`, Benutzer `resend`, Passwort = Resend-API-Key, Absender `noreply@secondorderresonance.de`, Name `Second-Order Resonance`.
3. „Confirm email“ wieder einschalten. Jetzt funktionieren Bestätigung und „Passwort vergessen“ für alle.
4. In `supabase/setup.sql` kann der Absender dann auf `noreply@secondorderresonance.de` geändert werden (Funktion `notify_new_account`, erneut ausführen).

## 7. Rechtliches (keine Rechtsberatung)
- Bei Supabase unter **Organization Settings → Legal Documents** den Auftragsverarbeitungsvertrag (DPA) abschließen.
- Die Datenschutzerklärung beschreibt Supabase, Resend und die Weltkugel bereits. Sie sollte live gehen, sobald die Konten aktiv sind.
- Resend und Gmail sind US-Anbieter. Die Betreiber-Mail enthält deshalb nur Anzeigename, Rolle, Klasse, Stadt und Zeit.

## Was die Website dann macht
- Registrierung und Anmeldung laufen über Supabase. Alte Konten, die nur auf einem Gerät liegen, funktionieren weiter. Wer sich mit derselben Mailadresse registriert, nimmt seinen Fortschritt mit.
- Der Lernstand wird nach jeder Übung automatisch hochgeladen und beim Anmelden auf einem anderen Gerät zusammengeführt.
- „Konto löschen“ löscht das Online-Konto mit allen Daten sofort.
- `app/welt.html` zeigt je Stadt einen Lichtstrahl, ohne Namen.
