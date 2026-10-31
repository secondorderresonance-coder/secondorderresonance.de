# Coverage-Matrix

Automatisch erzeugt mit `node tools/coverage-qa.js --write`. Quelle: `app/data/coverage-matrix.js`.

Orientierung (kein amtlicher Abgleich eines einzelnen Bundeslands):
- KMK-Bildungsstandards Mathematik: Primarbereich, Mittlerer Schulabschluss, Allgemeine Hochschulreife (Leitideen als Orientierung)
- Typische Modulfolge ingenieurwissenschaftlicher Studiengänge (Höhere Mathematik 1–3, Numerik, Stochastik, Signale, Regelungstechnik)

Statuslogik:
- **abgedeckt**: alle zugeordneten Sektionen existieren und enthalten Aufgaben
- **teilweise**: inhaltliche Lücke dokumentiert oder nur ein Teil der Sektionen hat Aufgaben
- **ohne Aufgaben**: Sektionen existieren in der Taxonomie, haben aber noch keine direkt zugeordnete Aufgabe

## Schule: Klasse 1–12 → L1–L3

Abgedeckt 42 · teilweise 4 · ohne Aufgaben 1 (von 47)

| ID | Phase | Bereich | Thema | Archiv-Sektionen | Aufgaben | Status | Hinweis |
|---|---|---|---|---|---:|---|---|
| CM-S-01 | Klasse 1–2 | Zahlen und Operationen | Zahlenraum bis 100, Addition und Subtraktion | 1.1.1.a Kopfrechnen und Rechenstrategien | 119 | abgedeckt |  |
| CM-S-02 | Klasse 1–2 | Größen und Messen | Geld, Uhrzeit und Längen | 1.3.2.a Länge, Masse, Zeit, Volumen | 119 | abgedeckt |  |
| CM-S-03 | Klasse 1–2 | Raum und Form | Ebene Grundformen erkennen | 1.2.1.a Rechteck, Dreieck, Kreis | 119 | abgedeckt |  |
| CM-S-04 | Klasse 1–2 | Muster und Strukturen | Zahlenfolgen und Muster fortsetzen | 1.1.1.a Kopfrechnen und Rechenstrategien | 119 | teilweise | Eigene Sektion für Muster und Zahlenfolgen fehlt. |
| CM-S-05 | Klasse 3–4 | Zahlen und Operationen | Einmaleins und schriftliche Rechenverfahren | 1.1.1.a Kopfrechnen und Rechenstrategien<br>1.1.1.b Schriftliches Rechnen | 238 | abgedeckt |  |
| CM-S-06 | Klasse 3–4 | Raum und Form | Umfang, Fläche und Achsensymmetrie | 1.2.1.a Rechteck, Dreieck, Kreis<br>1.2.4.a Punkte, Abstände, Spiegelung | 238 | abgedeckt |  |
| CM-S-07 | Klasse 3–4 | Raum und Form | Würfel und Quader | 1.2.2.a Würfel, Quader, Zylinder | 119 | abgedeckt |  |
| CM-S-08 | Klasse 3–4 | Größen und Messen | Größen umrechnen | 1.3.2.b Einheiten umrechnen | 119 | abgedeckt |  |
| CM-S-09 | Klasse 3–4 | Daten und Zufall | Daten erfassen und in Diagrammen darstellen | 1.4.1.a Balken- und Kreisdiagramme | 119 | abgedeckt |  |
| CM-S-10 | Klasse 3–4 | Daten und Zufall | Sicher, möglich, unmöglich | 1.4.2.a Einfache Zufallsexperimente | 119 | abgedeckt |  |
| CM-S-11 | Klasse 5–6 | Zahl | Teilbarkeit, Primzahlen, ggT und kgV | 1.1.5.a Primfaktorzerlegung<br>1.1.5.b ggT und kgV | 357 | abgedeckt |  |
| CM-S-12 | Klasse 5–6 | Zahl | Negative Zahlen | 1.1.4.a Rechnen mit negativen Zahlen | 238 | abgedeckt |  |
| CM-S-13 | Klasse 5–6 | Zahl | Brüche und Dezimalzahlen | 1.1.2.a Brüche addieren und kürzen<br>1.1.2.c Brüche multiplizieren und dividieren<br>1.1.3.a Dezimalzahlen und Kommarechnung | 596 | abgedeckt |  |
| CM-S-14 | Klasse 5–6 | Zahl | Runden und Überschlagen | 1.1.3.b Runden und Schätzen | 119 | abgedeckt |  |
| CM-S-15 | Klasse 5–6 | Raum und Form | Winkel, Dreiecke und Koordinatensystem | 1.2.3.a Winkelarten und -maße<br>1.2.3.b Dreieckstypen und Eigenschaften<br>1.2.4.a Punkte, Abstände, Spiegelung | 357 | abgedeckt |  |
| CM-S-16 | Klasse 5–6 | Messen | Zusammengesetzte Flächen und Quadervolumen | 1.2.1.b Zusammengesetzte Figuren<br>1.2.2.a Würfel, Quader, Zylinder | 238 | abgedeckt |  |
| CM-S-17 | Klasse 5–6 | Daten und Zufall | Mittelwert und relative Häufigkeit | 1.4.1.b Mittelwert und Häufigkeit | 119 | abgedeckt |  |
| CM-S-18 | Klasse 7–8 | Funktionaler Zusammenhang | Proportionale und antiproportionale Zuordnungen | 1.3.1.a Proportionale Zuordnungen<br>1.3.1.b Antiproportionale Zuordnungen | 238 | abgedeckt |  |
| CM-S-19 | Klasse 7–8 | Zahl | Prozent- und Zinsrechnung | 1.1.2.b Prozentwerte im Alltag | 358 | teilweise | Zinsrechnung und Zinseszins haben noch keine eigene Sektion. |
| CM-S-20 | Klasse 7–8 | Zahl | Terme und lineare Gleichungen | 2.1.1.a Lineare Gleichungen<br>2.1.1.b Formeln umstellen<br>2.1.1.c Gleichungen mit Brüchen | 868 | abgedeckt |  |
| CM-S-21 | Klasse 7–8 | Funktionaler Zusammenhang | Lineare Funktionen | 2.2.2.a Geradengleichung und Steigung<br>2.2.2.b Parallele und senkrechte Geraden | 192 | abgedeckt |  |
| CM-S-22 | Klasse 7–8 | Funktionaler Zusammenhang | Lineare Gleichungssysteme | 2.1.2.a Substitutions- und Additionsverfahren | 96 | abgedeckt |  |
| CM-S-23 | Klasse 7–8 | Zahl | Lineare Ungleichungen | 2.1.4.a Lineare Ungleichungen | 96 | abgedeckt |  |
| CM-S-24 | Klasse 7–8 | Messen | Kreisumfang und Kreisfläche | 2.5.2.a Umfang, Fläche, Kreisabschnitte | 96 | abgedeckt |  |
| CM-S-25 | Klasse 7–8 | Daten und Zufall | Laplace-Wahrscheinlichkeit und Baumdiagramme | 2.6.2.a Laplace-Experiment<br>2.6.2.b Baumdiagramm | 192 | abgedeckt |  |
| CM-S-26 | Klasse 9–10 | Funktionaler Zusammenhang | Quadratische Funktionen und Gleichungen | 2.2.3.a Parabelscheitel und Nullstellen<br>2.2.3.b Verschiebung und Streckung<br>2.1.3.a Lösungsformel und Diskriminante<br>2.1.3.b Faktorisierung | 384 | abgedeckt |  |
| CM-S-27 | Klasse 9–10 | Zahl | Potenzen und Wurzeln | 2.3.1.a Rechenregeln für Potenzen<br>2.3.1.b Negative und gebrochene Exponenten<br>2.3.2.a Quadrat- und Kubikwurzeln<br>2.3.2.b Vereinfachen von Wurzeltermen | 384 | abgedeckt |  |
| CM-S-28 | Klasse 9–10 | Raum und Form | Satz des Pythagoras und Satz des Thales | 2.5.3.a Anwendungen des Satzes des Pythagoras | 96 | abgedeckt |  |
| CM-S-29 | Klasse 9–10 | Raum und Form | Ähnlichkeit und Strahlensätze | 2.5.1.a Strahlensatz-Aufgaben<br>2.5.1.b Ähnliche Figuren | 192 | abgedeckt |  |
| CM-S-30 | Klasse 9–10 | Messen | Trigonometrie im Dreieck | 2.4.1.a sin, cos, tan und Anwendungen<br>2.4.2.a Allgemeines Dreieck | 192 | abgedeckt |  |
| CM-S-31 | Klasse 9–10 | Funktionaler Zusammenhang | Trigonometrische Funktionen und Bogenmaß | 2.4.1.b Bogenmaß und Winkelumrechnung<br>2.4.3.a Sinusfunktion und Kosinusfunktion<br>2.4.3.b Tangensfunktion | 288 | abgedeckt |  |
| CM-S-32 | Klasse 9–10 | Funktionaler Zusammenhang | Exponentialfunktionen und Logarithmus | 2.2.1.a Exponentielles Wachstum<br>2.2.1.b Exponentieller Zerfall<br>2.2.1.c Halbwertszeit<br>2.3.3.a Definition und Rechenregeln<br>2.3.3.b Logarithmische Gleichungen | 866 | abgedeckt |  |
| CM-S-33 | Klasse 9–10 | Messen | Prisma, Pyramide, Kegel und Kugel | 1.2.2.a Würfel, Quader, Zylinder | 119 | teilweise | Pyramide, Kegel und Kugel fehlen, bisher nur Würfel, Quader und Zylinder. |
| CM-S-34 | Klasse 9–10 | Raum und Form | Sehnen und Tangenten am Kreis | 2.5.2.b Sehnen und Tangenten | 0 | ohne Aufgaben |  |
| CM-S-35 | Klasse 9–10 | Daten und Zufall | Kombinatorik und mehrstufige Zufallsexperimente | 2.6.1.a Permutationen und Kombinationen<br>2.6.1.b Binomialkoeffizient<br>2.6.2.b Baumdiagramm | 288 | abgedeckt |  |
| CM-S-36 | Klasse 11–12 | Analysis | Ableitungsregeln, Monotonie und Krümmung | 3.1.1.a Ableitungsregeln (Ketten-, Produkt-, Quotientenregel)<br>3.1.1.b Monotonie und Extremstellen<br>3.1.1.c Krümmung und Wendepunkte | 545 | abgedeckt |  |
| CM-S-37 | Klasse 11–12 | Analysis | Kurvendiskussion und Optimierung | 3.1.2.a Vollständige Kurvendiskussion<br>3.1.2.b Anwendungsaufgaben Optimierung | 216 | abgedeckt |  |
| CM-S-38 | Klasse 11–12 | Analysis | Integralrechnung | 3.1.3.a Stammfunktionen und Grundregeln<br>3.1.3.b Bestimmtes Integral und Flächeninhalt<br>3.1.3.c Substitutionsregel<br>3.1.3.d Partielle Integration | 435 | abgedeckt |  |
| CM-S-39 | Klasse 11–12 | Analysis | e-Funktion und natürlicher Logarithmus | 3.1.4.a Ableitung und Integration von e^x und ln(x)<br>3.1.4.b Wachstums- und Zerfallsmodelle | 217 | abgedeckt |  |
| CM-S-40 | Klasse 11–12 (optional) | Analysis | Folgen und Grenzwerte | 3.1.5.a Arithmetische und geometrische Folgen<br>3.1.5.b Grenzwerte von Folgen | 216 | abgedeckt |  |
| CM-S-41 | Klasse 11–12 | Stochastik | Bedingte Wahrscheinlichkeit und Vierfeldertafel | 3.2.1.a Bedingte Wahrscheinlichkeit<br>3.2.1.b Bayes-Theorem | 216 | abgedeckt |  |
| CM-S-42 | Klasse 11–12 | Stochastik | Binomial- und Normalverteilung | 3.2.2.a Binomialverteilung<br>3.2.2.b Erwartungswert und Varianz<br>3.2.2.c Normalverteilung | 326 | abgedeckt |  |
| CM-S-43 | Klasse 11–12 | Stochastik | Hypothesentests | 3.2.2.a Binomialverteilung | 109 | teilweise | Signifikanztests haben auf L3 keine eigene Sektion (bisher nur L5 5.4.3.b). |
| CM-S-44 | Klasse 11–12 | Analytische Geometrie | Vektoren, Geraden, Ebenen und Abstände | 3.2.3.a Vektoroperationen und Skalarprodukt<br>3.2.3.b Geraden und Ebenen im Raum<br>3.2.3.c Kreuzprodukt und geometrische Anwendungen | 326 | abgedeckt |  |
| CM-S-45 | Klasse 11–12 (optional) | Lineare Algebra | Matrizen und Übergangsprozesse | 3.4.1.a Addition und Multiplikation<br>3.4.1.b Determinante (2x2) | 216 | abgedeckt |  |
| CM-S-46 | Klasse 11–12 (optional) | Vertiefung | Komplexe Zahlen | 3.3.1.a Kartesische Form und Betrag<br>3.3.1.b Polarform und Eulersche Formel | 218 | abgedeckt |  |
| CM-S-47 | Klasse 11–12 (optional) | Vertiefung | Kegelschnitte | 3.5.1.a Parabel, Ellipse, Hyperbel | 108 | abgedeckt |  |

