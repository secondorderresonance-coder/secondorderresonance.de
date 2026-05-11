# STATUS

## Current version
- `v1.2.28`

## Current state
The repository now includes a scalable archive foundation for a 6-level learning platform, a working 30-question placement test flow, and 9.000 archive tasks (1.500 per level) for this iteration.
The repository includes a scalable archive foundation for a 6-level learning platform, a working 30-question placement test flow, 9.000 archive tasks (1.500 per level), cleaner homepage video entry links, completed active 5-level wording migration, a first authoring/QA foundation for safer archive growth, a deeper hierarchical sublevel taxonomy in the archive data, a direct bridge from archive tasks into matching app exercises, stable deep links plus saved archive filter state in the archive UI, a cleaner mobile layout for the archive and placement sections, a direct handoff from placement results into the recommended archive preset, a first interactive Pythagoras module connected across website and archive, global search plus a low-friction external suggestion flow on the landing page, and email-based local account registration/login with per-email progress storage.

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
- Local account registration/login now uses email identity (`type="email"` + validation) with individual local progress per email account

## Last completed task (v1.2.28)
Twenty-sixth focused L4-L6 archive expansion batch:

### Changes in this iteration
- **T-4-032** (Gershgorin-Kreise zur Eigenwertabschaetzung): spektrale Lageabschaetzung ohne volle Eigenwertberechnung.
- **T-5-032** (Nichols-Diagramm und Entwurfsintuition): kombinierte Gain/Phase-Sicht fuer Loop-Shaping.
- **T-6-032** (Adaptive Schrittweitensteuerung): lokale Fehlerschaetzung und effiziente ODE-Integration.

### Files touched
- `app/data/archive-content.js`
- `BACKLOG.md`
- `STATUS.md`

### Validation
- `node tools/archive-qa.js` -> OK, tasks=9000, 1500 per level
- marker check: `T-4-032`, `T-5-032`, `T-6-032`

### Blockers
None.

### Next logical step
- Continue P2 with next small L4-L6 batch (`T-4-033`, `T-5-033`, `T-6-033`) while preserving the didactic explanation template.

## Last completed task (v1.2.20)
Eighteenth focused L4-L6 archive expansion batch:

### Changes in this iteration
- **T-4-024** (Eigenraumdimension und Diagonalisierbarkeit): geometrische/algebraische Vielfachheit und defekte Eigenwerte.
- **T-5-024** (PID-Tuning und Anti-Windup): Integrator-Saettigung, Clamping/Back-Calculation und Stabilitaetswirkung.
- **T-6-024** (ADMM): augmentierte Lagrangefunktion, Blockupdates und Residuen-basiertes Tuning.

### Files touched
- `app/data/archive-content.js`
- `BACKLOG.md`
- `STATUS.md`

### Validation
- `node tools/archive-qa.js` -> OK, tasks=9000, 1500 per level
- marker check: `T-4-024`, `T-5-024`, `T-6-024`

### Blockers
None.

### Next logical step
- Continue P2 with next small L4-L6 batch (`T-4-025`, `T-5-025`, `T-6-025`) while preserving the didactic explanation template.

## Last completed task (v1.2.19)
Seventeenth focused L4-L6 archive expansion batch:

### Changes in this iteration
- **T-4-023** (LU-Zerlegung und Pivotisierung): Stabilitaetsgrund fuer `PA=LU`, Vorwaerts-/Rueckwaertseinsetzen.
- **T-5-023** (Root-Locus und Kompensatorwirkung): Einfluss zusaetzlicher Nullstellen auf Polpfade und Daempfung.
- **T-6-023** (SQP-Grundidee): QP-Teilprobleme, linearisierte Nebenbedingungen, KKT-nahe Suchrichtung.

### Files touched
- `app/data/archive-content.js`
- `BACKLOG.md`
- `STATUS.md`

### Validation
- `node tools/archive-qa.js` -> OK, tasks=9000, 1500 per level
- marker check: `T-4-023`, `T-5-023`, `T-6-023`

### Blockers
None.

