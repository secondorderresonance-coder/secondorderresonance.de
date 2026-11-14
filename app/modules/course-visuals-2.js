/*
 * SOR Kurs-Grafiken, Teil 2: TM 3, Fluidmechanik, Werkstoffe, Maschinenelemente, Elektrizitätslehre, Physik, Chemie.
 * Nach topic-visuals.js und course-visuals.js einbinden.
 */
(function (root) {
    "use strict";
    var VIS = root.SOR_VISUALS || (typeof require !== "undefined" ? require("./topic-visuals.js") : null);
    if (!VIS || !VIS.kit || !VIS.kit.arrow) { if (typeof require !== "undefined") require("./course-visuals.js"); }
    if (!VIS || !VIS.kit || !VIS.kit.arrow) return;
    var K = VIS.kit, svg = K.svg, ln = K.ln, drawPath = K.drawPath, txt = K.txt, pop = K.pop, dot = K.dot, frame = K.frame, fnPath = K.fnPath, moving = K.moving, r1 = K.n;
    var arrow = K.arrow, rect = K.rect, support = K.support, bars = K.bars;
    var Y = K.C.Y, T = K.C.T, R = K.C.R, B = K.C.B, M = K.C.M, AX = K.C.AX, W = "#eef1f7";
    var t = function (de, en) { return root.$t ? root.$t(de, en) : de; };
    var sub = function (s) { return "<tspan font-size='8' dy='3'>" + s + "</tspan><tspan dy='-3'></tspan>"; };
    var anim = function (attr, values, dur, extra) { return '<animate attributeName="' + attr + '" values="' + values + '" dur="' + (dur || 4) + 's" repeatCount="indefinite"' + (extra || "") + "/>"; };
    var move = function (values, dur) { return '<animateTransform attributeName="transform" type="translate" values="' + values + '" dur="' + (dur || 4) + 's" repeatCount="indefinite"/>'; };
    var REG = {};

    // ---------- TM 3 ----------
    REG.motion = function () {
        var F = frame(0, 6, 0, 10, { L: 30, T: 50, W: 190, H: 80 }), s = F.axes;
        s += pop('<polygon points="' + r1(F.X(0)) + "," + r1(F.Y(0)) + " " + r1(F.X(0)) + "," + r1(F.Y(2)) + " " + r1(F.X(5)) + "," + r1(F.Y(9.5)) + " " + r1(F.X(5)) + "," + r1(F.Y(0)) + '" fill="' + T + '" fill-opacity="0.25"/>', 1);
        s += drawPath("M" + r1(F.X(0)) + " " + r1(F.Y(2)) + " L" + r1(F.X(5)) + " " + r1(F.Y(9.5)), Y, 2.6, 0.2) + txt(F.X(0.2), F.Y(10), "v(t)", Y, 10, "start");
        s += pop(txt(F.X(3), F.Y(2.5), "s = " + t("Fläche", "area"), W, 10), 1.3);
        s += '<g>' + move("0 0;170 0;170 0", 4) + '<rect x="20" y="14" width="34" height="14" rx="4" fill="' + B + '"/><circle cx="28" cy="30" r="4" fill="' + W + '"/><circle cx="46" cy="30" r="4" fill="' + W + '"/></g>';
        s += ln(10, 34, 230, 34, M, 1);
        return svg(s, t("Beschleunigtes Auto und v-t-Diagramm", "Accelerating car and v-t diagram"));
    };
    REG.circular = function () {
        var s = dot(90, 78, 52, "none", ' stroke="' + M + '" stroke-width="1.4" stroke-dasharray="4 4"') + dot(90, 78, 3, W);
        s += '<g class="tv-spin" style="transform-origin:90px 78px;animation-duration:5s">' + ln(90, 78, 142, 78, M, 1.4) + dot(142, 78, 6, Y) + arrow(142, 78, 142, 32, T, 2.6) + arrow(142, 78, 108, 78, R, 2.6) + "</g>";
        s += pop(txt(236, 40, "v = ω r", T, 11, "end") + txt(236, 60, "a" + sub("n") + " = v²/r", R, 11, "end") + txt(236, 80, t("zum Mittelpunkt", "towards centre"), M, 9, "end"), 0.4);
        return svg(s, t("Punkt auf einer Kreisbahn mit Geschwindigkeit und Zentripetalbeschleunigung", "Point on a circular path with velocity and centripetal acceleration"));
    };
    REG.incline = function () {
        var a = 30 * Math.PI / 180, x0 = 20, y0 = 130, L = 200, xe = x0 + L * Math.cos(a), ye = y0 - L * Math.sin(a);
        var s = '<path d="M' + x0 + " " + y0 + " L" + r1(xe) + " " + y0 + " L" + r1(xe) + " " + r1(ye) + ' Z" fill="rgba(255,255,255,0.05)" stroke="' + M + '" stroke-width="1.4"/>';
        var cx = x0 + 120 * Math.cos(a), cy = y0 - 120 * Math.sin(a);
        s += '<g transform="translate(' + r1(cx) + " " + r1(cy) + ') rotate(-30)"><g>' + move("40 0;-40 0;40 0", 5) + rect(-16, -22, 32, 22, "rgba(96,165,250,0.35)", B) + "</g></g>";
        s += arrow(cx, cy - 11, cx, cy + 34, Y, 2.6, 0.3) + pop(txt(cx + 6, cy + 34, "mg", Y, 10, "start"), 0.3);
        s += arrow(cx, cy - 11, cx - 34 * Math.cos(a), cy - 11 + 34 * Math.sin(a), T, 2.4, 0.7) + pop(txt(cx - 40, cy + 16, "F" + sub("H"), T, 10, "end"), 0.7);
        s += arrow(cx, cy - 11, cx + 26 * Math.cos(a), cy - 11 - 26 * Math.sin(a), R, 2.4, 1.1) + pop(txt(cx + 30, cy - 30, "F" + sub("R"), R, 10, "start"), 1.1);
        s += pop(txt(40, 124, "α", W, 11), 0.2);
        return svg(s, t("Block auf der schiefen Ebene mit Kräften", "Block on an incline with forces"));
    };
    REG.energy = function () {
        var s = ln(120, 10, 120, 18, M, 2) + '<g><animateTransform attributeName="transform" type="rotate" values="45 120 14;-45 120 14;45 120 14" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1"/>' + ln(120, 14, 120, 104, W, 1.6) + dot(120, 108, 9, Y) + "</g>";
        s += '<rect x="18" y="40" width="16" height="90" fill="rgba(255,255,255,0.06)" stroke="' + M + '"/><rect x="18" width="16" fill="' + T + '">' + anim("y", "70;130;70", 1.5) + anim("height", "60;0;60", 1.5) + "</rect>";
        s += '<rect x="206" y="40" width="16" height="90" fill="rgba(255,255,255,0.06)" stroke="' + M + '"/><rect x="206" width="16" fill="' + R + '">' + anim("y", "130;70;130", 1.5) + anim("height", "0;60;0", 1.5) + "</rect>";
        s += txt(26, 144, "E" + sub("pot"), T, 9) + txt(214, 144, "E" + sub("kin"), R, 9) + pop(txt(120, 142, "E" + sub("pot") + " + E" + sub("kin") + " = " + t("konst.", "const."), W, 10), 0.4);
        return svg(s, t("Pendel: Lage- und Bewegungsenergie tauschen sich aus", "Pendulum: potential and kinetic energy exchange"));
    };
    REG.collision = function () {
        var s = ln(10, 110, 230, 110, M, 1.2);
        s += '<g>' + move("0 0;70 0;125 0;125 0", 4) + rect(10, 82, 46, 26, "rgba(96,165,250,0.4)", B) + txt(33, 100, "m₁", W, 10) + "</g>";
        s += '<g>' + move("0 0;0 0;55 0;55 0", 4) + rect(126, 86, 36, 22, "rgba(245,197,24,0.4)", Y) + txt(144, 101, "m₂", W, 10) + "</g>";
        s += pop(txt(120, 36, "m₁v₁ = (m₁ + m₂) v′", W, 12), 0.4) + pop(txt(120, 56, t("Impuls bleibt erhalten", "momentum is conserved"), T, 10), 0.8);
        return svg(s, t("Unelastischer Stoß zweier Wagen", "Inelastic collision of two carts"));
    };
    REG.spring = function () {
        var coil = function (y1) { var p = "M60 10", k; for (k = 1; k <= 10; k += 1) p += " L" + (k % 2 ? 46 : 74) + " " + r1(10 + (y1 - 10) * k / 11); return p + " L60 " + y1; };
        var s = rect(30, 4, 60, 6, "rgba(255,255,255,0.2)", M);
        s += '<path fill="none" stroke="' + W + '" stroke-width="1.8" d="' + coil(70) + '">' + anim("d", coil(55) + ";" + coil(95) + ";" + coil(55), 2, ' calcMode="spline" keyTimes="0;0.5;1" keySplines="0.45 0 0.55 1;0.45 0 0.55 1"') + "</path>";
        s += '<rect x="44" width="32" height="22" fill="' + B + '" rx="3">' + anim("y", "55;95;55", 2, ' calcMode="spline" keyTimes="0;0.5;1" keySplines="0.45 0 0.55 1;0.45 0 0.55 1"') + "</rect>";
        var F = frame(0, 6.3, -1.2, 1.2, { L: 110, T: 40, W: 120, H: 80 });
        s += drawPath(fnPath(function (x) { return -Math.cos(x * 2); }, 0, 6.3, F, 80), T, 2.2, 0.3) + ln(110, 80, 230, 80, AX, 1);
        s += pop(txt(170, 26, "ω" + sub("0") + " = √(c / m)", W, 11), 0.6);
        return svg(s, t("Feder-Masse-Schwinger und sein Zeitverlauf", "Spring-mass oscillator and its time history"));
    };

    // ---------- Fluidmechanik ----------
    REG.hydro = function () {
        var s = '<path d="M30 20 V130 H150 V20" fill="none" stroke="' + W + '" stroke-width="2.4"/>' + rect(32, 34, 116, 95, "rgba(96,165,250,0.25)", "none");
        s += '<path d="M32 34 q14 -4 29 0 t29 0 t29 0 t29 0" fill="none" stroke="' + B + '" stroke-width="1.6"><animate attributeName="d" values="M32 34 q14 -4 29 0 t29 0 t29 0 t29 0;M32 34 q14 4 29 0 t29 0 t29 0 t29 0;M32 34 q14 -4 29 0 t29 0 t29 0 t29 0" dur="3s" repeatCount="indefinite"/></path>';
        [50, 80, 110].forEach(function (y, i) { var w = (y - 34) * 0.55; s += arrow(160 + 0, y, 160 + w, y, Y, 2.2, 0.3 + i * 0.3); });
        s += pop(txt(206, 30, "p = ρ g h", W, 11) + txt(12, 84, "h", M, 11), 0.2);
        return svg(s, t("Druck wächst linear mit der Tiefe", "Pressure grows linearly with depth"));
    };
    REG.buoyancy = function () {
        var s = rect(20, 60, 200, 80, "rgba(96,165,250,0.22)", "none") + ln(20, 60, 220, 60, B, 1.6);
        s += '<g>' + move("0 -6;0 4;0 -6", 3) + rect(90, 38, 60, 40, "rgba(245,197,24,0.55)", Y) + arrow(120, 100, 120, 70, T, 2.6) + arrow(120, 58, 120, 92, R, 2.2) + "</g>";
        s += pop(txt(160, 108, "F" + sub("A") + " = ρ" + sub("Fl") + " g V", T, 11, "start") + txt(160, 30, "m g", R, 11, "start"), 0.5);
        return svg(s, t("Schwimmender Block mit Auftrieb und Gewicht", "Floating block with buoyancy and weight"));
    };
    REG.continuity = function () {
        var s = '<path d="M10 40 H90 L140 60 H230 M10 120 H90 L140 100 H230" fill="none" stroke="' + W + '" stroke-width="2.2"/>';
        [55, 80, 105].forEach(function (y, i) { var y2 = 66 + (y - 55) * 0.56; s += moving("M10 " + y + " H90 L140 " + r1(y2) + " H230", T, 3, 3.2 + i * 0.2); });
        s += pop(txt(50, 32, "A₁, v₁", W, 10) + txt(186, 52, "A₂, v₂", W, 10), 0.4) + pop(txt(120, 142, "A₁ v₁ = A₂ v₂", Y, 12), 0.8);
        return svg(s, t("Rohrverengung: im engen Teil strömt es schneller", "Pipe contraction: the flow is faster in the narrow part"));
    };
    REG.bernoulli = function () {
        var s = '<path d="M10 80 H80 L110 92 H140 L170 80 H230 M10 130 H80 L110 118 H140 L170 130 H230" fill="none" stroke="' + W + '" stroke-width="2"/>';
        [[40, 30], [125, 62], [200, 30]].forEach(function (c, i) { s += ln(c[0], 80 - (i === 1 ? -12 : 0), c[0], 14, M, 1.2) + ln(c[0] + 8, 80 - (i === 1 ? -12 : 0), c[0] + 8, 14, M, 1.2) + '<rect x="' + (c[0] + 1) + '" width="6" fill="' + B + '" y="' + c[1] + '" height="' + (80 - c[1] + (i === 1 ? 12 : 0)) + '"/>'; });
        s += moving("M10 105 H80 L110 105 H140 L170 105 H230", Y, 3.5, 2.6);
        s += pop(txt(125, 150, "p + ½ρv² = " + t("konst.", "const."), W, 11), 0.5) + pop(txt(125, 9, t("v groß, p klein", "v high, p low"), R, 9), 0.9);
        return svg(s, t("Venturirohr mit Steigrohren", "Venturi tube with standpipes"));
    };
    REG.reynolds = function () {
        var s = txt(10, 22, t("laminar", "laminar"), T, 10, "start") + txt(10, 92, t("turbulent", "turbulent"), R, 10, "start");
        [34, 46, 58].forEach(function (y, i) { s += drawPath("M10 " + y + " H230", T, 1.8, i * 0.2); });
        [104, 118, 132].forEach(function (y, i) { s += '<path d="M10 ' + y + " q20 -10 40 0 t40 4 t40 -6 t40 6 t40 -4" + '" fill="none" stroke="' + R + '" stroke-width="1.8" stroke-dasharray="10 6"><animate attributeName="stroke-dashoffset" values="32;0" dur="' + (0.8 + i * 0.2) + 's" repeatCount="indefinite"/></path>'; });
        s += pop(txt(232, 22, "Re = v d / ν", W, 11, "end") + txt(232, 92, "Re > 2300", M, 9, "end"), 0.4);
        return svg(s, t("Laminare und turbulente Strömung", "Laminar and turbulent flow"));
    };
    REG.pipeloss = function () {
        var s = '<path d="M10 70 H230 M10 100 H230" fill="none" stroke="' + W + '" stroke-width="2"/>';
        s += moving("M10 85 H230", T, 3, 2.5);
        var F = frame(0, 10, 0, 1, { L: 20, T: 110, W: 200, H: 30 });
        s += drawPath("M" + r1(F.X(0)) + " " + r1(F.Y(0.9)) + " L" + r1(F.X(10)) + " " + r1(F.Y(0.15)), R, 2.4, 0.4) + txt(F.X(0), F.Y(0.95) - 2, "p", R, 10, "start");
        s += pop(txt(120, 40, "Δp = λ (L/d) ½ρv²", W, 11), 0.7) + pop(txt(120, 58, "L", M, 10), 0.9);
        return svg(s, t("Druck sinkt entlang des Rohrs", "Pressure drops along the pipe"));
    };

    // ---------- Werkstoffe ----------
    REG.stressstrain = function () {
        var F = frame(0, 25, 0, 600), s = F.axes, f = function (e) { return e < 0.3 ? 1100 * e : e < 2 ? 330 + 20 * (e - 0.3) : 365 + 135 * Math.sin(Math.min(1, (e - 2) / 14) * Math.PI / 2) - (e > 16 ? (e - 16) * (e - 16) * 6 : 0); };
        s += drawPath(fnPath(f, 0, 22, F, 120), Y, 2.6, 0.1);
        s += pop(dot(F.X(0.3), F.Y(330), 4, T) + txt(F.X(0.3) + 6, F.Y(330) + 14, "R" + sub("e"), T, 10, "start"), 1) + pop(dot(F.X(16), F.Y(500), 4, R) + txt(F.X(16), F.Y(500) - 8, "R" + sub("m"), R, 10), 1.3);
        s += pop(txt(F.X(23), F.Y(80), "ε", M, 11) + txt(F.X(0.6), F.Y(590), "σ", M, 11, "start"), 0.3);
        return svg(s, t("Spannungs-Dehnungs-Diagramm eines Stahls", "Stress-strain diagram of a steel"));
    };
    REG.lightweight = function () {
        var vals = [[t("Stahl", "steel"), 210 / 7.85], ["Al", 70 / 2.7], ["Ti", 110 / 4.5], ["Mg", 45 / 1.74], [t("CFK", "CFRP"), 140 / 1.6]];
        var s = "", max = 90;
        vals.forEach(function (v, i) { var w = v[1] / max * 150; s += txt(50, 30 + i * 24, v[0], W, 10, "end") + '<rect class="tv-grow" x="56" y="' + (21 + i * 24) + '" width="' + r1(w) + '" height="14" fill="' + (i === 4 ? Y : T) + '" fill-opacity="0.75" style="animation-delay:' + (i * 0.12) + 's;transform-origin:56px 0"/>' + pop(txt(62 + w, 32 + i * 24, r1(v[1]), M, 9, "start"), 0.6 + i * 0.1); });
        s += pop(txt(232, 148, "E / ρ", W, 11, "end"), 0.9);
        return svg(s, t("Spezifische Steifigkeit verschiedener Werkstoffe", "Specific stiffness of different materials"));
    };
    REG.lattice = function () {
        var O = [34, 118], ex = [62, 0], ey = [26, -20], ez = [0, -64], P3 = function (x, y, z) { return [O[0] + ex[0] * x + ey[0] * y + ez[0] * z, O[1] + ex[1] * x + ey[1] * y + ez[1] * z]; };
        var s = "", e = [[0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1], [1, 0, 0, 1, 1, 0], [1, 0, 0, 1, 0, 1], [0, 1, 0, 1, 1, 0], [0, 1, 0, 0, 1, 1], [0, 0, 1, 1, 0, 1], [0, 0, 1, 0, 1, 1], [1, 1, 0, 1, 1, 1], [1, 0, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1]];
        e.forEach(function (q) { var a = P3(q[0], q[1], q[2]), b = P3(q[3], q[4], q[5]); s += ln(a[0], a[1], b[0], b[1], M, 1.2); });
        for (var i = 0; i < 8; i += 1) { var c = P3(i & 1, (i >> 1) & 1, (i >> 2) & 1); s += pop(dot(c[0], c[1], 7, B), i * 0.08); }
        var m = P3(0.5, 0.5, 0.5); s += pop(dot(m[0], m[1], 8, Y, ' class="tv-pulse"'), 0.8);
        s += pop(txt(232, 40, t("krz", "bcc"), Y, 13, "end", ' font-weight="700"') + txt(232, 60, t("8 · ⅛ + 1 = 2 Atome", "8 · ⅛ + 1 = 2 atoms"), W, 9, "end"), 1);
        return svg(s, t("Kubisch-raumzentrierte Elementarzelle", "Body-centred cubic unit cell"));
    };
    REG.leverrule = function () {
        var s = ln(30, 120, 210, 120, AX, 1.2) + '<path d="M30 30 Q100 40 120 70 Q160 40 210 30" fill="none" stroke="' + M + '" stroke-width="1.6"/>' + '<path d="M60 70 L180 70" stroke="' + T + '" stroke-width="2"/>';
        s += dot(60, 70, 5, B) + dot(180, 70, 5, R) + txt(60, 132, "c" + sub("α"), B, 10) + txt(180, 132, "c" + sub("β"), R, 10);
        s += '<g>' + move("0 0;0 0", 4) + '<path d="M110 70 l-7 12 h14 z" fill="' + Y + '"/></g>' + txt(110, 132, "c" + sub("0"), Y, 10);
        s += '<g style="transform-origin:110px 64px" class="tv-rock">' + ln(60, 64, 180, 64, W, 3) + "</g>";
        s += pop(txt(85, 58, "b", R, 10) + txt(145, 58, "a", B, 10) + txt(120, 147, "m" + sub("α") + " / m = (c" + sub("β") + " − c" + sub("0") + ") / (c" + sub("β") + " − c" + sub("α") + ")", W, 9), 0.6);
        return svg(s, t("Hebelgesetz im Zweiphasengebiet", "Lever rule in a two-phase region"));
    };
    REG.fatigue = function () {
        var F = frame(3, 8, 0, 1, { L: 34, T: 16, W: 190, H: 110 }), s = F.axes;
        s += drawPath("M" + r1(F.X(3)) + " " + r1(F.Y(0.9)) + " L" + r1(F.X(6.3)) + " " + r1(F.Y(0.35)) + " L" + r1(F.X(8)) + " " + r1(F.Y(0.35)), Y, 2.6, 0.1);
        s += pop(txt(F.X(7.2), F.Y(0.35) - 6, "σ" + sub("D"), Y, 10) + txt(F.X(5.5), F.Y(0) + 13, "log N", M, 10) + txt(F.X(3.1), F.Y(1) + 4, "σ" + sub("a"), M, 10, "start"), 0.8);
        s += moving("M" + r1(F.X(3)) + " " + r1(F.Y(0.9)) + " L" + r1(F.X(6.3)) + " " + r1(F.Y(0.35)) + " L" + r1(F.X(8)) + " " + r1(F.Y(0.35)), R, 4, 4);
        return svg(s, t("Wöhlerlinie mit Dauerfestigkeit", "S-N curve with endurance limit"));
    };

    // ---------- Maschinenelemente ----------
    REG.safety = function () {
        var s = dot(120, 80, 56, "none", ' stroke="' + M + '" stroke-width="1.2" stroke-dasharray="4 4"') + ln(40, 80, 200, 80, AX, 1) + ln(120, 14, 120, 146, AX, 1);
        s += '<g>' + anim("opacity", "1;1", 3) + arrow(120, 80, 160, 80, Y, 2.4, 0.2) + arrow(160, 80, 160, 48, T, 2.4, 0.5) + arrow(120, 80, 160, 48, R, 3, 0.9) + "</g>";
        s += pop(txt(142, 94, "σ", Y, 11) + txt(166, 66, "√3 τ", T, 10, "start") + txt(128, 54, "σ" + sub("v"), R, 11, "end"), 1.1);
        s += pop(txt(236, 140, "S = R" + sub("e") + " / σ" + sub("v"), W, 11, "end") + txt(236, 22, "R" + sub("e"), M, 10, "end"), 1.3);
        return svg(s, t("Vergleichsspannung aus Normal- und Schubspannung", "Equivalent stress from normal and shear stress"));
    };
    REG.bolt = function () {
        var s = rect(40, 40, 160, 30, "rgba(255,255,255,0.08)", M) + rect(40, 70, 160, 30, "rgba(255,255,255,0.08)", M);
        s += rect(108, 22, 24, 18, "rgba(245,197,24,0.6)", Y) + rect(113, 40, 14, 74, "rgba(245,197,24,0.4)", Y) + rect(106, 100, 28, 14, "rgba(245,197,24,0.6)", Y);
        s += arrow(120, 30, 120, 6, R, 2.4, 0.3) + arrow(120, 108, 120, 140, R, 2.4, 0.3) + pop(txt(128, 12, "F" + sub("V"), R, 10, "start"), 0.3);
        s += '<g>' + move("0 0;6 0;0 0", 2) + arrow(10, 55, 38, 55, T, 2.4) + "</g>" + '<g>' + move("0 0;-6 0;0 0", 2) + arrow(230, 85, 202, 85, T, 2.4) + "</g>";
        s += pop(txt(14, 46, "F" + sub("Q"), T, 10, "start") + txt(232, 128, "F" + sub("Q") + " ≤ μ F" + sub("V"), W, 10, "end"), 0.7);
        return svg(s, t("Vorgespannte Schraube überträgt Querkraft durch Reibung", "Preloaded bolt transmits transverse force by friction"));
    };
    REG.shaft = function () {
        var s = rect(30, 62, 180, 26, "rgba(255,255,255,0.1)", W) + '<ellipse cx="30" cy="75" rx="6" ry="13" fill="rgba(255,255,255,0.15)" stroke="' + W + '"/>';
        for (var i = 0; i < 6; i += 1) s += '<line x1="' + (40 + i * 30) + '" y1="62" x2="' + (52 + i * 30) + '" y2="88" stroke="' + T + '" stroke-width="1.4"><animate attributeName="x2" values="' + (40 + i * 30) + ";" + (56 + i * 30) + ";" + (40 + i * 30) + '" dur="3s" repeatCount="indefinite"/></line>';
        s += '<path d="M212 52 A20 20 0 0 1 212 98" fill="none" stroke="' + Y + '" stroke-width="2.4"/>' + arrow(214, 96, 206, 100, Y, 2.4) + txt(226, 76, "T", Y, 12, "start");
        s += pop(txt(120, 30, "τ = T / W" + sub("t") + ",  W" + sub("t") + " = π d³ / 16", W, 10) + txt(120, 120, "P = T · ω", Y, 11), 0.5);
        return svg(s, t("Welle unter Torsion", "Shaft under torsion"));
    };
    REG.bearing = function () {
        var s = dot(90, 78, 56, "none", ' stroke="' + W + '" stroke-width="3"') + dot(90, 78, 30, "none", ' stroke="' + W + '" stroke-width="3"') + dot(90, 78, 14, "rgba(255,255,255,0.15)");
        s += '<g class="tv-spin" style="transform-origin:90px 78px;animation-duration:6s">';
        for (var i = 0; i < 10; i += 1) { var a = i / 10 * 2 * Math.PI; s += dot(90 + 43 * Math.cos(a), 78 + 43 * Math.sin(a), 10, Y, ' fill-opacity="0.8"'); }
        s += "</g>" + pop(txt(232, 60, "L" + sub("10") + " = (C / P)" + "<tspan font-size='8' dy='-5'>p</tspan>", W, 11, "end") + txt(232, 82, t("p = 3 Kugel", "p = 3 ball"), M, 9, "end") + txt(232, 98, t("p = 10/3 Rolle", "p = 10/3 roller"), M, 9, "end"), 0.4);
        return svg(s, t("Kugellager mit umlaufenden Kugeln", "Ball bearing with rotating balls"));
    };
    REG.gears = function () {
        var gear = function (cx, cy, r, z, col) { var p = "", k; for (k = 0; k < z; k += 1) { var a0 = k / z * 2 * Math.PI, a1 = (k + 0.25) / z * 2 * Math.PI, a2 = (k + 0.5) / z * 2 * Math.PI, a3 = (k + 0.75) / z * 2 * Math.PI; p += (k ? "L" : "M") + r1(cx + r * Math.cos(a0)) + " " + r1(cy + r * Math.sin(a0)) + " L" + r1(cx + (r + 6) * Math.cos(a1)) + " " + r1(cy + (r + 6) * Math.sin(a1)) + " L" + r1(cx + (r + 6) * Math.cos(a2)) + " " + r1(cy + (r + 6) * Math.sin(a2)) + " L" + r1(cx + r * Math.cos(a3)) + " " + r1(cy + r * Math.sin(a3)); } return '<path d="' + p + 'Z" fill="' + col + '" fill-opacity="0.35" stroke="' + col + '" stroke-width="1.4"/>' + dot(cx, cy, 4, col); };
        var s = '<g><animateTransform attributeName="transform" type="rotate" values="0 70 78;360 70 78" dur="4s" repeatCount="indefinite"/>' + gear(70, 78, 24, 12, Y) + "</g>";
        s += '<g><animateTransform attributeName="transform" type="rotate" values="0 145 78;-180 145 78" dur="4s" repeatCount="indefinite"/>' + gear(145, 78, 48, 24, T) + "</g>";
        s += pop(txt(70, 140, "z₁", Y, 11) + txt(145, 146, "z₂", T, 11) + txt(236, 22, "i = z₂ / z₁ = 2", W, 11, "end"), 0.4);
        return svg(s, t("Zahnradpaar mit Übersetzung 2", "Gear pair with ratio 2"));
    };
    REG.springs = function () {
        var coil = function (x, y0, y1) { var p = "M" + x + " " + y0, k; for (k = 1; k <= 8; k += 1) p += " L" + (x + (k % 2 ? -9 : 9)) + " " + r1(y0 + (y1 - y0) * k / 9); return p + " L" + x + " " + y1; };
        var s = rect(20, 10, 80, 6, "rgba(255,255,255,0.2)", M) + '<path d="' + coil(60, 16, 60) + '" fill="none" stroke="' + T + '" stroke-width="1.8"/>' + rect(50, 60, 20, 8, "rgba(255,255,255,0.3)", M) + '<path d="' + coil(60, 68, 112) + '" fill="none" stroke="' + T + '" stroke-width="1.8"/>' + rect(40, 112, 40, 12, B, "none");
        s += rect(140, 10, 80, 6, "rgba(255,255,255,0.2)", M) + '<path d="' + coil(160, 16, 100) + '" fill="none" stroke="' + Y + '" stroke-width="1.8"/>' + '<path d="' + coil(200, 16, 100) + '" fill="none" stroke="' + Y + '" stroke-width="1.8"/>' + rect(145, 100, 70, 12, B, "none");
        s += pop(txt(60, 142, t("Reihe", "series"), T, 10) + txt(180, 128, t("parallel", "parallel"), Y, 10) + txt(180, 146, "c = c₁ + c₂", W, 9), 0.4);
        return svg(s, t("Federn in Reihe und parallel", "Springs in series and in parallel"));
    };

    // ---------- Elektrizitätslehre ----------
    function resistor(x, y, w, c) { return rect(x, y - 7, w, 14, "rgba(255,255,255,0.06)", c || W); }
    REG.ohm = function () {
        var s = '<path d="M40 30 H200 V120 H40 Z" fill="none" stroke="' + M + '" stroke-width="1.8"/>' + rect(28, 62, 24, 28, "#0a0e1c", "none") + ln(32, 66, 48, 66, W, 2.4) + ln(36, 84, 44, 84, W, 2.4) + txt(20, 79, "U", Y, 12, "end");
        s += resistor(100, 30, 50, Y) + txt(125, 22, "R", Y, 11);
        s += moving("M40 30 H200 V120 H40 Z", T, 3, 3) + '<g opacity="0.7">' + moving("M40 30 H200 V120 H40 Z", T, 3, 3).replace('dur="3s"', 'dur="3s" begin="1s"') + "</g>";
        s += pop(txt(120, 80, "U = R · I", W, 13, "middle", ' font-weight="700"') + txt(120, 100, "P = U · I", M, 10), 0.4);
        return svg(s, t("Stromkreis mit Widerstand", "Circuit with a resistor"));
    };
    REG.resnet = function () {
        var s = ln(10, 40, 40, 40, M, 1.6) + resistor(40, 40, 40, Y) + ln(80, 40, 110, 40, M, 1.6) + resistor(110, 40, 40, Y) + ln(150, 40, 230, 40, M, 1.6) + txt(120, 22, t("Reihe: R = R₁ + R₂", "series: R = R₁ + R₂"), Y, 10);
        s += ln(10, 110, 70, 110, M, 1.6) + ln(70, 90, 70, 130, M, 1.6) + ln(70, 90, 100, 90, M, 1.6) + resistor(100, 90, 40, T) + ln(140, 90, 170, 90, M, 1.6) + ln(70, 130, 100, 130, M, 1.6) + resistor(100, 130, 40, T) + ln(140, 130, 170, 130, M, 1.6) + ln(170, 90, 170, 130, M, 1.6) + ln(170, 110, 230, 110, M, 1.6);
        s += moving("M10 110 H70 V90 H170 V110 H230", R, 3, 2.5) + moving("M10 110 H70 V130 H170 V110 H230", R, 3, 2.5);
        s += pop(txt(120, 72, t("parallel: 1/R = 1/R₁ + 1/R₂", "parallel: 1/R = 1/R₁ + 1/R₂"), T, 10), 0.4);
        return svg(s, t("Reihen- und Parallelschaltung", "Series and parallel circuits"));
    };
    REG.divider = function () {
        var s = ln(40, 20, 120, 20, M, 1.6) + ln(120, 20, 120, 34, M, 1.6) + '<rect x="113" y="34" width="14" height="36" fill="none" stroke="' + Y + '" stroke-width="1.6"/>' + ln(120, 70, 120, 84, M, 1.6) + '<rect x="113" y="84" width="14" height="36" fill="none" stroke="' + T + '" stroke-width="1.6"/>' + ln(120, 120, 120, 134, M, 1.6) + ln(40, 134, 120, 134, M, 1.6) + ln(40, 20, 40, 134, M, 1.6);
        s += txt(32, 80, "U", W, 12, "end") + txt(134, 54, "R₁", Y, 10, "start") + txt(134, 104, "R₂", T, 10, "start");
        s += ln(120, 77, 180, 77, M, 1.4) + ln(120, 134, 180, 134, M, 1.4) + arrow(190, 80, 190, 130, T, 2, 0.4) + pop(txt(198, 108, "U₂", T, 12, "start"), 0.4);
        s += pop(txt(236, 22, "U₂ = U · R₂ / (R₁ + R₂)", W, 9, "end"), 0.8);
        return svg(s, t("Spannungsteiler", "Voltage divider"));
    };
    REG.rc = function () {
        var F = frame(0, 5, 0, 1.15), s = F.axes;
        s += ln(F.X(0), F.Y(1), F.X(5), F.Y(1), M, 1, ' stroke-dasharray="4 4"') + txt(F.X(5), F.Y(1) - 5, "U", M, 10, "end");
        var pd = fnPath(function (x) { return 1 - Math.exp(-x); }, 0, 5, F);
        s += drawPath(pd, Y, 2.6, 0.1) + moving(pd, R, 4, 4);
        s += pop(ln(F.X(1), F.Y(0), F.X(1), F.Y(0.632), T, 1.4, ' stroke-dasharray="3 3"') + txt(F.X(1), F.Y(0) + 12, "τ", T, 11) + txt(F.X(1) + 4, F.Y(0.632), "63 %", T, 9, "start"), 1);
        s += pop(txt(F.X(4.8), F.Y(0.35), "u" + sub("C") + " = U(1 − e" + "<tspan font-size='8' dy='-5'>−t/τ</tspan>" + ")", W, 10, "end"), 1.2);
        return svg(s, t("Aufladekurve eines Kondensators", "Charging curve of a capacitor"));
    };
    REG.ac = function () {
        var F = frame(0, 12.6, -1.2, 1.2), s = F.axes;
        s += drawPath(fnPath(function (x) { return Math.sin(x); }, 0, 12.6, F, 120), Y, 2.4, 0.1) + drawPath(fnPath(function (x) { return 0.7 * Math.sin(x - 1.1); }, 0, 12.6, F, 120), T, 2, 0.4);
        s += pop(ln(F.X(0), F.Y(0.707), F.X(12.6), F.Y(0.707), R, 1.2, ' stroke-dasharray="4 4"') + txt(F.X(12.4), F.Y(0.707) - 4, "U" + sub("eff"), R, 9, "end"), 0.9);
        s += pop(txt(F.X(0.3), F.Y(1.12), "u", Y, 10, "start") + txt(F.X(2.4), F.Y(-0.9), "i", T, 10, "start") + txt(236, 146, "φ", T, 10, "end"), 1.1);
        return svg(s, t("Spannung und phasenverschobener Strom", "Voltage and phase-shifted current"));
    };
    REG.threephase = function () {
        var F = frame(0, 12.6, -1.2, 1.2), s = F.axes;
        [Y, T, R].forEach(function (c, i) { s += drawPath(fnPath(function (x) { return Math.sin(x - i * 2 * Math.PI / 3); }, 0, 12.6, F, 120), c, 2.2, i * 0.3); });
        s += pop(txt(236, 20, "120°", W, 11, "end") + txt(236, 146, "P = √3 U I cos φ", W, 10, "end"), 0.9);
        return svg(s, t("Drei um 120° versetzte Spannungen", "Three voltages shifted by 120°"));
    };

    // ---------- Physik ----------
    REG.projectile = function () {
        var s = rect(10, 40, 50, 100, "rgba(255,255,255,0.08)", M) + ln(10, 140, 230, 140, M, 1.2);
        var pd = "M60 40 Q140 40 200 140";
        s += '<path d="' + pd + '" fill="none" stroke="' + M + '" stroke-width="1.2" stroke-dasharray="4 5"/>' + moving(pd, Y, 6, 2.4);
        s += arrow(60, 40, 100, 40, T, 2.4, 0.3) + pop(txt(80, 32, "v₀", T, 11), 0.3) + pop(txt(38, 92, "h", W, 11) + txt(130, 152, "w = v₀ · √(2h/g)", W, 10), 0.6);
        return svg(s, t("Waagerechter Wurf von einem Tisch", "Horizontal throw from a table"));
    };
    REG.lens = function () {
        var s = ln(10, 80, 230, 80, AX, 1) + '<ellipse cx="120" cy="80" rx="8" ry="56" fill="rgba(96,165,250,0.25)" stroke="' + B + '" stroke-width="1.6"/>';
        s += dot(80, 80, 3, M) + dot(160, 80, 3, M) + txt(80, 94, "F", M, 9) + txt(160, 94, "F′", M, 9);
        s += arrow(50, 80, 50, 46, Y, 2.6) + drawPath("M50 46 L120 46 L200 120", T, 1.8, 0.3) + drawPath("M50 46 L200 120", T, 1.8, 0.6) + pop(arrow(200, 80, 200, 118, R, 2.6), 1);
        s += pop(txt(50, 30, "G", Y, 11) + txt(212, 114, "B", R, 11, "start") + txt(85, 150, "g", W, 10) + txt(160, 150, "b", W, 10) + txt(236, 22, "1/f = 1/g + 1/b", W, 10, "end"), 1.2);
        return svg(s, t("Abbildung mit einer Sammellinse", "Imaging with a converging lens"));
    };
    REG.refraction = function () {
        var s = rect(10, 80, 220, 66, "rgba(96,165,250,0.2)", "none") + ln(10, 80, 230, 80, B, 1.6) + ln(120, 20, 120, 140, M, 1, ' stroke-dasharray="4 4"');
        s += drawPath("M60 22 L120 80", Y, 2.6, 0.1) + drawPath("M120 80 L148 140", Y, 2.6, 0.6) + pop(drawPath("M120 80 L180 22", Y, 1.2, 0, ' stroke-opacity="0.4"'), 0.9);
        s += pop(txt(104, 56, "α₁", W, 11) + txt(138, 112, "α₂", W, 11) + txt(16, 72, "n₁", M, 10, "start") + txt(16, 98, "n₂", M, 10, "start"), 0.8) + pop(txt(236, 140, "n₁ sin α₁ = n₂ sin α₂", W, 9, "end"), 1.1);
        return svg(s, t("Lichtbrechung an einer Grenzfläche", "Refraction of light at an interface"));
    };
    REG.wave = function () {
        var p2 = "", i, x; for (i = 0; i <= 160; i += 1) { x = 10 + i * 2.75; p2 += (i ? "L" : "M") + r1(x) + " " + r1(80 - 34 * Math.sin(i / 80 * 4 * Math.PI)); }
        var s = '<clipPath id="wvclip"><rect x="10" y="20" width="220" height="120"/></clipPath><g clip-path="url(#wvclip)"><g>' + move("0 0;-110 0", 2) + '<path d="' + p2 + '" fill="none" stroke="' + T + '" stroke-width="2.4"/></g></g>';
        s += ln(10, 80, 230, 80, AX, 1) + pop(ln(37.5, 128, 147.5, 128, Y, 1.6) + txt(92, 142, "λ", Y, 12), 0.4) + pop(txt(236, 22, "c = λ · f", W, 12, "end"), 0.7);
        return svg(s, t("Laufende Welle mit Wellenlänge", "Travelling wave with wavelength"));
    };
    REG.doppler = function () {
        var s = "";
        for (var i = 0; i < 5; i += 1) s += '<circle cx="' + (70 + i * 12) + '" cy="78" r="' + (60 - i * 12) + '" fill="none" stroke="' + T + '" stroke-width="1.6" stroke-opacity="' + (0.3 + i * 0.14).toFixed(2) + '"/>';
        s += '<g>' + move("0 0;10 0;0 0", 2) + dot(118, 78, 7, Y) + arrow(126, 78, 150, 78, Y, 2.2) + "</g>";
        s += pop(txt(206, 20, t("höher", "higher"), R, 10) + txt(206, 34, "f′ > f", R, 10) + txt(34, 20, t("tiefer", "lower"), B, 10) + txt(34, 34, "f′ < f", B, 10), 0.5);
        s += pop(txt(120, 150, "f′ = f · c / (c − v)", W, 10), 0.9);
        return svg(s, t("Wellenfronten einer bewegten Schallquelle", "Wavefronts of a moving sound source"));
    };
    REG.decay = function () {
        var F = frame(0, 5, 0, 1.1), s = F.axes;
        s += drawPath(fnPath(function (x) { return Math.pow(0.5, x); }, 0, 5, F), Y, 2.6, 0.1);
        [1, 2, 3].forEach(function (k, i) { s += pop(ln(F.X(k), F.Y(0), F.X(k), F.Y(Math.pow(0.5, k)), T, 1.2, ' stroke-dasharray="3 3"') + ln(F.X(0), F.Y(Math.pow(0.5, k)), F.X(k), F.Y(Math.pow(0.5, k)), T, 1.2, ' stroke-dasharray="3 3"') + txt(F.X(k), F.Y(0) + 12, k + "T", T, 9), 0.6 + i * 0.3); });
        s += pop(txt(F.X(4.8), F.Y(0.9), "N = N₀ (½)" + "<tspan font-size='8' dy='-5'>t/T</tspan>", W, 10, "end") + txt(F.X(0.1), F.Y(0.5), "½", M, 9, "start"), 1.4);
        return svg(s, t("Zerfallskurve mit Halbwertszeiten", "Decay curve with half-lives"));
    };

    // ---------- Chemie ----------
    REG.mole = function () {
        var s = "", i;
        s += rect(20, 96, 90, 8, "rgba(255,255,255,0.12)", M) + '<path d="M65 104 l-10 30 h20 z" fill="' + M + '"/>';
        for (i = 0; i < 9; i += 1) s += pop(dot(34 + (i % 5) * 14, 88 - Math.floor(i / 5) * 12, 5, i % 3 ? B : R), 0.1 + i * 0.08);
        s += pop(txt(65, 40, "m = 18 g", Y, 12), 0.9);
        s += arrow(120, 80, 150, 80, W, 2, 1.1);
        s += pop(txt(196, 60, "n = m / M", W, 12) + txt(196, 82, "= 1 mol", T, 12) + txt(196, 108, "6,022 · 10²³".replace(",", t(",", ".")), M, 10) + txt(196, 122, t("Teilchen", "particles"), M, 10), 1.3);
        return svg(s, t("Ein Mol Wasser auf der Waage", "One mole of water on a scale"));
    };
    REG.eqbalance = function () {
        var s = '<path d="M120 112 l-12 26 h24 z" fill="' + M + '"/>';
        s += '<g class="tv-rock" style="transform-origin:120px 106px">' + rect(24, 102, 192, 6, "rgba(255,255,255,0.14)", W);
        s += txt(66, 92, "CH₄ + 2 O₂", Y, 12) + txt(174, 92, "CO₂ + 2 H₂O", T, 12) + "</g>";
        s += pop(txt(66, 30, "C 1 · H 4 · O 4", Y, 10) + txt(174, 30, "C 1 · H 4 · O 4", T, 10), 0.6) + pop(txt(120, 52, "=", W, 18, "middle", ' font-weight="700"'), 1);
        return svg(s, t("Gleich viele Atome auf beiden Seiten", "Equal numbers of atoms on both sides"));
    };
    REG.stoich = function () {
        var s = "", i;
        for (i = 0; i < 2; i += 1) s += pop(rect(16 + i * 24, 60, 20, 20, "rgba(245,197,24,0.25)", Y), 0.1 + i * 0.1);
        s += pop(rect(16, 86, 20, 20, "rgba(96,165,250,0.25)", B), 0.3);
        s += pop(txt(40, 124, "2 H₂ + O₂", W, 11), 0.4) + arrow(80, 84, 130, 84, W, 2, 0.7);
        for (i = 0; i < 2; i += 1) s += pop(rect(150 + i * 30, 72, 24, 24, "rgba(53,224,196,0.25)", T), 1 + i * 0.15);
        s += pop(txt(180, 124, "2 H₂O", W, 11), 1.2) + pop(txt(120, 30, "n(H₂O) : n(H₂) = 2 : 2", M, 11), 1.5);
        return svg(s, t("Stoffmengen stehen im Verhältnis der Koeffizienten", "Amounts are in the ratio of the coefficients"));
    };
    REG.dilution = function () {
        var s = '<path d="M30 40 V128 H90 V40" fill="none" stroke="' + W + '" stroke-width="2"/>' + rect(31, 80, 58, 47, "rgba(233,69,96,0.55)", "none");
        s += '<path d="M150 30 V128 H210 V30" fill="none" stroke="' + W + '" stroke-width="2"/>';
        s += '<rect x="151" y="80" width="58" height="47" fill="' + R + '" fill-opacity="0.22"><animate attributeName="y" values="104;50;50;104" dur="5s" repeatCount="indefinite"/><animate attributeName="height" values="23;77;77;23" dur="5s" repeatCount="indefinite"/></rect>';
        s += arrow(96, 84, 142, 84, W, 2) + txt(120, 76, "+ H₂O", B, 10);
        s += pop(txt(60, 146, "c₁ · V₁", Y, 11) + txt(180, 146, "= c₂ · V₂", Y, 11), 0.5);
        return svg(s, t("Verdünnen: gleiche Stoffmenge, mehr Volumen", "Diluting: same amount, more volume"));
    };
    REG.ph = function () {
        var s = "", cols = ["#e94560", "#ef6a4a", "#f2913a", "#f5c518", "#c9d32a", "#8fd14f", "#35e0c4", "#3fc6d8", "#60a5fa", "#7c86f5", "#a78bfa", "#b46ef0", "#c25bd8", "#c84bb8", "#c23f97"];
        for (var i = 0; i <= 14; i += 1) { s += '<rect x="' + (12 + i * 14.4) + '" y="70" width="14" height="22" fill="' + cols[i] + '" fill-opacity="0.85"/>'; if (i % 2 === 0) s += txt(19 + i * 14.4, 106, i, M, 9); }
        s += '<g><animateTransform attributeName="transform" type="translate" values="0 0;150 0;0 0" dur="6s" repeatCount="indefinite"/><path d="M40 62 l-6 -10 h12 z" fill="' + W + '"/></g>';
        s += txt(30, 130, t("sauer", "acidic"), R, 10) + txt(120, 130, t("neutral", "neutral"), T, 10) + txt(210, 130, t("basisch", "basic"), B, 10);
        s += pop(txt(120, 36, "pH = −lg c(H₃O⁺)", W, 12), 0.5);
        return svg(s, t("pH-Skala von 0 bis 14", "pH scale from 0 to 14"));
    };
    REG.enthalpy = function () {
        var s = ln(30, 130, 30, 14, AX, 1.2) + txt(26, 12, "H", M, 10, "end");
        s += ln(40, 40, 100, 40, Y, 3) + txt(70, 32, t("Edukte", "reactants"), Y, 10);
        s += ln(150, 112, 210, 112, T, 3) + txt(180, 128, t("Produkte", "products"), T, 10);
        s += drawPath("M100 40 C120 40 128 112 150 112", W, 1.6, 0.3) + moving("M100 40 C120 40 128 112 150 112", R, 4, 3);
        s += arrow(222, 40, 222, 108, R, 2.4, 1) + ln(210, 40, 228, 40, M, 1, ' stroke-dasharray="3 3"') + pop(txt(236, 78, "Δ<tspan font-size='8' dy='3'>R</tspan><tspan dy='-3'>H &lt; 0</tspan>", R, 11, "end"), 1.2);
        return svg(s, t("Exotherme Reaktion im Energiediagramm", "Exothermic reaction in an energy diagram"));
    };

    // ---------- Physik 1 bis 4 (Hering, Martin, Stohrer) ----------
    REG.slit = function () {
        var s = ln(20, 75, 70, 75, Y, 2.4) + '<rect x="72" y="20" width="5" height="44" fill="' + M + '"/><rect x="72" y="70" width="5" height="10" fill="' + M + '"/><rect x="72" y="86" width="5" height="44" fill="' + M + '"/>';
        for (var i = 1; i <= 4; i += 1) s += '<circle cx="77" cy="67" r="' + i * 18 + '" fill="none" stroke="' + T + '" stroke-opacity="0.35" stroke-dasharray="3 4">' + anim("r", (i * 18 - 18) + ";" + (i * 18), 2) + "</circle>" + '<circle cx="77" cy="83" r="' + i * 18 + '" fill="none" stroke="' + B + '" stroke-opacity="0.35" stroke-dasharray="3 4">' + anim("r", (i * 18 - 18) + ";" + (i * 18), 2) + "</circle>";
        s += ln(200, 20, 200, 130, M, 1.2);
        for (var k = -3; k <= 3; k += 1) s += '<rect x="201" y="' + (73 + k * 16) + '" width="' + (16 - Math.abs(k) * 3.5) + '" height="5" rx="2" fill="' + Y + '" fill-opacity="' + (1 - Math.abs(k) * 0.22) + '"/>';
        s += pop(txt(150, 140, "g sin α = m λ", W, 11), 0.6);
        return svg(s, t("Doppelspalt mit Interferenzstreifen auf dem Schirm", "Double slit with interference fringes on the screen"));
    };
    REG.photo = function () {
        var s = '<rect x="130" y="95" width="90" height="34" rx="4" fill="rgba(96,165,250,0.25)" stroke="' + B + '"/>' + txt(175, 117, t("Metall", "metal"), B, 10);
        s += '<path d="M30 30 q8 -8 16 0 t16 0 t16 0 t16 0 t16 0 t16 0" fill="none" stroke="' + Y + '" stroke-width="2.2"><animate attributeName="stroke-dashoffset" values="40;0" dur="1.2s" repeatCount="indefinite"/></path>';
        s += arrow(126, 36, 150, 92, Y, 2.2) + txt(54, 22, "h f", Y, 11);
        s += '<g>' + move("0 0;45 -55;45 -55", 2.4) + dot(165, 92, 4.5, T) + "</g>" + pop(txt(62, 82, "E<tspan dy='3' font-size='7'>kin</tspan><tspan dy='-3'> = h f − W</tspan>", T, 11) + txt(62, 98, t("Elektron", "electron") + " ●", M, 9), 0.5);
        return svg(s, t("Ein Photon löst ein Elektron aus einer Metalloberfläche", "A photon releases an electron from a metal surface"));
    };
    REG.bohr = function () {
        var s = dot(80, 75, 7, R) + txt(80, 79, "+", W, 10);
        [22, 40, 58].forEach(function (rr, i) { s += '<circle cx="80" cy="75" r="' + rr + '" fill="none" stroke="' + M + '" stroke-dasharray="3 4"/>' + txt(80 + rr * 0.72 + 4, 75 - rr * 0.72, "n = " + (i + 1), M, 8, "start"); });
        s += '<g class="tv-spin" style="transform-origin:80px 75px;animation-duration:4s">' + dot(138, 75, 4.5, T) + "</g>";
        s += pop('<path d="M150 50 q6 -6 12 0 t12 0 t12 0 t12 0" fill="none" stroke="' + Y + '" stroke-width="2"/>' + txt(204, 40, "h f = E<tspan dy='3' font-size='7'>m</tspan><tspan dy='-3'> − E</tspan><tspan dy='3' font-size='7'>n</tspan>", Y, 10, "middle"), 0.5);
        s += pop(txt(190, 112, "E = −13,6 eV/n²".replace(",", t(",", ".")), W, 10), 0.9);
        return svg(s, t("Bohr'sches Atommodell mit Bahnen und Photon", "Bohr's model with orbits and a photon"));
    };
    REG.well = function () {
        var s = ln(40, 20, 40, 132, W, 2.4) + ln(200, 20, 200, 132, W, 2.4) + ln(40, 132, 200, 132, W, 1.4);
        [1, 2, 3].forEach(function (k) {
            var y = 128 - k * k * 11, p = "M40 " + y;
            for (var i = 1; i <= 40; i += 1) { var x = 40 + i * 4; p += " L" + x + " " + r1(y - 9 * Math.sin(k * Math.PI * i / 40)); }
            s += ln(40, y, 200, y, M, 0.8, ' stroke-dasharray="3 3"') + drawPath(p, [T, Y, B][k - 1], 2, 0.3 * k) + txt(210, y + 3, "n=" + k, M, 9, "start");
        });
        s += pop(txt(120, 14, "E = n² h² / (8 m L²)", W, 10), 1);
        return svg(s, t("Teilchen im Potenzialtopf mit den ersten drei Wellenfunktionen", "Particle in a box with the first three wave functions"));
    };
    REG.lorentz = function () {
        var s = ln(30, 130, 210, 130, AX, 1.2) + ln(40, 140, 40, 14, AX, 1.2) + txt(214, 134, "x", M, 10, "start") + txt(40, 10, "ct", M, 10);
        s += ln(40, 130, 150, 20, Y, 1.4, ' stroke-dasharray="4 3"') + txt(152, 18, t("Licht", "light"), Y, 9, "start");
        s += '<g class="tv-rock" style="transform-origin:40px 130px">' + ln(40, 130, 100, 20, T, 2.2) + ln(40, 130, 150, 70, T, 2.2) + txt(104, 18, "ct'", T, 10, "start") + txt(154, 70, "x'", T, 10, "start") + "</g>";
        s += pop(txt(170, 108, "γ = 1/√(1 − v²/c²)", W, 10), 0.6);
        return svg(s, t("Minkowski-Diagramm: geneigte Achsen eines bewegten Systems", "Minkowski diagram: tilted axes of a moving frame"));
    };

    REG.magfield = function () {
        var s = "";
        for (var i = 0; i < 5; i += 1) for (var j = 0; j < 5; j += 1) s += txt(22 + j * 30, 24 + i * 26, "×", M, 11);
        s += '<path d="M82 124 A46 46 0 1 1 82.1 124" fill="none" stroke="' + T + '" stroke-width="1.4" stroke-dasharray="4 4"/>';
        s += '<g class="tv-spin" style="transform-origin:82px 78px;animation-duration:5s">' + dot(82, 124, 5.5, Y) + arrow(82, 124, 118, 124, Y, 2.2) + arrow(82, 124, 82, 98, R, 2.2) + "</g>";
        s += pop(txt(234, 60, "F = q v B", R, 11, "end") + txt(234, 80, "r = m v / (q B)", W, 10, "end") + txt(8, 146, t("B in die Ebene", "B into the page"), M, 9, "start"), 0.5);
        return svg(s, t("Geladenes Teilchen auf einer Kreisbahn im Magnetfeld", "Charged particle on a circular path in a magnetic field"));
    };
    REG.induct = function () {
        var s = '<rect x="30" y="34" width="110" height="86" fill="rgba(96,165,250,0.10)" stroke="' + B + '" stroke-dasharray="4 4"/>';
        for (var i = 0; i < 3; i += 1) for (var j = 0; j < 4; j += 1) s += txt(45 + j * 28, 58 + i * 26, "·", B, 18);
        s += ln(20, 30, 150, 30, M, 2) + ln(20, 124, 150, 124, M, 2) + '<rect x="12" y="66" width="8" height="24" fill="none" stroke="' + W + '"/>' + ln(16, 30, 16, 66, M, 2) + ln(16, 90, 16, 124, M, 2) + txt(4, 82, "R", W, 9, "start");
        s += '<g>' + move("0 0;50 0;0 0", 4) + ln(70, 26, 70, 128, Y, 4) + arrow(74, 78, 96, 78, Y, 2) + "</g>";
        s += pop(txt(234, 64, "u = B l v", T, 12, "end") + txt(234, 84, "u = −N dΦ/dt", W, 10, "end"), 0.5);
        return svg(s, t("Bewegter Leiterstab im Magnetfeld induziert eine Spannung", "A moving rod in a magnetic field induces a voltage"));
    };
    REG.nucleus = function () {
        var s = "", pts = [[0, 0], [12, 4], [-11, 6], [5, -12], [-6, -11], [14, -9], [-15, -6], [2, 14], [-9, 16], [13, 14], [20, 3], [-20, 2], [8, 22], [-2, -22]];
        pts.forEach(function (q, i) { s += dot(80 + q[0], 78 + q[1], 7.5, i % 2 ? B : R, ' stroke="#0b1020" stroke-width="1"'); });
        s += '<circle cx="80" cy="78" r="34" fill="none" stroke="' + M + '" stroke-dasharray="3 4"><animate attributeName="r" values="32;35;32" dur="3s" repeatCount="indefinite"/></circle>';
        s += dot(150, 40, 5, R) + txt(160, 44, t("Proton", "proton"), R, 10, "start") + dot(150, 60, 5, B) + txt(160, 64, t("Neutron", "neutron"), B, 10, "start");
        s += pop(txt(128, 104, "R = 1,2 fm · A<tspan dy='-4' font-size='7'>1/3</tspan>".replace(",", t(",", ".")), W, 9, "start") + txt(128, 124, "E<tspan dy='3' font-size='7'>B</tspan><tspan dy='-3'> = Δm c²</tspan>", Y, 10, "start"), 0.5);
        return svg(s, t("Atomkern aus Protonen und Neutronen", "Nucleus made of protons and neutrons"));
    };
    REG.quarks = function () {
        var s = '<circle cx="80" cy="76" r="48" fill="rgba(255,255,255,0.04)" stroke="' + M + '"/>', q = [[80, 46, "u", R], [54, 94, "u", Y], [106, 94, "d", B]];
        s += '<path d="M80 46 L54 94 L106 94 Z" fill="none" stroke="' + T + '" stroke-width="1.2" stroke-dasharray="3 3"><animate attributeName="stroke-dashoffset" values="0;12" dur="1s" repeatCount="indefinite"/></path>';
        q.forEach(function (k) { s += dot(k[0], k[1], 12, k[3]) + txt(k[0], k[1] + 4, k[2], "#0b1020", 12); });
        s += pop(txt(140, 50, "p = u u d", W, 12, "start") + txt(140, 72, "Q = ⅔ + ⅔ − ⅓ = 1", T, 9, "start") + txt(140, 94, "B = 1", M, 9, "start"), 0.5);
        return svg(s, t("Proton aus drei Quarks, zusammengehalten durch Gluonen", "Proton made of three quarks held together by gluons"));
    };
    REG.bands = function () {
        var s = '<rect x="30" y="22" width="120" height="34" rx="3" fill="rgba(96,165,250,0.18)" stroke="' + B + '"/>' + txt(90, 43, t("Leitungsband", "conduction band"), B, 10);
        s += '<rect x="30" y="98" width="120" height="34" rx="3" fill="rgba(233,69,96,0.18)" stroke="' + R + '"/>' + txt(90, 120, t("Valenzband", "valence band"), R, 10);
        s += ln(160, 56, 160, 98, Y, 1.4) + txt(166, 80, "E<tspan dy='3' font-size='7'>g</tspan>", Y, 11, "start");
        s += '<g>' + move("0 0;0 -52;0 -52", 3) + dot(70, 104, 4.5, W) + "</g>" + '<g class="tv-p" style="animation-delay:1.5s">' + '<circle cx="70" cy="104" r="4.5" fill="none" stroke="' + W + '"/></g>';
        s += pop(txt(234, 13, "σ = e (n μ<tspan dy='3' font-size='7'>n</tspan><tspan dy='-3'> + p μ</tspan><tspan dy='3' font-size='7'>p</tspan><tspan dy='-3'>)</tspan>", T, 10, "end") + txt(232, 140, "λ<tspan dy='3' font-size='7'>g</tspan><tspan dy='-3'> = h c / E</tspan><tspan dy='3' font-size='7'>g</tspan>", W, 10, "end"), 0.6);
        return svg(s, t("Bändermodell eines Halbleiters mit Bandlücke", "Band model of a semiconductor with band gap"));
    };

    Object.keys(REG).forEach(function (k) { VIS.register(k, REG[k]); });
})(typeof window !== "undefined" ? window : globalThis);
