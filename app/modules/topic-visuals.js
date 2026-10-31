/*
 * SOR Themen-Grafiken
 * ------------------------------------------------------------
 * Kleine, animierte SVG-Illustrationen pro Thema. Jede Grafik ist eine
 * reine Funktion, die einen SVG-String liefert (testbar ohne DOM).
 *
 *   SOR_VISUALS.render(key)          -> SVG-String (oder "" bei unbekanntem Key)
 *   SOR_VISUALS.mount(element, key)  -> rendert, startet Animation beim Sichtbarwerden
 *   SOR_VISUALS.replay(element)      -> spielt die Einblend-Animation erneut ab
 *   SOR_VISUALS.keys                 -> Liste aller Keys
 *
 * Animationsarten:
 *   .tv-d  Linie zeichnet sich (pathLength = 1), einmal beim Einblenden
 *   .tv-p  Element erscheint, einmal beim Einblenden (Verzögerung per style)
 *   .tv-spin / .tv-pulse / .tv-rock / SMIL animateMotion  laufen dauerhaft, ruhig
 * prefers-reduced-motion zeigt alles statisch und vollständig.
 */
(function (root) {
    "use strict";

    var Y = "#f5c518", T = "#35e0c4", R = "#e94560", B = "#60a5fa", P = "#8b5cf6", M = "#98a2bd", AX = "rgba(238,241,247,0.32)", GR = "rgba(238,241,247,0.07)";

    function n(v) { return Math.round(v * 10) / 10; }
    function d(delay) { return delay ? ' style="animation-delay:' + delay + 's"' : ""; }
    function svg(body, label) {
        return '<svg class="tv" viewBox="0 0 240 150" role="img" aria-label="' + label + '" xmlns="http://www.w3.org/2000/svg">' + body + "</svg>";
    }
    function ln(x1, y1, x2, y2, c, w, extra) {
        return '<line x1="' + n(x1) + '" y1="' + n(y1) + '" x2="' + n(x2) + '" y2="' + n(y2) + '" stroke="' + c + '" stroke-width="' + (w || 1.5) + '" stroke-linecap="round"' + (extra || "") + "/>";
    }
    function drawPath(dd, c, w, delay, extra) {
        return '<path class="tv-d" pathLength="1" d="' + dd + '" fill="none" stroke="' + c + '" stroke-width="' + (w || 2.4) + '" stroke-linecap="round" stroke-linejoin="round"' + d(delay) + (extra || "") + "/>";
    }
    function txt(x, y, s, c, size, anchor, extra) {
        return '<text x="' + n(x) + '" y="' + n(y) + '"' + (c ? ' fill="' + c + '"' : "") + (size ? ' font-size="' + size + '"' : "") + ' text-anchor="' + (anchor || "middle") + '"' + (extra || "") + ">" + s + "</text>";
    }
    function pop(inner, delay) { return '<g class="tv-p"' + d(delay) + ">" + inner + "</g>"; }
    function dot(x, y, r, c, extra) { return '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="' + r + '" fill="' + c + '"' + (extra || "") + "/>"; }

    // Koordinatensystem: Weltkoordinaten [x0,x1] x [y0,y1] auf Rechteck (L,Tp,W,H)
    function frame(x0, x1, y0, y1, box) {
        box = box || { L: 26, T: 14, W: 200, H: 118 };
        var X = function (x) { return box.L + (x - x0) / (x1 - x0) * box.W; };
        var Yf = function (y) { return box.T + box.H - (y - y0) / (y1 - y0) * box.H; };
        var ax = "";
        var yZero = Math.min(Math.max(Yf(0), box.T), box.T + box.H), xZero = Math.min(Math.max(X(0), box.L), box.L + box.W);
        ax += ln(box.L - 4, yZero, box.L + box.W + 6, yZero, AX, 1.2);
        ax += ln(xZero, box.T - 4, xZero, box.T + box.H + 4, AX, 1.2);
        ax += '<path d="M' + n(box.L + box.W + 8) + " " + n(yZero) + " l-6 -3 v6 z" + '" fill="' + AX + '"/>';
        ax += '<path d="M' + n(xZero) + " " + n(box.T - 6) + " l-3 6 h6 z" + '" fill="' + AX + '"/>';
        return { X: X, Y: Yf, axes: ax, box: box };
    }
    function fnPath(f, a, b, F, steps) {
        steps = steps || 60;
        var s = "";
        for (var i = 0; i <= steps; i += 1) {
            var x = a + (b - a) * i / steps, y = f(x);
            s += (i ? "L" : "M") + n(F.X(x)) + " " + n(F.Y(y));
        }
        return s;
    }
    function moving(pathD, c, r, dur) {
        return '<circle r="' + (r || 4.5) + '" fill="' + c + '"><animateMotion dur="' + (dur || 4) + 's" repeatCount="indefinite" path="' + pathD + '"/></circle>';
    }

    var V = {};

    V.numberline = function () {
        var x = function (k) { return 22 + k * 10; }, s = ln(18, 100, 226, 100, AX, 1.5);
        for (var k = 0; k <= 20; k += 1) s += ln(x(k), 96, x(k), k % 5 ? 104 : 108, AX, 1);
        [0, 5, 10, 15, 20].forEach(function (k) { s += txt(x(k), 122, k, M, 10); });
        var a1 = "M" + x(7) + " 96 Q" + x(8.5) + " 58 " + x(10) + " 96", a2 = "M" + x(10) + " 96 Q" + x(11) + " 66 " + x(12) + " 96";
        s += drawPath(a1, Y, 2.4, 0.2) + drawPath(a2, T, 2.4, 1.1);
        s += pop(txt(x(8.5), 52, "+3", Y, 12), 0.8) + pop(txt(x(11), 60, "+2", T, 12), 1.6);
        s += dot(x(7), 100, 4.5, Y) + pop(dot(x(12), 100, 5.5, R, ' class="tv-pulse"'), 1.9);
        s += pop(txt(x(12), 140, "12", R, 12), 1.9);
        return svg(s, "Zahlenstrahl: 7 plus 5 in zwei Sprüngen");
    };

    V.tens = function () {
        var s = "", i, j;
        for (i = 0; i < 3; i += 1) for (j = 0; j < 10; j += 1) s += pop('<rect x="' + (24 + i * 18) + '" y="' + (18 + j * 11) + '" width="14" height="9" rx="2" fill="' + Y + '"/>', 0.05 * (i * 10 + j) * 0.4);
        for (j = 0; j < 8; j += 1) s += pop('<rect x="' + 84 + '" y="' + (18 + (j + 2) * 11) + '" width="14" height="9" rx="2" fill="' + Y + '" opacity="0.6"/>', 0.9 + j * 0.04);
        for (j = 0; j < 2; j += 1) s += pop('<rect x="' + 84 + '" y="' + (18 + j * 11) + '" width="14" height="9" rx="2" fill="' + T + '"/>', 1.4 + j * 0.15);
        for (j = 0; j < 5; j += 1) s += pop('<rect x="' + 112 + '" y="' + (18 + (j + 5) * 11) + '" width="14" height="9" rx="2" fill="' + T + '"/>', 1.8 + j * 0.12);
        s += txt(186, 62, "38 + 7", M, 13) + pop(txt(186, 88, "= 45", Y, 16, "middle", ' font-weight="700"'), 2.4);
        return svg(s, "Zehnerstangen: 38 plus 7 gleich 45");
    };

    V.dots = function () {
        var s = "", r, c;
        for (r = 0; r < 3; r += 1) for (c = 0; c < 4; c += 1) s += pop(dot(40 + c * 26, 40 + r * 30, 9, [Y, T, B][r]), (r * 4 + c) * 0.12);
        for (r = 0; r < 3; r += 1) s += pop(txt(150, 44 + r * 30, "4", M, 12), 0.5 + r * 0.45);
        s += pop(txt(196, 74, "3 · 4", "#eef1f7", 16, "middle", ' font-weight="700"'), 1.6) + pop(txt(196, 98, "= 12", Y, 16, "middle", ' font-weight="700"'), 1.9);
        return svg(s, "Punktefeld mit 3 Reihen zu je 4 Punkten");
    };

    V.shapes = function () {
        var s = drawPath("M60 40 a26 26 0 1 0 0.1 0", Y, 2.6, 0.1);
        s += drawPath("M120 30 L148 82 L92 82 Z", T, 2.6, 0.6);
        s += drawPath("M166 34 h48 v48 h-48 Z", R, 2.6, 1.1);
        s += txt(60, 112, "Kreis", M, 10) + txt(120, 112, "Dreieck", M, 10) + txt(190, 112, "Quadrat", M, 10);
        s += pop(txt(60, 128, "0 Ecken", Y, 10), 0.5) + pop(txt(120, 128, "3 Ecken", T, 10), 1) + pop(txt(190, 128, "4 Ecken", R, 10), 1.5);
        return svg(s, "Kreis, Dreieck und Quadrat");
    };

    V.pattern = function () {
        var s = "";
        [2, 4, 6, 8].forEach(function (h, i) {
            for (var k = 0; k < h; k += 1) s += pop('<rect x="' + (34 + i * 42) + '" y="' + (118 - (k + 1) * 11) + '" width="26" height="9" rx="2" fill="' + (i === 3 ? R : Y) + '" opacity="' + (i === 3 ? 0.9 : 0.85) + '"/>', i * 0.5 + k * 0.05);
            s += pop(txt(47 + i * 42, 136, h, i === 3 ? R : M, 12), i * 0.5 + 0.3);
        });
        s += pop(txt(214, 70, "+2", T, 14, "middle", ' class="tv-pulse"'), 1.8);
        return svg(s, "Muster: 2, 4, 6, 8");
    };

    V.clock = function () {
        var s = '<circle cx="80" cy="75" r="50" fill="none" stroke="' + AX + '" stroke-width="2"/>';
        for (var h = 0; h < 12; h += 1) {
            var a = h * Math.PI / 6;
            s += ln(80 + Math.sin(a) * 43, 75 - Math.cos(a) * 43, 80 + Math.sin(a) * 48, 75 - Math.cos(a) * 48, M, h % 3 ? 1 : 2.2);
        }
        s += '<g class="tv-spin" style="transform-origin:80px 75px;animation-duration:24s">' + ln(80, 75, 80, 48, Y, 3.4) + "</g>";
        s += '<g class="tv-spin" style="transform-origin:80px 75px;animation-duration:2s">' + ln(80, 75, 80, 34, T, 2) + "</g>";
        s += dot(80, 75, 3.5, "#eef1f7");
        s += pop(txt(186, 60, "1 h = 60 min", "#eef1f7", 12), 0.3) + pop(txt(186, 82, "1 € = 100 ct", M, 12), 0.7) + pop(txt(186, 104, "1 m = 100 cm", M, 12), 1.1);
        return svg(s, "Uhr mit laufendem Minutenzeiger");
    };

    V.column = function () {
        var s = '<g font-size="22" font-family="IBM Plex Mono,monospace">';
        s += txt(150, 46, "4 5 6", "#eef1f7", 22, "end") + txt(150, 76, "2 7 8", "#eef1f7", 22, "end") + txt(84, 76, "+", Y, 22, "end");
        s += "</g>" + drawPath("M84 88 H156", AX, 2, 0.2);
        s += pop(txt(122, 100, "1", R, 11), 0.6) + pop(txt(135.5, 100, "1", R, 11), 1.1);
        s += pop(txt(150, 124, "7 3 4", Y, 22, "end", ' font-weight="700"'), 1.6);
        s += pop(txt(206, 70, "von rechts", M, 10), 0.4) + pop(txt(206, 84, "nach links", M, 10), 0.4);
        return svg(s, "Schriftliche Addition 456 plus 278");
    };

    V.multiply = function () {
        var s = "";
        s += '<rect x="30" y="26" width="115" height="70" fill="' + Y + '" opacity="0.18"/>' ;
        s += pop('<rect x="30" y="26" width="115" height="70" fill="none" stroke="' + Y + '" stroke-width="2"/>', 0.1);
        s += pop('<rect x="145" y="26" width="46" height="70" fill="' + T + '" opacity="0.22" stroke="' + T + '" stroke-width="2"/>', 0.7);
        s += txt(87.5, 18, "10", M, 11) + txt(168, 18, "4", M, 11) + txt(20, 65, "23", M, 11, "end");
        s += pop(txt(87.5, 66, "230", Y, 15, "middle", ' font-weight="700"'), 0.5) + pop(txt(168, 66, "92", T, 15, "middle", ' font-weight="700"'), 1.0);
        s += pop(txt(120, 126, "23 · 14 = 230 + 92 = 322", "#eef1f7", 13), 1.5);
        return svg(s, "23 mal 14 als Rechteck in zwei Teilen");
    };

    V.arearect = function () {
        var s = "", r, c;
        for (r = 0; r < 4; r += 1) for (c = 0; c < 6; c += 1) s += pop('<rect x="' + (50 + c * 22) + '" y="' + (26 + r * 22) + '" width="21" height="21" fill="' + T + '" opacity="0.28"/>', (r * 6 + c) * 0.05);
        s += drawPath("M50 26 H182 V114 H50 Z", Y, 3, 1.3);
        s += txt(116, 132, "a = 6", Y, 11) + txt(200, 74, "b = 4", Y, 11, "start");
        s += pop(txt(116, 76, "A = 24", "#eef1f7", 15, "middle", ' font-weight="700"'), 1.2);
        return svg(s, "Rechteck 6 mal 4 mit Fläche und Umfang");
    };

    V.ruler = function () {
        var s = '<rect x="20" y="58" width="200" height="34" rx="4" fill="rgba(245,197,24,0.12)" stroke="' + Y + '" stroke-width="1.5"/>';
        for (var k = 0; k <= 20; k += 1) s += ln(24 + k * 9.6, 58, 24 + k * 9.6, k % 10 ? (k % 5 ? 66 : 72) : 78, Y, 1);
        s += txt(24, 106, "0", M, 10) + txt(120, 106, "50 cm", M, 10) + txt(216, 106, "1 m", M, 10);
        s += '<g><polygon points="0,0 -6,-10 6,-10" fill="' + R + '"><animateTransform attributeName="transform" type="translate" values="24 56;216 56;24 56" dur="6s" repeatCount="indefinite"/></polygon></g>';
        s += pop(txt(120, 36, "1 m = 100 cm", "#eef1f7", 14, "middle", ' font-weight="700"'), 0.3);
        s += pop(txt(120, 132, "2,5 kg = 2500 g", T, 12), 0.8);
        return svg(s, "Lineal: 1 Meter gleich 100 Zentimeter");
    };

    V.dice = function () {
        var pips = { 1: [[0, 0]], 3: [[-1, -1], [0, 0], [1, 1]], 6: [[-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 0], [1, 1]] };
        var s = "";
        [[50, 1, 0.1], [120, 3, 0.4], [190, 6, 0.7]].forEach(function (f) {
            var cx = f[0], cy = 66, hot = f[1] === 6;
            var g = '<rect x="' + (cx - 26) + '" y="' + (cy - 26) + '" width="52" height="52" rx="10" fill="' + (hot ? "rgba(233,69,96,0.15)" : "rgba(255,255,255,0.05)") + '" stroke="' + (hot ? R : AX) + '" stroke-width="2"/>';
            pips[f[1]].forEach(function (p) { g += dot(cx + p[1] * 13, cy + p[0] * 13, 4.5, hot ? R : "#eef1f7"); });
            s += pop(hot ? '<g class="tv-rock" style="transform-origin:' + cx + "px " + cy + 'px">' + g + "</g>" : g, f[2]);
        });
        s += pop(txt(120, 124, "P(6) = 1 von 6 = 1/6", Y, 13), 1.1);
        return svg(s, "Würfel: Wahrscheinlichkeit für eine Sechs");
    };

    V.cube = function () {
        var o = [70, 112], a = [90, 0], b = [40, -22], c = [0, -60];
        var p = function (u, v, w) { return [o[0] + a[0] * u + b[0] * v + c[0] * w, o[1] + a[1] * u + b[1] * v + c[1] * w]; };
        var E = [[[0, 0, 0], [1, 0, 0]], [[1, 0, 0], [1, 1, 0]], [[1, 1, 0], [0, 1, 0]], [[0, 1, 0], [0, 0, 0]], [[0, 0, 1], [1, 0, 1]], [[1, 0, 1], [1, 1, 1]], [[1, 1, 1], [0, 1, 1]], [[0, 1, 1], [0, 0, 1]], [[0, 0, 0], [0, 0, 1]], [[1, 0, 0], [1, 0, 1]], [[1, 1, 0], [1, 1, 1]], [[0, 1, 0], [0, 1, 1]]];
        var s = '<path d="M' + p(0, 0, 1) + " L" + p(1, 0, 1) + " L" + p(1, 1, 1) + " L" + p(0, 1, 1) + ' Z" fill="' + Y + '" opacity="0.14"/>';
        s += '<path d="M' + p(0, 0, 0) + " L" + p(1, 0, 0) + " L" + p(1, 0, 1) + " L" + p(0, 0, 1) + ' Z" fill="' + T + '" opacity="0.12"/>';
        E.forEach(function (e, i) {
            var hidden = (e[0][1] === 1 && e[0][0] === 0 && e[0][2] === 0) || (e[1][1] === 1 && e[1][0] === 0 && e[1][2] === 0);
            var A = p.apply(null, e[0]), Bp = p.apply(null, e[1]);
            s += drawPath("M" + A + " L" + Bp, hidden ? M : "#eef1f7", hidden ? 1.2 : 2, i * 0.08, hidden ? ' stroke-dasharray="3 3"' : "");
        });
        s += txt(115, 128, "a", Y, 12) + txt(178, 104, "b", Y, 12) + txt(58, 84, "c", Y, 12);
        s += pop(txt(28, 30, "V = a·b·c", "#eef1f7", 12, "start"), 1.2);
        return svg(s, "Quader mit Kanten a, b und c");
    };

    function barsSvg(vals, mean) {
        var s = ln(26, 124, 226, 124, AX, 1.2), max = Math.max.apply(null, vals);
        vals.forEach(function (v, i) {
            var h = v / max * 92, x = 40 + i * 38;
            s += '<rect class="tv-grow" x="' + x + '" y="' + (124 - h) + '" width="24" height="' + h + '" rx="3" fill="' + [Y, T, B, P, R][i % 5] + '" style="animation-delay:' + (i * 0.15) + 's"/>';
            s += txt(x + 12, 140, v, M, 10);
        });
        if (mean) {
            var avg = vals.reduce(function (a, b) { return a + b; }, 0) / vals.length, y = 124 - avg / max * 92;
            s += drawPath("M28 " + n(y) + " H224", "#eef1f7", 1.8, 1, ' stroke-dasharray="1"');
            s += pop(txt(224, y - 6, "x̄ = " + String(avg).replace(".", ","), "#eef1f7", 11, "end"), 1.4);
        }
        return s;
    }
    V.bars = function () { return svg(barsSvg([4, 7, 5, 9, 3]), "Säulendiagramm"); };
    V.mean = function () { return svg(barsSvg([3, 7, 5, 9, 6], true), "Säulendiagramm mit Mittelwertlinie"); };

    V.primes = function () {
        var node = function (x, y, v, c, del) { return pop('<circle cx="' + x + '" cy="' + y + '" r="14" fill="' + (c === Y ? "rgba(245,197,24,0.16)" : "rgba(255,255,255,0.05)") + '" stroke="' + c + '" stroke-width="1.6"/>' + txt(x, y + 4, v, c === Y ? Y : "#eef1f7", 11), del); };
        var s = drawPath("M120 30 L84 60 M120 30 L156 60 M156 60 L128 90 M156 60 L184 90 M184 90 L162 120 M184 90 L206 120", AX, 1.4, 0.2);
        s += node(120, 24, "60", "#eef1f7", 0) + node(84, 60, "2", Y, 0.4) + node(156, 60, "30", "#eef1f7", 0.4) + node(128, 90, "2", Y, 0.8) + node(184, 90, "15", "#eef1f7", 0.8) + node(162, 124, "3", Y, 1.2) + node(206, 124, "5", Y, 1.2);
        s += pop(txt(46, 120, "60 = 2²·3·5", Y, 12), 1.6);
        return svg(s, "Primfaktorbaum von 60");
    };

    V.round = function () {
        var x = function (v) { return 30 + (v - 380) / 40 * 180; }, s = ln(24, 90, 216, 90, AX, 1.5);
        for (var v = 380; v <= 420; v += 5) s += ln(x(v), 86, x(v), v % 10 ? 94 : 98, AX, 1);
        [380, 390, 400, 410, 420].forEach(function (v) { s += txt(x(v), 114, v, v === 400 ? Y : M, 10); });
        s += '<circle r="5" fill="' + R + '" cy="90"><animate attributeName="cx" values="' + x(398) + ";" + x(398) + ";" + x(400) + ";" + x(400) + '" keyTimes="0;0.35;0.55;1" dur="3.5s" repeatCount="indefinite"/></circle>';
        s += txt(x(398), 70, "398", R, 11) + pop(txt(120, 138, "398 · 21 ≈ 400 · 20 = 8000", "#eef1f7", 12), 0.6);
        s += pop(txt(120, 34, "Überschlag", T, 12), 0.2);
        return svg(s, "Runden von 398 auf 400");
    };

    V.composite = function () {
        var s = pop('<path d="M40 30 H120 V80 H40 Z" fill="' + Y + '" opacity="0.28" stroke="' + Y + '" stroke-width="2"/>', 0.2);
        s += pop('<path d="M40 80 H190 V120 H40 Z" fill="' + T + '" opacity="0.25" stroke="' + T + '" stroke-width="2"/>', 0.7);
        s += pop(txt(80, 60, "A₁", Y, 14), 0.4) + pop(txt(115, 105, "A₂", T, 14), 0.9);
        s += pop(txt(176, 52, "A = A₁ + A₂", "#eef1f7", 12), 1.3);
        return svg(s, "Zusammengesetzte Fläche aus zwei Rechtecken");
    };

    V.intline = function () {
        var x = function (k) { return 120 + k * 13; }, s = ln(14, 96, 226, 96, AX, 1.5);
        for (var k = -8; k <= 8; k += 1) s += ln(x(k), 92, x(k), k ? 100 : 104, k ? AX : "#eef1f7", 1);
        [-8, -4, 0, 4, 8].forEach(function (k) { s += txt(x(k), 120, String(k).replace("-", "−"), k < 0 ? R : M, 10); });
        s += drawPath("M" + x(0) + " 92 Q" + x(-1.5) + " 62 " + x(-3) + " 92", R, 2.4, 0.2) + drawPath("M" + x(-3) + " 92 Q" + x(-5) + " 50 " + x(-7) + " 92", R, 2.4, 1);
        s += pop(dot(x(-7), 96, 5, Y, ' class="tv-pulse"'), 1.7) + pop(txt(x(-7), 140, "−7", Y, 12), 1.7);
        s += pop(txt(x(-1.5), 56, "−3", R, 11), 0.6) + pop(txt(x(-5), 44, "−4", R, 11), 1.3);
        s += pop(txt(186, 46, "(−)·(−) = (+)", T, 12), 2);
        return svg(s, "Zahlengerade mit negativen Zahlen");
    };

    V.angle = function () {
        var A = [40, 120], Bp = [204, 120], C = [128, 30];
        var s = drawPath("M" + A + " L" + Bp + " L" + C + " Z", "#eef1f7", 2, 0.1);
        s += pop('<path d="M60 120 A20 20 0 0 0 54 106" fill="none" stroke="' + Y + '" stroke-width="3"/>', 0.8) + pop(txt(70, 112, "α", Y, 12), 0.8);
        s += pop('<path d="M184 120 A20 20 0 0 1 190 106" fill="none" stroke="' + T + '" stroke-width="3"/>', 1.1) + pop(txt(172, 112, "β", T, 12), 1.1);
        s += pop('<path d="M114 44 A20 20 0 0 0 142 44" fill="none" stroke="' + R + '" stroke-width="3"/>', 1.4) + pop(txt(128, 64, "γ", R, 12), 1.4);
        s += pop(txt(120, 142, "α + β + γ = 180°", "#eef1f7", 12), 1.8);
        return svg(s, "Dreieck mit drei Innenwinkeln");
    };

    V.fraction = function () {
        function pie(cx, colors, del) {
            var parts = colors.length, g = '<circle cx="' + cx + '" cy="66" r="28" fill="none" stroke="' + AX + '" stroke-width="1.5"/>';
            for (var i = 0; i < parts; i += 1) {
                var a0 = -Math.PI / 2 + i * 2 * Math.PI / parts, a1 = a0 + 2 * Math.PI / parts;
                var x0 = cx + 28 * Math.cos(a0), y0 = 66 + 28 * Math.sin(a0), x1 = cx + 28 * Math.cos(a1), y1 = 66 + 28 * Math.sin(a1);
                var wedge = '<path d="M' + cx + " 66 L" + n(x0) + " " + n(y0) + " A28 28 0 0 1 " + n(x1) + " " + n(y1) + ' Z" fill="' + (colors[i] || "rgba(255,255,255,0.05)") + '" fill-opacity="' + (colors[i] ? 0.8 : 1) + '" stroke="#0a0e1c" stroke-width="1.5"/>';
                g += colors[i] ? pop(wedge, del + i * 0.12) : wedge;
            }
            return g;
        }
        var s = pie(40, [Y, null], 0) + txt(84, 71, "+", M, 16) + pie(126, [T, null, null], 0.4) + txt(170, 71, "=", M, 16);
        s += pie(210, [Y, Y, Y, T, T, null], 1);
        s += txt(40, 116, "1/2", Y, 12) + txt(126, 116, "1/3", T, 12) + pop(txt(210, 116, "5/6", "#eef1f7", 13, "middle", ' font-weight="700"'), 1.8);
        s += pop(txt(126, 140, "= 3/6 + 2/6", M, 11), 1.4);
        return svg(s, "Brüche: ein Halb plus ein Drittel gleich fünf Sechstel");
    };

    V.proportion = function () {
        var F = frame(0, 10, 0, 10), s = F.axes;
        s += drawPath(fnPath(function (x) { return 0.9 * x; }, 0, 10, F), Y, 2.6, 0.1);
        s += drawPath(fnPath(function (x) { return 9 / x; }, 0.95, 10, F), T, 2.6, 0.8);
        s += pop(txt(206, 30, "y = k·x", Y, 11, "end"), 0.6) + pop(txt(206, 104, "x·y = k", T, 11, "end"), 1.3);
        return svg(s, "Proportionale Gerade und antiproportionale Hyperbel");
    };

    V.percent = function () {
        var s = "", i, j;
        for (i = 0; i < 10; i += 1) for (j = 0; j < 10; j += 1) {
            var on = i * 10 + j < 25;
            var r = '<rect x="' + (24 + j * 11) + '" y="' + (18 + i * 11) + '" width="9.5" height="9.5" rx="1.5" fill="' + (on ? Y : "rgba(255,255,255,0.07)") + '"/>';
            s += on ? pop(r, (i * 10 + j) * 0.04) : r;
        }
        s += pop(txt(186, 66, "25 %", Y, 22, "middle", ' font-weight="700"'), 1.1) + pop(txt(186, 90, "= 25/100", M, 12), 1.3) + pop(txt(186, 108, "= ¼", M, 12), 1.5);
        return svg(s, "Hunderterfeld mit 25 Prozent");
    };

    V.balance = function () {
        var s = '<path d="M120 128 L108 140 H132 Z" fill="' + M + '"/>' + ln(120, 128, 120, 52, M, 3);
        s += '<g class="tv-rock" style="transform-origin:120px 52px">';
        s += ln(40, 52, 200, 52, "#eef1f7", 3) + ln(52, 52, 42, 82, M, 1) + ln(52, 52, 62, 82, M, 1) + ln(188, 52, 178, 82, M, 1) + ln(188, 52, 198, 82, M, 1);
        s += '<path d="M28 82 H76 a6 6 0 0 1 -6 8 H34 a6 6 0 0 1 -6 -8Z" fill="' + Y + '" opacity="0.8"/><path d="M164 82 H212 a6 6 0 0 1 -6 8 H170 a6 6 0 0 1 -6 -8Z" fill="' + T + '" opacity="0.8"/>';
        s += txt(52, 74, "3x + 4", Y, 13) + txt(188, 74, "19", T, 13) + "</g>";
        s += pop(txt(120, 26, "x = 5", "#eef1f7", 15, "middle", ' font-weight="700"'), 1.2);
        return svg(s, "Waage: 3x plus 4 gleich 19");
    };

    V.line = function () {
        var F = frame(-1, 8, -1, 6), s = F.axes;
        s += drawPath(fnPath(function (x) { return 0.5 * x + 1; }, -1, 8, F), Y, 2.6, 0.1);
        s += pop('<path d="M' + n(F.X(2)) + " " + n(F.Y(2)) + " H" + n(F.X(6)) + " V" + n(F.Y(4)) + '" fill="none" stroke="' + T + '" stroke-width="2" stroke-dasharray="4 3"/>', 0.9);
        s += pop(txt(F.X(4), F.Y(2) + 14, "Δx = 4", T, 10), 1.1) + pop(txt(F.X(6) + 6, F.Y(3) + 3, "Δy = 2", T, 10, "start"), 1.3);
        s += pop(dot(F.X(0), F.Y(1), 4.5, R, ' class="tv-pulse"'), 1.5) + pop(txt(F.X(0) - 6, F.Y(1) - 8, "t = 1", R, 10, "end"), 1.5);
        s += pop(txt(206, 24, "m = Δy/Δx = ½", "#eef1f7", 11, "end"), 1.7);
        return svg(s, "Gerade mit Steigungsdreieck");
    };

    V.system = function () {
        var F = frame(-1, 5, -1, 6), s = F.axes;
        s += drawPath(fnPath(function (x) { return 2 * x + 1; }, -1, 2.5, F), Y, 2.6, 0.1);
        s += drawPath(fnPath(function (x) { return -x + 4; }, -1, 5, F), T, 2.6, 0.6);
        s += pop('<circle cx="' + n(F.X(1)) + '" cy="' + n(F.Y(3)) + '" r="6" fill="' + R + '" class="tv-pulse"/>', 1.3);
        s += pop(txt(F.X(1) + 10, F.Y(3) - 8, "(1 | 3)", R, 12, "start"), 1.4);
        return svg(s, "Zwei Geraden mit Schnittpunkt");
    };

    V.inequality = function () {
        var x = function (k) { return 120 + k * 18; }, s = ln(14, 86, 226, 86, AX, 1.5);
        for (var k = -5; k <= 5; k += 1) s += ln(x(k), 82, x(k), 90, AX, 1) + txt(x(k), 108, String(k).replace("-", "−"), k === -3 ? Y : M, 10);
        s += drawPath("M" + x(-3) + " 86 H220", Y, 6, 0.3, ' stroke-opacity="0.85"');
        s += '<circle cx="' + x(-3) + '" cy="86" r="6" fill="#0a0e1c" stroke="' + Y + '" stroke-width="2.4"/>';
        s += pop(txt(120, 44, "−2x < 6  ⇒  x > −3", "#eef1f7", 13), 0.8);
        s += pop(txt(120, 134, "· (−1) dreht das Zeichen", R, 11), 1.3);
        return svg(s, "Lösungsmenge x größer minus 3 auf der Zahlengeraden");
    };

    V.tree = function () {
        var s = drawPath("M30 75 L100 38 M30 75 L100 112", "#eef1f7", 2, 0.1);
        s += drawPath("M110 38 L190 20 M110 38 L190 56 M110 112 L190 94 M110 112 L190 130", AX, 1.6, 0.7);
        s += dot(30, 75, 4, "#eef1f7");
        s += pop(txt(58, 48, "½", Y, 12), 0.5) + pop(txt(58, 110, "½", M, 12), 0.5);
        s += pop(txt(150, 22, "½", Y, 11), 1.1) + pop(txt(150, 58, "½", M, 11), 1.1);
        s += pop(txt(206, 24, "¼", Y, 12, "start", ' font-weight="700"'), 1.5);
        s += pop(drawPath("M30 75 L100 38 L190 20", Y, 3.4, 1.6), 1.6);
        s += txt(105, 42, "K", "#eef1f7", 11) + txt(105, 116, "Z", "#eef1f7", 11);
        return svg(s, "Baumdiagramm zweier Münzwürfe");
    };

    V.circle = function () {
        var s = drawPath("M80 25 a50 50 0 1 1 -0.1 0", Y, 2.6, 0.1);
        s += '<g class="tv-spin" style="transform-origin:80px 75px;animation-duration:6s">' + ln(80, 75, 130, 75, T, 2.2) + dot(130, 75, 4, T) + "</g>" + dot(80, 75, 3, "#eef1f7");
        s += pop(txt(186, 58, "U = 2πr", Y, 14, "middle", ' font-weight="700"'), 0.8) + pop(txt(186, 86, "A = πr²", "#eef1f7", 14), 1.2) + pop(txt(186, 112, "π ≈ 3,1416", M, 11), 1.6);
        return svg(s, "Kreis mit drehendem Radius");
    };

    V.parabola = function () {
        var F = frame(-2, 4, -2, 7), s = F.axes;
        var f = function (x) { return (x - 1) * (x - 1) - 1; };
        var pd = fnPath(f, -1.6, 3.6, F);
        s += drawPath(pd, Y, 2.6, 0.1);
        s += pop(dot(F.X(0), F.Y(0), 5, R, ' class="tv-pulse"'), 1) + pop(dot(F.X(2), F.Y(0), 5, R, ' class="tv-pulse"'), 1.1);
        s += pop(dot(F.X(1), F.Y(-1), 5, T), 1.4) + pop(txt(F.X(1), F.Y(-1) + 18, "S(1 | −1)", T, 10), 1.5);
        s += pop(txt(F.X(1) + 40, 26, "y = (x − 1)² − 1", "#eef1f7", 11), 1.7);
        return svg(s, "Parabel mit Scheitel und Nullstellen");
    };

    V.power = function () {
        var s = "";
        [[1, 18, Y], [2, 46, T], [3, 96, B]].forEach(function (q, i) {
            var size = q[0] * 22;
            s += pop('<rect x="' + q[1] + '" y="' + (116 - size) + '" width="' + size + '" height="' + size + '" fill="' + q[2] + '" fill-opacity="0.25" stroke="' + q[2] + '" stroke-width="2"/>', i * 0.4);
            s += pop(txt(q[1] + size / 2, 134, q[0] + "²", q[2], 11), i * 0.4 + 0.2);
        });
        s += pop(txt(205, 62, "3² = 9", B, 14, "middle", ' font-weight="700"'), 1.2) + pop(txt(205, 90, "√9 = 3", "#eef1f7", 14, "middle", ' font-weight="700"'), 1.6);
        return svg(s, "Quadratzahlen als Quadrate");
    };

    V.pythagoras = function () {
        // a = 36 (senkrecht), b = 54 (waagrecht), c = Hypotenuse; Quadrate liegen außen
        var s = "";
        s += pop('<path d="M96 108 L150 108 L150 140 L96 140 Z" fill="' + Y + '" fill-opacity="0.22" stroke="' + Y + '" stroke-width="1.5"/>', 0.3);
        s += pop('<path d="M96 108 L96 72 L60 72 L60 108 Z" fill="' + T + '" fill-opacity="0.22" stroke="' + T + '" stroke-width="1.5"/>', 0.6);
        s += pop('<path d="M96 72 L150 108 L186 54 L132 18 Z" fill="' + R + '" fill-opacity="0.22" stroke="' + R + '" stroke-width="1.5"/>', 0.9);
        s += drawPath("M96 108 L150 108 L96 72 Z", "#eef1f7", 2.4, 0.1);
        s += '<path d="M96 100 h8 v8" fill="none" stroke="#eef1f7" stroke-width="1.2"/>';
        s += txt(123, 128, "b²", Y, 12) + txt(78, 94, "a²", T, 12) + txt(142, 66, "c²", R, 12);
        s += pop(txt(12, 26, "a² + b² = c²", "#eef1f7", 12, "start"), 1.3);
        return svg(s, "Satz des Pythagoras mit drei Quadraten");
    };

    V.similar = function () {
        var s = drawPath("M24 124 L216 30", "#eef1f7", 2, 0.1) + drawPath("M24 124 L216 124", "#eef1f7", 2, 0.3);
        s += drawPath("M96 124 L96 88.8", Y, 2.6, 0.8) + drawPath("M180 124 L180 47.6", T, 2.6, 1.1);
        s += dot(24, 124, 3.5, "#eef1f7") + txt(18, 140, "Z", M, 10);
        s += pop(txt(60, 138, "a", Y, 11), 1) + pop(txt(140, 138, "a′", T, 11), 1.2) + pop(txt(102, 110, "b", Y, 11, "start"), 1) + pop(txt(186, 90, "b′", T, 11, "start"), 1.2);
        s += pop(txt(70, 36, "a / a′ = b / b′", "#eef1f7", 12), 1.6);
        return svg(s, "Strahlensatz mit zwei Parallelen");
    };

    V.trig = function () {
        var s = drawPath("M40 116 L190 116 L190 36 Z", "#eef1f7", 2.2, 0.1);
        s += '<path d="M182 116 v-8 h8" fill="none" stroke="#eef1f7" stroke-width="1.2"/>';
        s += pop('<path d="M74 116 A34 34 0 0 0 70 100" fill="none" stroke="' + Y + '" stroke-width="2.6"/>', 0.6) + pop(txt(84, 110, "α", Y, 12), 0.6);
        s += pop(ln(190, 116, 190, 36, R, 3.4), 0.9) + pop(txt(200, 80, "Gegen-", R, 9, "start") + txt(200, 91, "kathete", R, 9, "start"), 0.9);
        s += pop(ln(40, 116, 190, 116, T, 3.4), 1.2) + pop(txt(115, 132, "Ankathete", T, 9), 1.2);
        s += pop(txt(104, 66, "Hypotenuse", M, 9, "middle", ' transform="rotate(-28 104 66)"'), 1.4);
        s += pop(txt(64, 30, "sin α = GK / H", "#eef1f7", 11), 1.7);
        return svg(s, "Rechtwinkliges Dreieck mit Bezeichnungen");
    };

    V.sine = function () {
        var cx = 52, cy = 75, r = 32, s = '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + AX + '" stroke-width="1.5"/>' + ln(14, cy, 230, cy, AX, 1);
        var circ = "M" + (cx + r) + " " + cy + " A" + r + " " + r + " 0 1 0 " + (cx - r) + " " + cy + " A" + r + " " + r + " 0 1 0 " + (cx + r) + " " + cy;
        s += moving(circ, Y, 5, 4);
        var w = "";
        for (var i = 0; i <= 60; i += 1) { var t = i / 60 * 2 * Math.PI; w += (i ? "L" : "M") + n(98 + i * 2.1) + " " + n(cy - r * Math.sin(t)); }
        s += drawPath(w, T, 2.6, 0.3);
        s += pop(txt(98 + 63, 30, "sin x", T, 11), 0.9) + pop(txt(161, 140, "2π", M, 10), 0.9) + txt(cx, 132, "Einheitskreis", M, 9);
        return svg(s, "Einheitskreis und Sinuskurve");
    };

    V.exp = function () {
        var F = frame(-2, 5, -2, 5), s = F.axes;
        s += drawPath(fnPath(function (x) { return x; }, -2, 5, F), AX, 1, 0, ' stroke-dasharray="3 4"');
        s += drawPath(fnPath(function (x) { return Math.pow(2, x); }, -2, 2.3, F), Y, 2.6, 0.1);
        s += drawPath(fnPath(function (x) { return Math.log(x) / Math.log(2); }, 0.26, 5, F), T, 2.6, 0.8);
        s += pop(txt(F.X(2.3) - 4, F.Y(4.8) + 4, "2ˣ", Y, 12, "end"), 0.6) + pop(txt(F.X(4.6), F.Y(2.4) - 4, "log₂ x", T, 11, "end"), 1.3);
        return svg(s, "Exponentialfunktion und Logarithmus als Spiegelbilder");
    };

    V.efunc = function () {
        var F = frame(-2, 4, -2, 5), s = F.axes;
        var pd = fnPath(function (x) { return Math.exp(x); }, -2, 1.6, F);
        s += drawPath(pd, Y, 2.6, 0.1) + drawPath(fnPath(function (x) { return Math.log(x); }, 0.14, 4, F), T, 2.6, 0.6);
        s += '<g><line x1="-18" y1="0" x2="18" y2="0" stroke="' + R + '" stroke-width="2.4" stroke-linecap="round"/><circle r="3.5" fill="' + R + '"/><animateMotion dur="5s" repeatCount="indefinite" rotate="auto" path="' + pd + '"/></g>';
        s += pop(txt(F.X(1.6) + 4, F.Y(4.9) + 6, "eˣ", Y, 12, "start"), 0.6) + pop(txt(F.X(3.8), F.Y(1.3) - 6, "ln x", T, 11, "end"), 1);
        s += pop(txt(214, 140, "Steigung = Funktionswert", R, 10, "end"), 1.3);
        return svg(s, "e-Funktion mit Tangente und Logarithmus");
    };

    V.solids = function () {
        var s = drawPath("M30 116 L90 116 L110 100 L50 100 Z M30 116 L70 34 L90 116 M110 100 L70 34 L50 100", "#eef1f7", 1.8, 0.1);
        s += '<ellipse cx="160" cy="112" rx="34" ry="10" fill="none" stroke="' + T + '" stroke-width="1.8"/>' + drawPath("M126 112 L160 34 L194 112", T, 1.8, 0.5);
        s += drawPath("M214 82 a18 18 0 1 1 -0.1 0", Y, 1.8, 0.9) + '<ellipse cx="214" cy="100" rx="18" ry="5" fill="none" stroke="' + Y + '" stroke-width="1" stroke-dasharray="2 3"/>';
        s += pop(txt(70, 138, "V = ⅓·G·h", "#eef1f7", 10), 1.2) + pop(txt(160, 138, "Kegel", T, 10), 1.3) + pop(txt(214, 138, "Kugel", Y, 10), 1.4);
        return svg(s, "Pyramide, Kegel und Kugel");
    };

    V.tangent = function () {
        var s = drawPath("M90 27 a48 48 0 1 1 -0.1 0", "#eef1f7", 2, 0.1);
        var px = 90 + 48 * Math.cos(-0.7), py = 75 + 48 * Math.sin(-0.7);
        s += pop(ln(90, 75, px, py, T, 2.2), 0.6) + dot(90, 75, 3, "#eef1f7");
        var tx = Math.sin(0.7), ty = Math.cos(0.7);
        s += drawPath("M" + n(px - tx * 70) + " " + n(py - ty * 70) + " L" + n(px + tx * 80) + " " + n(py + ty * 80), Y, 2.6, 1);
        s += pop(dot(px, py, 5, R, ' class="tv-pulse"'), 1.4) + pop(txt(234, 22, "Tangente ⟂ Radius", "#eef1f7", 11, "end"), 1.6) + txt(104, 72, "r", T, 11);
        return svg(s, "Kreis mit Tangente im Berührpunkt");
    };

    V.combinatorics = function () {
        var cols = [Y, T, R], perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]], s = "";
        perms.forEach(function (p, i) {
            var x0 = 30 + (i % 3) * 64, y0 = 44 + Math.floor(i / 3) * 44;
            var g = '<rect x="' + (x0 - 8) + '" y="' + (y0 - 14) + '" width="58" height="28" rx="14" fill="rgba(255,255,255,0.04)" stroke="' + AX + '"/>';
            p.forEach(function (c, k) { g += dot(x0 + 6 + k * 15, y0, 6, cols[c]); });
            s += pop(g, i * 0.25);
        });
        s += pop(txt(120, 136, "3 · 2 · 1 = 6 Anordnungen", "#eef1f7", 12), 1.7);
        return svg(s, "Alle sechs Anordnungen dreier Kugeln");
    };

    V.derivative = function () {
        var F = frame(-0.5, 6.5, -1, 4), s = F.axes;
        var f = function (x) { return 1.5 + Math.sin(x * 0.9) * 1.2 + x * 0.12; };
        var pd = fnPath(f, -0.3, 6.3, F);
        s += drawPath(pd, Y, 2.6, 0.1);
        s += '<g><line x1="-34" y1="0" x2="34" y2="0" stroke="' + T + '" stroke-width="2.4" stroke-linecap="round"/><circle r="4" fill="' + R + '"/><animateMotion dur="6s" repeatCount="indefinite" rotate="auto" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear" path="' + pd + '"/></g>';
        s += pop(txt(214, 140, "Tangente = Steigung f′(x)", T, 10, "end"), 0.8);
        return svg(s, "Tangente gleitet über eine Kurve");
    };

    V.extrema = function () {
        var F = frame(-0.5, 6.5, -1, 4), s = F.axes;
        var f = function (x) { return 1.5 + 1.3 * Math.sin(x * 1.05 - 0.2); };
        s += drawPath(fnPath(f, -0.3, 6.3, F), Y, 2.6, 0.1);
        var xm = (Math.PI / 2 + 0.2) / 1.05, xn = (3 * Math.PI / 2 + 0.2) / 1.05;
        s += pop(ln(F.X(xm) - 24, F.Y(f(xm)), F.X(xm) + 24, F.Y(f(xm)), T, 2), 0.9) + pop(dot(F.X(xm), F.Y(f(xm)), 5, R, ' class="tv-pulse"'), 1);
        s += pop(ln(F.X(xn) - 24, F.Y(f(xn)), F.X(xn) + 24, F.Y(f(xn)), T, 2), 1.2) + pop(dot(F.X(xn), F.Y(f(xn)), 5, B, ' class="tv-pulse"'), 1.3);
        s += pop(txt(F.X(xm), F.Y(f(xm)) - 10, "Hochpunkt", R, 9), 1.1) + pop(txt(F.X(xn), F.Y(f(xn)) + 16, "Tiefpunkt", B, 9), 1.4);
        s += pop(txt(214, 22, "f′ = 0", T, 11, "end"), 1.6);
        return svg(s, "Kurve mit Hoch- und Tiefpunkt");
    };

    V.bayes = function () {
        var s = "";
        s += pop('<rect x="40" y="24" width="96" height="56" fill="' + Y + '" fill-opacity="0.55"/>', 0.1);
        s += pop('<rect x="136" y="24" width="64" height="56" fill="' + Y + '" fill-opacity="0.18"/>', 0.3);
        s += pop('<rect x="40" y="80" width="96" height="40" fill="' + T + '" fill-opacity="0.18"/>', 0.5);
        s += pop('<rect x="136" y="80" width="64" height="40" fill="' + T + '" fill-opacity="0.45"/>', 0.7);
        s += '<rect x="40" y="24" width="160" height="96" fill="none" stroke="' + AX + '" stroke-width="1.5"/>';
        s += txt(88, 16, "B", M, 11) + txt(168, 16, "B̄", M, 11) + txt(30, 56, "A", M, 11, "end") + txt(30, 104, "Ā", M, 11, "end");
        s += pop(txt(88, 56, "A∩B", "#0a0e1c", 11, "middle", ' font-weight="700"'), 0.9);
        s += pop('<rect x="40" y="24" width="96" height="96" fill="none" stroke="' + R + '" stroke-width="2.4" class="tv-pulse"/>', 1.2);
        s += pop(txt(120, 140, "P(A | B) = P(A∩B) / P(B)", "#eef1f7", 11), 1.4);
        return svg(s, "Vierfeldertafel");
    };

    V.vector = function () {
        var O = [70, 108], ex = [64, 0], ey = [-34, 22], ez = [0, -70];
        var P3 = function (x, y, z) { return [O[0] + ex[0] * x + ey[0] * y + ez[0] * z, O[1] + ex[1] * x + ey[1] * y + ez[1] * z]; };
        var s = ln(O[0], O[1], P3(2.2, 0, 0)[0], P3(2.2, 0, 0)[1], AX, 1.2) + ln(O[0], O[1], P3(0, 1.4, 0)[0], P3(0, 1.4, 0)[1], AX, 1.2) + ln(O[0], O[1], P3(0, 0, 1.4)[0], P3(0, 0, 1.4)[1], AX, 1.2);
        var a = P3(1, 0, 0.3), b = P3(0.4, 0.9, 0.8), c = P3(1.4, 0.9, 1.1);
        s += pop('<path d="M' + O.join(" ") + " L" + a.map(n).join(" ") + " L" + c.map(n).join(" ") + " L" + b.map(n).join(" ") + ' Z" fill="' + P + '" fill-opacity="0.25" stroke="' + P + '" stroke-width="1"/>', 1);
        s += drawPath("M" + O.join(" ") + " L" + a.map(n).join(" "), Y, 2.8, 0.2) + drawPath("M" + O.join(" ") + " L" + b.map(n).join(" "), T, 2.8, 0.6);
        s += dot(a[0], a[1], 3.5, Y) + dot(b[0], b[1], 3.5, T);
        s += pop(txt(a[0] + 8, a[1] + 4, "u", Y, 12, "start", ' font-weight="700"'), 0.5) + pop(txt(b[0] - 6, b[1] - 6, "v", T, 12, "end", ' font-weight="700"'), 0.9);
        s += pop(txt(232, 28, "E: x = p + r·u + s·v", "#eef1f7", 10, "end"), 1.4);
        return svg(s, "Zwei Vektoren spannen eine Ebene auf");
    };

    V.sequence = function () {
        var F = frame(0, 12, -0.15, 1.1), s = F.axes;
        s += drawPath("M" + F.X(0) + " " + F.Y(0) + " H" + F.X(12), R, 1.6, 0.1, ' stroke-dasharray="4 4"');
        for (var k = 1; k <= 11; k += 1) s += pop(dot(F.X(k), F.Y(1 / k), 4, Y), k * 0.12);
        s += pop(txt(214, F.Y(0) + 14, "Grenzwert 0", R, 10, "end"), 1.5) + pop(txt(F.X(1) + 10, F.Y(1) + 4, "aₙ = 1/n", "#eef1f7", 11, "start"), 0.4);
        return svg(s, "Folge 1 durch n nähert sich null");
    };

    V.complex = function () {
        var F = frame(-1.6, 1.6, -1.2, 1.2, { L: 50, T: 12, W: 140, H: 124 }), s = F.axes;
        var cx = F.X(0), cy = F.Y(0), r = F.X(1) - cx;
        s += '<circle cx="' + n(cx) + '" cy="' + n(cy) + '" r="' + n(r) + '" fill="none" stroke="' + AX + '" stroke-dasharray="3 4"/>';
        s += '<g class="tv-spin" style="transform-origin:' + n(cx) + "px " + n(cy) + 'px;animation-duration:8s;animation-direction:reverse">' + ln(cx, cy, cx + r * 0.8, cy - r * 0.6, Y, 2.6) + dot(cx + r * 0.8, cy - r * 0.6, 4.5, Y) + "</g>";
        s += txt(F.X(1.55), cy - 6, "Re", M, 10, "end") + txt(cx + 8, F.Y(1.1), "Im", M, 10, "start");
        s += pop(txt(234, 30, "z = r·e^(iφ)", "#eef1f7", 10, "end"), 0.6) + pop(txt(234, 128, "· i = 90° drehen", T, 10, "end"), 1);
        return svg(s, "Drehender Zeiger in der komplexen Ebene");
    };

    V.integral = function () {
        var F = frame(-0.3, 5, -0.3, 4), s = F.axes;
        var f = function (x) { return 0.8 + 0.5 * x + 0.35 * Math.sin(1.8 * x); };
        var k, w = 0.4;
        for (k = 0; k < 8; k += 1) {
            var x0 = 1 + k * w, h = f(x0 + w / 2);
            s += pop('<rect x="' + n(F.X(x0)) + '" y="' + n(F.Y(h)) + '" width="' + n(F.X(x0 + w) - F.X(x0)) + '" height="' + n(F.Y(0) - F.Y(h)) + '" fill="' + T + '" fill-opacity="0.35" stroke="' + T + '" stroke-width="0.8"/>', 0.4 + k * 0.12);
        }
        s += drawPath(fnPath(f, -0.2, 4.9, F), Y, 2.6, 0.1);
        s += txt(F.X(1), F.Y(0) + 13, "a", M, 10) + txt(F.X(4.2), F.Y(0) + 13, "b", M, 10);
        s += pop(txt(214, 22, "∫ f(x) dx = F(b) − F(a)", "#eef1f7", 10, "end"), 1.5);
        return svg(s, "Fläche unter einer Kurve aus Rechtecken");
    };

    function bell(F, mu, sg, a, b) { return fnPath(function (x) { return Math.exp(-0.5 * Math.pow((x - mu) / sg, 2)); }, a, b, F, 80); }
    V.normal = function () {
        var F = frame(0, 10, 0, 1.15), s = F.axes;
        var nn = 10, p = 0.5, k, c = 1;
        for (k = 0; k <= nn; k += 1) {
            if (k > 0) c = c * (nn - k + 1) / k;
            var pr = c * Math.pow(p, k) * Math.pow(1 - p, nn - k) / 0.2461;
            s += '<rect class="tv-grow" x="' + n(F.X(k) - 7) + '" y="' + n(F.Y(pr)) + '" width="14" height="' + n(F.Y(0) - F.Y(pr)) + '" fill="' + B + '" fill-opacity="0.55" style="animation-delay:' + (k * 0.06) + 's"/>';
        }
        s += drawPath(bell(F, 5, 1.58, 0, 10), Y, 2.6, 0.8);
        s += pop(txt(214, 22, "n = 10, p = 0,5", "#eef1f7", 10, "end"), 1.2);
        return svg(s, "Binomialverteilung mit Glockenkurve");
    };

    V.hypothesis = function () {
        var F = frame(0, 10, 0, 1.15), s = F.axes;
        var tail = fnPath(function (x) { return Math.exp(-0.5 * Math.pow((x - 4.5) / 1.4, 2)); }, 7.2, 10, F, 30);
        s += pop('<path d="' + tail + " L" + n(F.X(10)) + " " + n(F.Y(0)) + " L" + n(F.X(7.2)) + " " + n(F.Y(0)) + ' Z" fill="' + R + '" fill-opacity="0.5"/>', 1);
        s += drawPath(bell(F, 4.5, 1.4, 0, 10), Y, 2.6, 0.1);
        s += pop(ln(F.X(7.2), F.Y(0), F.X(7.2), F.Y(0.6), R, 2, ' stroke-dasharray="3 3"'), 1.1);
        s += pop(txt(F.X(8.4), F.Y(0.38), "α", R, 14), 1.3) + pop(txt(F.X(8.4), F.Y(0.62), "ablehnen", R, 9), 1.4);
        s += pop(txt(F.X(4.5), F.Y(1.08), "H₀ beibehalten", T, 10), 1.4);
        return svg(s, "Glockenkurve mit Ablehnungsbereich");
    };

    V.matrix = function () {
        var F = frame(-0.5, 3.5, -0.5, 2.5, { L: 30, T: 14, W: 150, H: 112 }), s = F.axes;
        var q = function (pts) { return pts.map(function (p) { return n(F.X(p[0])) + "," + n(F.Y(p[1])); }).join(" "); };
        var sq = q([[0, 0], [1, 0], [1, 1], [0, 1]]), sh = q([[0, 0], [2, 0.5], [3, 2], [1, 1.5]]);
        s += '<polygon points="' + sq + '" fill="' + Y + '" fill-opacity="0.12" stroke="' + Y + '" stroke-dasharray="3 3"/>';
        s += '<polygon fill="' + T + '" fill-opacity="0.3" stroke="' + T + '" stroke-width="2" points="' + sq + '"><animate attributeName="points" values="' + sq + ";" + sh + ";" + sh + ";" + sq + '" keyTimes="0;0.4;0.8;1" dur="5s" repeatCount="indefinite"/></polygon>';
        var mx = '<path d="M200 48 h-4 v34 h4 M232 48 h4 v34 h-4" fill="none" stroke="#eef1f7" stroke-width="1.4"/>' + txt(190, 70, "A =", "#eef1f7", 11, "end") + txt(208, 62, "2", "#eef1f7", 11) + txt(224, 62, "1", "#eef1f7", 11) + txt(208, 78, "½", "#eef1f7", 11) + txt(224, 78, "1½", "#eef1f7", 11);
        s += pop(mx, 0.4) + pop(txt(214, 112, "x ↦ A·x", T, 11), 0.8);
        return svg(s, "Eine Matrix verformt ein Quadrat");
    };

    V.conic = function () {
        var cx = 104, cy = 75, a = 70, b = 42, c = Math.sqrt(a * a - b * b);
        var el = "M" + (cx + a) + " " + cy + " A" + a + " " + b + " 0 1 0 " + (cx - a) + " " + cy + " A" + a + " " + b + " 0 1 0 " + (cx + a) + " " + cy;
        var s = drawPath(el, Y, 2.6, 0.1);
        s += pop(dot(cx - c, cy, 4, T) + dot(cx + c, cy, 4, T), 0.8) + pop(txt(cx - c, cy + 16, "F₁", T, 10) + txt(cx + c, cy + 16, "F₂", T, 10), 0.9);
        s += moving(el, R, 4.5, 6);
        s += pop(txt(236, 30, "x²/a² + y²/b² = 1", "#eef1f7", 10, "end"), 1.2) + pop(txt(236, 132, "PF₁ + PF₂ = 2a", M, 10, "end"), 1.4);
        return svg(s, "Ellipse mit Brennpunkten");
    };

    // ---------- Laufzeit ----------
    var CSS = [
        ".tv{width:100%;height:auto;display:block;overflow:visible}",
        ".tv text{font-family:'IBM Plex Mono',ui-monospace,monospace;fill:#cdd4e6}",
        ".tv .tv-d{stroke-dasharray:1;stroke-dashoffset:1}",
        ".tv .tv-p{opacity:0}",
        ".tv .tv-grow{transform-box:fill-box;transform-origin:50% 100%;transform:scaleY(0)}",
        ".tv-run .tv-d{animation:tvDraw 1.4s cubic-bezier(.4,.1,.2,1) forwards}",
        ".tv-run .tv-p{animation:tvPop .55s cubic-bezier(.2,.8,.2,1) forwards}",
        ".tv-run .tv-grow{animation:tvGrow .9s cubic-bezier(.2,.8,.2,1) forwards}",
        ".tv .tv-spin{animation:tvSpin 8s linear infinite;transform-box:view-box}",
        ".tv .tv-pulse{transform-box:fill-box;transform-origin:center;animation:tvPulse 1.9s ease-in-out infinite}",
        ".tv .tv-rock{transform-box:view-box;animation:tvRock 3.2s ease-in-out infinite}",
        "@keyframes tvDraw{to{stroke-dashoffset:0}}",
        "@keyframes tvPop{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}",
        "@keyframes tvGrow{to{transform:scaleY(1)}}",
        "@keyframes tvSpin{to{transform:rotate(360deg)}}",
        "@keyframes tvPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.25)}}",
        "@keyframes tvRock{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}",
        "@media (prefers-reduced-motion:reduce){.tv .tv-d{stroke-dashoffset:0}.tv .tv-p{opacity:1}.tv .tv-grow{transform:none}.tv *{animation:none!important}}"
    ].join("\n");

    function ensureStyles(doc) {
        if (!doc || doc.getElementById("tv-styles")) return;
        var st = doc.createElement("style");
        st.id = "tv-styles";
        st.textContent = CSS;
        doc.head.appendChild(st);
    }

    function render(key) { return V[key] ? V[key]() : ""; }

    var observer = null;
    function run(el) { el.classList.remove("tv-run"); void el.offsetWidth; el.classList.add("tv-run"); }

    function mount(el, key) {
        if (!el) return;
        var doc = el.ownerDocument;
        ensureStyles(doc);
        el.innerHTML = render(key);
        var reduce = root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches;
        var s = el.querySelector("svg");
        if (reduce) { if (s && s.pauseAnimations) s.pauseAnimations(); el.classList.add("tv-run"); return; }
        if (!("IntersectionObserver" in root)) { el.classList.add("tv-run"); return; }
        if (!observer) {
            observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("tv-run"); observer.unobserve(en.target); } });
            }, { threshold: 0.35 });
        }
        observer.observe(el);
    }

    root.SOR_VISUALS = { render: render, mount: mount, replay: run, keys: Object.keys(V), css: CSS };
    if (typeof module !== "undefined" && module.exports) module.exports = root.SOR_VISUALS;
})(typeof window !== "undefined" ? window : globalThis);
