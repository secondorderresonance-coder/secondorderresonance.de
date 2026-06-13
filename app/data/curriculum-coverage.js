/**
 * SOR Curriculum Coverage Matrix – Klasse 1–12 → L1–L3 archive sections
 *
 * Each grade entry lists the main topics taught in German schools (Kernlehrplan)
 * and the corresponding SOR archive section IDs from the L1–L3 taxonomy.
 * This data file powers curriculum-aligned filtering and coverage gap analysis.
 */
window.SOR_CURRICULUM_K1_12 = {
    description: "Lehrplan-Abdeckungsmatrix Klasse 1–12 (Deutschland, Kernlehrplan-orientiert)",
    version: "1.0",
    levels: [
        {
            phase: "Grundschule",
            klassen: [1, 2, 3, 4],
            level: "L1",
            levelCode: "1"
        },
        {
            phase: "Unterstufe / Orientierungsstufe",
            klassen: [5, 6],
            level: "L1",
            levelCode: "1"
        },
        {
            phase: "Mittelstufe",
            klassen: [7, 8, 9, 10],
            level: "L2",
            levelCode: "2"
        },
        {
            phase: "Oberstufe",
            klassen: [11, 12],
            level: "L3",
            levelCode: "3"
        }
    ],
    grades: [
        {
            klasse: 1,
            phase: "Grundschule",
            level: "L1",
            topics: [
                { name: "Zählen und Zahlen bis 20",          section: "1.1.1.a",  covered: true },
                { name: "Addition und Subtraktion bis 20",   section: "1.1.1.a",  covered: true },
                { name: "Einfache geometrische Formen",      section: "1.2.1.a",  covered: true },
                { name: "Längen und Gewichte messen",        section: "1.3.2.a",  covered: true },
                { name: "Daten ablesen (Piktogramme)",       section: "1.4.1.a",  covered: true }
            ]
        },
        {
            klasse: 2,
            phase: "Grundschule",
            level: "L1",
            topics: [
                { name: "Zahlen bis 100",                      section: "1.1.1.a",  covered: true },
                { name: "Kleines Einmaleins",                  section: "1.1.1.a",  covered: true },
                { name: "Addition und Subtraktion bis 100",    section: "1.1.1.a",  covered: true },
                { name: "Schriftliche Addition",               section: "1.1.1.b",  covered: true },
                { name: "Umfang einfacher Figuren",            section: "1.2.1.a",  covered: true },
                { name: "Balken- und Bilddiagramme",           section: "1.4.1.a",  covered: true }
            ]
        },
        {
            klasse: 3,
            phase: "Grundschule",
            level: "L1",
            topics: [
                { name: "Zahlen bis 1000",                     section: "1.1.1.b",  covered: true },
                { name: "Schriftliche Rechenverfahren",        section: "1.1.1.b",  covered: true },
                { name: "Großes Einmaleins",                   section: "1.1.1.a",  covered: true },
                { name: "Brüche einführen (Hälften, Viertel)", section: "1.1.2.a",  covered: true },
                { name: "Flächeninhalt messen",                section: "1.2.1.a",  covered: true },
                { name: "Gewichte und Zeiteinheiten",          section: "1.3.2.a",  covered: true }
            ]
        },
        {
            klasse: 4,
            phase: "Grundschule",
            level: "L1",
            topics: [
                { name: "Zahlen bis 1 000 000",                section: "1.1.1.b",  covered: true },
                { name: "Schriftliche Division",               section: "1.1.1.b",  covered: true },
                { name: "Einfache Brüche und Dezimalzahlen",   section: "1.1.2.a",  covered: true },
                { name: "Dezimalzahlen (Zehntel, Hundertstel)",section: "1.1.3.a",  covered: true },
                { name: "Volumen und Körper (Quader)",         section: "1.2.2.a",  covered: true },
                { name: "Flächeninhalte zusammenges. Figuren", section: "1.2.1.b",  covered: true },
                { name: "Daten und Zufall (erste Schritte)",   section: "1.4.2.a",  covered: true }
            ]
        },
        {
            klasse: 5,
            phase: "Unterstufe",
            level: "L1",
            topics: [
                { name: "Bruchrechnung (alle Grundoperationen)",section: "1.1.2.a",  covered: true },
                { name: "Brüche kürzen und erweitern",         section: "1.1.2.a",  covered: true },
                { name: "Brüche multiplizieren und dividieren", section: "1.1.2.c",  covered: true },
                { name: "Dezimalzahlen",                       section: "1.1.3.a",  covered: true },
                { name: "Runden und Schätzen",                 section: "1.1.3.b",  covered: true },
                { name: "Primfaktorzerlegung, ggT, kgV",       section: "1.1.5.a",  covered: true },
                { name: "Koordinatensystem (2D)",              section: "1.2.4.a",  covered: true },
                { name: "Dreisatz (proportional)",             section: "1.3.1.a",  covered: true },
                { name: "Einheiten umrechnen",                 section: "1.3.2.b",  covered: true }
            ]
        },
        {
            klasse: 6,
            phase: "Unterstufe",
            level: "L1",
            topics: [
                { name: "Negative Zahlen",                     section: "1.1.4.a",  covered: true },
                { name: "Prozentrechnung",                     section: "1.1.2.b",  covered: true },
                { name: "Proportionale und antiproportionale\n Zuordnungen", section: "1.3.1.b", covered: true },
                { name: "Fläche und Umfang (Vertiefung)",      section: "1.2.1.a",  covered: true },
                { name: "Kreisumfang und Kreisfläche",         section: "1.2.1.a",  covered: true },
                { name: "Zylinder: Volumen und Oberfläche",    section: "1.2.2.a",  covered: true },
                { name: "Winkelarten und -messung",            section: "1.2.3.a",  covered: true },
                { name: "Statistische Kennzahlen",             section: "1.4.1.b",  covered: true },
                { name: "Einfache Wahrscheinlichkeitsrechnung",section: "1.4.2.a",  covered: true }
            ]
        },
        {
            klasse: 7,
            phase: "Mittelstufe",
            level: "L2",
            topics: [
                { name: "Terme aufstellen und vereinfachen",   section: "2.1.1",    covered: true },
                { name: "Lineare Gleichungen lösen",           section: "2.1.1.a",  covered: true },
                { name: "Formeln umstellen",                   section: "2.1.1.b",  covered: true },
                { name: "Proportionale lineare Funktionen",    section: "2.2.2.a",  covered: true },
                { name: "Potenzen und Potenzgesetze",          section: "2.3.1.a",  covered: true },
                { name: "Satz des Pythagoras",                 section: "2.5.3.a",  covered: true },
                { name: "Dreiecksarten und Konstruktionen",    section: "1.2.3.b",  covered: true },
                { name: "Baumdiagramme und Laplace",           section: "2.6.2.a",  covered: true },
                { name: "Statistische Auswertungen",           section: "1.4.1.b",  covered: true }
            ]
        },
        {
            klasse: 8,
            phase: "Mittelstufe",
            level: "L2",
            topics: [
                { name: "Lineare Gleichungssysteme (2 Unbekannte)",section: "2.1.2.a", covered: true },
                { name: "Quadratische Gleichungen (Einführung)",    section: "2.1.3.a", covered: true },
                { name: "Binomische Formeln",                       section: "2.1.3.b", covered: true },
                { name: "Wurzeln und Quadratwurzel",                section: "2.3.2.a", covered: true },
                { name: "Lineare Funktionen vertieft (Schnittpunkte)",section:"2.2.2.a",covered: true },
                { name: "Trigonometrie am rechtwinkligen Dreieck",  section: "2.4.1.a", covered: true },
                { name: "Ähnlichkeit und Strahlensatz",             section: "2.5.1.a", covered: true },
                { name: "Negative Potenzen und gebrochene Exponenten",section:"2.3.1.b",covered: true }
            ]
        },
        {
            klasse: 9,
            phase: "Mittelstufe",
            level: "L2",
            topics: [
                { name: "Quadratische Gleichungen (vollständig)",section: "2.1.3.a",  covered: true },
                { name: "Faktorisieren und quadratische Ergänzung",section:"2.1.3.b",covered: true },
                { name: "Quadratische Funktionen",              section: "2.2.3.a",  covered: true },
                { name: "Parabelscheitel und Nullstellen",      section: "2.2.3.a",  covered: true },
                { name: "Exponentialfunktionen",               section: "2.2.1.a",  covered: true },
                { name: "Logarithmen (Einführung)",            section: "2.3.3.a",  covered: true },
                { name: "Sinus und Kosinus (Einheitskreis)",   section: "2.4.1.a",  covered: true },
                { name: "Sinus- und Kosinussatz",              section: "2.4.2.a",  covered: true },
                { name: "Kreisgeometrie (Sehnen, Tangenten)",  section: "2.5.2.b",  covered: true }
            ]
        },
        {
            klasse: 10,
            phase: "Mittelstufe / Übergang Oberstufe",
            level: "L2",
            topics: [
                { name: "Gleichungssysteme (3 Unbekannte)",    section: "2.1.2.b",  covered: true },
                { name: "Ungleichungen (linear)",              section: "2.1.4.a",  covered: true },
                { name: "Exponentielles Wachstum und Zerfall", section: "2.2.1.a",  covered: true },
                { name: "Halbwertszeit",                       section: "2.2.1.c",  covered: true },
                { name: "Logarithmische Gleichungen",          section: "2.3.3.b",  covered: true },
                { name: "Trigonometrische Funktionen (Periode)",section:"2.4.3.a",  covered: true },
                { name: "Kombinatorik (Permutationen, Kombin.)",section:"2.6.1.a",  covered: true },
                { name: "Binomialkoeffizient",                 section: "2.6.1.b",  covered: true },
                { name: "Mehrstufige Zufallsexperimente",      section: "2.6.2.b",  covered: true }
            ]
        },
        {
            klasse: 11,
            phase: "Oberstufe – Einführungsphase",
            level: "L3",
            topics: [
                { name: "Ableitungsregeln (Ketten-, Produkt-, Quotientenregel)",section:"3.1.1.a",covered:true },
                { name: "Monotonie und Extremstellen",         section: "3.1.1.b",  covered: true },
                { name: "Krümmung und Wendepunkte",            section: "3.1.1.c",  covered: true },
                { name: "Ableitung von e^x und ln(x)",         section: "3.1.4.a",  covered: true },
                { name: "Wachstums- und Zerfallsmodelle",      section: "3.1.4.b",  covered: true },
                { name: "Vektoren im Raum",                    section: "3.2.3.a",  covered: true },
                { name: "Skalarprodukt",                       section: "3.2.3.a",  covered: true },
                { name: "Geraden und Ebenen im Raum",          section: "3.2.3.b",  covered: true },
                { name: "Arithmetische und geometrische Folgen",section:"3.1.5.a",  covered: true }
            ]
        },
        {
            klasse: 12,
            phase: "Oberstufe – Qualifikationsphase",
            level: "L3",
            topics: [
                { name: "Stammfunktionen und Grundregeln",     section: "3.1.3.a",  covered: true },
                { name: "Bestimmtes Integral und Flächeninhalt",section:"3.1.3.b",  covered: true },
                { name: "Substitutionsregel",                  section: "3.1.3.c",  covered: true },
                { name: "Partielle Integration",               section: "3.1.3.d",  covered: true },
                { name: "Vollständige Kurvendiskussion",        section: "3.1.2.a",  covered: true },
                { name: "Optimierungsaufgaben",                section: "3.1.2.b",  covered: true },
                { name: "Bedingte Wahrscheinlichkeit",         section: "3.2.1.a",  covered: true },
                { name: "Bayes-Theorem",                       section: "3.2.1.b",  covered: true },
                { name: "Binomialverteilung",                  section: "3.2.2.a",  covered: true },
                { name: "Erwartungswert und Varianz",          section: "3.2.2.b",  covered: true },
                { name: "Normalverteilung",                    section: "3.2.2.c",  covered: true },
                { name: "Kreuzprodukt und Anwendungen",        section: "3.2.3.c",  covered: true },
                { name: "Kegelschnitte (Parabel, Ellipse, Hyperbel)",section:"3.5.1.a",covered:true }
            ]
        }
    ]
};
