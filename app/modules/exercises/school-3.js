/* SOR Aufgaben: Schule Klasse 11 und 12 (CM-S-36 … CM-S-47). Format siehe exercise-engine.js */
(function (root) {
    "use strict";
    var E = root.SOR_EX || require("../exercise-engine.js");
    var A = E.A, H = E.H, M = E.M, n = H.n, m = H.m;
    function Q(q, a, hint, steps, ok) { return { q: q, a: a, hint: hint, steps: steps, ok: ok }; }
    var P = function (x) { return x < 0 ? "(" + n(x) + ")" : n(x); };
    var pv = function (c, x) { return c.reduce(function (s, k) { return s * x + k; }, 0); };
    var dpoly = function (c) { var d = c.length - 1; return c.slice(0, d).map(function (k, i) { return k * (d - i); }); };
    var nd = function (f, x) { var h = 1e-5; return (f(x + h) - f(x - h)) / (2 * h); };

    E.add({ id: "s36-ableitung-wert", topic: "CM-S-36", title: "Ableitung an einer Stelle", gen: function (r, d) {
        var x0 = r.int(-3, 3), c, f, val;
        if (d === 1) { c = [r.nz(-3, 3), r.int(-4, 4), r.int(-6, 6), r.int(-9, 9)]; if (r.bool()) c = c.slice(1); if (!c[0]) c[0] = 2; f = function (x) { return pv(c, x); }; val = pv(dpoly(c), x0);
            return Q("Gegeben ist " + m("f(x) = " + H.poly(c)) + ". Berechne " + m("f′(" + n(x0) + ")") + ".", A.num(val), "Potenzregel: (xⁿ)′ = n · xⁿ⁻¹. Konstanten fallen weg.", ["f′(x) = " + H.poly(dpoly(c)), "f′(" + n(x0) + ") = " + n(val)], Math.abs(nd(f, x0) - val) < 1e-4); }
        var a = r.int(1, 3), b = r.nz(-4, 4), k = r.int(2, 4);
        if (d === 2) { f = function (x) { return Math.pow(a * x + b, k); }; val = k * a * Math.pow(a * x0 + b, k - 1);
            return Q("Gegeben ist " + m("f(x) = (" + H.lin([[a, "x"], [b, ""]]) + ")<sup>" + k + "</sup>") + ". Berechne " + m("f′(" + n(x0) + ")") + ".", A.num(val), "Kettenregel: äußere Ableitung mal innere Ableitung.", ["f′(x) = " + k + " · (" + H.lin([[a, "x"], [b, ""]]) + ")<sup>" + (k - 1) + "</sup> · " + a, "f′(" + n(x0) + ") = " + k * a + " · " + P(a * x0 + b) + "<sup>" + (k - 1) + "</sup> = " + n(val)], Math.abs(nd(f, x0) - val) < 1e-3 * Math.max(1, Math.abs(val))); }
        c = [r.nz(-2, 2), r.int(-4, 4), r.int(-5, 5)]; f = function (x) { return pv(c, x); }; var mt = pv(dpoly(c), x0), y0 = f(x0), t = y0 - mt * x0;
        return Q("Bestimme die Gleichung y = m·x + t der Tangente an " + m("f(x) = " + H.poly(c)) + " an der Stelle x₀ = " + n(x0) + ".", A.multi([{ l: "m", a: A.num(mt) }, { l: "t", a: A.num(t) }]), "Die Steigung ist f′(x₀). Die Tangente geht durch den Punkt (x₀ | f(x₀)).", ["f′(x) = " + H.poly(dpoly(c)) + ", also m = f′(" + n(x0) + ") = " + n(mt), "Berührpunkt: f(" + n(x0) + ") = " + n(y0), "t = " + n(y0) + " − " + P(mt) + " · " + P(x0) + " = " + n(t)], Math.abs(nd(f, x0) - mt) < 1e-4 && mt * x0 + t === y0);
    } });

    E.add({ id: "s36-ableitung-regeln", topic: "CM-S-36", title: "Ableitungsregeln", gen: function (r, d) {
        var f, g, q, correct, wrong, a = r.int(2, 5), b = r.int(2, 4), hint;
        if (d === 1) {
            var c = [r.nz(-4, 4), r.nz(-5, 5), r.nz(-6, 6), r.nz(-9, 9)], dc = dpoly(c);
            f = function (x) { return pv(c, x); }; g = function (x) { return pv(dc, x); };
            q = H.poly(c); correct = H.poly(dc); wrong = [H.poly(c.slice(0, 3)), H.poly(dc.concat([c[3]]).slice(1).length ? [dc[0], dc[1], dc[2] + c[3]] : dc), H.poly([c[0] * 3, c[1] * 2, c[2], 0])];
            hint = "Jeden Summanden einzeln ableiten: Exponent nach vorn, Exponent um 1 verringern.";
        } else if (d === 2) {
            var sin = r.bool();
            f = function (x) { return a * (sin ? Math.sin(b * x) : Math.cos(b * x)); }; g = function (x) { return a * b * (sin ? Math.cos(b * x) : -Math.sin(b * x)); };
            q = a + " · " + (sin ? "sin" : "cos") + "(" + b + "x)";
            correct = (sin ? "" : "−") + a * b + " · " + (sin ? "cos" : "sin") + "(" + b + "x)";
            wrong = [(sin ? "" : "−") + a + " · " + (sin ? "cos" : "sin") + "(" + b + "x)", (sin ? "−" : "") + a * b + " · " + (sin ? "cos" : "sin") + "(" + b + "x)", a * b + " · " + (sin ? "sin" : "cos") + "(" + b + "x)"];
            hint = "Kettenregel: Die innere Ableitung " + b + " kommt als Faktor dazu. (sin)′ = cos, (cos)′ = −sin.";
        } else {
            var k = r.int(2, 4), cf = r.int(1, 5), z = Array(k - 1).fill(0), lead = (cf === 1 ? "" : cf) + "x<sup>" + k + "</sup>";
            f = function (x) { return cf * Math.pow(x, k) * Math.exp(x); }; g = function (x) { return cf * (Math.pow(x, k) + k * Math.pow(x, k - 1)) * Math.exp(x); };
            q = lead + " · e<sup>x</sup>";
            correct = "(" + H.poly([cf, cf * k].concat(z)) + ") · e<sup>x</sup>";
            wrong = [H.poly([cf * k].concat(z)) + " · e<sup>x</sup>", lead + " · e<sup>x</sup>", H.poly([cf * k].concat(z)) + " + e<sup>x</sup>"];
            hint = "Produktregel: (u · v)′ = u′ · v + u · v′.";
        }
        return Q("Welche Funktion ist die Ableitung von " + m("f(x) = " + q) + "?", A.choice(r, m("f′(x) = " + correct), wrong.map(function (w) { return m("f′(x) = " + w); })), hint, [hint, "f′(x) = " + correct], [0.3, -0.7, 1.2].every(function (x) { return Math.abs(nd(f, x) - g(x)) < 1e-3 * Math.max(1, Math.abs(g(x))); }));
    } });

    E.add({ id: "s37-extrema", topic: "CM-S-37", title: "Extrema und Wendepunkte", gen: function (r, d) {
        if (d === 3) {
            var L = 4 * r.int(3, 15), best = 0, x;
            for (x = 0; x <= L / 2; x += 0.25) best = Math.max(best, x * (L - 2 * x));
            return Q("An einer Hauswand soll mit " + L + " m Zaun ein rechteckiges Beet eingezäunt werden. Die Wandseite braucht keinen Zaun. Wie groß kann die Fläche höchstens werden?", A.num(L * L / 8, { unit: "m²" }), "Nenne die beiden kurzen Seiten x. Dann ist die lange Seite " + L + " − 2x. Maximiere A(x) = x · (" + L + " − 2x).", ["A(x) = " + L + "x − 2x²", "A′(x) = " + L + " − 4x = 0, also x = " + L / 4, "A(" + L / 4 + ") = " + L / 4 + " · " + L / 2 + " = " + L * L / 8 + " m²"], M.near(best, L * L / 8));
        }
        var p = r.int(-4, 2), q = p + 2 * r.int(1, 3), e = r.int(-5, 5), c = [1, -3 * (p + q) / 2, 3 * p * q, e], f = function (t) { return pv(c, t); };
        var okE = f(p) > f(p - 0.01) && f(p) > f(p + 0.01) && f(q) < f(q - 0.01) && f(q) < f(q + 0.01);
        if (d === 1) return Q("Bestimme die Extremstellen von " + m("f(x) = " + H.poly(c)) + ".", A.multi([{ l: "Hochpunkt bei x", a: A.num(p) }, { l: "Tiefpunkt bei x", a: A.num(q) }]), "Setze f′(x) = 0. Das Vorzeichen von f″ entscheidet über Hoch- oder Tiefpunkt.", ["f′(x) = " + H.poly(dpoly(c)) + " = 3 · (x " + H.sg(-p) + ")(x " + H.sg(-q) + ")", "Nullstellen von f′: x = " + n(p) + " und x = " + n(q), "f″(x) = " + H.poly(dpoly(dpoly(c))) + ": f″(" + n(p) + ") < 0 (Hochpunkt), f″(" + n(q) + ") > 0 (Tiefpunkt)"], okE);
        var w = (p + q) / 2;
        return Q("Bestimme den Wendepunkt von " + m("f(x) = " + H.poly(c)) + ".", A.multi([{ l: "x", a: A.num(w) }, { l: "y", a: A.num(f(w)) }]), "Setze f″(x) = 0 und berechne dann den Funktionswert.", ["f″(x) = " + H.poly(dpoly(dpoly(c))) + " = 0", "x = " + n(w), "f(" + n(w) + ") = " + n(f(w))], pv(dpoly(dpoly(c)), w) === 0 && okE);
    } });

    E.add({ id: "s41-bedingt", topic: "CM-S-41", title: "Bedingte Wahrscheinlichkeit", gen: function (r, d) {
        if (d === 3) {
            var prev = r.pick([1, 2, 5]), sens = r.pick([90, 95, 98]), spec = r.pick([90, 95, 98]), N = 100000, sick = N * prev / 100, tp = sick * sens / 100, fp = (N - sick) * (100 - spec) / 100, ppv = tp / (tp + fp);
            return Q(prev + " % einer Bevölkerung haben eine Krankheit. Ein Test erkennt Kranke mit " + sens + " % Wahrscheinlichkeit, Gesunde erhalten mit " + (100 - spec) + " % Wahrscheinlichkeit fälschlich ein positives Ergebnis. Wie groß ist die Wahrscheinlichkeit, bei positivem Test wirklich krank zu sein? Gib eine Dezimalzahl an, gerundet auf drei Nachkommastellen.", A.num(ppv, { dec: 3 }), "Stell dir 100 000 Personen vor und fülle eine Vierfeldertafel aus.", ["Kranke: " + sick + ", davon positiv: " + tp, "Gesunde: " + (N - sick) + ", davon positiv: " + fp, "P(krank | positiv) = " + tp + " : " + (tp + fp) + " ≈ " + n(ppv, 3)], M.near(ppv, (prev / 100 * sens / 100) / (prev / 100 * sens / 100 + (1 - prev / 100) * (1 - spec / 100))));
        }
        var ab = r.int(10, 60), anb = r.int(10, 60), nab = r.int(10, 60), nanb = r.int(10, 80), tot = ab + anb + nab + nanb;
        var table = '<table class="extab"><tr><th></th><th>Sport</th><th>kein Sport</th></tr><tr><th>Instrument</th><td>' + ab + "</td><td>" + anb + "</td></tr><tr><th>kein Instrument</th><td>" + nab + "</td><td>" + nanb + "</td></tr></table>";
        if (d === 1) return Q("Von " + tot + " Schülerinnen und Schülern wurde erfasst, wer ein Instrument spielt und wer Sport treibt." + table + "Eine Person treibt Sport. Mit welcher Wahrscheinlichkeit spielt sie ein Instrument? Gib einen Bruch an.", A.frac(ab, ab + nab), "Betrachte nur die Spalte „Sport“.", ["Sport treiben insgesamt: " + ab + " + " + nab + " = " + (ab + nab), "Davon mit Instrument: " + ab, "P = " + H.q(ab, ab + nab)], M.near((ab / tot) / ((ab + nab) / tot), ab / (ab + nab)));
        return Q("Von " + tot + " Schülerinnen und Schülern wurde erfasst, wer ein Instrument spielt und wer Sport treibt." + table + "Eine Person spielt kein Instrument. Mit welcher Wahrscheinlichkeit treibt sie Sport? Gib einen Bruch an.", A.frac(nab, nab + nanb), "Betrachte nur die Zeile „kein Instrument“.", ["Kein Instrument insgesamt: " + nab + " + " + nanb + " = " + (nab + nanb), "Davon mit Sport: " + nab, "P = " + H.q(nab, nab + nanb)], M.near((nab / tot) / ((nab + nanb) / tot), nab / (nab + nanb)));
    } });

    E.add({ id: "s40-folgen", topic: "CM-S-40", title: "Folgen und Grenzwerte", gen: function (r, d) {
        if (d === 1) { var a = r.nz(-6, 6), b = r.int(-9, 9), c = r.nz(1, 6), e = r.int(1, 9), big = 1e9; return Q("Bestimme den Grenzwert der Folge " + m("a<sub>n</sub> = " + H.fr(H.lin([[a, "n"], [b, ""]]), H.lin([[c, "n"], [e, ""]]))) + " für n → ∞.", A.frac(a, c), "Klammere im Zähler und im Nenner n aus. Terme mit 1/n gehen gegen 0.", ["a<sub>n</sub> = " + H.fr(n(a) + " + " + n(b) + "/n", n(c) + " + " + n(e) + "/n"), "Grenzwert: " + H.q(a, c)], Math.abs((a * big + b) / (c * big + e) - a / c) < 1e-6); }
        if (d === 2) { var a1 = r.int(1, 6), q = r.pick([2, 3, -2, 0.5]), k = r.int(4, 6), v = a1 * Math.pow(q, k - 1), x = a1, i; for (i = 1; i < k; i += 1) x *= q; return Q("Eine geometrische Folge hat das Startglied a₁ = " + a1 + " und den Quotienten q = " + n(q) + ". Berechne a<sub>" + k + "</sub>.", A.num(v, { tol: 1e-6 }), "a<sub>n</sub> = a₁ · q<sup>n−1</sup>.", ["a<sub>" + k + "</sub> = " + a1 + " · " + P(q) + "<sup>" + (k - 1) + "</sup>", "= " + n(v)], M.near(x, v)); }
        var s = r.int(1, 9), qn = r.int(1, 4), qd = qn + r.int(1, 4), sum = 0, j;
        for (j = 0; j < 400; j += 1) sum += s * Math.pow(qn / qd, j);
        return Q("Berechne den Wert der unendlichen geometrischen Reihe " + m(s + " + " + s + " · " + H.q(qn, qd) + " + " + s + " · (" + H.q(qn, qd) + ")<sup>2</sup> + …") + " als Bruch.", A.frac(s * qd, qd - qn), "Für |q| < 1 gilt: Summe = a₁ / (1 − q).", ["q = " + H.q(qn, qd) + ", also 1 − q = " + H.q(qd - qn, qd), "Summe = " + s + " : " + H.q(qd - qn, qd) + " = " + H.q(s * qd, qd - qn)], Math.abs(sum - s * qd / (qd - qn)) < 1e-6);
    } });

    E.add({ id: "s39-e-funktion", topic: "CM-S-39", title: "e-Funktion und Logarithmus", gen: function (r, d) {
        var a = r.nz(-5, 5), k = r.nz(-3, 3), f, val;
        if (d === 1) { f = function (x) { return a * Math.exp(k * x); }; return Q("Gegeben ist " + m("f(x) = " + n(a) + " · e<sup>" + (k === 1 ? "" : k === -1 ? "−" : n(k)) + "x</sup>") + ". Berechne " + m("f′(0)") + ".", A.num(a * k), "Kettenregel: Der Faktor im Exponenten kommt nach vorn.", ["f′(x) = " + n(a * k) + " · e<sup>" + n(k) + "x</sup>", "f′(0) = " + n(a * k) + " · e⁰ = " + n(a * k)], Math.abs(nd(f, 0) - a * k) < 1e-4); }
        if (d === 2) { var kk = r.pick([0.5, 2, 3, 0.2, 0.1]), c = r.int(2, 50), x = Math.log(c) / kk; return Q("Löse die Gleichung " + m("e<sup>" + n(kk) + "x</sup> = " + c) + ". Runde auf drei Nachkommastellen.", A.num(x, { dec: 3 }), "Wende auf beiden Seiten den natürlichen Logarithmus an.", [n(kk) + " · x = ln(" + c + ") ≈ " + n(Math.log(c), 4), "x ≈ " + n(x, 3)], M.near(Math.exp(kk * x), c)); }
        if (r.bool()) { var p = r.int(1, 4), q = r.int(1, 6), x0 = r.int(0, 4); f = function (t) { return Math.log(p * t + q); }; return Q("Gegeben ist " + m("f(x) = ln(" + H.lin([[p, "x"], [q, ""]]) + ")") + ". Berechne " + m("f′(" + x0 + ")") + " als Bruch.", A.frac(p, p * x0 + q), "(ln u)′ = u′ / u.", ["f′(x) = " + H.fr(p, H.lin([[p, "x"], [q, ""]])), "f′(" + x0 + ") = " + H.q(p, p * x0 + q)], Math.abs(nd(f, x0) - p / (p * x0 + q)) < 1e-5); }
        var aa = r.pick([1, 2, -1]), xx = r.int(0, 2); f = function (t) { return t * Math.exp(aa * t); }; val = Math.exp(aa * xx) * (1 + aa * xx);
        return Q("Gegeben ist " + m("f(x) = x · e<sup>" + (aa === 1 ? "" : aa === -1 ? "−" : aa) + "x</sup>") + ". Berechne " + m("f′(" + xx + ")") + ". Runde auf drei Nachkommastellen.", A.num(val, { dec: 3 }), "Produktregel und Kettenregel.", ["f′(x) = e<sup>" + n(aa) + "x</sup> · (1 " + H.sg(aa) + "x)", "f′(" + xx + ") = e<sup>" + n(aa * xx) + "</sup> · " + n(1 + aa * xx) + " ≈ " + n(val, 3)], Math.abs(nd(f, xx) - val) < 1e-4 * Math.max(1, Math.abs(val)));
    } });

    var NORMS = [[1, 2, 2, 3], [2, 3, 6, 7], [4, 4, 7, 9], [1, 4, 8, 9], [2, 6, 9, 11], [6, 6, 7, 11], [3, 4, 12, 13], [2, 10, 11, 15]];
    var cross = function (u, v) { return [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]; };
    var dot = function (u, v) { return u[0] * v[0] + u[1] * v[1] + u[2] * v[2]; };
    E.add({ id: "s44-vektoren", topic: "CM-S-44", title: "Vektoren: Skalarprodukt, Länge, Kreuzprodukt", gen: function (r, d) {
        var u = [r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)], v = [r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)];
        if (!dot(u, u)) u[0] = 2; if (!dot(v, v)) v[1] = 3;
        if (d === 1) return Q("Berechne das Skalarprodukt von " + m("u = " + H.vec(u)) + " und " + m("v = " + H.vec(v)) + ".", A.num(dot(u, v)), "Multipliziere komponentenweise und addiere.", [u.map(function (x, i) { return P(x) + " · " + P(v[i]); }).join(" + "), "= " + n(dot(u, v))], dot(u, v) === dot(v, u));
        if (d === 2) {
            if (r.bool()) { var N = r.pick(NORMS), w = r.shuffle(N.slice(0, 3)).map(function (x) { return x * r.sign(); }); return Q("Berechne die Länge des Vektors " + m("v = " + H.vec(w)) + ".", A.num(N[3]), "|v| = √(v₁² + v₂² + v₃²).", ["|v|² = " + w.map(function (x) { return x * x; }).join(" + ") + " = " + N[3] * N[3], "|v| = " + N[3]], dot(w, w) === N[3] * N[3]); }
            var ang = M.deg(Math.acos(dot(u, v) / Math.sqrt(dot(u, u) * dot(v, v))));
            return Q("Berechne den Winkel zwischen " + m("u = " + H.vec(u)) + " und " + m("v = " + H.vec(v)) + ". Runde auf eine Nachkommastelle.", A.num(ang, { dec: 1, unit: "°" }), "cos φ = (u · v) / (|u| · |v|).", ["u · v = " + n(dot(u, v)), "|u| = √" + dot(u, u) + ", |v| = √" + dot(v, v), "cos φ = " + n(dot(u, v) / Math.sqrt(dot(u, u) * dot(v, v)), 4), "φ ≈ " + n(ang, 1) + "°"], M.near(Math.cos(M.rad(ang)) * Math.sqrt(dot(u, u) * dot(v, v)), dot(u, v), 1e-6));
        }
        var c = cross(u, v);
        return Q("Berechne das Kreuzprodukt " + m("u × v") + " für " + m("u = " + H.vec(u)) + " und " + m("v = " + H.vec(v)) + ".", A.multi([{ l: "1. Komponente", a: A.num(c[0]) }, { l: "2. Komponente", a: A.num(c[1]) }, { l: "3. Komponente", a: A.num(c[2]) }]), "u × v = (u₂v₃ − u₃v₂ | u₃v₁ − u₁v₃ | u₁v₂ − u₂v₁). Das Ergebnis steht senkrecht auf u und v.", ["1: " + P(u[1]) + " · " + P(v[2]) + " − " + P(u[2]) + " · " + P(v[1]) + " = " + n(c[0]), "2: " + P(u[2]) + " · " + P(v[0]) + " − " + P(u[0]) + " · " + P(v[2]) + " = " + n(c[1]), "3: " + P(u[0]) + " · " + P(v[1]) + " − " + P(u[1]) + " · " + P(v[0]) + " = " + n(c[2]), "Probe: (u × v) · u = 0"], dot(c, u) === 0 && dot(c, v) === 0);
    } });

    E.add({ id: "s44-geraden-ebenen", topic: "CM-S-44", title: "Geraden und Ebenen", gen: function (r, d) {
        var p = [r.int(-4, 4), r.int(-4, 4), r.int(1, 6)], u = [r.nz(-3, 3), r.nz(-3, 3), r.nz(-3, 3)], t = r.nz(-3, 4), X = p.map(function (x, i) { return x + t * u[i]; });
        var g = m("g: x = " + H.vec(p) + " + r · " + H.vec(u));
        if (d === 1) return Q("Der Punkt " + m("P(" + X.map(n).join(" | ") + ")") + " liegt auf der Geraden " + g + ". Für welchen Parameter r wird P erreicht?", A.num(t), "Setze P ein und löse eine der drei Zeilen nach r auf. Prüfe mit den anderen.", ["1. Zeile: " + n(X[0]) + " = " + n(p[0]) + " + r · " + P(u[0]), "r = " + n(t), "Probe in Zeile 2 und 3 stimmt."], X.every(function (x, i) { return x === p[i] + t * u[i]; }));
        if (d === 2) { u[2] = r.pick([-1, 1, -2, 2]); p[2] = -u[2] * r.nz(-3, 3); var rr = -p[2] / u[2], S = [p[0] + rr * u[0], p[1] + rr * u[1]]; g = m("g: x = " + H.vec(p) + " + r · " + H.vec(u)); return Q("In welchem Punkt durchstößt die Gerade " + g + " die x₁x₂-Ebene?", A.multi([{ l: "x₁", a: A.num(S[0]) }, { l: "x₂", a: A.num(S[1]) }]), "In der x₁x₂-Ebene gilt x₃ = 0.", ["3. Zeile: " + n(p[2]) + " + r · " + P(u[2]) + " = 0, also r = " + n(rr), "Einsetzen: x₁ = " + n(S[0]) + ", x₂ = " + n(S[1])], p[2] + rr * u[2] === 0); }
        var N = r.pick(NORMS), nv = r.shuffle(N.slice(0, 3)), dd = r.int(-9, 9), Pt = [r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)], num = Math.abs(dot(nv, Pt) - dd);
        return Q("Berechne den Abstand des Punktes " + m("P(" + Pt.map(n).join(" | ") + ")") + " von der Ebene " + m("E: " + H.lin([[nv[0], "x₁"], [nv[1], "x₂"], [nv[2], "x₃"]]) + " = " + n(dd)) + ". Gib das Ergebnis als Bruch oder Dezimalzahl an.", A.frac(num, N[3]), "Hessesche Normalform: d = |n · p − d| / |n|.", ["|n| = √(" + nv.map(function (x) { return x * x; }).join(" + ") + ") = " + N[3], "n · p − d = " + n(dot(nv, Pt)) + " − " + P(dd) + " = " + n(dot(nv, Pt) - dd), "Abstand = " + H.q(num, N[3])], (function () { var s = (dot(nv, Pt) - dd) / (N[3] * N[3]), F = Pt.map(function (x, i) { return x - s * nv[i]; }); return M.near(dot(nv, F), dd, 1e-9) && M.near(Math.sqrt(dot(Pt.map(function (x, i) { return x - F[i]; }), Pt.map(function (x, i) { return x - F[i]; }))), num / N[3]); })());
    } });

    E.add({ id: "s46-komplex", topic: "CM-S-46", title: "Rechnen mit komplexen Zahlen", gen: function (r, d) {
        var a = r.nz(-6, 6), b = r.nz(-6, 6), c = r.nz(-5, 5), e = r.nz(-5, 5);
        var z = function (x, y) { return "(" + H.lin([[x, ""], [y, "i"]]) + ")"; };
        if (d === 1) return Q("Berechne " + m(z(a, b) + " + " + z(c, e)) + ".", A.multi([{ l: "Realteil", a: A.num(a + c) }, { l: "Imaginärteil", a: A.num(b + e) }]), "Realteile und Imaginärteile getrennt addieren.", ["Realteil: " + n(a) + " " + H.sg(c) + " = " + n(a + c), "Imaginärteil: " + n(b) + " " + H.sg(e) + " = " + n(b + e)], true);
        var re = a * c - b * e, im = a * e + b * c;
        if (d === 2) return Q("Berechne " + m(z(a, b) + " · " + z(c, e)) + ".", A.multi([{ l: "Realteil", a: A.num(re) }, { l: "Imaginärteil", a: A.num(im) }]), "Ausmultiplizieren und i² = −1 verwenden.", [n(a * c) + " " + H.sg(a * e) + "i " + H.sg(b * c) + "i " + H.sg(b * e) + "i²", "i² = −1: Realteil " + n(a * c) + " " + H.sg(-b * e) + " = " + n(re), "Imaginärteil: " + n(a * e) + " " + H.sg(b * c) + " = " + n(im)], M.near(Math.hypot(re, im), Math.hypot(a, b) * Math.hypot(c, e)));
        var den = c * c + e * e, qr = a * c + b * e, qi = b * c - a * e;
        return Q("Berechne " + m(H.fr(H.lin([[a, ""], [b, "i"]]), H.lin([[c, ""], [e, "i"]]))) + ". Gib Real- und Imaginärteil als Bruch an.", A.multi([{ l: "Realteil", a: A.frac(qr, den) }, { l: "Imaginärteil", a: A.frac(qi, den) }]), "Erweitere mit der konjugiert komplexen Zahl des Nenners.", ["Erweitern mit " + z(c, -e), "Nenner: " + c * c + " + " + e * e + " = " + den, "Zähler: " + H.lin([[qr, ""], [qi, "i"]]), "Ergebnis: " + H.q(qr, den) + " " + (qi < 0 ? "−" : "+") + " " + H.q(Math.abs(qi), den) + " i"], M.near(qr / den * c - qi / den * e, a) && M.near(qr / den * e + qi / den * c, b));
    } });

    E.add({ id: "s38-integral", topic: "CM-S-38", title: "Bestimmte Integrale", gen: function (r, d) {
        var lo, hi, c, f, num;
        if (d === 1) { c = [r.int(-3, 3), r.nz(-4, 4), r.int(-5, 5)]; lo = r.int(-2, 1); hi = lo + r.int(1, 3); f = function (x) { return pv(c, x); }; num = 2 * c[0] * (hi * hi * hi - lo * lo * lo) + 3 * c[1] * (hi * hi - lo * lo) + 6 * c[2] * (hi - lo);
            var Fc = [c[0] ? H.q(c[0], 3) + "x³" : "", H.q(c[1], 2) + "x²", c[2] ? n(c[2]) + "x" : ""].filter(Boolean).join(" + ").replace(/\+ −/g, "− ");
            return Q("Berechne " + m("∫<sub>" + n(lo) + "</sub><sup>" + n(hi) + "</sup> (" + H.poly(c) + ") dx") + ". Gib das Ergebnis als Bruch oder ganze Zahl an.", A.frac(num, 6), "Bilde eine Stammfunktion F und berechne F(obere Grenze) − F(untere Grenze).", ["F(x) = " + Fc, "F(" + n(hi) + ") − F(" + n(lo) + ") = " + H.q(num, 6)], Math.abs(M.simpson(f, lo, hi) - num / 6) < 1e-7); }
        if (d === 2) { var x1 = r.int(-4, 2), x2 = x1 + r.int(1, 5), cc = [1, -(x1 + x2), x1 * x2]; f = function (x) { return Math.abs(pv(cc, x)); }; var w = x2 - x1;
            return Q("Die Parabel " + m("f(x) = " + H.poly(cc)) + " schließt mit der x-Achse eine Fläche ein. Berechne ihren Inhalt als Bruch oder ganze Zahl.", A.frac(w * w * w, 6), "Die Nullstellen sind die Integrationsgrenzen. Die Fläche liegt unter der x-Achse, nimm also den Betrag.", ["Nullstellen: x₁ = " + n(x1) + ", x₂ = " + n(x2), "∫ f(x) dx von " + n(x1) + " bis " + n(x2) + " = " + H.q(-w * w * w, 6), "Flächeninhalt: " + H.q(w * w * w, 6)], Math.abs(M.simpson(f, x1, x2, 2000) - w * w * w / 6) < 1e-5); }
        var a = r.int(1, 3), b = r.int(0, 3), k = r.int(2, 3); f = function (x) { return Math.pow(a * x + b, k); }; var nm = Math.pow(a + b, k + 1) - Math.pow(b, k + 1), dn = a * (k + 1);
        return Q("Berechne " + m("∫<sub>0</sub><sup>1</sup> (" + H.lin([[a, "x"], [b, ""]]) + ")<sup>" + k + "</sup> dx") + " als Bruch oder ganze Zahl.", A.frac(nm, dn), "Lineare Substitution: Stammfunktion ist (ax + b)^(n+1) / (a · (n+1)).", ["F(x) = " + H.fr("(" + H.lin([[a, "x"], [b, ""]]) + ")<sup>" + (k + 1) + "</sup>", dn), "F(1) − F(0) = " + H.fr(Math.pow(a + b, k + 1) + " − " + Math.pow(b, k + 1), dn) + " = " + H.q(nm, dn)], Math.abs(M.simpson(f, 0, 1) - nm / dn) < 1e-7);
    } });

    E.add({ id: "s38-stammfunktion", topic: "CM-S-38", title: "Stammfunktionen", gen: function (r, d) {
        var k = d === 1 ? 2 : 3, a = (k + 1) * r.nz(-3, 3), b = 2 * r.nz(-4, 4), c = r.nz(-7, 7), fc = k === 2 ? [a, b, c] : [a, 0, b, c];
        var Fc = k === 2 ? [a / 3, b / 2, c, 0] : [a / 4, 0, b / 2, c, 0], f = function (x) { return pv(fc, x); }, F = function (x) { return pv(Fc, x); };
        var correct = H.poly(Fc) + " + C", w1 = H.poly(dpoly(fc)) + " + C", w2 = H.poly(fc.concat([0])) + " + C", w3 = H.poly(Fc.map(function (x, i) { return i === Fc.length - 2 ? 0 : x; })) + " + C";
        if (d === 3) { var kk = r.int(2, 5), aa = r.int(2, 6); f = function (x) { return aa * Math.exp(kk * x); }; F = function (x) { return aa / kk * Math.exp(kk * x); }; correct = H.q(aa, kk) + " · e<sup>" + kk + "x</sup> + C"; w1 = aa * kk + " · e<sup>" + kk + "x</sup> + C"; w2 = aa + " · e<sup>" + kk + "x</sup> + C"; w3 = H.q(aa, kk + 1) + " · e<sup>" + (kk + 1) + "x</sup> + C";
            return Q("Welche Funktion ist eine Stammfunktion von " + m("f(x) = " + aa + " · e<sup>" + kk + "x</sup>") + "?", A.choice(r, m("F(x) = " + correct), [w1, w2, w3].map(function (x) { return m("F(x) = " + x); })), "Beim Integrieren von e^(kx) wird durch k geteilt.", ["Probe durch Ableiten: (" + H.q(aa, kk) + " · e<sup>" + kk + "x</sup>)′ = " + aa + " · e<sup>" + kk + "x</sup>"], [0.2, -0.4].every(function (x) { return Math.abs(nd(F, x) - f(x)) < 1e-3 * Math.max(1, Math.abs(f(x))); })); }
        return Q("Welche Funktion ist eine Stammfunktion von " + m("f(x) = " + H.poly(fc)) + "?", A.choice(r, m("F(x) = " + correct), [w1, w2, w3].map(function (x) { return m("F(x) = " + x); })), "Umgekehrte Potenzregel: Exponent um 1 erhöhen und durch den neuen Exponenten teilen.", ["F(x) = " + correct, "Probe: F′(x) = " + H.poly(fc)], [0.5, -1.3, 2].every(function (x) { return Math.abs(nd(F, x) - f(x)) < 1e-4 * Math.max(1, Math.abs(f(x))); }));
    } });

    E.add({ id: "s42-binomial", topic: "CM-S-42", title: "Binomialverteilung", gen: function (r, d) {
        var nn = r.int(5, 12), p = r.pick([0.2, 0.25, 0.3, 0.4, 0.5]), k = r.int(1, Math.min(5, nn - 1)), tot = 0, i;
        for (i = 0; i <= nn; i += 1) tot += M.binomPmf(nn, p, i);
        var intro = "Ein Zufallsexperiment mit Trefferwahrscheinlichkeit p = " + n(p) + " wird " + nn + " mal unabhängig durchgeführt. X zählt die Treffer. ";
        if (d === 1) return Q(intro + "Berechne P(X = " + k + "). Runde auf vier Nachkommastellen.", A.num(M.binomPmf(nn, p, k), { dec: 4 }), "Bernoulli-Formel: (n über k) · p^k · (1 − p)^(n−k).", ["(" + nn + " über " + k + ") = " + M.binom(nn, k), "P(X = " + k + ") = " + M.binom(nn, k) + " · " + n(p) + "<sup>" + k + "</sup> · " + n(1 - p) + "<sup>" + (nn - k) + "</sup>", "≈ " + n(M.binomPmf(nn, p, k), 4)], M.near(tot, 1));
        if (d === 2) { nn = r.int(2, 20) * 20; var mu = nn * p, sg = Math.sqrt(nn * p * (1 - p)); return Q("Ein Zufallsexperiment mit p = " + n(p) + " wird " + nn + " mal durchgeführt. Berechne Erwartungswert und Standardabweichung der Trefferzahl. Runde σ auf zwei Nachkommastellen.", A.multi([{ l: "μ", a: A.num(mu, { tol: 1e-6 }) }, { l: "σ", a: A.num(sg, { dec: 2 }) }]), "μ = n · p und σ = √(n · p · (1 − p)).", ["μ = " + nn + " · " + n(p) + " = " + n(mu), "σ = √(" + nn + " · " + n(p) + " · " + n(1 - p) + ") = √" + n(nn * p * (1 - p)) + " ≈ " + n(sg, 2)], M.near(sg * sg, mu * (1 - p))); }
        var cum = 0; for (i = 0; i <= k; i += 1) cum += M.binomPmf(nn, p, i);
        var rest = 0; for (i = k + 1; i <= nn; i += 1) rest += M.binomPmf(nn, p, i);
        return Q(intro + "Berechne P(X ≤ " + k + "). Runde auf vier Nachkommastellen.", A.num(cum, { dec: 4 }), "Addiere die Einzelwahrscheinlichkeiten von 0 bis " + k + ".", Array.from({ length: k + 1 }, function (_, j) { return "P(X = " + j + ") ≈ " + n(M.binomPmf(nn, p, j), 4); }).concat(["Summe ≈ " + n(cum, 4)]), M.near(cum + rest, 1));
    } });

    E.add({ id: "s43-hypothesentest", topic: "CM-S-43", title: "Hypothesentests", gen: function (r, d) {
        var nn = r.int(10, 20), p0 = r.pick([0.2, 0.25, 0.3, 0.5]), tail = function (k) { var s = 0; for (var i = k; i <= nn; i += 1) s += M.binomPmf(nn, p0, i); return s; };
        var k = Math.min(nn, Math.round(nn * p0) + r.int(2, 4)), intro = "Nullhypothese H₀: p = " + n(p0) + ". Es werden n = " + nn + " Versuche durchgeführt. ";
        if (d < 3) return Q(intro + "Wie groß ist unter H₀ die Wahrscheinlichkeit für mindestens " + k + " Treffer? Runde auf vier Nachkommastellen.", A.num(tail(k), { dec: 4 }), "P(X ≥ k) = 1 − P(X ≤ k − 1).", ["P(X ≤ " + (k - 1) + ") ≈ " + n(1 - tail(k), 4), "P(X ≥ " + k + ") ≈ " + n(tail(k), 4), tail(k) <= 0.05 ? "Das liegt unter 5 %: Ein solches Ergebnis spricht gegen H₀." : "Das liegt über 5 %: Kein signifikanter Hinweis gegen H₀."], M.near(tail(0), 1) && tail(k) < tail(k - 1));
        var kc = 0; while (tail(kc) > 0.05) kc += 1;
        return Q(intro + "Es wird rechtsseitig mit dem Signifikanzniveau 5 % getestet. Ab welcher Trefferzahl k wird H₀ verworfen? Gib das kleinste solche k an.", A.num(kc), "Suche das kleinste k mit P(X ≥ k) ≤ 0,05.", ["P(X ≥ " + (kc - 1) + ") ≈ " + n(tail(kc - 1), 4) + " (größer als 0,05)", "P(X ≥ " + kc + ") ≈ " + n(tail(kc), 4) + " (höchstens 0,05)", "Ablehnungsbereich: {" + kc + ", …, " + nn + "}"], tail(kc) <= 0.05 && tail(kc - 1) > 0.05);
    } });

    E.add({ id: "s45-matrizen", topic: "CM-S-45", title: "Matrizen und Übergangsprozesse", gen: function (r, d) {
        var Am = [[r.int(-4, 5), r.int(-4, 5)], [r.int(-4, 5), r.int(-4, 5)]], v = [r.int(-4, 5), r.int(-4, 5)];
        if (d === 1) { var w = [Am[0][0] * v[0] + Am[0][1] * v[1], Am[1][0] * v[0] + Am[1][1] * v[1]]; return Q("Berechne " + m(H.mat(Am) + " · " + H.vec(v)) + ".", A.multi([{ l: "oben", a: A.num(w[0]) }, { l: "unten", a: A.num(w[1]) }]), "Zeile mal Spalte.", ["oben: " + P(Am[0][0]) + " · " + P(v[0]) + " + " + P(Am[0][1]) + " · " + P(v[1]) + " = " + n(w[0]), "unten: " + P(Am[1][0]) + " · " + P(v[0]) + " + " + P(Am[1][1]) + " · " + P(v[1]) + " = " + n(w[1])], w[0] + w[1] === (Am[0][0] + Am[1][0]) * v[0] + (Am[0][1] + Am[1][1]) * v[1]); }
        if (d === 2) { var B = [[r.int(-3, 4), r.int(-3, 4)], [r.int(-3, 4), r.int(-3, 4)]], C = [[0, 0], [0, 0]], i, j, k; for (i = 0; i < 2; i += 1) for (j = 0; j < 2; j += 1) for (k = 0; k < 2; k += 1) C[i][j] += Am[i][k] * B[k][j];
            var det = function (X) { return X[0][0] * X[1][1] - X[0][1] * X[1][0]; };
            return Q("Berechne das Matrizenprodukt " + m(H.mat(Am) + " · " + H.mat(B)) + ".", A.multi([{ l: "oben links", a: A.num(C[0][0]) }, { l: "oben rechts", a: A.num(C[0][1]) }, { l: "unten links", a: A.num(C[1][0]) }, { l: "unten rechts", a: A.num(C[1][1]) }]), "Der Eintrag in Zeile i und Spalte j ist Zeile i der ersten mal Spalte j der zweiten Matrix.", ["oben links: " + n(C[0][0]) + ", oben rechts: " + n(C[0][1]), "unten links: " + n(C[1][0]) + ", unten rechts: " + n(C[1][1])], det(C) === det(Am) * det(B)); }
        var a = r.int(1, 5), b = r.int(1, 5), x = [0.5, 0.5], it;
        for (it = 0; it < 2000; it += 1) x = [(1 - a / 10) * x[0] + b / 10 * x[1], a / 10 * x[0] + (1 - b / 10) * x[1]];
        return Q("Kunden wechseln jeden Monat zwischen zwei Anbietern A und B. Übergangsmatrix (Spalten: von A, von B): " + m(H.mat([[n(1 - a / 10), n(b / 10)], [n(a / 10), n(1 - b / 10)]])) + ". Welcher Anteil ist langfristig bei Anbieter A? Gib einen Bruch an.", A.frac(b, a + b), "Im Gleichgewicht wechseln gleich viele von A nach B wie von B nach A.", [n(a / 10) + " · x = " + n(b / 10) + " · (1 − x)", "x = " + H.fr(n(b / 10), n(a / 10) + " + " + n(b / 10)) + " = " + H.q(b, a + b)], Math.abs(x[0] - b / (a + b)) < 1e-9);
    } });

    E.add({ id: "s47-kegelschnitte", topic: "CM-S-47", title: "Kegelschnitte", gen: function (r, d) {
        var T = r.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]), b = T[0], e = T[1], a = T[2];
        if (d === 1) return Q("Eine Ellipse hat die Gleichung " + m(H.fr("x<sup>2</sup>", a * a) + " + " + H.fr("y<sup>2</sup>", b * b) + " = 1") + ". Wie groß ist die lineare Exzentrizität e (Abstand der Brennpunkte vom Mittelpunkt)?", A.num(e), "e² = a² − b².", ["a = " + a + ", b = " + b, "e² = " + a * a + " − " + b * b + " = " + e * e, "e = " + e], M.near(Math.hypot(e, b) + Math.hypot(e, b), 2 * a));
        if (d === 2) { var ha = r.int(2, 7), hb = r.int(1, 9), big = 1e6; return Q("Eine Hyperbel hat die Gleichung " + m(H.fr("x<sup>2</sup>", ha * ha) + " − " + H.fr("y<sup>2</sup>", hb * hb) + " = 1") + ". Welche Steigung hat die Asymptote mit positiver Steigung? Gib einen Bruch an.", A.frac(hb, ha), "Die Asymptoten sind y = ± (b/a) · x.", ["a = " + ha + ", b = " + hb, "Steigung: " + H.q(hb, ha)], Math.abs(hb * Math.sqrt(big * big / (ha * ha) - 1) / big - hb / ha) < 1e-6); }
        var k = r.int(1, 6), yF = 1 / (4 * k), xt = 0.7;
        return Q("Die Parabel " + m("y = " + (k === 1 ? "" : k) + "x<sup>2</sup>") + " hat ihren Brennpunkt auf der y-Achse. In welcher Höhe liegt er? Gib einen Bruch an.", A.frac(1, 4 * k), "Für y = a·x² liegt der Brennpunkt bei y = 1 / (4a).", ["a = " + k, "y<sub>F</sub> = " + H.fr(1, "4 · " + k) + " = " + H.q(1, 4 * k)], M.near(Math.hypot(xt, k * xt * xt - yF), k * xt * xt + yF));
    } });
})(typeof window !== "undefined" ? window : globalThis);
