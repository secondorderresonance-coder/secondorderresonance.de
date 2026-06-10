// Curriculum coverage matrix: Klasse 1-12 → L1-L3 archive sections
// Aligned with KMK Bildungsstandards (allgemeines Gymnasium, Germany)
// Used by Lernpfad and archive UI to surface grade-appropriate content
window.SOR_CURRICULUM = {
    meta: {
        standard: "KMK Bildungsstandards – allgemeines Gymnasium",
        scope: "Mathematik Klasse 1–12",
        levelMapping: {
            "L1": "Klasse 1–6 (Grundschule und Unterstufe)",
            "L2": "Klasse 5–10 (Unter- und Mittelstufe)",
            "L3": "Klasse 10–12 (Oberstufe / Abiturniveau)"
        },
        lastUpdated: "2026-06"
    },

    // Each entry: grade, label, primary SOR level, description, topics
    // topics: name, sublevels (archive sublevel IDs), tags
    grades: [
        {
            grade: 1,
            label: "Klasse 1",
            sorLevel: 1,
            sorLevelCode: "L1",
            description: "Zahlen bis 100, Grundrechenarten, erste Geometrie",
            topics: [
                {
                    name: "Zahlen bis 20 und bis 100",
                    sublevels: ["1.1.1", "1.1.1.a"],
                    tags: ["Arithmetik", "Zahlenraum"]
                },
                {
                    name: "Addition und Subtraktion im kleinen Zahlenraum",
                    sublevels: ["1.1.1", "1.1.1.a"],
                    tags: ["Addition", "Subtraktion", "Kopfrechnen"]
                },
                {
                    name: "Einmaleins (1er bis 5er Reihe)",
                    sublevels: ["1.1.1", "1.1.1.a"],
                    tags: ["Multiplikation", "Einmaleins"]
                },
                {
                    name: "Geometrische Grundformen erkennen und benennen",
                    sublevels: ["1.2.1", "1.2.1.a"],
                    tags: ["Geometrie", "Formen"]
                },
                {
                    name: "Einfache Sachaufgaben und Größen",
                    sublevels: ["1.3.2", "1.3.2.a"],
                    tags: ["Sachrechnen", "Einheiten"]
                }
            ]
        },
        {
            grade: 2,
            label: "Klasse 2",
            sorLevel: 1,
            sorLevelCode: "L1",
            description: "Zahlen bis 1.000, vollständiges Einmaleins, schriftliche Verfahren, elementare Geometrie",
            topics: [
                {
                    name: "Zahlen bis 1.000",
                    sublevels: ["1.1.1", "1.1.1.a"],
                    tags: ["Arithmetik", "Zahlenraum"]
                },
                {
                    name: "Kleines Einmaleins (vollständig)",
                    sublevels: ["1.1.1", "1.1.1.a"],
                    tags: ["Multiplikation", "Einmaleins"]
                },
                {
                    name: "Schriftliche Addition und Subtraktion",
                    sublevels: ["1.1.1", "1.1.1.b"],
                    tags: ["Schriftliches Rechnen", "Addition", "Subtraktion"]
                },
                {
                    name: "Flächen und einfache geometrische Formen",
                    sublevels: ["1.2.1", "1.2.1.a"],
                    tags: ["Geometrie", "Flächen"]
                },
                {
                    name: "Symmetrie erkennen",
                    sublevels: ["1.2.3", "1.2.3.a"],
                    tags: ["Geometrie", "Symmetrie"]
                },
                {
                    name: "Größen: Länge, Masse, Zeit",
                    sublevels: ["1.3.2", "1.3.2.a"],
                    tags: ["Einheiten", "Sachrechnen"]
                }
            ]
        },
        {
            grade: 3,
            label: "Klasse 3",
            sorLevel: 1,
            sorLevelCode: "L1",
            description: "Zahlen bis 1.000.000, schriftliche Multiplikation und Division, Brüche (Einstieg), Flächen und Umfang",
            topics: [
                {
                    name: "Zahlen bis 1.000.000",
                    sublevels: ["1.1.1", "1.1.1.a"],
                    tags: ["Arithmetik", "Zahlenraum"]
                },
                {
                    name: "Schriftliche Multiplikation",
                    sublevels: ["1.1.1", "1.1.1.b"],
                    tags: ["Schriftliches Rechnen", "Multiplikation"]
                },
                {
                    name: "Schriftliche Division",
                    sublevels: ["1.1.1", "1.1.1.b"],
                    tags: ["Schriftliches Rechnen", "Division"]
                },
                {
                    name: "Brüche: Einstieg (½, ¼, ¾)",
                    sublevels: ["1.1.2", "1.1.2.a"],
                    tags: ["Brüche", "Einstieg"]
                },
                {
                    name: "Fläche und Umfang von Rechteck und Quadrat",
                    sublevels: ["1.2.1", "1.2.1.a"],
                    tags: ["Geometrie", "Flächen", "Umfang"]
                },
                {
                    name: "Sachrechnen mit Größen",
                    sublevels: ["1.3.2", "1.3.2.a"],
                    tags: ["Sachrechnen", "Einheiten"]
                }
            ]
        },
        {
            grade: 4,
            label: "Klasse 4",
            sorLevel: 1,
            sorLevelCode: "L1",
            description: "Alle schriftlichen Grundverfahren, Brüche vertiefen, Daten und Diagramme, Sachrechnen",
            topics: [
                {
                    name: "Alle vier schriftlichen Grundrechenverfahren",
                    sublevels: ["1.1.1", "1.1.1.b"],
                    tags: ["Schriftliches Rechnen", "Grundrechenarten"]
                },
                {
                    name: "Brüche addieren und vergleichen",
                    sublevels: ["1.1.2", "1.1.2.a"],
                    tags: ["Brüche", "Addition"]
                },
                {
                    name: "Dreisatz und proportionale Zuordnungen",
                    sublevels: ["1.3.1", "1.3.1.a"],
                    tags: ["Dreisatz", "Proportionalität"]
                },
                {
                    name: "Balken- und Kreisdiagramme lesen",
                    sublevels: ["1.4.1", "1.4.1.a"],
                    tags: ["Statistik", "Diagramme"]
                },
                {
                    name: "Körper: Würfel, Quader",
                    sublevels: ["1.2.2", "1.2.2.a"],
                    tags: ["Geometrie", "Körper", "Volumen"]
                },
                {
                    name: "Mittelwert und Häufigkeit",
                    sublevels: ["1.4.1", "1.4.1.b"],
                    tags: ["Statistik", "Mittelwert"]
                }
            ]
        },
        {
            grade: 5,
            label: "Klasse 5",
            sorLevel: 1,
            sorLevelCode: "L1",
            description: "Negative Zahlen, Dezimalzahlen, Brüche (Erweiterung), Koordinatensystem, Proportionalität",
            topics: [
                {
                    name: "Negative Zahlen und Zahlenstrahl",
                    sublevels: ["1.1.4", "1.1.4.a"],
                    tags: ["Negative Zahlen", "Zahlenstrahl"]
                },
                {
                    name: "Dezimalzahlen und Kommarechnung",
                    sublevels: ["1.1.3", "1.1.3.a"],
                    tags: ["Dezimalzahlen", "Kommarechnung"]
                },
                {
                    name: "Brüche multiplizieren und dividieren",
                    sublevels: ["1.1.2", "1.1.2.c"],
                    tags: ["Brüche", "Multiplikation", "Division"]
                },
                {
                    name: "Dreisatz – proportionale und antiproportionale Zuordnungen",
                    sublevels: ["1.3.1", "1.3.1.a", "1.3.1.b"],
                    tags: ["Dreisatz", "Proportionalität"]
                },
                {
                    name: "Koordinatensystem: Punkte einzeichnen und ablesen",
                    sublevels: ["1.2.4", "1.2.4.a"],
                    tags: ["Koordinatensystem", "Geometrie"]
                },
                {
                    name: "Runden und Schätzen",
                    sublevels: ["1.1.3", "1.1.3.b"],
                    tags: ["Runden", "Schätzen"]
                }
            ]
        },
        {
            grade: 6,
            label: "Klasse 6",
            sorLevel: 1,
            sorLevelCode: "L1",
            description: "Rationale Zahlen, Prozentrechnung, Kreisgeometrie, Primzahlen und Teilbarkeit",
            topics: [
                {
                    name: "Rationale Zahlen: Rechnen mit positiven und negativen Brüchen",
                    sublevels: ["1.1.4", "1.1.4.a", "1.1.2", "1.1.2.a"],
                    tags: ["Rationale Zahlen", "Brüche"]
                },
                {
                    name: "Prozentrechnung: Prozentwert, Grundwert, Prozentsatz",
                    sublevels: ["1.1.2", "1.1.2.b"],
                    tags: ["Prozentrechnung", "Alltag"]
                },
                {
                    name: "Primzahlen, Teilbarkeit, ggT und kgV",
                    sublevels: ["1.1.5", "1.1.5.a", "1.1.5.b"],
                    tags: ["Primzahlen", "Teilbarkeit", "ggT", "kgV"]
                },
                {
                    name: "Kreisfläche und Kreisumfang",
                    sublevels: ["1.2.1", "1.2.1.a"],
                    tags: ["Geometrie", "Kreis"]
                },
                {
                    name: "Einheiten umrechnen (Länge, Fläche, Volumen, Zeit)",
                    sublevels: ["1.3.2", "1.3.2.b"],
                    tags: ["Einheiten", "Umrechnen"]
                },
                {
                    name: "Einfache Zufallsexperimente und Wahrscheinlichkeit",
                    sublevels: ["1.4.2", "1.4.2.a"],
                    tags: ["Wahrscheinlichkeit", "Stochastik"]
                }
            ]
        },
        {
            grade: 7,
            label: "Klasse 7",
            sorLevel: 2,
            sorLevelCode: "L2",
            description: "Terme und lineare Gleichungen, lineare Funktionen, Pythagoras, Dreiecksgeometrie",
            topics: [
                {
                    name: "Terme aufstellen und vereinfachen",
                    sublevels: ["2.1.1", "2.1.1.a"],
                    tags: ["Terme", "Algebra"]
                },
                {
                    name: "Lineare Gleichungen lösen und umstellen",
                    sublevels: ["2.1.1", "2.1.1.a", "2.1.1.b"],
                    tags: ["Gleichungen", "Lineare Gleichungen"]
                },
                {
                    name: "Lineare Funktionen: Geradengleichung und Steigung",
                    sublevels: ["2.2.2", "2.2.2.a"],
                    tags: ["Funktionen", "Lineare Funktionen", "Steigung"]
                },
                {
                    name: "Satz des Pythagoras",
                    sublevels: ["2.5.3", "2.5.3.a"],
                    tags: ["Pythagoras", "Geometrie"]
                },
                {
                    name: "Winkelarten und Dreiecke",
                    sublevels: ["1.2.3", "1.2.3.a", "1.2.3.b"],
                    tags: ["Winkel", "Dreiecke", "Geometrie"]
                },
                {
                    name: "Einheiten und proportionale Größen vertiefen",
                    sublevels: ["1.3.2", "1.3.2.b"],
                    tags: ["Einheiten", "Sachrechnen"]
                }
            ]
        },
        {
            grade: 8,
            label: "Klasse 8",
            sorLevel: 2,
            sorLevelCode: "L2",
            description: "Lineare Gleichungssysteme, quadratische Gleichungen (Einstieg), Ähnlichkeit, Trigonometrie",
            topics: [
                {
                    name: "Lineare Gleichungssysteme (Substitution und Addition)",
                    sublevels: ["2.1.2", "2.1.2.a"],
                    tags: ["Gleichungssysteme", "LGS"]
                },
                {
                    name: "Quadratische Gleichungen: Lösungsformel und Faktorisierung",
                    sublevels: ["2.1.3", "2.1.3.a", "2.1.3.b"],
                    tags: ["Quadratische Gleichungen", "Diskriminante"]
                },
                {
                    name: "Ähnlichkeit und Strahlensätze",
                    sublevels: ["2.5.1", "2.5.1.a", "2.5.1.b"],
                    tags: ["Ähnlichkeit", "Strahlensatz", "Geometrie"]
                },
                {
                    name: "Trigonometrie am rechtwinkligen Dreieck (sin, cos, tan)",
                    sublevels: ["2.4.1", "2.4.1.a"],
                    tags: ["Trigonometrie", "sin", "cos", "tan"]
                },
                {
                    name: "Parallele und senkrechte Geraden",
                    sublevels: ["2.2.2", "2.2.2.b"],
                    tags: ["Geometrie", "Geraden"]
                },
                {
                    name: "Potenzgesetze (Einstieg)",
                    sublevels: ["2.3.1", "2.3.1.a"],
                    tags: ["Potenzen", "Potenzgesetze"]
                }
            ]
        },
        {
            grade: 9,
            label: "Klasse 9",
            sorLevel: 2,
            sorLevelCode: "L2",
            description: "Quadratische Funktionen, Exponentialfunktionen (Einstieg), Stochastik, Kreisgeometrie",
            topics: [
                {
                    name: "Quadratische Funktionen: Parabelscheitel und Nullstellen",
                    sublevels: ["2.2.3", "2.2.3.a", "2.2.3.b"],
                    tags: ["Quadratische Funktionen", "Parabel", "Scheitelpunkt"]
                },
                {
                    name: "Exponentielles Wachstum und Zerfall",
                    sublevels: ["2.2.1", "2.2.1.a", "2.2.1.b", "2.2.1.c"],
                    tags: ["Exponentialfunktion", "Wachstum", "Zerfall", "Halbwertszeit"]
                },
                {
                    name: "Kreisgeometrie: Kreisabschnitte, Sehnen, Tangenten",
                    sublevels: ["2.5.2", "2.5.2.a", "2.5.2.b"],
                    tags: ["Kreisgeometrie", "Geometrie"]
                },
                {
                    name: "Grundlegende Kombinatorik: Permutationen und Kombinationen",
                    sublevels: ["2.6.1", "2.6.1.a", "2.6.1.b"],
                    tags: ["Kombinatorik", "Permutation", "Binomialkoeffizient"]
                },
                {
                    name: "Grundlegende Wahrscheinlichkeitsrechnung: Laplace und Baumdiagramm",
                    sublevels: ["2.6.2", "2.6.2.a", "2.6.2.b"],
                    tags: ["Wahrscheinlichkeit", "Laplace", "Baumdiagramm"]
                },
                {
                    name: "Lineare Ungleichungen",
                    sublevels: ["2.1.4", "2.1.4.a"],
                    tags: ["Ungleichungen", "Algebra"]
                }
            ]
        },
        {
            grade: 10,
            label: "Klasse 10",
            sorLevel: 2,
            sorLevelCode: "L2",
            description: "Potenzen, Wurzeln, Logarithmen, Trigonometrie (Einheitskreis), Gleichungssysteme mit 3 Unbekannten",
            topics: [
                {
                    name: "Potenzgesetze vertiefen (negative und gebrochene Exponenten)",
                    sublevels: ["2.3.1", "2.3.1.a", "2.3.1.b"],
                    tags: ["Potenzen", "Potenzgesetze"]
                },
                {
                    name: "Quadrat- und Kubikwurzeln, Vereinfachen von Wurzeltermen",
                    sublevels: ["2.3.2", "2.3.2.a", "2.3.2.b"],
                    tags: ["Wurzeln", "Terme"]
                },
                {
                    name: "Logarithmen: Definition, Rechenregeln, logarithmische Gleichungen",
                    sublevels: ["2.3.3", "2.3.3.a", "2.3.3.b"],
                    tags: ["Logarithmen", "Rechenregeln"]
                },
                {
                    name: "Trigonometrie: Sinus- und Kosinussatz am allgemeinen Dreieck",
                    sublevels: ["2.4.2", "2.4.2.a"],
                    tags: ["Trigonometrie", "Sinussatz", "Kosinussatz"]
                },
                {
                    name: "Trigonometrie: Einheitskreis und Periodizität",
                    sublevels: ["2.4.3", "2.4.3.a", "2.4.3.b"],
                    tags: ["Einheitskreis", "Sinusfunktion", "Kosinusfunktion"]
                },
                {
                    name: "Lineare Gleichungssysteme mit 3 Unbekannten",
                    sublevels: ["2.1.2", "2.1.2.b"],
                    tags: ["Gleichungssysteme", "LGS", "Gauß"]
                }
            ]
        },
        {
            grade: 11,
            label: "Klasse 11 / Q1",
            sorLevel: 3,
            sorLevelCode: "L3",
            description: "Analysis (Ableitungen, Kurvendiskussion), Stochastik (Binomialverteilung), Vektoren und analytische Geometrie",
            topics: [
                {
                    name: "Ableitungsregeln (Ketten-, Produkt-, Quotientenregel)",
                    sublevels: ["3.1.1", "3.1.1.a"],
                    tags: ["Analysis", "Ableitung", "Differentialrechnung"]
                },
                {
                    name: "Monotonie, Extremstellen, Krümmung und Wendepunkte",
                    sublevels: ["3.1.1", "3.1.1.b", "3.1.1.c"],
                    tags: ["Analysis", "Kurvendiskussion", "Extremwerte"]
                },
                {
                    name: "Vollständige Kurvendiskussion und Optimierungsaufgaben",
                    sublevels: ["3.1.2", "3.1.2.a", "3.1.2.b"],
                    tags: ["Kurvendiskussion", "Optimierung", "Analysis"]
                },
                {
                    name: "Bedingte Wahrscheinlichkeit und mehrstufige Zufallsexperimente",
                    sublevels: ["3.2.1", "3.2.1.a"],
                    tags: ["Stochastik", "Bedingte Wahrscheinlichkeit"]
                },
                {
                    name: "Binomialverteilung: Erwartungswert und Varianz",
                    sublevels: ["3.2.2", "3.2.2.a", "3.2.2.b"],
                    tags: ["Stochastik", "Binomialverteilung", "Erwartungswert"]
                },
                {
                    name: "Vektoren: Operationen, Skalarprodukt, Geraden im Raum",
                    sublevels: ["3.2.3", "3.2.3.a", "3.2.3.b"],
                    tags: ["Vektoren", "Analytische Geometrie", "Geraden"]
                }
            ]
        },
        {
            grade: 12,
            label: "Klasse 12 / Q2 / Abitur",
            sorLevel: 3,
            sorLevelCode: "L3",
            description: "Integralrechnung, Exponential- und Logarithmusfunktionen, Normalverteilung und Hypothesentests, Ebenen und Kreuzprodukt",
            topics: [
                {
                    name: "Stammfunktionen, Grundintegrale und Integrationsregeln",
                    sublevels: ["3.1.3", "3.1.3.a", "3.1.3.b"],
                    tags: ["Integralrechnung", "Stammfunktion", "Analysis"]
                },
                {
                    name: "Substitutionsregel und partielle Integration",
                    sublevels: ["3.1.3", "3.1.3.c", "3.1.3.d"],
                    tags: ["Integralrechnung", "Substitution", "Partielle Integration"]
                },
                {
                    name: "Ableitung und Integration von e^x und ln(x), Wachstumsmodelle",
                    sublevels: ["3.1.4", "3.1.4.a", "3.1.4.b"],
                    tags: ["Exponentialfunktion", "Logarithmus", "Analysis"]
                },
                {
                    name: "Normalverteilung und Hypothesentests",
                    sublevels: ["3.2.2", "3.2.2.b", "3.2.2.c"],
                    tags: ["Stochastik", "Normalverteilung", "Hypothesentest"]
                },
                {
                    name: "Ebenen im Raum, Kreuzprodukt und geometrische Anwendungen",
                    sublevels: ["3.2.3", "3.2.3.b", "3.2.3.c"],
                    tags: ["Vektoren", "Ebenen", "Kreuzprodukt", "Analytische Geometrie"]
                },
                {
                    name: "Folgen und Reihen: arithmetische und geometrische Folgen, Grenzwerte",
                    sublevels: ["3.1.5", "3.1.5.a", "3.1.5.b"],
                    tags: ["Folgen", "Reihen", "Grenzwerte"]
                }
            ]
        }
    ],

    // Returns all grade entries for a given SOR level number (1, 2, or 3)
    getGradesBySorLevel(level) {
        return this.grades.filter(g => g.sorLevel === level);
    },

    // Returns all archive sublevel IDs covered by a specific grade
    getSublevelsByGrade(grade) {
        const entry = this.grades.find(g => g.grade === grade);
        if (!entry) return [];
        const ids = new Set();
        entry.topics.forEach(t => t.sublevels.forEach(s => ids.add(s)));
        return Array.from(ids);
    },

    // Returns all topics for a given sublevel ID (used by archive UI)
    getTopicsBySublevel(sublevelId) {
        const result = [];
        this.grades.forEach(g => {
            g.topics.forEach(t => {
                if (t.sublevels.includes(sublevelId)) {
                    result.push({ grade: g.grade, label: g.label, topic: t.name, tags: t.tags });
                }
            });
        });
        return result;
    }
};
