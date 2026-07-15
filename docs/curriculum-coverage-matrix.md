# Curriculum Coverage Matrix: Klasse 1-12 to L1-L3

## Purpose
This document maps the typical German school mathematics curriculum (Klasse 1-12/13)
onto the existing `L1-L3` archive taxonomy in `app/data/archive-content.js`. It is the
reference used to judge whether the archive's school-level sections (L1 Grundlagen,
L2 Aufbauwissen, L3 Vertiefung) cover the full school journey, and where the
remaining content gaps are.

This is a planning/reference document only. It does not change any code or task
content by itself; it is the basis for future small, mapped content batches.

## Scope and disclaimer
Mathematics curricula in Germany are set per Bundesland (16 different frameworks)
and additionally differ by school type (Gymnasium G8/G9, Gesamtschule, Realschule)
and by course level in Sek II (Grundkurs/Leistungskurs). There is no single
authoritative "Klasse X = exactly this topic" table.

This matrix uses a **representative mainstream Gymnasium (G9) sequencing** as
reference orientation, the same way `docs/archive-content-qa-workflow.md` uses the
Karpfinger books as reference orientation for L4-L6. Grade ranges are given as
typical spans (e.g. "Klasse 7-8") rather than a single fixed grade, since real
timing shifts by 1-2 years depending on Bundesland and school type.

Where a topic is commonly a Leistungskurs-only or Wahlpflicht-only theme (not
taught to every student), this is flagged explicitly in the notes column.

## How to read the tables
- **Sublevel** references the `sublevels[].id` values already defined in
  `SOR_ARCHIVE.taxonomy` (see `app/data/archive-content.js`).
- **Archiv-Topic** references the `topic` string actually used on task records for
  that sublevel today (found via the tasks in `SOR_ARCHIVE.tasks`), so the mapping
  is checkable against real content, not just taxonomy titles.
- **Klasse** is the typical grade span where this topic is first taught or
  consolidated.

## L1 - Grundlagen (Grundschule & Unterstufe, Klasse 1-6)

| Sublevel | Thema | Archiv-Topic | Klasse | Notiz |
|---|---|---|---|---|
| 1.1.1 (a, b) | Grundrechenarten (Kopfrechnen, schriftlich) | Grundrechenarten | 1-4 | Kernstoff Grundschule |
| 1.3.2 (a, b) | Einheiten und Größen | Einheiten | 1-4 | Länge/Masse/Zeit/Volumen ab Klasse 1, Umrechnen bis Klasse 6 |
| 1.2.1 (a) | Flächen/Umfang (Rechteck, Dreieck, Kreis) | Geometrie | 3-6 | Kreisfläche meist ab Klasse 6 |
| 1.4.1 (a, b) | Diagramme, Mittelwert, Häufigkeit | Statistik | 3-6 | Erste Datenauswertung Grundschule, vertieft Klasse 5-6 |
| 1.1.3 (a, b) | Dezimalzahlen, Runden/Schätzen | Dezimalzahlen | 4-6 | Übergang Grundschule/Unterstufe |
| 1.4.2 (a) | Einfache Zufallsexperimente | Wahrscheinlichkeit | 4-6 | Würfel/Münzwurf-Niveau |
| 1.1.2 (a, c) | Bruchrechnung (Addition, Kürzen, Multiplikation, Division) | Bruchrechnung | 5-6 | Kernthema Klasse 5-6 |
| 1.1.2 (b) | Prozentrechnung | Prozentrechnung | 6-7 | Grundlagen Klasse 6, vertieft mit Zins Klasse 7 |
| 1.1.5 (a, b) | Primfaktorzerlegung, ggT/kgV | Teilbarkeit | 5-6 | Klassisches Klasse-5/6-Thema |
| 1.2.1 (b) | Zusammengesetzte Figuren | Geometrie | 5-6 | Aufbau auf 1.2.1.a |
| 1.2.2 (a) | Volumen (Würfel, Quader, Zylinder) | Geometrie | 5-7 | Zylinder eher Klasse 7 |
| 1.2.3 (a, b) | Winkelarten, Dreieckstypen | Geometrie | 5-7 | |
| 1.2.4 (a) | Koordinatensystem, Abstände, Spiegelung | Koordinatensystem | 5-6 | |
| 1.1.4 (a) | Negative Zahlen | Negative Zahlen | 6-7 | |
| 1.3.1 (a, b) | Dreisatz (proportional/antiproportional) | Proportionalitaet / Dreisatz | 6-7 | |