### Next logical step
- Continue P2 with next small L4-L6 batch (`T-4-024`, `T-5-024`, `T-6-024`) while preserving the didactic explanation template.

## Last completed task (v1.2.18)
Sixteenth focused L4-L6 archive expansion batch:

### Changes in this iteration
- **T-4-022** (Gram-Schmidt und QR-Konstruktion): Orthogonalisierungsschritte, numerische Stabilitaet, Bezug zu `A=QR`.
- **T-5-022** (Nyquist-Kriterium und Umlaufzahl): Zusammenhang von `N`, `P`, `Z` und geschlossener Stabilitaet.
- **T-6-022** (Trust-Region und Cauchy-Punkt): Modellguete `rho`, adaptive Regionsgroesse, robuste Schrittwahl.

### Files touched
- `app/data/archive-content.js`
- `BACKLOG.md`
- `STATUS.md`

### Validation
- `node tools/archive-qa.js` -> OK, tasks=9000, 1500 per level
- marker check: `T-4-022`, `T-5-022`, `T-6-022`

### Blockers
None.

### Next logical step
- Continue P2 with next small L4-L6 batch (`T-4-023`, `T-5-023`, `T-6-023`) while preserving the didactic explanation template.

## Last completed task (v1.2.17)
Fifteenth focused L4-L6 archive expansion batch:

### Changes in this iteration
- **T-4-021** (Hauptkomponentenanalyse als SVD-Anwendung): Zentrierung, Komponentenwahl und erklaerte Varianz.
- **T-5-021** (Bode-Diagramm und Stabilitaetsreserven): Phasenreserve/Amplitudenreserve und robuste Reglerintuition.
- **T-6-021** (Primal-Dual Interior-Point): Zentralpfad, KKT-Newton-Schritte und Positivitaetsbedingungen.

### Files touched
- `app/data/archive-content.js`
- `BACKLOG.md`
- `STATUS.md`

### Validation
- `node tools/archive-qa.js` -> OK, tasks=9000, 1500 per level
- marker check: `T-4-021`, `T-5-021`, `T-6-021`

### Blockers
None.

### Next logical step
- Continue P2 with next small L4-L6 batch (`T-4-022`, `T-5-022`, `T-6-022`) while preserving the didactic explanation template.

## Last completed task (v1.2.16)
Fourteenth focused L4-L6 archive expansion batch:

### Changes in this iteration
- **T-4-020** (Singulaerwerte und numerischer Rang): SVD-basierte Rangdiagnose mit toleranzbasierter Trennung.
- **T-5-020** (Diskreter Kalman-Filter und Kovarianz-Update): Unsicherheitspropagation, Gewinnbildung, Joseph-Form-Hinweis.
- **T-6-020** (Levenberg-Marquardt): Daempfung als Trust-Region-Mechanik zwischen Gradientabstieg und Gauss-Newton.

### Files touched
- `app/data/archive-content.js`
- `BACKLOG.md`
- `STATUS.md`

### Validation
- `node tools/archive-qa.js` -> OK, tasks=9000, 1500 per level
- marker check: `T-4-020`, `T-5-020`, `T-6-020`

### Blockers
None.

### Next logical step
- Continue P2 with next small L4-L6 batch (`T-4-021`, `T-5-021`, `T-6-021`) while preserving the didactic explanation template.

## Last completed task (v1.2.15)
Thirteenth focused L4-L6 archive expansion batch:

### Changes in this iteration
- **T-4-019** (Spektralradius und Potenziteration): Dominanter Eigenwert, Rayleigh-Quotient, Spektralabstand als Konvergenztreiber.
- **T-5-019** (Diskrete Zustandsregler und Pole Placement): Steuerbarkeit, Polwahl im Einheitskreis, Stellaufwand-Trade-off.
- **T-6-019** (Gauss-Newton fuer nichtlineare Ausgleichsprobleme): Struktur von Least-Squares, Jacobian-Schritt, Daempfungsoption.

### Files touched
- `app/data/archive-content.js`
- `BACKLOG.md`
- `STATUS.md`

