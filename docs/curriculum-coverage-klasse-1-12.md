# Curriculum Coverage Matrix: Klasse 1-12 to L1-L3 Archive Sections

## Purpose
This document maps the typical German school curriculum (Klasse 1-12, orientated on the KMK Bildungsstandards and common Bundesland-Lehrplaene for Mathematik) onto the existing L1-L3 archive taxonomy in `app/data/archive-content.js`. It is the foundation for judging curriculum coverage and finding real content gaps, not a finished per-Bundesland syllabus.

## Scope and limitations
- Lehrplaene differ between Bundeslaender and school types (Grundschule, Hauptschule/Realschule, Gymnasium). This matrix uses the common denominator of core topics taught in most German curricula at each grade.
- Klasse 11-12 here represents the Oberstufe/Abitur-relevant content that the archive already covers in L3; some Bundeslaender shift parts of this into Klasse 13 (G9) - the mapping still applies to the same topics regardless of the exact grade label.
- "Coverage" means a matching archive sublevel exists, not that every textbook exercise variant is represented.
- This is an early, scalable foundation per `AGENTS.md` - it should be refined in small batches as gaps are found, not treated as final.

## Legend
- **Abgedeckt**: a directly matching L1-L3 sublevel exists.
- **Teilweise**: a related sublevel exists but does not fully cover the grade-level scope.
- **Luecke**: no matching sublevel currently exists in the archive taxonomy.

## Grundschule (Klasse 1-4)

| Klasse | Kernthemen | Archiv-Sublevel | Status |
|---|---|---|---|
| 1-2 | Zahlraum bis 100, Grundrechenarten (Plus/Minus), erstes Kopfrechnen | `1.1.1.a` Kopfrechnen und Rechenstrategien | Abgedeckt |
| 3-4 | Zahlraum bis 1.000.000, schriftliche Rechenverfahren (Addition, Subtraktion, Multiplikation, Division) | `1.1.1.b` Schriftliches Rechnen | Abgedeckt |
| 3-4 | Einfache Brueche (Anteile, Kuerzen) | `1.1.2.a` Brueche addieren und kuerzen | Teilweise (Einstiegsniveau, Archiv-Sublevel deckt auch weiterfuehrende Bruchrechnung ab) |
| 3-4 | Flaechen und Umfang einfacher Figuren, Koerper erkennen | `1.2.1.a` Rechteck, Dreieck, Kreis; `1.2.2.a` Wuerfel, Quader, Zylinder | Abgedeckt |
| 3-4 | Diagramme lesen, einfache Daten erfassen | `1.4.1.a` Balken- und Kreisdiagramme | Abgedeckt |
| 3-4 | Einheiten (Laenge, Masse, Zeit, Geld) | `1.3.2.a` Laenge, Masse, Zeit, Volumen | Abgedeckt |

## Sekundarstufe I (Klasse 5-10)

| Klasse | Kernthemen | Archiv-Sublevel | Status |
|---|---|---|---|
| 5 | Bruchrechnung vertieft (Addition, Multiplikation, Division) | `1.1.2.a`, `1.1.2.c` Brueche multiplizieren und dividieren | Abgedeckt |
| 5 | Dezimalzahlen und Kommarechnung | `1.1.3.a` Dezimalzahlen und Kommarechnung; `1.1.3.b` Runden und Schaetzen | Abgedeckt |
| 5 | Winkel und Dreiecksarten, Koordinatensystem | `1.2.3.a` Winkelarten und -masse; `1.2.3.b` Dreieckstypen; `1.2.4.a` Punkte, Abstaende, Spiegelung | Abgedeckt |
| 6 | Prozentrechnung im Alltag | `1.1.2.b` Prozentwerte im Alltag | Abgedeckt |
| 6 | Negative Zahlen | `1.1.4.a` Rechnen mit negativen Zahlen | Abgedeckt |
| 6 | Teilbarkeit, Primfaktorzerlegung, ggT/kgV | `1.1.5.a` Primfaktorzerlegung; `1.1.5.b` ggT und kgV | Abgedeckt |
| 6 | Kreis, Volumen von Koerpern | `1.2.1.a`, `1.2.2.a` | Abgedeckt |
| 7 | Terme aufstellen und vereinfachen, lineare Gleichungen | `2.1.1.a` Lineare Gleichungen | Abgedeckt |
| 7 | Dreisatz, proportionale/antiproportionale Zuordnungen | `1.3.1.a`, `1.3.1.b` | Abgedeckt |
| 7 | Einfache Statistik, Haeufigkeiten, erste Wahrscheinlichkeit | `1.4.1.b` Mittelwert und Haeufigkeit; `1.4.2.a` Einfache Zufallsexperimente | Abgedeckt |
| 8 | Lineare Funktionen (Geradengleichung, Steigung) | `2.2.2.a`, `2.2.2.b` | Abgedeckt |
| 8 | Lineare Gleichungssysteme | `2.1.2.a`, `2.1.2.b` | Abgedeckt |
| 8 | Strahlensatz, aehnliche Figuren | `2.5.1.a`, `2.5.1.b` | Abgedeckt |
| 8 | Satz des Pythagoras | `2.5.3.a` Anwendungen des Satzes des Pythagoras | Abgedeckt |
| 8 | Grundlegende Wahrscheinlichkeit (Baumdiagramm, Laplace) | `2.6.2.a`, `2.6.2.b` | Abgedeckt |
| 9 | Quadratische Gleichungen und Funktionen | `2.1.3.a`, `2.1.3.b`, `2.2.3.a`, `2.2.3.b` | Abgedeckt |
| 9 | Potenzgesetze, Wurzeln | `2.3.1.a`, `2.3.1.b`, `2.3.2.a`, `2.3.2.b` | Abgedeckt |
| 9 | Trigonometrie am rechtwinkligen Dreieck, Bogenmass | `2.4.1.a`, `2.4.1.b` | Abgedeckt |
| 9 | Kreisgeometrie (Sehnen, Tangenten) | `2.5.2.a`, `2.5.2.b` | Abgedeckt |
| 10 | Exponentielles Wachstum/Zerfall, Halbwertszeit | `2.2.1.a`, `2.2.1.b`, `2.2.1.c` | Abgedeckt |
| 10 | Logarithmen | `2.3.3.a`, `2.3.3.b` | Abgedeckt |
| 10 | Sinus- und Kosinussatz, Einheitskreis | `2.4.2.a`, `2.4.3.a`, `2.4.3.b` | Abgedeckt |
| 10 | Kombinatorik (Permutationen, Binomialkoeffizient) | `2.6.1.a`, `2.6.1.b` | Abgedeckt |
| 10 | Ungleichungen (linear, Betrag) | `2.1.4.a`, `2.1.4.b` | Abgedeckt |

