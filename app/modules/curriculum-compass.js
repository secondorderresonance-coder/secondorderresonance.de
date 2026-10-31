/*
 * SOR Lehrplan-Kompass
 * ------------------------------------------------------------
 * Zeigt für eine gewählte Klassenstufe (1 bis 12) oder Studienphase,
 * welche Themen anstehen und in welche Archiv-Sektionen sie führen.
 * Datenquelle: window.SOR_COVERAGE (app/data/coverage-matrix.js).
 * Das Archiv (app/data/archive-content.js) wird erst nachgeladen,
 * wenn der Kompass sichtbar wird, um Sektionstitel und Aufgabenzahlen
 * anzuzeigen. Ohne Archiv funktioniert der Kompass trotzdem.
 */
(function () {
    "use strict";

    var root = document.querySelector("[data-compass]");
    var data = window.SOR_COVERAGE;
    if (!root || !data) return;

    var LEVELS = {
        1: { code: "L1", name: "Grundlagen", color: "#4ade80" },
        2: { code: "L2", name: "Aufbauwissen", color: "#facc15" },
        3: { code: "L3", name: "Vertiefung", color: "#f59e0b" },
        4: { code: "L4", name: "Universitätsgrundlagen", color: "#60a5fa" },
        5: { code: "L5", name: "Angewandte Mathematik", color: "#8b5cf6" },
        6: { code: "L6", name: "Forschung & Simulation", color: "#94a3b8" }
    };
    var STAGES = [];
    for (var g = 1; g <= 12; g += 1) STAGES.push({ key: "k" + g, label: String(g), title: "Klasse " + g, grade: g });
    var phases = [];
    data.engineering.forEach(function (e) { if (phases.indexOf(e.band) === -1) phases.push(e.band); });
    phases.forEach(function (p, i) {
        STAGES.push({ key: "e" + i, label: ["B 1–2", "B 3–4", "B Vert.", "Master"][i] || "S" + (i + 1), title: p, band: p });
    });

    var archive = null;
    var sectionInfo = {};
    var esc = function (s) {
        return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
    };

    var rail = root.querySelector("[data-compass-rail]");
    var out = root.querySelector("[data-compass-out]");
    var head = root.querySelector("[data-compass-head]");
    var range = root.querySelector("[data-compass-range]");
    var current = 9;

    function levelOf(id) { return Number(String(id).split(".")[0]); }

    function topicsFor(stage) {
        if (stage.grade) {
            return data.school.filter(function (e) { return e.grades[0] <= stage.grade && stage.grade <= e.grades[1]; });
        }
        return data.engineering.filter(function (e) { return e.band === stage.band; });
    }

    function statusOf(entry) {
        if (!archive) return entry.gap ? "teilweise" : null;
        var withTasks = entry.sections.filter(function (id) { return (sectionInfo[id] && sectionInfo[id].tasks) > 0; });
        if (entry.gap) return "teilweise";
        if (!withTasks.length) return "in Arbeit";
        return withTasks.length < entry.sections.length ? "teilweise" : "abgedeckt";
    }

    var STATUS_STYLE = {
        "abgedeckt": "color:#35e0c4;border-color:rgba(53,224,196,0.35);background:rgba(53,224,196,0.08);",
        "teilweise": "color:#f5c518;border-color:rgba(245,197,24,0.35);background:rgba(245,197,24,0.08);",
        "in Arbeit": "color:#98a2bd;border-color:rgba(152,162,189,0.3);background:rgba(152,162,189,0.06);"
    };

    function render() {
        var stage = STAGES[current];
        var list = topicsFor(stage);
        var lvls = {};
        list.forEach(function (e) { e.sections.forEach(function (id) { lvls[levelOf(id)] = true; }); });
        var lvlKeys = Object.keys(lvls).map(Number).sort();

        buttons.forEach(function (btn, i) {
            var on = i === current;
            btn.setAttribute("aria-pressed", on ? "true" : "false");
            btn.classList.toggle("is-active", on);
        });
        if (range) range.value = current;

        head.innerHTML =
            '<div class="cp-kicker">' + (stage.grade ? "Schule" : "Studium · Ingenieurmathematik") + "</div>" +
            '<h3 class="cp-title">' + esc(stage.title) + '</h3>' +
            '<div class="cp-levels">' + lvlKeys.map(function (k) {
                var L = LEVELS[k];
                return '<span class="cp-level" style="--lv:' + L.color + '"><b>' + L.code + "</b> " + esc(L.name) + "</span>";
            }).join("") + "</div>" +
            '<p class="cp-count">' + list.length + " Themen" + (archive ? "" : " · Archivdaten werden geladen …") + "</p>";

        out.innerHTML = list.map(function (e) {
            var st = statusOf(e);
            var first = e.sections[0], lv = levelOf(first);
            var href = "app/lernarchiv.html?level=" + lv + "&sublevel=" + encodeURIComponent(first);
            var chips = e.sections.map(function (id) {
                var info = sectionInfo[id];
                return '<span class="cp-chip" title="' + esc(info ? info.title : id) + '">' + esc(id) + (info ? " · " + esc(info.title) : "") + "</span>";
            }).join("");
            var tasks = archive ? e.sections.reduce(function (s, id) { return s + ((sectionInfo[id] && sectionInfo[id].tasks) || 0); }, 0) : null;
            return '<a class="cp-card" href="' + href + '">' +
                '<div class="cp-card-top"><span class="cp-area">' + esc(e.area) + (e.optional ? " · optional" : "") + "</span>" +
                (st ? '<span class="cp-status" style="' + STATUS_STYLE[st] + '">' + st + "</span>" : "") + "</div>" +
                '<strong class="cp-topic">' + esc(e.topic) + "</strong>" +
                '<div class="cp-chips">' + chips + "</div>" +
                (e.gap ? '<p class="cp-gap">' + esc(e.gap) + "</p>" : "") +
                '<div class="cp-foot"><span>' + (tasks === null ? "" : tasks.toLocaleString("de-DE") + " Aufgaben") + '</span><span class="cp-go">Im Archiv öffnen →</span></div>' +
                "</a>";
        }).join("");
    }

    function select(i) {
        current = Math.max(0, Math.min(STAGES.length - 1, i));
        render();
    }

    var buttons = [];
    rail.innerHTML = "";
    STAGES.forEach(function (s, i) {
        if (i === 12) {
            var sp = document.createElement("span");
            sp.className = "cp-sep";
            sp.setAttribute("aria-hidden", "true");
            rail.appendChild(sp);
        }
        var b = document.createElement("button");
        b.type = "button";
        b.className = "cp-stop" + (s.grade ? "" : " cp-stop-uni");
        b.setAttribute("aria-label", s.title);
        b.textContent = s.label;
        b.addEventListener("click", function () { select(i); });
        rail.appendChild(b);
        buttons.push(b);
    });
    if (range) {
        range.max = STAGES.length - 1;
        range.addEventListener("input", function () { select(Number(range.value)); });
    }
    root.addEventListener("keydown", function (e) {
        if (e.target && e.target.classList && e.target.classList.contains("cp-stop")) {
            if (e.key === "ArrowRight") { e.preventDefault(); select(current + 1); buttons[current].focus(); }
            if (e.key === "ArrowLeft") { e.preventDefault(); select(current - 1); buttons[current].focus(); }
        }
    });

    function loadArchive() {
        if (archive || loadArchive.started) return;
        loadArchive.started = true;
        var s = document.createElement("script");
        s.src = root.getAttribute("data-archive-src") || "app/data/archive-content.js";
        s.async = true;
        s.onload = function () {
            var a = window.SOR_ARCHIVE;
            if (!a) return;
            var counts = {};
            a.tasks.forEach(function (t) { counts[t.sublevel] = (counts[t.sublevel] || 0) + 1; });
            a.taxonomy.forEach(function (lv) {
                (lv.sublevels || []).forEach(function (sub) { sectionInfo[sub.id] = { title: sub.title, tasks: counts[sub.id] || 0 }; });
            });
            archive = a;
            render();
        };
        document.head.appendChild(s);
    }

    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
            if (entries.some(function (en) { return en.isIntersecting; })) { loadArchive(); io.disconnect(); }
        }, { rootMargin: "300px 0px" });
        io.observe(root);
    } else {
        loadArchive();
    }

    select(current);
})();
