function buildTaskArchive(baseTasks, targetPerLevel) {
    const byLevel = {};
    baseTasks.forEach(task => {
        if (!byLevel[task.level]) byLevel[task.level] = [];
        byLevel[task.level].push(task);
    });

    const expanded = [];
    Object.keys(byLevel).sort((a, b) => Number(a) - Number(b)).forEach(level => {
        const levelBase = byLevel[level];
        if (!levelBase || levelBase.length === 0) return;

        for (let idx = 0; idx < targetPerLevel; idx += 1) {
            const seed = levelBase[idx % levelBase.length];
            const variant = Math.floor(idx / levelBase.length) + 1;
            const serial = String(idx + 1).padStart(3, "0");

            expanded.push({
                ...seed,
                id: `T-${level}-${serial}`,
                title: `${seed.title} (Variante ${variant})`,
                question: `${seed.question} [Serie ${variant}]`,
                explanation: `${seed.explanation} Diese Aufgabe ist Teil der skalierbaren Serie ${variant} für Level ${level}.`
            });
        }
    });

    return expanded;
}
window.SOR_ARCHIVE = {
    targetPerLevel: 5000,
    targetTotal: 30000,
    taxonomy: [
        {
            level: "1",
            code: "L1",
            title: "Grundlagen",
            description: "Grundschule und Unterstufe",
            sublevels: [
                { id: "1.1", title: "Zahlen und Rechenregeln" },
                { id: "1.1.1", title: "Grundrechenarten" },
                { id: "1.1.2", title: "Bruch- und Prozentrechnung" },
                { id: "1.1.2.a", title: "Brueche addieren und kuerzen" },
                { id: "1.1.2.b", title: "Prozentwerte im Alltag" },
                { id: "1.2", title: "Muster, Geometrie, Alltag" }
            ]
        },
        {
            level: "2",
            code: "L2",
            title: "Aufbauwissen",
            description: "Unter- und Mittelstufe",
            sublevels: [
                { id: "2.1", title: "Terme und Gleichungen" },
                { id: "2.1.1", title: "Gleichungen lösen und umstellen" },
                { id: "2.1.1.a", title: "Lineare Gleichungen" },
                { id: "2.1.1.b", title: "Formeln umstellen" },
                { id: "2.2", title: "Funktionen und Graphen" },
                { id: "2.2.1", title: "Exponentielles Verhalten" },
                { id: "2.2.1.a", title: "Exponentielles Wachstum" },
                { id: "2.2.1.b", title: "Exponentieller Zerfall" }
            ]
        },
        {
            level: "3",
            code: "L3",
            title: "Vertiefung",
            description: "Oberstufe und Schulabschlussniveau",
            sublevels: [
                { id: "3.1", title: "Analysis" },
                { id: "3.1.1", title: "Ableitung und Kurvendiskussion" },
                { id: "3.1.1.a", title: "Ableitungsregeln" },
                { id: "3.1.1.b", title: "Monotonie und Extremstellen" },
                { id: "3.2", title: "Stochastik und Vektoren" }
            ]
        },
        {
            level: "4",
            code: "L4",
            title: "Universitätsgrundlagen",
            description: "Studienanfang",
            sublevels: [
                { id: "4.1", title: "Lineare Algebra" },
                { id: "4.1.1", title: "Matrizen und Determinanten" },
                { id: "4.1.1.a", title: "Matrixrechnung" },
                { id: "4.1.1.b", title: "Determinanten und Eigenwerte" },
                { id: "4.2", title: "Analysis I und DGL" }
            ]
        },
        {
            level: "5",
            code: "L5",
            title: "Angewandte Mathematik",
            description: "Fortgeschrittenes Studium",
            sublevels: [
                { id: "5.1", title: "Signale und Transformationen" },
                { id: "5.1.1", title: "Fourier und Laplace" },
                { id: "5.1.1.a", title: "Fourier im Frequenzraum" },
                { id: "5.1.1.b", title: "Laplace und Systemantwort" },
                { id: "5.2", title: "Systeme und Regelung" }
            ]
        },
        {
            level: "6",
            code: "L6",
            title: "Forschung und Simulation",
            description: "Wissenschaft und Spezialisierung",
            sublevels: [
                { id: "6.1", title: "Numerische Simulation" },
                { id: "6.1.1", title: "FEM und PDE" },
                { id: "6.1.1.a", title: "Partielle Differentialgleichungen" },
                { id: "6.1.1.b", title: "Finite-Elemente-Methoden" },
                { id: "6.2", title: "Stochastik und Optimierung" }
            ]
        }
    ],
    tasks: buildTaskArchive([
        {
            id: "T-1-001",
            title: "Bruchaddition mit Hauptnenner",
            level: "1",
            sublevel: "1.1.2.a",
            topic: "Bruchrechnung",
            tags: ["bruch", "grundlagen"],
            difficulty: "leicht",
            question: "Berechne 2/3 + 1/6.",
            answer: "5/6",
            explanation: "Hauptnenner 6: 2/3 = 4/6, dann 4/6 + 1/6 = 5/6.",
            type: "kurzantwort",
            estimatedTime: 2
        },
        {
            id: "T-1-002",
            title: "Prozentwert bestimmen",
            level: "1",
            sublevel: "1.1.2.b",
            topic: "Prozentrechnung",
            tags: ["prozent", "alltag"],
            difficulty: "leicht",
            question: "Wie viel sind 15% von 200?",
            answer: "30",
            explanation: "200 * 0,15 = 30.",
            type: "kurzantwort",
            estimatedTime: 2
        },
        {
            id: "T-1-003",
            title: "Umfang Rechteck",
            level: "1",
            sublevel: "1.2",
            topic: "Geometrie",
            tags: ["rechteck", "umfang"],
            difficulty: "leicht",
            question: "Ein Rechteck hat Länge 7 cm und Breite 4 cm. Bestimme den Umfang.",
            answer: "22 cm",
            explanation: "U = 2 * (7 + 4) = 22 cm.",
            type: "kurzantwort",
            estimatedTime: 2
        },
        {
            id: "T-1-004",
            title: "Dreisatz im Einkauf",
            level: "1",
            sublevel: "1.2",
            topic: "Dreisatz",
            tags: ["dreisatz", "alltag"],
            difficulty: "leicht",
            question: "3 Hefte kosten 6 Euro. Wie viel kosten 8 Hefte?",
            answer: "16 Euro",
            explanation: "Ein Heft kostet 2 Euro, also 8 * 2 = 16 Euro.",
            type: "kurzantwort",
            estimatedTime: 3
        },
        {
            id: "T-1-005",
            title: "Punkt-vor-Strich",
            level: "1",
            sublevel: "1.1.1",
            topic: "Grundrechenarten",
            tags: ["reihenfolge", "regeln"],
            difficulty: "leicht",
            question: "Berechne 4 + 3 * 5.",
            answer: "19",
            explanation: "Zuerst Multiplikation: 3 * 5 = 15, dann 4 + 15 = 19.",
            type: "kurzantwort",
            estimatedTime: 1
        },
        {
            id: "T-1-006",
            title: "Anteil als Bruch",
            level: "1",
            sublevel: "1.1.2.a",
            topic: "Bruchrechnung",
            tags: ["bruch", "darstellung"],
            difficulty: "leicht",
            question: "Schreibe 0,75 als vollständig gekürzten Bruch.",
            answer: "3/4",
            explanation: "0,75 = 75/100 = 3/4.",
            type: "kurzantwort",
            estimatedTime: 2
        },

        {
            id: "T-2-001",
            title: "Lineare Gleichung lösen",
            level: "2",
            sublevel: "2.1.1.a",
            topic: "Gleichungen lösen und umstellen",
            tags: ["gleichung", "termumformung"],
            difficulty: "mittel",
            question: "Löse 3x - 7 = 11.",
            answer: "x = 6",
            explanation: "+7 auf beiden Seiten ergibt 3x = 18, dann durch 3 teilen.",
            type: "kurzantwort",
            estimatedTime: 2
        },
        {
            id: "T-2-002",
            title: "Formel nach Variable umstellen",
            level: "2",
            sublevel: "2.1.1.b",
            topic: "Gleichungen lösen und umstellen",
            tags: ["formelumstellung"],
            difficulty: "mittel",
            question: "Stelle A = b * h / 2 nach h um.",
            answer: "h = 2A / b",
            explanation: "Mit 2 multiplizieren und danach durch b teilen.",
            type: "kurzantwort",
            estimatedTime: 3
        },
        {
            id: "T-2-003",
            title: "Exponentielles Wachstum erkennen",
            level: "2",
            sublevel: "2.2.1.a",
            topic: "Exponentielles Verhalten",
            tags: ["exponential", "wachstum"],
            difficulty: "mittel",
            question: "Ein Wert verdoppelt sich pro Schritt. Start 5. Wie lautet der Term?",
            answer: "f(n) = 5 * 2^n",
            explanation: "Konstante Multiplikation pro Schritt ist exponentiell.",
            type: "kurzantwort",
            estimatedTime: 3
        },
        {
            id: "T-2-004",
            title: "Halbwertszeitmodell",
            level: "2",
            sublevel: "2.2.1.b",
            topic: "Exponentielles Verhalten",
            tags: ["zerfall", "halbwertszeit"],
            difficulty: "mittel",
            question: "Startwert 80, jede Stunde Halbierung. Wie groß ist der Wert nach 3 Stunden?",
            answer: "10",
            explanation: "80 * (1/2)^3 = 80/8 = 10.",
            type: "kurzantwort",
            estimatedTime: 3
        },
        {
            id: "T-2-005",
            title: "Steigung aus zwei Punkten",
            level: "2",
            sublevel: "2.2",
            topic: "Funktionen",
            tags: ["steigung", "lineare-funktion"],
            difficulty: "mittel",
            question: "Bestimme die Steigung durch A(1,2) und B(5,10).",
            answer: "2",
            explanation: "m = (10-2)/(5-1) = 8/4 = 2.",
            type: "kurzantwort",
            estimatedTime: 3
        },
        {
            id: "T-2-006",
            title: "Funktionswert berechnen",
            level: "2",
            sublevel: "2.2",
            topic: "Funktionen",
            tags: ["einsetzen"],
            difficulty: "mittel",
            question: "Berechne f(4) für f(x)=2x-3.",
            answer: "5",
            explanation: "2 * 4 - 3 = 8 - 3 = 5.",
            type: "kurzantwort",
            estimatedTime: 2
        },

        {
            id: "T-3-001",
            title: "Ableitung Potenzfunktion",
            level: "3",
            sublevel: "3.1.1.a",
            topic: "Analysis",
            tags: ["ableitung", "potenzregel"],
            difficulty: "mittel",
            question: "Leite f(x)=x^4 - 3x ab.",
            answer: "f'(x)=4x^3-3",
            explanation: "Potenzregel: (x^4)'=4x^3 und (-3x)'=-3.",
            type: "kurzantwort",
            estimatedTime: 3
        },
        {
            id: "T-3-002",
            title: "Nullstelle quadratisch",
            level: "3",
            sublevel: "3.1",
            topic: "Analysis",
            tags: ["quadratisch", "nullstelle"],
            difficulty: "mittel",
            question: "Löse x^2 - 9 = 0.",
            answer: "x = -3 oder x = 3",
            explanation: "x^2=9, also zwei Lösungen.",
            type: "kurzantwort",
            estimatedTime: 2
        },
        {
            id: "T-3-003",
            title: "Integral berechnen",
            level: "3",
            sublevel: "3.1",
            topic: "Analysis",
            tags: ["integral"],
            difficulty: "mittel",
            question: "Berechne \u222b 2x dx.",
            answer: "x^2 + C",
            explanation: "Stammfunktion von 2x ist x^2, plus Integrationskonstante.",
            type: "kurzantwort",
            estimatedTime: 2
        },
        {
            id: "T-3-004",
            title: "Bedingte Wahrscheinlichkeit",
            level: "3",
            sublevel: "3.2",
            topic: "Stochastik",
            tags: ["wahrscheinlichkeit", "bedingt"],
            difficulty: "mittel",
            question: "P(A)=0,5 und P(B und A)=0,2. Bestimme P(B|A).",
            answer: "0,4",
            explanation: "P(B|A)=P(B und A)/P(A)=0,2/0,5=0,4.",
            type: "kurzantwort",
            estimatedTime: 3
        },
        {
            id: "T-3-005",
            title: "Skalarprodukt",
            level: "3",
            sublevel: "3.2",
            topic: "Vektoren",
            tags: ["vektor", "skalarprodukt"],
            difficulty: "mittel",
            question: "Berechne (1,2,3) * (2,0,1).",
            answer: "5",
            explanation: "1*2 + 2*0 + 3*1 = 2 + 0 + 3 = 5.",
            type: "kurzantwort",
            estimatedTime: 2
        },
        {
            id: "T-3-006",
            title: "Monotonie pruefen",
            level: "3",
            sublevel: "3.1.1.b",
            topic: "Kurvendiskussion",
            tags: ["ableitung", "monotonie"],
            difficulty: "schwer",
            question: "Ist f(x)=x^3 streng monoton steigend?",
            answer: "Ja, für alle x",
            explanation: "f'(x)=3x^2 ist nie negativ, daher steigt f global.",
            type: "konzeptfrage",
            estimatedTime: 3
        },

        {
            id: "T-4-001",
            title: "Determinante 2x2",
            level: "4",
            sublevel: "4.1.1.b",
            topic: "Lineare Algebra",
            tags: ["determinante", "matrix"],
            difficulty: "mittel",
            question: "Bestimme det([[3,1],[2,5]]).",
            answer: "13",
            explanation: "ad-bc = 3*5 - 1*2 = 15 - 2 = 13.",
            type: "kurzantwort",
            estimatedTime: 2
        },
        {
            id: "T-4-002",
            title: "Lineares Gleichungssystem",
            level: "4",
            sublevel: "4.1",
            topic: "Lineare Algebra",
            tags: ["lgs"],
            difficulty: "schwer",
            question: "Löse x+y=5 und x-y=1.",
            answer: "x=3, y=2",
            explanation: "Addieren liefert 2x=6 -> x=3, dann y=2.",
            type: "kurzantwort",
            estimatedTime: 3
        },
        {
            id: "T-4-003",
            title: "Eigenwert Grundidee",
            level: "4",
            sublevel: "4.1",
            topic: "Lineare Algebra",
            tags: ["eigenwert", "konzept"],
            difficulty: "schwer",
            question: "Was bedeutet A v = lambda v anschaulich?",
            answer: "v behält Richtung, nur die Länge skaliert mit lambda",
            explanation: "Eigenvektoren werden durch A nur gestreckt oder gespiegelt.",
            type: "konzeptfrage",
            estimatedTime: 4
        },
        {
            id: "T-4-004",
            title: "Einfache DGL",
            level: "4",
            sublevel: "4.2",
            topic: "Differentialgleichungen",
            tags: ["dgl", "trennung"],
            difficulty: "schwer",
            question: "Löse y' = 3y mit y(0)=2.",
            answer: "y(t)=2e^(3t)",
            explanation: "Standardform y'=ky -> y=Ae^(kt), Anfangsbedingung bestimmt A=2.",
            type: "kurzantwort",
            estimatedTime: 4
        },
        {
            id: "T-4-005",
            title: "Grenzwertfolge",
            level: "4",
            sublevel: "4.2",
            topic: "Analysis I",
            tags: ["grenzwert"],
            difficulty: "mittel",
            question: "Bestimme lim(n->inf) (1+1/n)^n.",
            answer: "e",
            explanation: "Bekannter Standardgrenzwert zur Definition der Eulerschen Zahl.",
            type: "kurzantwort",
            estimatedTime: 3
        },
        {
            id: "T-4-006",
            title: "Matrixmultiplikation",
            level: "4",
            sublevel: "4.1.1.a",
            topic: "Matrizen",
            tags: ["matrix", "produkt"],
            difficulty: "mittel",
            question: "Berechne [[1,2],[0,1]] * [[3],[4]].",
            answer: "[[11],[4]]",
            explanation: "Erste Zeile: 1*3+2*4=11, zweite Zeile: 0*3+1*4=4.",
            type: "kurzantwort",
            estimatedTime: 3
        },

        {
            id: "T-5-001",
            title: "Fourier-Idee",
            level: "5",
            sublevel: "5.1.1.a",
            topic: "Fourier",
            tags: ["frequenzen", "signal"],
            difficulty: "schwer",
            question: "Was liefert die Fourier-Transformation eines Zeitsignals?",
            answer: "Die Frequenzanteile mit Amplitude und Phase",
            explanation: "Sie wechselt von Zeit- in Frequenzdarstellung.",
            type: "konzeptfrage",
            estimatedTime: 4
        },
        {
            id: "T-5-002",
            title: "Laplace von Konstante",
            level: "5",
            sublevel: "5.1.1.b",
            topic: "Laplace",
            tags: ["laplace", "standard"],
            difficulty: "mittel",
            question: "Bestimme L{1}.",
            answer: "1/s",
            explanation: "Standardtransformation für t >= 0.",
            type: "kurzantwort",
            estimatedTime: 2
        },
        {
            id: "T-5-003",
            title: "Resonanzbedingung",
            level: "5",
            sublevel: "5.2",
            topic: "Resonanz",
            tags: ["resonanz", "schwingung"],
            difficulty: "schwer",
            question: "Wann wird die Antwort eines linearen Schwingers maximal?",
            answer: "Wenn Anregungsfrequenz nahe der Eigenfrequenz liegt",
            explanation: "Dann tritt Resonanz auf; Dämpfung begrenzt die Amplitude.",
            type: "konzeptfrage",
            estimatedTime: 4
        },
        {
            id: "T-5-004",
            title: "PT1-Glied",
            level: "5",
            sublevel: "5.2",
            topic: "Regelungstechnik",
            tags: ["pt1", "übertragungsfunktion"],
            difficulty: "schwer",
            question: "Wie lautet die Übertragungsfunktion eines PT1-Glieds?",
            answer: "G(s)=K/(1+Ts)",
            explanation: "K ist Verstärkung, T Zeitkonstante.",
            type: "kurzantwort",
            estimatedTime: 3
        },
        {
            id: "T-5-005",
            title: "Faltungskonzept",
            level: "5",
            sublevel: "5.1.1.b",
            topic: "Signale",
            tags: ["faltung", "systeme"],
            difficulty: "schwer",
            question: "Was berechnet die Faltung x*h in LTI-Systemen?",
            answer: "Die Systemantwort auf das Eingangssignal",
            explanation: "Aus Eingang und Impulsantwort folgt das Ausgangssignal.",
            type: "konzeptfrage",
            estimatedTime: 4
        },
        {
            id: "T-5-006",
            title: "Bode-Plot Grundidee",
            level: "5",
            sublevel: "5.2",
            topic: "Regelungstechnik",
            tags: ["bode", "frequenzgang"],
            difficulty: "schwer",
            question: "Welche zwei Kurven zeigt ein Bode-Diagramm?",
            answer: "Betragsgang und Phasengang",
            explanation: "Beide über der logarithmischen Frequenzachse.",
            type: "kurzantwort",
            estimatedTime: 3
        },

        {
            id: "T-6-001",
            title: "PDE-Klassifikation",
            level: "6",
            sublevel: "6.1.1.a",
            topic: "Partielle DGL",
            tags: ["pde", "klassifikation"],
            difficulty: "schwer",
            question: "Zu welcher Klasse gehört die Wärmeleitungsgleichung?",
            answer: "Parabolisch",
            explanation: "Wärmeleitung besitzt diffusionsartiges Verhalten.",
            type: "kurzantwort",
            estimatedTime: 4
        },
        {
            id: "T-6-002",
            title: "Wiener-Prozess",
            level: "6",
            sublevel: "6.2",
            topic: "Stochastik",
            tags: ["wiener", "zufallsprozess"],
            difficulty: "schwer",
            question: "Nenne eine Kerneigenschaft des Wiener-Prozesses.",
            answer: "Unabhängige normalverteilte Inkremente",
            explanation: "Inkremente über disjunkte Intervalle sind unabhängig.",
            type: "konzeptfrage",
            estimatedTime: 4
        },
        {
            id: "T-6-003",
            title: "RK4 Ordnung",
            level: "6",
            sublevel: "6.1",
            topic: "Numerik",
            tags: ["runge-kutta", "ordnung"],
            difficulty: "schwer",
            question: "Welche globale Fehlerordnung hat das klassische RK4-Verfahren?",
            answer: "Ordnung 4",
            explanation: "Globaler Fehler O(h^4), lokaler Fehler O(h^5).",
            type: "kurzantwort",
            estimatedTime: 3
        },
        {
            id: "T-6-004",
            title: "FEM-Prinzip",
            level: "6",
            sublevel: "6.1.1.b",
            topic: "FEM",
            tags: ["fem", "variationsprinzip"],
            difficulty: "schwer",
            question: "Was minimiert die FEM in vielen physikalischen Modellen?",
            answer: "Ein Energie- oder Fehlerfunktional",
            explanation: "Das fuehrt auf ein lineares oder nichtlineares Gleichungssystem.",
            type: "konzeptfrage",
            estimatedTime: 4
        },
        {
            id: "T-6-005",
            title: "KKT-Bedingungen",
            level: "6",
            sublevel: "6.2",
            topic: "Optimierung",
            tags: ["kkt", "nebenbedingungen"],
            difficulty: "schwer",
            question: "Wofür stehen die KKT-Bedingungen?",
            answer: "Notwendige Optimalitätsbedingungen bei Nebenbedingungen",
            explanation: "Sie erweitern Lagrange-Multiplikatoren auf Ungleichungen.",
            type: "kurzantwort",
            estimatedTime: 4
        },
        {
            id: "T-6-006",
            title: "Diskretisierungsfehler",
            level: "6",
            sublevel: "6.1",
            topic: "Numerik",
            tags: ["gitter", "fehler"],
            difficulty: "schwer",
            question: "Was passiert in der Regel mit dem Diskretisierungsfehler bei feinerem Gitter?",
            answer: "Er sinkt",
            explanation: "Feineres Gitter verbessert die Approximation der kontinuierlichen Lösung.",
            type: "konzeptfrage",
            estimatedTime: 3
        }
    ], 520),
    placementQuestions: [
        { id: "P01", level: "1", sublevel: "1.1.1", topic: "Grundrechenarten", prompt: "Wie viel ist 9 + 7?", options: ["14", "16", "17", "19"], correctIndex: 1 },
        { id: "P02", level: "1", sublevel: "1.1.2.a", topic: "Bruchrechnung", prompt: "Welcher Bruch ist gleich 0,5?", options: ["1/4", "1/2", "2/3", "3/4"], correctIndex: 1 },
        { id: "P03", level: "1", sublevel: "1.2", topic: "Geometrie", prompt: "Wie viele Seiten hat ein Rechteck?", options: ["3", "4", "5", "6"], correctIndex: 1 },
        { id: "P04", level: "1", sublevel: "1.2", topic: "Dreisatz", prompt: "2 kg kosten 6 Euro. Was kosten 1 kg?", options: ["2 Euro", "3 Euro", "4 Euro", "6 Euro"], correctIndex: 1 },
        { id: "P05", level: "1", sublevel: "1.1.2.b", topic: "Prozent", prompt: "10% von 90 sind ...", options: ["9", "10", "90", "0,9"], correctIndex: 0 },

        { id: "P06", level: "2", sublevel: "2.1.1.a", topic: "Gleichungen", prompt: "Löse 2x + 4 = 12.", options: ["x=2", "x=3", "x=4", "x=6"], correctIndex: 2 },
        { id: "P07", level: "2", sublevel: "2.1.1.b", topic: "Umformen", prompt: "Stelle v=s/t nach t um.", options: ["t=v/s", "t=s/v", "t=sv", "t=s-v"], correctIndex: 1 },
        { id: "P08", level: "2", sublevel: "2.2", topic: "Lineare Funktion", prompt: "f(x)=3x-1. Wie groß ist f(2)?", options: ["4", "5", "6", "7"], correctIndex: 1 },
        { id: "P09", level: "2", sublevel: "2.2.1.a", topic: "Exponentiell", prompt: "Was ist 2^5?", options: ["10", "16", "32", "64"], correctIndex: 2 },
        { id: "P10", level: "2", sublevel: "2.2.1.a", topic: "Wachstum", prompt: "Eine Menge verdreifacht sich je Schritt. Start 2. Nach zwei Schritten?", options: ["6", "9", "12", "18"], correctIndex: 3 },

        { id: "P11", level: "3", sublevel: "3.1.1.a", topic: "Ableitung", prompt: "Ableitung von x^3 ist ...", options: ["x^2", "2x", "3x^2", "3x"], correctIndex: 2 },
        { id: "P12", level: "3", sublevel: "3.1", topic: "Integral", prompt: "Stammfunktion von 4x ist ...", options: ["2x^2 + C", "4x^2 + C", "x^4 + C", "4 + C"], correctIndex: 0 },
        { id: "P13", level: "3", sublevel: "3.2", topic: "Wahrscheinlichkeit", prompt: "Eine faire Münze: P(Kopf)=?", options: ["0,25", "0,5", "0,75", "1"], correctIndex: 1 },
        { id: "P14", level: "3", sublevel: "3.2", topic: "Vektoren", prompt: "(1,2) + (3,4) = ?", options: ["(4,6)", "(3,8)", "(2,2)", "(4,8)"], correctIndex: 0 },
        { id: "P15", level: "3", sublevel: "3.1", topic: "Nullstellen", prompt: "Löse x^2=16.", options: ["x=4", "x=-4", "x=+-4", "x=8"], correctIndex: 2 },

        { id: "P16", level: "4", sublevel: "4.1.1.b", topic: "Determinante", prompt: "det([[1,2],[3,4]]) = ?", options: ["-2", "2", "10", "0"], correctIndex: 0 },
        { id: "P17", level: "4", sublevel: "4.1", topic: "LGS", prompt: "x+y=6 und x-y=2. x=?", options: ["2", "3", "4", "5"], correctIndex: 2 },
        { id: "P18", level: "4", sublevel: "4.2", topic: "DGL", prompt: "Welche Funktion löst y'=y?", options: ["y=t", "y=e^t", "y=t^2", "y=1/t"], correctIndex: 1 },
        { id: "P19", level: "4", sublevel: "4.2", topic: "Grenzwert", prompt: "lim n->inf (1/n) ist ...", options: ["1", "0", "unendlich", "-1"], correctIndex: 1 },
        { id: "P20", level: "4", sublevel: "4.1", topic: "Eigenvektor", prompt: "Ein Eigenvektor behält unter A ...", options: ["nur Betrag", "nur Richtung", "Richtung bis auf Vorzeichen", "gar nichts"], correctIndex: 2 },

        { id: "P21", level: "5", sublevel: "5.1.1.b", topic: "Laplace", prompt: "L{e^(at)} lautet ...", options: ["1/(s+a)", "1/(s-a)", "a/(s-a)", "s/(s-a)"], correctIndex: 1 },
        { id: "P22", level: "5", sublevel: "5.1.1.a", topic: "Fourier", prompt: "Fourier liefert primaer ...", options: ["Zeitwerte", "Frequenzanteile", "Integrationsgrenzen", "Vektoren"], correctIndex: 1 },
        { id: "P23", level: "5", sublevel: "5.2", topic: "Regelung", prompt: "PT1-Glied: G(s)=?", options: ["K/(1+Ts)", "K*s", "1/(s^2)", "K+Ts"], correctIndex: 0 },
        { id: "P24", level: "5", sublevel: "5.2", topic: "Resonanz", prompt: "Resonanz tritt auf, wenn ...", options: ["Frequenzen weit auseinander liegen", "Anregung nahe Eigenfrequenz ist", "Dämpfung maximal ist", "Kraft null ist"], correctIndex: 1 },
        { id: "P25", level: "5", sublevel: "5.1.1", topic: "Signalverarbeitung", prompt: "Faltung beschreibt ...", options: ["Differenzbildung", "Systemantwort aus Eingang und Impulsantwort", "Mittelwert", "Ableitung"], correctIndex: 1 },

        { id: "P26", level: "6", sublevel: "6.1.1.a", topic: "PDE", prompt: "Wärmeleitungsgleichung ist ...", options: ["elliptisch", "parabolisch", "hyperbolisch", "algebraisch"], correctIndex: 1 },
        { id: "P27", level: "6", sublevel: "6.2", topic: "Stochastik", prompt: "Wiener-Prozess hat ...", options: ["deterministische Schritte", "unabhängige normalverteilte Inkremente", "endliche Werte", "periodische Lösungen"], correctIndex: 1 },
        { id: "P28", level: "6", sublevel: "6.1", topic: "Numerik", prompt: "RK4 hat globale Ordnung ...", options: ["1", "2", "3", "4"], correctIndex: 3 },
        { id: "P29", level: "6", sublevel: "6.1.1.b", topic: "FEM", prompt: "FEM basiert oft auf ...", options: ["Energie-Minimierung", "exakter Lösung", "Diskretisierung ohne Gitter", "nur Zufall"], correctIndex: 0 },
        { id: "P30", level: "6", sublevel: "6.2", topic: "Optimierung", prompt: "KKT-Bedingungen sind ...", options: ["Ableitungsregeln", "Optimalitätsbedingungen mit Nebenbedingungen", "Integrationsregeln", "Fehlerschätzer"], correctIndex: 1 }
    ]
};



