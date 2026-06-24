/**
 * SOR Curriculum Coverage Matrix – Klasse 1–12 → L1–L3 archive sublevels.
 *
 * Each entry maps one school year to the set of SOR archive sublevels that
 * cover its core curriculum.  The mapping follows the common German school
 * mathematics curriculum (Kernlehrplan) and is intentionally broad enough to
 * span both Gymnasium and Realschule tracks.
 *
 * sublevels[]  – IDs that match taxonomy entries in archive-content.js
 * archivLevel  – primary SOR level badge (L1 / L2 / L3)
 */
window.SOR_CURRICULUM_COVERAGE = {
    version: "1.0",
    description: "Lehrplan-Abdeckungsmatrix Klasse 1–12 → L1–L3 Archiv-Sublevels",
    klassen: [
        {
            klasse: 1,
            label: "Klasse 1",
            schulform: "Grundschule",
            archivLevel: "L1",
            topics: [
                {
                    name: "Zahlen bis 20 / Zahlen bis 100",
                    themenbereich: "Arithmetik",
                    sublevels: ["1.1.1.a"]
                },
                {
                    name: "Addition und Subtraktion (Kopfrechnen)",
                    themenbereich: "Arithmetik",
                    sublevels: ["1.1.1.a"]
                },
                {
                    name: "Einfache Geometrie – Formen erkennen",
                    themenbereich: "Geometrie",
                    sublevels: ["1.2.3.b"]
                }
            ]
        },
        {
            klasse: 2,
            label: "Klasse 2",
            schulform: "Grundschule",
            archivLevel: "L1",
            topics: [
                {
                    name: "Einmaleins (Multiplikation und Division)",
                    themenbereich: "Arithmetik",
                    sublevels: ["1.1.1.a", "1.1.1.b"]
                },
                {
                    name: "Addition und Subtraktion bis 1000",
                    themenbereich: "Arithmetik",
                    sublevels: ["1.1.1.b"]
                },
                {
                    name: "Längen, Massen, Zeiteinheiten",
                    themenbereich: "Größen und Messen",
                    sublevels: ["1.3.2.a", "1.3.2.b"]
                },
                {
                    name: "Diagramme lesen (Balken, Bilder)",
                    themenbereich: "Statistik",
                    sublevels: ["1.4.1.a"]
                }
            ]
        },
        {
            klasse: 3,
            label: "Klasse 3",
            schulform: "Grundschule",
            archivLevel: "L1",
            topics: [
                {
                    name: "Schriftliche Multiplikation und Division",
                    themenbereich: "Arithmetik",
                    sublevels: ["1.1.1.b"]
                },
                {
                    name: "Brüche kennenlernen (½, ¼, ¾)",
                    themenbereich: "Bruchrechnung",
                    sublevels: ["1.1.2.a"]
                },
                {
                    name: "Fläche und Umfang (Rechteck)",
                    themenbereich: "Geometrie",
                    sublevels: ["1.2.1.a"]
                },
                {
                    name: "Mittelwert und Häufigkeit",
                    themenbereich: "Statistik",
                    sublevels: ["1.4.1.b"]
                }
            ]
        },
        {
            klasse: 4,
            label: "Klasse 4",
            schulform: "Grundschule",
            archivLevel: "L1",
            topics: [
                {
                    name: "Brüche erweitern, kürzen, addieren",
                    themenbereich: "Bruchrechnung",
                    sublevels: ["1.1.2.a"]
                },
                {
                    name: "Dezimalzahlen einführen",
                    themenbereich: "Dezimalzahlen",
                    sublevels: ["1.1.3.a"]
                },
                {
                    name: "Prozentwerte im Alltag (Einführung)",
                    themenbereich: "Prozentrechnung",
                    sublevels: ["1.1.2.b"]
                },
                {
                    name: "Körper und Volumen (Quader)",
                    themenbereich: "Geometrie",
                    sublevels: ["1.2.2.a"]
                },
                {
                    name: "Proportionale Zuordnungen (Dreisatz Einstieg)",
                    themenbereich: "Proportionalität",
                    sublevels: ["1.3.1.a"]
                }
            ]
        },
        {
            klasse: 5,
            label: "Klasse 5",
            schulform: "Unterstufe",
            archivLevel: "L1",
            topics: [
                {
                    name: "Negative Zahlen einführen",
                    themenbereich: "Zahlenmengen",
                    sublevels: ["1.1.4.a"]
                },
                {
                    name: "Brüche multiplizieren und dividieren",
                    themenbereich: "Bruchrechnung",
                    sublevels: ["1.1.2.c"]
                },
                {
                    name: "Runden und Schätzen",
                    themenbereich: "Dezimalzahlen",
                    sublevels: ["1.1.3.b"]
                },
                {
                    name: "Koordinatensystem (Punkte, Abstände)",
                    themenbereich: "Geometrie",
                    sublevels: ["1.2.4.a"]
                },
                {
                    name: "Fläche zusammengesetzter Figuren",
                    themenbereich: "Geometrie",
                    sublevels: ["1.2.1.b"]
                },
                {
                    name: "Einfache Zufallsexperimente",
                    themenbereich: "Wahrscheinlichkeit",
                    sublevels: ["1.4.2.a"]
                }
            ]
        },
        {
            klasse: 6,
            label: "Klasse 6",
            schulform: "Unterstufe",
            archivLevel: "L1",
            topics: [
                {
                    name: "Primfaktorzerlegung, ggT, kgV",
                    themenbereich: "Teilbarkeit",
                    sublevels: ["1.1.5.a", "1.1.5.b"]
                },
                {
                    name: "Proportionale Zuordnungen / Dreisatz",
                    themenbereich: "Proportionalität",
                    sublevels: ["1.3.1.a", "1.3.1.b"]
                },
                {
                    name: "Winkelarten und Dreieckstypen",
                    themenbereich: "Geometrie",
                    sublevels: ["1.2.3.a", "1.2.3.b"]
                },
                {
                    name: "Kreisumfang und Kreisfläche (Einführung)",
                    themenbereich: "Geometrie",
                    sublevels: ["1.2.1.a"]
                }
            ]
        },
        {
            klasse: 7,
            label: "Klasse 7",
            schulform: "Mittelstufe",
            archivLevel: "L2",
            topics: [
                {
                    name: "Terme und Variablen",
                    themenbereich: "Algebra",
                    sublevels: ["2.1.1.a"]
                },
                {
                    name: "Lineare Gleichungen lösen",
                    themenbereich: "Gleichungen",
                    sublevels: ["2.1.1.a", "2.1.1.b"]
                },
                {
                    name: "Proportionale und antiproportionale Zuordnungen",
                    themenbereich: "Proportionalität",
                    sublevels: ["1.3.1.b"]
                },
                {
                    name: "Lineare Funktionen und Geradengleichung",
                    themenbereich: "Funktionen",
                    sublevels: ["2.2.2.a"]
                },
                {
                    name: "Statistik: Median, Modus, Boxplot",
                    themenbereich: "Statistik",
                    sublevels: ["1.4.1.b"]
                }
            ]
        },
        {
            klasse: 8,
            label: "Klasse 8",
            schulform: "Mittelstufe",
            archivLevel: "L2",
            topics: [
                {
                    name: "Lineare Gleichungssysteme",
                    themenbereich: "Gleichungen",
                    sublevels: ["2.1.2.a"]
                },
                {
                    name: "Quadratische Gleichungen (Lösungsformel, Diskriminante)",
                    themenbereich: "Gleichungen",
                    sublevels: ["2.1.3.a", "2.1.3.b"]
                },
                {
                    name: "Satz des Pythagoras",
                    themenbereich: "Geometrie",
                    sublevels: ["2.5.3.a"]
                },
                {
                    name: "Ähnlichkeit und Strahlensatz",
                    themenbereich: "Geometrie",
                    sublevels: ["2.5.1.a", "2.5.1.b"]
                },
                {
                    name: "Potenzgesetze und negative Exponenten",
                    themenbereich: "Potenzen",
                    sublevels: ["2.3.1.a", "2.3.1.b"]
                }
            ]
        },
        {
            klasse: 9,
            label: "Klasse 9",
            schulform: "Mittelstufe",
            archivLevel: "L2",
            topics: [
                {
                    name: "Quadratische Funktionen (Parabelscheitel, Nullstellen)",
                    themenbereich: "Funktionen",
                    sublevels: ["2.2.3.a", "2.2.3.b"]
                },
                {
                    name: "Trigonometrie am rechtwinkligen Dreieck",
                    themenbereich: "Trigonometrie",
                    sublevels: ["2.4.1.a"]
                },
                {
                    name: "Wurzeln vereinfachen",
                    themenbereich: "Wurzeln",
                    sublevels: ["2.3.2.a", "2.3.2.b"]
                },
                {
                    name: "Grundlegende Wahrscheinlichkeitsrechnung (Laplace, Baumdiagramm)",
                    themenbereich: "Wahrscheinlichkeit",
                    sublevels: ["2.6.2.a", "2.6.2.b"]
                },
                {
                    name: "Gleichungen mit Brüchen",
                    themenbereich: "Gleichungen",
                    sublevels: ["2.1.1.c"]
                }
            ]
        },
        {
            klasse: 10,
            label: "Klasse 10",
            schulform: "Mittelstufe / MSA",
            archivLevel: "L2",
            topics: [
                {
                    name: "Logarithmen (Definition, Rechenregeln, Gleichungen)",
                    themenbereich: "Logarithmen",
                    sublevels: ["2.3.3.a", "2.3.3.b"]
                },
                {
                    name: "Exponentielles Wachstum und Zerfall / Halbwertszeit",
                    themenbereich: "Funktionen",
                    sublevels: ["2.2.1.a", "2.2.1.b", "2.2.1.c"]
                },
                {
                    name: "Sinussatz und Kosinussatz",
                    themenbereich: "Trigonometrie",
                    sublevels: ["2.4.2.a"]
                },
                {
                    name: "Kombinatorik (Permutationen, Kombinationen)",
                    themenbereich: "Kombinatorik",
                    sublevels: ["2.6.1.a", "2.6.1.b"]
                },
                {
                    name: "Kreisgeometrie (Sehnen, Tangenten)",
                    themenbereich: "Geometrie",
                    sublevels: ["2.5.2.a", "2.5.2.b"]
                },
                {
                    name: "Parallele und senkrechte Geraden",
                    themenbereich: "Funktionen",
                    sublevels: ["2.2.2.b"]
                }
            ]
        },
        {
            klasse: 11,
            label: "Klasse 11",
            schulform: "Oberstufe",
            archivLevel: "L3",
            topics: [
                {
                    name: "Ableitungsregeln (Ketten-, Produkt-, Quotientenregel)",
                    themenbereich: "Analysis",
                    sublevels: ["3.1.1.a"]
                },
                {
                    name: "Monotonie und Extremstellen",
                    themenbereich: "Analysis",
                    sublevels: ["3.1.1.b"]
                },
                {
                    name: "Krümmung und Wendepunkte",
                    themenbereich: "Analysis",
                    sublevels: ["3.1.1.c"]
                },
                {
                    name: "Vektoren und Skalarprodukt",
                    themenbereich: "Vektoren",
                    sublevels: ["3.2.3.a"]
                },
                {
                    name: "Geraden und Ebenen im Raum",
                    themenbereich: "Vektoren",
                    sublevels: ["3.2.3.b"]
                },
                {
                    name: "Ableitung und Integration von e^x und ln(x)",
                    themenbereich: "Analysis",
                    sublevels: ["3.1.4.a"]
                },
                {
                    name: "Arithmetische und geometrische Folgen",
                    themenbereich: "Folgen",
                    sublevels: ["3.1.5.a"]
                }
            ]
        },
        {
            klasse: 12,
            label: "Klasse 12",
            schulform: "Oberstufe / Abitur",
            archivLevel: "L3",
            topics: [
                {
                    name: "Vollständige Kurvendiskussion",
                    themenbereich: "Analysis",
                    sublevels: ["3.1.2.a"]
                },
                {
                    name: "Anwendungsaufgaben Optimierung",
                    themenbereich: "Analysis",
                    sublevels: ["3.1.2.b"]
                },
                {
                    name: "Stammfunktionen und Integralrechnung",
                    themenbereich: "Analysis",
                    sublevels: ["3.1.3.a", "3.1.3.b"]
                },
                {
                    name: "Substitutionsregel und partielle Integration",
                    themenbereich: "Analysis",
                    sublevels: ["3.1.3.c", "3.1.3.d"]
                },
                {
                    name: "Binomialverteilung und Normalverteilung",
                    themenbereich: "Stochastik",
                    sublevels: ["3.2.2.a", "3.2.2.c"]
                },
                {
                    name: "Bedingte Wahrscheinlichkeit und Bayes",
                    themenbereich: "Stochastik",
                    sublevels: ["3.2.1.a", "3.2.1.b"]
                },
                {
                    name: "Kreuzprodukt und geometrische Anwendungen",
                    themenbereich: "Vektoren",
                    sublevels: ["3.2.3.c"]
                },
                {
                    name: "Komplexe Zahlen: kartesische Form und Polarform",
                    themenbereich: "Komplexe Zahlen",
                    sublevels: ["3.3.1.a", "3.3.1.b"]
                },
                {
                    name: "Matrixoperationen und Determinante (Einstieg)",
                    themenbereich: "Lineare Algebra",
                    sublevels: ["3.4.1.a", "3.4.1.b"]
                }
            ]
        }
    ]
};
