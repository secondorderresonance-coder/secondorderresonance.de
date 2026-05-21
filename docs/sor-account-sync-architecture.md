# SOR Account & Sync Architecture (iOS/Android)

## Ziel
Definiert, wie das bestehende lokale Account-System auf eine cloud-gestützte, geräteübergreifende Identität erweitert wird — für Web, iOS und Android aus einem einheitlichen Datenmodell.

## Aktueller Stand (Referenz)

Das bestehende lokale Modell in `app/index.html` (PROGRESS_SCHEMA_VERSION 2):

```
AccountRecord {
  email: string          // normalisierte Identität (Schlüssel in localStorage)
  displayName: string
  password: string       // lokaler Plaintext — wird in Cloud durch Auth-Token ersetzt
  avatarColor: string
  createdAt: ISO8601
  hearts: number         // 0-5, refill alle 30 Min
  heartsLastRefill: ISO8601
  streakFreezes: number
  streakFreezeUsed: string | null  // Datumstring
  progress: ProgressEnvelope {
    schemaVersion: 2
    summary: {
      correct: number
      total: number
      xp: number
      streak: number
      lastSessionDate: string | null
      earnedAchievements: string[]
    }
    dailyActivity: { [date: YYYY-MM-DD]: { count: number, xp: number } }
    weeklyXp: { [week: YYYY-Www]: number }
    lastActiveDate: string | null
    updatedAt: ISO8601
  }
}
```

localStorage-Schlüssel: `mathlevel-accounts-v1`

---

## Cloud Account Schema (Ziel)

Erweiterung des lokalen Modells um Cloud-Felder (kursiv = neu):

```
CloudAccountRecord {
  // Identität (unveränderlich nach Registrierung)
  uid: string            // Firebase Auth UID (Primärschlüssel in DB)
  email: string          // verified via Firebase Auth
  displayName: string
  avatarColor: string
  createdAt: ISO8601

  // Gamification-Zustand (cloud-synced)
  hearts: number
  heartsLastRefill: ISO8601
  streakFreezes: number
  streakFreezeUsed: string | null
  premiumTier: 'free' | 'plus'   // inaktiv bis Monetarisierung aktiviert

  // Progress (cloud-synced, schemaVersion 2+)
  progress: ProgressEnvelope     // identisch mit lokalem Modell

  // Sync-Metadaten
  deviceId: string               // opaker Geräteschlüssel für Konfliktauflösung
  clientUpdatedAt: ISO8601       // Timestamp des letzten lokalen Schreibvorgangs
  serverUpdatedAt: ISO8601       // vom Server gesetzt beim Sync
}
```

Lokale `password`-Felder werden beim Cloud-Übergang verworfen. Auth übernimmt Firebase Auth.

---

## Auth-Flows

### Web (bestehend → Cloud)
1. Nutzer hat lokalen Account (email + Passwort-Hash in localStorage).
2. Beim ersten Cloud-Login: Firebase Auth `createUserWithEmailAndPassword` oder `signInWithEmailAndPassword`.
3. Nach erfolgreichem Login: lokalen Progress in Firestore unter `users/{uid}/progress` hochladen.
4. Anschließend localStorage als Cache behalten (offline-first), Firestore als Source of Truth.

### iOS / Android
1. App startet → Firebase Auth `onAuthStateChanged` prüfen.
2. Nicht eingeloggt → Login/Register Screen (E-Mail + Passwort oder Google OAuth).
3. Eingeloggt → Progress von Firestore laden → in lokalen Cache schreiben.
4. Google OAuth: `signInWithCredential(GoogleAuthProvider.credential(...))`.
5. Token-Refresh erfolgt automatisch durch Firebase SDK.

---

## Sync-Protokoll

### Strategie: Last-Write-Wins mit clientUpdatedAt-Guard

```
PUSH (Gerät → Cloud):
  if clientUpdatedAt > serverUpdatedAt:
    Firestore.set(users/{uid}/progress, localProgress, { merge: false })
  else:
    skip (Cloud ist neuer)

PULL (Cloud → Gerät):
  cloudProgress = Firestore.get(users/{uid}/progress)
  if cloudProgress.serverUpdatedAt > local.progress.updatedAt:
    local = merge(cloudProgress, local)  // XP = max, streak = max, achievements = union
  save to localStorage
```