### Validation
- `node tools/archive-qa.js` -> OK, tasks=9000, 1500 per level
- marker check: `T-4-019`, `T-5-019`, `T-6-019`

### Blockers
None.

### Next logical step
- Continue P2 with next small L4-L6 batch (`T-4-020`, `T-5-020`, `T-6-020`) while preserving the didactic explanation template.

## Last completed task (v1.2.14)
Twelfth focused L4-L6 archive expansion batch:

### Changes in this iteration
- **T-4-018** (Orthogonale Projektion und QR-Zerlegung): Projektion auf Spaltenraum, stabiles Least-Squares ueber Dreieckssystem.
- **T-5-018** (Luenberger-Beobachter): Fehlerdynamik `A-LC`, Beobachtbarkeit, Pole-Placement-Trade-offs.
- **T-6-018** (Newton fuer nichtlineare Systeme): Jacobian-basierte Korrekturschritte, Daempfung, lokale quadratische Konvergenz.

### Files touched
- `app/data/archive-content.js`
- `BACKLOG.md`
- `STATUS.md`

### Validation
- `node tools/archive-qa.js` -> OK, tasks=9000, 1500 per level
- marker check: `T-4-018`, `T-5-018`, `T-6-018`

### Blockers
None.

### Next logical step
- Continue P2 with next small L4-L6 batch (`T-4-019`, `T-5-019`, `T-6-019`) while preserving the didactic explanation template.

## Last completed task (v1.2.13)
Focused L1-L3 school-coverage expansion batch + larger archive volume:

### Changes in this iteration
- Added six new L1 seed tasks (`T-1-015` to `T-1-020`) across arithmetic fluency, fractions, percentages, geometry, and unit conversions.
- Added six new L2 seed tasks (`T-2-015` to `T-2-020`) across linear systems, binomials, parabola interpretation, slope, Pythagoras, and probability.
- Added six new L3 seed tasks (`T-3-015` to `T-3-020`) across quadratic equations, exponential modeling, trigonometry, vectors, conditional probability, and tangent equations.
- Increased scalable archive generation from `1000` to `1500` tasks per level.

### Files touched
- `app/data/archive-content.js`
- `BACKLOG.md`
- `STATUS.md`

### Validation
- `node tools/archive-qa.js` -> OK, tasks=9000, 1500 per level
- marker check: `T-1-020`, `T-2-020`, `T-3-020`

### Blockers
None.

### Next logical step
- Continue L1-L3 curriculum expansion with the next mapped school-topic batch while preserving small reviewable increments.

## Last completed task (v1.2.12)
Eleventh focused L4-L6 archive expansion batch:

### Changes in this iteration
- **T-4-017** (Konditionszahl und numerische Stabilitaet): Sensitivitaet von Ax=b, SVD-Bezug, Residuum-vs-Loesungsfehler.
- **T-5-017** (Beobachtbarkeit und Kalman-Rangbedingung): Beobachtbarkeitsmatrix, Rangkriterium, Abgrenzung zu Regelbarkeit.
- **T-6-017** (Konjugierte Gradientenmethode): Krylov-Idee, A-konjugierte Richtungen, Preconditioning-Hinweis.

### Files touched
- `app/data/archive-content.js`
- `BACKLOG.md`
- `STATUS.md`

### Validation
- `node tools/archive-qa.js` -> OK, tasks=6000, 1000 per level
- marker check: `T-4-017`, `T-5-017`, `T-6-017`

### Blockers
None.

### Next logical step
- Continue P2 with next small L4-L6 batch (`T-4-018`, `T-5-018`, `T-6-018`) while preserving the didactic explanation template.

## Last completed task (v1.2.11)
Tenth focused L4-L6 archive expansion batch:

### Changes in this iteration
- **T-4-016** (Least-Squares und Moore-Penrose-Pseudoinverse): Normalgleichungen, QR/SVD-Hinweis, Projektionsinterpretation.
- **T-5-016** (Kalman-Filter): Vorhersage/Update-Gleichungen, Bedeutung von Q/R, Stabilitaetsintuition.
- **T-6-016** (Quasi-Newton BFGS): Hesse-Approximation, Wolfe-Line-Search, Konvergenzintuition.

