/*
 * SOR Sprache (Deutsch / Englisch)
 * ------------------------------------------------------------
 * Im <head> jeder Seite einbinden, vor allen anderen Skripten.
 *
 *   SOR_I18N.lang              "de" oder "en"
 *   $t("Deutsch", "English")   liefert den Text der aktuellen Sprache
 *   SOR_I18N.set("en")         speichert die Wahl und lädt die Seite neu
 *   SOR_I18N.apply(root?)      übersetzt statisches HTML:
 *                              data-en="..."            -> innerHTML
 *                              data-en-placeholder, data-en-title, data-en-aria-label,
 *                              data-en-alt, data-en-content, data-en-href -> Attribut
 *   SOR_I18N.switcher()        HTML für den Umschalter DE | EN
 *   SOR_I18N.num(x, d)         Zahl im Format der Sprache (2,5 / 2.5)
 *
 * Reihenfolge der Sprachwahl: ?lang=de|en in der Adresse, dann gespeicherte Wahl,
 * dann Browsersprache (Deutsch -> de, sonst en).
 */
(function (root) {
    "use strict";
    var KEY = "sor-lang", lang = "de";
    try {
        var q = root.location && /[?&]lang=(de|en)\b/.exec(root.location.search);
        var stored = root.localStorage && root.localStorage.getItem(KEY);
        if (q) { lang = q[1]; try { root.localStorage.setItem(KEY, lang); } catch (e) { /* privat */ } }
        else if (stored === "de" || stored === "en") lang = stored;
        else if (root.navigator && !/^de\b/i.test(root.navigator.language || "de")) lang = "en";
    } catch (e) { /* Speicher gesperrt: Deutsch */ }
    if (root.document) { root.document.documentElement.lang = lang; root.document.documentElement.setAttribute("data-lang", lang); }

    function t(de, en) { return lang === "en" && en !== undefined && en !== null ? en : de; }
    var ATTRS = ["placeholder", "title", "aria-label", "alt", "content", "href", "value"];

    function apply(scope) {
        if (lang !== "en" || !root.document) return;
        var base = scope || root.document;
        Array.prototype.forEach.call(base.querySelectorAll("[data-en]"), function (el) {
            if (el.getAttribute("data-i18n-done")) return;
            el.innerHTML = el.getAttribute("data-en");
            el.setAttribute("data-i18n-done", "1");
        });
        ATTRS.forEach(function (a) {
            Array.prototype.forEach.call(base.querySelectorAll("[data-en-" + a + "]"), function (el) { el.setAttribute(a, el.getAttribute("data-en-" + a)); });
        });
    }

    function set(l) {
        if (l !== "de" && l !== "en") return;
        try { root.localStorage.setItem(KEY, l); } catch (e) { /* ignorieren */ }
        var url = new URL(root.location.href);
        url.searchParams.delete("lang");
        root.location.replace(url.toString());
    }

    function switcher(cls) {
        return '<span class="lang-switch ' + (cls || "") + '" role="group" aria-label="' + t("Sprache", "Language") + '">' +
            ["de", "en"].map(function (l) {
                return '<button type="button" data-set-lang="' + l + '" aria-pressed="' + (l === lang) + '" lang="' + l + '">' + l.toUpperCase() + "</button>";
            }).join("") + "</span>";
    }

    if (root.document) {
        root.document.addEventListener("click", function (ev) {
            var b = ev.target && ev.target.closest && ev.target.closest("[data-set-lang]");
            if (b) { ev.preventDefault(); if (b.getAttribute("data-set-lang") !== lang) set(b.getAttribute("data-set-lang")); }
        });
        var css = root.document.createElement("style");
        css.textContent = ".lang-switch{display:inline-flex;border:1px solid rgba(255,255,255,0.16);border-radius:999px;padding:2px;gap:2px;flex:0 0 auto}" +
            ".lang-switch button{font:600 0.74rem 'IBM Plex Mono',ui-monospace,monospace;letter-spacing:0.06em;color:#98a2bd;background:transparent;border:0;border-radius:999px;padding:0.32rem 0.55rem;cursor:pointer}" +
            ".lang-switch button[aria-pressed=\"true\"]{background:#f5c518;color:#0a0e1c}" +
            ".lang-switch button:focus-visible{outline:2px solid #f5c518;outline-offset:2px}";
        root.document.head.appendChild(css);
    }

    function num(x, d) {
        var s = d === undefined ? String(x) : Number(x).toFixed(d);
        return lang === "en" ? s : s.replace(".", ",");
    }

    root.SOR_I18N = { lang: lang, t: t, apply: apply, set: set, switcher: switcher, num: num, KEY: KEY };
    root.$t = t;
})(typeof window !== "undefined" ? window : globalThis);
