/* SOR Aufgaben Physik 4: Atom-, Kern-, Festkörperphysik, Relativität (K-PI-39 bis K-PI-56), Aufgabentypen nach Hering, Martin, Stohrer. Braucht ph-1.js (E.PHU) */
(function (root) {
    "use strict";
    var E = root.SOR_EX || require("../exercise-engine.js");
    if (!E.PHU && typeof require !== "undefined") require("./ph-1.js");
    var A = E.A, M = E.M, t = E.tr, near = M.near, U = E.PHU, Q = U.Q, P = U.P, f = U.f, rel = U.rel, simpson = M.simpson;
    var PI = Math.PI, hP = 6.626e-34, hb = hP / (2 * PI), c0 = 2.998e8, qe = 1.602e-19, me = 9.109e-31, kB = 1.381e-23, NA = 6.022e23, uKg = 1.6605e-27, R = 8.314, HC = 1239.84;
    function add(nr, key, de, en, gen) { E.add({ id: "k-pi" + nr + "-" + key, topic: "K-PI-" + nr, title: t(de, en), gen: gen }); }
    var ions = [["H", 1], ["He⁺", 2], ["Li²⁺", 3]];

    // =============== 8.1 Bohr ===============
    add(39, "bohr", "Spektrallinien und Bohr'sche Bahnen", "Spectral lines and Bohr orbits", function (r, d) {
        if (d === 1) {
            var n2 = r.int(3, 7), la = 1 / (1.0968e7 * (1 / 4 - 1 / (n2 * n2))) * 1e9, Ev = 13.6 * (1 / 4 - 1 / (n2 * n2));
            return Q(t("Welche Wellenlänge hat die Balmer-Linie des Wasserstoffs beim Übergang von n = " + n2 + " nach n = 2? (R<sub>H</sub> = 1,0968 · 10⁷ m⁻¹)", "What is the wavelength of the hydrogen Balmer line for the transition from n = " + n2 + " to n = 2? (R<sub>H</sub> = 1.0968 · 10⁷ m⁻¹)"),
                P(la, "nm"), "1/λ = R<sub>H</sub> (1/2² − 1/n²).", ["1/λ = " + f(1.0968e7 * (0.25 - 1 / (n2 * n2))) + " m⁻¹", "λ = " + f(la) + " nm"], rel(Ev * la, HC, 3e-3));
        }
        if (d === 2) {
            var io = r.pick(ions), n1 = r.int(1, 2), nh = n1 + r.int(1, 3), Eph = 13.6 * io[1] * io[1] * (1 / (n1 * n1) - 1 / (nh * nh));
            return Q(t("Welche Photonenenergie wird beim Übergang n = " + nh + " → n = " + n1 + " im wasserstoffähnlichen " + io[0] + " (Z = " + io[1] + ") frei?", "Which photon energy is released in the transition n = " + nh + " → n = " + n1 + " in hydrogen-like " + io[0] + " (Z = " + io[1] + ")?"),
                P(Eph, "eV"), "E<sub>n</sub> = −13,6 eV · Z²/n².", ["E<sub>" + nh + "</sub> = " + f(-13.6 * io[1] * io[1] / (nh * nh)) + " eV, E<sub>" + n1 + "</sub> = " + f(-13.6 * io[1] * io[1] / (n1 * n1)) + " eV", "E<sub>Ph</sub> = " + f(Eph) + " eV"], Eph > 0 && rel(Eph, -13.6 * io[1] * io[1] / (nh * nh) + 13.6 * io[1] * io[1] / (n1 * n1), 1e-12));
        }
        var io3 = r.pick(ions), nn = r.int(1, 4), rn = 0.0529 * nn * nn / io3[1], v = 2.188e6 * io3[1] / nn / 1e6;
        return Q(t("Wie groß sind Bahnradius und Bahngeschwindigkeit des Elektrons auf der " + nn + ". Bohr'schen Bahn von " + io3[0] + " (Z = " + io3[1] + ")? (r<sub>1</sub> = 0,0529 nm, v<sub>1</sub> = 2,188 · 10⁶ m/s für H)", "What are the orbit radius and orbital speed of the electron on Bohr orbit " + nn + " of " + io3[0] + " (Z = " + io3[1] + ")? (r<sub>1</sub> = 0.0529 nm, v<sub>1</sub> = 2.188 · 10⁶ m/s for H)"),
            A.multi([{ l: "r in nm", a: P(rn) }, { l: "v in 10⁶ m/s", a: P(v) }]), "r<sub>n</sub> = r<sub>1</sub> n²/Z,  v<sub>n</sub> = v<sub>1</sub> Z/n.", ["r = " + f(rn) + " nm", "v = " + f(v) + " · 10⁶ m/s"], rel(me * v * 1e6 * rn * 1e-9, nn * hb, 3e-3));
    });

    // =============== 8.2 Quantentheorie ===============
    add(40, "quanten", "Unschärfe, Potenzialtopf, Tunneleffekt", "Uncertainty, particle in a box, tunnelling", function (r, d) {
        if (d === 1) {
            var dx = r.pick([0.1, 0.5, 1, 10]), dv = hb / (2 * me * dx * 1e-9) / 1000;
            return Q(t("Ein Elektron ist auf einen Bereich von " + f(dx) + " nm eingeschränkt. Wie groß ist die Mindestunschärfe seiner Geschwindigkeit?", "An electron is confined to a region of " + f(dx) + " nm. What is the minimum uncertainty of its velocity?"),
                P(dv, "km/s"), "Δx Δp ≥ ħ/2.", ["Δp = ħ/(2Δx) = " + f(hb / (2 * dx * 1e-9) * 1e25) + " · 10⁻²⁵ kg m/s", "Δv = Δp/m = " + f(dv) + " km/s"], rel(me * dv * 1000 * dx * 1e-9, hb / 2, 1e-12));
        }
        if (d === 2) {
            var L = r.pick([0.2, 0.5, 1, 2]), n1 = 1, n2 = r.int(2, 4), E1 = hP * hP / (8 * me * L * L * 1e-18) / qe, dE = E1 * (n2 * n2 - 1), la = HC / dE;
            return Q(t("Ein Elektron befindet sich in einem eindimensionalen Potenzialtopf mit unendlich hohen Wänden (L = " + f(L) + " nm). Wie groß sind die Grundzustandsenergie und die Wellenlänge des Photons beim Übergang n = " + n2 + " → 1?", "An electron is in a one-dimensional box with infinitely high walls (L = " + f(L) + " nm). Find the ground state energy and the wavelength of the photon for the transition n = " + n2 + " → 1."),
                A.multi([{ l: "E<sub>1</sub> in eV", a: P(E1) }, { l: "λ in nm", a: P(la) }]), "E<sub>n</sub> = n² h² / (8 m L²).", ["E<sub>1</sub> = " + f(E1) + " eV", "ΔE = " + f(dE) + " eV", "λ = h c / ΔE = " + f(la) + " nm"], rel(Math.pow(hP / (2 * L * 1e-9), 2) / (2 * me) / qe, E1, 1e-9));
        }
        var V0 = r.pick([5, 10, 20]), Ee = r.pick([1, 2, 4]), dd = r.pick([0.1, 0.2, 0.5]), kap = Math.sqrt(2 * me * (V0 - Ee) * qe) / hb, T = Math.exp(-2 * kap * dd * 1e-9) * 100;
        return Q(t("Ein Elektron (E = " + Ee + " eV) trifft auf eine Potenzialbarriere der Höhe " + V0 + " eV und Breite " + f(dd) + " nm. Wie groß ist näherungsweise die Durchtrittswahrscheinlichkeit T ≈ e<sup>−2κd</sup> in %?", "An electron (E = " + Ee + " eV) hits a potential barrier of height " + V0 + " eV and width " + f(dd) + " nm. What is approximately the transmission probability T ≈ e<sup>−2κd</sup> in %?"),
            A.num(T, { dec: 6, unit: "%", tol: Math.max(1e-6, T * 0.01) }), "κ = √(2 m (V<sub>0</sub> − E)) / ħ.", ["κ = " + f(kap * 1e-9) + " nm⁻¹", "T = e<sup>−" + f(2 * kap * dd * 1e-9) + "</sup> = " + f(T) + " %"], T > 0 && T < 100 && rel(Math.log(T / 100), -2 * kap * dd * 1e-9, 1e-9));
    });

    // =============== 8.3 Spin, Zeeman, NMR ===============
    add(41, "spin", "Zeeman-Effekt und Kernspinresonanz", "Zeeman effect and NMR", function (r, d) {
        var muB = 5.788e-5;
        if (d === 1) {
            var B = r.pick([0.5, 1, 1.5, 2, 3]), dE = muB * B * 1e6, fr = muB * B * qe / hP / 1e9;
            return Q(t("Beim normalen Zeeman-Effekt spaltet eine Linie im Feld B = " + f(B) + " T auf. Wie groß sind der Energieabstand benachbarter Niveaus und die zugehörige Frequenz? (μ<sub>B</sub> = 5,788 · 10⁻⁵ eV/T)", "In the normal Zeeman effect a line splits in a field B = " + f(B) + " T. Find the energy spacing of neighbouring levels and the corresponding frequency. (μ<sub>B</sub> = 5.788 · 10⁻⁵ eV/T)"),
                A.multi([{ l: "ΔE in µeV", a: P(dE) }, { l: "f in GHz", a: P(fr) }]), "ΔE = μ<sub>B</sub> B,  f = ΔE/h.", ["ΔE = " + f(dE) + " µeV", "f = " + f(fr) + " GHz"], rel(fr * 1e9 / B, 13.996e9, 2e-3));
        }
        if (d === 2) {
            var nuc = r.pick([["¹H", 42.58], ["¹³C", 10.71], ["¹⁹F", 40.05], ["³¹P", 17.24]]), B2 = r.pick([1.5, 3, 7, 9.4, 11.7]), fl = nuc[1] * B2;
            return Q(t("Mit welcher Frequenz muss man " + nuc[0] + "-Kerne (γ/2π = " + f(nuc[1]) + " MHz/T) in einem Magnetfeld von " + f(B2) + " T anregen?", "At which frequency must " + nuc[0] + " nuclei (γ/2π = " + f(nuc[1]) + " MHz/T) be excited in a magnetic field of " + f(B2) + " T?"),
                P(fl, "MHz"), t("Resonanz bei der Larmorfrequenz f = (γ/2π) B.", "Resonance at the Larmor frequency f = (γ/2π) B."), ["f = " + f(fl) + " MHz"], rel(fl / B2, nuc[1], 1e-12));
        }
        var la = r.pick([500, 589, 643.8, 656.3]), B3 = r.pick([0.5, 1, 2]), dl = la * la * muB * B3 / HC * 1000;
        return Q(t("Eine Spektrallinie (λ = " + f(la) + " nm) spaltet im Magnetfeld " + f(B3) + " T nach dem normalen Zeeman-Effekt auf. Um wie viel verschieben sich die äußeren Linien in der Wellenlänge?", "A spectral line (λ = " + f(la) + " nm) splits in a magnetic field of " + f(B3) + " T by the normal Zeeman effect. By how much are the outer lines shifted in wavelength?"),
            P(dl, "pm"), "Δλ = λ² ΔE / (h c).", ["ΔE = " + f(muB * B3 * 1e6) + " µeV", "Δλ = " + f(dl) + " pm"], rel(HC / la - HC / (la + dl / 1000), muB * B3, 2e-3));
    });

    // =============== 8.4 Periodensystem ===============
    var EL = [["H", 1], ["He", 2], ["Li", 3], ["Be", 4], ["B", 5], ["C", 6], ["N", 7], ["O", 8], ["F", 9], ["Ne", 10], ["Na", 11], ["Mg", 12], ["Al", 13], ["Si", 14], ["P", 15], ["S", 16], ["Cl", 17], ["Ar", 18], ["K", 19], ["Ca", 20]];
    function valence(Z) { var shells = [2, 8, 8, 2], s = Z, last = 0; for (var i = 0; i < shells.length && s > 0; i += 1) { last = Math.min(s, shells[i]); s -= last; } return last; }
    add(42, "periodensystem", "Schalen und Unterschalen", "Shells and subshells", function (r, d) {
        if (d === 1) {
            var nn = r.int(1, 6);
            return Q(t("Wie viele Elektronen passen höchstens in die Schale mit der Hauptquantenzahl n = " + nn + "?", "At most how many electrons fit into the shell with principal quantum number n = " + nn + "?"),
                A.num(2 * nn * nn), t("Zu jedem n gibt es l = 0 … n − 1, zu jedem l genau 2l + 1 Werte von m, dazu zwei Spinstellungen.", "For each n there are l = 0 … n − 1, for each l exactly 2l + 1 values of m, and two spin states."), ["Σ<sub>l=0</sub><sup>n−1</sup> 2(2l + 1) = 2n² = " + 2 * nn * nn], [0, 1, 2, 3, 4, 5].slice(0, nn).reduce(function (s, l) { return s + 2 * (2 * l + 1); }, 0) === 2 * nn * nn);
        }
        if (d === 2) {
            var L = r.int(0, 3), letter = "spdf"[L], nn2 = L + r.int(1, 3);
            return Q(t("Wie viele Elektronen passen höchstens in die Unterschale " + nn2 + letter + "?", "At most how many electrons fit into the subshell " + nn2 + letter + "?"),
                A.num(2 * (2 * L + 1)), t(letter + " heißt l = " + L + ". Die Zahl der Orbitale ist 2l + 1.", letter + " means l = " + L + ". The number of orbitals is 2l + 1."), ["2(2 · " + L + " + 1) = " + 2 * (2 * L + 1)], 2 * (2 * L + 1) <= 14);
        }
        var el = r.pick(EL), v = valence(el[1]);
        return Q(t("Wie viele Elektronen hat " + el[0] + " (Z = " + el[1] + ") in der äußersten Schale?", "How many electrons does " + el[0] + " (Z = " + el[1] + ") have in its outermost shell?"),
            A.num(v), t("Auffüllen in der Reihenfolge 1s, 2s, 2p, 3s, 3p, 4s.", "Fill in the order 1s, 2s, 2p, 3s, 3p, 4s."), [t("Valenzelektronen: ", "valence electrons: ") + v], v >= 1 && v <= 8);
    });

    // =============== 8.5 Röntgen ===============
    add(43, "roentgen", "Grenzwellenlänge, Moseley, Schwächung", "Cut-off wavelength, Moseley, attenuation", function (r, d) {
        if (d === 1) {
            var Ub = r.pick([20, 30, 50, 80, 100, 150]), lm = HC / (Ub * 1000) * 1000;
            return Q(t("Eine Röntgenröhre wird mit " + Ub + " kV betrieben. Wie groß ist die kürzeste Wellenlänge der Bremsstrahlung?", "An X-ray tube operates at " + Ub + " kV. What is the shortest wavelength of the bremsstrahlung?"),
                P(lm, "pm"), t("Ein Elektron gibt seine ganze Energie e U an ein Photon ab.", "An electron gives its whole energy e U to one photon."), ["λ<sub>min</sub> = h c / (e U) = " + f(lm) + " pm"], rel(hP * c0 / (lm * 1e-12) / qe, Ub * 1000, 2e-3));
        }
        if (d === 2) {
            var el = r.pick([["Cr", 24], ["Fe", 26], ["Cu", 29], ["Mo", 42], ["Ag", 47], ["W", 74]]), Ek = 10.2 * Math.pow(el[1] - 1, 2) / 1000, lk = HC / (Ek * 1000) * 1000;
            return Q(t("Schätze mit dem Moseley'schen Gesetz die Energie und Wellenlänge der K<sub>α</sub>-Linie von " + el[0] + " (Z = " + el[1] + ") ab.", "Use Moseley's law to estimate the energy and wavelength of the K<sub>α</sub> line of " + el[0] + " (Z = " + el[1] + ")."),
                A.multi([{ l: "E in keV", a: P(Ek) }, { l: "λ in pm", a: P(lk) }]), "E<sub>Kα</sub> ≈ 13,6 eV · (Z − 1)² · (1 − 1/4).", ["E = 10,2 eV · " + (el[1] - 1) + "² = " + f(Ek) + " keV", "λ = " + f(lk) + " pm"], rel(13.6 * 0.75 * Math.pow(el[1] - 1, 2) / 1000, Ek, 1e-9));
        }
        var dh = r.pick([0.1, 0.2, 0.5, 1, 2]), dd = r.pick([0.5, 1, 2, 3, 5]) * dh, Tr = Math.pow(0.5, dd / dh) * 100, mu = Math.LN2 / dh;
        return Q(t("Die Halbwertsdicke eines Absorbers für eine bestimmte Röntgenstrahlung ist " + f(dh) + " mm. Wie viel Prozent der Intensität kommen durch " + f(dd) + " mm?", "The half-value thickness of an absorber for a certain X-ray beam is " + f(dh) + " mm. What percentage of the intensity passes through " + f(dd) + " mm?"),
            P(Tr, "%"), "I = I<sub>0</sub> e<sup>−μd</sup>,  μ = ln 2 / d<sub>½</sub>.", ["μ = " + f(mu) + " mm⁻¹", "I/I<sub>0</sub> = " + f(Tr) + " %"], rel(Math.exp(-mu * dd) * 100, Tr, 1e-9));
    });

    // =============== 8.6 Molekülspektren ===============
    var MOL = [["H³⁵Cl", 1.008, 34.97, 0.1275, 516], ["¹²C¹⁶O", 12, 15.995, 0.1128, 1902], ["H₂", 1.008, 1.008, 0.0741, 575], ["N₂", 14.003, 14.003, 0.1098, 2294], ["HF", 1.008, 18.998, 0.0917, 966]];
    add(44, "molekuel", "Reduzierte Masse, Rotation, Schwingung", "Reduced mass, rotation, vibration", function (r, d) {
        var m = r.pick(MOL), mu = m[1] * m[2] / (m[1] + m[2]);
        if (d === 1) return Q(t("Wie groß ist die reduzierte Masse des Moleküls " + m[0] + " (Atommassen " + f(m[1]) + " u und " + f(m[2]) + " u)?", "What is the reduced mass of the molecule " + m[0] + " (atomic masses " + f(m[1]) + " u and " + f(m[2]) + " u)?"),
            P(mu, "u"), "μ = m<sub>1</sub> m<sub>2</sub> / (m<sub>1</sub> + m<sub>2</sub>).", ["μ = " + f(mu) + " u"], rel(1 / mu, 1 / m[1] + 1 / m[2], 1e-12));
        if (d === 2) {
            var J = r.int(0, 4), Th = mu * uKg * Math.pow(m[3] * 1e-9, 2), dE = hb * hb * (J + 1) / Th / qe * 1000;
            return Q(t("Das Molekül " + m[0] + " hat den Kernabstand " + f(m[3]) + " nm (μ = " + f(mu) + " u). Welche Energie hat das Photon beim Rotationsübergang J = " + J + " → " + (J + 1) + "?", "The molecule " + m[0] + " has a bond length of " + f(m[3]) + " nm (μ = " + f(mu) + " u). Which energy does the photon have for the rotational transition J = " + J + " → " + (J + 1) + "?"),
                P(dE, "meV"), "E<sub>J</sub> = ħ² J(J + 1) / (2Θ),  Θ = μ r².", ["Θ = " + f(Th * 1e47) + " · 10⁻⁴⁷ kg m²", "ΔE = ħ² (J + 1) / Θ = " + f(dE) + " meV"], rel((hb * hb * ((J + 1) * (J + 2) - J * (J + 1)) / (2 * Th)) / qe * 1000, dE, 1e-12));
        }
        var fr = 1 / (2 * PI) * Math.sqrt(m[4] / (mu * uKg)) / 1e12;
        return Q(t("Die Federkonstante der Bindung in " + m[0] + " ist " + m[4] + " N/m (μ = " + f(mu) + " u). Mit welcher Frequenz schwingt das Molekül?", "The force constant of the bond in " + m[0] + " is " + m[4] + " N/m (μ = " + f(mu) + " u). At which frequency does the molecule vibrate?"),
            P(fr, "THz"), "f = (1/2π) √(k/μ).", ["f = " + f(fr) + " THz", t("Photonenenergie: ", "photon energy: ") + f(hP * fr * 1e12 / qe * 1000) + " meV"], rel(Math.pow(2 * PI * fr * 1e12, 2) * mu * uKg, m[4], 1e-9));
    });

    // =============== 8.7 Atomkerne ===============
    var NUC = [["⁴He", 2, 4, 4.002603], ["⁷Li", 3, 7, 7.016004], ["¹²C", 6, 12, 12], ["¹⁶O", 8, 16, 15.994915], ["⁵⁶Fe", 26, 56, 55.934937], ["²³⁸U", 92, 238, 238.050788]];
    add(45, "kern", "Kernradius, Bindungsenergie, Kerndichte", "Nuclear radius, binding energy, nuclear density", function (r, d) {
        var nu = r.pick(NUC);
        if (d === 1) { var Rk = 1.2 * Math.pow(nu[2], 1 / 3);
            return Q(t("Wie groß ist der Radius des Kerns " + nu[0] + " (A = " + nu[2] + ") nach R = 1,2 fm · A<sup>1/3</sup>?", "What is the radius of the nucleus " + nu[0] + " (A = " + nu[2] + ") by R = 1.2 fm · A<sup>1/3</sup>?"), P(Rk, "fm"), t("Das Kernvolumen wächst proportional zur Nukleonenzahl.", "The nuclear volume grows proportionally to the nucleon number."), ["R = " + f(Rk) + " fm"], rel(Math.pow(Rk / 1.2, 3), nu[2], 1e-9)); }
        if (d === 2) { var dm = nu[1] * 1.007825 + (nu[2] - nu[1]) * 1.008665 - nu[3], EB = dm * 931.494, per = EB / nu[2];
            return Q(t("Die Atommasse von " + nu[0] + " ist " + f(nu[3]) + " u (m(¹H) = 1,007825 u, m<sub>n</sub> = 1,008665 u, 1 u ≙ 931,494 MeV). Wie groß sind die Bindungsenergie und die Bindungsenergie pro Nukleon?", "The atomic mass of " + nu[0] + " is " + f(nu[3]) + " u (m(¹H) = 1.007825 u, m<sub>n</sub> = 1.008665 u, 1 u ≙ 931.494 MeV). Find the binding energy and the binding energy per nucleon."),
                A.multi([{ l: "E<sub>B</sub> in MeV", a: P(EB) }, { l: "E<sub>B</sub>/A in MeV", a: P(per) }]), t("Massendefekt: Z m(¹H) + N m<sub>n</sub> − m<sub>Atom</sub> (die Elektronenmassen heben sich auf).", "Mass defect: Z m(¹H) + N m<sub>n</sub> − m<sub>atom</sub> (the electron masses cancel)."), ["Δm = " + f(dm) + " u", "E<sub>B</sub> = " + f(EB) + " MeV", "E<sub>B</sub>/A = " + f(per) + " MeV"], per > 5 && per < 9); }
        var Rk3 = 1.2e-15 * Math.pow(nu[2], 1 / 3), rho = nu[2] * uKg / (4 / 3 * PI * Math.pow(Rk3, 3)) / 1e17;
        return Q(t("Wie groß ist die Dichte des Kerns " + nu[0] + " (A = " + nu[2] + ", R = 1,2 fm · A<sup>1/3</sup>, Masse ≈ A · u) in 10¹⁷ kg/m³?", "What is the density of the nucleus " + nu[0] + " (A = " + nu[2] + ", R = 1.2 fm · A<sup>1/3</sup>, mass ≈ A · u) in 10¹⁷ kg/m³?"),
            P(rho), t("Masse durch Kugelvolumen. Das Ergebnis hängt nicht von A ab.", "Mass divided by sphere volume. The result does not depend on A."), ["ρ = A u / (4/3 π R³) = " + f(rho) + " · 10¹⁷ kg/m³"], rel(rho, uKg / (4 / 3 * PI * Math.pow(1.2e-15, 3)) / 1e17, 1e-9));
    });

    // =============== 8.8 Zerfall ===============
    var ISO = [["¹⁴C", 5730, "a"], ["⁶⁰Co", 5.27, "a"], ["¹³¹I", 8.02, "d"], ["¹³⁷Cs", 30.2, "a"], ["²²⁶Ra", 1600, "a"], ["⁹⁹ᵐTc", 6.01, "h"]];
    add(46, "zerfall", "Zerfallsgesetz, Altersbestimmung, Aktivität", "Decay law, dating, activity", function (r, d) {
        var iso = r.pick(ISO);
        if (d === 1) { var k = r.pick([0.5, 1, 2, 2.5, 3, 4]), tt = k * iso[1], rest = Math.pow(0.5, k) * 100;
            return Q(t("Wie viel Prozent einer Probe " + iso[0] + " (T<sub>½</sub> = " + f(iso[1]) + " " + iso[2] + ") sind nach " + f(tt) + " " + iso[2] + " noch vorhanden?", "What percentage of a sample of " + iso[0] + " (T<sub>½</sub> = " + f(iso[1]) + " " + iso[2] + ") is left after " + f(tt) + " " + iso[2] + "?"), P(rest, "%"), "N/N<sub>0</sub> = 2<sup>−t/T½</sup>.", ["t/T<sub>½</sub> = " + f(k), "N/N<sub>0</sub> = " + f(rest) + " %"], rel(Math.exp(-Math.LN2 / iso[1] * tt) * 100, rest, 1e-9)); }
        if (d === 2) { var ratio = r.pick([80, 60, 50, 35, 25, 10]), age = 5730 * Math.log(100 / ratio) / Math.LN2;
            return Q(t("Ein Knochenfund enthält nur noch " + ratio + " % des ¹⁴C-Anteils lebender Organismen (T<sub>½</sub> = 5730 a). Wie alt ist er?", "A bone find contains only " + ratio + " % of the ¹⁴C fraction of living organisms (T<sub>½</sub> = 5730 a). How old is it?"), P(age, "a"), "t = T<sub>½</sub> · ln(N<sub>0</sub>/N) / ln 2.", ["t = 5730 a · ln(100/" + ratio + ") / ln 2 = " + f(age) + " a"], rel(Math.pow(0.5, age / 5730) * 100, ratio, 1e-9)); }
        var iso3 = r.pick([["⁶⁰Co", 59.93, 5.27 * 3.156e7], ["¹³⁷Cs", 136.9, 30.2 * 3.156e7], ["²²⁶Ra", 226, 1600 * 3.156e7], ["¹³¹I", 130.9, 8.02 * 86400]]), m = r.pick([1, 2, 5, 10]), N = m * 1e-6 / iso3[1] * NA, Ak = Math.LN2 / iso3[2] * N / 1e9;
        return Q(t("Wie groß ist die Aktivität von " + m + " µg " + iso3[0] + " (M = " + f(iso3[1]) + " g/mol, T<sub>½</sub> = " + f(iso3[2] / (iso3[0] === "¹³¹I" ? 86400 : 3.156e7)) + (iso3[0] === "¹³¹I" ? " d" : " a") + ") in GBq?", "What is the activity of " + m + " µg of " + iso3[0] + " (M = " + f(iso3[1]) + " g/mol, T<sub>½</sub> = " + f(iso3[2] / (iso3[0] === "¹³¹I" ? 86400 : 3.156e7)) + (iso3[0] === "¹³¹I" ? " d" : " a") + ") in GBq?"),
            P(Ak, "GBq"), "A = λ N,  λ = ln 2 / T<sub>½</sub>,  N = m N<sub>A</sub> / M.", ["N = " + f(N / 1e15) + " · 10¹⁵", "λ = " + f(Math.LN2 / iso3[2] * 1e9) + " · 10⁻⁹ s⁻¹", "A = " + f(Ak) + " GBq"], rel(Ak * 1e9 * iso3[2], Math.LN2 * N, 1e-12));
    });

    // =============== 8.9 Elementarteilchen ===============
    var QK = { u: [2, 3], d: [-1, 3], s: [-1, 3], c: [2, 3] };
    add(47, "teilchen", "Quarks und Erhaltungssätze", "Quarks and conservation laws", function (r, d) {
        if (d === 1) {
            var had = r.pick([["uud", t("Proton", "proton")], ["udd", t("Neutron", "neutron")], ["uus", "Σ⁺"], ["dds", "Σ⁻"], ["uuu", "Δ⁺⁺"], ["uds", "Λ⁰"], ["sss", "Ω⁻"], ["udc", "Λ<sub>c</sub>⁺"]]), qn = had[0].split("").reduce(function (s, ch) { return s + QK[ch][0]; }, 0);
            return Q(t("Welche elektrische Ladung (in Einheiten von e) hat das Baryon " + had[1] + " mit dem Quarkinhalt " + had[0] + "? (u, c: +2/3, d, s: −1/3)", "Which electric charge (in units of e) does the baryon " + had[1] + " with quark content " + had[0] + " have? (u, c: +2/3, d, s: −1/3)"),
                A.num(qn / 3), t("Ladungen der drei Quarks addieren.", "Add the charges of the three quarks."), [had[0].split("").map(function (ch) { return (QK[ch][0] > 0 ? "+" : "−") + Math.abs(QK[ch][0]) + "/3"; }).join(" ") + " = " + qn / 3], qn % 3 === 0);
        }
        if (d === 2) {
            var OK = t("Die Reaktion ist erlaubt", "The reaction is allowed"), QV = t("Ladungserhaltung verletzt", "charge conservation violated"), BV = t("Baryonenzahl verletzt", "baryon number violated"), LV = t("Leptonenzahl verletzt", "lepton number violated");
            var R = r.pick([["n → p + e⁻ + ν̄<sub>e</sub>", OK], ["n → p + e⁻", LV], ["p → n + e⁺ + ν<sub>e</sub> " + t("(im Kern)", "(inside a nucleus)"), OK], ["p → e⁺ + γ", BV], ["π⁻ → μ⁻ + ν̄<sub>μ</sub>", OK], ["π⁺ → μ⁺ + ν̄<sub>μ</sub>", LV], ["p + p → p + p + n", QV], ["μ⁻ → e⁻ + ν̄<sub>e</sub> + ν<sub>μ</sub>", OK], ["n → p + π⁻ + π⁻", QV], ["p + p̄ → γ + γ", OK]]);
            return Q(t("Ist die Reaktion " + R[0] + " möglich?", "Is the reaction " + R[0] + " possible?"), A.choice(r, R[1], [OK, QV, BV, LV].filter(function (x) { return x !== R[1]; })),
                t("Prüfe Ladung Q, Baryonenzahl B (Quarks 1/3, Baryonen 1) und die Leptonenzahlen L<sub>e</sub>, L<sub>μ</sub> (Antiteilchen negativ).", "Check charge Q, baryon number B (quarks 1/3, baryons 1) and lepton numbers L<sub>e</sub>, L<sub>μ</sub> (antiparticles negative)."), [R[1]], true);
        }
        var pp = r.pick([[t("Elektron-Positron", "electron-positron"), 0.511], [t("Myon-Antimyon", "muon-antimuon"), 105.66], [t("Proton-Antiproton", "proton-antiproton"), 938.27], [t("Tau-Antitau", "tau-antitau"), 1776.9], [t("Neutron-Antineutron", "neutron-antineutron"), 939.57]]), Emin = 2 * pp[1];
        return Q(t("Welche Energie braucht ein Photon mindestens, um (in der Nähe eines schweren Kerns) ein " + pp[0] + "-Paar zu erzeugen? (Ruheenergie je Teilchen " + f(pp[1]) + " MeV)", "Which energy does a photon need at least to create (near a heavy nucleus) a " + pp[0] + " pair? (rest energy per particle " + f(pp[1]) + " MeV)"),
            P(Emin, "MeV"), t("Die Ruheenergie beider Teilchen muss aufgebracht werden, der Kern nimmt den Impuls auf.", "The rest energy of both particles must be supplied, the nucleus takes the momentum."), ["E<sub>min</sub> = 2 m c² = " + f(Emin) + " MeV"], Emin === 2 * pp[1]);
    });

    // =============== 8.10 Strahlenschutz ===============
    add(48, "strahlenschutz", "Dosis, Abstand, Abschirmung", "Dose, distance, shielding", function (r, d) {
        if (d === 1) {
            var Ej = r.pick([0.01, 0.05, 0.1, 0.5]), m = r.pick([1, 5, 10, 70]), wr = r.pick([[t("Gammastrahlung", "gamma rays"), 1], [t("Alphastrahlung", "alpha rays"), 20], [t("Betastrahlung", "beta rays"), 1]]), D = Ej / m * 1000, Hs = D * wr[1];
            return Q(t("Ein Gewebe der Masse " + m + " kg absorbiert " + f(Ej) + " J " + wr[0] + " (Wichtungsfaktor " + wr[1] + "). Wie groß sind Energiedosis und Äquivalentdosis?", "A tissue of mass " + m + " kg absorbs " + f(Ej) + " J of " + wr[0] + " (weighting factor " + wr[1] + "). Find the absorbed dose and the equivalent dose."),
                A.multi([{ l: "D in mGy", a: P(D) }, { l: "H in mSv", a: P(Hs) }]), "D = E/m,  H = w<sub>R</sub> D.", ["D = " + f(D) + " mGy", "H = " + f(Hs) + " mSv"], rel(Hs / wr[1] * m / 1000, Ej, 1e-12));
        }
        if (d === 2) {
            var D1 = r.pick([10, 20, 50, 100, 200]), r1 = r.pick([0.5, 1, 2]), r2 = r1 * r.pick([2, 3, 5, 10]), D2 = D1 * Math.pow(r1 / r2, 2);
            return Q(t("In " + f(r1) + " m Abstand von einer punktförmigen Quelle misst man " + D1 + " µSv/h. Wie groß ist die Dosisleistung in " + f(r2) + " m Abstand (ohne Absorption)?", "At " + f(r1) + " m from a point source one measures " + D1 + " µSv/h. What is the dose rate at " + f(r2) + " m (without absorption)?"),
                P(D2, "µSv/h"), t("Abstandsquadratgesetz.", "Inverse square law."), ["Ḋ<sub>2</sub> = Ḋ<sub>1</sub> (r<sub>1</sub>/r<sub>2</sub>)² = " + f(D2) + " µSv/h"], rel(D2 * r2 * r2, D1 * r1 * r1, 1e-12));
        }
        var D0 = r.pick([100, 200, 500, 1000]), Dz = r.pick([1, 2.5, 5, 10]), dh = r.pick([[t("Blei", "lead"), 1.2], [t("Beton", "concrete"), 6.2], [t("Eisen", "iron"), 2.5]]), dd = dh[1] * Math.log2(D0 / Dz);
        return Q(t("Eine Gammaquelle erzeugt hinter der Wand " + D0 + " µSv/h, zulässig sind " + f(Dz) + " µSv/h. Wie dick muss eine zusätzliche Abschirmung aus " + dh[0] + " (Halbwertsdicke " + f(dh[1]) + " cm) sein?", "A gamma source produces " + D0 + " µSv/h behind a wall, " + f(Dz) + " µSv/h are allowed. How thick must an additional " + dh[0] + " shield (half-value thickness " + f(dh[1]) + " cm) be?"),
            P(dd, "cm"), "d = d<sub>½</sub> · log<sub>2</sub>(Ḋ<sub>0</sub>/Ḋ).", ["Ḋ<sub>0</sub>/Ḋ = " + f(D0 / Dz), "d = " + f(dd) + " cm"], rel(D0 * Math.pow(0.5, dd / dh[1]), Dz, 1e-9));
    });

    // =============== 9.1 Kristallstruktur ===============
    var CR = [[t("Eisen (krz)", "iron (bcc)"), 0.2866, 2, 55.85], [t("Kupfer (kfz)", "copper (fcc)"), 0.3615, 4, 63.55], [t("Aluminium (kfz)", "aluminium (fcc)"), 0.4050, 4, 26.98], [t("Wolfram (krz)", "tungsten (bcc)"), 0.3165, 2, 183.84], [t("Nickel (kfz)", "nickel (fcc)"), 0.3524, 4, 58.69]];
    add(49, "kristall", "Dichte, Netzebenen, Atomdichte", "Density, lattice planes, atom density", function (r, d) {
        var c = r.pick(CR);
        if (d === 1) { var rho = c[2] * c[3] / (NA * Math.pow(c[1] * 1e-7, 3));
            return Q(t("Berechne die Dichte von " + c[0] + " aus der Gitterkonstanten a = " + f(c[1]) + " nm und der Molmasse " + f(c[3]) + " g/mol.", "Compute the density of " + c[0] + " from the lattice constant a = " + f(c[1]) + " nm and the molar mass " + f(c[3]) + " g/mol."),
                P(rho, "g/cm³"), t("Eine kubische Elementarzelle enthält " + c[2] + " Atome.", "A cubic unit cell contains " + c[2] + " atoms."), ["ρ = n M / (N<sub>A</sub> a³) = " + f(rho) + " g/cm³"], rho > 2 && rho < 20); }
        if (d === 2) { var hkl = r.pick([[1, 1, 0], [2, 0, 0], [1, 1, 1], [2, 2, 0], [3, 1, 0]]), dd = c[1] / Math.sqrt(hkl[0] * hkl[0] + hkl[1] * hkl[1] + hkl[2] * hkl[2]), la = 0.1541, th = Math.asin(la / (2 * dd)) * 180 / PI;
            return Q(t("Wie groß ist der Abstand der (" + hkl.join("") + ")-Netzebenen in " + c[0] + " (a = " + f(c[1]) + " nm), und unter welchem Glanzwinkel reflektiert er Cu-K<sub>α</sub>-Strahlung (λ = 0,1541 nm) in 1. Ordnung?", "What is the spacing of the (" + hkl.join("") + ") lattice planes in " + c[0] + " (a = " + f(c[1]) + " nm), and at which glancing angle do they reflect Cu K<sub>α</sub> radiation (λ = 0.1541 nm) in first order?"),
                A.multi([{ l: "d in nm", a: P(dd) }, { l: "θ in °", a: A.num(th, { dec: 2, unit: "°", tol: 0.05 }) }]), "d = a / √(h² + k² + l²),  2 d sin θ = λ.", ["d = " + f(dd) + " nm", "θ = " + f(th) + "°"], rel(2 * dd * Math.sin(th * PI / 180), la, 1e-12)); }
        var nd = c[2] / Math.pow(c[1] * 1e-7, 3) / 1e22;
        return Q(t("Wie viele Atome pro cm³ enthält " + c[0] + " (a = " + f(c[1]) + " nm)? (Ergebnis in 10²² cm⁻³)", "How many atoms per cm³ does " + c[0] + " (a = " + f(c[1]) + " nm) contain? (result in 10²² cm⁻³)"),
            P(nd), "n<sub>V</sub> = n / a³.", ["a³ = " + f(Math.pow(c[1], 3)) + " nm³", "n<sub>V</sub> = " + f(nd) + " · 10²² cm⁻³"], rel(nd * 1e22 * c[3] / NA, c[2] * c[3] / (NA * Math.pow(c[1] * 1e-7, 3)), 1e-9));
    });

    // =============== 9.2 Elektronen im Festkörper ===============
    add(50, "halbleiter", "Fermi-Verteilung und Halbleiter", "Fermi distribution and semiconductors", function (r, d) {
        if (d === 1) {
            var dE = r.pick([-0.1, -0.05, 0.025, 0.05, 0.1, 0.2]), T = r.pick([77, 300, 600]), fF = 1 / (Math.exp(dE * qe / (kB * T)) + 1) * 100;
            return Q(t("Mit welcher Wahrscheinlichkeit ist ein Zustand " + f(Math.abs(dE)) + " eV " + (dE > 0 ? "oberhalb" : "unterhalb") + " der Fermi-Energie bei " + T + " K besetzt?", "With which probability is a state " + f(Math.abs(dE)) + " eV " + (dE > 0 ? "above" : "below") + " the Fermi energy occupied at " + T + " K?"),
                A.num(fF, { dec: 4, unit: "%", tol: Math.max(1e-4, fF * 0.005) }), "f(E) = 1 / (e<sup>(E − E<sub>F</sub>)/kT</sup> + 1).", ["kT = " + f(kB * T / qe * 1000) + " meV", "f = " + f(fF) + " %"], rel(fF / 100 + 1 / (Math.exp(-dE * qe / (kB * T)) + 1), 1, 1e-12));
        }
        if (d === 2) {
            var nD = r.pick([1e14, 1e15, 1e16, 1e17]), mu = nD <= 1e15 ? 1350 : nD === 1e16 ? 1200 : 800, rho = 1 / (qe * nD * mu);
            return Q(t("Silicium ist mit N<sub>D</sub> = " + f(nD / Math.pow(10, Math.floor(Math.log10(nD)))) + " · 10<sup>" + Math.floor(Math.log10(nD)) + "</sup> cm⁻³ Donatoren dotiert, die Elektronenbeweglichkeit ist " + mu + " cm²/(V s). Wie groß ist der spezifische Widerstand?", "Silicon is doped with N<sub>D</sub> = 10<sup>" + Math.floor(Math.log10(nD)) + "</sup> cm⁻³ donors, the electron mobility is " + mu + " cm²/(V s). What is the resistivity?"),
                P(rho, "Ω cm"), t("Alle Donatoren sind ionisiert: n ≈ N<sub>D</sub>, σ = e n μ<sub>n</sub>.", "All donors are ionised: n ≈ N<sub>D</sub>, σ = e n μ<sub>n</sub>."), ["σ = " + f(qe * nD * mu) + " (Ω cm)⁻¹", "ρ = " + f(rho) + " Ω cm"], rel(rho * qe * nD * mu, 1, 1e-12));
        }
        var sc = r.pick([["Si", 1.12], ["Ge", 0.66], ["GaAs", 1.42]]), T1 = 300, T2 = r.pick([350, 400, 450, 500]), ratio = Math.pow(T2 / T1, 1.5) * Math.exp(-sc[1] * qe / (2 * kB) * (1 / T2 - 1 / T1));
        return Q(t("Um welchen Faktor steigt die Eigenleitungsdichte n<sub>i</sub> von " + sc[0] + " (E<sub>g</sub> = " + f(sc[1]) + " eV) zwischen 300 K und " + T2 + " K?", "By which factor does the intrinsic carrier density n<sub>i</sub> of " + sc[0] + " (E<sub>g</sub> = " + f(sc[1]) + " eV) rise between 300 K and " + T2 + " K?"),
            P(ratio), "n<sub>i</sub> ∝ T<sup>3/2</sup> e<sup>−E<sub>g</sub>/(2kT)</sup>.", ["n<sub>i</sub>(T<sub>2</sub>)/n<sub>i</sub>(T<sub>1</sub>) = " + f(ratio)], ratio > 1 && rel(Math.log(ratio), 1.5 * Math.log(T2 / T1) - sc[1] * qe / (2 * kB) * (1 / T2 - 1 / T1), 1e-12));
    });

    // =============== 9.3 thermische Eigenschaften ===============
    add(51, "fkthermo", "Dulong-Petit, Debye, Wiedemann-Franz", "Dulong-Petit, Debye, Wiedemann-Franz", function (r, d) {
        if (d === 1) {
            var el = r.pick([[t("Kupfer", "copper"), 63.55], [t("Aluminium", "aluminium"), 26.98], [t("Blei", "lead"), 207.2], [t("Eisen", "iron"), 55.85], [t("Silber", "silver"), 107.87]]), c = 3 * R / (el[1] / 1000);
            return Q(t("Schätze die spezifische Wärmekapazität von " + el[0] + " (M = " + f(el[1]) + " g/mol) bei Raumtemperatur nach Dulong-Petit.", "Estimate the specific heat capacity of " + el[0] + " (M = " + f(el[1]) + " g/mol) at room temperature by Dulong-Petit."),
                P(c, "J/(kg K)"), "C<sub>m</sub> ≈ 3R,  c = 3R / M.", ["C<sub>m</sub> = 24,9 J/(mol K)", "c = " + f(c) + " J/(kg K)"], rel(c * el[1] / 1000, 3 * R, 1e-12));
        }
        if (d === 2) {
            var sol = r.pick([[t("Diamant", "diamond"), 2230], [t("Kupfer", "copper"), 343], [t("Silicium", "silicon"), 645], [t("Aluminium", "aluminium"), 428]]), T = r.pick([4, 10, 15, 20]), Cm = 12 * Math.pow(PI, 4) / 5 * R * Math.pow(T / sol[1], 3) * 1000;
            return Q(t("Wie groß ist die molare Wärmekapazität von " + sol[0] + " (Θ<sub>D</sub> = " + sol[1] + " K) bei " + T + " K nach dem Debye'schen T³-Gesetz?", "What is the molar heat capacity of " + sol[0] + " (Θ<sub>D</sub> = " + sol[1] + " K) at " + T + " K by Debye's T³ law?"),
                P(Cm, "mJ/(mol K)"), "C<sub>m</sub> = (12π⁴/5) R (T/Θ<sub>D</sub>)³.", ["C<sub>m</sub> = " + f(Cm) + " mJ/(mol K)"], rel(Cm / 1000 / Math.pow(T, 3), 12 * Math.pow(PI, 4) / 5 * R / Math.pow(sol[1], 3), 1e-12));
        }
        var met = r.pick([[t("Silber", "silver"), 1.6e-8], [t("Kupfer", "copper"), 1.7e-8], [t("Aluminium", "aluminium"), 2.7e-8], [t("Eisen", "iron"), 9.7e-8]]), T3 = r.pick([273, 293, 300, 373]), lam = 2.44e-8 * T3 / met[1];
        return Q(t("Der spezifische Widerstand von " + met[0] + " ist " + f(met[1] * 1e8) + " · 10⁻⁸ Ω m bei " + T3 + " K. Schätze mit Wiedemann-Franz (L = 2,44 · 10⁻⁸ W Ω/K²) die Wärmeleitfähigkeit.", "The resistivity of " + met[0] + " is " + f(met[1] * 1e8) + " · 10⁻⁸ Ω m at " + T3 + " K. Estimate the thermal conductivity with Wiedemann-Franz (L = 2.44 · 10⁻⁸ W Ω/K²)."),
            P(lam, "W/(m K)"), "λ = L T σ = L T / ρ.", ["λ = " + f(lam) + " W/(m K)"], rel(lam * met[1], 2.44e-8 * T3, 1e-12));
    });

    // =============== 9.4 Optoelektronik ===============
    add(52, "opto", "LED, Fotodiode, Laserdiode", "LED, photodiode, laser diode", function (r, d) {
        if (d === 1) {
            var sc = r.pick([["GaAs", 1.42], ["GaP", 2.26], ["InSb", 0.18], ["GaN", 3.4], ["InP", 1.34], ["Si", 1.12]]), la = HC / sc[1];
            return Q(t("Bis zu welcher Wellenlänge absorbiert " + sc[0] + " (E<sub>g</sub> = " + f(sc[1]) + " eV)? Ab dieser Wellenlänge ist der Halbleiter durchsichtig.", "Up to which wavelength does " + sc[0] + " (E<sub>g</sub> = " + f(sc[1]) + " eV) absorb? Beyond this wavelength the semiconductor is transparent."),
                P(la, "nm"), "λ<sub>g</sub> = h c / E<sub>g</sub> ≈ 1240 nm·eV / E<sub>g</sub>.", ["λ<sub>g</sub> = " + f(la) + " nm"], rel(hP * c0 / (la * 1e-9) / qe, sc[1], 2e-3));
        }
        if (d === 2) {
            var la2 = r.pick([850, 1300, 1550, 650]), S = r.pick([0.4, 0.5, 0.6, 0.8]), Pw = r.pick([10, 50, 100]), eta = S * HC / la2 * 100, I = S * Pw;
            if (eta > 100) { S = 0.4; eta = S * HC / la2 * 100; I = S * Pw; }
            return Q(t("Eine Fotodiode hat bei " + la2 + " nm die Empfindlichkeit " + f(S) + " A/W. Wie groß sind die Quantenausbeute und der Fotostrom bei " + Pw + " µW Strahlungsleistung?", "A photodiode has a responsivity of " + f(S) + " A/W at " + la2 + " nm. Find the quantum efficiency and the photocurrent at " + Pw + " µW of radiant power."),
                A.multi([{ l: "η in %", a: P(eta) }, { l: "I in µA", a: P(I) }]), "η = S h c / (e λ),  I = S Φ.", ["η = " + f(eta) + " %", "I = " + f(I) + " µA"], rel(eta / 100 * qe * la2 * 1e-9 / (hP * c0), S, 2e-3));
        }
        var la3 = r.pick([0.85, 1.3, 1.55]), nr = r.pick([3.3, 3.5, 3.6]), L = r.pick([200, 300, 500]), dl = la3 * la3 / (2 * nr * L) * 1000;
        return Q(t("Eine Laserdiode (λ = " + f(la3) + " µm) hat einen Resonator der Länge " + L + " µm mit der Brechzahl " + f(nr) + ". Wie groß ist der Abstand benachbarter longitudinaler Moden (Dispersion vernachlässigt)?", "A laser diode (λ = " + f(la3) + " µm) has a cavity of length " + L + " µm with refractive index " + f(nr) + ". What is the spacing of neighbouring longitudinal modes (dispersion neglected)?"),
            P(dl, "nm"), "Δλ = λ² / (2 n L).", ["Δλ = " + f(dl) + " nm"], rel(Math.pow(la3 * 1e-6, 2) / (2 * nr * L * 1e-6) * 1e9, dl, 1e-9));
    });

    // =============== 10.2 Lorentz-Transformation ===============
    var CK = 0.2998; // km/µs
    add(53, "lorentz", "Lorentzfaktor und Lorentz-Transformation", "Lorentz factor and transformation", function (r, d) {
        var be = r.pick([0.5, 0.6, 0.8, 0.9, 0.95, 0.99]), gam = 1 / Math.sqrt(1 - be * be);
        if (d === 1) return Q(t("Wie groß ist der Lorentzfaktor γ für v = " + f(be) + " c?", "What is the Lorentz factor γ for v = " + f(be) + " c?"), P(gam), "γ = 1/√(1 − β²).", ["γ = 1/√(1 − " + f(be * be) + ") = " + f(gam)], rel(gam * gam * (1 - be * be), 1, 1e-12));
        if (d === 2) {
            var x = r.int(1, 20) * 10, tt = r.int(0, 50), xp = gam * (x - be * CK * tt), tp = gam * (tt - be * x / CK);
            return Q(t("Ein Ereignis findet im System S bei x = " + x + " km und t = " + tt + " µs statt. S' bewegt sich mit v = " + f(be) + " c in x-Richtung (beide Ursprünge fallen bei t = 0 zusammen, c = 0,2998 km/µs). Bestimme x' und t'.", "An event happens in frame S at x = " + x + " km and t = " + tt + " µs. S' moves at v = " + f(be) + " c along x (both origins coincide at t = 0, c = 0.2998 km/µs). Find x' and t'."),
                A.multi([{ l: "x' in km", a: P(xp) }, { l: "t' in µs", a: P(tp) }]), "x' = γ (x − v t),  t' = γ (t − v x / c²).", ["γ = " + f(gam), "x' = " + f(xp) + " km", "t' = " + f(tp) + " µs"], rel(Math.pow(CK * tp, 2) - xp * xp, Math.pow(CK * tt, 2) - x * x, 1e-9));
        }
        var L = r.pick([100, 500, 1000, 2000]), dtp = gam * be * L / CK;
        return Q(t("Zwei Blitze schlagen im Bahnhofssystem gleichzeitig an zwei " + L + " km voneinander entfernten Orten ein. Welcher Zeitabstand (Betrag) liegt zwischen ihnen in einem Zug, der mit " + f(be) + " c entlang dieser Strecke fährt? (c = 0,2998 km/µs)", "Two lightning strikes hit two places " + L + " km apart simultaneously in the station frame. Which time interval (magnitude) separates them for a train moving at " + f(be) + " c along this line? (c = 0.2998 km/µs)"),
            P(dtp, "µs"), "Δt' = γ (Δt − v Δx / c²) mit Δt = 0.", ["Δt' = γ v L / c² = " + f(dtp) + " µs"], rel(dtp, gam * be * L / CK, 1e-12));
    });

    // =============== 10.3 Effekte ===============
    add(54, "dilatation", "Zeitdilatation, Längenkontraktion, Geschwindigkeitsaddition", "Time dilation, length contraction, velocity addition", function (r, d) {
        if (d === 1) {
            var be = r.pick([0.9, 0.95, 0.98, 0.99, 0.995]), gam = 1 / Math.sqrt(1 - be * be), tau = 2.2, tl = gam * tau, s = tl * be * CK;
            return Q(t("Myonen (mittlere Lebensdauer in Ruhe 2,2 µs) fliegen mit " + f(be) + " c. Wie groß ist ihre Lebensdauer im Laborsystem, und welche Strecke legen sie in dieser Zeit im Mittel zurück?", "Muons (mean lifetime at rest 2.2 µs) fly at " + f(be) + " c. What is their lifetime in the lab frame, and how far do they travel on average in this time?"),
                A.multi([{ l: "τ' in µs", a: P(tl) }, { l: "s in km", a: P(s) }]), "τ' = γ τ<sub>0</sub>.", ["γ = " + f(gam), "τ' = " + f(tl) + " µs", "s = v τ' = " + f(s) + " km"], rel(s / gam, be * CK * tau, 1e-12));
        }
        if (d === 2) {
            var k = r.pick([0.9, 0.8, 0.5, 0.6, 0.99]), be2 = Math.sqrt(1 - k * k);
            return Q(t("Mit welcher Geschwindigkeit (in Einheiten von c) muss sich ein Körper bewegen, damit er in Bewegungsrichtung auf " + f(k * 100) + " % seiner Ruhelänge verkürzt erscheint?", "At which speed (in units of c) must a body move so that it appears shortened to " + f(k * 100) + " % of its rest length along the motion?"),
                A.num(be2, { dec: 4, tol: 0.0006 }), "l = l<sub>0</sub> √(1 − β²).", ["β = √(1 − " + f(k) + "²) = " + f(be2)], rel(Math.sqrt(1 - be2 * be2), k, 1e-12));
        }
        var u1 = r.pick([0.5, 0.6, 0.8, 0.9]), v = r.pick([0.5, 0.7, 0.8, 0.9]), w = (u1 + v) / (1 + u1 * v);
        return Q(t("Ein Raumschiff fliegt mit " + f(v) + " c an der Erde vorbei und schießt in Flugrichtung eine Sonde mit " + f(u1) + " c (relativ zum Schiff) ab. Wie schnell ist die Sonde relativ zur Erde?", "A spaceship passes the Earth at " + f(v) + " c and launches a probe forward at " + f(u1) + " c (relative to the ship). How fast is the probe relative to the Earth?"),
            A.num(w, { dec: 4, unit: "c", tol: 0.0006 }), "u = (u' + v) / (1 + u' v / c²).", ["u = (" + f(u1) + " + " + f(v) + ") / (1 + " + f(u1 * v) + ") = " + f(w) + " c"], w < 1 && rel((w - v) / (1 - w * v), u1, 1e-9));
    });

    // =============== 10.4 relativistische Dynamik ===============
    add(55, "reldyn", "Energie, Masse und Impuls", "Energy, mass and momentum", function (r, d) {
        var E0 = 0.511;
        if (d === 1) {
            var be = r.pick([0.5, 0.8, 0.9, 0.99]), gam = 1 / Math.sqrt(1 - be * be), Ek = (gam - 1) * E0, Ekl = 0.5 * E0 * be * be;
            return Q(t("Wie groß ist die kinetische Energie eines Elektrons (E<sub>0</sub> = 0,511 MeV) mit v = " + f(be) + " c, und wie groß wäre sie nach der klassischen Formel?", "What is the kinetic energy of an electron (E<sub>0</sub> = 0.511 MeV) at v = " + f(be) + " c, and what would the classical formula give?"),
                A.multi([{ l: t("relativistisch in MeV", "relativistic in MeV"), a: P(Ek) }, { l: t("klassisch in MeV", "classical in MeV"), a: P(Ekl) }]), "E<sub>kin</sub> = (γ − 1) m<sub>0</sub> c².", ["γ = " + f(gam), "E<sub>kin</sub> = " + f(Ek) + " MeV", "½ m v² = " + f(Ekl) + " MeV"], Ek > Ekl);
        }
        if (d === 2) {
            var Pw = r.pick([500, 1000, 1400, 3000]), years = r.pick([1, 2, 5]), dm = Pw * 1e6 * years * 3.156e7 / (c0 * c0) * 1000;
            return Q(t("Ein Kraftwerk gibt " + years + " Jahr(e) lang ohne Unterbrechung " + Pw + " MW ab. Um wie viel nimmt die Masse des Brennstoffs dadurch mindestens ab?", "A power plant delivers " + Pw + " MW without interruption for " + years + " year(s). By how much does the mass of the fuel decrease at least?"),
                P(dm, "g"), "Δm = ΔE / c² = P t / c².", ["E = " + f(Pw * 1e6 * years * 3.156e7 / 1e15) + " · 10¹⁵ J", "Δm = " + f(dm) + " g"], rel(dm / 1000 * c0 * c0, Pw * 1e6 * years * 3.156e7, 1e-12));
        }
        var part = r.pick([[t("Elektron", "electron"), 0.511], [t("Proton", "proton"), 938.3], [t("Myon", "muon"), 105.7]]), Ek3 = r.pick([1, 5, 10, 100, 1000]), Et = Ek3 + part[1], pc = Math.sqrt(Et * Et - part[1] * part[1]), be3 = pc / Et;
        return Q(t("Ein " + part[0] + " (E<sub>0</sub> = " + f(part[1]) + " MeV) hat die kinetische Energie " + Ek3 + " MeV. Wie groß sind sein Impuls (in MeV/c) und seine Geschwindigkeit (in c, auf 6 Stellen)?", "A " + part[0] + " (E<sub>0</sub> = " + f(part[1]) + " MeV) has a kinetic energy of " + Ek3 + " MeV. Find its momentum (in MeV/c) and its speed (in c, to 6 digits)."),
            A.multi([{ l: "p in MeV/c", a: P(pc) }, { l: "β", a: A.num(be3, { dec: 6, tol: Math.max(2e-6, (1 - be3) * 0.01) }) }]), "E = E<sub>kin</sub> + E<sub>0</sub>,  (pc)² = E² − E<sub>0</sub>²,  β = pc/E.", ["E = " + f(Et) + " MeV", "pc = " + f(pc) + " MeV", "β = " + n6(be3)], rel(Math.hypot(pc, part[1]), Et, 1e-12) && rel(be3 * Et, pc, 1e-12));
    });
    function n6(x) { return E.H.n(x, 6); }

    // =============== 10.5 Doppler des Lichts ===============
    add(56, "reldoppler", "Relativistischer Doppler-Effekt und Radar", "Relativistic Doppler effect and radar", function (r, d) {
        if (d === 1) {
            var be = r.pick([0.1, 0.2, 0.3, 0.5, 0.6]), la0 = r.pick([486.1, 656.3, 500]), fac = Math.sqrt((1 + be) / (1 - be)), la = la0 * fac;
            return Q(t("Eine Galaxie entfernt sich mit " + f(be) + " c. Bei welcher Wellenlänge beobachtet man eine Linie, die im Labor bei " + f(la0) + " nm liegt?", "A galaxy recedes at " + f(be) + " c. At which wavelength is a line observed that lies at " + f(la0) + " nm in the lab?"),
                P(la, "nm"), "λ<sub>B</sub> = λ<sub>S</sub> √((1 + β)/(1 − β)).", ["√((1 + β)/(1 − β)) = " + f(fac), "λ<sub>B</sub> = " + f(la) + " nm"], rel(la * la / (la0 * la0), (1 + be) / (1 - be), 1e-12));
        }
        if (d === 2) {
            var v = r.pick([50, 80, 100, 130, 160]), fr = r.pick([9.4, 24.1, 34.3]), df = 2 * (v / 3.6) * fr * 1e9 / c0;
            return Q(t("Ein Radargerät (f = " + f(fr) + " GHz) misst die Frequenzverschiebung des an einem Auto reflektierten Strahls. Wie groß ist sie, wenn das Auto mit " + v + " km/h auf das Gerät zufährt?", "A radar unit (f = " + f(fr) + " GHz) measures the frequency shift of the beam reflected from a car. How large is it if the car approaches at " + v + " km/h?"),
                P(df, "Hz"), t("Das Auto empfängt eine verschobene Frequenz und sendet sie verschoben zurück: Δf ≈ 2 v f / c.", "The car receives a shifted frequency and reflects it shifted again: Δf ≈ 2 v f / c."), ["v = " + f(v / 3.6) + " m/s", "Δf = " + f(df) + " Hz"], rel(fr * 1e9 * ((1 + v / 3.6 / c0) / (1 - v / 3.6 / c0) - 1), df, 1e-6));
        }
        var z = r.pick([0.1, 0.5, 1, 2, 3]), q = (1 + z) * (1 + z), be3 = (q - 1) / (q + 1);
        return Q(t("Ein Quasar zeigt die Rotverschiebung z = Δλ/λ = " + f(z) + ". Mit welcher Geschwindigkeit (in c) entfernt er sich nach dem relativistischen Doppler-Effekt?", "A quasar shows the redshift z = Δλ/λ = " + f(z) + ". At which speed (in c) does it recede according to the relativistic Doppler effect?"),
            A.num(be3, { dec: 4, unit: "c", tol: 0.0006 }), "1 + z = √((1 + β)/(1 − β)).", ["(1 + z)² = " + f(q), "β = ((1 + z)² − 1)/((1 + z)² + 1) = " + f(be3)], rel(Math.sqrt((1 + be3) / (1 - be3)), 1 + z, 1e-12));
    });
})(typeof window !== "undefined" ? window : globalThis);
