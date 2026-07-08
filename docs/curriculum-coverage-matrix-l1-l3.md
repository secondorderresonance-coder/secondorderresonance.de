# Curriculum Coverage Matrix: Klasse 1-12 → L1-L3 Archiv-Sections

## Zweck
Dieses Dokument bildet den regulaeren deutschen Mathematik-Lehrplan (Klasse 1-12, Gymnasium-orientiert mit Anschlussfaehigkeit fuer Realschule/Gesamtschule) auf die bestehende SOR-Taxonomie in `app/data/archive-content.js` (`window.SOR_ARCHIVE.taxonomy`, Level 1-3) ab.

Ziel ist eine belastbare Grundlage, um:
- Luecken in der aktuellen L1-L3-Sublevel-Struktur sichtbar zu machen,
- neue Archiv-Batches gezielt nach Klassenstufe statt nur nach Thema zu priorisieren,
- spaeter optional ein Klassenstufen-Filter in der Archiv-UI zu ermoeglichen (nicht Teil dieser Iteration).

## Methodik und Vorbehalt
- Grundlage sind die KMK-Bildungsstandards (Primarstufe, Hauptschulabschluss, Mittlerer Schulabschluss, Allgemeine Hochschulreife) sowie gaengige Kernlehrplaene, generalisiert ueber Bundeslaender hinweg.
- Die konkrete Zuordnung von Themen zu Klassenstufen variiert je Bundesland und Schulform um ca. 1 Jahrgangsstufe. Die Tabelle nennt die ueblichste Zuordnung (G8/G9-Mischform, Fokus Gymnasium).
- "SOR Sublevel(s)" referenziert IDs aus der bestehenden Taxonomie (`1.x` = L1, `2.x` = L2, `3.x` = L3). Es werden keine neuen Sublevel-IDs eingefuehrt; dies ist eine reine Mapping-Dokumentation.
- Klasse 13 existiert nur im G9-Modell und deckt inhaltlich die gleichen Themen wie das zweite Halbjahr von Klasse 12 (G8) ab; sie ist deshalb in der Klasse-12-Zeile zusammengefasst.

## Mapping-Tabelle