## Sekundarstufe II / Oberstufe (Klasse 11-12/13)

| Klasse | Kernthemen | Archiv-Sublevel | Status |
|---|---|---|---|
| 11 | Ableitungsregeln, Monotonie, Extremstellen | `3.1.1.a`, `3.1.1.b` | Abgedeckt |
| 11 | Kruemmung, Wendepunkte, Linearisierung | `3.1.1.c`, `3.1.1.d` | Abgedeckt |
| 11 | Folgen und Reihen, Grenzwerte | `3.1.5.a`, `3.1.5.b` | Abgedeckt |
| 11 | Vektoren und Skalarprodukt (Einstieg analytische Geometrie) | `3.2.3.a` | Abgedeckt |
| 12 | Vollstaendige Kurvendiskussion, Optimierungsaufgaben | `3.1.2.a`, `3.1.2.b` | Abgedeckt |
| 12 | Integralrechnung (Stammfunktion, bestimmtes Integral, Substitution, partielle Integration) | `3.1.3.a`-`3.1.3.d` | Abgedeckt |
| 12 | Exponential- und Logarithmusfunktionen (Ableitung/Integration) | `3.1.4.a`, `3.1.4.b` | Abgedeckt |
| 12 | Geraden und Ebenen im Raum, Kreuzprodukt | `3.2.3.b`, `3.2.3.c` | Abgedeckt |
| 12 | Bedingte Wahrscheinlichkeit, Bayes-Theorem | `3.2.1.a`, `3.2.1.b` | Abgedeckt |
| 12 | Zufallsvariablen (Binomialverteilung, Erwartungswert, Varianz, Normalverteilung) | `3.2.2.a`-`3.2.2.c` | Abgedeckt |
| 12 | Komplexe Zahlen (Grundlagen, Polarform) | `3.3.1.a`, `3.3.1.b` | Abgedeckt |
| 12 | Matrizen-Einstieg (2x2, Determinante) | `3.4.1.a`, `3.4.1.b` | Abgedeckt |
| 12 | Kegelschnitte (Parabel, Ellipse, Hyperbel) | `3.5.1.a` | Abgedeckt |

## Coverage summary
- All core Klasse 1-10 topics have at least a "Teilweise" or "Abgedeckt" mapping into the existing L1-L2 taxonomy.
- All core Klasse 11-12/13 Oberstufe topics map into the existing L3 taxonomy.
- No hard `Luecke` (fully missing topic area) was found for the common-denominator curriculum used here.
- The one open refinement is `1.1.2.a` (Grundschule Bruch-Einstieg vs. Klasse 5 vertiefte Bruchrechnung sharing one sublevel) - both grade levels currently map to the same sublevel because the archive does not yet split introductory vs. advanced fraction tasks into separate sublevels.

## Next steps
- If a Bundesland-specific Lehrplan requires a topic not listed here, add it as a new row and, if needed, a new archive sublevel in a small follow-up batch.
- Consider splitting `1.1.2.a` into a Grundschule-Einstieg and a Klasse-5-Vertiefung sublevel if task volume analysis shows a real difficulty gap.
- Continue with the parallel P1 task: build the engineering mathematics coverage matrix (L4-L5) through Master level.
