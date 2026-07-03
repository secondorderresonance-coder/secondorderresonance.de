# Curriculum Coverage Matrix: Klasse 1-12 → Archiv L1-L3

## Zweck

Dieses Dokument bildet ab, welche Schulklassen (Klasse 1-12/13, deutsches
Schulsystem) auf welche Abschnitte des SOR-Archivs (Level 1-3) abgebildet
werden. Es ist die Grundlage dafuer, dass Nutzer:innen anhand ihrer
Klassenstufe direkt zu passenden Archiv-Abschnitten finden, und dass neue
Aufgaben-Batches gezielt Luecken im Lehrplan schliessen koennen.

Diese Matrix ist ein **Referenzdokument**, kein neuer UI-Baustein. Sie
beschreibt die bestehende Taxonomie in `app/data/archive-content.js`
(`SOR_ARCHIVE.taxonomy`, Level 1-3) und ordnet ihr Schulklassen zu.

## Hinweis zur Vergleichbarkeit

Lehrplaene unterscheiden sich zwischen Bundeslaendern und Schulformen
(G8/G9, Gymnasium/Realschule/Gesamtschule). Diese Matrix orientiert sich an:

- den KMK-Bildungsstandards fuer den Mittleren Schulabschluss und die
  Allgemeine Hochschulreife im Fach Mathematik, und
- der ueblichen Reihenfolge an einem G9-Gymnasium (Sekundarstufe I:
  Klasse 5-10, Sekundarstufe II: Klasse 11-12/13).

Einzelne Themen koennen an manchen Schulen ein bis zwei Klassenstufen
frueher oder spaeter behandelt werden. Die Zuordnung ist deshalb als
**Richtwert**, nicht als exakte Vorgabe zu verstehen.

## Archiv-Level im Kontext der Klassenstufen

| Archiv-Level | Bezeichnung | Grobe Klassenstufen |
|---|---|---|
| 🟢 L1 – Grundlagen | Grundschule & Unterstufe | Klasse 1-6 |
| 🟡 L2 – Aufbauwissen | Unter- & Mittelstufe | Klasse 7-10 |
| 🟠 L3 – Vertiefung | Oberstufe / Schulabschlussniveau | Klasse 10-12/13 |

## Mapping-Tabelle

