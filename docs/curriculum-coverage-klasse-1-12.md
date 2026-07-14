# Curriculum Coverage Matrix Klasse 1-12 (Mathematik)

## Ziel
Diese Matrix ordnet die typischen Mathematik-Kernthemen der deutschen Klassenstufen 1-12
den bestehenden Archiv-Abschnitten (Level 1-3, `app/data/archive-content.js` ->
`SOR_ARCHIVE.taxonomy`) zu. Sie ist die Grundlage, um spaeter gezielt Luecken zu schliessen,
statt Inhalte unstrukturiert zu erweitern. Diese Iteration liefert nur die Matrix und die
Luecken-Analyse, keine neuen Archiv-Aufgaben.

## Methodik / Annahmen
- Grundlage sind die in fast allen Bundeslaendern wiederkehrenden Kernthemen (angelehnt an die
  KMK-Bildungsstandards Mathematik fuer Primar- und Sekundarstufe). Feinunterschiede zwischen
  Bundeslaendern und Schulformen (Haupt-/Real-/Gesamtschule vs. Gymnasium) werden bewusst nicht
  einzeln abgebildet, um die Matrix wartbar zu halten.
- Level-Zuordnung folgt der bestehenden Level-Beschreibung in `AGENTS.md`:
  - L1 Grundlagen = Grundschule und Unterstufe (ca. Klasse 1-6)
  - L2 Aufbauwissen = Unter- und Mittelstufe (ca. Klasse 5-10)
  - L3 Vertiefung = Oberstufe / Schulabschlussniveau (ca. Klasse 10-12/13)
  - Ueberlappende Klassenstufen sind beabsichtigt, da Themenfolgen je nach Schulform und
    G8/G9-Modell variieren.
- Status-Spalte:
  - `abgedeckt` = passender Archiv-Sublevel existiert bereits mit Aufgaben.
  - `teilweise` = ein verwandter Sublevel existiert, deckt das Schulthema aber nur grob ab.
  - `Luecke` = kein passender Sublevel vorhanden.
- Physik ist nicht Teil dieser Matrix. Das Archiv ist aktuell rein mathematisch; eine eigene
  Physik-Matrix ist ein sinnvoller Folgeschritt (siehe Luecken-Abschnitt).

## Klassenstufen-Uebersicht

| Klassenstufen | Schulstufe             | Primaeres Archiv-Level |
|----------------|-------------------------|-------------------------|
| 1-4            | Grundschule              | L1 |
| 5-6            | Unterstufe               | L1 / L2 (Uebergang) |
| 7-9            | Mittelstufe              | L2 |
| 10             | Mittelstufe / Uebergang  | L2 / L3 (Uebergang) |
| 11-12(/13)     | Oberstufe                | L3 |

## Detailmatrix

### Klasse 1-2 (Grundschule, Anfangsunterricht)
| Kernthema | Archiv-Sublevel | Status |
|---|---|---|
| Zahlraum bis 100, Grundrechenarten, Kopfrechnen | `1.1.1.a` Kopfrechnen und Rechenstrategien | abgedeckt |
| Einfache geometrische Formen erkennen | `1.2.1.a` Rechteck, Dreieck, Kreis | teilweise (Niveau ist fuer spaetere Klassen ausgelegt) |
| Erste Diagramme / Ergebnisse darstellen | `1.4.1.a` Balken- und Kreisdiagramme | teilweise |

### Klasse 3-4 (Grundschule, Abschluss)
| Kernthema | Archiv-Sublevel | Status |
|---|---|---|
| Schriftliche Rechenverfahren (alle vier Grundrechenarten) | `1.1.1.b` Schriftliches Rechnen | abgedeckt |
| Zahlraum bis 1.000.000, Runden und Schaetzen | `1.1.3.b` Runden und Schaetzen | abgedeckt |
| Groessen und Einheiten (Laenge, Masse, Zeit, Volumen) | `1.3.2.a` / `1.3.2.b` Einheiten und Groessen | abgedeckt |
| Flaechen und Umfang einfacher Figuren | `1.2.1.a` / `1.2.1.b` Flaechen und Umfang | abgedeckt |
| Koerper erkennen (Wuerfel, Quader) | `1.2.2.a` Wuerfel, Quader, Zylinder | abgedeckt |
| Erste Bruchvorstellung (Anteile) | `1.1.2.a` Brueche addieren und kuerzen | teilweise (Sublevel zielt eher auf Klasse 5-6) |
| Daten sammeln und darstellen | `1.4.1.a` / `1.4.1.b` Diagramme und Daten | abgedeckt |

