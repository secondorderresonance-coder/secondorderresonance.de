# Curriculum Coverage Matrix: Klasse 1-12 -> L1-L3 Archive Sections

## Purpose
This document maps typical German school curriculum topics (Klasse 1-12, Gymnasium-oriented, general/KMK-Bildungsstandards style) to the concrete L1-L3 sublevels already defined in `app/data/archive-content.js` (`window.SOR_ARCHIVE.taxonomy`).

It exists so that:
- future archive content batches for L1-L3 can be planned against real school coverage instead of ad-hoc topic choice
- gaps in the current taxonomy are visible and explicit instead of silently missing
- the mapping stays reviewable as one document instead of scattered notes

This is a planning/reference document. It does not change any runtime code, task content, or the taxonomy itself.

## Scope and method
- Grade bands follow the common Gymnasium structure (Grundschule Klasse 1-4, Sekundarstufe I Klasse 5-10, Sekundarstufe II/Oberstufe Klasse 11-12/13).
- Exact topic sequencing differs by German Bundesland; this matrix uses the typical cross-state ordering, not one specific Lehrplan.
- Each row maps a curriculum topic to the closest existing sublevel id(s) in the archive taxonomy.
- Where no adequate sublevel exists yet, the row is marked as a **gap** instead of forcing an inaccurate mapping.

## Klasse 1-2 (Grundschule, Anfangsunterricht)
| Topic | Mapped sublevel(s) | Notes |
| --- | --- | --- |
| Zahlraum bis 100, Grundrechenarten | `1.1.1.a` Kopfrechnen und Rechenstrategien | Only partial fit; archive tasks currently target a higher formal level than typical Klasse 1-2 exercises. |
| Formen und einfache Muster | *(gap)* | No dedicated early-Grundschule geometry sublevel exists yet. |

**Gap note:** Klasse 1-2 numeracy is largely pre-formal (counting, basic shape recognition) and is not yet represented as discrete archive sublevels. This is a deliberate low-priority gap: the current archive targets Klasse 3+ upward as its practical starting point.

## Klasse 3-4 (Grundschule)
| Topic | Mapped sublevel(s) | Notes |
| --- | --- | --- |
| Schriftliche Rechenverfahren | `1.1.1.b` Schriftliches Rechnen | Direct match. |
| Einfache Brueche (Anteile, Kuerzen) | `1.1.2.a` Brueche addieren und kuerzen | Introductory slice of a broader sublevel. |
| Groessen und Einheiten (Laenge, Masse, Zeit, Volumen) | `1.3.2.a`, `1.3.2.b` | Direct match. |
| Flaechen und Umfang einfacher Figuren | `1.2.1.a`, `1.2.1.b` | Direct match. |
| Koerper (Wuerfel, Quader) | `1.2.2.a` | Direct match. |
| Diagramme lesen und einfache Auswertung | `1.4.1.a`, `1.4.1.b` | Direct match. |

## Klasse 5
| Topic | Mapped sublevel(s) | Notes |
| --- | --- | --- |
| Bruchrechnung (Addition, Kuerzen, Multiplikation, Division) | `1.1.2.a`, `1.1.2.c` | Direct match. |
| Dezimalzahlen und Kommarechnung | `1.1.3.a`, `1.1.3.b` | Direct match. |
| Negative Zahlen | `1.1.4.a` | Direct match. |
| Winkelarten und -masse | `1.2.3.a` | Direct match. |
| Koordinatensystem (Punkte, Abstaende) | `1.2.4.a` | Direct match. |
| Teilbarkeit, Primfaktorzerlegung | `1.1.5.a`, `1.1.5.b` | Direct match. |

## Klasse 6
| Topic | Mapped sublevel(s) | Notes |
| --- | --- | --- |
| Prozentrechnung im Alltag | `1.1.2.b` Prozentwerte im Alltag | Direct match. |
| Dreisatz (proportional/antiproportional) | `1.3.1.a`, `1.3.1.b` | Direct match. |
| Kreis: Umfang und Flaeche (Einstieg) | `1.2.1.a` (basis), bridges into `2.5.2.a` later | Early introduction overlaps with the deeper L2 Kreisgeometrie sublevel; both are correct, at different depth. |
| Grundlagen Wahrscheinlichkeit (Zufallsexperimente) | `1.4.2.a` | Direct match. |
| Dreieckstypen und Eigenschaften | `1.2.3.b` | Direct match. |

## Klasse 7
| Topic | Mapped sublevel(s) | Notes |
| --- | --- | --- |
| Terme aufstellen und vereinfachen | *(gap)* | No dedicated "Terme vereinfachen/Termumformung" sublevel exists under `2.1`; content currently jumps straight to equation solving. |
| Lineare Gleichungen loesen | `2.1.1.a` | Direct match. |
| Formeln umstellen | `2.1.1.b` | Direct match. |
| Zuordnungen vertieft (proportional/antiproportional) | `1.3.1.a`, `1.3.1.b` | Reuses the L1 sublevel at higher difficulty; no separate L2 sublevel exists yet. |
| Zinsrechnung | *(gap)* | No dedicated sublevel; closest existing content is `1.1.2.b` Prozentwerte, which does not cover interest-specific tasks (Zinseszins etc.). |
| Dreieckskonstruktion, Winkelsumme | `1.2.3.b` (partial) | Construction-specific tasks (Zirkel/Lineal steps) are not represented; only the property-based sublevel exists. |

