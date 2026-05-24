# SOR Mobile App MVP Plan (iOS / Android)

## Ziel
- Taeglich motivierende Mathe- und Physikaufgaben direkt auf dem Smartphone.
- Vollstaendige Integration mit dem bestehenden SOR-Account-System (lokaler Fortschritt, spaeter Cloud-Sync).
- Gleiche 6-Level-Struktur und Gamification wie Website und Web-App.
- Erweiterung des SOR-Lernpfad-Erlebnisses auf native Plattformen.

## Scope (MVP)
- Native App fuer iOS und Android via **React Native + Expo** (ein gemeinsamer Codebase).
- Taeglich eine neue Aufgabe ("Tagesaufgabe") pro aktivem Level mit 2x-XP-Bonus.
- Lernpfad-Ansicht analog zu `app/lernpfad.html`: Level-Kapitel, Themenknoten, XP-Gates.
- 5-Fragen-Lektion mit Fortschrittsbalken, Lektion-Abgeschlossen-Modal und Sternwertung.
- Streak-Anzeige und taeglische Erinnerungs-Push-Notification.
- Lokales Account-System analog zu Web (`mathlevel-accounts-v1`) als lokaler Cache.
- Keine KI-generierten Inhalte im MVP; nutzt den bestehenden archive-content-Datensatz.

## Nicht im MVP (spaeter)
- In-App-Kaeufe / Premium-Tier.
- Cloud-Sync (wird separat nach Firebase-Konfiguration umgesetzt).
- Offline-Queue mit vollstaendigem Event-Replay.
- Soziale Features (Freunde, global Leaderboard).
- Eigene native Formelerkennung oder LaTeX-Rendering (Fallback: Text-only im MVP).

## Tech-Stack

### Framework
- **React Native + Expo SDK** (Expo Router fuer Navigation)
- Gemeinsamer Code fuer iOS und Android
- TypeScript durchgehend

### Datenhaltung (MVP-lokal)
- `@react-native-async-storage/async-storage` als Ersatz fuer localStorage
- Gleiche Account-Envelope-Struktur (`AccountRecord` + `ProgressEnvelope`, schemaVersion 2)
- Kompatibel mit dem bestehenden Web-Sync-Adapter-Interface (`SORSyncAdapter`)

### Inhalte
- Bestehende `archive-content.js` Seed-Tasks direkt als statisches JSON-Bundle einbinden
- 9.000 Aufgaben (1.500 pro Level) sind ausreichend fuer den MVP
- Tagesaufgabe: deterministisch aus ISO-Datum + Level-ID errechnet (wie in `app/index.html`)

### Push-Notifications
- **Expo Notifications** (`expo-notifications`)
- Lokale Erinnerung taeglich um konfigurierbare Uhrzeit (Standard: 18:00)
- Kein Backend noetig fuer lokale Notifications im MVP

### Navigation (Expo Router)
- `/` → Startseite (Lernpfad)
- `/lektion/[level]` → 5-Fragen-Lektion
- `/archiv` → Aufgabenarchiv mit Level/Thema-Filtern
- `/tagesaufgabe` → Aktuelle Tagesaufgabe
- `/profil` → Profil-Screen (XP, Streak, Achievements)
- `/einstellungen` → Konto, Erinnerungszeit, Datenschutz

## Kern-Screens (MVP)

### 1. Lernpfad (Home)
- Analoges Layout zu `app/lernpfad.html`
- 6 Level-Kapitel, 12 Themenknoten pro Level
- Winding-Path-Darstellung mit FlatList (vertikales Scrollen)
- Gesperrte Level ausgegraut, aktive Level mit Bounce-Animation
- XP-Gate pro Level (`LVL_XP = [0, 50, 150, 300, 500, 750, 1100]`)

### 2. Lektion
- 5 Fragen hintereinander, analoges Fluss-Design zu `app/index.html`
- Multiple-Choice-Antwortoptionen (Touch-freundlich, grosse Buttons)
- Sofortiges Feedback (gruen/rot), Erklaerungstext bei Falschantwort
- Lektion-Abgeschlossen-Modal: XP-Gewinn, Sternwertung, Naechste-Lektion-Button

### 3. Tagesaufgabe
- Eine klar hervorgehobene Aufgabe fuer heute
- 2x XP wenn korrekt geloest
- "Heute erledigt" Badge nach Abschluss, Reset um Mitternacht

### 4. Archiv
- Level- und Thema-Filter analog zu `app/lernarchiv.html`
- Suchfunktion ueber Titel und Tags
- Aufgabendetail mit vollstaendiger Erklaerung

