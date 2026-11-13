/*
 * Prüflauf für alle Übungsaufgaben (app/modules/exercises/*.js)
 *
 * Für jede Aufgabe und jede Schwierigkeit werden N Varianten erzeugt und geprüft:
 *  - unabhängige Gegenprobe des Generators (ok === true)
 *  - Aufgabentext, Tipp und Lösungsweg vorhanden, kein NaN/undefined/Infinity im Text
 *  - die Musterlösung wird von der eigenen Prüfung als richtig erkannt
 *  - eine verfälschte Antwort wird als falsch erkannt
 *  - Auswahlaufgaben: 3 bis 4 verschiedene Optionen
 *  - jedes Thema der Coverage-Matrix hat mindestens eine Aufgabe (Bericht)
 *
 * Aufruf: node tools/exercise-qa.js [N=150]
 */
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const E = require(path.join(root, "app/modules/exercise-engine.js"));
const dir = path.join(root, "app/modules/exercises");
fs.readdirSync(dir).filter(f => f.endsWith(".js")).sort().forEach(f => require(path.join(dir, f)));
const coverage = require(path.join(root, "app/data/coverage-matrix.js"));
const courses = require(path.join(root, "app/data/courses.js"));

const N = parseInt(process.argv[2], 10) || 150;
const errors = [];
let total = 0;
const bad = /NaN|undefined|Infinity|\[object/;

function asInput(a) {
    if (a.type === "choice") return a.v;
    if (a.type === "multi") return a.fields.map(f => asInput(f.a));
    if (a.type === "frac") return a.d === 1 ? String(a.n) : a.n + "/" + a.d;
    return String(E.M.round(a.v, a.dec !== undefined ? a.dec : 10)).replace(".", ",");
}
function wrongInput(a) {
    if (a.type === "choice") return (a.v + 1) % a.options.length;
    if (a.type === "multi") return a.fields.map((f, i) => i === 0 ? wrongInput(f.a) : asInput(f.a));
    const tol = a.tol !== undefined ? a.tol : (a.dec !== undefined ? Math.pow(10, -a.dec) : 0);
    return String(a.v + Math.max(1, Math.abs(a.v) * 0.25, tol * 4)).replace(".", ",");
}

E.ids().forEach(id => {
    for (let d = 1; d <= 3; d += 1) {
        const seen = new Set();
        for (let s = 1; s <= N; s += 1) {
            let q;
            try { q = E.generate(id, { seed: s * 7919 + d, difficulty: d }); }
            catch (e) { errors.push(`${id} d${d} seed${s}: Ausnahme ${e.message}`); break; }
            total += 1;
            const where = `${id} d${d} seed${s}`;
            if (q.ok !== true) { errors.push(`${where}: Gegenprobe fehlgeschlagen`); break; }
            if (!q.q || !q.hint || !Array.isArray(q.steps) || !q.steps.length) { errors.push(`${where}: Text, Tipp oder Lösungsweg fehlt`); break; }
            const text = q.q + q.hint + q.steps.join(" ") + E.show(q.a);
            if (bad.test(text.replace(/<svg[\s\S]*?<\/svg>/g, m => bad.test(m.replace(/undefined/g, "")) ? m : ""))) { errors.push(`${where}: ungültiger Wert im Text: ${text.replace(/<[^>]+>/g, "").slice(0, 160)}`); break; }
            if (/<svg/.test(q.q) && /NaN|undefined/.test(q.q)) { errors.push(`${where}: ungültige Skizze`); break; }
            if (q.a.type === "choice") {
                const uniq = new Set(q.a.options);
                if (uniq.size !== q.a.options.length || q.a.options.length < 3) { errors.push(`${where}: Optionen nicht eindeutig oder zu wenige (${q.a.options.join(" | ")})`); break; }
            }
            if (!E.check(q.a, asInput(q.a)).correct) { errors.push(`${where}: Musterlösung wird nicht akzeptiert (${E.show(q.a)})`); break; }
            if (E.check(q.a, wrongInput(q.a)).correct) { errors.push(`${where}: falsche Antwort wird akzeptiert`); break; }
            seen.add(q.q + "|" + (q.a.type === "choice" ? q.a.options.slice().sort().join("|") : E.show(q.a)));
        }
        if (seen.size < Math.min(4, N) && !errors.some(e => e.startsWith(id + " d" + d))) errors.push(`${id} d${d}: nur ${seen.size} verschiedene Varianten`);
    }
});

const have = E.topics();
const all = coverage.school.concat(coverage.engineering).concat(courses.lessons);
const missing = all.filter(e => !have[e.id]);
console.log(`Aufgabentypen: ${E.ids().length} · geprüfte Varianten: ${total}`);
console.log(`Themen mit Aufgaben: ${all.length - missing.length} von ${all.length}`);
if (missing.length) console.log("Ohne Aufgaben: " + missing.map(e => e.id).join(", "));
const unknown = Object.keys(have).filter(t => !all.some(e => e.id === t));
if (unknown.length) errors.push("Unbekannte Themen-IDs: " + unknown.join(", "));
if (process.argv.includes("--strict") && missing.length) errors.push(`${missing.length} Themen ohne Aufgaben`);
if (errors.length) { console.log("\nFehler:"); errors.forEach(e => console.log(" - " + e)); console.log("\nResult: FAILED"); process.exit(1); }
console.log("\nResult: OK");