### Files touched
- `app/data/archive-content.js`
- `BACKLOG.md`
- `STATUS.md`

### Validation
- `node tools/archive-qa.js` -> OK, tasks=6000, 1000 per level
- marker check: `T-4-016`, `T-5-016`, `T-6-016`

### Blockers
None.

### Next logical step
- Continue P2 with next small L4-L6 batch (`T-4-017`, `T-5-017`, `T-6-017`) while preserving the didactic explanation template.

## Last completed task (v1.2.10)
Ninth focused L4-L6 archive expansion batch:

### Changes in this iteration
- **T-4-015** (Jordan-Normalform und algebraische Vielfachheit): Diagonalisierbarkeit, Jordan-Ketten, Blockstruktur.
- **T-5-015** (LQR-Regler und Riccati-Gleichung): Optimalregelung im Zustandsraum mit Gewichtungsmatrizen Q/R.
- **T-6-015** (Stochastischer Gradient und Mini-Batch-Optimierung): SGD-Grundlagen, Lernraten, Batch-Trade-offs.

### Files touched
- `app/data/archive-content.js`
- `BACKLOG.md`
- `STATUS.md`

### Validation
- `node tools/archive-qa.js` -> OK, tasks=6000, 1000 per level
- marker check: `T-4-015`, `T-5-015`, `T-6-015`

### Blockers
None.

### Next logical step
- Continue P2 with next small L4-L6 batch (`T-4-016`, `T-5-016`, `T-6-016`) and keep explanation template quality stable.

## Last completed task (v1.2.9)
Eighth focused L4-L6 archive expansion batch:

### Changes in this iteration
- **T-4-014** (Singulaerwertzerlegung/SVD und Rangstruktur): Geometrische Interpretation, Rang ueber Singulaerwerte, Eckart-Young-Approximation.
- **T-5-014** (Wurzelortskurve und Reglerentwurf): Polbewegung mit K, Winkel-/Betragsbedingung, Daempfungs-/Einschwing-Faustformeln.
- **T-6-014** (Adjungierte Methode): Effiziente Gradientenberechnung fuer PDE-beschraenkte Optimierung, Lagrangefunktion und Gradient-Check.

### Files touched
- `app/data/archive-content.js`
- `BACKLOG.md`
- `STATUS.md`

### Validation
- `node tools/archive-qa.js` -> OK, tasks=6000, 1000 per level
- marker check: `T-4-014`, `T-5-014`, `T-6-014`

### Blockers
None.

### Next logical step
- Continue P2 with next small L4-L6 batch (`T-4-015`, `T-5-015`, `T-6-015`) while keeping the didactic template consistent.

## Last completed task (v1.2.8)
Seventh L4-L6 archive expansion batch + residual umlaut fixes:

### Changes in this iteration
- **T-4-013** (Lineare Abbildungen und Matrizen): Kern/Bild/Dimensionssatz, Abbildungsmatrix, Injektivitaet über dim(Kern).
- **T-5-013** (PID-Regler Entwurf und Stabilitaet): P/I/D-Anteile, Uebertragungsfunktion, Ziegler-Nichols, Rauschen und D-Anteil-Warnung.
- **T-6-013** (Finite-Elemente-Methode Steifigkeitsmatrix): Galerkin-Variationsformulierung, Elementassemblierung, Dirichlet-RB, Symmetrie-/Definitheitsprüfung.
- Residuale Umlaut-Fixes: „Inkremente ?ber" → „Inkremente über" (T-5-007 explanation), „M?nze" → „Münze" (Placement P13).

### Files touched
- `app/data/archive-content.js`
- `STATUS.md`

### Validation
- `node -e "..."` → tasks=6000, 1000 per level (L1-L6)

### Blockers
None.

### Next logical step
- P2 weiter: T-4-014, T-5-014, T-6-014 (z.B. Eigenwerte/Spektralsatz, Zustandsraumdarstellung, Variationsrechnung/Euler-Lagrange).
- Oder P3: Interaktives Visualmodul Komplexe Zahlen (Argand-Ebene).

