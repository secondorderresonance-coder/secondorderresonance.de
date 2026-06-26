'use strict';
// Curriculum Coverage Matrix: Klasse 1-12 → SOR Archive (L1-L3)
// Source: KMK-Bildungsstandards Mathematik, Lehrplan Bayern/Deutschland
// Each grade maps to a set of archive sublevels and a primary entry point.
window.SOR_CURRICULUM = {
    version: "1.0.0",
    source: "KMK-Bildungsstandards Mathematik (Klasse 1–12)",
    grades: [
        {
            klasse: 1,
            label: "Klasse 1",
            schultyp: "Grundschule",
            primaryLevel: "1",
            primarySublevel: "1.1.1.a",
            coverage: [
                { sublevel: "1.1.1.a", topic: "Kopfrechnen und Rechenstrategien", thema: "Zahlen bis 20/100, einfache Addition und Subtraktion", coverage: "full" },
                { sublevel: "1.2.1.a", topic: "Geometrie",                        thema: "Formen erkennen: Rechteck, Quadrat, Dreieck, Kreis", coverage: "partial" },
                { sublevel: "1.3.2.a", topic: "Einheiten",                        thema: "Messen: Länge, Masse, Zeit (Einführung)", coverage: "partial" }
            ]
        },
        {
            klasse: 2,
            label: "Klasse 2",
            schultyp: "Grundschule",
            primaryLevel: "1",
            primarySublevel: "1.1.1.b",
            coverage: [
                { sublevel: "1.1.1.a", topic: "Kopfrechnen und Rechenstrategien", thema: "Zahlen bis 1000, Einmaleins (1×1)", coverage: "full" },
                { sublevel: "1.1.1.b", topic: "Schriftliches Rechnen",            thema: "Schriftliche Addition und Subtraktion", coverage: "full" },
                { sublevel: "1.2.1.a", topic: "Geometrie",                        thema: "Rechteck, Quadrat, Symmetrie", coverage: "partial" },
                { sublevel: "1.3.2.a", topic: "Einheiten",                        thema: "Länge und Zeit messen", coverage: "partial" }
            ]
        },
        {
            klasse: 3,
            label: "Klasse 3",
            schultyp: "Grundschule",
            primaryLevel: "1",
            primarySublevel: "1.1.1.b",
            coverage: [
                { sublevel: "1.1.1.b", topic: "Schriftliches Rechnen",            thema: "Schriftliche Multiplikation und Division, Zahlen bis 100.000", coverage: "full" },
                { sublevel: "1.1.2.a", topic: "Bruchrechnung",                    thema: "Einfache Brüche (1/2, 1/4, 1/3)", coverage: "partial" },
                { sublevel: "1.2.1.a", topic: "Geometrie",                        thema: "Fläche und Umfang Rechteck", coverage: "partial" },
                { sublevel: "1.3.2.a", topic: "Einheiten",                        thema: "Länge, Masse, Zeit: Umrechnungen einfach", coverage: "partial" }
            ]
        },
        {
            klasse: 4,
            label: "Klasse 4",
            schultyp: "Grundschule",
            primaryLevel: "1",
            primarySublevel: "1.1.3.a",
            coverage: [
                { sublevel: "1.1.1.b", topic: "Schriftliches Rechnen",            thema: "Schriftliche Division, Zahlen bis 1.000.000", coverage: "full" },
                { sublevel: "1.1.2.a", topic: "Bruchrechnung",                    thema: "Brüche benennen, vergleichen, kürzen", coverage: "full" },
                { sublevel: "1.1.2.b", topic: "Prozentrechnung",                  thema: "Prozentbegriff einfach", coverage: "partial" },
                { sublevel: "1.1.3.a", topic: "Dezimalzahlen",                    thema: "Kommazahlen lesen und schreiben", coverage: "full" },
                { sublevel: "1.2.2.a", topic: "Geometrie",                        thema: "Körper: Würfel, Quader, Volumen", coverage: "partial" },
                { sublevel: "1.4.1.a", topic: "Statistik",                        thema: "Daten und Diagramme lesen", coverage: "full" }
            ]
        },
        {
            klasse: 5,
            label: "Klasse 5",
            schultyp: "Sekundarstufe I (Unterstufe)",
            primaryLevel: "1",
            primarySublevel: "1.1.5.a",
            coverage: [
                { sublevel: "1.1.5.a", topic: "Teilbarkeit",                      thema: "Primzahlen, Primfaktorzerlegung", coverage: "full" },
                { sublevel: "1.1.5.b", topic: "Teilbarkeit",                      thema: "ggT und kgV", coverage: "full" },
                { sublevel: "1.1.2.a", topic: "Bruchrechnung",                    thema: "Brüche addieren, subtrahieren, kürzen", coverage: "full" },
                { sublevel: "1.1.2.c", topic: "Bruchrechnung",                    thema: "Brüche multiplizieren und dividieren", coverage: "full" },
                { sublevel: "1.1.3.a", topic: "Dezimalzahlen",                    thema: "Dezimalzahlen und Kommarechnung", coverage: "full" },
                { sublevel: "1.1.3.b", topic: "Dezimalzahlen",                    thema: "Runden und Schätzen", coverage: "full" },
                { sublevel: "1.3.1.a", topic: "Proportionalität",                 thema: "Dreisatz, proportionale Zuordnungen", coverage: "full" },
                { sublevel: "1.2.3.a", topic: "Geometrie",                        thema: "Winkelarten und -maße", coverage: "full" },
                { sublevel: "1.2.4.a", topic: "Koordinatensystem",                thema: "Punkte, Abstände, Koordinatensystem", coverage: "full" },
                { sublevel: "1.4.1.a", topic: "Statistik",                        thema: "Balken- und Kreisdiagramme lesen", coverage: "full" },
                { sublevel: "1.4.1.b", topic: "Statistik",                        thema: "Mittelwert und Häufigkeit", coverage: "partial" }
            ]
        },
        {
            klasse: 6,
            label: "Klasse 6",
            schultyp: "Sekundarstufe I (Unterstufe)",
            primaryLevel: "1",
            primarySublevel: "1.1.4.a",
            coverage: [
                { sublevel: "1.1.4.a", topic: "Negative Zahlen",                  thema: "Rechnen mit negativen Zahlen, Zahlengerade", coverage: "full" },
                { sublevel: "1.1.2.b", topic: "Prozentrechnung",                  thema: "Prozentwerte berechnen (Grundwert, Prozentwert, Prozentsatz)", coverage: "full" },
                { sublevel: "1.1.2.c", topic: "Bruchrechnung",                    thema: "Alle Grundrechenarten mit Brüchen", coverage: "full" },
                { sublevel: "1.3.1.b", topic: "Proportionalität",                 thema: "Antiproportionale Zuordnungen", coverage: "full" },
                { sublevel: "1.4.1.b", topic: "Statistik",                        thema: "Mittelwert, Modalwert, Median", coverage: "full" },
                { sublevel: "1.2.3.b", topic: "Geometrie",                        thema: "Dreieckstypen, Winkelberechnungen", coverage: "full" },
                { sublevel: "1.4.2.a", topic: "Wahrscheinlichkeit",               thema: "Einfache Zufallsexperimente, Laplace", coverage: "partial" }
            ]
        },
        {
            klasse: 7,
            label: "Klasse 7",
            schultyp: "Sekundarstufe I (Mittelstufe)",
            primaryLevel: "2",
            primarySublevel: "2.1.1.a",
            coverage: [
                { sublevel: "2.1.1.a", topic: "Gleichungen",                      thema: "Lineare Gleichungen lösen", coverage: "full" },
                { sublevel: "2.1.1.b", topic: "Gleichungen",                      thema: "Formeln umstellen", coverage: "full" },
                { sublevel: "1.3.1.a", topic: "Proportionalität",                 thema: "Proportionale Zuordnungen vertiefen", coverage: "full" },
                { sublevel: "1.3.1.b", topic: "Proportionalität",                 thema: "Antiproportionale Zuordnungen vertiefen", coverage: "full" },
                { sublevel: "1.3.2.b", topic: "Einheiten",                        thema: "Einheiten umrechnen (alle Bereiche)", coverage: "full" },
                { sublevel: "2.5.3.a", topic: "Geometrie",                        thema: "Satz des Pythagoras (Einstieg)", coverage: "full" },
                { sublevel: "2.5.1.b", topic: "Geometrie",                        thema: "Ähnliche Figuren", coverage: "partial" },
                { sublevel: "2.6.2.a", topic: "Wahrscheinlichkeit",               thema: "Laplace-Experiment, relative Häufigkeit", coverage: "full" }
            ]
        },
        {
            klasse: 8,
            label: "Klasse 8",
            schultyp: "Sekundarstufe I (Mittelstufe)",
            primaryLevel: "2",
            primarySublevel: "2.2.2.a",
            coverage: [
                { sublevel: "2.2.2.a", topic: "Lineare Funktionen",               thema: "Geradengleichung, Steigung, y-Achsenabschnitt", coverage: "full" },
                { sublevel: "2.2.2.b", topic: "Lineare Funktionen",               thema: "Parallele und senkrechte Geraden", coverage: "full" },
                { sublevel: "2.1.2.a", topic: "Gleichungssysteme",                thema: "LGS 2×2 (Substitution, Addition)", coverage: "full" },
                { sublevel: "2.1.3.a", topic: "Quadratische Gleichungen",         thema: "Lösungsformel (pq-Formel), Diskriminante", coverage: "full" },
                { sublevel: "2.5.3.a", topic: "Geometrie",                        thema: "Pythagoras (vertieft), Anwendungen", coverage: "full" },
                { sublevel: "2.5.2.a", topic: "Geometrie",                        thema: "Kreisumfang, Kreisfläche, Kreisabschnitte", coverage: "full" },
                { sublevel: "1.4.1.b", topic: "Statistik",                        thema: "Boxplot, Quartile", coverage: "partial" }
            ]
        },
        {
            klasse: 9,
            label: "Klasse 9",
            schultyp: "Sekundarstufe I (Mittelstufe)",
            primaryLevel: "2",
            primarySublevel: "2.2.3.a",
            coverage: [
                { sublevel: "2.2.3.a", topic: "Quadratische Funktionen",          thema: "Parabelscheitel, Nullstellen, Scheitelform", coverage: "full" },
                { sublevel: "2.2.3.b", topic: "Quadratische Funktionen",          thema: "Verschiebung und Streckung der Parabel", coverage: "full" },
                { sublevel: "2.4.1.a", topic: "Trigonometrie",                    thema: "sin, cos, tan im rechtwinkligen Dreieck", coverage: "full" },
                { sublevel: "2.5.1.a", topic: "Geometrie",                        thema: "Strahlensatz", coverage: "full" },
                { sublevel: "2.1.3.b", topic: "Quadratische Gleichungen",         thema: "Faktorisierung quadratischer Ausdrücke", coverage: "full" },
                { sublevel: "2.1.4.a", topic: "Ungleichungen",                    thema: "Lineare Ungleichungen lösen", coverage: "full" },
                { sublevel: "2.6.2.b", topic: "Wahrscheinlichkeit",               thema: "Baumdiagramm, mehrstufige Zufallsexperimente", coverage: "full" }
            ]
        },
        {
            klasse: 10,
            label: "Klasse 10",
            schultyp: "Sekundarstufe I (Mittelstufe)",
            primaryLevel: "2",
            primarySublevel: "2.3.1.a",
            coverage: [
                { sublevel: "2.3.1.a", topic: "Potenzen",                         thema: "Potenzgesetze und Rechenregeln", coverage: "full" },
                { sublevel: "2.3.1.b", topic: "Potenzen",                         thema: "Negative und gebrochene Exponenten", coverage: "full" },
                { sublevel: "2.3.2.a", topic: "Wurzeln",                          thema: "Quadrat- und Kubikwurzeln", coverage: "full" },
                { sublevel: "2.3.2.b", topic: "Wurzeln",                          thema: "Vereinfachen von Wurzeltermen", coverage: "full" },
                { sublevel: "2.3.3.a", topic: "Logarithmen",                      thema: "Logarithmusbegriff, Rechenregeln", coverage: "full" },
                { sublevel: "2.2.1.a", topic: "Exponentialfunktionen",            thema: "Exponentielles Wachstum", coverage: "full" },
                { sublevel: "2.2.1.c", topic: "Exponentialfunktionen",            thema: "Halbwertszeit", coverage: "full" },
                { sublevel: "2.5.2.b", topic: "Kreisgeometrie",                   thema: "Sehnen und Tangenten", coverage: "full" },
                { sublevel: "2.4.1.b", topic: "Trigonometrie",                    thema: "Bogenmass und Winkelumrechnung", coverage: "full" },
                { sublevel: "2.4.3.a", topic: "Trigonometrie",                    thema: "Einheitskreis, Sinusfunktion, Kosinusfunktion", coverage: "partial" },
                { sublevel: "2.6.1.a", topic: "Kombinatorik",                     thema: "Permutationen und Kombinationen", coverage: "full" },
                { sublevel: "2.6.1.b", topic: "Kombinatorik",                     thema: "Binomialkoeffizient", coverage: "partial" }
            ]
        },
        {
            klasse: 11,
            label: "Klasse 11",
            schultyp: "Oberstufe (Sekundarstufe II)",
            primaryLevel: "3",
            primarySublevel: "3.1.1.a",
            coverage: [
                { sublevel: "3.1.1.a", topic: "Ableitungen",                      thema: "Ableitungsregeln (Ketten-, Produkt-, Quotientenregel)", coverage: "full" },
                { sublevel: "3.1.1.b", topic: "Ableitungen",                      thema: "Monotonie und Extremstellen", coverage: "full" },
                { sublevel: "3.1.1.c", topic: "Ableitungen",                      thema: "Krümmung, Wendepunkte, zweite Ableitung", coverage: "full" },
                { sublevel: "3.1.2.a", topic: "Kurvendiskussion",                 thema: "Vollständige Kurvendiskussion", coverage: "full" },
                { sublevel: "3.1.3.a", topic: "Integralrechnung",                 thema: "Stammfunktionen und Grundregeln", coverage: "full" },
                { sublevel: "3.1.3.b", topic: "Integralrechnung",                 thema: "Bestimmtes Integral, Flächeninhalt", coverage: "full" },
                { sublevel: "3.1.4.a", topic: "Exponentialfunktionen",            thema: "Ableitung und Integration von e^x und ln(x)", coverage: "full" },
                { sublevel: "3.1.4.b", topic: "Exponentialfunktionen",            thema: "Wachstums- und Zerfallsmodelle", coverage: "full" },
                { sublevel: "3.2.2.a", topic: "Stochastik",                       thema: "Binomialverteilung, Erwartungswert", coverage: "full" },
                { sublevel: "3.2.2.c", topic: "Stochastik",                       thema: "Normalverteilung (Einstieg)", coverage: "partial" }
            ]
        },
        {
            klasse: 12,
            label: "Klasse 12",
            schultyp: "Oberstufe / Abitur (Sekundarstufe II)",
            primaryLevel: "3",
            primarySublevel: "3.1.2.b",
            coverage: [
                { sublevel: "3.1.2.b", topic: "Kurvendiskussion",                 thema: "Anwendungsaufgaben Optimierung", coverage: "full" },
                { sublevel: "3.1.3.c", topic: "Integralrechnung",                 thema: "Substitutionsregel", coverage: "full" },
                { sublevel: "3.1.3.d", topic: "Integralrechnung",                 thema: "Partielle Integration", coverage: "full" },
                { sublevel: "3.1.5.a", topic: "Folgen und Reihen",                thema: "Arithmetische und geometrische Folgen", coverage: "full" },
                { sublevel: "3.1.5.b", topic: "Folgen und Reihen",                thema: "Grenzwerte von Folgen", coverage: "full" },
                { sublevel: "3.2.1.a", topic: "Stochastik",                       thema: "Bedingte Wahrscheinlichkeit", coverage: "full" },
                { sublevel: "3.2.1.b", topic: "Stochastik",                       thema: "Bayes-Theorem", coverage: "full" },
                { sublevel: "3.2.2.b", topic: "Stochastik",                       thema: "Erwartungswert und Varianz von Zufallsvariablen", coverage: "full" },
                { sublevel: "3.2.2.c", topic: "Stochastik",                       thema: "Normalverteilung (vertieft)", coverage: "full" },
                { sublevel: "3.2.3.a", topic: "Vektoren",                         thema: "Vektoroperationen und Skalarprodukt", coverage: "full" },
                { sublevel: "3.2.3.b", topic: "Vektoren",                         thema: "Geraden und Ebenen im Raum", coverage: "full" },
                { sublevel: "3.2.3.c", topic: "Vektoren",                         thema: "Kreuzprodukt und geometrische Anwendungen", coverage: "full" },
                { sublevel: "3.3.1.a", topic: "Komplexe Zahlen",                  thema: "Kartesische Form und Betrag (optional)", coverage: "partial" },
                { sublevel: "3.4.1.a", topic: "Matrizen",                         thema: "Matrixoperationen, Determinante (optional)", coverage: "partial" }
            ]
        }
    ]
};