### Merge-Regeln bei Konflikt (zwei Geräte gleichzeitig aktiv)
| Feld | Regel |
|---|---|
| `xp` | max(lokal, cloud) |
| `correct`, `total` | max(lokal, cloud) |
| `streak` | max(lokal, cloud) |
| `earnedAchievements` | set union |
| `dailyActivity` | merge keys, max per key |
| `weeklyXp` | merge keys, max per key |
| `hearts` | lokal (zeitbasiert, kein Sync-Konflikt) |
| `streakFreezes` | min(lokal, cloud) — konservativ |

### Sync-Trigger
- Login-Event
- App-Start (wenn > 5 Min seit letztem Sync)
- Nach jeder abgeschlossenen Lektion (PUSH)
- App-Reaktivierung aus Hintergrund (PULL)

---

## Lokale Cache-Strategie

- localStorage (Web) / AsyncStorage (React Native) bleibt primärer Schreibpfad.
- Cloud-Sync läuft asynchron im Hintergrund, blockiert keine UI.
- Offline-Modus: Alle Aktionen schreiben lokal. Nächster Sync-Trigger schiebt Änderungen hoch.
- Schlüssel bleibt `mathlevel-accounts-v1` auf Web; auf Mobile analog `sor-accounts-v1`.

---

## Lokale Migration (bestehende Web-Accounts)

1. Nutzer registriert sich in der Cloud mit derselben E-Mail.
2. `mergeLocalToCloud()`:
   - Lese lokalen Progress aus localStorage.
   - Lade ggf. vorhandenen Cloud-Progress (bestehende andere Geräte).
   - Führe Merge-Regeln aus.
   - Schreibe Ergebnis in Firestore.
   - Setze `clientUpdatedAt = now()`.
3. Altes Passwort-Feld wird verworfen.
4. localStorage-Eintrag bleibt als Cache erhalten.

---

## Datenbank-Struktur (Firestore)

```
users/
  {uid}/
    profile          // displayName, avatarColor, createdAt, premiumTier
    progress         // ProgressEnvelope + sync-Metadaten
    activity/
      {YYYY-MM-DD}/  // tägliche Detaildaten (optional, für Backend-Queries)
```

Alternativpfad bei PostgreSQL (gemäß edtech-stack-proposal.md):
- Tabelle `user_progress` mit JSON-Spalte `progress_envelope` + `updated_at`
- Tabelle `exercise_attempts` als append-only Event-Log
- Leaderboard-Queries über `user_weekly_xp`-View

---

## Schnittstelle zur App (Interface-Skizze)

```typescript
interface SORSyncAdapter {
  push(uid: string, progress: ProgressEnvelope): Promise<void>;
  pull(uid: string): Promise<ProgressEnvelope | null>;
  merge(local: ProgressEnvelope, remote: ProgressEnvelope): ProgressEnvelope;
}

// Firebase-Implementierung:
class FirestoreSyncAdapter implements SORSyncAdapter { ... }

// Null-Implementierung (local-only, kein Breaking Change):
class LocalOnlySyncAdapter implements SORSyncAdapter {
  async push() {}
  async pull() { return null; }
  merge(local) { return local; }
}
```

Der produktive Code wechselt per Feature-Flag zwischen Adaptern:

```javascript
const syncAdapter = CLOUD_SYNC_ENABLED
  ? new FirestoreSyncAdapter(firebaseApp)
  : new LocalOnlySyncAdapter();
```

---

## Implementierungsreihenfolge

1. Firebase-Projekt erstellen + Auth aktivieren (E-Mail + Google).
2. `FirestoreSyncAdapter` implementieren (Push/Pull/Merge).
3. Web: Login-Flow um Firebase Auth erweitern, lokalen Progress migrieren.
4. React Native App: Auth-Screens + Sync-Adapter einbinden.
5. `premiumTier`-Feld inaktiv im Schema mitführen (kein UI, kein Gate).
6. Leaderboard-Queries auf Backend migrieren (optional, nach Schritt 4).

---

## Abgrenzung (was dieses Dokument nicht festlegt)

- Konkrete Firebase-Projektdaten (Env-Variablen) — gehören nicht ins Repo.
- UI-Design der nativen Login-Screens — folgt in separatem Milestone.
- Abrechnung / Premium-Aktivierung — separat per `free-first-monetization-path.md`.
