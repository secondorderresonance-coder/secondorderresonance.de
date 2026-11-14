/*
 * SOR Grundkurse, Teil 2: Studienplan Maschinenbau (Bachelor)
 * ------------------------------------------------------------
 * Ergänzt SOR_COURSES (app/data/courses.js) um
 *   - TM 3, Fluidmechanik, Werkstoffe, Maschinenelemente, Elektrizitätslehre, Physik, Chemie
 *     (eigene Aufgaben in app/modules/exercises/courses-3.js, courses-4.js und courses-5.js)
 *   - Höhere Mathematik 1 bis 3 als geordnete Kurse über vorhandene Studienthemen (ref: CM-E-xx)
 *   - einen Semesterplan (SOR_COURSES.plan), der Module auf Kurse abbildet
 * Nach coverage-matrix.js und courses.js einbinden.
 */
(function (root) {
    "use strict";
    var C = root.SOR_COURSES || require("./courses.js");
    if (!root.SOR_COVERAGE && typeof require !== "undefined") { try { root.SOR_COVERAGE = require("./coverage-matrix.js"); } catch (e) { /* Browser */ } }

    C.add([
        {
            id: "tm3", subject: "physik", level: 4, short: "TM 3",
            title: { de: "Technische Mechanik 3: Kinematik und Kinetik", en: "Engineering Mechanics 3: Kinematics and kinetics" },
            intro: { de: "Bewegung beschreiben und mit Kräften erklären: Beschleunigung, Kreisbahn, Newton, Energie, Impuls und Schwingung.", en: "Describe motion and explain it with forces: acceleration, circular motion, Newton, energy, momentum and vibration." },
            lessons: [
                { id: "K-TM3-1", visual: "motion", topic: { de: "Gleichmäßig beschleunigte Bewegung", en: "Uniformly accelerated motion" },
                  text: { de: "Bei konstanter Beschleunigung wächst die Geschwindigkeit linear mit der Zeit und der Weg quadratisch. Die Fläche unter dem v-t-Diagramm ist der zurückgelegte Weg.", en: "With constant acceleration the velocity grows linearly with time and the distance quadratically. The area under the v-t diagram is the distance travelled." },
                  formula: ["v = v<sub>0</sub> + a · t", "s = v<sub>0</sub> · t + ½ · a · t<sup>2</sup>", "v<sup>2</sup> = v<sub>0</sub><sup>2</sup> + 2 · a · s"] },
                { id: "K-TM3-2", visual: "circular", topic: { de: "Kreisbewegung", en: "Circular motion" },
                  text: { de: "Auf einer Kreisbahn ändert die Geschwindigkeit ständig ihre Richtung. Dafür braucht es eine Beschleunigung zum Mittelpunkt hin, die Zentripetalbeschleunigung.", en: "On a circular path the velocity keeps changing direction. That needs an acceleration towards the centre, the centripetal acceleration." },
                  formula: ["v = ω · r,  ω = 2π · n", "a<sub>n</sub> = v<sup>2</sup> / r = ω<sup>2</sup> · r", "F<sub>Z</sub> = m · ω<sup>2</sup> · r"] },
                { id: "K-TM3-3", visual: "incline", topic: { de: "Newton und Reibung", en: "Newton's law and friction" },
                  text: { de: "Die Summe aller Kräfte beschleunigt die Masse: F = m · a. Auf der schiefen Ebene zerlegt man die Gewichtskraft in Hangabtrieb und Normalkraft, die Reibung wirkt der Bewegung entgegen.", en: "The sum of all forces accelerates the mass: F = m · a. On an incline you split the weight into a downhill component and a normal component, and friction opposes the motion." },
                  formula: ["ΣF = m · a", "F<sub>H</sub> = m g sin α,  F<sub>N</sub> = m g cos α", "F<sub>R</sub> = μ · F<sub>N</sub>"] },
                { id: "K-TM3-4", visual: "energy", topic: { de: "Arbeit, Energie und Leistung", en: "Work, energy and power" },
                  text: { de: "Ohne Reibung bleibt die Summe aus Lage- und Bewegungsenergie gleich. Leistung ist Arbeit pro Zeit oder Kraft mal Geschwindigkeit.", en: "Without friction the sum of potential and kinetic energy stays constant. Power is work per time or force times velocity." },
                  formula: ["E<sub>pot</sub> = m g h,  E<sub>kin</sub> = ½ m v<sup>2</sup>", "v = √(2 g h)", "P = W / t = F · v"] },
                { id: "K-TM3-5", visual: "collision", topic: { de: "Impuls und Stoß", en: "Momentum and collisions" },
                  text: { de: "Beim Stoß bleibt der Gesamtimpuls erhalten. Beim vollständig unelastischen Stoß bewegen sich beide Körper danach gemeinsam, ein Teil der Energie wird in Wärme umgesetzt.", en: "In a collision the total momentum is conserved. In a perfectly inelastic collision both bodies move together afterwards and part of the energy turns into heat." },
                  formula: ["p = m · v", "m<sub>1</sub>v<sub>1</sub> + m<sub>2</sub>v<sub>2</sub> = (m<sub>1</sub> + m<sub>2</sub>) · v′", "F · Δt = Δp"] },
                { id: "K-TM3-6", visual: "spring", topic: { de: "Freie Schwingung", en: "Free vibration" },
                  text: { de: "Eine Masse an einer Feder schwingt mit einer Eigenkreisfrequenz, die nur von Steifigkeit und Masse abhängt. Steifer heißt schneller, schwerer heißt langsamer.", en: "A mass on a spring oscillates at a natural angular frequency that depends only on stiffness and mass. Stiffer means faster, heavier means slower." },
                  formula: ["ω<sub>0</sub> = √(c / m)", "f = ω<sub>0</sub> / 2π,  T = 1 / f", "x(t) = x̂ · cos(ω<sub>0</sub> t)"] }
            ]
        },
        {
            id: "fluid", subject: "physik", level: 4, short: { de: "Fluid", en: "Fluids" },
            title: { de: "Fluidmechanik", en: "Fluid mechanics" },
            intro: { de: "Druck, Auftrieb und Strömung: wie Wasser und Luft Kräfte übertragen und warum Rohre Druck kosten.", en: "Pressure, buoyancy and flow: how water and air transmit forces and why pipes cost pressure." },
            lessons: [
                { id: "K-FL-1", visual: "hydro", topic: { de: "Hydrostatischer Druck", en: "Hydrostatic pressure" },
                  text: { de: "In einer ruhenden Flüssigkeit wächst der Druck linear mit der Tiefe. Die Form des Gefäßes spielt dabei keine Rolle.", en: "In a liquid at rest the pressure grows linearly with depth. The shape of the container does not matter." },
                  formula: ["p = p<sub>0</sub> + ρ · g · h", "F = p · A"] },
                { id: "K-FL-2", visual: "buoyancy", topic: { de: "Auftrieb", en: "Buoyancy" },
                  text: { de: "Ein eingetauchter Körper erfährt eine Auftriebskraft gleich dem Gewicht der verdrängten Flüssigkeit. Ein Körper schwimmt, wenn seine Dichte kleiner ist als die der Flüssigkeit.", en: "A submerged body experiences a buoyant force equal to the weight of the displaced liquid. A body floats if its density is lower than that of the liquid." },
                  formula: ["F<sub>A</sub> = ρ<sub>Fl</sub> · g · V<sub>verdr</sub>", { de: "Eintauchanteil = ρ<sub>Körper</sub> / ρ<sub>Fl</sub>", en: "immersed fraction = ρ<sub>body</sub> / ρ<sub>liquid</sub>" }] },
                { id: "K-FL-3", visual: "continuity", topic: { de: "Kontinuitätsgleichung", en: "Continuity equation" },
                  text: { de: "Was in ein Rohr hineinfließt, muss auch hinausfließen. Wird das Rohr enger, strömt die Flüssigkeit schneller.", en: "What flows into a pipe must also flow out. If the pipe narrows, the liquid flows faster." },
                  formula: [{ de: "V̇ = A · v = konst.", en: "V̇ = A · v = const." }, "A<sub>1</sub> · v<sub>1</sub> = A<sub>2</sub> · v<sub>2</sub>"] },
                { id: "K-FL-4", visual: "bernoulli", topic: { de: "Bernoulli-Gleichung", en: "Bernoulli's equation" },
                  text: { de: "Entlang einer Stromlinie ohne Verluste bleibt die Summe aus statischem Druck, dynamischem Druck und Höhendruck gleich. Wo es schneller strömt, sinkt der Druck.", en: "Along a streamline without losses the sum of static pressure, dynamic pressure and height pressure stays constant. Where the flow is faster, the pressure drops." },
                  formula: [{ de: "p + ½ ρ v<sup>2</sup> + ρ g z = konst.", en: "p + ½ ρ v<sup>2</sup> + ρ g z = const." }, "v = √(2 g h)  (Torricelli)"] },
                { id: "K-FL-5", visual: "reynolds", topic: { de: "Reynolds-Zahl", en: "Reynolds number" },
                  text: { de: "Die Reynolds-Zahl vergleicht Trägheit und Zähigkeit. In Rohren ist die Strömung unterhalb von etwa 2300 laminar, darüber wird sie turbulent.", en: "The Reynolds number compares inertia and viscosity. In pipes the flow is laminar below about 2300 and becomes turbulent above." },
                  formula: ["Re = v · d / ν = ρ · v · d / η", { de: "Re < 2300: laminar", en: "Re < 2300: laminar" }] },
                { id: "K-FL-6", visual: "pipeloss", topic: { de: "Druckverlust im Rohr", en: "Pressure loss in pipes" },
                  text: { de: "Reibung an der Rohrwand kostet Druck. Der Verlust wächst mit der Länge und quadratisch mit der Geschwindigkeit, bei laminarer Strömung gilt λ = 64 / Re.", en: "Friction at the pipe wall costs pressure. The loss grows with length and with the square of the velocity; for laminar flow λ = 64 / Re." },
                  formula: ["Δp = λ · (L / d) · ½ ρ v<sup>2</sup>", { de: "laminar: λ = 64 / Re", en: "laminar: λ = 64 / Re" }] }
            ]
        },
        {
            id: "wkst", subject: "physik", level: 4, short: { de: "Werkstoffe", en: "Materials" },
            title: { de: "Werkstoffe des Maschinenbaus", en: "Engineering materials" },
            intro: { de: "Warum Stahl sich anders verhält als Aluminium: Kennwerte, Gitter, Gefüge, Leichtbau und Ermüdung.", en: "Why steel behaves differently from aluminium: properties, lattices, microstructure, lightweight design and fatigue." },
            lessons: [
                { id: "K-WS-1", visual: "stressstrain", topic: { de: "Zugversuch und Kennwerte", en: "Tensile test and properties" },
                  text: { de: "Im Zugversuch wird eine Probe bis zum Bruch gedehnt. Aus dem Diagramm liest man E-Modul, Streckgrenze R<sub>e</sub>, Zugfestigkeit R<sub>m</sub> und Bruchdehnung A ab.", en: "In a tensile test a specimen is stretched until it breaks. From the diagram you read Young's modulus, yield strength R<sub>e</sub>, tensile strength R<sub>m</sub> and elongation at fracture A." },
                  formula: ["σ = F / S<sub>0</sub>,  ε = ΔL / L<sub>0</sub>", { de: "E = σ / ε  (elastisch)", en: "E = σ / ε  (elastic)" }, "A = ΔL<sub>Bruch</sub> / L<sub>0</sub> · 100 %"] },
                { id: "K-WS-2", visual: "lightweight", topic: { de: "Dichte und Leichtbau", en: "Density and lightweight design" },
                  text: { de: "Für Leichtbau zählt nicht die Festigkeit allein, sondern Festigkeit oder Steifigkeit pro Masse. Aluminium ist weniger steif als Stahl, aber auch fast dreimal leichter.", en: "For lightweight design what counts is not strength alone but strength or stiffness per mass. Aluminium is less stiff than steel but also almost three times lighter." },
                  formula: [{ de: "spezifische Steifigkeit: E / ρ", en: "specific stiffness: E / ρ" }, { de: "Reißlänge: R<sub>m</sub> / (ρ g)", en: "breaking length: R<sub>m</sub> / (ρ g)" }] },
                { id: "K-WS-3", visual: "lattice", topic: { de: "Kristallgitter", en: "Crystal lattices" },
                  text: { de: "Metalle bilden Gitter aus Elementarzellen. Kubisch-raumzentriert (krz) enthält 2 Atome pro Zelle, kubisch-flächenzentriert (kfz) 4. Das kfz-Gitter ist dichter gepackt und gut verformbar.", en: "Metals form lattices of unit cells. Body-centred cubic (bcc) contains 2 atoms per cell, face-centred cubic (fcc) 4. The fcc lattice is packed more densely and deforms easily." },
                  formula: [{ de: "krz: 2 Atome, a = 4r / √3, Packungsdichte 68 %", en: "bcc: 2 atoms, a = 4r / √3, packing 68%" }, { de: "kfz: 4 Atome, a = 4r / √2, Packungsdichte 74 %", en: "fcc: 4 atoms, a = 4r / √2, packing 74%" }, "ρ = n · M / (N<sub>A</sub> · a<sup>3</sup>)"] },
                { id: "K-WS-4", visual: "leverrule", topic: { de: "Zustandsdiagramm und Hebelgesetz", en: "Phase diagrams and the lever rule" },
                  text: { de: "Im Zweiphasengebiet eines Zustandsdiagramms liegen zwei Phasen nebeneinander vor. Ihre Mengenanteile ergeben sich wie bei einer Balkenwaage aus den Abständen zur Legierungszusammensetzung.", en: "In the two-phase region of a phase diagram two phases coexist. Their fractions follow, as on a balance beam, from the distances to the alloy composition." },
                  formula: ["m<sub>α</sub> / m<sub>ges</sub> = (c<sub>β</sub> − c<sub>0</sub>) / (c<sub>β</sub> − c<sub>α</sub>)", "m<sub>β</sub> / m<sub>ges</sub> = (c<sub>0</sub> − c<sub>α</sub>) / (c<sub>β</sub> − c<sub>α</sub>)"] },
                { id: "K-WS-5", visual: "fatigue", topic: { de: "Kerbwirkung und Ermüdung", en: "Notches and fatigue" },
                  text: { de: "An Kerben steigt die Spannung örtlich weit über die Nennspannung. Bei schwingender Belastung versagen Bauteile deshalb oft weit unterhalb der Zugfestigkeit.", en: "At notches the stress rises locally far above the nominal stress. Under cyclic loading parts therefore often fail far below the tensile strength." },
                  formula: ["σ<sub>max</sub> = α<sub>k</sub> · σ<sub>n</sub>", "S = σ<sub>D</sub> / σ<sub>a</sub>", { de: "Wöhler: σ<sub>a</sub><sup>k</sup> · N = konst.", en: "Wöhler: σ<sub>a</sub><sup>k</sup> · N = const." }] }
            ]
        },
        {
            id: "me", subject: "physik", level: 4, short: { de: "ME", en: "ME" },
            title: { de: "Maschinenelemente", en: "Machine elements" },
            intro: { de: "Die Bausteine jeder Maschine sicher auslegen: Festigkeitsnachweis, Schrauben, Wellen, Lager, Zahnräder und Federn.", en: "Design the building blocks of every machine safely: strength checks, bolts, shafts, bearings, gears and springs." },
            lessons: [
                { id: "K-ME-1", visual: "safety", topic: { de: "Festigkeitsnachweis", en: "Strength verification" },
                  text: { de: "Wirken Normal- und Schubspannung zugleich, fasst man sie zu einer Vergleichsspannung zusammen. Die Sicherheit ist die zulässige Werkstoffgrenze geteilt durch diese Vergleichsspannung.", en: "When normal and shear stress act together, they are combined into an equivalent stress. The safety factor is the permissible material limit divided by this equivalent stress." },
                  formula: ["σ<sub>v</sub> = √(σ<sup>2</sup> + 3 τ<sup>2</sup>)  (von Mises)", "S = R<sub>e</sub> / σ<sub>v</sub> ≥ S<sub>min</sub>"] },
                { id: "K-ME-2", visual: "bolt", topic: { de: "Schraubenverbindungen", en: "Bolted joints" },
                  text: { de: "Eine vorgespannte Schraube presst Bauteile zusammen. Querkräfte werden über Reibung in der Trennfuge übertragen, die Schraube selbst wird auf Zug im Spannungsquerschnitt beansprucht.", en: "A preloaded bolt clamps parts together. Transverse forces are carried by friction in the joint, while the bolt itself is loaded in tension over its stress area." },
                  formula: ["σ = F<sub>V</sub> / A<sub>S</sub>", { de: "Reibschluss: F<sub>Q</sub> ≤ μ · F<sub>V</sub> · Anzahl Fugen", en: "friction grip: F<sub>Q</sub> ≤ μ · F<sub>V</sub> · number of interfaces" }] },
                { id: "K-ME-3", visual: "shaft", topic: { de: "Wellen und Torsion", en: "Shafts and torsion" },
                  text: { de: "Eine Welle überträgt Leistung als Drehmoment bei einer Drehzahl. Das Moment erzeugt Torsionsspannungen, die am Rand am größten sind.", en: "A shaft transmits power as torque at a rotational speed. The torque creates torsional stresses that are largest at the surface." },
                  formula: ["P = T · ω = T · 2π n", "τ<sub>t</sub> = T / W<sub>t</sub>,  W<sub>t</sub> = π d<sup>3</sup> / 16"] },
                { id: "K-ME-4", visual: "bearing", topic: { de: "Wälzlager-Lebensdauer", en: "Rolling bearing life" },
                  text: { de: "Die nominelle Lebensdauer gibt an, wie viele Umdrehungen 90 % der Lager erreichen. Sie hängt stark vom Verhältnis aus Tragzahl C und Belastung P ab.", en: "The nominal life states how many revolutions 90% of bearings reach. It depends strongly on the ratio of load rating C to load P." },
                  formula: [{ de: "L<sub>10</sub> = (C / P)<sup>p</sup> · 10<sup>6</sup> Umdrehungen", en: "L<sub>10</sub> = (C / P)<sup>p</sup> · 10<sup>6</sup> revolutions" }, { de: "p = 3 Kugellager,  p = 10/3 Rollenlager", en: "p = 3 ball bearings,  p = 10/3 roller bearings" }, "L<sub>10h</sub> = L<sub>10</sub> / (60 · n)"] },
                { id: "K-ME-5", visual: "gears", topic: { de: "Zahnräder und Getriebe", en: "Gears and gearboxes" },
                  text: { de: "Ein Zahnradpaar übersetzt Drehzahl und Drehmoment. Was an Drehzahl verloren geht, gewinnt man an Moment, abzüglich der Verluste.", en: "A gear pair converts speed and torque. What is lost in speed is gained in torque, minus the losses." },
                  formula: ["i = z<sub>2</sub> / z<sub>1</sub> = n<sub>1</sub> / n<sub>2</sub>", "T<sub>2</sub> = T<sub>1</sub> · i · η", "d = m · z,  a = m (z<sub>1</sub> + z<sub>2</sub>) / 2"] },
                { id: "K-ME-6", visual: "springs", topic: { de: "Federn", en: "Springs" },
                  text: { de: "Die Federrate sagt, wie viel Kraft pro Millimeter Weg nötig ist. Parallel geschaltete Federn addieren ihre Raten, in Reihe addieren sich die Kehrwerte.", en: "The spring rate tells how much force is needed per millimetre of travel. Springs in parallel add their rates, in series the reciprocals add." },
                  formula: ["c = F / s", { de: "parallel: c = c<sub>1</sub> + c<sub>2</sub>", en: "parallel: c = c<sub>1</sub> + c<sub>2</sub>" }, { de: "Reihe: 1/c = 1/c<sub>1</sub> + 1/c<sub>2</sub>", en: "series: 1/c = 1/c<sub>1</sub> + 1/c<sub>2</sub>" }, "W = ½ c s<sup>2</sup>"] }
            ]
        },
        {
            id: "etech", subject: "physik", level: 4, short: { de: "E-Lehre", en: "Electrical" },
            title: { de: "Technische Elektrizitätslehre", en: "Electrical engineering basics" },
            intro: { de: "Strom, Spannung und Widerstand bis zu Kondensator, Wechselstrom und Drehstrom: was jede Ingenieurin über Elektrik wissen muss.", en: "Current, voltage and resistance through to capacitors, AC and three-phase power: what every engineer needs to know about electrics." },
            lessons: [
                { id: "K-ET-1", visual: "ohm", topic: { de: "Ohmsches Gesetz und Leistung", en: "Ohm's law and power" },
                  text: { de: "Die Spannung treibt den Strom durch einen Widerstand. Die umgesetzte elektrische Leistung ist Spannung mal Strom.", en: "Voltage drives current through a resistor. The electrical power converted is voltage times current." },
                  formula: ["U = R · I", "P = U · I = I<sup>2</sup> R = U<sup>2</sup> / R"] },
                { id: "K-ET-2", visual: "resnet", topic: { de: "Reihen- und Parallelschaltung", en: "Series and parallel circuits" },
                  text: { de: "In Reihe addieren sich Widerstände, parallel addieren sich die Leitwerte. Der Ersatzwiderstand einer Parallelschaltung ist immer kleiner als der kleinste Einzelwiderstand.", en: "In series resistances add, in parallel the conductances add. The equivalent resistance of a parallel circuit is always smaller than the smallest single resistor." },
                  formula: [{ de: "Reihe: R = R<sub>1</sub> + R<sub>2</sub>", en: "series: R = R<sub>1</sub> + R<sub>2</sub>" }, { de: "parallel: R = R<sub>1</sub>R<sub>2</sub> / (R<sub>1</sub> + R<sub>2</sub>)", en: "parallel: R = R<sub>1</sub>R<sub>2</sub> / (R<sub>1</sub> + R<sub>2</sub>)" }] },
                { id: "K-ET-3", visual: "divider", topic: { de: "Kirchhoff und Spannungsteiler", en: "Kirchhoff's laws and voltage dividers" },
                  text: { de: "In jedem Knoten ist die Summe der Ströme null, in jeder Masche die Summe der Spannungen. Daraus folgt der Spannungsteiler, mit dem Sensorschaltungen arbeiten.", en: "At every node the currents sum to zero, around every loop the voltages do. This gives the voltage divider that sensor circuits rely on." },
                  formula: ["ΣI = 0,  ΣU = 0", "U<sub>2</sub> = U · R<sub>2</sub> / (R<sub>1</sub> + R<sub>2</sub>)"] },
                { id: "K-ET-4", visual: "rc", topic: { de: "Kondensator und RC-Glied", en: "Capacitors and RC circuits" },
                  text: { de: "Ein Kondensator speichert Ladung. Über einen Widerstand lädt er sich exponentiell auf, nach einer Zeitkonstante τ sind rund 63 % erreicht.", en: "A capacitor stores charge. Through a resistor it charges exponentially; after one time constant τ about 63% is reached." },
                  formula: ["Q = C · U", "τ = R · C", "u<sub>C</sub>(t) = U · (1 − e<sup>−t/τ</sup>)"] },
                { id: "K-ET-5", visual: "ac", topic: { de: "Wechselstrom und Impedanz", en: "Alternating current and impedance" },
                  text: { de: "Wechselgrößen schwingen sinusförmig, gemessen wird meist der Effektivwert. Spule und Kondensator haben frequenzabhängige Blindwiderstände.", en: "AC quantities oscillate sinusoidally; usually the RMS value is measured. Inductors and capacitors have frequency-dependent reactances." },
                  formula: ["U<sub>eff</sub> = û / √2", "X<sub>L</sub> = ω L,  X<sub>C</sub> = 1 / (ω C)", "|Z| = √(R<sup>2</sup> + (X<sub>L</sub> − X<sub>C</sub>)<sup>2</sup>)"] },
                { id: "K-ET-6", visual: "threephase", topic: { de: "Drehstrom", en: "Three-phase power" },
                  text: { de: "Drehstrom besteht aus drei um 120° versetzten Spannungen. Motoren werden damit gleichmäßig versorgt, die Leistung hängt auch vom Leistungsfaktor cos φ ab.", en: "Three-phase power consists of three voltages shifted by 120°. It feeds motors evenly, and the power also depends on the power factor cos φ." },
                  formula: ["P = √3 · U · I · cos φ", { de: "U<sub>Strang</sub> = U / √3  (Stern)", en: "U<sub>phase</sub> = U / √3  (star)" }] }
            ]
        },
        {
            id: "phys", subject: "physik", level: 4, short: { de: "Physik", en: "Physics" },
            title: { de: "Physik für Ingenieure", en: "Physics for engineers" },
            intro: { de: "Würfe, Linsen, Licht, Wellen, Doppler-Effekt und radioaktiver Zerfall: die Physik aus dem ersten Semester.", en: "Projectiles, lenses, light, waves, the Doppler effect and radioactive decay: the physics of the first semester." },
            lessons: [
                { id: "K-PH-1", visual: "projectile", topic: { de: "Waagerechter Wurf", en: "Horizontal projectile" },
                  text: { de: "Horizontal fliegt der Körper gleichförmig weiter, vertikal fällt er frei. Beide Bewegungen überlagern sich ungestört zu einer Parabel.", en: "Horizontally the body keeps moving uniformly, vertically it falls freely. Both motions superpose without interfering to form a parabola." },
                  formula: ["x = v<sub>0</sub> · t,  y = ½ g t<sup>2</sup>", "t<sub>F</sub> = √(2h / g),  w = v<sub>0</sub> · t<sub>F</sub>"] },
                { id: "K-PH-2", visual: "lens", topic: { de: "Linsen und Abbildung", en: "Lenses and imaging" },
                  text: { de: "Eine Sammellinse bildet einen Gegenstand scharf ab, wenn Gegenstands- und Bildweite zur Brennweite passen. Der Abbildungsmaßstab ist das Verhältnis der Weiten.", en: "A converging lens forms a sharp image when object and image distance match the focal length. The magnification is the ratio of the distances." },
                  formula: ["1/f = 1/g + 1/b", "B / G = b / g"] },
                { id: "K-PH-3", visual: "refraction", topic: { de: "Brechung und Totalreflexion", en: "Refraction and total internal reflection" },
                  text: { de: "Beim Übergang in ein anderes Medium knickt Licht ab. Vom dichteren ins dünnere Medium wird es ab dem Grenzwinkel vollständig reflektiert, so funktionieren Glasfasern.", en: "Light bends when it enters another medium. Going from a denser to a less dense medium it is totally reflected beyond the critical angle, which is how optical fibres work." },
                  formula: ["n<sub>1</sub> sin α<sub>1</sub> = n<sub>2</sub> sin α<sub>2</sub>", "sin α<sub>G</sub> = n<sub>2</sub> / n<sub>1</sub>"] },
                { id: "K-PH-4", visual: "wave", topic: { de: "Wellen", en: "Waves" },
                  text: { de: "Eine Welle transportiert Energie, ohne Materie mitzunehmen. Geschwindigkeit, Wellenlänge und Frequenz hängen fest zusammen.", en: "A wave transports energy without carrying matter along. Speed, wavelength and frequency are tightly linked." },
                  formula: ["c = λ · f", "T = 1 / f"] },
                { id: "K-PH-5", visual: "doppler", topic: { de: "Doppler-Effekt", en: "Doppler effect" },
                  text: { de: "Kommt eine Schallquelle auf dich zu, drängen sich die Wellenfronten zusammen und der Ton klingt höher. Entfernt sie sich, klingt er tiefer.", en: "When a sound source approaches you, the wavefronts crowd together and the pitch sounds higher. When it moves away, it sounds lower." },
                  formula: [{ de: "Quelle nähert sich: f′ = f · c / (c − v)", en: "source approaching: f′ = f · c / (c − v)" }, { de: "Quelle entfernt sich: f′ = f · c / (c + v)", en: "source receding: f′ = f · c / (c + v)" }] },
                { id: "K-PH-6", visual: "decay", topic: { de: "Radioaktiver Zerfall", en: "Radioactive decay" },
                  text: { de: "Nach jeder Halbwertszeit ist die Hälfte der Kerne zerfallen. Das gilt unabhängig davon, wie viele Kerne am Anfang da waren.", en: "After each half-life half of the nuclei have decayed. That holds no matter how many nuclei there were at the start." },
                  formula: ["N(t) = N<sub>0</sub> · (½)<sup>t / T<sub>½</sub></sup>", "λ = ln 2 / T<sub>½</sub>"] }
            ]
        },
        {
            id: "hm1", subject: "mathe", level: 4, short: "HM 1",
            title: { de: "Höhere Mathematik 1", en: "Higher Mathematics 1" },
            intro: { de: "Komplexe Zahlen, Grenzwerte, Reihen und lineare Algebra: das Fundament des ersten Semesters, mit Aufgaben aus dem Studienbereich.", en: "Complex numbers, limits, series and linear algebra: the foundation of the first semester, with exercises from the university area." },
            lessons: [
                { ref: "CM-E-05", visual: "complex",
                  text: { de: "Mit i<sup>2</sup> = −1 wird aus der Zahlengeraden eine Ebene. Multiplizieren heißt dort: Beträge multiplizieren, Winkel addieren.", en: "With i<sup>2</sup> = −1 the number line becomes a plane. Multiplying there means multiplying the moduli and adding the angles." },
                  formula: ["z = a + b i = r · e<sup>iφ</sup>", "r = √(a<sup>2</sup> + b<sup>2</sup>)", "z<sup>n</sup> = r<sup>n</sup> · e<sup>i n φ</sup>"] },
                { ref: "CM-E-06", visual: "sequence",
                  text: { de: "Eine Folge konvergiert, wenn ihre Glieder einem Wert beliebig nahe kommen und dort bleiben. Bei Brüchen entscheidet meist die höchste Potenz von n.", en: "A sequence converges if its terms get arbitrarily close to a value and stay there. For fractions the highest power of n usually decides." },
                  formula: [{ de: "a<sub>n</sub> → a  ⇔  |a<sub>n</sub> − a| < ε  für n > N", en: "a<sub>n</sub> → a  ⇔  |a<sub>n</sub> − a| < ε  for n > N" }, "(1 + a/n)<sup>n</sup> → e<sup>a</sup>"] },
                { ref: "CM-E-07", visual: "tangent",
                  text: { de: "Eine Potenzreihe nähert eine Funktion durch Polynome an. Die Taylorreihe liest die Koeffizienten direkt aus den Ableitungen an einer Stelle ab.", en: "A power series approximates a function with polynomials. The Taylor series reads the coefficients straight from the derivatives at one point." },
                  formula: [{ de: "Σ q<sup>k</sup> = 1 / (1 − q)  für |q| < 1", en: "Σ q<sup>k</sup> = 1 / (1 − q)  for |q| < 1" }, "f(x) = Σ f<sup>(k)</sup>(0) / k! · x<sup>k</sup>"] },
                { ref: "CM-E-01", visual: "system",
                  text: { de: "Ein lineares Gleichungssystem schreibt man kompakt als A · x = b. Ist die Determinante ungleich null, gibt es genau eine Lösung.", en: "A system of linear equations is written compactly as A · x = b. If the determinant is non-zero, there is exactly one solution." },
                  formula: ["A · x = b", "det A ≠ 0  ⇒  x = A<sup>−1</sup> b"] },
                { ref: "CM-E-03", visual: "matrix",
                  text: { de: "Ein Eigenvektor wird von der Matrix nur gestreckt, nicht gedreht. Der Streckfaktor ist der Eigenwert, man findet ihn über das charakteristische Polynom.", en: "An eigenvector is only stretched by the matrix, not rotated. The stretch factor is the eigenvalue, found from the characteristic polynomial." },
                  formula: ["A · v = λ · v", "det(A − λ I) = 0", { de: "λ<sub>1</sub> + λ<sub>2</sub> = Spur A,  λ<sub>1</sub> λ<sub>2</sub> = det A", en: "λ<sub>1</sub> + λ<sub>2</sub> = trace A,  λ<sub>1</sub> λ<sub>2</sub> = det A" }] },
                { ref: "CM-E-04", visual: "vector",
                  text: { de: "Senkrechte Vektoren haben Skalarprodukt null. Mit der Projektion zerlegt man einen Vektor in einen Anteil entlang einer Richtung und einen senkrechten Rest.", en: "Perpendicular vectors have a dot product of zero. Projection splits a vector into a part along a direction and a perpendicular remainder." },
                  formula: ["u · v = 0  ⇔  u ⟂ v", "proj<sub>u</sub> v = (u · v) / (u · u) · u"] }
            ]
        },
        {
            id: "hm2", subject: "mathe", level: 4, short: "HM 2",
            title: { de: "Höhere Mathematik 2", en: "Higher Mathematics 2" },
            intro: { de: "Analysis in mehreren Variablen, Integrale bis ins Unendliche und erste numerische Verfahren.", en: "Calculus in several variables, integrals to infinity and first numerical methods." },
            lessons: [
                { ref: "CM-E-08", visual: "extrema",
                  text: { de: "Partielle Ableitungen messen die Steigung in eine Achsenrichtung. Der Gradient zeigt in Richtung des steilsten Anstiegs, an Extremstellen ist er null.", en: "Partial derivatives measure the slope in one axis direction. The gradient points in the direction of steepest ascent and is zero at extrema." },
                  formula: ["∇f = (f<sub>x</sub>, f<sub>y</sub>)", { de: "∇f = 0, det H > 0, f<sub>xx</sub> < 0  ⇒  Maximum", en: "∇f = 0, det H > 0, f<sub>xx</sub> < 0  ⇒  maximum" }] },
                { ref: "CM-E-09", visual: "efunc",
                  text: { de: "Ein uneigentliches Integral ist ein Grenzwert: man integriert bis b und lässt b gegen unendlich laufen. Es konvergiert nur, wenn der Integrand schnell genug abfällt.", en: "An improper integral is a limit: integrate up to b and let b tend to infinity. It converges only if the integrand decays fast enough." },
                  formula: ["∫<sub>a</sub><sup>∞</sup> f dx = lim<sub>b→∞</sub> ∫<sub>a</sub><sup>b</sup> f dx", { de: "∫<sub>1</sub><sup>∞</sup> x<sup>−p</sup> dx  konvergiert für p > 1", en: "∫<sub>1</sub><sup>∞</sup> x<sup>−p</sup> dx  converges for p > 1" }] },
                { ref: "CM-E-10", visual: "integral",
                  text: { de: "Doppelintegrale summieren über Flächen. Man integriert innen zuerst und behandelt die äußere Variable dabei als Konstante, bei Kreisen helfen Polarkoordinaten.", en: "Double integrals sum over areas. Integrate the inner integral first, treating the outer variable as a constant; for circles polar coordinates help." },
                  formula: ["∬ f dA = ∫ ( ∫ f dy ) dx", "dA = r dr dφ"] },
                { ref: "CM-E-15", visual: "round",
                  text: { de: "Jede Messung hat einen Fehler, und Rechnungen pflanzen ihn fort. Bei Produkten und Quotienten addieren sich in erster Näherung die relativen Fehler.", en: "Every measurement has an error, and calculations propagate it. For products and quotients the relative errors add to first order." },
                  formula: ["Δf ≈ |f′(x)| · Δx", "Δ(xy)/(xy) ≈ Δx/x + Δy/y"] },
                { ref: "CM-E-16", visual: "derivative",
                  text: { de: "Das Newton-Verfahren ersetzt die Funktion durch ihre Tangente und springt zu deren Nullstelle. Nahe an der Lösung verdoppelt sich die Zahl richtiger Stellen pro Schritt.", en: "Newton's method replaces the function by its tangent and jumps to the tangent's zero. Close to the solution the number of correct digits doubles each step." },
                  formula: ["x<sub>k+1</sub> = x<sub>k</sub> − f(x<sub>k</sub>) / f′(x<sub>k</sub>)"] },
                { ref: "CM-E-17", visual: "iarea",
                  text: { de: "Wenn keine Stammfunktion bekannt ist, nähert man die Fläche numerisch an. Trapez- und Simpsonregel ersetzen die Kurve stückweise durch Geraden oder Parabeln.", en: "When no antiderivative is known, the area is approximated numerically. The trapezoidal and Simpson rules replace the curve piecewise by lines or parabolas." },
                  formula: ["T = h · (f<sub>0</sub>/2 + f<sub>1</sub> + … + f<sub>n</sub>/2)", "S = h/3 · (f<sub>0</sub> + 4f<sub>1</sub> + 2f<sub>2</sub> + … + f<sub>n</sub>)"] }
            ]
        },
        {
            id: "hm3", subject: "mathe", level: 5, short: "HM 3",
            title: { de: "Höhere Mathematik 3", en: "Higher Mathematics 3" },
            intro: { de: "Differentialgleichungen, Fourier und Laplace: die Mathematik hinter Schwingungen, Regelung und Wärmeleitung.", en: "Differential equations, Fourier and Laplace: the mathematics behind vibrations, control and heat conduction." },
            lessons: [
                { ref: "CM-E-11", visual: "exp",
                  text: { de: "Eine DGL erster Ordnung verbindet eine Größe mit ihrer Änderungsrate. y′ = k · y beschreibt Wachstum und Abklingen, die Lösung ist eine Exponentialfunktion.", en: "A first-order ODE links a quantity to its rate of change. y′ = k · y describes growth and decay, and the solution is an exponential function." },
                  formula: ["y′ = k · y  ⇒  y = y<sub>0</sub> e<sup>kt</sup>", "y′ = a − b y  ⇒  y → a / b"] },
                { ref: "CM-E-12", visual: "spring",
                  text: { de: "Die lineare DGL zweiter Ordnung beschreibt Feder-Masse-Dämpfer-Systeme. Die Nullstellen des charakteristischen Polynoms entscheiden, ob das System schwingt oder kriecht.", en: "The second-order linear ODE describes spring-mass-damper systems. The roots of the characteristic polynomial decide whether the system oscillates or creeps." },
                  formula: ["m ÿ + d ẏ + c y = 0", "λ<sup>2</sup> + p λ + q = 0", "D = d / (2 √(m c))"] },
                { ref: "CM-E-13", visual: "rot2d",
                  text: { de: "Mehrere gekoppelte Größen schreibt man als System x′ = A · x. Die Eigenwerte von A bestimmen, ob die Ruhelage stabil ist.", en: "Several coupled quantities are written as a system x′ = A · x. The eigenvalues of A determine whether the equilibrium is stable." },
                  formula: ["x′ = A · x", { de: "Re λ<sub>i</sub> < 0 für alle i  ⇒  stabil", en: "Re λ<sub>i</sub> < 0 for all i  ⇒  stable" }] },
                { ref: "CM-E-22", visual: "sine",
                  text: { de: "Jedes periodische Signal lässt sich als Summe von Sinus- und Kosinusschwingungen schreiben. Die Koeffizienten sagen, wie stark jede Frequenz vertreten ist.", en: "Every periodic signal can be written as a sum of sine and cosine waves. The coefficients say how strongly each frequency is present." },
                  formula: ["f(t) = a<sub>0</sub>/2 + Σ (a<sub>n</sub> cos nωt + b<sub>n</sub> sin nωt)", "f<sub>0</sub> = 1 / T"] },
                { ref: "CM-E-23", visual: "pstep",
                  text: { de: "Die Laplace-Transformation macht aus Ableitungen Multiplikationen mit s. So wird aus einer DGL eine algebraische Gleichung, die man nach Y(s) auflöst und zurücktransformiert.", en: "The Laplace transform turns derivatives into multiplication by s. An ODE becomes an algebraic equation that you solve for Y(s) and transform back." },
                  formula: ["ℒ{f′} = s F(s) − f(0)", "ℒ{e<sup>−at</sup>} = 1 / (s + a)", "lim<sub>t→∞</sub> y(t) = lim<sub>s→0</sub> s Y(s)"] },
                { ref: "CM-E-29", visual: "wall",
                  text: { de: "Partielle DGL hängen von Ort und Zeit ab. Die Wärmeleitungsgleichung lässt Temperaturunterschiede abklingen, die Wellengleichung lässt sie wandern.", en: "Partial differential equations depend on space and time. The heat equation makes temperature differences decay, the wave equation makes them travel." },
                  formula: [{ de: "u<sub>t</sub> = a · u<sub>xx</sub>  (Wärme)", en: "u<sub>t</sub> = a · u<sub>xx</sub>  (heat)" }, { de: "u<sub>tt</sub> = c<sup>2</sup> · u<sub>xx</sub>  (Welle)", en: "u<sub>tt</sub> = c<sup>2</sup> · u<sub>xx</sub>  (wave)" }] }
            ]
        }
    ]);

    // Chemie (1. Semester): eigene Aufgaben in app/modules/exercises/courses-5.js
    C.add([
        {
            id: "chem", subject: "physik", level: 4, short: { de: "Chemie", en: "Chemistry" },
            title: { de: "Chemie für Ingenieure", en: "Chemistry for engineers" },
            intro: { de: "Stoffmenge, Reaktionsgleichungen, Stöchiometrie, Konzentration, pH-Wert und Reaktionsenthalpie: das Rechnen aus der Chemie im ersten Semester.", en: "Amount of substance, chemical equations, stoichiometry, concentration, pH and reaction enthalpy: the calculations of first-semester chemistry." },
            lessons: [
                { id: "K-CH-1", visual: "mole", topic: { de: "Stoffmenge und molare Masse", en: "Amount of substance and molar mass" },
                  text: { de: "Chemiker zählen Teilchen in Mol. Ein Mol sind 6,022 · 10²³ Teilchen, und die molare Masse sagt, wie viel Gramm ein Mol eines Stoffes wiegt.", en: "Chemists count particles in moles. One mole is 6.022 · 10²³ particles, and the molar mass says how many grams one mole of a substance weighs." },
                  formula: ["n = m / M", "N = n · N<sub>A</sub>,  N<sub>A</sub> = 6,022 · 10<sup>23</sup> mol<sup>−1</sup>"] },
                { id: "K-CH-2", visual: "balance", topic: { de: "Reaktionsgleichungen ausgleichen", en: "Balancing chemical equations" },
                  text: { de: "Bei einer Reaktion gehen keine Atome verloren. Die Koeffizienten werden so gewählt, dass links und rechts von jedem Element gleich viele Atome stehen.", en: "No atoms are lost in a reaction. The coefficients are chosen so that each element has the same number of atoms on the left and on the right." },
                  formula: ["CH<sub>4</sub> + 2 O<sub>2</sub> → CO<sub>2</sub> + 2 H<sub>2</sub>O", { de: "Atomzahl links = Atomzahl rechts", en: "atoms on the left = atoms on the right" }] },
                { id: "K-CH-3", visual: "stoich", topic: { de: "Stöchiometrie", en: "Stoichiometry" },
                  text: { de: "Die Koeffizienten geben das Verhältnis der Stoffmengen an. Über die molaren Massen rechnet man von Gramm des Ausgangsstoffs auf Gramm des Produkts.", en: "The coefficients give the ratio of the amounts of substance. Using molar masses you convert from grams of reactant to grams of product." },
                  formula: ["n<sub>B</sub> / n<sub>A</sub> = ν<sub>B</sub> / ν<sub>A</sub>", "m<sub>B</sub> = m<sub>A</sub> · (ν<sub>B</sub> M<sub>B</sub>) / (ν<sub>A</sub> M<sub>A</sub>)"] },
                { id: "K-CH-4", visual: "dilution", topic: { de: "Konzentration und Verdünnung", en: "Concentration and dilution" },
                  text: { de: "Die Stoffmengenkonzentration ist Stoffmenge pro Volumen. Beim Verdünnen bleibt die gelöste Stoffmenge gleich, nur das Volumen wächst.", en: "Molar concentration is amount of substance per volume. When diluting, the dissolved amount stays the same, only the volume grows." },
                  formula: ["c = n / V", "c<sub>1</sub> · V<sub>1</sub> = c<sub>2</sub> · V<sub>2</sub>"] },
                { id: "K-CH-5", visual: "ph", topic: { de: "pH-Wert", en: "pH value" },
                  text: { de: "Der pH-Wert ist der negative Zehnerlogarithmus der Oxoniumkonzentration. Eine Stufe auf der Skala bedeutet den Faktor 10.", en: "The pH value is the negative base-10 logarithm of the oxonium concentration. One step on the scale means a factor of 10." },
                  formula: ["pH = −lg c(H<sub>3</sub>O<sup>+</sup>)", "pH + pOH = 14  (25 °C)"] },
                { id: "K-CH-6", visual: "enthalpy", topic: { de: "Reaktionsenthalpie", en: "Reaction enthalpy" },
                  text: { de: "Die Reaktionsenthalpie folgt aus den Bildungsenthalpien: Produkte minus Ausgangsstoffe. Ein negativer Wert heißt, die Reaktion gibt Wärme ab.", en: "The reaction enthalpy follows from the enthalpies of formation: products minus reactants. A negative value means the reaction releases heat." },
                  formula: [{ de: "Δ<sub>R</sub>H = Σ ν Δ<sub>f</sub>H(Produkte) − Σ ν Δ<sub>f</sub>H(Edukte)", en: "Δ<sub>R</sub>H = Σ ν Δ<sub>f</sub>H(products) − Σ ν Δ<sub>f</sub>H(reactants)" }, { de: "Δ<sub>R</sub>H < 0: exotherm", en: "Δ<sub>R</sub>H < 0: exothermic" }] }
            ]
        }
    ]);

    // Reihenfolge wie im Studium: erst Grundlagen, dann Vertiefung
    var ORDER = ["hm1", "hm2", "stat", "hm3", "trafo", "tm1", "phys", "chem", "etech", "tm2", "tm3", "wkst", "thermo", "me", "fluid", "pid"];
    C.courses.sort(function (a, b) { return ORDER.indexOf(a.id) - ORDER.indexOf(b.id); });

    // Semesterplan eines Maschinenbau-Bachelors: Modul → Kurs (null = noch kein Kurs)
    var M = function (de, en, course) { return { title: C.L({ de: de, en: en }), course: course || null }; };
    C.plan = [
        { sem: 1, modules: [M("Höhere Mathematik 1", "Higher Mathematics 1", "hm1"), M("Technische Mechanik 1", "Engineering Mechanics 1", "tm1"), M("Physik", "Physics", "phys"), M("Technische Elektrizitätslehre", "Electrical engineering", "etech"), M("Chemie", "Chemistry", "chem"), M("CAD und Maschinenzeichnen", "CAD and technical drawing"), M("Informationstechnik", "Information technology")] },
        { sem: 2, modules: [M("Höhere Mathematik 2", "Higher Mathematics 2", "hm2"), M("Technische Mechanik 2", "Engineering Mechanics 2", "tm2"), M("Modellierung von Unsicherheiten und Daten", "Modelling uncertainty and data", "stat"), M("Technische Elektrizitätslehre", "Electrical engineering", "etech"), M("CAD und Maschinenzeichnen", "CAD and technical drawing"), M("Informationstechnik", "Information technology")] },
        { sem: 3, modules: [M("Höhere Mathematik 3", "Higher Mathematics 3", "hm3"), M("Technische Mechanik 3", "Engineering Mechanics 3", "tm3"), M("Werkstoffe des Maschinenbaus 1", "Engineering materials 1", "wkst"), M("Thermodynamik", "Thermodynamics", "thermo"), M("Maschinenelemente", "Machine elements", "me")] },
        { sem: 4, modules: [M("Fluidmechanik 1", "Fluid mechanics 1", "fluid"), M("Regelungstechnik", "Control engineering", "pid"), M("Werkstoffe des Maschinenbaus 2", "Engineering materials 2", "wkst"), M("Wärmetransportphänomene", "Heat transfer", "thermo"), M("Maschinenelemente", "Machine elements", "me")] },
        { sem: 5, modules: [M("Mathematische Tools", "Mathematical tools", "hm3"), M("Bachelormodule, Ergänzungsmodul, Projektarbeit", "Bachelor modules, elective, project")] },
        { sem: 6, modules: [M("Bachelormodule, Ergänzungsmodul, Bachelor's Thesis", "Bachelor modules, elective, bachelor's thesis")] }
    ];
})(typeof window !== "undefined" ? window : globalThis);
