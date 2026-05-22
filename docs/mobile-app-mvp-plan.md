# Mobile App MVP Plan (iOS / Android)

## Ziel
- Eine native SOR-App liefert taeglich kuratierte Mathe- und Physikaufgaben.
- Lernfortschritt ist an das bestehende SOR-Account-Modell gebunden.
- Der MVP ist schmal genug fuer eine erste testbare Version, aber erweiterbar auf das volle Duolingo-aehnliche Lernpfad-System.

## Scope des MVP
- Tagesaufgabe (eine Aufgabe/Tag aus dem Archiv, Level-passend).
- 5-Fragen-Lektion waehlen und absolvieren (wie auf der Web-App).
- Lernfortschritt: XP, Streak, Herzen – aus bestehendem Account-Modell.
- Placement-Test-Einstieg fuer neue Nutzer.
- Archivbrowser: Level- und Themenfilter, Aufgabendetail lesen.
- Benutzerprofil: Avatar, XP, Streak, Wochenaktivitaet.
- Login / Registrierung via SOR-Account (Email + Passwort, Firebase Auth).
- Sync mit Web-Account sobald Cloud-Sync verfuegbar (read-only im MVP falls Sync noch nicht live).

## Nicht im MVP
- Kein vollstaendiger offline-erster Archivbrowser (nur gekuerzte Tagesaufgabe offline).
- Keine In-App-Kaeufe oder SOR-Plus-Integration im ersten Schritt.
- Keine Push-Notification-Kampagnen (nur lokale Erinnerung fuer Streak).
- Kein eigener nativer Editor fuer Aufgabeninhalte.

## Tech-Stack-Empfehlung

### Option A: React Native (Expo) – empfohlen fuer MVP
- Eine gemeinsame TypeScript-Codebasis fuer iOS und Android.
- Expo managed workflow reduziert native Build-Komplexitaet.
- Wiederverwendung von Datenmodellen und Archiv-Logik aus dem Web.
- Firebase Auth und Firestore ueber `expo-firebase-*` / `@react-native-firebase/*`.
- Expo EAS Build fuer App-Store-Deployment ohne Mac-Pflicht im ersten Schritt.

### Option B: Flutter (Dart)
- Gute Performance, eine Codebasis.
- Groesserer Rewrite-Aufwand da kein Code aus dem Web-TypeScript-Stack wiederverwendbar.
- Empfehlung: erst wenn React Native Blocker auftreten.

### Option C: Native (SwiftUI + Jetpack Compose)
- Bestes UI-Erlebnis plattformspezifisch.
- Hoechster Entwicklungsaufwand; erst sinnvoll nach validiertem Produkt.

Empfehlung: **Option A (React Native / Expo)** fuer den MVP.

## App-Screens (MVP)

| Screen | Inhalt |
|---|---|
| Onboarding | 3 Screens: Was ist SOR? / Wie funktioniert die App? / Placement oder Level-Auswahl |
| Home | Tagesaufgabe-Karte + Streak-Banner + Start-Lektion-Button |
| Lektion | 5-Fragen-Flow mit Fortschrittsbalken, Korrekt/Falsch-Feedback, XP-Animation |
| Archiv | Level-Filter + Themenfilter + Aufgabendetail |
| Placement | 30-Fragen-Einstufungstest (identische Logik wie Web) |
| Profil | Avatar, XP, Streak, letzte 7 Tage Aktivitaet, Achievements |
| Login/Register | Email + Passwort, Passwort-Reset-Link |

## Account-Integration

Basis: Bestehender `AccountRecord`-Typ aus dem Web (schemaVersion 2).

Mobile liest und schreibt dasselbe Datenformat:
```typescript
interface AccountRecord {
  email: string;
  displayName: string;
  xp: number;
  streak: number;
  hearts: number;
  heartsLastRefill: string; // ISO timestamp
  earnedAchievements: string[];
  streakFreezes: number;
  weeklyXp: Record<string, number>; // ISO week key -> XP
  dailyActivity: Record<string, number>; // date -> tasks answered
  schemaVersion: 2;
}
```

Sync-Strategie im MVP:
- Bei Login: Server-Snapshot laden (falls Cloud-Sync aktiv) oder lokalen Cache nutzen.
- Nach Lektion: Event `lesson_complete` senden; lokal sofort schreiben.
- Fallback: vollstaendig lokal, Sync wird beim naechsten Login nachgeholt.

## Tagesaufgabe-Mechanik

- Deterministisch: Seed = ISO-Datum + Nutzer-Level -> ein Task-ID aus dem Pool.
- Gleiche Logik wie `Daily Challenge` auf der Web-App (`sor-daily-challenge-v1`).
- Belohnung: 2x XP fuer die Tagesaufgabe (identisch wie Web).
- Lokaler Speicher: `sor-daily-challenge-v1` Key (schon definiert, gleich halten).

## Streak und Herzen im MVP

- Streak: taeglich beim App-Start pruefen ob `lastActiveDate` == gestern.
- Herzen: 5 Herzen, -1 pro Falschantwort, +1 alle 30 min (identisch Web).
- Streak Freeze: Kostet 100 XP, schuetzt einen Tag Streak (identisch Web).
- Alle drei Features bereits im bestehenden Account-Modell definiert -> direkt uebernehmen.

## Implementierungsreihenfolge (MVP)

1. Expo-Projektstruktur aufsetzen, Linting, TypeScript-Config.
2. Shared data-layer Package: `AccountRecord`, `ArchiveTask`, Placement-Logik.
3. Auth-Screen: Firebase Auth Email/Passwort Login + Registrierung.
4. Home-Screen: Tagesaufgabe-Karte + Streak-Anzeige.
5. Lektion-Flow: 5 Fragen, XP vergabe, Herzen-Abzug.
6. Archiv-Browser: Level-/Themenfilter, Aufgabendetail.
7. Profil-Screen: XP-Balken, Streak, Achievement-Icons.
8. Placement-Test-Flow.
9. Lokale Streak-Erinnerung (Expo Notifications, einmal pro Tag).
10. EAS Build + Beta-Deployment (TestFlight / Google Play Internal).

## Kritische Abhaengigkeiten

| Abhaengigkeit | Status |
|---|---|
| Firebase Auth Projekt konfiguriert | Noch ausstehend (blockiert auch Web Cloud-Sync) |
| `POST /progress/events` API Endpunkt | Definiert in Architektur-Doc; noch nicht implementiert |
| App-Store-Accounts (Apple / Google) | Noch nicht angelegt |
| Expo EAS Account | Noch nicht angelegt |

## Erfolgskriterien fuer Beta

- Nutzende koennen sich registrieren / einloggen.
- Tagesaufgabe erscheint taeglich und vergibt 2x XP korrekt.
- Streak bricht ab und wird durch Freeze gesschuetzt (identisch wie Web).
- Lektionsflow startet, schreibt XP lokal, Profilseite zeigt aktuellen Stand.
- App crasht nicht bei schwacher Verbindung (lokaler Fallback aktiv).

## Naechster konkreter Schritt
- Firebase-Konfiguration erstellen (Projekt anlegen, `google-services.json` / `GoogleService-Info.plist` beschaffen).
- Expo-Projektstruktur initialisieren (separates Repository oder `app/mobile/`-Unterordner).
- Danach: Auth-Screen als erster vertikaler MVP-Slice.
