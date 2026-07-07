# Curriculum Coverage Matrix: Klasse 1-12 -> L1-L3 Archive Sections

## Purpose
This document maps the typical German school curriculum (Klasse 1 through Klasse 12/13, Bildungsstandards-oriented, Gymnasium-track terminology used as the common reference) onto the existing L1-L3 archive taxonomy in `app/data/archive-content.js`.

Goal: make it visible which curriculum topics are already represented by an archive sublevel, which are only partially represented, and which have no dedicated sublevel yet. This is a mapping/documentation deliverable, not a content-generation batch.

## Scope
- Grade clusters: Klasse 1-4, 5-6, 7-8, 9-10, 11, 12-13.
- Archive levels covered: L1 (Grundlagen), L2 (Aufbauwissen), L3 (Vertiefung).
- L4-L6 (Studium/Forschung) are out of scope here; see the separate engineering-mathematics coverage matrix task for that range.

## Methodology
Grade boundaries vary by German Bundesland and school type (Gymnasium vs. Realschule vs. Gesamtschule). This matrix uses the most common Gymnasium-track grouping as a practical reference, since it is the broadest superset of topics. Status legend:

- Covered: an existing sublevel directly matches the curriculum topic.
- Partial: an existing sublevel touches the topic but does not fully match the grade-level scope or a sub-aspect is missing.
- Gap: no dedicated sublevel exists yet for this curriculum topic.

## Klasse 1-4 (Grundschule)

| Curriculum-Thema | Archive-Level | Sublevel-ID(s) | Status |
|---|---|---|---|
| Grundrechenarten im Zahlenraum bis 1.000.000 | L1 | 1.1.1.a, 1.1.1.b | Covered |
| Einfache Brueche (Anteile, Viertel/Halbe) | L1 | 1.1.2.a | Partial (Sublevel zielt eher auf Klasse 5-6 Niveau) |
| Groessen und Einheiten (Laenge, Gewicht, Zeit, Geld) | L1 | 1.3.2.a, 1.3.2.b | Covered |
| Einfache Geometrie: Formen, Umfang/Flaeche Rechteck | L1 | 1.2.1.a | Covered |
| Punkte, Koordinaten, einfache Spiegelung | L1 | 1.2.4.a | Covered |
| Einfache Diagramme und Datenerfassung | L1 | 1.4.1.a | Covered |
| Sachaufgaben-Vorstufe (Verhaeltnisse) | L1 | 1.3.1.a | Partial (Dreisatz-Sublevel zielt eher auf Klasse 5-6) |

## Klasse 5-6 (Unterstufe / Orientierungsstufe)

| Curriculum-Thema | Archive-Level | Sublevel-ID(s) | Status |
|---|---|---|---|
| Bruchrechnung (Addition, Kuerzen, Multiplikation, Division) | L1 | 1.1.2.a, 1.1.2.c | Covered |
| Prozentrechnung im Alltag | L1 | 1.1.2.b | Covered |
| Dezimalzahlen und Kommarechnung | L1 | 1.1.3.a | Covered |
| Runden und Schaetzen | L1 | 1.1.3.b | Covered |
| Negative Zahlen | L1 | 1.1.4.a | Covered |
| Teilbarkeit, Primfaktorzerlegung, ggT/kgV | L1 | 1.1.5.a, 1.1.5.b | Covered |
| Flaechen/Umfang zusammengesetzter Figuren | L1 | 1.2.1.b | Covered |
| Koerper und Volumen (Wuerfel, Quader, Zylinder) | L1 | 1.2.2.a | Covered |
| Winkelarten, Winkelmasse, Dreieckstypen | L1 | 1.2.3.a, 1.2.3.b | Covered |
| Koordinatensystem, Abstaende, Spiegelung | L1 | 1.2.4.a | Covered |
| Dreisatz (proportional/antiproportional) | L1 | 1.3.1.a, 1.3.1.b | Covered |
| Einheiten umrechnen | L1 | 1.3.2.a, 1.3.2.b | Covered |
| Diagramme, Mittelwert, Haeufigkeit | L1 | 1.4.1.a, 1.4.1.b | Covered |
| Einfache Zufallsexperimente | L1 | 1.4.2.a | Covered |