## Last completed task (v1.2.7)
Sixth focused L4-L6 archive expansion batch:

### Changes in this iteration
- **T-4-012** (Hilberträume und L2-Skalarprodukt): Sesquilinearität, Positivität, Riesz-Fischer-Vollständigkeit, Fourier/Parseval-Schnellcheck.
- **T-5-012** (Frequenzgang und Nyquist-Diagramm): G(jω) als Betrag/Phasen-Beschreibung, Nyquist-Stabilitätskriterium, Phasen-/Amplitudenrand-Faustregeln.
- **T-6-012** (Finite-Differenzen-Methode): Zentraldifferenz O(h²), explizites CFL-Kriterium, Crank-Nicolson unbedingt stabil, Monotonie-Schnellcheck.

### Files touched
- `app/data/archive-content.js`
- `STATUS.md`

### Validation
- `node tools/archive-qa.js` → OK, tasks=6000, 1000 per level

### Blockers
None.

## Last completed task (v1.2.6)
Impressum email color fix + umlaut encoding sweep:

### Changes in this iteration
- `index.html`: Impressum `.legal-card a` changed from `color: inherit` to `color: var(--text-muted)` so the email address renders in the same color as the name instead of browser-default link blue.
- `app/data/archive-content.js`: Swept all broken umlaut `?` placeholders — fixed ~25 occurrences across questions, answers, explanations, taxonomy titles, and the buildTaskArchive template string. Affected: ä/ö/ü in words like „lösen", „Lösung", „für", „Universitätsgrundlagen", „Wärmeleitungsgleichung", „Dämpfung", „Verstärkung", „Optimalitätsbedingungen" etc.

### Files touched
- `index.html`
- `app/data/archive-content.js`
- `STATUS.md`

### Validation
- Grep confirms 0 remaining `[a-z]?[a-zA-Z]` broken-umlaut patterns in archive-content.js
- `node tools/archive-qa.js` → OK, tasks=6000, 1000 per level

### Blockers
None.

### Next logical step
- Continue archive expansion: T-4-012, T-5-012, T-6-012.
- Or P3: Interaktives Visualmodul Komplexe Zahlen (Argand-Ebene).

## Last completed task (v1.2.5)
Fifth focused L4-L6 archive expansion batch with textbook-style explanations:

### Changes in this iteration
- **T-4-011** (Metrische Raeume und Vollstaendigkeit): Metrik-Axiome, Cauchy-Folge vs. Konvergenz, Banachraum-Definition, pi-in-Q-Gegenbeispiel, Bolzano-Weierstrass-Schnellcheck.
- **T-5-011** (Zustandsraumdarstellung und Regelbarkeit): Zustandsform dx/dt=Ax+Bu, Kalman-Regelbarkeitsmatrix, Vollrang-Kriterium, Abgrenzung Regelbarkeit vs. Beobachtbarkeit, SISO Pol-Nullstellen-Schnellcheck.
- **T-6-011** (Monte-Carlo-Integration): Erwartungswert-Interpretation, Fluch der Dimensionalitaet, O(1/sqrt(N))-Fehler, Varianzreduktion, pi-Schaetz-Schnellcheck.

### Files touched
- `app/data/archive-content.js`
- `STATUS.md`

### Validation
- `node tools/archive-qa.js` → OK, tasks=6000, 1000 per level, 30 placement questions

### Blockers
None.

### Next logical step
- P2 weiter: T-4-012, T-5-012, T-6-012 (z.B. Hilbertraeume / L2-Raum, Frequenzgang und Nyquist-Diagramm, Finite-Differenzen-Methode).
- Oder Wechsel zu P3: Interaktives Visualmodul fuer Komplexe Zahlen (Argand-Ebene).

## Last completed task (v1.2.4)
Fourth focused L4-L6 archive expansion batch with textbook-style explanations:

### Changes in this iteration
- **T-4-010** (Spektralsatz fuer symmetrische Matrizen): Orthogonale Diagonalisierbarkeit, reelle Eigenwerte, Gram-Schmidt im Eigenraum, Spur/det-Schnellcheck.
- **T-5-010** (Diskrete Fourier-Transformation und FFT): DFT-Formel, Frequenzbin-Intuition, Cooley-Tukey O(N log N), Konjugiertssymmetrie, Parseval-Schnellcheck.
- **T-6-010** (KKT-Bedingungen fuer nichtlineare Optimierung): Lagrangefunktion, alle vier KKT-Bedingungen, Komplementaritaet, Vorzeichen-Schnellcheck.
- Alle drei Tasks folgen dem Kernidee/Intuition/Schritte/Haeufiger Fehler/Schnellcheck-Template.

### Files touched
- `app/data/archive-content.js`
- `STATUS.md`
- `BACKLOG.md`

### Validation
- `node tools/archive-qa.js` → OK, tasks=6000, 1000 per level, 30 placement questions

### Blockers
None.

### Next logical step
- Continue P2 with T-4-011, T-5-011, T-6-011 (z.B. Metrische Raeume / Banachraum, Zustandsraumdarstellung / Regelbarkeit, Monte-Carlo-Simulation).
- Oder wechseln zu P3: Interaktives Visualmodul fuer "Komplexe Zahlen" (Argand-Ebene).

## Last completed task (v1.2.3)
Focused expansion + account-identity update in one iteration:

### Changes in this iteration
- Increased scalable archive volume from 520 to 1.000 tasks per level (`app/data/archive-content.js`), resulting in 6.000 tasks total.
- Switched account registration/login input to email-based identity in `app/index.html`.
- Added email format validation and persisted `email` in normalized account records while preserving per-account progress envelopes.
- Updated milestone tracking in `BACKLOG.md`.

### Files touched
- `app/data/archive-content.js`
- `app/index.html`
- `BACKLOG.md`
- `STATUS.md`

### Validation
- `node tools/archive-qa.js` expected and executed after change (see current run output).
- Grep checks for account UI/input and email validation logic in `app/index.html`.

### Blockers
None.

### Next logical step
- Implement real cloud-backed email auth + progress sync (Firebase Auth + Firestore) so accounts work across devices, not just local browser storage.

## Last completed task (v1.2.2)
Third focused L4-L6 archive expansion batch with textbook-style explanations:

### Changes in this iteration
- **T-4-009** (Eigenwertprobleme und charakteristisches Polynom): Full walkthrough — det(A-lambda*I)=0 to eigenvectors via Gaussian elimination; Spur/Determinante Schnellcheck.
- **T-5-009** (Z-Transformation und zeitdiskrete Systeme): Z-transform analogy to Laplace, shift property, unit-circle stability criterion, Ito correction missing from classical calculus.
- **T-6-009** (Stochastische DGL und Ito-Kalkuel): SDE drift+diffusion model, Ito lemma with correction term, classical-calculus reduction check.
- All three tasks follow the same didactic template (Kernidee/Intuition/Schritte/Haeufiger Fehler/Schnellcheck).

### Files touched
- `app/data/archive-content.js`
- `STATUS.md`
- `BACKLOG.md`

### Validation
- `node tools/archive-qa.js` → OK, tasks=3120, 520 per level
- Marker grep confirmed all three new IDs (T-4-009, T-5-009, T-6-009) and didactic structure present

### Blockers
None.

### Next logical step
- Continue L4-L6 expansion with another small batch (T-4-010, T-5-010, T-6-010) covering further university/research topics.
- Or proceed to next open P3 task: Add first interactive visual module for "Komplexe Zahlen" (Argand-Ebene).

## Last completed task (v1.2.2)
Third focused L4-L6 archive expansion batch with textbook-style explanations:

### Changes in this iteration
- **T-4-009** (Eigenwerte und Eigenvektoren): Characteristic polynomial approach, algebraic vs. geometric multiplicity, trace/det Schnellcheck — full Kernidee/Intuition/Schritte/Haeufiger Fehler/Schnellcheck structure.
- **T-5-009** (Z-Transformation diskreter Systeme): Role of the Z-transform for discrete LTI systems, shift property, Uebertragungsfunktion H(z), frequency-response interpretation on the unit circle.
- **T-6-009** (Ito-Lemma und stochastisches Kalkuel): Quadratic variation argument, Ito vs. Stratonovich distinction, worked Schnellcheck with f(X_t)=X_t².
- All three tasks follow the same didactic template as the T-x-007 and T-x-008 batches.