| Klasse | Kernthemen (Lehrplan) | SOR-Archiv-Abschnitte |
|---|---|---|
| 1 | Zahlraum bis 20, Addition/Subtraktion, erste Rechenstrategien | `1.1.1.a` |
| 2 | Zahlraum bis 100, kleines Einmaleins, Umgang mit Geld/Zeit | `1.1.1.a`, `1.3.2.a` |
| 3 | Zahlraum bis 1.000, schriftliche Addition/Subtraktion, Flaechen/Umfang-Einstieg | `1.1.1.b`, `1.2.1.a` |
| 4 | Zahlraum bis 1.000.000, Bruch-Einstieg, Dezimalzahlen-Einstieg, Diagramme lesen | `1.1.2.a`, `1.1.3.a`, `1.4.1.a` |
| 5 | Bruchrechnung vertieft, Dezimalzahlen, Flaechen/Koerper, Koordinatensystem | `1.1.2.a`, `1.1.2.b`, `1.1.2.c`, `1.1.3.a`, `1.1.3.b`, `1.2.1.a`, `1.2.1.b`, `1.2.2.a`, `1.2.4.a` |
| 6 | Negative Zahlen, Teilbarkeit/Primzahlen, Winkel/Dreiecke, Dreisatz, erste Statistik/Wahrscheinlichkeit | `1.1.4.a`, `1.1.5.a`, `1.1.5.b`, `1.2.3.a`, `1.2.3.b`, `1.3.1.a`, `1.3.1.b`, `1.4.1.b`, `1.4.2.a` |
| 7 | Terme, lineare Gleichungen, Prozent-/Zinsrechnung, Einheiten umrechnen | `2.1.1.a`, `2.1.1.b`, `1.1.2.b`, `1.3.2.b` |
| 8 | Lineare Funktionen, lineare Gleichungssysteme, Potenzgesetze, Strahlensaetze/Aehnlichkeit | `2.2.2.a`, `2.2.2.b`, `2.1.2.a`, `2.3.1.a`, `2.3.1.b`, `2.5.1.a`, `2.5.1.b` |
| 9 | Quadratische Funktionen/Gleichungen, Gleichungen mit Bruechen, Wurzeln, Satz des Pythagoras, Kreisgeometrie, Grundwahrscheinlichkeit | `2.1.3.a`, `2.1.3.b`, `2.1.1.c`, `2.2.3.a`, `2.2.3.b`, `2.3.2.a`, `2.3.2.b`, `2.5.2.a`, `2.5.2.b`, `2.5.3.a`, `2.6.2.a`, `2.6.2.b` |
| 10 | Trigonometrie (rechtwinklig + allgemein), Exponentialfunktionen, Logarithmen, Kombinatorik, Ungleichungen | `2.4.1.a`, `2.4.1.b`, `2.4.2.a`, `2.4.3.a`, `2.4.3.b`, `2.2.1.a`, `2.2.1.b`, `2.2.1.c`, `2.3.3.a`, `2.3.3.b`, `2.6.1.a`, `2.6.1.b`, `2.1.4.a`, `2.1.4.b`, `2.1.2.b`, `2.2.4.a` |
| 11 (Einfuehrungsphase) | Ableitungen-Einstieg, einfache Kurvendiskussion, Vektoren im Raum, Folgen | `3.1.1.a`, `3.1.1.b`, `3.1.2.a`, `3.2.3.a`, `3.2.3.b`, `3.1.5.a` |
| 12/13 (Qualifikationsphase, Abitur) | Vollstaendige Kurvendiskussion/Optimierung, Integralrechnung, Exponential-/Logarithmusfunktionen in Analysis, Grenzwerte, Stochastik (bedingte W., Verteilungen), analytische Geometrie, Kegelschnitte; je nach Bundesland/Leistungskurs zusaetzlich komplexe Zahlen und Matrizen | `3.1.1.c`, `3.1.1.d`, `3.1.2.b`, `3.1.3.a`, `3.1.3.b`, `3.1.3.c`, `3.1.3.d`, `3.1.4.a`, `3.1.4.b`, `3.1.5.b`, `3.2.1.a`, `3.2.1.b`, `3.2.2.a`, `3.2.2.b`, `3.2.2.c`, `3.2.3.c`, `3.5.1.a`, `3.3.1.a`, `3.3.1.b`, `3.4.1.a`, `3.4.1.b` |

## Vollstaendigkeits-Check

Jeder Sublevel-Endpunkt (Blattknoten, Format `x.y.z` oder `x.y.z.buchstabe`)
aus `SOR_ARCHIVE.taxonomy` fuer L1-L3 ist mindestens einer Klassenstufe in
der Tabelle oben zugeordnet:

- L1: alle Blattknoten aus `1.1.*`, `1.2.*`, `1.3.*`, `1.4.*` sind Klasse 1-6
  zugeordnet.
- L2: alle Blattknoten aus `2.1.*` bis `2.6.*` sind Klasse 7-10 zugeordnet.
- L3: alle Blattknoten aus `3.1.*` bis `3.5.*` sind Klasse 11-13 zugeordnet.

Komplexe Zahlen (`3.3.*`) und Matrizen (`3.4.*`) sind als Zusatzstoff fuer
Leistungskurs/einzelne Bundeslaender markiert, da sie nicht ueberall
verbindlicher Kernlehrplan der Sekundarstufe II sind.

## Nutzung

- Die Tabelle kann direkt als Nachschlagewerk dienen, wenn neue Archiv-Batches
  gezielt eine Klassenstufe ansprechen sollen.
- Sie ist die Grundlage fuer eine spaetere, optionale "Meine Klassenstufe"-
  Filterfunktion im Archiv oder in der Lernstrasse (nicht Teil dieser
  Iteration, siehe `BACKLOG.md`).
- Sie ergaenzt, ersetzt aber nicht die bestehende Level/Sublevel-Taxonomie.

## Verwandte offene Aufgaben

- Engineering-Mathematik-Coverage-Matrix bis Master-Niveau fuer L4-L5
  (separater Backlog-Eintrag).
- Erweiterung der L6-Forschungsthemen (Zahlentheorie, Riemann-Hypothese,
  moderne Simulation, Optimierung, offene Probleme; separater
  Backlog-Eintrag).
