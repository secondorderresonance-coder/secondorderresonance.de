/*
 * SOR Prüfungstrainer: Aufbau der Abschlussprüfungen Mathematik in Bayern
 * ------------------------------------------------------------
 * Jede Prüfung besteht aus Teil A (ohne Hilfsmittel) und Teil B (mit Hilfsmitteln).
 * Ein Teil listet Aufgabenblöcke: { topics: [Themen-IDs der Coverage-Matrix], n: Anzahl, pts: Punkte je Aufgabe, d: Schwierigkeit }.
 * Die Aufgaben selbst erzeugt die Aufgaben-Engine (app/modules/exercise-engine.js) bei jedem Start neu.
 *
 * Quellen für Aufbau und Bewertung (Stand November 2026):
 *   Abitur:  ISB/KM Bayern, Rahmenbedingungen der Abiturprüfung Mathematik ab 2026 (100 BE, Teil A 30 BE,
 *            Teil B 70 BE, Gesamtarbeitszeit 300 min, Abgabe Teil A spätestens nach 110 min, Notenpunkte-Tabelle).
 *   Realschule: ISB Bayern, Abschlussprüfung Mathematik I 2024 (170 min, Aufgabengruppe A nach 35 min, 54 Punkte).
 *   Quali:   Teil A 30 min (8 Punkte, ohne Taschenrechner und Formelsammlung), Teil B 90 min (40 Punkte).
 * Die Notenschlüssel für Realschule und Quali legt das Kultusministerium jedes Jahr neu fest. Hier stehen
 * deshalb Orientierungswerte (Quali: Schlüssel früherer Jahrgänge für 48 Punkte, Realschule: Prozentwerte).
 */