## Klasse 7-8 (Mittelstufe, erste Haelfte)

| Curriculum-Thema | Archive-Level | Sublevel-ID(s) | Status |
|---|---|---|---|
| Terme aufstellen und vereinfachen, lineare Gleichungen | L2 | 2.1.1.a | Covered |
| Formeln umstellen | L2 | 2.1.1.b | Covered |
| Gleichungen mit Bruechen | L2 | 2.1.1.c | Covered |
| Zinsrechnung / Zinseszins | L1/L2 | 1.1.2.b (partial), 2.2.1.a (Wachstumsmodell) | Gap (kein dedizierter Zinseszins-Sublevel) |
| Lineare Funktionen (Geradengleichung, Steigung) | L2 | 2.2.2.a, 2.2.2.b | Covered |
| Potenzgesetze (ganzzahlige Exponenten) | L2 | 2.3.1.a | Covered |
| Strahlensaetze und Aehnlichkeit (Einstieg) | L2 | 2.5.1.a, 2.5.1.b | Covered |
| Kongruenzsaetze und Dreieckskonstruktionen | - | - | Gap (kein Sublevel vorhanden) |
| Achsen-/Punktsymmetrie (vertieft ueber Grundschule hinaus) | - | - | Gap (nur Grundschulniveau in 1.2.4.a abgedeckt) |
| Einfache Kombinatorik / Baumdiagramme (Einstieg) | L2 | 2.6.2.b | Partial (volle Kombinatorik erst Klasse 9-10) |

## Klasse 9-10 (Mittelstufe, Abschlussniveau)

| Curriculum-Thema | Archive-Level | Sublevel-ID(s) | Status |
|---|---|---|---|
| Quadratische Gleichungen (Loesungsformel, Diskriminante, Faktorisierung) | L2 | 2.1.3.a, 2.1.3.b | Covered |
| Quadratische Funktionen (Scheitel, Nullstellen, Verschiebung) | L2 | 2.2.3.a, 2.2.3.b | Covered |
| Lineare Gleichungssysteme (2 und 3 Unbekannte) | L2 | 2.1.2.a, 2.1.2.b | Covered |
| Ungleichungen (linear, Betrag) | L2 | 2.1.4.a, 2.1.4.b | Covered |
| Negative und gebrochene Exponenten | L2 | 2.3.1.b | Covered |
| Wurzeln (Quadrat-/Kubikwurzel, Vereinfachen) | L2 | 2.3.2.a, 2.3.2.b | Covered |
| Logarithmen (Definition, Rechenregeln, Gleichungen) | L2 | 2.3.3.a, 2.3.3.b | Covered |
| Exponentielles Wachstum/Zerfall, Halbwertszeit | L2 | 2.2.1.a, 2.2.1.b, 2.2.1.c | Covered |
| Trigonometrie am rechtwinkligen Dreieck | L2 | 2.4.1.a, 2.4.1.b | Covered |
| Sinus- und Kosinussatz (allgemeines Dreieck) | L2 | 2.4.2.a | Covered |
| Einheitskreis, Sinus-/Kosinus-/Tangensfunktion | L2 | 2.4.3.a, 2.4.3.b | Covered |
| Kreisgeometrie (Umfang, Flaeche, Sehnen, Tangenten) | L2 | 2.5.2.a, 2.5.2.b | Covered |
| Satz des Pythagoras / Satz des Thales (Anwendungen) | L2 | 2.5.3.a | Covered |
| Kombinatorik (Permutation, Kombination, Binomialkoeffizient) | L2 | 2.6.1.a, 2.6.1.b | Covered |
| Wahrscheinlichkeitsrechnung (Laplace, Baumdiagramm) | L2 | 2.6.2.a, 2.6.2.b | Covered |
| Umkehrfunktionen | L2 | 2.2.4.a | Covered |

