/**
 * SOR Curriculum Coverage Matrix – Klasse 1–12 → L1–L3 Archivabschnitte
 *
 * Maps each school grade band to the relevant SOR archive sublevels (L1–L3).
 * The archiveSublevels arrays reference IDs from SOR_ARCHIVE.taxonomy.
 * This data structure is intentionally separated so future features can filter
 * archive tasks by school grade without modifying archive-content.js.
 */
window.SOR_CURRICULUM_COVERAGE = {
    version: "1.0",
    description: "Lehrplancoverage Klasse 1–12 auf L1–L3-Archivabschnitte",
    lastUpdated: "2026-06-21",

    /**
     * Structured grade-band entries.
     * Each entry covers one grade band with a list of topic mappings.
     * - klasse: [from, to] inclusive
     * - level: primary SOR level code ("1", "2", or "3")
     * - topics: array of { topic, subject, archiveSublevels[] }
     *   archiveSublevels lists the most relevant sublevel IDs from the taxonomy.
     */
    grades: [
        {
            klasse: [1, 2],
            title: "Klasse 1–2",
            level: "1",
            summary: "Zählen, Grundrechenarten, erste Geometrie",
            topics: [
                {
                    subject: "Arithmetik",
                    topic: "Zahlen bis 100 – Zählen, Vergleichen, Ordnen",
                    archiveSublevels: ["1.1.1", "1.1.1.a"]
                },
                {
                    subject: "Arithmetik",
                    topic: "Addition und Subtraktion bis 100 (Kopfrechnen)",
                    archiveSublevels: ["1.1.1.a"]
                },
                {
                    subject: "Arithmetik",
                    topic: "Kleines Einmaleins und erste Division",
                    archiveSublevels: ["1.1.1.a", "1.1.1.b"]
                },
                {
                    subject: "Geometrie",
                    topic: "Formen erkennen und benennen (Kreis, Quadrat, Dreieck)",
                    archiveSublevels: ["1.2.3", "1.2.3.b"]
                },
                {
                    subject: "Größen",
                    topic: "Längen und Zeit im Alltag (cm, m, Minuten, Stunden)",
                    archiveSublevels: ["1.3.2", "1.3.2.a"]
                }
            ]
        },
        {
            klasse: [3, 4],
            title: "Klasse 3–4",
            level: "1",
            summary: "Schriftliche Rechenverfahren, Brüche (einführend), Flächen, Einheiten",
            topics: [
                {
                    subject: "Arithmetik",
                    topic: "Zahlen bis 1.000.000 – Stellenwerte, Runden",
                    archiveSublevels: ["1.1.1.b", "1.1.3.b"]
                },
                {
                    subject: "Arithmetik",
                    topic: "Schriftliche Addition, Subtraktion, Multiplikation",
                    archiveSublevels: ["1.1.1.b"]
                },
                {
                    subject: "Arithmetik",
                    topic: "Schriftliche Division, Halbschriftliches Rechnen",
                    archiveSublevels: ["1.1.1.b"]
                },
                {
                    subject: "Brüche",
                    topic: "Bruchbegriff – Hälften, Drittel, Viertel",
                    archiveSublevels: ["1.1.2", "1.1.2.a"]
                },
                {
                    subject: "Geometrie",
                    topic: "Fläche und Umfang (Rechteck, Quadrat)",
                    archiveSublevels: ["1.2.1", "1.2.1.a"]
                },
                {
                    subject: "Größen",
                    topic: "Länge, Masse, Zeit, Volumen – Einheitenumrechnung",
                    archiveSublevels: ["1.3.2", "1.3.2.a", "1.3.2.b"]
                },
                {
                    subject: "Daten",
                    topic: "Balken- und Kreisdiagramme lesen und erstellen",
                    archiveSublevels: ["1.4.1", "1.4.1.a"]
                }
            ]
        },
        {
            klasse: [5, 6],
            title: "Klasse 5–6",
            level: "1",
            summary: "Bruchrechnung, Dezimalzahlen, negative Zahlen, Proportionalität, Wahrscheinlichkeit",
            topics: [
                {
                    subject: "Brüche",
                    topic: "Brüche erweitern, kürzen, addieren, subtrahieren",
                    archiveSublevels: ["1.1.2", "1.1.2.a"]
                },
                {
                    subject: "Brüche",
                    topic: "Brüche multiplizieren und dividieren",
                    archiveSublevels: ["1.1.2.c"]
                },
                {
                    subject: "Dezimalzahlen",
                    topic: "Dezimalzahlen und Kommarechnung",
                    archiveSublevels: ["1.1.3", "1.1.3.a"]
                },
                {
                    subject: "Dezimalzahlen",
                    topic: "Runden und Schätzen",
                    archiveSublevels: ["1.1.3.b"]
                },
                {
                    subject: "Arithmetik",
                    topic: "Negative Zahlen – Rechnen auf der Zahlengeraden",
                    archiveSublevels: ["1.1.4", "1.1.4.a"]
                },
                {
                    subject: "Proportionalität",
                    topic: "Proportionale Zuordnungen, Dreisatz",
                    archiveSublevels: ["1.3.1", "1.3.1.a"]
                },
                {
                    subject: "Proportionalität",
                    topic: "Antiproportionale Zuordnungen",
                    archiveSublevels: ["1.3.1.b"]
                },
                {
                    subject: "Prozentrechnung",
                    topic: "Grundbegriffe der Prozentrechnung (Prozentwert, Grundwert, Prozentsatz)",
                    archiveSublevels: ["1.1.2.b"]
                },
                {
                    subject: "Geometrie",
                    topic: "Flächeninhalt und Umfang (Dreieck, Parallelogramm, Kreis)",
                    archiveSublevels: ["1.2.1", "1.2.1.a", "1.2.1.b"]
                },
                {
                    subject: "Geometrie",
                    topic: "Körper: Würfel, Quader, Zylinder (Oberfläche, Volumen einführend)",
                    archiveSublevels: ["1.2.2", "1.2.2.a"]
                },
                {
                    subject: "Daten",
                    topic: "Mittelwert, Median, Häufigkeiten",
                    archiveSublevels: ["1.4.1.b"]
                },
                {
                    subject: "Wahrscheinlichkeit",
                    topic: "Einfache Zufallsexperimente, relative Häufigkeit",
                    archiveSublevels: ["1.4.2", "1.4.2.a"]
                }
            ]
        },
        {
            klasse: [7, 8],
            title: "Klasse 7–8",
            level: "2",
            summary: "Terme und Gleichungen, lineare Funktionen, Pythagoras, Potenzen, Geometrie",
            topics: [
                {
                    subject: "Algebra",
                    topic: "Terme aufstellen, vereinfachen, ausmultiplizieren",
                    archiveSublevels: ["2.1.1"]
                },
                {
                    subject: "Gleichungen",
                    topic: "Lineare Gleichungen lösen und umstellen",
                    archiveSublevels: ["2.1.1", "2.1.1.a", "2.1.1.b"]
                },
                {
                    subject: "Gleichungen",
                    topic: "Gleichungen mit Brüchen",
                    archiveSublevels: ["2.1.1.c"]
                },
                {
                    subject: "Funktionen",
                    topic: "Lineare Funktionen – Geradengleichung, Steigung, y-Achsenabschnitt",
                    archiveSublevels: ["2.2.2", "2.2.2.a"]
                },
                {
                    subject: "Funktionen",
                    topic: "Parallele und senkrechte Geraden",
                    archiveSublevels: ["2.2.2.b"]
                },
                {
                    subject: "Prozentrechnung",
                    topic: "Zinsen und Zinseszins, Prozentrechnung vertieft",
                    archiveSublevels: ["1.1.2.b"]
                },
                {
                    subject: "Potenzen",
                    topic: "Potenzgesetze und Rechenregeln",
                    archiveSublevels: ["2.3.1", "2.3.1.a"]
                },
                {
                    subject: "Potenzen",
                    topic: "Negative und gebrochene Exponenten",
                    archiveSublevels: ["2.3.1.b"]
                },
                {
                    subject: "Geometrie",
                    topic: "Satz des Pythagoras und Anwendungen",
                    archiveSublevels: ["2.5.3", "2.5.3.a"]
                },
                {
                    subject: "Geometrie",
                    topic: "Ähnlichkeit und Strahlensatz",
                    archiveSublevels: ["2.5.1", "2.5.1.a", "2.5.1.b"]
                },
                {
                    subject: "Geometrie",
                    topic: "Winkelarten, Dreieckskonstruktionen",
                    archiveSublevels: ["1.2.3", "1.2.3.a"]
                },
                {
                    subject: "Teilbarkeit",
                    topic: "Primfaktorzerlegung, ggT und kgV",
                    archiveSublevels: ["1.1.5", "1.1.5.a", "1.1.5.b"]
                }
            ]
        },
        {
            klasse: [9, 10],
            title: "Klasse 9–10",
            level: "2",
            summary: "Quadratische Gleichungen und Funktionen, Trigonometrie, Logarithmen, Kombinatorik",
            topics: [
                {
                    subject: "Gleichungen",
                    topic: "Quadratische Gleichungen – Lösungsformel und Diskriminante",
                    archiveSublevels: ["2.1.3", "2.1.3.a"]
                },
                {
                    subject: "Gleichungen",
                    topic: "Quadratische Gleichungen – Faktorisierung",
                    archiveSublevels: ["2.1.3.b"]
                },
                {
                    subject: "Gleichungen",
                    topic: "Lineare Gleichungssysteme – Substitutions- und Additionsverfahren",
                    archiveSublevels: ["2.1.2", "2.1.2.a"]
                },
                {
                    subject: "Gleichungen",
                    topic: "Gleichungssysteme mit 3 Unbekannten",
                    archiveSublevels: ["2.1.2.b"]
                },
                {
                    subject: "Ungleichungen",
                    topic: "Lineare Ungleichungen und Lösungsmengen",
                    archiveSublevels: ["2.1.4", "2.1.4.a"]
                },
                {
                    subject: "Funktionen",
                    topic: "Quadratische Funktionen – Scheitelpunkt, Nullstellen, Verschiebung",
                    archiveSublevels: ["2.2.3", "2.2.3.a", "2.2.3.b"]
                },
                {
                    subject: "Funktionen",
                    topic: "Exponentialfunktionen – Wachstum und Zerfall",
                    archiveSublevels: ["2.2.1", "2.2.1.a", "2.2.1.b", "2.2.1.c"]
                },
                {
                    subject: "Logarithmen",
                    topic: "Logarithmus – Definition, Rechenregeln",
                    archiveSublevels: ["2.3.3", "2.3.3.a"]
                },
                {
                    subject: "Logarithmen",
                    topic: "Logarithmische Gleichungen lösen",
                    archiveSublevels: ["2.3.3.b"]
                },
                {
                    subject: "Wurzeln",
                    topic: "Quadrat- und Kubikwurzeln, Vereinfachung von Wurzeltermen",
                    archiveSublevels: ["2.3.2", "2.3.2.a", "2.3.2.b"]
                },
                {
                    subject: "Trigonometrie",
                    topic: "sin, cos, tan am rechtwinkligen Dreieck",
                    archiveSublevels: ["2.4.1", "2.4.1.a"]
                },
                {
                    subject: "Trigonometrie",
                    topic: "Bogenmaß und Winkelumrechnung",
                    archiveSublevels: ["2.4.1.b"]
                },
                {
                    subject: "Trigonometrie",
                    topic: "Sinus- und Kosinussatz (allgemeines Dreieck)",
                    archiveSublevels: ["2.4.2", "2.4.2.a"]
                },
                {
                    subject: "Geometrie",
                    topic: "Kreisgeometrie – Umfang, Flächeninhalt, Kreisabschnitte",
                    archiveSublevels: ["2.5.2", "2.5.2.a"]
                },
                {
                    subject: "Geometrie",
                    topic: "Sehnen und Tangenten am Kreis",
                    archiveSublevels: ["2.5.2.b"]
                },
                {
                    subject: "Kombinatorik",
                    topic: "Permutationen und Kombinationen, Binomialkoeffizient",
                    archiveSublevels: ["2.6.1", "2.6.1.a", "2.6.1.b"]
                },
                {
                    subject: "Wahrscheinlichkeit",
                    topic: "Laplace-Experiment und Baumdiagramme",
                    archiveSublevels: ["2.6.2", "2.6.2.a", "2.6.2.b"]
                }
            ]
        },
        {
            klasse: [11, 12],
            title: "Klasse 11–12 (Oberstufe / Abitur)",
            level: "3",
            summary: "Analysis, Stochastik, Vektoren, Analytische Geometrie, Abiturniveau",
            topics: [
                {
                    subject: "Analysis",
                    topic: "Ableitungsregeln – Kettenregel, Produktregel, Quotientenregel",
                    archiveSublevels: ["3.1.1", "3.1.1.a"]
                },
                {
                    subject: "Analysis",
                    topic: "Monotonie und Extremstellen",
                    archiveSublevels: ["3.1.1.b"]
                },
                {
                    subject: "Analysis",
                    topic: "Krümmung und Wendepunkte",
                    archiveSublevels: ["3.1.1.c"]
                },
                {
                    subject: "Analysis",
                    topic: "Linearisierung und Näherungen",
                    archiveSublevels: ["3.1.1.d"]
                },
                {
                    subject: "Analysis",
                    topic: "Vollständige Kurvendiskussion",
                    archiveSublevels: ["3.1.2", "3.1.2.a"]
                },
                {
                    subject: "Analysis",
                    topic: "Anwendungsaufgaben – Optimierung",
                    archiveSublevels: ["3.1.2.b"]
                },
                {
                    subject: "Analysis",
                    topic: "Stammfunktionen und Grundregeln der Integration",
                    archiveSublevels: ["3.1.3", "3.1.3.a"]
                },
                {
                    subject: "Analysis",
                    topic: "Bestimmtes Integral und Flächeninhalt",
                    archiveSublevels: ["3.1.3.b"]
                },
                {
                    subject: "Analysis",
                    topic: "Substitutionsregel und partielle Integration",
                    archiveSublevels: ["3.1.3.c", "3.1.3.d"]
                },
                {
                    subject: "Analysis",
                    topic: "Ableitung und Integration von e^x und ln(x)",
                    archiveSublevels: ["3.1.4", "3.1.4.a"]
                },
                {
                    subject: "Analysis",
                    topic: "Wachstums- und Zerfallsmodelle (e-Funktion)",
                    archiveSublevels: ["3.1.4.b"]
                },
                {
                    subject: "Analysis",
                    topic: "Arithmetische und geometrische Folgen",
                    archiveSublevels: ["3.1.5", "3.1.5.a"]
                },
                {
                    subject: "Analysis",
                    topic: "Grenzwerte von Folgen und Reihen",
                    archiveSublevels: ["3.1.5.b"]
                },
                {
                    subject: "Stochastik",
                    topic: "Bedingte Wahrscheinlichkeit und stochastische Unabhängigkeit",
                    archiveSublevels: ["3.2.1", "3.2.1.a"]
                },
                {
                    subject: "Stochastik",
                    topic: "Bayes-Theorem",
                    archiveSublevels: ["3.2.1.b"]
                },
                {
                    subject: "Stochastik",
                    topic: "Binomialverteilung – Erwartungswert, Varianz",
                    archiveSublevels: ["3.2.2", "3.2.2.a", "3.2.2.b"]
                },
                {
                    subject: "Stochastik",
                    topic: "Normalverteilung und Standardisierung",
                    archiveSublevels: ["3.2.2.c"]
                },
                {
                    subject: "Analytische Geometrie",
                    topic: "Vektoren im Raum – Operationen, Skalarprodukt",
                    archiveSublevels: ["3.2.3", "3.2.3.a"]
                },
                {
                    subject: "Analytische Geometrie",
                    topic: "Geraden und Ebenen im Raum",
                    archiveSublevels: ["3.2.3.b"]
                },
                {
                    subject: "Analytische Geometrie",
                    topic: "Kreuzprodukt und geometrische Anwendungen",
                    archiveSublevels: ["3.2.3.c"]
                },
                {
                    subject: "Analytische Geometrie",
                    topic: "Kegelschnitte – Parabel, Ellipse, Hyperbel",
                    archiveSublevels: ["3.5.1", "3.5.1.a"]
                },
                {
                    subject: "Trigonometrie",
                    topic: "Einheitskreis, Sinus-/Kosinusfunktion und Periodizität",
                    archiveSublevels: ["2.4.3", "2.4.3.a", "2.4.3.b"]
                },
                {
                    subject: "Matrizen",
                    topic: "Matrixoperationen, Determinante (2×2 und 3×3)",
                    archiveSublevels: ["3.4.1", "3.4.1.a", "3.4.1.b"]
                },
                {
                    subject: "Komplexe Zahlen",
                    topic: "Kartesische Form, Polarform, Eulersche Formel",
                    archiveSublevels: ["3.3.1", "3.3.1.a", "3.3.1.b"]
                }
            ]
        }
    ],

    /**
     * Helper: all unique sublevel IDs covered by a given grade range.
     * Usage: SOR_CURRICULUM_COVERAGE.sublevelsByGrade(7, 10)
     */
    sublevelsByGrade(from, to) {
        const ids = new Set();
        this.grades.forEach(band => {
            const [gFrom, gTo] = band.klasse;
            if (gTo >= from && gFrom <= to) {
                band.topics.forEach(t => t.archiveSublevels.forEach(id => ids.add(id)));
            }
        });
        return [...ids];
    },

    /**
     * Helper: all grade bands covering a given archive sublevel ID.
     * Usage: SOR_CURRICULUM_COVERAGE.gradesBySubLevel("3.1.3.b")
     */
    gradesBySubLevel(subLevelId) {
        return this.grades.filter(band =>
            band.topics.some(t => t.archiveSublevels.includes(subLevelId))
        ).map(b => b.title);
    }
};
