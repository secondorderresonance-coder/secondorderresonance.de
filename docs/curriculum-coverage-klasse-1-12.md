# Curriculum-Abdeckungsmatrix Klasse 1-12 (L1-L3)

## Ziel
- Transparente Zuordnung von deutschen Schul-Klassenstufen (1-12/13) zu den bestehenden Archiv-Sublevels in L1-L3.
- Grundlage, um spaeter gezielt fehlende Themen zu schliessen, statt Aufgaben unkoordiniert zu erzeugen.
- Dies ist eine Zuordnungs-/Planungsmatrix, keine neue Aufgabengenerierung. Inhalte bleiben unveraendert.

## Methodik
- Die Zuordnung orientiert sich an den KMK-Bildungsstandards und der ueblichen Stufung an deutschen Schulen:
  - Klasse 1-4: Grundschule -> **L1 (Grundlagen)**
  - Klasse 5-6: Orientierungsstufe/fruehe Unterstufe -> **L1 (Grundlagen)**, teils bereits Uebergang zu L2
  - Klasse 7-8: Mittelstufe -> **L2 (Aufbauwissen)**
  - Klasse 9-10: Mittelstufe/Realschulabschluss -> **L2 (Aufbauwissen)**
  - Klasse 11: Einfuehrungsphase Oberstufe -> Uebergang **L2 -> L3**
  - Klasse 12-13: Qualifikationsphase/Abitur -> **L3 (Vertiefung)**
- Bundeslaender variieren in der genauen Verortung einzelner Themen (z. B. Logarithmen, Vektorrechnung, G8/G9). Wo relevant, ist das als "bundeslandabhaengig" markiert statt als harte Grenze.
- Sublevel-IDs entsprechen exakt `window.SOR_ARCHIVE.taxonomy` in `app/data/archive-content.js`.

## Abdeckungsstatus-Legende
- **Abgedeckt**: passende Sublevel-IDs existieren bereits in der Taxonomie.
- **Teilweise**: Thema existiert, aber nicht in der fuer diese Klassenstufe typischen Feingranularitaet.
- **Luecke**: kein passendes Sublevel vorhanden, spaeterer Ausbau noetig.

## Matrix