## L2 - Aufbauwissen (Unter- & Mittelstufe, Klasse 7-10)

| Sublevel | Thema | Archiv-Topic | Klasse | Notiz |
|---|---|---|---|---|
| 2.1.1 (a, b, c) | Gleichungen lösen/umstellen, Formeln, Bruchgleichungen | Gleichungen | 7-8 | Kernthema Klasse 7 |
| 2.2.2 (a, b) | Lineare Funktionen, parallel/senkrecht | Lineare Funktionen | 7-8 | |
| 2.6.2 (a, b) | Laplace-Experiment, Baumdiagramm | Wahrscheinlichkeit | 7-9 | Grundlegende Stochastik |
| 2.1.2 (a) | Lineare Gleichungssysteme (Substitution/Addition) | Gleichungssysteme | 8-9 | |
| 2.1.4 (a, b) | Ungleichungen, Betragsungleichungen | Ungleichungen | 8-9 | |
| 2.3.1 (a, b) | Potenzgesetze, negative/gebrochene Exponenten | Potenzen | 8-9 | |
| 2.5.1 (a, b) | Strahlensätze, ähnliche Figuren | Geometrie | 8-9 | |
| 2.5.3 (a) | Satz des Pythagoras, Satz des Thales | Geometrie | 8-9 | Bereits als interaktives Modul auf der Website vorhanden |
| 2.1.3 (a, b) | Quadratische Gleichungen, Faktorisierung | Quadratische Gleichungen | 9 | |
| 2.2.3 (a, b) | Quadratische Funktionen, Scheitel/Nullstellen | Quadratische Funktionen | 9 | |
| 2.3.2 (a, b) | Wurzeln, Wurzelterme vereinfachen | Wurzeln | 9 | |
| 2.4.1 (a, b) | Trigonometrie am rechtwinkligen Dreieck, Bogenmaß | Trigonometrie | 9-10 | |
| 2.6.1 (a, b) | Kombinatorik, Binomialkoeffizient | Kombinatorik | 9-10 | |
| 2.2.1 (a, b, c) | Exponentielles Wachstum/Zerfall, Halbwertszeit | Exponentielles Verhalten | 9-10 | |
| 2.5.2 (a, b) | Kreisgeometrie, Sehnen/Tangenten | Geometrie | 9-10 | |
| 2.1.2 (b) | Gleichungssysteme mit 3 Unbekannten | Gleichungssysteme | 10 | Übergangsstoff Richtung Oberstufe |
| 2.2.4 (a) | Umkehrfunktionen und Komposition | Funktionen | 10 | |
| 2.3.3 (a, b) | Logarithmen, log. Gleichungen | Logarithmen | 10 | |
| 2.4.2 (a) | Sinus-/Kosinussatz, allgemeines Dreieck | Trigonometrie | 10 | |
| 2.4.3 (a, b) | Einheitskreis, Sinus-/Kosinus-/Tangensfunktion | Trigonometrie | 10-11 | Brückenthema zur Oberstufe (Analysis trig. Funktionen) |

## L3 - Vertiefung (Oberstufe / Schulabschlussniveau, Klasse 11-13)

