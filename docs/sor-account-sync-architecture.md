# SOR Account and Sync Architecture (Web + iOS/Android)

## Ziel
- Ein einheitliches SOR-Login fuer Website und spaetere Mobile-Apps.
- Geraeteuebergreifende Synchronisation von Lernfortschritt, XP, Streak und Wochen-XP.
- Lokales Lernen bleibt moeglich; Sync ergaenzt den bestehenden local-first Ansatz.

## Scope (dieser Architektur-Stand)
- Definiert Datenverantwortung, Sync-Richtung, Konfliktregeln und API-Schnitte.
- Keine produktive Firebase-Integration in diesem Schritt (konfigurationsabhaengig).

## Architekturueberblick
- Identity Provider: Firebase Auth (Email/Passwort, spaeter OAuth).
- Source of Truth nach Login: Backend + Datenbank (nicht mehr nur localStorage).
- Local Cache:
  - Web: bestehender localStorage-Envelope bleibt als Offline-/Fallback-Cache.
  - Mobile (geplant): lokaler persistenter Cache mit gleichem Envelope-Prinzip.
- Sync Trigger:
  - Login
  - App-Resume
  - Abschliessen einer Lektion/Placement
  - Manuelles "Sync jetzt" (spaeter optional)

## Account Canonical Model
- `identity`:
  - `uid` (Firebase UID)
  - `email`
  - `displayName`
  - `createdAt`
- `progress.summary`:
  - `xp`
  - `streak`
  - `correct`
  - `total`
  - `accuracy`
- `progress.activity`:
  - `dailyActivity`
  - `weeklyXp`
  - `lastActiveDate`
- `gamification`:
  - `hearts`, `heartsLastRefill`
  - `earnedAchievements`
  - `streakFreezes`, `streakFreezeUsed`
- `meta`:
  - `updatedAt`
  - `clientUpdatedAt`
  - `schemaVersion`

## Mapping auf vorhandene Backend-Bausteine
- `backend/src/domain/models.ts`
  - `UserProfile`
  - `UserLevelProgress`
  - `UserLessonProgress`
  - `UserStreak`
  - `WeeklyLeaderboardEntry`
- `backend/db/schema.sql`
  - `app_user`
  - `user_level_progress`
  - `user_lesson_progress`
  - `user_daily_activity`
  - `user_streak`
  - `user_weekly_xp`

Hinweis: Das vorhandene Schema deckt den Kern bereits ab; clientseitige Felder wie UI-Settings/Avatarfarbe bleiben zunaechst im Client-Profil und koennen spaeter serverseitig erweitert werden.

## Sync-Modus pro Zustand
- `guest`:
  - Nur lokal speichern.
  - Optional spaeter "Guest-Merge bei Registrierung".
- `authenticated`:
  - Write-through: erst lokal aktualisieren, dann Sync-Queue ins Backend.
  - Read-after-login: Server-Snapshot holen, lokal anwenden.

## Konfliktregeln (einfach, robust)
- Numerische Zaehler (`xp`, `correct`, `total`): monotone Merge-Regel `max(server, client)` bei Reconnect.
- Tages-/Wochenaggregate (`dailyActivity`, `weeklyXp`): pro Key additiv zusammenfuehren.
- Streak:
  - Immer serverseitig aus Aktivitaetsdaten berechnen (Single Truth fuer Streak).
- Achievements:
  - Mengenschnittstelle per Union (einmal freigeschaltet bleibt freigeschaltet).
- `updatedAt`:
  - Server schreibt finale Zeitstempel.

## Empfohlene API-Schnitte (v1)
- `POST /auth/session` -> Token validieren, Profil liefern/anlegen.
- `GET /progress/snapshot` -> kompletter Sync-Snapshot.
- `POST /progress/events` -> idempotente Fortschritts-Events (lesson complete, placement complete, correct answer batch).
- `GET /leaderboard/weekly` -> Wochenranking.

## Event-first statt Full-document Overwrite
- Client sendet Ereignisse mit `eventId` (UUID) zur Idempotenz.
- Backend aggregiert in Progress-Tabellen.
- Vorteil: weniger Konflikte, stabil bei Offline-Replay.

## Migration vom aktuellen localStorage-Modell
1. Bestehenden Envelope normalisieren (`schemaVersion` pruefen).
2. Nach erstem Login lokalen Snapshot als Initialimport schicken.
3. Serverantwort als neues lokales Baseline-Snapshot setzen.
4. Danach nur noch Event-Delta syncen.

## Security und Datenschutz (MVP)
- Keine Klartext-Passwoerter im eigenen Backend speichern (nur Firebase Auth).
- Firebase ID Token serverseitig pruefen.
- Nur Nutzerzugriff auf eigene Daten (`uid`-gebundene Autorisierung).

## Offene Entscheidungen vor Implementierung
- Guest-Merge-Strategie (automatisch vs. Nutzerbestaetigung).
- Exakter Offline-Queue-Speicher fuer mobile App.
- API-Ratelimits und Retry-Backoff-Policy.

## Naechster technischer Schritt
- Sobald Firebase-Konfiguration verfuegbar ist:
  - `POST /auth/session` + `GET /progress/snapshot` als kleinster vertikaler End-to-End-Sync-Pfad implementieren.
