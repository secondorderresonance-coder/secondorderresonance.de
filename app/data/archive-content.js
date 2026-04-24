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
                explanation: `${seed.explanation} Diese Aufgabe ist Teil der skalierbaren Serie ${variant} f?r Level ${level}.`
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
                { id: "1.1.1.a", title: "Kopfrechnen und Rechenstrategien" },
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
                { id: "2.1.1", title: "Gleichungen l?sen und umstellen" },
                { id: "2.1.1.a", title: "Lineare Gleichungen mit Klammern" },
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
                { id: "3.1.1.a", title: "Ableitungsregeln kombiniert" },
                { id: "3.1.1.a", title: "Ableitungsregeln" },
                { id: "3.1.1.b", title: "Monotonie und Extremstellen" },
                { id: "3.2", title: "Stochastik und Vektoren" }
            ]
        },
        {
            level: "4",
            code: "L4",
            title: "Universit?tsgrundlagen",
            description: "Studienanfang",
            sublevels: [
                { id: "4.1", title: "Lineare Algebra" },
                { id: "4.1.1", title: "Matrizen und Determinanten" },
                { id: "4.1.1.a", title: "Determinanten in Anwendungen" },
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
                { id: "5.1.1.a", title: "Transformationen in Signalsystemen" },
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
                { id: "6.1.1.a", title: "FEM-Diskretisierung und Randbedingungen" },
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
            sublevel: "1.1.1.a",
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
            question: "Ein Rechteck hat L?nge 7 cm und Breite 4 cm. Bestimme den Umfang.",
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
            question: "Schreibe 0,75 als vollst?ndig gek?rzten Bruch.",
            answer: "3/4",
            explanation: "0,75 = 75/100 = 3/4.",
            type: "kurzantwort",
            estimatedTime: 2
        },

        {
            id: "T-2-001",
            title: "Lineare Gleichung l?sen",
            level: "2",
            sublevel: "2.1.1.a",
            topic: "Gleichungen l?sen und umstellen",
            topic: "Gleichungen lösen und umstellen",
            tags: ["gleichung", "termumformung"],
            difficulty: "mittel",
            question: "L?se 3x - 7 = 11.",
            answer: "x = 6",
            explanation: "+7 auf beiden Seiten ergibt 3x = 18, dann durch 3 teilen.",
            type: "kurzantwort",
            estimatedTime: 2
        },
        {
            id: "T-2-002",
            title: "Formel nach Variable umstellen",
            level: "2",
            sublevel: "2.1.1",
            topic: "Gleichungen l?sen und umstellen",
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
            question: "Startwert 80, jede Stunde Halbierung. Wie gro? ist der Wert nach 3 Stunden?",
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
            question: "Berechne f(4) f?r f(x)=2x-3.",
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
            question: "L?se x^2 - 9 = 0.",
            answer: "x = -3 oder x = 3",
            explanation: "x^2=9, also zwei L?sungen.",
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
            answer: "Ja, f?r alle x",
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
            question: "L?se x+y=5 und x-y=1.",
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
            answer: "v beh?lt Richtung, nur die L?nge skaliert mit lambda",
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
            question: "L?se y' = 3y mit y(0)=2.",
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
            id: "T-4-007",
            title: "Konvergenz von Reihen (geometrische Reihe)",
            level: "4",
            sublevel: "4.2",
            topic: "Analysis I",
            tags: ["reihe", "konvergenz", "grundlagen"],
            difficulty: "schwer",
            question: "Bestimme Summe und Konvergenzbereich von sum_{k=0..inf} (1/3)^k.",
            answer: "Die Reihe konvergiert und hat die Summe 3/2.",
            explanation: "Kernidee: Eine geometrische Reihe mit |q|<1 konvergiert zu 1/(1-q). Intuition: Jeder weitere Summand ist nur noch ein fester Bruchteil des vorherigen und die Zuwachse werden immer kleiner. Schritte: 1) Identifiziere q=1/3. 2) Pruefe |q|<1, also Konvergenz gegeben. 3) Nutze S=1/(1-q)=1/(1-1/3)=1/(2/3)=3/2. Haeufiger Fehler: Die Formel 1/(1-q) trotz |q|>=1 anwenden. Schnellcheck: Bei q=1/3 muss die Summe groesser als 1 und kleiner als 2 sein; 3/2 passt.",
            type: "kurzantwort",
            estimatedTime: 5
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
            explanation: "Standardtransformation f?r t >= 0.",
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
            explanation: "Dann tritt Resonanz auf; D?mpfung begrenzt die Amplitude.",
            type: "konzeptfrage",
            estimatedTime: 4
        },
        {
            id: "T-5-004",
            title: "PT1-Glied",
            level: "5",
            sublevel: "5.2",
            topic: "Regelungstechnik",
            tags: ["pt1", "?bertragungsfunktion"],
            difficulty: "schwer",
            question: "Wie lautet die ?bertragungsfunktion eines PT1-Glieds?",
            answer: "G(s)=K/(1+Ts)",
            explanation: "K ist Verst?rkung, T Zeitkonstante.",
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
            explanation: "Beide ?ber der logarithmischen Frequenzachse.",
            type: "kurzantwort",
            estimatedTime: 3
        },

        {
            id: "T-5-007",
            title: "Laplace und Differentialgleichung im Modellfluss",
            level: "5",
            sublevel: "5.1.1.a",
            topic: "Laplace",
            tags: ["laplace", "dgl", "modellierung"],
            difficulty: "schwer",
            question: "Warum ist die Laplace-Transformation fuer lineare Anfangswertprobleme in der Regelung so nuetzlich?",
            answer: "Weil sie Ableitungen in algebraische Terme ueberfuehrt und Anfangswerte direkt einbindet.",
            explanation: "Kernidee: Im s-Bereich wird aus einer DGL ein algebraisches Gleichungssystem. Intuition: Statt wiederholt abzuleiten und zu integrieren, rechnet man mit Faktoren wie s*Y(s) und loest dann einfacher nach Y(s) auf. Schritte: 1) Transformiere jede Ableitung, z.B. L{y'}=sY(s)-y(0). 2) Setze Anfangswerte ein. 3) Stelle nach Y(s) um. 4) Interpretiere Pole/Nullstellen fuer Dynamik und Stabilitaet. Haeufiger Fehler: Anfangswerte beim Transformieren vergessen. Schnellcheck: Ohne Anfangswerte muss die transformierte Gleichung nur noch Y(s) und Eingangsanteile enthalten.",
            type: "konzeptfrage",
            estimatedTime: 6
        },

        {
            id: "T-6-001",
            title: "PDE-Klassifikation",
            level: "6",
            sublevel: "6.1.1.a",
            topic: "Partielle DGL",
            tags: ["pde", "klassifikation"],
            difficulty: "schwer",
            question: "Zu welcher Klasse geh?rt die W?rmeleitungsgleichung?",
            answer: "Parabolisch",
            explanation: "W?rmeleitung besitzt diffusionsartiges Verhalten.",
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
            answer: "Unabh?ngige normalverteilte Inkremente",
            explanation: "Inkremente ?ber disjunkte Intervalle sind unabh?ngig.",
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
            question: "Wof?r stehen die KKT-Bedingungen?",
            answer: "Notwendige Optimalit?tsbedingungen bei Nebenbedingungen",
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
            explanation: "Feineres Gitter verbessert die Approximation der kontinuierlichen L?sung.",
            type: "konzeptfrage",
            estimatedTime: 3
        },

        {
            id: "T-6-007",
            title: "Konsistenz-Stabilitaet-Konvergenz bei numerischer Simulation",
            level: "6",
            sublevel: "6.1.1.a",
            topic: "Numerische Simulation",
            tags: ["konsistenz", "stabilitaet", "konvergenz"],
            difficulty: "schwer",
            question: "Erklaere den Zusammenhang zwischen Konsistenz, Stabilitaet und Konvergenz bei linearen Anfangswertproblemen.",
            answer: "Ein konsistentes und stabiles Verfahren ist konvergent (Lax-Idee fuer lineare gut gestellte Probleme).",
            explanation: "Kernidee: Konvergenz entsteht aus zwei Bausteinen: das Verfahren muss das richtige Problem approximieren und numerische Fehler duerfen nicht wachsen. Intuition: Konsistenz sagt, dass das lokale Rechenrezept zur DGL passt; Stabilitaet sorgt dafuer, dass Rundungs- und Stoerfehler nicht explodieren. Schritte: 1) Pruefe Konsistenz ueber lokalen Fehler gegen 0 fuer h->0. 2) Pruefe Stabilitaet, z.B. Fehlerschaetzung bleibt beschraenkt. 3) Folgere Konvergenz fuer lineare gut gestellte Probleme. 4) Interpretiere das Ergebnis immer mit Schrittweitenstudie. Haeufiger Fehler: Nur Konsistenz zu testen und daraus direkt Konvergenz zu behaupten. Schnellcheck: Halbierst du h, muss die Loesung systematisch naeher an eine Referenzloesung ruecken.",
            type: "konzeptfrage",
            estimatedTime: 7
        },

        {
            id: "T-4-008",
            title: "Taylorentwicklung von e^x",
            level: "4",
            sublevel: "4.2",
            topic: "Analysis I",
            tags: ["taylor", "potenzreihe", "approximation"],
            difficulty: "schwer",
            question: "Schreibe die Taylorreihe von e^x um den Punkt x=0 auf und nenne ihren Konvergenzradius.",
            answer: "e^x = sum_{k=0}^{inf} x^k / k! fuer alle x in R; Konvergenzradius R = inf.",
            explanation: "Kernidee: Jede glatte Funktion laesst sich lokal durch ein Polynom beliebiger Ordnung approximieren; bei e^x konvergiert diese Approximation sogar auf ganz R. Intuition: Die Ableitungen von e^x sind alle wieder e^x, also ist jeder Taylorkoeffizient a_k = f^(k)(0)/k! = 1/k!. Schritte: 1) Berechne f^(k)(x)=e^x fuer alle k. 2) Werte bei x=0 aus: f^(k)(0)=1. 3) Taylorkoeffizient: a_k = 1/k!. 4) Reihe: sum_{k=0}^{inf} x^k/k!. 5) Konvergenzradius via Quotientenkriterium: |a_{k+1}/a_k| = 1/(k+1) -> 0, also R=inf. Haeufiger Fehler: Nur die ersten 3-4 Glieder hinschreiben ohne Konvergenzbetrachtung. Schnellcheck: Fuer x=1 liefert die Reihe 1+1+1/2+1/6+... ≈ 2.718, was mit e uebereinstimmt.",
            type: "kurzantwort",
            estimatedTime: 6
        },

        {
            id: "T-5-008",
            title: "Partialbruchzerlegung fuer inverse Laplace-Transformation",
            level: "5",
            sublevel: "5.1.1.b",
            topic: "Laplace",
            tags: ["laplace", "partialbruch", "ruecktransformation"],
            difficulty: "schwer",
            question: "Beschreibe die Partialbruchzerlegung und warum sie bei der inversen Laplace-Transformation eingesetzt wird.",
            answer: "Eine gebrochenrationale Funktion Y(s) wird in einfache Brueche mit bekannten Ruecktransformierten zerlegt, z.B. A/(s-a) -> A*e^(at).",
            explanation: "Kernidee: Die inverse Laplace-Transformation ist fuer einfache Terme tabellarisch bekannt; Partialbrueche bringen jede gebrochenrationale Funktion auf diese Form. Intuition: Statt eine komplizierte Ruecktransformation zu berechnen, schreibt man Y(s) als Summe von Bruchtermen, deren Bilder man aus der Laplace-Tabelle abliest. Schritte: 1) Faktorisiere den Nenner von Y(s), z.B. (s-a)(s-b). 2) Schreibe Y(s) = A/(s-a) + B/(s-b). 3) Bestimme A und B durch Koeffizientenvergleich oder Einsetzen der Pole. 4) Transformiere jeden Term zurueck: A/(s-a) -> A*e^(at). Haeufiger Fehler: Mehrfachpole vergessen, die Terme der Form A/(s-a)^2 benoetigen. Schnellcheck: Addiere die Partialbrueche und pruefe, ob Y(s) reproduziert wird.",
            type: "konzeptfrage",
            estimatedTime: 6
        },

        {
            id: "T-6-008",
            title: "Schwache Formulierung und Galerkin-FEM",
            level: "6",
            sublevel: "6.1.1.b",
            topic: "FEM",
            tags: ["fem", "schwache-formulierung", "galerkin"],
            difficulty: "schwer",
            question: "Erklaere, wie die schwache (variationelle) Formulierung einer PDE den Weg zur Galerkin-FEM eroeffnet.",
            answer: "Die starke PDE wird mit Testfunktionen multipliziert und integriert; partiell integriert senkt das die Glaettenanforderung und liefert ein Bilinearform-Problem, das Galerkin auf einem Ansatzraum approximiert.",
            explanation: "Kernidee: Statt die PDE punktweise zu erfuellen, fordert man Orthogonalitaet des Residuums gegenueber einem Raum von Testfunktionen. Intuition: Damit reichen stueckweise polynomiale Ansaetze auf einem Gitter aus, weil die Schwachform glattere Loesungen nicht voraussetzt. Schritte: 1) Multipliziere die starke Form Lu=f mit einer Testfunktion v und integriere ueber das Gebiet. 2) Partielle Integration uebertraegt Ableitungen auf v und bringt natuerliche Randbedingungen ins Integral. 3) Ergebnis ist a(u,v)=l(v) fuer alle v im Testraum. 4) Galerkin-Wahl: Ansatz- und Testraum sind identisch und endlichdimensional (z.B. stueckweise lineare Hutfunktionen). 5) Dies fuehrt auf ein lineares Gleichungssystem K*u=f (Steifigkeitsmatrix). Haeufiger Fehler: Randbedingungen nach der partiellen Integration vergessen oder falsch zuordnen. Schnellcheck: Fuer konstante Koeffizienten und gleichmaessiges Gitter sollte K symmetrisch und positiv definit sein.",
            type: "konzeptfrage",
            estimatedTime: 8
        },

        {
            id: "T-4-009",
            title: "Eigenwerte via charakteristisches Polynom",
            level: "4",
            sublevel: "4.1.1.b",
            topic: "Lineare Algebra",
            tags: ["eigenwert", "charakteristisches-polynom", "berechnung"],
            difficulty: "schwer",
            question: "Bestimme die Eigenwerte der Matrix A = [[2,1],[1,2]].",
            answer: "lambda_1 = 1, lambda_2 = 3",
            explanation: "Kernidee: Eigenwerte sind die Werte lambda, fuer die (A - lambda*I) singulaer ist, also det(A - lambda*I) = 0. Intuition: Ist A - lambda*I singulaer, gibt es einen Vektor v != 0 mit (A - lambda*I)v = 0, d.h. Av = lambda*v. Schritte: 1) Bilde A - lambda*I = [[2-lambda, 1],[1, 2-lambda]]. 2) Berechne die Determinante: (2-lambda)^2 - 1 = 0. 3) Loese: (2-lambda)^2 = 1 -> 2-lambda = +/-1. 4) Erster Wert: 2-lambda=1 -> lambda=1. Zweiter: 2-lambda=-1 -> lambda=3. Haeufiger Fehler: Das Vorzeichen beim Aufstellen von A-lambda*I falsch setzen, z.B. A+lambda*I statt A-lambda*I. Schnellcheck: Spur(A)=4=1+3 und det(A)=3=1*3 stimmen mit den Eigenwerten ueberein.",
            type: "kurzantwort",
            estimatedTime: 6
        },

        {
            id: "T-5-009",
            title: "Z-Transformation und zeitdiskrete Systeme",
            level: "5",
            sublevel: "5.1.1.a",
            topic: "Z-Transformation",
            tags: ["z-transformation", "zeitdiskret", "pole", "signalverarbeitung"],
            difficulty: "schwer",
            question: "Erklaere die Z-Transformation und warum sie das diskrete Gegenstueck zur Laplace-Transformation ist.",
            answer: "Die Z-Transformation ueberfuehrt eine zeitdiskrete Folge x[k] in X(z) = sum_{k=0}^{inf} x[k]*z^{-k}; Pole von X(z) beschreiben die Dynamik des diskreten Systems.",
            explanation: "Kernidee: Wie die Laplace-Transformation lineare DGL algebraisiert, ueberfuehrt die Z-Transformation lineare Differenzengleichungen in algebraische Gleichungen im z-Bereich. Intuition: Der Operator z^{-1} entspricht einer Verzoegerung um einen Abtastschritt; damit kann man Differenzengleichungen y[k]=a*y[k-1]+b*x[k] direkt als Y(z)=a*z^{-1}*Y(z)+b*X(z) schreiben und nach Y(z)/X(z) aufloesen. Schritte: 1) Schreibe die Differenzengleichung auf. 2) Wende die Z-Transformation an und nutze z^{-1} fuer Zeitverschiebung. 3) Loese nach der Uebertragungsfunktion H(z)=Y(z)/X(z) auf. 4) Bestimme Pole (Nullstellen des Nenners) und pruefe Stabilitaet: alle Pole muessen innerhalb des Einheitskreises liegen. Haeufiger Fehler: Stabilitaetskriterium verwechseln: bei Laplace Re(Pol)<0 stabil, bei Z-Transformation |Pol|<1 stabil. Schnellcheck: H(z)=1/(1-a*z^{-1}) hat einen Pol bei z=a; fuer |a|<1 stabil, fuer |a|>=1 instabil.",
            type: "konzeptfrage",
            estimatedTime: 7
        },

        {
            id: "T-6-009",
            title: "Ito-Lemma und stochastische Differentialgleichungen",
            level: "6",
            sublevel: "6.2",
            topic: "Stochastik",
            tags: ["ito", "sde", "wiener-prozess", "stochastische-analysis"],
            difficulty: "schwer",
            question: "Formuliere das Ito-Lemma fuer eine glatte Funktion f(t, W_t) eines Wiener-Prozesses und erklaere den zusaetzlichen Term gegenueber der klassischen Kettenregel.",
            answer: "df = (df/dt) dt + (df/dW) dW + (1/2)(d^2f/dW^2) dt; der Zusatzterm (1/2)f'' dt entsteht, weil (dW)^2 = dt in der stochastischen Analysis.",
            explanation: "Kernidee: Die klassische Kettenregel versagt fuer Funktionen eines Wiener-Prozesses, weil W_t quadratische Variation dt besitzt statt 0. Intuition: Bei deterministischen Pfaden gilt (dx)^2 = o(dt) und faellt weg; bei W_t ist aber E[(dW)^2] = dt, also ist (dW)^2 = dt kein vernachlaessigbarer Term zweiter Ordnung mehr. Schritte: 1) Schreibe Taylor-Entwicklung von f bis zur zweiten Ordnung in dW und dt. 2) Ersetze (dW)^2 = dt (Ito-Isometrie). 3) Vernachlaessige (dW)(dt) und (dt)^2 als hoehere Ordnung. 4) Ergebnis: df = f_t dt + f_W dW + (1/2) f_{WW} dt. Haeufiger Fehler: Den Korrektturterm (1/2)f'' dt vergessen und das Ergebnis mit der klassischen Kettenregel gleichzusetzen. Schnellcheck: Fuer f(W_t)=W_t^2 liefert Ito: d(W^2)=2W dW + dt; Erwartungswert E[W_t^2]=t bestaetigt den dt-Term.",
            type: "konzeptfrage",
            estimatedTime: 9
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
        { id: "P13", level: "3", sublevel: "3.2", topic: "Wahrscheinlichkeit", prompt: "Eine faire M?nze: P(Kopf)=?", options: ["0,25", "0,5", "0,75", "1"], correctIndex: 1 },
        { id: "P14", level: "3", sublevel: "3.2", topic: "Vektoren", prompt: "(1,2) + (3,4) = ?", options: ["(4,6)", "(3,8)", "(2,2)", "(4,8)"], correctIndex: 0 },
        { id: "P15", level: "3", sublevel: "3.1", topic: "Nullstellen", prompt: "L?se x^2=16.", options: ["x=4", "x=-4", "x=+-4", "x=8"], correctIndex: 2 },

        { id: "P16", level: "4", sublevel: "4.1.1.b", topic: "Determinante", prompt: "det([[1,2],[3,4]]) = ?", options: ["-2", "2", "10", "0"], correctIndex: 0 },
        { id: "P17", level: "4", sublevel: "4.1", topic: "LGS", prompt: "x+y=6 und x-y=2. x=?", options: ["2", "3", "4", "5"], correctIndex: 2 },
        { id: "P18", level: "4", sublevel: "4.2", topic: "DGL", prompt: "Welche Funktion l?st y'=y?", options: ["y=t", "y=e^t", "y=t^2", "y=1/t"], correctIndex: 1 },
        { id: "P19", level: "4", sublevel: "4.2", topic: "Grenzwert", prompt: "lim n->inf (1/n) ist ...", options: ["1", "0", "unendlich", "-1"], correctIndex: 1 },
        { id: "P20", level: "4", sublevel: "4.1", topic: "Eigenvektor", prompt: "Ein Eigenvektor beh?lt unter A ...", options: ["nur Betrag", "nur Richtung", "Richtung bis auf Vorzeichen", "gar nichts"], correctIndex: 2 },

        { id: "P21", level: "5", sublevel: "5.1.1.b", topic: "Laplace", prompt: "L{e^(at)} lautet ...", options: ["1/(s+a)", "1/(s-a)", "a/(s-a)", "s/(s-a)"], correctIndex: 1 },
        { id: "P22", level: "5", sublevel: "5.1.1.a", topic: "Fourier", prompt: "Fourier liefert primaer ...", options: ["Zeitwerte", "Frequenzanteile", "Integrationsgrenzen", "Vektoren"], correctIndex: 1 },
        { id: "P23", level: "5", sublevel: "5.2", topic: "Regelung", prompt: "PT1-Glied: G(s)=?", options: ["K/(1+Ts)", "K*s", "1/(s^2)", "K+Ts"], correctIndex: 0 },
        { id: "P24", level: "5", sublevel: "5.2", topic: "Resonanz", prompt: "Resonanz tritt auf, wenn ...", options: ["Frequenzen weit auseinander liegen", "Anregung nahe Eigenfrequenz ist", "D?mpfung maximal ist", "Kraft null ist"], correctIndex: 1 },
        { id: "P25", level: "5", sublevel: "5.1.1", topic: "Signalverarbeitung", prompt: "Faltung beschreibt ...", options: ["Differenzbildung", "Systemantwort aus Eingang und Impulsantwort", "Mittelwert", "Ableitung"], correctIndex: 1 },

        { id: "P26", level: "6", sublevel: "6.1.1.a", topic: "PDE", prompt: "Wärmeleitungsgleichung ist ...", options: ["elliptisch", "parabolisch", "hyperbolisch", "algebraisch"], correctIndex: 1 },
        { id: "P27", level: "6", sublevel: "6.2", topic: "Stochastik", prompt: "Wiener-Prozess hat ...", options: ["deterministische Schritte", "unabhängige normalverteilte Inkremente", "endliche Werte", "periodische Lösungen"], correctIndex: 1 },
        { id: "P28", level: "6", sublevel: "6.1", topic: "Numerik", prompt: "RK4 hat globale Ordnung ...", options: ["1", "2", "3", "4"], correctIndex: 3 },
        { id: "P29", level: "6", sublevel: "6.1.1.b", topic: "FEM", prompt: "FEM basiert oft auf ...", options: ["Energie-Minimierung", "exakter Lösung", "Diskretisierung ohne Gitter", "nur Zufall"], correctIndex: 0 },
        { id: "P30", level: "6", sublevel: "6.2", topic: "Optimierung", prompt: "KKT-Bedingungen sind ...", options: ["Ableitungsregeln", "Optimalitätsbedingungen mit Nebenbedingungen", "Integrationsregeln", "Fehlerschätzer"], correctIndex: 1 }
    ]
};