### Klasse 5
| Kernthema | Archiv-Sublevel | Status |
|---|---|---|
| Bruchrechnung: erweitern, kuerzen, addieren | `1.1.2.a` Brueche addieren und kuerzen | abgedeckt |
| Dezimalzahlen und Kommarechnung | `1.1.3.a` Dezimalzahlen und Kommarechnung | abgedeckt |
| Winkel und Winkelarten | `1.2.3.a` Winkelarten und -masse | abgedeckt |
| Koordinatensystem, Punkte und Abstaende | `1.2.4.a` Punkte, Abstaende, Spiegelung | abgedeckt |
| Symmetrie und Spiegelung | `1.2.4.a` Punkte, Abstaende, Spiegelung | teilweise (Symmetrie nicht separat benannt) |

### Klasse 6
| Kernthema | Archiv-Sublevel | Status |
|---|---|---|
| Bruchrechnung: multiplizieren, dividieren | `1.1.2.c` Brueche multiplizieren und dividieren | abgedeckt |
| Prozentrechnung (Einfuehrung) | `1.1.2.b` Prozentwerte im Alltag | abgedeckt |
| Negative Zahlen | `1.1.4.a` Rechnen mit negativen Zahlen | abgedeckt |
| Primfaktorzerlegung, ggT/kgV | `1.1.5.a` / `1.1.5.b` | abgedeckt |
| Dreieckstypen und Eigenschaften | `1.2.3.b` Dreieckstypen und Eigenschaften | abgedeckt |
| Kreis (Umfang, Flaeche) | `2.5.2.a` Umfang, Flaeche, Kreisabschnitte | teilweise (Sublevel liegt formal in L2) |

### Klasse 7
| Kernthema | Archiv-Sublevel | Status |
|---|---|---|
| Terme aufstellen und vereinfachen | `2.1.1.a` Lineare Gleichungen | teilweise (Termumformung selbst nicht als eigener Sublevel) |
| Lineare Gleichungen loesen und Formeln umstellen | `2.1.1.a` / `2.1.1.b` | abgedeckt |
| Proportionale und antiproportionale Zuordnungen | `1.3.1.a` / `1.3.1.b` Dreisatz | abgedeckt |
| Prozent- und Zinsrechnung | `1.1.2.b` Prozentwerte im Alltag | teilweise (Zinsrechnung nicht eigenstaendig abgebildet) |
| Dreieckskonstruktionen und Kongruenzsaetze | - | Luecke |
| Daten auswerten, Mittelwert, Haeufigkeit | `1.4.1.b` Mittelwert und Haeufigkeit | abgedeckt |

### Klasse 8
| Kernthema | Archiv-Sublevel | Status |
|---|---|---|
| Lineare Funktionen (Geradengleichung, Steigung) | `2.2.2.a` Geradengleichung und Steigung | abgedeckt |
| Parallele und senkrechte Geraden | `2.2.2.b` | abgedeckt |
| Lineare Gleichungssysteme | `2.1.2.a` / `2.1.2.b` | abgedeckt |
| Volumen von Prisma und Zylinder | `1.2.2.a` Wuerfel, Quader, Zylinder | teilweise (Prisma nicht separat benannt) |
| Wahrscheinlichkeit: Laplace-Experimente | `2.6.2.a` Laplace-Experiment | abgedeckt |
| Baumdiagramme | `2.6.2.b` Baumdiagramm | abgedeckt |

### Klasse 9
| Kernthema | Archiv-Sublevel | Status |
|---|---|---|
| Quadratische Gleichungen (Loesungsformel, Faktorisierung) | `2.1.3.a` / `2.1.3.b` | abgedeckt |
| Quadratische Funktionen (Parabel) | `2.2.3.a` / `2.2.3.b` | abgedeckt |
| Satz des Pythagoras | `2.5.3.a` Anwendungen des Satzes des Pythagoras | abgedeckt |
| Potenzgesetze, Wurzeln | `2.3.1.a` / `2.3.1.b`, `2.3.2.a` / `2.3.2.b` | abgedeckt |
| Aehnlichkeit und Strahlensaetze | `2.5.1.a` / `2.5.1.b` | abgedeckt |

