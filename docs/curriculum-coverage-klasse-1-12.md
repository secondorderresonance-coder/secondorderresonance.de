# Curriculum Coverage Matrix: Klasse 1-12 → L1-L3 Archiv

## Zweck

Dieses Dokument bildet die typischen Mathematik-Themen der deutschen Schullaufbahn
(Klasse 1 bis Klasse 12/13, generalisiert ueber Bundeslaender und Schulformen hinweg)
auf die bestehende Archiv-Taxonomie in `app/data/archive-content.js` (`SOR_ARCHIVE.taxonomy`,
Level L1-L3) ab.

Es ist eine Planungs- und Referenzgrundlage fuer zukuenftige Aufgaben-Batches, damit neue
Seed-Tasks gezielt Luecken in der Schulabdeckung schliessen statt bereits gut abgedeckte
Themen weiter zu vertiefen. Es aendert keinen Code und keine Laufzeit-Daten.

## Methodik

- Klassenstufen und Themenreihenfolge orientieren sich an gaengigen deutschen Kerncurricula
  (Grundschule, Sekundarstufe I, Sekundarstufe II / gymnasiale Oberstufe). Da Lehrplaene je
  Bundesland leicht variieren, ist die Zuordnung bewusst als "typische Reihenfolge",
  nicht als exakter amtlicher Lehrplan zu verstehen.
- Jede Zeile verweist auf konkrete Sublevel-IDs aus der Archiv-Taxonomie (z. B. `1.1.1.a`).
  Alle referenzierten IDs wurden gegen `SOR_ARCHIVE.taxonomy` geprueft und existieren dort.
- Spalte "Status" markiert, ob die Klassenstufe durch bestehende Sublevel bereits **abgedeckt**
  ist, nur **teilweise** abgedeckt ist, oder eine **Luecke** markiert, die noch keine passende
  Sublevel-Struktur hat.

## Klasse 1-4 (Grundschule) → L1

| Klasse | Schulthema | Archiv-Sublevel(s) | Status |
|---|---|---|---|
| 1-2 | Zahlraum bis 100, Kopfrechnen, Addition/Subtraktion | `1.1.1.a` Kopfrechnen und Rechenstrategien | abgedeckt |
| 3 | Kleines Einmaleins, schriftliche Addition/Subtraktion | `1.1.1.a`, `1.1.1.b` Schriftliches Rechnen | abgedeckt |
| 4 | Schriftliche Multiplikation/Division, erste Bruchvorstellung, Flaechen/Umfang einfacher Figuren | `1.1.1.b`, `1.1.2.a` Brueche addieren und kuerzen, `1.2.1.a` Rechteck, Dreieck, Kreis | abgedeckt |
| 1-4 | Einfache Diagramme, Zaehlen und Haeufigkeiten | `1.4.1.a` Balken- und Kreisdiagramme | abgedeckt |
| 1-4 | Geometrische Grundformen erkennen, Symmetrie, Spiegeln an Grundschulniveau | — | **Luecke**: kein dediziertes Sublevel fuer Formerkennung/Symmetrie auf Grundschulniveau (nur `1.2.4.a` Punkte/Abstaende/Spiegelung, das eher Koordinatensystem-Niveau Klasse 5/6 ist) |

## Klasse 5-6 (Orientierungsstufe) → L1

| Klasse | Schulthema | Archiv-Sublevel(s) | Status |
|---|---|---|---|
| 5 | Brueche addieren/kuerzen/multiplizieren/dividieren | `1.1.2.a`, `1.1.2.c` Brueche multiplizieren und dividieren | abgedeckt |
| 5 | Flaechen, Umfang, zusammengesetzte Figuren, Winkel und Dreieckstypen | `1.2.1.a`, `1.2.1.b` Zusammengesetzte Figuren, `1.2.3.a` Winkelarten, `1.2.3.b` Dreieckstypen | abgedeckt |
| 5 | Koordinatensystem, Punkte und Abstaende | `1.2.4.a` Punkte, Abstaende, Spiegelung | abgedeckt |
| 6 | Dezimalzahlen, Runden/Schaetzen | `1.1.3.a` Dezimalzahlen und Kommarechnung, `1.1.3.b` Runden und Schaetzen | abgedeckt |
| 6 | Negative Zahlen | `1.1.4.a` Rechnen mit negativen Zahlen | abgedeckt |
| 6 | Prozentrechnung im Alltag | `1.1.2.b` Prozentwerte im Alltag | abgedeckt |
| 6 | Koerper und Volumen (Wuerfel, Quader, Zylinder) | `1.2.2.a` Wuerfel, Quader, Zylinder | abgedeckt |
| 6 | Dreisatz (proportional/antiproportional), Einheiten umrechnen | `1.3.1.a`, `1.3.1.b`, `1.3.2.a`, `1.3.2.b` | abgedeckt |
| 6 | Einfache Zufallsexperimente, Mittelwert/Haeufigkeit | `1.4.1.b` Mittelwert und Haeufigkeit, `1.4.2.a` Einfache Zufallsexperimente | abgedeckt |

