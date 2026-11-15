# Dauerhafte Konten einrichten (Supabase, EU)

Dauer: etwa 20 Minuten. Kosten: 0 € (Free-Plan von Supabase und Brevo).
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

## 5. Mailversand mit Brevo (EU, kostenlos, 300 Mails pro Tag)
Brevo verschickt die Bestätigungs- und Passwort-Mails an die Nutzer und die Benachrichtigung an dich.
1. Auf https://www.brevo.com mit secondorderresonance@gmail.com ein kostenloses Konto anlegen und das Profil ausfüllen. Neue Konten prüft Brevo manchmal kurz, bevor sie senden dürfen.
2. **Senders, Domains & Dedicated IPs → Domains → Add a domain**: `secondorderresonance.de`. Brevo zeigt einige DNS-Einträge (TXT für Brevo-Code und DKIM, eventuell DMARC).
3. Bei IONOS unter **Domains & SSL → secondorderresonance.de → DNS → Eintrag hinzufügen** jeden Eintrag anlegen. Beim Hostnamen nur den vorderen Teil eintragen (z. B. `brevo._domainkey`), IONOS ergänzt die Domain. Die bestehenden A-Einträge für GitHub nicht ändern. Falls IONOS das Speichern verweigert, kurz den Domain Guard ausschalten.
4. In Brevo **Authenticate** klicken. Das kann Minuten bis 48 Stunden dauern.
5. **Senders → Add a sender**: Name `Second-Order Resonance`, Adresse `noreply@secondorderresonance.de`.
6. **Settings → SMTP & API**:
   - Reiter **SMTP**: „Generate SMTP key“. Login (steht dort) und SMTP-Schlüssel (`xsmtpsib-…`) notieren.
   - Reiter **API Keys**: „Generate a new API key“. Schlüssel (`xkeysib-…`) notieren.
7. Supabase **SQL Editor**:
   ```sql
   select vault.create_secret('xkeysib-DEIN_SCHLUESSEL', 'brevo_api_key');
   ```
8. Supabase **Authentication → Emails → SMTP Settings**: Enable custom SMTP an.
   - Sender email `noreply@secondorderresonance.de`, Sender name `Second-Order Resonance`
   - Host `smtp-relay.brevo.com`, Port `587`, Username = SMTP-Login aus Brevo, Password = SMTP-Schlüssel
9. **Authentication → Sign In / Providers → Email**: „Confirm email“ eingeschaltet lassen.
10. Test: auf der Website ein Konto anlegen. Die Bestätigungsmail kommt bei dir an, und nach dem Bestätigen die Mail „Neuer Account: …“.

## 6. Ohne Mailversand starten (Notlösung)
Solange Schritt 5 nicht fertig ist: „Confirm email“ ausschalten. Konten sind dann sofort aktiv, „Passwort vergessen“ funktioniert nicht, und neue Konten siehst du unter Authentication → Users. Wichtig: Die Weltkugel zählt nur bestätigte Konten.

## 7. Rechtliches (keine Rechtsberatung)
- Bei Supabase unter **Organization Settings → Legal Documents** den Auftragsverarbeitungsvertrag (DPA) abschließen.
- Die Datenschutzerklärung beschreibt Supabase, Brevo und die Weltkugel bereits. Sie sollte live gehen, sobald die Konten aktiv sind.
- Brevo sitzt in Frankreich, Gmail ist ein US-Anbieter. Die Betreiber-Mail enthält deshalb nur Anzeigename, Rolle, Klasse, Stadt und Zeit.
- Bei Brevo den Auftragsverarbeitungsvertrag (DPA) in den Kontoeinstellungen annehmen.

## Was die Website dann macht
- Registrierung und Anmeldung laufen über Supabase. Alte Konten, die nur auf einem Gerät liegen, funktionieren weiter. Wer sich mit derselben Mailadresse registriert, nimmt seinen Fortschritt mit.
- Der Lernstand wird nach jeder Übung automatisch hochgeladen und beim Anmelden auf einem anderen Gerät zusammengeführt.
- „Konto löschen“ löscht das Online-Konto mit allen Daten sofort.
- `app/welt.html` zeigt je Stadt einen Lichtstrahl, ohne Namen.
