/*
 * SOR Zugang: Aufgaben lösen nur mit Online-Konto, vorher eine kurze Schnupperrunde
 * ------------------------------------------------------------
 * Ohne Konto sind FREE Aufgaben frei (zusammen über Üben, Lern-App und Lernarchiv-Lösungen).
 * Danach erscheint ein Hinweis mit "Kostenloses Konto erstellen" und "Anmelden".
 * Der Prüfungstrainer braucht immer ein Konto.
 *
 *   SOR_GATE.loggedIn()            true mit Online-Konto (Supabase-Anmeldung in diesem Browser)
 *   SOR_GATE.left()                verbleibende freie Aufgaben (Infinity mit Konto)
 *   SOR_GATE.canSolve()            loggedIn() oder left() > 0
 *   SOR_GATE.use()                 eine freie Aufgabe verbrauchen (ohne Konto)
 *   SOR_GATE.wall(opts)            Element mit dem Hinweis; opts.title, opts.text, opts.back (Rücksprung nach Anmeldung)
 *   SOR_GATE.badge()               kleiner Hinweis "Schnupperrunde: noch n Aufgaben frei" oder null
 *
 * Hinweis: Das ist eine Sperre im Browser. Sie lenkt Besucher zur Registrierung, ist aber kein
 * Schutz der Inhalte, denn Aufgaben und Lösungen liegen als öffentliche Skripte auf der Seite.
 */
(function (root) {
    "use strict";
    var doc = root.document, FREE = 3, TKEY = "sor-trial-used", SKEY = "sor-cloud-session";
    var t = function (de, en) { return root.$t ? root.$t(de, en) : de; };
    function readJson(k) { try { return JSON.parse(root.localStorage.getItem(k) || "null"); } catch (e) { return null; } }

    function loggedIn() {
        var s = readJson(SKEY);
        if (s && s.refresh_token && s.user && s.user.id) return true;
        // Nur falls die Online-Konten abgeschaltet sind (leere cloud-config), zählt das lokale Konto
        var cloudOff = root.SOR_CLOUD ? !root.SOR_CLOUD.enabled : (root.SOR_CLOUD_CONFIG ? !root.SOR_CLOUD_CONFIG.url : false);
        return !!(cloudOff && root.SOR && root.SOR.accounts && root.SOR.accounts.current());
    }
    function used() { var n = parseInt(readJson(TKEY), 10); return isFinite(n) && n > 0 ? n : 0; }
    function left() { return loggedIn() ? Infinity : Math.max(0, FREE - used()); }
    function canSolve() { return left() > 0; }
    function use() { if (loggedIn()) return; try { root.localStorage.setItem(TKEY, String(used() + 1)); } catch (e) { /* ohne Speicher */ } }

    var CSS =
        ".sor-gate{border:1px solid rgba(245,197,24,0.35);border-radius:18px;padding:1.4rem 1.3rem;background:linear-gradient(160deg,rgba(245,197,24,0.09),rgba(53,224,196,0.05));text-align:center}" +
        ".sor-gate .g-ico{font-size:2rem;line-height:1}" +
        ".sor-gate h3{margin:0.6rem 0 0.4rem;font-family:'Space Grotesk',sans-serif;font-size:1.25rem;color:#eef1f7}" +
        ".sor-gate p{margin:0 auto 1rem;max-width:34rem;color:#aab2cc;font-size:0.95rem}" +
        ".sor-gate ul{list-style:none;margin:0 auto 1.1rem;padding:0;display:inline-grid;gap:0.3rem;text-align:left;color:#cdd4e6;font-size:0.92rem}" +
        ".sor-gate .g-act{display:flex;flex-wrap:wrap;gap:0.6rem;justify-content:center}" +
        ".sor-gate .g-act a{width:auto;display:inline-flex;align-items:center;padding:0.7rem 1.3rem;border-radius:999px;font-weight:700;text-decoration:none;font-size:0.95rem}" +
        ".sor-gate .g-act a.pri{background:var(--accent,#f5c518);color:#0a0e1c}" +
        ".sor-gate .g-act a.sec{border:1px solid rgba(255,255,255,0.18);color:#eef1f7}" +
        ".sor-gate-badge{display:inline-flex;align-items:center;gap:0.4rem;font-size:0.82rem;color:#cdd4e6;background:rgba(245,197,24,0.1);border:1px solid rgba(245,197,24,0.3);border-radius:999px;padding:0.3rem 0.8rem}" +
        ".sor-gate-badge a{color:var(--accent,#f5c518);font-weight:600}";
    function injectCss() {
        if (!doc || doc.getElementById("sor-gate-css")) return;
        var s = doc.createElement("style"); s.id = "sor-gate-css"; s.textContent = CSS; doc.head.appendChild(s);
    }
    // Konto-Seite liegt in app/; von der Startseite aus braucht es das Präfix
    function kontoHref(back, reg) {
        var base = /\/app\//.test(root.location.pathname) ? "konto.html" : "app/konto.html";
        var ok = back && /^[a-z0-9_-]+\.html(\?[^#\s]*)?$/i.test(back);
        return base + (ok ? "?weiter=" + encodeURIComponent(back) : "") + (reg ? "#registrieren" : "");
    }
    function here() { var p = root.location.pathname.split("/").pop() || "index.html"; return p + root.location.search; }

    function wall(o) {
        o = o || {};
        injectCss();
        var back = o.back === undefined ? here() : o.back;
        var el = doc.createElement("div");
        el.className = "sor-gate";
        el.innerHTML = '<div class="g-ico" aria-hidden="true">🔓</div>' +
            "<h3>" + (o.title || t("Weiterlernen mit kostenlosem Konto", "Keep learning with a free account")) + "</h3>" +
            "<p>" + (o.text || t("Deine " + FREE + " Schnupperaufgaben sind geschafft. Mit einem Konto kannst du alle Aufgaben lösen.", "You have finished your " + FREE + " trial tasks. With an account you can solve every task.")) + "</p>" +
            "<ul><li>✓ " + t("Alle Übungen, Kurse und Prüfungen", "All exercises, courses and exams") + "</li><li>✓ " + t("Fortschritt, Sterne und Lernserie bleiben gespeichert", "Progress, stars and streak are saved") + "</li><li>✓ " + t("Kostenlos, nur E-Mail und Passwort", "Free, just email and password") + "</li></ul>" +
            '<div class="g-act"><a class="pri" href="' + kontoHref(back, true) + '">' + t("Kostenloses Konto erstellen", "Create free account") + '</a><a class="sec" href="' + kontoHref(back, false) + '">' + t("Anmelden", "Sign in") + "</a></div>";
        return el;
    }
    function badge(back) {
        if (loggedIn()) return null;
        injectCss();
        var n = left(), el = doc.createElement("div");
        el.className = "sor-gate-badge";
        el.innerHTML = "🎟️ " + (n > 0 ? t("Schnupperrunde: noch " + n + (n === 1 ? " Aufgabe" : " Aufgaben") + " frei", "Trial: " + n + (n === 1 ? " task" : " tasks") + " left") : t("Schnupperrunde vorbei", "Trial finished")) +
            ' · <a href="' + kontoHref(back === undefined ? here() : back, true) + '">' + t("Konto erstellen", "Create account") + "</a>";
        return el;
    }

    root.SOR_GATE = { FREE: FREE, loggedIn: loggedIn, left: left, canSolve: canSolve, use: use, wall: wall, badge: badge };
})(typeof window !== "undefined" ? window : this);
