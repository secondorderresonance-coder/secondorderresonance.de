/* Prüflauf für Konten, Klassen und Belohnungen (ohne Browser). Aufruf: node tools/core-qa.js */
const path = require("path"), crypto = require("crypto"), assert = require("assert");
const mem = {};
globalThis.localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
const SOR = require(path.join(__dirname, "../app/modules/sor-core.js"));
const R = require(path.join(__dirname, "../app/modules/rewards.js"));
let n = 0; const t = (name, fn) => { fn(); n += 1; };

t("sha256", () => { for (const s of ["", "abc", "Mathe ist schön – äöü", "x".repeat(200)]) assert.strictEqual(SOR.sha256(s), crypto.createHash("sha256").update(s, "utf8").digest("hex")); });
t("register/login", () => {
    assert.strictEqual(SOR.accounts.register({ email: "kein-at", displayName: "A", password: "x" }).ok, false);
    const r = SOR.accounts.register({ email: "Lehrer@Schule.de", displayName: "Frau Beispiel", password: "geheim1", role: "lehrkraft" });
    assert.ok(r.ok && r.account.role === "lehrkraft" && r.account.id === "lehrer@schule.de");
    assert.ok(!/geheim1/.test(mem["mathlevel-accounts-v1"]), "Passwort darf nicht im Klartext gespeichert sein");
    assert.strictEqual(SOR.accounts.register({ email: "lehrer@schule.de", displayName: "Doppelt", password: "geheim1" }).ok, false);
    SOR.accounts.logout(); assert.strictEqual(SOR.accounts.current(), null);
    assert.strictEqual(SOR.accounts.login("lehrer@schule.de", "falsch").ok, false);
    assert.ok(SOR.accounts.login("lehrer@schule.de", "geheim1").ok);
});
t("legacy plaintext migration", () => {
    const s = JSON.parse(mem["mathlevel-accounts-v1"]); s.accounts["alt@test.de"] = { email: "alt@test.de", displayName: "Alt", password: "altpass", progress: { summary: { xp: 40 } } }; mem["mathlevel-accounts-v1"] = JSON.stringify(s);
    assert.ok(SOR.accounts.login("alt@test.de", "altpass").ok);
    const a = JSON.parse(mem["mathlevel-accounts-v1"]).accounts["alt@test.de"]; assert.ok(a.pwHash && a.password === "");
    assert.ok(SOR.accounts.login("alt@test.de", "altpass").ok);
});
t("classes", () => {
    const cls = SOR.school.create({ name: "7b", grade: 7, teacherId: "lehrer@schule.de" });
    assert.ok(/^[A-Z2-9]{6}$/.test(cls.code));
    assert.strictEqual(SOR.school.join("XXXXXX", "alt@test.de").ok, false);
    assert.ok(SOR.school.join(cls.code.toLowerCase(), "alt@test.de").ok);
    SOR.school.join(cls.code, "alt@test.de"); assert.strictEqual(SOR.school.get(cls.id).members.length, 1);
    SOR.school.assign(cls.id, { topicId: "CM-S-20", title: "Gleichungen" });
    assert.strictEqual(SOR.school.assignmentsFor("alt@test.de").length, 1);
    assert.strictEqual(SOR.school.classes("lehrer@schule.de").length, 1);
});
t("rewards", () => {
    let last;
    for (let i = 0; i < 12; i += 1) last = R.record({ topicId: "CM-S-20", correct: true, difficulty: 2, firstTry: true }, "alt@test.de", "2026-11-02");
    assert.strictEqual(R.stars(R.profile("alt@test.de").mastery["CM-S-20"].score), 2, "ohne schwere Aufgaben höchstens 2 Sterne");
    for (let i = 0; i < 3; i += 1) R.record({ topicId: "CM-S-20", correct: true, difficulty: 3, firstTry: true }, "alt@test.de", "2026-11-02");
    const p = R.profile("alt@test.de");
    assert.strictEqual(p.stats.correct, 15); assert.ok(p.xp > 100); assert.ok(p.badges["treffer-10"] && p.badges["lauf-10"]);
    assert.strictEqual(R.stars(p.mastery["CM-S-20"].score), 3); assert.ok(p.badges["stern-1"]);
    assert.strictEqual(JSON.parse(mem["mathlevel-accounts-v1"]).accounts["alt@test.de"].progress.summary.xp, 40 + p.xp);
    R.record({ topicId: "CM-S-20", correct: false, difficulty: 2 }, "alt@test.de", "2026-11-03"); assert.strictEqual(R.profile("alt@test.de").streak.count, 2); assert.strictEqual(R.profile("alt@test.de").stats.combo, 0);
    R.record({ topicId: "CM-S-21", correct: true, difficulty: 1 }, "alt@test.de", "2026-11-06"); assert.strictEqual(R.profile("alt@test.de").streak.count, 1); assert.strictEqual(R.profile("alt@test.de").streak.best, 2);
    assert.ok(R.finishSession({ total: 8, correct: 8 }, "alt@test.de").newBadges.some(b => b.id === "perfekt"));
    const lv = R.level(0); assert.ok(lv.level === 1 && lv.need === 100); assert.strictEqual(R.level(100).level, 2); assert.strictEqual(R.level(259).level, 2); assert.strictEqual(R.level(260).level, 3);
    assert.strictEqual(new Set(R.BADGES.map(b => b.id)).size, R.BADGES.length);
});
t("export/delete", () => {
    const ex = SOR.accounts.exportData("alt@test.de"); assert.ok(ex.lernstand && ex.klassen.length === 1 && !JSON.stringify(ex).includes("pwHash"));
    assert.ok(SOR.accounts.remove("alt@test.de")); assert.strictEqual(SOR.accounts.get("alt@test.de"), null);
    assert.strictEqual(SOR.school.classes()[0].members.length, 0); assert.ok(!JSON.parse(mem["sor-rewards-v1"]).profiles["alt@test.de"]);
});
console.log(`core-qa: ${n} Testgruppen\nResult: OK`);
