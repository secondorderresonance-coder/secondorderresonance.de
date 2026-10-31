/*
 * SOR Labor: Rotationskörper und Gabriels Horn
 * ------------------------------------------------------------
 * Abhängigkeitsfreier 3D-Renderer auf Canvas 2D.
 * Eine Funktion f(x) auf [a, b] wird um die x-Achse gedreht.
 * Volumen  V = π ∫ f(x)² dx            (Simpson, n = 600)
 * Fläche   A = 2π ∫ f(x) √(1 + f'(x)²) dx
 *
 * Markup-Vertrag (siehe index.html, Abschnitt #labor):
 *   [data-lab]            Wurzel
 *   [data-lab-canvas]     <canvas>
 *   [data-lab-mode]       Kapitel-Buttons mit data-lab-mode="cone|paraboloid|vase|horn"
 *   [data-lab-field=...]  Textfelder, die je Modus befüllt werden
 *   [data-lab-input=...]  Regler sweep | slice | upper
 */
(function () {
    "use strict";

    var root = document.querySelector("[data-lab]");
    if (!root) return;
    var canvas = root.querySelector("[data-lab-canvas]");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var PI = Math.PI;
    var fmt = function (v, d) {
        return Number(v).toLocaleString("de-DE", { minimumFractionDigits: d, maximumFractionDigits: d });
    };

    function simpson(fn, a, b, n) {
        n = n || 600;
        if (n % 2) n += 1;
        var h = (b - a) / n, s = fn(a) + fn(b);
        for (var i = 1; i < n; i += 1) s += fn(a + i * h) * (i % 2 ? 4 : 2);
        return s * h / 3;
    }

    var MODES = {
        cone: {
            numeral: "I.", label: "Rotationskörper",
            title: "Aus einer Geraden wird ein <em>Kegel</em>",
            sub: "f(x) = x / 2 auf [0, 4], einmal um die x-Achse gedreht",
            formula: '<span class="fx-v">V</span> = π<span class="fx-int">∫<sub>0</sub><sup>4</sup></span><span class="fx-paren">(x/2)²</span> dx = <span class="fx-v">16π/3</span>',
            note: "Kontrolle mit der Schulformel: V = ⅓·π·r²·h = ⅓·π·2²·4 = 16π/3.",
            f: function (x) { return x / 2; }, df: function () { return 0.5; },
            a: 0, b: 4, archive: "app/lernarchiv.html?level=3&sublevel=3.1.3.b"
        },
        paraboloid: {
            numeral: "II.", label: "Scheibenmethode",
            title: "Jede Scheibe ist ein <em>Kreis</em>",
            sub: "f(x) = √x auf [0, 4]: die Scheibenfläche π·f(x)² = π·x wächst linear",
            formula: '<span class="fx-v">V</span> = π<span class="fx-int">∫<sub>0</sub><sup>4</sup></span><span class="fx-paren">(√x)²</span> dx = <span class="fx-v">8π</span>',
            note: "Weil π·(√x)² = π·x gilt, ist das Volumen genau die Fläche unter einer Geraden mal π.",
            f: function (x) { return Math.sqrt(Math.max(x, 0)); },
            df: function (x) { return x > 1e-9 ? 0.5 / Math.sqrt(x) : 0; },
            a: 0, b: 4, archive: "app/lernarchiv.html?level=3&sublevel=3.1.3.b"
        },
        vase: {
            numeral: "III.", label: "Volumen",
            title: "Dreh es zu einem <em>Körper</em>",
            sub: "f(x) = 0,7 + 0,3·sin(2x) auf [0, π], jede Scheibe ist eine Kreisscheibe",
            formula: '<span class="fx-v">V</span> = π<span class="fx-int">∫<sub>a</sub><sup>b</sup></span><span class="fx-paren">f(x)²</span> dx',
            note: "Exakt: V = 0,535·π² ≈ 5,280. Der Regler zeigt, wie die Scheiben das Volumen aufbauen.",
            f: function (x) { return 0.7 + 0.3 * Math.sin(2 * x); },
            df: function (x) { return 0.6 * Math.cos(2 * x); },
            a: 0, b: PI, archive: "app/lernarchiv.html?level=3&sublevel=3.1.3.b"
        },
        horn: {
            numeral: "IV.", label: "Uneigentliche Integrale",
            title: "Endliches Volumen, <em>unendliche</em> Farbe",
            sub: "Gabriels Horn: y = 1/x, gedreht und bis ∞ verlängert",
            formula: '<span class="fx-v">V</span> = π<span class="fx-int">∫<sub>1</sub><sup>∞</sup></span><span class="fx-frac"><span>dx</span><span>x²</span></span> = <span class="fx-v">π</span>',
            note: "Das Volumen konvergiert gegen π, die Oberfläche wächst mindestens wie 2π·ln(b) und divergiert.",
            f: function (x) { return 1 / x; }, df: function (x) { return -1 / (x * x); },
            a: 1, b: 12, upper: true, // 4.2.4.a (Uneigentliche Integrale) hat noch keine Aufgaben, bis dahin auf bestimmte Integrale (L3) verlinken
            view: { yaw: -0.95, pitch: 0.22 }, archive: "app/lernarchiv.html?level=3&sublevel=3.1.3.b"
        }
    };

    var state = {
        mode: "vase", sweep: 360, slice: 0.5, upper: 12,
        yaw: -0.55, pitch: 0.38, auto: !reduceMotion,
        dragging: false, lastX: 0, lastY: 0, visible: false, dirty: true
    };

    var fields = {};
    Array.prototype.forEach.call(root.querySelectorAll("[data-lab-field]"), function (n) {
        fields[n.getAttribute("data-lab-field")] = n;
    });
    var inputs = {};
    Array.prototype.forEach.call(root.querySelectorAll("[data-lab-input]"), function (n) {
        inputs[n.getAttribute("data-lab-input")] = n;
    });

    function setText(name, html, asHtml) {
        var n = fields[name];
        if (!n) return;
        if (asHtml) n.innerHTML = html; else n.textContent = html;
    }

    function currentRange() {
        var m = MODES[state.mode];
        var b = m.upper ? state.upper : m.b;
        return { a: m.a, b: b, drawB: m.upper ? Math.min(b, 8) : b };
    }

    // ---------- Farbskala (blau -> türkis -> lime -> gelb -> orange) ----------
    var STOPS = [[76, 110, 245], [34, 195, 166], [163, 230, 53], [250, 204, 21], [251, 146, 60]];
    function ramp(t) {
        t = Math.max(0, Math.min(1, t)) * (STOPS.length - 1);
        var i = Math.min(STOPS.length - 2, Math.floor(t)), u = t - i, A = STOPS[i], B = STOPS[i + 1];
        return [A[0] + (B[0] - A[0]) * u, A[1] + (B[1] - A[1]) * u, A[2] + (B[2] - A[2]) * u];
    }

    // ---------- Projektion ----------
    var W = 0, H = 0, DPR = 1;
    function resize() {
        var r = canvas.getBoundingClientRect();
        DPR = Math.min(window.devicePixelRatio || 1, 2);
        W = Math.max(1, r.width); H = Math.max(1, r.height);
        canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        state.dirty = true;
    }

    function makeProjector(range, maxR) {
        var len = range.drawB - range.a, mid = (range.a + range.drawB) / 2;
        var span = Math.max(len, 2 * maxR * 1.15);
        // Kopfbereich (Titel + Formel) und Ablesewerte unten freihalten
        var head = root.querySelector(".lab-head"), read = root.querySelector(".lab-readout");
        var top = head ? head.offsetHeight + 12 : H * 0.3;
        var bottom = read && W < 700 ? read.offsetHeight + 24 : 40;
        var avail = Math.max(120, H - top - bottom);
        var scale = Math.min(W * 0.74 / span, avail * 0.8 / (2 * maxR * 1.3 + 0.0001));
        var cy = Math.cos(state.yaw), sy = Math.sin(state.yaw), cp = Math.cos(state.pitch), sp = Math.sin(state.pitch);
        var D = span * (MODES[state.mode].upper ? 1.35 : 2.6), ox = W * 0.5, oy = top + avail * 0.5;
        return function (x, y, z) {
            var X = (x - mid), Y = y, Z = z;
            // Gieren um die vertikale Achse
            var x1 = X * cy + Z * sy, z1 = -X * sy + Z * cy;
            // Nicken um die horizontale Bildschirmachse
            var y2 = Y * cp - z1 * sp, z2 = Y * sp + z1 * cp;
            var k = D / (D + z2);
            return [ox + x1 * scale * k, oy - y2 * scale * k, z2];
        };
    }

    // ---------- Zeichnen ----------
    function draw() {
        state.dirty = false;
        var m = MODES[state.mode], range = currentRange();
        ctx.clearRect(0, 0, W, H);

        var NX = 56, NT = 44, sweep = state.sweep * PI / 180;
        var maxR = 0;
        for (var s = 0; s <= 80; s += 1) maxR = Math.max(maxR, m.f(range.a + (range.drawB - range.a) * s / 80));
        var P = makeProjector(range, maxR);

        // Boden-Raster
        var floorY = -maxR * 1.35, gx0 = range.a - 0.6, gx1 = range.drawB + 0.6, gz = maxR * 2.2;
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(152,162,189,0.10)";
        var steps = 12;
        for (var g = 0; g <= steps; g += 1) {
            var gxv = gx0 + (gx1 - gx0) * g / steps, a1 = P(gxv, floorY, -gz), b1 = P(gxv, floorY, gz);
            ctx.beginPath(); ctx.moveTo(a1[0], a1[1]); ctx.lineTo(b1[0], b1[1]); ctx.stroke();
            var gzv = -gz + 2 * gz * g / steps, a2 = P(gx0, floorY, gzv), b2 = P(gx1, floorY, gzv);
            ctx.beginPath(); ctx.moveTo(a2[0], a2[1]); ctx.lineTo(b2[0], b2[1]); ctx.stroke();
        }

        // Rotationsachse (gestrichelt)
        ctx.setLineDash([5, 6]);
        ctx.strokeStyle = "rgba(238,241,247,0.28)";
        var ax0 = P(range.a - 0.8, 0, 0), ax1 = P(range.drawB + 0.8, 0, 0);
        ctx.beginPath(); ctx.moveTo(ax0[0], ax0[1]); ctx.lineTo(ax1[0], ax1[1]); ctx.stroke();
        ctx.setLineDash([]);

        // Mesh aufbauen
        var grid = [];
        for (var i = 0; i <= NX; i += 1) {
            var x = range.a + (range.drawB - range.a) * i / NX, r = m.f(x), row = [];
            for (var j = 0; j <= NT; j += 1) {
                var th = -PI / 2 + sweep * j / NT;
                row.push({ p: P(x, r * Math.sin(th), r * Math.cos(th)), t: (x - range.a) / (range.drawB - range.a) });
            }
            grid.push(row);
        }

        var items = [];
        if (sweep > 0.001) {
            for (i = 0; i < NX; i += 1) {
                for (var j2 = 0; j2 < NT; j2 += 1) {
                    var q0 = grid[i][j2].p, q1 = grid[i + 1][j2].p, q2 = grid[i + 1][j2 + 1].p, q3 = grid[i][j2 + 1].p;
                    var ux = q1[0] - q0[0], uy = q1[1] - q0[1], vx = q3[0] - q0[0], vy = q3[1] - q0[1];
                    var nz = ux * vy - uy * vx, area = Math.abs(nz);
                    var len2 = Math.sqrt((ux * ux + uy * uy) * (vx * vx + vy * vy)) || 1;
                    var facing = Math.abs(nz) / len2; // 0 = streifend, 1 = frontal
                    items.push({ z: (q0[2] + q1[2] + q2[2] + q3[2]) / 4, kind: 0, q: [q0, q1, q2, q3], t: grid[i][j2].t, light: facing, inner: nz > 0, area: area });
                }
            }
        }

        // Scheibe bei x0
        var xs = range.a + (range.drawB - range.a) * state.slice, rs = m.f(xs), ring = [];
        var ringSweep = Math.max(sweep, 2 * PI);
        for (var k = 0; k <= 64; k += 1) {
            var tk = -PI / 2 + ringSweep * k / 64;
            ring.push(P(xs, rs * Math.sin(tk), rs * Math.cos(tk)));
        }
        for (k = 0; k < 64; k += 1) items.push({ z: (ring[k][2] + ring[k + 1][2]) / 2 - 0.02, kind: 1, a: ring[k], b: ring[k + 1] });

        // Profilkurve (Kante bei θ = 0)
        for (i = 0; i < NX; i += 1) items.push({ z: (grid[i][0].p[2] + grid[i + 1][0].p[2]) / 2 - 0.01, kind: 2, a: grid[i][0].p, b: grid[i + 1][0].p });

        items.sort(function (u, v) { return v.z - u.z; });

        // Scheibenfläche (transparent, unter dem Mesh-Sortieren vereinfacht als Hintergrund)
        ctx.beginPath();
        ring.forEach(function (pt, idx) { if (idx) ctx.lineTo(pt[0], pt[1]); else ctx.moveTo(pt[0], pt[1]); });
        ctx.closePath();
        ctx.fillStyle = "rgba(233,69,96,0.10)";
        ctx.fill();

        for (var n = 0; n < items.length; n += 1) {
            var it = items[n];
            if (it.kind === 0) {
                var c = ramp(it.t), sh = 0.42 + 0.58 * Math.pow(it.light, 0.8);
                if (it.inner) sh *= 0.62;
                ctx.beginPath();
                ctx.moveTo(it.q[0][0], it.q[0][1]); ctx.lineTo(it.q[1][0], it.q[1][1]);
                ctx.lineTo(it.q[2][0], it.q[2][1]); ctx.lineTo(it.q[3][0], it.q[3][1]); ctx.closePath();
                ctx.fillStyle = "rgb(" + Math.round(c[0] * sh) + "," + Math.round(c[1] * sh) + "," + Math.round(c[2] * sh) + ")";
                ctx.fill();
                ctx.strokeStyle = "rgba(10,14,28,0.30)";
                ctx.lineWidth = 0.6;
                ctx.stroke();
            } else if (it.kind === 1) {
                ctx.beginPath(); ctx.moveTo(it.a[0], it.a[1]); ctx.lineTo(it.b[0], it.b[1]);
                ctx.strokeStyle = "#e94560"; ctx.lineWidth = 4.2; ctx.lineCap = "round"; ctx.stroke();
            } else {
                ctx.beginPath(); ctx.moveTo(it.a[0], it.a[1]); ctx.lineTo(it.b[0], it.b[1]);
                ctx.strokeStyle = "rgba(255,255,255,0.92)"; ctx.lineWidth = 2; ctx.lineCap = "round"; ctx.stroke();
            }
        }
        ctx.lineCap = "butt";
        updateReadouts(m, range, xs, rs);
    }

    // ---------- Zahlen ----------
    var cache = {};
    function updateReadouts(m, range, xs, rs) {
        var key = state.mode + "|" + range.b;
        if (!cache[key]) {
            cache[key] = {
                V: PI * simpson(function (x) { var y = m.f(x); return y * y; }, range.a, range.b),
                A: 2 * PI * simpson(function (x) { var y = m.f(x), d = m.df(x); return y * Math.sqrt(1 + d * d); }, range.a, range.b, 2000)
            };
        }
        var full = cache[key];
        // Teilvolumen bis zur Scheibe: zeigt, wie sich V aufbaut
        var partial = PI * simpson(function (x) { var y = m.f(x); return y * y; }, range.a, Math.max(range.a, Math.min(xs, range.b)), 200);
        var share = state.sweep / 360;

        setText("sweep", fmt(state.sweep, 0) + "°");
        setText("sweepCtl", fmt(state.sweep, 0) + "°");
        setText("disc", "π·r² = " + fmt(PI * rs * rs, 3) + " pro Einheit x  ·  x = " + fmt(xs, 2));
        if (m.upper) {
            setText("bigLabel", "Farbe zum Füllen");
            setText("big", fmt(PI * (1 - 1 / range.b), 4));
            setText("subLabel", "Farbe zum Anstreichen");
            setText("sub2", fmt(full.A, 2) + "  (≥ 2π·ln b = " + fmt(2 * PI * Math.log(range.b), 2) + ")");
            setText("partial", "Grenzwert für b → ∞:  V → π ≈ 3,1416,  A → ∞" + (range.b > range.drawB ? "  (Grafik zeigt x bis " + range.drawB + ")" : ""));
        } else {
            setText("bigLabel", "Volumen");
            setText("big", "≈ " + fmt(full.V * share, 3));
            setText("subLabel", "Mantelfläche");
            setText("sub2", "≈ " + fmt(full.A * share, 3));
            setText("partial", "Scheiben bis x = " + fmt(xs, 2) + " ergeben " + fmt(partial, 3) + " von " + fmt(full.V, 3));
        }
        if (inputs.sweep) inputs.sweep.setAttribute("aria-valuetext", fmt(state.sweep, 0) + " Grad");
    }

    function applyMode(name) {
        if (!MODES[name]) return;
        state.mode = name;
        var m = MODES[name];
        var v = m.view || { yaw: -0.55, pitch: 0.38 };
        state.yaw = v.yaw; state.pitch = v.pitch;
        setText("numeral", m.numeral);
        setText("label", m.label);
        setText("title", m.title, true);
        setText("subtitle", m.sub);
        setText("formula", m.formula, true);
        setText("note", m.note);
        if (fields.archive) fields.archive.setAttribute("href", m.archive);
        Array.prototype.forEach.call(root.querySelectorAll("[data-lab-mode]"), function (b) {
            var on = b.getAttribute("data-lab-mode") === name;
            b.setAttribute("aria-selected", on ? "true" : "false");
            b.classList.toggle("is-active", on);
        });
        var upperWrap = root.querySelector("[data-lab-upper-wrap]");
        if (upperWrap) upperWrap.hidden = !m.upper;
        state.dirty = true;
        if (!reduceMotion) animateSweep();
    }

    var sweepAnim = null;
    function animateSweep() {
        if (sweepAnim) cancelAnimationFrame(sweepAnim);
        var t0 = performance.now(), dur = 1400;
        var step = function (now) {
            var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
            state.sweep = Math.round(360 * e);
            if (inputs.sweep) inputs.sweep.value = state.sweep;
            state.dirty = true;
            if (p < 1) sweepAnim = requestAnimationFrame(step); else sweepAnim = null;
        };
        sweepAnim = requestAnimationFrame(step);
    }

    // ---------- Eingaben ----------
    Array.prototype.forEach.call(root.querySelectorAll("[data-lab-mode]"), function (b) {
        b.addEventListener("click", function () { applyMode(b.getAttribute("data-lab-mode")); });
    });
    if (inputs.sweep) inputs.sweep.addEventListener("input", function () {
        if (sweepAnim) { cancelAnimationFrame(sweepAnim); sweepAnim = null; }
        state.sweep = Number(inputs.sweep.value); state.dirty = true;
    });
    if (inputs.slice) inputs.slice.addEventListener("input", function () { state.slice = Number(inputs.slice.value) / 100; state.dirty = true; });
    if (inputs.upper) inputs.upper.addEventListener("input", function () {
        state.upper = Number(inputs.upper.value);
        setText("upperValue", "b = " + state.upper);
        state.dirty = true;
    });
    var replay = root.querySelector("[data-lab-replay]");
    if (replay) replay.addEventListener("click", animateSweep);

    canvas.addEventListener("pointerdown", function (e) {
        state.dragging = true; state.auto = false; state.lastX = e.clientX; state.lastY = e.clientY;
        if (canvas.setPointerCapture) canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener("pointermove", function (e) {
        if (!state.dragging) return;
        state.yaw += (e.clientX - state.lastX) * 0.008;
        state.pitch = Math.max(-1.2, Math.min(1.2, state.pitch + (e.clientY - state.lastY) * 0.006));
        state.lastX = e.clientX; state.lastY = e.clientY; state.dirty = true;
    });
    var endDrag = function () { state.dragging = false; };
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    canvas.addEventListener("keydown", function (e) {
        var used = true;
        if (e.key === "ArrowLeft") state.yaw -= 0.12;
        else if (e.key === "ArrowRight") state.yaw += 0.12;
        else if (e.key === "ArrowUp") state.pitch = Math.max(-1.2, state.pitch - 0.1);
        else if (e.key === "ArrowDown") state.pitch = Math.min(1.2, state.pitch + 0.1);
        else used = false;
        if (used) { e.preventDefault(); state.auto = false; state.dirty = true; }
    });

    // ---------- Schleife: läuft nur, wenn sichtbar ----------
    var last = performance.now();
    function loop(now) {
        var dt = Math.min(64, now - last); last = now;
        if (state.visible) {
            if (state.auto && !state.dragging) { state.yaw += dt * 0.00018; state.dirty = true; }
            if (state.dirty) draw();
        }
        requestAnimationFrame(loop);
    }

    if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
            entries.forEach(function (en) { state.visible = en.isIntersecting; if (en.isIntersecting) state.dirty = true; });
        }, { threshold: 0.05 }).observe(canvas);
    } else {
        state.visible = true;
    }

    window.addEventListener("resize", resize);
    resize();
    state.slice = inputs.slice ? Number(inputs.slice.value) / 100 : 0.5;
    applyMode(root.getAttribute("data-lab-start") || "vase");
    requestAnimationFrame(loop);

    // für Tests
    window.SOR_LAB = { modes: MODES, simpson: simpson, state: state, applyMode: applyMode };
})();