## Klasse 8
| Topic | Mapped sublevel(s) | Notes |
| --- | --- | --- |
| Lineare Funktionen (Geradengleichung, Steigung) | `2.2.2.a`, `2.2.2.b` | Direct match. |
| Lineare Gleichungssysteme | `2.1.2.a`, `2.1.2.b` | Direct match. |
| Strahlensaetze und Aehnlichkeit | `2.5.1.a`, `2.5.1.b` | Direct match. |
| Wurzeln (Quadrat-, Kubikwurzeln, Vereinfachen) | `2.3.2.a`, `2.3.2.b` | Direct match. |

## Klasse 9
| Topic | Mapped sublevel(s) | Notes |
| --- | --- | --- |
| Quadratische Gleichungen (Loesungsformel, Faktorisierung) | `2.1.3.a`, `2.1.3.b` | Direct match. |
| Quadratische Funktionen (Scheitel, Nullstellen, Verschiebung) | `2.2.3.a`, `2.2.3.b` | Direct match. |
| Satz des Pythagoras (Anwendungen) | `2.5.3.a` | Direct match; also connected to the interactive Pythagoras module. |
| Potenzgesetze vertieft (negative/gebrochene Exponenten) | `2.3.1.a`, `2.3.1.b` | Direct match. |
| Trigonometrie am rechtwinkligen Dreieck (Einstieg) | `2.4.1.a`, `2.4.1.b` | Direct match. |
| Kreisgeometrie (Sehnen, Tangenten) | `2.5.2.a`, `2.5.2.b` | Direct match. |

## Klasse 10
| Topic | Mapped sublevel(s) | Notes |
| --- | --- | --- |
| Sinus- und Kosinussatz (allgemeines Dreieck) | `2.4.2.a` | Direct match. |
| Einheitskreis und Periodizitaet | `2.4.3.a`, `2.4.3.b` | Direct match. |
| Exponentielles Wachstum und Zerfall, Halbwertszeit | `2.2.1.a`, `2.2.1.b`, `2.2.1.c` | Direct match. |
| Logarithmen (Definition, Rechenregeln, Gleichungen) | `2.3.3.a`, `2.3.3.b` | Direct match. |
| Kombinatorik (Permutation, Kombination, Binomialkoeffizient) | `2.6.1.a`, `2.6.1.b` | Direct match. |
| Laplace-Wahrscheinlichkeit, Baumdiagramme | `2.6.2.a`, `2.6.2.b` | Direct match. |
| Ungleichungen (linear, Betrag) | `2.1.4.a`, `2.1.4.b` | Direct match. |

## Klasse 11 (Einfuehrungsphase / Oberstufe Beginn)
| Topic | Mapped sublevel(s) | Notes |
| --- | --- | --- |
| Ableitungsregeln (Ketten-, Produkt-, Quotientenregel) | `3.1.1.a` | Direct match. |
| Monotonie und Extremstellen | `3.1.1.b` | Direct match. |
| Umkehrfunktionen und Komposition | `2.2.4.a` | Bridging topic, often revisited at the start of Oberstufe. |
| Folgen und Reihen (arithmetisch/geometrisch, Grenzwerte) | `3.1.5.a`, `3.1.5.b` | Direct match. |
| Vektoren im Raum (Einstieg) | `3.2.3.a` | Direct match. |

## Klasse 12/13 (Qualifikationsphase, je nach G8/G9)
| Topic | Mapped sublevel(s) | Notes |
| --- | --- | --- |
| Vollstaendige Kurvendiskussion, Optimierungsaufgaben | `3.1.2.a`, `3.1.2.b` | Direct match. |
| Integralrechnung (Stammfunktionen, bestimmtes Integral, Substitution, partielle Integration) | `3.1.3.a`, `3.1.3.b`, `3.1.3.c`, `3.1.3.d` | Direct match. |
| Ableitung/Integration von e^x und ln(x), Wachstumsmodelle | `3.1.4.a`, `3.1.4.b` | Direct match. |
| Bedingte Wahrscheinlichkeit, Bayes-Theorem | `3.2.1.a`, `3.2.1.b` | Direct match. |
| Binomialverteilung, Erwartungswert/Varianz, Normalverteilung | `3.2.2.a`, `3.2.2.b`, `3.2.2.c` | Direct match. |
| Vektorgeometrie (Geraden/Ebenen, Kreuzprodukt) | `3.2.3.b`, `3.2.3.c` | Direct match. |
| Kegelschnitte (analytische Geometrie) | `3.5.1.a` | Direct match. |
| Komplexe Zahlen (Leistungskurs-Erweiterung) | `3.3.1.a`, `3.3.1.b` | Direct match; commonly Leistungskurs-only in several Bundeslaender. |
| Matrizen (Leistungskurs-Erweiterung) | `3.4.1.a`, `3.4.1.b` | Direct match; commonly Leistungskurs-only in several Bundeslaender. |

## Coverage summary
- Klasse 3-10 topics have near-complete direct mappings into existing L1-L2 sublevels.
- Klasse 11-13 topics have near-complete direct mappings into existing L3 sublevels.
- Klasse 1-2 is intentionally the weakest-covered band; it is the lowest-priority gap given the product's current Klasse-3-and-up starting point.

## Open gaps for future content batches
1. Dedicated "Terme vereinfachen / Termumformung" sublevel (Klasse 7 entry point into `2.1`).
2. Dedicated "Zinsrechnung" sublevel (Klasse 7, extends `1.1.2.b`).
3. Dedicated construction-based geometry sublevel for Dreieckskonstruktion (Klasse 6-7).
4. A dedicated L2 "Zuordnungen vertieft" sublevel, instead of reusing the L1 Dreisatz sublevel at higher difficulty.
5. Optional: an early-Grundschule (Klasse 1-2) sublevel band if the product later decides to serve this age group directly.

These gaps are recommendations for future small, reviewable archive-taxonomy batches; they are not implemented in this change.