## Ingenieurmathematik: Bachelor bis Master → L4–L5

Abgedeckt 1 · teilweise 10 · ohne Aufgaben 23 (von 34)

| ID | Phase | Bereich | Thema | Archiv-Sektionen | Aufgaben | Status | Hinweis |
|---|---|---|---|---|---:|---|---|
| CM-E-01 | Bachelor 1.–2. Sem. | Lineare Algebra | Matrizen, Determinanten und lineare Gleichungssysteme | 4.1.1.a Matrixrechnung und Determinanten | 1480 | abgedeckt |  |
| CM-E-02 | Bachelor 1.–2. Sem. | Lineare Algebra | Vektorräume, Kern und Bild | 4.1.2.a Basis, Dimension, Koordinatendarstellung<br>4.1.2.b Kern und Bild einer linearen Abbildung | 0 | ohne Aufgaben |  |
| CM-E-03 | Bachelor 1.–2. Sem. | Lineare Algebra | Eigenwerte, Diagonalisierung und Spektralsatz | 4.1.1.b Eigenwerte und Eigenvektoren<br>4.1.1.d Diagonalisierung und Spektralsatz | 1666 | teilweise |  |
| CM-E-04 | Bachelor 1.–2. Sem. | Lineare Algebra | Orthogonalität, Gram-Schmidt und QR | 4.1.3.a Gram-Schmidt-Verfahren<br>4.1.3.b QR-Zerlegung | 0 | ohne Aufgaben |  |
| CM-E-05 | Bachelor 1.–2. Sem. | Analysis | Komplexe Zahlen | 3.3.1.a Kartesische Form und Betrag<br>3.3.1.b Polarform und Eulersche Formel<br>4.4.1.a Holomorphe Funktionen und Cauchy-Riemann | 218 | teilweise | Komplexe Zahlen liegen bisher auf L3, eine L4-Sektion für Rechnen in C fehlt. |
| CM-E-06 | Bachelor 1.–2. Sem. | Analysis | Folgen, Grenzwerte und Vollständigkeit | 4.2.1.a Epsilon-Delta-Definition<br>4.2.1.b Cauchy-Folgen und Vollständigkeit | 0 | ohne Aufgaben |  |
| CM-E-07 | Bachelor 1.–2. Sem. | Analysis | Reihen, Potenzreihen und Taylor | 4.2.2.a Konvergenzkriterien (Quotient, Wurzel)<br>4.2.2.b Potenzreihen und Konvergenzradius<br>4.2.2.c Taylorreihen | 0 | ohne Aufgaben |  |
| CM-E-08 | Bachelor 1.–2. Sem. | Analysis | Mehrdimensionale Differentialrechnung | 4.2.3.a Partielle Ableitungen und Gradient<br>4.2.3.b Richtungsableitung und Hesse-Matrix<br>4.2.3.c Mehrdimensionale Extremwerte | 0 | ohne Aufgaben |  |
| CM-E-09 | Bachelor 1.–2. Sem. | Analysis | Uneigentliche Integrale | 4.2.4.a Uneigentliche Integrale | 0 | ohne Aufgaben |  |
| CM-E-10 | Bachelor 1.–2. Sem. | Analysis | Mehrfach-, Kurven- und Flächenintegrale | 4.2.4.b Mehrfachintegrale<br>4.2.4.c Kurven- und Flächenintegrale | 0 | teilweise | Integralsätze von Gauß und Stokes fehlen als eigene Sektion. |
| CM-E-11 | Bachelor 1.–2. Sem. | Differentialgleichungen | DGL 1. Ordnung | 4.3.1.a Trennbare Variablen<br>4.3.1.b Lineare DGL 1. Ordnung | 0 | ohne Aufgaben |  |
| CM-E-12 | Bachelor 1.–2. Sem. | Differentialgleichungen | Lineare DGL 2. Ordnung und Schwingungen | 4.3.2.a Homogene lineare DGL<br>4.3.2.b Inhomogene lineare DGL | 0 | ohne Aufgaben |  |
| CM-E-13 | Bachelor 1.–2. Sem. | Differentialgleichungen | DGL-Systeme und Anfangswertprobleme | 4.3.3.a Zustandsraumform<br>4.1.1.c Differentialgleichungen mit Anfangswerten | 185 | teilweise |  |
| CM-E-14 | Bachelor 3.–4. Sem. | Funktionentheorie | Holomorphe Funktionen und Cauchy-Integralsatz | 4.4.1.a Holomorphe Funktionen und Cauchy-Riemann<br>4.4.1.b Cauchyscher Integralsatz | 0 | ohne Aufgaben |  |
| CM-E-15 | Bachelor 3.–4. Sem. | Numerik | Fehlerrechnung und Kondition | 4.5.1.a Absoluter und relativer Fehler<br>4.5.1.b Konditionszahl | 0 | ohne Aufgaben |  |
| CM-E-16 | Bachelor 3.–4. Sem. | Numerik | Nichtlineare Gleichungen: Newton und Fixpunkt | 4.5.2.a Newton-Verfahren<br>4.5.2.b Fixpunkt-Iteration | 0 | ohne Aufgaben |  |
| CM-E-17 | Bachelor 3.–4. Sem. | Numerik | Numerische Integration | 5.3.1.a Trapez- und Simpsonregel<br>5.3.1.b Gaußquadratur | 0 | ohne Aufgaben |  |
| CM-E-18 | Bachelor 3.–4. Sem. | Numerik | LU-Zerlegung und iterative Löser | 5.3.2.a LU-Zerlegung<br>5.3.2.b Iterative Verfahren (Gauß-Seidel) | 0 | ohne Aufgaben |  |
| CM-E-19 | Bachelor 3.–4. Sem. | Numerik | Euler, Runge-Kutta und Schrittweitensteuerung | 5.3.3.a Euler-Verfahren und Runge-Kutta<br>5.3.3.b Schrittweitensteuerung | 0 | ohne Aufgaben |  |
| CM-E-20 | Bachelor 3.–4. Sem. | Stochastik | Stetige Verteilungen und zentraler Grenzwertsatz | 5.4.1.a Normalverteilung und Zentraler Grenzwertsatz<br>5.4.1.b Exponentialverteilung | 0 | ohne Aufgaben |  |
| CM-E-21 | Bachelor 3.–4. Sem. | Stochastik | Schätzer, Konfidenzintervalle und Tests | 5.4.3.a Maximum-Likelihood-Schätzung<br>5.4.3.b Konfidenzintervalle und Hypothesentests | 0 | ohne Aufgaben |  |
| CM-E-22 | Bachelor Vertiefung | Signale und Systeme | Fourierreihen und Fouriertransformation | 5.1.1.d Fourierreihen<br>5.1.1.a Fourier im Frequenzraum | 926 | teilweise |  |
| CM-E-23 | Bachelor Vertiefung | Signale und Systeme | Laplace-Transformation und Rücktransformation | 5.1.1.b Laplace und Systemantwort<br>5.1.2.a Eigenschaften und Rechenregeln<br>5.1.2.b Partialbruchzerlegung und Rücktransformation | 742 | teilweise |  |
| CM-E-24 | Bachelor Vertiefung | Signale und Systeme | DFT und FFT | 5.1.1.c Diskrete Fouriertransformation (DFT/FFT) | 0 | ohne Aufgaben |  |
| CM-E-25 | Bachelor Vertiefung | Signale und Systeme | Abtastung und Z-Transformation | 5.1.4.a Shannon-Nyquist-Theorem<br>5.1.4.b Aliasing und Anti-Aliasing<br>5.1.3.a Grundlagen und Eigenschaften<br>5.1.3.b Inverse Z-Transformation | 0 | ohne Aufgaben |  |
| CM-E-26 | Bachelor Vertiefung | Regelungstechnik | Übertragungsfunktionen und Blockschaltbilder | 5.2.1.a PT1, PT2 und PID-Glieder<br>5.2.1.b Blockschaltbilder | 0 | ohne Aufgaben |  |
| CM-E-27 | Bachelor Vertiefung | Regelungstechnik | Stabilität: Hurwitz, Nyquist und Bode | 5.2.2.a Nyquist-Kriterium<br>5.2.2.b Bode-Diagramm<br>5.2.2.c Hurwitz-Kriterium | 0 | ohne Aufgaben |  |
| CM-E-28 | Bachelor Vertiefung | Regelungstechnik | PID-Reglerentwurf | 5.2.3.a PID-Regler<br>5.2.3.b Einstellregeln (Ziegler-Nichols) | 0 | ohne Aufgaben |  |
| CM-E-29 | Bachelor Vertiefung | Partielle DGL | Wellen-, Wärmeleitungs- und Laplace-Gleichung | 5.5.1.a Wellengleichung (hyperbolisch)<br>5.5.1.b Diffusionsgleichung (parabolisch)<br>5.5.1.c Laplace-Gleichung (elliptisch) | 0 | ohne Aufgaben |  |
| CM-E-30 | Master | Regelungstechnik | Zustandsraum, Steuerbarkeit und Beobachter | 5.2.4.a Steuerbarkeit und Beobachtbarkeit | 0 | teilweise | Beobachterentwurf und LQR fehlen als eigene Sektionen. |
| CM-E-31 | Master | Stochastik | Markov-Ketten und Poisson-Prozesse | 5.4.2.a Markov-Ketten<br>5.4.2.b Poisson-Prozess | 0 | ohne Aufgaben |  |
| CM-E-32 | Master | Numerische lineare Algebra | Singulärwertzerlegung und Krylov-Verfahren | 4.1.3.b QR-Zerlegung<br>5.3.2.b Iterative Verfahren (Gauß-Seidel) | 0 | teilweise | SVD und Krylov-Verfahren haben noch keine eigenen Sektionen. |
| CM-E-33 | Master | Optimierung | Nichtlineare Optimierung und Gradientenverfahren | 4.2.3.c Mehrdimensionale Extremwerte | 0 | teilweise | Auf L5 fehlt eine Optimierungssektion (konvexe Optimierung bisher nur L6 6.2.2). |
| CM-E-34 | Master | Variationsrechnung | Euler-Lagrange-Gleichung und schwache Formulierung | 5.5.1.c Laplace-Gleichung (elliptisch) | 0 | teilweise | Variationsrechnung fehlt als Sektion zwischen PDE-Einstieg (L5) und FEM (L6). |
