/* SOR Aufgaben Physik 2: Thermodynamik und Elektrizität (K-PI-14 bis K-PI-25), Aufgabentypen nach Hering, Martin, Stohrer. Braucht ph-1.js (E.PHU) */
(function (root) {
    "use strict";
    var E = root.SOR_EX || require("../exercise-engine.js");
    if (!E.PHU && typeof require !== "undefined") require("./ph-1.js");
    var A = E.A, M = E.M, H = E.H, n = E.H.n, t = E.tr, near = M.near, U = E.PHU, Q = U.Q, P = U.P, f = U.f, rel = U.rel, simpson = M.simpson;
    var g = 9.81, PI = Math.PI, R = 8.314, kB = 1.381e-23, NA = 6.022e23, qe = 1.602e-19, me = 9.109e-31, mp = 1.673e-27, e0 = 8.854e-12, mu0 = 4e-7 * PI, sigma = 5.67e-8, FAR = 96485;
    function add(nr, key, de, en, gen) { E.add({ id: "k-pi" + nr + "-" + key, topic: "K-PI-" + nr, title: t(de, en), gen: gen }); }
    var K = function (c) { return c + 273.15; };

    // =============== 3.1 Grundlagen ===============
    add(14, "ausdehnung", "Wärmeausdehnung und Gasgleichung", "Thermal expansion and the gas law", function (r, d) {
        if (d === 1) {
            var mat = r.pick([[t("Stahl", "steel"), 12e-6], [t("Messing", "brass"), 18.5e-6], [t("Aluminium", "aluminium"), 23.8e-6], [t("Kupfer", "copper"), 16.5e-6], [t("Pyrex-Glas", "Pyrex glass"), 3.2e-6]]);
            var l0 = r.pick([500, 1000, 1200, 2000]), d1 = r.pick([20, 15, 10]), d2 = r.pick([80, 100, 150, 250, -20]), dl = mat[1] * l0 * (d2 - d1);
            return Q(t("Ein Stab aus " + mat[0] + " (α = " + f(mat[1] * 1e6) + " · 10⁻⁶ K⁻¹) ist bei " + d1 + " °C genau " + l0 + " mm lang. Um wie viel ändert sich seine Länge bei " + d2 + " °C?", "A rod of " + mat[0] + " (α = " + f(mat[1] * 1e6) + " · 10⁻⁶ K⁻¹) is exactly " + l0 + " mm long at " + d1 + " °C. By how much does its length change at " + d2 + " °C?"),
                P(dl, "mm"), "Δl = α l<sub>0</sub> Δϑ.", ["Δϑ = " + (d2 - d1) + " K", "Δl = " + f(dl) + " mm"], rel(l0 * (1 + mat[1] * (d2 - d1)) - l0, dl, 1e-9));
        }
        if (d === 2) {
            var dT = r.pick([20, 30, 40, 50]), sig = 210e3 * 12e-6 * dT;
            return Q(t("Eisenbahnschienen (E = 210 000 N/mm², α = 12 · 10⁻⁶ K⁻¹) werden spannungsfrei verlegt. Welche Spannung entsteht, wenn sich die Temperatur danach um " + dT + " K ändert und die Schienen sich nicht ausdehnen können?", "Rails (E = 210,000 N/mm², α = 12 · 10⁻⁶ K⁻¹) are laid stress-free. Which stress arises if the temperature then changes by " + dT + " K and the rails cannot expand?"),
                P(sig, "N/mm²"), t("Die verhinderte Wärmedehnung α Δϑ wird zu elastischer Dehnung.", "The blocked thermal strain α Δϑ becomes elastic strain."), ["ε = α Δϑ = " + f(12e-6 * dT * 1000) + " ‰", "σ = E ε = " + f(sig) + " N/mm²"], rel(sig / 210e3, 12e-6 * dT, 1e-12));
        }
        var V = r.pick([10, 20, 40, 50]), pu = r.pick([50, 100, 150, 200]), th = r.pick([15, 20, 22, 25]), pL = 1.013, m = (pu + pL) * 1e5 * V / 1000 / (287 * K(th));
        return Q(t("In eine Druckflasche (V = " + V + " l) wird bei " + th + " °C Luft gepumpt, bis der Überdruck " + pu + " bar beträgt (Luftdruck 1,013 bar, R<sub>i</sub> = 287 J/(kg K)). Welche Masse hat die Luft in der Flasche?", "Air is pumped into a cylinder (V = " + V + " l) at " + th + " °C until the gauge pressure is " + pu + " bar (air pressure 1.013 bar, R<sub>i</sub> = 287 J/(kg K)). What is the mass of air in the cylinder?"),
            P(m, "kg"), t("Gasgleichung mit dem absoluten Druck: p = p<sub>ü</sub> + p<sub>L</sub>.", "Gas law with the absolute pressure: p = p<sub>g</sub> + p<sub>air</sub>."), ["p = " + f(pu + pL) + " bar", "m = p V / (R<sub>i</sub> T) = " + f(m) + " kg"], rel(m * 287 * K(th), (pu + pL) * 1e5 * V / 1000, 1e-12));
    });

    // =============== 3.2 kinetische Gastheorie ===============
    add(15, "kingas", "Molekülgeschwindigkeit und Teilchenzahl", "Molecular speed and particle number", function (r, d) {
        if (d === 1) {
            var gas = r.pick([["He", 4], ["N₂", 28], ["O₂", 32], ["H₂", 2], ["Ar", 40], ["CO₂", 44]]), T = r.pick([273, 300, 350, 500, 1000]), v = Math.sqrt(3 * R * T / (gas[1] / 1000));
            return Q(t("Wie groß ist die quadratisch gemittelte Geschwindigkeit von " + gas[0] + "-Molekülen (M = " + gas[1] + " g/mol) bei " + T + " K?", "What is the root-mean-square speed of " + gas[0] + " molecules (M = " + gas[1] + " g/mol) at " + T + " K?"),
                P(v, "m/s"), "½ m v² = (3/2) k T  ⇒  v<sub>rms</sub> = √(3 R T / M).", ["v<sub>rms</sub> = " + f(v) + " m/s"], rel(0.5 * (gas[1] / 1000 / NA) * v * v, 1.5 * kB * T, 2e-3));
        }
        if (d === 2) {
            var p = r.pick([1, 2, 2.5, 5, 10]), V = r.pick([0.5, 1, 2]), T = r.pick([250, 273, 300, 400]), N = p * 1e5 * V / (kB * T) / 1e25;
            return Q(t("Ein Gefäß (V = " + f(V) + " m³) enthält ein ideales Gas bei " + T + " K und " + f(p) + " bar. Wie viele Teilchen sind es? (Ergebnis in 10²⁵)", "A vessel (V = " + f(V) + " m³) holds an ideal gas at " + T + " K and " + f(p) + " bar. How many particles are there? (result in 10²⁵)"),
                P(N), "p V = N k T.", ["N = p V / (k T) = " + f(N) + " · 10²⁵"], rel(N * 1e25 / NA * R * T, p * 1e5 * V, 2e-3));
        }
        var f1 = r.pick([220, 440, 262, 330]), t1 = 20, t2 = r.pick([0, 5, 10, 28, 30]), f2 = f1 * Math.sqrt(K(t2) / K(t1));
        return Q(t("Eine Orgelpfeife klingt bei " + t1 + " °C mit " + f1 + " Hz. Die Frequenz ist proportional zur Schallgeschwindigkeit. Welche Frequenz gibt sie bei " + t2 + " °C?", "An organ pipe sounds at " + f1 + " Hz at " + t1 + " °C. The frequency is proportional to the speed of sound. Which frequency does it give at " + t2 + " °C?"),
            A.num(f2, { dec: 2, unit: "Hz", tol: 0.05 }), t("Die Schallgeschwindigkeit in Gasen wächst mit √T.", "The speed of sound in gases grows with √T."), ["f<sub>2</sub> = f<sub>1</sub> √(T<sub>2</sub>/T<sub>1</sub>) = " + f(f2, 2) + " Hz"], rel(f2 * f2 / (f1 * f1), K(t2) / K(t1), 1e-12));
    });

    // =============== 3.3 Wärme, 1. Hauptsatz ===============
    add(16, "hauptsatz1", "Mischungstemperatur und Zustandsänderungen", "Mixing temperature and changes of state", function (r, d) {
        if (d === 1) {
            var mw = r.pick([0.2, 0.3, 0.5, 1]), tw = r.pick([15, 18, 20]), mat = r.pick([[t("Kupfer", "copper"), 385], [t("Aluminium", "aluminium"), 896], [t("Stahl", "steel"), 470], [t("Blei", "lead"), 129]]), mk = r.pick([0.1, 0.15, 0.25, 0.5]), tk = r.pick([80, 100, 150, 200]);
            var tm = (mw * 4187 * tw + mk * mat[1] * tk) / (mw * 4187 + mk * mat[1]);
            return Q(t("Ein Block aus " + mat[0] + " (" + f(mk * 1000) + " g, c = " + mat[1] + " J/(kg K), " + tk + " °C) wird in " + f(mw * 1000) + " g Wasser (c = 4187 J/(kg K), " + tw + " °C) gelegt. Welche Mischungstemperatur stellt sich ein (ohne Verluste)?", "A block of " + mat[0] + " (" + f(mk * 1000) + " g, c = " + mat[1] + " J/(kg K), " + tk + " °C) is put into " + f(mw * 1000) + " g of water (c = 4187 J/(kg K), " + tw + " °C). Which mixing temperature results (no losses)?"),
                A.num(tm, { dec: 2, unit: "°C", tol: 0.05 }), t("Abgegebene Wärme = aufgenommene Wärme.", "Heat released = heat absorbed."), ["m<sub>K</sub> c<sub>K</sub> (" + tk + " − ϑ<sub>m</sub>) = m<sub>W</sub> c<sub>W</sub> (ϑ<sub>m</sub> − " + tw + ")", "ϑ<sub>m</sub> = " + f(tm, 2) + " °C"], rel(mk * mat[1] * (tk - tm), mw * 4187 * (tm - tw), 1e-9));
        }
        if (d === 2) {
            var eps = r.pick([14, 16, 18, 20, 22]), t1 = r.pick([20, 30, 40, 50]), p1 = 1, ka = 1.4, T2 = K(t1) * Math.pow(eps, ka - 1), p2 = p1 * Math.pow(eps, ka);
            return Q(t("Im Dieselmotor wird Luft (κ = 1,4) von " + p1 + " bar und " + t1 + " °C adiabat auf ein " + eps + "-tel des Volumens verdichtet. Wie groß sind Endtemperatur und Enddruck?", "In a diesel engine air (κ = 1.4) at " + p1 + " bar and " + t1 + " °C is compressed adiabatically to 1/" + eps + " of its volume. Find the final temperature and pressure."),
                A.multi([{ l: "ϑ<sub>2</sub> in °C", a: P(T2 - 273.15) }, { l: "p<sub>2</sub> in bar", a: P(p2) }]), "T V<sup>κ−1</sup> = konst.,  p V<sup>κ</sup> = konst.", ["T<sub>2</sub> = T<sub>1</sub> ε<sup>0,4</sup> = " + f(T2) + " K = " + f(T2 - 273.15) + " °C", "p<sub>2</sub> = p<sub>1</sub> ε<sup>1,4</sup> = " + f(p2) + " bar"], rel(p2 / eps / (T2 / K(t1)), p1, 1e-9));
        }
        var V1 = r.pick([1, 2, 5, 10]), pp = r.pick([1, 2, 3]), k = r.pick([2, 3, 4]), W = pp * 1e5 * V1 / 1000 * Math.log(k);
        var Wn = simpson(function (v) { return pp * 1e5 * V1 / 1000 / v; }, V1 / 1000 / k, V1 / 1000, 400);
        return Q(t("Ein ideales Gas (" + pp + " bar, " + V1 + " l) wird isotherm auf 1/" + k + " seines Volumens verdichtet. Welche Arbeit muss zugeführt werden, und welche Wärme gibt das Gas ab?", "An ideal gas (" + pp + " bar, " + V1 + " l) is compressed isothermally to 1/" + k + " of its volume. How much work must be supplied, and how much heat does the gas release?"),
            A.multi([{ l: "W in J", a: P(W) }, { l: "|Q| in J", a: P(W) }]), t("Isotherm: ΔU = 0, also Q = −W. W = p<sub>1</sub>V<sub>1</sub> ln(V<sub>1</sub>/V<sub>2</sub>).", "Isothermal: ΔU = 0, so Q = −W. W = p<sub>1</sub>V<sub>1</sub> ln(V<sub>1</sub>/V<sub>2</sub>)."), ["W = " + f(pp * 100 * V1) + " J · ln " + k + " = " + f(W) + " J"], near(Wn, W, 1e-6 * W));
    });

    // =============== 3.3 Kreisprozesse, Entropie ===============
    add(17, "kreis", "Wirkungsgrad, Wärmepumpe, Entropie", "Efficiency, heat pump, entropy", function (r, d) {
        if (d === 1) {
            var to = r.pick([300, 400, 500, 550, 800]), tu = r.pick([20, 30, 40, 50]), eta = 1 - K(tu) / K(to);
            return Q(t("Wie groß ist der Carnot-Wirkungsgrad einer Wärmekraftmaschine zwischen " + to + " °C und " + tu + " °C (in %)?", "What is the Carnot efficiency of a heat engine between " + to + " °C and " + tu + " °C (in %)?"),
                A.num(eta * 100, { dec: 2, unit: "%", tol: 0.05 }), t("Temperaturen in Kelvin einsetzen.", "Use temperatures in kelvin."), ["η = 1 − " + f(K(tu)) + "/" + f(K(to)) + " = " + f(eta * 100) + " %"], eta > 0 && eta < 1);
        }
        if (d === 2) {
            var Qh = r.pick([8, 10, 12, 15, 20]), epsW = r.pick([3, 3.5, 4, 4.5]), ta = r.pick([-5, 0, 5, 10]), ti = r.pick([35, 40, 45, 55]), Pel = Qh / epsW, epsC = K(ti) / (K(ti) - K(ta));
            return Q(t("Eine Wärmepumpe mit der Leistungszahl " + f(epsW) + " liefert " + Qh + " kW Heizleistung bei " + ti + " °C, außen sind " + ta + " °C. Welche elektrische Leistung nimmt sie auf, und wie groß wäre die Leistungszahl eines idealen Carnot-Prozesses?", "A heat pump with COP " + f(epsW) + " delivers " + Qh + " kW of heating at " + ti + " °C, outside it is " + ta + " °C. Which electrical power does it draw, and what would the COP of an ideal Carnot process be?"),
                A.multi([{ l: "P<sub>el</sub> in kW", a: P(Pel) }, { l: "ε<sub>C</sub>", a: P(epsC) }]), "ε = |Q̇<sub>ab</sub>| / P,  ε<sub>C</sub> = T<sub>o</sub> / (T<sub>o</sub> − T<sub>u</sub>).", ["P = " + f(Pel) + " kW", "ε<sub>C</sub> = " + f(K(ti)) + " / " + (ti - ta) + " = " + f(epsC)], rel(Pel * epsW, Qh, 1e-12) && epsC > epsW);
        }
        var m = r.pick([0.5, 1, 2, 5]), mat = r.pick([[t("Kupfer", "copper"), 385], [t("Wasser", "water"), 4187], [t("Aluminium", "aluminium"), 896], [t("Eisen", "iron"), 450]]), t1 = r.pick([10, 20, 0]), t2 = r.pick([60, 80, 100]), dS = m * mat[1] * Math.log(K(t2) / K(t1));
        var num = simpson(function (T) { return m * mat[1] / T; }, K(t1), K(t2), 200);
        return Q(t("Ein Körper aus " + mat[0] + " (" + m + " kg, c = " + mat[1] + " J/(kg K)) wird von " + t1 + " °C auf " + t2 + " °C erwärmt. Um wie viel nimmt seine Entropie zu?", "A body of " + mat[0] + " (" + m + " kg, c = " + mat[1] + " J/(kg K)) is heated from " + t1 + " °C to " + t2 + " °C. By how much does its entropy increase?"),
            P(dS, "J/K"), "dS = dQ/T = m c dT/T.", ["ΔS = m c ln(T<sub>2</sub>/T<sub>1</sub>) = " + f(dS) + " J/K"], near(num, dS, 1e-6 * dS));
    });

    // =============== 3.4 reale Gase, Phasen ===============
    add(18, "phasen", "Phasenumwandlung, Luftfeuchte, Van der Waals", "Phase change, humidity, van der Waals", function (r, d) {
        if (d === 1) {
            var m = r.pick([0.5, 1, 2, 3]), ti = -r.pick([5, 10, 15, 20]), tw = r.pick([20, 30, 40, 50]), Qt = m * (2100 * (-ti) + 334000 + 4187 * tw) / 1000;
            return Q(t("Wie viel Wärme braucht man, um " + m + " kg Eis von " + ti + " °C in Wasser von " + tw + " °C zu verwandeln? (c<sub>Eis</sub> = 2100 J/(kg K), q<sub>s</sub> = 334 kJ/kg, c<sub>W</sub> = 4187 J/(kg K))", "How much heat is needed to turn " + m + " kg of ice at " + ti + " °C into water at " + tw + " °C? (c<sub>ice</sub> = 2100 J/(kg K), q<sub>s</sub> = 334 kJ/kg, c<sub>w</sub> = 4187 J/(kg K))"),
                P(Qt, "kJ"), t("Drei Schritte: Eis erwärmen, schmelzen, Wasser erwärmen.", "Three steps: warm the ice, melt it, warm the water."), ["Q<sub>1</sub> = " + f(m * 2.1 * (-ti)) + " kJ", "Q<sub>2</sub> = " + f(m * 334) + " kJ", "Q<sub>3</sub> = " + f(m * 4.187 * tw) + " kJ", "Q = " + f(Qt) + " kJ"], Qt > m * 334);
        }
        if (d === 2) {
            var tab = r.pick([[10, 12.28], [15, 17.05], [20, 23.39], [25, 31.69], [30, 42.46]]), phi = r.pick([40, 50, 60, 70, 80]), rhoD = phi / 100 * tab[1] * 100 / (461.5 * K(tab[0])) * 1000;
            return Q(t("Luft hat " + tab[0] + " °C und " + phi + " % relative Feuchte. Der Sättigungsdampfdruck beträgt " + f(tab[1]) + " hPa. Wie viel Wasserdampf enthält ein Kubikmeter Luft? (R<sub>D</sub> = 461,5 J/(kg K))", "Air is at " + tab[0] + " °C and " + phi + " % relative humidity. The saturation vapour pressure is " + f(tab[1]) + " hPa. How much water vapour does one cubic metre of air contain? (R<sub>D</sub> = 461.5 J/(kg K))"),
                P(rhoD, "g/m³"), t("Dampfdruck p<sub>D</sub> = φ p<sub>S</sub>, dann Gasgleichung für den Dampf.", "Vapour pressure p<sub>D</sub> = φ p<sub>S</sub>, then the gas law for the vapour."), ["p<sub>D</sub> = " + f(phi / 100 * tab[1]) + " hPa", "ρ<sub>D</sub> = p<sub>D</sub> / (R<sub>D</sub> T) = " + f(rhoD) + " g/m³"], rel(rhoD / 1000 * 461.5 * K(tab[0]), phi * tab[1], 1e-9));
        }
        var gas = r.pick([["CO₂", 0.364, 4.27e-5], ["N₂", 0.137, 3.87e-5], ["O₂", 0.138, 3.18e-5], ["CH₄", 0.230, 4.31e-5]]), nn = r.pick([1, 2, 5]), V = r.pick([1, 2, 5]) / 1000, T = r.pick([273, 300, 350]);
        var pv = (nn * R * T / (V - nn * gas[2]) - gas[1] * nn * nn / (V * V)) / 1e5, pid = nn * R * T / V / 1e5;
        return Q(t("" + nn + " mol " + gas[0] + " befinden sich bei " + T + " K in " + f(V * 1000) + " l. Wie groß ist der Druck nach Van der Waals (a = " + f(gas[1]) + " Pa m⁶/mol², b = " + f(gas[2] * 1e5) + " · 10⁻⁵ m³/mol) und nach dem idealen Gasgesetz?", nn + " mol of " + gas[0] + " are at " + T + " K in " + f(V * 1000) + " l. What is the pressure by van der Waals (a = " + f(gas[1]) + " Pa m⁶/mol², b = " + f(gas[2] * 1e5) + " · 10⁻⁵ m³/mol) and by the ideal gas law?"),
            A.multi([{ l: "p<sub>vdW</sub> in bar", a: P(pv) }, { l: "p<sub>ideal</sub> in bar", a: P(pid) }]), "p = n R T / (V − n b) − a n² / V².", ["p<sub>vdW</sub> = " + f(pv) + " bar", "p<sub>ideal</sub> = " + f(pid) + " bar"], rel((pv * 1e5 + gas[1] * nn * nn / (V * V)) * (V - nn * gas[2]), nn * R * T, 1e-9));
    });

    // =============== 3.5 Wärmeübertragung ===============
    add(19, "waerme", "Wärmeleitung, Wärmedurchgang, Strahlung", "Conduction, heat transmission, radiation", function (r, d) {
        if (d === 1) {
            var mat = r.pick([[t("Ziegel", "brick"), 0.8], [t("Beton", "concrete"), 2.1], [t("Holz", "wood"), 0.13], [t("Glas", "glass"), 1.0]]), s = r.pick([4, 10, 24, 30]) / 100, Aa = r.pick([2, 5, 10, 12]), dT = r.pick([10, 15, 20, 25]), Phi = mat[1] * Aa * dT / s;
            return Q(t("Durch eine " + f(s * 100) + " cm dicke Wand aus " + mat[0] + " (λ = " + f(mat[1]) + " W/(m K), A = " + Aa + " m²) fließt Wärme bei " + dT + " K Temperaturdifferenz zwischen den Oberflächen. Wie groß ist der Wärmestrom?", "Heat flows through a " + f(s * 100) + " cm thick wall of " + mat[0] + " (λ = " + f(mat[1]) + " W/(m K), A = " + Aa + " m²) with a temperature difference of " + dT + " K between the surfaces. How large is the heat flow?"),
                P(Phi, "W"), "Φ = λ A Δϑ / s.", ["Φ = " + f(Phi) + " W"], rel(Phi * s, mat[1] * Aa * dT, 1e-12));
        }
        if (d === 2) {
            var ai = 8, aa = 25, layers = [[r.pick([150, 200, 250]) / 1000, 2.1], [r.pick([60, 80, 100, 120]) / 1000, 0.04], [r.pick([10, 20]) / 1000, 0.5]], Rt = 1 / ai + 1 / aa;
            layers.forEach(function (L) { Rt += L[0] / L[1]; });
            var Uv = 1 / Rt, ti = 20, ta = r.pick([-10, -5, 0, 5]), q = Uv * (ti - ta);
            return Q(t("Ein Flachdach besteht aus " + f(layers[0][0] * 1000) + " mm Beton (λ = 2,1), " + f(layers[1][0] * 1000) + " mm Dämmung (λ = 0,04) und " + f(layers[2][0] * 1000) + " mm Putz (λ = 0,5, alle in W/(m K)). Die Übergangskoeffizienten sind innen 8 und außen 25 W/(m² K). Berechne den U-Wert und die Wärmestromdichte bei 20 °C innen und " + ta + " °C außen.", "A flat roof consists of " + f(layers[0][0] * 1000) + " mm concrete (λ = 2.1), " + f(layers[1][0] * 1000) + " mm insulation (λ = 0.04) and " + f(layers[2][0] * 1000) + " mm plaster (λ = 0.5, all in W/(m K)). The surface coefficients are 8 inside and 25 W/(m² K) outside. Compute the U value and the heat flux at 20 °C inside and " + ta + " °C outside."),
                A.multi([{ l: "U in W/(m² K)", a: P(Uv) }, { l: "q in W/m²", a: P(q) }]), t("Wärmewiderstände addieren sich wie Reihenwiderstände.", "Thermal resistances add like series resistors."), ["1/U = 1/α<sub>i</sub> + Σ s/λ + 1/α<sub>a</sub> = " + f(Rt) + " m² K/W", "U = " + f(Uv) + " W/(m² K)", "q = U Δϑ = " + f(q) + " W/m²"], rel(q / Uv, ti - ta, 1e-12));
        }
        var eps = r.pick([0.9, 0.95, 0.8, 0.98]), Aa3 = r.pick([0.5, 1, 1.8, 2]), t1 = r.pick([33, 35, 60, 100]), t2 = r.pick([0, 10, 20]), Pn = eps * sigma * Aa3 * (Math.pow(K(t1), 4) - Math.pow(K(t2), 4));
        return Q(t("Eine Oberfläche (A = " + f(Aa3) + " m², ε = " + f(eps) + ") hat " + t1 + " °C, die Umgebung " + t2 + " °C. Wie groß ist die abgestrahlte Nettoleistung? (σ = 5,67 · 10⁻⁸ W/(m² K⁴))", "A surface (A = " + f(Aa3) + " m², ε = " + f(eps) + ") is at " + t1 + " °C, the surroundings at " + t2 + " °C. How large is the net radiated power? (σ = 5.67 · 10⁻⁸ W/(m² K⁴))"),
            P(Pn, "W"), "Φ = ε σ A (T<sub>1</sub>⁴ − T<sub>2</sub>⁴).", ["Φ = " + f(Pn) + " W"], Pn > 0 && rel(Pn, eps * sigma * Aa3 * (K(t1) - K(t2)) * (K(t1) + K(t2)) * (K(t1) * K(t1) + K(t2) * K(t2)), 1e-9));
    });

    // =============== 4.1 Gleichstrom ===============
    add(20, "gleichstrom", "Widerstand, Netzwerke, Quellen", "Resistance, networks, sources", function (r, d) {
        if (d === 1) {
            var mat = r.pick([[t("Kupfer", "copper"), 0.0178], [t("Aluminium", "aluminium"), 0.0278], [t("Konstantan", "constantan"), 0.49], [t("Silber", "silver"), 0.016]]), l = r.pick([10, 50, 100, 500, 1000]), Aa = r.pick([0.5, 1.5, 2.5, 10, 50]), Rw = mat[1] * l / Aa;
            return Q(t("Wie groß ist der Widerstand eines " + l + " m langen Drahts aus " + mat[0] + " (ρ = " + f(mat[1]) + " Ω mm²/m) mit " + f(Aa) + " mm² Querschnitt?", "What is the resistance of a " + l + " m long " + mat[0] + " wire (ρ = " + f(mat[1]) + " Ω mm²/m) with " + f(Aa) + " mm² cross-section?"),
                P(Rw, "Ω"), "R = ρ l / A.", ["R = " + f(Rw) + " Ω"], rel(Rw * Aa, mat[1] * l, 1e-12));
        }
        if (d === 2) {
            var R1 = r.pick([10, 22, 47, 100]), R2 = r.pick([20, 33, 68, 150]), R3 = r.pick([30, 47, 82, 220]), U0 = r.pick([12, 24, 9, 48]), Rp = R2 * R3 / (R2 + R3), Rg = R1 + Rp, I = U0 / Rg, I3 = I * R2 / (R2 + R3);
            return Q(t("R<sub>1</sub> = " + R1 + " Ω liegt in Reihe zur Parallelschaltung aus R<sub>2</sub> = " + R2 + " Ω und R<sub>3</sub> = " + R3 + " Ω, angeschlossen an " + U0 + " V. Wie groß sind der Gesamtstrom und der Strom durch R<sub>3</sub>?", "R<sub>1</sub> = " + R1 + " Ω is in series with the parallel combination of R<sub>2</sub> = " + R2 + " Ω and R<sub>3</sub> = " + R3 + " Ω, connected to " + U0 + " V. Find the total current and the current through R<sub>3</sub>."),
                A.multi([{ l: "I in mA", a: P(I * 1000) }, { l: "I<sub>3</sub> in mA", a: P(I3 * 1000) }]), t("Erst den Ersatzwiderstand, dann die Stromteilerregel.", "First the equivalent resistance, then the current divider rule."), ["R<sub>2</sub> ∥ R<sub>3</sub> = " + f(Rp) + " Ω", "R = " + f(Rg) + " Ω, I = " + f(I * 1000) + " mA", "I<sub>3</sub> = I · R<sub>2</sub>/(R<sub>2</sub> + R<sub>3</sub>) = " + f(I3 * 1000) + " mA"], rel(R1 * I + R3 * I3, U0, 1e-9));
        }
        var U0b = r.pick([1.5, 4.5, 9, 12]), Ri = r.pick([0.2, 0.5, 1, 2]), RL = r.pick([1, 2, 5, 10]) * Ri, I2 = U0b / (Ri + RL), UK = U0b - Ri * I2, PL = UK * I2;
        return Q(t("Eine Batterie (U<sub>0</sub> = " + f(U0b) + " V, R<sub>i</sub> = " + f(Ri) + " Ω) speist einen Lastwiderstand von " + f(RL) + " Ω. Wie groß sind Klemmenspannung und Leistung im Lastwiderstand?", "A battery (U<sub>0</sub> = " + f(U0b) + " V, R<sub>i</sub> = " + f(Ri) + " Ω) feeds a load of " + f(RL) + " Ω. Find the terminal voltage and the power in the load."),
            A.multi([{ l: "U<sub>K</sub> in V", a: P(UK) }, { l: "P in W", a: P(PL) }]), "I = U<sub>0</sub> / (R<sub>i</sub> + R<sub>L</sub>),  U<sub>K</sub> = U<sub>0</sub> − R<sub>i</sub> I.", ["I = " + f(I2) + " A", "U<sub>K</sub> = " + f(UK) + " V", "P = " + f(PL) + " W"], rel(PL, I2 * I2 * RL, 1e-9));
    });

    // =============== 4.2 Ladungstransport ===============
    add(21, "elektrolyse", "Elektrolyse und Elektronenstrahl", "Electrolysis and electron beam", function (r, d) {
        var met = r.pick([[t("Kupfer", "copper"), 63.55, 2, 8.96], [t("Silber", "silver"), 107.87, 1, 10.49], [t("Nickel", "nickel"), 58.69, 2, 8.91], [t("Zink", "zinc"), 65.38, 2, 7.14], [t("Chrom", "chromium"), 52.0, 3, 7.19]]);
        if (d === 1) {
            var I = r.pick([1, 2, 5, 10, 20]), th = r.pick([0.5, 1, 2, 3]), m = met[1] * I * th * 3600 / (met[2] * FAR);
            return Q(t("Wie viel " + met[0] + " (M = " + f(met[1]) + " g/mol, Wertigkeit " + met[2] + ") scheidet ein Strom von " + I + " A in " + f(th) + " h ab? (F = 96 485 C/mol)", "How much " + met[0] + " (M = " + f(met[1]) + " g/mol, valence " + met[2] + ") does a current of " + I + " A deposit in " + f(th) + " h? (F = 96,485 C/mol)"),
                P(m, "g"), t("Faraday: m = M Q / (z F) mit Q = I t.", "Faraday: m = M Q / (z F) with Q = I t."), ["Q = " + f(I * th * 3600) + " C", "m = " + f(m) + " g"], rel(m / met[1] * met[2] * FAR, I * th * 3600, 1e-12));
        }
        if (d === 2) {
            var s = r.pick([10, 20, 25, 50]), Aa = r.pick([100, 200, 500, 1000]), I2 = r.pick([1, 2, 5]), m2 = met[3] * Aa * s * 1e-4, tt = m2 * met[2] * FAR / (met[1] * I2) / 3600;
            return Q(t("Eine Fläche von " + Aa + " cm² soll mit einer " + s + " µm dicken Schicht " + met[0] + " (ρ = " + f(met[3]) + " g/cm³, M = " + f(met[1]) + " g/mol, z = " + met[2] + ") überzogen werden. Wie lange dauert das bei " + I2 + " A?", "An area of " + Aa + " cm² is to be coated with a " + s + " µm layer of " + met[0] + " (ρ = " + f(met[3]) + " g/cm³, M = " + f(met[1]) + " g/mol, z = " + met[2] + "). How long does it take at " + I2 + " A?"),
                P(tt, "h"), t("Masse aus Volumen und Dichte, dann Faraday nach t auflösen.", "Mass from volume and density, then solve Faraday for t."), ["m = ρ A s = " + f(m2) + " g", "t = m z F / (M I) = " + f(tt) + " h"], rel(met[1] * I2 * tt * 3600 / (met[2] * FAR), m2, 1e-12));
        }
        var Ub = r.pick([100, 200, 500, 1000, 2000]), v = Math.sqrt(2 * qe * Ub / me) / 1e6;
        return Q(t("Elektronen werden im Vakuum aus der Ruhe mit " + Ub + " V beschleunigt. Welche Geschwindigkeit erreichen sie (nicht relativistisch, in 10⁶ m/s)?", "Electrons are accelerated from rest in vacuum through " + Ub + " V. Which speed do they reach (non-relativistic, in 10⁶ m/s)?"),
            P(v), "e U = ½ m v².", ["v = √(2 e U / m) = " + f(v) + " · 10⁶ m/s"], rel(0.5 * me * v * v * 1e12, qe * Ub, 1e-9));
    });

    // =============== 4.3 elektrisches Feld ===============
    add(22, "efeld", "Coulomb, Plattenkondensator, Schwebe", "Coulomb, plate capacitor, levitation", function (r, d) {
        if (d === 1) {
            var rr = r.pick([5, 8, 10, 15]) / 100, dd = r.pick([1, 2, 4, 5]) / 1000, Ub = r.pick([100, 200, 500, 1000]), Aa = PI * rr * rr, C = e0 * Aa / dd, Ef = Ub / dd;
            return Q(t("Zwei kreisförmige Platten (r = " + f(rr * 100) + " cm) stehen im Abstand " + f(dd * 1000) + " mm in Luft. Wie groß ist die Kapazität, und welche Feldstärke herrscht bei " + Ub + " V?", "Two circular plates (r = " + f(rr * 100) + " cm) are " + f(dd * 1000) + " mm apart in air. What is the capacitance, and which field strength exists at " + Ub + " V?"),
                A.multi([{ l: "C in pF", a: P(C * 1e12) }, { l: "E in kV/m", a: P(Ef / 1000) }]), "C = ε<sub>0</sub> A / d,  E = U/d.", ["A = " + f(Aa * 1e4) + " cm²", "C = " + f(C * 1e12) + " pF", "E = " + f(Ef / 1000) + " kV/m"], rel(0.5 * C * Ub * Ub, 0.5 * e0 * Ef * Ef * Aa * dd, 1e-9));
        }
        if (d === 2) {
            var q1 = r.pick([5, 10, 20, 50]), q2 = r.pick([-5, 10, -20, 40]), rr2 = r.pick([2, 5, 10, 20]) / 100, F = Math.abs(q1 * q2) * 1e-18 / (4 * PI * e0 * rr2 * rr2) * 1000;
            return Q(t("Zwei Punktladungen von " + q1 + " nC und " + q2 + " nC sind " + f(rr2 * 100) + " cm voneinander entfernt. Wie groß ist der Betrag der Kraft zwischen ihnen?", "Two point charges of " + q1 + " nC and " + q2 + " nC are " + f(rr2 * 100) + " cm apart. What is the magnitude of the force between them?"),
                P(F, "mN"), "F = Q<sub>1</sub> Q<sub>2</sub> / (4π ε<sub>0</sub> r²).", ["F = " + f(F) + " mN" + t(q1 * q2 > 0 ? " (abstoßend)" : " (anziehend)", q1 * q2 > 0 ? " (repulsive)" : " (attractive)")], rel(F / 1000 * rr2 * rr2, 8.988e9 * Math.abs(q1 * q2) * 1e-18, 2e-3));
        }
        var m = r.pick([0.01, 0.03, 0.05, 0.1]) / 1000, Qc = r.pick([2, 4, 5, 10]) * 1e-8, dd3 = r.pick([2, 4, 5, 10]) / 100, Ub3 = m * g * dd3 / Qc;
        return Q(t("Ein geladener Wattebausch (" + f(m * 1e6) + " mg, Q = " + f(Qc * 1e8) + " · 10⁻⁸ C) soll zwischen den waagerechten Platten eines Kondensators (Abstand " + f(dd3 * 100) + " cm) schweben. Welche Spannung ist nötig?", "A charged piece of cotton wool (" + f(m * 1e6) + " mg, Q = " + f(Qc * 1e8) + " · 10⁻⁸ C) is to float between the horizontal plates of a capacitor (gap " + f(dd3 * 100) + " cm). Which voltage is needed?"),
            P(Ub3, "V"), t("Elektrische Kraft Q U/d gleich Gewichtskraft m g.", "Electric force Q U/d equals weight m g."), ["U = m g d / Q = " + f(Ub3) + " V"], rel(Qc * Ub3 / dd3, m * g, 1e-12));
    });

    // =============== 4.4 magnetisches Feld ===============
    add(23, "bfeld", "Spulenfeld, Lorentzkraft, Kreisbahn", "Coil field, Lorentz force, circular path", function (r, d) {
        if (d === 1) {
            var N = r.pick([200, 500, 1000, 2000]), I = r.pick([0.5, 1, 2, 5]), l = r.pick([10, 20, 30, 50]) / 100, Hf = N * I / l, B = mu0 * Hf * 1000;
            return Q(t("Eine lange Zylinderspule (" + N + " Windungen, Länge " + f(l * 100) + " cm, ohne Eisen) führt " + f(I) + " A. Wie groß sind magnetische Feldstärke und Flussdichte innen?", "A long solenoid (" + N + " turns, length " + f(l * 100) + " cm, no iron) carries " + f(I) + " A. Find the magnetic field strength and the flux density inside."),
                A.multi([{ l: "H in A/m", a: P(Hf) }, { l: "B in mT", a: P(B) }]), "H = N I / l,  B = μ<sub>0</sub> H.", ["H = " + f(Hf) + " A/m", "B = " + f(B) + " mT"], rel(B / 1000 / mu0 * l, N * I, 1e-12));
        }
        if (d === 2) {
            var Ek = r.pick([1, 2, 3, 5]), B2 = r.pick([0.5, 1, 1.5, 2.5]), v = Math.sqrt(2 * Ek * 1e6 * qe / mp), rad = mp * v / (qe * B2) * 100;
            return Q(t("Ein Proton mit der kinetischen Energie " + Ek + " MeV bewegt sich senkrecht zu einem Magnetfeld mit B = " + f(B2) + " T. Wie groß ist der Radius seiner Kreisbahn (nicht relativistisch, m<sub>p</sub> = 1,673 · 10⁻²⁷ kg)?", "A proton with kinetic energy " + Ek + " MeV moves perpendicular to a magnetic field with B = " + f(B2) + " T. What is the radius of its circular path (non-relativistic, m<sub>p</sub> = 1.673 · 10⁻²⁷ kg)?"),
                P(rad, "cm"), t("Lorentzkraft = Zentripetalkraft: q v B = m v²/r.", "Lorentz force = centripetal force: q v B = m v²/r."), ["v = √(2E/m) = " + f(v / 1e6) + " · 10⁶ m/s", "r = m v / (q B) = " + f(rad) + " cm"], rel(rad / 100, Math.sqrt(2 * mp * Ek * 1e6 * qe) / (qe * B2), 1e-9));
        }
        var I3 = r.pick([5, 10, 20, 50]), l3 = r.pick([0.1, 0.2, 0.5, 1]), B3 = r.pick([0.2, 0.5, 0.8, 1.2]), al = r.pick([30, 45, 60, 90]), F = I3 * l3 * B3 * Math.sin(al * PI / 180);
        return Q(t("Ein gerader Leiter (l = " + f(l3 * 100) + " cm) führt " + I3 + " A und liegt unter " + al + "° zu den Feldlinien eines Magnetfelds mit " + f(B3) + " T. Welche Kraft wirkt auf ihn?", "A straight conductor (l = " + f(l3 * 100) + " cm) carries " + I3 + " A and lies at " + al + "° to the field lines of a " + f(B3) + " T magnetic field. Which force acts on it?"),
            P(F, "N"), "F = I l B sin α.", ["F = " + f(F) + " N"], F <= I3 * l3 * B3 + 1e-12);
    });

    // =============== 4.5 Induktion ===============
    add(24, "induktion", "Induktionsgesetz", "Law of induction", function (r, d) {
        if (d === 1) {
            var N = r.pick([100, 200, 300, 500]), Aa = r.pick([50, 100, 150, 200]) / 1e4, nn = r.pick([600, 800, 1200, 1500]), u = r.pick([12, 24, 48, 100]), w = 2 * PI * nn / 60, B = u / (N * Aa * w) * 1000;
            var tt = PI / (2 * w), num = N * Aa * (B / 1000) * w * Math.sin(w * tt);
            return Q(t("Eine Flachspule (" + N + " Windungen, A = " + f(Aa * 1e4) + " cm²) rotiert mit " + nn + " min⁻¹ in einem homogenen Magnetfeld, die Achse steht senkrecht zu den Feldlinien. Bei welcher Flussdichte entsteht die Scheitelspannung " + u + " V?", "A flat coil (" + N + " turns, A = " + f(Aa * 1e4) + " cm²) rotates at " + nn + " rpm in a uniform magnetic field, with the axis perpendicular to the field lines. At which flux density is the peak voltage " + u + " V?"),
                P(B, "mT"), "û = N B A ω.", ["ω = " + f(w) + " s⁻¹", "B = û / (N A ω) = " + f(B) + " mT"], rel(num, u, 1e-9));
        }
        if (d === 2) {
            var B2 = r.pick([0.2, 0.5, 0.8, 1]), l = r.pick([5, 10, 20, 30]) / 100, v = r.pick([0.5, 1, 2, 5]), Rr = r.pick([0.5, 1, 2, 3.3]), Ui = B2 * l * v, I = Ui / Rr, F = I * l * B2;
            return Q(t("Ein Leiterstab (l = " + f(l * 100) + " cm) wird mit " + f(v) + " m/s senkrecht durch ein Magnetfeld (B = " + f(B2) + " T) gezogen. Er ist über einen Widerstand von " + f(Rr) + " Ω geschlossen. Wie groß sind induzierte Spannung und bremsende Kraft?", "A rod (l = " + f(l * 100) + " cm) is pulled at " + f(v) + " m/s perpendicular through a magnetic field (B = " + f(B2) + " T). It is closed through a resistor of " + f(Rr) + " Ω. Find the induced voltage and the braking force."),
                A.multi([{ l: "U in mV", a: P(Ui * 1000) }, { l: "F in mN", a: P(F * 1000) }]), "U = B l v,  F = I l B.", ["U = " + f(Ui * 1000) + " mV", "I = " + f(I * 1000) + " mA", "F = " + f(F * 1000) + " mN"], rel(F * v, Ui * Ui / Rr, 1e-9));
        }
        var N3 = r.pick([50, 100, 250, 500]), A3 = r.pick([10, 20, 50, 100]) / 1e4, dB = r.pick([0.1, 0.2, 0.5, 1]), dt = r.pick([5, 10, 20, 50]) / 1000, u3 = N3 * A3 * dB / dt;
        return Q(t("Die Flussdichte durch eine Spule (" + N3 + " Windungen, A = " + f(A3 * 1e4) + " cm²) steigt in " + f(dt * 1000) + " ms gleichmäßig um " + f(dB) + " T. Welche Spannung wird induziert?", "The flux density through a coil (" + N3 + " turns, A = " + f(A3 * 1e4) + " cm²) rises uniformly by " + f(dB) + " T in " + f(dt * 1000) + " ms. Which voltage is induced?"),
            P(u3, "V"), "|u| = N A ΔB / Δt.", ["ΔΦ = " + f(A3 * dB * 1e3) + " mWb", "u = " + f(u3) + " V"], rel(u3 * dt, N3 * A3 * dB, 1e-12));
    });

    // =============== 4.5 Wechselstrom ===============
    add(25, "wechselstrom", "Blindwiderstände, Impedanz, RC-Glied", "Reactances, impedance, RC circuit", function (r, d) {
        if (d === 1) {
            var UR = r.pick([50, 60, 80, 100]), I = r.pick([0.12, 0.2, 0.3, 0.5]), UL = Math.sqrt(230 * 230 - UR * UR), L = UL / (2 * PI * 50 * I);
            return Q(t("Eine Lampe braucht " + UR + " V und " + f(I) + " A. Welche Induktivität muss eine in Reihe geschaltete, verlustfreie Spule haben, damit sie am Netz (230 V, 50 Hz) betrieben werden kann?", "A lamp needs " + UR + " V and " + f(I) + " A. Which inductance must a loss-free series coil have so that it can run on the mains (230 V, 50 Hz)?"),
                P(L, "H"), t("Die Spannungen an R und L stehen senkrecht aufeinander: U² = U<sub>R</sub>² + U<sub>L</sub>².", "The voltages across R and L are perpendicular: U² = U<sub>R</sub>² + U<sub>L</sub>²."), ["U<sub>L</sub> = √(230² − " + UR + "²) = " + f(UL) + " V", "L = U<sub>L</sub> / (ω I) = " + f(L) + " H"], rel(Math.pow(UR, 2) + Math.pow(2 * PI * 50 * L * I, 2), 230 * 230, 1e-9));
        }
        if (d === 2) {
            var Rr = r.pick([50, 100, 200]), L2 = r.pick([0.1, 0.2, 0.5]), C = r.pick([10, 22, 47, 100]) * 1e-6, w = 2 * PI * 50, XL = w * L2, XC = 1 / (w * C), Z = Math.sqrt(Rr * Rr + Math.pow(XL - XC, 2)), I2 = 230 / Z, ph = Math.atan2(XL - XC, Rr) * 180 / PI;
            var re = Rr, im = XL - XC;
            return Q(t("Eine Reihenschaltung aus R = " + Rr + " Ω, L = " + f(L2) + " H und C = " + f(C * 1e6) + " µF liegt am Netz (230 V, 50 Hz). Wie groß sind Strom und Phasenwinkel φ (positiv heißt induktiv)?", "A series circuit of R = " + Rr + " Ω, L = " + f(L2) + " H and C = " + f(C * 1e6) + " µF is connected to the mains (230 V, 50 Hz). Find the current and the phase angle φ (positive means inductive)."),
                A.multi([{ l: "I in A", a: P(I2) }, { l: "φ in °", a: A.num(ph, { dec: 1, unit: "°", tol: 0.2 }) }]), "Z = √(R² + (X<sub>L</sub> − X<sub>C</sub>)²),  tan φ = (X<sub>L</sub> − X<sub>C</sub>)/R.", ["X<sub>L</sub> = " + f(XL) + " Ω, X<sub>C</sub> = " + f(XC) + " Ω", "Z = " + f(Z) + " Ω, I = " + f(I2) + " A", "φ = " + f(ph, 1) + "°"], rel(Math.hypot(re, im), Z, 1e-12));
        }
        var R3 = r.pick([1, 2.2, 4.7, 10]), C3 = r.pick([10, 47, 100, 220]), U0 = r.pick([5, 10, 12]), tau = R3 * C3, tt = r.pick([0.5, 1, 2, 3]) * tau, uc = U0 * (1 - Math.exp(-tt / tau));
        var x = 0, h = tt / 2000; for (var i = 0; i < 2000; i += 1) { var k1 = (U0 - x) / tau, k2 = (U0 - (x + h / 2 * k1)) / tau, k3 = (U0 - (x + h / 2 * k2)) / tau, k4 = (U0 - (x + h * k3)) / tau; x += h / 6 * (k1 + 2 * k2 + 2 * k3 + k4); }
        return Q(t("Ein Kondensator (C = " + C3 + " µF) wird über R = " + f(R3) + " kΩ an " + U0 + " V geladen. Wie groß ist die Kondensatorspannung nach " + f(tt) + " ms?", "A capacitor (C = " + C3 + " µF) is charged through R = " + f(R3) + " kΩ from " + U0 + " V. What is the capacitor voltage after " + f(tt) + " ms?"),
            P(uc, "V"), "u<sub>C</sub> = U<sub>0</sub> (1 − e<sup>−t/τ</sup>),  τ = R C.", ["τ = " + f(tau) + " ms", "u<sub>C</sub> = " + f(uc) + " V"], near(x, uc, 1e-7));
    });
})(typeof window !== "undefined" ? window : globalThis);