## Klasse 11 (Einfuehrungsphase Oberstufe)

| Curriculum-Thema | Archive-Level | Sublevel-ID(s) | Status |
|---|---|---|---|
| Ableitungsregeln (Ketten-, Produkt-, Quotientenregel) | L3 | 3.1.1.a | Covered |
| Monotonie und Extremstellen | L3 | 3.1.1.b | Covered |
| Kruemmung und Wendepunkte | L3 | 3.1.1.c | Covered |
| Linearisierung und Naeherungen | L3 | 3.1.1.d | Covered |
| Ableitung/Integration von e^x und ln(x) | L3 | 3.1.4.a | Covered |
| Wachstums- und Zerfallsmodelle (vertieft) | L3 | 3.1.4.b | Covered |
| Arithmetische und geometrische Folgen (Einstieg) | L3 | 3.1.5.a | Covered |
| Vektoroperationen und Skalarprodukt (Einstieg) | L3 | 3.2.3.a | Covered |

## Klasse 12-13 (Qualifikationsphase, Abiturniveau)

| Curriculum-Thema | Archive-Level | Sublevel-ID(s) | Status |
|---|---|---|---|
| Vollstaendige Kurvendiskussion | L3 | 3.1.2.a | Covered |
| Optimierungsaufgaben (Anwendung) | L3 | 3.1.2.b | Covered |
| Stammfunktionen und Grundintegrationsregeln | L3 | 3.1.3.a | Covered |
| Bestimmtes Integral und Flaecheninhalt | L3 | 3.1.3.b | Covered |
| Substitutionsregel | L3 | 3.1.3.c | Covered |
| Partielle Integration | L3 | 3.1.3.d | Covered |
| Grenzwerte von Folgen und Reihen | L3 | 3.1.5.b | Covered |
| Bedingte Wahrscheinlichkeit, Bayes-Theorem | L3 | 3.2.1.a, 3.2.1.b | Covered |
| Binomialverteilung, Erwartungswert/Varianz, Normalverteilung | L3 | 3.2.2.a, 3.2.2.b, 3.2.2.c | Covered |
| Geraden und Ebenen im Raum, Kreuzprodukt | L3 | 3.2.3.b, 3.2.3.c | Covered |
| Komplexe Zahlen (Wahlthema in manchen Bundeslaendern/LKs) | L3 | 3.3.1.a, 3.3.1.b | Covered |
| Matrizen-Einstieg (Wahlthema in manchen Bundeslaendern) | L3 | 3.4.1.a, 3.4.1.b | Covered |
| Kegelschnitte (Wahlthema, analytische Geometrie) | L3 | 3.5.1.a | Covered |

## Identified gaps (open follow-up)
1. **Zinsrechnung / Zinseszins (Klasse 7-8)**: no sublevel dedicated to compound-interest style problems; currently only loosely reachable through `1.1.2.b` (Prozentwerte im Alltag) and `2.2.1.a` (Exponentielles Wachstum). Recommend a new sublevel such as `1.1.2.d` ("Zinsrechnung und Zinseszins") or extending `1.3` with a finance-context topic.
2. **Kongruenzsaetze und Dreieckskonstruktionen (Klasse 7-8)**: no sublevel exists at all. Recommend a new L1 or L2 sublevel, e.g. `1.2.3.c` ("Kongruenzsaetze und Konstruktionen").
3. **Vertiefte Achsen-/Punktsymmetrie (Klasse 7-8)**: only the Grundschule-level treatment in `1.2.4.a` exists; a Mittelstufe-level symmetry sublevel is missing.

These three gaps are proposed as a follow-up P2 backlog item so they can be closed in a small, focused content batch without changing this mapping document's scope.

## Definition of done for this matrix
- Every mandatory grade cluster (1-4, 5-6, 7-8, 9-10, 11, 12-13) has a topic table.
- Every archive L1-L3 sublevel that maps to school curriculum content is referenced at least once across the tables.
- Gaps are named explicitly rather than silently omitted.
