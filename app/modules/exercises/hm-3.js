/* SOR Aufgaben Höhere Mathematik 3 (K-HM-63 bis K-HM-91), Aufgabentypen nach Karpfinger, Arbeitsbuch HM in Rezepten. Braucht hm-1.js (E.HMU) */
(function (root) {
    "use strict";
    var E = root.SOR_EX || require("../exercise-engine.js");
    if (!E.HMU && typeof require !== "undefined") require("./hm-1.js");
    var A = E.A, M = E.M, H = E.H, n = E.H.n, t = E.tr, U = E.HMU;
    var Q = U.Q, nm = U.nm, det2 = U.det2, mul = U.mul, mv = U.mv, solve = U.solve, rk = U.rk;
    var I = function (v) { return A.num(v); };
    var mat = H.mat, vec = H.vec, poly = H.poly, q = H.q, near = M.near, simpson = M.simpson, PI = Math.PI;
    function add(ch, key, de, en, gen) { E.add({ id: "k-hm" + ch + "-" + key, topic: U.id2(ch), title: t(de, en), gen: gen }); }
    function unimod(r) { var s = r.int(-2, 2), u = r.nz(-2, 2); return mul([[1, s], [0, 1]], [[1, 0], [u, 1]]); }
    function inv2(m) { var d = det2(m); return [[m[1][1] / d, -m[0][1] / d], [-m[1][0] / d, m[0][0] / d]]; }
    function rk2(f, x0, T, steps) { var h = T / steps, x = x0.slice(), s = 0; function ad(a, b, c) { return a.map(function (v, k) { return v + c * b[k]; }); } for (var i = 0; i < steps; i += 1) { var k1 = f(s, x), k2 = f(s + h / 2, ad(x, k1, h / 2)), k3 = f(s + h / 2, ad(x, k2, h / 2)), k4 = f(s + h, ad(x, k3, h)); x = x.map(function (v, k) { return v + h / 6 * (k1[k] + 2 * k2[k] + 2 * k3[k] + k4[k]); }); s += h; } return x; }
    var ci = function (s) { return s === 1 ? "" : s === -1 ? "−" : n(s); };
    function ftr(f, w, L) { return simpson(function (s) { return f(s) * Math.cos(w * s); }, -L, L, 4000); }

    // =============== Kap. 63 qualitative DGL ===============
    add(63, "dglqual", "Richtungsfeld, Picard-Iteration, Lösungsdauer", "Direction field, Picard iteration, existence time", function (r, d) {
        if (d === 1) {
            var a = r.nz(-3, 3), b = r.nz(-3, 3), t0 = r.int(-2, 2), x0 = r.int(-2, 2), s = a * t0 - b * x0 + t0 * x0;
            return Q(t("Welche Steigung hat das Richtungsfeld von ẋ = " + H.lin([[a, "t"], [-b, "x"], [1, "tx"]]) + " im Punkt (t, x) = (" + t0 + ", " + x0 + ")?", "What slope does the direction field of ẋ = " + H.lin([[a, "t"], [-b, "x"], [1, "tx"]]) + " have at the point (t, x) = (" + t0 + ", " + x0 + ")?"),
                I(s), t("Die Steigung ist einfach f(t, x).", "The slope is simply f(t, x)."), ["f(" + t0 + ", " + x0 + ") = " + s], s === a * t0 - b * x0 + t0 * x0);
        }
        if (d === 2) {
            var a2 = r.pick([-2, -1, 0.5, 1, 2, 3]), x02 = r.nz(-3, 3), T = r.pick([0.2, 0.5, 1]), p2 = x02 * (1 + a2 * T + a2 * a2 * T * T / 2);
            return Q(t("Berechne für ẋ = " + n(a2) + "x, x(0) = " + x02 + " die zweite Picard-Iterierte x<sub>2</sub>(t) mit x<sub>0</sub>(t) = " + x02 + " und gib x<sub>2</sub>(" + n(T) + ") an (auf 0,0001).", "For ẋ = " + n(a2) + "x, x(0) = " + x02 + " compute the second Picard iterate x<sub>2</sub>(t) starting from x<sub>0</sub>(t) = " + x02 + " and give x<sub>2</sub>(" + n(T) + ") (to 0.0001)."),
                nm(p2, 4), "x<sub>k+1</sub>(t) = x(0) + ∫<sub>0</sub><sup>t</sup> f(s, x<sub>k</sub>(s)) ds.", ["x<sub>1</sub>(t) = " + x02 + "(1 + " + n(a2) + "t)", "x<sub>2</sub>(t) = " + x02 + "(1 + " + n(a2) + "t + " + n(a2 * a2 / 2) + "t²)", "x<sub>2</sub>(" + n(T) + ") = " + n(p2, 5)], near(x02 + simpson(function (s) { return a2 * x02 * (1 + a2 * s); }, 0, T, 10), p2, 1e-12));
        }
        var c = r.pick([0.5, 1, 2, 3]), x03 = r.pick([0.5, 1, 2, 4]), Ts = 1 / (c * x03);
        return Q(t("Die Lösung von ẋ = " + n(c) + "x², x(0) = " + n(x03) + " existiert nur bis zu einer Zeit T*. Berechne T*.", "The solution of ẋ = " + n(c) + "x², x(0) = " + n(x03) + " exists only up to a time T*. Compute T*."),
            nm(Ts, 4), t("Separieren: x(t) = 1/(1/x<sub>0</sub> − ct). Der Nenner wird null.", "Separate: x(t) = 1/(1/x<sub>0</sub> − ct). The denominator becomes zero."), ["x(t) = 1/(" + n(1 / x03) + " − " + n(c) + "t)", "T* = " + n(Ts, 4)], near(1 / x03 - c * Ts, 0, 1e-12));
    });

    // =============== Kap. 64 exakte DGL ===============
    add(64, "exakt", "Exakte Differentialgleichungen", "Exact differential equations", function (r, d) {
        var a = r.nz(-3, 3), b = r.int(-4, 4), c = r.nz(-3, 3);
        if (d === 1) {
            var ex = r.bool(), a2 = ex ? a : a + r.nz(-2, 2), YES = t("exakt", "exact"), NO = t("nicht exakt", "not exact"), NE = t("nur mit Euler-Multiplikator x lösbar", "solvable only with the integrating factor x");
            var ans = ex ? YES : NO;
            return Q(t("Ist die DGL (" + H.lin([[2 * a, "tx"], [b, ""]]) + ") + (" + H.lin([[a2, "t²"], [2 * c, "x"]]) + ") ẋ = 0 exakt?", "Is the ODE (" + H.lin([[2 * a, "tx"], [b, ""]]) + ") + (" + H.lin([[a2, "t²"], [2 * c, "x"]]) + ") ẋ = 0 exact?"),
                A.choice(r, ans, [YES, NO, NE].filter(function (x) { return x !== ans; })), t("Exakt heißt ∂P/∂x = ∂Q/∂t für P + Q ẋ = 0.", "Exact means ∂P/∂x = ∂Q/∂t for P + Q ẋ = 0."), ["∂P/∂x = " + 2 * a + "t, ∂Q/∂t = " + 2 * a2 + "t ⇒ " + ans], (a === a2) === ex);
        }
        if (d === 2) {
            var t0 = r.int(-2, 2), x0 = r.int(-2, 2), F = function (s, x) { return a * s * s * x + b * s + c * x * x; }, C = F(t0, x0);
            return Q(t("Die exakte DGL (" + H.lin([[2 * a, "tx"], [b, ""]]) + ") + (" + H.lin([[a, "t²"], [2 * c, "x"]]) + ") ẋ = 0 hat Lösungen F(t, x) = C. Bestimme C für den Anfangswert x(" + t0 + ") = " + x0 + ".", "The exact ODE (" + H.lin([[2 * a, "tx"], [b, ""]]) + ") + (" + H.lin([[a, "t²"], [2 * c, "x"]]) + ") ẋ = 0 has solutions F(t, x) = C. Find C for the initial value x(" + t0 + ") = " + x0 + "."),
                I(C), t("Stammfunktion: F<sub>t</sub> = P, F<sub>x</sub> = Q.", "Potential: F<sub>t</sub> = P, F<sub>x</sub> = Q."), ["F(t, x) = " + H.lin([[a, "t²x"], [b, "t"], [c, "x²"]]), "C = F(" + t0 + ", " + x0 + ") = " + C], near((F(t0 + 1e-5, x0) - F(t0 - 1e-5, x0)) / 2e-5, 2 * a * t0 * x0 + b, 1e-5));
        }
        var tr = r.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [6, 8, 10], [8, 6, 10]]), t3 = 0, x3 = tr[2], T = tr[0], xT = tr[1];
        var num = rk2(function (s, x) { return [-s / x[0]]; }, [x3], T, 4000)[0];
        return Q(t("Löse die exakte DGL t + x ẋ = 0 mit x(0) = " + x3 + " und berechne x(" + T + ").", "Solve the exact ODE t + x ẋ = 0 with x(0) = " + x3 + " and compute x(" + T + ")."),
            I(xT), t("F(t, x) = (t² + x²)/2 ist eine Stammfunktion, also t² + x² = konstant.", "F(t, x) = (t² + x²)/2 is a potential, so t² + x² = constant."), ["t² + x² = " + x3 * x3, "x(" + T + ") = √(" + x3 * x3 + " − " + T * T + ") = " + xT], near(num, xT, 1e-4));
    });

    // =============== Kap. 65 lineare Systeme ===============
    add(65, "linsys", "Lineare DGL-Systeme", "Linear ODE systems", function (r, d) {
        var S = unimod(r), l1 = r.int(-4, 2), l2 = l1 + r.nz(-3, 3), Am = mul(mul(S, [[l1, 0], [0, l2]]), inv2(S)).map(function (rw) { return rw.map(function (x) { return Math.round(x); }); });
        if (d === 1) {
            var AS = t("asymptotisch stabil", "asymptotically stable"), IN = t("instabil", "unstable"), ST = t("stabil, aber nicht asymptotisch", "stable, but not asymptotically"), ans = Math.max(l1, l2) < 0 ? AS : Math.max(l1, l2) > 0 ? IN : ST;
            return Q(t("Ist die Ruhelage 0 von ẋ = A x mit A = " + mat(Am) + " stabil?", "Is the equilibrium 0 of ẋ = A x with A = " + mat(Am) + " stable?"), A.choice(r, ans, [AS, IN, ST].filter(function (x) { return x !== ans; })),
                t("Eigenwerte bestimmen: alle negativ ⇒ asymptotisch stabil, einer positiv ⇒ instabil.", "Find the eigenvalues: all negative ⇒ asymptotically stable, one positive ⇒ unstable."), ["λ = " + l1 + ", " + l2 + " ⇒ " + ans], Am[0][0] + Am[1][1] === l1 + l2 && det2(Am) === l1 * l2);
        }
        if (d === 2) {
            var x0 = [r.int(-3, 3), r.nz(-3, 3)], T = r.pick([0.1, 0.2, 0.5]), c = mv(inv2(S), x0), xT = mv(S, [c[0] * Math.exp(l1 * T), c[1] * Math.exp(l2 * T)]);
            var num = rk2(function (s, x) { return mv(Am, x); }, x0, T, 400);
            return Q(t("Löse ẋ = A x mit A = " + mat(Am) + ", x(0) = " + vec(x0) + " und gib x(" + n(T) + ") an (auf 0,001).", "Solve ẋ = A x with A = " + mat(Am) + ", x(0) = " + vec(x0) + " and give x(" + n(T) + ") (to 0.001)."),
                A.multi([{ l: "x<sub>1</sub>", a: nm(xT[0], 3) }, { l: "x<sub>2</sub>", a: nm(xT[1], 3) }]), t("Eigenwerte und Eigenvektoren (Spalten von S = " + mat(S) + "), dann x(t) = S e<sup>Dt</sup> S<sup>−1</sup> x(0).", "Eigenvalues and eigenvectors (columns of S = " + mat(S) + "), then x(t) = S e<sup>Dt</sup> S<sup>−1</sup> x(0)."),
                ["λ = " + l1 + ", " + l2, "S<sup>−1</sup> x(0) = " + vec(c.map(function (v) { return Math.round(v); })), "x(" + n(T) + ") = (" + n(xT[0], 4) + ", " + n(xT[1], 4) + ")"], near(num[0], xT[0], 1e-6) && near(num[1], xT[1], 1e-6));
        }
        var B; do { B = [[r.int(-4, 4), r.int(-4, 4)], [r.int(-4, 4), r.int(-4, 4)]]; } while (det2(B) === 0);
        var s = [r.int(-6, 6), r.int(-6, 6)], D = det2(B), e1 = -(B[1][1] * s[0] - B[0][1] * s[1]), e2 = -(-B[1][0] * s[0] + B[0][0] * s[1]);
        return Q(t("Bestimme die Ruhelage des Systems ẋ = A x + s mit A = " + mat(B) + " und s = " + vec(s) + ".", "Find the equilibrium of the system ẋ = A x + s with A = " + mat(B) + " and s = " + vec(s) + "."),
            A.multi([{ l: "x<sub>1</sub>*", a: A.frac(e1, D) }, { l: "x<sub>2</sub>*", a: A.frac(e2, D) }]), t("Ruhelage: A x* + s = 0, also x* = −A<sup>−1</sup> s.", "Equilibrium: A x* + s = 0, so x* = −A<sup>−1</sup> s."), ["det A = " + D, "x* = (" + q(e1, D) + ", " + q(e2, D) + ")"], near(B[0][0] * e1 / D + B[0][1] * e2 / D + s[0], 0, 1e-9) && near(B[1][0] * e1 / D + B[1][1] * e2 / D + s[1], 0, 1e-9));
    });

    // =============== Kap. 66 höhere Ordnung, Jordan ===============
    add(66, "hoeher", "Doppelte Eigenwerte und höhere Ordnung", "Double eigenvalues and higher order", function (r, d) {
        var l = r.int(-3, 1), x0 = r.int(-3, 3), v0 = r.int(-3, 3), T = r.pick([0.5, 1, 1.5]);
        if (d === 1) {
            var xT = (x0 + (v0 - l * x0) * T) * Math.exp(l * T), num = rk2(function (s, x) { return [x[1], 2 * l * x[1] - l * l * x[0]]; }, [x0, v0], T, 400)[0];
            return Q(t("Löse ẍ " + H.sg(-2 * l) + "ẋ " + H.sg(l * l) + "x = 0 mit x(0) = " + x0 + ", ẋ(0) = " + v0 + " und berechne x(" + n(T) + ") (auf 0,001).", "Solve ẍ " + H.sg(-2 * l) + "ẋ " + H.sg(l * l) + "x = 0 with x(0) = " + x0 + ", ẋ(0) = " + v0 + " and compute x(" + n(T) + ") (to 0.001)."),
                nm(xT, 3), t("Doppelte Nullstelle λ = " + l + ": x(t) = (C<sub>1</sub> + C<sub>2</sub> t) e<sup>λt</sup>.", "Double root λ = " + l + ": x(t) = (C<sub>1</sub> + C<sub>2</sub> t) e<sup>λt</sup>."), ["C<sub>1</sub> = " + x0 + ", C<sub>2</sub> = " + (v0 - l * x0), "x(" + n(T) + ") = " + n(xT, 4)], near(num, xT, 1e-6));
        }
        if (d === 2) {
            var x1T = (x0 + v0 * T) * Math.exp(l * T), num2 = rk2(function (s, x) { return [l * x[0] + x[1], l * x[1]]; }, [x0, v0], T, 400)[0];
            return Q(t("Löse ẋ = J x mit dem Jordanblock J = " + mat([[l, 1], [0, l]]) + " und x(0) = " + vec([x0, v0]) + ". Gib x<sub>1</sub>(" + n(T) + ") an (auf 0,001).", "Solve ẋ = J x with the Jordan block J = " + mat([[l, 1], [0, l]]) + " and x(0) = " + vec([x0, v0]) + ". Give x<sub>1</sub>(" + n(T) + ") (to 0.001)."),
                nm(x1T, 3), t("e<sup>Jt</sup> = e<sup>λt</sup> " + mat([[1, "t"], [0, 1]]) + ".", "e<sup>Jt</sup> = e<sup>λt</sup> " + mat([[1, "t"], [0, 1]]) + "."), ["x<sub>1</sub>(t) = (" + x0 + " + " + v0 + "t) e<sup>" + l + "t</sup>", "x<sub>1</sub>(" + n(T) + ") = " + n(x1T, 4)], near(num2, x1T, 1e-6));
        }
        var a = r.int(-5, 5), b = r.int(-5, 5), c = r.nz(-5, 5);
        return Q(t("Schreibe x‴ " + H.sg(a) + "ẍ " + H.sg(b) + "ẋ " + H.sg(c) + "x = 0 als System ẏ = A y mit y = (x, ẋ, ẍ). Gib die letzte Zeile von A an.", "Write x‴ " + H.sg(a) + "ẍ " + H.sg(b) + "ẋ " + H.sg(c) + "x = 0 as a system ẏ = A y with y = (x, ẋ, ẍ). Give the last row of A."),
            A.multi([{ l: "a<sub>31</sub>", a: I(-c) }, { l: "a<sub>32</sub>", a: I(-b) }, { l: "a<sub>33</sub>", a: I(-a) }]), t("Die ersten Zeilen sind ẏ<sub>1</sub> = y<sub>2</sub>, ẏ<sub>2</sub> = y<sub>3</sub>. Die letzte stellt x‴ frei.", "The first rows are ẏ<sub>1</sub> = y<sub>2</sub>, ẏ<sub>2</sub> = y<sub>3</sub>. The last one isolates x‴."), ["A = " + mat([[0, 1, 0], [0, 0, 1], [-c, -b, -a]])], -c * 1 + -b * 2 + -a * 3 === -(a * 3 + b * 2 + c));
    });

    // =============== Kap. 67 Ruhelagen ===============
    add(67, "ruhe", "Ruhelagen und ihre Typen", "Equilibria and their types", function (r, d) {
        if (d === 1) {
            var tr = r.int(-5, 5), de = r.int(-6, 9), disc = tr * tr - 4 * de, SA = t("Sattelpunkt", "saddle"), KS = t("stabiler Knoten", "stable node"), KI = t("instabiler Knoten", "unstable node"), WS = t("stabiler Strudel", "stable spiral"), WI = t("instabiler Strudel", "unstable spiral"), ZE = t("Zentrum", "centre");
            if (de === 0) de = -2;
            disc = tr * tr - 4 * de;
            var ans = de < 0 ? SA : disc >= 0 ? (tr < 0 ? KS : KI) : tr < 0 ? WS : tr > 0 ? WI : ZE;
            var Am = [[0, 1], [-de, tr]];
            return Q(t("Welchen Typ hat die Ruhelage 0 von ẋ = A x mit A = " + mat(Am) + "?", "What type is the equilibrium 0 of ẋ = A x with A = " + mat(Am) + "?"), A.choice(r, ans, [SA, KS, KI, WS, WI, ZE].filter(function (x) { return x !== ans; }).slice(0, 3)),
                t("Spur und Determinante: det < 0 Sattel, sonst Diskriminante Spur² − 4 det entscheidet zwischen Knoten und Strudel.", "Trace and determinant: det < 0 saddle, otherwise the discriminant trace² − 4 det decides between node and spiral."), ["Spur = " + tr + ", det = " + de + ", " + t("Diskriminante", "discriminant") + " = " + disc, ans], det2(Am) === de);
        }
        if (d === 2) {
            var a = r.int(1, 6), b = r.int(1, 4), c = r.int(1, 6), dd = r.int(1, 4);
            return Q(t("Bestimme die Ruhelage mit x, y > 0 des Räuber-Beute-Modells ẋ = x(" + a + " − " + b + "y), ẏ = y(" + dd + "x − " + c + ").", "Find the equilibrium with x, y > 0 of the predator-prey model ẋ = x(" + a + " − " + b + "y), ẏ = y(" + dd + "x − " + c + ")."),
                A.multi([{ l: "x*", a: A.frac(c, dd) }, { l: "y*", a: A.frac(a, b) }]), t("Beide Klammern null setzen.", "Set both brackets to zero."), ["y* = " + q(a, b), "x* = " + q(c, dd)], near(a - b * (a / b), 0, 1e-12) && near(dd * c / dd - c, 0, 1e-12));
        }
        var k = r.int(1, 4), b3 = r.int(1, 3), a3 = b3 * k * k, xs = k;
        return Q(t("ẋ = " + a3 + "x − " + ci(b3) + "x³ hat die Ruhelage x* = " + xs + ". Berechne f′(x*) und entscheide damit über die Stabilität. Gib f′(x*) an.", "ẋ = " + a3 + "x − " + ci(b3) + "x³ has the equilibrium x* = " + xs + ". Compute f′(x*) to decide its stability. Give f′(x*)."),
            I(a3 - 3 * b3 * xs * xs), t("Linearisierung: f′(x*) < 0 heißt asymptotisch stabil.", "Linearisation: f′(x*) < 0 means asymptotically stable."), ["f′(x) = " + a3 + " − " + 3 * b3 + "x²", "f′(" + xs + ") = " + (a3 - 3 * b3 * xs * xs) + t(" < 0: stabil", " < 0: stable")], a3 * xs - b3 * Math.pow(xs, 3) === 0 && a3 - 3 * b3 * xs * xs === -2 * a3);
    });

    // =============== Kap. 68 Randwertprobleme ===============
    add(68, "rwp", "Randwertprobleme", "Boundary value problems", function (r, d) {
        if (d === 1) {
            var c = r.nz(-4, 4), a = r.int(-3, 3), b = r.int(-3, 3), L = r.int(1, 4), T = r.pick([0.5, 1, 1.5]), C1 = (b - a - c * L * L / 2) / L, xT = c * T * T / 2 + C1 * T + a;
            if (T > L) T = L / 2;
            xT = c * T * T / 2 + C1 * T + a;
            return Q(t("Löse das Randwertproblem ẍ = " + c + ", x(0) = " + a + ", x(" + L + ") = " + b + " und berechne x(" + n(T) + ") (auf 0,001).", "Solve the boundary value problem ẍ = " + c + ", x(0) = " + a + ", x(" + L + ") = " + b + " and compute x(" + n(T) + ") (to 0.001)."),
                nm(xT, 3), t("x(t) = " + n(c / 2) + "t² + C<sub>1</sub> t + C<sub>0</sub>. Die Konstanten aus den Randwerten.", "x(t) = " + n(c / 2) + "t² + C<sub>1</sub> t + C<sub>0</sub>. The constants come from the boundary values."), ["C<sub>0</sub> = " + a + ", C<sub>1</sub> = " + n(C1, 4), "x(" + n(T) + ") = " + n(xT, 4)], near(c * L * L / 2 + C1 * L + a, b, 1e-9));
        }
        if (d === 2) {
            var sq = r.bool(), k = r.int(1, 5), lam = sq ? k * k : k * k + r.pick([1, 2, k * 2]), NT = t("nur die triviale Lösung x = 0", "only the trivial solution x = 0"), UN = t("unendlich viele Lösungen", "infinitely many solutions"), GE = t("genau eine Lösung x ≠ 0", "exactly one solution x ≠ 0"), ans = sq ? UN : NT;
            return Q(t("Wie viele Lösungen hat ẍ + " + lam + "x = 0, x(0) = 0, x(π) = 0?", "How many solutions does ẍ + " + lam + "x = 0, x(0) = 0, x(π) = 0 have?"), A.choice(r, ans, [NT, UN, GE].filter(function (x) { return x !== ans; })),
                t("x(t) = C sin(√λ t) erfüllt x(π) = 0 genau dann für C ≠ 0, wenn √λ ganzzahlig ist.", "x(t) = C sin(√λ t) satisfies x(π) = 0 with C ≠ 0 exactly when √λ is an integer."), ["√" + lam + (sq ? " = " + k : t(" ist nicht ganzzahlig", " is not an integer")) + " ⇒ " + ans], Math.abs(Math.sin(Math.sqrt(lam) * PI)) < 1e-9 === sq);
        }
        var g = r.int(1, 9) * 9, x1 = g / 9, Ah = [[2, -1], [-1, 2]], sol = solve(Ah, [g / 9, g / 9]);
        return Q(t("Löse −x″ = " + g + ", x(0) = x(1) = 0 mit finiten Differenzen und Schrittweite h = 1/3. Welcher Näherungswert ergibt sich bei t = 1/3?", "Solve −x″ = " + g + ", x(0) = x(1) = 0 with finite differences and step h = 1/3. Which approximation results at t = 1/3?"),
            I(x1), t("(−x<sub>i−1</sub> + 2x<sub>i</sub> − x<sub>i+1</sub>)/h² = " + g + " für die zwei inneren Punkte.", "(−x<sub>i−1</sub> + 2x<sub>i</sub> − x<sub>i+1</sub>)/h² = " + g + " for the two interior points."), ["2x<sub>1</sub> − x<sub>2</sub> = " + g + "/9, −x<sub>1</sub> + 2x<sub>2</sub> = " + g + "/9", "x<sub>1</sub> = x<sub>2</sub> = " + x1 + t(" (exakt, da die Lösung quadratisch ist)", " (exact, because the solution is quadratic)")], near(sol[0], x1, 1e-9) && near(g * (1 / 3) * (2 / 3) / 2, x1, 1e-9));
    });

    // =============== Kap. 69 Kondition ===============
    add(69, "kond", "Kondition", "Condition numbers", function (r, d) {
        if (d === 1) {
            var m; do { m = [[r.int(-5, 5), r.int(-5, 5)], [r.int(-5, 5), r.int(-5, 5)]]; } while (det2(m) === 0);
            var D = det2(m), nA = Math.max(Math.abs(m[0][0]) + Math.abs(m[0][1]), Math.abs(m[1][0]) + Math.abs(m[1][1])), nI = Math.max(Math.abs(m[1][1]) + Math.abs(m[0][1]), Math.abs(m[1][0]) + Math.abs(m[0][0]));
            var iv = inv2(m), nI2 = Math.max(Math.abs(iv[0][0]) + Math.abs(iv[0][1]), Math.abs(iv[1][0]) + Math.abs(iv[1][1]));
            return Q(t("Berechne die Konditionszahl cond<sub>∞</sub>(A) = ‖A‖<sub>∞</sub> ‖A<sup>−1</sup>‖<sub>∞</sub> von A = " + mat(m) + ".", "Compute the condition number cond<sub>∞</sub>(A) = ‖A‖<sub>∞</sub> ‖A<sup>−1</sup>‖<sub>∞</sub> of A = " + mat(m) + "."),
                A.frac(nA * nI, Math.abs(D)), t("‖·‖<sub>∞</sub> ist die maximale Zeilenbetragssumme.", "‖·‖<sub>∞</sub> is the maximum absolute row sum."), ["‖A‖<sub>∞</sub> = " + nA, "A<sup>−1</sup> = 1/" + D + " · " + mat([[m[1][1], -m[0][1]], [-m[1][0], m[0][0]]]) + ", ‖A<sup>−1</sup>‖<sub>∞</sub> = " + q(nI, Math.abs(D)), "cond = " + q(nA * nI, Math.abs(D))], near(nA * nI2, nA * nI / Math.abs(D), 1e-9));
        }
        if (d === 2) {
            var l2 = r.int(1, 4), l1 = l2 + r.int(1, 9), S = r.pick([[[1, 0], [0, 1]], [[0, 1], [1, 0]]]), sg = r.sign(), Am = mul(mul(S, [[l1, 0], [0, sg * l2]]), S);
            return Q(t("Berechne cond<sub>2</sub>(A) für die symmetrische Matrix A = " + mat(Am) + ".", "Compute cond<sub>2</sub>(A) for the symmetric matrix A = " + mat(Am) + "."),
                A.frac(l1, l2), t("Für symmetrisches A: cond<sub>2</sub> = |λ|<sub>max</sub> / |λ|<sub>min</sub>.", "For symmetric A: cond<sub>2</sub> = |λ|<sub>max</sub> / |λ|<sub>min</sub>."), ["λ = " + l1 + ", " + sg * l2, "cond<sub>2</sub> = " + q(l1, l2)], Math.abs(det2(Am)) === l1 * l2);
        }
        var cond = r.pick([10, 50, 100, 250, 1000]), rel = r.pick([0.001, 0.0005, 0.0001, 0.002]), bnd = cond * rel;
        return Q(t("Ein System A x = b hat cond(A) = " + cond + ". Die rechte Seite b ist mit einem relativen Fehler von " + n(rel * 100, 2) + " % behaftet. Wie groß kann der relative Fehler von x höchstens sein (in %)?", "A system A x = b has cond(A) = " + cond + ". The right-hand side b has a relative error of " + n(rel * 100, 2) + " %. How large can the relative error of x be at most (in %)?"),
            nm(bnd * 100, 2, "%"), "‖Δx‖/‖x‖ ≤ cond(A) · ‖Δb‖/‖b‖.", [cond + " · " + n(rel * 100, 2) + " % = " + n(bnd * 100, 2) + " %"], near(bnd, cond * rel, 1e-12));
    });

    // =============== Kap. 70 Fixpunktiteration ===============
    add(70, "fixpkt", "Fixpunktiteration", "Fixed-point iteration", function (r, d) {
        if (d === 1) {
            var a = r.int(1, 6), x0 = r.pick([0, 0.5, 1, 2]), g = function (x) { return a / (1 + x); }, x1 = g(x0), x2 = g(x1);
            return Q(t("Führe zwei Schritte der Fixpunktiteration x<sub>k+1</sub> = " + a + " / (1 + x<sub>k</sub>) mit x<sub>0</sub> = " + n(x0) + " aus. Gib x<sub>2</sub> an (auf 0,0001).", "Do two steps of the fixed-point iteration x<sub>k+1</sub> = " + a + " / (1 + x<sub>k</sub>) with x<sub>0</sub> = " + n(x0) + ". Give x<sub>2</sub> (to 0.0001)."),
                nm(x2, 4), t("Einfach zweimal einsetzen.", "Just substitute twice."), ["x<sub>1</sub> = " + n(x1, 5), "x<sub>2</sub> = " + n(x2, 5)], near(x2 * (1 + x1), a, 1e-12));
        }
        if (d === 2) {
            var L = r.pick([0.5, 0.25, 0.8, 0.9, 0.6]), dx = r.pick([1, 0.5, 0.1, 2]), eps = r.pick([1e-3, 1e-4, 1e-6]), k = Math.ceil(Math.log(eps * (1 - L) / dx) / Math.log(L));
            var k2 = 0; while (Math.pow(L, k2) / (1 - L) * dx > eps) k2 += 1;
            return Q(t("Eine Kontraktion mit Konstante L = " + n(L) + " liefert |x<sub>1</sub> − x<sub>0</sub>| = " + n(dx) + ". Wie viele Schritte k garantieren nach der a-priori-Abschätzung |x<sub>k</sub> − x*| ≤ " + n(eps) + "?", "A contraction with constant L = " + n(L) + " gives |x<sub>1</sub> − x<sub>0</sub>| = " + n(dx) + ". How many steps k guarantee |x<sub>k</sub> − x*| ≤ " + n(eps) + " by the a priori estimate?"),
                I(k2), "|x<sub>k</sub> − x*| ≤ L<sup>k</sup> / (1 − L) · |x<sub>1</sub> − x<sub>0</sub>|.", ["L<sup>k</sup> ≤ " + n(eps * (1 - L) / dx), "k ≥ " + n(Math.log(eps * (1 - L) / dx) / Math.log(L), 3) + " ⇒ k = " + k2], k === k2);
        }
        var a3 = r.pick([1.5, 2, 2.5, 2.8, 3.2, 3.5, 3.9]), xs = 1 - 1 / a3, gp = 2 - a3, CO = t("konvergiert lokal gegen x*", "converges locally to x*"), DI = t("divergiert von x* weg", "moves away from x*"), UN = t("keine Aussage möglich", "no conclusion possible"), ans = Math.abs(gp) < 1 ? CO : DI;
        return Q(t("Die Iteration x<sub>k+1</sub> = " + n(a3) + " x<sub>k</sub>(1 − x<sub>k</sub>) hat den Fixpunkt x* = " + n(xs, 4) + ". Was gilt für Startwerte nahe x*?", "The iteration x<sub>k+1</sub> = " + n(a3) + " x<sub>k</sub>(1 − x<sub>k</sub>) has the fixed point x* = " + n(xs, 4) + ". What holds for starting values near x*?"),
            A.choice(r, ans, [CO, DI, UN].filter(function (x) { return x !== ans; })), t("Lokale Konvergenz, wenn |g′(x*)| < 1.", "Local convergence if |g′(x*)| < 1."), ["g′(x*) = " + n(a3) + "(1 − 2x*) = " + n(gp, 3), ans], near(a3 * xs * (1 - xs), xs, 1e-12) && near(a3 * (1 - 2 * xs), gp, 1e-12));
    });

    // =============== Kap. 71 iterative LGS ===============
    function dd(r) { var a = r.int(4, 9), b = r.int(-3, 3), c = r.int(-3, 3), e = r.int(4, 9); return [[a, b], [c, e]]; }
    add(71, "jacobi", "Jacobi- und Gauß-Seidel-Verfahren", "Jacobi and Gauss-Seidel methods", function (r, d) {
        var m = dd(r), b = [r.int(-9, 9), r.int(-9, 9)], x0 = [r.int(-1, 1), r.int(-1, 1)];
        if (d === 1) { var j = [(b[0] - m[0][1] * x0[1]) / m[0][0], (b[1] - m[1][0] * x0[0]) / m[1][1]];
            return Q(t("Führe für A x = b mit A = " + mat(m) + ", b = " + vec(b) + " einen Jacobi-Schritt mit x<sup>(0)</sup> = " + vec(x0) + " aus.", "For A x = b with A = " + mat(m) + ", b = " + vec(b) + " do one Jacobi step with x<sup>(0)</sup> = " + vec(x0) + "."),
                A.multi([{ l: "x<sub>1</sub><sup>(1)</sup>", a: A.frac(b[0] - m[0][1] * x0[1], m[0][0]) }, { l: "x<sub>2</sub><sup>(1)</sup>", a: A.frac(b[1] - m[1][0] * x0[0], m[1][1]) }]), t("Jede Gleichung nach ihrer Diagonalvariablen auflösen, rechts nur alte Werte.", "Solve each equation for its diagonal variable, with only old values on the right."), ["x<sub>1</sub> = (" + b[0] + " − " + m[0][1] + "·" + x0[1] + ")/" + m[0][0], "x<sub>2</sub> = (" + b[1] + " − " + m[1][0] + "·" + x0[0] + ")/" + m[1][1]], near(m[0][0] * j[0] + m[0][1] * x0[1], b[0], 1e-12)); }
        if (d === 2) { var g1n = b[0] - m[0][1] * x0[1], g1 = g1n / m[0][0], g2n = b[1] * m[0][0] - m[1][0] * g1n, g2 = g2n / (m[0][0] * m[1][1]);
            return Q(t("Führe für A x = b mit A = " + mat(m) + ", b = " + vec(b) + " einen Gauß-Seidel-Schritt mit x<sup>(0)</sup> = " + vec(x0) + " aus.", "For A x = b with A = " + mat(m) + ", b = " + vec(b) + " do one Gauss-Seidel step with x<sup>(0)</sup> = " + vec(x0) + "."),
                A.multi([{ l: "x<sub>1</sub><sup>(1)</sup>", a: A.frac(g1n, m[0][0]) }, { l: "x<sub>2</sub><sup>(1)</sup>", a: A.frac(g2n, m[0][0] * m[1][1]) }]), t("Wie Jacobi, aber das neue x<sub>1</sub> wird sofort in der zweiten Gleichung verwendet.", "Like Jacobi, but the new x<sub>1</sub> is used at once in the second equation."), ["x<sub>1</sub> = " + q(g1n, m[0][0]), "x<sub>2</sub> = (" + b[1] + " − " + m[1][0] + "·x<sub>1</sub>)/" + m[1][1] + " = " + q(g2n, m[0][0] * m[1][1])], near(m[1][0] * g1 + m[1][1] * g2, b[1], 1e-12)); }
        var rho = Math.sqrt(Math.abs(m[0][1] * m[1][0] / (m[0][0] * m[1][1])));
        if (rho === 0) { m[0][1] = 2; m[1][0] = r.nz(-3, 3); rho = Math.sqrt(Math.abs(m[0][1] * m[1][0] / (m[0][0] * m[1][1]))); }
        var J = [[0, -m[0][1] / m[0][0]], [-m[1][0] / m[1][1], 0]], ev = Math.sqrt(Math.abs(det2(J)));
        return Q(t("Berechne den Spektralradius der Jacobi-Iterationsmatrix für A = " + mat(m) + " (auf 0,0001).", "Compute the spectral radius of the Jacobi iteration matrix for A = " + mat(m) + " (to 0.0001)."),
            nm(rho, 4), t("J = −D<sup>−1</sup>(L + R). Für 2×2 gilt λ² = a<sub>12</sub>a<sub>21</sub> / (a<sub>11</sub>a<sub>22</sub>).", "J = −D<sup>−1</sup>(L + U). For 2×2, λ² = a<sub>12</sub>a<sub>21</sub> / (a<sub>11</sub>a<sub>22</sub>)."), ["J = " + mat([[0, q(-m[0][1], m[0][0])], [q(-m[1][0], m[1][1]), 0]]), "ρ(J) = " + n(rho, 5) + (rho < 1 ? t(" < 1: konvergent", " < 1: convergent") : "")], near(ev, rho, 1e-12));
    });

    // =============== Kap. 72 Optimierung ===============
    add(72, "optim", "Gradienten- und Newtonverfahren", "Gradient and Newton methods", function (r, d) {
        var a = r.int(1, 4), c = r.int(1, 4), b = [r.int(-5, 5), r.int(-5, 5)], Am = [[a, 0], [0, c]], x0 = [r.int(-2, 2), r.int(-2, 2)];
        var g = [a * x0[0] - b[0], c * x0[1] - b[1]];
        if (g[0] === 0 && g[1] === 0) { x0[0] += 1; g = [a * x0[0] - b[0], c * x0[1] - b[1]]; }
        var fq = "f(x, y) = " + H.lin([[a / 2, "x²"], [c / 2, "y²"], [-b[0], "x"], [-b[1], "y"]]);
        if (d === 1) {
            var gg = g[0] * g[0] + g[1] * g[1], gAg = a * g[0] * g[0] + c * g[1] * g[1], x1 = [x0[0] - gg / gAg * g[0], x0[1] - gg / gAg * g[1]];
            var phi = function (s) { var X = x0[0] - s * g[0], Y = x0[1] - s * g[1]; return a / 2 * X * X + c / 2 * Y * Y - b[0] * X - b[1] * Y; };
            return Q(t("Führe für " + fq + " einen Schritt des Gradientenverfahrens mit exakter Schrittweite ab (" + x0.join(", ") + ") aus (auf 0,001).", "For " + fq + " do one step of the gradient method with exact line search from (" + x0.join(", ") + ") (to 0.001)."),
                A.multi([{ l: "x<sub>1</sub>", a: nm(x1[0], 3) }, { l: "y<sub>1</sub>", a: nm(x1[1], 3) }]), t("Richtung −∇f. Für quadratische f ist die optimale Schrittweite α = g<sup>T</sup>g / g<sup>T</sup>A g.", "Direction −∇f. For quadratic f the optimal step is α = g<sup>T</sup>g / g<sup>T</sup>A g."),
                ["∇f = " + vec(g), "α = " + q(gg, gAg), "x<sub>1</sub> = (" + n(x1[0], 4) + ", " + n(x1[1], 4) + ")"], near((phi(gg / gAg + 1e-5) - phi(gg / gAg - 1e-5)) / 2e-5, 0, 1e-6));
        }
        if (d === 2) {
            var p = r.int(1, 8), x02 = r.pick([1, 2, 3]), fp = Math.pow(x02, 3) - p, fpp = 3 * x02 * x02, x12 = x02 - fp / fpp;
            return Q(t("Führe einen Schritt des Newtonverfahrens zur Minimierung von f(x) = x⁴/4 − " + p + "x mit x<sub>0</sub> = " + x02 + " aus (auf 0,0001).", "Do one step of Newton's method for minimising f(x) = x⁴/4 − " + p + "x with x<sub>0</sub> = " + x02 + " (to 0.0001)."),
                nm(x12, 4), "x<sub>1</sub> = x<sub>0</sub> − f′(x<sub>0</sub>) / f″(x<sub>0</sub>).", ["f′(x) = x³ − " + p + ", f″(x) = 3x²", "x<sub>1</sub> = " + x02 + " − " + fp + "/" + fpp + " = " + n(x12, 5)], near(fp + fpp * (x12 - x02), 0, 1e-12));
        }
        var h = r.pick([0.1, 0.2, 0.25, 0.5]), x13 = [x0[0] - h * g[0], x0[1] - h * g[1]];
        return Q(t("Führe für " + fq + " einen Schritt des Gradientenverfahrens mit fester Schrittweite h = " + n(h) + " ab (" + x0.join(", ") + ") aus.", "For " + fq + " do one step of the gradient method with fixed step h = " + n(h) + " from (" + x0.join(", ") + ")."),
            A.multi([{ l: "x<sub>1</sub>", a: nm(x13[0], 3) }, { l: "y<sub>1</sub>", a: nm(x13[1], 3) }]), "x<sub>1</sub> = x<sub>0</sub> − h ∇f(x<sub>0</sub>).", ["∇f(x<sub>0</sub>) = " + vec(g), "x<sub>1</sub> = (" + n(x13[0], 3) + ", " + n(x13[1], 3) + ")"], near(x13[0] - x0[0], -h * (a * x0[0] - b[0]), 1e-12));
    });

    // =============== Kap. 73 steife DGL ===============
    add(73, "steif", "Stabilität numerischer Verfahren", "Stability of numerical methods", function (r, d) {
        var lam = -r.pick([5, 10, 20, 50, 100, 4, 8]), x0 = r.int(1, 5), h = r.pick([0.01, 0.05, 0.1, 0.2]);
        if (d === 1) return Q(t("Für welche Schrittweiten h ist das explizite Euler-Verfahren für ẋ = " + lam + "x stabil? Gib die größte zulässige Schrittweite h<sub>max</sub> an.", "For which step sizes h is the explicit Euler method for ẋ = " + lam + "x stable? Give the largest admissible step h<sub>max</sub>."),
            A.frac(2, -lam), t("x<sub>k+1</sub> = (1 + hλ) x<sub>k</sub>. Stabil, wenn |1 + hλ| ≤ 1.", "x<sub>k+1</sub> = (1 + hλ) x<sub>k</sub>. Stable if |1 + hλ| ≤ 1."), ["|1 " + H.sg(lam) + "h| ≤ 1 ⇔ 0 < h ≤ " + q(2, -lam)], Math.abs(1 + 2 / -lam * lam) <= 1 + 1e-12);
        if (d === 2) { var x1 = x0 / (1 - h * lam);
            return Q(t("Führe für ẋ = " + lam + "x, x(0) = " + x0 + " einen Schritt des impliziten Euler-Verfahrens mit h = " + n(h) + " aus (auf 0,0001).", "For ẋ = " + lam + "x, x(0) = " + x0 + " do one step of the implicit Euler method with h = " + n(h) + " (to 0.0001)."),
                nm(x1, 4), t("x<sub>1</sub> = x<sub>0</sub> + h λ x<sub>1</sub>, nach x<sub>1</sub> auflösen.", "x<sub>1</sub> = x<sub>0</sub> + h λ x<sub>1</sub>, solve for x<sub>1</sub>."), ["x<sub>1</sub> = " + x0 + " / (1 + " + n(-h * lam) + ") = " + n(x1, 5)], near(x1 - x0, h * lam * x1, 1e-12)); }
        var x13 = x0 * (1 + h * lam / 2) / (1 - h * lam / 2);
        return Q(t("Führe für ẋ = " + lam + "x, x(0) = " + x0 + " einen Schritt der Trapezregel (implizit) mit h = " + n(h) + " aus (auf 0,0001).", "For ẋ = " + lam + "x, x(0) = " + x0 + " do one step of the (implicit) trapezoidal rule with h = " + n(h) + " (to 0.0001)."),
            nm(x13, 4), "x<sub>1</sub> = x<sub>0</sub> + h/2 (λx<sub>0</sub> + λx<sub>1</sub>).", ["x<sub>1</sub> = " + x0 + " · (1 " + H.sg(h * lam / 2) + ") / (1 " + H.sg(-h * lam / 2) + ") = " + n(x13, 5)], near(x13 - x0, h / 2 * (lam * x0 + lam * x13), 1e-12));
    });

    // =============== Kap. 74 Fourierreihen ===============
    add(74, "fourier", "Fourierkoeffizienten berechnen", "Computing Fourier coefficients", function (r, d) {
        var k = r.int(1, 8), c = r.nz(-3, 3);
        if (d === 1) { var bk = 2 * c * (k % 2 ? 1 : -1);
            return Q(t("Die 2π-periodische Funktion f mit f(x) = " + ci(c) + "x auf (−π, π) hat die Fourierreihe Σ b<sub>k</sub> sin(kx). Berechne b<sub>" + k + "</sub>.", "The 2π-periodic function f with f(x) = " + ci(c) + "x on (−π, π) has the Fourier series Σ b<sub>k</sub> sin(kx). Compute b<sub>" + k + "</sub>."),
                A.frac(bk, k), "b<sub>k</sub> = (1/π) ∫<sub>−π</sub><sup>π</sup> f(x) sin(kx) dx = " + t("partiell integrieren", "integrate by parts") + ".", ["b<sub>k</sub> = " + 2 * c + " (−1)<sup>k+1</sup>/k", "b<sub>" + k + "</sub> = " + q(bk, k)], near(simpson(function (x) { return c * x * Math.sin(k * x); }, -PI, PI, 2000) / PI, bk / k, 1e-6)); }
        if (d === 2) { var ak = k % 2 ? -4 * c / (PI * k * k) : 0;
            return Q(t("Für f(x) = " + ci(c) + "|x| auf (−π, π), 2π-periodisch fortgesetzt: Berechne den Fourierkoeffizienten a<sub>" + k + "</sub> (auf 0,0001).", "For f(x) = " + ci(c) + "|x| on (−π, π), extended 2π-periodically: compute the Fourier coefficient a<sub>" + k + "</sub> (to 0.0001)."),
                nm(ak, 4), t("f ist gerade, also a<sub>k</sub> = (2/π) ∫<sub>0</sub><sup>π</sup> f(x) cos(kx) dx.", "f is even, so a<sub>k</sub> = (2/π) ∫<sub>0</sub><sup>π</sup> f(x) cos(kx) dx."), ["a<sub>k</sub> = " + 2 * c + "((−1)<sup>k</sup> − 1)/(π k²)", "a<sub>" + k + "</sub> = " + n(ak, 5)], near(2 / PI * simpson(function (x) { return c * x * Math.cos(k * x); }, 0, PI, 2000), ak, 1e-6)); }
        var a3 = 4 * c * (k % 2 ? -1 : 1);
        return Q(t("Für f(x) = " + ci(c) + "x² auf (−π, π), 2π-periodisch fortgesetzt: Berechne den Fourierkoeffizienten a<sub>" + k + "</sub>.", "For f(x) = " + ci(c) + "x² on (−π, π), extended 2π-periodically: compute the Fourier coefficient a<sub>" + k + "</sub>."),
            A.frac(a3, k * k), t("Zweimal partiell integrieren. Ergebnis: a<sub>k</sub> = 4c (−1)<sup>k</sup>/k².", "Integrate by parts twice. Result: a<sub>k</sub> = 4c (−1)<sup>k</sup>/k²."), ["a<sub>" + k + "</sub> = " + q(a3, k * k), t("Mit x = π folgt daraus Σ 1/k² = π²/6.", "With x = π this gives Σ 1/k² = π²/6.")], near(2 / PI * simpson(function (x) { return c * x * x * Math.cos(k * x); }, 0, PI, 2000), a3 / (k * k), 1e-6));
    });

    // =============== Kap. 75 Fourierreihen II ===============
    add(75, "fourier2", "Periode, komplexe Koeffizienten, Reihenwerte", "Period, complex coefficients, series values", function (r, d) {
        if (d === 1) {
            var g = r.int(1, 3), p = g * r.int(1, 4), qq = g * r.int(1, 5); if (M.gcd(p, qq) !== g) qq = g * (p / g + 1);
            var w = M.gcd(p, qq), T = 2 * PI / w;
            return Q(t("Welche kleinste Periode T hat f(t) = sin(" + p + "t) + cos(" + qq + "t)? Gib T auf 0,0001 an.", "What is the smallest period T of f(t) = sin(" + p + "t) + cos(" + qq + "t)? Give T to 0.0001."),
                nm(T, 4), t("T = 2π / ggT(" + p + ", " + qq + ").", "T = 2π / gcd(" + p + ", " + qq + ")."), ["ggT = " + w, "T = 2π/" + w + " = " + n(T, 5)], near(Math.sin(p * (1 + T)) + Math.cos(qq * (1 + T)), Math.sin(p) + Math.cos(qq), 1e-9));
        }
        if (d === 2) {
            var a = r.int(-6, 6), b = r.nz(-6, 6), k = r.int(1, 4);
            return Q(t("Gib den komplexen Fourierkoeffizienten c<sub>" + k + "</sub> von f(t) = " + a + " cos(" + k + "t) " + H.sg(b) + " sin(" + k + "t) an.", "Give the complex Fourier coefficient c<sub>" + k + "</sub> of f(t) = " + a + " cos(" + k + "t) " + H.sg(b) + " sin(" + k + "t)."),
                A.multi([{ l: "Re c<sub>" + k + "</sub>", a: A.frac(a, 2) }, { l: "Im c<sub>" + k + "</sub>", a: A.frac(-b, 2) }]), "c<sub>k</sub> = (a<sub>k</sub> − i b<sub>k</sub>)/2.", ["c<sub>" + k + "</sub> = (" + a + " − " + b + "i)/2"], near(simpson(function (s) { return (a * Math.cos(k * s) + b * Math.sin(k * s)) * Math.cos(k * s); }, 0, 2 * PI, 400) / (2 * PI), a / 2, 1e-8) && near(-simpson(function (s) { return (a * Math.cos(k * s) + b * Math.sin(k * s)) * Math.sin(k * s); }, 0, 2 * PI, 400) / (2 * PI), -b / 2, 1e-8));
        }
        var c = r.int(1, 9), val = c * PI * PI / 8, s = 0; for (var j = 0; j < 200000; j += 1) s += c / ((2 * j + 1) * (2 * j + 1));
        return Q(t("Die Fourierreihe von |x| lautet π/2 − (4/π) Σ<sub>k≥0</sub> cos((2k+1)x)/(2k+1)². Setze x = 0 ein und berechne Σ<sub>k=0</sub><sup>∞</sup> " + c + "/(2k+1)² (auf 0,0001).", "The Fourier series of |x| is π/2 − (4/π) Σ<sub>k≥0</sub> cos((2k+1)x)/(2k+1)². Substitute x = 0 and compute Σ<sub>k=0</sub><sup>∞</sup> " + c + "/(2k+1)² (to 0.0001)."),
            nm(val, 4), t("Bei x = 0 ist die Reihe gleich f(0) = 0.", "At x = 0 the series equals f(0) = 0."), ["0 = π/2 − (4/π) Σ 1/(2k+1)² ⇒ Σ = π²/8", "· " + c + " = " + n(val, 5)], near(s, val, 1e-4));
    });

    // =============== Kap. 76 Fouriertransformation ===============
    add(76, "ftrafo", "Fouriertransformation", "Fourier transform", function (r, d) {
        var w = r.int(1, 4);
        if (d === 1) { var a = r.pick([0.5, 1, 1.5, 2]), v = 2 * Math.sin(a * w) / w;
            return Q(t("Berechne die Fouriertransformierte F(ω) = ∫ f(t) e<sup>−iωt</sup> dt der Rechteckfunktion f(t) = 1 für |t| ≤ " + n(a) + ", sonst 0, bei ω = " + w + " (auf 0,0001).", "Compute the Fourier transform F(ω) = ∫ f(t) e<sup>−iωt</sup> dt of the rectangle f(t) = 1 for |t| ≤ " + n(a) + ", 0 otherwise, at ω = " + w + " (to 0.0001)."),
                nm(v, 4), "F(ω) = 2 sin(aω)/ω.", ["F(" + w + ") = 2 sin(" + n(a * w) + ")/" + w + " = " + n(v, 5)], near(simpson(function (s) { return Math.cos(w * s); }, -a, a, 2000), v, 1e-8)); }
        if (d === 2) { var a2 = r.int(1, 4), v2 = 2 * a2 / (a2 * a2 + w * w);
            return Q(t("Berechne die Fouriertransformierte von f(t) = e<sup>−" + ci(a2) + "|t|</sup> bei ω = " + w + ".", "Compute the Fourier transform of f(t) = e<sup>−" + ci(a2) + "|t|</sup> at ω = " + w + "."),
                A.frac(2 * a2, a2 * a2 + w * w), "F(ω) = 2a/(a² + ω²).", ["F(" + w + ") = " + 2 * a2 + "/(" + a2 * a2 + " + " + w * w + ") = " + q(2 * a2, a2 * a2 + w * w)], near(ftr(function (s) { return Math.exp(-a2 * Math.abs(s)); }, w, 40 / a2), v2, 1e-6)); }
        var a3 = r.pick([0.5, 1, 2, 0.25]), v3 = Math.sqrt(PI / a3) * Math.exp(-w * w / (4 * a3));
        return Q(t("Berechne die Fouriertransformierte von f(t) = e<sup>−" + ci(a3) + "t²</sup> bei ω = " + w + " (auf 0,0001).", "Compute the Fourier transform of f(t) = e<sup>−" + ci(a3) + "t²</sup> at ω = " + w + " (to 0.0001)."),
            nm(v3, 4), "F(ω) = √(π/a) e<sup>−ω²/(4a)</sup>.", ["F(" + w + ") = √(π/" + n(a3) + ") e<sup>−" + n(w * w / (4 * a3)) + "</sup> = " + n(v3, 5)], near(ftr(function (s) { return Math.exp(-a3 * s * s); }, w, 12 / Math.sqrt(a3)), v3, 1e-7));
    });

    // =============== Kap. 77 Rechenregeln Fourier ===============
    add(77, "fregeln", "Verschiebung, Faltung, Ableitung", "Shift, convolution, derivative", function (r, d) {
        var a = r.int(1, 4), w = r.int(1, 4);
        if (d === 1) { var t0 = r.nz(-3, 3);
            return Q(t("Wie groß ist |F(ω)| für f(t) = e<sup>−" + ci(a) + "|t " + H.sg(-t0) + "|</sup> bei ω = " + w + "?", "What is |F(ω)| for f(t) = e<sup>−" + ci(a) + "|t " + H.sg(-t0) + "|</sup> at ω = " + w + "?"),
                A.frac(2 * a, a * a + w * w), t("Verschiebungssatz: F[f(t − t<sub>0</sub>)] = e<sup>−iωt<sub>0</sub></sup> F[f]. Der Betrag ändert sich nicht.", "Shift theorem: F[f(t − t<sub>0</sub>)] = e<sup>−iωt<sub>0</sub></sup> F[f]. The modulus does not change."), ["|F(ω)| = 2a/(a² + ω²) = " + q(2 * a, a * a + w * w)], near(Math.hypot(ftr(function (s) { return Math.exp(-a * Math.abs(s - t0)); }, w, 40), simpson(function (s) { return Math.exp(-a * Math.abs(s - t0)) * Math.sin(w * s); }, -40, 40, 4000)), 2 * a / (a * a + w * w), 1e-5)); }
        if (d === 2) { var tt = r.pick([0, 0.5, 1, 2, -1]), v = (1 + Math.abs(tt)) * Math.exp(-Math.abs(tt));
            return Q(t("Berechne die Faltung (f ∗ f)(t) für f(t) = e<sup>−|t|</sup> an der Stelle t = " + n(tt) + " (auf 0,0001).", "Compute the convolution (f ∗ f)(t) for f(t) = e<sup>−|t|</sup> at t = " + n(tt) + " (to 0.0001)."),
                nm(v, 4), t("(f ∗ f)(t) = ∫ e<sup>−|s|</sup> e<sup>−|t−s|</sup> ds = (1 + |t|) e<sup>−|t|</sup>.", "(f ∗ f)(t) = ∫ e<sup>−|s|</sup> e<sup>−|t−s|</sup> ds = (1 + |t|) e<sup>−|t|</sup>."), ["(f ∗ f)(" + n(tt) + ") = " + n(v, 5)], near(simpson(function (s) { return Math.exp(-Math.abs(s)) * Math.exp(-Math.abs(tt - s)); }, -40, 40, 8000), v, 1e-5)); }
        return Q(t("Für f(t) = e<sup>−" + ci(a) + "|t|</sup> ist F(ω) = 2a/(a² + ω²). Wie groß ist |F[f′](ω)| bei ω = " + w + "?", "For f(t) = e<sup>−" + ci(a) + "|t|</sup>, F(ω) = 2a/(a² + ω²). What is |F[f′](ω)| at ω = " + w + "?"),
            A.frac(2 * a * w, a * a + w * w), t("Ableitungssatz: F[f′](ω) = iω F(ω).", "Derivative theorem: F[f′](ω) = iω F(ω)."), ["|F[f′](" + w + ")| = " + w + " · " + q(2 * a, a * a + w * w) + " = " + q(2 * a * w, a * a + w * w)], near(Math.abs(simpson(function (s) { return -a * Math.sign(s) * Math.exp(-a * Math.abs(s)) * Math.sin(w * s); }, -40, 40, 8000)), 2 * a * w / (a * a + w * w), 1e-5));
    });

    // =============== Kap. 78 DFT ===============
    function dft(y, k) { var N = y.length, re = 0, im = 0; for (var j = 0; j < N; j += 1) { re += y[j] * Math.cos(2 * PI * j * k / N); im -= y[j] * Math.sin(2 * PI * j * k / N); } return [re / N, im / N]; }
    add(78, "dft", "Diskrete Fouriertransformation", "Discrete Fourier transform", function (r, d) {
        var y = [r.int(-4, 4), r.int(-4, 4), r.int(-4, 4), r.int(-4, 4)];
        if (d === 1) { var c0 = dft(y, 0)[0], c2 = dft(y, 2)[0], s0 = y[0] + y[1] + y[2] + y[3], s2 = y[0] - y[1] + y[2] - y[3];
            return Q(t("Berechne für y = " + vec(y) + " die DFT-Koeffizienten c<sub>k</sub> = (1/4) Σ<sub>j</sub> y<sub>j</sub> e<sup>−2πijk/4</sup> für k = 0 und k = 2.", "For y = " + vec(y) + " compute the DFT coefficients c<sub>k</sub> = (1/4) Σ<sub>j</sub> y<sub>j</sub> e<sup>−2πijk/4</sup> for k = 0 and k = 2."),
                A.multi([{ l: "c<sub>0</sub>", a: A.frac(s0, 4) }, { l: "c<sub>2</sub>", a: A.frac(s2, 4) }]), t("e<sup>−2πij·2/4</sup> = (−1)<sup>j</sup>.", "e<sup>−2πij·2/4</sup> = (−1)<sup>j</sup>."), ["c<sub>0</sub> = " + q(s0, 4), "c<sub>2</sub> = " + q(s2, 4)], near(c0, s0 / 4, 1e-12) && near(c2, s2 / 4, 1e-12)); }
        if (d === 2) { var fs = r.pick([10, 20, 50, 100]), f = r.int(1, 4) * fs + r.pick([1, 2, 3, -1, -2]) * (fs / 10), al = Math.abs(f - Math.round(f / fs) * fs);
            return Q(t("Ein Sinus der Frequenz " + f + " Hz wird mit f<sub>s</sub> = " + fs + " Hz abgetastet. Bei welcher Frequenz zwischen 0 und f<sub>s</sub>/2 erscheint er (Aliasing)?", "A sine of frequency " + f + " Hz is sampled at f<sub>s</sub> = " + fs + " Hz. At which frequency between 0 and f<sub>s</sub>/2 does it appear (aliasing)?"),
                nm(al, 1, "Hz"), t("Die Frequenz wird um Vielfache von f<sub>s</sub> verschoben, bis sie in [0, f<sub>s</sub>/2] liegt.", "The frequency is shifted by multiples of f<sub>s</sub> until it lies in [0, f<sub>s</sub>/2]."), ["|" + f + " − " + Math.round(f / fs) + "·" + fs + "| = " + n(al) + " Hz"], al <= fs / 2 && near(Math.sin(2 * PI * f * 3 / fs) + Math.sin(2 * PI * al * 3 / fs) * (f - Math.round(f / fs) * fs < 0 ? 1 : -1), 0, 1e-9)); }
        var c1 = dft(y, 1), re = y[0] - y[2], im = -(y[1] - y[3]);
        return Q(t("Berechne für y = " + vec(y) + " den DFT-Koeffizienten c<sub>1</sub> = (1/4) Σ<sub>j</sub> y<sub>j</sub> e<sup>−2πij/4</sup>.", "For y = " + vec(y) + " compute the DFT coefficient c<sub>1</sub> = (1/4) Σ<sub>j</sub> y<sub>j</sub> e<sup>−2πij/4</sup>."),
            A.multi([{ l: "Re c<sub>1</sub>", a: A.frac(re, 4) }, { l: "Im c<sub>1</sub>", a: A.frac(im, 4) }]), t("Die Einheitswurzeln sind 1, −i, −1, i.", "The roots of unity are 1, −i, −1, i."), ["c<sub>1</sub> = (" + y[0] + " − " + y[1] + "i − " + y[2] + " + " + y[3] + "i)/4", "= " + q(re, 4) + " + (" + q(im, 4) + ") i"], near(c1[0], re / 4, 1e-12) && near(c1[1], im / 4, 1e-12));
    });

    // =============== Kap. 79 Laplacetransformation ===============
    add(79, "laplace", "Laplacetransformation", "Laplace transform", function (r, d) {
        if (d === 1) { var a = r.int(-3, 3), b = r.int(1, 4), s = a + r.int(1, 4), num = s - a, den = (s - a) * (s - a) + b * b;
            return Q(t("Berechne L{e<sup>" + ci(a) + "t</sup> cos(" + b + "t)}(s) an der Stelle s = " + s + ".", "Compute L{e<sup>" + ci(a) + "t</sup> cos(" + b + "t)}(s) at s = " + s + "."), A.frac(num, den),
                t("L{cos bt} = s/(s² + b²), dazu der Dämpfungssatz s → s − a.", "L{cos bt} = s/(s² + b²), plus the shift rule s → s − a."), ["(s − " + a + ")/((s − " + a + ")² + " + b * b + ") = " + q(num, den)], near(simpson(function (x) { return Math.exp(a * x) * Math.cos(b * x) * Math.exp(-s * x); }, 0, 60, 30000), num / den, 1e-6)); }
        if (d === 2) { var p = r.int(-3, 1), qq = p - r.int(1, 3), T = r.pick([0.5, 1, 2]), v = (Math.exp(p * T) - Math.exp(qq * T)) / (p - qq);
            return Q(t("Bestimme f(t) mit L{f}(s) = 1/((s " + H.sg(-p) + ")(s " + H.sg(-qq) + ")) und berechne f(" + n(T) + ") (auf 0,0001).", "Find f(t) with L{f}(s) = 1/((s " + H.sg(-p) + ")(s " + H.sg(-qq) + ")) and compute f(" + n(T) + ") (to 0.0001)."),
                nm(v, 4), t("Partialbrüche und L{e<sup>at</sup>} = 1/(s − a).", "Partial fractions and L{e<sup>at</sup>} = 1/(s − a)."), ["f(t) = (e<sup>" + p + "t</sup> − e<sup>" + qq + "t</sup>)/" + (p - qq), "f(" + n(T) + ") = " + n(v, 5)], near(rk2(function (s2, x) { return [x[1], (p + qq) * x[1] - p * qq * x[0]]; }, [0, 1], T, 1000)[0], v, 1e-7)); }
        var w = r.int(1, 4), x0 = r.int(-3, 3), v0 = r.int(-4, 4), T3 = r.pick([0.5, 1, 1.5]), xT = x0 * Math.cos(w * T3) + v0 / w * Math.sin(w * T3);
        return Q(t("Löse mit der Laplacetransformation ẍ + " + w * w + "x = 0, x(0) = " + x0 + ", ẋ(0) = " + v0 + " und berechne x(" + n(T3) + ") (auf 0,0001).", "Use the Laplace transform to solve ẍ + " + w * w + "x = 0, x(0) = " + x0 + ", ẋ(0) = " + v0 + " and compute x(" + n(T3) + ") (to 0.0001)."),
            nm(xT, 4), t("(s² + " + w * w + ") X = " + x0 + "s + " + v0 + ", dann zurücktransformieren.", "(s² + " + w * w + ") X = " + x0 + "s + " + v0 + ", then transform back."), ["x(t) = " + x0 + " cos(" + w + "t) + " + q(v0, w) + " sin(" + w + "t)", "x(" + n(T3) + ") = " + n(xT, 5)], near(rk2(function (s2, x) { return [x[1], -w * w * x[0]]; }, [x0, v0], T3, 1000)[0], xT, 1e-7));
    });

    // =============== Kap. 80 holomorphe Funktionen ===============
    add(80, "holo", "Holomorphie und komplexe Funktionen", "Holomorphy and complex functions", function (r, d) {
        if (d === 1) { var c = r.nz(-4, 4), a = -3 * c;
            return Q(t("Für welches a ist u(x, y) = " + ci(c) + "x³ + a x y² Realteil einer holomorphen Funktion?", "For which a is u(x, y) = " + ci(c) + "x³ + a x y² the real part of a holomorphic function?"),
                I(a), t("Realteile holomorpher Funktionen sind harmonisch: u<sub>xx</sub> + u<sub>yy</sub> = 0.", "Real parts of holomorphic functions are harmonic: u<sub>xx</sub> + u<sub>yy</sub> = 0."), ["u<sub>xx</sub> + u<sub>yy</sub> = " + 6 * c + "x + 2a x = 0", "a = " + a], 6 * c + 2 * a === 0); }
        if (d === 2) { var x = r.int(-3, 3), y = r.nz(-3, 3), re = x * x * x - 3 * x * y * y, im = 3 * x * x * y - y * y * y;
            var pr = 1, pi = 0; for (var i = 0; i < 3; i += 1) { var t2 = pr * x - pi * y; pi = pr * y + pi * x; pr = t2; }
            return Q(t("Berechne Real- und Imaginärteil von f(z) = z³ an der Stelle z = " + U.cs(x, y) + ".", "Compute the real and imaginary part of f(z) = z³ at z = " + U.cs(x, y) + "."),
                A.multi([{ l: "Re", a: I(re) }, { l: "Im", a: I(im) }]), "z³ = (x³ − 3xy²) + i(3x²y − y³).", ["Re = " + re + ", Im = " + im], pr === re && pi === im); }
        var w = r.int(2, 9), im3 = Math.log(w + Math.sqrt(w * w - 1));
        return Q(t("Die Gleichung sin z = " + w + " hat die Lösungen z = π/2 + 2kπ ± i y. Bestimme y > 0 (auf 0,0001).", "The equation sin z = " + w + " has the solutions z = π/2 + 2kπ ± i y. Find y > 0 (to 0.0001)."),
            nm(im3, 4), t("sin(π/2 + iy) = cosh y. Also cosh y = " + w + ".", "sin(π/2 + iy) = cosh y. So cosh y = " + w + "."), ["y = arcosh(" + w + ") = ln(" + w + " + √" + (w * w - 1) + ") = " + n(im3, 5)], near(Math.cosh(im3), w, 1e-9));
    });

    // =============== Kap. 81 komplexe Integration ===============
    add(81, "kint", "Komplexe Kurvenintegrale", "Complex line integrals", function (r, d) {
        if (d === 1) { var c = r.nz(-5, 5), a = [r.int(-2, 2), r.int(-2, 2)], R = Math.hypot(a[0], a[1]) + r.int(1, 3), im = 2 * PI * c;
            return Q(t("Berechne ∮<sub>|z|=" + n(Math.ceil(R)) + "</sub> " + c + "/(z − (" + U.cs(a[0], a[1]) + ")) dz. Gib den Imaginärteil an (auf 0,001).", "Compute ∮<sub>|z|=" + n(Math.ceil(R)) + "</sub> " + c + "/(z − (" + U.cs(a[0], a[1]) + ")) dz. Give the imaginary part (to 0.001)."),
                nm(im, 3), t("Der Punkt liegt im Kreis: ∮ dz/(z − a) = 2πi.", "The point lies inside the circle: ∮ dz/(z − a) = 2πi."), ["= " + c + " · 2πi, Im = " + n(im, 4)], Math.hypot(a[0], a[1]) < Math.ceil(R)); }
        if (d === 2) { var a2 = r.int(-2, 2), R2 = Math.abs(a2) + r.int(1, 2), v = 2 * PI * Math.exp(a2);
            return Q(t("Berechne ∮<sub>|z|=" + R2 + "</sub> e<sup>z</sup>/(z " + H.sg(-a2) + ") dz (positiv orientiert). Gib den Imaginärteil an (auf 0,001).", "Compute ∮<sub>|z|=" + R2 + "</sub> e<sup>z</sup>/(z " + H.sg(-a2) + ") dz (positively oriented). Give the imaginary part (to 0.001)."),
                nm(v, 3), t("Cauchy'sche Integralformel: ∮ f(z)/(z − a) dz = 2πi f(a).", "Cauchy's integral formula: ∮ f(z)/(z − a) dz = 2πi f(a)."), ["= 2πi e<sup>" + a2 + "</sup>", "Im = " + n(v, 4)],
                near(simpson(function (s) { var zr = R2 * Math.cos(s), zi = R2 * Math.sin(s), er = Math.exp(zr) * Math.cos(zi), ei = Math.exp(zr) * Math.sin(zi), dr = zr - a2, di = zi, den = dr * dr + di * di, fr = (er * dr + ei * di) / den, fi = (ei * dr - er * di) / den, dzr = -R2 * Math.sin(s), dzi = R2 * Math.cos(s); return fr * dzi + fi * dzr; }, 0, 2 * PI, 2000), v, 1e-6)); }
        var p = r.nz(-3, 3), qq = r.nz(-3, 3);
        return Q(t("Berechne ∫<sub>γ</sub> Re(z) dz längs der Strecke γ von 0 nach " + U.cs(p, qq) + ".", "Compute ∫<sub>γ</sub> Re(z) dz along the segment γ from 0 to " + U.cs(p, qq) + "."),
            A.multi([{ l: "Re", a: A.frac(p * p, 2) }, { l: "Im", a: A.frac(p * qq, 2) }]), t("γ(t) = t(" + U.cs(p, qq) + "), Re γ(t) = " + p + "t, γ̇ = " + U.cs(p, qq) + ".", "γ(t) = t(" + U.cs(p, qq) + "), Re γ(t) = " + p + "t, γ̇ = " + U.cs(p, qq) + "."), ["∫<sub>0</sub><sup>1</sup> " + p + "t (" + U.cs(p, qq) + ") dt = " + q(p, 2) + " (" + U.cs(p, qq) + ")"], near(simpson(function (s) { return p * s * p; }, 0, 1, 10), p * p / 2, 1e-12));
    });

    // =============== Kap. 82 Laurentreihen ===============
    add(82, "laurent", "Potenz- und Laurentreihen", "Power and Laurent series", function (r, d) {
        if (d === 1) { var a = [r.int(-4, 4), r.int(-4, 4)], z0 = [r.int(-3, 3), r.int(-3, 3)]; if (a[0] === z0[0] && a[1] === z0[1]) a[0] += 3;
            var R = Math.hypot(a[0] - z0[0], a[1] - z0[1]);
            return Q(t("Welchen Konvergenzradius hat die Taylorreihe von f(z) = 1/(z − (" + U.cs(a[0], a[1]) + ")) um z<sub>0</sub> = " + U.cs(z0[0], z0[1]) + " (auf 0,001)?", "What is the radius of convergence of the Taylor series of f(z) = 1/(z − (" + U.cs(a[0], a[1]) + ")) about z<sub>0</sub> = " + U.cs(z0[0], z0[1]) + " (to 0.001)?"),
                nm(R, 3), t("Der Radius ist der Abstand von z<sub>0</sub> zur nächsten Singularität.", "The radius is the distance from z<sub>0</sub> to the nearest singularity."), ["R = |a − z<sub>0</sub>| = " + n(R, 4)], R > 0); }
        var a2 = r.nz(-3, 3), nn = r.int(1, 4);
        if (d === 2) return Q(t("Bestimme den Koeffizienten a<sub>−1</sub> der Laurentreihe von f(z) = e<sup>" + ci(a2) + "z</sup>/z<sup>" + nn + "</sup> um 0.", "Find the coefficient a<sub>−1</sub> of the Laurent series of f(z) = e<sup>" + ci(a2) + "z</sup>/z<sup>" + nn + "</sup> about 0."),
            A.frac(Math.pow(a2, nn - 1), M.fact(nn - 1)), t("e<sup>az</sup> = Σ a<sup>k</sup>z<sup>k</sup>/k!. Teilen durch z<sup>" + nn + "</sup> verschiebt die Exponenten.", "e<sup>az</sup> = Σ a<sup>k</sup>z<sup>k</sup>/k!. Dividing by z<sup>" + nn + "</sup> shifts the exponents."), ["a<sub>−1</sub> = a<sup>" + (nn - 1) + "</sup>/" + (nn - 1) + "! = " + q(Math.pow(a2, nn - 1), M.fact(nn - 1))], near(simpson(function (s) { return Math.exp(a2 * Math.cos(s)) * Math.cos(a2 * Math.sin(s) - (nn - 1) * s); }, 0, 2 * PI, 400) / (2 * PI), Math.pow(a2, nn - 1) / M.fact(nn - 1), 1e-8));
        return Q(t("Bestimme den Koeffizienten a<sub>0</sub> der Laurentreihe von f(z) = e<sup>" + ci(a2) + "z</sup>/z<sup>" + nn + "</sup> um 0.", "Find the coefficient a<sub>0</sub> of the Laurent series of f(z) = e<sup>" + ci(a2) + "z</sup>/z<sup>" + nn + "</sup> about 0."),
            A.frac(Math.pow(a2, nn), M.fact(nn)), t("Der Term z<sup>" + nn + "</sup> der Exponentialreihe liefert a<sub>0</sub>.", "The term z<sup>" + nn + "</sup> of the exponential series gives a<sub>0</sub>."), ["a<sub>0</sub> = a<sup>" + nn + "</sup>/" + nn + "! = " + q(Math.pow(a2, nn), M.fact(nn))], near(simpson(function (s) { return Math.exp(a2 * Math.cos(s)) * Math.cos(a2 * Math.sin(s) - nn * s); }, 0, 2 * PI, 400) / (2 * PI), Math.pow(a2, nn) / M.fact(nn), 1e-8));
    });

    // =============== Kap. 83 Residuen ===============
    add(83, "residuen", "Residuensatz und reelle Integrale", "Residue theorem and real integrals", function (r, d) {
        if (d === 1) { var p = r.int(-4, 4), qq = p + r.nz(-4, 4);
            return Q(t("Berechne das Residuum von f(z) = 1/((z " + H.sg(-p) + ")(z " + H.sg(-qq) + ")) an der Stelle z = " + p + ".", "Compute the residue of f(z) = 1/((z " + H.sg(-p) + ")(z " + H.sg(-qq) + ")) at z = " + p + "."),
                A.frac(1, p - qq), t("Einfacher Pol: Res = lim (z − p) f(z).", "Simple pole: Res = lim (z − p) f(z)."), ["Res = 1/(" + p + " − " + qq + ") = " + q(1, p - qq)], near(1e-7 / ((p + 1e-7 - p) * (p + 1e-7 - qq)), 1 / (p - qq), 1e-5)); }
        var a = r.int(1, 5);
        if (d === 2) return Q(t("Berechne ∫<sub>−∞</sub><sup>∞</sup> dx/(x² + " + a * a + ") mit dem Residuensatz (auf 0,0001).", "Compute ∫<sub>−∞</sub><sup>∞</sup> dx/(x² + " + a * a + ") with the residue theorem (auto 0.0001).".replace("auto", "to")),
            nm(PI / a, 4), t("Pol in der oberen Halbebene: z = " + a + "i, Residuum 1/(2·" + a + "i).", "Pole in the upper half-plane: z = " + a + "i, residue 1/(2·" + a + "i)."), ["= 2πi · 1/(" + 2 * a + "i) = π/" + a + " = " + n(PI / a, 5)], near(2 * Math.atan(1e6 / a) / a, PI / a, 1e-5));
        var v = PI / (2 * a * a * a);
        return Q(t("Berechne ∫<sub>−∞</sub><sup>∞</sup> dx/(x² + " + a * a + ")² mit dem Residuensatz (auf 0,0001).", "Compute ∫<sub>−∞</sub><sup>∞</sup> dx/(x² + " + a * a + ")² with the residue theorem (to 0.0001)."),
            nm(v, 4), t("Doppelter Pol bei z = " + a + "i: Res = d/dz (z + " + a + "i)<sup>−2</sup> = −2/(2·" + a + "i)³.", "Double pole at z = " + a + "i: Res = d/dz (z + " + a + "i)<sup>−2</sup> = −2/(2·" + a + "i)³."), ["= π/(2·" + a + "³) = " + n(v, 5)], near(simpson(function (x) { return 1 / Math.pow(x * x + a * a, 2); }, -200, 200, 40000), v, 1e-6));
    });

    // =============== Kap. 84 Möbiustransformationen ===============
    add(84, "moebius", "Möbiustransformationen", "Möbius transformations", function (r, d) {
        var a = r.nz(-4, 4), b = r.int(-5, 5), c = r.nz(-3, 3), e = r.int(-5, 5); if (a * e - b * c === 0) e += 1;
        var ft = "f(z) = (" + H.lin([[a, "z"], [b, ""]]) + ")/(" + H.lin([[c, "z"], [e, ""]]) + ")";
        if (d === 1) { var z0 = r.int(-3, 3); if (c * z0 + e === 0) z0 += 1;
            return Q(t("Berechne f(" + z0 + ") für " + ft + ".", "Compute f(" + z0 + ") for " + ft + "."), A.frac(a * z0 + b, c * z0 + e), t("Einsetzen.", "Substitute."), ["f(" + z0 + ") = " + q(a * z0 + b, c * z0 + e)], c * z0 + e !== 0); }
        if (d === 2) { var p = r.int(-4, 4), qq = r.int(-4, 4); if (p === qq) qq += 2; var dd = r.int(-4, 4), aa, bb = -p * qq; // z(z + d) = a z + b ⇒ z² + (d − a) z − b = 0 mit Wurzeln p, q
            while (p + dd === 0 || qq + dd === 0 || dd === 0) { dd += 1; } aa = dd + p + qq;
            return Q(t("Bestimme die Fixpunkte von f(z) = (" + H.lin([[aa, "z"], [bb, ""]]) + ")/(z " + H.sg(dd) + ").", "Find the fixed points of f(z) = (" + H.lin([[aa, "z"], [bb, ""]]) + ")/(z " + H.sg(dd) + ")."),
                A.multi([{ l: "z<sub>1</sub>", a: I(p) }, { l: "z<sub>2</sub>", a: I(qq) }], { unordered: true }), t("f(z) = z führt auf z² " + H.sg(dd - aa) + "z " + H.sg(-bb) + " = 0.", "f(z) = z leads to z² " + H.sg(dd - aa) + "z " + H.sg(-bb) + " = 0."), ["z = " + p + ", " + qq], near((aa * p + bb) / (p + dd), p, 1e-12) && near((aa * qq + bb) / (qq + dd), qq, 1e-12)); }
        var w = r.int(-3, 3); if (c * w - a === 0) w += 1;
        return Q(t("Berechne f<sup>−1</sup>(" + w + ") für " + ft + ".", "Compute f<sup>−1</sup>(" + w + ") for " + ft + "."), A.frac(b - e * w, c * w - a),
            t("Die Inverse von (az + b)/(cz + d) ist (dw − b)/(−cw + a).", "The inverse of (az + b)/(cz + d) is (dw − b)/(−cw + a)."), ["f<sup>−1</sup>(w) = (" + e + "w " + H.sg(-b) + ")/(" + H.lin([[-c, "w"], [a, ""]]) + ")", "f<sup>−1</sup>(" + w + ") = " + q(b - e * w, c * w - a)], near((a * (b - e * w) / (c * w - a) + b) / (c * (b - e * w) / (c * w - a) + e), w, 1e-9));
    });

    // =============== Kap. 85 harmonische Funktionen ===============
    add(85, "harmon", "Harmonische Funktionen", "Harmonic functions", function (r, d) {
        if (d === 1) { var a = r.nz(-5, 5), c = r.int(-4, 4);
            return Q(t("Für welches b ist u(x, y) = " + ci(a) + "x² + b y² " + H.sg(c) + "x harmonisch?", "For which b is u(x, y) = " + ci(a) + "x² + b y² " + H.sg(c) + "x harmonic?"), I(-a), "Δu = u<sub>xx</sub> + u<sub>yy</sub> = 0.", ["Δu = " + 2 * a + " + 2b = 0", "b = " + (-a)], 2 * a + 2 * -a === 0); }
        if (d === 2) { var c2 = r.int(-4, 4), x0 = r.int(-3, 3), y0 = r.int(-3, 3), v = 2 * x0 * y0 + c2 * y0;
            return Q(t("Bestimme die harmonisch Konjugierte v zu u(x, y) = x² − y² " + H.sg(c2) + "x mit v(0, 0) = 0 und berechne v(" + x0 + ", " + y0 + ").", "Find the harmonic conjugate v of u(x, y) = x² − y² " + H.sg(c2) + "x with v(0, 0) = 0 and compute v(" + x0 + ", " + y0 + ")."),
                I(v), t("Cauchy-Riemann: v<sub>y</sub> = u<sub>x</sub>, v<sub>x</sub> = −u<sub>y</sub>.", "Cauchy-Riemann: v<sub>y</sub> = u<sub>x</sub>, v<sub>x</sub> = −u<sub>y</sub>."), ["v(x, y) = 2xy " + H.sg(c2) + "y", "v(" + x0 + ", " + y0 + ") = " + v], 2 * x0 + c2 === 2 * x0 + c2 && v === 2 * x0 * y0 + c2 * y0); }
        var R = r.int(1, 4), a3 = r.int(-5, 5), b3 = r.nz(-4, 4), c3 = r.int(-4, 4), rr = r.pick([0, 0.5, 0.8]) * R, ph = r.pick([0, 90, 180]), cp = Math.cos(ph * PI / 180), sp = Math.sin(ph * PI / 180), val = a3 + rr / R * (b3 * cp + c3 * sp);
        var poisson = simpson(function (s) { var g = a3 + b3 * Math.cos(s) + c3 * Math.sin(s); return g * (R * R - rr * rr) / (R * R - 2 * R * rr * Math.cos(ph * PI / 180 - s) + rr * rr); }, 0, 2 * PI, 2000) / (2 * PI);
        return Q(t("u ist harmonisch in der Kreisscheibe vom Radius " + R + " und hat auf dem Rand die Werte u(" + R + ", φ) = " + a3 + " " + H.sg(b3) + " cos φ " + H.sg(c3) + " sin φ. Berechne u im Punkt mit r = " + n(rr) + ", φ = " + ph + "°.", "u is harmonic in the disc of radius " + R + " and has boundary values u(" + R + ", φ) = " + a3 + " " + H.sg(b3) + " cos φ " + H.sg(c3) + " sin φ. Compute u at the point with r = " + n(rr) + ", φ = " + ph + "°."),
            nm(val, 3), t("Poissonformel, oder direkt: u(r, φ) = " + a3 + " + (r/" + R + ")(" + b3 + " cos φ " + H.sg(c3) + " sin φ).", "Poisson formula, or directly: u(r, φ) = " + a3 + " + (r/" + R + ")(" + b3 + " cos φ " + H.sg(c3) + " sin φ)."), ["u = " + n(val, 4)], near(poisson, val, 1e-6));
    });

    // =============== Kap. 86 PDGL 1. Ordnung ===============
    add(86, "pdgl1", "Partielle DGL erster Ordnung", "First-order PDEs", function (r, d) {
        if (d === 1) { var c = r.nz(-3, 3), x = r.int(-3, 3), tt = r.int(1, 3), a = r.nz(-2, 2), v = a * Math.pow(x - c * tt, 2);
            return Q(t("Löse die Transportgleichung u<sub>t</sub> " + H.sg(c) + " u<sub>x</sub> = 0 mit u(x, 0) = " + ci(a) + "x² und berechne u(" + x + ", " + tt + ").", "Solve the transport equation u<sub>t</sub> " + H.sg(c) + " u<sub>x</sub> = 0 with u(x, 0) = " + ci(a) + "x² and compute u(" + x + ", " + tt + ")."),
                I(v), t("u ist konstant längs x − " + c + "t = konstant, also u(x, t) = g(x − " + c + "t).", "u is constant along x − " + c + "t = constant, so u(x, t) = g(x − " + c + "t)."), ["u(x, t) = " + a + "(x " + H.sg(-c) + "t)²", "u(" + x + ", " + tt + ") = " + v], near((a * Math.pow(x - c * (tt + 1e-5), 2) - a * Math.pow(x - c * (tt - 1e-5), 2)) / 2e-5 + c * (a * Math.pow(x + 1e-5 - c * tt, 2) - a * Math.pow(x - 1e-5 - c * tt, 2)) / 2e-5, 0, 1e-4)); }
        if (d === 2) { var a2 = r.nz(-3, 3), b2 = r.pick([1, 2, -1]), x2 = r.int(-3, 3), y2 = r.int(-3, 3), arg = x2 - y2 * a2 / b2;
            return Q(t("Löse " + ci(b2) + " u<sub>x</sub> " + H.sg(a2) + " u<sub>y</sub> = 0 mit u(x, 0) = x² und berechne u(" + x2 + ", " + y2 + ").", "Solve " + ci(b2) + " u<sub>x</sub> " + H.sg(a2) + " u<sub>y</sub> = 0 with u(x, 0) = x² and compute u(" + x2 + ", " + y2 + ")."),
                A.frac(Math.pow(b2 * x2 - a2 * y2, 2), b2 * b2), t("Charakteristiken: " + a2 + "x − " + b2 + "y = konstant. Also u = g(x − " + q(a2, b2) + " y).", "Characteristics: " + a2 + "x − " + b2 + "y = constant. So u = g(x − " + q(a2, b2) + " y)."), ["u(x, y) = (x − " + q(a2, b2) + " y)²", "u(" + x2 + ", " + y2 + ") = " + q(Math.pow(b2 * x2 - a2 * y2, 2), b2 * b2)], near(arg * arg, Math.pow(b2 * x2 - a2 * y2, 2) / (b2 * b2), 1e-12)); }
        var k = r.int(1, 4), c3 = r.nz(-5, 5), lam = r.int(2, 3);
        return Q(t("u erfüllt x u<sub>x</sub> + y u<sub>y</sub> = " + k + " u auf ℝ² \\ {0} und u(1, 1) = " + c3 + ". Berechne u(" + lam + ", " + lam + ").", "u satisfies x u<sub>x</sub> + y u<sub>y</sub> = " + k + " u on ℝ² \\ {0} and u(1, 1) = " + c3 + ". Compute u(" + lam + ", " + lam + ")."),
            I(c3 * Math.pow(lam, k)), t("Längs der Strahlen (sx, sy) gilt d/ds u = (" + k + "/s) u. Also ist u homogen vom Grad " + k + ".", "Along the rays (sx, sy), d/ds u = (" + k + "/s) u. So u is homogeneous of degree " + k + "."), ["u(λx, λy) = λ<sup>" + k + "</sup> u(x, y)", "u(" + lam + ", " + lam + ") = " + lam + "<sup>" + k + "</sup> · " + c3 + " = " + c3 * Math.pow(lam, k)], near((function () { var u = c3, s = 1, h = (lam - 1) / 1000; for (var i = 0; i < 1000; i += 1) { var f = function (S, V) { return k / S * V; }, k1 = f(s, u), k2 = f(s + h / 2, u + h / 2 * k1), k3 = f(s + h / 2, u + h / 2 * k2), k4 = f(s + h, u + h * k3); u += h / 6 * (k1 + 2 * k2 + 2 * k3 + k4); s += h; } return u; })(), c3 * Math.pow(lam, k), 1e-6));
    });

    // =============== Kap. 87 Klassifikation, Eigenwerte ===============
    add(87, "pdgltyp", "Typ einer PDGL und Eigenwerte", "PDE type and eigenvalues", function (r, d) {
        var EL = t("elliptisch", "elliptic"), HY = t("hyperbolisch", "hyperbolic"), PA = t("parabolisch", "parabolic");
        if (d === 1) { var a = r.int(-4, 4) || 1, b = r.int(-3, 3), c = r.int(-4, 4), D = b * b - a * c, ans = D < 0 ? EL : D > 0 ? HY : PA;
            return Q(t("Welchen Typ hat " + H.lin([[a, "u<sub>xx</sub>"], [2 * b, "u<sub>xy</sub>"], [c, "u<sub>yy</sub>"]]) + " = 0?", "What type is " + H.lin([[a, "u<sub>xx</sub>"], [2 * b, "u<sub>xy</sub>"], [c, "u<sub>yy</sub>"]]) + " = 0?"), A.choice(r, ans, [EL, HY, PA].filter(function (x) { return x !== ans; })),
                t("Für a u<sub>xx</sub> + 2b u<sub>xy</sub> + c u<sub>yy</sub>: b² − ac < 0 elliptisch, > 0 hyperbolisch, = 0 parabolisch.", "For a u<sub>xx</sub> + 2b u<sub>xy</sub> + c u<sub>yy</sub>: b² − ac < 0 elliptic, > 0 hyperbolic, = 0 parabolic."), ["b² − ac = " + D + " ⇒ " + ans], true); }
        if (d === 2) { var nn = r.int(1, 4), L = r.int(1, 4), lam = Math.pow(nn * PI / L, 2);
            return Q(t("Das Eigenwertproblem −u″ = λ u, u(0) = u(" + L + ") = 0 hat die Eigenwerte λ<sub>n</sub>. Berechne λ<sub>" + nn + "</sub> (auf 0,001).", "The eigenvalue problem −u″ = λ u, u(0) = u(" + L + ") = 0 has eigenvalues λ<sub>n</sub>. Compute λ<sub>" + nn + "</sub> (to 0.001)."),
                nm(lam, 3), t("Eigenfunktionen sin(nπx/L), also λ<sub>n</sub> = (nπ/L)².", "Eigenfunctions sin(nπx/L), so λ<sub>n</sub> = (nπ/L)²."), ["λ<sub>" + nn + "</sub> = (" + nn + "π/" + L + ")² = " + n(lam, 4)], near(Math.sin(Math.sqrt(lam) * L), 0, 1e-9)); }
        var y0 = r.nz(-4, 4), ans3 = y0 > 0 ? EL : HY;
        return Q(t("Welchen Typ hat die Gleichung u<sub>xx</sub> + y u<sub>yy</sub> = 0 im Punkt (1, " + y0 + ")?", "What type is the equation u<sub>xx</sub> + y u<sub>yy</sub> = 0 at the point (1, " + y0 + ")?"), A.choice(r, ans3, [EL, HY, PA].filter(function (x) { return x !== ans3; })),
            t("Hier ist a = 1, b = 0, c = y. Der Typ hängt vom Vorzeichen von y ab.", "Here a = 1, b = 0, c = y. The type depends on the sign of y."), ["b² − ac = " + (-y0) + " ⇒ " + ans3], true);
    });

    // =============== Kap. 88 Laplacegleichung ===============
    add(88, "laplgl", "Laplacegleichung im Kreis", "Laplace's equation in a disc", function (r, d) {
        var nn = r.int(1, 4), R = r.int(1, 4), ph = r.pick([0, 60, 90, 180, 45]), c = Math.cos(nn * ph * PI / 180);
        if (d === 1) { var rr = r.pick([0.5, 0.25, 0.75]) * R, v = Math.pow(rr / R, nn) * c;
            return Q(t("Löse Δu = 0 in der Kreisscheibe r < " + R + " mit u(" + R + ", φ) = cos(" + nn + "φ). Berechne u bei r = " + n(rr) + ", φ = " + ph + "° (auf 0,0001).", "Solve Δu = 0 in the disc r < " + R + " with u(" + R + ", φ) = cos(" + nn + "φ). Compute u at r = " + n(rr) + ", φ = " + ph + "° (to 0.0001)."),
                nm(v, 4), t("Separationsansatz: u = (r/R)<sup>n</sup> cos(nφ) ist beschränkt und erfüllt die Randbedingung.", "Separation: u = (r/R)<sup>n</sup> cos(nφ) is bounded and satisfies the boundary condition."), ["u = (" + n(rr) + "/" + R + ")<sup>" + nn + "</sup> cos(" + nn * ph + "°) = " + n(v, 5)], near(simpson(function (s) { return Math.cos(nn * s) * (R * R - rr * rr) / (R * R - 2 * R * rr * Math.cos(ph * PI / 180 - s) + rr * rr); }, 0, 2 * PI, 2000) / (2 * PI), v, 1e-6)); }
        if (d === 2) { var rr2 = R * r.pick([2, 3, 4, 1.5]), v2 = Math.pow(R / rr2, nn) * c;
            return Q(t("Löse Δu = 0 im Außengebiet r > " + R + " mit u(" + R + ", φ) = cos(" + nn + "φ) und beschränktem u. Berechne u bei r = " + n(rr2) + ", φ = " + ph + "° (auf 0,0001).", "Solve Δu = 0 in the exterior r > " + R + " with u(" + R + ", φ) = cos(" + nn + "φ) and bounded u. Compute u at r = " + n(rr2) + ", φ = " + ph + "° (to 0.0001)."),
                nm(v2, 4), t("Im Außengebiet ist (R/r)<sup>n</sup> cos(nφ) die beschränkte Lösung.", "In the exterior, (R/r)<sup>n</sup> cos(nφ) is the bounded solution."), ["u = (" + R + "/" + n(rr2) + ")<sup>" + nn + "</sup> cos(" + nn * ph + "°) = " + n(v2, 5)], near(Math.pow(rr2, -nn - 2) * (-nn) * (-nn - 1) + Math.pow(rr2, -nn - 2) * (-nn) - nn * nn * Math.pow(rr2, -nn - 2), 0, 1e-12)); }
        var a = r.int(-5, 5), b = r.nz(-3, 3), cc = r.int(-3, 3), x0 = r.int(-2, 2), y0 = r.int(-2, 2), Rc = r.int(1, 3), u = function (x, y) { return a + b * (x * x - y * y) + cc * x * y; };
        var mean = simpson(function (s) { return u(x0 + Rc * Math.cos(s), y0 + Rc * Math.sin(s)); }, 0, 2 * PI, 400) / (2 * PI);
        return Q(t("Berechne den Mittelwert von u(x, y) = " + a + " " + H.sg(b) + "(x² − y²) " + H.sg(cc) + "xy über den Kreis um (" + x0 + ", " + y0 + ") mit Radius " + Rc + ".", "Compute the mean value of u(x, y) = " + a + " " + H.sg(b) + "(x² − y²) " + H.sg(cc) + "xy over the circle about (" + x0 + ", " + y0 + ") with radius " + Rc + "."),
            I(u(x0, y0)), t("u ist harmonisch. Mittelwerteigenschaft: der Mittelwert auf dem Kreis ist der Wert im Mittelpunkt.", "u is harmonic. Mean value property: the mean on the circle is the value at the centre."), ["Δu = " + 2 * b + " − " + 2 * b + " = 0", "u(" + x0 + ", " + y0 + ") = " + u(x0, y0)], near(mean, u(x0, y0), 1e-8));
    });

    // =============== Kap. 89 Wärmeleitung ===============
    add(89, "waerme", "Wärmeleitungsgleichung", "Heat equation", function (r, d) {
        var L = r.int(1, 3), k = r.pick([0.1, 0.5, 1, 0.25]), tt = r.pick([0.1, 0.2, 0.5]), x = L * r.pick([0.25, 0.5, 0.75]);
        if (d === 1) { var nn = r.int(1, 3), v = Math.exp(-k * Math.pow(nn * PI / L, 2) * tt) * Math.sin(nn * PI * x / L);
            return Q(t("Löse u<sub>t</sub> = " + n(k) + " u<sub>xx</sub> auf (0, " + L + ") mit u(0, t) = u(" + L + ", t) = 0 und u(x, 0) = sin(" + nn + "πx/" + L + "). Berechne u(" + n(x) + ", " + n(tt) + ") (auf 0,0001).", "Solve u<sub>t</sub> = " + n(k) + " u<sub>xx</sub> on (0, " + L + ") with u(0, t) = u(" + L + ", t) = 0 and u(x, 0) = sin(" + nn + "πx/" + L + "). Compute u(" + n(x) + ", " + n(tt) + ") (to 0.0001)."),
                nm(v, 4), t("Ein einzelner Modus klingt mit e<sup>−k(nπ/L)² t</sup> ab.", "A single mode decays like e<sup>−k(nπ/L)² t</sup>."), ["u = e<sup>−" + n(k * Math.pow(nn * PI / L, 2), 4) + " t</sup> sin(" + nn + "πx/" + L + ")", "u = " + n(v, 5)], v <= 1 && v >= -1); }
        if (d === 2) { var a = r.int(-5, 5), b = r.nz(-4, 4);
            return Q(t("Für u<sub>t</sub> = " + n(k) + " u<sub>xx</sub> auf (0, " + L + ") mit isolierten Enden (u<sub>x</sub> = 0) und u(x, 0) = " + a + " " + H.sg(b) + " cos(πx/" + L + "): Gegen welchen Wert strebt u für t → ∞?", "For u<sub>t</sub> = " + n(k) + " u<sub>xx</sub> on (0, " + L + ") with insulated ends (u<sub>x</sub> = 0) and u(x, 0) = " + a + " " + H.sg(b) + " cos(πx/" + L + "): which value does u tend to as t → ∞?"),
                I(a), t("Bei Neumann-Rändern bleibt der Mittelwert erhalten, alle anderen Moden klingen ab.", "With Neumann boundaries the mean is conserved, all other modes decay."), [t("Mittelwert = ", "mean = ") + a], near(simpson(function (s) { return a + b * Math.cos(PI * s / L); }, 0, L, 100) / L, a, 1e-9)); }
        var b1 = r.nz(-3, 3), b3 = r.nz(-3, 3), v3 = b1 * Math.exp(-k * Math.pow(PI / L, 2) * tt) * Math.sin(PI * x / L) + b3 * Math.exp(-k * Math.pow(3 * PI / L, 2) * tt) * Math.sin(3 * PI * x / L);
        return Q(t("u<sub>t</sub> = " + n(k) + " u<sub>xx</sub> auf (0, " + L + "), Dirichlet-Ränder 0, u(x, 0) = " + b1 + " sin(πx/" + L + ") " + H.sg(b3) + " sin(3πx/" + L + "). Berechne u(" + n(x) + ", " + n(tt) + ") (auf 0,0001).", "u<sub>t</sub> = " + n(k) + " u<sub>xx</sub> on (0, " + L + "), Dirichlet boundaries 0, u(x, 0) = " + b1 + " sin(πx/" + L + ") " + H.sg(b3) + " sin(3πx/" + L + "). Compute u(" + n(x) + ", " + n(tt) + ") (to 0.0001)."),
            nm(v3, 4), t("Jeder Modus klingt einzeln ab (Superposition).", "Each mode decays on its own (superposition)."), ["u = " + n(v3, 5)], Math.abs(v3) <= Math.abs(b1) + Math.abs(b3));
    });

    // =============== Kap. 90 Wellengleichung ===============
    add(90, "welle", "Wellengleichung", "Wave equation", function (r, d) {
        var c = r.int(1, 4), L = r.int(1, 3);
        if (d === 1) { var nn = r.int(1, 3), x = L * r.pick([0.25, 0.5, 1 / 6]), tt = r.pick([0.1, 0.25, 0.5]), v = Math.sin(nn * PI * x / L) * Math.cos(c * nn * PI * tt / L);
            return Q(t("Die Saite u<sub>tt</sub> = " + c * c + " u<sub>xx</sub> auf (0, " + L + ") mit festen Enden startet in Ruhe mit u(x, 0) = sin(" + nn + "πx/" + L + "). Berechne u(" + n(x, 3) + ", " + n(tt) + ") (auf 0,0001).", "The string u<sub>tt</sub> = " + c * c + " u<sub>xx</sub> on (0, " + L + ") with fixed ends starts at rest with u(x, 0) = sin(" + nn + "πx/" + L + "). Compute u(" + n(x, 3) + ", " + n(tt) + ") (to 0.0001)."),
                nm(v, 4), "u = sin(nπx/L) cos(cnπt/L).", ["u = sin(" + nn + "π·" + n(x, 3) + "/" + L + ") cos(" + c * nn + "π·" + n(tt) + "/" + L + ") = " + n(v, 5)], Math.abs(v) <= 1); }
        if (d === 2) { var x2 = r.int(-3, 3), t2 = r.int(1, 3), a = r.nz(-2, 2), g = function (s) { return a * s * s; }, v2 = (g(x2 + c * t2) + g(x2 - c * t2)) / 2;
            return Q(t("Löse u<sub>tt</sub> = " + c * c + " u<sub>xx</sub> auf ℝ mit u(x, 0) = " + ci(a) + "x², u<sub>t</sub>(x, 0) = 0 und berechne u(" + x2 + ", " + t2 + ").", "Solve u<sub>tt</sub> = " + c * c + " u<sub>xx</sub> on ℝ with u(x, 0) = " + ci(a) + "x², u<sub>t</sub>(x, 0) = 0 and compute u(" + x2 + ", " + t2 + ")."),
                I(v2), t("d'Alembert: u = (g(x + ct) + g(x − ct))/2.", "d'Alembert: u = (g(x + ct) + g(x − ct))/2."), ["u = (" + g(x2 + c * t2) + " + " + g(x2 - c * t2) + ")/2 = " + v2], v2 === a * (x2 * x2 + c * c * t2 * t2)); }
        var nn3 = r.int(1, 4), cc = r.pick([100, 200, 340, 250]), L3 = r.pick([0.5, 1, 0.8, 2]), f = cc * nn3 / (2 * L3);
        return Q(t("Eine Saite der Länge " + n(L3) + " m hat die Wellengeschwindigkeit c = " + cc + " m/s. Welche Frequenz hat die " + nn3 + ". Eigenschwingung?", "A string of length " + n(L3) + " m has wave speed c = " + cc + " m/s. What is the frequency of mode " + nn3 + "?"),
            nm(f, 1, "Hz"), "f<sub>n</sub> = c n / (2L).", ["f<sub>" + nn3 + "</sub> = " + cc + " · " + nn3 + " / " + n(2 * L3) + " = " + n(f) + " Hz"], near(2 * PI * f, cc * nn3 * PI / L3, 1e-9));
    });

    // =============== Kap. 91 PDGL auf ℝ ===============
    add(91, "pdglr", "Wärme und Wellen auf ganz ℝ", "Heat and waves on the whole line", function (r, d) {
        var k = r.pick([0.25, 0.5, 1]), tt = r.pick([0.5, 1, 2]), x = r.int(0, 2);
        if (d === 1) { var s = 1 + 4 * k * tt, v = Math.exp(-x * x / s) / Math.sqrt(s);
            return Q(t("u(x, t) = (1 + 4kt)<sup>−1/2</sup> e<sup>−x²/(1 + 4kt)</sup> löst u<sub>t</sub> = k u<sub>xx</sub> mit u(x, 0) = e<sup>−x²</sup>. Berechne u(" + x + ", " + n(tt) + ") für k = " + n(k) + " (auf 0,0001).", "u(x, t) = (1 + 4kt)<sup>−1/2</sup> e<sup>−x²/(1 + 4kt)</sup> solves u<sub>t</sub> = k u<sub>xx</sub> with u(x, 0) = e<sup>−x²</sup>. Compute u(" + x + ", " + n(tt) + ") for k = " + n(k) + " (to 0.0001)."),
                nm(v, 4), t("Einsetzen. Die Glocke wird breiter und flacher, die Fläche bleibt gleich.", "Substitute. The bell gets wider and flatter, its area stays the same."), ["1 + 4kt = " + n(s), "u = " + n(v, 5)],
                near(simpson(function (y) { return Math.exp(-y * y / s) / Math.sqrt(s); }, -30, 30, 3000), Math.sqrt(PI), 1e-6)); }
        if (d === 2) { var c = r.int(1, 4), a = r.nz(-3, 3), b = r.int(-3, 3), x2 = r.int(-3, 3), t2 = r.int(1, 3), v2 = (a * x2 + b) * t2;
            return Q(t("Löse u<sub>tt</sub> = " + c * c + " u<sub>xx</sub> mit u(x, 0) = 0, u<sub>t</sub>(x, 0) = " + H.lin([[a, "x"], [b, ""]]) + " und berechne u(" + x2 + ", " + t2 + ").", "Solve u<sub>tt</sub> = " + c * c + " u<sub>xx</sub> with u(x, 0) = 0, u<sub>t</sub>(x, 0) = " + H.lin([[a, "x"], [b, ""]]) + " and compute u(" + x2 + ", " + t2 + ")."),
                I(v2), t("d'Alembert: u = 1/(2c) ∫<sub>x−ct</sub><sup>x+ct</sup> h(s) ds.", "d'Alembert: u = 1/(2c) ∫<sub>x−ct</sub><sup>x+ct</sup> h(s) ds."), ["u = (" + H.lin([[a, "x"], [b, ""]]) + ") t", "u(" + x2 + ", " + t2 + ") = " + v2], near(simpson(function (s) { return a * s + b; }, x2 - c * t2, x2 + c * t2, 10) / (2 * c), v2, 1e-9)); }
        var s0 = r.pick([0.5, 1, 2]), k3 = r.pick([0.5, 1, 2, 0.25]), t3 = r.int(1, 5), sig = s0 * s0 + 2 * k3 * t3;
        return Q(t("Eine Temperaturverteilung startet als Normalverteilung mit Varianz σ<sub>0</sub>² = " + n(s0 * s0) + " und entwickelt sich nach u<sub>t</sub> = " + n(k3) + " u<sub>xx</sub>. Welche Varianz hat sie zur Zeit t = " + t3 + "?", "A temperature distribution starts as a normal distribution with variance σ<sub>0</sub>² = " + n(s0 * s0) + " and evolves by u<sub>t</sub> = " + n(k3) + " u<sub>xx</sub>. What is its variance at time t = " + t3 + "?"),
            nm(sig, 3), t("Faltung mit dem Wärmeleitungskern: die Varianzen addieren sich, σ²(t) = σ<sub>0</sub>² + 2kt.", "Convolution with the heat kernel: the variances add, σ²(t) = σ<sub>0</sub>² + 2kt."), ["σ² = " + n(s0 * s0) + " + 2 · " + n(k3) + " · " + t3 + " = " + n(sig)], near(sig, s0 * s0 + 2 * k3 * t3, 1e-12));
    });
})(typeof window !== "undefined" ? window : globalThis);
