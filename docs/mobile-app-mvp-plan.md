# SOR Mobile App MVP Plan (iOS/Android)

## Ziel
- Ein schlankes Mobile-MVP fuer iOS und Android bereitstellen, das taegliche Mathe-/Physikaufgaben anbietet.
- Bestehendes SOR-Accountmodell und die definierte Sync-Architektur direkt nutzen.
- Scope bewusst klein halten: stabiler Lernfluss statt Feature-Ueberladung.

## Produkt-Scope v1 (MVP)
- Login/Registrierung mit SOR-Account (Firebase Auth Email/Passwort).
- Daily-Lesson Flow mit 5 Aufgaben pro Session.
- 6-Level-Struktur L1-L6 sichtbar und konsistent zur Website.
- XP-Update, Streak-Update und Hearts-Verbrauch lokal + sync-faehig.
- Einfache Profilansicht: XP, Streak, Wochen-XP, erledigte Aufgaben.
- Optionaler Placement-Entry als "Spaeter"-Feature; nicht MVP-kritisch.

## Explizit nicht im MVP
- Vollstaendige 30.000-Aufgaben-Abdeckung in der App.
- Sozialfunktionen ausser einfachem Wochen-Leaderboard-Read.
- Abo-/Payment-Flow.
- Komplexe Editor-/Authoring-Funktionen in der App.

## Nutzerfluss (MVP)
1. App-Start -> Session-Check.
2. Nicht eingeloggt -> Login/Registrierung.
3. Eingeloggt -> Home mit "Heute lernen" CTA + Tagesstatus.
4. Start Lesson -> 5 Fragen, direktes Feedback, Hearts-Regel.
5. Lesson Complete -> XP-Delta, Accuracy, Streak-Hinweis.
6. Sync-Lauf im Hintergrund (online) bzw. Queue (offline).

## Technischer Zuschnitt
- Client-Stack: React Native + Expo (wie in `docs/edtech-stack-proposal.md` empfohlen).
- Lokaler Store: Envelope-kompatibler Progress-Cache (gleiches Schema-Prinzip wie Web).
- Sync-Modell: event-first (lesson_complete, answer_batch, streak_event) gemaess `docs/sor-account-sync-architecture.md`.
- API-Minimum fuer MVP:
  - `POST /auth/session`
  - `GET /progress/snapshot`
  - `POST /progress/events`
  - `GET /leaderboard/weekly` (read-only)

## Datenvertrag fuer Daily-Aufgaben
- Aufgabeinheit (mobile view model):
  - `id`, `level`, `sublevel`, `topic`, `question`, `answer`, `explanation`, `difficulty`, `estimatedTime`
- Session-Regel:
  - 5 Aufgaben pro Lesson
  - keine Dubletten innerhalb derselben Session
  - Level-/Topic-Preset aus letztem Fortschritt ableiten
- Fortschrittsereignisse:
  - pro Antwort lokal erfassen
  - bei Session-Ende als kompaktes Event-Bundle syncen

## MVP Meilensteine
1. Foundation (1 Sprint)
- Expo-App-Shell, Routing, Theme-Tokens aus SOR-Farbraum.
- Auth-Screens + Session-Persistenz.

2. Learning Core (1 Sprint)
- Lesson-Engine (5 Fragen), Feedback, Hearts/XP/Streak lokal.
- Baseline Profilansicht.

3. Sync Vertical Slice (1 Sprint)
- Snapshot Pull + Event Push mit Retry/Backoff.
- Konfliktregeln aus Sync-Architektur anwenden.

4. Stabilisierung (1 Sprint)
- Offline/Online-Wechsel, Crash/State-Resume, QA auf Mid-range Devices.
- Store-Review-Basis: Datenschutztexte, Mindest-Telemetrie, Release-Checklist.

## Erfolgskriterien fuer MVP-Release
- Login bis Lesson-Complete funktioniert stabil auf iOS und Android.
- XP/Streak bleiben nach App-Neustart erhalten.
- Online-Sync repliziert Fortschritt geraeteuebergreifend fuer Kernmetriken.
- UI bleibt im SOR-Look (kein generischer Redesign-Bruch).

## Abhaengigkeiten / Blocker
- Firebase-Projektkonfiguration und Secrets fuer Mobile-Build-Pipelines.
- Verfuegbare Backend-Endpunkte aus dem Sync-Architektur-Dokument.

## Naechster Umsetzungsschritt
- Cloud-Sync P4-Task wieder aufnehmen, sobald Firebase-Konfiguration im Repo/Runtime verfuegbar ist; danach Mobile-Foundation mit Auth + Home-Screen starten.
