/* SOR Aufgaben für Chemie (K-CH-*). Format siehe exercise-engine.js */
(function (root) {
    "use strict";
    var E = root.SOR_EX || require("../exercise-engine.js");
    var A = E.A, M = E.M, n = E.H.n, t = E.tr;
    function Q(q, a, hint, steps, ok) { return { q: q, a: a, hint: hint, steps: steps, ok: !!ok }; }
    var nm = function (v, dec, unit) { return A.num(v, { dec: dec, unit: unit || "", tol: Math.max(Math.abs(v) * 0.004, 0.6 * Math.pow(10, -dec)) }); };
    var f = function (s) { return String(s).replace(/(\d+)/g, "<sub>$1</sub>"); };   // Summenformel mit tiefgestellten Zahlen
    var NA = 6.022e23;
    // Atommassen in g/mol
    var AT = { H: 1.008, C: 12.011, N: 14.007, O: 15.999, Na: 22.990, S: 32.06, Cl: 35.45, Ca: 40.078, Fe: 55.845 };
    function parse(formula) {
        var out = {}, re = /([A-Z][a-z]?)(\d*)/g, m;
        while ((m = re.exec(formula))) { if (!m[1]) continue; out[m[1]] = (out[m[1]] || 0) + (m[2] ? parseInt(m[2], 10) : 1); }
        return out;
    }
    function molar(formula) { var p = parse(formula), s = 0; Object.keys(p).forEach(function (el) { s += AT[el] * p[el]; }); return s; }
    var SUB = [["H2O", t("Wasser", "water")], ["CO2", t("Kohlenstoffdioxid", "carbon dioxide")], ["NaCl", t("Kochsalz", "table salt")], ["CH4", t("Methan", "methane")],
        ["C6H12O6", t("Glucose", "glucose")], ["NH3", t("Ammoniak", "ammonia")], ["H2SO4", t("Schwefelsäure", "sulfuric acid")], ["CaCO3", t("Kalk", "limestone")], ["C3H8", t("Propan", "propane")]];

    // ================= Stoffmenge =================
    E.add({ id: "k-ch-stoffmenge", topic: "K-CH-1", title: t("Stoffmenge und molare Masse", "Amount of substance and molar mass"), gen: function (r, d) {
        var sb = r.pick(SUB), Mm = M.round(molar(sb[0]), 2);
        if (d === 1) {
            var m = r.int(2, 60) * 5, nn = m / Mm;
            return Q(t("Du hast " + m + " g " + sb[1] + " (" + f(sb[0]) + ", M = " + n(Mm, 2) + " g/mol). Wie groß ist die Stoffmenge in mol (auf 0,001)?", "You have " + m + " g of " + sb[1] + " (" + f(sb[0]) + ", M = " + n(Mm, 2) + " g/mol). What is the amount of substance in mol (to 0.001)?"),
                nm(nn, 3, "mol"), t("n = m / M.", "n = m / M."), ["n = " + m + " g / " + n(Mm, 2) + " g/mol = " + n(nn, 3) + " mol"], M.near(nn * Mm, m, 1e-9));
        }
        if (d === 2) {
            var p = parse(sb[0]), parts = Object.keys(p).map(function (el) { return (p[el] > 1 ? p[el] + " · " : "") + n(AT[el], 3); });
            var given = Object.keys(p).map(function (el) { return el + ": " + n(AT[el], 3); }).join(", ");
            var Mx = molar(sb[0]);
            return Q(t("Berechne die molare Masse von " + sb[1] + " (" + f(sb[0]) + ") in g/mol (auf 0,01). Atommassen in g/mol: " + given + ".", "Work out the molar mass of " + sb[1] + " (" + f(sb[0]) + ") in g/mol (to 0.01). Atomic masses in g/mol: " + given + "."),
                nm(Mx, 2, "g/mol"), t("Zähle die Atome jedes Elements und addiere ihre Massen.", "Count the atoms of each element and add up their masses."), ["M = " + parts.join(" + ") + " = " + n(Mx, 2) + " g/mol"],
                M.near(Object.keys(p).reduce(function (s, el) { var k = 0; for (var i = 0; i < p[el]; i += 1) k += AT[el]; return s + k; }, 0), Mx, 1e-9));
        }
        var mw = r.int(1, 40) * 5, Mw = 18.02, N = mw / Mw * NA / 1e23;
        return Q(t("Wie viele Wassermoleküle sind in " + mw + " g Wasser (M = 18,02 g/mol)? Gib das Ergebnis als Vielfaches von 10²³ an (auf 0,01).", "How many water molecules are in " + mw + " g of water (M = 18.02 g/mol)? Give the result as a multiple of 10²³ (to 0.01)."),
            nm(N, 2, "· 10²³"), t("Erst n = m / M, dann N = n · N<sub>A</sub> mit N<sub>A</sub> = 6,022 · 10²³ mol⁻¹.", "First n = m / M, then N = n · N<sub>A</sub> with N<sub>A</sub> = 6.022 · 10²³ mol⁻¹."),
            ["n = " + mw + " / 18" + t(",", ".") + "02 = " + n(mw / Mw, 4) + " mol", "N = " + n(mw / Mw, 4) + " · 6" + t(",", ".") + "022 · 10²³ = " + n(N, 2) + " · 10²³"], M.near(N * 1e23 / NA * Mw, mw, 1e-9));
    } });

    // ================= Reaktionsgleichungen ausgleichen =================
    function atoms(side) { var o = {}; side.forEach(function (x) { var p = parse(x[1]); Object.keys(p).forEach(function (el) { o[el] = (o[el] || 0) + x[0] * p[el]; }); }); return o; }
    function balanced(left, right) { var a = atoms(left), b = atoms(right); return Object.keys(a).concat(Object.keys(b)).every(function (el) { return a[el] === b[el]; }); }
    E.add({ id: "k-ch-ausgleichen", topic: "K-CH-2", title: t("Reaktionsgleichungen ausgleichen", "Balancing chemical equations"), gen: function (r, d) {
        var fuel, k, o2, co2, h2o, name;
        if (d < 3) {
            var c = d === 1 ? r.int(1, 4) : r.int(5, 8), h = 2 * c + 2;
            fuel = "C" + (c > 1 ? c : "") + "H" + h; name = [t("Methan", "methane"), t("Ethan", "ethane"), t("Propan", "propane"), t("Butan", "butane"), t("Pentan", "pentane"), t("Hexan", "hexane"), t("Heptan", "heptane"), t("Octan", "octane")][c - 1];
            k = (3 * c + 1) % 2 === 0 ? 1 : 2; o2 = k * (3 * c + 1) / 2; co2 = k * c; h2o = k * (c + 1);
        } else {
            var c3 = r.int(1, 5);
            fuel = "C" + (c3 > 1 ? c3 : "") + "H" + (2 * c3 + 1) + "OH"; name = [t("Methanol", "methanol"), t("Ethanol", "ethanol"), t("Propanol", "propanol"), t("Butanol", "butanol"), t("Pentanol", "pentanol")][c3 - 1];
            k = (3 * c3) % 2 === 0 ? 1 : 2; o2 = k * 3 * c3 / 2; co2 = k * c3; h2o = k * (c3 + 1);
        }
        var left = [[k, fuel], [o2, "O2"]], right = [[co2, "CO2"], [h2o, "H2O"]], kk = k > 1 ? k + " " : "";
        return Q(t("Gleiche die vollständige Verbrennung von " + name + " aus: " + kk + f(fuel) + " + a O<sub>2</sub> → b CO<sub>2</sub> + c H<sub>2</sub>O. Der Brennstoff hat den Koeffizienten " + k + ", alle Koeffizienten sind ganzzahlig und so klein wie möglich.",
                   "Balance the complete combustion of " + name + ": " + kk + f(fuel) + " + a O<sub>2</sub> → b CO<sub>2</sub> + c H<sub>2</sub>O. The fuel has the coefficient " + k + ", all coefficients are whole numbers and as small as possible."),
            A.multi([{ l: "a (O<sub>2</sub>)", a: A.num(o2) }, { l: "b (CO<sub>2</sub>)", a: A.num(co2) }, { l: "c (H<sub>2</sub>O)", a: A.num(h2o) }]),
            t("Erst C, dann H ausgleichen, zum Schluss O. Der Sauerstoff steht rechts in CO<sub>2</sub> und H<sub>2</sub>O.", "Balance C first, then H, and O last. On the right the oxygen sits in CO<sub>2</sub> and H<sub>2</sub>O."),
            [t("C: b = ", "C: b = ") + co2, t("H: 2c = ", "H: 2c = ") + 2 * h2o + ", c = " + h2o, t("O: 2a = 2b + c", "O: 2a = 2b + c") + (fuel.indexOf("OH") > 0 ? t(" − " + k + " (O im Alkohol)", " − " + k + " (O in the alcohol)") : "") + ", a = " + o2,
             kk + f(fuel) + " + " + o2 + " O<sub>2</sub> → " + (co2 > 1 ? co2 + " " : "") + "CO<sub>2</sub> + " + h2o + " H<sub>2</sub>O"],
            balanced(left, right) && o2 % 1 === 0);
    } });

    // ================= Stöchiometrie =================
    var RX = [
        { eq: "CH<sub>4</sub> + 2 O<sub>2</sub> → CO<sub>2</sub> + 2 H<sub>2</sub>O", L: [[1, "CH4"], [2, "O2"]], R: [[1, "CO2"], [2, "H2O"]], a: [1, "CH4", t("Methan", "methane")], b: [1, "CO2", t("Kohlenstoffdioxid", "carbon dioxide")] },
        { eq: "CH<sub>4</sub> + 2 O<sub>2</sub> → CO<sub>2</sub> + 2 H<sub>2</sub>O", L: [[1, "CH4"], [2, "O2"]], R: [[1, "CO2"], [2, "H2O"]], a: [1, "CH4", t("Methan", "methane")], b: [2, "H2O", t("Wasser", "water")] },
        { eq: "2 H<sub>2</sub> + O<sub>2</sub> → 2 H<sub>2</sub>O", L: [[2, "H2"], [1, "O2"]], R: [[2, "H2O"]], a: [2, "H2", t("Wasserstoff", "hydrogen")], b: [2, "H2O", t("Wasser", "water")] },
        { eq: "Fe<sub>2</sub>O<sub>3</sub> + 3 CO → 2 Fe + 3 CO<sub>2</sub>", L: [[1, "Fe2O3"], [3, "CO"]], R: [[2, "Fe"], [3, "CO2"]], a: [1, "Fe2O3", t("Eisen(III)-oxid", "iron(III) oxide")], b: [2, "Fe", t("Eisen", "iron")] },
        { eq: "CaCO<sub>3</sub> → CaO + CO<sub>2</sub>", L: [[1, "CaCO3"]], R: [[1, "CaO"], [1, "CO2"]], a: [1, "CaCO3", t("Kalk", "limestone")], b: [1, "CO2", t("Kohlenstoffdioxid", "carbon dioxide")] },
        { eq: "C<sub>3</sub>H<sub>8</sub> + 5 O<sub>2</sub> → 3 CO<sub>2</sub> + 4 H<sub>2</sub>O", L: [[1, "C3H8"], [5, "O2"]], R: [[3, "CO2"], [4, "H2O"]], a: [1, "C3H8", t("Propan", "propane")], b: [3, "CO2", t("Kohlenstoffdioxid", "carbon dioxide")] }
    ];
    E.add({ id: "k-ch-stoech", topic: "K-CH-3", title: t("Stöchiometrie", "Stoichiometry"), gen: function (r, d) {
        var x = r.pick(RX), Ma = M.round(molar(x.a[1]), 2), Mb = M.round(molar(x.b[1]), 2), ratio = x.b[0] / x.a[0];
        var ok0 = balanced(x.L, x.R);
        if (d === 1) {
            var na = r.int(1, 40) / 4, nb = na * ratio;
            return Q(t("Reaktion: " + x.eq + ". Wie viel mol " + x.b[2] + " entstehen aus " + n(na, 2) + " mol " + x.a[2] + " (auf 0,01)?", "Reaction: " + x.eq + ". How many mol of " + x.b[2] + " are formed from " + n(na, 2) + " mol of " + x.a[2] + " (to 0.01)?"),
                nm(nb, 2, "mol"), t("Das Verhältnis der Stoffmengen ist das Verhältnis der Koeffizienten.", "The ratio of the amounts equals the ratio of the coefficients."), ["n<sub>B</sub> = " + n(na, 2) + " · " + x.b[0] + " / " + x.a[0] + " = " + n(nb, 2) + " mol"], ok0 && M.near(nb / na, x.b[0] / x.a[0], 1e-9));
        }
        if (d === 2) {
            var ma = r.int(2, 40) * 5, mb = ma / Ma * ratio * Mb;
            return Q(t("Reaktion: " + x.eq + ". Wie viel Gramm " + x.b[2] + " entstehen aus " + ma + " g " + x.a[2] + " (auf 0,1)? M(" + f(x.a[1]) + ") = " + n(Ma, 2) + " g/mol, M(" + f(x.b[1]) + ") = " + n(Mb, 2) + " g/mol.", "Reaction: " + x.eq + ". How many grams of " + x.b[2] + " are formed from " + ma + " g of " + x.a[2] + " (to 0.1)? M(" + f(x.a[1]) + ") = " + n(Ma, 2) + " g/mol, M(" + f(x.b[1]) + ") = " + n(Mb, 2) + " g/mol."),
                nm(mb, 1, "g"), t("Gramm → mol → Verhältnis der Koeffizienten → mol → Gramm.", "grams → mol → ratio of coefficients → mol → grams."),
                ["n<sub>A</sub> = " + ma + " / " + n(Ma, 2) + " = " + n(ma / Ma, 4) + " mol", "n<sub>B</sub> = " + n(ma / Ma * ratio, 4) + " mol", "m<sub>B</sub> = " + n(ma / Ma * ratio, 4) + " · " + n(Mb, 2) + " = " + n(mb, 1) + " g"], ok0 && M.near(mb / Mb / ratio * Ma, ma, 1e-9));
        }
        var want = r.int(2, 50) / 2, need = want / Mb / ratio * Ma;
        return Q(t("Reaktion: " + x.eq + ". Es sollen " + n(want, 1) + " kg " + x.b[2] + " entstehen. Wie viel kg " + x.a[2] + " braucht man mindestens (auf 0,01)? M(" + f(x.a[1]) + ") = " + n(Ma, 2) + " g/mol, M(" + f(x.b[1]) + ") = " + n(Mb, 2) + " g/mol.", "Reaction: " + x.eq + ". " + n(want, 1) + " kg of " + x.b[2] + " are to be produced. What is the minimum mass of " + x.a[2] + " needed in kg (to 0.01)? M(" + f(x.a[1]) + ") = " + n(Ma, 2) + " g/mol, M(" + f(x.b[1]) + ") = " + n(Mb, 2) + " g/mol."),
            nm(need, 2, "kg"), t("Rückwärts rechnen: kmol Produkt, über die Koeffizienten zu kmol Ausgangsstoff, dann in kg.", "Work backwards: kmol of product, via the coefficients to kmol of reactant, then to kg."),
            ["n<sub>B</sub> = " + n(want, 1) + " / " + n(Mb, 2) + " = " + n(want / Mb, 4) + " kmol", "n<sub>A</sub> = " + n(want / Mb / ratio, 4) + " kmol", "m<sub>A</sub> = " + n(need, 2) + " kg"], ok0 && M.near(need / Ma * ratio * Mb, want, 1e-9));
    } });

    // ================= Konzentration =================
    E.add({ id: "k-ch-konz", topic: "K-CH-4", title: t("Konzentration und Verdünnung", "Concentration and dilution"), gen: function (r, d) {
        if (d === 1) {
            var nn = r.int(1, 40) / 20, V = r.pick([100, 200, 250, 500, 750, 1000, 2000]), c = nn / (V / 1000);
            return Q(t(n(nn, 2) + " mol eines Salzes werden in Wasser zu " + V + " mL Lösung gelöst. Wie groß ist die Konzentration in mol/L (auf 0,001)?", n(nn, 2) + " mol of a salt are dissolved in water to give " + V + " mL of solution. What is the concentration in mol/L (to 0.001)?"),
                nm(c, 3, "mol/L"), t("c = n / V, das Volumen in Liter.", "c = n / V, with the volume in litres."), ["V = " + n(V / 1000, 3) + " L", "c = " + n(nn, 2) + " / " + n(V / 1000, 3) + " = " + n(c, 3) + " mol/L"], M.near(c * V / 1000, nn, 1e-9));
        }
        if (d === 2) {
            var V2 = r.pick([100, 250, 500, 1000]), c2 = r.pick([0.1, 0.15, 0.2, 0.25, 0.5, 1]), Mn = 58.44, m = c2 * V2 / 1000 * Mn;
            return Q(t("Du willst " + V2 + " mL Kochsalzlösung (NaCl, M = 58,44 g/mol) mit c = " + n(c2, 2) + " mol/L herstellen. Wie viel Gramm NaCl brauchst du (auf 0,01)?", "You want to prepare " + V2 + " mL of salt solution (NaCl, M = 58.44 g/mol) with c = " + n(c2, 2) + " mol/L. How many grams of NaCl do you need (to 0.01)?"),
                nm(m, 2, "g"), t("Erst n = c · V, dann m = n · M.", "First n = c · V, then m = n · M."), ["n = " + n(c2, 2) + " · " + n(V2 / 1000, 3) + " = " + n(c2 * V2 / 1000, 4) + " mol", "m = " + n(c2 * V2 / 1000, 4) + " · 58" + t(",", ".") + "44 = " + n(m, 2) + " g"], M.near(m / Mn / (V2 / 1000), c2, 1e-9));
        }
        var c1 = r.pick([1, 2, 5, 6, 10, 12]), cc = r.pick([0.05, 0.1, 0.2, 0.25, 0.5]), Vt = r.pick([250, 500, 1000, 2000]), V1 = cc * Vt / c1;
        return Q(t("Aus einer Stammlösung mit c<sub>1</sub> = " + c1 + " mol/L sollen " + Vt + " mL Lösung mit c<sub>2</sub> = " + n(cc, 2) + " mol/L entstehen. Wie viel mL Stammlösung brauchst du (auf 0,1)?", "From a stock solution with c<sub>1</sub> = " + c1 + " mol/L you want " + Vt + " mL of solution with c<sub>2</sub> = " + n(cc, 2) + " mol/L. How many mL of stock solution do you need (to 0.1)?"),
            nm(V1, 1, "mL"), t("Die Stoffmenge bleibt gleich: c<sub>1</sub> V<sub>1</sub> = c<sub>2</sub> V<sub>2</sub>.", "The amount stays the same: c<sub>1</sub> V<sub>1</sub> = c<sub>2</sub> V<sub>2</sub>."), ["V<sub>1</sub> = " + n(cc, 2) + " · " + Vt + " / " + c1 + " = " + n(V1, 1) + " mL", t("Mit Wasser auf ", "Fill up with water to ") + Vt + " mL" + t(" auffüllen", "")], M.near(c1 * V1, cc * Vt, 1e-9));
    } });

    // ================= pH-Wert =================
    E.add({ id: "k-ch-ph", topic: "K-CH-5", title: t("pH-Wert", "pH value"), gen: function (r, d) {
        if (d === 1) {
            var k = r.int(1, 5), c = Math.pow(10, -k);
            return Q(t("Salzsäure ist eine starke Säure und gibt ihr Proton vollständig ab. Welchen pH-Wert hat Salzsäure mit c = " + n(c, k) + " mol/L?", "Hydrochloric acid is a strong acid and gives up its proton completely. What is the pH of hydrochloric acid with c = " + n(c, k) + " mol/L?"),
                A.num(k), t("c(H<sub>3</sub>O<sup>+</sup>) = c(HCl). Schreibe sie als Zehnerpotenz.", "c(H<sub>3</sub>O<sup>+</sup>) = c(HCl). Write it as a power of ten."), ["c(H<sub>3</sub>O<sup>+</sup>) = 10<sup>−" + k + "</sup> mol/L", "pH = " + k], M.near(-Math.log(c) / Math.LN10, k, 1e-9));
        }
        if (d === 2) {
            var a = r.int(2, 9), e = r.int(1, 4), c2 = a * Math.pow(10, -e), ph = -Math.log(c2) / Math.LN10;
            return Q(t("Welchen pH-Wert hat Salzsäure mit c = " + n(a) + " · 10<sup>−" + e + "</sup> mol/L (auf 0,01)?", "What is the pH of hydrochloric acid with c = " + n(a) + " · 10<sup>−" + e + "</sup> mol/L (to 0.01)?"),
                nm(ph, 2, ""), t("pH = −lg c(H<sub>3</sub>O<sup>+</sup>), mit dem Taschenrechner.", "pH = −lg c(H<sub>3</sub>O<sup>+</sup>), with a calculator."), ["pH = −lg(" + n(c2, e + 1) + ") = " + n(ph, 2)], M.near(Math.pow(10, -ph), c2, 1e-9));
        }
        var b = r.int(1, 9), e3 = r.int(1, 3), cb = b * Math.pow(10, -e3), poh = -Math.log(cb) / Math.LN10, ph3 = 14 - poh;
        return Q(t("Natronlauge (NaOH) ist eine starke Base. Welchen pH-Wert hat Natronlauge mit c = " + n(b) + " · 10<sup>−" + e3 + "</sup> mol/L bei 25 °C (auf 0,01)?", "Sodium hydroxide solution (NaOH) is a strong base. What is the pH of NaOH with c = " + n(b) + " · 10<sup>−" + e3 + "</sup> mol/L at 25 °C (to 0.01)?"),
            nm(ph3, 2, ""), t("Erst pOH = −lg c(OH<sup>−</sup>), dann pH = 14 − pOH.", "First pOH = −lg c(OH<sup>−</sup>), then pH = 14 − pOH."), ["pOH = −lg(" + n(cb, e3 + 1) + ") = " + n(poh, 2), "pH = 14 − " + n(poh, 2) + " = " + n(ph3, 2)], M.near(Math.pow(10, -(14 - ph3)), cb, 1e-9));
    } });

    // ================= Reaktionsenthalpie =================
    var HF = { CH4: -74.8, CO2: -393.5, H2O: -285.8, C3H8: -103.8, C2H5OH: -277.7, CO: -110.5, NH3: -45.9, C6H12O6: -1273.3, O2: 0, H2: 0, N2: 0 };
    var RH = [
        { eq: "CH<sub>4</sub> + 2 O<sub>2</sub> → CO<sub>2</sub> + 2 H<sub>2</sub>O(l)", L: [[1, "CH4"], [2, "O2"]], R: [[1, "CO2"], [2, "H2O"]], fuel: ["CH4", t("Methan", "methane"), 16.04] },
        { eq: "C<sub>3</sub>H<sub>8</sub> + 5 O<sub>2</sub> → 3 CO<sub>2</sub> + 4 H<sub>2</sub>O(l)", L: [[1, "C3H8"], [5, "O2"]], R: [[3, "CO2"], [4, "H2O"]], fuel: ["C3H8", t("Propan", "propane"), 44.10] },
        { eq: "C<sub>2</sub>H<sub>5</sub>OH + 3 O<sub>2</sub> → 2 CO<sub>2</sub> + 3 H<sub>2</sub>O(l)", L: [[1, "C2H5OH"], [3, "O2"]], R: [[2, "CO2"], [3, "H2O"]], fuel: ["C2H5OH", t("Ethanol", "ethanol"), 46.07] },
        { eq: "C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6 O<sub>2</sub> → 6 CO<sub>2</sub> + 6 H<sub>2</sub>O(l)", L: [[1, "C6H12O6"], [6, "O2"]], R: [[6, "CO2"], [6, "H2O"]], fuel: ["C6H12O6", t("Glucose", "glucose"), 180.16] },
        { eq: "2 CO + O<sub>2</sub> → 2 CO<sub>2</sub>", L: [[2, "CO"], [1, "O2"]], R: [[2, "CO2"]], fuel: null },
        { eq: "N<sub>2</sub> + 3 H<sub>2</sub> → 2 NH<sub>3</sub>", L: [[1, "N2"], [3, "H2"]], R: [[2, "NH3"]], fuel: null }
    ];
    function dH(x) { var s = function (side) { return side.reduce(function (a, p) { return a + p[0] * HF[p[1]]; }, 0); }; return s(x.R) - s(x.L); }
    var HESS = [
        { goal: "C + ½ O<sub>2</sub> → CO", a: ["C + O<sub>2</sub> → CO<sub>2</sub>", -393.5], b: ["CO + ½ O<sub>2</sub> → CO<sub>2</sub>", -283.0], v: -110.5, how: t("(1) − (2)", "(1) − (2)") },
        { goal: "S + 3/2 O<sub>2</sub> → SO<sub>3</sub>", a: ["S + O<sub>2</sub> → SO<sub>2</sub>", -296.8], b: ["SO<sub>2</sub> + ½ O<sub>2</sub> → SO<sub>3</sub>", -98.9], v: -395.7, how: t("(1) + (2)", "(1) + (2)") },
        { goal: "H<sub>2</sub> + ½ O<sub>2</sub> → H<sub>2</sub>O(g)", a: ["H<sub>2</sub> + ½ O<sub>2</sub> → H<sub>2</sub>O(l)", -285.8], b: ["H<sub>2</sub>O(l) → H<sub>2</sub>O(g)", 44.0], v: -241.8, how: t("(1) + (2)", "(1) + (2)") },
        { goal: "2 C + O<sub>2</sub> → 2 CO", a: ["C + O<sub>2</sub> → CO<sub>2</sub>", -393.5], b: ["CO + ½ O<sub>2</sub> → CO<sub>2</sub>", -283.0], v: -221.0, how: t("2 · (1) − 2 · (2)", "2 · (1) − 2 · (2)") }
    ];
    E.add({ id: "k-ch-enthalpie", topic: "K-CH-6", title: t("Reaktionsenthalpie", "Reaction enthalpy"), gen: function (r, d) {
        if (d === 1) {
            var x = r.pick(RH), h = dH(x), used = {};
            x.L.concat(x.R).forEach(function (p) { if (HF[p[1]] !== 0) used[p[1]] = HF[p[1]]; });
            var table = Object.keys(used).map(function (k) { return f(k) + ": " + n(used[k], 1); }).join(", ");
            return Q(t("Berechne die Reaktionsenthalpie Δ<sub>R</sub>H in kJ/mol für " + x.eq + " (auf 0,1). Bildungsenthalpien in kJ/mol: " + table + ". Elemente wie O<sub>2</sub>, H<sub>2</sub>, N<sub>2</sub> haben 0.", "Work out the reaction enthalpy Δ<sub>R</sub>H in kJ/mol for " + x.eq + " (to 0.1). Enthalpies of formation in kJ/mol: " + table + ". Elements such as O<sub>2</sub>, H<sub>2</sub>, N<sub>2</sub> have 0."),
                nm(h, 1, "kJ/mol"), t("Produkte minus Ausgangsstoffe, jeweils mal Koeffizient.", "Products minus reactants, each times its coefficient."),
                [t("Produkte: ", "Products: ") + n(x.R.reduce(function (a, p) { return a + p[0] * HF[p[1]]; }, 0), 1), t("Ausgangsstoffe: ", "Reactants: ") + n(x.L.reduce(function (a, p) { return a + p[0] * HF[p[1]]; }, 0), 1), "Δ<sub>R</sub>H = " + n(h, 1) + " kJ/mol" + (h < 0 ? t(" (exotherm)", " (exothermic)") : "")],
                balanced(x.L, x.R) && M.near(h, x.R.reduce(function (a, p) { return a + p[0] * HF[p[1]]; }, 0) - x.L.reduce(function (a, p) { return a + p[0] * HF[p[1]]; }, 0), 1e-9));
        }
        if (d === 2) {
            var y = r.pick(RH.filter(function (z) { return z.fuel; })), hy = dH(y), m = r.int(1, 40) * 25, Qv = -hy * m / y.fuel[2];
            return Q(t("Die Verbrennung " + y.eq + " hat Δ<sub>R</sub>H = " + n(hy, 1) + " kJ/mol. Wie viel Wärme in kJ wird frei, wenn " + m + " g " + y.fuel[1] + " (M = " + n(y.fuel[2], 2) + " g/mol) verbrennen (auf 1)?", "The combustion " + y.eq + " has Δ<sub>R</sub>H = " + n(hy, 1) + " kJ/mol. How much heat in kJ is released when " + m + " g of " + y.fuel[1] + " (M = " + n(y.fuel[2], 2) + " g/mol) burn (to 1)?"),
                nm(Qv, 0, "kJ"), t("Q = n · |Δ<sub>R</sub>H| mit n = m / M (bezogen auf 1 mol Brennstoff).", "Q = n · |Δ<sub>R</sub>H| with n = m / M (per mole of fuel)."), ["n = " + m + " / " + n(y.fuel[2], 2) + " = " + n(m / y.fuel[2], 4) + " mol", "Q = " + n(m / y.fuel[2], 4) + " · " + n(-hy, 1) + " = " + n(Qv, 0) + " kJ"], M.near(Qv * y.fuel[2] / m, -hy, 1e-9));
        }
        var z = r.pick(HESS);
        return Q(t("Satz von Hess: Gegeben sind (1) " + z.a[0] + " mit Δ<sub>R</sub>H = " + n(z.a[1], 1) + " kJ/mol und (2) " + z.b[0] + " mit Δ<sub>R</sub>H = " + n(z.b[1], 1) + " kJ/mol. Berechne Δ<sub>R</sub>H für " + z.goal + " in kJ/mol (auf 0,1).", "Hess's law: given (1) " + z.a[0] + " with Δ<sub>R</sub>H = " + n(z.a[1], 1) + " kJ/mol and (2) " + z.b[0] + " with Δ<sub>R</sub>H = " + n(z.b[1], 1) + " kJ/mol. Work out Δ<sub>R</sub>H for " + z.goal + " in kJ/mol (to 0.1)."),
            nm(z.v, 1, "kJ/mol"), t("Kombiniere die Gleichungen so, dass die gesuchte Reaktion entsteht. Mit den Gleichungen werden auch die Enthalpien addiert, subtrahiert oder vervielfacht.", "Combine the equations so that the wanted reaction results. The enthalpies are added, subtracted or multiplied along with the equations."),
            [t("Gesuchte Reaktion = ", "Wanted reaction = ") + z.how, "Δ<sub>R</sub>H = " + n(z.v, 1) + " kJ/mol"],
            M.near(z.how.indexOf("2 ·") === 0 ? 2 * (z.a[1] - z.b[1]) : (z.how.indexOf("−") > 0 ? z.a[1] - z.b[1] : z.a[1] + z.b[1]), z.v, 1e-6));
    } });
})(typeof window !== "undefined" ? window : globalThis);
