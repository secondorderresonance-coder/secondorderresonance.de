/* Lehrplan-Abdeckungsmatrix Klasse 1-12 → L1-L3 Archivabschnitte
 * Basiert auf dem typischen Gymnasiallehrplan (Bayern/NRW/BW).
 * Leichte Abweichungen je Bundesland moeglich.
 */
window.SOR_CURRICULUM_MATRIX = {
    version: "1.0",
    note: "Gymnasiallehrplan als Referenz (leichte Abweichungen je Bundesland moeglich). Klasse 13 entspricht Abiturjahr im G9-System.",
    entries: [
        {
            klasse: 1,
            label: "Klasse 1",
            schulform: "Grundschule",
            archiveLevel: "1",
            archiveLevelCode: "L1",
            primarySections: ["1.1.1.a", "1.2.1.a", "1.3.2.a"],
            topics: [
                { title: "Zahlen bis 20, Mengen vergleichen",           section: "1.1.1.a", type: "neu" },
                { title: "Addition und Subtraktion bis 20",             section: "1.1.1.a", type: "neu" },
                { title: "Einmaleins-Vorbereitung (Reihen bis 5)",      section: "1.1.1.a", type: "neu" },
                { title: "Einfache geometrische Formen (Kreis, Quadrat, Dreieck)", section: "1.2.1.a", type: "neu" },
                { title: "Grundlaengenmasse (cm, m)",                   section: "1.3.2.a", type: "neu" }
            ]
        },
        {
            klasse: 2,
            label: "Klasse 2",
            schulform: "Grundschule",
            archiveLevel: "1",
            archiveLevelCode: "L1",
            primarySections: ["1.1.1.a", "1.2.1.a", "1.3.2.a"],
            topics: [
                { title: "Zahlen bis 100, Zahlenreihen",                section: "1.1.1.a", type: "neu" },
                { title: "Kleines Einmaleins (1-10)",                   section: "1.1.1.a", type: "neu" },
                { title: "Einfache Multiplikation und Division",        section: "1.1.1.a", type: "neu" },
                { title: "Addition und Subtraktion bis 100",            section: "1.1.1.a", type: "vertiefung" },
                { title: "Uhrzeiten lesen und rechnen",                 section: "1.3.2.a", type: "neu" },
                { title: "Laengen und Massen (m, kg)",                  section: "1.3.2.a", type: "vertiefung" }
            ]
        },
        {
            klasse: 3,
            label: "Klasse 3",
            schulform: "Grundschule",
            archiveLevel: "1",
            archiveLevelCode: "L1",
            primarySections: ["1.1.1.a", "1.1.1.b", "1.2.1.a", "1.3.2.a", "1.3.2.b"],
            topics: [
                { title: "Zahlen bis 10.000",                           section: "1.1.1.a", type: "neu" },
                { title: "Schriftliche Addition und Subtraktion",       section: "1.1.1.b", type: "neu" },
                { title: "Schriftliche Multiplikation",                 section: "1.1.1.b", type: "neu" },
                { title: "Flaecheninhalt und Umfang (Rechteck)",        section: "1.2.1.a", type: "neu" },
                { title: "Einheiten: Laenge, Gewicht, Volumen",         section: "1.3.2.a", type: "vertiefung" },
                { title: "Einfaches Umrechnen (km ↔ m, kg ↔ g)",       section: "1.3.2.b", type: "neu" },
                { title: "Balkendiagramme lesen",                       section: "1.4.1.a", type: "neu" }
            ]
        },
        {
            klasse: 4,
            label: "Klasse 4",
            schulform: "Grundschule",
            archiveLevel: "1",
            archiveLevelCode: "L1",
            primarySections: ["1.1.1.b", "1.1.2.a", "1.2.1.a", "1.3.2.b"],
            topics: [
                { title: "Zahlen bis 1.000.000",                        section: "1.1.1.b", type: "neu" },
                { title: "Schriftliche Division",                       section: "1.1.1.b", type: "neu" },
                { title: "Einfache Brueche (1/2, 1/4, 3/4)",           section: "1.1.2.a", type: "neu" },
                { title: "Umfang und Flaecheninhalt einfacher Figuren", section: "1.2.1.a", type: "vertiefung" },
                { title: "Einheiten umrechnen (km, m, cm, mm)",         section: "1.3.2.b", type: "vertiefung" },
                { title: "Diagramme und Daten lesen",                   section: "1.4.1.a", type: "vertiefung" },
                { title: "Einfache Wahrscheinlichkeiten (sicher/moeglich/unmooeglich)", section: "1.4.2.a", type: "neu" }
            ]
        },
        {
            klasse: 5,
            label: "Klasse 5",
            schulform: "Gymnasium (Unterstufe)",
            archiveLevel: "1",
            archiveLevelCode: "L1",
            primarySections: ["1.1.2", "1.1.3", "1.1.4.a", "1.2.2.a", "1.2.3.a", "1.2.4.a", "1.3.1.a"],
            topics: [
                { title: "Brueche addieren und subtrahieren",           section: "1.1.2.a", type: "neu" },
                { title: "Brueche kuerzen und erweitern",               section: "1.1.2.a", type: "neu" },
                { title: "Dezimalzahlen und Kommarechnung",             section: "1.1.3.a", type: "neu" },
                { title: "Runden und Schaetzen",                        section: "1.1.3.b", type: "neu" },
                { title: "Negative Zahlen (Einstieg)",                  section: "1.1.4.a", type: "neu" },
                { title: "Wuerfel, Quader, Zylinder (Oberflaeche, Volumen)", section: "1.2.2.a", type: "neu" },
                { title: "Winkelarten und -masse",                      section: "1.2.3.a", type: "neu" },
                { title: "Punkte und Strecken im Koordinatensystem",    section: "1.2.4.a", type: "neu" },
                { title: "Proportionale Zuordnungen und Dreisatz",      section: "1.3.1.a", type: "neu" }
            ]
        },
        {
            klasse: 6,
            label: "Klasse 6",
            schulform: "Gymnasium (Unterstufe)",
            archiveLevel: "1",
            archiveLevelCode: "L1",
            primarySections: ["1.1.2.b", "1.1.2.c", "1.1.5.a", "1.1.5.b", "1.3.1.b", "1.3.2.b", "1.4.2.a"],
            topics: [
                { title: "Prozentwerte und Prozentsatz",                section: "1.1.2.b", type: "neu" },
                { title: "Brueche multiplizieren und dividieren",       section: "1.1.2.c", type: "neu" },
                { title: "Primfaktorzerlegung",                         section: "1.1.5.a", type: "neu" },
                { title: "ggT und kgV",                                  section: "1.1.5.b", type: "neu" },
                { title: "Antiproportionale Zuordnungen",               section: "1.3.1.b", type: "neu" },
                { title: "Einheiten umrechnen (Laenge, Flaeche, Volumen)", section: "1.3.2.b", type: "vertiefung" },
                { title: "Baumdiagramme und einfache Wahrscheinlichkeiten", section: "1.4.2.a", type: "vertiefung" },
                { title: "Mittelwert und Haeufigkeit",                  section: "1.4.1.b", type: "neu" }
            ]
        },
        {
            klasse: 7,
            label: "Klasse 7",
            schulform: "Gymnasium (Mittelstufe)",
            archiveLevel: "2",
            archiveLevelCode: "L2",
            primarySections: ["2.1.1.a", "2.1.1.b", "2.2.2.a", "2.5.3.a"],
            reviewSections: ["1.1.4.a", "1.2.3.b", "1.4.1.b"],
            topics: [
                { title: "Lineare Gleichungen loesen",                  section: "2.1.1.a", type: "neu" },
                { title: "Formeln umstellen",                           section: "2.1.1.b", type: "neu" },
                { title: "Terme vereinfachen und ausklammern",          section: "2.1.1.a", type: "neu" },
                { title: "Geradengleichung und Steigung",               section: "2.2.2.a", type: "neu" },
                { title: "Dreieckstypen und Dreieckskonstruktion",      section: "1.2.3.b", type: "wiederholung" },
                { title: "Satz des Pythagoras",                         section: "2.5.3.a", type: "neu" },
                { title: "Rechnen mit negativen Zahlen (Vertiefung)",   section: "1.1.4.a", type: "wiederholung" },
                { title: "Kreisdiagramme und Statistik",                section: "1.4.1.a", type: "wiederholung" }
            ]
        },
        {
            klasse: 8,
            label: "Klasse 8",
            schulform: "Gymnasium (Mittelstufe)",
            archiveLevel: "2",
            archiveLevelCode: "L2",
            primarySections: ["2.1.1.c", "2.1.2.a", "2.3.1.a", "2.3.2.a", "2.5.1.a", "2.5.2.a"],
            reviewSections: ["2.1.1.a", "2.1.1.b", "2.5.3.a"],
            topics: [
                { title: "Gleichungen mit Bruechen",                    section: "2.1.1.c", type: "neu" },
                { title: "Lineare Gleichungssysteme (2 Unbekannte)",    section: "2.1.2.a", type: "neu" },
                { title: "Potenzgesetze und Rechenregeln",              section: "2.3.1.a", type: "neu" },
                { title: "Negative und gebrochene Exponenten",          section: "2.3.1.b", type: "neu" },
                { title: "Quadrat- und Kubikwurzeln",                   section: "2.3.2.a", type: "neu" },
                { title: "Aehnlichkeit und Strahlensatz",               section: "2.5.1.a", type: "neu" },
                { title: "Aehnliche Figuren und Massstab",              section: "2.5.1.b", type: "neu" },
                { title: "Kreisumfang und Kreisflaeche",                section: "2.5.2.a", type: "neu" },
                { title: "Pythagoras Anwendungen (Vertiefung)",         section: "2.5.3.a", type: "wiederholung" }
            ]
        },
        {
            klasse: 9,
            label: "Klasse 9",
            schulform: "Gymnasium (Mittelstufe/Oberstufe-Einstieg)",
            archiveLevel: "2",
            archiveLevelCode: "L2",
            primarySections: ["2.1.3.a", "2.1.3.b", "2.2.3.a", "2.4.1.a", "2.6.1.a", "2.6.2.a"],
            reviewSections: ["2.1.2.a", "2.5.1"],
            topics: [
                { title: "Quadratische Gleichungen (Loesungsformel, p-q-Formel)", section: "2.1.3.a", type: "neu" },
                { title: "Faktorisierung quadratischer Terme",          section: "2.1.3.b", type: "neu" },
                { title: "Parabelscheitel und Nullstellen",             section: "2.2.3.a", type: "neu" },
                { title: "Verschiebung und Streckung der Parabel",      section: "2.2.3.b", type: "neu" },
                { title: "Trigonometrie am rechtwinkligen Dreieck (sin, cos, tan)", section: "2.4.1.a", type: "neu" },
                { title: "Kombinatorik: Permutationen und Kombinationen", section: "2.6.1.a", type: "neu" },
                { title: "Binomialkoeffizient",                         section: "2.6.1.b", type: "neu" },
                { title: "Baumdiagramme und Laplace-Experiment",        section: "2.6.2.a", type: "vertiefung" },
                { title: "Koerper: Kegel und Pyramide (Oberflaeche, Volumen)", section: "1.2.2.a", type: "vertiefung" }
            ]
        },
        {
            klasse: 10,
            label: "Klasse 10",
            schulform: "Gymnasium (Oberstufe-Einstieg)",
            archiveLevel: "2",
            archiveLevelCode: "L2",
            primarySections: ["2.2.1", "2.3.3", "2.4.1.b", "2.4.2.a", "2.4.3.a"],
            reviewSections: ["2.1.3", "2.2.3"],
            topics: [
                { title: "Exponentielles Wachstum und Zerfall",         section: "2.2.1.a", type: "neu" },
                { title: "Exponentieller Zerfall und Halbwertszeit",    section: "2.2.1.c", type: "neu" },
                { title: "Logarithmen: Definition und Rechenregeln",    section: "2.3.3.a", type: "neu" },
                { title: "Logarithmische Gleichungen",                  section: "2.3.3.b", type: "neu" },
                { title: "Negative und gebrochene Exponenten (Vertiefung)", section: "2.3.1.b", type: "wiederholung" },
                { title: "Bogenmass und Winkelumrechnung",              section: "2.4.1.b", type: "neu" },
                { title: "Sinus- und Kosinussatz (allgemeines Dreieck)", section: "2.4.2.a", type: "neu" },
                { title: "Einheitskreis und Periodizitaet",             section: "2.4.3.a", type: "neu" },
                { title: "Sehnen und Tangenten am Kreis",               section: "2.5.2.b", type: "neu" },
                { title: "Gleichungssysteme mit 3 Unbekannten",         section: "2.1.2.b", type: "vertiefung" }
            ]
        },
        {
            klasse: 11,
            label: "Klasse 11",
            schulform: "Gymnasium (Oberstufe)",
            archiveLevel: "3",
            archiveLevelCode: "L3",
            primarySections: ["3.1.1", "3.1.4", "3.1.5", "3.2.2.a", "3.2.3.a"],
            reviewSections: ["2.2.1", "2.3.3", "2.4.3"],
            topics: [
                { title: "Ableitungsregeln: Ketten-, Produkt-, Quotientenregel", section: "3.1.1.a", type: "neu" },
                { title: "Monotonie und Extremstellen",                 section: "3.1.1.b", type: "neu" },
                { title: "Kruemmung und Wendepunkte",                   section: "3.1.1.c", type: "neu" },
                { title: "Linearisierung und Naeherungen (Tangente)",   section: "3.1.1.d", type: "neu" },
                { title: "Ableitung und Integration von e^x und ln(x)", section: "3.1.4.a", type: "neu" },
                { title: "Wachstums- und Zerfallsmodelle (Analysis)",   section: "3.1.4.b", type: "vertiefung" },
                { title: "Arithmetische und geometrische Folgen",       section: "3.1.5.a", type: "neu" },
                { title: "Grenzwerte von Folgen",                       section: "3.1.5.b", type: "neu" },
                { title: "Binomialverteilung",                          section: "3.2.2.a", type: "neu" },
                { title: "Erwartungswert und Varianz",                  section: "3.2.2.b", type: "neu" },
                { title: "Vektoren und Skalarprodukt (Einstieg)",       section: "3.2.3.a", type: "neu" }
            ]
        },
        {
            klasse: 12,
            label: "Klasse 12 / Abitur",
            schulform: "Gymnasium (Oberstufe / Abiturniveau)",
            archiveLevel: "3",
            archiveLevelCode: "L3",
            primarySections: ["3.1.2", "3.1.3", "3.2.1", "3.2.2.c", "3.2.3"],
            reviewSections: ["3.1.1", "3.1.4", "3.2.2.a", "3.2.2.b"],
            topics: [
                { title: "Vollstaendige Kurvendiskussion",              section: "3.1.2.a", type: "neu" },
                { title: "Optimierungsaufgaben mit Ableitungen",        section: "3.1.2.b", type: "neu" },
                { title: "Stammfunktionen und Grundregeln",             section: "3.1.3.a", type: "neu" },
                { title: "Bestimmtes Integral und Flaecheninhalt",      section: "3.1.3.b", type: "neu" },
                { title: "Substitutionsregel",                          section: "3.1.3.c", type: "neu" },
                { title: "Partielle Integration",                       section: "3.1.3.d", type: "neu" },
                { title: "Bedingte Wahrscheinlichkeit",                 section: "3.2.1.a", type: "neu" },
                { title: "Bayes-Theorem",                               section: "3.2.1.b", type: "neu" },
                { title: "Normalverteilung und Glockenkurve",           section: "3.2.2.c", type: "neu" },
                { title: "Vektoren: Geraden und Ebenen im Raum",        section: "3.2.3.b", type: "neu" },
                { title: "Kreuzprodukt und geometrische Anwendungen",   section: "3.2.3.c", type: "neu" },
                { title: "Komplexe Zahlen: kartesische Form (bundeslandabhaengig)", section: "3.3.1.a", type: "optional" },
                { title: "Matrizen: Addition und Multiplikation (bundeslandabhaengig)", section: "3.4.1.a", type: "optional" },
                { title: "Determinante 2x2 (bundeslandabhaengig)",     section: "3.4.1.b", type: "optional" }
            ]
        }
    ],

    /* Schnell-Lookup: Klasse-Nummer → Matrix-Eintrag */
    byKlasse(k) {
        return this.entries.find(e => e.klasse === k) || null;
    },

    /* Alle primären Archivabschnitte fuer eine Klasse */
    sectionsForKlasse(k) {
        const entry = this.byKlasse(k);
        return entry ? entry.primarySections : [];
    },

    /* Alle Klassen, die einen bestimmten Archivabschnitt als Hauptthema haben */
    klassenForSection(sectionId) {
        return this.entries
            .filter(e => e.primarySections.some(s => s === sectionId || s.startsWith(sectionId + ".")))
            .map(e => e.klasse);
    },

    /* Empfohlene Archivebene fuer eine Klasse */
    archiveLevelForKlasse(k) {
        const entry = this.byKlasse(k);
        return entry ? entry.archiveLevelCode : null;
    }
};
