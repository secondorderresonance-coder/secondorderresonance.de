/*
 * SOR Arbeitsblatt: Rechenweg aufschreiben, Skizze zeichnen, mit der Musterlösung vergleichen
 * ------------------------------------------------------------
 * Freiwillig: Lernende können neben jeder Aufgabe ihren Rechenweg notieren und skizzieren.
 * Nach der Antwort steht der eigene Weg neben der Musterlösung, dazu eine Selbsteinschätzung.
 *
 *   var pad = SOR_WORKPAD.create({ key: "pruefung-a1-3" })   key optional: Entwurf bleibt im Browser
 *   container.appendChild(pad.el)
 *   pad.reset()          leert Notizen und Skizze (z. B. bei der nächsten Aufgabe)
 *   pad.hasWork()        true, wenn etwas notiert oder gezeichnet wurde
 *   pad.lock(true)       nur noch ansehen (z. B. nach Abgabe)
 *
 *   SOR_WORKPAD.review({ pad, steps, topicId, title, solutionLabel, reviewList })
 *       liefert ein Element: eigener Weg neben Musterlösung (steps: Liste von HTML oder HTML-Text)
 *       und die Frage "Hast du den Weg verstanden?" (Ja / Teilweise / Noch nicht)
 *       reviewList: false, wenn das Thema in keiner Wiederholungsliste auftaucht (andere Rückmeldung)
 *   SOR_WORKPAD.rate(topicId, "yes" | "part" | "no", title)
 *   SOR_WORKPAD.needsReview()   Themen, deren letzte Einschätzung nicht "Ja" war (neueste zuerst)
 *
 * Alles bleibt lokal im Browser (localStorage), es wird nichts hochgeladen.
 */
