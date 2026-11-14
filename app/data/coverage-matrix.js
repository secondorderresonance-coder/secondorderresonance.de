/*
 * SOR Coverage Matrix
 * ------------------------------------------------------------
 * Ordnet Lehrplan-Themen den Archiv-Sektionen (Taxonomie-IDs aus
 * app/data/archive-content.js) zu.
 *
 * school:      Klasse 1 bis 12  -> L1 bis L3
 * engineering: Ingenieurmathematik Bachelor bis Master -> L4 bis L5
 *
 * Orientierung (kein amtlicher Abgleich eines einzelnen Bundeslands):
 *  - KMK-Bildungsstandards Mathematik Primarbereich, Mittlerer
 *    Schulabschluss und Allgemeine Hochschulreife (Leitideen)
 *  - typische Modulfolge "Höhere Mathematik 1 bis 3", Numerik,
 *    Stochastik, Signale/Systeme und Regelungstechnik in
 *    ingenieurwissenschaftlichen Studiengängen
 *
 * Felder:
 *  id        stabile Kennung (CM-S-xx Schule, CM-E-xx Studium)
 *  band      Klassenstufe bzw. Studienphase
 *  grades    [von, bis] nur für Schule (Klassen)
 *  area      Leitidee bzw. Modul
 *  topic     Lehrplan-Thema
 *  sections  Taxonomie-IDs, die das Thema abdecken
 *  text      Kernidee in 1 bis 2 Sätzen (nur Schule)
 *  formula   Kernformel als String oder Liste mehrerer Formeln, einfaches HTML erlaubt (nur Schule)
 *  visual    Schlüssel einer animierten Grafik aus app/modules/topic-visuals.js
 *  gap       optional: was im Archiv noch fehlt (Status wird dann "Lücke"
 *            oder "teilweise", je nachdem ob sections passend sind)
 *  optional  true, wenn das Thema nur in manchen Ländern/Kursen vorkommt
 *
 * Der Abdeckungsstatus wird NICHT hier gepflegt, sondern von
 * tools/coverage-qa.js aus Taxonomie und Aufgabenzahl berechnet.
 */
