/*
 * SOR Übungs-Engine
 * ------------------------------------------------------------
 * Parametrisierte Aufgaben: jede Aufgabe ist ein Generator, der aus einem
 * Zufalls-Seed und einer Schwierigkeit (1 bis 3) eine konkrete Aufgabe baut.
 *
 *   SOR_EX.add({ id, topic, title, gen(r, d) })      Generator registrieren
 *   SOR_EX.generate(id, { seed, difficulty })        -> Aufgabe
 *   SOR_EX.byTopic(topicId)                          -> Generatoren eines Themas
 *   SOR_EX.check(aufgabe.a, eingabe)                 -> { correct }
 *   SOR_EX.show(aufgabe.a)                           -> Lösung als HTML
 *
 * gen(r, d) liefert { q, a, hint, steps, ok }:
 *   q      Aufgabentext (HTML)
 *   a      Antwort-Spezifikation (A.num, A.frac, A.choice, A.multi)
 *   hint   Tipp (HTML)
 *   steps  Lösungsweg als Liste (HTML)
 *   ok     Ergebnis einer unabhängigen Gegenprobe (Einsetzen, numerische
 *          Integration, Auszählen ...). tools/exercise-qa.js verlangt ok === true.
 *
 * topic verweist auf app/data/coverage-matrix.js (CM-S-xx Schule, CM-E-xx Studium).
 */