| Sublevel | Thema | Archiv-Topic | Klasse | Notiz |
|---|---|---|---|---|
| 3.1.1 (a, b, c, d) | Ableitungsregeln, Monotonie/Extremstellen, Krümmung/Wendepunkte, Linearisierung | Analysis | 11 | Einführungsphase, Kernstoff GK und LK |
| 3.2.3 (a, b) | Vektoroperationen, Geraden/Ebenen im Raum | Vektoren | 11-12 | |
| 3.1.2 (a, b) | Kurvendiskussion, Optimierungsaufgaben | Analysis / Kurvendiskussion | 11-12 | |
| 3.1.4 (a, b) | e-Funktion/ln-Funktion, Wachstums-/Zerfallsmodelle | Analysis | 11-12 | |
| 3.1.3 (a, b, c, d) | Stammfunktionen, bestimmtes Integral, Substitution, partielle Integration | Analysis | 12 | Substitution/partielle Integration oft nur LK |
| 3.2.1 (a, b) | Bedingte Wahrscheinlichkeit, Bayes-Theorem | Stochastik | 12 | Bayes-Theorem meist LK |
| 3.2.2 (a, b, c) | Binomialverteilung, Erwartungswert/Varianz, Normalverteilung | Stochastik | 12 | |
| 3.2.3 (c) | Kreuzprodukt und geometrische Anwendungen | Vektoren | 12 | Meist LK-Thema |
| 3.1.5 (a, b) | Folgen/Reihen, Grenzwerte | Analysis | 12 | Teils Wahlthema, je nach Bundesland |
| 3.3.1 (a, b) | Komplexe Zahlen: kartesische Form, Polarform/Euler | Komplexe Zahlen | 12-13 | LK/Wahlthema, nicht in allen Bundesländern Pflicht; Brücke zu L4 (4.4) |
| 3.4.1 (a, b) | Matrizen: Addition/Multiplikation, Determinante 2x2 | Matrizen | 12-13 | LK/Wahlthema; Brücke zu L4 (4.1) |
| 3.5.1 (a) | Kegelschnitte: Parabel, Ellipse, Hyperbel | Analytische Geometrie | 12-13 | LK/Wahlthema; teils Studieneinstieg |

## Section-level tags used directly on some seed tasks
A handful of early seed tasks are tagged with a parent section id instead of a
specific leaf sublevel: `1.1.1`, `1.2`, `2.2`, `3.1`, `3.2`. These are covered by
the same Klasse range as their leaf children in the tables above (e.g. a task
tagged `1.2` falls under the Klasse 3-7 span covered by `1.2.1`-`1.2.4`).

## Coverage check
Two things were checked programmatically against `app/data/archive-content.js`:
1. Every **leaf sublevel** (an id with no child ids in the taxonomy) under
   `level: "1"`, `"2"`, `"3"` appears in a row above.
2. Every **sublevel id actually used by a task** at levels 1-3 — including the
   parent-level tags listed just above — is covered by a row or the note above.

Combined, this covers all 92 sublevel ids that either carry a leaf definition
or are directly referenced by real archive tasks. Pure organizational parent
ids with no direct task usage (e.g. `1.1`, `2.1`, `3.2.3` as bare category
headers) are intentionally not listed as separate rows since they have no
Klassenstufen-assignment of their own beyond their children's.

## Known gaps for future content batches
- L1: no dedicated sublevel yet for basic written multiplication/division
  algorithms taught in Klasse 3 specifically (currently folded into 1.1.1.b);
  fine for now, revisit only if Grundschule-specific granularity is requested.
- L2: Klasse 7 "Zuordnungen" content beyond Dreisatz (e.g. Prozent mit
  Dreisatzbezug, Zinsrechnung) is thin; candidate for a small L1/L2 batch.
- L3: 3.3/3.4/3.5 are explicitly LK/Wahlthema-heavy; if the product wants a
  clearly Pflichtstoff-only Abitur track, these three sections should be
  labelled as "Erweiterung" in the UI rather than mixed with core L3 content.
  Not changed in this pass to keep the change purely documentation-based.

## Relationship to the next backlog item
This matrix stops at L3. The follow-up backlog item ("Build an engineering
mathematics coverage matrix through Master level and map it to L4-L5 sections")
should reuse this document's format (Sublevel | Thema | Archiv-Topic | Studienphase
| Notiz) rather than introducing a new structure.
