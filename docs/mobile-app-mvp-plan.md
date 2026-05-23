# Mobile App MVP Plan (iOS / Android)

## Ziel
Ein erster nativer SOR-App-Launch für iOS und Android mit:
- täglichen Mathe- und Physikaufgaben
- SOR-Account-Anbindung (local-first, cloud-sync-bereit)
- konsistentem Gamification-Kern (XP, Streak, Herzen)
- identischem 6-Level-System wie Website und Lernarchiv

Der MVP-Scope ist bewusst klein: lieber schnell draußen und stabil als feature-reich und fragil.

---

## Tech-Stack-Empfehlung

| Entscheidung           | Wahl                          | Begründung                                                     |
|------------------------|-------------------------------|----------------------------------------------------------------|
| Framework              | React Native + Expo SDK       | Shared codebase iOS/Android; gute TypeScript-Unterstützung     |
| Navigation             | Expo Router (file-based)      | Vertraut aus Web-Kontext; einfache Deep-Links                  |
| Lokaler State          | AsyncStorage                  | Direktes Äquivalent zu localStorage des Web-Frontends          |
| Remote-Sync            | Firebase Auth + SOR-Backend   | Bereits in sor-account-sync-architecture.md definiert         |
| Build / Distribution   | EAS Build (Expo)              | Einfache OTA-Updates; App Store + Play Store Workflows         |
| Styling                | StyleSheet + SOR Design Token | Eigene Token (Farben, Radien, Schriften) aus Website übernehmen |

Kein Redux, kein Context-Overengineering. State bleibt per-screen lokal + AsyncStorage-Persistenz.

---

## MVP Feature-Scope

### Muss (MVP)
- **Daily Challenge**: Eine zufällige Aufgabe aus dem Archiv pro Tag, passendes Level aus lokalem Account-State.
- **Kurzlektion**: 5-Fragen-Session wie in der Web-App, gleiche Logik.
- **SOR-Login / Registrierung**: Email + Passwort (Firebase Auth), Account wird beim ersten Login per lokalem Snapshot initialisiert.
- **XP + Streak**: Nach jeder Lektion live update; Streak-Logik wie im Web.
- **Herzen/Lives**: 5 Herzen pro Tag, Refill-Timer, verlieren bei Fehler.
- **Level-Auswahl**: Nutzer wählt aktives Level (L1–L6) in den Einstellungen.
- **Offline-Fähigkeit**: Aufgaben aus lokalem Cache spielbar; Sync beim nächsten Online-Moment.

### Nicht im MVP (spätere Versionen)
- Lernpfad-Visualisierung (komplexe Pfad-Karte)
- Vollständiges Archiv (Browser, Filter, Suche)
- Placement Test
- Push-Notifikationen für Streak-Erinnerungen
- Wochenrangliste / Leaderboard
- Premium-Tier (SOR Plus)
- In-App-Purchases

---

## Architektur-Übersicht

```
┌─────────────────────────┐
│    SOR Mobile App       │
│  (React Native / Expo)  │
│                         │
│  ┌─────────────────┐   │
│  │  AsyncStorage   │   │
│  │  (local cache)  │   │
│  └────────┬────────┘   │
│           │ SORSyncAdapter (LocalOnly → Firebase)
└───────────┼─────────────┘
            │
    ┌───────▼───────┐
    │ SOR Backend   │
    │ REST API      │
    │ (gleich wie   │
    │  Web)         │
    └───────────────┘
```

Das Account/Progress-Modell ist identisch mit `sor-account-sync-architecture.md`:
- `AccountRecord` + `ProgressEnvelope` (schemaVersion 2)
- Gleiche Merge-Regeln (xp=max, achievements=union, streak=server-authoritative)
- `SORSyncAdapter`-Interface: zuerst `LocalOnlySyncAdapter`, später `FirebaseSyncAdapter`

---

## Aufgaben-Datenmodell im MVP

Die App braucht beim ersten Start einen lokalen Aufgaben-Cache. Strategie:

