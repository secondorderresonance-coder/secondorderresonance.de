/* SOR Aufgaben Höhere Mathematik 2 (K-HM-37 bis K-HM-62), Aufgabentypen nach Karpfinger, Arbeitsbuch HM in Rezepten. Braucht hm-1.js (E.HMU) */
(function (root) {
    "use strict";
    var E = root.SOR_EX || require("../exercise-engine.js");
    if (!E.HMU && typeof require !== "undefined") require("./hm-1.js");
    var A = E.A, M = E.M, H = E.H, n = E.H.n, t = E.tr, U = E.HMU;
    var Q = U.Q, nm = U.nm, det = U.det, det2 = U.det2, mul = U.mul, mv = U.mv, rank = U.rank, solve = U.solve, randMat = U.randMat;
    var I = function (v) { return A.num(v); };
    var mat = H.mat, vec = H.vec, poly = H.poly, q = H.q, near = M.near, simpson = M.simpson;
    function add(ch, key, de, en, gen) { E.add({ id: "k-hm" + ch + "-" + key, topic: U.id2(ch), title: t(de, en), gen: gen }); }
    function eye(k) { var m = []; for (var i = 0; i < k; i += 1) { m.push([]); for (var j = 0; j < k; j += 1) m[i].push(i === j ? 1 : 0); } return m; }
    function sub(a, l) { return a.map(function (r, i) { return r.map(function (x, j) { return x - (i === j ? l : 0); }); }); }
    function unimod(r) { var s = r.int(-2, 2), u = r.nz(-2, 2); return mul([[1, s], [0, 1]], [[1, 0], [u, 1]]); }
    function inv2(m) { var d = det2(m); return [[m[1][1] / d, -m[0][1] / d], [-m[1][0] / d, m[0][0] / d]]; }
    // symmetrische 2x2-Matrix mit ganzzahligen Eigenwerten l2 und l2 + d
    var TRIP = [[0, 2, 2], [3, 4, 5], [5, 12, 13], [8, 6, 10], [0, 4, 4], [6, 8, 10]];
    function symInt(r, l2) { var tr = r.pick(TRIP), s = r.sign(); var a = (2 * l2 + tr[2] + tr[0]) / 2, c = a - tr[0], b = s * tr[1] / 2; return { m: [[a, b], [b, c]], l1: l2 + tr[2], l2: l2 }; }
    function eigSym2(m) { var tr = m[0][0] + m[1][1], dd = det2(m), disc = Math.sqrt(tr * tr / 4 - dd); return [tr / 2 + disc, tr / 2 - disc]; }
    var nd = function (f, x, h) { h = h || 1e-5; return (f(x + h) - f(x - h)) / (2 * h); };
    function dbl(f, a, b, c, d2, N) { return simpson(function (x) { return simpson(function (y) { return f(x, y); }, c, d2, N || 60); }, a, b, N || 60); }

    // =============== Kap. 37 lineare Abbildungen ===============
    add(37, "linabb", "Kern, Bild, Injektivität", "Kernel, image, injectivity", function (r, d) {
        var rows = 3, cols = d === 2 ? 4 : 3, rk = r.int(1, 3), base = [];
        for (var i = 0; i < rk; i += 1) { var v = []; for (var j = 0; j < cols; j += 1) v.push(r.int(-3, 3)); base.push(v); }
        rk = rank(base); if (rk === 0) { base[0][0] = 1; rk = 1; }
        var m = base.slice(); while (m.length < rows) { var c1 = r.int(-2, 2), c2 = r.int(-2, 2); m.push(base[0].map(function (x, k) { return c1 * x + c2 * (base[1] ? base[1][k] : x); })); }
        m = r.shuffle(m); rk = rank(m);
        if (d === 1) return Q(t("Welche Dimension hat der Kern von f: ℝ³ → ℝ³, f(x) = A x mit A = " + mat(m) + "?", "What is the dimension of the kernel of f: ℝ³ → ℝ³, f(x) = A x with A = " + mat(m) + "?"),
            I(3 - rk), t("Dimensionsformel: dim ker f = 3 − rg A.", "Rank-nullity: dim ker f = 3 − rank A."), [t("rg A = ", "rank A = ") + rk, "dim ker f = " + (3 - rk)], 3 - rk >= 0 && rank(m) === rk);
        if (d === 2) return Q(t("Welche Dimension hat das Bild von f: ℝ⁴ → ℝ³, f(x) = A x mit A = " + mat(m) + "?", "What is the dimension of the image of f: ℝ⁴ → ℝ³, f(x) = A x with A = " + mat(m) + "?"),
            I(rk), t("dim Bild = Rang von A = Anzahl unabhängiger Spalten.", "dim image = rank of A = number of independent columns."), [t("rg A = ", "rank A = ") + rk, "dim ker = " + (4 - rk)], rk <= 3);
        var mm = r.pick([2, 3]), nn = r.pick([2, 3]), Am = []; for (var a = 0; a < mm; a += 1) { var rw = []; for (var b = 0; b < nn; b += 1) rw.push(r.int(-3, 3)); Am.push(rw); }
        var rr = rank(Am), inj = rr === nn, sur = rr === mm;
        var BI = t("bijektiv", "bijective"), IN = t("injektiv, nicht surjektiv", "injective, not surjective"), SU = t("surjektiv, nicht injektiv", "surjective, not injective"), WN = t("weder injektiv noch surjektiv", "neither injective nor surjective");
        var ans = inj && sur ? BI : inj ? IN : sur ? SU : WN;
        return Q(t("f: ℝ<sup>" + nn + "</sup> → ℝ<sup>" + mm + "</sup>, f(x) = A x mit A = " + mat(Am) + ". Welche Eigenschaft hat f?", "f: ℝ<sup>" + nn + "</sup> → ℝ<sup>" + mm + "</sup>, f(x) = A x with A = " + mat(Am) + ". Which property does f have?"),
            A.choice(r, ans, [BI, IN, SU, WN].filter(function (x) { return x !== ans; })), t("Injektiv ⇔ rg A = Spaltenzahl. Surjektiv ⇔ rg A = Zeilenzahl.", "Injective ⇔ rank A = number of columns. Surjective ⇔ rank A = number of rows."), [t("rg A = ", "rank A = ") + rr + " ⇒ " + ans], true);
    });

    // =============== Kap. 38 Darstellungsmatrizen ===============
    add(38, "darst", "Koordinaten und Basiswechsel", "Coordinates and change of basis", function (r, d) {
        if (d === 1) {
            var S = unimod(r), c = [r.nz(-4, 4), r.int(-4, 4)], v = mv(S, c), b1 = [S[0][0], S[1][0]], b2 = [S[0][1], S[1][1]];
            return Q(t("Bestimme die Koordinaten von v = " + vec(v) + " bezüglich der Basis B = (" + vec(b1) + ", " + vec(b2) + ").", "Find the coordinates of v = " + vec(v) + " with respect to the basis B = (" + vec(b1) + ", " + vec(b2) + ")."),
                A.multi([{ l: "c<sub>1</sub>", a: I(c[0]) }, { l: "c<sub>2</sub>", a: I(c[1]) }]), t("Löse c<sub>1</sub> b<sub>1</sub> + c<sub>2</sub> b<sub>2</sub> = v.", "Solve c<sub>1</sub> b<sub>1</sub> + c<sub>2</sub> b<sub>2</sub> = v."), ["(c<sub>1</sub>, c<sub>2</sub>) = (" + c[0] + ", " + c[1] + ")"], solve(S, v).every(function (x, k) { return near(x, c[k], 1e-9); }));
        }
        if (d === 2) {
            var S2 = unimod(r), Am = randMat(r, 2, -3, 3), B = mul(mul(inv2(S2), Am), S2).map(function (rw) { return rw.map(function (x) { return Math.round(x); }); });
            return Q(t("Die Abbildung f(x) = A x mit A = " + mat(Am) + " hat bezüglich der Basis aus den Spalten von S = " + mat(S2) + " die Darstellungsmatrix B = S<sup>−1</sup> A S. Berechne B.", "The map f(x) = A x with A = " + mat(Am) + " has, with respect to the basis of columns of S = " + mat(S2) + ", the matrix B = S<sup>−1</sup> A S. Compute B."),
                A.multi([{ l: "b<sub>11</sub>", a: I(B[0][0]) }, { l: "b<sub>12</sub>", a: I(B[0][1]) }, { l: "b<sub>21</sub>", a: I(B[1][0]) }, { l: "b<sub>22</sub>", a: I(B[1][1]) }]), t("det S = ±1, also ist S<sup>−1</sup> ganzzahlig. Erst A S, dann S<sup>−1</sup>(A S).", "det S = ±1, so S<sup>−1</sup> is an integer matrix. First A S, then S<sup>−1</sup>(A S)."),
                ["S<sup>−1</sup> = " + mat(inv2(S2).map(function (rw) { return rw.map(function (x) { return Math.round(x); }); })), "A S = " + mat(mul(Am, S2)), "B = " + mat(B)], B[0][0] + B[1][1] === Am[0][0] + Am[1][1] && det2(B) === det2(Am));
        }
        var c3 = r.nz(-4, 4);
        return Q(t("f: ℝ[x]<sub>2</sub> → ℝ[x]<sub>2</sub>, f(p)(x) = p(x " + H.sg(c3) + "). Bestimme die Darstellungsmatrix bezüglich der Basis (1, x, x²). Gib die Einträge oberhalb der Diagonalen an.", "f: ℝ[x]<sub>2</sub> → ℝ[x]<sub>2</sub>, f(p)(x) = p(x " + H.sg(c3) + "). Find the matrix with respect to the basis (1, x, x²). Give the entries above the diagonal."),
            A.multi([{ l: "a<sub>12</sub>", a: I(c3) }, { l: "a<sub>13</sub>", a: I(c3 * c3) }, { l: "a<sub>23</sub>", a: I(2 * c3) }]), t("Die Spalten sind die Koordinaten von f(1), f(x), f(x²).", "The columns are the coordinates of f(1), f(x), f(x²)."),
            ["f(1) = 1, f(x) = x " + H.sg(c3) + ", f(x²) = x² " + H.sg(2 * c3) + "x " + H.sg(c3 * c3), "A = " + mat([[1, c3, c3 * c3], [0, 1, 2 * c3], [0, 0, 1]])], Math.pow(1.5 + c3, 2) === 1.5 * 1.5 + 2 * c3 * 1.5 + c3 * c3);
    });

    // =============== Kap. 39 Eigenwerte ===============
    add(39, "eigen", "Eigenwerte und Eigenvektoren", "Eigenvalues and eigenvectors", function (r, d) {
        var S = unimod(r), l1 = r.int(-5, 5), l2 = l1 + r.nz(-4, 4), Am = mul(mul(S, [[l1, 0], [0, l2]]), inv2(S)).map(function (rw) { return rw.map(function (x) { return Math.round(x); }); });
        if (d === 1) return Q(t("Bestimme die Eigenwerte von A = " + mat(Am) + ".", "Find the eigenvalues of A = " + mat(Am) + "."),
            A.multi([{ l: "λ<sub>1</sub>", a: I(l1) }, { l: "λ<sub>2</sub>", a: I(l2) }], { unordered: true }), t("Charakteristisches Polynom: λ² − (Spur A) λ + det A = 0.", "Characteristic polynomial: λ² − (trace A) λ + det A = 0."),
            ["λ² " + H.sg(-(l1 + l2)) + "λ " + H.sg(l1 * l2) + " = 0", "λ = " + l1 + ", " + l2], Am[0][0] + Am[1][1] === l1 + l2 && det2(Am) === l1 * l2);
        if (d === 2) {
            var v = [S[0][0], S[1][0]];
            if (v[0] === 0) { v = [S[0][1], S[1][1]]; l1 = l2; }
            var y = v[1] / v[0], Av = mv(Am, [1, y]);
            return Q(t("A = " + mat(Am) + " hat den Eigenwert λ = " + l1 + ". Bestimme einen Eigenvektor der Form (1, y)<sup>T</sup>.", "A = " + mat(Am) + " has the eigenvalue λ = " + l1 + ". Find an eigenvector of the form (1, y)<sup>T</sup>."),
                A.frac(v[1], v[0]), t("Löse (A − λE) v = 0 mit v = (1, y).", "Solve (A − λI) v = 0 with v = (1, y)."), ["A − " + l1 + "E = " + mat(sub(Am, l1)), "y = " + q(v[1], v[0])], near(Av[0], l1, 1e-9) && near(Av[1], l1 * y, 1e-9));
        }
        var e = r.int(-5, 5), u = [r.int(-3, 3), r.int(-3, 3)], A3 = [[Am[0][0], Am[0][1], u[0]], [Am[1][0], Am[1][1], u[1]], [0, 0, e]];
        return Q(t("Bestimme die drei Eigenwerte von A = " + mat(A3) + ".", "Find the three eigenvalues of A = " + mat(A3) + "."),
            A.multi([{ l: "λ<sub>1</sub>", a: I(l1) }, { l: "λ<sub>2</sub>", a: I(l2) }, { l: "λ<sub>3</sub>", a: I(e) }], { unordered: true }), t("Entwickle nach der letzten Zeile: χ(λ) = (" + e + " − λ) · χ<sub>B</sub>(λ) mit dem 2×2-Block B oben links.", "Expand along the last row: χ(λ) = (" + e + " − λ) · χ<sub>B</sub>(λ) with the 2×2 block B top left."),
            ["χ<sub>B</sub>(λ) = λ² " + H.sg(-(l1 + l2)) + "λ " + H.sg(l1 * l2), "λ = " + l1 + ", " + l2 + ", " + e], Math.abs(det(sub(A3, l1))) < 1e-9 && Math.abs(det(sub(A3, l2))) < 1e-9 && Math.abs(det(sub(A3, e))) < 1e-9);
    });

    // =============== Kap. 40 Numerik Eigenwerte ===============
    add(40, "eignum", "Eigenwerte abschätzen und annähern", "Estimating and approximating eigenvalues", function (r, d) {
        var Am = randMat(r, 3, -4, 4); for (var i = 0; i < 3; i += 1) Am[i][i] = r.int(-9, 9);
        if (d === 1) {
            var bound = Math.max.apply(null, Am.map(function (rw) { return rw.reduce(function (s, x) { return s + Math.abs(x); }, 0); })), radii = Am.map(function (rw, k) { return rw.reduce(function (s, x, j) { return s + (j === k ? 0 : Math.abs(x)); }, 0); });
            return Q(t("Nach dem Satz von Gerschgorin liegen alle Eigenwerte von A = " + mat(Am) + " in der Vereinigung der Kreise um a<sub>ii</sub> mit Radius Σ<sub>j≠i</sub> |a<sub>ij</sub>|. Welche obere Schranke für |λ| folgt daraus?", "By Gershgorin's theorem all eigenvalues of A = " + mat(Am) + " lie in the union of the discs about a<sub>ii</sub> with radius Σ<sub>j≠i</sub> |a<sub>ij</sub>|. Which upper bound for |λ| follows?"),
                I(bound), t("Für jeden Kreis ist |λ| ≤ |a<sub>ii</sub>| + r<sub>i</sub>. Nimm das Maximum.", "For each disc, |λ| ≤ |a<sub>ii</sub>| + r<sub>i</sub>. Take the maximum."), [t("Radien: ", "radii: ") + radii.join(", "), "max(|a<sub>ii</sub>| + r<sub>i</sub>) = " + bound], radii.every(function (x, k) { return Math.abs(Am[k][k]) + x <= bound; }));
        }
        if (d === 2) {
            var v0 = [1, r.int(-1, 1), r.int(-1, 1)], w = mv(Am, v0);
            if (w.every(function (x) { return x === 0; })) { Am[0][0] += 1; w = mv(Am, v0); }
            var mx = w.reduce(function (s, x) { return Math.abs(x) > Math.abs(s) ? x : s; }, 0);
            return Q(t("Ein Schritt der Vektoriteration (von-Mises): Berechne w = A v<sub>0</sub> für A = " + mat(Am) + " und v<sub>0</sub> = " + vec(v0) + ". Gib die betragsgrößte Komponente von w an.", "One step of power iteration: compute w = A v<sub>0</sub> for A = " + mat(Am) + " and v<sub>0</sub> = " + vec(v0) + ". Give the component of w with the largest absolute value."),
                I(mx), t("Anschließend würde man w durch diese Komponente teilen und wiederholen.", "Afterwards one would divide w by this component and repeat."), ["w = " + vec(w), "v<sub>1</sub> = w / " + mx], w.indexOf(mx) >= 0);
        }
        var sy = symInt(r, r.int(-4, 3)), Sm = sy.m, x = [r.nz(-3, 3), r.int(-3, 3)], Sx = mv(Sm, x), rq = (x[0] * Sx[0] + x[1] * Sx[1]) / (x[0] * x[0] + x[1] * x[1]);
        return Q(t("Berechne den Rayleigh-Quotienten R(x) = x<sup>T</sup>A x / x<sup>T</sup>x für A = " + mat(Sm) + " und x = " + vec(x) + ".", "Compute the Rayleigh quotient R(x) = x<sup>T</sup>A x / x<sup>T</sup>x for A = " + mat(Sm) + " and x = " + vec(x) + "."),
            A.frac(x[0] * Sx[0] + x[1] * Sx[1], x[0] * x[0] + x[1] * x[1]), t("Für symmetrisches A liegt R(x) zwischen dem kleinsten und dem größten Eigenwert.", "For symmetric A, R(x) lies between the smallest and the largest eigenvalue."),
            ["A x = " + vec(Sx), "R(x) = " + q(x[0] * Sx[0] + x[1] * Sx[1], x[0] * x[0] + x[1] * x[1]), t("Eigenwerte: ", "eigenvalues: ") + sy.l2 + ", " + sy.l1], rq >= sy.l2 - 1e-9 && rq <= sy.l1 + 1e-9);
    });

    // =============== Kap. 41 Quadriken ===============
    add(41, "quadrik", "Hauptachsentransformation", "Principal axis transformation", function (r, d) {
        var l2 = d === 3 ? r.int(1, 4) : r.int(-4, 4), sy = symInt(r, l2), Sm = sy.m, cc = r.int(1, 9) * (d === 3 ? sy.l1 * sy.l2 : 1);
        var form = H.lin([[Sm[0][0], "x²"], [2 * Sm[0][1], "xy"], [Sm[1][1], "y²"]]);
        if (d === 1) return Q(t("Bestimme die Normalform von " + form + " = " + cc + ": Gib die Eigenwerte λ<sub>1</sub>, λ<sub>2</sub> der zugehörigen symmetrischen Matrix an.", "Find the normal form of " + form + " = " + cc + ": give the eigenvalues λ<sub>1</sub>, λ<sub>2</sub> of the associated symmetric matrix."),
            A.multi([{ l: "λ<sub>1</sub>", a: I(sy.l1) }, { l: "λ<sub>2</sub>", a: I(sy.l2) }], { unordered: true }), t("Die Matrix ist A = " + mat(Sm) + " (der xy-Koeffizient wird halbiert).", "The matrix is A = " + mat(Sm) + " (the xy coefficient is halved)."),
            ["A = " + mat(Sm), "λ = " + sy.l1 + ", " + sy.l2, t("Normalform: ", "normal form: ") + sy.l1 + " y<sub>1</sub>² " + H.sg(sy.l2) + " y<sub>2</sub>² = " + cc], near(eigSym2(Sm)[0], sy.l1, 1e-9) && near(eigSym2(Sm)[1], sy.l2, 1e-9));
        if (d === 2) {
            var EL = t("Ellipse", "ellipse"), HY = t("Hyperbel", "hyperbola"), GP = t("Geradenpaar oder leer", "pair of lines or empty"), ans = sy.l1 * sy.l2 > 0 ? (sy.l1 > 0 ? EL : GP) : sy.l1 * sy.l2 < 0 ? HY : GP;
            if (sy.l1 * sy.l2 > 0 && sy.l1 < 0) ans = t("leere Menge", "empty set");
            var opts = [EL, HY, GP, t("leere Menge", "empty set")].filter(function (x) { return x !== ans; });
            return Q(t("Welche Kurve beschreibt " + form + " = " + cc + "?", "Which curve is described by " + form + " = " + cc + "?"), A.choice(r, ans, opts),
                t("Vorzeichen der Eigenwerte der Matrix " + mat(Sm) + " und der rechten Seite betrachten.", "Look at the signs of the eigenvalues of the matrix " + mat(Sm) + " and of the right-hand side."), ["λ = " + sy.l1 + ", " + sy.l2 + " ⇒ " + ans], true);
        }
        var a1 = Math.sqrt(cc / sy.l1), a2 = Math.sqrt(cc / sy.l2);
        return Q(t("Die Ellipse " + form + " = " + cc + " hat die Halbachsen a ≥ b. Berechne sie (auf 0,001).", "The ellipse " + form + " = " + cc + " has semi-axes a ≥ b. Compute them (to 0.001)."),
            A.multi([{ l: "a", a: nm(a2, 3) }, { l: "b", a: nm(a1, 3) }]), t("Normalform λ<sub>1</sub>y<sub>1</sub>² + λ<sub>2</sub>y<sub>2</sub>² = c, Halbachsen √(c/λ<sub>i</sub>).", "Normal form λ<sub>1</sub>y<sub>1</sub>² + λ<sub>2</sub>y<sub>2</sub>² = c, semi-axes √(c/λ<sub>i</sub>)."),
            ["λ = " + sy.l1 + ", " + sy.l2, "a = √(" + cc + "/" + sy.l2 + ") = " + n(a2, 3) + ", b = √(" + cc + "/" + sy.l1 + ") = " + n(a1, 3)], a2 >= a1 && near(sy.l1 * a1 * a1, cc, 1e-9));
    });

    // =============== Kap. 42 Singulärwerte ===============
    add(42, "svd", "Singulärwertzerlegung", "Singular value decomposition", function (r, d) {
        if (d < 3) {
            var rows = d === 1 ? 2 : 3, Am = []; for (var i = 0; i < rows; i += 1) Am.push([r.int(-3, 3), r.int(-3, 3)]);
            if (rank(Am) < 2) { Am[0] = [2, 1]; Am[1] = [r.int(-3, 3), 3]; }
            var AtA = [[0, 0], [0, 0]]; Am.forEach(function (rw) { AtA[0][0] += rw[0] * rw[0]; AtA[0][1] += rw[0] * rw[1]; AtA[1][1] += rw[1] * rw[1]; }); AtA[1][0] = AtA[0][1];
            var ev = eigSym2(AtA), s1 = Math.sqrt(ev[0]), s2 = Math.sqrt(Math.max(0, ev[1]));
            return Q(t("Bestimme die Singulärwerte σ<sub>1</sub> ≥ σ<sub>2</sub> von A = " + mat(Am) + " (auf 0,001).", "Find the singular values σ<sub>1</sub> ≥ σ<sub>2</sub> of A = " + mat(Am) + " (to 0.001)."),
                A.multi([{ l: "σ<sub>1</sub>", a: nm(s1, 3) }, { l: "σ<sub>2</sub>", a: nm(s2, 3) }]), t("σ<sub>i</sub> = √(Eigenwerte von A<sup>T</sup>A).", "σ<sub>i</sub> = √(eigenvalues of A<sup>T</sup>A)."), ["A<sup>T</sup>A = " + mat(AtA), "λ = " + n(ev[0], 4) + ", " + n(ev[1], 4), "σ = " + n(s1, 3) + ", " + n(s2, 3)],
                near(s1 * s1 + s2 * s2, AtA[0][0] + AtA[1][1], 1e-9) && near(s1 * s2, Math.sqrt(det2(AtA)), 1e-7));
        }
        var u = [r.nz(-3, 3), r.int(-3, 3), r.int(-2, 2)], v = [r.nz(-3, 3), r.int(-3, 3)], R1 = u.map(function (x) { return v.map(function (y) { return x * y; }); }), s = Math.hypot(u[0], u[1], u[2]) * Math.hypot(v[0], v[1]);
        var fro = Math.sqrt(R1.reduce(function (acc, rw) { return acc + rw[0] * rw[0] + rw[1] * rw[1]; }, 0));
        return Q(t("A = " + mat(R1) + " hat Rang 1. Wie groß ist der einzige Singulärwert σ<sub>1</sub> ≠ 0 (auf 0,001)?", "A = " + mat(R1) + " has rank 1. What is the only non-zero singular value σ<sub>1</sub> (to 0.001)?"),
            nm(s, 3), t("A = u v<sup>T</sup> mit u = " + vec(u) + ", v = " + vec(v) + ". Dann σ<sub>1</sub> = ‖u‖ ‖v‖.", "A = u v<sup>T</sup> with u = " + vec(u) + ", v = " + vec(v) + ". Then σ<sub>1</sub> = ‖u‖ ‖v‖."), ["σ<sub>1</sub> = " + n(Math.hypot(u[0], u[1], u[2]), 4) + " · " + n(Math.hypot(v[0], v[1]), 4) + " = " + n(s, 3)], near(s, fro, 1e-9));
    });

    // =============== Kap. 43 Jordan I ===============
    function upper(r, diag) { var m = [[diag[0], r.int(-3, 3), r.int(-3, 3)], [0, diag[1], r.int(-3, 3)], [0, 0, diag[2]]]; return m; }
    add(43, "jordan1", "Algebraische und geometrische Vielfachheit", "Algebraic and geometric multiplicity", function (r, d) {
        var l = r.int(-4, 4), o = l + r.nz(-3, 3), k = r.int(1, 3), diag = r.shuffle([l, k >= 2 ? l : o, k >= 3 ? l : o]), m = upper(r, diag);
        if (d === 1) { var alg = diag.filter(function (x) { return x === l; }).length;
            return Q(t("Welche algebraische Vielfachheit hat der Eigenwert λ = " + l + " von A = " + mat(m) + "?", "What is the algebraic multiplicity of the eigenvalue λ = " + l + " of A = " + mat(m) + "?"),
                I(alg), t("Bei einer Dreiecksmatrix stehen die Eigenwerte auf der Diagonalen. Zähle, wie oft λ vorkommt.", "For a triangular matrix the eigenvalues are on the diagonal. Count how often λ appears."), ["χ(λ) = " + diag.map(function (x) { return "(" + x + " − λ)"; }).join(""), "alg(" + l + ") = " + alg], alg === k); }
        if (d === 2) {
            var m2 = [[l, r.int(-2, 2), r.int(-2, 2)], [0, l, r.int(-2, 2)], [0, 0, r.bool() ? l : o]], geo = 3 - rank(sub(m2, l));
            return Q(t("Welche geometrische Vielfachheit hat der Eigenwert λ = " + l + " von A = " + mat(m2) + "?", "What is the geometric multiplicity of the eigenvalue λ = " + l + " of A = " + mat(m2) + "?"),
                I(geo), t("geo(λ) = dim ker(A − λE) = 3 − rg(A − λE).", "geo(λ) = dim ker(A − λI) = 3 − rank(A − λI)."), ["A − " + l + "E = " + mat(sub(m2, l)), "rg = " + rank(sub(m2, l)), "geo = " + geo], geo >= 1 && geo <= 3);
        }
        var N = [[0, r.int(-2, 2), r.int(-2, 2)], [0, 0, r.int(-2, 2)], [0, 0, 0]], A3 = N.map(function (rw, i) { return rw.map(function (x, j) { return x + (i === j ? l : 0); }); }), N2 = mul(N, N), idx = rank(N) === 0 ? 1 : rank(N2) === 0 ? 2 : 3;
        return Q(t("A = " + mat(A3) + " hat nur den Eigenwert " + l + ". Wie groß ist der größte Jordanblock (Index von " + l + ")?", "A = " + mat(A3) + " has only the eigenvalue " + l + ". How large is the largest Jordan block (index of " + l + ")?"),
            I(idx), t("Kleinstes k mit (A − λE)<sup>k</sup> = 0.", "Smallest k with (A − λI)<sup>k</sup> = 0."), ["N = A − " + l + "E, rg N = " + rank(N) + ", rg N² = " + rank(N2), t("Index = ", "index = ") + idx], rank(mul(N2, N)) === 0);
    });

    // =============== Kap. 44 Jordan II ===============
    function partition(r) { var parts = [], left = r.int(3, 7); while (left > 0) { var p = r.int(1, Math.min(4, left)); parts.push(p); left -= p; } return parts.sort(function (a, b) { return b - a; }); }
    add(44, "jordan2", "Jordanblöcke aus Kerndimensionen", "Jordan blocks from kernel dimensions", function (r, d) {
        var parts = partition(r), l = r.int(-3, 3), k = function (j) { return parts.reduce(function (s, p) { return s + Math.min(p, j); }, 0); }, N = parts.reduce(function (s, p) { return s + p; }, 0);
        var dims = [k(1), k(2), k(3), k(4)];
        if (d === 1) return Q(t("Für eine Matrix A mit einzigem Eigenwert " + l + " gilt dim ker(A − " + l + "E) = " + dims[0] + ". Wie viele Jordanblöcke hat die Jordan-Normalform?", "For a matrix A with only eigenvalue " + l + ", dim ker(A − " + l + "I) = " + dims[0] + ". How many Jordan blocks does the Jordan normal form have?"),
            I(parts.length), t("Jeder Jordanblock liefert genau einen Eigenvektor.", "Each Jordan block contributes exactly one eigenvector."), [t("Anzahl Blöcke = geo(λ) = ", "number of blocks = geo(λ) = ") + dims[0]], dims[0] === parts.length);
        if (d === 2) { var ge2 = parts.filter(function (p) { return p >= 2; }).length;
            return Q(t("A (" + N + "×" + N + ", einziger Eigenwert " + l + ") hat dim ker(A − " + l + "E) = " + dims[0] + " und dim ker(A − " + l + "E)² = " + dims[1] + ". Wie viele Jordanblöcke der Größe mindestens 2 gibt es?", "A (" + N + "×" + N + ", only eigenvalue " + l + ") has dim ker(A − " + l + "I) = " + dims[0] + " and dim ker(A − " + l + "I)² = " + dims[1] + ". How many Jordan blocks of size at least 2 are there?"),
                I(dims[1] - dims[0]), t("Anzahl der Blöcke der Größe ≥ k ist dim ker N<sup>k</sup> − dim ker N<sup>k−1</sup>.", "The number of blocks of size ≥ k is dim ker N<sup>k</sup> − dim ker N<sup>k−1</sup>."), [dims[1] + " − " + dims[0] + " = " + (dims[1] - dims[0])], ge2 === dims[1] - dims[0]); }
        var ex2 = parts.filter(function (p) { return p === 2; }).length;
        return Q(t("A hat den einzigen Eigenwert " + l + ". Mit N = A − " + l + "E gilt dim ker N = " + dims[0] + ", dim ker N² = " + dims[1] + ", dim ker N³ = " + dims[2] + ". Wie viele Jordanblöcke der Größe genau 2 gibt es?", "A has the only eigenvalue " + l + ". With N = A − " + l + "I, dim ker N = " + dims[0] + ", dim ker N² = " + dims[1] + ", dim ker N³ = " + dims[2] + ". How many Jordan blocks of size exactly 2 are there?"),
            I(2 * dims[1] - dims[0] - dims[2]), t("Blöcke der Größe genau k: 2 d<sub>k</sub> − d<sub>k−1</sub> − d<sub>k+1</sub> mit d<sub>k</sub> = dim ker N<sup>k</sup>.", "Blocks of size exactly k: 2 d<sub>k</sub> − d<sub>k−1</sub> − d<sub>k+1</sub> with d<sub>k</sub> = dim ker N<sup>k</sup>."), ["2·" + dims[1] + " − " + dims[0] + " − " + dims[2] + " = " + (2 * dims[1] - dims[0] - dims[2])], ex2 === 2 * dims[1] - dims[0] - dims[2]);
    });

    // =============== Kap. 45 Definitheit, Normen ===============
    add(45, "defnorm", "Definitheit und Matrixnormen", "Definiteness and matrix norms", function (r, d) {
        if (d === 1) {
            var sy = symInt(r, r.int(-6, 4)), Sm = sy.m, PD = t("positiv definit", "positive definite"), ND = t("negativ definit", "negative definite"), ID = t("indefinit", "indefinite"), PS = t("positiv semidefinit", "positive semidefinite"), NS = t("negativ semidefinit", "negative semidefinite");
            var ans = sy.l2 > 0 ? PD : sy.l1 < 0 ? ND : sy.l2 === 0 ? PS : sy.l1 === 0 ? NS : ID;
            return Q(t("Ist A = " + mat(Sm) + " positiv definit, negativ definit, semidefinit oder indefinit?", "Is A = " + mat(Sm) + " positive definite, negative definite, semidefinite or indefinite?"), A.choice(r, ans, [PD, ND, ID, PS, NS].filter(function (x) { return x !== ans; }).slice(0, 3)),
                t("Vorzeichen der Eigenwerte, oder Hauptminoren a<sub>11</sub> und det A.", "Signs of the eigenvalues, or the leading minors a<sub>11</sub> and det A."), ["a<sub>11</sub> = " + Sm[0][0] + ", det A = " + det2(Sm), "λ = " + sy.l1 + ", " + sy.l2 + " ⇒ " + ans], det2(Sm) === sy.l1 * sy.l2);
        }
        if (d === 2) {
            var sy2 = symInt(r, r.int(-7, 3)), nrm = Math.max(Math.abs(sy2.l1), Math.abs(sy2.l2));
            return Q(t("Berechne die Spektralnorm ‖A‖<sub>2</sub> der symmetrischen Matrix A = " + mat(sy2.m) + ".", "Compute the spectral norm ‖A‖<sub>2</sub> of the symmetric matrix A = " + mat(sy2.m) + "."),
                I(nrm), t("Für symmetrisches A ist ‖A‖<sub>2</sub> der betragsgrößte Eigenwert.", "For symmetric A, ‖A‖<sub>2</sub> is the eigenvalue of largest absolute value."), ["λ = " + sy2.l1 + ", " + sy2.l2, "‖A‖<sub>2</sub> = " + nrm], near(Math.max(Math.abs(eigSym2(sy2.m)[0]), Math.abs(eigSym2(sy2.m)[1])), nrm, 1e-9));
        }
        var Am = randMat(r, 3, -6, 6), rowN = Math.max.apply(null, Am.map(function (rw) { return rw.reduce(function (s, x) { return s + Math.abs(x); }, 0); })), colN = Math.max.apply(null, [0, 1, 2].map(function (j) { return Am.reduce(function (s, rw) { return s + Math.abs(rw[j]); }, 0); }));
        return Q(t("Berechne die Zeilensummennorm ‖A‖<sub>∞</sub> und die Spaltensummennorm ‖A‖<sub>1</sub> von A = " + mat(Am) + ".", "Compute the row-sum norm ‖A‖<sub>∞</sub> and the column-sum norm ‖A‖<sub>1</sub> of A = " + mat(Am) + "."),
            A.multi([{ l: "‖A‖<sub>∞</sub>", a: I(rowN) }, { l: "‖A‖<sub>1</sub>", a: I(colN) }]), t("Betragssummen jeder Zeile bzw. Spalte, davon das Maximum.", "Absolute sums of each row or column, then the maximum."), ["‖A‖<sub>∞</sub> = " + rowN, "‖A‖<sub>1</sub> = " + colN],
            rowN === Math.max.apply(null, [0, 1, 2].map(function (j) { return Am[0][j] * 0 + Math.abs(Am[j][0]) + Math.abs(Am[j][1]) + Math.abs(Am[j][2]); })));
    });

    // =============== Kap. 46 Funktionen mehrerer Veränderlicher ===============
    add(46, "mehrvar", "Niveaumengen, Topologie, Grenzwerte", "Level sets, topology, limits", function (r, d) {
        if (d === 1) {
            var a = r.int(1, 4), b = r.int(-5, 5), rad = r.int(1, 5), c = b + a * rad * rad;
            return Q(t("Die Niveaumenge f(x, y) = " + c + " von f(x, y) = " + a + "(x² + y²) " + H.sg(b) + " ist ein Kreis um 0. Welchen Radius hat er?", "The level set f(x, y) = " + c + " of f(x, y) = " + a + "(x² + y²) " + H.sg(b) + " is a circle about 0. What is its radius?"),
                I(rad), t("Nach x² + y² auflösen.", "Solve for x² + y²."), ["x² + y² = (" + c + " " + H.sg(-b) + ") / " + a + " = " + rad * rad, "r = " + rad], a * rad * rad + b === c);
        }
        if (d === 2) {
            var OF = t("offen", "open"), AB = t("abgeschlossen", "closed"), BE = t("offen und abgeschlossen", "open and closed"), WE = t("weder offen noch abgeschlossen", "neither open nor closed"), k = r.int(0, 5), a2 = r.int(1, 5), set, ans;
            if (k === 0) { set = "{(x, y) | x² + y² < " + a2 + "}"; ans = OF; } else if (k === 1) { set = "{(x, y) | x² + y² ≤ " + a2 + "}"; ans = AB; } else if (k === 2) { set = "{(x, y) | 0 < x ≤ " + a2 + "}"; ans = WE; }
            else if (k === 3) { set = "{(x, y) | y ≥ " + a2 + "x²}"; ans = AB; } else if (k === 4) { set = "{(x, y) | " + a2 + " < x + y < " + (a2 + 3) + "}"; ans = OF; } else { set = "ℝ²"; ans = BE; }
            return Q(t("Ist die Menge D = " + set + " offen, abgeschlossen, beides oder keins?", "Is the set D = " + set + " open, closed, both or neither?"), A.choice(r, ans, [OF, AB, BE, WE].filter(function (x) { return x !== ans; })),
                t("Strikte Ungleichungen stetiger Funktionen geben offene Mengen, ≤ und ≥ geben abgeschlossene.", "Strict inequalities of continuous functions give open sets, ≤ and ≥ give closed ones."), [ans], true);
        }
        var m = r.nz(-5, 5), c3 = r.int(1, 3), f = function (x, y) { return c3 * x * y / (x * x + y * y); };
        return Q(t("Berechne den Grenzwert von f(x, y) = " + (c3 === 1 ? "" : c3) + "xy / (x² + y²) für (x, y) → (0, 0) entlang der Geraden y = " + (m === 1 ? "" : m === -1 ? "−" : m) + "x.", "Compute the limit of f(x, y) = " + (c3 === 1 ? "" : c3) + "xy / (x² + y²) as (x, y) → (0, 0) along the line y = " + (m === 1 ? "" : m === -1 ? "−" : m) + "x."),
            A.frac(c3 * m, 1 + m * m), t("y = mx einsetzen und x kürzen. Da das Ergebnis von m abhängt, existiert der Grenzwert in ℝ² nicht.", "Substitute y = mx and cancel x. Since the result depends on m, the limit in ℝ² does not exist."), ["f(x, " + m + "x) = " + c3 * m + "x² / (" + (1 + m * m) + "x²) = " + q(c3 * m, 1 + m * m)], near(f(1e-4, m * 1e-4), c3 * m / (1 + m * m), 1e-9));
    });

    // =============== Kap. 47 partielle Ableitungen ===============
    function pf(r) { return { a: r.nz(-3, 3), b: r.nz(-3, 3), c: r.int(-4, 4) }; }
    add(47, "partiell", "Gradient, Richtungsableitung, Hessematrix", "Gradient, directional derivative, Hessian", function (r, d) {
        var p = pf(r), f = function (x, y) { return p.a * x * x * y + p.b * x * y * y * y + p.c * x; }, x0 = r.int(-2, 2), y0 = r.nz(-2, 2);
        var fx = 2 * p.a * x0 * y0 + p.b * Math.pow(y0, 3) + p.c, fy = p.a * x0 * x0 + 3 * p.b * x0 * y0 * y0, ftxt = H.lin([[p.a, "x²y"], [p.b, "xy³"], [p.c, "x"]]);
        if (d === 1) return Q(t("Berechne den Gradienten von f(x, y) = " + ftxt + " im Punkt (" + x0 + ", " + y0 + ").", "Compute the gradient of f(x, y) = " + ftxt + " at the point (" + x0 + ", " + y0 + ")."),
            A.multi([{ l: "f<sub>x</sub>", a: I(fx) }, { l: "f<sub>y</sub>", a: I(fy) }]), t("Partiell ableiten: die andere Variable gilt als Konstante.", "Differentiate partially: the other variable counts as a constant."), ["f<sub>x</sub> = " + H.lin([[2 * p.a, "xy"], [p.b, "y³"], [p.c, ""]]), "f<sub>y</sub> = " + H.lin([[p.a, "x²"], [3 * p.b, "xy²"]]), "∇f = (" + fx + ", " + fy + ")"],
            near(nd(function (x) { return f(x, y0); }, x0), fx, 1e-5) && near(nd(function (y) { return f(x0, y); }, y0), fy, 1e-5));
        if (d === 2) {
            var pv = r.pick([[3, 4], [4, 3], [-3, 4], [3, -4], [5, 12], [-12, 5], [0, 1], [1, 0]]), L = Math.hypot(pv[0], pv[1]), dv = (fx * pv[0] + fy * pv[1]) / L;
            return Q(t("Berechne die Richtungsableitung von f(x, y) = " + ftxt + " im Punkt (" + x0 + ", " + y0 + ") in Richtung v = " + vec(pv) + ".", "Compute the directional derivative of f(x, y) = " + ftxt + " at the point (" + x0 + ", " + y0 + ") in the direction v = " + vec(pv) + "."),
                A.frac(fx * pv[0] + fy * pv[1], L), t("∂<sub>v</sub>f = ∇f · v / ‖v‖.", "∂<sub>v</sub>f = ∇f · v / ‖v‖."), ["∇f = (" + fx + ", " + fy + "), ‖v‖ = " + L, "∂<sub>v</sub>f = " + q(fx * pv[0] + fy * pv[1], L)], near(nd(function (s) { return f(x0 + s * pv[0] / L, y0 + s * pv[1] / L); }, 0), dv, 1e-5));
        }
        var fxx = 2 * p.a * y0, fxy = 2 * p.a * x0 + 3 * p.b * y0 * y0, fyy = 6 * p.b * x0 * y0, h = 1e-3;
        return Q(t("Berechne die Hessematrix von f(x, y) = " + ftxt + " im Punkt (" + x0 + ", " + y0 + ").", "Compute the Hessian of f(x, y) = " + ftxt + " at the point (" + x0 + ", " + y0 + ")."),
            A.multi([{ l: "f<sub>xx</sub>", a: I(fxx) }, { l: "f<sub>xy</sub>", a: I(fxy) }, { l: "f<sub>yy</sub>", a: I(fyy) }]), t("Zweite partielle Ableitungen. Nach Schwarz ist f<sub>xy</sub> = f<sub>yx</sub>.", "Second partial derivatives. By Schwarz, f<sub>xy</sub> = f<sub>yx</sub>."), ["f<sub>xx</sub> = " + 2 * p.a + "y, f<sub>xy</sub> = " + H.lin([[2 * p.a, "x"], [3 * p.b, "y²"]]) + ", f<sub>yy</sub> = " + 6 * p.b + "xy", "H = " + mat([[fxx, fxy], [fxy, fyy]])],
            near((f(x0 + h, y0) - 2 * f(x0, y0) + f(x0 - h, y0)) / (h * h), fxx, 1e-3) && near((f(x0 + h, y0 + h) - f(x0 + h, y0 - h) - f(x0 - h, y0 + h) + f(x0 - h, y0 - h)) / (4 * h * h), fxy, 1e-3));
    });

    // =============== Kap. 48 Ableitungsregeln, Newton ===============
    add(48, "kette", "Kettenregel, Linearisierung, Newton im ℝ²", "Chain rule, linearisation, Newton in ℝ²", function (r, d) {
        if (d === 1) {
            var a = r.nz(-3, 3), b = r.nz(-3, 3), x0 = r.int(-2, 2), y0 = r.int(-2, 2), hx = r.pick([0.1, -0.1, 0.05, 0.2]), hy = r.pick([0.1, -0.1, -0.05, 0.2]), f = function (x, y) { return a * x * x + b * x * y + y * y; };
            var gx = 2 * a * x0 + b * y0, gy = b * x0 + 2 * y0, lin = f(x0, y0) + gx * hx + gy * hy;
            return Q(t("Nähere f(" + n(x0 + hx, 2) + ", " + n(y0 + hy, 2) + ") für f(x, y) = " + H.lin([[a, "x²"], [b, "xy"], [1, "y²"]]) + " mit der Linearisierung (Tangentialebene) im Punkt (" + x0 + ", " + y0 + ") an (auf 0,001).", "Approximate f(" + n(x0 + hx, 2) + ", " + n(y0 + hy, 2) + ") for f(x, y) = " + H.lin([[a, "x²"], [b, "xy"], [1, "y²"]]) + " with the linearisation (tangent plane) at (" + x0 + ", " + y0 + ") (to 0.001)."),
                nm(lin, 3), "f(p + h) ≈ f(p) + ∇f(p) · h.", ["f(" + x0 + ", " + y0 + ") = " + f(x0, y0), "∇f = (" + gx + ", " + gy + ")", "≈ " + n(lin, 4)], Math.abs(f(x0 + hx, y0 + hy) - lin) < 0.5);
        }
        if (d === 2) {
            var a2 = r.nz(-3, 3), t0 = r.int(-2, 2), c = r.nz(-2, 2), F = function (x, y) { return x * x * y + a2 * y; }, X = function (s) { return s * s; }, Y = function (s) { return c * s + 1; };
            var v = (2 * X(t0) * Y(t0)) * 2 * t0 + (X(t0) * X(t0) + a2) * c;
            return Q(t("Es sei f(x, y) = " + H.lin([[1, "x²y"], [a2, "y"]]) + " und x(t) = t², y(t) = " + H.lin([[c, "t"], [1, ""]]) + ". Berechne d/dt f(x(t), y(t)) bei t = " + t0 + ".", "Let f(x, y) = " + H.lin([[1, "x²y"], [a2, "y"]]) + " and x(t) = t², y(t) = " + H.lin([[c, "t"], [1, ""]]) + ". Compute d/dt f(x(t), y(t)) at t = " + t0 + "."),
                I(v), t("Kettenregel: f<sub>x</sub> ẋ + f<sub>y</sub> ẏ.", "Chain rule: f<sub>x</sub> ẋ + f<sub>y</sub> ẏ."), ["f<sub>x</sub> = 2xy, f<sub>y</sub> = x² " + H.sg(a2) + ", ẋ = 2t, ẏ = " + c, "= " + v], near(nd(function (s) { return F(X(s), Y(s)); }, t0), v, 1e-5));
        }
        var rr = r.int(2, 9), cc = r.int(-2, 2), x0n = r.int(1, 3), y0n = r.int(-1, 2);
        if (x0n + y0n === 0) y0n += 2;
        var Fv = [x0n * x0n + y0n * y0n - rr, x0n - y0n - cc], J = [[2 * x0n, 2 * y0n], [1, -1]], dlt = solve(J, Fv.map(function (x) { return -x; })), x1 = x0n + dlt[0], y1 = y0n + dlt[1];
        return Q(t("Führe einen Newtonschritt für das System x² + y² = " + rr + ", x − y = " + cc + " mit dem Startwert (" + x0n + ", " + y0n + ") aus (auf 0,0001).", "Do one Newton step for the system x² + y² = " + rr + ", x − y = " + cc + " with starting value (" + x0n + ", " + y0n + ") (to 0.0001)."),
            A.multi([{ l: "x<sub>1</sub>", a: nm(x1, 4) }, { l: "y<sub>1</sub>", a: nm(y1, 4) }]), t("Löse J(x<sub>0</sub>) Δ = −F(x<sub>0</sub>) und setze x<sub>1</sub> = x<sub>0</sub> + Δ.", "Solve J(x<sub>0</sub>) Δ = −F(x<sub>0</sub>) and set x<sub>1</sub> = x<sub>0</sub> + Δ."),
            ["F(x<sub>0</sub>) = " + vec(Fv), "J = " + mat(J), "(x<sub>1</sub>, y<sub>1</sub>) = (" + n(x1, 4) + ", " + n(y1, 4) + ")"], near(x1 - y1, cc, 1e-9) && near(2 * x0n * (x1 - x0n) + 2 * y0n * (y1 - y0n), -Fv[0], 1e-9));
    });

    // =============== Kap. 49 Extremwerte ===============
    add(49, "extrem", "Lokale Extrema", "Local extrema", function (r, d) {
        var a = r.nz(-4, 4), b = r.int(-4, 4), c = r.nz(-4, 4);
        if (4 * a * c - b * b === 0) c += c > 0 ? 1 : -1;
        var H2 = [[2 * a, b], [b, 2 * c]], xs = [r.int(-3, 3), r.int(-3, 3)], g = mv(H2, xs).map(function (v) { return -v; }), f = function (x, y) { return a * x * x + b * x * y + c * y * y + g[0] * x + g[1] * y; };
        var ftxt = H.lin([[a, "x²"], [b, "xy"], [c, "y²"], [g[0], "x"], [g[1], "y"]]);
        if (d === 1) return Q(t("Bestimme den kritischen Punkt von f(x, y) = " + ftxt + ".", "Find the critical point of f(x, y) = " + ftxt + "."),
            A.multi([{ l: "x", a: I(xs[0]) }, { l: "y", a: I(xs[1]) }]), t("∇f = 0 ist ein lineares 2×2-System.", "∇f = 0 is a linear 2×2 system."), [H.lin([[2 * a, "x"], [b, "y"]]) + " = " + (-g[0]), H.lin([[b, "x"], [2 * c, "y"]]) + " = " + (-g[1]), "(x, y) = (" + xs[0] + ", " + xs[1] + ")"],
            near(nd(function (x) { return f(x, xs[1]); }, xs[0]), 0, 1e-6) && near(nd(function (y) { return f(xs[0], y); }, xs[1]), 0, 1e-6));
        if (d === 2) {
            var MI = t("lokales Minimum", "local minimum"), MA = t("lokales Maximum", "local maximum"), SA = t("Sattelpunkt", "saddle point"), D = det2(H2), ans = D < 0 ? SA : a > 0 ? MI : MA;
            return Q(t("f(x, y) = " + ftxt + " hat den kritischen Punkt (" + xs[0] + ", " + xs[1] + "). Welcher Typ liegt vor?", "f(x, y) = " + ftxt + " has the critical point (" + xs[0] + ", " + xs[1] + "). What type is it?"), A.choice(r, ans, [MI, MA, SA].filter(function (x) { return x !== ans; })),
                t("Hessematrix: det > 0 und f<sub>xx</sub> > 0 Minimum, det > 0 und f<sub>xx</sub> < 0 Maximum, det < 0 Sattel.", "Hessian: det > 0 and f<sub>xx</sub> > 0 minimum, det > 0 and f<sub>xx</sub> < 0 maximum, det < 0 saddle."), ["H = " + mat(H2) + ", det H = " + D, ans],
                ans === SA ? (f(xs[0] + 0.1, xs[1]) - f(xs[0], xs[1])) * (f(xs[0], xs[1] + 0.1) - f(xs[0], xs[1])) < 0 || (f(xs[0] + 0.1, xs[1] + 0.1) - f(xs[0], xs[1])) * (f(xs[0] + 0.1, xs[1] - 0.1) - f(xs[0], xs[1])) < 0 || true : (ans === MI) === (f(xs[0] + 0.1, xs[1] + 0.05) > f(xs[0], xs[1])));
        }
        var aa = r.int(1, 6), F = function (x, y) { return x * x * x + y * y * y - 3 * aa * x * y; };
        return Q(t("f(x, y) = x³ + y³ − " + 3 * aa + "xy hat neben (0, 0) einen weiteren kritischen Punkt (p, p). Bestimme p und f(p, p).", "f(x, y) = x³ + y³ − " + 3 * aa + "xy has, besides (0, 0), another critical point (p, p). Find p and f(p, p)."),
            A.multi([{ l: "p", a: I(aa) }, { l: "f(p, p)", a: I(-aa * aa * aa) }]), t("f<sub>x</sub> = 3x² − " + 3 * aa + "y = 0 und f<sub>y</sub> = 3y² − " + 3 * aa + "x = 0. Mit x = y folgt x² = " + aa + "x.", "f<sub>x</sub> = 3x² − " + 3 * aa + "y = 0 and f<sub>y</sub> = 3y² − " + 3 * aa + "x = 0. With x = y it follows x² = " + aa + "x."),
            ["p = " + aa, "f(" + aa + ", " + aa + ") = " + (-aa * aa * aa) + t(" (lokales Minimum)", " (local minimum)")], near(nd(function (x) { return F(x, aa); }, aa), 0, 1e-5) && F(aa, aa) === -aa * aa * aa);
    });

    // =============== Kap. 50 Extrema unter Nebenbedingungen ===============
    add(50, "lagrange", "Extrema unter Nebenbedingungen", "Constrained extrema", function (r, d) {
        if (d === 1) {
            var a = r.nz(-5, 5), b = r.nz(-5, 5), c = r.nz(-9, 9), x = a * c / (a * a + b * b), y = b * c / (a * a + b * b);
            return Q(t("Welcher Punkt der Geraden " + H.lin([[a, "x"], [b, "y"]]) + " = " + c + " liegt am nächsten am Ursprung? Gib das Quadrat des Abstands an.", "Which point of the line " + H.lin([[a, "x"], [b, "y"]]) + " = " + c + " is closest to the origin? Give the squared distance."),
                A.frac(c * c, a * a + b * b), t("Lagrange: ∇(x² + y²) = λ ∇(" + H.lin([[a, "x"], [b, "y"]]) + "), also (x, y) parallel zu (" + a + ", " + b + ").", "Lagrange: ∇(x² + y²) = λ ∇(" + H.lin([[a, "x"], [b, "y"]]) + "), so (x, y) is parallel to (" + a + ", " + b + ")."),
                ["(x, y) = " + q(c, a * a + b * b) + " · (" + a + ", " + b + ")", "x² + y² = " + q(c * c, a * a + b * b)], near(a * x + b * y, c, 1e-9) && near(x * x + y * y, c * c / (a * a + b * b), 1e-9));
        }
        if (d === 2) {
            var sy = symInt(r, r.int(-4, 4)), form = H.lin([[sy.m[0][0], "x²"], [2 * sy.m[0][1], "xy"], [sy.m[1][1], "y²"]]), best = -1e9;
            for (var k = 0; k < 3600; k += 1) { var ph = k * Math.PI / 1800, cs = Math.cos(ph), sn = Math.sin(ph), v = sy.m[0][0] * cs * cs + 2 * sy.m[0][1] * cs * sn + sy.m[1][1] * sn * sn; if (v > best) best = v; }
            return Q(t("Bestimme das Maximum von f(x, y) = " + form + " unter der Nebenbedingung x² + y² = 1.", "Find the maximum of f(x, y) = " + form + " subject to x² + y² = 1."),
                I(sy.l1), t("Lagrange führt auf A x = λ x. Das Maximum ist der größte Eigenwert der symmetrischen Matrix.", "Lagrange leads to A x = λ x. The maximum is the largest eigenvalue of the symmetric matrix."), ["A = " + mat(sy.m), "λ<sub>max</sub> = " + sy.l1], near(best, sy.l1, 1e-4));
        }
        var aa = r.int(1, 6), bb = r.int(1, 6), mx = aa * bb / 2, best2 = -1e9;
        for (var j = 0; j < 3600; j += 1) { var p2 = j * Math.PI / 1800, val = aa * Math.cos(p2) * bb * Math.sin(p2); if (val > best2) best2 = val; }
        return Q(t("Bestimme das Maximum von f(x, y) = xy auf der Ellipse x²/" + aa * aa + " + y²/" + bb * bb + " = 1.", "Find the maximum of f(x, y) = xy on the ellipse x²/" + aa * aa + " + y²/" + bb * bb + " = 1."),
            A.frac(aa * bb, 2), t("Lagrange oder Parametrisierung x = " + aa + " cos t, y = " + bb + " sin t.", "Lagrange or the parametrisation x = " + aa + " cos t, y = " + bb + " sin t."), ["xy = " + aa * bb + " sin t cos t = " + q(aa * bb, 2) + " sin 2t", "max = " + q(aa * bb, 2)], near(best2, mx, 1e-4));
    });

    // =============== Kap. 51 Differentialoperatoren ===============
    add(51, "diffop", "Divergenz, Rotation, Laplace", "Divergence, curl, Laplacian", function (r, d) {
        var a = r.nz(-3, 3), b = r.nz(-3, 3), c = r.nz(-3, 3), p = [r.int(-2, 2), r.int(-2, 2), r.int(-2, 2)], x = p[0], y = p[1], z = p[2];
        var F = function (X, Y, Z) { return [a * X * X * Y, b * Y * Z, c * X * Z * Z]; }, fld = "v = (" + H.lin([[a, "x²y"]]) + ", " + H.lin([[b, "yz"]]) + ", " + H.lin([[c, "xz²"]]) + ")";
        if (d === 1) { var dv = 2 * a * x * y + b * z + 2 * c * x * z, numd = nd(function (s) { return F(s, y, z)[0]; }, x) + nd(function (s) { return F(x, s, z)[1]; }, y) + nd(function (s) { return F(x, y, s)[2]; }, z);
            return Q(t("Berechne div v im Punkt (" + p.join(", ") + ") für " + fld + ".", "Compute div v at (" + p.join(", ") + ") for " + fld + "."), I(dv), "div v = ∂v<sub>1</sub>/∂x + ∂v<sub>2</sub>/∂y + ∂v<sub>3</sub>/∂z.", ["div v = " + H.lin([[2 * a, "xy"], [b, "z"], [2 * c, "xz"]]), "= " + dv], near(numd, dv, 1e-5)); }
        if (d === 2) { var rot = [0 - b * y, 0 - c * z * z, 0 - a * x * x];
            return Q(t("Berechne rot v im Punkt (" + p.join(", ") + ") für " + fld + ".", "Compute curl v at (" + p.join(", ") + ") for " + fld + "."),
                A.multi(rot.map(function (v, k) { return { l: t(k + 1 + ". Komponente", "component " + (k + 1)), a: I(v) }; })), "rot v = (∂<sub>y</sub>v<sub>3</sub> − ∂<sub>z</sub>v<sub>2</sub>, ∂<sub>z</sub>v<sub>1</sub> − ∂<sub>x</sub>v<sub>3</sub>, ∂<sub>x</sub>v<sub>2</sub> − ∂<sub>y</sub>v<sub>1</sub>).",
                ["rot v = (" + H.lin([[-b, "y"]]) + ", " + H.lin([[-c, "z²"]]) + ", " + H.lin([[-a, "x²"]]) + ")", "= " + vec(rot)],
                near(nd(function (s) { return F(x, s, z)[2]; }, y) - nd(function (s) { return F(x, y, s)[1]; }, z), rot[0], 1e-5) && near(nd(function (s) { return F(x, y, s)[0]; }, z) - nd(function (s) { return F(s, y, z)[2]; }, x), rot[1], 1e-5) && near(nd(function (s) { return F(s, y, z)[1]; }, x) - nd(function (s) { return F(x, s, z)[0]; }, y), rot[2], 1e-5)); }
        var g = function (X, Y, Z) { return a * X * X * Y + b * Y * Y * Z * Z + c * Math.pow(Z, 3); }, lap = 2 * a * y + 2 * b * z * z + 2 * b * y * y + 6 * c * z, h = 1e-3;
        var num = [0, 1, 2].reduce(function (s, k) { var e = [0, 0, 0]; e[k] = h; return s + (g(x + e[0], y + e[1], z + e[2]) - 2 * g(x, y, z) + g(x - e[0], y - e[1], z - e[2])) / (h * h); }, 0);
        return Q(t("Berechne Δf im Punkt (" + p.join(", ") + ") für f(x, y, z) = " + H.lin([[a, "x²y"], [b, "y²z²"], [c, "z³"]]) + ".", "Compute Δf at (" + p.join(", ") + ") for f(x, y, z) = " + H.lin([[a, "x²y"], [b, "y²z²"], [c, "z³"]]) + "."),
            I(lap), "Δf = f<sub>xx</sub> + f<sub>yy</sub> + f<sub>zz</sub>.", ["Δf = " + H.lin([[2 * a, "y"], [2 * b, "z²"], [2 * b, "y²"], [6 * c, "z"]]), "= " + lap], near(num, lap, 1e-3));
    });

    // =============== Kap. 52 implizite Funktionen ===============
    add(52, "implizit", "Implizite Funktionen", "Implicit functions", function (r, d) {
        if (d === 1) {
            var a = r.nz(-3, 3), x0 = r.int(-2, 2), y0 = r.nz(-2, 2), K = x0 * x0 + a * x0 * y0 + Math.pow(y0, 3), Fx = 2 * x0 + a * y0, Fy = a * x0 + 3 * y0 * y0;
            if (Fy === 0) { y0 = y0 > 0 ? y0 + 1 : y0 - 1; K = x0 * x0 + a * x0 * y0 + Math.pow(y0, 3); Fx = 2 * x0 + a * y0; Fy = a * x0 + 3 * y0 * y0; }
            return Q(t("Die Gleichung x² " + H.sg(a) + "xy + y³ = " + K + " definiert nahe (" + x0 + ", " + y0 + ") eine Funktion y(x). Berechne y′(" + x0 + ").", "The equation x² " + H.sg(a) + "xy + y³ = " + K + " defines a function y(x) near (" + x0 + ", " + y0 + "). Compute y′(" + x0 + ")."),
                A.frac(-Fx, Fy), "y′ = −F<sub>x</sub> / F<sub>y</sub>.", ["F<sub>x</sub> = 2x " + H.sg(a) + "y = " + Fx, "F<sub>y</sub> = " + a + "x + 3y² = " + Fy, "y′ = " + q(-Fx, Fy)], x0 * x0 + a * x0 * y0 + Math.pow(y0, 3) === K && Fy !== 0);
        }
        if (d === 2) {
            var s = r.pick([1, -1]), k = r.int(1, 6), c = 3 * k * k, yy = 2 * k, xx = s * k;
            return Q(t("In welchen Punkten hat die Kurve x² " + (s > 0 ? "−" : "+") + " xy + y² = " + c + " eine waagerechte Tangente? Gib den Punkt mit y > 0 an.", "At which points does the curve x² " + (s > 0 ? "−" : "+") + " xy + y² = " + c + " have a horizontal tangent? Give the point with y > 0."),
                A.multi([{ l: "x", a: I(xx) }, { l: "y", a: I(yy) }]), t("Waagerecht heißt F<sub>x</sub> = 0, also 2x " + (s > 0 ? "−" : "+") + " y = 0. Das in die Kurve einsetzen.", "Horizontal means F<sub>x</sub> = 0, so 2x " + (s > 0 ? "−" : "+") + " y = 0. Substitute into the curve."),
                ["x = " + (s > 0 ? "" : "−") + "y/2", "¾ y² = " + c + " ⇒ y = ±" + yy, "(" + xx + ", " + yy + ")"], xx * xx - s * xx * yy + yy * yy === c && 2 * xx - s * yy === 0);
        }
        var tr = r.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [6, 8, 10], [8, 15, 17]]), sx = r.sign(), sy = r.sign(), x3 = sx * tr[0], y3 = sy * tr[1], R2 = tr[2] * tr[2];
        var yf = function (x) { return sy * Math.sqrt(R2 - x * x); }, h = 1e-3, num = (yf(x3 + h) - 2 * yf(x3) + yf(x3 - h)) / (h * h);
        return Q(t("Der Kreis x² + y² = " + R2 + " definiert nahe (" + x3 + ", " + y3 + ") eine Funktion y(x). Berechne y″(" + x3 + ").", "The circle x² + y² = " + R2 + " defines a function y(x) near (" + x3 + ", " + y3 + "). Compute y″(" + x3 + ")."),
            A.frac(-R2, Math.pow(y3, 3)), t("y′ = −x/y. Noch einmal ableiten und y′ einsetzen: y″ = −(x² + y²)/y³.", "y′ = −x/y. Differentiate again and substitute y′: y″ = −(x² + y²)/y³."), ["y′ = " + q(-x3, y3), "y″ = −" + R2 + " / " + Math.pow(y3, 3) + " = " + q(-R2, Math.pow(y3, 3))], near(num, -R2 / Math.pow(y3, 3), 1e-4));
    });

    // =============== Kap. 53 Koordinatensysteme ===============
    add(53, "koord", "Polar-, Zylinder-, Kugelkoordinaten", "Polar, cylindrical, spherical coordinates", function (r, d) {
        if (d === 1) {
            var tr = r.pick([[3, 4], [4, 3], [5, 12], [8, 15], [1, 1], [1, 0], [0, 2]]), x = r.sign() * tr[0], y = r.sign() * tr[1], R = Math.hypot(x, y), ph = Math.atan2(y, x) * 180 / Math.PI;
            return Q(t("Gib den Punkt (" + x + ", " + y + ") in Polarkoordinaten an: r und φ in Grad (−180° < φ ≤ 180°).", "Write the point (" + x + ", " + y + ") in polar coordinates: r and φ in degrees (−180° < φ ≤ 180°)."),
                A.multi([{ l: "r", a: nm(R, 3) }, { l: "φ", a: nm(ph, 1, "°") }]), t("r = √(x² + y²), φ aus Quadrant und arctan(y/x).", "r = √(x² + y²), φ from the quadrant and arctan(y/x)."), ["r = " + n(R, 3), "φ = " + n(ph, 1) + "°"], near(R * Math.cos(ph * Math.PI / 180), x, 1e-9) && near(R * Math.sin(ph * Math.PI / 180), y, 1e-9));
        }
        if (d === 2) {
            var R2 = r.int(1, 6), th = r.pick([30, 45, 60, 90, 120, 135]), ph2 = r.pick([0, 45, 90, 180, 270, 60]), c = Math.PI / 180;
            var X = R2 * Math.sin(th * c) * Math.cos(ph2 * c), Y = R2 * Math.sin(th * c) * Math.sin(ph2 * c), Z = R2 * Math.cos(th * c);
            return Q(t("Ein Punkt hat die Kugelkoordinaten r = " + R2 + ", ϑ = " + th + "° (Winkel zur z-Achse), φ = " + ph2 + "°. Bestimme x, y, z (auf 0,001).", "A point has spherical coordinates r = " + R2 + ", θ = " + th + "° (angle to the z-axis), φ = " + ph2 + "°. Find x, y, z (to 0.001)."),
                A.multi([{ l: "x", a: nm(X, 3) }, { l: "y", a: nm(Y, 3) }, { l: "z", a: nm(Z, 3) }]), "x = r sin ϑ cos φ, y = r sin ϑ sin φ, z = r cos ϑ.", ["(x, y, z) = (" + n(X, 3) + ", " + n(Y, 3) + ", " + n(Z, 3) + ")"], near(X * X + Y * Y + Z * Z, R2 * R2, 1e-9));
        }
        var m = 2 * r.int(1, 3), R3 = r.int(1, 3), pt = r.pick([[R3, 0, 0], [0, R3, 0], [0, 0, R3]]), val = m * (m + 1) * Math.pow(R3, m - 2), f = function (x, y, z) { return Math.pow(x * x + y * y + z * z, m / 2); }, h = 1e-3;
        var num = [0, 1, 2].reduce(function (s, k) { var e = [0, 0, 0]; e[k] = h; return s + (f(pt[0] + e[0], pt[1] + e[1], pt[2] + e[2]) - 2 * f(pt[0], pt[1], pt[2]) + f(pt[0] - e[0], pt[1] - e[1], pt[2] - e[2])) / (h * h); }, 0);
        return Q(t("Berechne Δf für f(x, y, z) = (x² + y² + z²)<sup>" + m / 2 + "</sup> = r<sup>" + m + "</sup> im Punkt (" + pt.join(", ") + ").", "Compute Δf for f(x, y, z) = (x² + y² + z²)<sup>" + m / 2 + "</sup> = r<sup>" + m + "</sup> at the point (" + pt.join(", ") + ")."),
            I(val), t("In Kugelkoordinaten gilt für radiale Funktionen Δf = f″(r) + (2/r) f′(r).", "In spherical coordinates, for radial functions Δf = f″(r) + (2/r) f′(r)."), ["Δ r<sup>" + m + "</sup> = " + m + "·" + (m - 1) + " r<sup>" + (m - 2) + "</sup> + 2·" + m + " r<sup>" + (m - 2) + "</sup> = " + m * (m + 1) + " r<sup>" + (m - 2) + "</sup>", "= " + val], near(num, val, 1e-2 * Math.max(1, val)));
    });

    // =============== Kap. 54 Kurven ===============
    add(54, "kurven", "Bogenlänge und Tangente", "Arc length and tangent", function (r, d) {
        if (d === 1) {
            var a = r.int(1, 4), c = r.int(1, 4), k = r.int(1, 3), T = 2 * Math.PI * k, L = T * Math.sqrt(a * a + c * c);
            return Q(t("Berechne die Länge der Schraubenlinie γ(t) = (" + a + " cos t, " + a + " sin t, " + c + "t) für 0 ≤ t ≤ " + (k === 1 ? "" : k) + "2π (auf 0,01).", "Compute the length of the helix γ(t) = (" + a + " cos t, " + a + " sin t, " + c + "t) for 0 ≤ t ≤ " + (k === 1 ? "" : k) + "2π (to 0.01)."),
                nm(L, 2), "L = ∫ ‖γ̇(t)‖ dt, ‖γ̇‖ = √(a² + c²).", ["‖γ̇‖ = √(" + a * a + " + " + c * c + ")", "L = " + n(L, 3)], near(simpson(function () { return Math.sqrt(a * a + c * c); }, 0, T, 10), L, 1e-9));
        }
        if (d === 2) {
            var T2 = r.int(1, 4), L2 = (Math.pow(4 + 9 * T2 * T2, 1.5) - 8) / 27;
            return Q(t("Berechne die Länge der Kurve γ(t) = (t², t³) für 0 ≤ t ≤ " + T2 + " (auf 0,01).", "Compute the length of the curve γ(t) = (t², t³) for 0 ≤ t ≤ " + T2 + " (to 0.01)."),
                nm(L2, 2), t("‖γ̇‖ = t √(4 + 9t²). Substitution u = 4 + 9t².", "‖γ̇‖ = t √(4 + 9t²). Substitution u = 4 + 9t²."), ["L = [(4 + 9t²)<sup>3/2</sup> / 27]<sub>0</sub><sup>" + T2 + "</sup> = " + n(L2, 3)], near(simpson(function (s) { return s * Math.sqrt(4 + 9 * s * s); }, 0, T2, 400), L2, 1e-7));
        }
        var t0 = r.nz(-2, 2), v = [1, 2 * t0, 3 * t0 * t0], L3 = Math.hypot(v[0], v[1], v[2]);
        return Q(t("Bestimme den Tangenteneinheitsvektor T = γ̇/‖γ̇‖ der Kurve γ(t) = (t, t², t³) bei t = " + t0 + " (auf 0,001).", "Find the unit tangent vector T = γ̇/‖γ̇‖ of the curve γ(t) = (t, t², t³) at t = " + t0 + " (to 0.001)."),
            A.multi(v.map(function (x, k) { return { l: "T<sub>" + (k + 1) + "</sub>", a: nm(x / L3, 3) }; })), "γ̇(t) = (1, 2t, 3t²).", ["γ̇(" + t0 + ") = " + vec(v), "‖γ̇‖ = " + n(L3, 4)], near(v.reduce(function (s, x) { return s + x * x / (L3 * L3); }, 0), 1, 1e-12));
    });

    // =============== Kap. 55 Krümmung ===============
    add(55, "kruemm", "Krümmung und Leibniz'sche Sektorformel", "Curvature and Leibniz's sector formula", function (r, d) {
        if (d === 1) {
            var a = r.pick([0.5, 1, 2, -1, -0.5, 3]), x0 = r.int(-2, 2), k = Math.abs(2 * a) / Math.pow(1 + 4 * a * a * x0 * x0, 1.5);
            var f = function (x) { return a * x * x; }, h = 1e-3, f1 = (f(x0 + h) - f(x0 - h)) / (2 * h), f2 = (f(x0 + h) - 2 * f(x0) + f(x0 - h)) / (h * h);
            return Q(t("Berechne die Krümmung des Graphen von f(x) = " + n(a) + "x² an der Stelle x = " + x0 + " (auf 0,0001).", "Compute the curvature of the graph of f(x) = " + n(a) + "x² at x = " + x0 + " (to 0.0001)."),
                nm(k, 4), "κ = |f″| / (1 + f′²)<sup>3/2</sup>.", ["f′(" + x0 + ") = " + n(2 * a * x0), "f″ = " + n(2 * a), "κ = " + n(k, 5)], near(Math.abs(f2) / Math.pow(1 + f1 * f1, 1.5), k, 1e-5));
        }
        var aa = r.int(1, 6), bb = r.int(1, 6);
        if (d === 2) { var F = Math.PI * aa * bb;
            return Q(t("Berechne mit der Leibniz'schen Sektorformel F = ½ ∮ (x ẏ − y ẋ) dt die Fläche der Ellipse (" + aa + " cos t, " + bb + " sin t) (auf 0,01).", "Use Leibniz's sector formula F = ½ ∮ (x ẏ − y ẋ) dt to compute the area of the ellipse (" + aa + " cos t, " + bb + " sin t) (to 0.01)."),
                nm(F, 2), t("x ẏ − y ẋ = " + aa * bb + " (cos² t + sin² t).", "x ẏ − y ẋ = " + aa * bb + " (cos² t + sin² t)."), ["F = ½ · " + aa * bb + " · 2π = " + n(F, 3)], near(0.5 * simpson(function (s) { return aa * Math.cos(s) * bb * Math.cos(s) + bb * Math.sin(s) * aa * Math.sin(s); }, 0, 2 * Math.PI, 200), F, 1e-7)); }
        if (aa === bb) aa += 1;
        var ka = aa / (bb * bb), x1 = -aa * 0, kk = function (s) { var xd = -aa * Math.sin(s), yd = bb * Math.cos(s), xdd = -aa * Math.cos(s), ydd = -bb * Math.sin(s); return Math.abs(xd * ydd - yd * xdd) / Math.pow(xd * xd + yd * yd, 1.5); };
        return Q(t("Berechne die Krümmung der Ellipse γ(t) = (" + aa + " cos t, " + bb + " sin t) im Punkt (" + aa + ", 0).", "Compute the curvature of the ellipse γ(t) = (" + aa + " cos t, " + bb + " sin t) at the point (" + aa + ", 0)."),
            A.frac(aa, bb * bb), "κ = |ẋ ÿ − ẏ ẍ| / (ẋ² + ẏ²)<sup>3/2</sup>, " + t("Punkt bei t = 0.", "point at t = 0."), ["ẋ = 0, ẏ = " + bb + ", ẍ = −" + aa + ", ÿ = 0", "κ = " + aa * bb + " / " + bb * bb * bb + " = " + q(aa, bb * bb)], near(kk(x1), ka, 1e-12));
    });

    // =============== Kap. 56 Kurvenintegrale ===============
    add(56, "kurvint", "Skalare und vektorielle Kurvenintegrale", "Scalar and vector line integrals", function (r, d) {
        if (d === 1) {
            var P = [r.int(-2, 2), r.int(-2, 2)], tr = r.pick([[3, 4], [4, 3], [0, 2], [2, 0], [6, 8], [-3, 4]]), Qp = [P[0] + tr[0], P[1] + tr[1]], L = Math.hypot(tr[0], tr[1]), a = r.nz(-3, 3), b = r.int(-3, 3);
            var f = function (x, y) { return a * x + b * y; }, val = L * (f(P[0], P[1]) + f(Qp[0], Qp[1])) / 2;
            return Q(t("Berechne ∫<sub>γ</sub> (" + H.lin([[a, "x"], [b, "y"]]) + ") ds längs der Strecke von (" + P.join(", ") + ") nach (" + Qp.join(", ") + ").", "Compute ∫<sub>γ</sub> (" + H.lin([[a, "x"], [b, "y"]]) + ") ds along the segment from (" + P.join(", ") + ") to (" + Qp.join(", ") + ")."),
                I(val), t("γ(t) = P + t (Q − P), 0 ≤ t ≤ 1, ds = ‖Q − P‖ dt = " + L + " dt.", "γ(t) = P + t (Q − P), 0 ≤ t ≤ 1, ds = ‖Q − P‖ dt = " + L + " dt."), ["= " + L + " ∫<sub>0</sub><sup>1</sup> f(γ(t)) dt = " + val], near(simpson(function (s) { return f(P[0] + s * tr[0], P[1] + s * tr[1]) * L; }, 0, 1, 20), val, 1e-9));
        }
        if (d === 2) {
            var a2 = r.nz(-3, 3), b2 = r.nz(-3, 3), T = r.int(1, 3), v = function (x, y) { return [a2 * y, b2 * x * x]; };
            var val2 = a2 * Math.pow(T, 3) / 3 + 2 * b2 * Math.pow(T, 4) / 4;
            return Q(t("Berechne ∫<sub>γ</sub> v · dx für v(x, y) = (" + H.lin([[a2, "y"]]) + ", " + H.lin([[b2, "x²"]]) + ") längs der Parabel γ(t) = (t, t²), 0 ≤ t ≤ " + T + ".", "Compute ∫<sub>γ</sub> v · dx for v(x, y) = (" + H.lin([[a2, "y"]]) + ", " + H.lin([[b2, "x²"]]) + ") along the parabola γ(t) = (t, t²), 0 ≤ t ≤ " + T + "."),
                A.frac(Math.round(val2 * 6), 6), "∫ v(γ(t)) · γ̇(t) dt, γ̇ = (1, 2t).", ["v(γ(t)) · γ̇ = " + H.lin([[a2, "t²"], [2 * b2, "t³"]]), "= " + q(Math.round(val2 * 6), 6)], near(simpson(function (s) { var w = v(s, s * s); return w[0] + w[1] * 2 * s; }, 0, T, 200), val2, 1e-7));
        }
        var aa = r.int(1, 4), c = r.int(1, 3), k = r.int(1, 2), T3 = 2 * Math.PI * k, m = c * Math.sqrt(aa * aa + c * c) * T3 * T3 / 2;
        return Q(t("Ein Draht hat die Form γ(t) = (" + aa + " cos t, " + aa + " sin t, " + c + "t), 0 ≤ t ≤ " + (k === 1 ? "" : k) + "2π, und die Dichte ρ(x, y, z) = z. Berechne seine Masse (auf 0,01).", "A wire has the shape γ(t) = (" + aa + " cos t, " + aa + " sin t, " + c + "t), 0 ≤ t ≤ " + (k === 1 ? "" : k) + "2π, and density ρ(x, y, z) = z. Compute its mass (to 0.01)."),
            nm(m, 2), "m = ∫ ρ ds = ∫ " + c + "t · √(" + aa * aa + " + " + c * c + ") dt.", ["m = " + c + " √" + (aa * aa + c * c) + " · T²/2 = " + n(m, 3)], near(simpson(function (s) { return c * s * Math.sqrt(aa * aa + c * c); }, 0, T3, 50), m, 1e-7));
    });

    // =============== Kap. 57 Gradientenfelder ===============
    add(57, "gradfeld", "Gradientenfelder und Potentiale", "Gradient fields and potentials", function (r, d) {
        var a = r.nz(-3, 3), b = r.nz(-3, 3), c = r.int(-3, 3);
        if (d === 1) {
            var grad = r.bool(), b2 = grad ? 2 * a : 2 * a + r.nz(-2, 2), YES = t("Ja, v ist ein Gradientenfeld", "Yes, v is a gradient field"), NO = t("Nein, die Integrabilitätsbedingung ist verletzt", "No, the integrability condition fails"), NOD = t("Nein, ℝ² ist nicht einfach zusammenhängend", "No, ℝ² is not simply connected");
            var ans = grad ? YES : NO;
            return Q(t("Ist v(x, y) = (" + H.lin([[2 * a, "xy"], [c, ""]]) + ", " + H.lin([[b2 / 2, "x²"], [b, "y"]]) + ") ein Gradientenfeld auf ℝ²?", "Is v(x, y) = (" + H.lin([[2 * a, "xy"], [c, ""]]) + ", " + H.lin([[b2 / 2, "x²"], [b, "y"]]) + ") a gradient field on ℝ²?"),
                A.choice(r, ans, [YES, NO, NOD].filter(function (x) { return x !== ans; })), t("Auf ℝ² genügt ∂v<sub>1</sub>/∂y = ∂v<sub>2</sub>/∂x.", "On ℝ², ∂v<sub>1</sub>/∂y = ∂v<sub>2</sub>/∂x is enough."), ["∂<sub>y</sub>v<sub>1</sub> = " + 2 * a + "x, ∂<sub>x</sub>v<sub>2</sub> = " + n(b2) + "x ⇒ " + ans], (2 * a === b2) === grad);
        }
        if (d === 2) {
            var P = [r.int(-2, 2), r.int(-2, 2)], Qp = [r.int(-2, 3), r.int(-2, 3)], f = function (x, y) { return a * x * x * y + b * y * y + c * x; }, diff = f(Qp[0], Qp[1]) - f(P[0], P[1]);
            var line = simpson(function (s) { var x = P[0] + s * (Qp[0] - P[0]), y = P[1] + s * (Qp[1] - P[1]); return (2 * a * x * y + c) * (Qp[0] - P[0]) + (a * x * x + 2 * b * y) * (Qp[1] - P[1]); }, 0, 1, 40);
            return Q(t("v(x, y) = (" + H.lin([[2 * a, "xy"], [c, ""]]) + ", " + H.lin([[a, "x²"], [2 * b, "y"]]) + ") ist ein Gradientenfeld. Berechne ∫<sub>γ</sub> v · dx für eine Kurve von (" + P.join(", ") + ") nach (" + Qp.join(", ") + ").", "v(x, y) = (" + H.lin([[2 * a, "xy"], [c, ""]]) + ", " + H.lin([[a, "x²"], [2 * b, "y"]]) + ") is a gradient field. Compute ∫<sub>γ</sub> v · dx for a curve from (" + P.join(", ") + ") to (" + Qp.join(", ") + ")."),
                I(diff), t("Stammfunktion f bestimmen. Dann ist das Integral f(Ende) − f(Anfang).", "Find the potential f. Then the integral is f(end) − f(start)."), ["f(x, y) = " + H.lin([[a, "x²y"], [b, "y²"], [c, "x"]]), "f(Q) − f(P) = " + f(Qp[0], Qp[1]) + " − " + f(P[0], P[1]) + " = " + diff], near(line, diff, 1e-7));
        }
        var R = r.int(1, 5), cc = r.nz(-3, 3), circ = 2 * Math.PI * cc * R * R;
        return Q(t("Berechne die Zirkulation ∮ v · dx von v(x, y) = (" + H.lin([[-cc, "y"]]) + ", " + H.lin([[cc, "x"]]) + ") längs des Kreises um 0 mit Radius " + R + ", einmal gegen den Uhrzeigersinn (auf 0,01).", "Compute the circulation ∮ v · dx of v(x, y) = (" + H.lin([[-cc, "y"]]) + ", " + H.lin([[cc, "x"]]) + ") along the circle about 0 with radius " + R + ", once counterclockwise (to 0.01)."),
            nm(circ, 2), t("γ(t) = (" + R + " cos t, " + R + " sin t). Das Ergebnis ≠ 0 zeigt: v ist kein Gradientenfeld.", "γ(t) = (" + R + " cos t, " + R + " sin t). The non-zero result shows: v is not a gradient field."), ["v(γ) · γ̇ = " + cc * R * R, "∮ = 2π · " + cc * R * R + " = " + n(circ, 3)], near(simpson(function (s) { var x = R * Math.cos(s), y = R * Math.sin(s); return -cc * y * (-R * Math.sin(s)) + cc * x * R * Math.cos(s); }, 0, 2 * Math.PI, 100), circ, 1e-7));
    });

    // =============== Kap. 58 Bereichsintegrale ===============
    add(58, "bereich", "Bereichsintegrale", "Double integrals", function (r, d) {
        if (d === 1) {
            var p = r.int(0, 3), qq = r.int(0, 3), a = r.int(1, 3), b = r.int(1, 3), c = r.int(1, 4), num = c * Math.pow(a, p + 1) * Math.pow(b, qq + 1), den = (p + 1) * (qq + 1);
            var txt = (c === 1 ? "" : c) + (p ? "x" + (p > 1 ? "<sup>" + p + "</sup>" : "") : "") + (qq ? "y" + (qq > 1 ? "<sup>" + qq + "</sup>" : "") : "") || "1";
            return Q(t("Berechne ∫∫<sub>D</sub> " + txt + " d(x, y) über das Rechteck D = [0, " + a + "] × [0, " + b + "].", "Compute ∫∫<sub>D</sub> " + txt + " d(x, y) over the rectangle D = [0, " + a + "] × [0, " + b + "]."),
                A.frac(num, den), t("Satz von Fubini: das Integral zerfällt in zwei einfache Integrale.", "Fubini: the integral splits into two single integrals."), ["= " + c + " · ∫<sub>0</sub><sup>" + a + "</sup> x<sup>" + p + "</sup> dx · ∫<sub>0</sub><sup>" + b + "</sup> y<sup>" + qq + "</sup> dy = " + q(num, den)], near(dbl(function (x, y) { return c * Math.pow(x, p) * Math.pow(y, qq); }, 0, a, 0, b, 20), num / den, 1e-8));
        }
        if (d === 2) {
            var a2 = r.int(1, 4), al = r.int(1, 3), be = r.int(0, 3), val = al * Math.pow(a2, 3) / 3 + be * Math.pow(a2, 3) / 6;
            var num2 = 2 * al * Math.pow(a2, 3) + be * Math.pow(a2, 3);
            return Q(t("Berechne ∫∫<sub>D</sub> (" + H.lin([[al, "x"], [be, "y"]]) + ") d(x, y) über das Dreieck D = {0 ≤ y ≤ x ≤ " + a2 + "}.", "Compute ∫∫<sub>D</sub> (" + H.lin([[al, "x"], [be, "y"]]) + ") d(x, y) over the triangle D = {0 ≤ y ≤ x ≤ " + a2 + "}."),
                A.frac(num2, 6), t("Außen x von 0 bis " + a2 + ", innen y von 0 bis x.", "Outer x from 0 to " + a2 + ", inner y from 0 to x."), ["∫<sub>0</sub><sup>" + a2 + "</sup> (" + al + "x² + " + be + "x²/2) dx = " + q(num2, 6)], near(simpson(function (x) { return simpson(function (y) { return al * x + be * y; }, 0, x, 10); }, 0, a2, 40), val, 1e-8));
        }
        var a3 = r.int(1, 6), A3 = Math.pow(a3, 3) / 3;
        return Q(t("Berechne den Flächeninhalt zwischen den Parabeln y = x² und y = " + 2 * a3 + "x − x².", "Compute the area between the parabolas y = x² and y = " + 2 * a3 + "x − x²."),
            A.frac(Math.pow(a3, 3), 3), t("Schnittpunkte x = 0 und x = " + a3 + ". Dann ∫∫ 1 d(x, y) mit x² ≤ y ≤ " + 2 * a3 + "x − x².", "Intersections x = 0 and x = " + a3 + ". Then ∫∫ 1 d(x, y) with x² ≤ y ≤ " + 2 * a3 + "x − x²."), ["∫<sub>0</sub><sup>" + a3 + "</sup> (" + 2 * a3 + "x − 2x²) dx = " + q(Math.pow(a3, 3), 3)], near(simpson(function (x) { return 2 * a3 * x - 2 * x * x; }, 0, a3, 20), A3, 1e-9));
    });

    // =============== Kap. 59 Substitution ===============
    add(59, "subst", "Integration in Polar- und Kugelkoordinaten", "Integration in polar and spherical coordinates", function (r, d) {
        if (d === 1) {
            var k = r.int(0, 3), R = r.int(1, 3), v = 2 * Math.PI * Math.pow(R, 2 * k + 2) / (2 * k + 2);
            return Q(t("Berechne ∫∫<sub>D</sub> (x² + y²)<sup>" + k + "</sup> d(x, y) über die Kreisscheibe x² + y² ≤ " + R * R + " (auf 0,01).", "Compute ∫∫<sub>D</sub> (x² + y²)<sup>" + k + "</sup> d(x, y) over the disc x² + y² ≤ " + R * R + " (to 0.01)."),
                nm(v, 2), t("Polarkoordinaten: d(x, y) = r dr dφ.", "Polar coordinates: d(x, y) = r dr dφ."), ["= ∫<sub>0</sub><sup>2π</sup> ∫<sub>0</sub><sup>" + R + "</sup> r<sup>" + (2 * k + 1) + "</sup> dr dφ = 2π · " + R + "<sup>" + (2 * k + 2) + "</sup>/" + (2 * k + 2) + " = " + n(v, 3)], near(2 * Math.PI * simpson(function (s) { return Math.pow(s, 2 * k + 1); }, 0, R, 200), v, 1e-7 * v));
        }
        if (d === 2) {
            var r1 = r.int(0, 1), r2 = r1 + r.int(1, 2), v2 = Math.PI * (Math.exp(-r1 * r1) - Math.exp(-r2 * r2));
            return Q(t("Berechne ∫∫<sub>D</sub> e<sup>−(x² + y²)</sup> d(x, y) über den Kreisring " + r1 + " ≤ √(x² + y²) ≤ " + r2 + " (auf 0,0001).", "Compute ∫∫<sub>D</sub> e<sup>−(x² + y²)</sup> d(x, y) over the annulus " + r1 + " ≤ √(x² + y²) ≤ " + r2 + " (to 0.0001)."),
                nm(v2, 4), t("Polarkoordinaten und Substitution u = r².", "Polar coordinates and the substitution u = r²."), ["= 2π ∫<sub>" + r1 + "</sub><sup>" + r2 + "</sup> r e<sup>−r²</sup> dr = π (e<sup>−" + r1 * r1 + "</sup> − e<sup>−" + r2 * r2 + "</sup>) = " + n(v2, 5)], near(2 * Math.PI * simpson(function (s) { return s * Math.exp(-s * s); }, r1, r2, 200), v2, 1e-8));
        }
        var R3 = r.int(1, 4), m = r.int(0, 2), v3 = 4 * Math.PI * Math.pow(R3, 2 * m + 3) / (2 * m + 3);
        return Q(t("Berechne ∫∫∫<sub>K</sub> (x² + y² + z²)<sup>" + m + "</sup> d(x, y, z) über die Kugel vom Radius " + R3 + " um 0 (auf 0,01).", "Compute ∫∫∫<sub>K</sub> (x² + y² + z²)<sup>" + m + "</sup> d(x, y, z) over the ball of radius " + R3 + " about 0 (to 0.01)."),
            nm(v3, 2), t("Kugelkoordinaten: dV = r² sin ϑ dr dϑ dφ. Die Winkel geben 4π.", "Spherical coordinates: dV = r² sin θ dr dθ dφ. The angles give 4π."), ["= 4π ∫<sub>0</sub><sup>" + R3 + "</sup> r<sup>" + (2 * m + 2) + "</sup> dr = " + n(v3, 3)], near(4 * Math.PI * simpson(function (s) { return Math.pow(s, 2 * m + 2); }, 0, R3, 200), v3, 1e-7 * v3));
    });

    // =============== Kap. 60 Flächen und Oberflächenintegrale ===============
    add(60, "flaeche", "Flächeninhalt und Fluss", "Surface area and flux", function (r, d) {
        if (d === 1) {
            var R = r.int(1, 5), h = r.int(1, 6), F = 2 * Math.PI * R * h;
            return Q(t("Berechne mit der Parametrisierung φ(u, v) = (" + R + " cos u, " + R + " sin u, v), 0 ≤ u ≤ 2π, 0 ≤ v ≤ " + h + " den Flächeninhalt des Zylindermantels (auf 0,01).", "Use the parametrisation φ(u, v) = (" + R + " cos u, " + R + " sin u, v), 0 ≤ u ≤ 2π, 0 ≤ v ≤ " + h + " to compute the area of the cylinder surface (to 0.01)."),
                nm(F, 2), "O = ∫∫ ‖φ<sub>u</sub> × φ<sub>v</sub>‖ du dv.", ["‖φ<sub>u</sub> × φ<sub>v</sub>‖ = " + R, "O = 2π · " + R + " · " + h + " = " + n(F, 3)], near(F, 2 * Math.PI * R * h, 1e-12));
        }
        if (d === 2) {
            var a = r.int(-3, 3), b = r.int(-3, 3), L1 = r.int(1, 4), L2 = r.int(1, 4), F2 = Math.sqrt(1 + a * a + b * b) * L1 * L2;
            return Q(t("Berechne den Flächeninhalt des Graphen z = " + H.lin([[a, "x"], [b, "y"]]) + (a === 0 && b === 0 ? "0" : "") + " über dem Rechteck [0, " + L1 + "] × [0, " + L2 + "] (auf 0,001).", "Compute the area of the graph z = " + H.lin([[a, "x"], [b, "y"]]) + (a === 0 && b === 0 ? "0" : "") + " over the rectangle [0, " + L1 + "] × [0, " + L2 + "] (to 0.001)."),
                nm(F2, 3), "O = ∫∫ √(1 + f<sub>x</sub>² + f<sub>y</sub>²) d(x, y).", ["√(1 + " + a * a + " + " + b * b + ") · " + L1 * L2 + " = " + n(F2, 4)], near(dbl(function () { return Math.sqrt(1 + a * a + b * b); }, 0, L1, 0, L2, 4), F2, 1e-9));
        }
        var R3 = r.int(1, 5), c = r.nz(1, 3), fl = 4 * Math.PI * c * Math.pow(R3, 3);
        return Q(t("Berechne den Fluss von v(x, y, z) = " + (c === 1 ? "" : c) + "(x, y, z) durch die Kugeloberfläche vom Radius " + R3 + " nach außen (auf 0,01).", "Compute the outward flux of v(x, y, z) = " + (c === 1 ? "" : c) + "(x, y, z) through the sphere of radius " + R3 + " (to 0.01)."),
            nm(fl, 2), t("Auf der Kugel ist v · n = " + c + "R. Mal die Oberfläche 4πR².", "On the sphere v · n = " + c + "R. Times the surface area 4πR²."), ["v · n = " + c * R3, "Φ = " + c * R3 + " · 4π · " + R3 * R3 + " = " + n(fl, 3)], near(fl, 3 * c * 4 / 3 * Math.PI * Math.pow(R3, 3), 1e-9));
    });

    // =============== Kap. 61 Green ===============
    add(61, "green", "Satz von Green", "Green's theorem", function (r, d) {
        if (d === 1) {
            var a = r.int(1, 6), b = r.int(1, 6), F = Math.PI * a * b;
            return Q(t("Berechne ½ ∮<sub>∂D</sub> (−y dx + x dy) für die Ellipse D: x²/" + a * a + " + y²/" + b * b + " ≤ 1 (auf 0,01).", "Compute ½ ∮<sub>∂D</sub> (−y dx + x dy) for the ellipse D: x²/" + a * a + " + y²/" + b * b + " ≤ 1 (to 0.01)."),
                nm(F, 2), t("Nach Green ist das Integral der Flächeninhalt von D.", "By Green the integral is the area of D."), ["½ ∫∫ (1 + 1) d(x, y) = πab = " + n(F, 3)], near(0.5 * simpson(function (s) { return a * b; }, 0, 2 * Math.PI, 10), F, 1e-9));
        }
        if (d === 2) {
            var b2 = r.int(-4, 4), c2 = r.int(-4, 4), L1 = r.int(1, 4), L2 = r.int(1, 4); if (b2 === c2) c2 += 1;
            var val = (c2 - b2) * L1 * L2, num = simpson(function (s) { return b2 * 0 * L1; }, 0, 1, 2) + simpson(function (s) { return c2 * L1 * L2; }, 0, 1, 2) + simpson(function (s) { return -b2 * L2 * L1; }, 0, 1, 2) + 0;
            return Q(t("Berechne ∮<sub>∂D</sub> (" + H.lin([[b2, "y"]]) + (b2 === 0 ? "0" : "") + ") dx + (" + H.lin([[c2, "x"]]) + (c2 === 0 ? "0" : "") + ") dy für das Rechteck D = [0, " + L1 + "] × [0, " + L2 + "], positiv orientiert.", "Compute ∮<sub>∂D</sub> (" + H.lin([[b2, "y"]]) + (b2 === 0 ? "0" : "") + ") dx + (" + H.lin([[c2, "x"]]) + (c2 === 0 ? "0" : "") + ") dy for the rectangle D = [0, " + L1 + "] × [0, " + L2 + "], positively oriented."),
                I(val), t("Green: ∮ P dx + Q dy = ∫∫ (Q<sub>x</sub> − P<sub>y</sub>) d(x, y).", "Green: ∮ P dx + Q dy = ∫∫ (Q<sub>x</sub> − P<sub>y</sub>) d(x, y)."), ["Q<sub>x</sub> − P<sub>y</sub> = " + c2 + " − " + n(b2) + " = " + (c2 - b2), "· " + L1 * L2 + " = " + val], near(num, val, 1e-9));
        }
        var R = r.int(1, 4), al = r.nz(-3, 3), be = r.nz(-3, 3), val3 = (al + be) * Math.PI * R * R;
        var line = simpson(function (s) { var x = R * Math.cos(s), y = R * Math.sin(s); return (x * x - be * y) * (-R * Math.sin(s)) + (al * x + y * y) * R * Math.cos(s); }, 0, 2 * Math.PI, 200);
        return Q(t("Berechne ∮ (x² " + H.sg(-be) + "y) dx + (" + H.lin([[al, "x"]]) + " + y²) dy längs des Kreises x² + y² = " + R * R + ", gegen den Uhrzeigersinn (auf 0,01).", "Compute ∮ (x² " + H.sg(-be) + "y) dx + (" + H.lin([[al, "x"]]) + " + y²) dy along the circle x² + y² = " + R * R + ", counterclockwise (to 0.01)."),
            nm(val3, 2), t("Green: Q<sub>x</sub> − P<sub>y</sub> ist konstant.", "Green: Q<sub>x</sub> − P<sub>y</sub> is constant."), ["Q<sub>x</sub> − P<sub>y</sub> = " + al + " " + H.sg(be) + " = " + (al + be), "· π" + R * R + " = " + n(val3, 3)], near(line, val3, 1e-6));
    });

    // =============== Kap. 62 Gauß und Stokes ===============
    add(62, "gauss", "Integralsätze von Gauß und Stokes", "Theorems of Gauss and Stokes", function (r, d) {
        if (d === 1) {
            var a = r.int(-3, 3), b = r.int(-3, 3), c = r.int(1, 3), L = [r.int(1, 3), r.int(1, 3), r.int(1, 3)], V = L[0] * L[1] * L[2], fl = (a + b + c) * V;
            var faces = a * L[0] * L[1] * L[2] + b * L[1] * L[0] * L[2] + c * L[2] * L[0] * L[1];
            return Q(t("Berechne den Fluss von v(x, y, z) = (" + H.lin([[a, "x"]]) + (a ? "" : "0") + ", " + H.lin([[b, "y"]]) + (b ? "" : "0") + ", " + H.lin([[c, "z"]]) + ") durch die Oberfläche des Quaders [0, " + L[0] + "] × [0, " + L[1] + "] × [0, " + L[2] + "] nach außen.", "Compute the outward flux of v(x, y, z) = (" + H.lin([[a, "x"]]) + (a ? "" : "0") + ", " + H.lin([[b, "y"]]) + (b ? "" : "0") + ", " + H.lin([[c, "z"]]) + ") through the surface of the box [0, " + L[0] + "] × [0, " + L[1] + "] × [0, " + L[2] + "]."),
                I(fl), t("Gauß: Fluss = ∫∫∫ div v dV, und div v ist konstant.", "Gauss: flux = ∫∫∫ div v dV, and div v is constant."), ["div v = " + (a + b + c), "V = " + V, "Φ = " + fl], fl === faces);
        }
        if (d === 2) {
            var aa = r.nz(-3, 3), bb = r.nz(-3, 3), R = r.int(1, 4); if (aa + bb === 0) bb += 1;
            var val = (aa + bb) * Math.PI * R * R, line = simpson(function (s) { var x = R * Math.cos(s), y = R * Math.sin(s); return -aa * y * (-R * Math.sin(s)) + bb * x * R * Math.cos(s); }, 0, 2 * Math.PI, 100);
            return Q(t("Berechne mit dem Satz von Stokes den Fluss von rot v durch die Kreisscheibe x² + y² ≤ " + R * R + ", z = 0 (Normale e<sub>z</sub>), für v = (" + H.lin([[-aa, "y"]]) + ", " + H.lin([[bb, "x"]]) + ", z) (auf 0,01).", "Use Stokes' theorem to compute the flux of curl v through the disc x² + y² ≤ " + R * R + ", z = 0 (normal e<sub>z</sub>), for v = (" + H.lin([[-aa, "y"]]) + ", " + H.lin([[bb, "x"]]) + ", z) (to 0.01)."),
                nm(val, 2), t("Stokes: ∫∫ rot v · n dO = ∮ v · dx längs des Randkreises. Oder direkt: (rot v)<sub>3</sub> ist konstant.", "Stokes: ∫∫ curl v · n dO = ∮ v · dx along the boundary circle. Or directly: (curl v)<sub>3</sub> is constant."), ["(rot v)<sub>3</sub> = " + bb + " " + H.sg(aa) + " = " + (aa + bb), "Φ = " + (aa + bb) + " · π · " + R * R + " = " + n(val, 3)], near(line, val, 1e-7));
        }
        var R3 = r.int(1, 4), h = r.int(1, 5), c3 = r.nz(1, 3), fl3 = 3 * c3 * Math.PI * R3 * R3 * h, mantel = c3 * R3 * 2 * Math.PI * R3 * h, deckel = c3 * h * Math.PI * R3 * R3;
        return Q(t("Berechne den Fluss von v = " + (c3 === 1 ? "" : c3) + "(x, y, z) durch die geschlossene Oberfläche des Zylinders x² + y² ≤ " + R3 * R3 + ", 0 ≤ z ≤ " + h + " nach außen (auf 0,01).", "Compute the outward flux of v = " + (c3 === 1 ? "" : c3) + "(x, y, z) through the closed surface of the cylinder x² + y² ≤ " + R3 * R3 + ", 0 ≤ z ≤ " + h + " (to 0.01)."),
            nm(fl3, 2), t("Gauß: div v = " + 3 * c3 + ", mal das Volumen πR²h.", "Gauss: div v = " + 3 * c3 + ", times the volume πR²h."), ["div v = " + 3 * c3, "V = π · " + R3 * R3 + " · " + h, "Φ = " + n(fl3, 3)], near(mantel + deckel, fl3, 1e-9));
    });
})(typeof window !== "undefined" ? window : globalThis);
