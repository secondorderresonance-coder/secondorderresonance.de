/**
 * Lehrplan-Matrix: Klasse 1–12 → L1–L3 Archiv-Sublevels
 *
 * Jede Klassenstufe ist einem Archiv-Level zugeordnet und listet die
 * wichtigsten Themen mit den passenden Archiv-Sublevel-IDs auf.
 * Diese Daten treiben die Lehrplan-Matrix-Seite (app/lehrplan.html) an.
 */
window.SOR_CURRICULUM = {
    meta: {
        title: "Lehrplan-Matrix Klasse 1–12",
        description: "Systematische Zuordnung der Schulthemen Klasse 1–12 zu den L1–L3 Archiv-Abschnitten.",
        lastUpdated: "2026-06"
    },
    grades: [
        {
            grade: 1,
            label: "Klasse 1",
            ageHint: "6–7 Jahre",
            archiveLevel: "1",
            levelCode: "L1",
            levelColor: "#22c55e",
            topics: [
                { title: "Zahlen bis 20 lesen und schreiben", sublevel: "1.1.1.a", topic: "Grundrechenarten" },
                { title: "Addition und Subtraktion im Zahlenraum 20", sublevel: "1.1.1.a", topic: "Kopfrechnen und Rechenstrategien" },
                { title: "Verdoppeln und Halbieren", sublevel: "1.1.1.a", topic: "Kopfrechnen und Rechenstrategien" },
                { title: "Grundformen erkennen (Kreis, Quadrat, Dreieck)", sublevel: "1.2.1.a", topic: "Geometrie" },
                { title: "Längen und Größen vergleichen", sublevel: "1.3.2.a", topic: "Einheiten" }
            ]
        },
        {
            grade: 2,
            label: "Klasse 2",
            ageHint: "7–8 Jahre",
            archiveLevel: "1",
            levelCode: "L1",
            levelColor: "#22c55e",
            topics: [
                { title: "Zahlen bis 100", sublevel: "1.1.1.a", topic: "Kopfrechnen und Rechenstrategien" },
                { title: "Kleines Einmaleins (1×1)", sublevel: "1.1.1.a", topic: "Grundrechenarten" },
                { title: "Schriftliche Addition und Subtraktion", sublevel: "1.1.1.b", topic: "Schriftliches Rechnen" },
                { title: "Geometrische Figuren und Körper", sublevel: "1.2.1.a", topic: "Geometrie" },
                { title: "Messen: Länge, Gewicht, Geld, Zeit", sublevel: "1.3.2.a", topic: "Einheiten" }
            ]
        },
        {
            grade: 3,
            label: "Klasse 3",
            ageHint: "8–9 Jahre",
            archiveLevel: "1",
            levelCode: "L1",
            levelColor: "#22c55e",
            topics: [
                { title: "Zahlen bis 1.000", sublevel: "1.1.1.b", topic: "Schriftliches Rechnen" },
                { title: "Schriftliche Multiplikation und Division", sublevel: "1.1.1.b", topic: "Schriftliches Rechnen" },
                { title: "Einführung in Brüche (½, ¼)", sublevel: "1.1.2.a", topic: "Bruchrechnung" },
                { title: "Flächeninhalt einfacher Figuren", sublevel: "1.2.1.a", topic: "Geometrie" },
                { title: "Einheiten umrechnen (m, cm, kg, g)", sublevel: "1.3.2.b", topic: "Einheiten" }
            ]
        },
        {
            grade: 4,
            label: "Klasse 4",
            ageHint: "9–10 Jahre",
            archiveLevel: "1",
            levelCode: "L1",
            levelColor: "#22c55e",
            topics: [
                { title: "Zahlen bis 1.000.000", sublevel: "1.1.1.b", topic: "Schriftliches Rechnen" },
                { title: "Dezimalzahlen einführen", sublevel: "1.1.3.a", topic: "Dezimalzahlen" },
                { title: "Brüche vergleichen und ordnen", sublevel: "1.1.2.a", topic: "Bruchrechnung" },
                { title: "Daten auslesen und Diagramme", sublevel: "1.4.1.a", topic: "Statistik" },
                { title: "Zusammengesetzte Figuren (Umfang/Fläche)", sublevel: "1.2.1.b", topic: "Geometrie" }
            ]
        },
        {
            grade: 5,
            label: "Klasse 5",
            ageHint: "10–11 Jahre",
            archiveLevel: "1",
            levelCode: "L1",
            levelColor: "#22c55e",
            topics: [
                { title: "Natürliche Zahlen und Teilbarkeit", sublevel: "1.1.5.a", topic: "Primzahlen" },
                { title: "Brüche addieren, subtrahieren, kürzen", sublevel: "1.1.2.a", topic: "Bruchrechnung" },
                { title: "Koordinatensystem und Punkte", sublevel: "1.2.4.a", topic: "Koordinatensystem" },
                { title: "Dreiecke und Vierecke (Flächeninhalt)", sublevel: "1.2.1.a", topic: "Geometrie" },
                { title: "Mittelwert und Häufigkeit", sublevel: "1.4.1.b", topic: "Statistik" }
            ]
        },
        {
            grade: 6,
            label: "Klasse 6",
            ageHint: "11–12 Jahre",
            archiveLevel: "1",
            levelCode: "L1",
            levelColor: "#22c55e",
            topics: [
                { title: "Negative Zahlen einführen", sublevel: "1.1.4.a", topic: "Negative Zahlen" },
                { title: "Brüche multiplizieren und dividieren", sublevel: "1.1.2.c", topic: "Bruchrechnung" },
                { title: "Proportionale Zuordnungen (Dreisatz)", sublevel: "1.3.1.a", topic: "Dreisatz" },
                { title: "Prozentwerte im Alltag", sublevel: "1.1.2.b", topic: "Prozentrechnung" },
                { title: "Grundlagen Wahrscheinlichkeit", sublevel: "1.4.2.a", topic: "Wahrscheinlichkeit" }
            ]
        },
        {
            grade: 7,
            label: "Klasse 7",
            ageHint: "12–13 Jahre",
            archiveLevel: "2",
            levelCode: "L2",
            levelColor: "#eab308",
            topics: [
                { title: "Terme und Variable, Termumformungen", sublevel: "2.1.1.a", topic: "Gleichungen" },
                { title: "Lineare Gleichungen lösen", sublevel: "2.1.1.a", topic: "Lineare Gleichungen" },
                { title: "Lineare Funktionen und Geraden", sublevel: "2.2.2.a", topic: "Lineare Funktionen" },
                { title: "Satz des Pythagoras", sublevel: "2.5.3.a", topic: "Pythagoras" },
                { title: "Daten und Zufall (Baumdiagramm)", sublevel: "2.6.2.b", topic: "Wahrscheinlichkeit" }
            ]
        },
        {
            grade: 8,
            label: "Klasse 8",
            ageHint: "13–14 Jahre",
            archiveLevel: "2",
            levelCode: "L2",
            levelColor: "#eab308",
            topics: [
                { title: "Lineare Gleichungssysteme (2×2)", sublevel: "2.1.2.a", topic: "Gleichungssysteme" },
                { title: "Quadratische Gleichungen (Lösungsformel)", sublevel: "2.1.3.a", topic: "Quadratische Gleichungen" },
                { title: "Ähnliche Figuren und Strahlensätze", sublevel: "2.5.1.a", topic: "Ähnlichkeit" },
                { title: "Kreisgeometrie (Umfang, Fläche)", sublevel: "2.5.2.a", topic: "Kreisgeometrie" },
                { title: "Statistik: Streumaße, Boxplot", sublevel: "2.6.1.a", topic: "Kombinatorik" }
            ]
        },
        {
            grade: 9,
            label: "Klasse 9",
            ageHint: "14–15 Jahre",
            archiveLevel: "2",
            levelCode: "L2",
            levelColor: "#eab308",
            topics: [
                { title: "Potenzen und Potenzgesetze", sublevel: "2.3.1.a", topic: "Potenzen" },
                { title: "Quadrat- und Kubikwurzeln", sublevel: "2.3.2.a", topic: "Wurzeln" },
                { title: "Quadratische Funktionen und Parabeln", sublevel: "2.2.3.a", topic: "Quadratische Funktionen" },
                { title: "Trigonometrie am rechtwinkligen Dreieck", sublevel: "2.4.1.a", topic: "Trigonometrie" },
                { title: "Laplace-Wahrscheinlichkeit und Baumdiagramm", sublevel: "2.6.2.a", topic: "Wahrscheinlichkeit" }
            ]
        },
        {
            grade: 10,
            label: "Klasse 10",
            ageHint: "15–16 Jahre",
            archiveLevel: "2",
            levelCode: "L2",
            levelColor: "#eab308",
            topics: [
                { title: "Logarithmen: Definition und Rechenregeln", sublevel: "2.3.3.a", topic: "Logarithmen" },
                { title: "Exponentielles Wachstum und Zerfall", sublevel: "2.2.1.a", topic: "Exponentielles Verhalten" },
                { title: "Sinus- und Kosinussatz", sublevel: "2.4.2.a", topic: "Trigonometrie" },
                { title: "Einführung Vektoren und Vektoroperationen", sublevel: "3.2.3.a", topic: "Vektoren" },
                { title: "Kombinatorik: Permutationen und Kombinationen", sublevel: "2.6.1.a", topic: "Kombinatorik" }
            ]
        },
        {
            grade: 11,
            label: "Klasse 11",
            ageHint: "16–17 Jahre",
            archiveLevel: "3",
            levelCode: "L3",
            levelColor: "#f97316",
            topics: [
                { title: "Ableitungsregeln (Ketten-, Produkt-, Quotientenregel)", sublevel: "3.1.1.a", topic: "Ableitungen" },
                { title: "Monotonie, Extremstellen, Kurvendiskussion", sublevel: "3.1.1.b", topic: "Extremstellen" },
                { title: "Vektoren: Geraden und Ebenen im Raum", sublevel: "3.2.3.b", topic: "Analytische Geometrie" },
                { title: "Bedingte Wahrscheinlichkeit und Bayes", sublevel: "3.2.1.a", topic: "Stochastik" },
                { title: "Binomialverteilung und Erwartungswert", sublevel: "3.2.2.a", topic: "Verteilungen" }
            ]
        },
        {
            grade: 12,
            label: "Klasse 12",
            ageHint: "17–18 Jahre",
            archiveLevel: "3",
            levelCode: "L3",
            levelColor: "#f97316",
            topics: [
                { title: "Integral und Stammfunktionen", sublevel: "3.1.3.a", topic: "Integralrechnung" },
                { title: "Bestimmtes Integral und Flächeninhalt", sublevel: "3.1.3.b", topic: "Integralrechnung" },
                { title: "Kreuzprodukt und geometrische Anwendungen", sublevel: "3.2.3.c", topic: "Analytische Geometrie" },
                { title: "Normalverteilung und Hypothesentest", sublevel: "3.2.2.c", topic: "Verteilungen" },
                { title: "Kegelschnitte: Parabel, Ellipse, Hyperbel", sublevel: "3.5.1.a", topic: "Analytische Geometrie" }
            ]
        }
    ]
};