| Klasse | Kernthemen (typisch) | Gemappte Sublevel-IDs | Status |
|---|---|---|---|
| 1-2 | Zahlraum bis 100, Addition/Subtraktion ohne/mit Uebertrag, Formen erkennen, Uhrzeit/Groessen | `1.1.1.a` (Kopfrechnen), `1.3.2.a` (Groessen) | Teilweise – nur generisch, keine altersspezifische Feinstufe fuer Klasse 1-2 |
| 3-4 | Zahlraum bis 1 Mio, schriftliche Rechenverfahren, Multiplikation/Division, Bruch-Einstieg, Flaechen/Umfang, Dreisatz (einfach), Diagramme | `1.1.1.b`, `1.1.2.a`, `1.1.2.c`, `1.2.1.a`, `1.2.1.b`, `1.3.1.a`, `1.4.1.a`, `1.4.1.b` | Abgedeckt |
| 5-6 | Bruch-/Dezimalrechnung vertieft, negative Zahlen, Prozentrechnung, Primfaktorzerlegung/ggT/kgV, Winkel/Dreiecke, Koerper/Volumen, Koordinatensystem, einfache Wahrscheinlichkeit | `1.1.2.b`, `1.1.3.a`, `1.1.3.b`, `1.1.4.a`, `1.1.5.a`, `1.1.5.b`, `1.2.2.a`, `1.2.3.a`, `1.2.3.b`, `1.2.4.a`, `1.4.2.a` | Abgedeckt |
| 7-8 | Terme, lineare Gleichungen, Zuordnungen/lineare Funktionen, Prozent-/Zinsrechnung vertieft, Aehnlichkeit/Strahlensaetze, Kreisgeometrie, Kombinatorik/Baumdiagramm | `2.1.1.a`, `2.1.1.b`, `2.1.1.c`, `2.2.2.a`, `2.2.2.b`, `2.5.1.a`, `2.5.1.b`, `2.5.2.a`, `2.5.2.b`, `2.6.1.a`, `2.6.1.b`, `2.6.2.a`, `2.6.2.b` | Abgedeckt |
| 9-10 | Lineare Gleichungssysteme, quadratische Gleichungen/Funktionen, Potenzgesetze, Wurzeln, Logarithmen, Trigonometrie am rechtwinkligen Dreieck, Satz des Pythagoras/Thales, Exponentialverhalten | `2.1.2.a`, `2.1.2.b`, `2.1.3.a`, `2.1.3.b`, `2.2.1.a`, `2.2.1.b`, `2.2.1.c`, `2.2.3.a`, `2.2.3.b`, `2.3.1.a`, `2.3.1.b`, `2.3.2.a`, `2.3.2.b`, `2.3.3.a`, `2.3.3.b`, `2.4.1.a`, `2.4.1.b`, `2.5.3.a` | Abgedeckt (Logarithmen bundeslandabhaengig teils erst Kl. 10/11) |
| 11 | Funktionenlehre vertieft, Sinus-/Kosinussatz, Einheitskreis/Periodizitaet, Ungleichungen, Folgen/Reihen-Einstieg, erste Ableitungsbegriffe | `2.4.2.a`, `2.4.3.a`, `2.4.3.b`, `2.1.4.a`, `2.1.4.b`, `3.1.5.a`, `3.1.5.b`, `3.1.1.a` | Abgedeckt (Uebergangsklasse, bewusst auf L2 und L3 verteilt) |
| 12-13 | Ableitungsregeln, Kurvendiskussion, Extremstellen/Wendepunkte, Integralrechnung, Exponential-/Logarithmusfunktionen (Analysis), Wachstums-/Zerfallsmodelle, bedingte Wahrscheinlichkeit/Bayes, Zufallsvariablen/Verteilungen, Vektorgeometrie im Raum, (LK) komplexe Zahlen/Matrizen/Kegelschnitte | `3.1.1.b`, `3.1.1.c`, `3.1.1.d`, `3.1.2.a`, `3.1.2.b`, `3.1.3.a`, `3.1.3.b`, `3.1.3.c`, `3.1.3.d`, `3.1.4.a`, `3.1.4.b`, `3.2.1.a`, `3.2.1.b`, `3.2.2.a`, `3.2.2.b`, `3.2.2.c`, `3.2.3.a`, `3.2.3.b`, `3.2.3.c`, `3.3.1.a`, `3.3.1.b`, `3.4.1.a`, `3.4.1.b`, `3.5.1.a` | Abgedeckt |

## Identifizierte Luecken (Prioritaet fuer naechste Batches)
1. **Klasse 1-2 (fruehe Grundschule)**: Die Taxonomie beginnt strukturell eher auf Klasse-3/4-Niveau (schriftliches Rechnen, Bruch-Einstieg). Es fehlt eine eigene Feinstufe fuer Zahlraum bis 20/100, einfache Additions-/Subtraktionsstrategien ohne Uebertrag und Formen-/Uhrzeit-Grundlagen. Empfehlung: neue Sublevels z. B. `1.1.1.c` (Zahlraum bis 100) oder eigener Zweig `1.0.x`, sobald Content-Kapazitaet fuer diese Zielgruppe eingeplant wird.
2. **Logarithmen-Timing**: aktuell in L2 (`2.3.3`) verortet; in manchen Bundeslaendern erst Kl. 10/11. Kein struktureller Fix noetig, nur Hinweis fuer Content-Schwierigkeitsgrad-Tuning.
3. **Seed-Task-Feinabgleich**: Diese Matrix prueft nur die Taxonomie-Struktur, nicht die tatsaechliche Schwierigkeit der bestehenden `T-1-xxx`/`T-2-xxx`/`T-3-xxx`-Seed-Aufgaben je Klassenstufe. Ein inhaltlicher Abgleich einzelner Seed-Aufgaben gegen die hier zugeordnete Klassenstufe ist ein moeglicher Folgeschritt.

## Naechster kleiner Umsetzungsschritt
- Bei Bedarf eine eigene fruehe Grundschul-Feinstufe (Klasse 1-2) in die L1-Taxonomie aufnehmen und mit einem kleinen Seed-Task-Batch fuellen (siehe Luecke 1).
