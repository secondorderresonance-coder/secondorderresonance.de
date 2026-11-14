/*
 * SOR Kurse Physik 1 bis 4
 * ------------------------------------------------------------
 * Eine Lektion je Abschnitt von Hering, Martin, Stohrer (Hrsg.), "Physik für Ingenieure" (Kapitel 1 bis 10).
 * Physik 1 = Kap. 1–2 (Mechanik), Physik 2 = Kap. 3–4 (Thermodynamik, Elektrizität),
 * Physik 3 = Kap. 5–7 (Schwingungen, Wellen, Optik, Akustik), Physik 4 = Kap. 8–10 (Atom-, Kern-, Festkörperphysik, Relativität).
 * Die Aufgaben (app/modules/exercises/ph-1.js bis ph-4.js) folgen den Aufgabentypen der Übungen (Ü) und Beispiele
 * des Buchs mit eigenen, zufällig erzeugten Zahlen. Erklärungstexte sind eigene Formulierungen.
 *   id       K-PI-<nn>, zugleich Themen-ID der Aufgaben
 *   chapter  Buchabschnitt
 * Nach courses.js und vor courses-2.js einbinden.
 */
(function (root) {
    "use strict";
    var C = root.SOR_COURSES || require("./courses.js");
    root.SOR_COURSES_PH = true;
    var sec = null, nr = 0;
    function S(de, en) { sec = C.L({ de: de, en: en }); }
    function K(ch, visual, tde, ten, xde, xen, formula) {
        nr += 1;
        return { id: "K-PI-" + (nr < 10 ? "0" : "") + nr, chapter: ch, visual: visual, section: sec, topic: { de: tde, en: ten }, text: { de: xde, en: xen }, formula: formula || [] };
    }

    // ---------------- Physik 1: Mechanik ----------------
    var p1 = [];
    S("Grundlagen", "Foundations");
    p1.push(K("1.3", "ruler", "Physikalische Größen und Messfehler", "Physical quantities and measurement errors",
        "Eine physikalische Größe ist Zahlenwert mal Einheit. Jede Messung streut: Mittelwert und Standardabweichung beschreiben die Messreihe, und über die Fehlerfortpflanzung erhält man die Unsicherheit eines berechneten Ergebnisses.",
        "A physical quantity is a number times a unit. Every measurement scatters: mean and standard deviation describe the series, and error propagation gives the uncertainty of a computed result.",
        ["x̄ = Σ x<sub>i</sub> / n", "Δf ≈ |∂f/∂x| Δx + |∂f/∂y| Δy", "Δf/f = |a| Δx/x + |b| Δy/y  " + "(f = x<sup>a</sup> y<sup>b</sup>)"]));
    S("Kinematik und Dynamik", "Kinematics and dynamics");
    p1.push(
        K("2.2", "projectile", "Kinematik des Punktes", "Kinematics of a point",
            "Ort, Geschwindigkeit und Beschleunigung hängen über Ableitungen zusammen. Bei konstanter Beschleunigung gelten einfache Formeln. Der waagerechte Wurf ist eine gleichförmige Bewegung zur Seite plus freier Fall nach unten. Bei der Kreisbewegung zeigt die Normalbeschleunigung zum Mittelpunkt.",
            "Position, velocity and acceleration are linked by derivatives. With constant acceleration simple formulas hold. A horizontal throw is uniform motion sideways plus free fall downwards. In circular motion the normal acceleration points to the centre.",
            ["v = v<sub>0</sub> + a t,  s = v<sub>0</sub> t + ½ a t²", "v² = v<sub>0</sub>² + 2 a s", "a<sub>n</sub> = v²/r = ω² r"]),
        K("2.3", "incline", "Newton'sche Axiome", "Newton's laws",
            "Die resultierende Kraft auf einen Körper ist gleich Masse mal Beschleunigung. Für verbundene Körper schneidet man frei und stellt für jeden Körper die Bewegungsgleichung auf. Reibung wirkt der Bewegung entgegen und ist proportional zur Normalkraft.",
            "The resultant force on a body equals mass times acceleration. For connected bodies, cut them free and write the equation of motion for each body. Friction opposes the motion and is proportional to the normal force.",
            ["Σ F = m a", "F<sub>R</sub> = μ F<sub>N</sub>", "a = (m<sub>2</sub> − m<sub>1</sub>) g / (m<sub>1</sub> + m<sub>2</sub>)"]),
        K("2.4", "frames", "Dynamik in bewegten Bezugssystemen", "Dynamics in moving frames",
            "In beschleunigten oder rotierenden Bezugssystemen treten Trägheitskräfte auf. Im rotierenden System wirkt die Zentrifugalkraft nach außen, auf bewegte Körper zusätzlich die Corioliskraft. Auf der Erde hängt sie von der geografischen Breite ab.",
            "Inertial forces appear in accelerated or rotating frames. In a rotating frame the centrifugal force acts outwards, and moving bodies also feel the Coriolis force. On Earth it depends on the latitude.",
            ["F<sub>zf</sub> = m ω² r", "a<sub>C</sub> = 2 ω v sin φ", "F' = F − m a<sub>0</sub>"]),
        K("2.5", "forcecomp", "Impuls und Raketengleichung", "Momentum and the rocket equation",
            "Der Impuls ist Masse mal Geschwindigkeit. Ein Kraftstoß ändert den Impuls. Ohne äußere Kräfte bleibt der Gesamtimpuls eines Systems erhalten. Eine Rakete gewinnt Geschwindigkeit, indem sie Masse nach hinten ausstößt.",
            "Momentum is mass times velocity. An impulse changes the momentum. Without external forces the total momentum of a system is conserved. A rocket gains speed by ejecting mass backwards.",
            ["p = m v,  F Δt = Δp", "Σ p<sub>vorher</sub> = Σ p<sub>nachher</sub>", "Δv = w ln(m<sub>0</sub>/m<sub>B</sub>)"]));
    S("Energie, Stoß und Rotation", "Energy, collisions and rotation");
    p1.push(
        K("2.6", "energy", "Arbeit, Leistung und Energie", "Work, power and energy",
            "Arbeit ist Kraft mal Weg in Kraftrichtung. Leistung ist Arbeit pro Zeit. In einem abgeschlossenen System ohne Reibung bleibt die Summe aus kinetischer, potenzieller und Spannenergie konstant.",
            "Work is force times distance along the force. Power is work per time. In a closed system without friction the sum of kinetic, potential and elastic energy stays constant.",
            ["W = F s cos α", "E<sub>kin</sub> = ½ m v²,  E<sub>pot</sub> = m g h,  E<sub>F</sub> = ½ k s²", "P = W/t = F v,  η = P<sub>ab</sub>/P<sub>zu</sub>"]),
        K("2.7", "collision", "Stoßprozesse", "Collisions",
            "Bei jedem Stoß bleibt der Impuls erhalten. Beim elastischen Stoß bleibt auch die kinetische Energie erhalten. Beim vollkommen unelastischen Stoß bewegen sich die Körper danach gemeinsam weiter, und ein Teil der Energie wird in Wärme umgewandelt.",
            "Momentum is conserved in every collision. In an elastic collision kinetic energy is conserved too. In a perfectly inelastic collision the bodies move on together, and part of the energy turns into heat.",
            ["v<sub>1</sub>' = ((m<sub>1</sub> − m<sub>2</sub>) v<sub>1</sub> + 2 m<sub>2</sub> v<sub>2</sub>) / (m<sub>1</sub> + m<sub>2</sub>)", "v' = (m<sub>1</sub> v<sub>1</sub> + m<sub>2</sub> v<sub>2</sub>) / (m<sub>1</sub> + m<sub>2</sub>)", "k = √(h<sub>1</sub>/h)"]),
        K("2.8", "gears", "Drehbewegungen", "Rotational motion",
            "Bei der Drehung entsprechen Winkel, Winkelgeschwindigkeit und Winkelbeschleunigung den Größen der Translation. An die Stelle von Kraft und Masse treten Drehmoment und Trägheitsmoment.",
            "In rotation, angle, angular velocity and angular acceleration correspond to the quantities of translation. Torque and moment of inertia replace force and mass.",
            ["M = J α", "E<sub>rot</sub> = ½ J ω²,  P = M ω", "L = J ω,  ω = 2π n"]),
        K("2.9", "centroid", "Mechanik starrer Körper", "Rigid body mechanics",
            "Das Trägheitsmoment hängt von der Massenverteilung um die Achse ab. Mit dem Satz von Steiner verschiebt man es auf parallele Achsen. Ein rollender Körper hat Translations- und Rotationsenergie.",
            "The moment of inertia depends on how the mass is distributed about the axis. Steiner's theorem shifts it to parallel axes. A rolling body has translational and rotational energy.",
            ["J = J<sub>S</sub> + m d²", "J<sub>Stab,Ende</sub> = m l²/3,  J<sub>Vollzyl.</sub> = m r²/2", "v = √(2 g h / (1 + J/(m r²)))"]));
    S("Gravitation, Elastizität und Fluide", "Gravitation, elasticity and fluids");
    p1.push(
        K("2.10", "circular", "Gravitation", "Gravitation",
            "Zwei Massen ziehen sich mit einer Kraft an, die mit dem Quadrat des Abstands abnimmt. Für Satelliten auf Kreisbahnen liefert die Gravitation genau die Zentripetalkraft. Daraus folgen Bahngeschwindigkeit, Umlaufzeit und das dritte Kepler'sche Gesetz.",
            "Two masses attract each other with a force that falls with the square of the distance. For satellites on circular orbits gravity provides exactly the centripetal force. This gives orbital speed, period and Kepler's third law.",
            ["F = G m<sub>1</sub> m<sub>2</sub> / r²", "v = √(G M / r),  T = 2π r / v", "v<sub>Flucht</sub> = √(2 G M / r)"]),
        K("2.11", "stressstrain", "Elastomechanik", "Elasticity",
            "Im elastischen Bereich ist die Spannung proportional zur Dehnung (Hooke). Der Elastizitätsmodul ist eine Stoffkonstante. Ein gezogener Stab wirkt wie eine Feder mit k = E A / l.",
            "In the elastic range, stress is proportional to strain (Hooke). Young's modulus is a material constant. A bar in tension acts like a spring with k = E A / l.",
            ["σ = F/A = E ε", "Δl = F l / (E A)", "ΔV/V = −Δp/K"]),
        K("2.12", "buoyancy", "Hydrostatik", "Hydrostatics",
            "In ruhenden Flüssigkeiten wächst der Druck linear mit der Tiefe. Auf eingetauchte Körper wirkt ein Auftrieb, der so groß ist wie die Gewichtskraft der verdrängten Flüssigkeit. Kleine Tropfen haben wegen der Oberflächenspannung einen Überdruck.",
            "In fluids at rest the pressure grows linearly with depth. A submerged body feels a buoyant force equal to the weight of the displaced fluid. Small drops have an overpressure because of surface tension.",
            ["p = p<sub>0</sub> + ρ g h", "F<sub>A</sub> = ρ<sub>Fl</sub> g V", "Δp = 2σ/r"]),
        K("2.12", "bernoulli", "Hydrodynamik", "Hydrodynamics",
            "In einer Rohrströmung bleibt der Volumenstrom gleich, deshalb fließt das Fluid in Engstellen schneller. Die Bernoulli-Gleichung verbindet Druck, Geschwindigkeit und Höhe. Bei zähen Fluiden bestimmt die Reynolds-Zahl, ob die Strömung laminar oder turbulent ist.",
            "In a pipe flow the volume flow stays constant, so the fluid flows faster in narrow sections. Bernoulli's equation links pressure, velocity and height. For viscous fluids the Reynolds number decides whether the flow is laminar or turbulent.",
            ["A<sub>1</sub> v<sub>1</sub> = A<sub>2</sub> v<sub>2</sub>", "p + ½ ρ v² + ρ g h = konst.", "v = √(2 g h) (Torricelli),  Re = ρ v d / η"]));

    // ---------------- Physik 2: Thermodynamik und Elektrizität ----------------
    var p2 = [];
    S("Thermodynamik", "Thermodynamics");
    p2.push(
        K("3.1", "thermalbar", "Temperatur, Ausdehnung, ideales Gas", "Temperature, expansion, ideal gas",
            "Feste Körper dehnen sich bei Erwärmung linear aus, Flüssigkeiten und Gase im Volumen. Wird die Ausdehnung behindert, entstehen Wärmespannungen. Ideale Gase gehorchen der allgemeinen Gasgleichung.",
            "Solids expand linearly when heated, liquids and gases in volume. If the expansion is blocked, thermal stresses arise. Ideal gases obey the general gas law.",
            ["Δl = α l<sub>0</sub> Δϑ,  ΔV = γ V<sub>0</sub> Δϑ", "σ = E α Δϑ", "p V = m R<sub>i</sub> T = n R T"]),
        K("3.2", "gas", "Kinetische Gastheorie", "Kinetic theory of gases",
            "Der Gasdruck entsteht durch Stöße der Moleküle auf die Wand. Die mittlere kinetische Energie eines Moleküls ist proportional zur absoluten Temperatur. Leichte Moleküle sind bei gleicher Temperatur schneller.",
            "Gas pressure comes from molecules hitting the wall. The mean kinetic energy of a molecule is proportional to the absolute temperature. Light molecules are faster at the same temperature.",
            ["p = n<sub>V</sub> k T", "⟨E<sub>kin</sub>⟩ = (3/2) k T", "v<sub>rms</sub> = √(3 R T / M)"]),
        K("3.3", "firstlaw", "Wärme und erster Hauptsatz", "Heat and the first law",
            "Wärme ändert die Temperatur oder den Aggregatzustand. In der Mischungsrechnung gibt der warme Körper so viel Wärme ab, wie der kalte aufnimmt. Der erste Hauptsatz verknüpft Wärme, Arbeit und innere Energie. Für ideale Gase gibt es vier besondere Zustandsänderungen.",
            "Heat changes the temperature or the state of matter. In mixing problems the warm body releases as much heat as the cold one absorbs. The first law links heat, work and internal energy. Ideal gases have four special changes of state.",
            ["Q = m c Δϑ", "Q = ΔU + W", "p V<sup>κ</sup> = konst.,  T V<sup>κ−1</sup> = konst."]),
        K("3.3", "carnot", "Kreisprozesse und Entropie", "Cycles and entropy",
            "Wärmekraftmaschinen, Kältemaschinen und Wärmepumpen arbeiten in Kreisprozessen. Kein Prozess zwischen zwei Temperaturen ist besser als der Carnot-Prozess. Die Entropie wächst bei allen irreversiblen Vorgängen.",
            "Heat engines, refrigerators and heat pumps work in cycles. No process between two temperatures beats the Carnot cycle. Entropy grows in every irreversible process.",
            ["η<sub>C</sub> = 1 − T<sub>u</sub>/T<sub>o</sub>", "ε<sub>WP</sub> = |Q<sub>ab</sub>| / W", "ΔS = m c ln(T<sub>2</sub>/T<sub>1</sub>)"]),
        K("3.4", "heatcap", "Reale Gase, Phasen, Luftfeuchte", "Real gases, phases, humidity",
            "Reale Gase weichen vom idealen Verhalten ab, die Van-der-Waals-Gleichung berücksichtigt Eigenvolumen und Anziehung der Moleküle. Beim Schmelzen und Verdampfen wird latente Wärme gebraucht. Die relative Luftfeuchte vergleicht den Dampfdruck mit dem Sättigungsdruck.",
            "Real gases deviate from ideal behaviour, the van der Waals equation accounts for the molecules' own volume and attraction. Melting and evaporating need latent heat. Relative humidity compares the vapour pressure with the saturation pressure.",
            ["(p + a n²/V²)(V − n b) = n R T", "Q = m r (Verdampfen),  Q = m q (Schmelzen)", "φ = p<sub>D</sub> / p<sub>S</sub>"]),
        K("3.5", "wall", "Wärmeübertragung", "Heat transfer",
            "Wärme wird durch Leitung, Konvektion und Strahlung übertragen. Durch eine Wand aus mehreren Schichten addieren sich die Wärmewiderstände wie Reihenwiderstände. Strahlung wächst mit der vierten Potenz der Temperatur.",
            "Heat is transferred by conduction, convection and radiation. Through a wall of several layers the thermal resistances add like series resistors. Radiation grows with the fourth power of temperature.",
            ["Φ = λ A Δϑ / s", "1/U = 1/α<sub>i</sub> + Σ s<sub>j</sub>/λ<sub>j</sub> + 1/α<sub>a</sub>", "Φ = ε σ A (T<sub>1</sub>⁴ − T<sub>2</sub>⁴)"]));
    S("Elektrizität und Magnetismus", "Electricity and magnetism");
    p2.push(
        K("4.1", "ohm", "Gleichstromkreise", "DC circuits",
            "Strom ist bewegte Ladung, Spannung treibt ihn durch Widerstände. Mit dem Ohm'schen Gesetz und den Kirchhoff'schen Regeln lassen sich alle Gleichstromnetze berechnen. Eine reale Quelle hat einen Innenwiderstand.",
            "Current is moving charge, voltage drives it through resistors. Ohm's law and Kirchhoff's rules solve every DC network. A real source has an internal resistance.",
            ["U = R I,  R = ρ l / A", "R<sub>Reihe</sub> = Σ R,  1/R<sub>par</sub> = Σ 1/R", "U<sub>K</sub> = U<sub>0</sub> − R<sub>i</sub> I,  P = U I"]),
        K("4.2", "mole", "Ladungstransport in Flüssigkeiten und Gasen", "Charge transport in liquids and gases",
            "In Elektrolyten transportieren Ionen die Ladung, dabei scheiden sich Stoffe an den Elektroden ab. Die Masse folgt aus den Faraday'schen Gesetzen. Im Vakuum werden Elektronen durch Spannung beschleunigt.",
            "In electrolytes ions carry the charge, and substances are deposited at the electrodes. The mass follows from Faraday's laws. In vacuum electrons are accelerated by voltage.",
            ["m = M I t / (z F)", "F = 96 485 C/mol", "e U = ½ m v²"]),
        K("4.3", "rc", "Elektrisches Feld und Kondensator", "Electric field and capacitor",
            "Ladungen erzeugen ein elektrisches Feld, das auf andere Ladungen eine Kraft ausübt. Im Plattenkondensator ist das Feld homogen. Kapazität und Feldenergie hängen von Fläche, Abstand und Dielektrikum ab.",
            "Charges create an electric field that exerts a force on other charges. In a parallel-plate capacitor the field is uniform. Capacitance and field energy depend on area, gap and dielectric.",
            ["F = Q<sub>1</sub> Q<sub>2</sub> / (4π ε<sub>0</sub> r²)", "E = U/d,  C = ε<sub>0</sub> ε<sub>r</sub> A / d", "W = ½ C U²"]),
        K("4.4", "magfield", "Magnetisches Feld", "Magnetic field",
            "Ströme erzeugen Magnetfelder. Auf bewegte Ladungen im Magnetfeld wirkt die Lorentzkraft, sie zwingt geladene Teilchen auf Kreisbahnen. In Eisenkreisen bestimmt ein Luftspalt maßgeblich die Feldstärke.",
            "Currents create magnetic fields. Moving charges in a magnetic field feel the Lorentz force, which forces charged particles onto circles. In iron circuits an air gap largely determines the field strength.",
            ["H = N I / l (Spule),  B = μ<sub>0</sub> μ<sub>r</sub> H", "F = q v B,  r = m v / (q B)", "F = I l B"]),
        K("4.5", "induct", "Elektromagnetische Induktion", "Electromagnetic induction",
            "Ändert sich der magnetische Fluss durch eine Leiterschleife, wird eine Spannung induziert. Ein bewegter Leiter im Magnetfeld und eine rotierende Spule sind die Grundformen von Generatoren.",
            "If the magnetic flux through a loop changes, a voltage is induced. A moving conductor in a magnetic field and a rotating coil are the basic forms of generators.",
            ["u = −N dΦ/dt", "u = B l v", "û = N B A ω"]),
        K("4.5", "threephase", "Wechselstrom und Schaltvorgänge", "AC circuits and transients",
            "Spulen und Kondensatoren haben frequenzabhängige Blindwiderstände. In der Reihenschaltung addieren sich die Widerstände als Zeiger. Beim Laden eines Kondensators steigt die Spannung exponentiell mit der Zeitkonstante τ = R C.",
            "Coils and capacitors have frequency-dependent reactances. In a series circuit the impedances add as phasors. When a capacitor charges, the voltage rises exponentially with time constant τ = R C.",
            ["X<sub>L</sub> = ω L,  X<sub>C</sub> = 1/(ω C)", "Z = √(R² + (X<sub>L</sub> − X<sub>C</sub>)²),  tan φ = (X<sub>L</sub> − X<sub>C</sub>)/R", "u<sub>C</sub> = U<sub>0</sub> (1 − e<sup>−t/τ</sup>)"]));

    // ---------------- Physik 3: Schwingungen, Wellen, Optik, Akustik ----------------
    var p3 = [];
    S("Schwingungen und Wellen", "Oscillations and waves");
    p3.push(
        K("5.1", "spring", "Freie und gedämpfte Schwingungen", "Free and damped oscillations",
            "Ein Feder-Masse-System, ein Pendel und ein Schwingkreis schwingen harmonisch mit einer Eigenfrequenz. Dämpfung lässt die Amplitude exponentiell abklingen. Das logarithmische Dekrement beschreibt, wie schnell.",
            "A spring-mass system, a pendulum and an LC circuit oscillate harmonically at a natural frequency. Damping makes the amplitude decay exponentially. The logarithmic decrement describes how fast.",
            ["ω<sub>0</sub> = √(k/m),  ω<sub>0</sub> = 1/√(L C)", "T = 2π √(l/g)", "Λ = δ T<sub>d</sub> = ln(x<sub>n</sub>/x<sub>n+1</sub>)"]),
        K("5.1", "springs", "Erzwungene und überlagerte Schwingungen", "Forced and superposed oscillations",
            "Eine periodische Anregung zwingt dem System ihre Frequenz auf. Nahe der Eigenfrequenz wird die Amplitude groß (Resonanz). Gleichfrequente Schwingungen addieren sich zu einer Schwingung mit neuer Amplitude und Phase, leicht verschiedene Frequenzen ergeben Schwebungen.",
            "A periodic excitation imposes its frequency on the system. Near the natural frequency the amplitude becomes large (resonance). Oscillations of equal frequency add to one with new amplitude and phase, slightly different frequencies give beats.",
            ["V = 1 / √((1 − η²)² + (2 D η)²),  η = Ω/ω<sub>0</sub>", "ŷ² = ŷ<sub>1</sub>² + ŷ<sub>2</sub>² + 2 ŷ<sub>1</sub> ŷ<sub>2</sub> cos(φ<sub>2</sub> − φ<sub>1</sub>)", "f<sub>S</sub> = |f<sub>1</sub> − f<sub>2</sub>|"]),
        K("5.2", "wave", "Harmonische Wellen", "Harmonic waves",
            "Eine Welle transportiert Energie ohne Materietransport. Wellenlänge, Frequenz und Ausbreitungsgeschwindigkeit hängen über c = λ f zusammen. Die Geschwindigkeit hängt vom Medium ab, etwa auf einer Saite von Spannkraft und Massenbelag.",
            "A wave transports energy without transporting matter. Wavelength, frequency and speed are linked by c = λ f. The speed depends on the medium, for example on a string on tension and mass per length.",
            ["y = ŷ sin(ω t − k x),  k = 2π/λ", "c = λ f", "c = √(F/μ),  I = P / (4π r²)"]),
        K("5.2", "doppler", "Doppler-Effekt und Interferenz", "Doppler effect and interference",
            "Bewegen sich Sender oder Empfänger, ändert sich die gehörte Frequenz. Schneller als der Schall entsteht ein Mach'scher Kegel. Überlagern sich Wellen, verstärken oder schwächen sie sich, bei Reflexion entstehen stehende Wellen.",
            "If source or observer move, the received frequency changes. Faster than sound a Mach cone forms. Superposed waves reinforce or cancel each other, reflection produces standing waves.",
            ["f<sub>B</sub> = f<sub>S</sub> (c ± v<sub>B</sub>) / (c ∓ v<sub>S</sub>)", "sin α = c / v = 1/Ma", "L = n λ/2"]));
    S("Optik", "Optics");
    p3.push(
        K("6.2", "refraction", "Reflexion und Brechung", "Reflection and refraction",
            "An Spiegeln ist der Einfallswinkel gleich dem Reflexionswinkel. Beim Übergang in ein anderes Medium wird Licht nach Snellius gebrochen. Ab dem Grenzwinkel tritt Totalreflexion auf, das nutzen Lichtleiter und Prismen.",
            "At mirrors the angle of incidence equals the angle of reflection. Passing into another medium, light is refracted by Snell's law. Beyond the critical angle total internal reflection occurs, used by fibres and prisms.",
            ["n<sub>1</sub> sin α<sub>1</sub> = n<sub>2</sub> sin α<sub>2</sub>", "sin α<sub>g</sub> = n<sub>2</sub>/n<sub>1</sub>", "n = sin((δ<sub>min</sub> + γ)/2) / sin(γ/2)"]),
        K("6.2", "lens", "Linsen und optische Instrumente", "Lenses and optical instruments",
            "Dünne Linsen bilden nach der Abbildungsgleichung ab. Brillen korrigieren Nah- und Fernpunkt des Auges. Lupe, Mikroskop und Fernrohr vergrößern den Sehwinkel.",
            "Thin lenses image by the lens equation. Glasses correct the near and far point of the eye. Magnifier, microscope and telescope enlarge the visual angle.",
            ["1/f = 1/a + 1/b,  β = b/a", "D = 1/f,  D<sub>ges</sub> = D<sub>1</sub> + D<sub>2</sub>", "Γ<sub>Fernrohr</sub> = f<sub>Ob</sub>/f<sub>Ok</sub>,  Γ<sub>Mikr.</sub> = t s<sub>0</sub> / (f<sub>Ob</sub> f<sub>Ok</sub>)"]),
        K("6.3", "radiation", "Radio- und Fotometrie", "Radiometry and photometry",
            "Strahlungsgrößen messen Energie in Watt, lichttechnische Größen bewerten sie mit der Empfindlichkeit des Auges. Die Beleuchtungsstärke nimmt mit dem Quadrat des Abstands ab und hängt vom Einfallswinkel ab.",
            "Radiometric quantities measure energy in watts, photometric ones weight it by the sensitivity of the eye. Illuminance falls with the square of the distance and depends on the angle of incidence.",
            ["E<sub>v</sub> = I<sub>v</sub> cos ε / r²", "Φ<sub>v</sub> = 683 lm/W · V(λ) · Φ<sub>e</sub>", "Φ = 4π I (isotrop)"]),
        K("6.4", "slit", "Wellenoptik", "Wave optics",
            "Licht interferiert und wird gebeugt. Gitter und Doppelspalt erzeugen helle Streifen, wo der Gangunterschied ein Vielfaches der Wellenlänge ist. Dünne Schichten entspiegeln Gläser. Polarisationsfilter lassen nur eine Schwingungsrichtung durch.",
            "Light interferes and diffracts. Gratings and double slits produce bright fringes where the path difference is a multiple of the wavelength. Thin films make glass anti-reflective. Polarisers pass only one direction of oscillation.",
            ["g sin α<sub>m</sub> = m λ", "d = λ / (4 n) (Entspiegelung)", "I = I<sub>0</sub> cos² θ (Malus),  2 d sin θ = m λ (Bragg)"]),
        K("6.5", "photo", "Quantenoptik", "Quantum optics",
            "Licht besteht aus Photonen mit der Energie h f. Beim Fotoeffekt löst ein Photon ein Elektron aus, wenn seine Energie die Austrittsarbeit übersteigt. Auch Teilchen haben eine Wellenlänge (de Broglie).",
            "Light consists of photons with energy h f. In the photoelectric effect a photon releases an electron if its energy exceeds the work function. Particles also have a wavelength (de Broglie).",
            ["E = h f = h c / λ", "E<sub>kin</sub> = h f − W<sub>A</sub>", "λ = h / p,  Δλ = λ<sub>C</sub> (1 − cos θ)"]),
        K("6.6", "lens", "Auflösung und Mikroskopie", "Resolution and microscopy",
            "Beugung an der Öffnung begrenzt jede Abbildung. Zwei Punkte sind gerade noch getrennt, wenn das Maximum des einen auf das erste Minimum des anderen fällt. Die numerische Apertur bestimmt die kleinste auflösbare Struktur im Mikroskop.",
            "Diffraction at the aperture limits every image. Two points are just resolved if the maximum of one falls on the first minimum of the other. The numerical aperture sets the smallest resolvable detail in a microscope.",
            ["sin φ<sub>min</sub> = 1,22 λ / D", "d<sub>min</sub> = 0,61 λ / NA", "NA = n sin u"]));
    S("Akustik", "Acoustics");
    p3.push(
        K("7.2", "wave", "Schallwellen", "Sound waves",
            "Schall ist eine Druckwelle. Seine Geschwindigkeit hängt in Gasen von der Temperatur ab. Schalldruck, Schallschnelle und Intensität hängen über die Schallkennimpedanz zusammen. An Grenzflächen wird Schall teilweise reflektiert.",
            "Sound is a pressure wave. In gases its speed depends on temperature. Sound pressure, particle velocity and intensity are linked by the acoustic impedance. Sound is partly reflected at interfaces.",
            ["c = √(κ R T / M) ≈ 331 m/s · √(T/273 K)", "I = p̃² / (ρ c)", "r = ((Z<sub>2</sub> − Z<sub>1</sub>)/(Z<sub>2</sub> + Z<sub>1</sub>))²"]),
        K("7.3", "sine", "Schallpegel und Hören", "Sound levels and hearing",
            "Das Ohr empfindet Lautstärke logarithmisch, deshalb rechnet man mit Pegeln in Dezibel. Pegel mehrerer Quellen addiert man über die Intensitäten. In der Musik entspricht eine Oktave dem Frequenzverhältnis 2.",
            "The ear perceives loudness logarithmically, so sound is measured in decibel levels. Levels of several sources are added via the intensities. In music an octave is the frequency ratio 2.",
            ["L = 10 lg(I/I<sub>0</sub>) dB,  I<sub>0</sub> = 10<sup>−12</sup> W/m²", "L<sub>ges</sub> = 10 lg Σ 10<sup>L<sub>i</sub>/10</sup> dB", "L(r<sub>2</sub>) = L(r<sub>1</sub>) − 20 lg(r<sub>2</sub>/r<sub>1</sub>) dB"]),
        K("7.4", "wall", "Raumakustik und Schalldämmung", "Room acoustics and sound insulation",
            "Die Nachhallzeit eines Raumes hängt von Volumen und Absorptionsfläche ab (Sabine). Wände dämmen Schall umso besser, je schwerer sie sind und je höher die Frequenz ist. Ultraschall dient zur zerstörungsfreien Prüfung.",
            "The reverberation time of a room depends on volume and absorption area (Sabine). Walls insulate better the heavier they are and the higher the frequency. Ultrasound is used for non-destructive testing.",
            ["T = 0,163 s/m · V / A", "A = Σ α<sub>i</sub> S<sub>i</sub>", "R = 20 lg(m'' f) − 47 dB (Massengesetz)"]));

    // ---------------- Physik 4: Atom-, Kern-, Festkörperphysik, Relativität ----------------
    var p4 = [];
    S("Atomphysik", "Atomic physics");
    p4.push(
        K("8.1", "bohr", "Bohr'sches Atommodell", "Bohr's atomic model",
            "Im Bohr'schen Modell kreisen Elektronen auf erlaubten Bahnen mit festen Energien. Springt ein Elektron zwischen zwei Bahnen, wird ein Photon mit der Energiedifferenz ausgesandt. So entstehen die Spektralserien des Wasserstoffs.",
            "In Bohr's model electrons orbit on allowed paths with fixed energies. When an electron jumps between two orbits, a photon with the energy difference is emitted. This produces the spectral series of hydrogen.",
            ["E<sub>n</sub> = −13,6 eV · Z² / n²", "1/λ = R<sub>∞</sub> Z² (1/n<sub>1</sub>² − 1/n<sub>2</sub>²)", "r<sub>n</sub> = 0,0529 nm · n² / Z"]),
        K("8.2", "well", "Quantentheorie", "Quantum theory",
            "Teilchen werden durch Wellenfunktionen beschrieben. Ort und Impuls lassen sich nicht gleichzeitig beliebig genau festlegen. Ein Teilchen im Potenzialtopf hat nur diskrete Energien, und es kann Barrieren durchtunneln.",
            "Particles are described by wave functions. Position and momentum cannot both be fixed arbitrarily precisely. A particle in a box has only discrete energies, and it can tunnel through barriers.",
            ["Δx Δp ≥ ħ/2", "E<sub>n</sub> = n² h² / (8 m L²)", "T ≈ e<sup>−2 κ d</sup>,  κ = √(2 m (V<sub>0</sub> − E)) / ħ"]),
        K("8.3", "magfield", "Bahn- und Spinmagnetismus", "Orbital and spin magnetism",
            "Elektronen haben einen Bahn- und einen Spindrehimpuls und damit ein magnetisches Moment. Im Magnetfeld spalten Energieniveaus auf (Zeeman-Effekt). Kernspinresonanz nutzt die Präzession von Kernspins mit der Larmorfrequenz.",
            "Electrons have orbital and spin angular momentum and thus a magnetic moment. In a magnetic field energy levels split (Zeeman effect). Nuclear magnetic resonance uses the precession of nuclear spins at the Larmor frequency.",
            ["ΔE = μ<sub>B</sub> B m<sub>l</sub>,  μ<sub>B</sub> = 5,788 · 10<sup>−5</sup> eV/T", "f<sub>L</sub> = γ B / (2π)", "γ<sub>p</sub> / 2π = 42,58 MHz/T"]),
        K("8.4", "bohr", "Periodensystem und Elektronenhülle", "Periodic table and electron shells",
            "Die Elektronen besetzen Schalen und Unterschalen nach Energie. Jede Unterschale fasst 2(2l + 1) Elektronen, eine Schale 2 n². Daraus ergibt sich der Aufbau des Periodensystems.",
            "Electrons fill shells and subshells in order of energy. Each subshell holds 2(2l + 1) electrons, a shell 2 n². This explains the structure of the periodic table.",
            ["N<sub>Schale</sub> = 2 n²,  N<sub>Unterschale</sub> = 2(2l + 1)", "1s 2s 2p 3s 3p 4s 3d 4p …"]),
        K("8.5", "radiation", "Röntgenstrahlung", "X-rays",
            "Eine Röntgenröhre erzeugt Bremsstrahlung mit einer kürzesten Wellenlänge und charakteristische Linien. Die Linienfrequenz wächst mit dem Quadrat der Ordnungszahl (Moseley). In Materie nimmt die Intensität exponentiell ab.",
            "An X-ray tube produces bremsstrahlung with a shortest wavelength and characteristic lines. The line frequency grows with the square of the atomic number (Moseley). In matter the intensity decreases exponentially.",
            ["λ<sub>min</sub> = h c / (e U)", "E<sub>Kα</sub> ≈ 10,2 eV · (Z − 1)²", "I = I<sub>0</sub> e<sup>−μ d</sup>,  d<sub>½</sub> = ln 2 / μ"]),
        K("8.6", "spring", "Molekülspektren", "Molecular spectra",
            "Moleküle können rotieren und schwingen. Die Rotationsenergien sind gequantelt und wachsen mit J(J + 1). Die Schwingung eines zweiatomigen Moleküls verhält sich wie ein Feder-Masse-System mit der reduzierten Masse.",
            "Molecules can rotate and vibrate. Rotational energies are quantised and grow with J(J + 1). The vibration of a diatomic molecule behaves like a spring-mass system with the reduced mass.",
            ["E<sub>J</sub> = ħ² J(J + 1) / (2 Θ),  Θ = μ r²", "μ = m<sub>1</sub> m<sub>2</sub> / (m<sub>1</sub> + m<sub>2</sub>)", "f = (1/2π) √(k/μ)"]));
    S("Kernphysik", "Nuclear physics");
    p4.push(
        K("8.7", "nucleus", "Aufbau der Atomkerne", "Structure of nuclei",
            "Kerne bestehen aus Protonen und Neutronen. Ihr Radius wächst mit der dritten Wurzel der Massenzahl, die Dichte ist daher für alle Kerne fast gleich. Der Massendefekt ergibt die Bindungsenergie.",
            "Nuclei consist of protons and neutrons. Their radius grows with the cube root of the mass number, so the density is almost the same for all nuclei. The mass defect gives the binding energy.",
            ["R = 1,2 fm · A<sup>1/3</sup>", "E<sub>B</sub> = Δm c²,  1 u ≙ 931,5 MeV", "Δm = Z m<sub>p</sub> + N m<sub>n</sub> − m<sub>Kern</sub>"]),
        K("8.8", "decay", "Radioaktiver Zerfall und Kernreaktionen", "Radioactive decay and nuclear reactions",
            "Radioaktive Kerne zerfallen zufällig, im Mittel nimmt ihre Zahl exponentiell ab. Die Aktivität ist die Zahl der Zerfälle pro Sekunde. Bei Kernreaktionen bleiben Massenzahl und Ladung erhalten, der Q-Wert folgt aus der Massenbilanz.",
            "Radioactive nuclei decay randomly, on average their number decreases exponentially. The activity is the number of decays per second. In nuclear reactions mass number and charge are conserved, the Q value follows from the mass balance.",
            ["N = N<sub>0</sub> e<sup>−λ t</sup>,  T<sub>½</sub> = ln 2 / λ", "A = λ N", "Q = (Σ m<sub>vorher</sub> − Σ m<sub>nachher</sub>) c²"]),
        K("8.9", "quarks", "Elementarteilchen", "Elementary particles",
            "Materie besteht aus Quarks und Leptonen, die Kräfte werden durch Austauschteilchen vermittelt. Bei Teilchenreaktionen bleiben Ladung, Baryonenzahl und Leptonenzahl erhalten.",
            "Matter consists of quarks and leptons, forces are carried by exchange particles. In particle reactions charge, baryon number and lepton number are conserved.",
            ["Q, B, L<sub>e</sub>, L<sub>μ</sub> erhalten", "p = uud,  n = udd", "E = m c²"]),
        K("8.10", "exp", "Strahlenschutz", "Radiation protection",
            "Ionisierende Strahlung gibt Energie an Gewebe ab. Die Energiedosis ist Energie pro Masse, die Äquivalentdosis gewichtet die Strahlenart. Schutz bieten Abstand, Abschirmung und kurze Aufenthaltszeit.",
            "Ionising radiation deposits energy in tissue. The absorbed dose is energy per mass, the equivalent dose weights the type of radiation. Distance, shielding and short exposure time protect.",
            ["D = E / m (Gy),  H = w<sub>R</sub> D (Sv)", "Ḋ ∝ 1/r²", "I = I<sub>0</sub> · 2<sup>−d/d½</sup>"]));
    S("Festkörperphysik", "Solid state physics");
    p4.push(
        K("9.1", "lattice", "Struktur fester Körper", "Structure of solids",
            "In Kristallen sind die Atome periodisch angeordnet. Aus Gitterkonstante, Atomen pro Elementarzelle und Molmasse folgt die Dichte. Netzebenenabstände bestimmt man mit Röntgenbeugung.",
            "In crystals atoms are arranged periodically. Density follows from lattice constant, atoms per unit cell and molar mass. Lattice plane spacings are measured with X-ray diffraction.",
            ["ρ = n M / (N<sub>A</sub> a³)", "n<sub>kfz</sub> = 4,  n<sub>krz</sub> = 2", "d<sub>hkl</sub> = a / √(h² + k² + l²)"]),
        K("9.2", "bands", "Elektronen in Festkörpern", "Electrons in solids",
            "Im Festkörper bilden die Elektronenzustände Energiebänder. Metalle haben ein teilweise gefülltes Band. Halbleiter haben eine Bandlücke, ihre Leitfähigkeit steigt stark mit der Temperatur und mit der Dotierung.",
            "In solids electron states form energy bands. Metals have a partly filled band. Semiconductors have a band gap, their conductivity rises strongly with temperature and doping.",
            ["f(E) = 1 / (e<sup>(E − E<sub>F</sub>)/kT</sup> + 1)", "σ = e (n μ<sub>n</sub> + p μ<sub>p</sub>)", "n<sub>i</sub> ∝ T<sup>3/2</sup> e<sup>−E<sub>g</sub>/(2kT)</sup>"]),
        K("9.3", "heatcap", "Thermische Eigenschaften fester Körper", "Thermal properties of solids",
            "Gitterschwingungen speichern Wärme. Bei hohen Temperaturen gilt die Dulong-Petit-Regel, bei tiefen Temperaturen fällt die Wärmekapazität mit T³ (Debye). In Metallen tragen Elektronen Strom und Wärme, Wiedemann und Franz verknüpfen beides.",
            "Lattice vibrations store heat. At high temperatures the Dulong-Petit rule holds, at low temperatures the heat capacity falls like T³ (Debye). In metals electrons carry current and heat, Wiedemann and Franz link both.",
            ["C<sub>m</sub> ≈ 3 R", "C<sub>m</sub> ≈ (12π⁴/5) R (T/Θ<sub>D</sub>)³", "λ / σ = L T,  L = 2,44 · 10<sup>−8</sup> W Ω/K²"]),
        K("9.4", "photo", "Optoelektronische Bauelemente", "Optoelectronic devices",
            "Leuchtdioden und Laserdioden senden Licht mit einer Photonenenergie nahe der Bandlücke aus. Fotodioden und Solarzellen wandeln Licht in Strom. Die Empfindlichkeit hängt mit der Quantenausbeute zusammen.",
            "LEDs and laser diodes emit light with a photon energy close to the band gap. Photodiodes and solar cells turn light into current. The responsivity is linked to the quantum efficiency.",
            ["λ<sub>g</sub> = h c / E<sub>g</sub> ≈ 1240 nm·eV / E<sub>g</sub>", "S = η e λ / (h c)", "Δλ = λ² / (2 n L) (Modenabstand)"]));
    S("Spezielle Relativitätstheorie", "Special relativity");
    p4.push(
        K("10.2", "lorentz", "Lorentz-Transformation", "Lorentz transformation",
            "Die Lichtgeschwindigkeit ist in allen Inertialsystemen gleich. Daher transformieren sich Ort und Zeit nach Lorentz, und Gleichzeitigkeit hängt vom Bezugssystem ab. Der Lorentzfaktor γ beschreibt die Größe der Effekte.",
            "The speed of light is the same in all inertial frames. So position and time transform by Lorentz, and simultaneity depends on the frame. The Lorentz factor γ describes the size of the effects.",
            ["γ = 1 / √(1 − v²/c²)", "x' = γ (x − v t)", "t' = γ (t − v x / c²)"]),
        K("10.3", "lorentz", "Längenkontraktion und Zeitdilatation", "Length contraction and time dilation",
            "Bewegte Uhren gehen langsamer, bewegte Maßstäbe sind in Bewegungsrichtung verkürzt. Geschwindigkeiten addieren sich so, dass nie die Lichtgeschwindigkeit überschritten wird.",
            "Moving clocks run slow, moving rods are shortened along the motion. Velocities add so that the speed of light is never exceeded.",
            ["Δt = γ Δt<sub>0</sub>", "l = l<sub>0</sub> / γ", "u = (u' + v) / (1 + u' v / c²)"]),
        K("10.4", "energy", "Relativistische Dynamik", "Relativistic dynamics",
            "Energie und Masse sind äquivalent. Die Gesamtenergie eines Teilchens ist γ m<sub>0</sub> c², die kinetische Energie der Überschuss über die Ruheenergie. Energie und Impuls hängen über die Energie-Impuls-Beziehung zusammen.",
            "Energy and mass are equivalent. The total energy of a particle is γ m<sub>0</sub> c², the kinetic energy is the excess over the rest energy. Energy and momentum are linked by the energy-momentum relation.",
            ["E = γ m<sub>0</sub> c²,  E<sub>0</sub> = m<sub>0</sub> c²", "E<sub>kin</sub> = (γ − 1) m<sub>0</sub> c²", "E² = (p c)² + (m<sub>0</sub> c²)²"]),
        K("10.5", "doppler", "Relativistischer Doppler-Effekt", "Relativistic Doppler effect",
            "Für Licht gibt es kein Medium, deshalb hängt die Frequenzverschiebung nur von der Relativgeschwindigkeit ab. Bei Annäherung steigt die Frequenz, bei Entfernung sinkt sie (Rotverschiebung). Radargeräte nutzen die doppelte Verschiebung bei der Reflexion.",
            "Light needs no medium, so the frequency shift depends only on the relative velocity. Approaching raises the frequency, receding lowers it (redshift). Radar uses the double shift on reflection.",
            ["f<sub>B</sub> = f<sub>S</sub> √((1 + β)/(1 − β)),  β = v/c", "z = Δλ/λ", "Δf ≈ 2 v f / c (Radar)"]));

    C.add([
        { id: "ph1", subject: "physik", level: 4, short: { de: "Physik 1", en: "Physics 1" },
          title: { de: "Physik 1: Mechanik", en: "Physics 1: Mechanics" },
          intro: { de: "Kapitel 1 und 2 nach Hering, Martin, Stohrer: Messfehler, Kinematik, Newton, Impuls, Energie, Stöße, Rotation, starre Körper, Gravitation, Elastizität und Fluide.", en: "Chapters 1 and 2 following Hering, Martin, Stohrer: measurement errors, kinematics, Newton, momentum, energy, collisions, rotation, rigid bodies, gravitation, elasticity and fluids." },
          lessons: p1 },
        { id: "ph2", subject: "physik", level: 4, short: { de: "Physik 2", en: "Physics 2" },
          title: { de: "Physik 2: Thermodynamik und Elektrizität", en: "Physics 2: Thermodynamics and electricity" },
          intro: { de: "Kapitel 3 und 4 nach Hering, Martin, Stohrer: Gase, Hauptsätze, Kreisprozesse, Wärmeübertragung, Stromkreise, elektrisches und magnetisches Feld, Induktion und Wechselstrom.", en: "Chapters 3 and 4 following Hering, Martin, Stohrer: gases, laws of thermodynamics, cycles, heat transfer, circuits, electric and magnetic fields, induction and AC." },
          lessons: p2 },
        { id: "ph3", subject: "physik", level: 4, short: { de: "Physik 3", en: "Physics 3" },
          title: { de: "Physik 3: Schwingungen, Wellen, Optik, Akustik", en: "Physics 3: Oscillations, waves, optics, acoustics" },
          intro: { de: "Kapitel 5 bis 7 nach Hering, Martin, Stohrer: Schwingungen, Wellen, Doppler-Effekt, geometrische Optik, Fotometrie, Wellen- und Quantenoptik, Schall und Raumakustik.", en: "Chapters 5 to 7 following Hering, Martin, Stohrer: oscillations, waves, Doppler effect, geometric optics, photometry, wave and quantum optics, sound and room acoustics." },
          lessons: p3 },
        { id: "ph4", subject: "physik", level: 5, short: { de: "Physik 4", en: "Physics 4" },
          title: { de: "Physik 4: Atome, Kerne, Festkörper, Relativität", en: "Physics 4: Atoms, nuclei, solids, relativity" },
          intro: { de: "Kapitel 8 bis 10 nach Hering, Martin, Stohrer: Atommodell, Quantentheorie, Röntgen, Kernphysik, Strahlenschutz, Festkörper, Halbleiter und spezielle Relativitätstheorie.", en: "Chapters 8 to 10 following Hering, Martin, Stohrer: atomic model, quantum theory, X-rays, nuclear physics, radiation protection, solids, semiconductors and special relativity." },
          lessons: p4 }
    ]);
})(typeof window !== "undefined" ? window : globalThis);
