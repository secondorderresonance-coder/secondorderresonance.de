const fs = require("fs");
const path = require("path");
const vm = require("vm");

const archivePath = path.join(__dirname, "..", "app", "data", "archive-content.js");
const source = fs.readFileSync(archivePath, "utf8");
const context = { window: {} };

vm.createContext(context);
vm.runInContext(source, context);

const data = context.window.SOR_ARCHIVE;
const errors = [];
const warnings = [];

function assert(condition, message) {
    if (!condition) errors.push(message);
}

function warn(condition, message) {
    if (!condition) warnings.push(message);
}

assert(data && typeof data === "object", "SOR_ARCHIVE fehlt oder ist kein Objekt.");

if (!data || typeof data !== "object") {
    printReport();
    process.exit(1);
}

assert(Array.isArray(data.taxonomy), "taxonomy muss ein Array sein.");
assert(Array.isArray(data.tasks), "tasks muss ein Array sein.");
assert(Array.isArray(data.placementQuestions), "placementQuestions muss ein Array sein.");
assert(typeof data.targetPerLevel === "number", "targetPerLevel muss eine Zahl sein.");
assert(typeof data.targetTotal === "number", "targetTotal muss eine Zahl sein.");

const taxonomyByLevel = new Map();
const sublevelsByLevel = new Map();

for (const levelEntry of data.taxonomy || []) {
    assert(levelEntry && typeof levelEntry === "object", "Jeder Taxonomie-Eintrag muss ein Objekt sein.");
    if (!levelEntry || typeof levelEntry !== "object") continue;

    const { level, code, title, sublevels } = levelEntry;
    assert(typeof level === "string", "Taxonomie-Level muss als String vorliegen.");
    assert(typeof code === "string" && code.startsWith("L"), `Taxonomie-Code ungueltig fuer Level ${level}.`);
    assert(typeof title === "string" && title.trim(), `Taxonomie-Titel fehlt fuer Level ${level}.`);
    assert(Array.isArray(sublevels) && sublevels.length > 0, `Sublevels fehlen fuer Level ${level}.`);

    taxonomyByLevel.set(level, levelEntry);
    sublevelsByLevel.set(
        level,
        new Set((sublevels || []).map((sublevel) => sublevel.id))
    );
}

const requiredTaskFields = [
    "id",
    "title",
    "level",
    "sublevel",
    "topic",
    "tags",
    "difficulty",
    "question",
    "answer",
    "explanation",
    "type",
    "estimatedTime"
];

const allowedDifficulty = new Set(["leicht", "mittel", "schwer"]);
const allowedTypes = new Set(["kurzantwort", "konzeptfrage"]);
const seenTaskIds = new Set();
const perLevelCounts = new Map();

for (const task of data.tasks || []) {
    for (const field of requiredTaskFields) {
        assert(task[field] !== undefined, `Pflichtfeld ${field} fehlt bei Task ${task.id || "<ohne-id>"}.`);
    }

    if (!task.id) continue;

    assert(!seenTaskIds.has(task.id), `Doppelte Task-ID gefunden: ${task.id}`);
    seenTaskIds.add(task.id);

    assert(taxonomyByLevel.has(task.level), `Task ${task.id} referenziert unbekanntes Level ${task.level}.`);
    assert(
        sublevelsByLevel.has(task.level) && sublevelsByLevel.get(task.level).has(task.sublevel),
        `Task ${task.id} referenziert unbekanntes Sublevel ${task.sublevel}.`
    );
    assert(Array.isArray(task.tags) && task.tags.length > 0, `Task ${task.id} braucht mindestens einen Tag.`);
    assert(allowedDifficulty.has(task.difficulty), `Task ${task.id} hat ungueltige Schwierigkeit ${task.difficulty}.`);
    assert(allowedTypes.has(task.type), `Task ${task.id} hat ungueltigen Typ ${task.type}.`);
    assert(
        typeof task.estimatedTime === "number" && task.estimatedTime > 0,
        `Task ${task.id} braucht estimatedTime > 0.`
    );

    perLevelCounts.set(task.level, (perLevelCounts.get(task.level) || 0) + 1);
}

const seenPlacementIds = new Set();
for (const question of data.placementQuestions || []) {
    assert(question.id, "Placement-Frage ohne ID gefunden.");
    if (!question.id) continue;

    assert(!seenPlacementIds.has(question.id), `Doppelte Placement-ID gefunden: ${question.id}`);
    seenPlacementIds.add(question.id);

    assert(taxonomyByLevel.has(question.level), `Placement ${question.id} referenziert unbekanntes Level ${question.level}.`);
    assert(
        sublevelsByLevel.has(question.level) && sublevelsByLevel.get(question.level).has(question.sublevel),
        `Placement ${question.id} referenziert unbekanntes Sublevel ${question.sublevel}.`
    );
    assert(Array.isArray(question.options) && question.options.length >= 2, `Placement ${question.id} braucht mindestens zwei Antwortoptionen.`);
    assert(
        Number.isInteger(question.correctIndex) &&
        question.correctIndex >= 0 &&
        question.correctIndex < question.options.length,
        `Placement ${question.id} hat einen ungueltigen correctIndex.`
    );
}

for (const level of taxonomyByLevel.keys()) {
    warn(perLevelCounts.get(level) > 0, `Level ${level} hat aktuell keine Aufgaben.`);
}

warn(
    (data.tasks || []).length <= data.targetTotal,
    `Aktuelle Aufgabenmenge (${data.tasks.length}) ueberschreitet targetTotal (${data.targetTotal}).`
);

printReport();
process.exit(errors.length > 0 ? 1 : 0);

function printReport() {
    console.log("Archive QA Report");
    console.log(`Tasks: ${Array.isArray(data?.tasks) ? data.tasks.length : 0}`);
    console.log(`Placement questions: ${Array.isArray(data?.placementQuestions) ? data.placementQuestions.length : 0}`);

    const levels = Array.from(perLevelCounts.keys()).sort((a, b) => Number(a) - Number(b));
    for (const level of levels) {
        console.log(`L${level}: ${perLevelCounts.get(level)} tasks`);
    }

    if (warnings.length) {
        console.log("");
        console.log("Warnings:");
        for (const warning of warnings) console.log(`- ${warning}`);
    }

    if (errors.length) {
        console.log("");
        console.log("Errors:");
        for (const error of errors) console.log(`- ${error}`);
    } else {
        console.log("");
        console.log("Result: OK");
    }
}
