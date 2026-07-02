# Curriculum Coverage Matrix: Klasse 1-12 -> L1-L3 Archive

## Purpose
Maps the standard German school curriculum (Klassenstufen 1-12) to the existing L1-L3
sublevels already defined in `app/data/archive-content.js`. This gives a first
grade-to-sublevel reference so future school-facing features (e.g. a "Klassenstufe"
filter or grade-based Lernstrasse framing) can reuse the current taxonomy instead of
inventing a second one.

## Scope and orientation
- Grade content is oriented on the KMK Bildungsstandards (Hauptschulabschluss,
  Mittlerer Schulabschluss, Abitur) since exact Lehrplaene differ by Bundesland.
- Grade bands are grouped the way most German Lehrplaene group them (topics commonly
  span 1-2 school years), not as a rigid single-grade breakdown.
- This document only maps existing sublevel IDs to grades. It does not add, rename,
  or restructure any taxonomy entries.

## Matrix

| Klasse | Kerntopics | L1-L3 Sublevels | Status |
|---|---|---|---|
| 1-2 | Zahlraum bis 100, Addition/Subtraktion, erste geometrische Formen | 1.1.1.a, 1.2.1.a (nur als spaeterer Einstieg nutzbar) | Partial |
| 3-4 | Einmaleins, schriftliches Rechnen, Zahlraum bis 1 Mio., Flaechen/Umfang, Groessen, erste Brueche | 1.1.1.a, 1.1.1.b, 1.2.1.a, 1.2.1.b, 1.3.2.a | Covered |
| 5 | Grundrechenarten vertieft, Flaechen/Umfang, Koordinatensystem, Diagramme | 1.1.1.a, 1.1.1.b, 1.2.1.a, 1.2.1.b, 1.2.4.a, 1.4.1.a, 1.4.1.b | Covered |
| 6 | Brueche, Dezimalzahlen, Teilbarkeit/Primzahlen, Winkel, Kreis, erste Wahrscheinlichkeit | 1.1.2.a, 1.1.2.b, 1.1.2.c, 1.1.3.a, 1.1.3.b, 1.1.5.a, 1.1.5.b, 1.2.3.a, 1.2.3.b, 1.4.2.a | Covered |
| 7 | negative/rationale Zahlen, Terme, Dreisatz, Prozentrechnung, Dreieckskonstruktion | 1.1.4.a, 1.3.1.a, 1.3.1.b, 1.3.2.b, 1.2.3.b, 2.1.1.a | Partial (siehe Gap 2) |
| 8 | lineare Gleichungen, lineare Funktionen, Strahlensaetze, Koerper/Volumen, Wahrscheinlichkeit | 2.1.1.a, 2.1.1.b, 2.1.1.c, 2.2.2.a, 2.2.2.b, 2.5.1.a, 2.5.1.b, 1.2.2.a | Covered |
| 9 | quadratische Gleichungen/Funktionen, Potenzen/Wurzeln, Satz des Pythagoras, Kreisgeometrie, LGS | 2.1.2.a, 2.1.2.b, 2.1.3.a, 2.1.3.b, 2.3.1.a, 2.3.1.b, 2.3.2.a, 2.3.2.b, 2.5.2.a, 2.5.2.b, 2.5.3.a | Covered |
| 10 (MSA) | Trigonometrie am rechtwinkligen Dreieck, Exponentialfunktionen/Wachstum, Logarithmen-Einstieg, Kombinatorik/Wahrscheinlichkeit | 2.4.1.a, 2.4.1.b, 2.2.1.a, 2.2.1.b, 2.2.1.c, 2.3.3.a, 2.3.3.b, 2.6.1.a, 2.6.1.b, 2.6.2.a, 2.6.2.b | Covered |
| 11 (Einfuehrungsphase) | Ableitungen (Grundlagen), Funktionsuntersuchung, Sinus-/Kosinussatz, Einheitskreis, Folgen | 3.1.1.a, 3.1.1.b, 3.1.2.a, 2.4.2.a, 2.4.3.a, 2.4.3.b, 3.1.5.a, 3.1.5.b | Covered |
| 12-13 (Qualifikationsphase/Abitur) | Kurvendiskussion vertieft, Integralrechnung, Exponential-/Logarithmusfunktionen, Vektorgeometrie, Stochastik (Verteilungen, Bayes), komplexe Zahlen (LK), Matrizen (LK, je nach Bundesland) | 3.1.1.c, 3.1.1.d, 3.1.2.b, 3.1.3.a, 3.1.3.b, 3.1.3.c, 3.1.3.d, 3.1.4.a, 3.1.4.b, 3.2.1.a, 3.2.1.b, 3.2.2.a, 3.2.2.b, 3.2.2.c, 3.2.3.a, 3.2.3.b, 3.2.3.c, 3.3.1.a, 3.3.1.b, 3.4.1.a, 3.4.1.b, 3.5.1.a | Covered |

## Identified gaps
1. **Klasse 1-2 Anfangsunterricht** (Ziffern/Zahlraum-100 erlernen) has no direct
   sublevel. The archive starts at strategy/procedure level (`1.1.1.a` Kopfrechnen
   und Rechenstrategien), not symbol acquisition. This is likely fine for the
   product's target audience but should stay a documented, intentional gap rather
   than an implicit one.
2. **Prozentrechnung (Klasse 7)** is only implicitly covered through `1.3.2`
   (Einheiten und Groessen / Einheiten umrechnen) and `1.3.1` (Dreisatz). There is
   no explicit "Prozent- und Zinsrechnung" leaf sublevel. A future, purely additive
   content batch could introduce `1.3.1.c` for this without any taxonomy
   restructuring.
3. **Bundesland variance in Klasse 12-13**: complex numbers and matrices are
   Leistungskurs-only (or absent) in several Bundeslaender. The matrix marks Klasse
   12-13 as "Covered" for the union of common curricula; individual schools will
   only use a subset of `3.3.*`/`3.4.*`.

## Non-goals for this task
- No new archive tasks were added and no taxonomy IDs were changed.
- Adding `1.3.1.c` (Gap 2) is a separate, small follow-up content task, not part of
  this mapping.
- Engineering mathematics beyond Abitur level (Klasse 13+ / Studium) is out of
  scope here and tracked as its own P1 backlog item (L4-L5 coverage matrix).