(function (root) {
    "use strict";
    var lang = root.SOR_I18N ? root.SOR_I18N.lang : ((typeof process !== "undefined" && process.env && process.env.SOR_LANG === "en") ? "en" : "de");
    var L = function (v) { return v && typeof v === "object" && !Array.isArray(v) && ("de" in v) ? (lang === "en" ? v.en : v.de) : v; };

    var EXAMS = [
        {
            id: "quali", short: "Quali", grade: 9, color: "#35e0c4",
            title: { de: "Quali Mathematik", en: "Quali maths" },
            school: { de: "Mittelschule Bayern · Jahrgangsstufe 9", en: "Bavarian Mittelschule · grade 9" },
            full: { de: "Qualifizierender Abschluss der Mittelschule", en: "Qualifying lower secondary certificate" },
            intro: { de: "Rechnen ohne Taschenrechner, Prozente, Gleichungen, Flächen und Körper.", en: "Mental and written arithmetic, percentages, equations, areas and solids." },
            parts: [
                { id: "A", minutes: 30, aids: false, blocks: [
                    { topics: ["CM-S-50", "CM-S-05"], n: 2, pts: 1, d: 1 },
                    { topics: ["CM-S-14", "CM-S-08"], n: 2, pts: 1, d: 1 },
                    { topics: ["CM-S-13", "CM-S-19", "CM-S-18"], n: 2, pts: 2, d: 1 }
                ] },
                { id: "B", minutes: 90, aids: true, blocks: [
                    { topics: ["CM-S-19"], n: 2, pts: 4, d: 2 },
                    { topics: ["CM-S-20", "CM-S-18"], n: 2, pts: 4, d: 2 },
                    { topics: ["CM-S-21"], n: 1, pts: 4, d: 2 },
                    { topics: ["CM-S-24", "CM-S-28", "CM-S-16"], n: 3, pts: 4, d: 2 },
                    { topics: ["CM-S-07", "CM-S-17", "CM-S-25"], n: 2, pts: 4, d: 2 }
                ] }
            ],
            // Note: Mindestpunkte (von 48)
            key: { type: "note", basis: 48, steps: [[41, 1], [33, 2], [25, 3], [16, 4], [8, 5], [0, 6]], official: false }
        },
        {
            id: "mr", short: { de: "Mittlere Reife", en: "Mittlere Reife" }, grade: 10, color: "#60a5fa",
            title: { de: "Mittlere Reife Mathematik", en: "Mittlere Reife maths" },
            school: { de: "Realschule Bayern · Jahrgangsstufe 10", en: "Bavarian Realschule · grade 10" },
            full: { de: "Abschlussprüfung an der Realschule (Mathematik I)", en: "Final exam at the Realschule (Mathematics I)" },
            intro: { de: "Funktionen, Trigonometrie, Raumgeometrie, Wachstum und Wahrscheinlichkeit.", en: "Functions, trigonometry, solid geometry, growth and probability." },
            parts: [
                { id: "A", minutes: 35, aids: false, blocks: [
                    { topics: ["CM-S-27", "CM-S-20"], n: 2, pts: 2, d: 1 },
                    { topics: ["CM-S-21", "CM-S-26"], n: 2, pts: 2, d: 1 },
                    { topics: ["CM-S-29", "CM-S-25", "CM-S-19"], n: 2, pts: 2, d: 1 }
                ] },
                { id: "B", minutes: 135, aids: true, blocks: [
                    { topics: ["CM-S-26", "CM-S-22"], n: 3, pts: 3, d: 2 },
                    { topics: ["CM-S-30", "CM-S-28"], n: 3, pts: 3, d: 2 },
                    { topics: ["CM-S-33", "CM-S-24"], n: 3, pts: 3, d: 2 },
                    { topics: ["CM-S-32", "CM-S-31"], n: 3, pts: 3, d: 2 },
                    { topics: ["CM-S-35", "CM-S-25"], n: 2, pts: 3, d: 2 }
                ] }
            ],
            key: { type: "note", basis: 54, pct: true, steps: [[85, 1], [70, 2], [55, 3], [40, 4], [20, 5], [0, 6]], official: false }
        },
        {
            id: "abi", short: "Abitur", grade: 13, color: "#f5c518",
            title: { de: "Abitur Mathematik", en: "Abitur maths" },
            school: { de: "Gymnasium Bayern · ab Abitur 2026", en: "Bavarian Gymnasium · from Abitur 2026" },
            full: { de: "Schriftliche Abiturprüfung Mathematik (erhöhtes Anforderungsniveau)", en: "Written Abitur exam in mathematics (higher level)" },
            intro: { de: "Analysis, Stochastik und Geometrie mit 100 Bewertungseinheiten.", en: "Calculus, probability and geometry with 100 assessment units." },
            totalMinutes: 300,
            parts: [
                { id: "A", minutes: 110, aids: false, blocks: [
                    { topics: ["CM-S-36", "CM-S-37", "CM-S-38", "CM-S-39"], n: 4, pts: 5, d: 2, area: "ana" },
                    { topics: ["CM-S-41", "CM-S-42"], n: 1, pts: 5, d: 2, area: "sto" },
                    { topics: ["CM-S-44"], n: 1, pts: 5, d: 2, area: "geo" }
                ] },
                { id: "B", minutes: 190, aids: true, blocks: [
                    { topics: ["CM-S-36", "CM-S-37", "CM-S-38", "CM-S-39"], n: 6, pts: 5, d: 3, area: "ana" },
                    { topics: ["CM-S-42", "CM-S-43", "CM-S-41", "CM-S-35"], n: 4, pts: 5, d: 3, area: "sto" },
                    { topics: ["CM-S-44"], n: 4, pts: 5, d: 3, area: "geo" }
                ] }
            ],
            // Notenpunkte: Mindest-BE von 100
            key: { type: "np", basis: 100, steps: [[95, 15], [90, 14], [85, 13], [80, 12], [75, 11], [70, 10], [65, 9], [60, 8], [55, 7], [50, 6], [45, 5], [40, 4], [33, 3], [27, 2], [20, 1], [0, 0]], official: true }
        }
    ];

    EXAMS.forEach(function (x) {
        ["title", "school", "full", "intro", "short"].forEach(function (k) { x[k] = L(x[k]); });
        x.points = 0; x.minutes = 0;
        x.parts.forEach(function (p) { p.points = p.blocks.reduce(function (s, b) { return s + b.n * b.pts; }, 0); x.points += p.points; x.minutes += p.minutes; });
        if (!x.totalMinutes) x.totalMinutes = x.minutes;
    });

    // Note aus erreichten Punkten (bezogen auf die Gesamtpunkte der gespielten Variante)
    function grade(x, got, max) {
        var k = x.key, share = max ? got / max : 0, v = k.pct ? share * 100 : share * k.basis;
        for (var i = 0; i < k.steps.length; i += 1) if (v + 1e-9 >= k.steps[i][0]) return k.steps[i][1];
        return k.steps[k.steps.length - 1][1];
    }
    function gradeLabel(x, g) {
        if (x.key.type === "np") {
            var n = ["6", "5−", "5", "5+", "4−", "4", "4+", "3−", "3", "3+", "2−", "2", "2+", "1−", "1", "1+"][g];
            return g + (lang === "en" ? " points (grade " : " Punkte (Note ") + n + ")";
        }
        return (lang === "en" ? "Grade " : "Note ") + g;
    }
    function passed(x, g) { return x.key.type === "np" ? g >= 5 : g <= 4; }

    var api = { exams: EXAMS, exam: function (id) { return EXAMS.filter(function (x) { return x.id === id; })[0] || null; }, grade: grade, gradeLabel: gradeLabel, passed: passed };
    root.SOR_EXAMS = api;
    if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
