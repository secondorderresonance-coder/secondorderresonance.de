/*
 * SOR Kurs-Grafiken: animierte SVG-Skizzen für die 36 Lektionen der Grundkurse.
 * Nach topic-visuals.js einbinden. Registriert sich über SOR_VISUALS.register().
 * Beschriftungen zweisprachig über $t (app/modules/i18n.js).
 */
(function (root) {
    "use strict";
    var VIS = root.SOR_VISUALS || (typeof require !== "undefined" ? require("./topic-visuals.js") : null);
    if (!VIS || !VIS.kit) return;
    var K = VIS.kit, svg = K.svg, ln = K.ln, drawPath = K.drawPath, txt = K.txt, pop = K.pop, dot = K.dot, frame = K.frame, fnPath = K.fnPath, moving = K.moving, r1 = K.n;
    var Y = K.C.Y, T = K.C.T, R = K.C.R, B = K.C.B, P = K.C.P, M = K.C.M, AX = K.C.AX, W = "#eef1f7";
    var t = function (de, en) { return root.$t ? root.$t(de, en) : de; };

    function arrow(x1, y1, x2, y2, c, w, delay, extra) {
        var a = Math.atan2(y2 - y1, x2 - x1), h = 7 + (w || 2.4);
        var head = '<path d="M' + r1(x2) + " " + r1(y2) + " L" + r1(x2 - h * Math.cos(a - 0.42)) + " " + r1(y2 - h * Math.sin(a - 0.42)) + " L" + r1(x2 - h * Math.cos(a + 0.42)) + " " + r1(y2 - h * Math.sin(a + 0.42)) + 'Z" fill="' + c + '"/>';
        var body = '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2 - Math.cos(a) * h * 0.6) + '" y2="' + r1(y2 - Math.sin(a) * h * 0.6) + '" stroke="' + c + '" stroke-width="' + (w || 2.4) + '" stroke-linecap="round"' + (extra || "") + "/>";
        return delay === undefined ? body + head : pop(body + head, delay);
    }
    function support(x, y, roller) { return '<path d="M' + x + " " + y + " l-8 12 h16 z" + '" fill="none" stroke="' + M + '" stroke-width="1.6"/>' + (roller ? ln(x - 10, y + 16, x + 10, y + 16, M, 1.6) : ""); }
    function rect(x, y, w, h, fill, stroke, extra) { return '<rect x="' + r1(x) + '" y="' + r1(y) + '" width="' + r1(w) + '" height="' + r1(h) + '" fill="' + (fill || "none") + '" stroke="' + (stroke || "none") + '" stroke-width="1.6"' + (extra || "") + "/>"; }
    function bars(vals, col, label) {
        var F = frame(-0.5, vals.length - 0.5, 0, Math.max.apply(null, vals) * 1.15), s = F.axes, bw = (F.X(1) - F.X(0)) * 0.7;
        vals.forEach(function (v, i) { s += '<rect class="tv-grow" x="' + r1(F.X(i) - bw / 2) + '" y="' + r1(F.Y(v)) + '" width="' + r1(bw) + '" height="' + r1(F.Y(0) - F.Y(v)) + '" fill="' + col + '" fill-opacity="0.75" style="animation-delay:' + (i * 0.06).toFixed(2) + 's"/>'; if (i % 2 === 0) s += txt(F.X(i), F.Y(0) + 12, i, M, 9); });
        return s + pop(txt(232, 22, label, W, 10, "end"), 0.9);
    }
    var REG = {};

    // ---------- TM 1 ----------
    REG.forcecomp = function () {
        var ox = 55, oy = 122, L = 150, a = 34 * Math.PI / 180, fx = ox + L * Math.cos(a), fy = oy - L * Math.sin(a);
        var s = ln(30, oy, 225, oy, AX, 1.2) + ln(ox, 135, ox, 12, AX, 1.2);
        s += arrow(ox, oy, fx, fy, Y, 3.4) + pop(txt(fx - 6, fy - 8, "F", Y, 13, "end"), 0.2);
        s += pop(ln(fx, fy, fx, oy, T, 1.6, ' stroke-dasharray="4 4"') + ln(ox, fy, fx, fy, T, 1.6, ' stroke-dasharray="4 4"'), 0.6);
        s += arrow(ox, oy + 0.5, fx, oy + 0.5, T, 3, 0.9) + arrow(ox, oy, ox, fy, R, 3, 1.2);
        s += pop(txt((ox + fx) / 2, oy + 16, "F<tspan font-size='8' dy='3'>x</tspan>", T, 12), 1) + pop(txt(ox - 8, (oy + fy) / 2, "F<tspan font-size='8' dy='3'>y</tspan>", R, 12, "end"), 1.3);
        s += pop('<path d="M' + (ox + 32) + " " + oy + " A32 32 0 0 0 " + r1(ox + 32 * Math.cos(a)) + " " + r1(oy - 32 * Math.sin(a)) + '" fill="none" stroke="' + W + '" stroke-width="1.4"/>' + txt(ox + 40, oy - 8, "α", W, 11, "start"), 1.5);
        return svg(s, t("Kraft und ihre Komponenten", "A force and its components"));
    };
    REG.lever = function () {
        var s = '<path d="M120 112 l-12 22 h24 z" fill="' + M + '"/>';
        s += '<g class="tv-rock" style="transform-origin:120px 106px">' + rect(30, 102, 180, 8, "rgba(255,255,255,0.12)", W) + arrow(55, 52, 55, 100, Y, 3) + arrow(185, 70, 185, 100, T, 3) + txt(55, 46, "F₁", Y, 12) + txt(185, 64, "F₂", T, 12) + "</g>";
        s += pop(ln(55, 140, 120, 140, Y, 1.4) + txt(87, 136, "a₁", Y, 10) + ln(120, 140, 185, 140, T, 1.4) + txt(152, 136, "a₂", T, 10), 0.4);
        s += pop(txt(120, 26, "F₁ · a₁ = F₂ · a₂", W, 12), 0.8);
        return svg(s, t("Hebel im Gleichgewicht", "A lever in equilibrium"));
    };
    REG.beam = function () {
        var s = rect(30, 70, 180, 10, "rgba(255,255,255,0.1)", W) + support(30, 80) + support(210, 80, true);
        s += arrow(90, 22, 90, 68, Y, 3, 0.1) + pop(txt(98, 28, "F", Y, 12, "start"), 0.1);
        s += arrow(30, 140, 30, 98, T, 3, 0.7) + arrow(210, 140, 210, 98, T, 3, 0.9) + pop(txt(40, 136, "A", T, 12, "start") + txt(200, 136, "B", T, 12, "end"), 1);
        s += pop(ln(30, 58, 90, 58, M, 1, ' stroke-dasharray="3 3"') + txt(60, 54, "a", M, 10) + ln(90, 58, 210, 58, M, 1, ' stroke-dasharray="3 3"') + txt(150, 54, "b", M, 10), 1.3);
        return svg(s, t("Balken mit Lagerkräften", "A beam with support forces"));
    };
    REG.truss = function () {
        var s = drawPath("M30 120 L120 40", R, 4, 0.1) + drawPath("M120 40 L210 120", R, 4, 0.3) + drawPath("M30 120 L210 120", T, 4, 0.5);
        s += dot(30, 120, 4, W) + dot(120, 40, 4, W) + dot(210, 120, 4, W) + support(30, 124) + support(210, 124, true);
        s += arrow(120, 4, 120, 34, Y, 3, 0.7) + pop(txt(128, 14, "F", Y, 12, "start"), 0.7);
        s += pop(txt(68, 74, t("Druck", "compression"), R, 9, "end") + txt(172, 74, t("Druck", "compression"), R, 9, "start") + txt(120, 113, t("Zug", "tension"), T, 10), 1.1);
        return svg(s, t("Dreiecksfachwerk mit Zug- und Druckstäben", "Triangular truss with members in tension and compression"));
    };
    REG.sfbm = function () {
        var s = rect(30, 22, 180, 6, "rgba(255,255,255,0.1)", W) + support(30, 28) + support(210, 28, true) + arrow(102, 2, 102, 20, Y, 2.4);
        s += ln(30, 74, 210, 74, AX, 1) + txt(20, 78, "Q", T, 11, "end") + drawPath("M30 74 V56 H102 V98 H210 V74", T, 2.4, 0.3);
        s += ln(30, 108, 210, 108, AX, 1) + txt(20, 112, "M", Y, 11, "end") + drawPath("M30 108 L102 136 L210 108", Y, 2.6, 0.9);
        s += pop(dot(102, 136, 4, R, ' class="tv-pulse"') + txt(110, 140, "M<tspan font-size='8' dy='3'>max</tspan>", R, 10, "start"), 1.6);
        return svg(s, t("Querkraft- und Momentenverlauf", "Shear force and bending moment diagram"));
    };
    REG.centroid = function () {
        var s = pop(rect(40, 90, 150, 30, "rgba(245,197,24,0.22)", Y), 0.1) + pop(rect(40, 30, 32, 60, "rgba(53,224,196,0.22)", T), 0.3);
        s += pop(dot(115, 105, 4, Y) + dot(56, 60, 4, T), 0.6) + pop(ln(115, 105, 56, 60, M, 1, ' stroke-dasharray="3 3"'), 0.8);
        var A1 = 150 * 30, A2 = 32 * 60, xs = (A1 * 115 + A2 * 56) / (A1 + A2), ys = (A1 * 105 + A2 * 60) / (A1 + A2);
        s += pop(dot(xs, ys, 6, R, ' class="tv-pulse"') + txt(xs + 10, ys - 8, "S", R, 12, "start"), 1.1);
        s += pop(txt(232, 30, "x<tspan font-size='8' dy='3'>S</tspan><tspan dy='-3'> = ΣA</tspan><tspan font-size='8' dy='3'>i</tspan><tspan dy='-3'>x</tspan><tspan font-size='8' dy='3'>i</tspan><tspan dy='-3'> / ΣA</tspan><tspan font-size='8' dy='3'>i</tspan>", W, 10, "end"), 1.4);
        return svg(s, t("Schwerpunkt einer zusammengesetzten Fläche", "Centroid of a composite area"));
    };

    // ---------- TM 2 ----------
    REG.bar = function () {
        var s = '<rect x="40" y="62" width="140" height="26" fill="rgba(96,165,250,0.18)" stroke="' + B + '" stroke-width="1.6"><animate attributeName="width" values="140;160;140" dur="3s" repeatCount="indefinite"/></rect>';
        s += '<g><animateTransform attributeName="transform" type="translate" values="0 0;20 0;0 0" dur="3s" repeatCount="indefinite"/>' + arrow(182, 75, 222, 75, Y, 3) + txt(212, 66, "F", Y, 12) + "</g>";
        s += arrow(38, 75, 6, 75, Y, 3) + txt(16, 66, "F", Y, 12);
        s += pop(txt(110, 118, "σ = F / A,   ε = Δl / l", W, 11) + txt(110, 136, "σ = E · ε", T, 12), 0.5);
        s += pop(ln(40, 40, 180, 40, M, 1) + txt(110, 34, "l", M, 10), 0.3);
        return svg(s, t("Stab unter Zug", "A bar in tension"));
    };
    REG.thermalbar = function () {
        var s = rect(14, 40, 14, 70, "rgba(255,255,255,0.12)", M) + rect(212, 40, 14, 70, "rgba(255,255,255,0.12)", M);
        s += rect(28, 62, 184, 26, "rgba(233,69,96,0.22)", R);
        for (var i = 0; i < 4; i += 1) s += '<path d="M' + (60 + i * 38) + ' 120 q6 -8 0 -16 q-6 -8 0 -16" fill="none" stroke="' + R + '" stroke-width="1.8" class="tv-pulse" style="animation-delay:' + (i * 0.3) + 's"/>';
        s += arrow(70, 52, 40, 52, Y, 2.6, 0.6) + arrow(170, 52, 200, 52, Y, 2.6, 0.6) + pop(txt(120, 30, t("Wand verhindert Dehnung", "walls block expansion"), M, 10), 0.4);
        s += pop(txt(120, 144, "σ = −E · α · ΔT", W, 12), 0.9);
        return svg(s, t("Eingespannter Stab wird erwärmt", "A constrained bar is heated"));
    };
    REG.section = function () {
        var s = pop(rect(20, 92, 90, 22, "rgba(245,197,24,0.22)", Y) + txt(65, 132, t("flach", "flat"), Y, 10), 0.1);
        s += pop(rect(160, 40, 22, 90, "rgba(53,224,196,0.22)", T) + txt(171, 144, t("hochkant", "on edge"), T, 10), 0.4);
        s += ln(10, 103, 120, 103, M, 1, ' stroke-dasharray="3 3"') + ln(140, 85, 202, 85, M, 1, ' stroke-dasharray="3 3"');
        s += pop(txt(65, 82, "I ∝ h³", W, 11) + txt(214, 60, "×16", R, 14, "middle", ' font-weight="700" class="tv-pulse"'), 0.8);
        s += pop(txt(120, 22, "I = b · h³ / 12", W, 12), 1.1);
        return svg(s, t("Gleicher Querschnitt, flach und hochkant", "The same section flat and on edge"));
    };
    REG.bendstress = function () {
        var s = rect(30, 30, 40, 90, "rgba(255,255,255,0.08)", W) + ln(20, 75, 210, 75, M, 1, ' stroke-dasharray="4 4"') + txt(214, 72, t("neutrale Faser", "neutral axis"), M, 9, "end");
        s += pop('<path d="M110 75 L80 30 L110 30 Z" fill="' + R + '" fill-opacity="0.35" stroke="' + R + '"/>', 0.3) + pop('<path d="M110 75 L140 120 L110 120 Z" fill="' + T + '" fill-opacity="0.35" stroke="' + T + '"/>', 0.6);
        s += pop(txt(76, 26, t("Druck", "compression"), R, 10, "end") + txt(146, 132, t("Zug", "tension"), T, 10, "start"), 0.9);
        s += pop(txt(236, 40, "σ = M·z / I", W, 11, "end"), 1.2);
        return svg(s, t("Lineare Biegespannung über der Höhe", "Linear bending stress over the height"));
    };
    REG.deflect = function () {
        var s = rect(10, 30, 12, 80, "rgba(255,255,255,0.12)", M) + ln(22, 60, 220, 60, M, 1.2, ' stroke-dasharray="4 4"');
        var pts = []; for (var i = 0; i <= 40; i += 1) { var x = i / 40; pts.push((i ? "L" : "M") + r1(22 + 198 * x) + " " + r1(60 + 48 * x * x * (3 - x) / 2)); }
        s += drawPath(pts.join(" "), Y, 4, 0.2) + arrow(220, 120, 220, 140, R, 2.6, 1) + arrow(220, 20, 220, 50, T, 2.6, 0.1) + pop(txt(228, 36, "F", T, 12, "start"), 0.1);
        s += pop(ln(232, 60, 232, 108, R, 1.4) + txt(236, 90, "w", R, 12, "start"), 1.2) + pop(txt(110, 140, "w = F · l³ / (3EI)", W, 11), 1.4);
        return svg(s, t("Durchbiegung eines Kragarms", "Deflection of a cantilever"));
    };
    REG.buckle = function () {
        var s = rect(80, 132, 80, 8, "rgba(255,255,255,0.12)", M) + arrow(120, 2, 120, 24, Y, 3) + txt(130, 12, "F", Y, 12, "start");
        s += ln(120, 28, 120, 132, M, 1.4, ' stroke-dasharray="4 4"');
        s += '<path d="M120 28 Q120 80 120 132" fill="none" stroke="' + R + '" stroke-width="4" stroke-linecap="round"><animate attributeName="d" values="M120 28 Q120 80 120 132;M120 28 Q156 80 120 132;M120 28 Q156 80 120 132;M120 28 Q120 80 120 132" keyTimes="0;0.4;0.8;1" dur="4s" repeatCount="indefinite"/></path>';
        s += pop(txt(230, 60, "F<tspan font-size='8' dy='3'>k</tspan><tspan dy='-3'> = π²EI / l</tspan><tspan font-size='8' dy='3'>k</tspan><tspan font-size='8' dy='-8'>2</tspan>", W, 11, "end"), 0.6);
        return svg(s, t("Knickender Druckstab", "A buckling strut"));
    };

    // ---------- Transformationen ----------
    REG.rot2d = function () {
        var F = frame(-3, 3, -2, 2.6, { L: 40, T: 14, W: 160, H: 118 }), s = F.axes, cx = F.X(0), cy = F.Y(0);
        s += ln(cx, cy, F.X(2.2), F.Y(0.8), M, 2.6) + dot(F.X(2.2), F.Y(0.8), 4, M) + txt(F.X(2.2) + 6, F.Y(0.8) + 4, "p", M, 11, "start");
        s += '<g class="tv-spin" style="transform-origin:' + r1(cx) + "px " + r1(cy) + 'px;animation-duration:6s">' + ln(cx, cy, F.X(2.2), F.Y(0.8), Y, 3) + dot(F.X(2.2), F.Y(0.8), 5, Y) + "</g>";
        s += pop(txt(232, 24, "p′ = R(θ) · p", W, 11, "end"), 0.5);
        return svg(s, t("Ein Vektor dreht sich um den Ursprung", "A vector rotating about the origin"));
    };
    REG.rot3d = function () {
        var O = [110, 95], ex = [70, 20], ey = [-55, 22], ez = [0, -75], P3 = function (x, y, z) { return [O[0] + ex[0] * x + ey[0] * y + ez[0] * z, O[1] + ex[1] * x + ey[1] * y + ez[1] * z]; };
        var s = "", ax = [["x", 1.3, 0, 0], ["y", 0, 1.3, 0], ["z", 0, 0, 1.2]];
        ax.forEach(function (a) { var p = P3(a[1], a[2], a[3]); s += arrow(O[0], O[1], p[0], p[1], a[0] === "z" ? T : AX, a[0] === "z" ? 2.4 : 1.6) + txt(p[0] + 6, p[1], a[0], a[0] === "z" ? T : M, 11, "start"); });
        var path = ""; for (var i = 0; i <= 48; i += 1) { var th = i / 48 * 2 * Math.PI, p = P3(0.8 * Math.cos(th), 0.8 * Math.sin(th), 0.7); path += (i ? "L" : "M") + r1(p[0]) + " " + r1(p[1]); }
        s += '<path d="' + path + '" fill="none" stroke="' + Y + '" stroke-width="1.2" stroke-dasharray="3 4"/>' + moving(path, Y, 5, 5);
        s += pop(txt(232, 140, t("z-Komponente bleibt gleich", "z component stays the same"), W, 10, "end"), 0.6);
        return svg(s, t("Drehung um die z-Achse im Raum", "Rotation about the z-axis in space"));
    };
    function frameGlyph(x, y, ang, col, name) {
        var c = Math.cos(ang), s = Math.sin(ang);
        return arrow(x, y, x + 36 * c, y - 36 * s, col, 2.4) + arrow(x, y, x - 36 * s, y - 36 * c, col, 2.4) + txt(x - 8, y + 14, name, col, 11);
    }
    REG.frames = function () {
        var s = frameGlyph(40, 125, 0, M, "A") + pop(frameGlyph(160, 70, 0.6, Y, "B"), 0.4);
        s += arrow(40, 125, 156, 73, T, 2, 0.8) + pop(txt(96, 112, "p", T, 12), 0.9) + pop(dot(205, 40, 4, R) + txt(212, 36, t("Punkt", "point"), R, 10, "start"), 1.1);
        s += pop(txt(232, 140, "p<tspan font-size='8' dy='3'>A</tspan><tspan dy='-3'> = R · p</tspan><tspan font-size='8' dy='3'>B</tspan><tspan dy='-3'> + p</tspan>", W, 11, "end"), 1.3);
        return svg(s, t("Zwei Koordinatensysteme, gedreht und verschoben", "Two frames, rotated and translated"));
    };
    REG.chain = function () {
        var s = frameGlyph(30, 125, 0, M, "A") + pop(frameGlyph(110, 95, 0.5, Y, "B"), 0.3) + pop(frameGlyph(190, 50, 1.2, T, "C"), 0.6);
        s += arrow(34, 120, 104, 98, Y, 1.8, 0.4) + arrow(114, 92, 184, 54, T, 1.8, 0.7) + pop('<path d="M34 118 Q60 40 182 48" fill="none" stroke="' + R + '" stroke-width="2" stroke-dasharray="5 4"/>', 1);
        s += pop(txt(64, 102, "T<tspan font-size='8' dy='3'>AB</tspan>", Y, 11) + txt(156, 88, "T<tspan font-size='8' dy='3'>BC</tspan>", T, 11) + txt(80, 46, "T<tspan font-size='8' dy='3'>AC</tspan><tspan dy='-3'> = T</tspan><tspan font-size='8' dy='3'>AB</tspan><tspan dy='-3'>T</tspan><tspan font-size='8' dy='3'>BC</tspan>", R, 11), 1.2);
        return svg(s, t("Verkettete Transformationen", "Chained transformations"));
    };
    REG.inverse = function () {
        var s = frameGlyph(45, 120, 0, M, "A") + frameGlyph(175, 60, 0.7, Y, "B");
        s += pop('<path d="M52 108 Q100 50 166 58" fill="none" stroke="' + T + '" stroke-width="2.2"/>', 0.3) + pop('<path d="M168 72 Q120 130 56 122" fill="none" stroke="' + R + '" stroke-width="2.2" stroke-dasharray="5 4"/>', 0.7);
        s += pop(txt(96, 54, "T", T, 12) + txt(130, 128, "T⁻¹", R, 12), 0.9) + pop(txt(232, 22, "R⁻¹ = Rᵀ", W, 12, "end"), 1.2);
        return svg(s, t("Hin- und Rücktransformation", "Forward and inverse transformation"));
    };
    REG.robotarm = function () {
        var s = rect(45, 122, 50, 10, "rgba(255,255,255,0.12)", M) + dot(70, 122, 7, M);
        s += '<g><animateTransform attributeName="transform" type="rotate" values="-30 70 122;-70 70 122;-30 70 122" dur="5s" repeatCount="indefinite"/>' + ln(70, 122, 145, 122, Y, 6) + dot(145, 122, 6, W);
        s += '<g><animateTransform attributeName="transform" type="rotate" values="45 145 122;90 145 122;45 145 122" dur="5s" repeatCount="indefinite"/>' + ln(145, 122, 200, 122, T, 5) + '<path d="M200 114 h10 M200 130 h10 M200 114 v16" stroke="' + R + '" stroke-width="2.4" fill="none"/></g></g>';
        s += pop(txt(10, 22, "θ₁", Y, 12, "start") + txt(10, 40, "θ₂", T, 12, "start"), 0.3) + pop(txt(236, 146, "x = l₁cos θ₁ + l₂cos(θ₁+θ₂)", W, 9, "end"), 0.6);
        return svg(s, t("Zweigelenkiger Roboterarm", "Two-joint robot arm"));
    };

    // ---------- PID ----------
    REG.loop = function () {
        var s = dot(50, 60, 9, "none", ' stroke="' + W + '" stroke-width="1.6"') + txt(50, 64, "−", W, 12);
        s += arrow(6, 60, 39, 60, W, 1.8) + txt(10, 52, "w", Y, 12, "start");
        s += rect(78, 44, 56, 32, "rgba(245,197,24,0.14)", Y) + txt(106, 64, t("Regler", "control"), Y, 10) + arrow(60, 60, 76, 60, W, 1.8) + txt(68, 52, "e", R, 11);
        s += rect(158, 44, 56, 32, "rgba(53,224,196,0.14)", T) + txt(186, 64, t("Strecke", "plant"), T, 10) + arrow(134, 60, 156, 60, W, 1.8) + txt(145, 52, "u", W, 11);
        s += arrow(214, 60, 238, 60, W, 1.8) + txt(232, 52, "y", B, 12) + '<path d="M226 60 V112 H50 V72" fill="none" stroke="' + M + '" stroke-width="1.6"/>' + arrow(50, 80, 50, 70, M, 1.6);
        s += moving("M6 60 H214 M226 60 V112 H50 V70", R, 4, 4);
        s += pop(txt(120, 140, "e = w − y", W, 12), 0.5);
        return svg(s, t("Geschlossener Regelkreis", "Closed control loop"));
    };
    REG.pstep = function () {
        var F = frame(0, 10, 0, 1.25), s = F.axes;
        s += ln(F.X(0), F.Y(1), F.X(10), F.Y(1), Y, 1.6, ' stroke-dasharray="5 4"') + txt(F.X(10), F.Y(1) - 6, "w", Y, 11, "end");
        s += drawPath(fnPath(function (x) { return 0.75 * (1 - Math.exp(-x / 1.4)); }, 0, 10, F), T, 3, 0.2);
        s += pop(ln(F.X(8.5), F.Y(1), F.X(8.5), F.Y(0.75), R, 2.2) + txt(F.X(8.5) - 6, F.Y(0.87), "e<tspan font-size='8' dy='3'>∞</tspan>", R, 12, "end"), 1.3);
        return svg(s, t("Sprungantwort mit bleibender Abweichung", "Step response with steady-state error"));
    };
    REG.iarea = function () {
        var F = frame(0, 10, -0.3, 1.1), s = F.axes, f = function (x) { return Math.exp(-x / 2.5) * Math.cos(x * 1.2); }, pts = [];
        for (var i = 0; i <= 80; i += 1) { var x = i / 8; pts.push(r1(F.X(x)) + "," + r1(F.Y(f(x)))); }
        s += pop('<polygon points="' + r1(F.X(0)) + "," + r1(F.Y(0)) + " " + pts.join(" ") + " " + r1(F.X(10)) + "," + r1(F.Y(0)) + '" fill="' + T + '" fill-opacity="0.3"/>', 0.8);
        s += drawPath(fnPath(f, 0, 10, F), Y, 2.6, 0.1) + pop(txt(F.X(9.6), F.Y(0.95), "u<tspan font-size='8' dy='3'>I</tspan><tspan dy='-3'> ∝ ∫ e dt</tspan>", W, 11, "end"), 1.2) + txt(F.X(0.4), F.Y(1.02), "e(t)", Y, 11, "start");
        return svg(s, t("Fläche unter der Regelabweichung", "Area under the error"));
    };
    REG.dslope = function () {
        var F = frame(0, 10, -0.2, 1.2), s = F.axes, f = function (x) { return 1 - 1 / (1 + Math.exp(-(x - 4))); }, pd = fnPath(f, 0, 10, F);
        s += drawPath(pd, Y, 2.6, 0.1) + '<g><line x1="-30" y1="0" x2="30" y2="0" stroke="' + T + '" stroke-width="2.4" stroke-linecap="round"/><circle r="4" fill="' + R + '"/><animateMotion dur="5s" repeatCount="indefinite" rotate="auto" path="' + pd + '"/></g>';
        s += pop(txt(232, 24, "u<tspan font-size='8' dy='3'>D</tspan><tspan dy='-3'> = K</tspan><tspan font-size='8' dy='3'>D</tspan><tspan dy='-3'> · de/dt</tspan>", W, 11, "end"), 0.6);
        return svg(s, t("Steigung der Regelabweichung", "Slope of the error"));
    };
    REG.pidsum = function () {
        var s = ln(30, 120, 210, 120, AX, 1.2), parts = [["P", 46, Y], ["I", 28, T], ["D", -14, R]], y = 120;
        parts.forEach(function (p, i) { var h = p[1]; s += '<rect class="tv-grow" x="' + (40 + i * 46) + '" y="' + (h > 0 ? 120 - h : 120) + '" width="30" height="' + Math.abs(h) + '" fill="' + p[2] + '" fill-opacity="0.8" style="animation-delay:' + (i * 0.25) + 's"/>' + txt(55 + i * 46, 136, p[0], p[2], 11); });
        s += pop(txt(186, 120 - 60 - 6, "u", W, 12) + '<rect x="176" y="60" width="20" height="60" fill="' + W + '" fill-opacity="0.3" stroke="' + W + '"/>', 1);
        s += pop(txt(120, 24, "u = u<tspan font-size='8' dy='3'>P</tspan><tspan dy='-3'> + u</tspan><tspan font-size='8' dy='3'>I</tspan><tspan dy='-3'> + u</tspan><tspan font-size='8' dy='3'>D</tspan>", W, 12), 1.2);
        return svg(s, t("Die drei Anteile addieren sich", "The three terms add up"));
    };
    REG.zn = function () {
        var F = frame(0, 10, -1.2, 1.2), s = F.axes;
        s += drawPath(fnPath(function (x) { return Math.sin(x * 2 * Math.PI / 3); }, 0, 10, F, 120), T, 2.6, 0.1);
        s += pop(ln(F.X(0.75), F.Y(1.1), F.X(3.75), F.Y(1.1), Y, 1.6) + ln(F.X(0.75), F.Y(1.05), F.X(0.75), F.Y(1.15), Y, 1.6) + ln(F.X(3.75), F.Y(1.05), F.X(3.75), F.Y(1.15), Y, 1.6) + txt(F.X(2.25), F.Y(1.1) - 6, "T<tspan font-size='8' dy='3'>u</tspan>", Y, 11), 1);
        s += pop(txt(232, 146, t("bei K", "at K") + "<tspan font-size='8' dy='3'>P</tspan><tspan dy='-3'> = K</tspan><tspan font-size='8' dy='3'>u</tspan>", W, 10, "end"), 1.2);
        return svg(s, t("Dauerschwingung beim Schwingversuch", "Sustained oscillation in the tuning test"));
    };

    // ---------- Thermodynamik ----------
    REG.heatcap = function () {
        var s = rect(86, 20, 22, 104, "rgba(255,255,255,0.06)", W) + dot(97, 130, 14, R);
        s += '<rect x="91" y="80" width="12" height="50" fill="' + R + '"><animate attributeName="y" values="104;40;104" dur="5s" repeatCount="indefinite"/><animate attributeName="height" values="26;90;26" dur="5s" repeatCount="indefinite"/></rect>';
        for (var i = 0; i < 6; i += 1) s += ln(108, 34 + i * 16, 116, 34 + i * 16, M, 1);
        s += '<path d="M30 140 q8 -10 0 -20 q-8 -10 0 -20" fill="none" stroke="' + Y + '" stroke-width="2.4" class="tv-pulse"/>' + arrow(42, 110, 76, 92, Y, 2.4) + txt(26, 86, "Q", Y, 13);
        s += pop(txt(236, 64, "Q = m · c · ΔT", W, 12, "end") + txt(236, 88, t("Wasser:", "Water:"), M, 9, "end") + txt(236, 102, "c = " + t("4,19", "4.19") + " kJ/(kg·K)", M, 9, "end"), 0.5);
        return svg(s, t("Wärmezufuhr erhöht die Temperatur", "Adding heat raises the temperature"));
    };
    REG.gas = function () {
        var s = '<path d="M14 30 V130 H144 V30" fill="none" stroke="' + W + '" stroke-width="2.4"/>';
        s += '<g><animateTransform attributeName="transform" type="translate" values="0 0;0 26;0 0" dur="4s" repeatCount="indefinite"/>' + rect(16, 30, 126, 10, "rgba(255,255,255,0.3)", W) + ln(79, 30, 79, 6, W, 3) + "</g>";
        for (var i = 0; i < 14; i += 1) { var x0 = 26 + (i * 37) % 108, y0 = 70 + (i * 23) % 52; s += '<circle r="4" fill="' + (i % 2 ? T : B) + '"><animateMotion dur="' + (1.4 + (i % 5) * 0.3).toFixed(1) + 's" repeatCount="indefinite" path="M' + x0 + " " + y0 + " L" + (x0 + 30 > 134 ? x0 - 30 : x0 + 30) + " " + (y0 + 18 > 124 ? y0 - 18 : y0 + 18) + " Z" + '"/></circle>'; }
        s += pop(txt(194, 70, "p·V = n·R·T", W, 11, "middle") + txt(194, 92, t("T in Kelvin", "T in kelvin"), Y, 10), 0.4);
        return svg(s, t("Gas im Zylinder mit Kolben", "Gas in a cylinder with piston"));
    };
    REG.firstlaw = function () {
        var s = rect(80, 40, 90, 70, "rgba(96,165,250,0.12)", B) + txt(125, 80, "ΔU", W, 14);
        s += arrow(10, 75, 76, 75, R, 4, 0.2) + pop(txt(36, 66, "Q", R, 13), 0.2) + arrow(174, 75, 236, 75, T, 4, 0.6) + pop(txt(206, 66, "W", T, 13), 0.6);
        s += pop(txt(125, 138, "ΔU = Q − W", W, 13, "middle", ' font-weight="700"'), 1);
        return svg(s, t("Energiebilanz eines Systems", "Energy balance of a system"));
    };
    REG.carnot = function () {
        var s = rect(40, 8, 160, 26, "rgba(233,69,96,0.3)", R) + txt(120, 26, t("warm", "hot") + " T<tspan font-size='8' dy='3'>w</tspan>", W, 11);
        s += rect(40, 120, 160, 26, "rgba(96,165,250,0.3)", B) + txt(120, 138, t("kalt", "cold") + " T<tspan font-size='8' dy='3'>k</tspan>", W, 11);
        s += dot(120, 77, 22, "rgba(255,255,255,0.08)", ' stroke="' + W + '" stroke-width="1.6"');
        s += '<g class="tv-spin" style="transform-origin:120px 77px;animation-duration:4s">' + ln(120, 62, 120, 92, M, 2) + ln(105, 77, 135, 77, M, 2) + "</g>";
        s += arrow(120, 36, 120, 54, R, 7, 0.2) + arrow(120, 100, 120, 118, B, 4, 0.6) + arrow(144, 77, 200, 77, Y, 4, 0.9) + pop(txt(206, 81, "W", Y, 12, "start"), 0.9);
        s += pop(txt(236, 108, "η<tspan font-size='8' dy='3'>C</tspan><tspan dy='-3'> = 1 − T</tspan><tspan font-size='8' dy='3'>k</tspan><tspan dy='-3'>/T</tspan><tspan font-size='8' dy='3'>w</tspan>", W, 9, "end"), 1.2);
        return svg(s, t("Wärmekraftmaschine zwischen zwei Temperaturen", "Heat engine between two temperatures"));
    };
    REG.wall = function () {
        var s = rect(70, 20, 40, 120, "rgba(245,197,24,0.25)", Y) + rect(110, 20, 60, 120, "rgba(53,224,196,0.18)", T);
        s += drawPath("M20 34 H70 L110 56 L170 118 H222", R, 3, 0.2);
        s += pop(txt(20, 28, "T<tspan font-size='8' dy='3'>" + t("innen", "in") + "</tspan>", R, 11, "start") + txt(222, 112, "T<tspan font-size='8' dy='3'>" + t("außen", "out") + "</tspan>", R, 11, "end"), 0.8);
        for (var i = 0; i < 3; i += 1) s += arrow(30, 70 + i * 22, 60, 70 + i * 22, W, 1.8, 1 + i * 0.15);
        s += pop(txt(140, 150, "R = d / (λ · A)", W, 10), 1.3);
        return svg(s, t("Temperaturverlauf durch eine zweischichtige Wand", "Temperature profile through a two-layer wall"));
    };
    REG.radiation = function () {
        var s = dot(70, 88, 30, R, ' class="tv-pulse"') + dot(70, 88, 20, "#ffb199");
        for (var i = 0; i < 6; i += 1) { var a = -0.75 + i * 0.3, x1 = 70 + 38 * Math.cos(a), y1 = 88 + 38 * Math.sin(a), x2 = 70 + 92 * Math.cos(a), y2 = 88 + 92 * Math.sin(a); s += '<path d="M' + r1(x1) + " " + r1(y1) + " L" + r1(x2) + " " + r1(y2) + '" stroke="' + Y + '" stroke-width="2" stroke-dasharray="4 5"><animate attributeName="stroke-dashoffset" values="18;0" dur="0.8s" repeatCount="indefinite"/></path>'; }
        s += '<path d="M55 50 q-6 -10 0 -20 q6 -10 0 -20" fill="none" stroke="' + T + '" stroke-width="2.2" class="tv-pulse"/><path d="M85 50 q-6 -10 0 -20 q6 -10 0 -20" fill="none" stroke="' + T + '" stroke-width="2.2" class="tv-pulse" style="animation-delay:0.4s"/>';
        s += pop(txt(232, 140, "Q̇ ∝ T⁴", W, 13, "end", ' font-weight="700"'), 0.6) + pop(txt(110, 18, t("Konvektion", "convection"), T, 10, "start") + txt(10, 146, t("Strahlung ↗", "radiation ↗"), Y, 10, "start"), 0.9);
        return svg(s, t("Heißer Körper gibt Wärme ab", "A hot body losing heat"));
    };

    // ---------- Statistik ----------
    REG.spread = function () {
        var vals = [2.1, 3.4, 3.9, 4.6, 5.0, 5.8, 7.2], mean = 4.571, sd = 1.6, F = frame(0, 9, 0, 1, { L: 20, T: 20, W: 200, H: 100 }), s = ln(F.X(0), F.Y(0.3), F.X(9), F.Y(0.3), AX, 1.2);
        vals.forEach(function (v, i) { s += pop(dot(F.X(v), F.Y(0.3), 6, B), i * 0.1); });
        s += pop(ln(F.X(mean), F.Y(0.95), F.X(mean), F.Y(0.1), Y, 2.4) + txt(F.X(mean), F.Y(1) - 2, "x̄", Y, 12), 0.9);
        s += pop('<rect x="' + r1(F.X(mean - sd)) + '" y="' + r1(F.Y(0.7)) + '" width="' + r1(F.X(mean + sd) - F.X(mean - sd)) + '" height="' + r1(F.Y(0.45) - F.Y(0.7)) + '" fill="' + T + '" fill-opacity="0.25" stroke="' + T + '"/>' + txt(F.X(mean + sd) + 4, F.Y(0.55), "± s", T, 11, "start"), 1.3);
        return svg(s, t("Messwerte mit Mittelwert und Standardabweichung", "Data with mean and standard deviation"));
    };
    REG.binom = function () {
        var nn = 10, p = 0.3, v = [], c = 1; for (var k = 0; k <= nn; k += 1) { if (k) c = c * (nn - k + 1) / k; v.push(c * Math.pow(p, k) * Math.pow(1 - p, nn - k)); }
        return svg(bars(v, B, "n = 10, p = " + t("0,3", "0.3")), t("Binomialverteilung", "Binomial distribution"));
    };
    REG.poisson = function () {
        var lam = 2.5, v = [], f = 1; for (var k = 0; k <= 10; k += 1) { if (k) f *= k; v.push(Math.pow(lam, k) * Math.exp(-lam) / f); }
        return svg(bars(v, T, "λ = " + t("2,5", "2.5")), t("Poisson-Verteilung", "Poisson distribution"));
    };
    REG.gauss = function () {
        var F = frame(-3.5, 3.5, 0, 0.45), s = F.axes, g = function (x) { return Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI); }, pts = [];
        for (var i = 0; i <= 40; i += 1) { var x = -1 + i / 20; pts.push(r1(F.X(x)) + "," + r1(F.Y(g(x)))); }
        s += pop('<polygon points="' + r1(F.X(-1)) + "," + r1(F.Y(0)) + " " + pts.join(" ") + " " + r1(F.X(1)) + "," + r1(F.Y(0)) + '" fill="' + Y + '" fill-opacity="0.35"/>', 0.8);
        s += drawPath(fnPath(g, -3.5, 3.5, F, 80), T, 2.6, 0.1) + pop(txt(F.X(0), F.Y(0.12), t("68,3 %", "68.3%"), W, 11), 1.1);
        s += pop(txt(F.X(-1), F.Y(0) + 12, "μ−σ", M, 9) + txt(F.X(1), F.Y(0) + 12, "μ+σ", M, 9) + txt(F.X(0), F.Y(0) + 12, "μ", M, 9), 1.2);
        return svg(s, t("Normalverteilung mit Bereich μ ± σ", "Normal distribution with the range μ ± σ"));
    };
    REG.expdist = function () {
        var F = frame(0, 5, 0, 1.1), s = F.axes, f = function (x) { return Math.exp(-x); }, pts = [];
        for (var i = 0; i <= 30; i += 1) { var x = 1.5 + i / 30 * 3.5; pts.push(r1(F.X(x)) + "," + r1(F.Y(f(x)))); }
        s += pop('<polygon points="' + r1(F.X(1.5)) + "," + r1(F.Y(0)) + " " + pts.join(" ") + " " + r1(F.X(5)) + "," + r1(F.Y(0)) + '" fill="' + R + '" fill-opacity="0.35"/>', 0.8);
        s += drawPath(fnPath(f, 0, 5, F), Y, 2.6, 0.1) + pop(txt(F.X(2.6), F.Y(0.45), "P(T > t) = e<tspan font-size='8' dy='-5'>−λt</tspan>", W, 11, "start"), 1.1) + pop(txt(F.X(1.5), F.Y(0) + 12, "t", M, 10), 1);
        return svg(s, t("Exponentialverteilung", "Exponential distribution"));
    };
    REG.bayestree = function () {
        var s = dot(24, 75, 5, W) + drawPath("M24 75 L94 32 M24 75 L94 118", M, 1.8, 0.1) + drawPath("M100 32 L170 14 M100 32 L170 50 M100 118 L170 100 M100 118 L170 136", AX, 1.4, 0.5);
        s += txt(98, 26, t("krank", "sick"), R, 10, "end") + txt(98, 132, t("gesund", "healthy"), T, 10, "end");
        s += pop(txt(176, 18, "+ " + t("richtig", "true"), R, 10, "start") + txt(176, 104, "+ " + t("falsch", "false"), Y, 10, "start") + txt(176, 54, "−", M, 10, "start") + txt(176, 140, "−", M, 10, "start"), 0.9);
        s += pop(drawPath("M24 75 L94 32 L170 14", R, 3.4, 1.2) + drawPath("M24 75 L94 118 L170 100", Y, 3.4, 1.4), 1.2);
        s += pop(txt(120, 78, "P(K|+) = " + t("richtig", "true") + "+ / (" + t("alle", "all") + " +)", W, 9), 1.8);
        return svg(s.replace("P(K|+)", t("P(K|+)", "P(S|+)")), t("Baumdiagramm für einen Test", "Tree diagram for a test"));
    };

    Object.keys(REG).forEach(function (k) { VIS.register(k, REG[k]); });
})(typeof window !== "undefined" ? window : globalThis);
