# Curriculum Coverage: Klasse 1-12 auf L1-L3

## Ziel
Diese Matrix ordnet den ueblichen deutschen Schul-Lehrplan (Klasse 1 bis Klasse 12/13) den bestehenden
Archiv-Sublevels aus `app/data/archive-content.js` (`SOR_ARCHIVE.taxonomy`, L1-L3) zu.
Sie ist die Referenz dafuer, welche Archiv-Sektion welche Klassenstufe abdeckt, und dient als
Pruefgrundlage, bevor neue Aufgaben-Batches fuer L1-L3 erstellt werden.

## Methodik und Annahmen
- Grundlage sind die KMK-Bildungsstandards und die in Deutschland ueblichen Themenblöcke pro Klassenstufe,
  generalisiert ueber Bundeslaender/Schulformen hinweg (Gymnasium als Referenzpfad, G8/G9-Unterschiede
  wirken sich nur auf das Tempo, nicht auf die Zuordnung aus).
- Realschule/Gesamtschule behandeln dieselben Themenbloecke ueblicherweise 1-2 Jahre spaeter; die Zuordnung
  bleibt inhaltlich gueltig, nur die Klassenstufen-Spalte verschiebt sich in der Praxis leicht.
- "Klasse 11" bezeichnet die Einfuehrungsphase der Oberstufe, "Klasse 12/13" die Qualifikationsphase
  (je nach Bundesland G8 = Klasse 11-12, G9 = Klasse 11-13). Beide werden hier als eine Spalte gefuehrt,
  da die fachlichen Inhalte identisch sind und sich nur auf zwei oder drei Schuljahre verteilen.
- Themen, die als Leistungskurs-/Wahlthema markiert sind, werden nicht in jedem Bundesland/jeder Schule
  unterrichtet, sind aber Teil des L3-Zielbilds ("Vertiefung / Schulabschlussniveau").
- Diese Matrix ist ein fruehes, planerisches Fundament (siehe `BACKLOG.md`, Abschnitt "Archiv Zielbild")
  und kein amtlicher Lehrplan-Ersatz.

## Klasse 1-2 (Grundschule, Anfangsunterricht)
| Thema | Archiv-Sublevel |
| --- | --- |
| Zahlen bis 100/1000, Kopfrechnen, Rechenstrategien | `1.1.1.a` Kopfrechnen und Rechenstrategien |

