// Curriculum coverage matrix: Klasse 1-12 mapped to L1-L3 archive sections.
// Each grade lists its core topics with the matching archive sublevel ID and title.
// Use this data to deep-link learners directly into the archive from the matrix UI.

window.SOR_CURRICULUM = {
    grades: [
        {
            grade: 1,
            title: "Klasse 1",
            sorLevel: "L1",
            levelColor: "#4ade80",
            topics: [
                { topic: "Zahlen bis 20", sublevel: "1.1.1.a", section: "Kopfrechnen und Rechenstrategien", note: "Zählen, Vergleichen, Ordnen" },
                { topic: "Addition und Subtraktion bis 20", sublevel: "1.1.1.a", section: "Kopfrechnen und Rechenstrategien", note: "Plusaufgaben, Minusaufgaben" },
                { topic: "Einfache Formen erkennen", sublevel: "1.2.1.a", section: "Rechteck, Dreieck, Kreis", note: "Figuren benennen und sortieren" }
            ]
        },
        {
            grade: 2,
            title: "Klasse 2",
            sorLevel: "L1",
            levelColor: "#4ade80",
            topics: [
                { topic: "Zahlen bis 100", sublevel: "1.1.1.a", section: "Kopfrechnen und Rechenstrategien", note: "Stellenwerte Zehner/Einer" },
                { topic: "Einmaleins", sublevel: "1.1.1.a", section: "Kopfrechnen und Rechenstrategien", note: "Multiplizieren und Dividieren bis 100" },
                { topic: "Größen: Zeit und Geld", sublevel: "1.3.2.a", section: "Länge, Masse, Zeit, Volumen", note: "Uhr lesen, Euro und Cent" },
                { topic: "Einfache Sachaufgaben", sublevel: "1.3.1.a", section: "Proportionale Zuordnungen", note: "Alltagsbezogenes Rechnen" }
            ]
        },
        {
            grade: 3,
            title: "Klasse 3",
            sorLevel: "L1",
            levelColor: "#4ade80",
            topics: [
                { topic: "Schriftliches Addieren und Subtrahieren", sublevel: "1.1.1.b", section: "Schriftliches Rechnen", note: "Zahlen bis 1000" },
                { topic: "Schriftliches Multiplizieren", sublevel: "1.1.1.b", section: "Schriftliches Rechnen", note: "Einstelliger Multiplikator" },
                { topic: "Flächen und Umfang (Grundschule)", sublevel: "1.2.1.a", section: "Rechteck, Dreieck, Kreis", note: "Rechteck und Quadrat" },
                { topic: "Einheiten: Länge, Masse", sublevel: "1.3.2.a", section: "Länge, Masse, Zeit, Volumen", note: "m, km, g, kg" }
            ]
        },
        {
            grade: 4,
            title: "Klasse 4",
            sorLevel: "L1",
            levelColor: "#4ade80",
            topics: [
                { topic: "Schriftliches Dividieren", sublevel: "1.1.1.b", section: "Schriftliches Rechnen", note: "Zahlen bis 1 Million" },
                { topic: "Brüche: Einführung", sublevel: "1.1.2.a", section: "Brüche addieren und kürzen", note: "Gleichnamige Brüche, Kürzen" },
                { topic: "Teilbarkeit und Primzahlen", sublevel: "1.1.5.a", section: "Primfaktorzerlegung", note: "Teilbarkeitsregeln" },
                { topic: "Körper und Volumen (Grundschule)", sublevel: "1.2.2.a", section: "Würfel, Quader, Zylinder", note: "Quader-Volumen" },
                { topic: "Einheiten umrechnen", sublevel: "1.3.2.b", section: "Einheiten umrechnen", note: "Länge, Gewicht, Zeit" }
            ]
        },
        {
            grade: 5,
            title: "Klasse 5",
            sorLevel: "L1",
            levelColor: "#4ade80",
            topics: [
                { topic: "Brüche (ungleichnamig)", sublevel: "1.1.2.a", section: "Brüche addieren und kürzen", note: "Erweitern, Hauptnenner" },
                { topic: "Dezimalzahlen", sublevel: "1.1.3.a", section: "Dezimalzahlen und Kommarechnung", note: "Kommarechnung, Stellenwerte" },
                { topic: "Runden und Schätzen", sublevel: "1.1.3.b", section: "Runden und Schätzen", note: "Überschlagsrechnung" },
                { topic: "Dreisatz (proportional)", sublevel: "1.3.1.a", section: "Proportionale Zuordnungen", note: "Einfacher Dreisatz" },
                { topic: "Diagramme lesen und erstellen", sublevel: "1.4.1.a", section: "Balken- und Kreisdiagramme", note: "Säulendiagramm, Tabellen" },
                { topic: "Mittelwert", sublevel: "1.4.1.b", section: "Mittelwert und Häufigkeit", note: "Arithmetisches Mittel" }
            ]
        },
        {
            grade: 6,
            title: "Klasse 6",
            sorLevel: "L1",
            levelColor: "#4ade80",
            topics: [
                { topic: "Negative Zahlen", sublevel: "1.1.4.a", section: "Rechnen mit negativen Zahlen", note: "Ganze Zahlen, Zahlenstrahl" },
                { topic: "Prozentrechnung Grundlagen", sublevel: "1.1.2.b", section: "Prozentwerte im Alltag", note: "Prozentwert, Prozentsatz, Grundwert" },
                { topic: "Brüche multiplizieren und dividieren", sublevel: "1.1.2.c", section: "Brüche multiplizieren und dividieren", note: "Kehrwert, gemischte Zahlen" },
                { topic: "Koordinatensystem", sublevel: "1.2.4.a", section: "Punkte, Abstände, Spiegelung", note: "Punkte eintragen und ablesen" },
                { topic: "ggT und kgV", sublevel: "1.1.5.b", section: "ggT und kgV", note: "Euklidischer Algorithmus (intuitiv)" },
                { topic: "Dreisatz (antiproportional)", sublevel: "1.3.1.b", section: "Antiproportionale Zuordnungen", note: "Indirekter Dreisatz" },
                { topic: "Einfache Wahrscheinlichkeit", sublevel: "1.4.2.a", section: "Einfache Zufallsexperimente", note: "Münze, Würfel, Laplace-Modell" }
            ]
        },
        {
            grade: 7,
            title: "Klasse 7",
            sorLevel: "L2",
            levelColor: "#facc15",
            topics: [
                { topic: "Terme und Variablen", sublevel: "2.1.1.a", section: "Lineare Gleichungen", note: "Termumformungen, Klammern" },
                { topic: "Lineare Gleichungen lösen", sublevel: "2.1.1.a", section: "Lineare Gleichungen", note: "Äquivalenzumformungen" },
                { topic: "Lineare Funktionen", sublevel: "2.2.2.a", section: "Geradengleichung und Steigung", note: "y = mx + b, Steigung" },
                { topic: "Zuordnungen und Graphen", sublevel: "2.2.2.a", section: "Geradengleichung und Steigung", note: "Graph, Wertetabelle" },
                { topic: "Winkel und Dreiecke", sublevel: "1.2.3.a", section: "Winkelarten und -maße", note: "Winkelarten, Winkelsumme" },
                { topic: "Kombinatorik: Permutationen", sublevel: "2.6.1.a", section: "Permutationen und Kombinationen", note: "n! Grundformel" }
            ]
        },
        {
            grade: 8,
            title: "Klasse 8",
            sorLevel: "L2",
            levelColor: "#facc15",
            topics: [
                { topic: "Lineare Gleichungssysteme", sublevel: "2.1.2.a", section: "Substitutions- und Additionsverfahren", note: "2×2-Systeme" },
                { topic: "Potenzen und Potenzgesetze", sublevel: "2.3.1.a", section: "Rechenregeln für Potenzen", note: "Produkt-, Quotientenregel" },
                { topic: "Satz des Pythagoras", sublevel: "2.5.3.a", section: "Anwendungen des Satzes des Pythagoras", note: "Rechtwinkliges Dreieck" },
                { topic: "Ähnlichkeit und Strahlensatz", sublevel: "2.5.1.a", section: "Strahlensatz-Aufgaben", note: "Maßstab, Proportionen" },
                { topic: "Wahrscheinlichkeit und Baumdiagramm", sublevel: "2.6.2.b", section: "Baumdiagramm", note: "Mehrstufige Zufallsversuche" },
                { topic: "Formeln umstellen", sublevel: "2.1.1.b", section: "Formeln umstellen", note: "Physikalische Grundformeln" }
            ]
        },
        {
            grade: 9,
            title: "Klasse 9",
            sorLevel: "L2",
            levelColor: "#facc15",
            topics: [
                { topic: "Quadratische Gleichungen", sublevel: "2.1.3.a", section: "Lösungsformel und Diskriminante", note: "p-q-Formel, Diskriminante" },
                { topic: "Faktorisierung", sublevel: "2.1.3.b", section: "Faktorisierung", note: "Binomische Formeln" },
                { topic: "Quadratische Funktionen (Parabel)", sublevel: "2.2.3.a", section: "Parabelscheitel und Nullstellen", note: "Scheitelpunkt, Normalform" },
                { topic: "Kreisgeometrie", sublevel: "2.5.2.a", section: "Umfang, Fläche, Kreisabschnitte", note: "Kreiszahl π, Bogen, Sektor" },
                { topic: "Trigonometrie: sin, cos, tan", sublevel: "2.4.1.a", section: "sin, cos, tan und Anwendungen", note: "Rechtwinkliges Dreieck" },
                { topic: "Statistik: Streumaße", sublevel: "1.4.1.b", section: "Mittelwert und Häufigkeit", note: "Median, Varianz (intuitiv)" }
            ]
        },
        {
            grade: 10,
            title: "Klasse 10",
            sorLevel: "L2",
            levelColor: "#facc15",
            topics: [
                { topic: "Negative und gebrochene Exponenten", sublevel: "2.3.1.b", section: "Negative und gebrochene Exponenten", note: "a^(-n), a^(1/n)" },
                { topic: "Wurzeln und Wurzelterme", sublevel: "2.3.2.a", section: "Quadrat- und Kubikwurzeln", note: "Vereinfachen, Rationalisieren" },
                { topic: "Logarithmen: Definition und Regeln", sublevel: "2.3.3.a", section: "Definition und Rechenregeln", note: "Produkt-, Potenz-, Basiswechsel" },
                { topic: "Exponentielles Wachstum und Zerfall", sublevel: "2.2.1.a", section: "Exponentielles Wachstum", note: "f(x) = a · b^x" },
                { topic: "Trigonometrie: Bogenmass", sublevel: "2.4.1.b", section: "Bogenmass und Winkelumrechnung", note: "rad ↔ Grad" },
                { topic: "Sinus- und Kosinussatz", sublevel: "2.4.2.a", section: "Allgemeines Dreieck", note: "Beliebige Dreiecke lösen" },
                { topic: "Lineare Ungleichungen", sublevel: "2.1.4.a", section: "Lineare Ungleichungen", note: "Lösungsmengen, Zahlenstrahl" }
            ]
        },
        {
            grade: 11,
            title: "Klasse 11",
            sorLevel: "L3",
            levelColor: "#f97316",
            topics: [
                { topic: "Ableitungsregeln (Ketten-, Produkt-, Quotientenregel)", sublevel: "3.1.1.a", section: "Ableitungsregeln", note: "Differenzierbarkeit, Grundregeln" },
                { topic: "Monotonie und Extremstellen", sublevel: "3.1.1.b", section: "Monotonie und Extremstellen", note: "Hinreichende Bedingung" },
                { topic: "Krümmung und Wendepunkte", sublevel: "3.1.1.c", section: "Krümmung und Wendepunkte", note: "f''(x), Vorzeichenwechsel" },
                { topic: "Kurvendiskussion", sublevel: "3.1.2.a", section: "Vollständige Kurvendiskussion", note: "D, Nullst., Ext., Wendepu." },
                { topic: "Folgen und Reihen", sublevel: "3.1.5.a", section: "Arithmetische und geometrische Folgen", note: "Rekursion, Explizite Formel" },
                { topic: "Bedingte Wahrscheinlichkeit", sublevel: "3.2.1.a", section: "Bedingte Wahrscheinlichkeit", note: "P(A|B) = P(A∩B) / P(B)" },
                { topic: "Binomialverteilung", sublevel: "3.2.2.a", section: "Binomialverteilung", note: "B(n; p), P(X=k)" }
            ]
        },
        {
            grade: 12,
            title: "Klasse 12",
            sorLevel: "L3",
            levelColor: "#f97316",
            topics: [
                { topic: "Stammfunktionen und unbestimmtes Integral", sublevel: "3.1.3.a", section: "Stammfunktionen und Grundregeln", note: "Umkehrung der Ableitung" },
                { topic: "Bestimmtes Integral und Flächeninhalt", sublevel: "3.1.3.b", section: "Bestimmtes Integral und Flächeninhalt", note: "Hauptsatz der Differential- und Integralrechnung" },
                { topic: "Substitutionsregel", sublevel: "3.1.3.c", section: "Substitutionsregel", note: "Verkettete Funktionen integrieren" },
                { topic: "Ableitung und Integration von e^x und ln(x)", sublevel: "3.1.4.a", section: "Ableitung und Integration von e^x und ln(x)", note: "Wachstums-/Zerfallsmodelle" },
                { topic: "Normalverteilung", sublevel: "3.2.2.c", section: "Normalverteilung", note: "Standardnormalverteilung, Tabelle" },
                { topic: "Erwartungswert und Varianz", sublevel: "3.2.2.b", section: "Erwartungswert und Varianz", note: "E(X), Var(X), σ" },
                { topic: "Vektoren: Operationen und Skalarprodukt", sublevel: "3.2.3.a", section: "Vektoroperationen und Skalarprodukt", note: "Kollinearität, Orthogonalität" },
                { topic: "Geraden und Ebenen im Raum", sublevel: "3.2.3.b", section: "Geraden und Ebenen im Raum", note: "Parameterform, Lagebeziehungen" },
                { topic: "Komplexe Zahlen: Kartesische Form", sublevel: "3.3.1.a", section: "Kartesische Form und Betrag", note: "i, Realteil, Imaginärteil" },
                { topic: "Matrizen: Grundoperationen", sublevel: "3.4.1.a", section: "Addition und Multiplikation", note: "Matrix-Vektor-Produkt" }
            ]
        }
    ],

    // Groups grades by L1/L2/L3 for the visual matrix UI
    levelGroups: [
        { code: "L1", title: "Grundlagen", grades: [1, 2, 3, 4, 5, 6], color: "#4ade80", bgColor: "rgba(74,222,128,0.08)" },
        { code: "L2", title: "Aufbauwissen", grades: [7, 8, 9, 10], color: "#facc15", bgColor: "rgba(250,204,21,0.08)" },
        { code: "L3", title: "Vertiefung", grades: [11, 12], color: "#f97316", bgColor: "rgba(249,115,22,0.08)" }
    ]
};
