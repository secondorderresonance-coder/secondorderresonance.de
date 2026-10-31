// Curriculum coverage matrix: German Klasse 1-12 mapped to SOR archive L1-L3 sublevels.
// Each grade entry lists its core topics and the matching archive sublevel IDs.
// filterLink builds a deep link to lernarchiv.html with pre-set level/sublevel filters.
window.SOR_CURRICULUM_MATRIX = {
    version: "1.0",
    description: "Lehrplan Klasse 1-12 (Deutschland) → SOR Lernarchiv L1-L3",
    levelBand: {
        "1-4":   { archiveLevel: "1", label: "L1 – Grundlagen" },
        "5-6":   { archiveLevel: "1", label: "L1 – Grundlagen (vertieft)" },
        "7-8":   { archiveLevel: "2", label: "L2 – Aufbauwissen" },
        "9-10":  { archiveLevel: "2", label: "L2 – Aufbauwissen (vertieft)" },
        "11-12": { archiveLevel: "3", label: "L3 – Vertiefung (Oberstufe)" }
    },
    grades: [
        {
            grade: 1,
            name: "Klasse 1",
            archiveLevel: "1",
            topics: [
                { name: "Zahlen und Mengen bis 20",           sublevel: "1.1.1.a", topic: "Kopfrechnen und Rechenstrategien" },
                { name: "Addition und Subtraktion bis 20",    sublevel: "1.1.1.a", topic: "Kopfrechnen und Rechenstrategien" },
                { name: "Verdoppeln und Halbieren",           sublevel: "1.1.1.a", topic: "Kopfrechnen und Rechenstrategien" },
                { name: "Geometrische Formen",                sublevel: "1.2.3",   topic: "Winkel und Dreiecke" },
                { name: "Muster und Strukturen",              sublevel: "1.1.1.a", topic: "Kopfrechnen und Rechenstrategien" }
            ]
        },
        {
            grade: 2,
            name: "Klasse 2",
            archiveLevel: "1",
            topics: [
                { name: "Zahlen bis 100",                     sublevel: "1.1.1.a", topic: "Kopfrechnen und Rechenstrategien" },
                { name: "Kleines Einmaleins",                 sublevel: "1.1.1.a", topic: "Kopfrechnen und Rechenstrategien" },
                { name: "Halbschriftliche Rechenverfahren",   sublevel: "1.1.1.b", topic: "Schriftliches Rechnen" },
                { name: "Symmetrie und Flächen",              sublevel: "1.2.1",   topic: "Flaechen und Umfang" },
                { name: "Längen und Maßeinheiten",            sublevel: "1.3.2",   topic: "Einheiten und Groessen" }
            ]
        },
        {
            grade: 3,
            name: "Klasse 3",
            archiveLevel: "1",
            topics: [
                { name: "Zahlen bis 1000",                    sublevel: "1.1.1.b", topic: "Schriftliches Rechnen" },
                { name: "Schriftliche Addition und Subtraktion", sublevel: "1.1.1.b", topic: "Schriftliches Rechnen" },
                { name: "Schriftliche Multiplikation",        sublevel: "1.1.1.b", topic: "Schriftliches Rechnen" },
                { name: "Einführung Bruchteile",              sublevel: "1.1.2.a", topic: "Brueche addieren und kuerzen" },
                { name: "Flächenberechnung (Rechteck)",       sublevel: "1.2.1",   topic: "Flaechen und Umfang" },
                { name: "Zeit und Geld",                      sublevel: "1.3.2",   topic: "Einheiten und Groessen" }
            ]
        },
        {
            grade: 4,
            name: "Klasse 4",
            archiveLevel: "1",
            topics: [
                { name: "Zahlen bis 1 000 000",               sublevel: "1.1.1.b", topic: "Schriftliches Rechnen" },
                { name: "Schriftliche Division",              sublevel: "1.1.1.b", topic: "Schriftliches Rechnen" },
                { name: "Dezimalzahlen einführen",            sublevel: "1.1.3.a", topic: "Dezimalzahlen und Kommarechnung" },
                { name: "Proportionalität und Dreisatz",      sublevel: "1.3.1",   topic: "Dreisatz" },
                { name: "Maßeinheiten umrechnen",             sublevel: "1.3.2",   topic: "Einheiten und Groessen" },
                { name: "Wahrscheinlichkeit (Einstieg)",      sublevel: "1.4.2",   topic: "Grundlagen Wahrscheinlichkeit" }
            ]
        },
        {
            grade: 5,
            name: "Klasse 5",
            archiveLevel: "1",
            topics: [
                { name: "Natürliche Zahlen, Primzahlen",      sublevel: "1.1.5.a", topic: "Primfaktorzerlegung" },
                { name: "ggT und kgV",                        sublevel: "1.1.5.b", topic: "ggT und kgV" },
                { name: "Brüche addieren und kürzen",         sublevel: "1.1.2.a", topic: "Brueche addieren und kuerzen" },
                { name: "Brüche multiplizieren/dividieren",   sublevel: "1.1.2.c", topic: "Brueche multiplizieren und dividieren" },
                { name: "Dezimalzahlen (vertiefen)",          sublevel: "1.1.3.a", topic: "Dezimalzahlen und Kommarechnung" },
                { name: "Runden und Schätzen",                sublevel: "1.1.3.b", topic: "Runden und Schaetzen" },
                { name: "Dreisatz",                           sublevel: "1.3.1",   topic: "Dreisatz" },
                { name: "Koordinatensystem",                  sublevel: "1.2.4",   topic: "Koordinatensystem" },
                { name: "Geometrie: Dreiecke und Vierecke",   sublevel: "1.2.3",   topic: "Winkel und Dreiecke" },
                { name: "Diagramme und Datenanalyse",         sublevel: "1.4.1",   topic: "Diagramme und Daten" }
            ]
        },
        {
            grade: 6,
            name: "Klasse 6",
            archiveLevel: "1",
            topics: [
                { name: "Negative Zahlen",                    sublevel: "1.1.4.a", topic: "Rechnen mit negativen Zahlen" },
                { name: "Prozentrechnung",                    sublevel: "1.1.2.b", topic: "Prozentwerte im Alltag" },
                { name: "Körper und Volumen",                 sublevel: "1.2.2",   topic: "Koerper und Volumen" },
                { name: "Einfache lineare Gleichungen",       sublevel: "2.1.1",   topic: "Gleichungen loesen und umstellen" },
                { name: "Grundlagen Wahrscheinlichkeit",      sublevel: "1.4.2",   topic: "Grundlagen Wahrscheinlichkeit" },
                { name: "Statistik: Mittelwert, Median",      sublevel: "1.4.1",   topic: "Diagramme und Daten" }
            ]
        },
        {
            grade: 7,
            name: "Klasse 7",
            archiveLevel: "2",
            topics: [
                { name: "Terme und Gleichungen",              sublevel: "2.1.1",   topic: "Gleichungen loesen und umstellen" },
                { name: "Ungleichungen",                      sublevel: "2.1.4",   topic: "Ungleichungen" },
                { name: "Rationale Zahlen",                   sublevel: "1.1.4.a", topic: "Rechnen mit negativen Zahlen" },
                { name: "Lineare Funktionen",                 sublevel: "2.2.2",   topic: "Lineare Funktionen" },
                { name: "Proportionale Zuordnungen",          sublevel: "1.3.1",   topic: "Dreisatz" },
                { name: "Pythagoras",                         sublevel: "2.5.3",   topic: "Pythagoras und Satz des Thales" },
                { name: "Winkel und Dreiecke",                sublevel: "1.2.3",   topic: "Winkel und Dreiecke" }
            ]
        },
        {
            grade: 8,
            name: "Klasse 8",
            archiveLevel: "2",
            topics: [
                { name: "Lineare Gleichungssysteme",          sublevel: "2.1.2",   topic: "Lineare Gleichungssysteme" },
                { name: "Potenzgesetze",                      sublevel: "2.3.1",   topic: "Potenzgesetze" },
                { name: "Reelle Zahlen und Wurzeln",          sublevel: "2.3.2",   topic: "Wurzeln" },
                { name: "Quadratische Funktionen",            sublevel: "2.2.3",   topic: "Quadratische Funktionen" },
                { name: "Kreisgeometrie",                     sublevel: "2.5.2",   topic: "Kreisgeometrie" },
                { name: "Stochastik: Laplace-Wahrscheinlichkeit", sublevel: "2.6.2", topic: "Grundlegende Wahrscheinlichkeitsrechnung" },
                { name: "Statistik vertieft",                 sublevel: "1.4.1",   topic: "Diagramme und Daten" }
            ]
        },
        {
            grade: 9,
            name: "Klasse 9",
            archiveLevel: "2",
            topics: [
                { name: "Quadratische Gleichungen (pq-Formel)", sublevel: "2.1.3", topic: "Quadratische Gleichungen" },
                { name: "Trigonometrie: sin, cos, tan",       sublevel: "2.4.1",   topic: "Trigonometrie am rechtwinkligen Dreieck" },
                { name: "Sinus- und Kosinussatz",             sublevel: "2.4.2",   topic: "Sinus- und Kosinussatz" },
                { name: "Ähnlichkeit und Strahlensätze",      sublevel: "2.5.1",   topic: "Aehnlichkeit und Strahlenlaetze" },
                { name: "Exponentialfunktionen (Einstieg)",   sublevel: "2.2.1",   topic: "Exponentielles Verhalten" },
                { name: "Stochastik: Baumdiagramme",          sublevel: "2.6.2",   topic: "Grundlegende Wahrscheinlichkeitsrechnung" },
                { name: "Kombinatorik Grundlagen",            sublevel: "2.6.1",   topic: "Grundlegende Kombinatorik" }
            ]
        },
        {
            grade: 10,
            name: "Klasse 10",
            archiveLevel: "2",
            topics: [
                { name: "Logarithmen",                        sublevel: "2.3.3",   topic: "Logarithmen" },
                { name: "Exponentialfunktionen (vertieft)",   sublevel: "2.2.1",   topic: "Exponentielles Verhalten" },
                { name: "Trigonometrie: Einheitskreis",       sublevel: "2.4.3",   topic: "Einheitskreis und Periodizitaet" },
                { name: "Umkehrfunktionen",                   sublevel: "2.2.4",   topic: "Umkehrfunktionen und Komposition" },
                { name: "Kombinatorik und Wahrscheinlichkeit",sublevel: "2.6.1",   topic: "Grundlegende Kombinatorik" },
                { name: "Körper der Oberstufe",               sublevel: "1.2.2",   topic: "Koerper und Volumen" }
            ]
        },
        {
            grade: 11,
            name: "Klasse 11 (Einführungsphase)",
            archiveLevel: "3",
            topics: [
                { name: "Ableitungsregeln",                   sublevel: "3.1.1.a", topic: "Ableitungsregeln" },
                { name: "Monotonie und Extremstellen",        sublevel: "3.1.1.b", topic: "Monotonie und Extremstellen" },
                { name: "Kurvendiskussion",                   sublevel: "3.1.2",   topic: "Kurvendiskussion" },
                { name: "Folgen und Reihen",                  sublevel: "3.1.5",   topic: "Folgen und Reihen" },
                { name: "Vektoren und Raumgeometrie",         sublevel: "3.2.3",   topic: "Vektoren und Geometrie im Raum" },
                { name: "Wahrscheinlichkeit: Binomialverteilung", sublevel: "3.2.2", topic: "Zufallsvariablen und Verteilungen" }
            ]
        },
        {
            grade: 12,
            name: "Klasse 12 (Qualifikationsphase / Abitur)",
            archiveLevel: "3",
            topics: [
                { name: "Integralrechnung",                   sublevel: "3.1.3",   topic: "Integralrechnung" },
                { name: "Krümmung und Wendepunkte",           sublevel: "3.1.1.c", topic: "Kruemmung und Wendepunkte" },
                { name: "Linearisierung und Approximation",   sublevel: "3.1.1.d", topic: "Linearisierung und Naeherungen" },
                { name: "Exponential- und Logarithmusfunktionen (Analysis)", sublevel: "3.1.4", topic: "Exp.- und Logarithmusfunktionen" },
                { name: "Stochastik: Normalverteilung",       sublevel: "3.2.1",   topic: "Wahrscheinlichkeitsrechnung" },
                { name: "Zufallsvariablen und Verteilungen",  sublevel: "3.2.2",   topic: "Zufallsvariablen und Verteilungen" },
                { name: "Analytische Geometrie",              sublevel: "3.5",     topic: "Analytische Geometrie" },
                { name: "Matrizen (Einstieg)",                sublevel: "3.4",     topic: "Matrizen" },
                { name: "Komplexe Zahlen (Einstieg)",         sublevel: "3.3",     topic: "Komplexe Zahlen" }
            ]
        }
    ],

    // Returns all topics for a given grade number (1-12).
    getGrade: function(gradeNumber) {
        return this.grades.find(g => g.grade === gradeNumber) || null;
    },

    // Returns all grades that map to the given archive level string ('1', '2', or '3').
    getGradesByLevel: function(archiveLevel) {
        return this.grades.filter(g => g.archiveLevel === archiveLevel);
    },

    // Returns the archive filter URL for a specific topic entry from this matrix.
    getFilterLink: function(topicEntry) {
        var p = "level=" + encodeURIComponent(topicEntry.archiveLevel || "1");
        if (topicEntry.sublevel)  p += "&sublevel=" + encodeURIComponent(topicEntry.sublevel);
        if (topicEntry.topic)     p += "&topic="    + encodeURIComponent(topicEntry.topic);
        return "lernarchiv.html?" + p;
    }
};
