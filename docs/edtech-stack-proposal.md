# Technologischer Stack-Vorschlag (Second-Order Resonance)

## Empfohlene Zielarchitektur (Web + iOS + Android aus einer Codebase)

### Frontend/App
- Framework: **React Native + Expo**
- Web: Expo Web (gleiche Komponentenbasis)
- Mobile UI: Nativewind/Tamagui oder reines StyleSheet + Motion-Library
- Animationen: React Native Reanimated + Lottie
- Offline: Expo SQLite + React Query Persist (lokaler Cache + Sync)

Warum diese Wahl:
- Sehr gute Cross-Platform-Reife fuer Web, iOS, Android
- Firebase/Auth/OAuth-Integration ist etabliert
- Animationen koennen nah an die bestehende visuelle Identitaet gebracht werden
- Offline-First fuer Uebungen realistisch umsetzbar

### Authentifizierung
- **Firebase Auth**
  - Email/Passwort
  - Google OAuth Login
- Token-Validierung im Backend via Firebase Admin SDK

### Backend API
- **Node.js + TypeScript + Fastify**
- Zod fuer Request/Response-Validierung
- Firebase Admin SDK fuer Auth-Token-Verifikation
- Cron/Worker fuer woechentliche Leaderboard-Snapshots

### Datenbank
- **PostgreSQL** (primar, fuer Ranking/Gamification-Queries)
- Prisma oder Drizzle als ORM (optional)

Begruendung:
- Leaderboards, Prozent-Fortschritt, Locks und Wochen-Rankings sind relational stark
- Gute Skalierbarkeit fuer 30.000+ Aufgaben und Event-Logging

### Eventing/Gamification-Core
- Tabelle `exercise_attempts` als Event-Quelle
- Aggregation in `user_level_progress`, `user_lesson_progress`, `user_daily_activity`, `user_weekly_xp`
- Regel-Engine:
  - Streak aus Tagesaktivitaet
  - Level-Unlock ab 80% Completion
  - XP-Regeln pro Aufgabe
  - Hearts/Lives optional via Feature-Flag pro User

### Deployment
- API: Fly.io/Render/Railway
- DB: Managed Postgres (Neon/Supabase/Render)
- CDN/Static: bestehendes Hosting beibehalten

## MVP-Phasen (empfohlen)
1. Auth + User-Profil + Progress-Tabellen + Streak-API
2. Level-Locking + XP-Vergabe + Weekly Leaderboard
3. Hearts/Lives (optional aktivierbar)
4. Offline-Sync und Konfliktregeln (last-write-wins + idempotente Attempt-IDs)
