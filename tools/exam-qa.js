#!/usr/bin/env node
/*
 * Prüfungstrainer-QA: prüft die Prüfungsdefinitionen in app/data/exams.js
 *  - Punkte und Zeiten entsprechen dem dokumentierten Aufbau (Quali 8 + 40, Realschule 12 + 42 in 170 min, Abitur 30 + 70 BE in 300 min)
 *  - jedes Thema hat Aufgaben-Generatoren, jede Aufgabe erzeugt Text und Antwort
 *  - Notenschlüssel sind lückenlos und absteigend, Abitur entspricht der Notenpunkte-Tabelle
 */
"use strict";
const path = require("path"), fs = require("fs");
const root = path.join(__dirname, "..");
const E = require(path.join(root, "app/modules/exercise-engine.js"));
fs.readdirSync(path.join(root, "app/modules/exercises")).filter(f => f.endsWith(".js")).forEach(f => require(path.join(root, "app/modules/exercises", f)));
const X = require(path.join(root, "app/data/exams.js"));
const errors = [], has = E.topics();
const expect = { quali: [[8, 40], 120], mr: [[12, 42], 170], abi: [[30, 70], 300] };
X.exams.forEach(x => {
    const e = expect[x.id];
    if (!e) { errors.push(x.id + ": keine Erwartung definiert"); return; }
    x.parts.forEach((p, i) => { if (p.points !== e[0][i]) errors.push(`${x.id} Teil ${p.id}: ${p.points} statt ${e[0][i]} Punkte`); });
    if (x.totalMinutes !== e[1]) errors.push(`${x.id}: ${x.totalMinutes} statt ${e[1]} Minuten`);
    x.parts.forEach(p => p.blocks.forEach(b => b.topics.forEach(t => {
        if (!has[t]) { errors.push(`${x.id}: Thema ${t} ohne Aufgaben`); return; }
        E.byTopic(t).forEach(g => { for (let s = 1; s <= 20; s++) { const q = E.generate(g.id, { difficulty: b.d, seed: s }); if (!q || !q.q || !q.a) errors.push(`${x.id}: ${g.id} liefert keine Aufgabe`); } });
    })));
    const st = x.key.steps;
    for (let i = 1; i < st.length; i++) if (!(st[i][0] < st[i - 1][0])) errors.push(`${x.id}: Notenschlüssel nicht absteigend`);
    if (st[st.length - 1][0] !== 0) errors.push(`${x.id}: Notenschlüssel endet nicht bei 0`);
    if (X.grade(x, x.points, x.points) !== (x.key.type === "np" ? 15 : 1)) errors.push(`${x.id}: volle Punktzahl gibt nicht die Bestnote`);
    if (X.grade(x, 0, x.points) !== (x.key.type === "np" ? 0 : 6)) errors.push(`${x.id}: null Punkte geben nicht die schlechteste Note`);
});
const abi = X.exam("abi");
[[95, 15], [94.5, 14], [50, 6], [49.5, 5], [45, 5], [40, 4], [33, 3], [32, 2], [20, 1], [19.5, 0]].forEach(([be, np]) => { if (X.grade(abi, be, 100) !== np) errors.push(`Abitur: ${be} BE ergeben ${X.grade(abi, be, 100)} statt ${np} Notenpunkte`); });
console.log(`Prüfungen: ${X.exams.map(x => x.id + " (" + x.points + " P, " + x.totalMinutes + " min)").join(", ")}`);
if (errors.length) { console.log("\nFehler:"); errors.forEach(e => console.log(" - " + e)); console.log("\nResult: FAILED"); process.exit(1); }
console.log("\nResult: OK");
