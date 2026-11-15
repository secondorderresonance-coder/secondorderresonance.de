/*
 * Map-QA für app/data/mathmap.js (Landkarte der Mathematik)
 * Prüft: eindeutige IDs, Koordinaten im Raster, beide Sprachen, gültige Verweise
 * (Themen mit Aufgaben, Kurse, Mathe-Wunder), vorhandene Vorgänger, keine Kreise,
 * Mindestabstand der Orte. Aufruf: node tools/map-qa.js
 */
const path = require("path"), fs = require("fs");
const root = path.join(__dirname, "..");
const MM = require(path.join(root, "app/data/mathmap.js"));
const E = require(path.join(root, "app/modules/exercise-engine.js"));
fs.readdirSync(path.join(root, "app/modules/exercises")).filter(f => f.endsWith(".js")).sort().forEach(f => require(path.join(root, "app/modules/exercises", f)));
const C = require(path.join(root, "app/data/courses.js"));
require(path.join(root, "app/data/courses-hm.js")); require(path.join(root, "app/data/courses-ph.js")); require(path.join(root, "app/data/courses-2.js"));
const wonders = (fs.readFileSync(path.join(root, "app/modules/wonders.js"), "utf8").match(/^\s+id: "([a-z]+)", icon:/gm) || []).map(s => /"([a-z]+)"/.exec(s)[1]);
const topics = {}; E.ids().forEach(id => { topics[E.get ? E.get(id).topic : E.generate(id, { seed: 1, difficulty: 1 }).topic] = true; });
const errors = [], ids = {};
MM.nodes.forEach(n => {
    if (ids[n.id]) errors.push("doppelte ID " + n.id); ids[n.id] = n;
    if (!(n.x >= 40 && n.x <= MM.W - 40 && n.y >= 40 && n.y <= MM.H - 30)) errors.push(n.id + ": Koordinaten außerhalb");
    if (!(n.lv >= 1 && n.lv <= 6)) errors.push(n.id + ": Level");
    ["t", "d"].forEach(k => { if (!n[k].de || !n[k].en) errors.push(n.id + ": Text " + k + " fehlt"); });
    const kind = n.link.slice(0, 1), v = n.link.slice(2);
    if (kind === "u" && !topics[v]) errors.push(n.id + ": Thema ohne Aufgaben " + v);
    else if (kind === "k" && !C.course(v)) errors.push(n.id + ": Kurs fehlt " + v);
    else if (kind === "w" && wonders.indexOf(v) < 0) errors.push(n.id + ": Wunder fehlt " + v);
    else if ("ukw".indexOf(kind) < 0) errors.push(n.id + ": Verweis " + n.link);
    if (n.extra && wonders.indexOf(n.extra.slice(2)) < 0) errors.push(n.id + ": Zusatz-Wunder fehlt " + n.extra);
});
MM.nodes.forEach(n => n.pre.forEach(p => { if (!ids[p]) errors.push(n.id + ": Vorgänger fehlt " + p); else if (ids[p].lv > n.lv) errors.push(n.id + ": Vorgänger " + p + " hat höheres Level"); }));
const state = {}; (function visitAll() { const visit = (id, trail) => { if (state[id] === 2) return; if (state[id] === 1) { errors.push("Kreis: " + trail.concat(id).join(" > ")); return; } state[id] = 1; (ids[id] ? ids[id].pre : []).forEach(p => visit(p, trail.concat(id))); state[id] = 2; }; MM.nodes.forEach(n => visit(n.id, [])); })();
MM.nodes.forEach((a, i) => MM.nodes.slice(i + 1).forEach(b => { if (Math.hypot(a.x - b.x, a.y - b.y) < 90) errors.push("zu nah: " + a.id + " und " + b.id); }));
console.log("map-qa: " + MM.nodes.length + " Orte, " + MM.nodes.reduce((s, n) => s + n.pre.length, 0) + " Wege, " + wonders.length + " Wunder");
errors.forEach(e => console.log(" - " + e));
console.log("Result: " + (errors.length ? "FEHLER" : "OK"));
process.exit(errors.length ? 1 : 0);