### 5. Profil
- Avatar (Initialen + deterministische Farbe)
- XP, Streak, Treffer-Genauigkeit
- Achievement-Grid (identisch mit Web-Achievements)
- Wochen-XP-Balkendiagramm (letzte 8 Wochen)

## Account-Kompatibilitaet

### Lokales Datenschema (identisch mit Web)
```typescript
interface AccountRecord {
  id: string;          // uuid
  email: string;
  displayName: string;
  avatarColor: string;
  createdAt: string;
  xp: number;
  streak: number;
  hearts: number;
  heartsLastRefill: string;
  streakFreezes: number;
  earnedAchievements: string[];
  schemaVersion: number; // 2
}

interface ProgressEnvelope {
  accounts: AccountRecord[];
  activeAccountId: string | null;
}
```

### AsyncStorage-Key
- `mathlevel-accounts-v1` (gleicher Key wie Web, jedoch geraetespezifisch)
- Cloud-Sync (Firebase) wird nach dem MVP hinzugefuegt via `SORSyncAdapter`-Interface

## Gamification (MVP)
- Identische XP-Regeln wie Web-App: +10 XP pro richtige Antwort
- Perfect-Lesson-Bonus: +20 XP bei 5/5
- Tagesaufgaben-Bonus: 2x XP
- Streak: taeglich aktualisiert, Freeze-System uebertragbar
- Achievements: erstmal 1:1 aus Web-App portiert (5 initial)
- Daily Mission: 5 Aufgaben/Tag fuer vollstaendige Tagesaufgabe

## Push-Notification-Strategie (lokal, kein Backend)
```typescript
// Taeglich nach Abschluss einer Lektion neu planen
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Dein tägliches SOR-Training wartet 🎓",
    body: "5 Minuten Mathe — dein Streak zaehlt auf dich!",
  },
  trigger: {
    hour: userSettings.reminderHour, // Standard: 18
    minute: 0,
    repeats: true,
  },
});
```

## Implementierungsreihenfolge (6 Schritte)

### Schritt 1: Projektsetup
- `npx create-expo-app sor-app --template blank-typescript`
- Expo Router, AsyncStorage, Expo Notifications einrichten
- `archive-content.js` als statisches JSON-Asset einbinden
- Gemeinsame Typen aus bestehendem Backend-Domain-Modell uebernehmen

### Schritt 2: Account-System
- `AsyncStorage`-basierter Account-Store portieren (analog `mathlevel-accounts-v1`)
- Login/Register-Screen mit E-Mail + Passwort
- `normalizeAccountRecord()`-Funktion portieren

### Schritt 3: Lernpfad-Screen
- Statische Knotenliste aus bestehendem WIND-Pattern
- XP-basiertes Sperren/Entsperren
- Navigation zu `/lektion/[level]`

### Schritt 4: Lektions-Flow
- 5-Fragen-Session aus `archive-content.js`-Pool
- Multiple-Choice-UI
- Lektion-Abgeschlossen-Modal

### Schritt 5: Tagesaufgabe + Gamification
- Deterministisches Datum-Seeding fuer Tagesaufgabe
- XP-Multiplier, Streak-Update, Achievement-Checks
- Push-Notification-Scheduling

### Schritt 6: Profil + Archiv
- Profil-Screen (Statistiken, Achievements)
- Archiv-Screen mit Filtern und Suchfunktion

## App-Store-Readiness (nach MVP)
- iOS: Apple Developer Account, App Store Connect, Privacy Policy
- Android: Google Play Console, Privacy Policy
- Beide Plattformen: DSGVO-konforme Datenschutzerklaerung (lokale Datenhaltung vereinfacht dies erheblich)

## Offene Entscheidungen vor Implementierungsstart
- Expo Managed Workflow vs. Bare Workflow (Managed reicht fuer MVP)
- Minimale iOS/Android-Targetversionen (Empfehlung: iOS 15+, Android 10+)
- LaTeX-Rendering fuer fortgeschrittene Aufgaben (MVP: Fallback auf Klartext/Unicode)
- Branding-Assets (App-Icon, Splash Screen) als erste native Dateien benoetigt

## Naechster technischer Schritt
- Expo-Projektsetup anlegen und ersten Lernpfad-Screen als statischen Prototyp rendern.
- Danach Account-System aus Web-App portieren.
- Cloud-Sync nach Firebase-Konfiguration als spaeterer Schritt.
