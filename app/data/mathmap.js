/*
 * SOR Landkarte der Mathematik: Orte, Regionen und Wege
 * ------------------------------------------------------------
 * Koordinaten im Raster 1600 x 1000. Ein Ort:
 *   id, x, y, lv (Level 1 bis 6), t {de,en}, d {de,en} (ein bis zwei Sätze),
 *   link: "u:<Themen-ID>" (Üben), "k:<Kurs-ID>" (Kurs), "w:<Wunder-ID>" (Mathe-Wunder)
 *   pre: [ids] der Orte, die man vorher besucht haben sollte (daraus entstehen die Wege)
 * Gezeichnet in app/karte.html. tools/map-qa.js prüft Verweise und Erreichbarkeit.
 */
(function (root) {
    "use strict";
    function N(id, x, y, lv, de, en, link, pre, dde, den) { return { id: id, x: x, y: y, lv: lv, t: { de: de, en: en }, link: link, pre: pre || [], d: { de: dde, en: den } }; }
    var REGIONS = [
        { id: "zahlen", x: 290, y: 965, t: { de: "Zahlenland", en: "Land of numbers" } },
        { id: "geometrie", x: 250, y: 70, t: { de: "Geometrie-Küste", en: "Geometry coast" } },
        { id: "wald", x: 110, y: 405, t: { de: "Primzahl-Wald", en: "Prime forest" } },
        { id: "algebra", x: 700, y: 830, t: { de: "Algebra-Hochland", en: "Algebra highlands" } },
        { id: "analysis", x: 900, y: 255, t: { de: "Analysis-Gebirge", en: "Analysis mountains" } },
        { id: "linalg", x: 1160, y: 775, t: { de: "Matrix-Stadt", en: "Matrix city" } },
        { id: "dgl", x: 1370, y: 615, t: { de: "Delta der Veränderung", en: "Delta of change" } },
        { id: "stochastik", x: 1290, y: 975, t: { de: "Zufalls-Inseln", en: "Islands of chance" } },
        { id: "logik", x: 1400, y: 215, t: { de: "Kap der Logik", en: "Cape of logic" } }
    ];
    var NODES = [
        // Zahlenland
        N("zaehlen", 150, 870, 1, "Zählen und Rechnen", "Counting and calculating", "u:CM-S-01", [], "Hier beginnt jede Reise: Plus und Minus mit kleinen Zahlen.", "Every journey starts here: plus and minus with small numbers."),
        N("einmaleins", 290, 905, 1, "Einmaleins", "Times tables", "u:CM-S-49", ["zaehlen"], "Malnehmen ist wiederholtes Plusrechnen. Mit dem Einmaleins geht es blitzschnell.", "Multiplying is repeated adding. With the times tables it is lightning fast."),
        N("schriftlich", 430, 860, 1, "Schriftlich rechnen", "Written arithmetic", "u:CM-S-50", ["einmaleins"], "Große Zahlen Stelle für Stelle malnehmen und teilen.", "Multiply and divide large numbers digit by digit."),
        N("negativ", 180, 745, 2, "Negative Zahlen", "Negative numbers", "u:CM-S-12", ["zaehlen"], "Unter null geht es weiter: Schulden, Minusgrade, Tiefgarage.", "It goes on below zero: debts, frost, basement levels."),
        N("brueche", 330, 770, 2, "Brüche und Dezimalzahlen", "Fractions and decimals", "u:CM-S-13", ["einmaleins"], "Zahlen zwischen den ganzen Zahlen: Teile eines Ganzen.", "Numbers between the whole numbers: parts of a whole."),
        N("prozent", 470, 750, 2, "Prozent und Zins", "Percent and interest", "u:CM-S-19", ["brueche"], "Prozent heißt von hundert. Damit vergleicht man Anteile.", "Percent means out of a hundred. It compares shares."),
        // Primzahl-Wald
        N("teiler", 150, 610, 2, "Teiler und Primzahlen", "Divisors and primes", "u:CM-S-11", ["einmaleins"], "Primzahlen sind die Bausteine aller Zahlen. Jede Zahl zerfällt eindeutig in sie.", "Primes are the building blocks of all numbers. Every number splits uniquely into them."),
        N("riemann", 105, 480, 6, "Riemann-Hypothese", "Riemann hypothesis", "w:riemann", ["teiler", "reihen", "komplex"], "Wie regelmäßig sind die Primzahlen verteilt? Das berühmteste offene Problem.", "How regularly are the primes distributed? The most famous open problem."),
        // Geometrie-Küste
        N("formen", 120, 310, 1, "Formen und Symmetrie", "Shapes and symmetry", "u:CM-S-03", [], "Dreieck, Viereck, Kreis: Formen erkennen und spiegeln.", "Triangle, square, circle: recognising and mirroring shapes."),
        N("flaeche", 245, 245, 1, "Umfang und Fläche", "Perimeter and area", "u:CM-S-06", ["formen", "einmaleins"], "Wie lang ist der Rand, wie viel passt hinein?", "How long is the edge, how much fits inside?"),
        N("winkel", 370, 300, 2, "Winkel und Dreiecke", "Angles and triangles", "u:CM-S-15", ["formen"], "Die Winkel im Dreieck ergeben zusammen immer 180°.", "The angles of a triangle always add up to 180°."),
        N("kreis", 165, 140, 2, "Kreis und π", "Circle and π", "u:CM-S-24", ["flaeche", "brueche"], "Umfang durch Durchmesser ergibt bei jedem Kreis dieselbe Zahl: π.", "Circumference divided by diameter gives the same number for every circle: π."),
        N("pythagoras", 320, 150, 2, "Satz des Pythagoras", "Pythagoras' theorem", "u:CM-S-28", ["winkel", "potenz"], "Im rechtwinkligen Dreieck gilt a² + b² = c².", "In a right triangle a² + b² = c²."),
        N("trig", 455, 195, 3, "Trigonometrie", "Trigonometry", "u:CM-S-30", ["pythagoras"], "Sinus und Kosinus verbinden Winkel mit Seitenlängen.", "Sine and cosine link angles to side lengths."),
        // Algebra-Hochland
        N("terme", 590, 770, 2, "Terme und Gleichungen", "Expressions and equations", "u:CM-S-20", ["brueche", "negativ"], "Mit Buchstaben rechnen und nach der Unbekannten auflösen.", "Calculating with letters and solving for the unknown."),
        N("potenz", 545, 660, 2, "Potenzen und Wurzeln", "Powers and roots", "u:CM-S-27", ["terme"], "Kurzschreibweise für wiederholtes Malnehmen und ihre Umkehrung.", "Shorthand for repeated multiplication and its inverse."),
        N("linfun", 715, 700, 2, "Lineare Funktionen", "Linear functions", "u:CM-S-21", ["terme"], "Geraden beschreiben gleichmäßige Veränderung: y = m x + b.", "Lines describe steady change: y = m x + b."),
        N("lgs", 860, 760, 2, "Gleichungssysteme", "Systems of equations", "u:CM-S-22", ["linfun"], "Zwei Geraden, ein Schnittpunkt: mehrere Bedingungen gleichzeitig erfüllen.", "Two lines, one intersection: meeting several conditions at once."),
        N("quad", 650, 590, 2, "Quadratische Funktionen", "Quadratic functions", "u:CM-S-26", ["linfun", "potenz"], "Parabeln beschreiben Würfe, Brücken und Bremswege.", "Parabolas describe throws, bridges and braking distances."),
        N("explog", 790, 610, 3, "Exponential und Logarithmus", "Exponentials and logarithms", "u:CM-S-32", ["potenz", "prozent"], "Wachstum, das sich selbst verstärkt, und die Frage nach der Hochzahl.", "Growth that feeds itself, and the question for the exponent."),
        // Analysis-Gebirge
        N("sinus", 575, 345, 3, "Sinus und Bogenmaß", "Sine and radians", "u:CM-S-31", ["trig"], "Aus dem Kreis wird die Welle. Die Grundform jeder Schwingung.", "The circle becomes the wave. The basic shape of every oscillation."),
        N("komplex", 560, 465, 3, "Komplexe Zahlen", "Complex numbers", "u:CM-S-46", ["quad", "trig"], "Eine neue Zahl i mit i² = −1 macht jede Gleichung lösbar.", "A new number i with i² = −1 makes every equation solvable."),
        N("euler", 480, 85, 4, "Euler-Formel", "Euler's formula", "w:euler", ["komplex", "sinus", "efun"], "e hoch iπ ist minus eins. Drehen und Wachsen sind dasselbe.", "e to the iπ is minus one. Turning and growing are the same thing."),
        N("folgen", 700, 440, 3, "Folgen und Grenzwerte", "Sequences and limits", "u:CM-S-40", ["brueche", "terme"], "Die Quelle der Analysis: Was passiert, wenn man unendlich oft weitergeht?", "The source of analysis: what happens if you go on infinitely often?"),
        N("ableitung", 830, 380, 3, "Ableitung", "Derivative", "u:CM-S-36", ["folgen", "quad"], "Die Steigung in einem einzigen Punkt. So misst man Veränderung.", "The slope at a single point. This is how change is measured."),
        N("efun", 900, 500, 3, "e-Funktion", "The function e^x", "u:CM-S-39", ["ableitung", "explog"], "Die Funktion, die ihre eigene Ableitung ist.", "The function that is its own derivative."),
        N("integral", 980, 400, 3, "Integral", "Integral", "u:CM-S-38", ["ableitung"], "Flächen unter Kurven. Die Umkehrung der Ableitung.", "Areas under curves. The inverse of the derivative."),
        N("reihen", 760, 270, 4, "Reihen und Taylor", "Series and Taylor", "u:CM-E-07", ["folgen", "ableitung"], "Unendliche Summen. Jede glatte Funktion wird zum Polynom.", "Infinite sums. Every smooth function becomes a polynomial."),
        N("basel", 690, 135, 4, "Basler Problem", "Basel problem", "w:basel", ["reihen", "kreis"], "1 + 1/4 + 1/9 + … ergibt π²/6. Warum steckt π in dieser Summe?", "1 + 1/4 + 1/9 + … is π²/6. Why is π in this sum?"),
        N("mehrdim", 1070, 300, 4, "Mehrere Veränderliche", "Several variables", "u:CM-E-08", ["ableitung", "vektoren"], "Ableiten in Gebirgen statt auf Kurven: Gradient und Hessematrix.", "Differentiating on mountains instead of curves: gradient and Hessian."),
        N("integralsaetze", 1190, 215, 4, "Integralsätze", "Integral theorems", "k:hm2", ["mehrdim", "integral"], "Gauß und Stokes verbinden das Innere eines Gebiets mit seinem Rand.", "Gauss and Stokes link the inside of a region to its boundary."),
        N("funktionentheorie", 910, 130, 5, "Funktionentheorie", "Complex analysis", "u:CM-E-14", ["komplex", "integralsaetze", "reihen"], "Analysis mit komplexen Zahlen. Erstaunlich starr und schön.", "Analysis with complex numbers. Astonishingly rigid and beautiful."),
        // Matrix-Stadt
        N("vektoren", 1010, 650, 3, "Vektoren und Geraden", "Vectors and lines", "u:CM-S-44", ["lgs", "trig"], "Pfeile im Raum: Richtung und Länge in einem.", "Arrows in space: direction and length in one."),
        N("matrizen", 1120, 715, 4, "Matrizen", "Matrices", "u:CM-E-01", ["vektoren", "lgs"], "Zahlentabellen, die Räume drehen, strecken und spiegeln.", "Tables of numbers that rotate, stretch and mirror spaces."),
        N("eigen", 1235, 650, 4, "Eigenwerte", "Eigenvalues", "u:CM-E-03", ["matrizen", "quad"], "Richtungen, die eine Matrix nur streckt. Der Schlüssel zu Schwingungen.", "Directions a matrix only stretches. The key to oscillations."),
        N("svd", 1330, 720, 6, "Singulärwerte", "Singular values", "u:CM-E-32", ["eigen"], "Jede Matrix zerfällt in Drehen, Strecken, Drehen. Grundlage der Datenanalyse.", "Every matrix splits into rotate, stretch, rotate. The basis of data analysis."),
        // Delta der Veränderung
        N("dgl", 1140, 480, 4, "Differentialgleichungen", "Differential equations", "u:CM-E-12", ["integral", "efun"], "Gleichungen für Veränderung. So werden Naturgesetze aufgeschrieben.", "Equations for change. This is how laws of nature are written."),
        N("resonanz", 1265, 330, 4, "Schwingung und Resonanz", "Oscillation and resonance", "k:ph3", ["dgl", "sinus"], "Ein System zweiter Ordnung, im richtigen Takt angeregt: Das ist Resonanz. Daher kommt der Name dieser Seite.", "A second-order system driven at the right rhythm: that is resonance. This is where the name of this site comes from."),
        N("fourier", 1300, 440, 5, "Fourier-Analyse", "Fourier analysis", "u:CM-E-22", ["reihen", "resonanz", "euler"], "Jedes Signal ist eine Summe aus Wellen.", "Every signal is a sum of waves."),
        N("numerik", 1270, 550, 4, "Numerik", "Numerical methods", "u:CM-E-16", ["dgl", "matrizen"], "Wenn es keine Formel gibt: geschickt nähern und Fehler abschätzen.", "When there is no formula: approximate cleverly and estimate the error."),
        N("laplace", 1420, 500, 5, "Laplace-Transformation", "Laplace transform", "u:CM-E-23", ["fourier", "dgl"], "Macht aus Differentialgleichungen einfache Algebra.", "Turns differential equations into simple algebra."),
        N("pde", 1440, 350, 5, "Wellen und Wärme", "Waves and heat", "u:CM-E-29", ["fourier", "mehrdim"], "Partielle Differentialgleichungen beschreiben Felder in Raum und Zeit.", "Partial differential equations describe fields in space and time."),
        N("regelung", 1520, 590, 5, "Regelungstechnik", "Control engineering", "u:CM-E-27", ["laplace", "eigen"], "Systeme stabil halten: vom Tempomat bis zur Rakete.", "Keeping systems stable: from cruise control to rockets."),
        // Zufalls-Inseln
        N("zufall", 1085, 885, 2, "Zufall und Wahrscheinlichkeit", "Chance and probability", "u:CM-S-25", ["brueche"], "Wie wahrscheinlich ist ein Ereignis? Würfel, Münzen, Baumdiagramme.", "How likely is an event? Dice, coins, tree diagrams."),
        N("kombi", 1215, 925, 3, "Kombinatorik", "Combinatorics", "u:CM-S-35", ["zufall", "einmaleins"], "Geschickt zählen: Wie viele Möglichkeiten gibt es?", "Counting cleverly: how many possibilities are there?"),
        N("verteilung", 1345, 865, 3, "Verteilungen", "Distributions", "u:CM-S-42", ["kombi", "integral"], "Binomial- und Normalverteilung: die Formen des Zufalls.", "Binomial and normal distribution: the shapes of chance."),
        N("statistik", 1475, 905, 4, "Schätzen und Testen", "Estimating and testing", "u:CM-E-21", ["verteilung"], "Aus Stichproben auf das Ganze schließen, mit Angabe der Unsicherheit.", "Drawing conclusions from samples, with stated uncertainty."),
        N("markov", 1490, 785, 6, "Markov-Ketten", "Markov chains", "u:CM-E-31", ["matrizen", "zufall"], "Zufall mit Gedächtnis von genau einem Schritt.", "Chance with a memory of exactly one step."),
        // Kap der Logik
        N("logik", 1340, 120, 4, "Mengen und Beweise", "Sets and proofs", "k:hm1", ["terme"], "Die Sprache der Mathematik: Mengen, Aussagen, vollständige Induktion.", "The language of mathematics: sets, statements, induction."),
        N("goedel", 1500, 95, 6, "Gödels Satz", "Gödel's theorem", "w:goedel", ["logik", "teiler"], "Es gibt wahre Sätze, die sich nicht beweisen lassen. Der Leuchtturm am Rand der Karte.", "There are true statements that cannot be proved. The lighthouse at the edge of the map.")
    ];
    function href(link) { var k = link.slice(0, 1), v = link.slice(2); return k === "u" ? "ueben.html?thema=" + encodeURIComponent(v) + "&zurueck=karte.html" : k === "k" ? "kurs.html?k=" + v : "wunder.html?t=" + v; }
    var api = { W: 1600, H: 1000, regions: REGIONS, nodes: NODES, href: href, byId: function (id) { return NODES.filter(function (n) { return n.id === id; })[0] || null; } };
    root.SOR_MATHMAP = api;
    if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
