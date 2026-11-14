/* SOR Aufgaben Höhere Mathematik 1 (K-HM-01 bis K-HM-36), Aufgabentypen nach Karpfinger, Arbeitsbuch HM in Rezepten. Format siehe exercise-engine.js */
(function (root) {
    "use strict";
    var E = root.SOR_EX || require("../exercise-engine.js");
    var A = E.A, M = E.M, H = E.H, n = E.H.n, t = E.tr;
    function Q(q, a, hint, steps, ok) { return { q: q, a: a, hint: hint, steps: steps, ok: !!ok }; }
    var nm = function (v, dec, unit) { return A.num(v, { dec: dec, unit: unit || "", tol: Math.max(Math.abs(v) * 0.002, 0.6 * Math.pow(10, -dec)) }); };
    var I = function (v) { return A.num(v); };
    var mat = H.mat, vec = H.vec, poly = H.poly, q = H.q;
    var id2 = function (ch) { return "K-HM-" + (ch < 10 ? "0" : "") + ch; };
    function add(ch, key, de, en, gen) { E.add({ id: "k-hm" + ch + "-" + key, topic: id2(ch), title: t(de, en), gen: gen }); }
    function det2(m) { return m[0][0] * m[1][1] - m[0][1] * m[1][0]; }
    function det(m) {
        if (m.length === 1) return m[0][0];
        if (m.length === 2) return det2(m);
        var s = 0;
        for (var j = 0; j < m.length; j += 1) {
            var minor = m.slice(1).map(function (r) { return r.filter(function (_, k) { return k !== j; }); });
            s += (j % 2 ? -1 : 1) * m[0][j] * det(minor);
        }
        return s;
    }
    function mul(a, b) { return a.map(function (r) { return b[0].map(function (_, j) { return r.reduce(function (s, x, k) { return s + x * b[k][j]; }, 0); }); }); }
    function mv(a, v) { return a.map(function (r) { return r.reduce(function (s, x, k) { return s + x * v[k]; }, 0); }); }
    function rank(m) {
        var a = m.map(function (r) { return r.slice(); }), rk = 0, rows = a.length, cols = a[0].length;
        for (var c = 0; c < cols && rk < rows; c += 1) {
            var p = -1;
            for (var i = rk; i < rows; i += 1) if (Math.abs(a[i][c]) > 1e-9) { p = i; break; }
            if (p < 0) continue;
            var tmp = a[p]; a[p] = a[rk]; a[rk] = tmp;
            for (var i2 = 0; i2 < rows; i2 += 1) if (i2 !== rk) { var f = a[i2][c] / a[rk][c]; for (var k = c; k < cols; k += 1) a[i2][k] -= f * a[rk][k]; }
            rk += 1;
        }
        return rk;
    }
    function solve(m, b) {
        var nn = m.length, a = m.map(function (r, i) { return r.concat([b[i]]); });
        for (var c = 0; c < nn; c += 1) {
            var p = c; for (var i = c; i < nn; i += 1) if (Math.abs(a[i][c]) > Math.abs(a[p][c])) p = i;
            var tmp = a[p]; a[p] = a[c]; a[c] = tmp;
            for (var i2 = 0; i2 < nn; i2 += 1) if (i2 !== c) { var f = a[i2][c] / a[c][c]; for (var k = c; k <= nn; k += 1) a[i2][k] -= f * a[c][k]; }
        }
        return a.map(function (r, i) { return r[nn] / r[i]; });
    }
    function randMat(r, nn, lo, hi) { var m = []; for (var i = 0; i < nn; i += 1) { m.push([]); for (var j = 0; j < nn; j += 1) m[i].push(r.int(lo, hi)); } return m; }
    function invertible(r, nn, lo, hi) { var m; do { m = randMat(r, nn, lo, hi); } while (Math.abs(det(m)) < 1); return m; }
    function sys(m, b, vars) {
        vars = vars || ["x<sub>1</sub>", "x<sub>2</sub>", "x<sub>3</sub>", "x<sub>4</sub>"];
        return m.map(function (row, i) { return H.lin(row.map(function (x, j) { return [x, vars[j]]; })) + " = " + n(b[i]); }).join("<br>");
    }
    var simpson = M.simpson, near = M.near, DEG = 180 / Math.PI;

    // =============== Kap. 1 Mengen ===============
    add(1, "mengen", "Mengen und Summenzeichen", "Sets and sum notation", function (r, d) {
        if (d < 3) {
            var a1 = r.int(-6, 2), a2 = a1 + r.int(4, 9), b1 = r.int(-4, 4), b2 = b1 + r.int(4, 9);
            var inA = function (x) { return a1 < x && x < a2; }, inB = function (x) { return b1 <= x && x <= b2; };
            var cnt = 0, list = [];
            for (var x = -30; x <= 30; x += 1) { var ok = d === 1 ? inA(x) && inB(x) : inA(x) && !inB(x); if (ok) { cnt += 1; list.push(x); } }
            var cnt2 = 0; for (var x2 = a1 + 1; x2 < a2; x2 += 1) if (d === 1 ? (x2 >= b1 && x2 <= b2) : (x2 < b1 || x2 > b2)) cnt2 += 1;
            var op = d === 1 ? "A ∩ B" : "A \\ B";
            return Q(t("Gegeben sind A = {x ∈ ℝ | " + n(a1) + " < x < " + n(a2) + "} und B = {x ∈ ℝ | " + n(b1) + " ≤ x ≤ " + n(b2) + "}. Wie viele ganze Zahlen liegen in " + op + "?", "Let A = {x ∈ ℝ | " + n(a1) + " < x < " + n(a2) + "} and B = {x ∈ ℝ | " + n(b1) + " ≤ x ≤ " + n(b2) + "}. How many integers lie in " + op + "?"),
                I(cnt), t("Zeichne beide Intervalle auf die Zahlengerade. Achte auf offene und geschlossene Ränder.", "Draw both intervals on the number line. Watch the open and closed ends."),
                [op + " ∩ ℤ = {" + (list.length ? list.map(function (v) { return n(v); }).join(", ") : "") + "}", t("Anzahl: ", "Count: ") + cnt], cnt === cnt2);
        }
        var N = r.int(3, 9), a = r.int(1, 6), s = 0;
        for (var i = 1; i <= N; i += 1) for (var k = 1; k <= i; k += 1) s += a * k;
        var f = a * N * (N + 1) * (N + 2) / 6;
        return Q(t("Berechne Σ<sub>n=1</sub><sup>" + N + "</sup> Σ<sub>k=1</sub><sup>n</sup> " + a + "k.", "Compute Σ<sub>n=1</sub><sup>" + N + "</sup> Σ<sub>k=1</sub><sup>n</sup> " + a + "k."),
            I(s), t("Die innere Summe ist " + a + " · n(n+1)/2. Summiere danach über n.", "The inner sum is " + a + " · n(n+1)/2. Then sum over n."),
            [t("innere Summe: ", "inner sum: ") + a + " · n(n+1)/2", "Σ = " + a + " · N(N+1)(N+2)/6 = " + s], s === f);
    });

    // =============== Kap. 2 Zahlen ===============
    add(2, "zahlen", "Induktion, Binomialkoeffizienten, Brüche", "Induction, binomial coefficients, fractions", function (r, d) {
        if (d === 1) {
            var nn = r.int(5, 14), k = r.int(2, nn - 2), b = M.binom(nn, k);
            var row = [1]; for (var i = 0; i < nn; i += 1) { var nr = [1]; for (var j = 1; j < row.length; j += 1) nr.push(row[j - 1] + row[j]); nr.push(1); row = nr; }
            return Q(t("Berechne den Binomialkoeffizienten (" + nn + " über " + k + ").", "Compute the binomial coefficient (" + nn + " choose " + k + ")."),
                I(b), t("(n über k) = n! / (k! (n − k)!). Kürze vorher.", "(n choose k) = n! / (k! (n − k)!). Cancel first."), ["(" + nn + " " + t("über", "choose") + " " + k + ") = " + nn + "! / (" + k + "! · " + (nn - k) + "!) = " + b], row[k] === b);
        }
        if (d === 2) {
            var N = r.int(5, 20), c = r.int(1, 5), s = 0; for (var i2 = 1; i2 <= N; i2 += 1) s += i2 * i2 - c;
            var f = N * (N + 1) * (2 * N + 1) / 6 - c * N;
            return Q(t("Mit vollständiger Induktion zeigt man Σ<sub>i=1</sub><sup>n</sup> i² = n(n+1)(2n+1)/6. Berechne damit Σ<sub>i=1</sub><sup>" + N + "</sup> (i² − " + c + ").", "By induction one shows Σ<sub>i=1</sub><sup>n</sup> i² = n(n+1)(2n+1)/6. Use it to compute Σ<sub>i=1</sub><sup>" + N + "</sup> (i² − " + c + ")."),
                I(f), t("Teile die Summe auf: Σ i² minus " + N + " · " + c + ".", "Split the sum: Σ i² minus " + N + " · " + c + "."), ["Σ i² = " + N + "·" + (N + 1) + "·" + (2 * N + 1) + "/6 = " + N * (N + 1) * (2 * N + 1) / 6, "− " + c * N + " = " + f], s === f);
        }
        var L = r.pick([1, 2, 3]), per = r.int(L === 1 ? 1 : 10, L === 1 ? 8 : (L === 2 ? 98 : 998)), m = r.int(0, 3), den = Math.pow(10, L) - 1;
        if (per % 11 === 0 && L === 2) per += 1;
        var ps = ("00" + per).slice(-L), shown = n(m) + t(",", ".") + ps + ps + ps + "…";
        return Q(t("Schreibe die periodische Dezimalzahl x = " + shown + " (Periode " + ps + ") als vollständig gekürzten Bruch.", "Write the repeating decimal x = " + shown + " (period " + ps + ") as a fully reduced fraction."),
            A.frac(m * den + per, den), t("Multipliziere mit 10<sup>" + L + "</sup> und ziehe x ab: die Periode fällt weg.", "Multiply by 10<sup>" + L + "</sup> and subtract x: the repeating part cancels."),
            [Math.pow(10, L) + "x − x = " + (Math.pow(10, L) - 1) + "x = " + (m * den + per), "x = " + q(m * den + per, den)], near(parseFloat(m + "." + new Array(9).join(ps)), (m * den + per) / den, 1e-8));
    });

    // =============== Kap. 3 Reelle Zahlen ===============
    add(3, "ungl", "Ungleichungen und Beträge", "Inequalities and absolute values", function (r, d) {
        if (d === 1) {
            var c = r.pick([1, 2, 4, 5]), a = r.int(-9, 9), b = r.int(1, 9), lo = (a - b) / c, hi = (a + b) / c;
            var lhs = c === 1 ? "|x " + H.sg(-a) + "|" : "|" + c + "x " + H.sg(-a) + "|";
            return Q(t("Bestimme die Lösungsmenge von " + lhs + " < " + b + ". Gib die Intervallgrenzen an.", "Find the solution set of " + lhs + " < " + b + ". Give the interval bounds."),
                A.multi([{ l: t("untere Grenze", "lower bound"), a: nm(lo, 2) }, { l: t("obere Grenze", "upper bound"), a: nm(hi, 2) }]), t("|y| < b heißt −b < y < b.", "|y| < b means −b < y < b."),
                ["−" + b + " < " + (c === 1 ? "" : c) + "x " + H.sg(-a) + " < " + b, n(lo, 2) + " < x < " + n(hi, 2)], Math.abs(Math.abs(c * (lo + 1e-7) - a) - b) < 1e-5 && Math.abs(c * ((lo + hi) / 2) - a) < b);
        }
        if (d === 2) {
            var r1 = r.int(-7, 4), r2 = r1 + r.int(1, 8), p = -(r1 + r2), qq = r1 * r2;
            return Q(t("Löse die Ungleichung " + poly([1, p, qq]) + " < 0. Gib die Intervallgrenzen an.", "Solve the inequality " + poly([1, p, qq]) + " < 0. Give the interval bounds."),
                A.multi([{ l: t("untere Grenze", "lower bound"), a: I(r1) }, { l: t("obere Grenze", "upper bound"), a: I(r2) }]), t("Nullstellen bestimmen. Eine nach oben geöffnete Parabel ist zwischen den Nullstellen negativ.", "Find the roots. An upward parabola is negative between its roots."),
                ["x<sub>1</sub> = " + r1 + ", x<sub>2</sub> = " + r2, r1 + " < x < " + r2], (r1 + r2) / 2 * ((r1 + r2) / 2) + p * (r1 + r2) / 2 + qq < 0 && r1 * r1 + p * r1 + qq === 0);
        }
        var a2 = r.int(1, 6), b2 = r.int(1, 6), k = a2 + b2 + 2 * r.int(1, 5), x1 = (k - a2 + b2) / 2, x2 = (b2 - a2 - k) / 2;
        return Q(t("Bestimme alle reellen Lösungen von |x + " + a2 + "| + |x − " + b2 + "| = " + k + ".", "Find all real solutions of |x + " + a2 + "| + |x − " + b2 + "| = " + k + "."),
            A.multi([{ l: "x<sub>1</sub>", a: nm(x1, 1) }, { l: "x<sub>2</sub>", a: nm(x2, 1) }], { unordered: true }), t("Fallunterscheidung an den Knickstellen −" + a2 + " und " + b2 + ". In der Mitte ist die Summe konstant " + (a2 + b2) + ".", "Case distinction at the kinks −" + a2 + " and " + b2 + ". In between the sum is constant " + (a2 + b2) + "."),
            [t("x ≥ ", "x ≥ ") + b2 + ": 2x " + H.sg(a2 - b2) + " = " + k + " ⇒ x = " + n(x1, 1), "x ≤ −" + a2 + ": −2x " + H.sg(b2 - a2) + " = " + k + " ⇒ x = " + n(x2, 1)],
            Math.abs(Math.abs(x1 + a2) + Math.abs(x1 - b2) - k) < 1e-9 && Math.abs(Math.abs(x2 + a2) + Math.abs(x2 - b2) - k) < 1e-9);
    });

    // =============== Kap. 4 Maschinenzahlen ===============
    add(4, "dual", "Dualsystem und Maschinenzahlen", "Binary system and machine numbers", function (r, d) {
        if (d === 1) {
            var x = r.int(20, 600), bin = x.toString(2);
            return Q(t("Stelle die Dezimalzahl " + x + " im Dualsystem dar (nur Ziffern 0 und 1).", "Write the decimal number " + x + " in binary (digits 0 and 1 only)."),
                A.num(parseInt(bin, 10), { dec: 0 }), t("Teile wiederholt durch 2 und lies die Reste von unten nach oben.", "Divide by 2 repeatedly and read the remainders from bottom to top."), [x + " = " + bin.split("").map(function (c, i) { return c === "1" ? "2<sup>" + (bin.length - 1 - i) + "</sup>" : null; }).filter(Boolean).join(" + "), "= (" + bin + ")<sub>2</sub>"], parseInt(bin, 2) === x);
        }
        if (d === 2) {
            var y = r.int(40, 1000), b2 = y.toString(2);
            return Q(t("Schreibe die Dualzahl (" + b2 + ")<sub>2</sub> als Dezimalzahl.", "Write the binary number (" + b2 + ")<sub>2</sub> as a decimal number."),
                I(y), t("Jede Stelle steht für eine Zweierpotenz, die rechte für 2<sup>0</sup>.", "Each digit stands for a power of two, the rightmost for 2<sup>0</sup>."), [b2.split("").map(function (c, i) { return c === "1" ? Math.pow(2, b2.length - 1 - i) : null; }).filter(Boolean).join(" + ") + " = " + y], b2.split("").reduce(function (s, c) { return 2 * s + (c === "1" ? 1 : 0); }, 0) === y);
        }
        var b = r.pick([2, 2, 3]), tt = r.int(2, b === 2 ? 5 : 3), emin = -r.int(1, 4), emax = r.int(1, 4), cnt = 2 * (b - 1) * Math.pow(b, tt - 1) * (emax - emin + 1);
        var mant = 0; for (var m = 0; m < Math.pow(b, tt); m += 1) if (Math.floor(m / Math.pow(b, tt - 1)) !== 0) mant += 1;
        return Q(t("Wie viele normalisierte Maschinenzahlen ungleich 0 gibt es zur Basis b = " + b + " mit t = " + tt + " Stellen und Exponenten von e<sub>min</sub> = " + emin + " bis e<sub>max</sub> = " + emax + "?", "How many non-zero normalised machine numbers are there for base b = " + b + " with t = " + tt + " digits and exponents from e<sub>min</sub> = " + emin + " to e<sub>max</sub> = " + emax + "?"),
            I(cnt), t("Erste Mantissenziffer ungleich 0, die übrigen beliebig, dazu Vorzeichen und alle Exponenten.", "First mantissa digit non-zero, the rest arbitrary, times sign and all exponents."),
            [t("Mantissen: ", "mantissas: ") + "(b − 1) b<sup>t−1</sup> = " + (b - 1) * Math.pow(b, tt - 1), t("Exponenten: ", "exponents: ") + (emax - emin + 1), "2 · " + (b - 1) * Math.pow(b, tt - 1) + " · " + (emax - emin + 1) + " = " + cnt], mant * 2 * (emax - emin + 1) === cnt);
    });

    // =============== Kap. 5 Polynome ===============
    add(5, "poly", "Polynomdivision, Faktorisierung, Partialbrüche", "Polynomial division, factorisation, partial fractions", function (r, d) {
        if (d === 1) {
            var c = [1, r.int(-4, 4), r.int(-6, 6), r.int(-6, 6), r.int(-9, 9)], a = r.nz(-3, 3);
            var hq = [c[0]]; for (var i = 1; i < c.length; i += 1) hq.push(c[i] + a * hq[i - 1]);
            var rem = hq.pop(), pv = c.reduce(function (s, x, k) { return s + x * Math.pow(a, 4 - k); }, 0);
            return Q(t("Dividiere p(x) = " + poly(c) + " durch (x " + H.sg(-a) + "). Wie groß ist der Rest?", "Divide p(x) = " + poly(c) + " by (x " + H.sg(-a) + "). What is the remainder?"),
                I(rem), t("Mit dem Horner-Schema, oder kurz: der Rest ist p(" + n(a) + ").", "Use Horner's scheme, or simply: the remainder is p(" + n(a) + ")."), [t("Quotient: ", "quotient: ") + poly(hq), t("Rest: ", "remainder: ") + "p(" + n(a) + ") = " + rem], rem === pv);
        }
        if (d === 2) {
            var rs = r.shuffle([-4, -3, -2, -1, 1, 2, 3, 4, 5]).slice(0, 3), c3 = [1, -(rs[0] + rs[1] + rs[2]), rs[0] * rs[1] + rs[0] * rs[2] + rs[1] * rs[2], -rs[0] * rs[1] * rs[2]];
            var pe = function (x) { return ((x + c3[1]) * x + c3[2]) * x + c3[3]; };
            return Q(t("Faktorisiere p(x) = " + poly(c3) + " vollständig. Gib die drei Nullstellen an.", "Factorise p(x) = " + poly(c3) + " completely. Give the three roots."),
                A.multi([{ l: "x<sub>1</sub>", a: I(rs[0]) }, { l: "x<sub>2</sub>", a: I(rs[1]) }, { l: "x<sub>3</sub>", a: I(rs[2]) }], { unordered: true }), t("Ganzzahlige Nullstellen teilen das Absolutglied " + c3[3] + ". Probiere sie aus und spalte ab.", "Integer roots divide the constant term " + c3[3] + ". Try them and split off."),
                ["p(x) = (x " + H.sg(-rs[0]) + ")(x " + H.sg(-rs[1]) + ")(x " + H.sg(-rs[2]) + ")"], pe(rs[0]) === 0 && pe(rs[1]) === 0 && pe(rs[2]) === 0);
        }
        var p = r.int(-4, 3), qv = p + r.int(1, 5), al = r.int(-5, 5), be = r.int(-9, 9);
        if (al * p + be === 0) be += 1;
        var An = al * p + be, Ad = p - qv, Bn = al * qv + be, Bd = qv - p, xt = qv + 3.7;
        return Q(t("Zerlege (" + H.lin([[al, "x"], [be, ""]]) + ") / ((x " + H.sg(-p) + ")(x " + H.sg(-qv) + ")) = A/(x " + H.sg(-p) + ") + B/(x " + H.sg(-qv) + ") in Partialbrüche.", "Decompose (" + H.lin([[al, "x"], [be, ""]]) + ") / ((x " + H.sg(-p) + ")(x " + H.sg(-qv) + ")) = A/(x " + H.sg(-p) + ") + B/(x " + H.sg(-qv) + ") into partial fractions."),
            A.multi([{ l: "A", a: A.frac(An, Ad) }, { l: "B", a: A.frac(Bn, Bd) }]), t("Zuhaltemethode: für A setze x = " + p + " in den Rest ein.", "Cover-up method: for A substitute x = " + p + " into the rest."),
            ["A = (" + al + "·" + p + " " + H.sg(be) + ") / (" + p + " − " + qv + ") = " + q(An, Ad), "B = (" + al + "·" + qv + " " + H.sg(be) + ") / (" + qv + " − " + p + ") = " + q(Bn, Bd)],
            near((al * xt + be) / ((xt - p) * (xt - qv)), An / Ad / (xt - p) + Bn / Bd / (xt - qv), 1e-9));
    });

    // =============== Kap. 6 Trigonometrie ===============
    var TRI = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]];
    add(6, "trig", "Trigonometrische Funktionen", "Trigonometric functions", function (r, d) {
        if (d === 1) {
            var tr = r.pick(TRI), sw = r.bool(), a = sw ? tr[0] : tr[1], b = sw ? tr[1] : tr[0], c = tr[2], kind = r.int(0, 2);
            var x = a / c, val, txt, num, den;
            if (kind === 0) { txt = "cos(arcsin(" + q(a, c) + "))"; num = b; den = c; val = Math.cos(Math.asin(x)); }
            else if (kind === 1) { txt = "sin(arccos(" + q(a, c) + "))"; num = b; den = c; val = Math.sin(Math.acos(x)); }
            else { txt = "tan(arcsin(" + q(a, c) + "))"; num = a; den = b; val = Math.tan(Math.asin(x)); }
            return Q(t("Berechne exakt " + txt + ".", "Compute exactly " + txt + "."), A.frac(num, den), t("Zeichne ein rechtwinkliges Dreieck mit Hypotenuse " + c + " und nutze sin² + cos² = 1.", "Draw a right triangle with hypotenuse " + c + " and use sin² + cos² = 1."),
                ["√(1 − (" + a + "/" + c + ")²) = " + b + "/" + c, txt + " = " + q(num, den)], near(val, num / den, 1e-12));
        }
        if (d === 2) {
            var bb = 2 * r.int(1, 4), k = r.int(2, 5), sgn = r.sign(), aa = bb * (k - 0.5) * sgn, cc = bb * k / 2 - bb;
            var sol = sgn > 0 ? 30 : 210, s = Math.sin(sol / DEG);
            return Q(t("Löse " + n(aa) + " sin x − " + bb + " cos² x = " + n(cc) + ". Gib die kleinste positive Lösung in Grad an.", "Solve " + n(aa) + " sin x − " + bb + " cos² x = " + n(cc) + ". Give the smallest positive solution in degrees."),
                nm(sol, 1, "°"), t("Ersetze cos² x = 1 − sin² x und löse die quadratische Gleichung in s = sin x.", "Replace cos² x = 1 − sin² x and solve the quadratic equation in s = sin x."),
                [bb + "s² " + H.sg(aa) + "s − " + n(bb + cc) + " = 0", "s = " + (sgn > 0 ? "½" : "−½") + t(" (die andere Lösung ", " (the other root ") + n(-k * sgn) + t(" ist kein Sinuswert)", " is not a sine value)"), "x = " + sol + "°"], near(aa * s - bb * Math.cos(sol / DEG) * Math.cos(sol / DEG), cc, 1e-9));
        }
        var a3 = r.nz(-6, 6), b3 = r.nz(-6, 6), R = Math.sqrt(a3 * a3 + b3 * b3), phi = Math.atan2(b3, a3) * DEG, xt = 0.7;
        return Q(t("Schreibe " + n(a3) + " cos x " + H.sg(b3) + " sin x in der Form R cos(x − φ) mit R > 0 und φ in Grad (−180° < φ ≤ 180°).", "Write " + n(a3) + " cos x " + H.sg(b3) + " sin x in the form R cos(x − φ) with R > 0 and φ in degrees (−180° < φ ≤ 180°)."),
            A.multi([{ l: "R", a: nm(R, 3) }, { l: "φ", a: nm(phi, 1, "°") }]), t("R = √(a² + b²), und φ ist der Winkel des Punktes (a, b).", "R = √(a² + b²), and φ is the angle of the point (a, b)."), ["R = √(" + a3 * a3 + " + " + b3 * b3 + ") = " + n(R, 3), "φ = " + n(phi, 1) + "°"],
            near(a3 * Math.cos(xt) + b3 * Math.sin(xt), R * Math.cos(xt - phi / DEG), 1e-9));
    });

    // =============== Kap. 7 Komplex kartesisch ===============
    function cs(a, b) { return n(a) + " " + (b < 0 ? "−" : "+") + " " + (Math.abs(b) === 1 ? "" : n(Math.abs(b))) + "i"; }
    add(7, "komplex", "Rechnen mit komplexen Zahlen", "Calculating with complex numbers", function (r, d) {
        var a = r.nz(-6, 6), b = r.nz(-6, 6), c = r.nz(-6, 6), e = r.nz(-6, 6);
        if (d === 1) {
            var re = a * c - b * e, im = a * e + b * c;
            return Q(t("Berechne (" + cs(a, b) + ")(" + cs(c, e) + "). Gib Real- und Imaginärteil an.", "Compute (" + cs(a, b) + ")(" + cs(c, e) + "). Give the real and imaginary part."),
                A.multi([{ l: "Re", a: I(re) }, { l: "Im", a: I(im) }]), t("Ausmultiplizieren und i² = −1 nutzen.", "Multiply out and use i² = −1."), ["= " + (a * c) + " " + H.sg(a * e) + "i " + H.sg(b * c) + "i " + H.sg(-b * e), "= " + cs(re, im)], near((re * re + im * im), (a * a + b * b) * (c * c + e * e), 1e-12));
        }
        if (d === 2) {
            var den = c * c + e * e, rn = a * c + b * e, inn = b * c - a * e;
            return Q(t("Berechne (" + cs(a, b) + ") / (" + cs(c, e) + "). Gib Real- und Imaginärteil als Bruch an.", "Compute (" + cs(a, b) + ") / (" + cs(c, e) + "). Give the real and imaginary part as fractions."),
                A.multi([{ l: "Re", a: A.frac(rn, den) }, { l: "Im", a: A.frac(inn, den) }]), t("Mit dem konjugiert Komplexen " + cs(c, -e) + " erweitern.", "Multiply numerator and denominator by the conjugate " + cs(c, -e) + "."),
                [t("Nenner: ", "denominator: ") + c + "² + " + e + "² = " + den, t("Zähler: ", "numerator: ") + cs(rn, inn), "= " + q(rn, den) + " " + (inn < 0 ? "−" : "+") + " " + q(Math.abs(inn), den) + " i"], near(rn * c - inn * e, a * den, 1e-12) && near(rn * e + inn * c, b * den, 1e-12));
        }
        var al = r.int(-4, 4), be = r.int(1, 5), p = -2 * al, qq = al * al + be * be;
        return Q(t("Bestimme die Nullstellen von p(z) = " + poly([1, p, qq, 0], "z") + ". Gib für die nicht reellen Nullstellen den Realteil und den positiven Imaginärteil an.", "Find the roots of p(z) = " + poly([1, p, qq, 0], "z") + ". For the non-real roots give the real part and the positive imaginary part."),
            A.multi([{ l: "Re", a: I(al) }, { l: "Im > 0", a: I(be) }]), t("z ausklammern, dann die quadratische Gleichung mit negativer Diskriminante lösen.", "Factor out z, then solve the quadratic with negative discriminant."),
            ["p(z) = z (" + poly([1, p, qq], "z") + ")", "z = " + n(al) + " ± " + be + "i, " + t("dazu z = 0", "and z = 0")], (al * al - be * be) + p * al + qq === 0 && 2 * al * be + p * be === 0);
    });

    // =============== Kap. 8 Komplex polar ===============
    add(8, "polar", "Polardarstellung, Potenzen, Wurzeln", "Polar form, powers, roots", function (r, d) {
        if (d === 1) {
            var a = r.nz(-6, 6), b = r.nz(-6, 6), R = Math.sqrt(a * a + b * b), ph = Math.atan2(b, a) * DEG;
            return Q(t("Gib z = " + cs(a, b) + " in Polardarstellung an: Betrag r und Argument φ in Grad (−180° < φ ≤ 180°).", "Write z = " + cs(a, b) + " in polar form: modulus r and argument φ in degrees (−180° < φ ≤ 180°)."),
                A.multi([{ l: "r", a: nm(R, 3) }, { l: "φ", a: nm(ph, 1, "°") }]), t("r = √(a² + b²). Den Quadranten am Vorzeichen von a und b ablesen.", "r = √(a² + b²). Read the quadrant from the signs of a and b."), ["r = " + n(R, 3), "φ = " + n(ph, 1) + "°"], near(R * Math.cos(ph / DEG), a, 1e-9) && near(R * Math.sin(ph / DEG), b, 1e-9));
        }
        if (d === 2) {
            var Z = r.pick([["1 + i", 1, 1], ["1 − i", 1, -1], ["−1 + i", -1, 1], ["√3 + i", Math.sqrt(3), 1], ["1 + √3 i", 1, Math.sqrt(3)], ["−√3 + i", -Math.sqrt(3), 1]]), k = r.int(3, 10);
            var mod = Math.sqrt(Z[1] * Z[1] + Z[2] * Z[2]), arg = Math.atan2(Z[2], Z[1]), re = Math.pow(mod, k) * Math.cos(k * arg), im = Math.pow(mod, k) * Math.sin(k * arg);
            var pr = 1, pi = 0; for (var i = 0; i < k; i += 1) { var nr = pr * Z[1] - pi * Z[2]; pi = pr * Z[2] + pi * Z[1]; pr = nr; }
            return Q(t("Berechne (" + Z[0] + ")<sup>" + k + "</sup> mit der Polardarstellung. Gib Real- und Imaginärteil an (auf 0,01).", "Compute (" + Z[0] + ")<sup>" + k + "</sup> using the polar form. Give the real and imaginary part (to 0.01)."),
                A.multi([{ l: "Re", a: nm(re, 2) }, { l: "Im", a: nm(im, 2) }]), t("Betrag hoch " + k + ", Winkel mal " + k + ".", "Modulus to the power " + k + ", angle times " + k + "."),
                ["z = " + n(mod, 4) + " e<sup>i·" + n(arg * DEG, 0) + "°</sup>", "z<sup>" + k + "</sup> = " + n(Math.pow(mod, k), 2) + " e<sup>i·" + n(k * arg * DEG, 0) + "°</sup>", "= " + n(re, 2) + " " + (im < 0 ? "−" : "+") + " " + n(Math.abs(im), 2) + "i"], near(pr, re, 1e-7) && near(pi, im, 1e-7));
        }
        var nn = r.int(2, 6), R0 = r.pick([1, 2, 3]), Rw = Math.pow(R0, nn), W = r.pick([[0, ""], [180, "−"], [90, "i"], [270, "−i"]]);
        var wtxt = W[0] === 0 ? String(Rw) : W[0] === 180 ? "−" + Rw : W[0] === 90 ? Rw + "i" : "−" + Rw + "i";
        var argmin = W[0] / nn, zr = R0 * Math.cos(argmin / DEG), zi = R0 * Math.sin(argmin / DEG), pr2 = 1, pi2 = 0;
        for (var j = 0; j < nn; j += 1) { var t2 = pr2 * zr - pi2 * zi; pi2 = pr2 * zi + pi2 * zr; pr2 = t2; }
        return Q(t("Bestimme alle Lösungen von z<sup>" + nn + "</sup> = " + wtxt + ". Gib ihren gemeinsamen Betrag und das kleinste nicht negative Argument in Grad an.", "Find all solutions of z<sup>" + nn + "</sup> = " + wtxt + ". Give their common modulus and the smallest non-negative argument in degrees."),
            A.multi([{ l: "r", a: nm(R0, 3) }, { l: "φ<sub>0</sub>", a: nm(argmin, 1, "°") }]), t("r = |w|<sup>1/n</sup>, φ<sub>k</sub> = (arg w + k · 360°) / n.", "r = |w|<sup>1/n</sup>, φ<sub>k</sub> = (arg w + k · 360°) / n."),
            ["|w| = " + Rw + ", arg w = " + W[0] + "°", "r = " + R0 + ", φ<sub>k</sub> = " + n(argmin, 2) + "° + k · " + n(360 / nn, 2) + "°"], near(pr2, Rw * Math.cos(W[0] / DEG), 1e-7) && near(pi2, Rw * Math.sin(W[0] / DEG), 1e-7));
    });

    // =============== Kap. 9 LGS ===============
    add(9, "lgs", "Lineare Gleichungssysteme lösen", "Solving linear systems", function (r, d) {
        if (d < 3) {
            var nn = d + 1, m = invertible(r, nn, -4, 5), x = []; for (var i = 0; i < nn; i += 1) x.push(r.int(-5, 5));
            var b = mv(m, x), fields = x.map(function (v, k) { return { l: "x<sub>" + (k + 1) + "</sub>", a: I(v) }; });
            return Q(t("Löse das Gleichungssystem mit dem Gauß-Verfahren:<br>", "Solve the system with Gaussian elimination:<br>") + sys(m, b), A.multi(fields),
                t("Erzeuge Nullen unter der Diagonalen, dann rückwärts einsetzen.", "Create zeros below the diagonal, then back-substitute."), ["det A = " + det(m) + t(" ≠ 0: eindeutig lösbar", " ≠ 0: unique solution"), "x = (" + x.join(", ") + ")"],
                solve(m, b).every(function (v, k) { return near(v, x[k], 1e-9); }));
        }
        var a = r.int(-3, 3), b2 = r.int(-3, 3), c = r.int(-3, 3), e = c * a + r.pick([-1, 1]), f = r.int(-4, 4), g = r.int(-4, 4);
        var M0 = [[1, a, b2], [c, e, r.int(-4, 4)], [f, g, 0]], cof = det2([[1, a], [c, e]]), d0 = det(M0), alpha = -d0 / cof;
        var M1 = [[1, a, b2], [c, e, M0[1][2]], [f, g, alpha]];
        return Q(t("Für welchen Wert von α ist das System A x = b mit A = " + mat([[1, a, b2], [c, e, M0[1][2]], [f, g, "α"]]) + " nicht eindeutig lösbar?", "For which value of α is the system A x = b with A = " + mat([[1, a, b2], [c, e, M0[1][2]], [f, g, "α"]]) + " not uniquely solvable?"),
            I(alpha), t("Nicht eindeutig lösbar heißt det A = 0. Entwickle nach der letzten Zeile: α steht nur bei einem Eintrag.", "Not uniquely solvable means det A = 0. Expand along the last row: α appears in one entry only."),
            ["det A = " + cof + " · α " + H.sg(d0), "α = " + alpha], det(M1) === 0);
    });

    // =============== Kap. 10 Matrizen ===============
    add(10, "matrix", "Matrizen multiplizieren und invertieren", "Multiplying and inverting matrices", function (r, d) {
        if (d === 1) {
            var Am = randMat(r, 2, -4, 5), Bm = randMat(r, 2, -4, 5), P = mul(Am, Bm);
            return Q(t("Berechne A · B für A = " + mat(Am) + " und B = " + mat(Bm) + ".", "Compute A · B for A = " + mat(Am) + " and B = " + mat(Bm) + "."),
                A.multi([{ l: "c<sub>11</sub>", a: I(P[0][0]) }, { l: "c<sub>12</sub>", a: I(P[0][1]) }, { l: "c<sub>21</sub>", a: I(P[1][0]) }, { l: "c<sub>22</sub>", a: I(P[1][1]) }]), t("Eintrag c<sub>ij</sub> = Zeile i von A mal Spalte j von B.", "Entry c<sub>ij</sub> = row i of A times column j of B."),
                ["c<sub>11</sub> = " + Am[0][0] + "·" + Bm[0][0] + " " + H.sg(Am[0][1]) + "·" + Bm[1][0] + " = " + P[0][0], "A · B = " + mat(P)], det(P) === det(Am) * det(Bm));
        }
        if (d === 2) {
            var m; do { m = randMat(r, 2, -5, 6); } while (det(m) === 0);
            var D = det(m);
            return Q(t("Berechne die Inverse von A = " + mat(m) + ".", "Compute the inverse of A = " + mat(m) + "."),
                A.multi([{ l: "b<sub>11</sub>", a: A.frac(m[1][1], D) }, { l: "b<sub>12</sub>", a: A.frac(-m[0][1], D) }, { l: "b<sub>21</sub>", a: A.frac(-m[1][0], D) }, { l: "b<sub>22</sub>", a: A.frac(m[0][0], D) }]),
                t("Diagonale tauschen, Nebendiagonale mit − versehen, durch det A teilen.", "Swap the diagonal, negate the off-diagonal, divide by det A."), ["det A = " + D, "A<sup>−1</sup> = 1/" + D + " · " + mat([[m[1][1], -m[0][1]], [-m[1][0], m[0][0]]])],
                near(m[0][0] * m[1][1] / D + m[0][1] * (-m[1][0]) / D, 1, 1e-12));
        }
        var A3 = randMat(r, 3, -3, 4), x = [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)], y = [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)], Ay = mv(A3, y), val = x.reduce(function (s, v, k) { return s + v * Ay[k]; }, 0);
        var xA = [0, 1, 2].map(function (j) { return x.reduce(function (s, v, k) { return s + v * A3[k][j]; }, 0); });
        return Q(t("Berechne x<sup>T</sup> A y für A = " + mat(A3) + ", x = " + vec(x) + " und y = " + vec(y) + ".", "Compute x<sup>T</sup> A y for A = " + mat(A3) + ", x = " + vec(x) + " and y = " + vec(y) + "."),
            I(val), t("Erst A y berechnen, dann das Skalarprodukt mit x.", "First compute A y, then the dot product with x."), ["A y = " + vec(Ay), "x<sup>T</sup>(A y) = " + val], xA.reduce(function (s, v, k) { return s + v * y[k]; }, 0) === val);
    });

    // =============== Kap. 11 LR ===============
    add(11, "lr", "LR-Zerlegung", "LU decomposition", function (r, d) {
        if (d === 1) {
            var a = r.nz(-3, 3), l = r.int(-3, 3), b = r.int(-5, 5), r22 = r.nz(-5, 5), Am = [[a, b], [l * a, l * b + r22]];
            return Q(t("Bestimme die LR-Zerlegung von A = " + mat(Am) + " (L mit Einsen auf der Diagonalen). Gib l<sub>21</sub> und r<sub>22</sub> an.", "Find the LU decomposition of A = " + mat(Am) + " (L with ones on the diagonal). Give l<sub>21</sub> and r<sub>22</sub>."),
                A.multi([{ l: "l<sub>21</sub>", a: I(l) }, { l: "r<sub>22</sub>", a: I(r22) }]), t("l<sub>21</sub> = a<sub>21</sub> / a<sub>11</sub>, dann r<sub>22</sub> = a<sub>22</sub> − l<sub>21</sub> a<sub>12</sub>.", "l<sub>21</sub> = a<sub>21</sub> / a<sub>11</sub>, then r<sub>22</sub> = a<sub>22</sub> − l<sub>21</sub> a<sub>12</sub>."),
                ["l<sub>21</sub> = " + Am[1][0] + "/" + a + " = " + l, "r<sub>22</sub> = " + Am[1][1] + " − " + l + "·" + b + " = " + r22], det2(Am) === a * r22);
        }
        var L = [[1, 0, 0], [r.int(-3, 3), 1, 0], [r.int(-3, 3), r.int(-3, 3), 1]], R = [[r.nz(-3, 3), r.int(-4, 4), r.int(-4, 4)], [0, r.nz(-3, 3), r.int(-4, 4)], [0, 0, r.nz(-3, 3)]], Am3 = mul(L, R);
        if (d === 2) return Q(t("Bestimme die LR-Zerlegung von A = " + mat(Am3) + " ohne Zeilenvertauschung. Gib die Einträge von L unter der Diagonalen an.", "Find the LU decomposition of A = " + mat(Am3) + " without row swaps. Give the entries of L below the diagonal."),
            A.multi([{ l: "l<sub>21</sub>", a: I(L[1][0]) }, { l: "l<sub>31</sub>", a: I(L[2][0]) }, { l: "l<sub>32</sub>", a: I(L[2][1]) }]), t("Die Eliminationsfaktoren des Gauß-Verfahrens sind die Einträge von L.", "The elimination factors of Gaussian elimination are the entries of L."),
            ["l<sub>21</sub> = " + Am3[1][0] + "/" + Am3[0][0] + " = " + L[1][0] + ", l<sub>31</sub> = " + Am3[2][0] + "/" + Am3[0][0] + " = " + L[2][0], "R = " + mat(R) + ", l<sub>32</sub> = " + L[2][1]], det(Am3) === R[0][0] * R[1][1] * R[2][2]);
        var x = [r.int(-4, 4), r.int(-4, 4), r.int(-4, 4)], b3 = mv(Am3, x);
        return Q(t("Es ist A = L R mit L = " + mat(L) + " und R = " + mat(R) + ". Löse A x = b für b = " + vec(b3) + ".", "A = L U with L = " + mat(L) + " and U = " + mat(R) + ". Solve A x = b for b = " + vec(b3) + "."),
            A.multi(x.map(function (v, k) { return { l: "x<sub>" + (k + 1) + "</sub>", a: I(v) }; })), t("Erst L y = b vorwärts, dann R x = y rückwärts lösen.", "First solve L y = b forwards, then U x = y backwards."), ["y = " + vec(mv(R, x)), "x = " + vec(x)], solve(Am3, b3).every(function (v, k) { return near(v, x[k], 1e-9); }));
    });

    // =============== Kap. 12 Determinante ===============
    add(12, "det", "Determinanten und Cramer'sche Regel", "Determinants and Cramer's rule", function (r, d) {
        if (d < 3) {
            var nn = d + 2, m = randMat(r, nn, -3, 4);
            if (d === 2) for (var i = 0; i < 4; i += 1) m[r.int(0, 3)][r.int(0, 3)] = 0;
            var D = det(m), up = m.map(function (rw) { return rw.slice(); }), D2 = 1;
            for (var c = 0; c < nn; c += 1) { var p = -1; for (var i2 = c; i2 < nn; i2 += 1) if (Math.abs(up[i2][c]) > 1e-12) { p = i2; break; } if (p < 0) { D2 = 0; break; } if (p !== c) { var tmp = up[p]; up[p] = up[c]; up[c] = tmp; D2 = -D2; } D2 *= up[c][c]; for (var i3 = c + 1; i3 < nn; i3 += 1) { var f = up[i3][c] / up[c][c]; for (var k = c; k < nn; k += 1) up[i3][k] -= f * up[c][k]; } }
            return Q(t("Berechne die Determinante von A = " + mat(m) + ".", "Compute the determinant of A = " + mat(m) + "."), I(D),
                nn === 3 ? t("Regel von Sarrus oder Entwicklung nach einer Zeile mit vielen Nullen.", "Rule of Sarrus or expansion along a row with many zeros.") : t("Nach einer Zeile oder Spalte mit Nullen entwickeln oder auf Dreiecksform bringen.", "Expand along a row or column with zeros, or reduce to triangular form."),
                ["det A = " + D], near(D2, D, 1e-9));
        }
        var A3 = invertible(r, 3, -3, 4), b = [r.int(-6, 6), r.int(-6, 6), r.int(-6, 6)], D3 = det(A3), A2 = A3.map(function (rw, k) { var z = rw.slice(); z[1] = b[k]; return z; }), D22 = det(A2);
        return Q(t("Bestimme x<sub>2</sub> mit der Cramer'schen Regel für A x = b mit A = " + mat(A3) + " und b = " + vec(b) + ".", "Find x<sub>2</sub> with Cramer's rule for A x = b with A = " + mat(A3) + " and b = " + vec(b) + "."),
            A.frac(D22, D3), t("x<sub>2</sub> = det A<sub>2</sub> / det A, wobei in A<sub>2</sub> die zweite Spalte durch b ersetzt ist.", "x<sub>2</sub> = det A<sub>2</sub> / det A, where A<sub>2</sub> has the second column replaced by b."), ["det A = " + D3, "det A<sub>2</sub> = " + D22, "x<sub>2</sub> = " + q(D22, D3)], near(solve(A3, b)[1], D22 / D3, 1e-9));
    });

    // =============== Kap. 13 Vektorräume ===============
    add(13, "uvr", "Untervektorräume erkennen", "Recognising subspaces", function (r, d) {
        var YES = t("Ja, U ist ein Untervektorraum", "Yes, U is a subspace"), N0 = t("Nein, der Nullvektor fehlt", "No, the zero vector is missing"), NA = t("Nein, nicht abgeschlossen unter Addition", "No, not closed under addition"), NS = t("Nein, nicht abgeschlossen unter Vielfachen", "No, not closed under scalar multiples");
        var all = [YES, N0, NA, NS], set, ans, a = r.nz(-5, 5), b = r.nz(-5, 5), c = r.int(1, 6);
        if (d === 1) {
            var k = r.bool() ? 0 : r.nz(-6, 6);
            set = "U = {x ∈ ℝ³ | " + H.lin([[a, "x<sub>1</sub>"], [b, "x<sub>2</sub>"], [c, "x<sub>3</sub>"]]) + " = " + n(k) + "}"; ans = k === 0 ? YES : N0;
        } else if (d === 2) {
            var kind = r.int(0, 3);
            if (kind === 0) { set = "U = {x ∈ ℝ³ | x<sub>1</sub> = " + n(a) + " x<sub>2</sub>}"; ans = YES; }
            else if (kind === 1) { set = "U = {x ∈ ℝ³ | x<sub>1</sub> · x<sub>2</sub> = 0, x<sub>3</sub> = " + n(a) + " x<sub>1</sub>}"; ans = NA; }
            else if (kind === 2) { set = "U = {x ∈ ℝ² | x<sub>1</sub>² + " + c + " x<sub>2</sub>² = 0}"; ans = YES; }
            else { set = "U = {x ∈ ℝ² | x<sub>1</sub> ≥ 0, x<sub>2</sub> = " + n(a) + " x<sub>1</sub>}"; ans = NS; }
        } else {
            var kind3 = r.int(0, 3), m = r.nz(-4, 4);
            if (kind3 === 0) { set = "U = {A ∈ ℝ<sup>2×2</sup> | A<sup>T</sup> = A, a<sub>11</sub> = " + n(m) + " a<sub>22</sub>}"; ans = YES; }
            else if (kind3 === 1) { set = "U = {A ∈ ℝ<sup>2×2</sup> | det A = 0}"; ans = NA; if (r.bool()) set = "U = {A ∈ ℝ<sup>2×2</sup> | det A = 0, a<sub>12</sub> = " + n(m) + " a<sub>21</sub>}"; }
            else if (kind3 === 2) { set = "U = {p ∈ ℝ[x]<sub>2</sub> | p(" + n(m) + ") = 0}"; ans = YES; }
            else { set = "U = {p ∈ ℝ[x]<sub>2</sub> | p(" + n(m) + ") = " + c + "}"; ans = N0; }
        }
        var ok = ans === YES || ans === N0 || ans === NA || ans === NS;
        return Q(t("Ist " + set + " ein Untervektorraum?", "Is " + set + " a subspace?"), A.choice(r, ans, all.filter(function (x) { return x !== ans; })),
            t("Prüfe: Liegt der Nullvektor drin? Bleiben Summen und Vielfache in U?", "Check: is the zero vector in U? Do sums and multiples stay in U?"), [ans], ok);
    });

    // =============== Kap. 14 lineare Unabhängigkeit ===============
    add(14, "linu", "Lineare Unabhängigkeit und Rang", "Linear independence and rank", function (r, d) {
        if (d === 1) {
            var k = r.int(-3, 3), mm = r.int(-3, 3), s = r.pick([-1, 1]), a = 1, b = k, c = mm, e = k * mm + s;
            var col = [[a, b, r.int(-4, 4)], [c, e, r.int(-4, 4)], [r.int(-4, 4), r.int(-4, 4), 0]];
            var d0 = det(col), cof = det2([[a, b], [c, e]]), rr = -d0 / cof, M1 = col.map(function (x) { return x.slice(); }); M1[2][2] = rr;
            var v1 = [M1[0][0], M1[1][0], M1[2][0]], v2 = [M1[0][1], M1[1][1], M1[2][1]];
            return Q(t("Für welches r ∈ ℝ sind die Vektoren " + vec(v1) + ", " + vec(v2) + " und " + vec([M1[0][2], M1[1][2], "r"]) + " linear abhängig?", "For which r ∈ ℝ are the vectors " + vec(v1) + ", " + vec(v2) + " and " + vec([M1[0][2], M1[1][2], "r"]) + " linearly dependent?"),
                I(rr), t("Drei Vektoren im ℝ³ sind genau dann abhängig, wenn ihre Determinante null ist.", "Three vectors in ℝ³ are dependent exactly when their determinant is zero."), ["det = " + cof + " · r " + H.sg(d0) + " = 0", "r = " + rr], det(M1) === 0);
        }
        var rows = d === 2 ? 4 : 3, dim = d === 2 ? 3 : 4, rk = r.int(2, 3), base = [];
        for (var i = 0; i < rk; i += 1) { var v = []; for (var j = 0; j < dim; j += 1) v.push(r.int(-3, 3)); base.push(v); }
        if (rank(base) < rk) { base[0][0] += 7; if (rank(base) < rk) base[1][dim - 1] += 5; }
        rk = rank(base);
        var vs = base.slice();
        while (vs.length < rows) { var c1 = r.int(-2, 2), c2 = r.nz(-2, 2), comb = base[0].map(function (x, k2) { return c1 * x + c2 * base[1][k2]; }); vs.push(comb); }
        vs = r.shuffle(vs);
        return Q(t("Welche Dimension hat der von " + vs.map(vec).join(", ") + " aufgespannte Raum?", "What is the dimension of the span of " + vs.map(vec).join(", ") + "?"),
            I(rk), t("Schreibe die Vektoren als Zeilen einer Matrix und bringe sie auf Zeilenstufenform. Die Anzahl der Nicht-Null-Zeilen ist der Rang.", "Write the vectors as rows of a matrix and bring it to echelon form. The number of non-zero rows is the rank."),
            [t("Rang = ", "rank = ") + rk, "dim = " + rk], rank(vs) === rk);
    });

    // =============== Kap. 15 Basen ===============
    add(15, "basis", "Basen, Koordinaten, Dimension", "Bases, coordinates, dimension", function (r, d) {
        if (d === 1) {
            var u = [r.int(-3, 3), r.int(-3, 3), r.nz(-3, 3)], v = [r.nz(-3, 3), r.int(-3, 3), r.int(-3, 3)];
            if (rank([u, v]) < 2) v[1] += 2;
            var la = r.nz(-4, 4), mu = r.nz(-4, 4), p = u.map(function (x, k) { return la * x + mu * v[k]; });
            return Q(t("Stelle p = " + vec(p) + " als Linearkombination p = λ u + μ v mit u = " + vec(u) + " und v = " + vec(v) + " dar.", "Write p = " + vec(p) + " as a linear combination p = λ u + μ v with u = " + vec(u) + " and v = " + vec(v) + "."),
                A.multi([{ l: "λ", a: I(la) }, { l: "μ", a: I(mu) }]), t("Löse das überbestimmte System λ u + μ v = p aus zwei Zeilen und prüfe mit der dritten.", "Solve the overdetermined system λ u + μ v = p from two rows and check with the third."), ["λ = " + la + ", μ = " + mu], p.every(function (x, k) { return x === la * u[k] + mu * v[k]; }));
        }
        if (d === 2) {
            var m = r.int(2, 4), nn = r.int(m + 1, 5), rows = [];
            for (var i = 0; i < m; i += 1) { var row = []; for (var j = 0; j < nn; j += 1) row.push(r.int(-3, 3)); rows.push(row); }
            if (r.bool() && m > 2) rows[m - 1] = rows[0].map(function (x, k) { return x + rows[1][k]; });
            var rk = rank(rows), dim = nn - rk, vars = ["x<sub>1</sub>", "x<sub>2</sub>", "x<sub>3</sub>", "x<sub>4</sub>", "x<sub>5</sub>"];
            return Q(t("Welche Dimension hat der Lösungsraum des homogenen Systems?<br>", "What is the dimension of the solution space of the homogeneous system?<br>") + sys(rows, rows.map(function () { return 0; }), vars),
                I(dim), t("dim Lösungsraum = Anzahl der Unbekannten − Rang.", "dim solution space = number of unknowns − rank."), [t("Rang = ", "rank = ") + rk, "dim = " + nn + " − " + rk + " = " + dim], dim >= nn - m);
        }
        var c0 = r.int(-6, 6), c1 = r.int(-6, 6), c2 = r.nz(-4, 4), cc = c2, bb = -c1 - 2 * c2, aa = c0 - bb - cc, xt = 2.5;
        return Q(t("Gib die Koordinaten von p(x) = " + poly([c2, c1, c0]) + " bezüglich der Basis B = (1, 1 − x, (1 − x)²) an: p = a · 1 + b (1 − x) + c (1 − x)².", "Give the coordinates of p(x) = " + poly([c2, c1, c0]) + " with respect to the basis B = (1, 1 − x, (1 − x)²): p = a · 1 + b (1 − x) + c (1 − x)²."),
            A.multi([{ l: "a", a: I(aa) }, { l: "b", a: I(bb) }, { l: "c", a: I(cc) }]), t("Ausmultiplizieren und Koeffizienten von x², x und 1 vergleichen.", "Multiply out and compare the coefficients of x², x and 1."),
            ["x²: c = " + cc, "x: −b − 2c = " + c1 + " ⇒ b = " + bb, "1: a + b + c = " + c0 + " ⇒ a = " + aa], near(c2 * xt * xt + c1 * xt + c0, aa + bb * (1 - xt) + cc * (1 - xt) * (1 - xt), 1e-12));
    });

    // =============== Kap. 16 Orthogonalität I ===============
    add(16, "skalar", "Skalarprodukte und Winkel", "Inner products and angles", function (r, d) {
        if (d === 1) {
            var v = [r.int(-4, 4), r.int(-4, 4), r.nz(-4, 4)], w = [r.nz(-4, 4), r.int(-4, 4), r.int(-4, 4)];
            var dot = v[0] * w[0] + v[1] * w[1] + v[2] * w[2], nv = Math.hypot(v[0], v[1], v[2]), nw = Math.hypot(w[0], w[1], w[2]), ang = Math.acos(Math.max(-1, Math.min(1, dot / nv / nw))) * DEG;
            return Q(t("Berechne den Winkel zwischen v = " + vec(v) + " und w = " + vec(w) + " in Grad (auf 0,1).", "Compute the angle between v = " + vec(v) + " and w = " + vec(w) + " in degrees (to 0.1)."),
                nm(ang, 1, "°"), "cos φ = ⟨v, w⟩ / (‖v‖ ‖w‖).", ["⟨v, w⟩ = " + dot, "‖v‖ = " + n(nv, 4) + ", ‖w‖ = " + n(nw, 4), "φ = " + n(ang, 1) + "°"], near(Math.cos(ang / DEG) * nv * nw, dot, 1e-7));
        }
        if (d === 2) {
            var kind = r.int(0, 2), a = r.int(1, 6), b = r.int(-3, 3), c = r.int(1, 6), Am, ans;
            var YES = t("Ja, es ist ein Skalarprodukt", "Yes, it is an inner product"), NSY = t("Nein, A ist nicht symmetrisch", "No, A is not symmetric"), NPD = t("Nein, A ist nicht positiv definit", "No, A is not positive definite");
            if (kind === 0) { if (a * c <= b * b) c = Math.floor(b * b / a) + 1 + r.int(0, 3); Am = [[a, b], [b, c]]; ans = YES; }
            else if (kind === 1) { var bb = r.nz(1, 3) + Math.ceil(Math.sqrt(a * c)); Am = [[a, bb], [bb, c]]; ans = NPD; }
            else { Am = [[a, b], [b + r.nz(-3, 3), c]]; ans = NSY; }
            var okd = kind === 0 ? (Am[0][0] > 0 && det2(Am) > 0) : kind === 1 ? det2(Am) <= 0 : Am[0][1] !== Am[1][0];
            return Q(t("Ist ⟨x, y⟩ = x<sup>T</sup> A y mit A = " + mat(Am) + " ein Skalarprodukt auf ℝ²?", "Is ⟨x, y⟩ = x<sup>T</sup> A y with A = " + mat(Am) + " an inner product on ℝ²?"),
                A.choice(r, ans, [YES, NSY, NPD].filter(function (x) { return x !== ans; })), t("Nötig sind Symmetrie und positive Definitheit: a<sub>11</sub> > 0 und det A > 0.", "Needed are symmetry and positive definiteness: a<sub>11</sub> > 0 and det A > 0."), [ans + " (det A = " + det2(Am) + ")"], okd);
        }
        var p0 = r.int(-3, 3), p1 = r.nz(-3, 3), q0 = r.nz(-3, 3), q1 = r.int(-3, 3);
        var ip = function (a0, a1, b0, b1) { return a0 * b0 + (a0 * b1 + a1 * b0) / 2 + a1 * b1 / 3; };
        var pq = ip(p0, p1, q0, q1), pp = ip(p0, p1, p0, p1), qq = ip(q0, q1, q0, q1), ang2 = Math.acos(Math.max(-1, Math.min(1, pq / Math.sqrt(pp * qq)))) * DEG;
        return Q(t("Im Raum der Polynome mit ⟨p, q⟩ = ∫<sub>0</sub><sup>1</sup> p(x) q(x) dx: Berechne den Winkel zwischen p(x) = " + poly([p1, p0]) + " und q(x) = " + poly([q1, q0]) + " in Grad (auf 0,1).", "In the space of polynomials with ⟨p, q⟩ = ∫<sub>0</sub><sup>1</sup> p(x) q(x) dx: compute the angle between p(x) = " + poly([p1, p0]) + " and q(x) = " + poly([q1, q0]) + " in degrees (to 0.1)."),
            nm(ang2, 1, "°"), t("Berechne ⟨p, q⟩, ‖p‖² und ‖q‖² als Integrale.", "Compute ⟨p, q⟩, ‖p‖² and ‖q‖² as integrals."), ["⟨p, q⟩ = " + n(pq, 4), "‖p‖² = " + n(pp, 4) + ", ‖q‖² = " + n(qq, 4), "φ = " + n(ang2, 1) + "°"],
            near(simpson(function (x) { return (p0 + p1 * x) * (q0 + q1 * x); }, 0, 1, 50), pq, 1e-9));
    });

    // =============== Kap. 17 Orthogonalität II ===============
    function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
    add(17, "kreuz", "Kreuzprodukt, Fläche, Spatvolumen", "Cross product, area, volume", function (r, d) {
        var p = [r.int(-4, 4), r.int(-4, 4), r.nz(-4, 4)], qv = [r.nz(-4, 4), r.int(-4, 4), r.int(-4, 4)], c = cross(p, qv);
        if (c[0] === 0 && c[1] === 0 && c[2] === 0) { qv[1] += 1; c = cross(p, qv); }
        if (d === 1) return Q(t("Berechne p × q für p = " + vec(p) + " und q = " + vec(qv) + ".", "Compute p × q for p = " + vec(p) + " and q = " + vec(qv) + "."),
            A.multi(c.map(function (x, k) { return { l: t(k + 1 + ". Komponente", "component " + (k + 1)), a: I(x) }; })), "p × q = (p<sub>2</sub>q<sub>3</sub> − p<sub>3</sub>q<sub>2</sub>, p<sub>3</sub>q<sub>1</sub> − p<sub>1</sub>q<sub>3</sub>, p<sub>1</sub>q<sub>2</sub> − p<sub>2</sub>q<sub>1</sub>).",
            ["p × q = " + vec(c), t("Probe: (p × q) · p = 0", "check: (p × q) · p = 0")], c[0] * p[0] + c[1] * p[1] + c[2] * p[2] === 0 && c[0] * qv[0] + c[1] * qv[1] + c[2] * qv[2] === 0);
        if (d === 2) { var F = Math.hypot(c[0], c[1], c[2]), np = Math.hypot(p[0], p[1], p[2]), nq = Math.hypot(qv[0], qv[1], qv[2]), dt = p[0] * qv[0] + p[1] * qv[1] + p[2] * qv[2];
            return Q(t("Wie groß ist die Fläche des von p = " + vec(p) + " und q = " + vec(qv) + " aufgespannten Parallelogramms (auf 0,01)?", "What is the area of the parallelogram spanned by p = " + vec(p) + " and q = " + vec(qv) + " (to 0.01)?"),
                nm(F, 2), t("F = ‖p × q‖.", "F = ‖p × q‖."), ["p × q = " + vec(c), "F = " + n(F, 2)], near(F * F, np * np * nq * nq - dt * dt, 1e-9)); }
        var rv = [r.int(-3, 3), r.nz(-3, 3), r.int(-3, 3)], V = Math.abs(c[0] * rv[0] + c[1] * rv[1] + c[2] * rv[2]);
        if (V === 0) { rv[2] += 1; V = Math.abs(c[0] * rv[0] + c[1] * rv[1] + c[2] * rv[2]); }
        return Q(t("Berechne das Volumen des von p = " + vec(p) + ", q = " + vec(qv) + " und r = " + vec(rv) + " aufgespannten Spats.", "Compute the volume of the parallelepiped spanned by p = " + vec(p) + ", q = " + vec(qv) + " and r = " + vec(rv) + "."),
            I(V), t("V = |(p × q) · r| = |det(p, q, r)|.", "V = |(p × q) · r| = |det(p, q, r)|."), ["(p × q) · r = " + (c[0] * rv[0] + c[1] * rv[1] + c[2] * rv[2]), "V = " + V], Math.abs(det([p, qv, rv])) === V);
    });

    // =============== Kap. 18 Ausgleichsproblem ===============
    add(18, "ausgleich", "Ausgleichsgerade und Projektion", "Best-fit line and projection", function (r, d) {
        if (d === 1) {
            var N = r.int(4, 5), xs = [], ys = [], a0 = r.int(-3, 3), b0 = r.pick([-2, -1, 1, 2, 0.5]);
            for (var i = 0; i < N; i += 1) { xs.push(i + r.int(0, 1) * 0 + i); }
            xs = xs.map(function (x, k) { return k * 2 - r.int(0, 1) * 0; });
            for (var j = 0; j < N; j += 1) ys.push(a0 + b0 * xs[j] + r.int(-2, 2));
            var sx = 0, sy = 0, sxx = 0, sxy = 0; for (var k = 0; k < N; k += 1) { sx += xs[k]; sy += ys[k]; sxx += xs[k] * xs[k]; sxy += xs[k] * ys[k]; }
            var b = (N * sxy - sx * sy) / (N * sxx - sx * sx), a = (sy - b * sx) / N;
            var res = 0, resx = 0; for (var k2 = 0; k2 < N; k2 += 1) { var e = ys[k2] - a - b * xs[k2]; res += e; resx += e * xs[k2]; }
            return Q(t("Bestimme die Ausgleichsgerade y = a + b x durch die Punkte " + xs.map(function (x, k) { return "(" + x + " | " + n(ys[k]) + ")"; }).join(", ") + " (auf 0,001).", "Find the least-squares line y = a + b x through the points " + xs.map(function (x, k) { return "(" + x + ", " + n(ys[k]) + ")"; }).join(", ") + " (to 0.001)."),
                A.multi([{ l: "a", a: nm(a, 3) }, { l: "b", a: nm(b, 3) }]), t("Normalgleichung A<sup>T</sup>A (a, b)<sup>T</sup> = A<sup>T</sup> y mit den Zeilen (1, x<sub>i</sub>).", "Normal equations A<sup>T</sup>A (a, b)<sup>T</sup> = A<sup>T</sup> y with rows (1, x<sub>i</sub>)."),
                ["Σx = " + sx + ", Σy = " + n(sy) + ", Σx² = " + sxx + ", Σxy = " + n(sxy), "b = " + n(b, 4) + ", a = " + n(a, 4)], Math.abs(res) < 1e-9 && Math.abs(resx) < 1e-9);
        }
        var dim = r.int(2, 3), bvec = [], v = [];
        for (var i2 = 0; i2 < dim; i2 += 1) { bvec.push(r.int(-3, 3)); v.push(r.int(-6, 6)); }
        if (bvec.every(function (x) { return x === 0; })) bvec[0] = 2;
        var bb = bvec.reduce(function (s, x) { return s + x * x; }, 0), vb = bvec.reduce(function (s, x, k) { return s + x * v[k]; }, 0);
        if (d === 2) return Q(t("Berechne die orthogonale Projektion von v = " + vec(v) + " auf U = ⟨b⟩ mit b = " + vec(bvec) + ".", "Compute the orthogonal projection of v = " + vec(v) + " onto U = ⟨b⟩ with b = " + vec(bvec) + "."),
            A.multi(bvec.map(function (x, k) { return { l: t(k + 1 + ". Komponente", "component " + (k + 1)), a: A.frac(vb * x, bb) }; })), "u = (⟨v, b⟩ / ⟨b, b⟩) b.", ["⟨v, b⟩ = " + vb + ", ⟨b, b⟩ = " + bb, "u = " + q(vb, bb) + " · " + vec(bvec)],
            near(v.reduce(function (s, x, k) { return s + (x - vb / bb * bvec[k]) * bvec[k]; }, 0), 0, 1e-9));
        var dist = Math.sqrt(v.reduce(function (s, x, k) { var e = x - vb / bb * bvec[k]; return s + e * e; }, 0)), vv = v.reduce(function (s, x) { return s + x * x; }, 0);
        return Q(t("Wie groß ist der Abstand von v = " + vec(v) + " zur Geraden U = ⟨b⟩ mit b = " + vec(bvec) + " (auf 0,001)?", "What is the distance of v = " + vec(v) + " to the line U = ⟨b⟩ with b = " + vec(bvec) + " (to 0.001)?"),
            nm(dist, 3), t("Zerlege v = u + u<sup>⊥</sup>. Der Abstand ist ‖u<sup>⊥</sup>‖.", "Split v = u + u<sup>⊥</sup>. The distance is ‖u<sup>⊥</sup>‖."), ["u = " + q(vb, bb) + " · b", "‖u<sup>⊥</sup>‖ = " + n(dist, 3)], near(dist * dist, vv - vb * vb / bb, 1e-9));
    });

    // =============== Kap. 19 QR ===============
    var PYT = [[3, 4], [4, 3], [1, 0], [0, 1], [6, 8], [5, 12], [12, 5]], PYT3 = [[1, 2, 2], [2, 1, 2], [2, 2, 1], [2, 3, 6], [1, 4, 8], [4, 4, 7]];
    add(19, "qr", "QR-Zerlegung", "QR decomposition", function (r, d) {
        var c1 = d === 1 ? r.pick(PYT) : r.pick(PYT3), sg = r.sign();
        c1 = c1.map(function (x, k) { return k === 0 ? sg * x : x; });
        var dim = c1.length, c2 = []; for (var i = 0; i < dim; i += 1) c2.push(r.int(-5, 5));
        var r11 = Math.hypot.apply(null, c1), qq1 = c1.map(function (x) { return x / r11; }), r12 = qq1.reduce(function (s, x, k) { return s + x * c2[k]; }, 0), w = c2.map(function (x, k) { return x - r12 * qq1[k]; }), r22 = Math.hypot.apply(null, w);
        if (r22 < 0.5) { c2[dim - 1] += 3; r12 = qq1.reduce(function (s, x, k) { return s + x * c2[k]; }, 0); w = c2.map(function (x, k) { return x - r12 * qq1[k]; }); r22 = Math.hypot.apply(null, w); }
        var Am = c1.map(function (x, k) { return [x, c2[k]]; });
        if (d < 3) return Q(t("Bestimme die QR-Zerlegung von A = " + mat(Am) + " mit Gram-Schmidt (Diagonale von R positiv). Gib r<sub>11</sub>, r<sub>12</sub>, r<sub>22</sub> an (auf 0,001).", "Find the QR decomposition of A = " + mat(Am) + " with Gram-Schmidt (positive diagonal of R). Give r<sub>11</sub>, r<sub>12</sub>, r<sub>22</sub> (to 0.001)."),
            A.multi([{ l: "r<sub>11</sub>", a: nm(r11, 3) }, { l: "r<sub>12</sub>", a: nm(r12, 3) }, { l: "r<sub>22</sub>", a: nm(r22, 3) }]), t("r<sub>11</sub> = ‖a<sub>1</sub>‖, q<sub>1</sub> = a<sub>1</sub>/r<sub>11</sub>, r<sub>12</sub> = ⟨q<sub>1</sub>, a<sub>2</sub>⟩, r<sub>22</sub> = ‖a<sub>2</sub> − r<sub>12</sub> q<sub>1</sub>‖.", "r<sub>11</sub> = ‖a<sub>1</sub>‖, q<sub>1</sub> = a<sub>1</sub>/r<sub>11</sub>, r<sub>12</sub> = ⟨q<sub>1</sub>, a<sub>2</sub>⟩, r<sub>22</sub> = ‖a<sub>2</sub> − r<sub>12</sub> q<sub>1</sub>‖."),
            ["r<sub>11</sub> = " + n(r11, 3), "r<sub>12</sub> = " + n(r12, 3), "r<sub>22</sub> = " + n(r22, 3)], near(r11 * r11 + 0, c1.reduce(function (s, x) { return s + x * x; }, 0), 1e-9) && near(r12 * r12 + r22 * r22, c2.reduce(function (s, x) { return s + x * x; }, 0), 1e-9));
        var b = []; for (var j = 0; j < dim; j += 1) b.push(r.int(-6, 6));
        var AtA = [[0, 0], [0, 0]], Atb = [0, 0];
        for (var k = 0; k < dim; k += 1) { AtA[0][0] += Am[k][0] * Am[k][0]; AtA[0][1] += Am[k][0] * Am[k][1]; AtA[1][1] += Am[k][1] * Am[k][1]; Atb[0] += Am[k][0] * b[k]; Atb[1] += Am[k][1] * b[k]; }
        AtA[1][0] = AtA[0][1];
        var x = solve(AtA, Atb), qtb1 = qq1.reduce(function (s, v, k) { return s + v * b[k]; }, 0), q2 = w.map(function (v) { return v / r22; }), qtb2 = q2.reduce(function (s, v, k) { return s + v * b[k]; }, 0), x2 = qtb2 / r22, x1 = (qtb1 - r12 * x2) / r11;
        return Q(t("Löse das Ausgleichsproblem ‖A x − b‖ = min für A = " + mat(Am) + " und b = " + vec(b) + " (auf 0,001).", "Solve the least-squares problem ‖A x − b‖ = min for A = " + mat(Am) + " and b = " + vec(b) + " (to 0.001)."),
            A.multi([{ l: "x<sub>1</sub>", a: nm(x[0], 3) }, { l: "x<sub>2</sub>", a: nm(x[1], 3) }]), t("Mit A = QR: R x = Q<sup>T</sup> b. Oder über die Normalgleichung.", "With A = QR: R x = Q<sup>T</sup> b. Or via the normal equations."),
            ["A<sup>T</sup>A = " + mat(AtA) + ", A<sup>T</sup>b = " + vec(Atb), "x = (" + n(x[0], 3) + ", " + n(x[1], 3) + ")"], near(x1, x[0], 1e-7) && near(x2, x[1], 1e-7));
    });

    // =============== Kap. 20 Folgen ===============
    add(20, "folgen", "Folgen und ihre Grenzwerte", "Sequences and their limits", function (r, d) {
        if (d === 1) {
            var a = r.nz(-6, 6), b = r.int(-9, 9), c = r.nz(1, 6), e = r.int(-9, 9);
            return Q(t("Bestimme den Grenzwert der Folge a<sub>n</sub> = (" + H.lin([[a, "n"], [b, ""]]) + ") / (" + H.lin([[c, "n"], [e, ""]]) + ").", "Find the limit of the sequence a<sub>n</sub> = (" + H.lin([[a, "n"], [b, ""]]) + ") / (" + H.lin([[c, "n"], [e, ""]]) + ")."),
                A.frac(a, c), t("Zähler und Nenner durch n teilen.", "Divide numerator and denominator by n."), ["a<sub>n</sub> = (" + a + " + " + b + "/n) / (" + c + " + " + e + "/n) → " + q(a, c)], near((a * 1e9 + b) / (c * 1e9 + e), a / c, 1e-6));
        }
        if (d === 2) {
            var qd = r.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5]]), rr = r.nz(-6, 6), a0 = r.int(-5, 5), L = rr * qd[1] / (qd[1] - qd[0]), x = a0;
            for (var i = 0; i < 200; i += 1) x = qd[0] / qd[1] * x + rr;
            return Q(t("Die Folge ist rekursiv definiert durch a<sub>0</sub> = " + a0 + " und a<sub>n+1</sub> = " + q(qd[0], qd[1]) + " a<sub>n</sub> " + H.sg(rr) + ". Gegen welchen Wert konvergiert sie?", "The sequence is defined recursively by a<sub>0</sub> = " + a0 + " and a<sub>n+1</sub> = " + q(qd[0], qd[1]) + " a<sub>n</sub> " + H.sg(rr) + ". What does it converge to?"),
                A.frac(rr * qd[1], qd[1] - qd[0]), t("Der Grenzwert a erfüllt a = " + q(qd[0], qd[1]) + " a " + H.sg(rr) + ".", "The limit a satisfies a = " + q(qd[0], qd[1]) + " a " + H.sg(rr) + "."), ["a (1 − " + q(qd[0], qd[1]) + ") = " + rr, "a = " + q(rr * qd[1], qd[1] - qd[0])], near(x, L, 1e-9));
        }
        var c3 = r.pick([2, 3, 5, 6, 7, 10, 11, 13]), a1 = r.int(1, 4), x1 = (a1 + c3 / a1) / 2, x2 = (x1 + c3 / x1) / 2;
        return Q(t("Die Folge a<sub>n+1</sub> = ½ (a<sub>n</sub> + " + c3 + "/a<sub>n</sub>) mit a<sub>0</sub> = " + a1 + " konvergiert gegen √" + c3 + ". Berechne a<sub>2</sub> (auf 0,0001).", "The sequence a<sub>n+1</sub> = ½ (a<sub>n</sub> + " + c3 + "/a<sub>n</sub>) with a<sub>0</sub> = " + a1 + " converges to √" + c3 + ". Compute a<sub>2</sub> (to 0.0001)."),
            nm(x2, 4), t("Zweimal einsetzen.", "Substitute twice."), ["a<sub>1</sub> = " + n(x1, 6), "a<sub>2</sub> = " + n(x2, 6), "√" + c3 + " = " + n(Math.sqrt(c3), 6)], x2 >= Math.sqrt(c3) - 1e-12 && Math.abs(x2 - Math.sqrt(c3)) <= Math.abs(x1 - Math.sqrt(c3)) + 1e-12);
    });

    // =============== Kap. 21 Grenzwerte ===============
    add(21, "grenz", "Grenzwerte von Folgen berechnen", "Computing limits", function (r, d) {
        var N = 1e6;
        if (d === 1) {
            var p = r.nz(1, 5), qq = r.int(-5, 5), rr = r.nz(-4, 4), s = r.int(-5, 5), tt = r.nz(1, 6), u = r.int(-5, 5), v = r.int(1, 9);
            var f = function (k) { return (p * k + qq) * (rr * k + s) / (tt * k * k + u * k - v); };
            return Q(t("Berechne lim<sub>n→∞</sub> (" + H.lin([[p, "n"], [qq, ""]]) + ")(" + H.lin([[rr, "n"], [s, ""]]) + ") / (" + poly([tt, u, -v], "n") + ").", "Compute lim<sub>n→∞</sub> (" + H.lin([[p, "n"], [qq, ""]]) + ")(" + H.lin([[rr, "n"], [s, ""]]) + ") / (" + poly([tt, u, -v], "n") + ")."),
                A.frac(p * rr, tt), t("Zähler und Nenner haben Grad 2: nur die Leitkoeffizienten zählen.", "Numerator and denominator have degree 2: only the leading coefficients count."), [t("Leitkoeffizient Zähler: ", "leading coefficient numerator: ") + p * rr, t("Grenzwert: ", "limit: ") + q(p * rr, tt)], near(f(N), p * rr / tt, 1e-4));
        }
        if (d === 2) {
            var a = r.int(1, 9), b = r.int(-9, 9); if (a === b) b -= 1;
            var g = function (k) { return Math.sqrt(k * k + a * k) - Math.sqrt(k * k + b * k); };
            return Q(t("Berechne lim<sub>n→∞</sub> (√(n² + " + a + "n) − √(" + poly([1, b, 0], "n") + ")).", "Compute lim<sub>n→∞</sub> (√(n² + " + a + "n) − √(" + poly([1, b, 0], "n") + "))."),
                A.frac(a - b, 2), t("Mit der Summe der Wurzeln erweitern (dritte binomische Formel).", "Multiply by the sum of the roots (difference of squares)."), ["= (" + (a - b) + "n) / (√(n² + " + a + "n) + √(n² " + H.sg(b) + "n))", "→ " + q(a - b, 2)], near(g(1e5), (a - b) / 2, 1e-4));
        }
        var aa = r.nz(-3, 3), bb = r.int(1, 3), val = Math.exp(aa * bb), h = function (k) { return Math.pow(1 + aa / k, bb * k); };
        return Q(t("Berechne lim<sub>n→∞</sub> (1 " + H.sg(aa) + "/n)<sup>" + (bb === 1 ? "" : bb) + "n</sup> (auf 0,0001).", "Compute lim<sub>n→∞</sub> (1 " + H.sg(aa) + "/n)<sup>" + (bb === 1 ? "" : bb) + "n</sup> (to 0.0001)."),
            nm(val, 4), t("(1 + a/n)<sup>n</sup> → e<sup>a</sup>. Der Faktor im Exponenten bleibt stehen.", "(1 + a/n)<sup>n</sup> → e<sup>a</sup>. The factor in the exponent stays."), ["= ((1 " + H.sg(aa) + "/n)<sup>n</sup>)<sup>" + bb + "</sup> → e<sup>" + aa * bb + "</sup> = " + n(val, 4)], near(h(1e7), val, 1e-5));
    });

    // =============== Kap. 22 Reihen ===============
    add(22, "reihen", "Reihen summieren und prüfen", "Summing and testing series", function (r, d) {
        if (d === 1) {
            var a = r.int(0, 5), c = r.int(1, 9), s = 0; for (var k = 1; k < 200000; k += 1) s += c / ((k + a) * (k + a + 1));
            return Q(t("Berechne Σ<sub>k=1</sub><sup>∞</sup> " + c + " / ((k + " + a + ")(k + " + (a + 1) + ")).", "Compute Σ<sub>k=1</sub><sup>∞</sup> " + c + " / ((k + " + a + ")(k + " + (a + 1) + "))."),
                A.frac(c, a + 1), t("Partialbrüche: 1/((k+a)(k+a+1)) = 1/(k+a) − 1/(k+a+1). Teleskopsumme.", "Partial fractions: 1/((k+a)(k+a+1)) = 1/(k+a) − 1/(k+a+1). Telescoping sum."), ["s<sub>n</sub> = " + c + " (1/" + (a + 1) + " − 1/(n + " + (a + 1) + "))", "→ " + q(c, a + 1)], near(s, c / (a + 1), 1e-4));
        }
        if (d === 2) {
            var qd = r.pick([[1, 2], [1, 3], [2, 3], [-1, 2], [-1, 3], [3, 4], [-2, 3]]), cc = r.nz(-5, 5), m = r.int(0, 2), num = cc * Math.pow(qd[0], m) * qd[1], den = Math.pow(qd[1], m) * (qd[1] - qd[0]), s2 = 0;
            for (var j = m; j < 400; j += 1) s2 += cc * Math.pow(qd[0] / qd[1], j);
            return Q(t("Berechne Σ<sub>k=" + m + "</sub><sup>∞</sup> " + cc + " · (" + q(qd[0], qd[1]) + ")<sup>k</sup>.", "Compute Σ<sub>k=" + m + "</sub><sup>∞</sup> " + cc + " · (" + q(qd[0], qd[1]) + ")<sup>k</sup>."),
                A.frac(num, den), t("Geometrische Reihe: erstes Glied durch (1 − q).", "Geometric series: first term divided by (1 − q)."), [t("erstes Glied: ", "first term: ") + q(cc * Math.pow(qd[0], m), Math.pow(qd[1], m)), "= " + q(num, den)], near(s2, num / den, 1e-9));
        }
        var AK = t("absolut konvergent", "absolutely convergent"), BK = t("konvergent, aber nicht absolut", "convergent, but not absolutely"), DV = t("divergent", "divergent"), kind = r.int(0, 5), al = r.int(2, 5), b = r.int(2, 9), ser, ans;
        if (kind === 0) { ser = "Σ k<sup>" + al + "</sup> / " + b + "<sup>k</sup>"; ans = AK; }
        else if (kind === 1) { ser = "Σ " + b + "<sup>k</sup> / k<sup>" + al + "</sup>"; ans = DV; }
        else if (kind === 2) { ser = "Σ (−1)<sup>k</sup> / (k + " + b + ")"; ans = BK; }
        else if (kind === 3) { ser = "Σ (k + " + b + ") / k<sup>2</sup>"; ans = DV; }
        else if (kind === 4) { ser = "Σ " + b + " / k<sup>" + al + "</sup>"; ans = AK; }
        else { ser = "Σ k! / (" + b + "k)<sup>k</sup>"; ans = AK; }
        return Q(t("Untersuche die Reihe " + ser + " (k = 1 bis ∞) auf Konvergenz.", "Test the series " + ser + " (k = 1 to ∞) for convergence."), A.choice(r, ans, [AK, BK, DV].filter(function (x) { return x !== ans; })),
            t("Quotientenkriterium bei Fakultäten und Potenzen, Leibniz bei alternierenden Reihen, Vergleich mit Σ 1/k<sup>α</sup>.", "Ratio test for factorials and powers, Leibniz for alternating series, comparison with Σ 1/k<sup>α</sup>."), [ans], true);
    });

    // =============== Kap. 23 Abbildungen ===============
    add(23, "abb", "Bild, Umkehrabbildung, Injektivität", "Image, inverse, injectivity", function (r, d) {
        if (d === 1) {
            var m = r.nz(-4, 4), c = r.int(-6, 6), p = r.int(-5, 2), qq = p + r.int(1, 6), v1 = m * p + c, v2 = m * qq + c;
            return Q(t("Bestimme das Bild von f: [" + p + ", " + qq + "] → ℝ, f(x) = " + H.lin([[m, "x"], [c, ""]]) + ". Gib die Intervallgrenzen an.", "Find the image of f: [" + p + ", " + qq + "] → ℝ, f(x) = " + H.lin([[m, "x"], [c, ""]]) + ". Give the interval bounds."),
                A.multi([{ l: t("untere Grenze", "lower bound"), a: I(Math.min(v1, v2)) }, { l: t("obere Grenze", "upper bound"), a: I(Math.max(v1, v2)) }]), t("Eine lineare Funktion ist monoton: Bild = [min, max] der Randwerte.", "A linear function is monotone: image = [min, max] of the end values."), ["f(" + p + ") = " + v1 + ", f(" + qq + ") = " + v2], Math.min(v1, v2) <= Math.max(v1, v2));
        }
        if (d === 2) {
            var a = r.nz(-4, 4), b = r.int(-5, 5), c2 = r.nz(-3, 3), e = r.int(-5, 5); if (a * e - b * c2 === 0) e += 1;
            var y0 = r.int(-5, 5); if (c2 * y0 - a === 0) y0 += 1;
            var xn = b - e * y0, xd = c2 * y0 - a;
            return Q(t("f(x) = (" + H.lin([[a, "x"], [b, ""]]) + ") / (" + H.lin([[c2, "x"], [e, ""]]) + ") ist auf ihrem Definitionsbereich injektiv. Berechne f<sup>−1</sup>(" + y0 + ").", "f(x) = (" + H.lin([[a, "x"], [b, ""]]) + ") / (" + H.lin([[c2, "x"], [e, ""]]) + ") is injective on its domain. Compute f<sup>−1</sup>(" + y0 + ")."),
                A.frac(xn, xd), t("Setze f(x) = y und löse nach x auf.", "Set f(x) = y and solve for x."), [y0 + " (" + H.lin([[c2, "x"], [e, ""]]) + ") = " + H.lin([[a, "x"], [b, ""]]), "x = " + q(xn, xd)], near((a * xn / xd + b) / (c2 * xn / xd + e), y0, 1e-9));
        }
        var BI = t("bijektiv", "bijective"), IN = t("injektiv, nicht surjektiv", "injective, not surjective"), SU = t("surjektiv, nicht injektiv", "surjective, not injective"), WN = t("weder injektiv noch surjektiv", "neither injective nor surjective");
        var k = r.int(0, 5), a3 = r.nz(-4, 4), b3 = r.int(1, 5), fx, ans;
        if (k === 0) { fx = "f: ℝ → ℝ, x ↦ " + H.lin([[a3, "x"], [b3, ""]]); ans = BI; }
        else if (k === 1) { fx = "f: ℝ → ℝ, x ↦ " + poly([1, 2 * a3, b3]); ans = WN; }
        else if (k === 2) { fx = "f: [0, ∞) → ℝ, x ↦ x² + " + b3; ans = IN; }
        else if (k === 3) { fx = "f: ℝ → ℝ, x ↦ x³ − " + b3 + "x"; ans = SU; }
        else if (k === 4) { fx = "f: ℝ → ℝ, x ↦ " + b3 + " e<sup>x</sup>"; ans = IN; }
        else { fx = "f: ℝ → (0, ∞), x ↦ " + b3 + " e<sup>x</sup>"; ans = BI; }
        return Q(t("Welche Eigenschaft hat " + fx + "?", "Which property does " + fx + " have?"), A.choice(r, ans, [BI, IN, SU, WN].filter(function (x) { return x !== ans; })),
            t("Injektiv: keine waagerechte Gerade trifft den Graphen zweimal. Surjektiv: jeder Wert der Zielmenge wird erreicht.", "Injective: no horizontal line hits the graph twice. Surjective: every value of the target set is reached."), [ans], true);
    });

    // =============== Kap. 24 Potenzreihen ===============
    add(24, "potenz", "Konvergenzradius und -bereich", "Radius and interval of convergence", function (r, d) {
        if (d === 1) {
            var c = r.int(2, 9), p = r.int(0, 4), inv = r.bool();
            var ser = inv ? "Σ k<sup>" + p + "</sup> · " + c + "<sup>k</sup> x<sup>k</sup>" : "Σ x<sup>k</sup> / (" + c + "<sup>k</sup> k<sup>" + p + "</sup>)";
            var R = inv ? 1 / c : c, k = 400, ratio = inv ? Math.pow(k / (k + 1), p) / c : c * Math.pow((k + 1) / k, p);
            return Q(t("Bestimme den Konvergenzradius der Potenzreihe " + ser + ".", "Find the radius of convergence of the power series " + ser + "."),
                inv ? A.frac(1, c) : I(c), "R = lim |a<sub>k</sub> / a<sub>k+1</sub>|.", ["a<sub>k</sub> / a<sub>k+1</sub> → " + (inv ? q(1, c) : c)], near(ratio, R, 0.02));
        }
        if (d === 2) {
            var b = r.int(2, 7), p2 = r.int(1, 5);
            return Q(t("Bestimme den Konvergenzradius von Σ<sub>k=0</sub><sup>∞</sup> (k<sup>" + p2 + "</sup> + " + b + "<sup>k</sup>) x<sup>k</sup>.", "Find the radius of convergence of Σ<sub>k=0</sub><sup>∞</sup> (k<sup>" + p2 + "</sup> + " + b + "<sup>k</sup>) x<sup>k</sup>."),
                A.frac(1, b), t("Für große k dominiert " + b + "<sup>k</sup>. Wurzelkriterium.", "For large k, " + b + "<sup>k</sup> dominates. Root test."), ["(k<sup>" + p2 + "</sup> + " + b + "<sup>k</sup>)<sup>1/k</sup> → " + b, "R = " + q(1, b)], near(Math.pow(Math.pow(200, p2) + Math.pow(b, 200), 1 / 200), b, 0.01));
        }
        var a = r.int(-4, 4), c3 = r.int(1, 5);
        return Q(t("Bestimme den Konvergenzbereich von Σ<sub>k=1</sub><sup>∞</sup> (x " + H.sg(-a) + ")<sup>k</sup> / (k · " + c3 + "<sup>k</sup>). Gib die beiden Randpunkte an.", "Find the interval of convergence of Σ<sub>k=1</sub><sup>∞</sup> (x " + H.sg(-a) + ")<sup>k</sup> / (k · " + c3 + "<sup>k</sup>). Give both end points."),
            A.multi([{ l: t("linker Rand", "left end"), a: I(a - c3) }, { l: t("rechter Rand", "right end"), a: I(a + c3) }]), t("Mittelpunkt " + a + ", Radius " + c3 + ". Am linken Rand konvergiert die Reihe (Leibniz), am rechten nicht (harmonisch).", "Centre " + a + ", radius " + c3 + ". At the left end the series converges (Leibniz), at the right end it does not (harmonic)."),
            ["R = " + c3, t("Bereich: [", "interval: [") + (a - c3) + ", " + (a + c3) + ")"], true);
    });

    // =============== Kap. 25 Stetigkeit ===============
    add(25, "stetig", "Stetigkeit und Bisektion", "Continuity and bisection", function (r, d) {
        if (d === 1) {
            var c = r.pick([2, 3, 5, 6, 7, 10, 12, 13]), lo = Math.floor(Math.sqrt(c)), hi = lo + 1, steps = 3, a = lo, b = hi, f = function (x) { return x * x - c; };
            for (var i = 0; i < steps; i += 1) { var m = (a + b) / 2; if (f(a) * f(m) <= 0) b = m; else a = m; }
            return Q(t("Bestimme √" + c + " mit dem Bisektionsverfahren für f(x) = x² − " + c + " auf [" + lo + ", " + hi + "]. Gib das Intervall nach 3 Halbierungen an.", "Approximate √" + c + " with bisection for f(x) = x² − " + c + " on [" + lo + ", " + hi + "]. Give the interval after 3 halvings."),
                A.multi([{ l: t("linke Grenze", "left end"), a: nm(a, 3) }, { l: t("rechte Grenze", "right end"), a: nm(b, 3) }]), t("Immer die Hälfte behalten, an deren Enden f verschiedene Vorzeichen hat.", "Always keep the half where f has different signs at the ends."), ["[" + n(a, 3) + ", " + n(b, 3) + "]", "√" + c + " = " + n(Math.sqrt(c), 4)], a <= Math.sqrt(c) && Math.sqrt(c) <= b && near(b - a, 0.125, 1e-12));
        }
        if (d === 2) {
            var a2 = r.nz(-4, 4), nn = r.int(2, 5), val = nn * Math.pow(a2, nn - 1), g = function (x) { return (Math.pow(x, nn) - Math.pow(a2, nn)) / (x - a2); };
            return Q(t("f(x) = (x<sup>" + nn + "</sup> − " + n(Math.pow(a2, nn)) + ") / (x " + H.sg(-a2) + ") ist bei x = " + a2 + " nicht definiert. Welchen Wert muss man f(" + a2 + ") geben, damit f stetig wird?", "f(x) = (x<sup>" + nn + "</sup> − " + n(Math.pow(a2, nn)) + ") / (x " + H.sg(-a2) + ") is not defined at x = " + a2 + ". Which value must f(" + a2 + ") get so that f becomes continuous?"),
                I(val), t("Polynomdivision oder L'Hospital: der Grenzwert ist die Ableitung von x<sup>" + nn + "</sup> an der Stelle " + a2 + ".", "Polynomial division or L'Hôpital: the limit is the derivative of x<sup>" + nn + "</sup> at " + a2 + "."), ["lim = " + nn + " · " + a2 + "<sup>" + (nn - 1) + "</sup> = " + val], near(g(a2 + 1e-6), val, 1e-4));
        }
        var c3 = r.nz(-4, 4), x0 = r.int(-3, 3), k = r.int(-5, 5), dd = x0 * x0 + k - c3 * x0;
        return Q(t("Für welches d ist f(x) = { " + H.lin([[c3, "x"]]) + " + d für x < " + x0 + " ; x² " + H.sg(k) + " für x ≥ " + x0 + " } überall stetig?", "For which d is f(x) = { " + H.lin([[c3, "x"]]) + " + d for x < " + x0 + " ; x² " + H.sg(k) + " for x ≥ " + x0 + " } continuous everywhere?"),
            I(dd), t("Die beiden Teile müssen bei x = " + x0 + " denselben Wert haben.", "Both pieces must have the same value at x = " + x0 + "."), [c3 * x0 + " + d = " + (x0 * x0 + k), "d = " + dd], c3 * x0 + dd === x0 * x0 + k);
    });

    // =============== Kap. 26 Differentiation ===============
    add(26, "abl", "Ableitungen berechnen", "Computing derivatives", function (r, d) {
        var h = 1e-5, nd = function (f, x) { return (f(x + h) - f(x - h)) / (2 * h); };
        if (d === 1) {
            var a = r.nz(-3, 3), b = r.int(-4, 4), c = r.nz(-2, 2), x0 = r.int(-1, 1), f = function (x) { return (a * x * x + b) * Math.exp(c * x); }, v = (2 * a * x0 + c * (a * x0 * x0 + b)) * Math.exp(c * x0);
            return Q(t("Berechne f′(" + x0 + ") für f(x) = (" + poly([a, 0, b]) + ") e<sup>" + (c === 1 ? "" : c === -1 ? "−" : c) + "x</sup> (auf 0,001).", "Compute f′(" + x0 + ") for f(x) = (" + poly([a, 0, b]) + ") e<sup>" + (c === 1 ? "" : c === -1 ? "−" : c) + "x</sup> (to 0.001)."),
                nm(v, 3), t("Produktregel und Kettenregel.", "Product rule and chain rule."), ["f′(x) = (" + 2 * a + "x + " + c + "(" + poly([a, 0, b]) + ")) e<sup>" + c + "x</sup>", "f′(" + x0 + ") = " + n(v, 4)], near(nd(f, x0), v, 1e-5));
        }
        if (d === 2) {
            var a2 = r.nz(-4, 4), b2 = r.int(-5, 5), c2 = r.int(1, 6), x2 = r.int(-2, 2), g = function (x) { return (a2 * x + b2) / (x * x + c2); }, v2 = (a2 * (x2 * x2 + c2) - (a2 * x2 + b2) * 2 * x2) / Math.pow(x2 * x2 + c2, 2);
            return Q(t("Berechne f′(" + x2 + ") für f(x) = (" + H.lin([[a2, "x"], [b2, ""]]) + ") / (x² + " + c2 + ") (auf 0,0001).", "Compute f′(" + x2 + ") for f(x) = (" + H.lin([[a2, "x"], [b2, ""]]) + ") / (x² + " + c2 + ") (to 0.0001)."),
                nm(v2, 4), t("Quotientenregel: (u′v − uv′) / v².", "Quotient rule: (u′v − uv′) / v²."), ["f′(x) = (" + a2 + "(x² + " + c2 + ") − (" + H.lin([[a2, "x"], [b2, ""]]) + ") · 2x) / (x² + " + c2 + ")²", "f′(" + x2 + ") = " + n(v2, 5)], near(nd(g, x2), v2, 1e-6));
        }
        var a3 = r.pick([1, 2, 3, 0.5]), x3 = r.pick([1, 2, 3, 0.5, 1.5]), k = function (x) { return Math.pow(x, a3 * x); }, v3 = k(x3) * (a3 * Math.log(x3) + a3);
        return Q(t("Berechne f′(" + n(x3) + ") für f(x) = x<sup>" + (a3 === 1 ? "" : n(a3)) + "x</sup>, x > 0 (auf 0,001).", "Compute f′(" + n(x3) + ") for f(x) = x<sup>" + (a3 === 1 ? "" : n(a3)) + "x</sup>, x > 0 (to 0.001)."),
            nm(v3, 3), t("Schreibe f(x) = e<sup>" + n(a3) + " x ln x</sup> und leite mit der Kettenregel ab.", "Write f(x) = e<sup>" + n(a3) + " x ln x</sup> and differentiate with the chain rule."), ["f′(x) = x<sup>" + n(a3) + "x</sup> · " + n(a3) + "(ln x + 1)", "f′(" + n(x3) + ") = " + n(v3, 4)], near(nd(k, x3), v3, 1e-5));
    });

    // =============== Kap. 27 Anwendungen I ===============
    add(27, "anw1", "Extremwerte und Kurvendiskussion", "Extrema and curve sketching", function (r, d) {
        if (d === 1) {
            var V = r.pick([200, 250, 330, 400, 500, 750, 1000]), rad = Math.pow(V / (2 * Math.PI), 1 / 3), O = function (x) { return 2 * Math.PI * x * x + 2 * V / x; };
            return Q(t("Eine zylindrische Dose soll " + V + " cm³ fassen und möglichst wenig Blech verbrauchen. Welchen Radius muss sie haben (auf 0,01 cm)?", "A cylindrical can should hold " + V + " cm³ and use as little sheet metal as possible. What radius must it have (to 0.01 cm)?"),
                nm(rad, 2, "cm"), t("Oberfläche O(r) = 2πr² + 2V/r ableiten und null setzen.", "Differentiate the surface O(r) = 2πr² + 2V/r and set it to zero."), ["O′(r) = 4πr − 2V/r² = 0", "r = (V / 2π)<sup>1/3</sup> = " + n(rad, 3) + " cm", t("Höhe h = 2r = ", "height h = 2r = ") + n(2 * rad, 2) + " cm"], O(rad) < O(rad * 1.01) && O(rad) < O(rad * 0.99));
        }
        if (d === 2) {
            var p = r.int(-4, 2), qq = p + 2 * r.int(1, 3), b = -1.5 * (p + qq), c = 3 * p * qq, f = function (x) { return x * x * x + b * x * x + c * x; };
            return Q(t("An welcher Stelle hat f(x) = " + poly([1, b, c, 0]) + " ein lokales Maximum?", "Where does f(x) = " + poly([1, b, c, 0]) + " have a local maximum?"),
                I(p), t("f′(x) = 0 lösen und mit f″ das Vorzeichen prüfen.", "Solve f′(x) = 0 and check the sign with f″."), ["f′(x) = 3(x " + H.sg(-p) + ")(x " + H.sg(-qq) + ")", "f″(" + p + ") = " + (6 * p + 2 * b) + " < 0"], f(p) > f(p + 0.01) && f(p) > f(p - 0.01));
        }
        var a = r.nz(-9, 9), b2 = r.int(-9, 9), c2 = r.int(-9, 9), xw = -a / 3, f2 = function (x) { return 6 * x + 2 * a; };
        return Q(t("Bestimme die Wendestelle von f(x) = " + poly([1, a, b2, c2]) + ".", "Find the inflection point of f(x) = " + poly([1, a, b2, c2]) + "."),
            A.frac(-a, 3), t("f″(x) = 0, und f‴ ≠ 0.", "f″(x) = 0, and f‴ ≠ 0."), ["f″(x) = 6x " + H.sg(2 * a), "x = " + q(-a, 3)], near(f2(xw), 0, 1e-12));
    });

    // =============== Kap. 28 Anwendungen II ===============
    add(28, "anw2", "Newton, Taylor, L'Hospital", "Newton, Taylor, L'Hôpital", function (r, d) {
        if (d === 1) {
            var a = r.pick([1, 2, 3]), b = r.int(2, 9), x0 = r.pick([0.5, 1, 1.5, 2]), f = function (x) { return Math.exp(a * x) - b; }, x1 = x0 - f(x0) / (a * Math.exp(a * x0));
            return Q(t("Führe einen Newtonschritt für f(x) = e<sup>" + (a === 1 ? "" : a) + "x</sup> − " + b + " mit dem Startwert x<sub>0</sub> = " + n(x0) + " aus (auf 0,0001).", "Do one Newton step for f(x) = e<sup>" + (a === 1 ? "" : a) + "x</sup> − " + b + " with starting value x<sub>0</sub> = " + n(x0) + " (to 0.0001)."),
                nm(x1, 4), "x<sub>1</sub> = x<sub>0</sub> − f(x<sub>0</sub>)/f′(x<sub>0</sub>).", ["f(x<sub>0</sub>) = " + n(f(x0), 5) + ", f′(x<sub>0</sub>) = " + n(a * Math.exp(a * x0), 5), "x<sub>1</sub> = " + n(x1, 5)], near(f(x0) + a * Math.exp(a * x0) * (x1 - x0), 0, 1e-9));
        }
        if (d === 2) {
            var m = r.int(1, 4), k = r.int(2, 6), coef = M.binom(m + k - 1, k), der = 1; for (var i = 0; i < k; i += 1) der *= (m + i);
            return Q(t("Wie lautet der Koeffizient von x<sup>" + k + "</sup> im Taylorpolynom von f(x) = 1/(1 − x)<sup>" + m + "</sup> um 0?", "What is the coefficient of x<sup>" + k + "</sup> in the Taylor polynomial of f(x) = 1/(1 − x)<sup>" + m + "</sup> about 0?"),
                I(coef), t("Koeffizient = f<sup>(" + k + ")</sup>(0) / " + k + "!. Die k-te Ableitung ist m(m+1)…(m+k−1)/(1 − x)<sup>m+k</sup>.", "Coefficient = f<sup>(" + k + ")</sup>(0) / " + k + "!. The k-th derivative is m(m+1)…(m+k−1)/(1 − x)<sup>m+k</sup>."), ["f<sup>(" + k + ")</sup>(0) = " + der, "/ " + k + "! = " + coef], der / M.fact(k) === coef);
        }
        var a3 = r.nz(-4, 4), b3 = r.nz(1, 5), kind = r.int(0, 2), txt, num, den, fn;
        if (kind === 0) { txt = "sin(" + a3 + "x) / sin(" + b3 + "x)"; num = a3; den = b3; fn = function (x) { return Math.sin(a3 * x) / Math.sin(b3 * x); }; }
        else if (kind === 1) { txt = "(1 − cos(" + a3 + "x)) / x²"; num = a3 * a3; den = 2; fn = function (x) { return (1 - Math.cos(a3 * x)) / (x * x); }; }
        else { txt = "(e<sup>" + a3 + "x</sup> − 1 − " + a3 + "x) / x²"; num = a3 * a3; den = 2; fn = function (x) { return (Math.exp(a3 * x) - 1 - a3 * x) / (x * x); }; }
        return Q(t("Berechne lim<sub>x→0</sub> " + txt + ".", "Compute lim<sub>x→0</sub> " + txt + "."), A.frac(num, den), t("Typ 0/0: L'Hospital, notfalls zweimal.", "Type 0/0: L'Hôpital, twice if necessary."), [t("Grenzwert: ", "limit: ") + q(num, den)], near(fn(1e-4), num / den, 1e-3));
    });

    // =============== Kap. 29 Interpolation ===============
    function lagr(xs, ys, x) { var s = 0; for (var i = 0; i < xs.length; i += 1) { var l = 1; for (var j = 0; j < xs.length; j += 1) if (j !== i) l *= (x - xs[j]) / (xs[i] - xs[j]); s += ys[i] * l; } return s; }
    add(29, "interp", "Polynom- und Splineinterpolation", "Polynomial and spline interpolation", function (r, d) {
        if (d < 3) {
            var N = d + 2, xs = r.shuffle([-3, -2, -1, 0, 1, 2, 3]).slice(0, N).sort(function (a, b) { return a - b; }), ys = xs.map(function () { return r.int(-5, 5); }), xq = r.pick([0.5, 1.5, -0.5, 2.5, -1.5]);
            var v = lagr(xs, ys, xq), V = xs.map(function (x) { var row = []; for (var k = 0; k < N; k += 1) row.push(Math.pow(x, k)); return row; }), c = solve(V, ys), v2 = c.reduce(function (s, ck, k) { return s + ck * Math.pow(xq, k); }, 0);
            return Q(t("Bestimme das Interpolationspolynom durch die Punkte " + xs.map(function (x, k) { return "(" + x + " | " + ys[k] + ")"; }).join(", ") + " und berechne seinen Wert bei x = " + n(xq) + " (auf 0,001).", "Find the interpolation polynomial through the points " + xs.map(function (x, k) { return "(" + x + ", " + ys[k] + ")"; }).join(", ") + " and compute its value at x = " + n(xq) + " (to 0.001)."),
                nm(v, 3), t("Lagrange: p(x) = Σ y<sub>i</sub> L<sub>i</sub>(x). Oder Newton'sche Dividierte Differenzen.", "Lagrange: p(x) = Σ y<sub>i</sub> L<sub>i</sub>(x). Or Newton's divided differences."), [t("Grad ", "degree ") + (N - 1), "p(" + n(xq) + ") = " + n(v, 4)], near(v, v2, 1e-9));
        }
        var x0 = 0, h0 = r.int(1, 2), h1 = r.int(1, 3), x1 = h0, x2 = h0 + h1, y0 = r.int(-3, 3), y1 = r.int(-3, 3), y2 = r.int(-3, 3), M1 = 6 * ((y2 - y1) / h1 - (y1 - y0) / h0) / (2 * (h0 + h1)), xq = x0 + h0 / 2;
        var s0 = function (x) { return M1 * Math.pow(x - x0, 3) / (6 * h0) + y0 / h0 * (x1 - x) + (y1 / h0 - M1 * h0 / 6) * (x - x0); };
        var s1 = function (x) { return M1 * Math.pow(x2 - x, 3) / (6 * h1) + (y1 / h1 - M1 * h1 / 6) * (x2 - x) + y2 / h1 * (x - x1); };
        var v3 = s0(xq), e = 1e-6;
        return Q(t("Bestimme die natürliche kubische Splinefunktion durch (" + x0 + " | " + y0 + "), (" + x1 + " | " + y1 + "), (" + x2 + " | " + y2 + ") und berechne s(" + n(xq) + ") (auf 0,001).", "Find the natural cubic spline through (" + x0 + ", " + y0 + "), (" + x1 + ", " + y1 + "), (" + x2 + ", " + y2 + ") and compute s(" + n(xq) + ") (to 0.001)."),
            nm(v3, 3), t("Natürlich heißt s″ = 0 an den Enden. Die Bedingung für s″(x<sub>1</sub>) = M<sub>1</sub> folgt aus der glatten Verbindung.", "Natural means s″ = 0 at the ends. The condition for s″(x<sub>1</sub>) = M<sub>1</sub> follows from the smooth joint."),
            ["M<sub>1</sub> = 6 ((y<sub>2</sub>−y<sub>1</sub>)/h<sub>1</sub> − (y<sub>1</sub>−y<sub>0</sub>)/h<sub>0</sub>) / (2(h<sub>0</sub>+h<sub>1</sub>)) = " + n(M1, 4), "s(" + n(xq) + ") = " + n(v3, 4)],
            near((s0(x1) - s0(x1 - e)) / e, (s1(x1 + e) - s1(x1)) / e, 1e-3) && near(s0(x1), y1, 1e-9) && near(s1(x1), y1, 1e-9));
    });

    // =============== Kap. 30 Integration I ===============
    add(30, "int1", "Bestimmte Integrale", "Definite integrals", function (r, d) {
        if (d === 1) {
            var a = r.int(1, 4), b = r.nz(1, 4), c = r.pick([1, 2, 3, 6]), up = Math.PI / (b * c), f = function (x) { return a * Math.sin(b * x); }, v = a / b * (1 - Math.cos(b * up));
            return Q(t("Berechne ∫<sub>0</sub><sup>π/" + (b * c) + "</sup> " + a + " sin(" + b + "x) dx (auf 0,0001).", "Compute ∫<sub>0</sub><sup>π/" + (b * c) + "</sup> " + a + " sin(" + b + "x) dx (to 0.0001)."),
                nm(v, 4), t("Stammfunktion −(" + a + "/" + b + ") cos(" + b + "x).", "Antiderivative −(" + a + "/" + b + ") cos(" + b + "x)."), ["[−" + a + "/" + b + " cos(" + b + "x)]<sub>0</sub><sup>π/" + b * c + "</sup> = " + n(v, 5)], near(simpson(f, 0, up, 200), v, 1e-7));
        }
        if (d === 2) {
            var a2 = r.pick([1, 2, 0.5, -1]), c2 = r.pick([1, 2, 1.5]), g = function (x) { return x * Math.exp(a2 * x * x); }, v2 = (Math.exp(a2 * c2 * c2) - 1) / (2 * a2);
            return Q(t("Berechne ∫<sub>0</sub><sup>" + n(c2) + "</sup> x e<sup>" + (a2 === 1 ? "" : a2 === -1 ? "−" : n(a2)) + "x²</sup> dx (auf 0,0001).", "Compute ∫<sub>0</sub><sup>" + n(c2) + "</sup> x e<sup>" + (a2 === 1 ? "" : a2 === -1 ? "−" : n(a2)) + "x²</sup> dx (to 0.0001)."),
                nm(v2, 4), t("Substitution u = x², du = 2x dx.", "Substitution u = x², du = 2x dx."), ["= 1/(2·" + n(a2) + ") (e<sup>" + n(a2 * c2 * c2) + "</sup> − 1) = " + n(v2, 5)], near(simpson(g, 0, c2, 400), v2, 1e-7));
        }
        var kind = r.int(0, 1);
        if (kind === 0) { var a3 = r.nz(-3, 3), h = function (x) { return x * Math.exp(a3 * x); }, v3 = Math.exp(a3) * (a3 - 1) / (a3 * a3) + 1 / (a3 * a3);
            return Q(t("Berechne ∫<sub>0</sub><sup>1</sup> x e<sup>" + (a3 === 1 ? "" : a3 === -1 ? "−" : a3) + "x</sup> dx (auf 0,0001).", "Compute ∫<sub>0</sub><sup>1</sup> x e<sup>" + (a3 === 1 ? "" : a3 === -1 ? "−" : a3) + "x</sup> dx (to 0.0001)."),
                nm(v3, 4), t("Partielle Integration mit u = x, v′ = e<sup>ax</sup>.", "Integration by parts with u = x, v′ = e<sup>ax</sup>."), ["= [x e<sup>ax</sup>/a]<sub>0</sub><sup>1</sup> − ∫ e<sup>ax</sup>/a dx = " + n(v3, 5)], near(simpson(h, 0, 1, 400), v3, 1e-7)); }
        var c3 = r.int(2, 8), l = function (x) { return Math.log(x); }, v4 = c3 * Math.log(c3) - c3 + 1;
        return Q(t("Berechne ∫<sub>1</sub><sup>" + c3 + "</sup> ln x dx (auf 0,0001).", "Compute ∫<sub>1</sub><sup>" + c3 + "</sup> ln x dx (to 0.0001)."),
            nm(v4, 4), t("Partielle Integration mit u = ln x, v′ = 1.", "Integration by parts with u = ln x, v′ = 1."), ["∫ ln x dx = x ln x − x", "= " + c3 + " ln " + c3 + " − " + (c3 - 1) + " = " + n(v4, 5)], near(simpson(l, 1, c3, 400), v4, 1e-7));
    });

    // =============== Kap. 31 Integration II ===============
    add(31, "int2", "Partialbrüche, Quadratur, Rotationskörper", "Partial fractions, quadrature, solids of revolution", function (r, d) {
        if (d === 1) {
            var p = r.int(0, 3), qq = p + r.int(1, 4), a = r.int(0, 2), b = a + r.int(1, 3), f = function (x) { return 1 / ((x + p) * (x + qq)); };
            if (a + p === 0) a += 1;
            var v = Math.log((b + p) * (a + qq) / ((b + qq) * (a + p))) / (qq - p);
            return Q(t("Berechne ∫<sub>" + a + "</sub><sup>" + b + "</sup> 1 / ((x + " + p + ")(x + " + qq + ")) dx (auf 0,0001).", "Compute ∫<sub>" + a + "</sub><sup>" + b + "</sup> 1 / ((x + " + p + ")(x + " + qq + ")) dx (to 0.0001)."),
                nm(v, 4), t("Partialbrüche: 1/((x+p)(x+q)) = 1/(q−p) (1/(x+p) − 1/(x+q)).", "Partial fractions: 1/((x+p)(x+q)) = 1/(q−p) (1/(x+p) − 1/(x+q))."), ["= 1/" + (qq - p) + " [ln|x + " + p + "| − ln|x + " + qq + "|]<sub>" + a + "</sub><sup>" + b + "</sup> = " + n(v, 5)], near(simpson(f, a, b, 400), v, 1e-7));
        }
        if (d === 2) {
            var F = r.pick([["e<sup>x</sup>", Math.exp], ["1/(1 + x)", function (x) { return 1 / (1 + x); }], ["√(1 + x)", function (x) { return Math.sqrt(1 + x); }], ["x²", function (x) { return x * x; }]]), N = r.int(2, 5), h = 1 / N, s = (F[1](0) + F[1](1)) / 2;
            for (var i = 1; i < N; i += 1) s += F[1](i * h);
            var T = s * h, s2 = 0; for (var j = 0; j < N; j += 1) s2 += (F[1](j * h) + F[1]((j + 1) * h)) / 2 * h;
            return Q(t("Berechne ∫<sub>0</sub><sup>1</sup> " + F[0] + " dx näherungsweise mit der Trapezregel mit n = " + N + " Teilintervallen (auf 0,0001).", "Approximate ∫<sub>0</sub><sup>1</sup> " + F[0] + " dx with the trapezoidal rule with n = " + N + " subintervals (to 0.0001)."),
                nm(T, 4), t("T = h (f<sub>0</sub>/2 + f<sub>1</sub> + … + f<sub>n−1</sub> + f<sub>n</sub>/2) mit h = 1/" + N + ".", "T = h (f<sub>0</sub>/2 + f<sub>1</sub> + … + f<sub>n−1</sub> + f<sub>n</sub>/2) with h = 1/" + N + "."), ["h = " + n(h, 4), "T = " + n(T, 5)], near(T, s2, 1e-12));
        }
        var a3 = r.int(1, 4), b3 = r.nz(-1, 2) / 2, L = r.int(1, 4), g = function (x) { return Math.PI * Math.pow(a3 + b3 * x, 2); }, V = Math.PI * (a3 * a3 * L + a3 * b3 * L * L + b3 * b3 * L * L * L / 3);
        if (a3 + b3 * L <= 0) b3 = 0.5;
        V = Math.PI * (a3 * a3 * L + a3 * b3 * L * L + b3 * b3 * L * L * L / 3);
        return Q(t("Der Graph von f(x) = " + H.lin([[b3, "x"], [a3, ""]]) + " über [0, " + L + "] rotiert um die x-Achse. Berechne das Volumen des Rotationskörpers (auf 0,01).", "The graph of f(x) = " + H.lin([[b3, "x"], [a3, ""]]) + " over [0, " + L + "] rotates about the x-axis. Compute the volume of the solid (to 0.01)."),
            nm(V, 2), "V = π ∫<sub>0</sub><sup>" + L + "</sup> f(x)² dx.", ["V = π ∫ (" + H.lin([[b3, "x"], [a3, ""]]) + ")² dx = " + n(V, 3)], near(simpson(g, 0, L, 200), V, 1e-7));
    });

    // =============== Kap. 32 Uneigentliche Integrale ===============
    add(32, "uneig", "Uneigentliche Integrale", "Improper integrals", function (r, d) {
        if (d === 1) {
            var p = r.int(3, 9), qq = r.int(1, p - 1); if (M.gcd(p, qq) !== 1) qq = 1;
            return Q(t("Berechne ∫<sub>1</sub><sup>∞</sup> x<sup>−" + p + "/" + qq + "</sup> dx.", "Compute ∫<sub>1</sub><sup>∞</sup> x<sup>−" + p + "/" + qq + "</sup> dx."),
                A.frac(qq, p - qq), t("Für α > 1 gilt ∫<sub>1</sub><sup>∞</sup> x<sup>−α</sup> dx = 1/(α − 1).", "For α > 1, ∫<sub>1</sub><sup>∞</sup> x<sup>−α</sup> dx = 1/(α − 1)."), ["α = " + q(p, qq), "1/(α − 1) = " + q(qq, p - qq)], near(1 / (p / qq - 1), qq / (p - qq), 1e-12));
        }
        if (d === 2) {
            var nn = r.int(1, 3), a = r.int(1, 4), v = M.fact(nn) / Math.pow(a, nn + 1), f = function (x) { return Math.pow(x, nn) * Math.exp(-a * x); };
            return Q(t("Berechne ∫<sub>0</sub><sup>∞</sup> x<sup>" + nn + "</sup> e<sup>−" + (a === 1 ? "" : a) + "x</sup> dx.", "Compute ∫<sub>0</sub><sup>∞</sup> x<sup>" + nn + "</sup> e<sup>−" + (a === 1 ? "" : a) + "x</sup> dx."),
                A.frac(M.fact(nn), Math.pow(a, nn + 1)), t(nn + "-mal partiell integrieren. Die Randterme verschwinden.", "Integrate by parts " + nn + " times. The boundary terms vanish."), ["= " + nn + "! / " + a + "<sup>" + (nn + 1) + "</sup> = " + q(M.fact(nn), Math.pow(a, nn + 1))], near(simpson(f, 0, 60 / a, 6000), v, 1e-6));
        }
        var p3 = r.int(2, 7), q3 = r.int(1, p3 - 1); if (M.gcd(p3, q3) !== 1) q3 = 1;
        return Q(t("Berechne ∫<sub>0</sub><sup>1</sup> x<sup>−" + q3 + "/" + p3 + "</sup> dx.", "Compute ∫<sub>0</sub><sup>1</sup> x<sup>−" + q3 + "/" + p3 + "</sup> dx."),
            A.frac(p3, p3 - q3), t("Für α < 1 gilt ∫<sub>0</sub><sup>1</sup> x<sup>−α</sup> dx = 1/(1 − α).", "For α < 1, ∫<sub>0</sub><sup>1</sup> x<sup>−α</sup> dx = 1/(1 − α)."), ["α = " + q(q3, p3), "1/(1 − α) = " + q(p3, p3 - q3)], near(1 / (1 - q3 / p3), p3 / (p3 - q3), 1e-12));
    });

    // =============== Kap. 33 DGL 1. Ordnung ===============
    function rk(f, x0, T, steps) { var h = T / steps, x = x0, tt = 0; for (var i = 0; i < steps; i += 1) { var k1 = f(tt, x), k2 = f(tt + h / 2, x + h / 2 * k1), k3 = f(tt + h / 2, x + h / 2 * k2), k4 = f(tt + h, x + h * k3); x += h / 6 * (k1 + 2 * k2 + 2 * k3 + k4); tt += h; } return x; }
    add(33, "dgl1", "Separierbare und lineare DGL", "Separable and linear ODEs", function (r, d) {
        var T = r.pick([0.5, 1, 1.5, 2]);
        if (d === 1) {
            var a = r.pick([-2, -1, -0.5, 0.5, 1]), x0 = r.nz(-4, 4), v = x0 * Math.exp(a * T * T / 2);
            return Q(t("Löse ẋ = " + n(a) + " t x mit x(0) = " + x0 + " und berechne x(" + n(T) + ") (auf 0,001).", "Solve ẋ = " + n(a) + " t x with x(0) = " + x0 + " and compute x(" + n(T) + ") (to 0.001)."),
                nm(v, 3), t("Trennung der Variablen: dx/x = " + n(a) + " t dt.", "Separation of variables: dx/x = " + n(a) + " t dt."), ["ln|x| = " + n(a / 2) + " t² + c", "x(t) = " + x0 + " e<sup>" + n(a / 2) + "t²</sup>", "x(" + n(T) + ") = " + n(v, 4)], near(rk(function (tt, x) { return a * tt * x; }, x0, T, 400), v, 1e-7));
        }
        if (d === 2) {
            var a2 = r.int(1, 4), b = r.int(-6, 6), x02 = r.int(-4, 4), v2 = b / a2 + (x02 - b / a2) * Math.exp(-a2 * T);
            return Q(t("Löse ẋ + " + a2 + "x = " + b + " mit x(0) = " + x02 + " und berechne x(" + n(T) + ") (auf 0,001).", "Solve ẋ + " + a2 + "x = " + b + " with x(0) = " + x02 + " and compute x(" + n(T) + ") (to 0.001)."),
                nm(v2, 3), t("Homogene Lösung C e<sup>−" + a2 + "t</sup>, partikuläre Lösung konstant.", "Homogeneous solution C e<sup>−" + a2 + "t</sup>, particular solution constant."), ["x<sub>p</sub> = " + q(b, a2), "x(t) = " + q(b, a2) + " + (" + x02 + " − " + q(b, a2) + ") e<sup>−" + a2 + "t</sup>", "x(" + n(T) + ") = " + n(v2, 4)], near(rk(function (tt, x) { return b - a2 * x; }, x02, T, 400), v2, 1e-7));
        }
        var c = r.pick([0.5, 1, 2]), x03 = r.pick([0.2, 0.25, 0.5, -1, -0.5]), T3 = r.pick([0.5, 1]);
        if (1 / x03 - c * T3 * T3 / 2 <= 0.2 && x03 > 0) x03 = 0.2;
        var v3 = 1 / (1 / x03 - c * T3 * T3 / 2);
        return Q(t("Löse ẋ = " + n(c) + " t x² mit x(0) = " + n(x03) + " und berechne x(" + n(T3) + ") (auf 0,0001).", "Solve ẋ = " + n(c) + " t x² with x(0) = " + n(x03) + " and compute x(" + n(T3) + ") (to 0.0001)."),
            nm(v3, 4), t("Separieren: dx/x² = " + n(c) + " t dt, also −1/x = " + n(c / 2) + " t² + C.", "Separate: dx/x² = " + n(c) + " t dt, so −1/x = " + n(c / 2) + " t² + C."), ["x(t) = 1 / (1/" + n(x03) + " − " + n(c / 2) + " t²)", "x(" + n(T3) + ") = " + n(v3, 5)], near(rk(function (tt, x) { return c * tt * x * x; }, x03, T3, 2000), v3, 1e-6));
    });

    // =============== Kap. 34 lineare DGL konstante Koeffizienten ===============
    add(34, "dgl2", "Lineare DGL mit konstanten Koeffizienten", "Linear ODEs with constant coefficients", function (r, d) {
        var r1 = r.int(-5, 2), r2 = r1 + r.int(1, 4), a = -(r1 + r2), b = r1 * r2;
        if (d === 1) return Q(t("Bestimme die Nullstellen des charakteristischen Polynoms von ẍ " + H.sg(a) + "ẋ " + H.sg(b) + "x = 0.", "Find the roots of the characteristic polynomial of ẍ " + H.sg(a) + "ẋ " + H.sg(b) + "x = 0."),
            A.multi([{ l: "λ<sub>1</sub>", a: I(r1) }, { l: "λ<sub>2</sub>", a: I(r2) }], { unordered: true }), t("Ansatz x = e<sup>λt</sup> ergibt λ² " + H.sg(a) + "λ " + H.sg(b) + " = 0.", "The ansatz x = e<sup>λt</sup> gives λ² " + H.sg(a) + "λ " + H.sg(b) + " = 0."), ["λ = " + r1 + ", λ = " + r2, "x(t) = C<sub>1</sub> e<sup>" + r1 + "t</sup> + C<sub>2</sub> e<sup>" + r2 + "t</sup>"], r1 * r1 + a * r1 + b === 0 && r2 * r2 + a * r2 + b === 0);
        if (d === 2) {
            if (b === 0) { b = r.int(1, 6); }
            var c = r.int(-9, 9) || 2;
            return Q(t("Bestimme eine konstante partikuläre Lösung x<sub>p</sub> von ẍ " + H.sg(a) + "ẋ " + H.sg(b) + "x = " + c + ".", "Find a constant particular solution x<sub>p</sub> of ẍ " + H.sg(a) + "ẋ " + H.sg(b) + "x = " + c + "."),
                A.frac(c, b), t("Ansatz vom Typ der rechten Seite: x<sub>p</sub> = K, dann ẋ = ẍ = 0.", "Ansatz of the right-hand-side type: x<sub>p</sub> = K, then ẋ = ẍ = 0."), [b + " K = " + c, "K = " + q(c, b)], near(b * c / b, c, 1e-12));
        }
        var s1 = -r.int(1, 4), s2 = s1 - r.int(1, 3), x0 = r.int(-3, 4), v0 = r.int(-4, 4), C2 = (v0 - s1 * x0) / (s2 - s1), C1 = x0 - C2, T = r.pick([0.5, 1, 2]), v = C1 * Math.exp(s1 * T) + C2 * Math.exp(s2 * T);
        var A2 = -(s1 + s2), B2 = s1 * s2;
        var sim = (function () { var h = T / 2000, x = x0, y = v0; for (var i = 0; i < 2000; i += 1) { var f = function (X, Y) { return [Y, -A2 * Y - B2 * X]; }; var k1 = f(x, y), k2 = f(x + h / 2 * k1[0], y + h / 2 * k1[1]), k3 = f(x + h / 2 * k2[0], y + h / 2 * k2[1]), k4 = f(x + h * k3[0], y + h * k3[1]); x += h / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]); y += h / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]); } return x; })();
        return Q(t("Löse ẍ " + H.sg(A2) + "ẋ " + H.sg(B2) + "x = 0 mit x(0) = " + x0 + ", ẋ(0) = " + v0 + " und berechne x(" + n(T) + ") (auf 0,0001).", "Solve ẍ " + H.sg(A2) + "ẋ " + H.sg(B2) + "x = 0 with x(0) = " + x0 + ", ẋ(0) = " + v0 + " and compute x(" + n(T) + ") (to 0.0001)."),
            nm(v, 4), t("λ<sub>1,2</sub> bestimmen, dann C<sub>1</sub>, C<sub>2</sub> aus den Anfangswerten.", "Find λ<sub>1,2</sub>, then C<sub>1</sub>, C<sub>2</sub> from the initial values."), ["λ = " + s1 + ", " + s2, "C<sub>1</sub> = " + n(C1, 4) + ", C<sub>2</sub> = " + n(C2, 4), "x(" + n(T) + ") = " + n(v, 5)], near(sim, v, 1e-6));
    });

    // =============== Kap. 35 besondere DGL ===============
    add(35, "dgl3", "Euler-, Bernoulli- und Potenzreihen-DGL", "Euler, Bernoulli and power series ODEs", function (r, d) {
        if (d === 1) {
            var p = r.int(-4, 3), qq = p + r.int(1, 4), a = 1 - (p + qq), b = p * qq;
            return Q(t("Für die Euler'sche DGL t² ẍ " + H.sg(a) + " t ẋ " + H.sg(b) + " x = 0 (t > 0) führt der Ansatz x = t<sup>r</sup> auf eine quadratische Gleichung. Gib ihre Lösungen r an.", "For the Euler equation t² ẍ " + H.sg(a) + " t ẋ " + H.sg(b) + " x = 0 (t > 0) the ansatz x = t<sup>r</sup> leads to a quadratic equation. Give its solutions r."),
                A.multi([{ l: "r<sub>1</sub>", a: I(p) }, { l: "r<sub>2</sub>", a: I(qq) }], { unordered: true }), t("Einsetzen ergibt r(r − 1) " + H.sg(a) + "r " + H.sg(b) + " = 0.", "Substituting gives r(r − 1) " + H.sg(a) + "r " + H.sg(b) + " = 0."), ["r² " + H.sg(a - 1) + "r " + H.sg(b) + " = 0", "r = " + p + ", " + qq], p * (p - 1) + a * p + b === 0 && qq * (qq - 1) + a * qq + b === 0);
        }
        var T = r.pick([0.5, 1, 1.5]);
        if (d === 2) {
            var pp = r.int(1, 3), qv = r.pick([0.5, 1, 2]), x0 = r.pick([0.5, 1, 2, 3]), v = pp / (qv + (pp / x0 - qv) * Math.exp(-pp * T));
            return Q(t("Löse die Bernoulli-DGL ẋ = " + pp + "x − " + n(qv) + "x² mit x(0) = " + n(x0) + " und berechne x(" + n(T) + ") (auf 0,0001).", "Solve the Bernoulli equation ẋ = " + pp + "x − " + n(qv) + "x² with x(0) = " + n(x0) + " and compute x(" + n(T) + ") (to 0.0001)."),
                nm(v, 4), t("Substitution u = 1/x macht die DGL linear: u̇ = −" + pp + "u + " + n(qv) + ".", "The substitution u = 1/x makes the equation linear: u̇ = −" + pp + "u + " + n(qv) + "."), ["u(t) = " + n(qv / pp, 4) + " + (1/" + n(x0) + " − " + n(qv / pp, 4) + ") e<sup>−" + pp + "t</sup>", "x(" + n(T) + ") = " + n(v, 5)], near(rk(function (tt, x) { return pp * x - qv * x * x; }, x0, T, 1000), v, 1e-6));
        }
        var a3 = r.pick([0.5, 1, 2, -1]), v3 = Math.exp(a3 * T * T / 2) - 1;
        return Q(t("Löse ẋ = " + n(a3) + " t x + " + n(a3) + " t mit x(0) = 0 (etwa mit einem Potenzreihenansatz) und berechne x(" + n(T) + ") (auf 0,0001).", "Solve ẋ = " + n(a3) + " t x + " + n(a3) + " t with x(0) = 0 (for example with a power series ansatz) and compute x(" + n(T) + ") (to 0.0001)."),
            nm(v3, 4), t("Die Reihe ergibt x = Σ (" + n(a3) + "t²/2)<sup>k</sup>/k! − 1 = e<sup>" + n(a3 / 2) + "t²</sup> − 1.", "The series gives x = Σ (" + n(a3) + "t²/2)<sup>k</sup>/k! − 1 = e<sup>" + n(a3 / 2) + "t²</sup> − 1."), ["x(t) = e<sup>" + n(a3 / 2) + " t²</sup> − 1", "x(" + n(T) + ") = " + n(v3, 5)], near(rk(function (tt, x) { return a3 * tt * x + a3 * tt; }, 0, T, 1000), v3, 1e-6));
    });

    // =============== Kap. 36 Numerik DGL I ===============
    add(36, "num1", "Euler- und Runge-Kutta-Verfahren", "Euler and Runge-Kutta methods", function (r, d) {
        if (d === 1) {
            var x0 = r.pick([0, 0.5, 1, -0.5]), h = r.pick([0.1, 0.2, 0.25, 0.5]), f = function (tt, x) { return 1 + (x - tt) * (x - tt); }, x1 = x0 + h * f(0, x0);
            return Q(t("Führe für ẋ = 1 + (x − t)², x(0) = " + n(x0) + " einen Schritt des expliziten Euler-Verfahrens mit h = " + n(h) + " aus (auf 0,0001).", "For ẋ = 1 + (x − t)², x(0) = " + n(x0) + " do one step of the explicit Euler method with h = " + n(h) + " (to 0.0001)."),
                nm(x1, 4), "x<sub>1</sub> = x<sub>0</sub> + h f(t<sub>0</sub>, x<sub>0</sub>).", ["f(0, " + n(x0) + ") = " + n(f(0, x0), 4), "x<sub>1</sub> = " + n(x1, 5)], near(x1 - x0, h * (1 + x0 * x0), 1e-12));
        }
        if (d === 2) {
            var a = r.pick([-2, -1, 0.5, 1, 2]), x02 = r.int(-2, 3), h2 = r.pick([0.1, 0.2, 0.25, 0.5]), g = function (tt, x) { return a * x + tt; }, y1 = x02 + h2 * g(0, x02), y2 = y1 + h2 * g(h2, y1);
            return Q(t("Führe für ẋ = " + n(a) + "x + t, x(0) = " + x02 + " zwei Schritte des expliziten Euler-Verfahrens mit h = " + n(h2) + " aus. Gib x<sub>2</sub> an (auf 0,0001).", "For ẋ = " + n(a) + "x + t, x(0) = " + x02 + " do two steps of the explicit Euler method with h = " + n(h2) + ". Give x<sub>2</sub> (to 0.0001)."),
                nm(y2, 4), t("Zweimal x<sub>k+1</sub> = x<sub>k</sub> + h f(t<sub>k</sub>, x<sub>k</sub>), im zweiten Schritt mit t<sub>1</sub> = " + n(h2) + ".", "Twice x<sub>k+1</sub> = x<sub>k</sub> + h f(t<sub>k</sub>, x<sub>k</sub>), in the second step with t<sub>1</sub> = " + n(h2) + "."), ["x<sub>1</sub> = " + n(y1, 5), "x<sub>2</sub> = " + n(y2, 5)], near(y2, x02 * Math.pow(1 + a * h2, 2) + h2 * h2, 1e-12));
        }
        var x03 = r.pick([0.5, 0, 1, -0.5]), h3 = r.pick([0.25, 0.5, 0.2]), f3 = function (tt, x) { return 1 + (x - tt) * (x - tt); };
        var k1 = f3(0, x03), k2 = f3(h3 / 2, x03 + h3 / 2 * k1), k3 = f3(h3 / 2, x03 + h3 / 2 * k2), k4 = f3(h3, x03 + h3 * k3), x13 = x03 + h3 / 6 * (k1 + 2 * k2 + 2 * k3 + k4);
        return Q(t("Führe für ẋ = 1 + (x − t)², x(0) = " + n(x03) + " einen Schritt des klassischen Runge-Kutta-Verfahrens mit h = " + n(h3) + " aus (auf 0,0001).", "For ẋ = 1 + (x − t)², x(0) = " + n(x03) + " do one step of the classical Runge-Kutta method with h = " + n(h3) + " (to 0.0001)."),
            nm(x13, 4), t("k<sub>1</sub> bis k<sub>4</sub> berechnen und gewichtet mitteln: (k<sub>1</sub> + 2k<sub>2</sub> + 2k<sub>3</sub> + k<sub>4</sub>)/6.", "Compute k<sub>1</sub> to k<sub>4</sub> and take the weighted mean (k<sub>1</sub> + 2k<sub>2</sub> + 2k<sub>3</sub> + k<sub>4</sub>)/6."),
            ["k<sub>1</sub> = " + n(k1, 5) + ", k<sub>2</sub> = " + n(k2, 5), "k<sub>3</sub> = " + n(k3, 5) + ", k<sub>4</sub> = " + n(k4, 5), "x<sub>1</sub> = " + n(x13, 5)], near(rk(f3, x03, h3, 1), x13, 1e-12));
    });
    E.HMU = { Q: Q, nm: nm, det: det, det2: det2, mul: mul, mv: mv, rank: rank, solve: solve, randMat: randMat, invertible: invertible, sys: sys, rk: rk, cs: cs, cross: cross, id2: id2 };
})(typeof window !== "undefined" ? window : globalThis);
