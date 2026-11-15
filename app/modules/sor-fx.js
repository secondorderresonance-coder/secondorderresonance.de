/*
 * SOR FX: Altersstufen-Design und Bewegung
 * ------------------------------------------------------------
 * - Altersstufe: <html data-age="kid|teen|uni">. Modus "auto" folgt Klasse oder Level der Seite,
 *   sonst der zuletzt genutzten Stufe. Im Menü (Knopf in der Kopfzeile) frei wählbar.
 * - Klick-Welle: bei jedem Klick zeichnet sich kurz die Resonanzwelle (das SOR-Zeichen).
 * - SOR_FX.celebrate(el) und SOR_FX.miss(el): Rückmeldung bei richtiger und falscher Antwort.
 * - Maskottchen "Resi" (nur Kinderstufe, nur Lernseiten).
 * Alle Bewegungen nutzen nur transform und opacity und entfallen bei prefers-reduced-motion.
 * Im <head> einbinden (setzt data-age vor dem ersten Zeichnen). Stil: sor-age.css.
 *
 *   SOR_FX.age()                       -> "kid" | "teen" | "uni"
 *   SOR_FX.mode() / SOR_FX.setMode(m)  -> "auto" | "kid" | "teen" | "uni"
 *   SOR_FX.setContext({ grade, level }) meldet Klasse (1 bis 13) oder Level (1 bis 6) der Seite
 *   SOR_FX.button()                    -> HTML des Umschalters
 *   SOR_FX.onChange(fn)
 */
