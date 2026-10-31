/*
 * Coverage-QA für app/data/coverage-matrix.js
 *
 * Prüft:
 *  - jedes Thema hat mindestens eine Archiv-Sektion
 *  - jede referenzierte Sektion existiert in der Taxonomie
 *  - Schulthemen liegen auf L1 bis L3, Studienthemen auf L4 bis L5
 *    (Ausnahmen müssen über "gap" begründet sein)
 *  - Klasse 1 bis 12 sind lückenlos durch Themen abgedeckt
 *
 * Berechnet pro Thema den Status:
 *  abgedeckt       alle Sektionen existieren und haben Aufgaben, kein gap
 *  teilweise       gap gesetzt oder nur ein Teil der Sektionen hat Aufgaben
 *  ohne Aufgaben   Sektionen existieren, aber noch keine Aufgabe ist zugeordnet
 *
 * Aufruf:
 *  node tools/coverage-qa.js            Bericht
 *  node tools/coverage-qa.js --write    Bericht + docs/coverage-matrix.md neu schreiben
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const ctx = { window: {} };
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, "app/data/archive-content.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(root, "app/data/coverage-matrix.js"), "utf8"), ctx);

const archive = ctx.window.SOR_ARCHIVE;
const coverage = ctx.window.SOR_COVERAGE;
const errors = [];

if (!archive || !coverage) {
    console.error("SOR_ARCHIVE oder SOR_COVERAGE fehlt.");
    process.exit(1);
}

const sections = new Map();
archive.taxonomy.forEach(level => {
    (level.sublevels || []).forEach(s => sections.set(s.id, { title: s.title, level: Number(level.level) }));
});

const taskCount = new Map();
archive.tasks.forEach(t => taskCount.set(t.sublevel, (taskCount.get(t.sublevel) || 0) + 1));

function evaluate(entry, allowedLevels) {
    const ids = entry.sections || [];
    if (!ids.length) errors.push(`${entry.id}: keine Archiv-Sektion zugeordnet.`);
    const seen = new Set();
    ids.forEach(id => {
        if (seen.has(id)) errors.push(`${entry.id}: Sektion ${id} doppelt.`);
        seen.add(id);
        const sec = sections.get(id);
        if (!sec) { errors.push(`${entry.id}: Sektion ${id} existiert nicht in der Taxonomie.`); return; }
        if (allowedLevels.indexOf(sec.level) === -1 && !entry.gap) {
            errors.push(`${entry.id}: Sektion ${id} liegt auf L${sec.level}, erlaubt sind L${allowedLevels.join("/L")} (ohne gap-Begründung).`);
        }
    });
    const withTasks = ids.filter(id => (taskCount.get(id) || 0) > 0);
    const tasks = ids.reduce((sum, id) => sum + (taskCount.get(id) || 0), 0);
    let status = "abgedeckt";
    if (entry.gap) status = "teilweise";
    else if (withTasks.length === 0) status = "ohne Aufgaben";
    else if (withTasks.length < ids.length) status = "teilweise";
    return { ...entry, status, tasks, sectionTitles: ids.map(id => `${id} ${sections.get(id) ? sections.get(id).title : "?"}`) };
}

const ids = new Set();
[...coverage.school, ...coverage.engineering].forEach(e => {
    if (ids.has(e.id)) errors.push(`Doppelte ID ${e.id}.`);
    ids.add(e.id);
    if (!e.topic) errors.push(`${e.id}: topic fehlt.`);
});

const school = coverage.school.map(e => evaluate(e, [1, 2, 3]));
const engineering = coverage.engineering.map(e => evaluate(e, [4, 5]));

for (let grade = 1; grade <= 12; grade += 1) {
    const hit = coverage.school.some(e => e.grades && e.grades[0] <= grade && grade <= e.grades[1]);
    if (!hit) errors.push(`Klasse ${grade} hat kein Thema in der Matrix.`);
}

function summary(list) {
    const s = { abgedeckt: 0, teilweise: 0, "ohne Aufgaben": 0 };
    list.forEach(e => { s[e.status] += 1; });
    return s;
}

const sSum = summary(school);
const eSum = summary(engineering);

console.log(`Schule (Klasse 1–12 -> L1–L3): ${school.length} Themen | abgedeckt ${sSum.abgedeckt} | teilweise ${sSum.teilweise} | ohne Aufgaben ${sSum["ohne Aufgaben"]}`);
console.log(`Studium (Bachelor–Master -> L4–L5): ${engineering.length} Themen | abgedeckt ${eSum.abgedeckt} | teilweise ${eSum.teilweise} | ohne Aufgaben ${eSum["ohne Aufgaben"]}`);

function table(list, withGrades) {
    const head = "| ID | Phase | Bereich | Thema | Archiv-Sektionen | Aufgaben | Status | Hinweis |\n|---|---|---|---|---|---:|---|---|";
    const rows = list.map(e => `| ${e.id} | ${e.band}${e.optional ? " (optional)" : ""} | ${e.area} | ${e.topic} | ${e.sectionTitles.join("<br>")} | ${e.tasks} | ${e.status} | ${e.gap || ""} |`);
    return [head, ...rows].join("\n");
}

if (process.argv.includes("--write")) {
    const md = `# Coverage-Matrix

Automatisch erzeugt mit \`node tools/coverage-qa.js --write\`. Quelle: \`app/data/coverage-matrix.js\`.

Orientierung (kein amtlicher Abgleich eines einzelnen Bundeslands):
${coverage.sources.map(s => `- ${s}`).join("\n")}

Statuslogik:
- **abgedeckt**: alle zugeordneten Sektionen existieren und enthalten Aufgaben
- **teilweise**: inhaltliche Lücke dokumentiert oder nur ein Teil der Sektionen hat Aufgaben
- **ohne Aufgaben**: Sektionen existieren in der Taxonomie, haben aber noch keine direkt zugeordnete Aufgabe

## Schule: Klasse 1–12 → L1–L3

Abgedeckt ${sSum.abgedeckt} · teilweise ${sSum.teilweise} · ohne Aufgaben ${sSum["ohne Aufgaben"]} (von ${school.length})

${table(school, true)}

## Ingenieurmathematik: Bachelor bis Master → L4–L5

Abgedeckt ${eSum.abgedeckt} · teilweise ${eSum.teilweise} · ohne Aufgaben ${eSum["ohne Aufgaben"]} (von ${engineering.length})

${table(engineering, false)}
`;
    fs.writeFileSync(path.join(root, "docs/coverage-matrix.md"), md);
    console.log("docs/coverage-matrix.md geschrieben.");
}

if (errors.length) {
    console.log("\nFehler:");
    errors.forEach(e => console.log(" - " + e));
    console.log("\nResult: FAILED");
    process.exit(1);
}
console.log("\nResult: OK");
