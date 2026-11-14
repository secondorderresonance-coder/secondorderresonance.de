/*
 * SOR Grundkurse und Karteien
 * ------------------------------------------------------------
 * Zwei Karteien: "mathe" und "physik" (Physik & Technik).
 * Jeder Kurs hat 5 bis 6 Lektionen. Weitere Kurse ergänzt app/data/courses-2.js über SOR_COURSES.add(). Eine Lektion hat dieselben Felder wie ein
 * Thema der Coverage-Matrix (topic, area, band, text, formula, visual),
 * damit Üben, Belohnungen und Lehrkräfte-Dashboard sie ohne Sonderfall nutzen.
 *
 *   id       K-<KURS>-<n>, zugleich Themen-ID der Aufgaben (app/modules/exercises/courses-*.js)
 *   visual   Schlüssel aus app/modules/course-visuals.js
 *
 * Texte stehen zweisprachig als { de, en } und werden beim Laden in die
 * aktuelle Sprache aufgelöst (app/modules/i18n.js, in Node: SOR_LANG).
 */
(function (root) {
    "use strict";
    var lang = root.SOR_I18N ? root.SOR_I18N.lang : ((typeof process !== "undefined" && process.env && process.env.SOR_LANG === "en") ? "en" : "de");
    var L = function (v) { return v && typeof v === "object" && !Array.isArray(v) && ("de" in v) ? (lang === "en" ? v.en : v.de) : v; };
    var mx = function (rows) { return "<span class='mx' style='--c:" + rows[0].length + "'>" + rows.map(function (r) { return r.map(function (x) { return "<span>" + x + "</span>"; }).join(""); }).join("") + "</span>"; };

    var INT_RE = /([∫∬∭∮])<sub>((?:(?!<\/sub>).){1,60}?)<\/sub><sup>((?:(?!<\/sup>).){1,60}?)<\/sup>/g;
    var stackInt = function (h) { return String(h).replace(INT_RE, "<span class='int'><span class='sym'>$1</span><span class='lim'><sup>$3</sup><sub>$2</sub></span></span>"); };

    var SUBJECTS = {
        mathe: { title: { de: "Mathe", en: "Maths" }, icon: "∑" },
        physik: { title: { de: "Physik & Technik", en: "Physics & Engineering" }, icon: "⚙" }
    };

    var COURSES = [
        {
            id: "tm1", subject: "physik", level: 4, short: "TM 1",
            title: { de: "Technische Mechanik 1: Statik", en: "Engineering Mechanics 1: Statics" },
            intro: { de: "Kräfte, Momente, Lager, Fachwerke und Schnittgrößen: das Handwerkszeug, um jedes ruhende Bauteil zu berechnen.", en: "Forces, moments, supports, trusses and internal forces: the toolkit for analysing any structure at rest." },
            lessons: [
                { id: "K-TM1-1", visual: "forcecomp", topic: { de: "Kräfte zerlegen und addieren", en: "Resolving and adding forces" },
                  text: { de: "Eine Kraft lässt sich in Komponenten entlang der Achsen zerlegen. Mehrere Kräfte addiert man komponentenweise zur Resultierenden.", en: "A force can be split into components along the axes. Several forces are added component by component to give the resultant." },
                  formula: ["F<sub>x</sub> = F · cos α", "F<sub>y</sub> = F · sin α", "R = √(R<sub>x</sub><sup>2</sup> + R<sub>y</sub><sup>2</sup>)"] },
                { id: "K-TM1-2", visual: "lever", topic: { de: "Gleichgewicht und Moment", en: "Equilibrium and moments" },
                  text: { de: "Ein Körper ruht, wenn sich alle Kräfte und alle Momente aufheben. Das Moment ist Kraft mal Hebelarm, senkrecht zur Wirkungslinie gemessen.", en: "A body is at rest when all forces and all moments cancel. A moment is force times lever arm, measured perpendicular to the line of action." },
                  formula: ["ΣF<sub>x</sub> = 0,  ΣF<sub>y</sub> = 0,  ΣM = 0", "M = F · a"] },
                { id: "K-TM1-3", visual: "beam", topic: { de: "Lagerreaktionen am Balken", en: "Support reactions of a beam" },
                  text: { de: "Freischneiden, Lager durch Kräfte ersetzen, dann das Momentengleichgewicht um ein Lager aufstellen: so fällt eine Unbekannte sofort heraus.", en: "Draw the free body, replace supports by forces, then take moments about one support: one unknown drops out immediately." },
                  formula: ["A = F · b / l", "B = F · a / l"] },
                { id: "K-TM1-4", visual: "truss", topic: { de: "Fachwerke", en: "Trusses" },
                  text: { de: "Fachwerkstäbe tragen nur Zug oder Druck. An jedem Knoten gilt Kräftegleichgewicht, so rechnet man sich Knoten für Knoten durch.", en: "Truss members carry only tension or compression. Each joint is in equilibrium, so you work through the truss joint by joint." },
                  formula: [{ de: "ΣF<sub>x</sub> = 0, ΣF<sub>y</sub> = 0 an jedem Knoten", en: "ΣF<sub>x</sub> = 0, ΣF<sub>y</sub> = 0 at every joint" }, { de: "Zug positiv, Druck negativ", en: "tension positive, compression negative" }] },
                { id: "K-TM1-5", visual: "sfbm", topic: { de: "Querkraft- und Momentenverlauf", en: "Shear force and bending moment diagrams" },
                  text: { de: "Schneidet man den Balken an der Stelle x, halten Querkraft Q und Biegemoment M das Teilstück im Gleichgewicht. Wo Q null wird, ist M am größten.", en: "Cut the beam at x: the shear force Q and the bending moment M keep the piece in equilibrium. Where Q is zero, M is at its maximum." },
                  formula: ["dM/dx = Q", "M<sub>max</sub> = F · a · b / l", "M<sub>max</sub> = q · l<sup>2</sup> / 8"] },
                { id: "K-TM1-6", visual: "centroid", topic: { de: "Schwerpunkt zusammengesetzter Flächen", en: "Centroid of composite areas" },
                  text: { de: "Der Schwerpunkt einer zusammengesetzten Fläche ist das flächengewichtete Mittel der Teilschwerpunkte. Löcher zählen mit negativer Fläche.", en: "The centroid of a composite area is the area-weighted mean of the partial centroids. Holes count with negative area." },
                  formula: ["x<sub>S</sub> = Σ A<sub>i</sub> · x<sub>i</sub> / Σ A<sub>i</sub>", "y<sub>S</sub> = Σ A<sub>i</sub> · y<sub>i</sub> / Σ A<sub>i</sub>"] }
            ]
        },
        {
            id: "tm2", subject: "physik", level: 4, short: "TM 2",
            title: { de: "Technische Mechanik 2: Elastostatik", en: "Engineering Mechanics 2: Strength of materials" },
            intro: { de: "Wie stark sich Bauteile dehnen, biegen und knicken: Spannung, Temperatur, Flächenträgheitsmoment und Biegelinie.", en: "How much parts stretch, bend and buckle: stress, temperature, second moment of area and deflection." },
            lessons: [
                { id: "K-TM2-1", visual: "bar", topic: { de: "Spannung, Dehnung und Hookesches Gesetz", en: "Stress, strain and Hooke's law" },
                  text: { de: "Spannung ist Kraft pro Fläche, Dehnung die relative Längenänderung. Im elastischen Bereich sind beide proportional, der Faktor ist der Elastizitätsmodul E.", en: "Stress is force per area, strain is the relative change in length. In the elastic range they are proportional, with Young's modulus E as the factor." },
                  formula: ["σ = F / A", "ε = Δl / l", "σ = E · ε", "Δl = F · l / (E · A)"] },
                { id: "K-TM2-2", visual: "thermalbar", topic: { de: "Temperatureinfluss", en: "Thermal effects" },
                  text: { de: "Wärme dehnt einen Stab um α · ΔT · l. Ist er zwischen zwei Wänden fest eingespannt, kann er sich nicht ausdehnen, und es entsteht eine Druckspannung.", en: "Heating stretches a bar by α · ΔT · l. If it is fixed between two walls it cannot expand, and a compressive stress builds up instead." },
                  formula: ["ε<sub>th</sub> = α · ΔT", "Δl = α · ΔT · l", { de: "σ = −E · α · ΔT (fest eingespannt)", en: "σ = −E · α · ΔT (fully constrained)" }] },
                { id: "K-TM2-3", visual: "section", topic: { de: "Flächenträgheitsmoment", en: "Second moment of area" },
                  text: { de: "I beschreibt, wie steif ein Querschnitt gegen Biegung ist. Die Höhe geht in der dritten Potenz ein, deshalb steht ein Brett hochkant viel steifer.", en: "I describes how stiff a cross-section is in bending. The height enters cubed, which is why a plank on edge is far stiffer." },
                  formula: [{ de: "I<sub>Rechteck</sub> = b · h<sup>3</sup> / 12", en: "I<sub>rectangle</sub> = b · h<sup>3</sup> / 12" }, { de: "I<sub>Kreis</sub> = π · d<sup>4</sup> / 64", en: "I<sub>circle</sub> = π · d<sup>4</sup> / 64" }, { de: "I = I<sub>S</sub> + A · e<sup>2</sup> (Steiner)", en: "I = I<sub>c</sub> + A · e<sup>2</sup> (parallel axis)" }] },
                { id: "K-TM2-4", visual: "bendstress", topic: { de: "Biegespannung", en: "Bending stress" },
                  text: { de: "Bei Biegung wird eine Seite gedehnt und die andere gestaucht. Die Spannung wächst linear mit dem Abstand z zur neutralen Faser.", en: "In bending one side is stretched and the other compressed. Stress grows linearly with the distance z from the neutral axis." },
                  formula: ["σ(z) = M / I · z", "σ<sub>max</sub> = M / W", "W = I / z<sub>max</sub>"] },
                { id: "K-TM2-5", visual: "deflect", topic: { de: "Biegelinie und Standardfälle", en: "Deflection: standard cases" },
                  text: { de: "Die Durchbiegung folgt aus E · I · w″ = −M. Für die häufigsten Lastfälle gibt es fertige Formeln, die man kombinieren kann.", en: "Deflection follows from E · I · w″ = −M. The most common load cases have ready-made formulas that can be combined." },
                  formula: [{ de: "Kragarm, Einzellast: w = F · l<sup>3</sup> / (3EI)", en: "Cantilever, point load: w = F · l<sup>3</sup> / (3EI)" }, { de: "Einfeldträger, Last mittig: w = F · l<sup>3</sup> / (48EI)", en: "Simply supported, load at midspan: w = F · l<sup>3</sup> / (48EI)" }, { de: "Einfeldträger, Streckenlast: w = 5 · q · l<sup>4</sup> / (384EI)", en: "Simply supported, uniform load: w = 5 · q · l<sup>4</sup> / (384EI)" }] },
                { id: "K-TM2-6", visual: "buckle", topic: { de: "Knicken nach Euler", en: "Euler buckling" },
                  text: { de: "Schlanke Druckstäbe versagen nicht durch Bruch, sondern weichen plötzlich seitlich aus. Die Lagerung bestimmt die Knicklänge l<sub>k</sub>.", en: "Slender struts do not fail by crushing, they suddenly bow sideways. The end supports set the effective length l<sub>k</sub>." },
                  formula: ["F<sub>k</sub> = π<sup>2</sup> · E · I / l<sub>k</sub><sup>2</sup>", { de: "l<sub>k</sub> = 2l · l · 0,7l · 0,5l (Euler-Fälle 1 bis 4)", en: "l<sub>k</sub> = 2l · l · 0.7l · 0.5l (Euler cases 1 to 4)" }] }
            ]
        },
        {
            id: "trafo", subject: "mathe", level: 5, short: "TM 3",
            title: { de: "Transformationsmatrizen und Kinematik", en: "Transformation matrices and kinematics" },
            intro: { de: "Drehen, verschieben, verketten: die Matrizen, mit denen Roboter, Kameras und Mehrkörpersimulationen rechnen.", en: "Rotate, translate, chain: the matrices behind robots, cameras and multibody simulation." },
            lessons: [
                { id: "K-TR-1", visual: "rot2d", topic: { de: "Drehung in der Ebene", en: "Rotation in the plane" },
                  text: { de: "Eine Drehung um den Winkel θ bildet jeden Punkt mit einer 2×2-Matrix ab. Ihre Spalten sind die gedrehten Einheitsvektoren.", en: "A rotation by the angle θ maps every point with a 2×2 matrix. Its columns are the rotated unit vectors." },
                  formula: ["R(θ) = " + mx([["cos θ", "−sin θ"], ["sin θ", "cos θ"]]), "p′ = R(θ) · p"] },
                { id: "K-TR-2", visual: "rot3d", topic: { de: "Drehmatrizen im Raum", en: "Rotation matrices in 3D" },
                  text: { de: "Im Raum dreht man um eine Achse. Die Komponente entlang dieser Achse bleibt gleich, die beiden anderen drehen sich wie in der Ebene.", en: "In space you rotate about an axis. The component along that axis stays the same, the other two rotate as in the plane." },
                  formula: ["R<sub>z</sub>(θ) = " + mx([["cos θ", "−sin θ", "0"], ["sin θ", "cos θ", "0"], ["0", "0", "1"]])] },
                { id: "K-TR-3", visual: "frames", topic: { de: "Homogene Transformationsmatrix", en: "Homogeneous transformation matrix" },
                  text: { de: "Drehung und Verschiebung passen in eine einzige Matrix, wenn man an jeden Punkt eine 1 anhängt. Eine Multiplikation bringt einen Punkt vom Körper- ins Weltsystem.", en: "Rotation and translation fit into one matrix if you append a 1 to every point. One multiplication takes a point from the body frame to the world frame." },
                  formula: ["T<sub>AB</sub> = " + mx([["R", "p"], ["0", "1"]]), "p<sub>A</sub> = T<sub>AB</sub> · p<sub>B</sub>"] },
                { id: "K-TR-4", visual: "chain", topic: { de: "Transformationen verketten", en: "Chaining transformations" },
                  text: { de: "Mehrere Koordinatensysteme hintereinander werden durch Multiplikation der Matrizen verbunden. Die Reihenfolge zählt, denn Matrizen sind nicht vertauschbar.", en: "Several frames in a row are linked by multiplying their matrices. The order matters, because matrix multiplication does not commute." },
                  formula: ["T<sub>AC</sub> = T<sub>AB</sub> · T<sub>BC</sub>", "T<sub>AB</sub> · T<sub>BC</sub> ≠ T<sub>BC</sub> · T<sub>AB</sub>"] },
                { id: "K-TR-5", visual: "inverse", topic: { de: "Inverse Transformation", en: "Inverse transformation" },
                  text: { de: "Den Rückweg rechnet man mit der transponierten Drehmatrix statt mit einer aufwendigen Inversion, denn Drehmatrizen sind orthogonal.", en: "The way back uses the transposed rotation matrix instead of a costly inversion, because rotation matrices are orthogonal." },
                  formula: ["R<sup>−1</sup> = R<sup>T</sup>", "T<sup>−1</sup> = " + mx([["R<sup>T</sup>", "−R<sup>T</sup>p"], ["0", "1"]])] },
                { id: "K-TR-6", visual: "robotarm", topic: { de: "Vorwärtskinematik eines Roboterarms", en: "Forward kinematics of a robot arm" },
                  text: { de: "Aus den Gelenkwinkeln folgt die Position des Greifers. Jedes Gelenk fügt eine Drehung und ein Armstück hinzu, die Winkel addieren sich entlang der Kette.", en: "The joint angles determine where the gripper is. Each joint adds a rotation and a link, and the angles add up along the chain." },
                  formula: ["x = l<sub>1</sub> cos θ<sub>1</sub> + l<sub>2</sub> cos(θ<sub>1</sub> + θ<sub>2</sub>)", "y = l<sub>1</sub> sin θ<sub>1</sub> + l<sub>2</sub> sin(θ<sub>1</sub> + θ<sub>2</sub>)"] }
            ]
        },
        {
            id: "pid", subject: "physik", level: 5, short: "PID",
            title: { de: "Regelungstechnik: der PID-Regler", en: "Control engineering: the PID controller" },
            intro: { de: "Vom Tempomat bis zur Drohne: wie ein Regler aus der Abweichung die richtige Stellgröße macht.", en: "From cruise control to drones: how a controller turns an error into the right control action." },
            lessons: [
                { id: "K-PID-1", visual: "loop", topic: { de: "Der Regelkreis", en: "The control loop" },
                  text: { de: "Der Regler vergleicht den Sollwert w mit dem gemessenen Istwert y. Aus der Regelabweichung e berechnet er die Stellgröße u für die Strecke.", en: "The controller compares the setpoint w with the measured output y. From the error e it computes the control signal u for the plant." },
                  formula: ["e = w − y", { de: "u = K<sub>P</sub> · e (P-Anteil)", en: "u = K<sub>P</sub> · e (P term)" }] },
                { id: "K-PID-2", visual: "pstep", topic: { de: "P-Regler und bleibende Abweichung", en: "P control and steady-state error" },
                  text: { de: "Ein reiner P-Regler an einer Strecke mit Verstärkung K<sub>S</sub> erreicht den Sollwert nie ganz. Mehr K<sub>P</sub> verkleinert den Rest, macht den Kreis aber unruhiger.", en: "A pure P controller on a plant with gain K<sub>S</sub> never quite reaches the setpoint. More K<sub>P</sub> shrinks the remainder but makes the loop more restless." },
                  formula: ["y<sub>∞</sub> = K<sub>P</sub>K<sub>S</sub> / (1 + K<sub>P</sub>K<sub>S</sub>) · w", "e<sub>∞</sub> = w / (1 + K<sub>P</sub>K<sub>S</sub>)"] },
                { id: "K-PID-3", visual: "iarea", topic: { de: "Der I-Anteil", en: "The integral term" },
                  text: { de: "Der I-Anteil summiert die Regelabweichung über die Zeit. Solange ein Rest bleibt, wächst er weiter, deshalb verschwindet die bleibende Abweichung.", en: "The integral term adds up the error over time. As long as any error remains it keeps growing, which is why the steady-state error disappears." },
                  formula: ["u<sub>I</sub>(t) = K<sub>I</sub> · ∫<sub>0</sub><sup>t</sup> e(τ) dτ", "u<sub>I</sub> ≈ K<sub>I</sub> · Σ e<sub>k</sub> · Δt"] },
                { id: "K-PID-4", visual: "dslope", topic: { de: "Der D-Anteil", en: "The derivative term" },
                  text: { de: "Der D-Anteil reagiert auf die Änderungsgeschwindigkeit der Abweichung. Er bremst, bevor der Istwert über das Ziel schießt.", en: "The derivative term reacts to how fast the error changes. It brakes before the output overshoots the target." },
                  formula: ["u<sub>D</sub> = K<sub>D</sub> · de/dt", "de/dt ≈ (e<sub>k</sub> − e<sub>k−1</sub>) / Δt"] },
                { id: "K-PID-5", visual: "pidsum", topic: { de: "PID-Stellgröße berechnen", en: "Computing the PID output" },
                  text: { de: "Die drei Anteile werden addiert. Ein Mikrocontroller rechnet das in festen Zeitschritten Δt, Takt für Takt.", en: "The three terms are added. A microcontroller computes this at fixed time steps Δt, tick by tick." },
                  formula: ["u = K<sub>P</sub> · e + K<sub>I</sub> · Σ e · Δt + K<sub>D</sub> · Δe / Δt"] },
                { id: "K-PID-6", visual: "zn", topic: { de: "Einstellen nach Ziegler-Nichols", en: "Ziegler–Nichols tuning" },
                  text: { de: "Man erhöht K<sub>P</sub>, bis der Kreis gerade dauerhaft schwingt. Aus dieser kritischen Verstärkung K<sub>u</sub> und der Schwingungsdauer T<sub>u</sub> folgen die Startwerte.", en: "Raise K<sub>P</sub> until the loop just oscillates steadily. That critical gain K<sub>u</sub> and the period T<sub>u</sub> give the starting values." },
                  formula: [{ de: "K<sub>P</sub> = 0,6 · K<sub>u</sub>", en: "K<sub>P</sub> = 0.6 · K<sub>u</sub>" }, { de: "T<sub>I</sub> = 0,5 · T<sub>u</sub>,  T<sub>D</sub> = 0,125 · T<sub>u</sub>", en: "T<sub>I</sub> = 0.5 · T<sub>u</sub>,  T<sub>D</sub> = 0.125 · T<sub>u</sub>" }, "K<sub>I</sub> = K<sub>P</sub> / T<sub>I</sub>,  K<sub>D</sub> = K<sub>P</sub> · T<sub>D</sub>"] }
            ]
        },
        {
            id: "thermo", subject: "physik", level: 4, short: "Thermo",
            title: { de: "Thermodynamik und Wärmetransport", en: "Thermodynamics and heat transfer" },
            intro: { de: "Wärme, Gase, Energiebilanz, Wirkungsgrad und die drei Wege, auf denen Wärme wandert.", en: "Heat, gases, the energy balance, efficiency and the three ways heat travels." },
            lessons: [
                { id: "K-TH-1", visual: "heatcap", topic: { de: "Wärme und Wärmekapazität", en: "Heat and heat capacity" },
                  text: { de: "Wärme ist übertragene Energie. Wie stark sich ein Stoff dabei erwärmt, bestimmt seine spezifische Wärmekapazität c. Wasser braucht besonders viel.", en: "Heat is energy in transfer. How much a substance warms up is set by its specific heat capacity c. Water needs a lot." },
                  formula: ["Q = m · c · ΔT", { de: "T<sub>Misch</sub> = (m<sub>1</sub>c<sub>1</sub>T<sub>1</sub> + m<sub>2</sub>c<sub>2</sub>T<sub>2</sub>) / (m<sub>1</sub>c<sub>1</sub> + m<sub>2</sub>c<sub>2</sub>)", en: "T<sub>mix</sub> = (m<sub>1</sub>c<sub>1</sub>T<sub>1</sub> + m<sub>2</sub>c<sub>2</sub>T<sub>2</sub>) / (m<sub>1</sub>c<sub>1</sub> + m<sub>2</sub>c<sub>2</sub>)" }] },
                { id: "K-TH-2", visual: "gas", topic: { de: "Ideales Gas", en: "The ideal gas" },
                  text: { de: "Druck, Volumen und Temperatur eines Gases hängen über eine einzige Gleichung zusammen. Temperaturen immer in Kelvin einsetzen.", en: "Pressure, volume and temperature of a gas are linked by a single equation. Always use kelvin." },
                  formula: ["p · V = n · R · T", { de: "R = 8,314 J/(mol · K)", en: "R = 8.314 J/(mol · K)" }, { de: "T in K = ϑ in °C + 273,15", en: "T in K = ϑ in °C + 273.15" }] },
                { id: "K-TH-3", visual: "firstlaw", topic: { de: "Erster Hauptsatz", en: "The first law" },
                  text: { de: "Energie geht nicht verloren. Zugeführte Wärme erhöht die innere Energie des Gases oder wird als Arbeit nach außen abgegeben.", en: "Energy is never lost. Heat added either raises the gas's internal energy or leaves as work done on the surroundings." },
                  formula: ["ΔU = Q − W", { de: "W = p · ΔV (bei konstantem Druck)", en: "W = p · ΔV (at constant pressure)" }] },
                { id: "K-TH-4", visual: "carnot", topic: { de: "Wärmekraftmaschine und Carnot", en: "Heat engines and Carnot" },
                  text: { de: "Eine Wärmekraftmaschine wandelt nur einen Teil der Wärme in Arbeit um, der Rest geht an die kalte Seite. Die Obergrenze setzt der Carnot-Wirkungsgrad.", en: "A heat engine turns only part of the heat into work, the rest goes to the cold side. The upper limit is the Carnot efficiency." },
                  formula: [{ de: "η = W / Q<sub>zu</sub>", en: "η = W / Q<sub>in</sub>" }, { de: "η<sub>C</sub> = 1 − T<sub>kalt</sub> / T<sub>warm</sub>", en: "η<sub>C</sub> = 1 − T<sub>cold</sub> / T<sub>hot</sub>" }] },
                { id: "K-TH-5", visual: "wall", topic: { de: "Wärmeleitung durch Wände", en: "Conduction through walls" },
                  text: { de: "Durch eine Wand fließt Wärme proportional zu Fläche und Temperaturunterschied und umgekehrt proportional zur Dicke. Schichten addieren sich wie Widerstände in Reihe.", en: "Heat flows through a wall in proportion to area and temperature difference, and inversely to thickness. Layers add up like resistors in series." },
                  formula: ["Q̇ = λ · A · ΔT / d", "R = d / (λ · A)", { de: "R<sub>ges</sub> = R<sub>1</sub> + R<sub>2</sub> + …", en: "R<sub>total</sub> = R<sub>1</sub> + R<sub>2</sub> + …" }] },
                { id: "K-TH-6", visual: "radiation", topic: { de: "Konvektion und Strahlung", en: "Convection and radiation" },
                  text: { de: "An Oberflächen geht Wärme durch Konvektion an Luft oder Wasser über und wird zusätzlich abgestrahlt. Strahlung wächst mit der vierten Potenz der absoluten Temperatur.", en: "At surfaces heat passes into air or water by convection and is also radiated away. Radiation grows with the fourth power of absolute temperature." },
                  formula: ["Q̇ = α · A · (T<sub>W</sub> − T<sub>∞</sub>)", "Q̇ = ε · σ · A · (T<sub>1</sub><sup>4</sup> − T<sub>2</sub><sup>4</sup>)", { de: "σ = 5,67 · 10<sup>−8</sup> W/(m<sup>2</sup>K<sup>4</sup>)", en: "σ = 5.67 · 10<sup>−8</sup> W/(m<sup>2</sup>K<sup>4</sup>)" }] }
            ]
        },
        {
            id: "stat", subject: "mathe", level: 5, short: "Stat",
            title: { de: "Statistik im Studium", en: "Statistics for university" },
            intro: { de: "Kennzahlen, die wichtigsten Verteilungen und der Satz von Bayes: was in Statistik-Klausuren immer drankommt.", en: "Summary statistics, the key distributions and Bayes' theorem: what every statistics exam asks." },
            lessons: [
                { id: "K-ST-1", visual: "spread", topic: { de: "Mittelwert, Varianz, Standardabweichung", en: "Mean, variance, standard deviation" },
                  text: { de: "Der Mittelwert beschreibt die Lage, die Standardabweichung die typische Entfernung davon. Bei einer Stichprobe teilt man durch n − 1.", en: "The mean describes the location, the standard deviation the typical distance from it. For a sample you divide by n − 1." },
                  formula: ["x̄ = Σ x<sub>i</sub> / n", "s<sup>2</sup> = Σ (x<sub>i</sub> − x̄)<sup>2</sup> / (n − 1)", "s = √s<sup>2</sup>"] },
                { id: "K-ST-2", visual: "binom", topic: { de: "Binomialverteilung", en: "Binomial distribution" },
                  text: { de: "n unabhängige Versuche mit gleicher Trefferwahrscheinlichkeit p: X zählt die Treffer. Typisch sind Ausschuss in einer Stichprobe oder Treffer bei Würfen.", en: "n independent trials with the same success probability p: X counts the successes. Think defects in a sample or hits in a series of throws." },
                  formula: ["P(X = k) = <span class='binom'><span>n</span><span>k</span></span> · p<sup>k</sup> · (1 − p)<sup>n−k</sup>", "E(X) = n · p,  Var(X) = n · p · (1 − p)"] },
                { id: "K-ST-3", visual: "poisson", topic: { de: "Poisson-Verteilung", en: "Poisson distribution" },
                  text: { de: "Die Poisson-Verteilung zählt seltene, unabhängige Ereignisse in einem festen Zeitraum, etwa Anrufe pro Stunde. Ihr einziger Parameter ist die mittlere Anzahl λ.", en: "The Poisson distribution counts rare, independent events in a fixed interval, such as calls per hour. Its only parameter is the mean count λ." },
                  formula: ["P(X = k) = λ<sup>k</sup> · e<sup>−λ</sup> / k!", "E(X) = Var(X) = λ"] },
                { id: "K-ST-4", visual: "gauss", topic: { de: "Normalverteilung (Gauß)", en: "Normal distribution (Gaussian)" },
                  text: { de: "Viele Messgrößen streuen glockenförmig um ihren Mittelwert. Mit z = (x − μ) / σ wird jede Normalverteilung zur Standardnormalverteilung mit der Tabelle Φ.", en: "Many measurements scatter in a bell shape around their mean. With z = (x − μ) / σ every normal distribution becomes the standard normal with table Φ." },
                  formula: ["z = (x − μ) / σ", "P(X ≤ x) = Φ(z)", { de: "μ ± σ: 68,3 %,  μ ± 2σ: 95,4 %", en: "μ ± σ: 68.3%,  μ ± 2σ: 95.4%" }] },
                { id: "K-ST-5", visual: "expdist", topic: { de: "Exponentialverteilung", en: "Exponential distribution" },
                  text: { de: "Die Exponentialverteilung beschreibt Wartezeiten zwischen zufälligen Ereignissen, etwa bis zum nächsten Ausfall. Sie ist gedächtnislos: Bisheriges Warten ändert nichts.", en: "The exponential distribution describes waiting times between random events, such as until the next failure. It is memoryless: time already waited changes nothing." },
                  formula: ["P(T > t) = e<sup>−λt</sup>", "E(T) = 1 / λ"] },
                { id: "K-ST-6", visual: "bayestree", topic: { de: "Satz von Bayes", en: "Bayes' theorem" },
                  text: { de: "Bayes dreht die Bedingung um: aus P(Befund | Ursache) wird P(Ursache | Befund). Bei seltenen Ursachen sind überraschend viele positive Tests falsch positiv.", en: "Bayes flips the condition: P(finding | cause) becomes P(cause | finding). For rare causes, surprisingly many positive tests are false positives." },
                  formula: ["P(A | B) = P(B | A) · P(A) / P(B)", "P(B) = P(B | A) · P(A) + P(B | Ā) · P(Ā)"] }
            ]
        }
    ];

    // Auflösen in die aktuelle Sprache und flache Lektionsliste.
    // Lektionen mit "ref" verweisen auf ein vorhandenes Thema der Coverage-Matrix (z. B. CM-E-05):
    // sie nutzen dessen ID und Aufgaben und landen nicht in der flachen Liste "lessons".
    var lessons = [], byId = {};
    function coverage() {
        if (root.SOR_COVERAGE) return root.SOR_COVERAGE;
        try { return require("./coverage-matrix.js"); } catch (e) { return null; }
    }
    function addCourses(list) {
        list.forEach(function (c) {
            c.title = L(c.title); c.intro = L(c.intro); c.short = L(c.short);
            c.lessons.forEach(function (l, i) {
                if (l.ref) {
                    var cov = coverage(), src = cov ? cov.school.concat(cov.engineering).filter(function (e) { return e.id === l.ref; })[0] : null;
                    l.id = l.ref; l.topic = l.topic ? L(l.topic) : (src ? src.topic : l.ref);
                    l.text = L(l.text); l.formula = (l.formula || []).map(L).map(stackInt);
                    // fehlende Erklärung auch am Thema selbst ergänzen, damit Üben sie überall zeigt
                    if (src) { if (!src.text) src.text = l.text; if (!src.formula || !src.formula.length) src.formula = l.formula; if (!src.visual) src.visual = l.visual; }
                } else {
                    l.topic = L(l.topic); l.text = L(l.text);
                    l.formula = (l.formula || []).map(L).map(stackInt);
                }
                l.course = c.id; l.subject = c.subject; l.n = i + 1;
                l.area = c.title; l.band = c.short; l.level = c.level;
                if (!l.ref) { lessons.push(l); byId[l.id] = l; }
            });
            COURSES.push(c);
        });
    }
    var BASE = COURSES; COURSES = [];
    addCourses(BASE);
    Object.keys(SUBJECTS).forEach(function (k) { SUBJECTS[k].title = L(SUBJECTS[k].title); });

    var api = {
        subjects: SUBJECTS,
        courses: COURSES,
        lessons: lessons,
        lesson: function (id) { return byId[id] || null; },
        course: function (id) { return COURSES.filter(function (c) { return c.id === id; })[0] || null; },
        bySubject: function (s) { return COURSES.filter(function (c) { return c.subject === s; }); },
        add: addCourses,
        L: L, stackInt: stackInt,
        // Semesterplan eines Maschinenbau-Bachelors (siehe app/data/courses-2.js)
        plan: []
    };
    root.SOR_COURSES = api;
    if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