(function (root) {
    // Jahrgangszuordnung = typische Reihenfolge (Grundschule + Gymnasium), je nach Land verschiebbar.
    // text: 1 bis 2 Sätze Kernidee · formula: kurze Kernformel (HTML erlaubt) · visual: Schlüssel aus app/modules/topic-visuals.js
    var school = [
        // Klasse 1-2
        { id: "CM-S-01", band: "Klasse 1", grades: [1, 1], area: "Zahlen und Operationen", topic: "Plus und Minus bis 20", sections: ["1.1.1.a"], visual: "numberline",
          text: "Rechnen heißt Mengen zusammenlegen oder wegnehmen. Am Zahlenstrahl sind das Sprünge nach rechts oder links.", formula: "7 + 5 = 7 + 3 + 2 = 12" },
        { id: "CM-S-03", band: "Klasse 1–2", grades: [1, 2], area: "Raum und Form", topic: "Ebene Grundformen erkennen", sections: ["1.2.1.a"], visual: "shapes",
          text: "Kreis, Dreieck, Rechteck und Quadrat unterscheiden sich in Ecken, Seiten und Rundungen.", formula: ["Dreieck: 3 Ecken", "Viereck: 4 Ecken"] },
        { id: "CM-S-04", band: "Klasse 1–2", grades: [1, 2], area: "Muster und Strukturen", topic: "Muster und Zahlenfolgen", sections: ["1.1.1.a"], visual: "pattern",
          text: "Wer die Regel eines Musters erkennt, kann es beliebig weit fortsetzen.", formula: "2, 4, 6, 8, … (immer +2)",
          gap: "Eigene Sektion für Muster und Zahlenfolgen fehlt." },
        { id: "CM-S-02", band: "Klasse 1–2", grades: [1, 2], area: "Größen und Messen", topic: "Geld, Uhrzeit und Längen", sections: ["1.3.2.a"], visual: "clock",
          text: "Eine Größe besteht aus Zahl und Einheit. Wer die Umrechnung kennt, kann Größen vergleichen.", formula: ["1 h = 60 min", "1 € = 100 ct", "1 m = 100 cm"] },
        { id: "CM-S-48", band: "Klasse 2", grades: [2, 2], area: "Zahlen und Operationen", topic: "Zahlen bis 100 und Zehnerübergang", sections: ["1.1.1.a"], visual: "tens",
          text: "Bis 100 zählen Zehner und Einer. Über den nächsten Zehner rechnet man in zwei kleinen Schritten.", formula: "38 + 7 = 38 + 2 + 5 = 45" },
        { id: "CM-S-49", band: "Klasse 2", grades: [2, 2], area: "Zahlen und Operationen", topic: "Kleines Einmaleins", sections: ["1.1.1.a"], visual: "dots",
          text: "Malnehmen ist wiederholtes Addieren. Ein Punktefeld zeigt 3 · 4 als 3 Reihen mit je 4 Punkten.", formula: "3 · 4 = 4 + 4 + 4 = 12" },

        // Klasse 3-4
        { id: "CM-S-05", band: "Klasse 3", grades: [3, 3], area: "Zahlen und Operationen", topic: "Schriftlich addieren und subtrahieren", sections: ["1.1.1.b"], visual: "column",
          text: "Stellen untereinander schreiben, von rechts nach links rechnen und Überträge notieren.", formula: "456 + 278 = 734" },
        { id: "CM-S-06", band: "Klasse 3–4", grades: [3, 4], area: "Raum und Form", topic: "Umfang, Fläche und Symmetrie", sections: ["1.2.1.a", "1.2.4.a"], visual: "arearect",
          text: "Der Umfang ist der Weg um die Figur herum, die Fläche ist das, was sie bedeckt.", formula: ["U = 2 · (a + b)", "A = a · b"] },
        { id: "CM-S-08", band: "Klasse 3–4", grades: [3, 4], area: "Größen und Messen", topic: "Größen umrechnen", sections: ["1.3.2.b"], visual: "ruler",
          text: "Beim Umrechnen ändert sich die Zahl, die Größe selbst bleibt gleich.", formula: ["2,5 kg = 2500 g", "1 km = 1000 m"] },
        { id: "CM-S-10", band: "Klasse 3–4", grades: [3, 4], area: "Daten und Zufall", topic: "Sicher, möglich, unmöglich", sections: ["1.4.2.a"], visual: "dice",
          text: "Beim Zufall weiß man vorher nicht, was passiert, aber man kann sagen, wie wahrscheinlich es ist.", formula: "P(6 würfeln) = 1/6" },
        { id: "CM-S-50", band: "Klasse 4", grades: [4, 4], area: "Zahlen und Operationen", topic: "Schriftlich multiplizieren und dividieren", sections: ["1.1.1.b"], visual: "multiply",
          text: "Große Aufgaben werden in kleine Einmaleins-Schritte zerlegt und danach zusammengesetzt.", formula: "23 · 14 = 23 · 10 + 23 · 4 = 322" },
        { id: "CM-S-07", band: "Klasse 4", grades: [4, 4], area: "Raum und Form", topic: "Würfel und Quader", sections: ["1.2.2.a"], visual: "cube",
          text: "Ein Quader hat 8 Ecken, 12 Kanten und 6 Flächen. Sein Volumen zählt die Einheitswürfel darin.", formula: "V = a · b · c" },
        { id: "CM-S-09", band: "Klasse 4", grades: [4, 4], area: "Daten und Zufall", topic: "Daten in Diagrammen", sections: ["1.4.1.a"], visual: "bars",
          text: "Ein Diagramm macht Häufigkeiten auf einen Blick vergleichbar.", formula: "Säulenhöhe ∼ Anzahl" },

        // Klasse 5-6
        { id: "CM-S-11", band: "Klasse 5", grades: [5, 5], area: "Zahl", topic: "Teiler, Primzahlen, ggT und kgV", sections: ["1.1.5.a", "1.1.5.b"], visual: "primes",
          text: "Jede Zahl lässt sich eindeutig in Primfaktoren zerlegen. Daraus liest man ggT und kgV direkt ab.", formula: "60 = 2<sup>2</sup> · 3 · 5" },
        { id: "CM-S-14", band: "Klasse 5", grades: [5, 5], area: "Zahl", topic: "Runden und Überschlagen", sections: ["1.1.3.b"], visual: "round",
          text: "Ein Überschlag zeigt vorab, ob ein Ergebnis überhaupt stimmen kann.", formula: "398 · 21 ≈ 400 · 20 = 8000" },
        { id: "CM-S-16", band: "Klasse 5", grades: [5, 5], area: "Messen", topic: "Zusammengesetzte Flächen", sections: ["1.2.1.b", "1.2.2.a"], visual: "composite",
          text: "Komplizierte Figuren zerlegt man in Rechtecke und Dreiecke und addiert deren Flächen.", formula: "A = A<sub>1</sub> + A<sub>2</sub>" },
        { id: "CM-S-12", band: "Klasse 5–6", grades: [5, 6], area: "Zahl", topic: "Negative Zahlen", sections: ["1.1.4.a"], visual: "intline",
          text: "Links von der Null liegen die negativen Zahlen. Minus mal Minus ergibt Plus.", formula: ["−3 − 4 = −7", "(−2) · (−5) = 10"] },
        { id: "CM-S-15", band: "Klasse 5–6", grades: [5, 6], area: "Raum und Form", topic: "Winkel, Dreiecke und Koordinaten", sections: ["1.2.3.a", "1.2.3.b", "1.2.4.a"], visual: "angle",
          text: "Winkel misst man in Grad. In jedem Dreieck ergeben die drei Innenwinkel zusammen 180°.", formula: "α + β + γ = 180°" },
        { id: "CM-S-13", band: "Klasse 6", grades: [6, 6], area: "Zahl", topic: "Brüche und Dezimalzahlen", sections: ["1.1.2.a", "1.1.2.c", "1.1.3.a"], visual: "fraction",
          text: "Ein Bruch beschreibt Teile eines Ganzen. Vor dem Addieren macht man die Nenner gleich.", formula: "1/2 + 1/3 = 3/6 + 2/6 = 5/6" },
        { id: "CM-S-17", band: "Klasse 6", grades: [6, 6], area: "Daten und Zufall", topic: "Mittelwert und relative Häufigkeit", sections: ["1.4.1.b"], visual: "mean",
          text: "Der Mittelwert verteilt die Summe gleichmäßig auf alle Werte.", formula: "x̄ = (x<sub>1</sub> + … + x<sub>n</sub>) / n" },

        // Klasse 7-8
        { id: "CM-S-18", band: "Klasse 7", grades: [7, 7], area: "Funktionaler Zusammenhang", topic: "Zuordnungen und Dreisatz", sections: ["1.3.1.a", "1.3.1.b"], visual: "proportion",
          text: "Proportional: doppelt so viel kostet doppelt so viel. Antiproportional: doppelt so viele Helfer brauchen die halbe Zeit.", formula: ["y = k · x", "x · y = k"] },
        { id: "CM-S-19", band: "Klasse 7", grades: [7, 7], area: "Zahl", topic: "Prozent- und Zinsrechnung", sections: ["1.1.2.b"], visual: "percent",
          text: "Prozent heißt Hundertstel. Grundwert, Prozentsatz und Prozentwert hängen fest zusammen.", formula: "W = G · p / 100",
          gap: "Zinsrechnung und Zinseszins haben noch keine eigene Sektion." },
        { id: "CM-S-20", band: "Klasse 7–8", grades: [7, 8], area: "Zahl", topic: "Terme und lineare Gleichungen", sections: ["2.1.1.a", "2.1.1.b", "2.1.1.c"], visual: "balance",
          text: "Eine Gleichung ist eine Waage: Was man links tut, muss man auch rechts tun.", formula: "3x + 4 = 19 ⇒ x = 5" },
        { id: "CM-S-25", band: "Klasse 7–8", grades: [7, 8], area: "Daten und Zufall", topic: "Laplace-Wahrscheinlichkeit und Baumdiagramme", sections: ["2.6.2.a", "2.6.2.b"], visual: "tree",
          text: "Sind alle Ergebnisse gleich wahrscheinlich, teilt man günstige durch mögliche. Im Baum multipliziert man entlang der Pfade.", formula: "P = günstige / mögliche" },
        { id: "CM-S-21", band: "Klasse 8", grades: [8, 8], area: "Funktionaler Zusammenhang", topic: "Lineare Funktionen", sections: ["2.2.2.a", "2.2.2.b"], visual: "line",
          text: "Eine Gerade ist durch ihre Steigung m und den y-Achsenabschnitt t festgelegt.", formula: "y = m · x + t" },
        { id: "CM-S-22", band: "Klasse 8", grades: [8, 8], area: "Funktionaler Zusammenhang", topic: "Lineare Gleichungssysteme", sections: ["2.1.2.a"], visual: "system",
          text: "Zwei Gleichungen, zwei Geraden: Ihr Schnittpunkt erfüllt beide gleichzeitig.", formula: ["y = 2x + 1", "y = −x + 4", "⇒ S(1 | 3)"] },
        { id: "CM-S-23", band: "Klasse 8", grades: [8, 8], area: "Zahl", topic: "Lineare Ungleichungen", sections: ["2.1.4.a"], visual: "inequality",
          text: "Wie bei Gleichungen, nur: Beim Multiplizieren mit einer negativen Zahl dreht sich das Zeichen um.", formula: "−2x < 6 ⇒ x > −3" },
        { id: "CM-S-24", band: "Klasse 8", grades: [8, 8], area: "Messen", topic: "Kreisumfang und Kreisfläche", sections: ["2.5.2.a"], visual: "circle",
          text: "π ist das Verhältnis von Umfang zu Durchmesser und bei jedem Kreis gleich.", formula: ["U = 2πr", "A = πr<sup>2</sup>"] },

        // Klasse 9-10
        { id: "CM-S-26", band: "Klasse 9", grades: [9, 9], area: "Funktionaler Zusammenhang", topic: "Quadratische Funktionen und Gleichungen", sections: ["2.2.3.a", "2.2.3.b", "2.1.3.a", "2.1.3.b"], visual: "parabola",
          text: "Der Graph ist eine Parabel. Ihre Nullstellen liefert die Lösungsformel.", formula: "x = (−b ± √(b<sup>2</sup> − 4ac)) / 2a" },
        { id: "CM-S-27", band: "Klasse 9", grades: [9, 9], area: "Zahl", topic: "Potenzen und Wurzeln", sections: ["2.3.1.a", "2.3.1.b", "2.3.2.a", "2.3.2.b"], visual: "power",
          text: "Die Wurzel macht das Quadrieren rückgängig. Potenzgesetze sparen viel Schreibarbeit.", formula: ["a<sup>m</sup> · a<sup>n</sup> = a<sup>m+n</sup>", "√(a<sup>2</sup>) = |a|"] },
        { id: "CM-S-28", band: "Klasse 9", grades: [9, 9], area: "Raum und Form", topic: "Satz des Pythagoras und Satz des Thales", sections: ["2.5.3.a"], visual: "pythagoras",
          text: "Im rechtwinkligen Dreieck ist das Quadrat über der Hypotenuse so groß wie die beiden anderen zusammen.", formula: "a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup>" },
        { id: "CM-S-29", band: "Klasse 9", grades: [9, 9], area: "Raum und Form", topic: "Ähnlichkeit und Strahlensätze", sections: ["2.5.1.a", "2.5.1.b"], visual: "similar",
          text: "Parallele Geraden schneiden zwei Strahlen im gleichen Verhältnis.", formula: "a / a′ = b / b′" },
        { id: "CM-S-30", band: "Klasse 9–10", grades: [9, 10], area: "Messen", topic: "Trigonometrie im Dreieck", sections: ["2.4.1.a", "2.4.2.a"], visual: "trig",
          text: "Sinus, Kosinus und Tangens verbinden einen Winkel mit dem Verhältnis zweier Seiten.", formula: "sin α = Gegenkathete / Hypotenuse" },
        { id: "CM-S-35", band: "Klasse 9–10", grades: [9, 10], area: "Daten und Zufall", topic: "Kombinatorik", sections: ["2.6.1.a", "2.6.1.b", "2.6.2.b"], visual: "combinatorics",
          text: "Zählprinzip: Die Möglichkeiten jeder Stufe werden multipliziert.", formula: "3 Kugeln anordnen: 3! = 3 · 2 · 1 = 6" },
        { id: "CM-S-31", band: "Klasse 10", grades: [10, 10], area: "Funktionaler Zusammenhang", topic: "Sinusfunktion und Bogenmaß", sections: ["2.4.1.b", "2.4.3.a", "2.4.3.b"], visual: "sine",
          text: "Ein Punkt läuft auf dem Einheitskreis. Seine Höhe zeichnet die Sinuskurve.", formula: "x = α · π / 180°" },
        { id: "CM-S-32", band: "Klasse 10", grades: [10, 10], area: "Funktionaler Zusammenhang", topic: "Exponentialfunktionen und Logarithmus", sections: ["2.2.1.a", "2.2.1.b", "2.2.1.c", "2.3.3.a", "2.3.3.b"], visual: "exp",
          text: "Gleicher Faktor pro Zeitschritt bedeutet exponentielles Wachstum. Der Logarithmus fragt nach dem Exponenten.", formula: ["f(t) = a · b<sup>t</sup>", "log<sub>b</sub>(b<sup>x</sup>) = x"] },
        { id: "CM-S-33", band: "Klasse 10", grades: [10, 10], area: "Messen", topic: "Pyramide, Kegel und Kugel", sections: ["1.2.2.a"], visual: "solids",
          text: "Spitze Körper haben genau ein Drittel des Volumens eines Prismas mit gleicher Grundfläche und Höhe.", formula: ["V<sub>Pyramide</sub> = ⅓ · G · h", "V<sub>Kugel</sub> = 4/3 · πr<sup>3</sup>"],
          gap: "Pyramide, Kegel und Kugel fehlen, bisher nur Würfel, Quader und Zylinder." },
        { id: "CM-S-34", band: "Klasse 10", grades: [10, 10], area: "Raum und Form", topic: "Sehnen und Tangenten am Kreis", sections: ["2.5.2.b"], visual: "tangent",
          text: "Eine Tangente berührt den Kreis in genau einem Punkt und steht dort senkrecht auf dem Radius.", formula: "Tangente ⟂ Radius" },

        // Klasse 11-12 (Oberstufe)
        { id: "CM-S-36", band: "Klasse 11", grades: [11, 11], area: "Analysis", topic: "Ableitungen", sections: ["3.1.1.a", "3.1.1.b", "3.1.1.c"], visual: "derivative",
          text: "Die Ableitung ist die Steigung der Tangente, also die momentane Änderungsrate.", formula: "f′(x) = lim<sub>h→0</sub> (f(x+h) − f(x)) / h" },
        { id: "CM-S-37", band: "Klasse 11", grades: [11, 11], area: "Analysis", topic: "Kurvendiskussion und Optimierung", sections: ["3.1.2.a", "3.1.2.b"], visual: "extrema",
          text: "Wo f′ null wird und das Vorzeichen wechselt, liegt ein Hoch- oder Tiefpunkt.", formula: "f′(x<sub>0</sub>) = 0 und f″(x<sub>0</sub>) < 0 ⇒ Maximum" },
        { id: "CM-S-41", band: "Klasse 11", grades: [11, 11], area: "Stochastik", topic: "Bedingte Wahrscheinlichkeit", sections: ["3.2.1.a", "3.2.1.b"], visual: "bayes",
          text: "Zusätzliches Wissen verändert Wahrscheinlichkeiten. Die Vierfeldertafel macht das übersichtlich.", formula: "P(A | B) = P(A ∩ B) / P(B)" },
        { id: "CM-S-40", band: "Klasse 11", grades: [11, 11], area: "Analysis", topic: "Folgen und Grenzwerte", sections: ["3.1.5.a", "3.1.5.b"], optional: true, visual: "sequence",
          text: "Eine Folge kann sich einem Wert beliebig nähern, ohne ihn je zu erreichen.", formula: "a<sub>n</sub> = 1/n → 0" },
        { id: "CM-S-39", band: "Klasse 11–12", grades: [11, 12], area: "Analysis", topic: "e-Funktion und natürlicher Logarithmus", sections: ["3.1.4.a", "3.1.4.b"], visual: "efunc",
          text: "Die e-Funktion ist ihre eigene Ableitung. Der natürliche Logarithmus ist ihre Umkehrfunktion.", formula: ["(e<sup>x</sup>)′ = e<sup>x</sup>", "(ln x)′ = 1/x"] },
        { id: "CM-S-44", band: "Klasse 11–12", grades: [11, 12], area: "Analytische Geometrie", topic: "Vektoren, Geraden und Ebenen", sections: ["3.2.3.a", "3.2.3.b", "3.2.3.c"], visual: "vector",
          text: "Vektoren beschreiben Verschiebungen im Raum. Geraden und Ebenen entstehen aus einem Stützpunkt plus Richtungen.", formula: "g: <b>x</b> = <b>p</b> + r · <b>u</b>" },
        { id: "CM-S-46", band: "Klasse 11–12", grades: [11, 12], area: "Vertiefung", topic: "Komplexe Zahlen", sections: ["3.3.1.a", "3.3.1.b"], optional: true, visual: "complex",
          text: "Mit i<sup>2</sup> = −1 hat jede quadratische Gleichung Lösungen. Multiplizieren heißt drehen und strecken.", formula: "z = a + bi = r · e<sup>iφ</sup>" },
        { id: "CM-S-38", band: "Klasse 12", grades: [12, 12], area: "Analysis", topic: "Integralrechnung", sections: ["3.1.3.a", "3.1.3.b", "3.1.3.c", "3.1.3.d"], visual: "integral",
          text: "Das Integral summiert viele schmale Streifen zur Fläche unter der Kurve.", formula: "<span class='int'><span class='sym'>∫</span><span class='lim'><sup>b</sup><sub>a</sub></span></span> f(x) dx = F(b) − F(a)" },
        { id: "CM-S-42", band: "Klasse 12", grades: [12, 12], area: "Stochastik", topic: "Binomial- und Normalverteilung", sections: ["3.2.2.a", "3.2.2.b", "3.2.2.c"], visual: "normal",
          text: "Viele unabhängige Versuche ergeben zusammen eine Glockenkurve.", formula: "P(X = k) = (n über k) · p<sup>k</sup> · (1 − p)<sup>n−k</sup>" },
        { id: "CM-S-43", band: "Klasse 12", grades: [12, 12], area: "Stochastik", topic: "Hypothesentests", sections: ["3.2.2.a"], visual: "hypothesis",
          text: "Ein Test prüft, ob ein Ergebnis zu selten ist, um noch als Zufall durchzugehen.", formula: "α = P(Fehler 1. Art)",
          gap: "Signifikanztests haben auf L3 keine eigene Sektion (bisher nur L5 5.4.3.b)." },
        { id: "CM-S-45", band: "Klasse 12", grades: [12, 12], area: "Lineare Algebra", topic: "Matrizen und Übergangsprozesse", sections: ["3.4.1.a", "3.4.1.b"], optional: true, visual: "matrix",
          text: "Eine Matrix beschreibt, wie sich ein Zustand in einem Schritt verändert.", formula: "<b>x</b><sub>n+1</sub> = A · <b>x</b><sub>n</sub>" },
        { id: "CM-S-47", band: "Klasse 12", grades: [12, 12], area: "Vertiefung", topic: "Kegelschnitte", sections: ["3.5.1.a"], optional: true, visual: "conic",
          text: "Ellipse, Parabel und Hyperbel entstehen, wenn eine Ebene einen Kegel schneidet.", formula: "x<sup>2</sup>/a<sup>2</sup> + y<sup>2</sup>/b<sup>2</sup> = 1" }
    ];

    var engineering = [
        // Bachelor, Semester 1-2: Höhere Mathematik 1/2
        { id: "CM-E-01", band: "Bachelor 1.–2. Sem.", area: "Lineare Algebra", topic: "Matrizen, Determinanten und lineare Gleichungssysteme", sections: ["4.1.1.a"] },
        { id: "CM-E-02", band: "Bachelor 1.–2. Sem.", area: "Lineare Algebra", topic: "Vektorräume, Kern und Bild", sections: ["4.1.2.a", "4.1.2.b"] },
        { id: "CM-E-03", band: "Bachelor 1.–2. Sem.", area: "Lineare Algebra", topic: "Eigenwerte, Diagonalisierung und Spektralsatz", sections: ["4.1.1.b", "4.1.1.d"] },
        { id: "CM-E-04", band: "Bachelor 1.–2. Sem.", area: "Lineare Algebra", topic: "Orthogonalität, Gram-Schmidt und QR", sections: ["4.1.3.a", "4.1.3.b"] },
        { id: "CM-E-05", band: "Bachelor 1.–2. Sem.", area: "Analysis", topic: "Komplexe Zahlen", sections: ["3.3.1.a", "3.3.1.b", "4.4.1.a"], gap: "Komplexe Zahlen liegen bisher auf L3, eine L4-Sektion für Rechnen in C fehlt." },
        { id: "CM-E-06", band: "Bachelor 1.–2. Sem.", area: "Analysis", topic: "Folgen, Grenzwerte und Vollständigkeit", sections: ["4.2.1.a", "4.2.1.b"] },
        { id: "CM-E-07", band: "Bachelor 1.–2. Sem.", area: "Analysis", topic: "Reihen, Potenzreihen und Taylor", sections: ["4.2.2.a", "4.2.2.b", "4.2.2.c"] },
        { id: "CM-E-08", band: "Bachelor 1.–2. Sem.", area: "Analysis", topic: "Mehrdimensionale Differentialrechnung", sections: ["4.2.3.a", "4.2.3.b", "4.2.3.c"] },
        { id: "CM-E-09", band: "Bachelor 1.–2. Sem.", area: "Analysis", topic: "Uneigentliche Integrale", sections: ["4.2.4.a"] },
        { id: "CM-E-10", band: "Bachelor 1.–2. Sem.", area: "Analysis", topic: "Mehrfach-, Kurven- und Flächenintegrale", sections: ["4.2.4.b", "4.2.4.c"], gap: "Integralsätze von Gauß und Stokes fehlen als eigene Sektion." },
        { id: "CM-E-11", band: "Bachelor 1.–2. Sem.", area: "Differentialgleichungen", topic: "DGL 1. Ordnung", sections: ["4.3.1.a", "4.3.1.b"] },
        { id: "CM-E-12", band: "Bachelor 1.–2. Sem.", area: "Differentialgleichungen", topic: "Lineare DGL 2. Ordnung und Schwingungen", sections: ["4.3.2.a", "4.3.2.b"] },
        { id: "CM-E-13", band: "Bachelor 1.–2. Sem.", area: "Differentialgleichungen", topic: "DGL-Systeme und Anfangswertprobleme", sections: ["4.3.3.a", "4.1.1.c"] },

        // Bachelor, Semester 3-4: HM3, Numerik, Stochastik
        { id: "CM-E-14", band: "Bachelor 3.–4. Sem.", area: "Funktionentheorie", topic: "Holomorphe Funktionen und Cauchy-Integralsatz", sections: ["4.4.1.a", "4.4.1.b"] },
        { id: "CM-E-15", band: "Bachelor 3.–4. Sem.", area: "Numerik", topic: "Fehlerrechnung und Kondition", sections: ["4.5.1.a", "4.5.1.b"] },
        { id: "CM-E-16", band: "Bachelor 3.–4. Sem.", area: "Numerik", topic: "Nichtlineare Gleichungen: Newton und Fixpunkt", sections: ["4.5.2.a", "4.5.2.b"] },
        { id: "CM-E-17", band: "Bachelor 3.–4. Sem.", area: "Numerik", topic: "Numerische Integration", sections: ["5.3.1.a", "5.3.1.b"] },
        { id: "CM-E-18", band: "Bachelor 3.–4. Sem.", area: "Numerik", topic: "LU-Zerlegung und iterative Löser", sections: ["5.3.2.a", "5.3.2.b"] },
        { id: "CM-E-19", band: "Bachelor 3.–4. Sem.", area: "Numerik", topic: "Euler, Runge-Kutta und Schrittweitensteuerung", sections: ["5.3.3.a", "5.3.3.b"] },
        { id: "CM-E-20", band: "Bachelor 3.–4. Sem.", area: "Stochastik", topic: "Stetige Verteilungen und zentraler Grenzwertsatz", sections: ["5.4.1.a", "5.4.1.b"] },
        { id: "CM-E-21", band: "Bachelor 3.–4. Sem.", area: "Stochastik", topic: "Schätzer, Konfidenzintervalle und Tests", sections: ["5.4.3.a", "5.4.3.b"] },

        // Bachelor, Vertiefung: Signale, Systeme, Regelung, PDE
        { id: "CM-E-22", band: "Bachelor Vertiefung", area: "Signale und Systeme", topic: "Fourierreihen und Fouriertransformation", sections: ["5.1.1.d", "5.1.1.a"] },
        { id: "CM-E-23", band: "Bachelor Vertiefung", area: "Signale und Systeme", topic: "Laplace-Transformation und Rücktransformation", sections: ["5.1.1.b", "5.1.2.a", "5.1.2.b"] },
        { id: "CM-E-24", band: "Bachelor Vertiefung", area: "Signale und Systeme", topic: "DFT und FFT", sections: ["5.1.1.c"] },
        { id: "CM-E-25", band: "Bachelor Vertiefung", area: "Signale und Systeme", topic: "Abtastung und Z-Transformation", sections: ["5.1.4.a", "5.1.4.b", "5.1.3.a", "5.1.3.b"] },
        { id: "CM-E-26", band: "Bachelor Vertiefung", area: "Regelungstechnik", topic: "Übertragungsfunktionen und Blockschaltbilder", sections: ["5.2.1.a", "5.2.1.b"] },
        { id: "CM-E-27", band: "Bachelor Vertiefung", area: "Regelungstechnik", topic: "Stabilität: Hurwitz, Nyquist und Bode", sections: ["5.2.2.a", "5.2.2.b", "5.2.2.c"] },
        { id: "CM-E-28", band: "Bachelor Vertiefung", area: "Regelungstechnik", topic: "PID-Reglerentwurf", sections: ["5.2.3.a", "5.2.3.b"] },
        { id: "CM-E-29", band: "Bachelor Vertiefung", area: "Partielle DGL", topic: "Wellen-, Wärmeleitungs- und Laplace-Gleichung", sections: ["5.5.1.a", "5.5.1.b", "5.5.1.c"] },

        // Master
        { id: "CM-E-30", band: "Master", area: "Regelungstechnik", topic: "Zustandsraum, Steuerbarkeit und Beobachter", sections: ["5.2.4.a"], gap: "Beobachterentwurf und LQR fehlen als eigene Sektionen." },
        { id: "CM-E-31", band: "Master", area: "Stochastik", topic: "Markov-Ketten und Poisson-Prozesse", sections: ["5.4.2.a", "5.4.2.b"] },
        { id: "CM-E-32", band: "Master", area: "Numerische lineare Algebra", topic: "Singulärwertzerlegung und Krylov-Verfahren", sections: ["4.1.3.b", "5.3.2.b"], gap: "SVD und Krylov-Verfahren haben noch keine eigenen Sektionen." },
        { id: "CM-E-33", band: "Master", area: "Optimierung", topic: "Nichtlineare Optimierung und Gradientenverfahren", sections: ["4.2.3.c"], gap: "Auf L5 fehlt eine Optimierungssektion (konvexe Optimierung bisher nur L6 6.2.2)." },
        { id: "CM-E-34", band: "Master", area: "Variationsrechnung", topic: "Euler-Lagrange-Gleichung und schwache Formulierung", sections: ["5.5.1.c"], gap: "Variationsrechnung fehlt als Sektion zwischen PDE-Einstieg (L5) und FEM (L6)." }
    ];

    // ---------- English (applied when the site language is English) ----------
    var EN_AREA = {
        "Zahlen und Operationen": "Numbers and operations", "Raum und Form": "Space and shape", "Muster und Strukturen": "Patterns and structures",
        "Größen und Messen": "Quantities and measurement", "Daten und Zufall": "Data and chance", "Zahl": "Number", "Messen": "Measurement",
        "Funktionaler Zusammenhang": "Functions", "Analysis": "Calculus", "Stochastik": "Probability and statistics", "Analytische Geometrie": "Analytic geometry",
        "Vertiefung": "Advanced topics", "Lineare Algebra": "Linear algebra", "Differentialgleichungen": "Differential equations", "Funktionentheorie": "Complex analysis",
        "Numerik": "Numerical methods", "Signale und Systeme": "Signals and systems", "Regelungstechnik": "Control engineering", "Partielle DGL": "Partial differential equations",
        "Numerische lineare Algebra": "Numerical linear algebra", "Optimierung": "Optimisation", "Variationsrechnung": "Calculus of variations"
    };
    var EN_BAND = function (b) {
        return String(b).replace(/^Klasse /, "Grade ").replace("Bachelor 1.–2. Sem.", "Bachelor semesters 1–2").replace("Bachelor 3.–4. Sem.", "Bachelor semesters 3–4").replace("Bachelor Vertiefung", "Bachelor advanced");
    };
    var EN = {
        "CM-S-01": ["Addition and subtraction to 20", "Calculating means putting amounts together or taking them away. On the number line these are jumps to the right or to the left."],
        "CM-S-03": ["Recognising basic plane shapes", "Circle, triangle, rectangle and square differ in their corners, sides and curves.", ["Triangle: 3 corners", "Quadrilateral: 4 corners"]],
        "CM-S-04": ["Patterns and sequences", "If you spot the rule of a pattern, you can continue it as far as you like.", "2, 4, 6, 8, … (always +2)", "A separate section for patterns and sequences is missing."],
        "CM-S-02": ["Money, time and length", "A quantity consists of a number and a unit. If you know how to convert, you can compare quantities.", ["1 h = 60 min", "1 € = 100 ct", "1 m = 100 cm"]],
        "CM-S-48": ["Numbers to 100 and bridging ten", "Up to 100 you count tens and ones. To go past the next ten you work in two small steps."],
        "CM-S-49": ["Times tables", "Multiplying is repeated adding. A dot pattern shows 3 · 4 as 3 rows with 4 dots each."],
        "CM-S-05": ["Column addition and subtraction", "Write the place values under each other, work from right to left and note the carries."],
        "CM-S-06": ["Perimeter, area and symmetry", "The perimeter is the distance around the figure, the area is what it covers.", ["P = 2 · (a + b)", "A = a · b"]],
        "CM-S-08": ["Converting units", "When you convert, the number changes but the quantity itself stays the same.", ["2.5 kg = 2500 g", "1 km = 1000 m"]],
        "CM-S-10": ["Certain, possible, impossible", "With chance you do not know in advance what happens, but you can say how likely it is.", "P(rolling a 6) = 1/6"],
        "CM-S-50": ["Long multiplication and division", "Big calculations are split into small times-table steps and then put back together."],
        "CM-S-07": ["Cubes and cuboids", "A cuboid has 8 corners, 12 edges and 6 faces. Its volume counts the unit cubes inside it."],
        "CM-S-09": ["Data in charts", "A chart lets you compare frequencies at a glance.", "bar height ∼ count"],
        "CM-S-11": ["Divisors, primes, GCD and LCM", "Every number can be split into prime factors in exactly one way. From that you read off the GCD and LCM directly."],
        "CM-S-14": ["Rounding and estimating", "An estimate shows in advance whether a result can be right at all."],
        "CM-S-16": ["Composite areas", "Complicated figures are split into rectangles and triangles whose areas are then added."],
        "CM-S-12": ["Negative numbers", "To the left of zero lie the negative numbers. Minus times minus gives plus."],
        "CM-S-15": ["Angles, triangles and coordinates", "Angles are measured in degrees. In every triangle the three interior angles add up to 180°."],
        "CM-S-13": ["Fractions and decimals", "A fraction describes parts of a whole. Before adding you make the denominators equal."],
        "CM-S-17": ["Mean and relative frequency", "The mean shares the total out evenly over all values."],
        "CM-S-18": ["Proportions and the rule of three", "Proportional: twice as much costs twice as much. Inversely proportional: twice as many helpers need half the time."],
        "CM-S-19": ["Percentages and interest", "Percent means hundredths. Base value, percentage rate and percentage value are tightly linked.", "P = B · p / 100", "Interest and compound interest have no section of their own yet."],
        "CM-S-20": ["Expressions and linear equations", "An equation is a balance: whatever you do on the left, you must also do on the right."],
        "CM-S-25": ["Laplace probability and tree diagrams", "If all outcomes are equally likely, divide favourable by possible outcomes. In a tree you multiply along the paths.", "P = favourable / possible"],
        "CM-S-21": ["Linear functions", "A straight line is fixed by its gradient m and its y-intercept t."],
        "CM-S-22": ["Systems of linear equations", "Two equations, two lines: their intersection satisfies both at once."],
        "CM-S-23": ["Linear inequalities", "As with equations, except: multiplying by a negative number flips the sign."],
        "CM-S-24": ["Circumference and area of a circle", "π is the ratio of circumference to diameter and is the same for every circle.", ["C = 2πr", "A = πr<sup>2</sup>"]],
        "CM-S-26": ["Quadratic functions and equations", "The graph is a parabola. The quadratic formula gives its zeros."],
        "CM-S-27": ["Powers and roots", "The square root undoes squaring. The laws of exponents save a lot of writing."],
        "CM-S-28": ["Pythagoras' and Thales' theorems", "In a right-angled triangle the square on the hypotenuse is as large as the other two together."],
        "CM-S-29": ["Similarity and intercept theorems", "Parallel lines cut two rays in the same ratio."],
        "CM-S-30": ["Trigonometry in triangles", "Sine, cosine and tangent link an angle to the ratio of two sides.", "sin α = opposite / hypotenuse"],
        "CM-S-35": ["Combinatorics", "Counting principle: the options at each stage are multiplied.", "Arranging 3 balls: 3! = 3 · 2 · 1 = 6"],
        "CM-S-31": ["Sine function and radians", "A point runs around the unit circle. Its height traces the sine curve."],
        "CM-S-32": ["Exponential functions and logarithms", "The same factor per time step means exponential growth. The logarithm asks for the exponent."],
        "CM-S-33": ["Pyramid, cone and sphere", "Pointed solids have exactly one third of the volume of a prism with the same base and height.", ["V<sub>pyramid</sub> = ⅓ · B · h", "V<sub>sphere</sub> = 4/3 · πr<sup>3</sup>"], "Pyramid, cone and sphere are missing, so far only cube, cuboid and cylinder."],
        "CM-S-34": ["Chords and tangents of a circle", "A tangent touches the circle at exactly one point and is perpendicular to the radius there.", "tangent ⟂ radius"],
        "CM-S-36": ["Derivatives", "The derivative is the gradient of the tangent, i.e. the instantaneous rate of change."],
        "CM-S-37": ["Curve sketching and optimisation", "Where f′ becomes zero and changes sign, there is a maximum or a minimum.", "f′(x<sub>0</sub>) = 0 and f″(x<sub>0</sub>) < 0 ⇒ maximum"],
        "CM-S-41": ["Conditional probability", "Extra knowledge changes probabilities. A two-way table keeps it clear."],
        "CM-S-40": ["Sequences and limits", "A sequence can get as close as you like to a value without ever reaching it."],
        "CM-S-39": ["The exponential function and natural logarithm", "The exponential function is its own derivative. The natural logarithm is its inverse."],
        "CM-S-44": ["Vectors, lines and planes", "Vectors describe shifts in space. Lines and planes are built from a point plus directions."],
        "CM-S-46": ["Complex numbers", "With i<sup>2</sup> = −1 every quadratic equation has solutions. Multiplying means rotating and stretching."],
        "CM-S-38": ["Integral calculus", "The integral adds up many thin strips to give the area under the curve."],
        "CM-S-42": ["Binomial and normal distribution", "Many independent trials together give a bell curve.", "P(X = k) = (n choose k) · p<sup>k</sup> · (1 − p)<sup>n−k</sup>"],
        "CM-S-43": ["Hypothesis tests", "A test checks whether a result is too rare to still count as chance.", "α = P(type I error)", "Significance tests have no section of their own on L3 (so far only L5 5.4.3.b)."],
        "CM-S-45": ["Matrices and transition processes", "A matrix describes how a state changes in one step."],
        "CM-S-47": ["Conic sections", "Ellipse, parabola and hyperbola appear when a plane cuts a cone."],
        "CM-E-01": ["Matrices, determinants and linear systems"], "CM-E-02": ["Vector spaces, kernel and image"], "CM-E-03": ["Eigenvalues, diagonalisation and the spectral theorem"],
        "CM-E-04": ["Orthogonality, Gram-Schmidt and QR"], "CM-E-05": ["Complex numbers", null, null, "Complex numbers are so far on L3, an L4 section on calculating in C is missing."],
        "CM-E-06": ["Sequences, limits and completeness"], "CM-E-07": ["Series, power series and Taylor"], "CM-E-08": ["Multivariable differential calculus"],
        "CM-E-09": ["Improper integrals"], "CM-E-10": ["Multiple, line and surface integrals", null, null, "The integral theorems of Gauss and Stokes are missing as a section."],
        "CM-E-11": ["First-order ODEs"], "CM-E-12": ["Second-order linear ODEs and oscillations"], "CM-E-13": ["Systems of ODEs and initial value problems"],
        "CM-E-14": ["Holomorphic functions and Cauchy's integral theorem"], "CM-E-15": ["Error analysis and conditioning"], "CM-E-16": ["Nonlinear equations: Newton and fixed point"],
        "CM-E-17": ["Numerical integration"], "CM-E-18": ["LU decomposition and iterative solvers"], "CM-E-19": ["Euler, Runge-Kutta and step size control"],
        "CM-E-20": ["Continuous distributions and the central limit theorem"], "CM-E-21": ["Estimators, confidence intervals and tests"], "CM-E-22": ["Fourier series and Fourier transform"],
        "CM-E-23": ["Laplace transform and inverse transform"], "CM-E-24": ["DFT and FFT"], "CM-E-25": ["Sampling and the z-transform"],
        "CM-E-26": ["Transfer functions and block diagrams"], "CM-E-27": ["Stability: Hurwitz, Nyquist and Bode"], "CM-E-28": ["PID controller design"],
        "CM-E-29": ["Wave, heat and Laplace equations"], "CM-E-30": ["State space, controllability and observers", null, null, "Observer design and LQR are missing as sections."],
        "CM-E-31": ["Markov chains and Poisson processes"], "CM-E-32": ["Singular value decomposition and Krylov methods", null, null, "SVD and Krylov methods have no sections of their own yet."],
        "CM-E-33": ["Nonlinear optimisation and gradient methods", null, null, "An optimisation section is missing on L5 (convex optimisation so far only on L6 6.2.2)."],
        "CM-E-34": ["Euler-Lagrange equation and weak formulation", null, null, "Calculus of variations is missing as a section between the PDE introduction (L5) and FEM (L6)."]
    };
    var isEn = root.SOR_I18N ? root.SOR_I18N.lang === "en" : (typeof process !== "undefined" && process.env && process.env.SOR_LANG === "en");
    if (isEn) {
        school.concat(engineering).forEach(function (e) {
            var x = EN[e.id];
            e.band = EN_BAND(e.band); e.area = EN_AREA[e.area] || e.area;
            if (!x) return;
            e.topic = x[0];
            if (x[1]) e.text = x[1];
            if (x[2]) e.formula = x[2];
            if (x[3]) e.gap = x[3];
        });
    }

    // Link in die Mathe-App: startet eine Lektion (5 Aufgaben) aus den Archiv-Sektionen des Themas.
    // taskCount: { sublevelId: Anzahl } oder null; returnTo: relative Seite im App-Ordner für den Rücksprung.
    function practiceHref(entry, taskCount, returnTo) {
        var levelOf = function (id) { return Number(String(id).split(".")[0]); };
        var level = levelOf(entry.sections[0]);
        var secs = entry.sections.filter(function (id) { return levelOf(id) === level; });
        var withTasks = taskCount ? secs.filter(function (id) { return (taskCount[id] || 0) > 0; }) : secs;
        if (!withTasks.length) return null;
        var q = [
            ["level", String(level)],
            ["roadLesson", "thema-" + entry.id],
            ["roadSection", withTasks[0].split(".").slice(0, 2).join(".")],
            ["roadSublevel", withTasks[0]],
            ["roadSublevels", withTasks.join(",")],
            ["roadTopic", entry.topic],
            ["roadMode", "lesson"]
        ];
        if (returnTo) q.push(["roadReturn", returnTo]);
        return "index.html?" + q.map(function (p) { return p[0] + "=" + encodeURIComponent(p[1]); }).join("&") + "#level-" + level;
    }

    function topicForSublevel(sublevel) {
        var hit = null;
        school.forEach(function (e) {
            if (hit) return;
            if (e.sections.some(function (id) { return sublevel === id || String(sublevel).indexOf(id + ".") === 0; })) hit = e;
        });
        return hit;
    }

    var api = {
        practiceHref: practiceHref,
        topicForSublevel: topicForSublevel,
        version: "1.1.0",
        sources: [
            "KMK-Bildungsstandards Mathematik: Primarbereich, Mittlerer Schulabschluss, Allgemeine Hochschulreife (Leitideen als Orientierung)",
            "Typische Modulfolge ingenieurwissenschaftlicher Studiengänge (Höhere Mathematik 1–3, Numerik, Stochastik, Signale, Regelungstechnik)"
        ],
        school: school,
        engineering: engineering
    };

    root.SOR_COVERAGE = api;
    if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
