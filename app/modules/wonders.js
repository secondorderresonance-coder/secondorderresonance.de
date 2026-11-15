/*
 * SOR Mathe-Wunder: interaktive Erkundungen zu vier großen Ideen
 * ------------------------------------------------------------
 * Euler-Formel, Basler Problem, Riemann-Hypothese, Gödels Unvollständigkeitssatz.
 * Jede Erkundung besteht aus Szenen: { title, text, mount(stage, controls) -> cleanup? }.
 * Gezeichnet wird auf Canvas, ohne Bibliotheken. Texte Deutsch und Englisch über $t.
 *   SOR_WONDERS.list            -> [{ id, title, lead, level, icon }]
 *   SOR_WONDERS.get(id)         -> { id, title, lead, scenes, quiz }
 *   SOR_WONDERS.zeta(re, im)    -> [re, im]
 */
(function (root) {
    "use strict";
    var t = function (de, en) { return root.$t ? root.$t(de, en) : de; };
    var Y = "#f5c518", T = "#35e0c4", R = "#e94560", B = "#60a5fa", W = "#eef1f7", M = "#98a2bd", G = "rgba(255,255,255,0.09)", V = "#a78bfa";
    var PI = Math.PI, reduce = root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var nf = function (x, d) { return root.SOR_I18N && SOR_I18N.num ? SOR_I18N.num(x, d) : Number(x).toFixed(d); };

    // ---------- Bausteine ----------
    function canvas(stage, ratio) {
        var c = document.createElement("canvas"), x = c.getContext("2d"), o = { c: c, x: x, W: 0, H: 0, draw: null };
        c.className = "w-canvas"; stage.appendChild(c);
        o.fit = function () {
            var w = stage.clientWidth || 600, h = Math.max(260, Math.min(w * (ratio || 0.68), 520)), dpr = Math.min(2, root.devicePixelRatio || 1);
            c.style.height = h + "px"; c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); x.setTransform(dpr, 0, 0, dpr, 0, 0); o.W = w; o.H = h; if (o.draw) o.draw();
        };
        o.clear = function () { x.clearRect(0, 0, o.W, o.H); };
        o.onResize = function () { o.fit(); };
        root.addEventListener("resize", o.onResize);
        o.off = function () { root.removeEventListener("resize", o.onResize); };
        return o;
    }
    function slider(ctl, label, min, max, step, val, fmt, on) {
        var w = document.createElement("label"); w.className = "w-slider";
        w.innerHTML = "<span>" + label + ' <b></b></span><input type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '">';
        var inp = w.querySelector("input"), out = w.querySelector("b");
        var upd = function () { out.textContent = fmt(parseFloat(inp.value)); on(parseFloat(inp.value)); };
        inp.addEventListener("input", upd); ctl.appendChild(w); out.textContent = fmt(val);
        return { set: function (v) { inp.value = v; out.textContent = fmt(v); }, el: inp };
    }
    function button(ctl, label, on, cls) { var b = document.createElement("button"); b.type = "button"; b.className = "btn btn-sm " + (cls || "btn-ghost"); b.innerHTML = label; b.addEventListener("click", on); ctl.appendChild(b); return b; }
    function note(ctl, cls) { var p = document.createElement("p"); p.className = "w-note " + (cls || ""); ctl.appendChild(p); return p; }
    function tween(ms, step, end) {
        if (reduce) { step(1); if (end) end(); return function () {}; }
        var t0 = null, id, stop = false;
        var f = function (ts) { if (stop) return; if (t0 === null) t0 = ts; var k = Math.min(1, (ts - t0) / ms), e = 1 - Math.pow(1 - k, 3); step(e); if (k < 1) id = requestAnimationFrame(f); else if (end) end(); };
        id = requestAnimationFrame(f);
        return function () { stop = true; cancelAnimationFrame(id); };
    }
    function loop(fn) { if (reduce) { fn(0); return function () {}; } var id, stop = false, f = function (ts) { if (stop) return; fn(ts / 1000); id = requestAnimationFrame(f); }; id = requestAnimationFrame(f); return function () { stop = true; cancelAnimationFrame(id); }; }
    function line(x, a, b, c, d, col, w, dash) { x.beginPath(); x.setLineDash(dash || []); x.moveTo(a, b); x.lineTo(c, d); x.strokeStyle = col; x.lineWidth = w || 1; x.stroke(); x.setLineDash([]); }
    function dot(x, a, b, r, col) { x.beginPath(); x.arc(a, b, r, 0, 2 * PI); x.fillStyle = col; x.fill(); }
    function text(x, s, a, b, col, size, align, font) { x.font = (font || "500 ") + (size || 13) + "px 'IBM Plex Sans',system-ui,sans-serif"; x.fillStyle = col || W; x.textAlign = align || "left"; x.fillText(s, a, b); }
    function plane(cv, u, cx, cy) { // komplexe Ebene mit Einheit u Pixel
        var x = cv.x, i; cx = cx === undefined ? cv.W / 2 : cx; cy = cy === undefined ? cv.H / 2 : cy;
        for (i = -6; i <= 6; i += 1) { line(x, cx + i * u, 0, cx + i * u, cv.H, G); line(x, 0, cy + i * u, cv.W, cy + i * u, G); }
        line(x, 0, cy, cv.W, cy, "rgba(255,255,255,0.3)"); line(x, cx, 0, cx, cv.H, "rgba(255,255,255,0.3)");
        text(x, "Re", cv.W - 8, cy - 6, M, 11, "right"); text(x, "Im", cx + 6, 14, M, 11);
        return { X: function (re) { return cx + re * u; }, Y: function (im) { return cy - im * u; } };
    }

    // ---------- Zeta (Borwein) ----------
    var zeta = (function () {
        var n = 110, d = [], i, s = 0, term = 1 / n;
        for (i = 0; i <= n; i += 1) { s += term; d.push(n * s); term = term * 4 * (n + i) * (n - i) / ((2 * i + 1) * (2 * i + 2)); }
        return function (sr, si) {
            var re = 0, im = 0, k;
            for (k = 0; k < n; k += 1) { var c = (k % 2 ? -1 : 1) * (d[k] - d[n]), m = Math.pow(k + 1, -sr), a = -si * Math.log(k + 1); re += c * m * Math.cos(a); im += c * m * Math.sin(a); }
            re = -re / d[n]; im = -im / d[n];
            var m2 = Math.pow(2, 1 - sr), a2 = -si * Math.LN2, dr = 1 - m2 * Math.cos(a2), di = -m2 * Math.sin(a2), den = dr * dr + di * di;
            return [(re * dr + im * di) / den, (im * dr - re * di) / den];
        };
    })();
    var ZEROS = [14.134725, 21.02204, 25.010858, 30.424876, 32.935062, 37.586178, 40.918719, 43.327073, 48.005151, 49.773832, 52.970321, 56.446248, 59.347044, 60.831779, 65.112544, 67.079811, 69.546402, 72.067158, 75.704691, 77.14484, 79.337375, 82.910381, 84.735493, 87.425275, 88.809111, 92.491899, 94.651344, 95.870634, 98.831194, 101.317851];
    function primesTo(N) { var s = [], p = [], i, j; for (i = 2; i <= N; i += 1) { if (!s[i]) { p.push(i); for (j = i * i; j <= N; j += i) s[j] = 1; } } return p; }

    // =====================================================================
    // EULER
    // =====================================================================
    var euler = {
        id: "euler", icon: "🌀", level: 4,
        title: t("Die Euler-Formel", "Euler's formula"),
        lead: t("Warum e hoch i mal π gleich minus eins ist, und was Drehen damit zu tun hat.", "Why e to the i times π equals minus one, and what turning has to do with it."),
        scenes: [
            { title: t("Mal i heißt: Vierteldrehung", "Times i means: a quarter turn"),
              text: t("Jede komplexe Zahl ist ein Punkt in der Ebene. Multiplizierst du mit <b>i</b>, dreht sich der Punkt um 90° nach links. Zweimal gedreht landest du bei −1. Deshalb ist i² = −1.", "Every complex number is a point in the plane. Multiplying by <b>i</b> turns the point 90° to the left. Two turns land on −1. That is why i² = −1."),
              mount: function (stage, ctl) {
                  var cv = canvas(stage), ang = 0, cancel = null, names = ["1", "i", "−1", "−i"], count = 0, out = note(ctl);
                  cv.draw = function () {
                      cv.clear(); var u = Math.min(cv.W, cv.H) * 0.33, p = plane(cv, u), x = cv.x;
                      x.beginPath(); x.arc(p.X(0), p.Y(0), u, 0, 2 * PI); x.strokeStyle = "rgba(53,224,196,0.35)"; x.lineWidth = 1.5; x.stroke();
                      names.forEach(function (nm, k) { var a = k * PI / 2; dot(x, p.X(Math.cos(a)), p.Y(Math.sin(a)), 3, M); text(x, nm, p.X(Math.cos(a) * 1.18), p.Y(Math.sin(a) * 1.18) + 4, M, 13, "center"); });
                      line(x, p.X(0), p.Y(0), p.X(Math.cos(ang)), p.Y(Math.sin(ang)), Y, 3); dot(x, p.X(Math.cos(ang)), p.Y(Math.sin(ang)), 8, Y);
                  };
                  cv.fit();
                  var say = function () { out.innerHTML = "1" + new Array(count + 1).join(" · i") + " = <b>" + names[count % 4] + "</b>"; };
                  button(ctl, t("× i (drehen)", "× i (turn)"), function () { if (cancel) cancel(); var a0 = count * PI / 2; count += 1; say(); cancel = tween(520, function (e) { ang = a0 + e * PI / 2; cv.draw(); }); }, "btn-primary");
                  button(ctl, t("Zurück auf 1", "Back to 1"), function () { if (cancel) cancel(); count = 0; ang = 0; say(); cv.draw(); });
                  say();
                  return function () { if (cancel) cancel(); cv.off(); };
              } },
            { title: t("Viele kleine Drehungen", "Many small turns"),
              text: t("Zinsen wachsen mit (1 + x/n)<sup>n</sup>, und für große n wird daraus e<sup>x</sup>. Was passiert, wenn der Zins nicht geradeaus zeigt, sondern quer, also x = iπ ist? Jeder Schritt dreht ein kleines Stück. Schiebe n hoch und sieh, wohin die Kette läuft.", "Interest grows like (1 + x/n)<sup>n</sup>, and for large n this becomes e<sup>x</sup>. What happens if the interest does not point straight ahead but sideways, so x = iπ? Each step turns a little. Raise n and watch where the chain goes."),
              mount: function (stage, ctl) {
                  var cv = canvas(stage), n = 4, out = note(ctl);
                  cv.draw = function () {
                      cv.clear(); var u = Math.min(cv.W / 4.4, cv.H / 3.4), p = plane(cv, u, cv.W / 2, cv.H * 0.72), x = cv.x, re = 1, im = 0, k, a = PI / n;
                      x.beginPath(); x.arc(p.X(0), p.Y(0), u, PI, 2 * PI); x.strokeStyle = "rgba(53,224,196,0.3)"; x.setLineDash([4, 5]); x.stroke(); x.setLineDash([]);
                      x.beginPath(); x.moveTo(p.X(1), p.Y(0));
                      for (k = 0; k < n; k += 1) { var r2 = re - im * a, i2 = im + re * a; re = r2; im = i2; x.lineTo(p.X(re), p.Y(im)); }
                      x.strokeStyle = Y; x.lineWidth = 2.2; x.stroke();
                      var sr = 1, si = 0; for (k = 0; k < n && n <= 40; k += 1) { line(x, p.X(0), p.Y(0), p.X(sr), p.Y(si), "rgba(245,197,24,0.18)"); var r3 = sr - si * a; si = si + sr * a; sr = r3; }
                      dot(x, p.X(re), p.Y(im), 7, R); dot(x, p.X(-1), p.Y(0), 4, T); text(x, "−1", p.X(-1), p.Y(0) + 20, T, 13, "center"); text(x, "1", p.X(1), p.Y(0) + 20, M, 13, "center");
                      out.innerHTML = "(1 + iπ/" + n + ")<sup>" + n + "</sup> = <b>" + nf(re, 3) + (im < 0 ? " − " : " + ") + nf(Math.abs(im), 3) + " i</b>";
                  };
                  cv.fit();
                  slider(ctl, "n =", 1, 200, 1, n, function (v) { return String(v); }, function (v) { n = v; cv.draw(); });
                  return function () { cv.off(); };
              } },
            { title: t("Der Kreis und die Welle", "The circle and the wave"),
              text: t("Im Grenzfall läuft der Punkt genau auf dem Einheitskreis: e<sup>iφ</sup> ist der Punkt beim Winkel φ. Sein Schatten nach unten ist cos φ, sein Schatten zur Seite ist sin φ. Rollst du den Winkel ab, entsteht die Welle. Zieh am Regler.", "In the limit the point runs exactly on the unit circle: e<sup>iφ</sup> is the point at angle φ. Its shadow below is cos φ, its shadow to the side is sin φ. Unroll the angle and the wave appears. Move the slider."),
              mount: function (stage, ctl) {
                  var cv = canvas(stage, 0.56), phi = 1, out = note(ctl), stop = null, sl;
                  cv.draw = function () {
                      cv.clear(); var x = cv.x, u = Math.min(cv.H * 0.36, cv.W * 0.17), cx = u + 26, cy = cv.H / 2, wx = cx + u + 30, ww = cv.W - wx - 12, k;
                      line(x, 8, cy, cv.W - 8, cy, "rgba(255,255,255,0.22)"); line(x, cx, cy - u - 14, cx, cy + u + 14, "rgba(255,255,255,0.22)");
                      x.beginPath(); x.arc(cx, cy, u, 0, 2 * PI); x.strokeStyle = "rgba(255,255,255,0.35)"; x.lineWidth = 1.5; x.stroke();
                      x.beginPath(); x.arc(cx, cy, u * 0.3, 0, -phi, true); x.strokeStyle = Y; x.lineWidth = 2; x.stroke();
                      var px = cx + u * Math.cos(phi), py = cy - u * Math.sin(phi);
                      line(x, cx, cy, px, py, Y, 2.5); line(x, px, py, px, cy, B, 2, [4, 4]); line(x, cx, cy, px, cy, T, 3); line(x, cx, py, px, py, "rgba(233,69,96,0.5)", 1, [3, 4]);
                      x.beginPath(); for (k = 0; k <= 200; k += 1) { var a = k / 200 * 2 * PI, X = wx + a / (2 * PI) * ww, Yv = cy - u * Math.sin(a); if (k) x.lineTo(X, Yv); else x.moveTo(X, Yv); } x.strokeStyle = "rgba(233,69,96,0.85)"; x.lineWidth = 2.2; x.stroke();
                      x.beginPath(); for (k = 0; k <= 200; k += 1) { var a2 = k / 200 * 2 * PI, X2 = wx + a2 / (2 * PI) * ww, Y2 = cy - u * Math.cos(a2); if (k) x.lineTo(X2, Y2); else x.moveTo(X2, Y2); } x.strokeStyle = "rgba(53,224,196,0.6)"; x.lineWidth = 1.6; x.stroke();
                      var mx = wx + phi / (2 * PI) * ww; line(x, mx, cy - u - 8, mx, cy + u + 8, "rgba(255,255,255,0.25)", 1, [3, 4]); line(x, px, py, mx, py, "rgba(233,69,96,0.5)", 1, [3, 4]);
                      dot(x, mx, py, 5.5, R); dot(x, mx, cy - u * Math.cos(phi), 4.5, T); dot(x, px, py, 7, Y);
                      text(x, "sin φ", cv.W - 10, cy - u - 2, R, 12, "right"); text(x, "cos φ", cv.W - 10, cy + u + 12, T, 12, "right");
                      out.innerHTML = "e<sup>i·" + nf(phi, 2) + "</sup> = <span style='color:" + T + "'>" + nf(Math.cos(phi), 3) + "</span> " + (Math.sin(phi) < 0 ? "−" : "+") + " <span style='color:" + R + "'>" + nf(Math.abs(Math.sin(phi)), 3) + "</span> i";
                  };
                  cv.fit();
                  sl = slider(ctl, "φ =", 0, 6.283, 0.001, phi, function (v) { return nf(v, 2) + " (" + Math.round(v * 180 / PI) + "°)"; }, function (v) { phi = v; cv.draw(); });
                  button(ctl, t("▶ Einmal herum", "▶ Once around"), function () { if (stop) stop(); stop = tween(4200, function (e) { phi = e * 2 * PI; sl.set(phi); cv.draw(); }); });
                  return function () { if (stop) stop(); cv.off(); };
              } },
            { title: t("Die schönste Formel", "The most beautiful formula"),
              text: t("Dreh jetzt genau bis φ = π, also eine halbe Umdrehung. Der Punkt landet bei −1. Das ist alles: <b>e<sup>iπ</sup> = −1</b>, oder e<sup>iπ</sup> + 1 = 0. Eine Gleichung mit e, i, π, 1 und 0.", "Now turn exactly to φ = π, half a turn. The point lands on −1. That is all: <b>e<sup>iπ</sup> = −1</b>, or e<sup>iπ</sup> + 1 = 0. One equation with e, i, π, 1 and 0."),
              mount: function (stage, ctl) {
                  var cv = canvas(stage), phi = 0, stop = null, glow = 0;
                  cv.draw = function () {
                      cv.clear(); var u = Math.min(cv.W, cv.H) * 0.33, p = plane(cv, u), x = cv.x;
                      x.beginPath(); x.arc(p.X(0), p.Y(0), u, 0, 2 * PI); x.strokeStyle = "rgba(255,255,255,0.3)"; x.lineWidth = 1.5; x.stroke();
                      x.beginPath(); x.arc(p.X(0), p.Y(0), u, 0, -phi, true); x.strokeStyle = Y; x.lineWidth = 4; x.stroke();
                      if (glow > 0) { x.beginPath(); x.arc(p.X(-1), p.Y(0), 10 + glow * 36, 0, 2 * PI); x.strokeStyle = "rgba(53,224,196," + (1 - glow) + ")"; x.lineWidth = 3; x.stroke(); }
                      line(x, p.X(0), p.Y(0), p.X(Math.cos(phi)), p.Y(Math.sin(phi)), Y, 2.5); dot(x, p.X(Math.cos(phi)), p.Y(Math.sin(phi)), 8, Y);
                      text(x, "1", p.X(1) + 12, p.Y(0) + 18, M, 13); text(x, "−1", p.X(-1) - 12, p.Y(0) + 18, T, 14, "right", "700 ");
                      text(x, "e^(i·" + nf(phi, 2) + ")", p.X(Math.cos(phi) * 1.25), p.Y(Math.sin(phi) * 1.25), W, 13, "center");
                      if (phi >= PI - 1e-6) text(x, "e^(iπ) + 1 = 0", cv.W / 2, cv.H - 16, Y, 20, "center", "700 ");
                  };
                  cv.fit();
                  button(ctl, t("▶ Auf π drehen", "▶ Turn to π"), function () { if (stop) stop(); stop = tween(2600, function (e) { phi = e * PI; cv.draw(); }, function () { if (root.SOR_FX) SOR_FX.celebrate(stage); stop = tween(900, function (e) { glow = e; cv.draw(); }, function () { glow = 0; cv.draw(); }); }); }, "btn-primary");
                  return function () { if (stop) stop(); cv.off(); };
              } }
        ],
        quiz: { q: t("Wo liegt e<sup>iπ/2</sup>?", "Where is e<sup>iπ/2</sup>?"), options: ["i", "−1", "1", "−i"], right: 0, why: t("π/2 ist eine Vierteldrehung. Die landet bei i.", "π/2 is a quarter turn. It lands on i.") }
    };

    // =====================================================================
    // BASEL
    // =====================================================================
    var basel = {
        id: "basel", icon: "🧮", level: 4,
        title: t("Das Basler Problem", "The Basel problem"),
        lead: t("1 + 1/4 + 1/9 + 1/16 + … ergibt genau π²/6. Wie kommt π in eine Summe aus Brüchen?", "1 + 1/4 + 1/9 + 1/16 + … is exactly π²/6. How does π get into a sum of fractions?"),
        scenes: [
            { title: t("Quadrate stapeln", "Stacking squares"),
              text: t("Nimm ein Quadrat mit Seite 1, eines mit Seite 1/2, eines mit Seite 1/3 und so weiter. Ihre Flächen sind 1, 1/4, 1/9, … Wie groß ist die Fläche aller Quadrate zusammen? Füge Quadrate hinzu und beobachte die Summe.", "Take a square with side 1, one with side 1/2, one with side 1/3 and so on. Their areas are 1, 1/4, 1/9, … How large is the total area of all squares? Add squares and watch the sum."),
              mount: function (stage, ctl) {
                  var cv = canvas(stage, 0.5), N = 3, out = note(ctl), cols = [Y, T, R, B, V, "#a3e635"];
                  cv.draw = function () {
                      cv.clear(); var x = cv.x, u = Math.min(cv.H - 60, (cv.W - 30) / 2.2), X = 14, base = cv.H - 26, k, s = 0;
                      for (k = 1; k <= N; k += 1) { var a = u / k; x.fillStyle = cols[(k - 1) % 6]; x.globalAlpha = 0.85; x.fillRect(X, base - a, a - (a > 3 ? 1.5 : 0), a); x.globalAlpha = 1; if (a > 26) text(x, k === 1 ? "1" : "1/" + k * k, X + a / 2, base - a / 2 + 5, "#0a0e1c", Math.min(18, a / 3), "center", "700 "); X += a; s += 1 / (k * k); if (X > cv.W) break; }
                      line(x, 14, base + 6, 14 + u * 2.2, base + 6, "rgba(255,255,255,0.25)");
                      out.innerHTML = t("Summe der ersten ", "Sum of the first ") + N + t(" Flächen: ", " areas: ") + "<b>" + nf(s, 5) + "</b>";
                  };
                  cv.fit();
                  slider(ctl, t("Anzahl Quadrate", "Number of squares"), 1, 200, 1, N, function (v) { return String(v); }, function (v) { N = v; cv.draw(); });
                  return function () { cv.off(); };
              } },
            { title: t("Die Summe bleibt stehen", "The sum settles"),
              text: t("Die Summe wächst immer langsamer und kommt über 1,645 nicht hinaus. Zum Vergleich: 1 + 1/2 + 1/3 + … (ohne Quadrate) wächst ohne Grenze. Die Mathematiker in Basel suchten 90 Jahre nach dem genauen Wert. Euler fand ihn 1734: π²/6.", "The sum grows ever more slowly and never passes 1.645. For comparison: 1 + 1/2 + 1/3 + … (without squares) grows without bound. The mathematicians in Basel searched for the exact value for 90 years. Euler found it in 1734: π²/6."),
              mount: function (stage, ctl) {
                  var cv = canvas(stage, 0.56), N = 20, out = note(ctl), lim = PI * PI / 6;
                  cv.draw = function () {
                      cv.clear(); var x = cv.x, L = 44, Rr = cv.W - 14, Tp = 16, Bt = cv.H - 28, ymax = 6, k, s = 0, h = 0;
                      var px = function (n) { return L + (Rr - L) * Math.log(n) / Math.log(1000); }, py = function (v) { return Bt - (Bt - Tp) * Math.min(v, ymax) / ymax; };
                      for (k = 0; k <= 6; k += 1) { line(x, L, py(k), Rr, py(k), G); text(x, String(k), L - 8, py(k) + 4, M, 11, "right"); }
                      [1, 10, 100, 1000].forEach(function (n) { text(x, "n = " + n, px(n), cv.H - 8, M, 11, "center"); });
                      line(x, L, py(lim), Rr, py(lim), "rgba(245,197,24,0.7)", 1.5, [6, 5]); text(x, "π²/6 ≈ " + nf(lim, 4), Rr, py(lim) - 7, Y, 12, "right");
                      x.beginPath(); for (k = 1; k <= N; k += 1) { s += 1 / (k * k); if (k === 1) x.moveTo(px(k), py(s)); else x.lineTo(px(k), py(s)); } x.strokeStyle = Y; x.lineWidth = 2.6; x.stroke(); dot(x, px(N), py(s), 5, Y);
                      x.beginPath(); for (k = 1; k <= N; k += 1) { h += 1 / k; if (k === 1) x.moveTo(px(k), py(h)); else x.lineTo(px(k), py(h)); } x.strokeStyle = R; x.lineWidth = 2; x.stroke(); dot(x, px(N), py(h), 4.5, R);
                      text(x, "Σ 1/n", px(N) - 8, py(h) - 8, R, 12, "right"); text(x, "Σ 1/n²", px(N) - 8, py(s) + 18, Y, 12, "right");
                      out.innerHTML = "Σ 1/n² = <b>" + nf(s, 5) + "</b> · " + t("fehlt noch ", "still missing ") + nf(lim - s, 5) + " · Σ 1/n = " + nf(h, 3);
                  };
                  cv.fit();
                  slider(ctl, "n =", 1, 1000, 1, N, function (v) { return String(v); }, function (v) { N = v; cv.draw(); });
                  return function () { cv.off(); };
              } },
            { title: t("Eulers Trick mit dem Sinus", "Euler's trick with the sine"),
              text: t("sin(x)/x hat Nullstellen bei ±π, ±2π, ±3π, … Euler schrieb die Funktion deshalb als Produkt: (1 − x²/π²)(1 − x²/4π²)(1 − x²/9π²)… Multipliziert man aus, steht vor x² die Zahl −(1/π²)(1 + 1/4 + 1/9 + …). In der bekannten Reihe sin(x)/x = 1 − x²/6 + … steht dort −1/6. Beide müssen gleich sein. Erhöhe die Zahl der Faktoren.", "sin(x)/x has zeros at ±π, ±2π, ±3π, … So Euler wrote the function as a product: (1 − x²/π²)(1 − x²/4π²)(1 − x²/9π²)… Multiplied out, the number in front of x² is −(1/π²)(1 + 1/4 + 1/9 + …). In the known series sin(x)/x = 1 − x²/6 + … it is −1/6. Both must be equal. Raise the number of factors."),
              mount: function (stage, ctl) {
                  var cv = canvas(stage, 0.52), K = 2, out = note(ctl);
                  cv.draw = function () {
                      cv.clear(); var x = cv.x, xm = 14, cy = cv.H * 0.62, sy = cv.H * 0.5, i, k, sum = 0;
                      var px = function (v) { return cv.W / 2 + v / xm * (cv.W / 2 - 10); }, py = function (v) { return cy - v * sy; };
                      line(x, 0, cy, cv.W, cy, "rgba(255,255,255,0.3)"); line(x, cv.W / 2, 8, cv.W / 2, cv.H - 8, "rgba(255,255,255,0.2)");
                      for (k = -4; k <= 4; k += 1) if (k) { dot(x, px(k * PI), cy, 3, k * k <= K * K ? T : M); text(x, (k < 0 ? "−" : "") + (Math.abs(k) === 1 ? "" : Math.abs(k)) + "π", px(k * PI), cy + 18, k * k <= K * K ? T : M, 11, "center"); }
                      x.beginPath(); for (i = 0; i <= 400; i += 1) { var v = -xm + 2 * xm * i / 400, f = Math.abs(v) < 1e-9 ? 1 : Math.sin(v) / v; if (i) x.lineTo(px(v), py(f)); else x.moveTo(px(v), py(f)); } x.strokeStyle = "rgba(255,255,255,0.75)"; x.lineWidth = 2; x.stroke();
                      x.save(); x.beginPath(); x.rect(0, 0, cv.W, cv.H); x.clip(); x.beginPath();
                      for (i = 0; i <= 400; i += 1) { var v2 = -xm + 2 * xm * i / 400, pr = 1; for (k = 1; k <= K; k += 1) pr *= 1 - v2 * v2 / (k * k * PI * PI); var yy = Math.max(-3, Math.min(3, pr)); if (i) x.lineTo(px(v2), py(yy)); else x.moveTo(px(v2), py(yy)); }
                      x.strokeStyle = Y; x.lineWidth = 2.4; x.stroke(); x.restore();
                      for (k = 1; k <= K; k += 1) sum += 1 / (k * k);
                      text(x, "sin(x)/x", 12, 20, W, 12); text(x, t("Produkt aus ", "product of ") + K + t(" Faktoren", " factors"), 12, 38, Y, 12);
                      out.innerHTML = t("Zahl vor x²: ", "Number in front of x²: ") + "−(1/π²) · " + nf(sum, 4) + " = <b>" + nf(-sum / (PI * PI), 5) + "</b> · " + t("Ziel: −1/6 = ", "target: −1/6 = ") + nf(-1 / 6, 5);
                  };
                  cv.fit();
                  slider(ctl, t("Faktoren", "Factors"), 1, 60, 1, K, function (v) { return String(v); }, function (v) { K = v; cv.draw(); });
                  return function () { cv.off(); };
              } },
            { title: t("π²/6 im Zufall", "π²/6 in chance"),
              text: t("Dieselbe Zahl taucht an einer ganz anderen Stelle auf: Würfle zwei große ganze Zahlen. Die Wahrscheinlichkeit, dass sie keinen gemeinsamen Teiler haben, ist 6/π² ≈ 61 %. Probiere es aus: Türkis heißt teilerfremd.", "The same number appears in a very different place: roll two large whole numbers. The probability that they share no common divisor is 6/π² ≈ 61 %. Try it: teal means coprime."),
              mount: function (stage, ctl) {
                  var cv = canvas(stage, 0.5), pts = [], hit = 0, out = note(ctl);
                  var gcd = function (a, b) { while (b) { var r = a % b; a = b; b = r; } return a; };
                  cv.draw = function () {
                      cv.clear(); var x = cv.x; pts.forEach(function (p) { dot(x, 8 + p[0] * (cv.W - 16), 8 + p[1] * (cv.H - 16), 2.6, p[2] ? T : "rgba(233,69,96,0.75)"); });
                      var n = pts.length; out.innerHTML = n ? t("Paare: ", "Pairs: ") + n + " · " + t("teilerfremd: ", "coprime: ") + "<b>" + nf(100 * hit / n, 1) + " %</b> · 6/π² = " + nf(600 / (PI * PI), 1) + " % · " + t("daraus π ≈ ", "so π ≈ ") + "<b>" + (hit ? nf(Math.sqrt(6 * n / hit), 4) : "?") + "</b>" : t("Noch keine Paare gewürfelt.", "No pairs rolled yet.");
                  };
                  cv.fit();
                  var roll = function (k) { for (var i = 0; i < k; i += 1) { var a = 1 + Math.floor(Math.random() * 1e6), b = 1 + Math.floor(Math.random() * 1e6), g = gcd(a, b) === 1; if (g) hit += 1; pts.push([Math.random(), Math.random(), g]); } if (pts.length > 6000) pts.splice(0, pts.length - 6000); cv.draw(); };
                  button(ctl, t("100 Paare würfeln", "Roll 100 pairs"), function () { roll(100); }, "btn-primary");
                  button(ctl, t("2000 Paare", "2000 pairs"), function () { roll(2000); });
                  button(ctl, t("Neu", "Reset"), function () { pts = []; hit = 0; cv.draw(); });
                  return function () { cv.off(); };
              } }
        ],
        quiz: { q: t("Welchen Wert hat 1 + 1/4 + 1/9 + 1/16 + …?", "What is the value of 1 + 1/4 + 1/9 + 1/16 + …?"), options: ["π²/6", "2", "π/2", t("unendlich", "infinity")], right: 0, why: t("Euler zeigte 1734: Die Summe ist π²/6 ≈ 1,645.", "Euler showed in 1734: the sum is π²/6 ≈ 1.645.") }
    };

    // =====================================================================
    // RIEMANN
    // =====================================================================
    var riemann = {
        id: "riemann", icon: "🎼", level: 6,
        title: t("Die Riemann-Hypothese", "The Riemann hypothesis"),
        lead: t("Das berühmteste ungelöste Problem der Mathematik: Wie regelmäßig sind die Primzahlen verteilt?", "The most famous unsolved problem in mathematics: how regularly are the primes distributed?"),
        scenes: [
            { title: t("Primzahlen aussieben", "Sieving the primes"),
              text: t("Eine Primzahl ist nur durch 1 und sich selbst teilbar. Das Sieb des Eratosthenes streicht alle Vielfachen von 2, dann von 3, 5, 7. Was übrig bleibt, sind die Primzahlen. Ein Muster ist nicht zu erkennen.", "A prime is divisible only by 1 and itself. The sieve of Eratosthenes strikes out all multiples of 2, then of 3, 5, 7. What remains are the primes. No pattern is visible."),
              mount: function (stage, ctl) {
                  var cv = canvas(stage, 0.6), N = 120, state = [], step = 0, P = [2, 3, 5, 7], out = note(ctl), cols = [R, B, V, "#ff9f43"], timer = null;
                  var reset = function () { state = []; step = 0; cv.draw(); out.textContent = t("Starte das Sieb.", "Start the sieve."); };
                  cv.draw = function () {
                      cv.clear(); var x = cv.x, cols_n = 12, cw = (cv.W - 8) / cols_n, ch = (cv.H - 8) / 10, n;
                      for (n = 1; n <= N; n += 1) { var cx = 4 + ((n - 1) % cols_n) * cw, cy = 4 + Math.floor((n - 1) / cols_n) * ch, st = state[n], prime = step >= 4 && !st && n > 1;
                          x.fillStyle = st ? "rgba(255,255,255,0.03)" : prime || P.indexOf(n) >= 0 && step > P.indexOf(n) ? "rgba(245,197,24,0.9)" : "rgba(255,255,255,0.08)"; x.fillRect(cx + 2, cy + 2, cw - 4, ch - 4);
                          text(x, String(n), cx + cw / 2, cy + ch / 2 + 4, st ? cols[st - 1] : prime || (P.indexOf(n) >= 0 && step > P.indexOf(n)) ? "#0a0e1c" : W, Math.min(14, ch * 0.42), "center", st ? "400 " : "600 "); if (st) { x.globalAlpha = 0.5; line(x, cx + 6, cy + ch - 6, cx + cw - 6, cy + 6, cols[st - 1], 1.2); x.globalAlpha = 1; } }
                  };
                  cv.fit(); reset();
                  var next = function () { if (step >= 4) return; var p = P[step], m; state[1] = state[1] || 1; for (m = p * 2; m <= N; m += p) if (!state[m]) state[m] = step + 1; step += 1; cv.draw(); out.innerHTML = step < 4 ? t("Vielfache von ", "Multiples of ") + p + t(" gestrichen.", " struck out.") : t("Fertig: <b>30 Primzahlen</b> bis 120.", "Done: <b>30 primes</b> up to 120."); };
                  button(ctl, t("Nächster Schritt", "Next step"), next, "btn-primary");
                  button(ctl, t("▶ Alles sieben", "▶ Sieve all"), function () { clearInterval(timer); reset(); timer = setInterval(function () { next(); if (step >= 4) clearInterval(timer); }, reduce ? 10 : 800); });
                  button(ctl, t("Neu", "Reset"), function () { clearInterval(timer); reset(); });
                  return function () { clearInterval(timer); cv.off(); };
              } },
            { title: t("Die Primzahl-Treppe", "The prime staircase"),
              text: t("Zähle mit: π(x) ist die Anzahl der Primzahlen bis x. Bei jeder Primzahl steigt die Treppe um eine Stufe. Aus der Nähe ist sie zackig, aus der Ferne erstaunlich glatt. Gauß vermutete als Näherung x/ln x, noch besser passt das Integral Li(x). Zoome heraus.", "Count along: π(x) is the number of primes up to x. At every prime the staircase rises by one step. Up close it is jagged, from far away surprisingly smooth. Gauss guessed the approximation x/ln x, the integral Li(x) fits even better. Zoom out."),
              mount: function (stage, ctl) {
                  var cv = canvas(stage, 0.56), X = 100, P = primesTo(100000), out = note(ctl);
                  var li = function (x) { var s = 0, n = 400, a = 2, h = (x - a) / n, i; for (i = 0; i <= n; i += 1) s += (i === 0 || i === n ? 1 : i % 2 ? 4 : 2) / Math.log(a + i * h); return s * h / 3 + 1.0451; };
                  cv.draw = function () {
                      cv.clear(); var x = cv.x, L = 46, Rr = cv.W - 12, Tp = 14, Bt = cv.H - 26, cnt = 0, i; while (cnt < P.length && P[cnt] <= X) cnt += 1;
                      var ymax = cnt * 1.12 + 1, px = function (v) { return L + (Rr - L) * v / X; }, py = function (v) { return Bt - (Bt - Tp) * v / ymax; };
                      line(x, L, Bt, Rr, Bt, "rgba(255,255,255,0.3)"); line(x, L, Tp, L, Bt, "rgba(255,255,255,0.3)");
                      for (i = 0; i <= 4; i += 1) { text(x, String(Math.round(X * i / 4)), px(X * i / 4), cv.H - 8, M, 11, "center"); text(x, String(Math.round(ymax * i / 4)), L - 6, py(ymax * i / 4) + 4, M, 11, "right"); line(x, L, py(ymax * i / 4), Rr, py(ymax * i / 4), G); }
                      x.beginPath(); for (i = 0; i <= 200; i += 1) { var v = 2 + (X - 2) * i / 200, f = v / Math.log(v); if (i) x.lineTo(px(v), py(f)); else x.moveTo(px(v), py(f)); } x.strokeStyle = B; x.lineWidth = 1.8; x.stroke();
                      x.beginPath(); for (i = 0; i <= 60; i += 1) { var v2 = 2 + (X - 2) * i / 60, f2 = li(v2); if (i) x.lineTo(px(v2), py(f2)); else x.moveTo(px(v2), py(f2)); } x.strokeStyle = T; x.lineWidth = 1.8; x.stroke();
                      x.beginPath(); x.moveTo(px(0), py(0)); for (i = 0; i < cnt; i += 1) { x.lineTo(px(P[i]), py(i)); x.lineTo(px(P[i]), py(i + 1)); } x.lineTo(px(X), py(cnt)); x.strokeStyle = Y; x.lineWidth = 2.2; x.stroke();
                      text(x, "π(x)", L + 10, Tp + 12, Y, 12); text(x, "Li(x)", L + 54, Tp + 12, T, 12); text(x, "x / ln x", L + 100, Tp + 12, B, 12);
                      out.innerHTML = "π(" + X + ") = <b>" + cnt + "</b> · Li(x) ≈ " + nf(li(X), 1) + " · x/ln x ≈ " + nf(X / Math.log(X), 1);
                  };
                  cv.fit();
                  slider(ctl, "x =", 1.3, 5, 0.01, 2, function (v) { return String(Math.round(Math.pow(10, v))); }, function (v) { X = Math.round(Math.pow(10, v)); cv.draw(); });
                  return function () { cv.off(); };
              } },
            { title: t("Die Zeta-Funktion", "The zeta function"),
              text: t("Riemann untersuchte ζ(s) = 1 + 1/2<sup>s</sup> + 1/3<sup>s</sup> + … (für s = 2 ist das genau das Basler Problem). Für komplexe s kann ζ den Wert null annehmen. Links läuft s die Gerade Re s = 1/2 hinauf, rechts siehst du den Wert ζ(s). Jedes Mal, wenn die Kurve durch den Ursprung geht, liegt dort eine Nullstelle.", "Riemann studied ζ(s) = 1 + 1/2<sup>s</sup> + 1/3<sup>s</sup> + … (for s = 2 this is exactly the Basel problem). For complex s, ζ can take the value zero. On the left s runs up the line Re s = 1/2, on the right you see the value ζ(s). Every time the curve passes through the origin there is a zero."),
              mount: function (stage, ctl) {
                  var cv = canvas(stage, 0.6), tt = 0, stop = null, out = note(ctl), path = [], k, sl;
                  for (k = 0; k <= 1500; k += 1) path.push(zeta(0.5, k * 0.04));
                  cv.draw = function () {
                      cv.clear(); var x = cv.x, lw = Math.min(150, cv.W * 0.24), Bt = cv.H - 14, Tp = 14, yT = function (v) { return Bt - (Bt - Tp) * v / 60; }, sx = lw * 0.55;
                      x.fillStyle = "rgba(96,165,250,0.08)"; x.fillRect(lw * 0.2, Tp, lw * 0.7, Bt - Tp); line(x, sx, Tp, sx, Bt, B, 1.6); text(x, "Re s = ½", sx, Tp - 3, B, 10, "center");
                      ZEROS.forEach(function (z) { if (z < 60) { dot(x, sx, yT(z), 3.2, z <= tt ? T : "rgba(255,255,255,0.35)"); } });
                      dot(x, sx, yT(tt), 6, Y); text(x, "t = " + nf(tt, 1), sx + 12, yT(tt) + 4, Y, 12);
                      var u = Math.min((cv.W - lw) / 6.4, cv.H / 4.6), cx = lw + (cv.W - lw) * 0.42, cy = cv.H / 2, n = Math.round(tt / 0.04), i;
                      line(x, lw + 8, cy, cv.W - 6, cy, "rgba(255,255,255,0.25)"); line(x, cx, 6, cx, cv.H - 6, "rgba(255,255,255,0.25)");
                      x.beginPath(); for (i = Math.max(0, n - 500); i <= n; i += 1) { var p = path[i], X = cx + p[0] * u, Yv = cy - p[1] * u; if (i === Math.max(0, n - 500)) x.moveTo(X, Yv); else x.lineTo(X, Yv); } x.strokeStyle = Y; x.lineWidth = 2; x.stroke();
                      dot(x, cx, cy, 5, T); var pn = path[n]; dot(x, cx + pn[0] * u, cy - pn[1] * u, 6, R); text(x, "ζ(½ + it)", cv.W - 10, 18, W, 12, "right"); text(x, "0", cx - 10, cy + 16, T, 12, "right");
                      var zc = ZEROS.filter(function (z) { return z <= tt; }).length;
                      out.innerHTML = "|ζ(½ + " + nf(tt, 1) + " i)| = <b>" + nf(Math.hypot(pn[0], pn[1]), 3) + "</b> · " + t("Nullstellen bisher: ", "zeros so far: ") + "<b>" + zc + "</b>" + (zc ? " (t ≈ " + ZEROS.slice(0, zc).slice(-3).map(function (z) { return nf(z, 2); }).join("; ") + ")" : "");
                  };
                  cv.fit();
                  sl = slider(ctl, "t =", 0, 60, 0.04, 0, function (v) { return nf(v, 1); }, function (v) { tt = v; cv.draw(); });
                  button(ctl, t("▶ Hinauflaufen", "▶ Run upwards"), function () { if (stop) stop(); var t0 = null; stop = loop(function (ts) { if (t0 === null) t0 = ts; tt = Math.min(60, (ts - t0) * 3); sl.set(tt); cv.draw(); if (tt >= 60 && stop) stop(); }); if (reduce) { tt = 60; sl.set(60); cv.draw(); } }, "btn-primary");
                  return function () { if (stop) stop(); cv.off(); };
              } },
            { title: t("Die Musik der Primzahlen", "The music of the primes"),
              text: t("Jetzt das Erstaunliche: Jede Nullstelle liefert eine Welle. Addierst du die Wellen, entsteht Stufe für Stufe die Primzahl-Treppe (hier in der gewichteten Form ψ(x)). Die Nullstellen sind die Töne, die Primzahlen sind die Melodie. <b>Riemanns Vermutung von 1859:</b> Alle diese Nullstellen liegen genau auf der Geraden Re s = 1/2. Dann sind die Primzahlen so gleichmäßig verteilt wie überhaupt möglich. Geprüft sind über 10 Billionen Nullstellen, bewiesen ist nichts. Auf den Beweis ist eine Million Dollar ausgesetzt.", "Now the astonishing part: every zero contributes a wave. Add the waves and step by step the prime staircase appears (here in the weighted form ψ(x)). The zeros are the notes, the primes are the melody. <b>Riemann's conjecture of 1859:</b> all these zeros lie exactly on the line Re s = 1/2. Then the primes are distributed as evenly as possible at all. More than 10 trillion zeros have been checked, nothing is proved. A million dollars is offered for the proof."),
              mount: function (stage, ctl) {
                  var cv = canvas(stage, 0.56), K = 0, X = 50, out = note(ctl), PW = [], n, p, e;
                  primesTo(X).forEach(function (q) { for (e = q; e <= X; e *= q) PW.push([e, Math.log(q)]); }); PW.sort(function (a, b) { return a[0] - b[0]; });
                  var psi0 = function (x) { var s = x - Math.log(2 * PI) - 0.5 * Math.log(1 - 1 / (x * x)), k, lx = Math.log(x), sq = Math.sqrt(x); for (k = 0; k < K; k += 1) { var g = ZEROS[k]; s -= 2 * sq * (0.5 * Math.cos(g * lx) + g * Math.sin(g * lx)) / (0.25 + g * g); } return s; };
                  cv.draw = function () {
                      cv.clear(); var x = cv.x, L = 40, Rr = cv.W - 12, Tp = 14, Bt = cv.H - 26, i, s = 0, px = function (v) { return L + (Rr - L) * (v - 1) / (X - 1); }, py = function (v) { return Bt - (Bt - Tp) * v / (X * 1.05); };
                      line(x, L, Bt, Rr, Bt, "rgba(255,255,255,0.3)"); line(x, L, Tp, L, Bt, "rgba(255,255,255,0.3)");
                      for (i = 0; i <= 5; i += 1) { text(x, String(i * 10), px(Math.max(1, i * 10)), cv.H - 8, M, 11, "center"); line(x, L, py(i * 10), Rr, py(i * 10), G); text(x, String(i * 10), L - 6, py(i * 10) + 4, M, 11, "right"); }
                      x.beginPath(); x.moveTo(px(1), py(0)); PW.forEach(function (q) { x.lineTo(px(q[0]), py(s)); s += q[1]; x.lineTo(px(q[0]), py(s)); }); x.lineTo(px(X), py(s)); x.strokeStyle = "rgba(255,255,255,0.55)"; x.lineWidth = 1.6; x.stroke();
                      x.beginPath(); for (i = 0; i <= 700; i += 1) { var v = 1.5 + (X - 1.5) * i / 700, f = psi0(v); if (i) x.lineTo(px(v), py(f)); else x.moveTo(px(v), py(f)); } x.strokeStyle = Y; x.lineWidth = 2.3; x.stroke();
                      text(x, "ψ(x)", L + 10, Tp + 12, "rgba(255,255,255,0.8)", 12); text(x, K + t(" Nullstellen-Wellen", " zero waves"), L + 54, Tp + 12, Y, 12);
                      out.innerHTML = K === 0 ? t("Ohne Nullstellen: nur die glatte Gerade.", "Without zeros: only the smooth line.") : t("Mit ", "With ") + "<b>" + K + "</b>" + t(" Nullstellen. Die Stufen bei 2, 3, 4, 5, 7, 8, 9, 11 … werden sichtbar.", " zeros. The steps at 2, 3, 4, 5, 7, 8, 9, 11 … become visible.");
                  };
                  cv.fit();
                  slider(ctl, t("Nullstellen", "Zeros"), 0, 30, 1, 0, function (v) { return String(v); }, function (v) { K = v; cv.draw(); });
                  return function () { cv.off(); };
              } }
        ],
        quiz: { q: t("Was behauptet die Riemann-Hypothese?", "What does the Riemann hypothesis claim?"), options: [t("Alle nichttrivialen Nullstellen von ζ haben Realteil 1/2.", "All non-trivial zeros of ζ have real part 1/2."), t("Es gibt unendlich viele Primzahlen.", "There are infinitely many primes."), t("Jede gerade Zahl ist Summe zweier Primzahlen.", "Every even number is the sum of two primes."), t("ζ hat keine Nullstellen.", "ζ has no zeros.")], right: 0, why: t("Unendlich viele Primzahlen bewies schon Euklid. Die Aussage über die Summe zweier Primzahlen ist die Goldbach-Vermutung.", "Infinitely many primes was already proved by Euclid. The statement about sums of two primes is Goldbach's conjecture.") }
    };

    // =====================================================================
    // GÖDEL
    // =====================================================================
    var SYM = ["0", "S", "+", "×", "=", "(", ")", "x", "¬", "∀"], PR = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
    function html(stage, h) { var d = document.createElement("div"); d.className = "w-html"; d.innerHTML = h; stage.appendChild(d); return d; }
    var goedel = {
        id: "goedel", icon: "♾️", level: 6,
        title: t("Gödels Unvollständigkeitssatz", "Gödel's incompleteness theorem"),
        lead: t("Warum es in der Mathematik wahre Sätze gibt, die sich nicht beweisen lassen.", "Why mathematics contains true statements that cannot be proved."),
        scenes: [
            { title: t("Der Lügner", "The liar"),
              text: t("Ein alter Trick: „Dieser Satz ist falsch.“ Entscheide dich, ob er wahr oder falsch ist, und sieh, was passiert. Gödel baute 1931 aus dieser Idee einen Satz, der keinen Widerspruch erzeugt, aber etwas Erstaunliches zeigt.", "An old trick: \"This sentence is false.\" Decide whether it is true or false and see what happens. In 1931 Gödel turned this idea into a sentence that creates no contradiction but shows something astonishing."),
              mount: function (stage, ctl) {
                  var box = html(stage, '<div class="w-liar"><div class="w-card w-big">' + t("Dieser Satz ist falsch.", "This sentence is false.") + '</div><div class="w-flip" aria-live="polite"></div></div>'), out = box.querySelector(".w-flip"), timer = null;
                  var run = function (v) { clearInterval(timer); var n = 0, cur = v, show = function () { out.innerHTML = '<span class="w-chip ' + (cur ? "ok" : "no") + '">' + (cur ? t("wahr", "true") : t("falsch", "false")) + "</span> → " + (cur ? t("dann stimmt, was er sagt: Er ist falsch.", "then what it says holds: it is false.") : t("dann stimmt nicht, was er sagt: Er ist wahr.", "then what it says does not hold: it is true.")); if (out.animate && !reduce) out.animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { duration: 260 }); }; show(); timer = setInterval(function () { cur = !cur; n += 1; show(); if (n >= 5) { clearInterval(timer); out.innerHTML += '<br><b>' + t("Es hört nie auf. Der Satz ist weder wahr noch falsch.", "It never stops. The sentence is neither true nor false.") + "</b>"; } }, 1500); };
                  button(ctl, t("Er ist wahr", "It is true"), function () { run(true); }, "btn-primary"); button(ctl, t("Er ist falsch", "It is false"), function () { run(false); });
                  return function () { clearInterval(timer); };
              } },
            { title: t("Formeln werden Zahlen", "Formulas become numbers"),
              text: t("Gödels erster Schritt: Jedes Zeichen bekommt eine Nummer. Eine Formel wird zu einer einzigen Zahl, indem man die Nummern als Hochzahlen auf die Primzahlen 2, 3, 5, 7, … setzt. Aus der Zahl lässt sich die Formel eindeutig zurückgewinnen. So kann die Arithmetik über ihre eigenen Formeln sprechen. Bau dir eine Formel.", "Gödel's first step: every symbol gets a number. A formula becomes one single number by putting these numbers as exponents on the primes 2, 3, 5, 7, … The formula can be recovered uniquely from the number. This lets arithmetic talk about its own formulas. Build a formula."),
              mount: function (stage, ctl) {
                  var f = [0, 4, 0], box = html(stage, '<div class="w-goedel"><div class="w-keys"></div><div class="w-formula"></div><div class="w-fact"></div><div class="w-num"></div></div>');
                  var keys = box.querySelector(".w-keys"), show = function () {
                      box.querySelector(".w-formula").innerHTML = f.length ? f.map(function (c) { return "<span>" + SYM[c] + "</span>"; }).join("") : '<em class="dim">' + t("leer", "empty") + "</em>";
                      box.querySelector(".w-fact").innerHTML = f.map(function (c, i) { return PR[i] + "<sup>" + (c + 1) + "</sup>"; }).join(" · ");
                      var n = BigInt(1); f.forEach(function (c, i) { n *= BigInt(PR[i]) ** BigInt(c + 1); });
                      box.querySelector(".w-num").innerHTML = f.length ? t("Gödelnummer: ", "Gödel number: ") + "<b>" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "</b>" : "";
                  };
                  keys.innerHTML = SYM.map(function (s, i) { return '<button type="button" class="w-key" data-i="' + i + '"><b>' + s + "</b><small>" + (i + 1) + "</small></button>"; }).join("");
                  keys.addEventListener("click", function (e) { var b = e.target.closest("[data-i]"); if (!b || f.length >= PR.length) return; f.push(parseInt(b.getAttribute("data-i"), 10)); show(); });
                  button(ctl, "⌫", function () { f.pop(); show(); }); button(ctl, t("Leeren", "Clear"), function () { f = []; show(); });
                  button(ctl, "0 = 0", function () { f = [0, 4, 0]; show(); }); button(ctl, "S0 + S0 = SS0", function () { f = [1, 0, 2, 1, 0, 4, 1, 1, 0]; show(); });
                  show();
              } },
            { title: t("Der Satz G", "The sentence G"),
              text: t("Weil Formeln Zahlen sind, lässt sich „ist beweisbar“ als Eigenschaft von Zahlen ausdrücken. Gödel konstruierte damit einen Satz G, der über sich selbst sagt: <b>„G ist nicht beweisbar.“</b> Anders als beim Lügner geht es um Beweisbarkeit, nicht um Wahrheit. Wähle einen Fall.", "Because formulas are numbers, \"is provable\" can be expressed as a property of numbers. With this Gödel constructed a sentence G that says about itself: <b>\"G is not provable.\"</b> Unlike the liar it is about provability, not truth. Choose a case."),
              mount: function (stage, ctl) {
                  var box = html(stage, '<div class="w-flow"><div class="w-card w-big">G: „' + t("G ist nicht beweisbar.", "G is not provable.") + '“</div><div class="w-branch"></div></div>'), br = box.querySelector(".w-branch");
                  var steps = function (list, cls) { br.innerHTML = list.map(function (s, i) { return '<div class="w-step ' + (i === list.length - 1 ? cls : "") + '" style="animation-delay:' + i * 0.45 + 's">' + s + "</div>"; }).join('<div class="w-arrow">↓</div>'); if (cls === "ok" && root.SOR_FX) setTimeout(function () { SOR_FX.celebrate(br.lastChild); }, list.length * 450); };
                  button(ctl, t("G ist beweisbar", "G is provable"), function () { steps([t("Angenommen, das System beweist G.", "Suppose the system proves G."), t("Dann ist G beweisbar. G behauptet aber das Gegenteil.", "Then G is provable. But G claims the opposite."), t("Das System hätte etwas Falsches bewiesen.", "The system would have proved something false."), t("✗ Das System wäre <b>widersprüchlich</b>.", "✗ The system would be <b>inconsistent</b>.")], "no"); });
                  button(ctl, t("G ist nicht beweisbar", "G is not provable"), function () { steps([t("Angenommen, das System beweist G nicht.", "Suppose the system does not prove G."), t("Dann ist genau das der Fall, was G sagt.", "Then exactly what G says is the case."), t("G ist also wahr.", "So G is true."), t("✓ Ein <b>wahrer Satz ohne Beweis</b>: Das System ist unvollständig.", "✓ A <b>true sentence without proof</b>: the system is incomplete.")], "ok"); }, "btn-primary");
              } },
            { title: t("Was das bedeutet", "What it means"),
              text: t("Gödels Satz: Ein Regelwerk, das die Arithmetik der natürlichen Zahlen beschreiben kann und das sich mechanisch überprüfen lässt, kann nicht zugleich widerspruchsfrei und vollständig sein. Probiere die Schalter: Alle drei gleichzeitig gehen nicht. Das ist keine Schwäche einzelner Axiome, sondern eine Grenze jedes solchen Systems. Wahrheit ist mehr als Beweisbarkeit.", "Gödel's theorem: a rule system that can describe the arithmetic of the natural numbers and that can be checked mechanically cannot be both consistent and complete. Try the switches: all three at once is impossible. This is not a weakness of particular axioms but a limit of every such system. Truth is more than provability."),
              mount: function (stage) {
                  var on = [true, true, false], L = [[t("stark genug für Arithmetik", "strong enough for arithmetic"), t("kann über + und × aller natürlichen Zahlen reden", "can talk about + and × of all natural numbers")], [t("widerspruchsfrei", "consistent"), t("beweist nie A und zugleich nicht A", "never proves A and not A together")], [t("vollständig", "complete"), t("beweist oder widerlegt jeden Satz", "proves or refutes every sentence")]];
                  var EX = [null, t("Beispiel: Presburger-Arithmetik (nur +). Vollständig und widerspruchsfrei, aber zu schwach für ×.", "Example: Presburger arithmetic (only +). Complete and consistent, but too weak for ×."), t("Ein widersprüchliches System beweist alles, auch Unsinn. Vollständig, aber wertlos.", "An inconsistent system proves everything, even nonsense. Complete but worthless."), t("Beispiel: Peano-Arithmetik oder die Mengenlehre. Hier gibt es wahre, unbeweisbare Sätze.", "Example: Peano arithmetic or set theory. Here there are true unprovable sentences.")];
                  var box = html(stage, '<div class="w-switches"></div><p class="w-note w-ex"></p>'), sw = box, ex = stage.querySelector(".w-ex");
                  var draw = function () { sw.innerHTML = L.map(function (l, i) { return '<button type="button" class="w-switch" role="switch" aria-checked="' + on[i] + '" data-i="' + i + '"><i></i><span><b>' + l[0] + "</b><small>" + l[1] + "</small></span></button>"; }).join(""); var off = on.indexOf(false); ex.innerHTML = EX[off + 1]; };
                  sw.addEventListener("click", function (e) { var b = e.target.closest("[data-i]"); if (!b) return; var i = parseInt(b.getAttribute("data-i"), 10), off = on[i] ? i : (i + 1) % 3; on = [true, true, true]; on[off] = false; draw(); });
                  draw();
              } }
        ],
        quiz: { q: t("Was sagt Gödels erster Unvollständigkeitssatz?", "What does Gödel's first incompleteness theorem say?"), options: [t("In jedem widerspruchsfreien, überprüfbaren System für die Arithmetik gibt es wahre Sätze ohne Beweis.", "In every consistent, checkable system for arithmetic there are true sentences without proof."), t("Die Mathematik ist widersprüchlich.", "Mathematics is inconsistent."), t("Kein Satz lässt sich beweisen.", "No sentence can be proved."), t("Computer können nicht rechnen.", "Computers cannot calculate.")], right: 0, why: t("Die Mathematik bleibt verlässlich. Sie ist nur nie fertig: Es gibt immer Wahres, das ein gegebenes System nicht beweisen kann.", "Mathematics stays reliable. It is just never finished: there is always something true that a given system cannot prove.") }
    };

    var ALL = [euler, basel, riemann, goedel];
    root.SOR_WONDERS = { list: ALL.map(function (w) { return { id: w.id, title: w.title, lead: w.lead, level: w.level, icon: w.icon, scenes: w.scenes.length }; }), get: function (id) { return ALL.filter(function (w) { return w.id === id; })[0] || null; }, zeta: zeta, ZEROS: ZEROS };
})(window);
