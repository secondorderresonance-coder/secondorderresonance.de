/* SOR Curriculum Coverage Matrix
 * Maps German school curriculum (Klasse 1-12) to L1-L3 archive sections.
 * Each topic entry links to a specific archive sublevel/section ID.
 */
window.SOR_CURRICULUM = {
    meta: {
        scope: "Mathematik Klasse 1-12 (deutsches Schulsystem, allgemein)",
        levels: {
            "L1": "Grundlagen (Grundschule & Unterstufe)",
            "L2": "Aufbauwissen (Unter- & Mittelstufe)",
            "L3": "Vertiefung (Oberstufe / Schulabschlussniveau)"
        }
    },
    grades: [
        {
            klasse: 1,
            label: "Klasse 1",
            stufe: "Grundschule",
            archiveLevel: "1",
            levelCode: "L1",
            color: "#4ade80",
            topics: [
                {
                    title: "Zahlen bis 100",
                    desc: "Mengenvorstellung, Zahldarstellung, Zahlenstrahl, Ordnen und Vergleichen",
                    section: "1.1.1.a",
                    sectionTitle: "Kopfrechnen und Rechenstrategien"
                },
                {
                    title: "Addition und Subtraktion bis 20",
                    desc: "Kopfrechnen, Plusaufgaben, Minusaufgaben, Zahlzerlegungen",
                    section: "1.1.1.a",
                    sectionTitle: "Kopfrechnen und Rechenstrategien"
                },
                {
                    title: "Einfache Geometrie",
                    desc: "Quadrat, Dreieck, Kreis, Rechteck erkennen und benennen",
                    section: "1.2.1.a",
                    sectionTitle: "Rechteck, Dreieck, Kreis"
                },
                {
                    title: "Messen und Größen",
                    desc: "Längen schätzen und messen, Uhrzeiten ablesen",
                    section: "1.3.2.a",
                    sectionTitle: "Länge, Masse, Zeit, Volumen"
                }
            ]
        },
        {
            klasse: 2,
            label: "Klasse 2",
            stufe: "Grundschule",
            archiveLevel: "1",
            levelCode: "L1",
            color: "#4ade80",
            topics: [
                {
                    title: "Einmaleins (1×1 bis 10×10)",
                    desc: "Multiplikationstabellen, Einspluseins, schnelles Kopfrechnen",
                    section: "1.1.1.a",
                    sectionTitle: "Kopfrechnen und Rechenstrategien"
                },
                {
                    title: "Schriftliche Addition und Subtraktion",
                    desc: "Stellenwerte, Übertrag, ziffernweises Rechnen bis 1000",
                    section: "1.1.1.b",
                    sectionTitle: "Schriftliches Rechnen"
                },
                {
                    title: "Division als Umkehrung der Multiplikation",
                    desc: "Teilen, Einmaleins rückwärts, Rest bei der Division",
                    section: "1.1.1.a",
                    sectionTitle: "Kopfrechnen und Rechenstrategien"
                },
                {
                    title: "Geometrie: Figuren und Muster",
                    desc: "Symmetrische Muster, Figuren legen und zeichnen",
                    section: "1.2.1.a",
                    sectionTitle: "Rechteck, Dreieck, Kreis"
                },
                {
                    title: "Längen, Gewichte, Zeit",
                    desc: "Meter, Zentimeter, Kilogramm, Gramm, Stunden und Minuten",
                    section: "1.3.2.a",
                    sectionTitle: "Länge, Masse, Zeit, Volumen"
                }
            ]
        },
        {
            klasse: 3,
            label: "Klasse 3",
            stufe: "Grundschule",
            archiveLevel: "1",
            levelCode: "L1",
            color: "#4ade80",
            topics: [
                {
                    title: "Zahlen bis 1000",
                    desc: "Dreistellige Zahlen, Stellenwerte, Zahlenstrahl, Ordnen",
                    section: "1.1.1",
                    sectionTitle: "Grundrechenarten"
                },
                {
                    title: "Schriftliche Multiplikation",
                    desc: "Mehrstellige Faktoren, schriftliches Verfahren",
                    section: "1.1.1.b",
                    sectionTitle: "Schriftliches Rechnen"
                },
                {
                    title: "Schriftliche Division",
                    desc: "Division mit Rest, schriftliches Divisionsverfahren",
                    section: "1.1.1.b",
                    sectionTitle: "Schriftliches Rechnen"
                },
                {
                    title: "Brüche – erste Begegnung",
                    desc: "Hälfte, Viertel, Achtel als Anteile und Diagramme",
                    section: "1.1.2",
                    sectionTitle: "Bruch- und Prozentrechnung"
                },
                {
                    title: "Flächeninhalt und Umfang",
                    desc: "Flächen ausmessen, Formel für Rechteck und Quadrat",
                    section: "1.2.1.a",
                    sectionTitle: "Rechteck, Dreieck, Kreis"
                }
            ]
        },
        {
            klasse: 4,
            label: "Klasse 4",
            stufe: "Grundschule",
            archiveLevel: "1",
            levelCode: "L1",
            color: "#4ade80",
            topics: [
                {
                    title: "Zahlen bis 1 000 000",
                    desc: "Große Zahlen lesen, schreiben, ordnen und vergleichen",
                    section: "1.1.1",
                    sectionTitle: "Grundrechenarten"
                },
                {
                    title: "Schriftliche Rechenverfahren (alle vier)",
                    desc: "Addition, Subtraktion, Multiplikation und Division schriftlich",
                    section: "1.1.1.b",
                    sectionTitle: "Schriftliches Rechnen"
                },
                {
                    title: "Brüche (Grundlagen)",
                    desc: "Brüche vergleichen, kürzen, gleichnamig machen",
                    section: "1.1.2.a",
                    sectionTitle: "Brüche addieren und kürzen"
                },
                {
                    title: "Einheiten und Größen umrechnen",
                    desc: "Länge, Masse, Volumen, Zeit: Einheiten wechseln",
                    section: "1.3.2.b",
                    sectionTitle: "Einheiten umrechnen"
                },
                {
                    title: "Geometrie: Körper",
                    desc: "Würfel, Quader, Pyramide, Zylinder erkennen und beschreiben",
                    section: "1.2.2.a",
                    sectionTitle: "Würfel, Quader, Zylinder"
                }
            ]
        },
        {
            klasse: 5,
            label: "Klasse 5",
            stufe: "Übergang (Grundschule → Unterstufe)",
            archiveLevel: "1",
            levelCode: "L1",
            color: "#86efac",
            topics: [
                {
                    title: "Natürliche Zahlen und Teilbarkeit",
                    desc: "Teilbarkeitsregeln, ggT, kgV, Primzahlen",
                    section: "1.1.5.a",
                    sectionTitle: "Primfaktorzerlegung"
                },
                {
                    title: "Brüche und Dezimalzahlen",
                    desc: "Brüche addieren und subtrahieren, Dezimalbrüche umrechnen",
                    section: "1.1.2.a",
                    sectionTitle: "Brüche addieren und kürzen"
                },
                {
                    title: "Proportionalität und Dreisatz",
                    desc: "Proportionale Zuordnungen, einfacher Dreisatz",
                    section: "1.3.1.a",
                    sectionTitle: "Proportionale Zuordnungen"
                },
                {
                    title: "Figuren und Körper",
                    desc: "Flächen, Umfang, Volumen von Grundfiguren, Netze",
                    section: "1.2.1",
                    sectionTitle: "Flächen und Umfang"
                },
                {
                    title: "Statistik: Diagramme lesen und erstellen",
                    desc: "Balken-, Kreis-, Liniendiagramme interpretieren",
                    section: "1.4.1.a",
                    sectionTitle: "Balken- und Kreisdiagramme"
                }
            ]
        },
        {
            klasse: 6,
            label: "Klasse 6",
            stufe: "Unterstufe",
            archiveLevel: "1",
            levelCode: "L1",
            color: "#facc15",
            topics: [
                {
                    title: "Bruchrechnung (vollständig)",
                    desc: "Alle vier Grundoperationen mit Brüchen und gemischten Zahlen",
                    section: "1.1.2.c",
                    sectionTitle: "Brüche multiplizieren und dividieren"
                },
                {
                    title: "Dezimalzahlen und Kommarechnung",
                    desc: "Dezimalbrüche, Kommarechnung, Runden und Schätzen",
                    section: "1.1.3.a",
                    sectionTitle: "Dezimalzahlen und Kommarechnung"
                },
                {
                    title: "Prozentrechnung (Grundlagen)",
                    desc: "Prozentwert, Grundwert, Prozentsatz berechnen",
                    section: "1.1.2.b",
                    sectionTitle: "Prozentwerte im Alltag"
                },
                {
                    title: "Negative Zahlen",
                    desc: "Ganzzahlige Arithmetik, Zahlenstrahl, Vorzeichen, Rechenregeln",
                    section: "1.1.4.a",
                    sectionTitle: "Rechnen mit negativen Zahlen"
                },
                {
                    title: "Koordinatensystem",
                    desc: "Punkte einzeichnen, Abstände messen, einfache Spiegelung",
                    section: "1.2.4.a",
                    sectionTitle: "Punkte, Abstände, Spiegelung"
                }
            ]
        },
        {
            klasse: 7,
            label: "Klasse 7",
            stufe: "Mittelstufe",
            archiveLevel: "2",
            levelCode: "L2",
            color: "#fb923c",
            topics: [
                {
                    title: "Terme und Variablen",
                    desc: "Terme aufstellen, vereinfachen, auswerten, äquivalente Umformungen",
                    section: "2.1",
                    sectionTitle: "Terme und Gleichungen"
                },
                {
                    title: "Lineare Gleichungen",
                    desc: "Gleichungen lösen durch Umformen, Textaufgaben formulieren",
                    section: "2.1.1.a",
                    sectionTitle: "Lineare Gleichungen"
                },
                {
                    title: "Proportionale und antiproportionale Zuordnungen",
                    desc: "Dreisatz, Verhältnisse, antiproportionale Zusammenhänge",
                    section: "1.3.1.b",
                    sectionTitle: "Antiproportionale Zuordnungen"
                },
                {
                    title: "Prozentrechnung (vertieft)",
                    desc: "Rabatt, Zinsen, Steuern, Promille, Prozentwachstum",
                    section: "1.1.2.b",
                    sectionTitle: "Prozentwerte im Alltag"
                },
                {
                    title: "Geometrie: Ähnlichkeit und Strahlensätze",
                    desc: "Strahlensatz, ähnliche Figuren, Maßstab und Verhältnisse",
                    section: "2.5.1.a",
                    sectionTitle: "Strahlensatz-Aufgaben"
                }
            ]
        },
        {
            klasse: 8,
            label: "Klasse 8",
            stufe: "Mittelstufe",
            archiveLevel: "2",
            levelCode: "L2",
            color: "#fb923c",
            topics: [
                {
                    title: "Lineare Funktionen",
                    desc: "Geradengleichung y = mx + b, Steigung, y-Achsenabschnitt, Nullstelle",
                    section: "2.2.2.a",
                    sectionTitle: "Geradengleichung und Steigung"
                },
                {
                    title: "Lineare Gleichungssysteme",
                    desc: "Grafisch, Additions- und Substitutionsverfahren, Anwendungen",
                    section: "2.1.2.a",
                    sectionTitle: "Substitutions- und Additionsverfahren"
                },
                {
                    title: "Quadratische Gleichungen (Einführung)",
                    desc: "pq-Formel, Diskriminante, Lösbarkeit, Faktorisierung",
                    section: "2.1.3.a",
                    sectionTitle: "Lösungsformel und Diskriminante"
                },
                {
                    title: "Potenzen",
                    desc: "Potenzgesetze, negative und gebrochene Exponenten, Standardform",
                    section: "2.3.1.a",
                    sectionTitle: "Rechenregeln für Potenzen"
                },
                {
                    title: "Wahrscheinlichkeit: Grundlagen",
                    desc: "Laplace-Experiment, mehrstufige Zufallsversuche, Baumdiagramm",
                    section: "2.6.2.a",
                    sectionTitle: "Laplace-Experiment"
                }
            ]
        },
        {
            klasse: 9,
            label: "Klasse 9",
            stufe: "Mittelstufe",
            archiveLevel: "2",
            levelCode: "L2",
            color: "#fb923c",
            topics: [
                {
                    title: "Quadratische Funktionen",
                    desc: "Parabel, Scheitelpunkt, Nullstellen, Verschiebung und Streckung",
                    section: "2.2.3.a",
                    sectionTitle: "Parabelscheitel und Nullstellen"
                },
                {
                    title: "Satz des Pythagoras",
                    desc: "Anwendungen, Umkehrsatz, Raumdiagonalen",
                    section: "2.5.3.a",
                    sectionTitle: "Anwendungen des Satzes des Pythagoras"
                },
                {
                    title: "Trigonometrie (sin, cos, tan)",
                    desc: "Rechtwinkliges Dreieck, Winkelfunktionen, Berechnungen",
                    section: "2.4.1.a",
                    sectionTitle: "sin, cos, tan und Anwendungen"
                },
                {
                    title: "Kreisgeometrie",
                    desc: "Umfang, Fläche, Kreisabschnitte, Sehnen und Tangenten",
                    section: "2.5.2.a",
                    sectionTitle: "Umfang, Fläche, Kreisabschnitte"
                },
                {
                    title: "Kombinatorik (Grundlagen)",
                    desc: "Permutationen, Kombinationen ohne Zurücklegen, Grundprinzip",
                    section: "2.6.1.a",
                    sectionTitle: "Permutationen und Kombinationen"
                }
            ]
        },
        {
            klasse: 10,
            label: "Klasse 10",
            stufe: "Übergang zur Oberstufe",
            archiveLevel: "2",
            levelCode: "L2",
            color: "#c084fc",
            topics: [
                {
                    title: "Logarithmen",
                    desc: "Definition, Rechenregeln, logarithmische Gleichungen lösen",
                    section: "2.3.3.a",
                    sectionTitle: "Definition und Rechenregeln"
                },
                {
                    title: "Exponentialfunktionen",
                    desc: "Exponentielles Wachstum und Zerfall, Halbwertszeit, Modellierung",
                    section: "2.2.1.a",
                    sectionTitle: "Exponentielles Wachstum"
                },
                {
                    title: "Stochastik: Kombinatorik vertieft",
                    desc: "Binomialkoeffizient, Pfadregeln, Laplace-Formel mit Kombinatorik",
                    section: "2.6.1.b",
                    sectionTitle: "Binomialkoeffizient"
                },
                {
                    title: "Trigonometrie: Sinus- und Kosinussatz",
                    desc: "Allgemeines Dreieck, Fläche und Seiten berechnen",
                    section: "2.4.2.a",
                    sectionTitle: "Allgemeines Dreieck"
                },
                {
                    title: "Statistik: Lagemaße und Streuung",
                    desc: "Mittelwert, Median, Modus, Streuungsmaße, Boxplot",
                    section: "1.4.1.b",
                    sectionTitle: "Mittelwert und Häufigkeit"
                }
            ]
        },
        {
            klasse: 11,
            label: "Klasse 11",
            stufe: "Oberstufe",
            archiveLevel: "3",
            levelCode: "L3",
            color: "#818cf8",
            topics: [
                {
                    title: "Differentialrechnung",
                    desc: "Ableitungsbegriff, Ketten-, Produkt- und Quotientenregel",
                    section: "3.1.1.a",
                    sectionTitle: "Ableitungsregeln (Ketten-, Produkt-, Quotientenregel)"
                },
                {
                    title: "Kurvendiskussion",
                    desc: "Monotonie, Extremstellen, Wendepunkte, vollständige Analyse",
                    section: "3.1.2.a",
                    sectionTitle: "Vollständige Kurvendiskussion"
                },
                {
                    title: "Ableitungen von e^x und ln(x)",
                    desc: "Exponential- und Logarithmusfunktion ableiten und integrieren",
                    section: "3.1.4.a",
                    sectionTitle: "Ableitung und Integration von e^x und ln(x)"
                },
                {
                    title: "Trigonometrische Funktionen",
                    desc: "Einheitskreis, Periodizität, Amplituden, Verschiebungen",
                    section: "2.4.3.a",
                    sectionTitle: "Sinusfunktion und Kosinusfunktion"
                },
                {
                    title: "Vektoren (Einführung)",
                    desc: "Vektoroperationen, Skalarprodukt, Winkel zwischen Vektoren",
                    section: "3.2.3.a",
                    sectionTitle: "Vektoroperationen und Skalarprodukt"
                }
            ]
        },
        {
            klasse: 12,
            label: "Klasse 12 / Abitur",
            stufe: "Oberstufe (Abitur)",
            archiveLevel: "3",
            levelCode: "L3",
            color: "#818cf8",
            topics: [
                {
                    title: "Integralrechnung",
                    desc: "Stammfunktionen, bestimmtes Integral, Flächeninhalte, Substitutionsregel",
                    section: "3.1.3.a",
                    sectionTitle: "Stammfunktionen und Grundregeln"
                },
                {
                    title: "Wahrscheinlichkeit: Binomialverteilung",
                    desc: "Bernoulli-Kette, Erwartungswert, Varianz, Konfidenzintervall",
                    section: "3.2.2.a",
                    sectionTitle: "Binomialverteilung"
                },
                {
                    title: "Normalverteilung",
                    desc: "σ-Regeln, Standardnormalverteilung, Tabellen, Anwendungen",
                    section: "3.2.2.c",
                    sectionTitle: "Normalverteilung"
                },
                {
                    title: "Vektoren und Geometrie im Raum",
                    desc: "Geraden, Ebenen, Schnittmengen, Abstands- und Winkelberechnungen",
                    section: "3.2.3.b",
                    sectionTitle: "Geraden und Ebenen im Raum"
                },
                {
                    title: "Folgen und Reihen",
                    desc: "Arithmetische und geometrische Folgen, Grenzwerte, Summenformeln",
                    section: "3.1.5.a",
                    sectionTitle: "Arithmetische und geometrische Folgen"
                }
            ]
        }
    ]
};