## Klasse 7-8 (Sekundarstufe I, Mittelstufe) → L1/L2

| Klasse | Schulthema | Archiv-Sublevel(s) | Status |
|---|---|---|---|
| 7 | Primfaktorzerlegung, ggT/kgV | `1.1.5.a`, `1.1.5.b` | abgedeckt |
| 7 | Terme aufstellen, lineare Gleichungen loesen | `2.1.1.a` Lineare Gleichungen | abgedeckt |
| 7 | Formeln umstellen | `2.1.1.b` Formeln umstellen | abgedeckt |
| 7-8 | Zuordnungen vertieft, direkte/indirekte Proportionalitaet | `1.3.1.a`, `1.3.1.b` | abgedeckt |
| 8 | Lineare Funktionen, Geradengleichung, Steigung, parallele/senkrechte Geraden | `2.2.2.a`, `2.2.2.b` | abgedeckt |
| 8 | Lineare Gleichungssysteme (2 Unbekannte) | `2.1.2.a` Substitutions- und Additionsverfahren | abgedeckt |
| 8 | Strahlensaetze, aehnliche Figuren | `2.5.1.a` Strahlensatz-Aufgaben, `2.5.1.b` Aehnliche Figuren | abgedeckt |
| 8 | Grundlegende Wahrscheinlichkeitsrechnung, Baumdiagramme | `2.6.2.a` Laplace-Experiment, `2.6.2.b` Baumdiagramm | abgedeckt |
| 7-8 | Gleichungen mit Bruechen | `2.1.1.c` Gleichungen mit Bruechen | abgedeckt |

## Klasse 9-10 (Sekundarstufe I, Abschlussniveau) → L2

| Klasse | Schulthema | Archiv-Sublevel(s) | Status |
|---|---|---|---|
| 9 | Quadratische Gleichungen (Loesungsformel, Diskriminante, Faktorisierung) | `2.1.3.a`, `2.1.3.b` | abgedeckt |
| 9 | Quadratische Funktionen, Parabelscheitel, Nullstellen, Verschiebung/Streckung | `2.2.3.a`, `2.2.3.b` | abgedeckt |
| 9 | Satz des Pythagoras und Anwendungen | `2.5.3.a` Anwendungen des Satzes des Pythagoras | abgedeckt |
| 9 | Trigonometrie am rechtwinkligen Dreieck (sin/cos/tan) | `2.4.1.a` | abgedeckt |
| 9 | Potenzgesetze, negative/gebrochene Exponenten | `2.3.1.a`, `2.3.1.b` | abgedeckt |
| 9-10 | Kreisgeometrie (Umfang, Flaeche, Kreisabschnitte, Sehnen/Tangenten) | `2.5.2.a`, `2.5.2.b` | abgedeckt |
| 10 | Exponentielles Wachstum/Zerfall, Halbwertszeit | `2.2.1.a`, `2.2.1.b`, `2.2.1.c` | abgedeckt |
| 10 | Wurzeln, Wurzelterme vereinfachen | `2.3.2.a`, `2.3.2.b` | abgedeckt |
| 10 | Logarithmen (Definition, Rechenregeln, log. Gleichungen) | `2.3.3.a`, `2.3.3.b` | abgedeckt |
| 10 | Allgemeines Dreieck: Sinussatz/Kosinussatz | `2.4.2.a` Allgemeines Dreieck | abgedeckt |
| 10 | Einheitskreis, Sinus-/Kosinus-/Tangensfunktion, Bogenmass | `2.4.3.a`, `2.4.3.b`, `2.4.1.b` | abgedeckt |
| 10 | Kombinatorik (Permutationen, Kombinationen, Binomialkoeffizient) | `2.6.1.a`, `2.6.1.b` | abgedeckt |
| 9-10 | Ungleichungen (linear, Betrag) | `2.1.4.a`, `2.1.4.b` | abgedeckt |
| 9-10 | Umkehrfunktionen | `2.2.4.a` Umkehrabbildungen | abgedeckt |
| 9-10 | Gleichungssysteme mit 3 Unbekannten (vertiefend, z. B. Gymnasium) | `2.1.2.b` | abgedeckt |