(function (root) {
    "use strict";
    var doc = root.document;
    var t = function (de, en) { return root.$t ? root.$t(de, en) : de; };
    var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
    function read(k) { try { return root.localStorage.getItem(k); } catch (e) { return null; } }
    function store(k, v) { try { root.localStorage.setItem(k, v); } catch (e) { /* Speicher voll oder gesperrt */ } }
    function drop(k) { try { root.localStorage.removeItem(k); } catch (e) { /* egal */ } }

    var COLORS = [["#eef1f7", t("Weiß", "White")], ["#f5c518", t("Gelb", "Yellow")], ["#35e0c4", t("Türkis", "Teal")], ["#e94560", t("Rot", "Red")]];
    var CSS =
        ".sor-wp{margin-top:0.9rem;border:1px solid rgba(255,255,255,0.09);border-radius:14px;background:rgba(255,255,255,0.025)}" +
        ".sor-wp>summary{cursor:pointer;list-style:none;display:flex;align-items:center;gap:0.5rem;padding:0.65rem 0.9rem;font-size:0.9rem;font-weight:600;color:#cdd4e6}" +
        ".sor-wp>summary::-webkit-details-marker{display:none}" +
        ".sor-wp>summary small{font-weight:400;color:#98a2bd;font-size:0.78rem}" +
        ".sor-wp>summary::after{content:'▾';margin-left:auto;color:#98a2bd;transition:transform .2s}" +
        ".sor-wp[open]>summary::after{transform:rotate(180deg)}" +
        ".sor-wp .wp-dot{width:7px;height:7px;border-radius:50%;background:var(--accent,#f5c518);display:none}" +
        ".sor-wp.has-work .wp-dot{display:inline-block}" +
        ".sor-wp .wp-body{padding:0 0.9rem 0.9rem;display:grid;gap:0.7rem}" +
        ".sor-wp label.wp-l{display:block;font-family:'IBM Plex Mono',monospace;font-size:0.68rem;letter-spacing:0.14em;text-transform:uppercase;color:#98a2bd;margin-bottom:0.35rem}" +
        ".sor-wp textarea{width:100%;box-sizing:border-box;min-height:88px;resize:vertical;padding:0.65rem 0.75rem;border-radius:10px;border:1px solid rgba(255,255,255,0.12);background:rgba(10,14,28,0.55);color:#eef1f7;font:0.95rem/1.55 'IBM Plex Mono',ui-monospace,monospace}" +
        ".sor-wp textarea:focus{outline:none;border-color:var(--accent,#f5c518)}" +
        ".sor-wp .wp-tools{display:flex;flex-wrap:wrap;align-items:center;gap:0.35rem;margin-bottom:0.45rem}" +
        ".sor-wp .wp-tools button{width:auto;margin:0;font-weight:400;min-width:34px;height:34px;padding:0 0.55rem;border-radius:9px;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.04);color:#cdd4e6;cursor:pointer;font:inherit;font-size:0.85rem}" +
        ".sor-wp .wp-tools button[aria-pressed=true]{border-color:var(--accent,#f5c518);background:rgba(245,197,24,0.12);color:var(--accent,#f5c518)}" +
        ".sor-wp .wp-tools button:disabled{opacity:0.4;cursor:default}" +
        ".sor-wp .wp-tools .sw{width:22px;height:22px;border-radius:50%;display:inline-block;vertical-align:middle;border:2px solid rgba(255,255,255,0.25)}" +
        ".sor-wp .wp-tools .sep{width:1px;height:22px;background:rgba(255,255,255,0.1);margin:0 0.2rem}" +
        ".sor-wp .wp-canvas{position:relative;border-radius:10px;border:1px solid rgba(255,255,255,0.12);background-color:rgba(10,14,28,0.55);overflow:hidden}" +
        ".sor-wp .wp-canvas.grid{background-image:linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px);background-size:20px 20px}" +
        ".sor-wp canvas{display:block;width:100%;height:240px;touch-action:none;cursor:crosshair}" +
        ".sor-wp.tall canvas{height:420px}" +
        ".sor-wp .wp-empty{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#6f7893;font-size:0.85rem;pointer-events:none;text-align:center;padding:1rem}" +
        ".sor-wp.locked textarea,.sor-wp.locked canvas{pointer-events:none;opacity:0.85}" +
        ".sor-wp.locked .wp-tools{display:none}" +
        ".sor-wp-review{margin-top:0.9rem;display:grid;gap:0.8rem}" +
        ".sor-wp-review .cmp{display:grid;grid-template-columns:1fr 1fr;gap:0.8rem}" +
        ".sor-wp-review .cmp.solo{grid-template-columns:1fr}" +
        ".sor-wp-review .col{border:1px solid rgba(255,255,255,0.09);border-radius:12px;padding:0.75rem 0.85rem;background:rgba(255,255,255,0.03);min-width:0}" +
        ".sor-wp-review .col h4{margin:0 0 0.5rem;font-family:'IBM Plex Mono',monospace;font-size:0.68rem;letter-spacing:0.14em;text-transform:uppercase;color:#98a2bd;font-weight:500}" +
        ".sor-wp-review .col.mine h4{color:#35e0c4}" +
        ".sor-wp-review pre{margin:0;white-space:pre-wrap;word-break:break-word;font:0.9rem/1.55 'IBM Plex Mono',ui-monospace,monospace;color:#eef1f7}" +
        ".sor-wp-review img{display:block;width:100%;margin-top:0.5rem;border-radius:8px;border:1px solid rgba(255,255,255,0.08)}" +
        ".sor-wp-review ol{margin:0;padding-left:1.2rem;display:grid;gap:0.3rem}" +
        ".sor-wp-review .tip{font-size:0.86rem;color:#aab2cc;margin:0}" +
        ".sor-wp-review .rate{display:flex;flex-wrap:wrap;align-items:center;gap:0.45rem}" +
        ".sor-wp-review .rate span.q{font-size:0.9rem;color:#cdd4e6;margin-right:0.3rem}" +
        ".sor-wp-review .rate button{width:auto;margin:0;font-weight:500;padding:0.42rem 0.8rem;border-radius:999px;border:1px solid rgba(255,255,255,0.14);background:rgba(255,255,255,0.04);color:#cdd4e6;cursor:pointer;font:inherit;font-size:0.86rem}" +
        ".sor-wp-review .rate button:hover{border-color:var(--accent,#f5c518)}" +
        ".sor-wp-review .rate button[aria-pressed=true]{border-color:var(--accent,#f5c518);background:rgba(245,197,24,0.14);color:var(--accent,#f5c518)}" +
        ".sor-wp-review .rate .msg{flex-basis:100%;font-size:0.84rem;color:#98a2bd}" +
        "@media (max-width:640px){.sor-wp-review .cmp{grid-template-columns:1fr}.sor-wp canvas{height:220px}}";

    function injectCss() {
        if (!doc || doc.getElementById("sor-wp-css")) return;
        var s = doc.createElement("style"); s.id = "sor-wp-css"; s.textContent = CSS; doc.head.appendChild(s);
    }

    // ---------- Zeichenfläche und Notizen ----------
    function create(opts) {
        opts = opts || {};
        injectCss();
        var key = opts.key ? "sor-wp:" + opts.key : null;
        var el = doc.createElement("details");
        el.className = "sor-wp";
        if (opts.open || read("sor-wp-open") === "1") el.open = true;
        var tools = '<button type="button" data-tool="pen" aria-pressed="true" title="' + esc(t("Stift", "Pen")) + '">✏️</button>' +
            COLORS.map(function (c, i) { return '<button type="button" data-color="' + c[0] + '" aria-pressed="' + (i === 0) + '" title="' + esc(c[1]) + '" aria-label="' + esc(c[1]) + '"><span class="sw" style="background:' + c[0] + '"></span></button>'; }).join("") +
            '<span class="sep" aria-hidden="true"></span>' +
            '<button type="button" data-tool="erase" aria-pressed="false" title="' + esc(t("Radierer", "Eraser")) + '">🧽</button>' +
            '<button type="button" data-act="undo" title="' + esc(t("Rückgängig", "Undo")) + '" aria-label="' + esc(t("Rückgängig", "Undo")) + '">↶</button>' +
            '<button type="button" data-act="clear" title="' + esc(t("Skizze leeren", "Clear sketch")) + '" aria-label="' + esc(t("Skizze leeren", "Clear sketch")) + '">🗑</button>' +
            '<span class="sep" aria-hidden="true"></span>' +
            '<button type="button" data-act="grid" aria-pressed="true" title="' + esc(t("Kästchenpapier", "Grid paper")) + '">▦</button>' +
            '<button type="button" data-act="tall" aria-pressed="false" title="' + esc(t("Größere Fläche", "Bigger canvas")) + '">↕</button>';
        el.innerHTML = '<summary><span aria-hidden="true">✍️</span>' + esc(t("Rechenweg & Skizze", "Working & sketch")) + ' <small>' + esc(t("freiwillig", "optional")) + '</small><span class="wp-dot" aria-hidden="true"></span></summary>' +
            '<div class="wp-body">' +
            '<div><label class="wp-l">' + esc(t("Dein Rechenweg", "Your working")) + '</label><textarea spellcheck="false" placeholder="' + esc(t("Schreibe hier Schritt für Schritt auf, wie du vorgehst …", "Write down step by step how you approach it …")) + '"></textarea></div>' +
            '<div><label class="wp-l">' + esc(t("Deine Skizze", "Your sketch")) + '</label><div class="wp-tools" role="toolbar" aria-label="' + esc(t("Zeichenwerkzeuge", "Drawing tools")) + '">' + tools + '</div>' +
            '<div class="wp-canvas grid"><canvas aria-label="' + esc(t("Zeichenfläche", "Drawing area")) + '"></canvas><div class="wp-empty">' + esc(t("Zeichne hier mit Maus, Finger oder Stift: Skizze, Graph, Dreieck …", "Draw here with mouse, finger or pen: sketch, graph, triangle …")) + '</div></div></div>' +
            "</div>";

        var ta = el.querySelector("textarea"), cv = el.querySelector("canvas"), wrap = el.querySelector(".wp-canvas"), empty = el.querySelector(".wp-empty");
        var ctx = cv.getContext("2d");
        var strokes = [], cur = null, color = COLORS[0][0], erase = false, locked = false, lastPen = 0, w = 0, h = 0;

        function hasWork() { return !!(ta.value.trim() || strokes.length); }
        function mark() { el.classList.toggle("has-work", hasWork()); empty.style.display = strokes.length ? "none" : ""; }
        var saveTimer = null;
        function save() {
            if (!key) return;
            clearTimeout(saveTimer);
            saveTimer = setTimeout(function () {
                if (!hasWork()) { drop(key); return; }
                var json = JSON.stringify({ n: ta.value, s: strokes });
                if (json.length > 400000) json = JSON.stringify({ n: ta.value, s: [] }); // sehr große Skizzen nicht dauerhaft speichern
                store(key, json);
            }, 300);
        }
        function size() {
            var r = cv.getBoundingClientRect(), dpr = Math.min(root.devicePixelRatio || 1, 2);
            if (!r.width) return false;
            w = r.width; h = r.height;
            cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            return true;
        }
        // Punkte werden relativ zur Breite gespeichert, damit die Skizze beim Größenwechsel erhalten bleibt
        function drawStroke(s) {
            if (!s.p.length) return;
            ctx.save();
            ctx.globalCompositeOperation = s.e ? "destination-out" : "source-over";
            ctx.strokeStyle = s.c; ctx.fillStyle = s.c; ctx.lineCap = "round"; ctx.lineJoin = "round";
            ctx.lineWidth = s.e ? 22 : 2.6;
            if (s.p.length === 1) { ctx.beginPath(); ctx.arc(s.p[0][0] * w, s.p[0][1] * w, ctx.lineWidth / 2, 0, Math.PI * 2); ctx.fill(); }
            else {
                ctx.beginPath(); ctx.moveTo(s.p[0][0] * w, s.p[0][1] * w);
                for (var i = 1; i < s.p.length; i += 1) ctx.lineTo(s.p[i][0] * w, s.p[i][1] * w);
                ctx.stroke();
            }
            ctx.restore();
        }
        function redraw() { if (!w && !size()) return; ctx.clearRect(0, 0, w, h); strokes.forEach(drawStroke); mark(); }
        function pos(ev) { var r = cv.getBoundingClientRect(); return [Math.round((ev.clientX - r.left) / r.width * 10000) / 10000, Math.round((ev.clientY - r.top) / r.width * 10000) / 10000]; }

        cv.addEventListener("pointerdown", function (ev) {
            if (locked || (ev.pointerType === "mouse" && ev.button !== 0)) return;
            if (ev.pointerType === "pen") lastPen = Date.now();
            else if (ev.pointerType === "touch" && Date.now() - lastPen < 1500) return; // Handballen ignorieren, wenn gerade mit Stift gezeichnet wird
            if (!w) size();
            ev.preventDefault();
            try { cv.setPointerCapture(ev.pointerId); } catch (e) { /* ältere Browser */ }
            cur = { c: color, e: erase, p: [pos(ev)] }; strokes.push(cur); drawStroke(cur); mark();
        });
        cv.addEventListener("pointermove", function (ev) {
            if (!cur) return;
            if (ev.pointerType === "pen") lastPen = Date.now();
            var pts = ev.getCoalescedEvents ? ev.getCoalescedEvents() : [ev];
            if (!pts.length) pts = [ev];
            pts.forEach(function (p) { cur.p.push(pos(p)); });
            ctx.clearRect(0, 0, w, h); strokes.forEach(drawStroke);
        });
        function end() { if (!cur) return; cur = null; save(); }
        cv.addEventListener("pointerup", end); cv.addEventListener("pointercancel", end); cv.addEventListener("lostpointercapture", end);
        ta.addEventListener("input", function () { mark(); save(); });

        el.querySelector(".wp-tools").addEventListener("click", function (ev) {
            var b = ev.target.closest("button"); if (!b || locked) return;
            var tool = b.getAttribute("data-tool"), c = b.getAttribute("data-color"), act = b.getAttribute("data-act");
            var pressOnly = function (sel, on) { Array.prototype.forEach.call(el.querySelectorAll(sel), function (x) { x.setAttribute("aria-pressed", String(x === on)); }); };
            if (c) { color = c; erase = false; pressOnly("[data-color]", b); pressOnly("[data-tool]", el.querySelector('[data-tool="pen"]')); }
            else if (tool) { erase = tool === "erase"; pressOnly("[data-tool]", b); }
            else if (act === "undo") { strokes.pop(); redraw(); save(); }
            else if (act === "clear") { if (!strokes.length) return; strokes = []; redraw(); save(); }
            else if (act === "grid") { var g = !wrap.classList.contains("grid"); wrap.classList.toggle("grid", g); b.setAttribute("aria-pressed", String(g)); }
            else if (act === "tall") { var tl = !el.classList.contains("tall"); el.classList.toggle("tall", tl); b.setAttribute("aria-pressed", String(tl)); size(); redraw(); }
        });
        el.addEventListener("toggle", function () {
            if (!opts.noRemember) store("sor-wp-open", el.open ? "1" : "0");
            if (el.open) { size(); redraw(); }
        });
        if (root.ResizeObserver) new root.ResizeObserver(function () { if (el.open && size()) redraw(); }).observe(cv);
        else root.addEventListener("resize", function () { if (el.open && size()) redraw(); });

        if (key) {
            try { var d = JSON.parse(read(key) || "null"); if (d) { ta.value = d.n || ""; strokes = Array.isArray(d.s) ? d.s : []; } } catch (e) { /* defekter Entwurf */ }
        }
        mark();

        var pad = {
            el: el,
            hasWork: hasWork,
            notes: function () { return ta.value.trim(); },
            reset: function () { ta.value = ""; strokes = []; cur = null; if (w) ctx.clearRect(0, 0, w, h); mark(); if (key) drop(key); },
            forget: function () { if (key) drop(key); },
            lock: function (on) { locked = !!on; el.classList.toggle("locked", locked); ta.readOnly = locked; },
            // Skizze als Bild für den Vergleich (nur der gezeichnete Bereich plus Rand)
            snapshot: function () {
                if (!strokes.length) return null;
                var maxY = 0, minY = Infinity;
                strokes.forEach(function (s) { s.p.forEach(function (p) { if (p[1] > maxY) maxY = p[1]; if (p[1] < minY) minY = p[1]; }); });
                var W = 640, top = Math.max(0, minY * W - 24), H = Math.max(80, Math.min(maxY * W + 24, 1200) - top);
                var c = doc.createElement("canvas"); c.width = W; c.height = Math.round(H);
                var x = c.getContext("2d");
                x.translate(0, -top);
                strokes.forEach(function (s) {
                    if (!s.p.length) return;
                    x.save(); x.globalCompositeOperation = s.e ? "destination-out" : "source-over";
                    x.strokeStyle = s.c; x.fillStyle = s.c; x.lineCap = "round"; x.lineJoin = "round"; x.lineWidth = s.e ? 22 * W / (w || W) : 2.6 * W / (w || W);
                    x.beginPath(); x.moveTo(s.p[0][0] * W, s.p[0][1] * W);
                    for (var i = 1; i < s.p.length; i += 1) x.lineTo(s.p[i][0] * W, s.p[i][1] * W);
                    if (s.p.length === 1) x.lineTo(s.p[0][0] * W + 0.1, s.p[0][1] * W);
                    x.stroke(); x.restore();
                });
                var out = doc.createElement("canvas"); out.width = W; out.height = c.height;
                var o = out.getContext("2d"); o.fillStyle = "#121729"; o.fillRect(0, 0, W, out.height); o.drawImage(c, 0, 0);
                try { return out.toDataURL("image/png"); } catch (e) { return null; }
            }
        };
        return pad;
    }

    // ---------- Verständnis (Selbsteinschätzung) ----------
    var UKEY = "sor-understanding";
    function understanding() { try { return JSON.parse(read(UKEY) || "{}") || {}; } catch (e) { return {}; } }
    function rate(topicId, v, title) {
        if (!topicId || ["yes", "part", "no"].indexOf(v) === -1) return;
        var all = understanding(), prev = all[topicId] || { n: 0 };
        all[topicId] = { v: v, at: new Date().toISOString(), title: title || prev.title || "", n: (prev.n || 0) + 1 };
        var ids = Object.keys(all);
        if (ids.length > 300) ids.sort(function (a, b) { return (all[a].at || "").localeCompare(all[b].at || ""); }).slice(0, ids.length - 300).forEach(function (id) { delete all[id]; });
        store(UKEY, JSON.stringify(all));
    }
    function needsReview() {
        var all = understanding();
        return Object.keys(all).filter(function (id) { return all[id].v !== "yes"; })
            .sort(function (a, b) { return (all[b].at || "").localeCompare(all[a].at || ""); })
            .map(function (id) { return { id: id, v: all[id].v, title: all[id].title, at: all[id].at }; });
    }

    // ---------- Vergleich nach der Antwort ----------
    function review(o) {
        o = o || {};
        injectCss();
        var box = doc.createElement("div");
        box.className = "sor-wp-review";
        var pad = o.pad, mine = pad && pad.hasWork(), html = "", solLabel = o.solutionLabel || t("Musterlösung", "Model solution");
        var steps = o.steps;
        var stepsHtml = Array.isArray(steps) ? (steps.length > 1 ? "<ol>" + steps.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>" : steps.length ? "<p style=\"margin:0\">" + steps[0] + "</p>" : "") : (steps || "");
        if (mine) {
            var notes = pad.notes(), img = pad.snapshot();
            html += '<div class="cmp' + (stepsHtml ? "" : " solo") + '"><div class="col mine"><h4>' + esc(t("Dein Weg", "Your working")) + "</h4>" +
                (notes ? "<pre>" + esc(notes) + "</pre>" : "") + (img ? '<img alt="' + esc(t("Deine Skizze", "Your sketch")) + '" src="' + img + '">' : "") + "</div>" +
                (stepsHtml ? '<div class="col"><h4>' + esc(solLabel) + "</h4>" + stepsHtml + "</div>" : "") + "</div>" +
                '<p class="tip">' + esc(t("Geh Schritt für Schritt durch: Wo stimmt dein Weg mit der " + solLabel + " überein, wo bist du abgebogen?", "Go through it step by step: where does your working match the " + solLabel.toLowerCase() + ", and where did you take a different turn?")) + "</p>";
        } else if (stepsHtml && o.showSteps) {
            html += '<div class="cmp solo"><div class="col"><h4>' + esc(solLabel) + "</h4>" + stepsHtml + "</div></div>";
        }
        if (o.topicId) {
            var prev = understanding()[o.topicId];
            html += '<div class="rate" role="group" aria-label="' + esc(t("Selbsteinschätzung", "Self-assessment")) + '"><span class="q">' + esc(t("Hast du den Lösungsweg verstanden?", "Did you understand the solution?")) + "</span>" +
                [["yes", "✅ " + t("Ja", "Yes")], ["part", "🤔 " + t("Teilweise", "Partly")], ["no", "❓ " + t("Noch nicht", "Not yet")]].map(function (b) { return '<button type="button" data-v="' + b[0] + '" aria-pressed="false">' + esc(b[1]) + "</button>"; }).join("") +
                '<span class="msg" aria-live="polite">' + (prev && prev.v !== "yes" ? esc(t("Beim letzten Mal war dieses Thema noch nicht ganz klar.", "Last time this topic was not fully clear yet.")) : "") + "</span></div>";
        }
        box.innerHTML = html;
        var rateBox = box.querySelector(".rate");
        if (rateBox) rateBox.addEventListener("click", function (ev) {
            var b = ev.target.closest("[data-v]"); if (!b) return;
            var v = b.getAttribute("data-v");
            rate(o.topicId, v, o.title);
            Array.prototype.forEach.call(rateBox.querySelectorAll("[data-v]"), function (x) { x.setAttribute("aria-pressed", String(x === b)); });
            rateBox.querySelector(".msg").textContent = v === "yes" ? t("Stark. Das Thema gilt für dich als verstanden.", "Great. This topic counts as understood.")
                : o.reviewList === false ? t("Notiert. Lies die Erklärung noch einmal in Ruhe und versuche die nächste Aufgabe.", "Noted. Read the explanation again calmly and try the next task.")
                : v === "part" ? t("Notiert. Das Thema taucht bei „Zum Wiederholen“ wieder auf.", "Noted. The topic will come back under “To review”.")
                : t("Notiert. Lies die Musterlösung noch einmal in Ruhe, das Thema kommt in deine Wiederholung.", "Noted. Read the model solution again calmly, the topic goes into your review list.");
            if (typeof o.onRate === "function") o.onRate(v);
        });
        if (!box.innerHTML) return null;
        return box;
    }

    root.SOR_WORKPAD = { create: create, review: review, rate: rate, needsReview: needsReview, understanding: understanding };
})(typeof window !== "undefined" ? window : this);