(function (root) {
    "use strict";

    // ---------- Zufall (deterministisch pro Seed) ----------
    function rng(seed) {
        var s = (seed >>> 0) || 1;
        var next = function () {
            s |= 0; s = (s + 0x6D2B79F5) | 0;
            var t = Math.imul(s ^ (s >>> 15), 1 | s);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
        var r = {
            f: next,
            int: function (a, b) { return a + Math.floor(next() * (b - a + 1)); },
            pick: function (arr) { return arr[Math.floor(next() * arr.length)]; },
            bool: function () { return next() < 0.5; },
            sign: function () { return next() < 0.5 ? -1 : 1; },
            nz: function (a, b) { var v = 0; while (v === 0) v = r.int(a, b); return v; },
            shuffle: function (arr) {
                var c = arr.slice();
                for (var i = c.length - 1; i > 0; i -= 1) { var j = Math.floor(next() * (i + 1)); var t = c[i]; c[i] = c[j]; c[j] = t; }
                return c;
            }
        };
        return r;
    }

    // ---------- Mathe-Helfer ----------
    var M = {
        gcd: function (a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; },
        lcm: function (a, b) { return Math.abs(a * b) / M.gcd(a, b); },
        round: function (x, d) { var p = Math.pow(10, d || 0); return Math.round((x + Number.EPSILON) * p) / p; },
        fact: function (n) { var f = 1; for (var i = 2; i <= n; i += 1) f *= i; return f; },
        binom: function (n, k) { if (k < 0 || k > n) return 0; var b = 1; for (var i = 1; i <= k; i += 1) b = b * (n - k + i) / i; return Math.round(b); },
        isPrime: function (n) { if (n < 2) return false; for (var i = 2; i * i <= n; i += 1) if (n % i === 0) return false; return true; },
        simpson: function (f, a, b, n) { n = n || 400; var h = (b - a) / n, s = f(a) + f(b); for (var i = 1; i < n; i += 1) s += f(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; },
        near: function (a, b, tol) { return Math.abs(a - b) <= (tol || 1e-9) * Math.max(1, Math.abs(a), Math.abs(b)); },
        binomPmf: function (n, p, k) { return M.binom(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k); },
        deg: function (rad) { return rad * 180 / Math.PI; },
        rad: function (deg) { return deg * Math.PI / 180; }
    };

    // ---------- Darstellung ----------
    var MINUS = "−";
    var H = {
        n: function (x, dec) {
            if (typeof x !== "number" || !isFinite(x)) return String(x);
            var v = M.round(x, dec === undefined ? 4 : dec);
            if (Object.is(v, -0)) v = 0;
            var s = String(Math.abs(v));
            if (s.indexOf("e") !== -1) s = Math.abs(v).toFixed(dec === undefined ? 4 : dec).replace(/0+$/, "").replace(/\.$/, "");
            return (v < 0 ? MINUS : "") + s.replace(".", ",");
        },
        fr: function (a, b) { return '<span class="fr"><span>' + a + "</span><span>" + b + "</span></span>"; },
        // gekürzter Bruch als HTML (ganze Zahlen ohne Nenner)
        q: function (num, den) {
            var g = M.gcd(num, den) || 1; num /= g; den /= g;
            if (den < 0) { num = -num; den = -den; }
            if (den === 1) return H.n(num);
            return (num < 0 ? MINUS : "") + H.fr(Math.abs(num), den);
        },
        sg: function (x, dec) { return (x < 0 ? MINUS + " " : "+ ") + H.n(Math.abs(x), dec); },
        // Polynom, höchster Grad zuerst: poly([1,-3,2]) -> x² − 3x + 2
        poly: function (c, v) {
            v = v || "x";
            var out = "", deg = c.length - 1;
            c.forEach(function (k, i) {
                if (!k) return;
                var e = deg - i, abs = Math.abs(k);
                var body = (e === 0 || abs !== 1 ? H.n(abs) : "") + (e > 0 ? v + (e > 1 ? "<sup>" + e + "</sup>" : "") : "");
                out += out ? (k < 0 ? " " + MINUS + " " : " + ") + body : (k < 0 ? MINUS : "") + body;
            });
            return out || "0";
        },
        // lineare Kombination: lin([[2,"x"],[-3,"y"]]) -> 2x − 3y
        lin: function (terms) {
            var out = "";
            terms.forEach(function (t) {
                var k = t[0], s = t[1] || "";
                if (!k) return;
                var abs = Math.abs(k), body = (abs !== 1 || !s ? H.n(abs) : "") + s;
                out += out ? (k < 0 ? " " + MINUS + " " : " + ") + body : (k < 0 ? MINUS : "") + body;
            });
            return out || "0";
        },
        mat: function (rows) {
            return '<span class="mx" style="--c:' + rows[0].length + '">' + rows.map(function (r) {
                return r.map(function (x) { return "<span>" + (typeof x === "number" ? H.n(x) : x) + "</span>"; }).join("");
            }).join("") + "</span>";
        },
        vec: function (v) { return H.mat(v.map(function (x) { return [x]; })); },
        m: function (s) { return '<span class="mth">' + s + "</span>"; },
        fig: function (inner, w, h, label) {
            return '<svg class="exfig" viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="' + (label || "Skizze") + '" xmlns="http://www.w3.org/2000/svg">' + inner + "</svg>";
        },
        bars: function (labels, values) {
            var max = Math.max.apply(null, values), w = 40 + labels.length * 52, s = '<line x1="30" y1="130" x2="' + (w - 6) + '" y2="130" stroke="#98a2bd"/>';
            for (var g = 0; g <= max; g += Math.max(1, Math.ceil(max / 5))) {
                var gy = 130 - g / max * 110;
                s += '<line x1="30" y1="' + gy + '" x2="' + (w - 6) + '" y2="' + gy + '" stroke="rgba(255,255,255,0.08)"/><text x="24" y="' + (gy + 4) + '" text-anchor="end" font-size="10" fill="#98a2bd">' + g + "</text>";
            }
            var cols = ["#f5c518", "#35e0c4", "#60a5fa", "#e94560", "#8b5cf6", "#4ade80"];
            labels.forEach(function (l, i) {
                var hgt = values[i] / max * 110, x = 44 + i * 52;
                s += '<rect x="' + x + '" y="' + (130 - hgt) + '" width="30" height="' + hgt + '" rx="3" fill="' + cols[i % cols.length] + '"/><text x="' + (x + 15) + '" y="146" text-anchor="middle" font-size="10" fill="#cdd4e6">' + l + "</text>";
            });
            return H.fig(s, w, 152, "Säulendiagramm");
        }
    };

    // ---------- Antworten ----------
    var A = {
        num: function (v, o) { o = o || {}; return { type: "num", v: v, dec: o.dec, unit: o.unit || "", tol: o.tol }; },
        frac: function (num, den, o) { var g = M.gcd(num, den) || 1; if (den < 0) { num = -num; den = -den; } return { type: "frac", n: num / g, d: den / g, v: num / den, unit: (o && o.unit) || "" }; },
        choice: function (r, correct, wrongs) {
            var opts = [correct], seen = {}; seen[correct] = true;
            wrongs.forEach(function (w) { if (!seen[w] && opts.length < 4) { seen[w] = true; opts.push(w); } });
            var sh = r.shuffle(opts);
            return { type: "choice", options: sh, v: sh.indexOf(correct) };
        },
        multi: function (fields, o) { return { type: "multi", fields: fields, unordered: !!(o && o.unordered) }; }
    };

    function parseNumber(str) {
        if (typeof str === "number") return str;
        var s = String(str == null ? "" : str).trim().replace(/[−–]/g, "-").replace(/\s+/g, " ");
        s = s.replace(/[a-zA-Zäöü°€%²³]+\.?$/g, "").replace(/^[a-zA-Z₀-₉′']+\s*=\s*/, "").trim();
        if (!s) return NaN;
        var mixed = /^(-?)(\d+) (\d+)\/(\d+)$/.exec(s);
        if (mixed) { var w = parseInt(mixed[2], 10) + parseInt(mixed[3], 10) / parseInt(mixed[4], 10); return mixed[1] ? -w : w; }
        var fr = /^(-?\d+(?:[.,]\d+)?)\s*\/\s*(-?\d+(?:[.,]\d+)?)$/.exec(s);
        if (fr) { var den = parseFloat(fr[2].replace(",", ".")); return den === 0 ? NaN : parseFloat(fr[1].replace(",", ".")) / den; }
        if (!/^-?\d+(?:[.,]\d+)?$/.test(s)) return NaN;
        return parseFloat(s.replace(",", "."));
    }

    function numOk(spec, input) {
        var u = parseNumber(input);
        if (!isFinite(u)) return false;
        if (spec.type === "frac") {
            var isFracInput = /\//.test(String(input));
            return Math.abs(u - spec.v) <= (isFracInput ? 1e-9 : 0.0011);
        }
        var tol = spec.tol !== undefined ? spec.tol : (spec.dec !== undefined ? 0.6 * Math.pow(10, -spec.dec) : 1e-9);
        return Math.abs(u - spec.v) <= tol + 1e-12;
    }

    function check(a, input) {
        if (!a) return { correct: false };
        if (a.type === "choice") return { correct: Number(input) === a.v };
        if (a.type === "multi") {
            var vals = Array.isArray(input) ? input : [];
            if (vals.length !== a.fields.length) return { correct: false };
            if (!a.unordered) return { correct: a.fields.every(function (f, i) { return numOk(f.a, vals[i]); }) };
            var used = {};
            return { correct: vals.every(function (v) {
                for (var i = 0; i < a.fields.length; i += 1) { if (!used[i] && numOk(a.fields[i].a, v)) { used[i] = true; return true; } }
                return false;
            }) };
        }
        return { correct: numOk(a, input) };
    }

    function showOne(a) {
        if (a.type === "frac") return H.q(a.n, a.d) + (a.unit ? " " + a.unit : "");
        return H.n(a.v, a.dec === undefined ? 6 : a.dec) + (a.unit ? " " + a.unit : "");
    }
    function show(a) {
        if (a.type === "choice") return a.options[a.v];
        if (a.type === "multi") return a.fields.map(function (f) { return f.l + " = " + showOne(f.a); }).join(", ");
        return showOne(a);
    }

    // ---------- Registry ----------
    var defs = {}, order = [];
    function add(def) {
        if (defs[def.id]) throw new Error("Doppelte Aufgaben-ID " + def.id);
        defs[def.id] = def; order.push(def.id);
    }
    function generate(id, opt) {
        var def = defs[id];
        if (!def) return null;
        opt = opt || {};
        var seed = opt.seed === undefined ? Math.floor(Math.random() * 2147483646) + 1 : opt.seed;
        var d = Math.max(1, Math.min(3, opt.difficulty || 1));
        var out = def.gen(rng(seed * 7 + d), d);
        out.id = id; out.topic = def.topic; out.title = def.title; out.seed = seed; out.difficulty = d;
        return out;
    }
    function byTopic(topic) { return order.filter(function (id) { return defs[id].topic === topic; }).map(function (id) { return defs[id]; }); }
    function topics() { var t = {}; order.forEach(function (id) { t[defs[id].topic] = (t[defs[id].topic] || 0) + 1; }); return t; }

    var CSS = [
        ".fr{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;font-size:0.86em;line-height:1.15;margin:0 0.12em}",
        ".fr>span:first-child{border-bottom:1px solid currentColor;padding:0 0.25em}",
        ".fr>span:last-child{padding:0 0.25em}",
        ".mx{display:inline-grid;grid-template-columns:repeat(var(--c),auto);gap:0.15em 0.75em;vertical-align:middle;padding:0.15em 0.5em;margin:0 0.2em;border-left:1.5px solid currentColor;border-right:1.5px solid currentColor;border-radius:7px;text-align:center}",
        ".mth{font-family:'Instrument Serif','Times New Roman',Georgia,serif;font-size:1.14em;white-space:nowrap}",
        ".exfig{display:block;max-width:340px;width:100%;height:auto;margin:0.9rem auto 0.2rem}",
        ".exfig text{font-family:'IBM Plex Mono',ui-monospace,monospace}"
    ].join("\n");

    root.SOR_EX = { add: add, generate: generate, byTopic: byTopic, topics: topics, check: check, show: show, parseNumber: parseNumber, rng: rng, A: A, H: H, M: M, css: CSS, ids: function () { return order.slice(); }, def: function (id) { return defs[id]; } };
    if (typeof module !== "undefined" && module.exports) module.exports = root.SOR_EX;
})(typeof window !== "undefined" ? window : globalThis);
