/*
 * SOR App-Modus: registriert den Service Worker (sw.js im Wurzelverzeichnis) und
 * stellt die Installation als App bereit.
 *   SOR_PWA.canInstall()   true, wenn der Browser einen Installationsdialog anbietet (Android, Chrome, Edge)
 *   SOR_PWA.install()      öffnet diesen Dialog
 *   SOR_PWA.isApp()        true, wenn die Seite als installierte App läuft
 *   SOR_PWA.isIOS()        true auf iPhone und iPad (dort: Teilen → Zum Home-Bildschirm)
 *   SOR_PWA.mount(el)      zeigt in el eine Installationskarte mit passender Anleitung
 * Ereignis "sor-pwa" auf window, sobald sich der Installationsstatus ändert.
 */
(function (root) {
    "use strict";
    var t = function (de, en) { return root.$t ? root.$t(de, en) : de; };
    var me = document.currentScript && document.currentScript.src;
    var base = me ? me.replace(/app\/modules\/pwa\.js.*$/, "") : "/";
    var deferred = null;

    if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
        window.addEventListener("load", function () {
            navigator.serviceWorker.register(base + "sw.js", { scope: base }).catch(function () { /* App-Modus optional */ });
        });
    }
    window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); deferred = e; fire(); });
    window.addEventListener("appinstalled", function () { deferred = null; fire(); });
    function fire() { try { window.dispatchEvent(new Event("sor-pwa")); } catch (e) { /* alt */ } }

    function isApp() { return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || window.navigator.standalone === true; }
    function isIOS() { return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1); }
    function install() {
        if (!deferred) return Promise.resolve(false);
        var d = deferred; deferred = null;
        d.prompt();
        return d.userChoice.then(function (c) { fire(); return c && c.outcome === "accepted"; });
    }
    function mount(el) {
        if (!el) return;
        var draw = function () {
            var body;
            if (isApp()) body = "<p>" + t("Du nutzt Second-Order Resonance bereits als App. Seiten, die du einmal geöffnet hast, funktionieren auch offline.", "You are already using Second-Order Resonance as an app. Pages you have opened once also work offline.") + "</p>";
            else if (deferred) body = "<p>" + t("Installiere die Lernplattform auf deinem Startbildschirm. Sie startet dann wie eine App, im Vollbild und auch offline.", "Install the learning platform on your home screen. It then starts like an app, full screen and offline too.") + '</p><button class="btn btn-primary btn-sm" type="button" data-pwa-install>' + t("📱 App installieren", "📱 Install app") + "</button>";
            else if (isIOS()) body = "<p>" + t("Auf iPhone und iPad: Tippe in Safari auf <strong>Teilen</strong> und dann auf <strong>Zum Home-Bildschirm</strong>.", "On iPhone and iPad: tap <strong>Share</strong> in Safari and then <strong>Add to Home Screen</strong>.") + "</p>";
            else body = "<p>" + t("Auf Android in Chrome: Menü <strong>⋮</strong> und dann <strong>App installieren</strong> oder <strong>Zum Startbildschirm hinzufügen</strong>. Am Computer findest du das Symbol rechts in der Adressleiste.", "On Android in Chrome: menu <strong>⋮</strong> and then <strong>Install app</strong> or <strong>Add to Home screen</strong>. On a computer you will find the icon on the right of the address bar.") + "</p>";
            el.innerHTML = body;
            var b = el.querySelector("[data-pwa-install]");
            if (b) b.addEventListener("click", function () { install(); });
        };
        draw(); window.addEventListener("sor-pwa", draw);
    }

    root.SOR_PWA = { canInstall: function () { return !!deferred; }, install: install, isApp: isApp, isIOS: isIOS, mount: mount, base: base };
})(window);