| Klasse | Themenbereich (Lehrplan) | SOR Sublevel(s) | Bemerkung |
|---|---|---|---|
| 1-2 | Zahlenraum bis 100/1000, Grundrechenarten | 1.1.1, 1.1.1.a | Kopfrechnen-Fokus deckt fruehe Unterstufe ab |
| 1-2 | Einfache geometrische Formen, Groessenvergleich | 1.2.1.a | Informeller Einstieg, formale Vertiefung folgt Klasse 3-4 |
| 1-2 | Umgang mit Geld, Zeit, Laenge (Sachrechnen) | 1.3.2.a | Grundlage fuer spaetere Einheitenumrechnung |
| 3-4 | Schriftliche Rechenverfahren (+, -, x, :) | 1.1.1.b | |
| 3-4 | Einfuehrung Brueche (Anteile, Kuerzen) | 1.1.2.a | |
| 3-4 | Flaechen und Umfang einfacher Figuren | 1.2.1.a, 1.2.1.b | Zusammengesetzte Figuren ab Klasse 4 |
| 3-4 | Diagramme lesen und erstellen | 1.4.1.a, 1.4.1.b | |
| 3-4 | Einheiten umrechnen (Laenge, Masse, Zeit, Volumen) | 1.3.2.a, 1.3.2.b | |
| 5 | Brueche vertiefen (Addition, Multiplikation, Division) | 1.1.2.a, 1.1.2.c | |
| 5 | Dezimalzahlen und Kommarechnung | 1.1.3.a, 1.1.3.b | |
| 5 | Negative Zahlen (Einfuehrung) | 1.1.4.a | |
| 5 | Winkelarten, Dreieckstypen | 1.2.3.a, 1.2.3.b | |
| 5 | Koordinatensystem (Punkte, Abstaende, Spiegelung) | 1.2.4.a | |
| 6 | Prozentrechnung im Alltag | 1.1.2.b | |
| 6 | Teilbarkeit, Primfaktorzerlegung, ggT/kgV | 1.1.5.a, 1.1.5.b | |
| 6 | Dreisatz (proportional/antiproportional) | 1.3.1.a, 1.3.1.b | |
| 6 | Koerper und Volumen (Wuerfel, Quader, Zylinder) | 1.2.2.a | |
| 6 | Einfache Zufallsexperimente | 1.4.2.a | |
| 7 | Terme, lineare Gleichungen loesen und umstellen | 2.1.1.a, 2.1.1.b | |
| 7 | Zuordnungen und lineare Funktionen (Einstieg) | 2.2.2.a | Baut auf Dreisatz (1.3.1) auf |
| 7 | Kongruenz und Dreieckskonstruktionen | 1.2.3.b | Vertiefung erfolgt ueber Aehnlichkeit in Klasse 8 |
| 8 | Lineare Funktionen (Steigung, parallele/senkrechte Geraden) | 2.2.2.a, 2.2.2.b | |
| 8 | Lineare Gleichungssysteme | 2.1.2.a, 2.1.2.b | |
| 8 | Potenzgesetze, Wurzeln (Einstieg) | 2.3.1.a, 2.3.1.b, 2.3.2.a | |
| 8 | Strahlensaetze, aehnliche Figuren | 2.5.1.a, 2.5.1.b | |
| 9 | Quadratische Gleichungen (Loesungsformel, Faktorisierung) | 2.1.3.a, 2.1.3.b | |
| 9 | Quadratische Funktionen (Scheitel, Nullstellen, Transformation) | 2.2.3.a, 2.2.3.b | |
| 9 | Satz des Pythagoras (Anwendungen) | 2.5.3.a | |
| 9 | Trigonometrie am rechtwinkligen Dreieck | 2.4.1.a, 2.4.1.b | |
| 10 | Exponentielles Wachstum, Zerfall, Halbwertszeit | 2.2.1.a, 2.2.1.b, 2.2.1.c | |
| 10 | Logarithmen (Definition, Gleichungen) | 2.3.3.a, 2.3.3.b | |
| 10 | Kreisgeometrie (Umfang, Flaeche, Sehnen, Tangenten) | 2.5.2.a, 2.5.2.b | |
| 10 | Sinus-/Kosinussatz, Einheitskreis, Periodizitaet | 2.4.2.a, 2.4.3.a, 2.4.3.b | |
| 10 | Kombinatorik und Wahrscheinlichkeit (Laplace, Baumdiagramm) | 2.6.1.a, 2.6.1.b, 2.6.2.a, 2.6.2.b | |
| 10 | Ungleichungen (linear, Betrag) | 2.1.4.a, 2.1.4.b | |
| 11 | Ableitungsregeln, Monotonie, Extremstellen | 3.1.1.a, 3.1.1.b | Einfuehrungsphase Oberstufe |
| 11 | Folgen und Reihen (arithmetisch, geometrisch, Grenzwerte) | 3.1.5.a, 3.1.5.b | |
| 11 | Vektoroperationen und Skalarprodukt (Einstieg) | 3.2.3.a | |
| 11 | Bedingte Wahrscheinlichkeit, Bayes-Theorem | 3.2.1.a, 3.2.1.b | |
| 12 (bzw. 12-13 bei G9) | Vollstaendige Kurvendiskussion, Optimierungsaufgaben | 3.1.2.a, 3.1.2.b | |
| 12 (bzw. 12-13 bei G9) | Integralrechnung (Stammfunktion, Flaeche, Substitution, part. Integration) | 3.1.3.a, 3.1.3.b, 3.1.3.c, 3.1.3.d | |
| 12 (bzw. 12-13 bei G9) | e-Funktion, ln, Wachstums-/Zerfallsmodelle | 3.1.4.a, 3.1.4.b | |
| 12 (bzw. 12-13 bei G9) | Geraden/Ebenen im Raum, Kreuzprodukt | 3.2.3.b, 3.2.3.c | |
| 12 (bzw. 12-13 bei G9) | Zufallsvariablen, Binomial- und Normalverteilung | 3.2.2.a, 3.2.2.b, 3.2.2.c | |
| 12 (bzw. 12-13 bei G9, LK/Wahlthema) | Komplexe Zahlen (kartesisch, Polarform) | 3.3.1.a, 3.3.1.b | Nur in manchen Bundeslaendern/Leistungskursen curricular |
| 12 (bzw. 12-13 bei G9, LK/Wahlthema) | Matrizen (Addition, Multiplikation, Determinante 2x2) | 3.4.1.a, 3.4.1.b | Nur in manchen Bundeslaendern/Leistungskursen curricular |
| 12 (bzw. 12-13 bei G9, LK/Wahlthema) | Kegelschnitte (Parabel, Ellipse, Hyperbel) | 3.5.1.a | Nur in manchen Bundeslaendern/Leistungskursen curricular |

## Deckungslücken
Alle Kernthemen des regulaeren Klasse-1-12-Lehrplans lassen sich einer bestehenden L1-L3-Sublevel-ID zuordnen. Es wurde keine strukturelle Luecke identifiziert, die eine neue Sublevel-ID erfordert.

Beobachtungen fuer zukuenftige Iterationen (kein Blocker):
- "Sachrechnen"/Textaufgaben-Kompetenz ist eine Querschnittsfaehigkeit ohne eigene Sublevel-ID und wird implizit ueber mehrere Sublevel (z. B. 1.3, 2.1.1) abgedeckt statt explizit ausgewiesen.
- Zinseszins wird bewusst nicht als eigenes Sublevel gefuehrt, sondern als Anwendungsfall von "Exponentielles Wachstum" (2.2.1.a) behandelt.
- Komplexe Zahlen, Matrizen und Kegelschnitte in L3 sind Wahlthemen (nicht in allen Bundeslaendern verpflichtend) und daher nur mit "kann vorkommen"-Kennzeichnung versehen.

## Naechste Schritte
- Optionale Folgeaufgabe: Klassenstufen-Tag als Metadatenfeld pro Sublevel in `app/data/archive-content.js` ergaenzen, um die Zuordnung maschinenlesbar zu machen (separate, kleine Iteration).
- Diese Matrix dient als Referenz fuer die noch offenen P1-Aufgaben "Engineering-Mathematik-Coverage-Matrix (L4-L5)" und "L6-Forschungsthemen-Erweiterung".