## Klasse 11 (Einfuehrungsphase Oberstufe) → L2/L3

| Klasse | Schulthema | Archiv-Sublevel(s) | Status |
|---|---|---|---|
| 11 | Ableitungsregeln (Ketten-, Produkt-, Quotientenregel) | `3.1.1.a` | abgedeckt |
| 11 | Monotonie und Extremstellen | `3.1.1.b` | abgedeckt |
| 11 | Kruemmung und Wendepunkte | `3.1.1.c` | abgedeckt |
| 11 | Linearisierung und Naeherungen | `3.1.1.d` | abgedeckt |
| 11 | Arithmetische und geometrische Folgen, Grenzwerte von Folgen | `3.1.5.a`, `3.1.5.b` | abgedeckt |
| 11 | Vektoroperationen und Skalarprodukt (Einstieg analytische Geometrie) | `3.2.3.a` | abgedeckt |

## Klasse 12-13 (Qualifikationsphase / Abitur) → L3

| Klasse | Schulthema | Archiv-Sublevel(s) | Status |
|---|---|---|---|
| 12 | Vollstaendige Kurvendiskussion, Optimierungsaufgaben | `3.1.2.a`, `3.1.2.b` | abgedeckt |
| 12 | Stammfunktionen, bestimmtes Integral, Substitutionsregel, partielle Integration | `3.1.3.a`-`3.1.3.d` | abgedeckt |
| 12 | Ableitung/Integration von e^x und ln(x), Wachstums-/Zerfallsmodelle | `3.1.4.a`, `3.1.4.b` | abgedeckt |
| 12 | Bedingte Wahrscheinlichkeit, Satz von Bayes | `3.2.1.a`, `3.2.1.b` | abgedeckt |
| 12 | Binomialverteilung, Erwartungswert/Varianz, Normalverteilung | `3.2.2.a`-`3.2.2.c` | abgedeckt |
| 12 | Geraden und Ebenen im Raum, Kreuzprodukt und Anwendungen | `3.2.3.b`, `3.2.3.c` | abgedeckt |
| 13 (LK, teils Bundesland-abhaengig) | Komplexe Zahlen: kartesische Form, Betrag, Polarform, Eulersche Formel | `3.3.1.a`, `3.3.1.b` | abgedeckt |
| 13 (LK, teils Bundesland-abhaengig) | Matrizen: Addition/Multiplikation, Determinante (2x2) | `3.4.1.a`, `3.4.1.b` | abgedeckt |
| 13 (LK, teils Bundesland-abhaengig) | Kegelschnitte (Parabel, Ellipse, Hyperbel) | `3.5.1.a` | abgedeckt |

## Zusammenfassung offener Luecken

1. **Grundschule Klasse 1-4, Formerkennung/Symmetrie**: kein eigenes Sublevel fuer reine
   Formerkennung und einfache Symmetrieaufgaben auf Grundschulniveau. `1.2.4.a` deckt
   Spiegelung nur im Koordinatensystem-Kontext ab (eher Klasse 5/6). Vorschlag fuer einen
   spaeteren, kleinen Batch: neues Sublevel z. B. `1.2.1.c` "Formen erkennen und
   Symmetrieachsen (Grundschule)" unterhalb von `1.2.1 Flaechen und Umfang` oder ein neues
   Sublevel `1.2.3.c` unterhalb von `1.2.3 Winkel und Dreiecke`.
2. Alle uebrigen Klassenstufen 1-13 sind mit mindestens einem passenden Sublevel abgedeckt;
   die tatsaechliche Aufgabentiefe je Sublevel (Anzahl kuratierter Seed-Tasks vs. generierte
   Varianten) ist ein separates Thema und wird in `docs/archive-content-qa-workflow.md`
   sowie den P2-Batches in `BACKLOG.md` behandelt.

## Verwendung fuer zukuenftige Batches

Kuenftige L1-L3-Inhalts-Batches sollten sich vorrangig an dieser Matrix orientieren:
- Sublevel mit "Luecke" zuerst schliessen (aktuell: Grundschul-Formerkennung/Symmetrie).
- Bei sonst abgedeckten Sublevel mit wenigen kuratierten Seed-Tasks (`T-1-xxx` bis
  `T-3-xxx`) gezielt die Klassenstufen-Zuordnung aus diesem Dokument nutzen, um neue
  Aufgaben nach Schulthema statt nach Zufallsauswahl zu verfassen.
