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
 *  gap       optional: was im Archiv noch fehlt (Status wird dann "Lücke"
 *            oder "teilweise", je nachdem ob sections passend sind)
 *  optional  true, wenn das Thema nur in manchen Ländern/Kursen vorkommt
 *
 * Der Abdeckungsstatus wird NICHT hier gepflegt, sondern von
 * tools/coverage-qa.js aus Taxonomie und Aufgabenzahl berechnet.
 */
(function (root) {
    var school = [
        // Klasse 1-2
        { id: "CM-S-01", band: "Klasse 1–2", grades: [1, 2], area: "Zahlen und Operationen", topic: "Zahlenraum bis 100, Addition und Subtraktion", sections: ["1.1.1.a"] },
        { id: "CM-S-02", band: "Klasse 1–2", grades: [1, 2], area: "Größen und Messen", topic: "Geld, Uhrzeit und Längen", sections: ["1.3.2.a"] },
        { id: "CM-S-03", band: "Klasse 1–2", grades: [1, 2], area: "Raum und Form", topic: "Ebene Grundformen erkennen", sections: ["1.2.1.a"] },
        { id: "CM-S-04", band: "Klasse 1–2", grades: [1, 2], area: "Muster und Strukturen", topic: "Zahlenfolgen und Muster fortsetzen", sections: ["1.1.1.a"], gap: "Eigene Sektion für Muster und Zahlenfolgen fehlt." },

        // Klasse 3-4
        { id: "CM-S-05", band: "Klasse 3–4", grades: [3, 4], area: "Zahlen und Operationen", topic: "Einmaleins und schriftliche Rechenverfahren", sections: ["1.1.1.a", "1.1.1.b"] },
        { id: "CM-S-06", band: "Klasse 3–4", grades: [3, 4], area: "Raum und Form", topic: "Umfang, Fläche und Achsensymmetrie", sections: ["1.2.1.a", "1.2.4.a"] },
        { id: "CM-S-07", band: "Klasse 3–4", grades: [3, 4], area: "Raum und Form", topic: "Würfel und Quader", sections: ["1.2.2.a"] },
        { id: "CM-S-08", band: "Klasse 3–4", grades: [3, 4], area: "Größen und Messen", topic: "Größen umrechnen", sections: ["1.3.2.b"] },
        { id: "CM-S-09", band: "Klasse 3–4", grades: [3, 4], area: "Daten und Zufall", topic: "Daten erfassen und in Diagrammen darstellen", sections: ["1.4.1.a"] },
        { id: "CM-S-10", band: "Klasse 3–4", grades: [3, 4], area: "Daten und Zufall", topic: "Sicher, möglich, unmöglich", sections: ["1.4.2.a"] },

        // Klasse 5-6
        { id: "CM-S-11", band: "Klasse 5–6", grades: [5, 6], area: "Zahl", topic: "Teilbarkeit, Primzahlen, ggT und kgV", sections: ["1.1.5.a", "1.1.5.b"] },
        { id: "CM-S-12", band: "Klasse 5–6", grades: [5, 6], area: "Zahl", topic: "Negative Zahlen", sections: ["1.1.4.a"] },
        { id: "CM-S-13", band: "Klasse 5–6", grades: [5, 6], area: "Zahl", topic: "Brüche und Dezimalzahlen", sections: ["1.1.2.a", "1.1.2.c", "1.1.3.a"] },
        { id: "CM-S-14", band: "Klasse 5–6", grades: [5, 6], area: "Zahl", topic: "Runden und Überschlagen", sections: ["1.1.3.b"] },
        { id: "CM-S-15", band: "Klasse 5–6", grades: [5, 6], area: "Raum und Form", topic: "Winkel, Dreiecke und Koordinatensystem", sections: ["1.2.3.a", "1.2.3.b", "1.2.4.a"] },
        { id: "CM-S-16", band: "Klasse 5–6", grades: [5, 6], area: "Messen", topic: "Zusammengesetzte Flächen und Quadervolumen", sections: ["1.2.1.b", "1.2.2.a"] },
        { id: "CM-S-17", band: "Klasse 5–6", grades: [5, 6], area: "Daten und Zufall", topic: "Mittelwert und relative Häufigkeit", sections: ["1.4.1.b"] },

        // Klasse 7-8
        { id: "CM-S-18", band: "Klasse 7–8", grades: [7, 8], area: "Funktionaler Zusammenhang", topic: "Proportionale und antiproportionale Zuordnungen", sections: ["1.3.1.a", "1.3.1.b"] },
        { id: "CM-S-19", band: "Klasse 7–8", grades: [7, 8], area: "Zahl", topic: "Prozent- und Zinsrechnung", sections: ["1.1.2.b"], gap: "Zinsrechnung und Zinseszins haben noch keine eigene Sektion." },
        { id: "CM-S-20", band: "Klasse 7–8", grades: [7, 8], area: "Zahl", topic: "Terme und lineare Gleichungen", sections: ["2.1.1.a", "2.1.1.b", "2.1.1.c"] },
        { id: "CM-S-21", band: "Klasse 7–8", grades: [7, 8], area: "Funktionaler Zusammenhang", topic: "Lineare Funktionen", sections: ["2.2.2.a", "2.2.2.b"] },
        { id: "CM-S-22", band: "Klasse 7–8", grades: [7, 8], area: "Funktionaler Zusammenhang", topic: "Lineare Gleichungssysteme", sections: ["2.1.2.a"] },
        { id: "CM-S-23", band: "Klasse 7–8", grades: [7, 8], area: "Zahl", topic: "Lineare Ungleichungen", sections: ["2.1.4.a"] },
        { id: "CM-S-24", band: "Klasse 7–8", grades: [7, 8], area: "Messen", topic: "Kreisumfang und Kreisfläche", sections: ["2.5.2.a"] },
        { id: "CM-S-25", band: "Klasse 7–8", grades: [7, 8], area: "Daten und Zufall", topic: "Laplace-Wahrscheinlichkeit und Baumdiagramme", sections: ["2.6.2.a", "2.6.2.b"] },

        // Klasse 9-10
        { id: "CM-S-26", band: "Klasse 9–10", grades: [9, 10], area: "Funktionaler Zusammenhang", topic: "Quadratische Funktionen und Gleichungen", sections: ["2.2.3.a", "2.2.3.b", "2.1.3.a", "2.1.3.b"] },
        { id: "CM-S-27", band: "Klasse 9–10", grades: [9, 10], area: "Zahl", topic: "Potenzen und Wurzeln", sections: ["2.3.1.a", "2.3.1.b", "2.3.2.a", "2.3.2.b"] },
        { id: "CM-S-28", band: "Klasse 9–10", grades: [9, 10], area: "Raum und Form", topic: "Satz des Pythagoras und Satz des Thales", sections: ["2.5.3.a"] },
        { id: "CM-S-29", band: "Klasse 9–10", grades: [9, 10], area: "Raum und Form", topic: "Ähnlichkeit und Strahlensätze", sections: ["2.5.1.a", "2.5.1.b"] },
        { id: "CM-S-30", band: "Klasse 9–10", grades: [9, 10], area: "Messen", topic: "Trigonometrie im Dreieck", sections: ["2.4.1.a", "2.4.2.a"] },
        { id: "CM-S-31", band: "Klasse 9–10", grades: [9, 10], area: "Funktionaler Zusammenhang", topic: "Trigonometrische Funktionen und Bogenmaß", sections: ["2.4.1.b", "2.4.3.a", "2.4.3.b"] },
        { id: "CM-S-32", band: "Klasse 9–10", grades: [9, 10], area: "Funktionaler Zusammenhang", topic: "Exponentialfunktionen und Logarithmus", sections: ["2.2.1.a", "2.2.1.b", "2.2.1.c", "2.3.3.a", "2.3.3.b"] },
        { id: "CM-S-33", band: "Klasse 9–10", grades: [9, 10], area: "Messen", topic: "Prisma, Pyramide, Kegel und Kugel", sections: ["1.2.2.a"], gap: "Pyramide, Kegel und Kugel fehlen, bisher nur Würfel, Quader und Zylinder." },
        { id: "CM-S-34", band: "Klasse 9–10", grades: [9, 10], area: "Raum und Form", topic: "Sehnen und Tangenten am Kreis", sections: ["2.5.2.b"] },
        { id: "CM-S-35", band: "Klasse 9–10", grades: [9, 10], area: "Daten und Zufall", topic: "Kombinatorik und mehrstufige Zufallsexperimente", sections: ["2.6.1.a", "2.6.1.b", "2.6.2.b"] },

        // Klasse 11-12 (Oberstufe)
        { id: "CM-S-36", band: "Klasse 11–12", grades: [11, 12], area: "Analysis", topic: "Ableitungsregeln, Monotonie und Krümmung", sections: ["3.1.1.a", "3.1.1.b", "3.1.1.c"] },
        { id: "CM-S-37", band: "Klasse 11–12", grades: [11, 12], area: "Analysis", topic: "Kurvendiskussion und Optimierung", sections: ["3.1.2.a", "3.1.2.b"] },
        { id: "CM-S-38", band: "Klasse 11–12", grades: [11, 12], area: "Analysis", topic: "Integralrechnung", sections: ["3.1.3.a", "3.1.3.b", "3.1.3.c", "3.1.3.d"] },
        { id: "CM-S-39", band: "Klasse 11–12", grades: [11, 12], area: "Analysis", topic: "e-Funktion und natürlicher Logarithmus", sections: ["3.1.4.a", "3.1.4.b"] },
        { id: "CM-S-40", band: "Klasse 11–12", grades: [11, 12], area: "Analysis", topic: "Folgen und Grenzwerte", sections: ["3.1.5.a", "3.1.5.b"], optional: true },
        { id: "CM-S-41", band: "Klasse 11–12", grades: [11, 12], area: "Stochastik", topic: "Bedingte Wahrscheinlichkeit und Vierfeldertafel", sections: ["3.2.1.a", "3.2.1.b"] },
        { id: "CM-S-42", band: "Klasse 11–12", grades: [11, 12], area: "Stochastik", topic: "Binomial- und Normalverteilung", sections: ["3.2.2.a", "3.2.2.b", "3.2.2.c"] },
        { id: "CM-S-43", band: "Klasse 11–12", grades: [11, 12], area: "Stochastik", topic: "Hypothesentests", sections: ["3.2.2.a"], gap: "Signifikanztests haben auf L3 keine eigene Sektion (bisher nur L5 5.4.3.b)." },
        { id: "CM-S-44", band: "Klasse 11–12", grades: [11, 12], area: "Analytische Geometrie", topic: "Vektoren, Geraden, Ebenen und Abstände", sections: ["3.2.3.a", "3.2.3.b", "3.2.3.c"] },
        { id: "CM-S-45", band: "Klasse 11–12", grades: [11, 12], area: "Lineare Algebra", topic: "Matrizen und Übergangsprozesse", sections: ["3.4.1.a", "3.4.1.b"], optional: true },
        { id: "CM-S-46", band: "Klasse 11–12", grades: [11, 12], area: "Vertiefung", topic: "Komplexe Zahlen", sections: ["3.3.1.a", "3.3.1.b"], optional: true },
        { id: "CM-S-47", band: "Klasse 11–12", grades: [11, 12], area: "Vertiefung", topic: "Kegelschnitte", sections: ["3.5.1.a"], optional: true }
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

    var api = {
        version: "1.0.0",
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
