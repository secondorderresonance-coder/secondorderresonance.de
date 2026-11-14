/* SOR Aufgaben für die Grundkurse TM 1, TM 2 und Transformationsmatrizen (K-TM1-*, K-TM2-*, K-TR-*). Format siehe exercise-engine.js */
(function (root) {
    "use strict";
    var E = root.SOR_EX || require("../exercise-engine.js");
    var A = E.A, H = E.H, M = E.M, n = H.n, m = H.m, t = E.tr;
    function Q(q, a, hint, steps, ok) { return { q: q, a: a, hint: hint, steps: steps, ok: !!ok }; }
    var P = function (x, d) { return x < 0 ? "(" + n(x, d) + ")" : n(x, d); };
    var num = function (v, dec, unit, tol) { return A.num(v, { dec: dec, unit: unit || "", tol: tol }); };
    var rel = function (v, p, min) { return Math.max(Math.abs(v) * p, min || 0); };
    var sin = function (deg) { return Math.sin(M.rad(deg)); }, cos = function (deg) { return Math.cos(M.rad(deg)); };
    var cl = function (x) { return Math.abs(x) < 1e-12 ? 0 : x; };

    // ---------- Skizzen ----------
    var INK = "#cdd4e6", Y = "#f5c518", T = "#35e0c4", R = "#e94560";
    function arrowSvg(x1, y1, x2, y2, c, w) {
        var a = Math.atan2(y2 - y1, x2 - x1), h = 9;
        return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + (x2 - Math.cos(a) * h * 0.7).toFixed(1) + '" y2="' + (y2 - Math.sin(a) * h * 0.7).toFixed(1) + '" stroke="' + c + '" stroke-width="' + (w || 2.4) + '"/>' +
            '<path d="M' + x2.toFixed(1) + " " + y2.toFixed(1) + " L" + (x2 - h * Math.cos(a - 0.4)).toFixed(1) + " " + (y2 - h * Math.sin(a - 0.4)).toFixed(1) + " L" + (x2 - h * Math.cos(a + 0.4)).toFixed(1) + " " + (y2 - h * Math.sin(a + 0.4)).toFixed(1) + 'Z" fill="' + c + '"/>';
    }
    function txt(x, y, s, c, anchor) { return '<text x="' + x + '" y="' + y + '" font-size="12" fill="' + (c || INK) + '" text-anchor="' + (anchor || "middle") + '">' + s + "</text>"; }
    function supports(x, y, roller) {
        var s = '<path d="M' + x + " " + y + " l-9 14 h18 z" + '" fill="none" stroke="' + INK + '" stroke-width="1.6"/>';
        return s + (roller ? '<line x1="' + (x - 12) + '" y1="' + (y + 19) + '" x2="' + (x + 12) + '" y2="' + (y + 19) + '" stroke="' + INK + '" stroke-width="1.6"/>' : "");
    }
    function beamFig(l, loads, q) {   // loads: [[a, label]], q: Streckenlast-Text oder null
        var x0 = 30, x1 = 290, X = function (x) { return x0 + (x1 - x0) * x / l; }, s = "";
        if (q) { for (var i = 0; i <= 10; i += 1) s += arrowSvg(X(l * i / 10), 34, X(l * i / 10), 58, T, 1.4); s += '<line x1="' + x0 + '" y1="34" x2="' + x1 + '" y2="34" stroke="' + T + '" stroke-width="1.4"/>' + txt(X(l / 2), 28, q, T); }
        s += '<rect x="' + x0 + '" y="60" width="' + (x1 - x0) + '" height="10" fill="rgba(255,255,255,0.08)" stroke="' + INK + '" stroke-width="1.6"/>';
        loads.forEach(function (ld, k) { s += arrowSvg(X(ld[0]), 18 + k * 4, X(ld[0]), 58, Y, 2.4) + txt(X(ld[0]) + 6, 22 + k * 4, ld[1], Y, "start"); });
        s += supports(x0, 70, false) + supports(x1, 70, true) + txt(x0, 108, "A") + txt(x1, 108, "B");
        s += '<line x1="' + x0 + '" y1="118" x2="' + x1 + '" y2="118" stroke="' + INK + '" stroke-width="1" stroke-dasharray="3 3"/>' + txt((x0 + x1) / 2, 134, "l = " + n(l) + " m");
        return H.fig(s, 320, 142, t("Balken mit Lasten", "Beam with loads"));
    }
    function trussFig(alpha, extraH) {
        var w = 220, h = Math.min(110, w / 2 * Math.tan(M.rad(alpha))), x0 = 50, yb = 135, xa = x0 + w / 2, ya = yb - h, s = "";
        s += '<path d="M' + x0 + " " + yb + " L" + xa + " " + ya.toFixed(1) + " L" + (x0 + w) + " " + yb + ' Z" fill="none" stroke="' + INK + '" stroke-width="2.2"/>';
        s += arrowSvg(xa, ya - 34, xa, ya - 4, Y, 2.4) + txt(xa + 8, ya - 24, "F", Y, "start");
        if (extraH) s += arrowSvg(xa - 40, ya, xa - 6, ya, T, 2.4) + txt(xa - 44, ya - 6, "H", T, "end");
        s += supports(x0, yb, false) + supports(x0 + w, yb, true) + txt(x0 + 34, yb - 6, "α") + txt(x0 + w / 4 - 12, (yb + ya) / 2, "1", INK) + txt(x0 + 3 * w / 4 + 12, (yb + ya) / 2, "2", INK) + txt(xa, yb + 14, "3", INK);
        return H.fig(s, 320, 172, t("Dreiecksfachwerk", "Triangular truss"));
    }

    // ================= TM 1 =================
    E.add({ id: "k-tm1-kraefte", topic: "K-TM1-1", title: t("Kräfte zerlegen und addieren", "Resolving and adding forces"), gen: function (r, d) {
        if (d === 1) {
            var F = r.int(2, 30) * 10, al = r.pick([15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75]), fx = F * cos(al), fy = F * sin(al);
            return Q(t("Eine Kraft F = " + F + " N greift unter α = " + al + "° zur x-Achse an. Berechne die Komponenten F<sub>x</sub> und F<sub>y</sub> (auf 0,1 N).", "A force F = " + F + " N acts at α = " + al + "° to the x-axis. Find the components F<sub>x</sub> and F<sub>y</sub> (to 0.1 N)."),
                A.multi([{ l: "F<sub>x</sub>", a: num(fx, 1, "N", 0.15) }, { l: "F<sub>y</sub>", a: num(fy, 1, "N", 0.15) }]),
                t("Die Ankathete zum Winkel liegt auf der x-Achse: F<sub>x</sub> = F · cos α.", "The side adjacent to the angle lies on the x-axis: F<sub>x</sub> = F · cos α."),
                ["F<sub>x</sub> = " + F + " · cos " + al + "° = " + n(fx, 1) + " N", "F<sub>y</sub> = " + F + " · sin " + al + "° = " + n(fy, 1) + " N"], M.near(Math.hypot(fx, fy), F, 1e-9));
        }
        if (d === 2) {
            var F1 = r.int(2, 20) * 10, F2 = r.int(2, 20) * 10, a2 = r.pick([30, 45, 60, 90, 120, 135, 150]), Rx = F1 + F2 * cos(a2), Ry = F2 * sin(a2), Rm = Math.hypot(Rx, Ry);
            return Q(t("Zwei Kräfte greifen im selben Punkt an: F<sub>1</sub> = " + F1 + " N in x-Richtung und F<sub>2</sub> = " + F2 + " N unter " + a2 + "° zur x-Achse. Wie groß ist die Resultierende R (auf 0,1 N)?", "Two forces act at the same point: F<sub>1</sub> = " + F1 + " N along x and F<sub>2</sub> = " + F2 + " N at " + a2 + "° to the x-axis. How large is the resultant R (to 0.1 N)?"),
                num(Rm, 1, "N", 0.15), t("Zerlege F<sub>2</sub> in Komponenten, addiere komponentenweise und nimm dann Pythagoras.", "Resolve F<sub>2</sub> into components, add component-wise, then use Pythagoras."),
                ["R<sub>x</sub> = " + F1 + " + " + F2 + " · cos " + a2 + "° = " + n(Rx, 2) + " N", "R<sub>y</sub> = " + F2 + " · sin " + a2 + "° = " + n(Ry, 2) + " N", "R = √(R<sub>x</sub><sup>2</sup> + R<sub>y</sub><sup>2</sup>) = " + n(Rm, 1) + " N"],
                M.near(Rm * Rm, F1 * F1 + F2 * F2 + 2 * F1 * F2 * cos(a2), 1e-9));
        }
        var Fs = [r.int(2, 15) * 10, r.int(2, 15) * 10, r.int(2, 15) * 10], As = [0, r.pick([60, 75, 90, 105, 120]), r.pick([200, 225, 240, 270, 300])];
        var sx = 0, sy = 0; Fs.forEach(function (F, i) { sx += F * cos(As[i]); sy += F * sin(As[i]); });
        var Rr = Math.hypot(sx, sy), ph = (M.deg(Math.atan2(sy, sx)) + 360) % 360;
        if (Rr < 5) { sx += 50; Fs[0] += 50; Rr = Math.hypot(sx, sy); ph = (M.deg(Math.atan2(sy, sx)) + 360) % 360; }
        var rot = Fs.reduce(function (acc, F, i) { return acc + F * sin(As[i] - ph); }, 0);
        return Q(t("Drei Kräfte greifen im Ursprung an: " + Fs.map(function (F, i) { return "F<sub>" + (i + 1) + "</sub> = " + F + " N unter " + As[i] + "°"; }).join(", ") + " (Winkel zur positiven x-Achse). Bestimme Betrag R und Richtung φ der Resultierenden (φ zwischen 0° und 360°).", "Three forces act at the origin: " + Fs.map(function (F, i) { return "F<sub>" + (i + 1) + "</sub> = " + F + " N at " + As[i] + "°"; }).join(", ") + " (angles from the positive x-axis). Find the magnitude R and direction φ of the resultant (φ between 0° and 360°)."),
            A.multi([{ l: "R", a: num(Rr, 1, "N", 0.2) }, { l: "φ", a: num(ph, 1, "°", 0.3) }]),
            t("Summiere alle x- und alle y-Komponenten getrennt. Den Winkel liefert atan2(R<sub>y</sub>, R<sub>x</sub>), achte auf den Quadranten.", "Sum all x and all y components separately. The angle is atan2(R<sub>y</sub>, R<sub>x</sub>); watch the quadrant."),
            ["R<sub>x</sub> = Σ F<sub>i</sub> cos α<sub>i</sub> = " + n(sx, 2) + " N", "R<sub>y</sub> = Σ F<sub>i</sub> sin α<sub>i</sub> = " + n(sy, 2) + " N", "R = " + n(Rr, 1) + " N, φ = " + n(ph, 1) + "°"], Math.abs(rot) < 1e-6);
    } });

    E.add({ id: "k-tm1-moment", topic: "K-TM1-2", title: t("Gleichgewicht und Moment", "Equilibrium and moments"), gen: function (r, d) {
        if (d === 1) {
            var F = r.int(1, 50) * 10, a = r.int(2, 30) / 10, Mo = F * a;
            return Q(t("Eine Kraft F = " + F + " N wirkt senkrecht auf einen Schraubenschlüssel im Abstand a = " + n(a) + " m von der Schraube. Wie groß ist das Moment?", "A force F = " + F + " N acts perpendicular to a wrench at a distance a = " + n(a) + " m from the bolt. How large is the moment?"),
                num(Mo, 1, "N·m"), t("Moment = Kraft mal senkrechter Hebelarm.", "Moment = force times perpendicular lever arm."), ["M = F · a = " + F + " · " + n(a) + " = " + n(Mo, 1) + " N·m"], M.near(Mo / a, F));
        }
        if (d === 2) {
            var F1 = r.int(2, 40) * 10, a1 = r.int(2, 20) / 10, a2 = r.int(2, 30) / 10, F2 = F1 * a1 / a2;
            return Q(t("An einem Hebel hängt links F<sub>1</sub> = " + F1 + " N im Abstand " + n(a1) + " m vom Drehpunkt. Welche Kraft F<sub>2</sub> muss rechts im Abstand " + n(a2) + " m senkrecht wirken, damit Gleichgewicht herrscht (auf 0,1 N)?", "A lever carries F<sub>1</sub> = " + F1 + " N on the left at " + n(a1) + " m from the pivot. Which force F<sub>2</sub> must act perpendicular on the right at " + n(a2) + " m for equilibrium (to 0.1 N)?"),
                num(F2, 1, "N", 0.06), t("Momentengleichgewicht um den Drehpunkt: linksdrehend gleich rechtsdrehend.", "Moment balance about the pivot: anticlockwise equals clockwise."),
                ["ΣM = 0: F<sub>1</sub> · a<sub>1</sub> = F<sub>2</sub> · a<sub>2</sub>", "F<sub>2</sub> = " + F1 + " · " + n(a1) + " / " + n(a2) + " = " + n(F2, 1) + " N"], Math.abs(F1 * a1 - F2 * a2) < 1e-9);
        }
        var Fc = r.int(2, 40) * 10, ac = r.int(3, 25) / 10, al = r.pick([20, 30, 40, 45, 50, 60, 70, 80, 110, 120, 135, 150]), Mc = Fc * ac * sin(al);
        var cross = ac * Fc * sin(al) - 0 * Fc * cos(al);   // r = (a, 0), F = F(cos α, sin α)
        return Q(t("Eine Kraft F = " + Fc + " N greift am Ende eines " + n(ac) + " m langen Hebels an, schräg unter " + al + "° zur Hebelachse. Wie groß ist das Moment um den Drehpunkt (auf 0,1 N·m)?", "A force F = " + Fc + " N acts at the end of a lever " + n(ac) + " m long, at " + al + "° to the lever axis. How large is the moment about the pivot (to 0.1 N·m)?"),
            num(Mc, 1, "N·m", 0.12), t("Nur die Komponente senkrecht zum Hebel erzeugt ein Moment: F · sin α.", "Only the component perpendicular to the lever produces a moment: F · sin α."),
            ["F<sub>⊥</sub> = " + Fc + " · sin " + al + "° = " + n(Fc * sin(al), 2) + " N", "M = F<sub>⊥</sub> · a = " + n(Mc, 1) + " N·m"], M.near(cross, Mc));
    } });

    E.add({ id: "k-tm1-lager", topic: "K-TM1-3", title: t("Lagerreaktionen am Balken", "Support reactions of a beam"), gen: function (r, d) {
        if (d === 1) {
            var l = r.int(3, 10), a = r.int(1, l * 2 - 1) / 2, F = r.int(2, 30), A1 = F * (l - a) / l, B1 = F * a / l;
            return Q(t("Ein Balken der Länge l = " + l + " m liegt links auf einem Festlager A und rechts auf einem Loslager B. Im Abstand a = " + n(a) + " m von A wirkt F = " + F + " kN senkrecht nach unten. Berechne die Lagerkräfte A und B.", "A beam of length l = " + l + " m rests on a pin A on the left and a roller B on the right. At a = " + n(a) + " m from A a force F = " + F + " kN acts vertically downwards. Find the support forces A and B.") + beamFig(l, [[a, "F"]]),
                A.multi([{ l: "A", a: num(A1, 2, "kN", 0.011) }, { l: "B", a: num(B1, 2, "kN", 0.011) }]),
                t("Momentengleichgewicht um A liefert direkt B. Danach ΣF<sub>y</sub> = 0 für A.", "Taking moments about A gives B directly. Then ΣF<sub>y</sub> = 0 gives A."),
                ["ΣM<sub>A</sub> = 0: B · " + l + " − " + F + " · " + n(a) + " = 0 → B = " + n(B1, 2) + " kN", "ΣF<sub>y</sub> = 0: A = " + F + " − " + n(B1, 2) + " = " + n(A1, 2) + " kN"], M.near(A1 * l, F * (l - a)) && M.near(A1 + B1, F));
        }
        if (d === 2) {
            var l2 = r.int(4, 12), a1 = r.int(1, l2 - 2), a2 = r.int(a1 + 1, l2 - 1), F1 = r.int(2, 20), F2 = r.int(2, 20), B2 = (F1 * a1 + F2 * a2) / l2, A2 = F1 + F2 - B2;
            return Q(t("Einfeldträger, l = " + l2 + " m, Festlager A links, Loslager B rechts. Lasten: F<sub>1</sub> = " + F1 + " kN bei " + a1 + " m und F<sub>2</sub> = " + F2 + " kN bei " + a2 + " m (gemessen von A). Bestimme A und B.", "Simply supported beam, l = " + l2 + " m, pin A on the left, roller B on the right. Loads: F<sub>1</sub> = " + F1 + " kN at " + a1 + " m and F<sub>2</sub> = " + F2 + " kN at " + a2 + " m (measured from A). Find A and B.") + beamFig(l2, [[a1, "F₁"], [a2, "F₂"]]),
                A.multi([{ l: "A", a: num(A2, 2, "kN", 0.011) }, { l: "B", a: num(B2, 2, "kN", 0.011) }]),
                t("Momente um A: jede Last mal ihrem Abstand zu A.", "Moments about A: each load times its distance from A."),
                ["ΣM<sub>A</sub> = 0: B · " + l2 + " = " + F1 + " · " + a1 + " + " + F2 + " · " + a2 + " → B = " + n(B2, 2) + " kN", "A = " + F1 + " + " + F2 + " − B = " + n(A2, 2) + " kN"],
                M.near(A2 * l2, F1 * (l2 - a1) + F2 * (l2 - a2)));
        }
        var l3 = r.int(2, 6), q = r.int(1, 10), F3 = r.int(0, 15), V = q * l3 + F3, Me = q * l3 * l3 / 2 + F3 * l3;
        return Q(t("Ein Kragarm der Länge l = " + l3 + " m ist links fest eingespannt. Er trägt eine Streckenlast q = " + q + " kN/m über die ganze Länge" + (F3 ? " und am freien Ende F = " + F3 + " kN" : "") + ". Berechne die vertikale Einspannkraft V und das Einspannmoment M<sub>E</sub> (Betrag).", "A cantilever of length l = " + l3 + " m is fixed on the left. It carries a uniform load q = " + q + " kN/m over the whole length" + (F3 ? " and F = " + F3 + " kN at the free end" : "") + ". Find the vertical reaction V and the magnitude of the fixed-end moment M<sub>E</sub>."),
            A.multi([{ l: "V", a: num(V, 2, "kN", 0.011) }, { l: "M<sub>E</sub>", a: num(Me, 2, "kN·m", 0.011) }]),
            t("Ersetze die Streckenlast durch ihre Resultierende q · l in der Mitte des Arms.", "Replace the distributed load by its resultant q · l at the middle of the arm."),
            ["V = q · l" + (F3 ? " + F" : "") + " = " + n(V, 2) + " kN", "M<sub>E</sub> = q · l · l/2" + (F3 ? " + F · l" : "") + " = " + n(Me, 2) + " kN·m"],
            M.near(M.simpson(function (x) { return q * x; }, 0, l3) + F3 * l3, Me, 1e-6));
    } });

    E.add({ id: "k-tm1-fachwerk", topic: "K-TM1-4", title: t("Fachwerke", "Trusses"), gen: function (r, d) {
        var sgn = t("Zug positiv, Druck negativ", "tension positive, compression negative");
        if (d === 1) {
            var al = r.pick([30, 35, 40, 45, 50, 55, 60]), F = r.int(2, 40), S1 = -F / (2 * sin(al)), S3 = F / (2 * Math.tan(M.rad(al)));
            return Q(t("Das symmetrische Dreiecksfachwerk trägt an der Spitze F = " + F + " kN. Die schrägen Stäbe 1 und 2 sind um α = " + al + "° geneigt. Bestimme die Stabkräfte S<sub>1</sub> (schräg) und S<sub>3</sub> (unten), " + sgn + ".", "The symmetric triangular truss carries F = " + F + " kN at the apex. The inclined members 1 and 2 are at α = " + al + "°. Find the member forces S<sub>1</sub> (inclined) and S<sub>3</sub> (bottom), " + sgn + ".") + trussFig(al),
                A.multi([{ l: "S<sub>1</sub>", a: num(S1, 2, "kN", 0.011) }, { l: "S<sub>3</sub>", a: num(S3, 2, "kN", 0.011) }]),
                t("Knoten an der Spitze: die vertikalen Komponenten beider Schrägstäbe tragen F je zur Hälfte. Danach Knoten am Auflager.", "Apex joint: the vertical components of the two inclined members each carry half of F. Then the support joint."),
                [t("Spitze", "Apex") + ": 2 · S<sub>1</sub> · sin α + F = 0 → S<sub>1</sub> = " + n(S1, 2) + " kN (" + t("Druck", "compression") + ")", t("Lagerknoten", "Support joint") + ": S<sub>3</sub> + S<sub>1</sub> · cos α = 0 → S<sub>3</sub> = " + n(S3, 2) + " kN (" + t("Zug", "tension") + ")"],
                M.near(S1 * sin(al) + F / 2, 0, 1e-9) && M.near(S3 + S1 * cos(al), 0, 1e-9));
        }
        if (d === 2) {
            var b = r.pick([25, 30, 35, 40, 45, 50, 55, 60]), Fb = r.int(2, 30), Sd = -Fb / sin(b), Sh = Fb / Math.tan(M.rad(b));
            return Q(t("Eine Wandkonsole besteht aus einem waagrechten Stab oben und einer Strebe darunter, die unter β = " + b + "° zur Waagrechten von der Wand zur Spitze läuft. An der Spitze hängt F = " + Fb + " kN. Bestimme die Kräfte im waagrechten Stab S<sub>h</sub> und in der Strebe S<sub>d</sub>, " + sgn + ".", "A wall bracket has a horizontal member on top and a strut below it, running from the wall to the tip at β = " + b + "° to the horizontal. A load F = " + Fb + " kN hangs at the tip. Find the forces in the horizontal member S<sub>h</sub> and in the strut S<sub>d</sub>, " + sgn + "."),
                A.multi([{ l: "S<sub>h</sub>", a: num(Sh, 2, "kN", 0.011) }, { l: "S<sub>d</sub>", a: num(Sd, 2, "kN", 0.011) }]),
                t("Knoten an der Spitze: nur die Strebe hat eine vertikale Komponente, sie muss F allein tragen.", "Tip joint: only the strut has a vertical component, so it must carry F alone."),
                ["ΣF<sub>y</sub> = 0: −S<sub>d</sub> · sin β − F = 0 → S<sub>d</sub> = " + n(Sd, 2) + " kN (" + t("Druck", "compression") + ")", "ΣF<sub>x</sub> = 0: −S<sub>h</sub> − S<sub>d</sub> · cos β = 0 → S<sub>h</sub> = " + n(Sh, 2) + " kN (" + t("Zug", "tension") + ")"],
                M.near(-Sd * sin(b), Fb, 1e-9) && M.near(Sh, -Sd * cos(b), 1e-9));
        }
        var a3 = r.pick([30, 40, 45, 50, 60]), F3 = r.int(4, 30), Hh = r.int(1, 12), S1c = (-F3 / sin(a3) + Hh / cos(a3)) / 2, S2c = (-F3 / sin(a3) - Hh / cos(a3)) / 2;
        var rx = -S1c * cos(a3) + S2c * cos(a3) + Hh, ry = -S1c * sin(a3) - S2c * sin(a3) - F3;
        return Q(t("Am Dreiecksfachwerk (α = " + a3 + "°) greifen an der Spitze F = " + F3 + " kN nach unten und H = " + Hh + " kN nach rechts an. Bestimme die Kräfte in den Schrägstäben S<sub>1</sub> (links) und S<sub>2</sub> (rechts), " + sgn + ".", "At the apex of the triangular truss (α = " + a3 + "°) act F = " + F3 + " kN downwards and H = " + Hh + " kN to the right. Find the forces in the inclined members S<sub>1</sub> (left) and S<sub>2</sub> (right), " + sgn + ".") + trussFig(a3, true),
            A.multi([{ l: "S<sub>1</sub>", a: num(S1c, 2, "kN", 0.011) }, { l: "S<sub>2</sub>", a: num(S2c, 2, "kN", 0.011) }]),
            t("Zwei Gleichungen am Knoten der Spitze, zwei Unbekannte. Stabkräfte zeigen bei Zug vom Knoten weg.", "Two equations at the apex joint, two unknowns. Tension forces point away from the joint."),
            ["ΣF<sub>x</sub> = 0: −S<sub>1</sub> cos α + S<sub>2</sub> cos α + H = 0", "ΣF<sub>y</sub> = 0: −S<sub>1</sub> sin α − S<sub>2</sub> sin α − F = 0", "S<sub>1</sub> = " + n(S1c, 2) + " kN, S<sub>2</sub> = " + n(S2c, 2) + " kN"],
            Math.abs(rx) < 1e-9 && Math.abs(ry) < 1e-9);
    } });

    E.add({ id: "k-tm1-schnitt", topic: "K-TM1-5", title: t("Querkraft- und Momentenverlauf", "Shear force and bending moment"), gen: function (r, d) {
        if (d === 1) {
            var l = r.int(3, 10), a = r.int(1, l * 2 - 1) / 2, F = r.int(2, 30), Mm = F * a * (l - a) / l;
            return Q(t("Einfeldträger, l = " + l + " m, Einzellast F = " + F + " kN im Abstand a = " + n(a) + " m vom linken Lager. Wie groß ist das maximale Biegemoment?", "Simply supported beam, l = " + l + " m, point load F = " + F + " kN at a = " + n(a) + " m from the left support. How large is the maximum bending moment?") + beamFig(l, [[a, "F"]]),
                num(Mm, 2, "kN·m", 0.011), t("Das Maximum liegt unter der Last. Dort ist M = A · a.", "The maximum is under the load. There M = A · a."),
                ["A = F · (l − a) / l = " + n(F * (l - a) / l, 3) + " kN", "M<sub>max</sub> = A · a = F · a · b / l = " + n(Mm, 2) + " kN·m"], M.near(F * a / l * (l - a), Mm));
        }
        if (d === 2) {
            var l2 = r.int(2, 12), q = r.int(1, 15), Aq = q * l2 / 2, Mq = q * l2 * l2 / 8, num2 = M.simpson(function (x) { return Aq - q * x; }, 0, l2 / 2);
            return Q(t("Einfeldträger, l = " + l2 + " m, gleichmäßige Streckenlast q = " + q + " kN/m. Bestimme die Lagerkraft A und das maximale Biegemoment M<sub>max</sub>.", "Simply supported beam, l = " + l2 + " m, uniform load q = " + q + " kN/m. Find the support force A and the maximum bending moment M<sub>max</sub>.") + beamFig(l2, [], "q = " + q + " kN/m"),
                A.multi([{ l: "A", a: num(Aq, 2, "kN", 0.011) }, { l: "M<sub>max</sub>", a: num(Mq, 2, "kN·m", 0.011) }]),
                t("Aus Symmetrie trägt jedes Lager die Hälfte. Q wird in der Mitte null, dort ist M maximal.", "By symmetry each support carries half. Q is zero at midspan, where M is largest."),
                ["A = q · l / 2 = " + n(Aq, 2) + " kN", "M<sub>max</sub> = q · l<sup>2</sup> / 8 = " + n(Mq, 2) + " kN·m"], M.near(num2, Mq, 1e-6));
        }
        var l3 = r.int(4, 12), a3 = r.int(1, l3 - 1), F3 = r.int(2, 30), A3 = F3 * (l3 - a3) / l3, B3 = F3 * a3 / l3, x = r.int(1, l3 * 2 - 1) / 2;
        if (x === a3) x = a3 + 0.5 < l3 ? a3 + 0.5 : a3 - 0.5;
        var left = x < a3, Mx = left ? A3 * x : B3 * (l3 - x), Qx = left ? A3 : -B3;
        var Mright = left ? B3 * (l3 - x) - F3 * (a3 - x) : B3 * (l3 - x);
        return Q(t("Einfeldträger, l = " + l3 + " m, F = " + F3 + " kN bei a = " + a3 + " m. Bestimme Querkraft Q und Biegemoment M an der Stelle x = " + n(x) + " m (Vorzeichenkonvention: Q positiv, wenn links vom Schnitt nach oben).", "Simply supported beam, l = " + l3 + " m, F = " + F3 + " kN at a = " + a3 + " m. Find the shear force Q and the bending moment M at x = " + n(x) + " m (sign convention: Q positive when acting upwards on the left part).") + beamFig(l3, [[a3, "F"]]),
            A.multi([{ l: "Q", a: num(Qx, 2, "kN", 0.011) }, { l: "M", a: num(Mx, 2, "kN·m", 0.011) }]),
            t("Schneide bei x und betrachte das linke Teilstück: es trägt die Lagerkraft A" + (left ? "" : " und die Last F") + ".", "Cut at x and look at the left part: it carries the support force A" + (left ? "" : " and the load F") + "."),
            ["A = " + n(A3, 3) + " kN, B = " + n(B3, 3) + " kN", "Q(x) = " + (left ? "A" : "A − F") + " = " + n(Qx, 2) + " kN", "M(x) = " + (left ? "A · x" : "A · x − F · (x − a)") + " = " + n(Mx, 2) + " kN·m"],
            M.near(Mx, Mright, 1e-9) && M.near(left ? A3 * x : A3 * x - F3 * (x - a3), Mx, 1e-9));
    } });

    E.add({ id: "k-tm1-schwerpunkt", topic: "K-TM1-6", title: t("Schwerpunkt", "Centroid"), gen: function (r, d) {
        if (d < 3) {
            var w1 = r.int(2, 8), h1 = r.int(1, 6), w2 = r.int(1, 6), h2 = r.int(2, 10), A1 = w1 * h1, A2 = w2 * h2;
            var xs = (A1 * w1 / 2 + A2 * (w1 + w2 / 2)) / (A1 + A2), ys = (A1 * h1 / 2 + A2 * h2 / 2) / (A1 + A2);
            var sc = 220 / Math.max(w1 + w2, 1) / 1.25, fig = H.fig('<rect x="30" y="' + (150 - h1 * sc * 0.6) + '" width="' + (w1 * sc) + '" height="' + (h1 * sc * 0.6) + '" fill="rgba(245,197,24,0.25)" stroke="#f5c518"/><rect x="' + (30 + w1 * sc) + '" y="' + (150 - h2 * sc * 0.6) + '" width="' + (w2 * sc) + '" height="' + (h2 * sc * 0.6) + '" fill="rgba(53,224,196,0.25)" stroke="#35e0c4"/>' + txt(30 + w1 * sc / 2, 145, "1") + txt(30 + w1 * sc + w2 * sc / 2, 145, "2") + '<line x1="20" y1="150" x2="300" y2="150" stroke="#98a2bd"/><line x1="30" y1="160" x2="30" y2="10" stroke="#98a2bd"/>' + txt(300, 164, "x") + txt(20, 16, "y"), 320, 170, t("Zwei Rechtecke", "Two rectangles"));
            var qt = t("Zwei Rechtecke liegen nebeneinander auf der x-Achse: Rechteck 1 ist " + w1 + " cm breit und " + h1 + " cm hoch und beginnt bei x = 0, Rechteck 2 ist " + w2 + " cm breit und " + h2 + " cm hoch und schließt rechts an. ", "Two rectangles sit side by side on the x-axis: rectangle 1 is " + w1 + " cm wide and " + h1 + " cm high and starts at x = 0, rectangle 2 is " + w2 + " cm wide and " + h2 + " cm high and joins on the right. ");
            var steps = ["A<sub>1</sub> = " + A1 + " cm², x<sub>1</sub> = " + n(w1 / 2) + " cm, y<sub>1</sub> = " + n(h1 / 2) + " cm", "A<sub>2</sub> = " + A2 + " cm², x<sub>2</sub> = " + n(w1 + w2 / 2) + " cm, y<sub>2</sub> = " + n(h2 / 2) + " cm", "x<sub>S</sub> = " + n(xs, 3) + " cm" + (d === 2 ? ", y<sub>S</sub> = " + n(ys, 3) + " cm" : "")];
            var okc = M.near(A1 * (w1 / 2 - xs) + A2 * (w1 + w2 / 2 - xs), 0, 1e-9) && M.near(A1 * (h1 / 2 - ys) + A2 * (h2 / 2 - ys), 0, 1e-9);
            if (d === 1) return Q(qt + t("Wo liegt der Schwerpunkt in x-Richtung (auf 0,01 cm)?", "Where is the centroid in the x-direction (to 0.01 cm)?") + fig, num(xs, 2, "cm", 0.006), t("Gewichte jeden Teilschwerpunkt mit seiner Fläche.", "Weight each partial centroid by its area."), steps, okc);
            return Q(qt + t("Bestimme beide Schwerpunktkoordinaten (auf 0,01 cm).", "Find both centroid coordinates (to 0.01 cm).") + fig, A.multi([{ l: "x<sub>S</sub>", a: num(xs, 2, "cm", 0.006) }, { l: "y<sub>S</sub>", a: num(ys, 2, "cm", 0.006) }]), t("Gewichte jeden Teilschwerpunkt mit seiner Fläche, getrennt für x und y.", "Weight each partial centroid by its area, separately for x and y."), steps, okc);
        }
        var w = r.int(8, 20), h = r.int(6, 14), rr = r.int(1, Math.floor(Math.min(w, h) / 4)), cx = r.int(rr + 1, w - rr - 1), Ar = w * h, Ah = Math.PI * rr * rr, xs3 = (Ar * w / 2 - Ah * cx) / (Ar - Ah);
        return Q(t("Eine rechteckige Platte (" + w + " cm × " + h + " cm, linke untere Ecke im Ursprung) hat ein kreisrundes Loch mit Radius " + rr + " cm, dessen Mittelpunkt bei x = " + cx + " cm liegt. Wo liegt der Schwerpunkt in x-Richtung (auf 0,01 cm)?", "A rectangular plate (" + w + " cm × " + h + " cm, lower left corner at the origin) has a circular hole of radius " + rr + " cm centred at x = " + cx + " cm. Where is the centroid in the x-direction (to 0.01 cm)?"),
            num(xs3, 2, "cm", 0.006), t("Das Loch zählt mit negativer Fläche.", "The hole counts with negative area."),
            ["A<sub>R</sub> = " + Ar + " cm², x<sub>R</sub> = " + n(w / 2) + " cm", "A<sub>L</sub> = −π · " + rr + "² = " + n(-Ah, 3) + " cm², x<sub>L</sub> = " + cx + " cm", "x<sub>S</sub> = (" + Ar + " · " + n(w / 2) + " − " + n(Ah, 3) + " · " + cx + ") / (" + Ar + " − " + n(Ah, 3) + ") = " + n(xs3, 2) + " cm"],
            M.near(Ar * (w / 2 - xs3) - Ah * (cx - xs3), 0, 1e-9));
    } });

    // ================= TM 2 =================
    var MAT = function () { return [[t("Stahl", "steel"), 210, 12e-6], [t("Aluminium", "aluminium"), 70, 23e-6], [t("Kupfer", "copper"), 120, 17e-6], [t("Titan", "titanium"), 110, 8.6e-6]]; };

    E.add({ id: "k-tm2-hooke", topic: "K-TM2-1", title: t("Spannung, Dehnung, Hooke", "Stress, strain, Hooke"), gen: function (r, d) {
        if (d === 1) {
            var F = r.int(5, 200), Am = r.int(5, 80) * 10, s = F * 1000 / Am;
            return Q(t("Ein Zugstab mit Querschnitt A = " + Am + " mm² wird mit F = " + F + " kN belastet. Wie groß ist die Normalspannung σ (in N/mm² = MPa)?", "A bar with cross-section A = " + Am + " mm² carries a tensile force F = " + F + " kN. What is the normal stress σ (in N/mm² = MPa)?"),
                num(s, 1, "MPa", 0.06), t("Rechne kN in N um: 1 kN = 1000 N.", "Convert kN to N: 1 kN = 1000 N."), ["σ = F / A = " + (F * 1000) + " N / " + Am + " mm² = " + n(s, 1) + " MPa"], M.near(s * Am, F * 1000));
        }
        if (d === 2) {
            var mat = r.pick(MAT()), F2 = r.int(5, 100), l = r.int(5, 40) / 10, A2 = r.int(5, 60) * 10, dl = F2 * 1000 * l * 1000 / (mat[1] * 1000 * A2);
            return Q(t("Ein " + l.toString().replace(".", ",") + " m langer Stab aus " + mat[0] + " (E = " + mat[1] + " GPa) mit A = " + A2 + " mm² wird mit F = " + F2 + " kN gezogen. Um wie viel mm verlängert er sich (auf 0,001 mm)?", "A " + l + " m long " + mat[0] + " bar (E = " + mat[1] + " GPa) with A = " + A2 + " mm² is pulled with F = " + F2 + " kN. By how many mm does it lengthen (to 0.001 mm)?"),
                num(dl, 3, "mm", rel(dl, 0.002, 0.0011)), t("Alles in N und mm: E = " + mat[1] + " GPa = " + (mat[1] * 1000) + " N/mm².", "Use N and mm throughout: E = " + mat[1] + " GPa = " + (mat[1] * 1000) + " N/mm²."),
                ["Δl = F · l / (E · A) = " + (F2 * 1000) + " · " + (l * 1000) + " / (" + (mat[1] * 1000) + " · " + A2 + ")", "Δl = " + n(dl, 3) + " mm"], M.near((F2 * 1000 / A2) / (mat[1] * 1000) * l * 1000, dl, 1e-9));
        }
        var F3 = r.int(10, 300), sz = r.pick([80, 100, 120, 140, 160, 200, 235]), dmin = Math.sqrt(4 * F3 * 1000 / (Math.PI * sz));
        return Q(t("Ein runder Zugstab soll F = " + F3 + " kN übertragen. Die zulässige Spannung ist σ<sub>zul</sub> = " + sz + " MPa. Welcher Mindestdurchmesser d ist nötig (auf 0,01 mm)?", "A round tie rod must carry F = " + F3 + " kN. The allowable stress is σ<sub>allow</sub> = " + sz + " MPa. What minimum diameter d is needed (to 0.01 mm)?"),
            num(dmin, 2, "mm", 0.011), t("Stelle σ = F / A nach A um und nutze A = π · d² / 4.", "Rearrange σ = F / A for A and use A = π · d² / 4."),
            ["A<sub>min</sub> = F / " + t("σ<sub>zul</sub>", "σ<sub>allow</sub>") + " = " + n(F3 * 1000 / sz, 2) + " mm²", "d = √(4 · A / π) = " + n(dmin, 2) + " mm"], M.near(F3 * 1000 / (Math.PI * dmin * dmin / 4), sz, 1e-9));
    } });

    E.add({ id: "k-tm2-temperatur", topic: "K-TM2-2", title: t("Temperatureinfluss", "Thermal effects"), gen: function (r, d) {
        var mat = r.pick(MAT()), al = mat[2], aTxt = n(al * 1e6, 1) + " · 10<sup>−6</sup> 1/K";
        if (d === 1) {
            var l = r.int(1, 40), dT = r.int(2, 16) * 5, dl = al * dT * l * 1000;
            return Q(t("Eine " + l + " m lange Schiene aus " + mat[0] + " (α = " + aTxt + ") erwärmt sich um ΔT = " + dT + " K. Um wie viel mm dehnt sie sich frei aus (auf 0,01 mm)?", "A " + l + " m long " + mat[0] + " rail (α = " + aTxt + ") warms up by ΔT = " + dT + " K. How many mm does it expand freely (to 0.01 mm)?"),
                num(dl, 2, "mm", 0.006), t("Δl = α · ΔT · l, die Länge in mm einsetzen.", "Δl = α · ΔT · l, with the length in mm."), ["Δl = " + aTxt + " · " + dT + " K · " + (l * 1000) + " mm = " + n(dl, 2) + " mm"], M.near(dl / (l * 1000) / dT, al, 1e-9));
        }
        if (d === 2) {
            var dT2 = r.int(2, 16) * 5, sg = -mat[1] * 1000 * al * dT2;
            return Q(t("Ein Stab aus " + mat[0] + " (E = " + mat[1] + " GPa, α = " + aTxt + ") ist zwischen zwei starren Wänden spannungsfrei eingebaut und wird um ΔT = " + dT2 + " K erwärmt. Welche Spannung entsteht (Druck negativ, auf 0,1 MPa)?", "A " + mat[0] + " bar (E = " + mat[1] + " GPa, α = " + aTxt + ") is fitted stress-free between two rigid walls and heated by ΔT = " + dT2 + " K. What stress develops (compression negative, to 0.1 MPa)?"),
                num(sg, 1, "MPa", 0.06), t("Die Wände verhindern jede Dehnung: die elastische Dehnung muss die Wärmedehnung genau aufheben.", "The walls prevent any extension: the elastic strain must cancel the thermal strain exactly."),
                ["ε<sub>th</sub> = α · ΔT = " + n(al * dT2 * 1e3, 4) + " · 10<sup>−3</sup>", "σ = −E · ε<sub>th</sub> = " + n(sg, 1) + " MPa"], M.near(sg / (mat[1] * 1000) + al * dT2, 0, 1e-12));
        }
        var l3 = r.int(2, 20), dT3 = r.int(6, 20) * 5, free = al * dT3 * l3 * 1000, gap = M.round(free * r.int(2, 7) / 10, 2), sg3 = -mat[1] * 1000 * (free - gap) / (l3 * 1000);
        return Q(t("Ein " + l3 + " m langer Stab aus " + mat[0] + " (E = " + mat[1] + " GPa, α = " + aTxt + ") hat vor der Wand einen Spalt von s = " + n(gap, 2) + " mm. Er wird um ΔT = " + dT3 + " K erwärmt. Welche Spannung entsteht, nachdem der Spalt geschlossen ist (Druck negativ, auf 0,1 MPa)?", "A " + l3 + " m long " + mat[0] + " bar (E = " + mat[1] + " GPa, α = " + aTxt + ") has a gap s = " + n(gap, 2) + " mm before the wall. It is heated by ΔT = " + dT3 + " K. What stress develops once the gap has closed (compression negative, to 0.1 MPa)?"),
            num(sg3, 1, "MPa", 0.06), t("Nur der Teil der freien Wärmedehnung, der über den Spalt hinausgeht, wird behindert.", "Only the part of the free thermal expansion beyond the gap is restrained."),
            [t("freie Dehnung", "free expansion") + ": Δl = " + n(free, 3) + " mm", t("behindert", "restrained") + ": " + n(free, 3) + " − " + n(gap, 2) + " = " + n(free - gap, 3) + " mm", "σ = −E · (Δl − s) / l = " + n(sg3, 1) + " MPa"], free > gap && M.near(sg3 * l3 * 1000 / (mat[1] * 1000), -(free - gap), 1e-9));
    } });

    E.add({ id: "k-tm2-traegheit", topic: "K-TM2-3", title: t("Flächenträgheitsmoment", "Second moment of area"), gen: function (r, d) {
        if (d === 1) {
            var b = r.int(2, 12), h = r.int(4, 24), I = b * h * h * h / 12;
            return Q(t("Berechne das Flächenträgheitsmoment I<sub>y</sub> eines Rechteckquerschnitts mit b = " + b + " cm und h = " + h + " cm für Biegung um die waagrechte Schwerachse (auf 0,1 cm⁴).", "Find the second moment of area I<sub>y</sub> of a rectangular section with b = " + b + " cm and h = " + h + " cm for bending about the horizontal centroidal axis (to 0.1 cm⁴)."),
                num(I, 1, "cm⁴", 0.06), t("Die Höhe h steht senkrecht zur Biegeachse und geht hoch drei ein.", "The height h is perpendicular to the bending axis and enters cubed."), ["I = b · h<sup>3</sup> / 12 = " + b + " · " + h + "<sup>3</sup> / 12 = " + n(I, 1) + " cm⁴"],
                M.near(M.simpson(function (z) { return b * z * z; }, -h / 2, h / 2), I, 1e-9));
        }
        if (d === 2) {
            var D = r.int(4, 20), di = r.int(2, D - 1), I2 = Math.PI * (Math.pow(D, 4) - Math.pow(di, 4)) / 64;
            return Q(t("Ein Rohr hat den Außendurchmesser D = " + D + " cm und den Innendurchmesser d = " + di + " cm. Wie groß ist sein Flächenträgheitsmoment (auf 0,01 cm⁴)?", "A tube has outer diameter D = " + D + " cm and inner diameter d = " + di + " cm. What is its second moment of area (to 0.01 cm⁴)?"),
                num(I2, 2, "cm⁴", rel(I2, 0.0005, 0.006)), t("Vollkreis außen minus Vollkreis innen.", "Outer solid circle minus inner solid circle."), ["I = π · (D<sup>4</sup> − d<sup>4</sup>) / 64 = π · (" + Math.pow(D, 4) + " − " + Math.pow(di, 4) + ") / 64 = " + n(I2, 2) + " cm⁴"],
                M.near(M.simpson(function (z) { return z * z * 2 * (Math.sqrt(Math.max(0, D * D / 4 - z * z)) - (Math.abs(z) < di / 2 ? Math.sqrt(di * di / 4 - z * z) : 0)); }, -D / 2, D / 2, 20000), I2, 2e-3));
        }
        var bf = r.int(6, 16), tf = r.int(1, 2), tw = r.int(1, 2), hh = r.int(10, 30) + 2 * tf, I3 = (bf * Math.pow(hh, 3) - (bf - tw) * Math.pow(hh - 2 * tf, 3)) / 12;
        var steiner = 2 * (bf * Math.pow(tf, 3) / 12 + bf * tf * Math.pow((hh - tf) / 2, 2)) + tw * Math.pow(hh - 2 * tf, 3) / 12;
        return Q(t("Ein symmetrischer I-Querschnitt hat die Höhe h = " + hh + " cm, Flanschbreite b = " + bf + " cm, Flanschdicke t<sub>f</sub> = " + tf + " cm und Stegdicke t<sub>w</sub> = " + tw + " cm. Wie groß ist I<sub>y</sub> um die waagrechte Schwerachse (auf 0,1 cm⁴)?", "A symmetric I-section has height h = " + hh + " cm, flange width b = " + bf + " cm, flange thickness t<sub>f</sub> = " + tf + " cm and web thickness t<sub>w</sub> = " + tw + " cm. What is I<sub>y</sub> about the horizontal centroidal axis (to 0.1 cm⁴)?"),
            num(I3, 1, "cm⁴", 0.06), t("Schneller Weg: umschreibendes Rechteck minus die zwei leeren Rechtecke neben dem Steg. Oder Steiner für die Flansche.", "Quick way: enclosing rectangle minus the two empty rectangles beside the web. Or use the parallel axis theorem for the flanges."),
            ["I = [b · h<sup>3</sup> − (b − t<sub>w</sub>) · (h − 2t<sub>f</sub>)<sup>3</sup>] / 12", "I = [" + bf + " · " + hh + "<sup>3</sup> − " + (bf - tw) + " · " + (hh - 2 * tf) + "<sup>3</sup>] / 12 = " + n(I3, 1) + " cm⁴"], M.near(steiner, I3, 1e-9));
    } });

    E.add({ id: "k-tm2-biegespannung", topic: "K-TM2-4", title: t("Biegespannung", "Bending stress"), gen: function (r, d) {
        if (d === 1) {
            var b = r.int(2, 12) * 10, h = r.int(4, 30) * 10, Mo = r.int(1, 60), W = b * h * h / 6, s = Mo * 1e6 / W;
            return Q(t("Ein Rechteckbalken (b = " + b + " mm, h = " + h + " mm) wird mit M = " + Mo + " kN·m gebogen. Wie groß ist die maximale Biegespannung (auf 0,1 MPa)?", "A rectangular beam (b = " + b + " mm, h = " + h + " mm) is bent with M = " + Mo + " kN·m. What is the maximum bending stress (to 0.1 MPa)?"),
                num(s, 1, "MPa", 0.06), t("Widerstandsmoment des Rechtecks: W = b · h² / 6. M in N·mm umrechnen.", "Section modulus of a rectangle: W = b · h² / 6. Convert M to N·mm."),
                ["W = " + b + " · " + h + "² / 6 = " + n(W, 0) + " mm³", "σ<sub>max</sub> = M / W = " + (Mo * 1e6) + " / " + n(W, 0) + " = " + n(s, 1) + " MPa"], M.near(Mo * 1e6 / (b * h * h * h / 12) * (h / 2), s, 1e-9));
        }
        if (d === 2) {
            var I = r.int(20, 900) * 10, Mo2 = r.int(5, 80), z = r.int(10, 150), s2 = Mo2 * 1e6 * z / (I * 1e4);
            return Q(t("Ein Träger mit I = " + I + " cm⁴ wird durch M = " + Mo2 + " kN·m belastet. Wie groß ist die Biegespannung in einer Faser, die z = " + z + " mm von der neutralen Faser entfernt ist (auf 0,1 MPa)?", "A beam with I = " + I + " cm⁴ carries M = " + Mo2 + " kN·m. What is the bending stress in a fibre z = " + z + " mm from the neutral axis (to 0.1 MPa)?"),
                num(s2, 1, "MPa", 0.06), t("1 cm⁴ = 10⁴ mm⁴. Die Spannung wächst linear mit z.", "1 cm⁴ = 10⁴ mm⁴. Stress grows linearly with z."),
                ["I = " + I + " cm⁴ = " + (I * 1e4) + " mm⁴", "σ = M · z / I = " + (Mo2 * 1e6) + " · " + z + " / " + (I * 1e4) + " = " + n(s2, 1) + " MPa"], M.near(s2 * I * 1e4 / z, Mo2 * 1e6, 1e-9));
        }
        var b3 = r.int(4, 20) * 10, Mo3 = r.int(2, 60), sz = r.pick([10, 12, 14, 100, 140, 160]), hmin = Math.sqrt(6 * Mo3 * 1e6 / (b3 * sz));
        return Q(t("Ein Rechteckbalken der Breite b = " + b3 + " mm soll M = " + Mo3 + " kN·m aufnehmen, ohne σ<sub>zul</sub> = " + sz + " MPa zu überschreiten. Welche Mindesthöhe h ist nötig (auf 0,1 mm)?", "A rectangular beam of width b = " + b3 + " mm must take M = " + Mo3 + " kN·m without exceeding σ<sub>allow</sub> = " + sz + " MPa. What minimum height h is needed (to 0.1 mm)?"),
            num(hmin, 1, "mm", 0.06), t("Aus σ = M / W folgt W<sub>erf</sub> = M / σ<sub>zul</sub>, und W = b · h² / 6.", "From σ = M / W you get W<sub>req</sub> = M / σ<sub>allow</sub>, with W = b · h² / 6."),
            ["W<sub>erf</sub> = " + (Mo3 * 1e6) + " / " + sz + " = " + n(Mo3 * 1e6 / sz, 0) + " mm³", "h = √(6 · W / b) = " + n(hmin, 1) + " mm"], M.near(Mo3 * 1e6 / (b3 * hmin * hmin / 6), sz, 1e-9));
    } });

    E.add({ id: "k-tm2-biegelinie", topic: "K-TM2-5", title: t("Durchbiegung", "Deflection"), gen: function (r, d) {
        var Em = r.pick([[210, t("Stahl", "steel")], [70, t("Aluminium", "aluminium")]]), I = r.int(10, 400) * 10, EI = Em[0] * 1e3 * I * 1e4, l = r.int(10, 60) / 10, L = l * 1000;
        if (d === 1) {
            var F = r.int(1, 20), w = F * 1e3 * L * L * L / (3 * EI), chk = M.simpson(function (x) { return F * 1e3 * (L - x) * (L - x); }, 0, L) / EI;
            return Q(t("Ein Kragarm aus " + Em[1] + " (E = " + Em[0] + " GPa, I = " + I + " cm⁴, l = " + n(l) + " m) trägt am freien Ende F = " + F + " kN. Wie groß ist die Durchbiegung am Ende (auf 0,01 mm)?", "A " + Em[1] + " cantilever (E = " + Em[0] + " GPa, I = " + I + " cm⁴, l = " + n(l) + " m) carries F = " + F + " kN at the free end. What is the end deflection (to 0.01 mm)?"),
                num(w, 2, "mm", rel(w, 0.003, 0.006)), t("Alles in N und mm: E in N/mm², I in mm⁴, l in mm.", "Use N and mm: E in N/mm², I in mm⁴, l in mm."),
                ["E · I = " + n(EI / 1e9, 3) + " · 10<sup>9</sup> N·mm²", "w = F · l<sup>3</sup> / (3 · E · I) = " + n(w, 2) + " mm"], M.near(chk, w, 1e-6));
        }
        if (d === 2) {
            var F2 = r.int(1, 40), w2 = F2 * 1e3 * L * L * L / (48 * EI), chk2 = 2 * M.simpson(function (x) { return F2 * 1e3 * x / 2 * x / 2; }, 0, L / 2) / EI;
            return Q(t("Ein Einfeldträger aus " + Em[1] + " (E = " + Em[0] + " GPa, I = " + I + " cm⁴, l = " + n(l) + " m) trägt in Feldmitte F = " + F2 + " kN. Wie groß ist die Durchbiegung in der Mitte (auf 0,01 mm)?", "A simply supported " + Em[1] + " beam (E = " + Em[0] + " GPa, I = " + I + " cm⁴, l = " + n(l) + " m) carries F = " + F2 + " kN at midspan. What is the midspan deflection (to 0.01 mm)?"),
                num(w2, 2, "mm", rel(w2, 0.003, 0.006)), t("Standardfall: w = F · l³ / (48 · E · I).", "Standard case: w = F · l³ / (48 · E · I)."), ["w = " + (F2 * 1e3) + " · " + L + "<sup>3</sup> / (48 · " + n(EI / 1e9, 3) + " · 10<sup>9</sup>) = " + n(w2, 2) + " mm"], M.near(chk2, w2, 1e-6));
        }
        var q = r.int(1, 20), w3 = 5 * q * L * L * L * L / (384 * EI), chk3 = 2 * M.simpson(function (x) { return q * x * (L - x) / 2 * x / 2; }, 0, L / 2) / EI;
        return Q(t("Ein Einfeldträger aus " + Em[1] + " (E = " + Em[0] + " GPa, I = " + I + " cm⁴, l = " + n(l) + " m) trägt eine Streckenlast q = " + q + " kN/m. Wie groß ist die größte Durchbiegung (auf 0,01 mm)?", "A simply supported " + Em[1] + " beam (E = " + Em[0] + " GPa, I = " + I + " cm⁴, l = " + n(l) + " m) carries a uniform load q = " + q + " kN/m. What is the largest deflection (to 0.01 mm)?"),
            num(w3, 2, "mm", rel(w3, 0.003, 0.006)), t("1 kN/m = 1 N/mm. Standardfall: w = 5 · q · l⁴ / (384 · E · I).", "1 kN/m = 1 N/mm. Standard case: w = 5 · q · l⁴ / (384 · E · I)."), ["w = 5 · " + q + " · " + L + "<sup>4</sup> / (384 · " + n(EI / 1e9, 3) + " · 10<sup>9</sup>) = " + n(w3, 2) + " mm"], M.near(chk3, w3, 1e-6));
    } });

    E.add({ id: "k-tm2-knicken", topic: "K-TM2-6", title: t("Knicken nach Euler", "Euler buckling"), gen: function (r, d) {
        var I = r.int(5, 300) * 10, l = r.int(10, 60) / 10, EI = 210e3 * I * 1e4;
        var CASES = [[2, t("unten eingespannt, oben frei", "fixed at the bottom, free at the top")], [1, t("beidseitig gelenkig", "pinned at both ends")], [0.7, t("unten eingespannt, oben gelenkig", "fixed at the bottom, pinned at the top")], [0.5, t("beidseitig eingespannt", "fixed at both ends")]];
        if (d === 1) {
            var Fk = Math.PI * Math.PI * EI / Math.pow(l * 1000, 2) / 1000;
            return Q(t("Ein Stahlstab (E = 210 GPa, I = " + I + " cm⁴, l = " + n(l) + " m) ist beidseitig gelenkig gelagert. Wie groß ist die Euler-Knicklast (auf 0,1 kN)?", "A steel strut (E = 210 GPa, I = " + I + " cm⁴, l = " + n(l) + " m) is pinned at both ends. What is the Euler buckling load (to 0.1 kN)?"),
                num(Fk, 1, "kN", rel(Fk, 0.001, 0.06)), t("Beidseitig gelenkig: Knicklänge = Stablänge.", "Pinned at both ends: effective length = member length."), ["F<sub>k</sub> = π<sup>2</sup> · E · I / l<sup>2</sup> = π<sup>2</sup> · " + n(EI / 1e9, 3) + " · 10<sup>9</sup> / " + (l * 1000) + "<sup>2</sup> N = " + n(Fk, 1) + " kN"], M.near(Fk * 1000 * Math.pow(l * 1000, 2) / EI, Math.PI * Math.PI, 1e-9));
        }
        var c = r.pick(CASES), lk = c[0] * l * 1000, Fk2 = Math.PI * Math.PI * EI / (lk * lk) / 1000;
        if (d === 2) return Q(t("Ein Stahlstab (E = 210 GPa, I = " + I + " cm⁴, l = " + n(l) + " m) ist " + c[1] + ". Rechne mit l<sub>k</sub> = " + n(c[0]) + " · l. Wie groß ist die Knicklast (auf 0,1 kN)?", "A steel strut (E = 210 GPa, I = " + I + " cm⁴, l = " + n(l) + " m) is " + c[1] + ". Use l<sub>k</sub> = " + n(c[0]) + " · l. What is the buckling load (to 0.1 kN)?"),
            num(Fk2, 1, "kN", rel(Fk2, 0.001, 0.06)), t("Erst die Knicklänge bestimmen, dann in die Euler-Formel einsetzen.", "Find the effective length first, then use Euler's formula."), ["l<sub>k</sub> = " + n(c[0]) + " · " + (l * 1000) + " = " + n(lk, 0) + " mm", "F<sub>k</sub> = π<sup>2</sup> · E · I / l<sub>k</sub><sup>2</sup> = " + n(Fk2, 1) + " kN"], M.near(Fk2 * c[0] * c[0], Math.PI * Math.PI * EI / Math.pow(l * 1000, 2) / 1000, 1e-9));
        var F = r.int(5, 200), nu = r.pick([2, 2.5, 3, 3.5, 4]), Ireq = nu * F * 1000 * lk * lk / (Math.PI * Math.PI * 210e3) / 1e4;
        return Q(t("Ein Stahlstab (E = 210 GPa, l = " + n(l) + " m, " + c[1] + ", l<sub>k</sub> = " + n(c[0]) + " · l) soll F = " + F + " kN mit der Knicksicherheit ν = " + n(nu) + " tragen. Welches Flächenträgheitsmoment ist mindestens nötig (auf 0,1 cm⁴)?", "A steel strut (E = 210 GPa, l = " + n(l) + " m, " + c[1] + ", l<sub>k</sub> = " + n(c[0]) + " · l) must carry F = " + F + " kN with a buckling safety factor ν = " + n(nu) + ". What minimum second moment of area is needed (to 0.1 cm⁴)?"),
            num(Ireq, 1, "cm⁴", rel(Ireq, 0.001, 0.06)), t("Die Knicklast muss ν-mal so groß sein wie F. Stelle Euler nach I um.", "The buckling load must be ν times F. Rearrange Euler's formula for I."),
            ["F<sub>k</sub> ≥ ν · F = " + n(nu * F) + " kN", "I = ν · F · l<sub>k</sub><sup>2</sup> / (π<sup>2</sup> · E) = " + n(Ireq * 1e4, 0) + " mm⁴ = " + n(Ireq, 1) + " cm⁴"], M.near(Math.PI * Math.PI * 210e3 * Ireq * 1e4 / (lk * lk) / 1000, nu * F, 1e-9));
    } });

    // ================= Transformationsmatrizen =================
    function rot2(th, p) { return [cl(cos(th) * p[0] - sin(th) * p[1]), cl(sin(th) * p[0] + cos(th) * p[1])]; }
    function rotZ(th, v) { var a = rot2(th, [v[0], v[1]]); return [a[0], a[1], v[2]]; }
    function rotX(th, v) { var a = rot2(th, [v[1], v[2]]); return [v[0], a[0], a[1]]; }
    function rotY(th, v) { var a = rot2(th, [v[2], v[0]]); return [a[1], v[1], a[0]]; }
    var vec = function (v, d) { return H.vec(v.map(function (x) { return n(x, d); })); };
    var R2 = function (th) { return H.mat([[n(cos(th), 3), n(-sin(th), 3)], [n(sin(th), 3), n(cos(th), 3)]]); };
    var Tm2 = function (th, p) { return H.mat([[n(cl(cos(th)), 3), n(cl(-sin(th)), 3), n(p[0])], [n(cl(sin(th)), 3), n(cl(cos(th)), 3), n(p[1])], [0, 0, 1]]); };
    var mf = function (l, v, d, tol) { return v.map(function (x, i) { return { l: l[i], a: num(x, d, "", tol) }; }); };

    E.add({ id: "k-tr-rot2d", topic: "K-TR-1", title: t("Drehung in der Ebene", "Rotation in the plane"), gen: function (r, d) {
        var p = [r.nz(-6, 6), r.int(-6, 6)];
        if (d === 1) {
            var th = r.pick([90, 180, 270, -90]), q = rot2(th, p).map(Math.round);
            return Q(t("Drehe den Punkt p = (" + n(p[0]) + " | " + n(p[1]) + ") um θ = " + th + "° um den Ursprung (gegen den Uhrzeigersinn positiv). Wo landet er?", "Rotate the point p = (" + n(p[0]) + " | " + n(p[1]) + ") by θ = " + th + "° about the origin (anticlockwise positive). Where does it end up?"),
                A.multi(mf(["x′", "y′"], q, 0)), t("Bei 90° gilt: (x | y) wird zu (−y | x).", "For 90°: (x | y) becomes (−y | x)."), [m("R(" + th + "°) = " + R2(th)), "p′ = R · p = (" + n(q[0]) + " | " + n(q[1]) + ")"], M.near(Math.hypot(q[0], q[1]), Math.hypot(p[0], p[1])) && M.near(q[0] * p[0] + q[1] * p[1], Math.hypot(p[0], p[1]) * Math.hypot(p[0], p[1]) * cos(th), 1e-9));
        }
        if (d === 2) {
            var th2 = r.pick([30, 45, 60, 120, 135, 150, -30, -45, -60]), q2 = rot2(th2, p);
            return Q(t("Drehe p = (" + n(p[0]) + " | " + n(p[1]) + ") um θ = " + th2 + "° um den Ursprung. Gib die Koordinaten auf drei Nachkommastellen an.", "Rotate p = (" + n(p[0]) + " | " + n(p[1]) + ") by θ = " + th2 + "° about the origin. Give the coordinates to three decimal places."),
                A.multi(mf(["x′", "y′"], q2, 3, 0.002)), t("x′ = x cos θ − y sin θ, y′ = x sin θ + y cos θ.", "x′ = x cos θ − y sin θ, y′ = x sin θ + y cos θ."), [m("R(" + th2 + "°) = " + R2(th2)), "x′ = " + n(q2[0], 3) + ", y′ = " + n(q2[1], 3)], M.near(Math.hypot(q2[0], q2[1]), Math.hypot(p[0], p[1]), 1e-9));
        }
        var th3 = r.int(1, 35) * 10, q3 = rot2(th3, p), ang = ((M.deg(Math.atan2(q3[1], q3[0]) - Math.atan2(p[1], p[0])) % 360) + 360) % 360;
        return Q(t("Eine Drehung um den Ursprung bildet p = (" + n(p[0]) + " | " + n(p[1]) + ") auf p′ = (" + n(q3[0], 3) + " | " + n(q3[1], 3) + ") ab. Um welchen Winkel θ wurde gedreht (zwischen 0° und 360°)?", "A rotation about the origin maps p = (" + n(p[0]) + " | " + n(p[1]) + ") to p′ = (" + n(q3[0], 3) + " | " + n(q3[1], 3) + "). By what angle θ was it rotated (between 0° and 360°)?"),
            num(ang, 1, "°", 0.3), t("Bestimme die Polarwinkel beider Punkte mit atan2 und bilde die Differenz.", "Find the polar angles of both points with atan2 and take the difference."),
            ["φ(p) = " + n((M.deg(Math.atan2(p[1], p[0])) + 360) % 360, 2) + "°", "φ(p′) = " + n((M.deg(Math.atan2(q3[1], q3[0])) + 360) % 360, 2) + "°", "θ = φ(p′) − φ(p) = " + n(ang, 1) + "°"], M.near(ang, th3 % 360, 1e-6));
    } });

    E.add({ id: "k-tr-rot3d", topic: "K-TR-2", title: t("Drehmatrizen im Raum", "Rotation matrices in 3D"), gen: function (r, d) {
        var v = [r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)]; if (!v[0] && !v[1]) v[0] = 2;
        var AX = { x: rotX, y: rotY, z: rotZ };
        if (d === 1) {
            var ax = r.pick(["x", "y", "z"]), th = r.pick([90, -90, 180]), w = AX[ax](th, v).map(Math.round);
            return Q(t("Drehe den Vektor v = " + m(vec(v)) + " um θ = " + th + "° um die " + ax + "-Achse (Rechte-Hand-Regel).", "Rotate the vector v = " + m(vec(v)) + " by θ = " + th + "° about the " + ax + "-axis (right-hand rule)."),
                A.multi(mf(["x′", "y′", "z′"], w, 0)), t("Die " + ax + "-Komponente bleibt gleich, die anderen beiden drehen wie in der Ebene.", "The " + ax + " component stays the same; the other two rotate as in the plane."), ["v′ = R<sub>" + ax + "</sub>(" + th + "°) · v = " + m(vec(w))], M.near(Math.hypot.apply(null, w), Math.hypot.apply(null, v)) && w[{ x: 0, y: 1, z: 2 }[ax]] === v[{ x: 0, y: 1, z: 2 }[ax]]);
        }
        if (d === 2) {
            var th2 = r.pick([30, 45, 60, 120, 135, -30, -60]), w2 = rotZ(th2, v);
            return Q(t("Berechne R<sub>z</sub>(" + th2 + "°) · v für v = " + m(vec(v)) + " (drei Nachkommastellen).", "Compute R<sub>z</sub>(" + th2 + "°) · v for v = " + m(vec(v)) + " (three decimal places)."),
                A.multi(mf(["x′", "y′", "z′"], w2, 3, 0.002)), t("z bleibt, für x und y gilt die 2D-Drehung.", "z stays; x and y follow the 2D rotation."), [m("R<sub>z</sub> = " + H.mat([[n(cos(th2), 3), n(-sin(th2), 3), 0], [n(sin(th2), 3), n(cos(th2), 3), 0], [0, 0, 1]])), "v′ = " + m(vec(w2, 3))], M.near(Math.hypot.apply(null, w2), Math.hypot.apply(null, v), 1e-9));
        }
        var first = r.pick(["x", "y", "z"]), second = r.pick(["x", "y", "z"].filter(function (a) { return a !== first; })), t1 = r.pick([90, -90]), t2 = r.pick([90, -90]);
        var w3 = AX[second](t2, AX[first](t1, v)).map(Math.round), other = AX[first](t1, AX[second](t2, v)).map(Math.round);
        return Q(t("Der Vektor v = " + m(vec(v)) + " wird zuerst um " + t1 + "° um die " + first + "-Achse und danach um " + t2 + "° um die " + second + "-Achse gedreht (beide Male um die festen Weltachsen). Wohin zeigt er?", "The vector v = " + m(vec(v)) + " is rotated first by " + t1 + "° about the " + first + "-axis and then by " + t2 + "° about the " + second + "-axis (both times about the fixed world axes). Where does it point?"),
            A.multi(mf(["x′", "y′", "z′"], w3, 0)), t("Als Matrix: v′ = R<sub>" + second + "</sub> · R<sub>" + first + "</sub> · v. Die zuerst ausgeführte Drehung steht rechts.", "As a matrix: v′ = R<sub>" + second + "</sub> · R<sub>" + first + "</sub> · v. The rotation applied first stands on the right."),
            [t("nach der ersten Drehung", "after the first rotation") + ": " + m(vec(AX[first](t1, v).map(Math.round))), t("nach der zweiten Drehung", "after the second rotation") + ": " + m(vec(w3)), t("Andere Reihenfolge ergäbe", "The other order would give") + " " + m(vec(other))], M.near(Math.hypot.apply(null, w3), Math.hypot.apply(null, v), 1e-9));
    } });

    E.add({ id: "k-tr-homogen", topic: "K-TR-3", title: t("Homogene Transformation", "Homogeneous transformation"), gen: function (r, d) {
        var p = [r.int(-6, 6), r.int(-6, 6)], pb = [r.int(-5, 5), r.int(-5, 5)];
        if (d === 1) {
            var th = r.pick([0, 90, 180, -90]), pa = rot2(th, pb).map(Math.round).map(function (x, i) { return x + p[i]; });
            return Q(t("Das System B ist gegenüber A um θ = " + th + "° gedreht und um p = (" + n(p[0]) + " | " + n(p[1]) + ") verschoben. Ein Punkt hat in B die Koordinaten (" + n(pb[0]) + " | " + n(pb[1]) + "). Wo liegt er in A?", "Frame B is rotated by θ = " + th + "° and translated by p = (" + n(p[0]) + " | " + n(p[1]) + ") relative to A. A point has coordinates (" + n(pb[0]) + " | " + n(pb[1]) + ") in B. Where is it in A?"),
                A.multi(mf(["x<sub>A</sub>", "y<sub>A</sub>"], pa, 0)), t("Erst drehen, dann verschieben: p<sub>A</sub> = R · p<sub>B</sub> + p.", "Rotate first, then translate: p<sub>A</sub> = R · p<sub>B</sub> + p."), [m("T<sub>AB</sub> = " + Tm2(th, p)), m("p<sub>A</sub> = T<sub>AB</sub> · " + H.vec([pb[0], pb[1], 1]) + " = " + H.vec([pa[0], pa[1], 1]))], M.near(Math.hypot(pa[0] - p[0], pa[1] - p[1]), Math.hypot(pb[0], pb[1]), 1e-9));
        }
        if (d === 2) {
            var th2 = r.pick([30, 45, 60, 120, 135, 150, -45, -30]), q = rot2(th2, pb), pa2 = [q[0] + p[0], q[1] + p[1]];
            return Q(t("Gegeben ist " + m("T<sub>AB</sub> = " + Tm2(th2, p)) + " (Drehung um " + th2 + "°). Berechne die Koordinaten des Punktes p<sub>B</sub> = (" + n(pb[0]) + " | " + n(pb[1]) + ") im System A auf drei Nachkommastellen.", "Given " + m("T<sub>AB</sub> = " + Tm2(th2, p)) + " (rotation by " + th2 + "°). Compute the coordinates of the point p<sub>B</sub> = (" + n(pb[0]) + " | " + n(pb[1]) + ") in frame A to three decimal places."),
                A.multi(mf(["x<sub>A</sub>", "y<sub>A</sub>"], pa2, 3, 0.002)), t("Hänge an p<sub>B</sub> eine 1 an und multipliziere mit T.", "Append a 1 to p<sub>B</sub> and multiply by T."), ["x<sub>A</sub> = " + n(cos(th2), 3) + " · " + P(pb[0]) + " − " + n(sin(th2), 3) + " · " + P(pb[1]) + " + " + P(p[0]) + " = " + n(pa2[0], 3), "y<sub>A</sub> = " + n(sin(th2), 3) + " · " + P(pb[0]) + " + " + n(cos(th2), 3) + " · " + P(pb[1]) + " + " + P(p[1]) + " = " + n(pa2[1], 3)], M.near(Math.hypot(pa2[0] - p[0], pa2[1] - p[1]), Math.hypot(pb[0], pb[1]), 1e-9));
        }
        var th3 = r.pick([90, -90, 180]), p3 = [r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)], v = [r.int(-4, 4), r.int(-4, 4), r.int(-4, 4)], w = rotZ(th3, v).map(Math.round).map(function (x, i) { return x + p3[i]; });
        var T4 = H.mat([[Math.round(cos(th3)), Math.round(-sin(th3)), 0, p3[0]], [Math.round(sin(th3)), Math.round(cos(th3)), 0, p3[1]], [0, 0, 1, p3[2]], [0, 0, 0, 1]]);
        return Q(t("Ein Greifer-System G liegt im Weltsystem W bei " + m("T<sub>WG</sub> = " + T4) + ". Ein Werkstückpunkt hat in G die Koordinaten " + m(vec(v)) + ". Wo liegt er im Weltsystem?", "A gripper frame G sits in the world frame W at " + m("T<sub>WG</sub> = " + T4) + ". A point on the workpiece has coordinates " + m(vec(v)) + " in G. Where is it in the world frame?"),
            A.multi(mf(["x<sub>W</sub>", "y<sub>W</sub>", "z<sub>W</sub>"], w, 0)), t("Oben links steht die Drehung (hier um z), rechts die Verschiebung.", "The rotation (here about z) is in the top left block, the translation on the right."), [m("p<sub>W</sub> = R · p<sub>G</sub> + p = " + vec(rotZ(th3, v).map(Math.round)) + " + " + vec(p3) + " = " + vec(w))], M.near(Math.hypot(w[0] - p3[0], w[1] - p3[1], w[2] - p3[2]), Math.hypot(v[0], v[1], v[2]), 1e-9));
    } });

    E.add({ id: "k-tr-verkettung", topic: "K-TR-4", title: t("Transformationen verketten", "Chaining transformations"), gen: function (r, d) {
        var a1 = r.pick([0, 90, 180, -90]), a2 = r.pick([0, 90, 180, -90]), p1 = [r.int(-5, 5), r.int(-5, 5)], p2 = [r.int(-5, 5), r.int(-5, 5)];
        var ap = function (th, p, v) { var q = rot2(th, v).map(Math.round); return [q[0] + p[0], q[1] + p[1]]; };
        if (d === 1) {
            var pc = [r.int(-4, 4), r.int(-4, 4)], pb = ap(a2, p2, pc), pa = ap(a1, p1, pb), direct = ap(a1 + a2, ap(a1, p1, p2), pc);
            return Q(t("Gegeben: B liegt in A gedreht um " + a1 + "° und verschoben um (" + n(p1[0]) + " | " + n(p1[1]) + "). C liegt in B gedreht um " + a2 + "° und verschoben um (" + n(p2[0]) + " | " + n(p2[1]) + "). Ein Punkt hat in C die Koordinaten (" + n(pc[0]) + " | " + n(pc[1]) + "). Wo liegt er in A?", "Given: B sits in A rotated by " + a1 + "° and translated by (" + n(p1[0]) + " | " + n(p1[1]) + "). C sits in B rotated by " + a2 + "° and translated by (" + n(p2[0]) + " | " + n(p2[1]) + "). A point has coordinates (" + n(pc[0]) + " | " + n(pc[1]) + ") in C. Where is it in A?"),
                A.multi(mf(["x<sub>A</sub>", "y<sub>A</sub>"], pa, 0)), t("Von innen nach außen: erst von C nach B, dann von B nach A.", "From inside out: first from C to B, then from B to A."), ["p<sub>B</sub> = T<sub>BC</sub> · p<sub>C</sub> = (" + n(pb[0]) + " | " + n(pb[1]) + ")", "p<sub>A</sub> = T<sub>AB</sub> · p<sub>B</sub> = (" + n(pa[0]) + " | " + n(pa[1]) + ")"], pa[0] === direct[0] && pa[1] === direct[1]);
        }
        if (d === 2) {
            var o = ap(a1, p1, p2), ang = ((a1 + a2) % 360 + 360) % 360;
            return Q(t("T<sub>AB</sub> dreht um " + a1 + "° und verschiebt um (" + n(p1[0]) + " | " + n(p1[1]) + "), T<sub>BC</sub> dreht um " + a2 + "° und verschiebt um (" + n(p2[0]) + " | " + n(p2[1]) + "). Bestimme für T<sub>AC</sub> = T<sub>AB</sub> · T<sub>BC</sub> den Ursprung von C in A und den Drehwinkel (0° bis 360°).", "T<sub>AB</sub> rotates by " + a1 + "° and translates by (" + n(p1[0]) + " | " + n(p1[1]) + "), T<sub>BC</sub> rotates by " + a2 + "° and translates by (" + n(p2[0]) + " | " + n(p2[1]) + "). For T<sub>AC</sub> = T<sub>AB</sub> · T<sub>BC</sub>, find the origin of C in A and the rotation angle (0° to 360°)."),
                A.multi([{ l: "x", a: num(o[0], 0) }, { l: "y", a: num(o[1], 0) }, { l: "θ", a: num(ang, 0, "°") }]), t("Der Ursprung von C ist der Punkt (0 | 0) in C. Die Winkel addieren sich.", "The origin of C is the point (0 | 0) in C. The angles add up."),
                [t("Ursprung", "Origin") + ": T<sub>AB</sub> · (" + n(p2[0]) + " | " + n(p2[1]) + ") = (" + n(o[0]) + " | " + n(o[1]) + ")", "θ = " + a1 + "° + " + a2 + "° = " + ang + "°"], (function () { var a = ap(a1, p1, ap(a2, p2, [1, 0])); return M.near(Math.atan2(a[1] - o[1], a[0] - o[0]), Math.atan2(sin(ang), cos(ang)), 1e-9); })());
        }
        var th = r.pick([90, -90, 180]), v = [r.nz(-4, 4), r.nz(-4, 4)], pt = [r.int(-5, 5), r.int(-5, 5)], tf = r.bool();
        var res = tf ? rot2(th, [pt[0] + v[0], pt[1] + v[1]]).map(Math.round) : (function () { var q = rot2(th, pt).map(Math.round); return [q[0] + v[0], q[1] + v[1]]; })();
        var alt = tf ? (function () { var q = rot2(th, pt).map(Math.round); return [q[0] + v[0], q[1] + v[1]]; })() : rot2(th, [pt[0] + v[0], pt[1] + v[1]]).map(Math.round);
        return Q(t("Der Punkt (" + n(pt[0]) + " | " + n(pt[1]) + ") wird " + (tf ? "zuerst um v = (" + n(v[0]) + " | " + n(v[1]) + ") verschoben und dann um " + th + "° um den Ursprung gedreht" : "zuerst um " + th + "° um den Ursprung gedreht und dann um v = (" + n(v[0]) + " | " + n(v[1]) + ") verschoben") + ". Wo landet er?", "The point (" + n(pt[0]) + " | " + n(pt[1]) + ") is " + (tf ? "first translated by v = (" + n(v[0]) + " | " + n(v[1]) + ") and then rotated by " + th + "° about the origin" : "first rotated by " + th + "° about the origin and then translated by v = (" + n(v[0]) + " | " + n(v[1]) + ")") + ". Where does it end up?"),
            A.multi(mf(["x′", "y′"], res, 0)), t("Schreib die Operationen als Matrizen: die zuerst ausgeführte steht rechts.", "Write the operations as matrices: the one applied first stands on the right."),
            [tf ? "p′ = R · (p + v)" : "p′ = R · p + v", "= (" + n(res[0]) + " | " + n(res[1]) + ")", t("Umgekehrte Reihenfolge ergäbe", "The reverse order would give") + " (" + n(alt[0]) + " | " + n(alt[1]) + ")"], M.near(Math.hypot(tf ? res[0] : res[0] - v[0], tf ? res[1] : res[1] - v[1]), Math.hypot(tf ? pt[0] + v[0] : pt[0], tf ? pt[1] + v[1] : pt[1]), 1e-9));
    } });

    E.add({ id: "k-tr-inverse", topic: "K-TR-5", title: t("Inverse Transformation", "Inverse transformation"), gen: function (r, d) {
        var p = [r.int(-6, 6), r.int(-6, 6)];
        if (d === 1) {
            var th = r.pick([0, 90, 180, -90]), pa = [r.int(-6, 6), r.int(-6, 6)], pb = rot2(-th, [pa[0] - p[0], pa[1] - p[1]]).map(Math.round), back = rot2(th, pb).map(Math.round);
            return Q(t("B ist gegenüber A um " + th + "° gedreht und um (" + n(p[0]) + " | " + n(p[1]) + ") verschoben. Ein Punkt liegt in A bei (" + n(pa[0]) + " | " + n(pa[1]) + "). Welche Koordinaten hat er in B?", "B is rotated by " + th + "° and translated by (" + n(p[0]) + " | " + n(p[1]) + ") relative to A. A point lies at (" + n(pa[0]) + " | " + n(pa[1]) + ") in A. What are its coordinates in B?"),
                A.multi(mf(["x<sub>B</sub>", "y<sub>B</sub>"], pb, 0)), t("Rückwärts: erst die Verschiebung abziehen, dann zurückdrehen (mit R<sup>T</sup>).", "Backwards: subtract the translation first, then rotate back (with R<sup>T</sup>)."), ["p<sub>A</sub> − p = (" + n(pa[0] - p[0]) + " | " + n(pa[1] - p[1]) + ")", "p<sub>B</sub> = R<sup>T</sup> · (p<sub>A</sub> − p) = (" + n(pb[0]) + " | " + n(pb[1]) + ")"], back[0] + p[0] === pa[0] && back[1] + p[1] === pa[1]);
        }
        if (d === 2) {
            var th2 = r.pick([30, 45, 60, 120, 135, -45, -60]), tinv = rot2(-th2, [-p[0], -p[1]]), chk = rot2(th2, tinv);
            return Q(t("Gegeben ist " + m("T = " + Tm2(th2, p)) + ". Bestimme den Verschiebungsanteil von T<sup>−1</sup> (drei Nachkommastellen).", "Given " + m("T = " + Tm2(th2, p)) + ". Find the translation part of T<sup>−1</sup> (three decimal places)."),
                A.multi(mf(["t<sub>x</sub>", "t<sub>y</sub>"], tinv, 3, 0.002)), t("Für T<sup>−1</sup> gilt: Verschiebung = −R<sup>T</sup> · p.", "For T<sup>−1</sup>: translation = −R<sup>T</sup> · p."), [m("R<sup>T</sup> = " + R2(-th2)), "−R<sup>T</sup> · p = (" + n(tinv[0], 3) + " | " + n(tinv[1], 3) + ")"], M.near(chk[0] + p[0], 0, 1e-9) && M.near(chk[1] + p[1], 0, 1e-9));
        }
        var th3 = r.pick([90, -90, 180]), p3 = [r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)], pw = [r.int(-6, 6), r.int(-6, 6), r.int(-6, 6)], pg = rotZ(-th3, [pw[0] - p3[0], pw[1] - p3[1], pw[2] - p3[2]]).map(Math.round), fw = rotZ(th3, pg).map(Math.round);
        return Q(t("Die Kamera K sitzt im Weltsystem bei T<sub>WK</sub> = Drehung um " + th3 + "° um z, Verschiebung " + m(vec(p3)) + ". Ein Objekt liegt in Weltkoordinaten bei " + m(vec(pw)) + ". Wo sieht es die Kamera (Koordinaten in K)?", "Camera K sits in the world frame at T<sub>WK</sub> = rotation by " + th3 + "° about z, translation " + m(vec(p3)) + ". An object is at " + m(vec(pw)) + " in world coordinates. Where does the camera see it (coordinates in K)?"),
            A.multi(mf(["x<sub>K</sub>", "y<sub>K</sub>", "z<sub>K</sub>"], pg, 0)), t("Gesucht ist T<sub>KW</sub> = T<sub>WK</sub><sup>−1</sup>: Verschiebung abziehen, dann mit R<sup>T</sup> zurückdrehen.", "You need T<sub>KW</sub> = T<sub>WK</sub><sup>−1</sup>: subtract the translation, then rotate back with R<sup>T</sup>."), ["p<sub>W</sub> − p = " + m(vec([pw[0] - p3[0], pw[1] - p3[1], pw[2] - p3[2]])), "p<sub>K</sub> = R<sub>z</sub>(" + (-th3) + "°) · (p<sub>W</sub> − p) = " + m(vec(pg))], fw[0] + p3[0] === pw[0] && fw[1] + p3[1] === pw[1] && fw[2] + p3[2] === pw[2]);
    } });

    E.add({ id: "k-tr-kinematik", topic: "K-TR-6", title: t("Vorwärtskinematik", "Forward kinematics"), gen: function (r, d) {
        var l1 = r.int(2, 8), l2 = r.int(1, 6);
        var fk = function (a, b) { return [cl(l1 * cos(a) + l2 * cos(a + b)), cl(l1 * sin(a) + l2 * sin(a + b))]; };
        var chain = function (a, b) { var j = rot2(a, [l1, 0]), e = rot2(a + b, [l2, 0]); return [j[0] + e[0], j[1] + e[1]]; };
        if (d < 3) {
            var th1 = d === 1 ? r.pick([0, 90, 180, -90]) : r.int(-8, 8) * 15, th2 = d === 1 ? r.pick([0, 90, -90, 180]) : r.int(-10, 10) * 15, xy = fk(th1, th2), c = chain(th1, th2);
            if (d === 1) xy = xy.map(Math.round);
            return Q(t("Ein ebener Roboterarm hat zwei Glieder: l<sub>1</sub> = " + l1 + " dm und l<sub>2</sub> = " + l2 + " dm. Die Gelenkwinkel sind θ<sub>1</sub> = " + th1 + "° (gegen die x-Achse) und θ<sub>2</sub> = " + th2 + "° (relativ zum ersten Glied). Wo ist der Greifer" + (d === 2 ? " (auf 0,01 dm)" : "") + "?", "A planar robot arm has two links: l<sub>1</sub> = " + l1 + " dm and l<sub>2</sub> = " + l2 + " dm. The joint angles are θ<sub>1</sub> = " + th1 + "° (from the x-axis) and θ<sub>2</sub> = " + th2 + "° (relative to the first link). Where is the gripper" + (d === 2 ? " (to 0.01 dm)" : "") + "?"),
                A.multi(mf(["x", "y"], xy, d === 1 ? 0 : 2, d === 1 ? undefined : 0.011)), t("Das zweite Glied zeigt in Richtung θ<sub>1</sub> + θ<sub>2</sub>.", "The second link points in the direction θ<sub>1</sub> + θ<sub>2</sub>."),
                [t("Ellbogen", "Elbow") + ": (" + n(l1 * cos(th1), 3) + " | " + n(l1 * sin(th1), 3) + ")", t("Greifer", "Gripper") + ": x = " + n(xy[0], 2) + ", y = " + n(xy[1], 2)], M.near(c[0], xy[0], 1e-6) && M.near(c[1], xy[1], 1e-6));
        }
        var b0 = r.int(2, 34) * 5, tgt = fk(0, b0), dist = Math.hypot(tgt[0], tgt[1]), cb = (dist * dist - l1 * l1 - l2 * l2) / (2 * l1 * l2), back = M.deg(Math.acos(Math.max(-1, Math.min(1, cb))));
        return Q(t("Ein Arm mit l<sub>1</sub> = " + l1 + " dm und l<sub>2</sub> = " + l2 + " dm soll einen Punkt im Abstand r = " + n(dist, 3) + " dm vom Schultergelenk erreichen. Welcher Ellbogenwinkel θ<sub>2</sub> zwischen 0° und 180° ist nötig (auf 0,1°)?", "An arm with l<sub>1</sub> = " + l1 + " dm and l<sub>2</sub> = " + l2 + " dm must reach a point at distance r = " + n(dist, 3) + " dm from the shoulder joint. Which elbow angle θ<sub>2</sub> between 0° and 180° is needed (to 0.1°)?"),
            num(back, 1, "°", 0.2), t("Aus der Vorwärtskinematik folgt r<sup>2</sup> = l<sub>1</sub><sup>2</sup> + l<sub>2</sub><sup>2</sup> + 2 l<sub>1</sub> l<sub>2</sub> cos θ<sub>2</sub>.", "From forward kinematics, r<sup>2</sup> = l<sub>1</sub><sup>2</sup> + l<sub>2</sub><sup>2</sup> + 2 l<sub>1</sub> l<sub>2</sub> cos θ<sub>2</sub>."),
            ["cos θ<sub>2</sub> = (r<sup>2</sup> − l<sub>1</sub><sup>2</sup> − l<sub>2</sub><sup>2</sup>) / (2 l<sub>1</sub> l<sub>2</sub>) = " + n(cb, 4), "θ<sub>2</sub> = " + n(back, 1) + "°"], M.near(back, b0, 1e-6));
    } });
})(typeof window !== "undefined" ? window : globalThis);