### Files touched
- `app/data/archive-content.js`
- `STATUS.md`
- `BACKLOG.md`

### Validation
- `node tools/archive-qa.js` → OK, tasks=3120, 520 per level, 30 placement questions
- Grep confirmed T-4-009, T-5-009, T-6-009 IDs and all five didactic-structure markers present

### Blockers
None.

### Next logical step
- Continue L4-L6 expansion with T-4-010, T-5-010, T-6-010 (e.g. Lineare Abbildungen / Spektralsatz, Diskrete Fourier-Transformation / FFT, Optimierungsprobleme mit Nebenbedingungen / KKT-Bedingungen).
- Or proceed to next open P3 task: Add first interactive visual module for "Komplexe Zahlen" (Argand-Ebene).

## Last completed task (v1.2.1)
Second focused L4-L6 archive expansion batch with textbook-style explanations:

### Changes in this iteration
- **T-4-008** (Taylorentwicklung von e^x): Taylor series at x=0, infinite convergence radius, full Kernidee/Intuition/Schritte/Haeufiger Fehler/Schnellcheck structure.
- **T-5-008** (Partialbruchzerlegung fuer inverse Laplace-Transformation): Why and how partial fractions are used for inverse Laplace, including Mehrfachpole caution.
- **T-6-008** (Schwache Formulierung und Galerkin-FEM): Full derivation from strong PDE through weak form to Galerkin stiffness matrix.
- All three tasks follow the same didactic template as T-4-007, T-5-007, T-6-007.

### Files touched
- `app/data/archive-content.js`
- `STATUS.md`
- `BACKLOG.md`

### Validation
- `node tools/archive-qa.js` → OK, tasks=3120, 520 per level
- Marker grep confirmed all three new IDs and didactic structure keys present

### Blockers
None.

### Next logical step
- Continue L4-L6 expansion with another small batch (T-4-009, T-5-009, T-6-009) covering topics such as Eigenwertprobleme (L4), Z-Transformation (L5), stochastische DGL / Ito-Kalkuel (L6).
- Or proceed to next open P3 task: Add first interactive visual module for "Komplexe Zahlen" (Argand-Ebene).

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

## Last completed task
Completed the highest-priority open P1 item by refining the homepage video block into a clean section with direct links to existing YouTube videos:
- replaced generic channel links in the "Neueste Videos" cards with concrete video URLs where available
- kept the third card as a direct channel-videos overview entry for broader browsing
- preserved the established visual style and existing section layout

## Last validation
- `rg -n -F "https://youtu.be/4MfNDj7GfQ8" index.html`
- `rg -n -F "https://youtu.be/3n05QLJ-u4E" index.html`
- `rg -n -F "https://www.youtube.com/@Second-OrderResonance/videos" index.html`
- manual section inspection in `index.html` to verify:
  - video section structure and styling remain unchanged
  - cards now point to direct existing videos + channel videos overview
  - copy still matches the site tone and educational framing

## Files touched in last task
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
Execute the remaining open P1 task:
- check for any residual 5-level references and migrate them consistently to the mandatory 6-level system across UI text and data structures.
Start the next highest-priority open P2 task:
- continue L4-L6 archive expansion with the next small batch of textbook-style tasks and explanations aligned to Karpfinger Buch + Arbeitsbuch.
Continue with the next highest-priority open tasks now queued after this run:
1. Add first interactive visual module for "Komplexe Zahlen" (Argand-Ebene) in website + archive context.
2. Prepare local progress architecture for future XP and streak systems.
3. Add daily streak system to archive and placement journey (local first, backend-ready later).
4. Add achievement placeholder architecture without overbuilding.
5. Define content QA workflow and authoring guidelines for scaling to 30.000 tasks.