(function (root) {
    "use strict";
    var doc = root.document, html = doc.documentElement;
    var WAVE = "M2 20 C8 20 8 7 14 7 C20 7 20 33 26 33 C32 33 32 20 38 20";
    var MODES = ["auto", "kid", "teen", "uni"];
    var t = function (de, en) { return root.$t ? root.$t(de, en) : de; };
    var reduce = root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var listeners = [], ctxAge = null;

    function read(k) { try { return root.localStorage.getItem(k); } catch (e) { return null; } }
    function write(k, v) { try { root.localStorage.setItem(k, v); } catch (e) { /* privater Modus */ } }

    function ageFor(o) {
        if (!o) return null;
        if (o.grade) return o.grade <= 6 ? "kid" : "teen";
        if (o.level) return o.level <= 2 ? "kid" : o.level === 3 ? "teen" : "uni";
        return null;
    }
    function mode() { var m = read("sor-age-mode"); return MODES.indexOf(m) >= 0 ? m : "auto"; }
    function age() {
        var m = mode();
        if (m !== "auto") return m;
        var last = read("sor-age-auto");
        return ctxAge || (last === "kid" || last === "uni" ? last : "teen");
    }
    function apply() {
        var a = age(), before = html.getAttribute("data-age");
        html.setAttribute("data-age", a);
        if (before !== a) { syncButton(); mountResi(); mountSky(); listeners.forEach(function (fn) { fn(a); }); }
    }
    function setMode(m) { if (MODES.indexOf(m) < 0) return; write("sor-age-mode", m); apply(); syncButton(); }
    function setContext(o) { var a = ageFor(o); if (!a) return; ctxAge = a; write("sor-age-auto", a); apply(); }
    apply();

    // ---------- Umschalter ----------
    var LABEL = { auto: ["Automatisch", "Automatic", "✨"], kid: ["Grundschule", "Primary school", "🎈"], teen: ["Schule", "School", "⚡"], uni: ["Studium", "University", "🎓"] };
    var HINT = { auto: ["passt sich deiner Stufe an", "follows your level"], kid: ["bunt und verspielt", "colourful and playful"], teen: ["der gewohnte Stil", "the familiar style"], uni: ["ruhig und sachlich", "calm and plain"] };
    function button() {
        return '<span class="fx-age"><button type="button" class="fx-age-btn" aria-haspopup="true" aria-expanded="false" title="' + t("Aussehen wählen", "Choose appearance") + '"><span class="fx-age-ico">' + LABEL[age()][2] + '</span><span class="fx-age-txt">' + t("Aussehen", "Look") + "</span></button>" +
            '<span class="fx-age-menu" role="menu" hidden>' + MODES.map(function (m) {
                return '<button type="button" role="menuitemradio" data-age-mode="' + m + '" aria-checked="' + (mode() === m) + '"><span>' + LABEL[m][2] + "</span><span><b>" + t(LABEL[m][0], LABEL[m][1]) + "</b><small>" + t(HINT[m][0], HINT[m][1]) + "</small></span></button>";
            }).join("") + "</span></span>";
    }
    function syncButton() {
        Array.prototype.forEach.call(doc.querySelectorAll(".fx-age-ico"), function (el) { el.textContent = LABEL[age()][2]; });
        Array.prototype.forEach.call(doc.querySelectorAll("[data-age-mode]"), function (el) { el.setAttribute("aria-checked", String(el.getAttribute("data-age-mode") === mode())); });
        Array.prototype.forEach.call(doc.querySelectorAll("[data-age-pick]"), function (el) { el.setAttribute("aria-pressed", String(el.getAttribute("data-age-pick") === age())); });
    }
    function closeMenus(except) {
        Array.prototype.forEach.call(doc.querySelectorAll(".fx-age-menu"), function (m) {
            if (m === except) return;
            m.hidden = true; var b = m.parentNode.querySelector(".fx-age-btn"); if (b) b.setAttribute("aria-expanded", "false");
        });
    }
    doc.addEventListener("click", function (e) {
        var tg = e.target, btn = tg.closest ? tg.closest(".fx-age-btn") : null, item = tg.closest ? tg.closest("[data-age-mode]") : null, pick = tg.closest ? tg.closest("[data-age-pick]") : null;
        if (btn) { var menu = btn.parentNode.querySelector(".fx-age-menu"), open = menu.hidden; closeMenus(menu); menu.hidden = !open; btn.setAttribute("aria-expanded", String(open)); return; }
        if (item) { setMode(item.getAttribute("data-age-mode")); closeMenus(); return; }
        if (pick) { setMode(pick.getAttribute("data-age-pick")); }
        closeMenus();
    });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenus(); });

    // ---------- Zeichenhilfen ----------
    var NS = "http://www.w3.org/2000/svg";
    function layer() {
        var l = doc.getElementById("fxLayer");
        if (!l) { l = doc.createElement("div"); l.id = "fxLayer"; l.setAttribute("aria-hidden", "true"); doc.body.appendChild(l); }
        return l;
    }
    function waveSvg(size, color, width) {
        var s = doc.createElementNS(NS, "svg"), p = doc.createElementNS(NS, "path");
        s.setAttribute("viewBox", "0 0 40 40"); s.setAttribute("width", size); s.setAttribute("height", size); s.setAttribute("class", "fx-wave");
        p.setAttribute("d", WAVE); p.setAttribute("fill", "none"); p.setAttribute("stroke", color); p.setAttribute("stroke-width", width); p.setAttribute("stroke-linecap", "round"); p.setAttribute("pathLength", "100");
        s.appendChild(p); return s;
    }
    function done(anim, el) { var rm = function () { if (el.parentNode) el.parentNode.removeChild(el); }; if (anim && anim.finished) anim.finished.then(rm, rm); else setTimeout(rm, 1200); }
    var EASE = "cubic-bezier(.22,1,.36,1)";
    var KID_COLORS = ["#f5c518", "#35e0c4", "#ff7ab6", "#60a5fa", "#a3e635", "#ff9f43"];
    var canAnimate = !!(doc.documentElement.animate);

    // ---------- Klick-Welle ----------
    function clickWave(x, y) {
        if (reduce || !canAnimate || !doc.body) return;
        var a = age(), size = a === "kid" ? 76 : a === "uni" ? 40 : 56, color = a === "kid" ? KID_COLORS[Math.floor(Math.random() * KID_COLORS.length)] : a === "uni" ? "rgba(238,241,247,0.75)" : "#f5c518";
        var s = waveSvg(size, color, a === "uni" ? 1.6 : a === "kid" ? 3.4 : 2.6), p = s.firstChild, L = layer();
        s.style.left = (x - size / 2) + "px"; s.style.top = (y - size / 2) + "px";
        L.appendChild(s);
        p.style.strokeDasharray = "100"; p.style.strokeDashoffset = "100";
        p.animate([{ strokeDashoffset: 100 }, { strokeDashoffset: 0 }], { duration: a === "uni" ? 260 : 340, easing: EASE, fill: "forwards" });
        done(s.animate([{ opacity: 1, transform: "scale(.7)" }, { opacity: 1, transform: "scale(1)", offset: 0.45 }, { opacity: 0, transform: "scale(" + (a === "kid" ? 1.5 : 1.25) + ")" }], { duration: a === "uni" ? 420 : a === "kid" ? 760 : 600, easing: "ease-out" }), s);
        if (a === "uni") return;
        var ring = doc.createElement("i"); ring.className = "fx-ring"; ring.style.left = x + "px"; ring.style.top = y + "px"; ring.style.borderColor = color; L.appendChild(ring);
        done(ring.animate([{ opacity: 0.55, transform: "translate(-50%,-50%) scale(.2)" }, { opacity: 0, transform: "translate(-50%,-50%) scale(1)" }], { duration: 520, easing: "ease-out" }), ring);
        if (a === "kid") sparks(x, y, 5, 46, ["★", "✦", "●"]);
    }
    function sparks(x, y, n, dist, glyphs) {
        var L = layer(), i;
        for (i = 0; i < n; i += 1) {
            var el = doc.createElement("i"), ang = Math.PI * 2 * (i / n) + Math.random() * 0.8, d = dist * (0.6 + Math.random() * 0.7);
            el.className = "fx-spark"; el.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
            el.style.left = x + "px"; el.style.top = y + "px"; el.style.color = KID_COLORS[(i + Math.floor(Math.random() * 6)) % 6]; el.style.fontSize = (10 + Math.random() * 12) + "px";
            L.appendChild(el);
            done(el.animate([{ opacity: 1, transform: "translate(-50%,-50%) scale(.4)" }, { opacity: 1, transform: "translate(calc(-50% + " + Math.cos(ang) * d * 0.7 + "px),calc(-50% + " + Math.sin(ang) * d * 0.7 + "px)) scale(1) rotate(" + (Math.random() * 120 - 60) + "deg)", offset: 0.6 }, { opacity: 0, transform: "translate(calc(-50% + " + Math.cos(ang) * d + "px),calc(-50% + " + (Math.sin(ang) * d + 14) + "px)) scale(.8) rotate(" + (Math.random() * 240 - 120) + "deg)" }], { duration: 620 + Math.random() * 320, easing: "ease-out" }), el);
        }
    }
    doc.addEventListener("pointerdown", function (e) { if (e.button === 0 || e.pointerType !== "mouse") clickWave(e.clientX, e.clientY); }, { passive: true });

    // ---------- Hover-Lichtkegel auf Karten (Stil in sor-age.css) ----------
    var HOVER_SEL = "a.card,button.card,.wcard,.course-card,.level-card,.cp-card,.age-card,.xcard,.ccard,.visual-card,.media-card,.mission-card";
    var hoverRaf = 0, hoverEv = null;
    if (!reduce && root.matchMedia && root.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        doc.addEventListener("pointermove", function (e) {
            hoverEv = e;
            if (hoverRaf) return;
            hoverRaf = root.requestAnimationFrame(function () {
                hoverRaf = 0;
                var t = hoverEv.target, el = t && t.closest ? t.closest(HOVER_SEL) : null;
                if (!el) return;
                var r = el.getBoundingClientRect();
                el.style.setProperty("--mx", Math.round(hoverEv.clientX - r.left) + "px");
                el.style.setProperty("--my", Math.round(hoverEv.clientY - r.top) + "px");
            });
        }, { passive: true });
    }

    // ---------- Richtig und falsch ----------
    function center(el) { var r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + Math.min(r.height / 2, 40), w: r.width }; }
    function celebrate(el) {
        resi("cheer");
        if (reduce || !canAnimate || !el) return;
        var a = age(), c = center(el), L = layer(), i;
        if (a === "uni") {
            var u = waveSvg(64, "#35e0c4", 1.8), pu = u.firstChild; u.style.left = (c.x - 32) + "px"; u.style.top = (c.y - 32) + "px"; L.appendChild(u);
            pu.style.strokeDasharray = "100"; pu.animate([{ strokeDashoffset: 100 }, { strokeDashoffset: 0 }], { duration: 420, easing: EASE, fill: "forwards" });
            done(u.animate([{ opacity: 1 }, { opacity: 1, offset: 0.7 }, { opacity: 0 }], { duration: 900 }), u);
            return;
        }
        var n = a === "kid" ? 8 : 6;
        for (i = 0; i < n; i += 1) {
            var ang = 360 / n * i, s = waveSvg(a === "kid" ? 52 : 44, a === "kid" ? KID_COLORS[i % 6] : i % 2 ? "#35e0c4" : "#f5c518", 3), d = a === "kid" ? 150 : 110;
            s.style.left = (c.x - 24) + "px"; s.style.top = (c.y - 24) + "px"; L.appendChild(s);
            done(s.animate([{ opacity: 0, transform: "rotate(" + ang + "deg) translateX(10px) scale(.4)" }, { opacity: 1, transform: "rotate(" + ang + "deg) translateX(" + d * 0.6 + "px) scale(1)", offset: 0.5 }, { opacity: 0, transform: "rotate(" + ang + "deg) translateX(" + d + "px) scale(.8)" }], { duration: 900, easing: EASE }), s);
        }
        if (a === "kid") sparks(c.x, c.y, 18, 170, ["★", "+", "×", "÷", "=", "π", "✦", "♥"]);
        if (el.animate) el.animate([{ transform: "scale(1)" }, { transform: "scale(" + (a === "kid" ? 1.035 : 1.015) + ")" }, { transform: "scale(1)" }], { duration: 420, easing: EASE });
    }
    function miss(el) {
        resi("oops");
        if (reduce || !canAnimate || !el || !el.animate) return;
        var d = age() === "uni" ? 3 : 7;
        el.animate([{ transform: "translateX(0)" }, { transform: "translateX(-" + d + "px)" }, { transform: "translateX(" + d + "px)" }, { transform: "translateX(-" + d / 2 + "px)" }, { transform: "translateX(0)" }], { duration: 360, easing: "ease-out" });
    }

    // ---------- Maskottchen Resi (Kinderstufe) ----------
    var resiEl = null, resiTimer = null;
    var SAY = {
        hello: ["Hallo, ich bin Resi, die Welle! Tipp mich an.|Schön, dass du da bist!|Lust auf eine Runde Rechnen?", "Hi, I am Resi the wave! Tap me.|Great to see you!|Fancy a round of maths?"],
        cheer: ["Juhu, richtig!|Super gemacht!|Du bist spitze!|Weiter so!|Wow, das ging schnell!", "Yay, correct!|Well done!|You are great!|Keep going!|Wow, that was quick!"],
        oops: ["Nicht schlimm, gleich nochmal!|Fehler helfen beim Lernen.|Schau dir den Weg an, dann klappt es.", "No problem, try again!|Mistakes help you learn.|Look at the steps, then it works."],
        tap: ["Hihi, das kitzelt!|Wusstest du? Eine Welle hat Berge und Täler.|Null ist die einzige Zahl, die weder plus noch minus ist.|Ein Kreis hat unendlich viele Ecken. Oder keine?|Ich schwinge am liebsten in Resonanz!|10 mal 10 ist 100. Leicht zu merken!", "Hehe, that tickles!|Did you know? A wave has crests and troughs.|Zero is the only number that is neither plus nor minus.|A circle has infinitely many corners. Or none?|I love swinging in resonance!|10 times 10 is 100. Easy to remember!"]
    };
    function pickLine(kind) { var a = t(SAY[kind][0], SAY[kind][1]).split("|"); return a[Math.floor(Math.random() * a.length)]; }
    function mountResi() {
        if (!doc.body) return;
        var want = age() === "kid" && !!doc.getElementById("sorHeader") && read("sor-resi-off") !== "1";
        if (!want) { if (resiEl) { resiEl.parentNode.removeChild(resiEl); resiEl = null; } return; }
        if (resiEl) return;
        resiEl = doc.createElement("div"); resiEl.className = "fx-resi";
        resiEl.innerHTML = '<div class="fx-resi-say" role="status" hidden></div><button type="button" class="fx-resi-x" aria-label="' + t("Resi ausblenden", "Hide Resi") + '">×</button>' +
            '<button type="button" class="fx-resi-body" aria-label="' + t("Resi, die Welle", "Resi the wave") + '"><svg viewBox="0 0 96 80" width="96" height="80">' +
            '<path class="fx-resi-wave" d="M6 44 C18 44 18 14 34 14 C50 14 50 66 66 66 C78 66 80 44 90 44" fill="none" stroke="#f5c518" stroke-width="13" stroke-linecap="round"/>' +
            '<path d="M6 44 C18 44 18 14 34 14 C50 14 50 66 66 66 C78 66 80 44 90 44" fill="none" stroke="#ffe680" stroke-width="4" stroke-linecap="round" opacity="0.7" transform="translate(0,-3)"/>' +
            '<g class="fx-resi-eyes"><ellipse cx="29" cy="17" rx="4" ry="5" fill="#16123a"/><ellipse cx="41" cy="17" rx="4" ry="5" fill="#16123a"/><circle cx="30.4" cy="15.2" r="1.4" fill="#fff"/><circle cx="42.4" cy="15.2" r="1.4" fill="#fff"/></g>' +
            '<path class="fx-resi-mouth" d="M31 25 Q35 29 39 25" fill="none" stroke="#16123a" stroke-width="2" stroke-linecap="round"/>' +
            '<circle cx="24" cy="23" r="2.6" fill="#ff7ab6" opacity="0.7"/><circle cx="46" cy="23" r="2.6" fill="#ff7ab6" opacity="0.7"/></svg></button>';
        doc.body.appendChild(resiEl);
        resiEl.querySelector(".fx-resi-body").addEventListener("click", function () { resi("tap"); });
        resiEl.querySelector(".fx-resi-x").addEventListener("click", function () { write("sor-resi-off", "1"); mountResi(); });
        setTimeout(function () { resi("hello"); }, 900);
    }
    function resi(kind) {
        if (!resiEl) return;
        var say = resiEl.querySelector(".fx-resi-say"), body = resiEl.querySelector(".fx-resi-body");
        say.textContent = pickLine(kind); say.hidden = false;
        clearTimeout(resiTimer); resiTimer = setTimeout(function () { say.hidden = true; }, kind === "tap" || kind === "hello" ? 4200 : 2600);
        if (reduce || !canAnimate) return;
        var frames = kind === "oops" ? [{ transform: "rotate(0)" }, { transform: "rotate(-9deg)" }, { transform: "rotate(7deg)" }, { transform: "rotate(0)" }]
            : kind === "cheer" ? [{ transform: "translateY(0) scale(1)" }, { transform: "translateY(-34px) scale(1.08,.94)" }, { transform: "translateY(0) scale(.94,1.06)" }, { transform: "translateY(-12px) scale(1)" }, { transform: "translateY(0) scale(1)" }]
            : [{ transform: "scale(1)" }, { transform: "scale(1.12,.9)" }, { transform: "scale(.94,1.08)" }, { transform: "scale(1)" }];
        body.animate(frames, { duration: kind === "cheer" ? 760 : 520, easing: "ease-out" });
    }

    // ---------- Schwebende Zeichen (Kinderstufe) ----------
    var sky = null;
    function mountSky() {
        if (!doc.body) return;
        if (age() !== "kid" || reduce) { if (sky) { sky.parentNode.removeChild(sky); sky = null; } return; }
        if (sky) return;
        sky = doc.createElement("div"); sky.className = "fx-sky"; sky.setAttribute("aria-hidden", "true");
        var g = ["+", "−", "×", "÷", "=", "★", "π", "△", "○", "7", "3", "∞"], h = "", i;
        for (i = 0; i < 14; i += 1) h += '<i style="left:' + ((i * 7.3 + 3) % 96) + "%;top:" + ((i * 37) % 92) + "%;font-size:" + (18 + (i * 11) % 30) + "px;color:" + KID_COLORS[i % 6] + ";animation-duration:" + (9 + (i * 3) % 9) + "s;animation-delay:-" + (i * 1.3) + 's">' + g[i % g.length] + "</i>";
        sky.innerHTML = h; doc.body.insertBefore(sky, doc.body.firstChild);
    }

    function ready() { mountResi(); mountSky(); syncButton(); Array.prototype.forEach.call(doc.querySelectorAll("[data-age-slot]"), function (el) { el.innerHTML = button(); }); }
    if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", ready); else ready();

    root.SOR_FX = { age: age, mode: mode, setMode: setMode, setContext: setContext, ageFor: ageFor, button: button, celebrate: celebrate, miss: miss, clickWave: clickWave, resi: resi, onChange: function (fn) { listeners.push(fn); }, WAVE: WAVE };
})(window);
