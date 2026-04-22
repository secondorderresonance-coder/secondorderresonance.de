# STATUS

## Current version
- `v1.8.0`

## Current state
The repository now includes a scalable archive foundation for a 6-level learning platform, a working 30-question placement test flow, and 3.000 archive tasks (500 per level) for this iteration.
The repository includes a scalable archive foundation for a 6-level learning platform, a working 30-question placement test flow, 3.120 archive tasks (520 per level), cleaner homepage video entry links, completed active 5-level wording migration, a first authoring/QA foundation for safer archive growth, a deeper hierarchical sublevel taxonomy in the archive data, a direct bridge from archive tasks into matching app exercises, stable deep links plus saved archive filter state in the archive UI, a cleaner mobile layout for the archive and placement sections, a direct handoff from placement results into the recommended archive preset, a first interactive Pythagoras module connected across website and archive, and now a global search plus a low-friction external suggestion flow on the landing page.

Long-term target remains unchanged and explicitly active:
- 5.000 learning items per level
- 6 levels
- 30.000 items overall
- Duolingo-aehnliche guided learning journey for math/physics in SOR branding
- Own SOR accounts on the website first and later in iOS/Android app flows
- Free-first product direction with optional small premium tier later if demand supports it

Current implementation status:
- Expanded scalable foundation (not final archive volume)
- Architecture is designed for further growth without major restructuring
- Homepage video cards now provide direct topic-based YouTube entry points instead of generic channel-only links
- Active level framing now consistently reflects the 6-level target through Level 6 ("Forschung & Simulation")
- Archive authoring has a documented seed-task template and a runnable QA check for taxonomy/data integrity
- Taxonomy includes deeper pedagogical paths such as `1.1.2.a`, `2.1.1.a`, `3.1.1.a`, `4.1.1.a`, `5.1.1.a`, and `6.1.1.a`
- Archive task details now link into the app with matching level/topic deeplinks where supported
- Archive filters can now be restored from local state and shared via URL parameters for `level`, `sublevel`, `topic`, `search`, and `task`
- Archive and placement sections now compress more cleanly on tablet and phone widths without changing the established visual identity
- Placement results can now apply the recommended level/sublevel directly and jump into the archive browser
- The first interactive visual now exists for the Pythagorean theorem, with a homepage teaser and a live archive module that reacts to kathete sliders and can jump directly into geometry archive filters
- The landing page now includes a global search over website/archive topics and a backend-free suggestion form for external task ideas with level categorization, screenshot preview, and mail/share fallback

## Last completed task (v1.8.0)
Level-up celebration modal + perfect lesson bonus:

### Changes in this iteration
- **Level-up modal** (`app/index.html`): When XP crosses a LEVEL_XP_THRESHOLDS boundary mid-session, a full-screen modal fires after the lesson modal closes. Shows the level badge (colour-coded, pulsing animation), level name, XP requirement, and a "Weiter machen!" CTA. Multiple level-ups in one session are queued via `pendingLevelUp` and shown sequentially. `checkLevelUp(xpBefore, xpAfter)` scans thresholds at every XP gain.
- **Perfect lesson bonus** (`app/index.html`): A 5/5 lesson awards +20 bonus XP on top of the earned XP. The lesson-complete modal shows a gold gradient "⭐ PERFEKT +20 XP BONUS" badge that animates in. The bonus also feeds into level-up detection.

### Files touched
- `app/index.html`
- `STATUS.md`, `VERSION.md`

## Last completed task (v1.7.0)
Audio feedback, floating XP animation, Streak Freeze item:

### Changes in this iteration
- **Sound effects** (`app/index.html`): Web Audio API (no audio files). Ascending triad (C5-E5-G5) on correct answer, falling buzz on wrong answer. AudioContext created lazily on first interaction — no autoplay policy issues.
- **Floating +XP animation**: When answering correctly, a gold "+N XP" text spawns near the XP bar and floats upward with a fade-out CSS animation. CSS `@keyframes floatUp` added.
- **Streak Freeze item**: Costs 100 XP; shown in a widget below the daily mission bar. Stored per account as `streakFreezes` + `streakFreezeUsed`. When the streak would reset (no session yesterday), a freeze is consumed silently and a toast fires instead. Multiple freezes can be stacked. Button disabled when XP < 100.
- Account data model extended: `streakFreezes: 0`, `streakFreezeUsed: null` added to `normalizeAccountRecord()` (migration-safe).

### Files touched
- `app/index.html`
- `STATUS.md`, `BACKLOG.md`, `VERSION.md`

## Last completed task (v1.6.0)
Weekly leaderboard on profile page:

### Changes in this iteration
- **`app/profil.html`**: Added weekly leaderboard widget between the XP chart and level-progress sections.
  - Reads all accounts from `mathlevel-accounts-v1` localStorage key
  - Ranks entries by current ISO week's XP (descending), top 10 shown
  - Medals 🥇🥈🥉 for top 3, numeric rank for positions 4–10
  - Logged-in user's row has a gold border + "(du)" label
  - "Nur du" fallback message when only one account exists on the device
  - Uses existing `getIsoWeekKey()` helper and `ACCOUNT_STORE_KEY` constant — no duplication

### Files touched
- `app/profil.html`
- `STATUS.md`, `BACKLOG.md`, `VERSION.md`

## Last completed task (v1.5.0)
Exercise pool expansion + lesson star rating:

### Changes in this iteration
- **`app/index.html`**: Added 5 new questions per level (30 total, L1–L6), bringing each level from 7 to 12 questions. Prevents repeat questions within a 5-question lesson session.
  - L1 (Grundlagen): Pythagoras, Dreisatz auto speed, Bruch-Division, Prozent-Steigerung, Rechteck-Umfang
  - L2 (Aufbauwissen): cos(60°), Gleichungssystem, Parabel-Scheitelpunkt, negative Potenzen, Bruchgleichung
  - L3 (Vertiefung): Binomialverteilung, Kettenregel, Substitutionsintegral, Kreuzprodukt-Betrag, bedingte Wahrscheinlichkeit
  - L4 (Uni-Grundlagen): Taylor-Reihe, DGL 2. Ordnung, Euler-Formel, Eigenwerte Diagonalmatrix, harmonische Reihe
  - L5 (Angewandte Mathe): Parseval, Heaviside-Laplace, Gütefaktor Q, I-Anteil PID, Hermite-Symmetrie
  - L6 (Forschung): Ito-Formel, FDM zweite Ableitung, Wellengleichung, FEM-Formfunktionen, konvexe Optimierung
- **Lesson complete modal**: Added 1–3 star rating. 5/5 = 3 Sterne, 4/5 = 2 Sterne, ≤3/5 = 1 Stern. Stars render as gold filled / dimmed empty using CSS classes.

### Files touched
- `app/index.html`
- `STATUS.md`, `BACKLOG.md`, `VERSION.md`

## Last completed task (v1.4.0)
Lernpfad – Duolingo-style visual skill map:

### Changes in this iteration
- **`app/lernpfad.html`** (new): Full visual learning path page. Vertical layout with a colour-coded spine line connecting 6 level chapters. Each chapter shows: colour-coded dot + level badge, title, subtitle, XP progress bar, topic nodes (clickable when unlocked, dimmed when locked), and a "Lektion starten" CTA button. Reads XP from localStorage – locked levels shown at 55% opacity with lock icon + XP requirement. Topic nodes deep-link directly into `app/index.html?level=X&topic=Y`. Overview bar at top shows total XP, levels unlocked, and streak. Guest note shown when no account found.
- **`app/index.html`** header: Logo is now a link to lernpfad.html; added a small "🗺 Pfad" navigation button.
- **`app/profil.html`** header: Added "🗺 Lernpfad" button alongside the back button.

### Files touched
- `app/lernpfad.html` (new)
- `app/index.html`
- `app/profil.html`
- `STATUS.md`, `BACKLOG.md`, `VERSION.md`

## Last completed task (v1.3.0)
Argand-Ebene interactive visual + Lesson session flow:

### Changes in this iteration
- **Argand-Ebene visual** (`app/lernarchiv.html`): Interactive complex number plane. Two sliders (Re, Im from −5 to 5, step 0.5). SVG renders z (gold), z* conjugate (blue), |z| modulus line (red dashed), angle arc, projection dashes, and grid. Live metrics: z, z*, |z|, arg(z)°. Button to set archive filter to "Komplexe Zahlen / Level 4".
- **Argand teaser on landing page** (`index.html`): Added a second archive-note card alongside the Pythagoras teaser. Search index updated with Argand keywords.
- **Lesson session flow** (`app/index.html`): Exercises are now grouped into lessons of 5 questions. A progress bar in the exercise card header shows 1/5 → 5/5. After answering the 5th question, a modal ("Lektion abgeschlossen!") shows XP earned in this lesson, correct/5, and streak. Two buttons: "Nächste Lektion →" starts a fresh 5-question session; "Pause einlegen" closes the modal. Lesson state resets on level/topic change and on login.

### Files touched
- `app/lernarchiv.html`
- `app/index.html`
- `index.html`
- `STATUS.md`
- `BACKLOG.md`
- `VERSION.md`

## Last completed task (v1.2.0)
Account system overhaul + Duolingo-like gamification foundation:

### Changes in this iteration
- **Fixed critical init bug**: `loadAccountStore()` and `bindAccountEvents()` were never called on page load — accounts did not persist across reloads. Fixed.
- **Hearts/Lives system**: 5 hearts per account, displayed in the app header. Lose 1 heart on wrong answer, refill automatically (1 heart per 30 min). Stored per account in localStorage.
- **Account panel overhaul**: Two-state UI — when logged in shows avatar + username + Profil link + Abmelden; when logged out shows tabbed Anmelden/Registrieren form with Enter-key support.
- **Avatar system**: Each account gets an initial-based avatar with a deterministic color from the username. Shown in account panel and on the profile page.
- **Account data model extended**: `avatarColor`, `createdAt`, `hearts`, `heartsLastRefill` added to every account record. Migration-safe via `normalizeAccountRecord`.
- **Daily mission widget**: Persistent progress bar in the app showing today's answered count vs. daily goal (5 Aufgaben). Updates live after each answer.
- **Activated achievements**: `daily_goal` (5 tasks in one day) and `precision_3` (3 correct in a row) are now live — previously placeholders. Added `consecutiveCorrect` to state, resets on wrong answer.
- **Profile page** (`app/profil.html`): Standalone page showing avatar, key stats (XP, streak, accuracy, correct answers, hearts), full achievement grid, activity heatmap (last 28 days), weekly XP bar chart (last 8 weeks), and per-level XP progress bars. Reads directly from localStorage.

### Files touched
- `app/index.html`
- `app/profil.html` (new file)
- `STATUS.md`
- `BACKLOG.md`
- `VERSION.md`

## Previous completed task
Worked on the next highest-priority open P2 task:
- started the first focused L4-L6 archive expansion batch with textbook-style explanations

Implementation details:
- added three new seed tasks in `app/data/archive-content.js`:
  - `T-4-007` (Analysis I: geometric series convergence and sum)
  - `T-5-007` (Laplace use in linear initial value problems)
  - `T-6-007` (consistency-stability-convergence in numerical simulation)
- each new explanation follows the didactic structure from the QA workflow:
  - `Kernidee`, `Intuition`, `Schritte`, `Haeufiger Fehler`, `Schnellcheck`
- this raises pedagogical depth for L4-L6 without changing site design or inflating scope

## Last validation
- marker checks:
  - `rg -n "id: \"T-4-007\"|id: \"T-5-007\"|id: \"T-6-007\"|Kernidee:|Haeufiger Fehler:|Schnellcheck:" app/data/archive-content.js`
- runtime seed checks:
  - Node VM check confirms `T-4-007`, `T-5-007`, `T-6-007` exist in built archive tasks and contain the didactic markers
- marker checks:
  - `rg -n "Expand L4-L6 archive slices" BACKLOG.md`
- archive data integrity check:
  - `node tools/archive-qa.js`
  - `OK: archive QA passed`
  - `tasks=3000`
  - `perLevel={"1":500,"2":500,"3":500,"4":500,"5":500,"6":500}`
  - `placementQuestions=30`

## Files touched in last task
- `app/data/archive-content.js`
Completed the user-requested landing page utility additions in `index.html`:
- Added a global quick-search hub that searches website sections, archive levels/sublevels, and archive topics from the shared archive data model.
- Added an external quick-submit suggestion form for new task ideas with title, level 1-6 categorization, topic, detailed description, optional contact address, and screenshot preview.
- Implemented a no-backend first flow: the page copies the structured suggestion text, opens a mail draft, and uses the native share sheet with attached image when browser support exists.
- Kept the implementation focused to one page (`index.html`) and aligned with the current SOR design language.

## Last validation
- `rg -n "globalSearchInput|globalSearchResults|suggestionForm|suggestScreenshot|suggestionPreview|SOR_ARCHIVE|buildSearchEntries|navigator.share|mailto:" index.html -S`
- Inline script syntax check via Node on `index.html`
- `node tools/archive-qa.js`
- QA result:
  - tasks: 3120
  - placement questions: 30
  - level distribution: 520 tasks for each level 1-6
  - overall result: OK
- Static diff review confirmed the change stays focused on one landing-page search/suggestion enhancement plus run documentation.

## Files touched in last task
- `index.html`
- `index.html`
- `BACKLOG.md`
- `STATUS.md`
- `VERSION.md`

## Blockers
None.

## Next logical step
Start the next highest-priority open P2 task:
- continue L4-L6 archive expansion with the next small batch of textbook-style tasks and explanations aligned to Karpfinger Buch + Arbeitsbuch.
Continue with the next highest-priority open tasks now queued after this run:
1. Add first interactive visual module for "Komplexe Zahlen" (Argand-Ebene) in website + archive context.
2. Prepare local progress architecture for future XP and streak systems.
3. Add daily streak system to archive and placement journey (local first, backend-ready later).
4. Add achievement placeholder architecture without overbuilding.
5. Define content QA workflow and authoring guidelines for scaling to 30.000 tasks.
