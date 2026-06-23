// Curriculum coverage matrix: German school grades (Klasse 1-12) mapped to L1-L3 archive sections.
// Each entry lists the primary SOR archive sublevels covered in that school year.
window.SOR_CURRICULUM = {
    levels: [
        { code: "L1", label: "L1 – Grundlagen",  color: "#4ade80" },
        { code: "L2", label: "L2 – Aufbauwissen", color: "#facc15" },
        { code: "L3", label: "L3 – Vertiefung",   color: "#fb923c" }
    ],
    grades: [
        {
            klasse: 1,
            label: "Klasse 1",
            levelCode: "L1",
            phase: "Grundschule",
            topics: ["Zahlen bis 100", "Addition und Subtraktion", "Einfache Formen"],
            archiveSublevels: ["1.1.1.a", "1.2.1.a"],
            archiveLevel: "1"
        },
        {
            klasse: 2,
            label: "Klasse 2",
            levelCode: "L1",
            phase: "Grundschule",
            topics: ["Zahlenraum bis 1000", "Schriftliche Addition und Subtraktion", "Geometrische Formen"],
            archiveSublevels: ["1.1.1.a", "1.1.1.b", "1.2.1.a"],
            archiveLevel: "1"
        },
        {
            klasse: 3,
            label: "Klasse 3",
            levelCode: "L1",
            phase: "Grundschule",
            topics: ["Einmaleins", "Schriftliche Multiplikation", "Einheiten (Länge, Masse, Zeit)", "Umfang einfacher Figuren"],
            archiveSublevels: ["1.1.1.a", "1.1.1.b", "1.2.1.a", "1.3.2.a"],
            archiveLevel: "1"
        },
        {
            klasse: 4,
            label: "Klasse 4",
            levelCode: "L1",
            phase: "Grundschule",
            topics: ["Schriftliche Division", "Erste Brüche", "Dezimalzahlen (Einführung)", "Dreisatz (einfach)"],
            archiveSublevels: ["1.1.1.b", "1.1.2.a", "1.1.3.a", "1.3.1.a"],
            archiveLevel: "1"
        },
        {
            klasse: 5,
            label: "Klasse 5",
            levelCode: "L1",
            phase: "Unterstufe",
            topics: ["Bruchrechnung", "Negative Zahlen", "Koordinatensystem", "Teilbarkeit und Primzahlen"],
            archiveSublevels: ["1.1.2.a", "1.1.2.b", "1.1.4.a", "1.2.4.a", "1.1.5.a"],
            archiveLevel: "1"
        },
        {
            klasse: 6,
            label: "Klasse 6",
            levelCode: "L1",
            phase: "Unterstufe",
            topics: ["Brüche multiplizieren und dividieren", "Prozentrechnung", "ggT und kgV", "Winkel"],
            archiveSublevels: ["1.1.2.b", "1.1.2.c", "1.1.5.b", "1.2.3.a"],
            archiveLevel: "1"
        },
        {
            klasse: 7,
            label: "Klasse 7",
            levelCode: "L2",
            phase: "Mittelstufe",
            topics: ["Terme und lineare Gleichungen", "Formeln umstellen", "Proportionale Zuordnungen", "Geometrie: Ähnlichkeit"],
            archiveSublevels: ["2.1.1.a", "2.1.1.b", "2.5.1.a", "2.5.1.b"],
            archiveLevel: "2"
        },
        {
            klasse: 8,
            label: "Klasse 8",
            levelCode: "L2",
            phase: "Mittelstufe",
            topics: ["Lineare Gleichungssysteme", "Potenzen und Wurzeln", "Satz des Pythagoras", "Statistische Auswertungen"],
            archiveSublevels: ["2.1.2.a", "2.3.1.a", "2.3.2.a", "2.5.3.a"],
            archiveLevel: "2"
        },
        {
            klasse: 9,
            label: "Klasse 9",
            levelCode: "L2",
            phase: "Mittelstufe",
            topics: ["Quadratische Gleichungen", "Lineare Funktionen", "Trigonometrie am rechtwinkligen Dreieck", "Kreisgeometrie"],
            archiveSublevels: ["2.1.3.a", "2.1.3.b", "2.2.2.a", "2.4.1.a", "2.5.2.a"],
            archiveLevel: "2"
        },
        {
            klasse: 10,
            label: "Klasse 10",
            levelCode: "L2",
            phase: "Mittelstufe / Übergang",
            topics: ["Quadratische Funktionen", "Logarithmen (Einstieg)", "Wahrscheinlichkeit", "Kombinatorik"],
            archiveSublevels: ["2.2.3.a", "2.2.3.b", "2.3.3.a", "2.6.2.a", "2.6.1.a"],
            archiveLevel: "2"
        },
        {
            klasse: 11,
            label: "Klasse 11",
            levelCode: "L3",
            phase: "Oberstufe",
            topics: ["Ableitungsregeln", "Exponential- und Logarithmusfunktionen", "Vektoren und Skalarprodukt", "Stochastik: Bedingte Wahrscheinlichkeit"],
            archiveSublevels: ["3.1.1.a", "3.1.1.b", "3.1.4.a", "3.2.3.a", "3.2.1.a"],
            archiveLevel: "3"
        },
        {
            klasse: 12,
            label: "Klasse 12 / Abitur",
            levelCode: "L3",
            phase: "Oberstufe / Abitur",
            topics: ["Integralrechnung", "Vollständige Kurvendiskussion", "Normalverteilung und Binomialverteilung", "Geraden und Ebenen im Raum", "Komplexe Zahlen (Einstieg)"],
            archiveSublevels: ["3.1.2.a", "3.1.2.b", "3.1.3.a", "3.1.3.b", "3.2.2.a", "3.2.2.c", "3.2.3.b", "3.3.1.a"],
            archiveLevel: "3"
        }
    ]
};
