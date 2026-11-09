/*
 * SOR Navigation: gemeinsame Kopfzeile der Lernplattform-Seiten.
 * Einbinden nach sor-core.js und rewards.js, mit <div id="sorHeader" data-page="ueben"></div>.
 * SOR_NAV.refresh() aktualisiert XP, Serie und Konto, SOR_NAV.toast(html) zeigt eine Meldung.
 */
(function () {
    "use strict";
    var host = document.getElementById("sorHeader");
    if (!host || !window.SOR) return;
    var page = host.getAttribute("data-page") || "", base = host.getAttribute("data-base") || "";
    var LINKS = [["ueben", "ueben.html", "Üben"], ["klasse", "klasse.html", "Klassen"], ["labor3d", "labor3d.html", "3D-Labor"], ["archiv", "lernarchiv.html", "Archiv"], ["lehrer", "lehrer.html", "Für Lehrkräfte"]];
    var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

    function render() {
        var acc = SOR.accounts.current(), p = window.SOR_REWARDS ? SOR_REWARDS.profile() : null, lv = p ? SOR_REWARDS.level(p.xp) : null;
        var links = LINKS.map(function (l) { return '<a href="' + base + l[1] + '"' + (l[0] === page ? ' aria-current="page"' : "") + ">" + l[2] + "</a>"; }).join("");
        host.innerHTML = '<header class="sor-header"><div class="sor-bar">' +
            '<a class="sor-brand" href="' + base + '../index.html"><i><svg width="18" height="18" viewBox="0 0 40 40" fill="none"><path d="M2 20 C8 20 8 7 14 7 C20 7 20 33 26 33 C32 33 32 20 38 20" stroke="#f5c518" stroke-width="2.6" stroke-linecap="round"/></svg></i><span>Second-Order <b>Resonance</b></span></a>' +
            '<nav class="sor-links" aria-label="Hauptnavigation">' + links + "</nav>" +
            '<div class="sor-status">' +
                (p ? '<span class="sor-pill fire" title="Lernserie in Tagen">🔥 ' + p.streak.count + '</span><a class="sor-pill xp lvl" href="' + base + 'konto.html" title="' + p.xp + ' XP">Stufe ' + lv.level + " · " + p.xp + " XP</a>" : "") +
                (acc ? '<a class="sor-avatar" style="background:' + esc(acc.avatarColor) + '" href="' + base + 'konto.html" title="' + esc(acc.displayName) + '">' + esc(acc.displayName.slice(0, 1).toUpperCase()) + "</a>" : '<a class="btn btn-ghost btn-sm" href="' + base + 'konto.html">Anmelden</a>') +
                '<button class="sor-menu" type="button" aria-label="Menü" aria-expanded="false"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>' +
            "</div></div>" +
            '<nav class="sor-drawer" aria-label="Mobile Navigation">' + links + '<a href="' + base + 'konto.html">Konto und Abzeichen</a></nav></header>';
        var btn = host.querySelector(".sor-menu"), drawer = host.querySelector(".sor-drawer");
        btn.addEventListener("click", function () { var open = drawer.classList.toggle("open"); btn.setAttribute("aria-expanded", open ? "true" : "false"); });
    }

    var toastEl = null, toastTimer = null;
    function toast(html, ms) {
        if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
        toastEl.innerHTML = html; toastEl.classList.add("show");
        clearTimeout(toastTimer); toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, ms || 3200);
    }
    function starsHtml(n) { return '<span class="stars" aria-label="' + n + ' von 3 Sternen">' + "★".repeat(n) + '<span class="off">' + "★".repeat(3 - n) + "</span></span>"; }

    window.SOR_NAV = { refresh: render, toast: toast, stars: starsHtml, esc: esc };
    render();
})();