## Klasse 3-4 (Grundschule)
| Thema | Archiv-Sublevel |
| --- | --- |
| Schriftliche Rechenverfahren (+/-/*/:) | `1.1.1.b` Schriftliches Rechnen |
| Runden und Ueberschlagsrechnen | `1.1.3.b` Runden und Schaetzen |
| Einfache Flaechen/Umfang (Rechteck, Dreieck, Kreis) | `1.2.1.a` Rechteck, Dreieck, Kreis |
| Einheiten (Laenge, Masse, Zeit, Volumen) | `1.3.2.a` Laenge, Masse, Zeit, Volumen |
| Einheiten umrechnen | `1.3.2.b` Einheiten umrechnen |
| Diagramme lesen (Balken-/Kreisdiagramme) | `1.4.1.a` Balken- und Kreisdiagramme |

## Klasse 5 (Sekundarstufe I, Beginn)
| Thema | Archiv-Sublevel |
| --- | --- |
| Bruchrechnung: addieren, kuerzen | `1.1.2.a` Brueche addieren und kuerzen |
| Bruchrechnung: multiplizieren, dividieren | `1.1.2.c` Brueche multiplizieren und dividieren |
| Prozentrechnung im Alltag | `1.1.2.b` Prozentwerte im Alltag |
| Dezimalzahlen und Kommarechnung | `1.1.3.a` Dezimalzahlen und Kommarechnung |
| Zusammengesetzte Flaechen | `1.2.1.b` Zusammengesetzte Figuren |
| Wuerfel, Quader, Zylinder (Einstieg) | `1.2.2.a` Wuerfel, Quader, Zylinder |
| Koordinatensystem, Punkte, Spiegelung | `1.2.4.a` Punkte, Abstaende, Spiegelung |
| Mittelwert und Haeufigkeit | `1.4.1.b` Mittelwert und Haeufigkeit |

## Klasse 6 (Sekundarstufe I)
| Thema | Archiv-Sublevel |
| --- | --- |
| Negative Zahlen | `1.1.4.a` Rechnen mit negativen Zahlen |
| Primfaktorzerlegung | `1.1.5.a` Primfaktorzerlegung |
| ggT und kgV | `1.1.5.b` ggT und kgV |
| Winkelarten und -masse | `1.2.3.a` Winkelarten und -masse |
| Dreieckstypen und Eigenschaften | `1.2.3.b` Dreieckstypen und Eigenschaften |
| Proportionale Zuordnungen (Dreisatz) | `1.3.1.a` Proportionale Zuordnungen |
| Antiproportionale Zuordnungen | `1.3.1.b` Antiproportionale Zuordnungen |
| Einfache Zufallsexperimente | `1.4.2.a` Einfache Zufallsexperimente |

## Klasse 7 (Sekundarstufe I)
| Thema | Archiv-Sublevel |
| --- | --- |
| Terme aufstellen, lineare Gleichungen loesen | `2.1.1.a` Lineare Gleichungen |
| Formeln umstellen | `2.1.1.b` Formeln umstellen |
| Gleichungen mit Bruechen | `2.1.1.c` Gleichungen mit Bruechen |

## Klasse 8 (Sekundarstufe I)
| Thema | Archiv-Sublevel |
| --- | --- |
| Lineare Funktionen, Geradengleichung, Steigung | `2.2.2.a` Geradengleichung und Steigung |
| Parallele und senkrechte Geraden | `2.2.2.b` Parallele und senkrechte Geraden |
| Lineare Gleichungssysteme (2 Unbekannte) | `2.1.2.a` Substitutions- und Additionsverfahren |
| Lineare Ungleichungen | `2.1.4.a` Lineare Ungleichungen |
| Koerper und Volumen (Prisma, Zylinder vertieft) | `1.2.2.a` Wuerfel, Quader, Zylinder |
| Laplace-Experimente | `2.6.2.a` Laplace-Experiment |
| Baumdiagramme | `2.6.2.b` Baumdiagramm |

## Klasse 9 (Sekundarstufe I)
| Thema | Archiv-Sublevel |
| --- | --- |
| Quadratische Gleichungen, Loesungsformel, Diskriminante | `2.1.3.a` Loesungsformel und Diskriminante |
| Faktorisierung | `2.1.3.b` Faktorisierung |
| Quadratische Funktionen, Parabelscheitel, Nullstellen | `2.2.3.a` Parabelscheitel und Nullstellen |
| Verschiebung und Streckung von Parabeln | `2.2.3.b` Verschiebung und Streckung |
| Satz des Pythagoras (Anwendungen) | `2.5.3.a` Anwendungen des Satzes des Pythagoras |
| Strahlensaetze | `2.5.1.a` Strahlensatz-Aufgaben |
| Aehnliche Figuren | `2.5.1.b` Aehnliche Figuren |
| Potenzgesetze | `2.3.1.a` Rechenregeln fuer Potenzen |
| Negative und gebrochene Exponenten | `2.3.1.b` Negative und gebrochene Exponenten |
| Quadrat- und Kubikwurzeln | `2.3.2.a` Quadrat- und Kubikwurzeln |
| Wurzelterme vereinfachen | `2.3.2.b` Vereinfachen von Wurzeltermen |
| Lineare Gleichungssysteme mit 3 Unbekannten (vertieft) | `2.1.2.b` Gleichungssysteme mit 3 Unbekannten |
| Lineare Ungleichungen (vertieft, Betrag) | `2.1.4.b` Betragsungleichungen |

## Klasse 10 (Sekundarstufe I, mittlerer Schulabschluss)
| Thema | Archiv-Sublevel |
| --- | --- |
| Trigonometrie am rechtwinkligen Dreieck | `2.4.1.a` sin, cos, tan und Anwendungen |
| Bogenmass und Winkelumrechnung | `2.4.1.b` Bogenmass und Winkelumrechnung |
| Sinus- und Kosinussatz (allgemeines Dreieck) | `2.4.2.a` Allgemeines Dreieck |
| Exponentielles Wachstum | `2.2.1.a` Exponentielles Wachstum |
| Exponentieller Zerfall | `2.2.1.b` Exponentieller Zerfall |
| Halbwertszeit | `2.2.1.c` Halbwertszeit |
| Logarithmen: Definition und Rechenregeln | `2.3.3.a` Definition und Rechenregeln |
| Logarithmische Gleichungen | `2.3.3.b` Logarithmische Gleichungen |
| Kreisgeometrie: Umfang, Flaeche, Kreisabschnitte | `2.5.2.a` Umfang, Flaeche, Kreisabschnitte |
| Sehnen und Tangenten | `2.5.2.b` Sehnen und Tangenten |
| Umkehrfunktionen | `2.2.4.a` Umkehrabbildungen |
| Permutationen und Kombinationen | `2.6.1.a` Permutationen und Kombinationen |
| Binomialkoeffizient | `2.6.1.b` Binomialkoeffizient |

## Klasse 11 (Oberstufe, Einfuehrungsphase)
| Thema | Archiv-Sublevel |
| --- | --- |
| Einheitskreis, Sinus-/Kosinusfunktion | `2.4.3.a` Sinusfunktion und Kosinusfunktion |
| Tangensfunktion | `2.4.3.b` Tangensfunktion |
| Ableitungsregeln (Ketten-, Produkt-, Quotientenregel) | `3.1.1.a` Ableitungsregeln |
| Monotonie und Extremstellen | `3.1.1.b` Monotonie und Extremstellen |
| Kruemmung und Wendepunkte | `3.1.1.c` Kruemmung und Wendepunkte |
| Linearisierung und Naeherungen | `3.1.1.d` Linearisierung und Naeherungen |
| Kurvendiskussion (Einstieg) | `3.1.2.a` Vollstaendige Kurvendiskussion |
| Vektoren: Operationen, Skalarprodukt (Einstieg) | `3.2.3.a` Vektoroperationen und Skalarprodukt |
| Folgen (arithmetisch/geometrisch) | `3.1.5.a` Arithmetische und geometrische Folgen |

## Klasse 12/13 (Oberstufe, Qualifikationsphase / Abitur)
| Thema | Archiv-Sublevel |
| --- | --- |
| Kurvendiskussion mit Optimierungsaufgaben | `3.1.2.b` Anwendungsaufgaben Optimierung |
| Stammfunktionen und Grundregeln | `3.1.3.a` Stammfunktionen und Grundregeln |
| Bestimmtes Integral, Flaecheninhalt | `3.1.3.b` Bestimmtes Integral und Flaecheninhalt |
| Substitutionsregel (Integration, LK) | `3.1.3.c` Substitutionsregel |
| Partielle Integration (LK) | `3.1.3.d` Partielle Integration |
| Ableitung/Integration von e^x und ln(x) | `3.1.4.a` Ableitung und Integration von e^x und ln(x) |
| Wachstums- und Zerfallsmodelle | `3.1.4.b` Wachstums- und Zerfallsmodelle |
| Grenzwerte von Folgen | `3.1.5.b` Grenzwerte von Folgen |
| Bedingte Wahrscheinlichkeit | `3.2.1.a` Bedingte Wahrscheinlichkeit |
| Satz von Bayes | `3.2.1.b` Bayes-Theorem |
| Binomialverteilung | `3.2.2.a` Binomialverteilung |
| Erwartungswert und Varianz | `3.2.2.b` Erwartungswert und Varianz |
| Normalverteilung (LK) | `3.2.2.c` Normalverteilung |
| Geraden und Ebenen im Raum | `3.2.3.b` Geraden und Ebenen im Raum |
| Kreuzprodukt und geometrische Anwendungen (LK) | `3.2.3.c` Kreuzprodukt und geometrische Anwendungen |
| Komplexe Zahlen: kartesische Form und Betrag (Wahlthema/LK) | `3.3.1.a` Kartesische Form und Betrag |
| Komplexe Zahlen: Polarform, Eulersche Formel (Wahlthema/LK) | `3.3.1.b` Polarform und Eulersche Formel |
| Matrizen: Addition und Multiplikation (Wahlthema) | `3.4.1.a` Addition und Multiplikation |
| Matrizen: Determinante 2x2 (Wahlthema) | `3.4.1.b` Determinante (2x2) |
| Kegelschnitte: Parabel, Ellipse, Hyperbel (Wahlthema/LK) | `3.5.1.a` Parabel, Ellipse, Hyperbel |

## Coverage-Check gegen die Taxonomie
Jedes L1-, L2- und L3-Blattelement (`x.y.z.a/b/c/d`) aus `SOR_ARCHIVE.taxonomy` ist oben mindestens
einer Klassenstufe zugeordnet. Es gibt aktuell keine unbelegten Blattelemente in L1-L3.

Bekannte Einschraenkungen:
- Die Zuordnung ist Gymnasium-orientiert; Real-/Gesamtschul-Zeitplan verschiebt sich in der Praxis.
- Bundesland-spezifische Reihenfolgen (z. B. Vektorgeometrie vor/nach Stochastik) koennen abweichen;
  die fachliche Zuordnung zum Sublevel bleibt davon unberuehrt.
- Diese Matrix ordnet Themenbloecke zu, nicht einzelne Archiv-Aufgaben (`T-<level>-<id>`). Eine
  Aufgaben-genaue Klassenstufen-Markierung ist ein moeglicher spaeterer Ausbauschritt.

## Naechster moeglicher Schritt
- Diese Matrix als Grundlage nutzen, um bei zukuenftigen L1-L3-Content-Batches gezielt zu pruefen,
  ob alle Klassenstufen-Themen ausreichend Aufgaben-Tiefe haben (nicht nur Sublevel-Praesenz).