### Klasse 10
| Kernthema | Archiv-Sublevel | Status |
|---|---|---|
| Trigonometrie (sin, cos, tan; Sinus-/Kosinussatz) | `2.4.1.a`, `2.4.2.a` | abgedeckt |
| Exponentialfunktionen und Logarithmen | `2.2.1.a`/`b`/`c`, `2.3.3.a`/`b` | abgedeckt |
| Kreis- und Kugelgeometrie | `2.5.2.a` / `2.5.2.b` (nur Kreis) | teilweise (Kugel-Volumen/-Oberflaeche fehlt) |
| Erste Ableitungsbegriffe (bundeslandabhaengig bereits hier) | `3.1.1.a` Ableitungsregeln | abgedeckt (Uebergang zu L3) |
| Kombinatorik (Permutationen, Kombinationen) | `2.6.1.a` / `2.6.1.b` | abgedeckt |

### Klasse 11 (Einfuehrungsphase Oberstufe)
| Kernthema | Archiv-Sublevel | Status |
|---|---|---|
| Ableitungsregeln (Ketten-, Produkt-, Quotientenregel) | `3.1.1.a` | abgedeckt |
| Monotonie, Extremstellen, Kurvendiskussion (Basis) | `3.1.1.b`, `3.1.2.a` | abgedeckt |
| Vektorrechnung: Vektoroperationen, Skalarprodukt | `3.2.3.a` | abgedeckt |
| Bedingte Wahrscheinlichkeit | `3.2.1.a` | abgedeckt |
| Folgen und Grenzwerte (Oberstufe) | `3.1.5.a` / `3.1.5.b` | abgedeckt |

### Klasse 12/13 (Qualifikationsphase Oberstufe)
| Kernthema | Archiv-Sublevel | Status |
|---|---|---|
| Integralrechnung (Stammfunktion, bestimmtes Integral, Substitution, part. Integration) | `3.1.3.a`-`3.1.3.d` | abgedeckt |
| e-Funktion und ln, Wachstums-/Zerfallsmodelle | `3.1.4.a` / `3.1.4.b` | abgedeckt |
| Vektorgeometrie: Geraden und Ebenen im Raum | `3.2.3.b` | abgedeckt |
| Kreuzprodukt und geometrische Anwendungen | `3.2.3.c` | abgedeckt |
| Stochastik: Binomialverteilung, Erwartungswert/Varianz, Normalverteilung | `3.2.2.a`-`3.2.2.c` | abgedeckt |
| Bayes-Theorem | `3.2.1.b` | abgedeckt |
| Matrizen (Einstieg) | `3.4.1.a` / `3.4.1.b` | abgedeckt |
| Komplexe Zahlen (in manchen Bundeslaendern/Leistungskursen) | `3.3.1.a` / `3.3.1.b` | abgedeckt |
| Kegelschnitte (analytische Geometrie, Leistungskurs) | `3.5.1.a` | abgedeckt |

## Identifizierte Luecken

Diese Themen sind im aktuellen Schul-Kernlehrplan verbreitet, haben aber noch keinen
dedizierten Archiv-Sublevel:

1. **Zinsrechnung** (Klasse 7): aktuell nur ueber die allgemeine Prozentrechnung
   (`1.1.2.b`) abgedeckt. Eigener Sublevel unter `1.1` waere sinnvoll.
2. **Dreieckskonstruktionen und Kongruenzsaetze** (Klasse 7): kein passender Sublevel
   vorhanden.
3. **Kugel- und zusammengesetzte Koerper** (Volumen/Oberflaeche, Klasse 8-10): `1.2.2`
   deckt aktuell nur Wuerfel, Quader, Zylinder ab; Kugel und Prisma fehlen.
4. **Physik-Themen** (Mechanik, Elektrik, Optik etc.): Das Archiv ist derzeit
   ausschliesslich mathematisch. Eine eigene Physik-Taxonomie und -Matrix ist ein
   separates, groesseres Folgeprojekt und nicht Teil dieser Matrix.

Alle uebrigen Kernthemen der Klassen 1-12 haben bereits einen passenden Archiv-Sublevel
mit vorhandenen Aufgaben (siehe `node tools/archive-qa.js` fuer Volumenpruefung je Level).

## Empfohlene naechste Schritte
- Kleine Folge-Batches fuer die identifizierten Luecken (Zinsrechnung, Dreieckskonstruktion,
  Kugel/Prisma) als neue Sublevel-Eintraege plus Seed-Aufgaben, im gleichen Umfang wie
  bisherige L1-L3-Erweiterungsbatches.
- Getrennt davon: Aufbau einer eigenen Physik-Taxonomie, sobald die Mathematik-Abdeckung
  fuer L1-L3 als stabil gilt (vgl. `AGENTS.md`, Kernproduktvision "Mathematik und Physik").
- Diese Matrix bei jeder groesseren Taxonomie-Aenderung in `app/data/archive-content.js`
  mit aktualisieren, damit Kern-Lehrplan und Archiv nicht auseinanderlaufen.
