// Curriculum coverage matrix: Klasse 1-12 → L1-L3 archive sections
// Each grade entry maps German school curriculum topics to archive section IDs.
// This data structure drives the Lernpfad, placement recommendations, and
// future Klassen-based filtering in the archive browser.
window.SOR_CURRICULUM_MAP = {
    version: "1.0.0",
    // grade objects in ascending order
    grades: [
        {
            grade: 1,
            title: "Klasse 1",
            schoolPhase: "Grundschule",
            archiveLevel: "1",
            levelCode: "L1",
            topics: [
                { name: "Zahlen bis 20 – Zählen und Mengen",          section: "1.1.1.a", sectionTitle: "Kopfrechnen und Rechenstrategien" },
                { name: "Addition und Subtraktion im Zahlenraum 20",   section: "1.1.1.a", sectionTitle: "Kopfrechnen und Rechenstrategien" },
                { name: "Geometrische Grundformen erkennen",           section: "1.2.1.a", sectionTitle: "Rechteck, Dreieck, Kreis" },
                { name: "Längen vergleichen und messen",               section: "1.3.2.a", sectionTitle: "Länge, Masse, Zeit, Volumen" }
            ]
        },
        {
            grade: 2,
            title: "Klasse 2",
            schoolPhase: "Grundschule",
            archiveLevel: "1",
            levelCode: "L1",
            topics: [
                { name: "Zahlen bis 100",                              section: "1.1.1.a", sectionTitle: "Kopfrechnen und Rechenstrategien" },
                { name: "Kleines Einmaleins (Multiplikation)",         section: "1.1.1.a", sectionTitle: "Kopfrechnen und Rechenstrategien" },
                { name: "Einfache Division",                           section: "1.1.1.a", sectionTitle: "Kopfrechnen und Rechenstrategien" },
                { name: "Längen, Gewichte und Zeit (Alltag)",          section: "1.3.2.a", sectionTitle: "Länge, Masse, Zeit, Volumen" },
                { name: "Balkendiagramme lesen",                       section: "1.4.1.a", sectionTitle: "Balken- und Kreisdiagramme" }
            ]
        },
        {
            grade: 3,
            title: "Klasse 3",
            schoolPhase: "Grundschule",
            archiveLevel: "1",
            levelCode: "L1",
            topics: [
                { name: "Zahlen bis 1.000 – schriftliche Rechenverfahren", section: "1.1.1.b", sectionTitle: "Schriftliches Rechnen" },
                { name: "Schriftliche Addition und Subtraktion",            section: "1.1.1.b", sectionTitle: "Schriftliches Rechnen" },
                { name: "Multiplikation (mehrstelling)",                    section: "1.1.1.b", sectionTitle: "Schriftliches Rechnen" },
                { name: "Einfache Brüche (Hälften, Viertel, Drittel)",      section: "1.1.2.a", sectionTitle: "Brüche addieren und kürzen" },
                { name: "Fläche und Umfang (Rechteck)",                     section: "1.2.1.a", sectionTitle: "Rechteck, Dreieck, Kreis" },
                { name: "Einheiten: Meter, Kilogramm, Liter, Minute",       section: "1.3.2.a", sectionTitle: "Länge, Masse, Zeit, Volumen" }
            ]
        },
        {
            grade: 4,
            title: "Klasse 4",
            schoolPhase: "Grundschule",
            archiveLevel: "1",
            levelCode: "L1",
            topics: [
                { name: "Zahlen bis 1.000.000",                             section: "1.1.1.b", sectionTitle: "Schriftliches Rechnen" },
                { name: "Schriftliche Division",                             section: "1.1.1.b", sectionTitle: "Schriftliches Rechnen" },
                { name: "Dezimalzahlen – erste Schritte",                   section: "1.1.3.a", sectionTitle: "Dezimalzahlen und Kommarechnung" },
                { name: "Brüche erweitern und kürzen",                      section: "1.1.2.a", sectionTitle: "Brüche addieren und kürzen" },
                { name: "Flächeninhalt und Umfang (Dreieck, Trapez)",       section: "1.2.1.a", sectionTitle: "Rechteck, Dreieck, Kreis" },
                { name: "Daten sammeln und auswerten",                      section: "1.4.1.b", sectionTitle: "Mittelwert und Häufigkeit" },
                { name: "Einheiten umrechnen",                              section: "1.3.2.b", sectionTitle: "Einheiten umrechnen" }
            ]
        },
        {
            grade: 5,
            title: "Klasse 5",
            schoolPhase: "Unterstufe",
            archiveLevel: "1",
            levelCode: "L1",
            topics: [
                { name: "Natürliche Zahlen – Teilbarkeit",                  section: "1.1.5.a", sectionTitle: "Primfaktorzerlegung" },
                { name: "Primzahlen und Primfaktorzerlegung",               section: "1.1.5.a", sectionTitle: "Primfaktorzerlegung" },
                { name: "ggT und kgV",                                      section: "1.1.5.b", sectionTitle: "ggT und kgV" },
                { name: "Bruchrechnung: Addition und Subtraktion",          section: "1.1.2.a", sectionTitle: "Brüche addieren und kürzen" },
                { name: "Dezimalzahlen – Kommarechnung",                    section: "1.1.3.a", sectionTitle: "Dezimalzahlen und Kommarechnung" },
                { name: "Runden und Schätzen",                              section: "1.1.3.b", sectionTitle: "Runden und Schätzen" },
                { name: "Koordinatensystem – Punkte und Abstände",          section: "1.2.4.a", sectionTitle: "Punkte, Abstände, Spiegelung" },
                { name: "Volumen von Würfel und Quader",                    section: "1.2.2.a", sectionTitle: "Würfel, Quader, Zylinder" },
                { name: "Winkelarten und -maße",                            section: "1.2.3.a", sectionTitle: "Winkelarten und -maße" },
                { name: "Proportionale Zuordnungen – Dreisatz",             section: "1.3.1.a", sectionTitle: "Proportionale Zuordnungen" }
            ]
        },
        {
            grade: 6,
            title: "Klasse 6",
            schoolPhase: "Unterstufe",
            archiveLevel: "1",
            levelCode: "L1",
            topics: [
                { name: "Bruchrechnung: Multiplikation und Division",       section: "1.1.2.c", sectionTitle: "Brüche multiplizieren und dividieren" },
                { name: "Negative Zahlen – Rechnen auf der Zahlengeraden",  section: "1.1.4.a", sectionTitle: "Rechnen mit negativen Zahlen" },
                { name: "Prozentwerte im Alltag",                           section: "1.1.2.b", sectionTitle: "Prozentwerte im Alltag" },
                { name: "Antiproportionale Zuordnungen",                    section: "1.3.1.b", sectionTitle: "Antiproportionale Zuordnungen" },
                { name: "Dreieckstypen und Eigenschaften",                  section: "1.2.3.b", sectionTitle: "Dreieckstypen und Eigenschaften" },
                { name: "Zusammengesetzte Figuren (Flächeninhalt)",         section: "1.2.1.b", sectionTitle: "Zusammengesetzte Figuren" },
                { name: "Einfache Zufallsexperimente (Münze, Würfel)",      section: "1.4.2.a", sectionTitle: "Einfache Zufallsexperimente" },
                { name: "Häufigkeit und Mittelwert",                        section: "1.4.1.b", sectionTitle: "Mittelwert und Häufigkeit" }
            ]
        },
        {
            grade: 7,
            title: "Klasse 7",
            schoolPhase: "Mittelstufe",
            archiveLevel: "2",
            levelCode: "L2",
            topics: [
                { name: "Terme – Aufstellen und Vereinfachen",              section: "2.1.1.a", sectionTitle: "Lineare Gleichungen" },
                { name: "Lineare Gleichungen lösen",                        section: "2.1.1.a", sectionTitle: "Lineare Gleichungen" },
                { name: "Formeln umstellen",                                section: "2.1.1.b", sectionTitle: "Formeln umstellen" },
                { name: "Proportionalität und erweiterter Dreisatz",        section: "1.3.1.a", sectionTitle: "Proportionale Zuordnungen" },
                { name: "Ähnlichkeit und Strahlensatz",                     section: "2.5.1.a", sectionTitle: "Strahlensatz-Aufgaben" },
                { name: "Statistik: Median, Streuung",                      section: "1.4.1.b", sectionTitle: "Mittelwert und Häufigkeit" },
                { name: "Wahrscheinlichkeit – Laplace-Experiment",          section: "2.6.2.a", sectionTitle: "Laplace-Experiment" }
            ]
        },
        {
            grade: 8,
            title: "Klasse 8",
            schoolPhase: "Mittelstufe",
            archiveLevel: "2",
            levelCode: "L2",
            topics: [
                { name: "Lineare Gleichungssysteme (2 Unbekannte)",         section: "2.1.2.a", sectionTitle: "Substitutions- und Additionsverfahren" },
                { name: "Gleichungen mit Brüchen",                          section: "2.1.1.c", sectionTitle: "Gleichungen mit Brüchen" },
                { name: "Quadratische Gleichungen – Einstieg",              section: "2.1.3.a", sectionTitle: "Lösungsformel und Diskriminante" },
                { name: "Lineare Funktionen – Geradengleichung",            section: "2.2.2.a", sectionTitle: "Geradengleichung und Steigung" },
                { name: "Parallele und senkrechte Geraden",                 section: "2.2.2.b", sectionTitle: "Parallele und senkrechte Geraden" },
                { name: "Satz des Pythagoras",                              section: "2.5.3.a", sectionTitle: "Anwendungen des Satzes des Pythagoras" },
                { name: "Kreisumfang und Kreisfläche",                      section: "2.5.2.a", sectionTitle: "Umfang, Fläche, Kreisabschnitte" },
                { name: "Baumdiagramm und Wahrscheinlichkeit",              section: "2.6.2.b", sectionTitle: "Baumdiagramm" }
            ]
        },
        {
            grade: 9,
            title: "Klasse 9",
            schoolPhase: "Mittelstufe",
            archiveLevel: "2",
            levelCode: "L2",
            topics: [
                { name: "Quadratische Gleichungen – Lösungsformel (abc)",   section: "2.1.3.a", sectionTitle: "Lösungsformel und Diskriminante" },
                { name: "Faktorisierung quadratischer Terme",               section: "2.1.3.b", sectionTitle: "Faktorisierung" },
                { name: "Quadratische Funktionen – Scheitelpunkt",          section: "2.2.3.a", sectionTitle: "Parabelscheitel und Nullstellen" },
                { name: "Parabel – Verschiebung und Streckung",             section: "2.2.3.b", sectionTitle: "Verschiebung und Streckung" },
                { name: "Potenzgesetze",                                    section: "2.3.1.a", sectionTitle: "Rechenregeln für Potenzen" },
                { name: "Negative und gebrochene Exponenten",               section: "2.3.1.b", sectionTitle: "Negative und gebrochene Exponenten" },
                { name: "Quadrat- und Kubikwurzeln",                        section: "2.3.2.a", sectionTitle: "Quadrat- und Kubikwurzeln" },
                { name: "Trigonometrie am rechtwinkligen Dreieck",          section: "2.4.1.a", sectionTitle: "sin, cos, tan und Anwendungen" },
                { name: "Ähnliche Figuren – vertieft",                      section: "2.5.1.b", sectionTitle: "Ähnliche Figuren" },
                { name: "Kombinatorik – Permutationen",                     section: "2.6.1.a", sectionTitle: "Permutationen und Kombinationen" }
            ]
        },
        {
            grade: 10,
            title: "Klasse 10",
            schoolPhase: "Mittelstufe / Übergang Oberstufe",
            archiveLevel: "2",
            levelCode: "L2",
            topics: [
                { name: "Exponentialfunktionen – Wachstum und Zerfall",     section: "2.2.1.a", sectionTitle: "Exponentielles Wachstum" },
                { name: "Halbwertszeit und Zerfallskonstante",              section: "2.2.1.c", sectionTitle: "Halbwertszeit" },
                { name: "Logarithmen – Definition und Rechenregeln",        section: "2.3.3.a", sectionTitle: "Definition und Rechenregeln" },
                { name: "Logarithmische Gleichungen",                       section: "2.3.3.b", sectionTitle: "Logarithmische Gleichungen" },
                { name: "Bogenmass und Winkelumrechnung",                   section: "2.4.1.b", sectionTitle: "Bogenmass und Winkelumrechnung" },
                { name: "Sinus- und Kosinussatz",                           section: "2.4.2.a", sectionTitle: "Allgemeines Dreieck" },
                { name: "Lineare Ungleichungen",                            section: "2.1.4.a", sectionTitle: "Lineare Ungleichungen" },
                { name: "Binomialkoeffizient",                              section: "2.6.1.b", sectionTitle: "Binomialkoeffizient" },
                { name: "Lineare Gleichungssysteme mit 3 Unbekannten",      section: "2.1.2.b", sectionTitle: "Gleichungssysteme mit 3 Unbekannten" },
                { name: "Umkehrfunktionen",                                 section: "2.2.4.a", sectionTitle: "Umkehrabbildungen" }
            ]
        },
        {
            grade: 11,
            title: "Klasse 11",
            schoolPhase: "Oberstufe",
            archiveLevel: "3",
            levelCode: "L3",
            topics: [
                { name: "Ableitungsregeln – Ketten-, Produkt-, Quotientenregel", section: "3.1.1.a", sectionTitle: "Ableitungsregeln (Ketten-, Produkt-, Quotientenregel)" },
                { name: "Monotonie und Extremstellen",                      section: "3.1.1.b", sectionTitle: "Monotonie und Extremstellen" },
                { name: "Krümmung und Wendepunkte",                        section: "3.1.1.c", sectionTitle: "Krümmung und Wendepunkte" },
                { name: "Vollständige Kurvendiskussion",                    section: "3.1.2.a", sectionTitle: "Vollständige Kurvendiskussion" },
                { name: "Anwendungsaufgaben Optimierung",                   section: "3.1.2.b", sectionTitle: "Anwendungsaufgaben Optimierung" },
                { name: "Stammfunktionen und Grundregeln",                  section: "3.1.3.a", sectionTitle: "Stammfunktionen und Grundregeln" },
                { name: "Bestimmtes Integral und Flächeninhalt",            section: "3.1.3.b", sectionTitle: "Bestimmtes Integral und Flächeninhalt" },
                { name: "Einheitskreis, Sinusfunktion, Kosinusfunktion",    section: "2.4.3.a", sectionTitle: "Sinusfunktion und Kosinusfunktion" },
                { name: "Vektoren – Skalarprodukt und Vektoroperationen",   section: "3.2.3.a", sectionTitle: "Vektoroperationen und Skalarprodukt" },
                { name: "Bedingte Wahrscheinlichkeit",                      section: "3.2.1.a", sectionTitle: "Bedingte Wahrscheinlichkeit" }
            ]
        },
        {
            grade: 12,
            title: "Klasse 12",
            schoolPhase: "Oberstufe / Abiturniveau",
            archiveLevel: "3",
            levelCode: "L3",
            topics: [
                { name: "Integralrechnung – Substitution",                  section: "3.1.3.c", sectionTitle: "Substitutionsregel" },
                { name: "Integralrechnung – Partielle Integration",         section: "3.1.3.d", sectionTitle: "Partielle Integration" },
                { name: "Ableitung und Integration von e^x und ln(x)",      section: "3.1.4.a", sectionTitle: "Ableitung und Integration von e^x und ln(x)" },
                { name: "Wachstums- und Zerfallsmodelle (Analysis)",        section: "3.1.4.b", sectionTitle: "Wachstums- und Zerfallsmodelle" },
                { name: "Arithmetische und geometrische Folgen",            section: "3.1.5.a", sectionTitle: "Arithmetische und geometrische Folgen" },
                { name: "Bayes-Theorem",                                    section: "3.2.1.b", sectionTitle: "Bayes-Theorem" },
                { name: "Binomialverteilung",                               section: "3.2.2.a", sectionTitle: "Binomialverteilung" },
                { name: "Erwartungswert und Varianz",                       section: "3.2.2.b", sectionTitle: "Erwartungswert und Varianz" },
                { name: "Normalverteilung",                                 section: "3.2.2.c", sectionTitle: "Normalverteilung" },
                { name: "Geraden und Ebenen im Raum",                      section: "3.2.3.b", sectionTitle: "Geraden und Ebenen im Raum" },
                { name: "Kreuzprodukt und geometrische Anwendungen",        section: "3.2.3.c", sectionTitle: "Kreuzprodukt und geometrische Anwendungen" },
                { name: "Matrizen – Addition und Multiplikation",           section: "3.4.1.a", sectionTitle: "Addition und Multiplikation" },
                { name: "Komplexe Zahlen – kartesische Form (optional)",    section: "3.3.1.a", sectionTitle: "Kartesische Form und Betrag" }
            ]
        }
    ],

    // Quick lookup: given a grade number, return the matching archive level code
    getLevelForGrade(grade) {
        const entry = this.grades.find(g => g.grade === grade);
        return entry ? entry.levelCode : null;
    },

    // Return all topics for a given grade
    getTopicsForGrade(grade) {
        const entry = this.grades.find(g => g.grade === grade);
        return entry ? entry.topics : [];
    },

    // Return all grades that map to a given archive section ID (e.g. "2.1.1.a")
    getGradesForSection(sectionId) {
        return this.grades.filter(g =>
            g.topics.some(t => t.section === sectionId)
        ).map(g => g.grade);
    }
};