1. **Bundle**: Ein kompaktes JSON-Bundle mit je 50 Aufgaben pro Level (300 gesamt) wird direkt in die App eingebettet (`assets/tasks-bundle.json`).
2. **Fetch-on-Demand** (spätere Version): App ruft bei Verbindung neue Aufgaben vom Backend ab.
3. **Daily Seed**: Tagesaufgabe wird deterministisch aus dem Cache bestimmt (`ISO-Datum-Hash mod Aufgaben-Pool`), identisch zur Web-Logik.

Format: Teilmenge des bestehenden Archiv-Schemas (`id`, `level`, `question`, `answer`, `explanation`, `type`, `estimatedTime`).

---

## Screen-Übersicht (MVP)

| Screen               | Funktion                                          |
|----------------------|---------------------------------------------------|
| `Home`               | Tagesaufgabe + Streak-Widget + "Lektion starten"  |
| `Exercise`           | 5-Fragen-Lektion, Herzen, Fortschrittsbalken      |
| `Lesson Complete`    | XP-Zusammenfassung, Sterne, "Nächste Lektion"     |
| `Login / Register`   | Firebase Email/Passwort, Gast-Modus               |
| `Profile`            | XP, Streak, Herzen, Level, Achievements           |
| `Settings`           | Level-Auswahl, Account verwalten, Abmelden        |

---

## Implementierungsreihenfolge

### Phase 1 – Fundament (1–2 Wochen)
1. Expo-Projekt initialisieren (`npx create-expo-app sor-app`)
2. SOR-Designtokens als StyleSheet-Konstanten definieren (Farben aus Website)
3. `AsyncStorage`-basiertes Account-Modell portieren (aus `app/index.html` extrahieren)
4. Aufgaben-Bundle (300 Tasks) aus `app/data/archive-content.js` exportieren

### Phase 2 – Core-Loop (1–2 Wochen)
5. Exercise-Screen mit 5-Fragen-Lektion implementieren
6. XP/Streak/Herzen-Logik portieren
7. Lesson-Complete-Modal mit Sterne-Rating
8. Home-Screen mit Daily Challenge + Streak-Anzeige

### Phase 3 – Account (1 Woche)
9. Login/Register-Screen (Firebase Auth, Email/Passwort)
10. SOR-Backend `POST /auth/session` + `GET /progress/snapshot` anbinden
11. Lokaler Snapshot-Import bei erstem Login

### Phase 4 – Launch-Vorbereitung
12. EAS Build für iOS + Android konfigurieren
13. App Store / Play Store Metadaten vorbereiten
14. Beta-Test über TestFlight + Google Play Internal Testing

---

## Abhängigkeiten vor Implementierungsstart

| Abhängigkeit                     | Status                                  |
|----------------------------------|-----------------------------------------|
| Firebase-Projekt konfiguriert    | Noch offen (blockiert Cloud-Sync)       |
| SOR-Backend deployed (Prod-URL)  | Noch offen                              |
| App Store / Play Store Account   | Noch offen                              |
| Aufgaben-Bundle erstellt         | Kann aus Archive-Content.js generiert werden |

Die ersten beiden Phasen (Fundament + Core-Loop) sind vollständig offline durchführbar und nicht von Firebase oder Backend-Deployment abhängig.

---

## Risiken und Mitigationen

| Risiko                              | Mitigation                                      |
|-------------------------------------|-------------------------------------------------|
| Apple-Review-Verzögerung            | TestFlight frühzeitig für Beta nutzen          |
| Inkonsistenz Web/App-Fortschritt    | Gleiche Merge-Regeln + Event-first API          |
| Aufgaben-Cache veraltet             | Fetch-on-demand in Phase 2 vorbereiten          |
| Komplexität durch 2 Plattformen     | Expo EAS; keine plattformspezifischen nativen Module im MVP |

---

## Definition of Done (MVP)

- [ ] App startet auf iOS und Android (echtes Gerät + Simulator)
- [ ] Tagesaufgabe wird angezeigt und ist lösbar
- [ ] 5-Fragen-Lektion läuft komplett durch mit XP-Vergabe
- [ ] Streak wird korrekt gezählt und gespeichert
- [ ] Login mit SOR-Account funktioniert (Firebase Auth)
- [ ] Fortschritt wird nach Login aus Backend-Snapshot geladen
- [ ] Offline-Modus: Lektion funktioniert ohne Verbindung
- [ ] App ist über TestFlight / Play Internal Track testbar
