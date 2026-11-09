/*
 * SOR Belohnungssystem
 * ------------------------------------------------------------
 * XP, Stufen, Tagesziel, Lernserie, Abzeichen und Meisterschaft pro Thema.
 * Speichert pro Konto (oder "guest") unter sor-rewards-v1 und spiegelt XP und
 * Trefferzahlen in das bestehende Konto, damit Mathe-App und Profil dieselben
 * Zahlen zeigen.
 *
 *   SOR_REWARDS.profile([key])                -> Lernstand
 *   SOR_REWARDS.record({ topicId, correct, difficulty, hintUsed, firstTry })
 *                                             -> { xp, levelUp, stars, newBadges }
 *   SOR_REWARDS.finishSession({ total, correct })  -> { newBadges }
 *   SOR_REWARDS.level(xp)                     -> { level, title, into, need, progress }
 *   SOR_REWARDS.BADGES                        -> Definitionen
 */
(function (root) {
    "use strict";
    var SOR = root.SOR || (typeof require !== "undefined" ? require("./sor-core.js") : null);
    var KEY = "sor-rewards-v1";
    var TITLES = ["Einsteiger", "Entdecker", "Tüftler", "Rechenfuchs", "Könner", "Profi", "Experte", "Meister", "Großmeister", "Legende"];

    function load() { var s = SOR.storage.get(KEY); if (!s || typeof s !== "object") s = {}; if (!s.profiles) s.profiles = {}; return s; }
    function blank() { return { xp: 0, goal: 50, daily: {}, streak: { count: 0, best: 0, last: null }, badges: {}, mastery: {}, stats: { correct: 0, total: 0, sessions: 0, perfect: 0, combo: 0, bestCombo: 0, goalDays: 0, hints: 0 } }; }
    function ensure(s, key) { var p = s.profiles[key]; if (!p) { p = s.profiles[key] = blank(); } var b = blank(); Object.keys(b).forEach(function (k) { if (p[k] === undefined) p[k] = b[k]; }); Object.keys(b.stats).forEach(function (k) { if (p.stats[k] === undefined) p.stats[k] = 0; }); return p; }
    function dayDiff(a, b) { return Math.round((new Date(b + "T00:00:00") - new Date(a + "T00:00:00")) / 86400000); }

    function level(xp) {
        var lv = 1, need = 100, left = xp || 0;
        while (left >= need) { left -= need; lv += 1; need = 100 + (lv - 1) * 60; }
        return { level: lv, title: TITLES[Math.min(TITLES.length - 1, Math.floor((lv - 1) / 2))], into: left, need: need, progress: left / need };
    }
    function stars(score) { return score >= 90 ? 3 : score >= 60 ? 2 : score >= 30 ? 1 : 0; }
    function totalStars(p) { return Object.keys(p.mastery).reduce(function (s, k) { return s + stars(p.mastery[k].score); }, 0); }
    function difficultyFor(p, topicId) { var m = p.mastery[topicId]; return !m || m.score < 35 ? 1 : m.score < 70 ? 2 : 3; }

    var BADGES = [
        { id: "start", icon: "🚀", title: "Erster Schritt", text: "Erste Übung abgeschlossen", test: function (p) { return p.stats.sessions >= 1; } },
        { id: "treffer-10", icon: "🎯", title: "Zielsicher", text: "10 Aufgaben richtig", test: function (p) { return p.stats.correct >= 10; } },
        { id: "treffer-100", icon: "💯", title: "Hundert", text: "100 Aufgaben richtig", test: function (p) { return p.stats.correct >= 100; } },
        { id: "treffer-500", icon: "🏹", title: "Scharfschütze", text: "500 Aufgaben richtig", test: function (p) { return p.stats.correct >= 500; } },
        { id: "perfekt", icon: "✨", title: "Fehlerfrei", text: "Eine Übung ohne Fehler", test: function (p) { return p.stats.perfect >= 1; } },
        { id: "perfekt-10", icon: "💎", title: "Präzision", text: "10 Übungen ohne Fehler", test: function (p) { return p.stats.perfect >= 10; } },
        { id: "lauf-10", icon: "🔥", title: "Lauf", text: "10 richtige Antworten in Folge", test: function (p) { return p.stats.bestCombo >= 10; } },
        { id: "lauf-25", icon: "☄️", title: "Unaufhaltsam", text: "25 richtige Antworten in Folge", test: function (p) { return p.stats.bestCombo >= 25; } },
        { id: "serie-3", icon: "📅", title: "Dranbleiber", text: "3 Tage in Folge geübt", test: function (p) { return p.streak.best >= 3; } },
        { id: "serie-7", icon: "🗓️", title: "Wochenserie", text: "7 Tage in Folge geübt", test: function (p) { return p.streak.best >= 7; } },
        { id: "serie-30", icon: "🏔️", title: "Ausdauer", text: "30 Tage in Folge geübt", test: function (p) { return p.streak.best >= 30; } },
        { id: "ziel-5", icon: "✅", title: "Zielstrebig", text: "Tagesziel an 5 Tagen erreicht", test: function (p) { return p.stats.goalDays >= 5; } },
        { id: "stern-1", icon: "⭐", title: "Erster Stern", text: "Ein Thema mit 3 Sternen gemeistert", test: function (p) { return Object.keys(p.mastery).some(function (k) { return stars(p.mastery[k].score) === 3; }); } },
        { id: "sterne-15", icon: "🌟", title: "Sternensammler", text: "15 Sterne gesammelt", test: function (p) { return totalStars(p) >= 15; } },
        { id: "sterne-50", icon: "🌌", title: "Sternenhimmel", text: "50 Sterne gesammelt", test: function (p) { return totalStars(p) >= 50; } },
        { id: "vielseitig", icon: "🧭", title: "Vielseitig", text: "10 verschiedene Themen geübt", test: function (p) { return Object.keys(p.mastery).length >= 10; } },
        { id: "hoersaal", icon: "🎓", title: "Hörsaal", text: "Ein Studienthema mit 2 Sternen", test: function (p) { return Object.keys(p.mastery).some(function (k) { return k.indexOf("CM-E-") === 0 && stars(p.mastery[k].score) >= 2; }); } },
        { id: "xp-1000", icon: "⚡", title: "Energie", text: "1.000 XP gesammelt", test: function (p) { return p.xp >= 1000; } },
        { id: "xp-5000", icon: "🌋", title: "Kraftwerk", text: "5.000 XP gesammelt", test: function (p) { return p.xp >= 5000; } },
        { id: "ohne-tipp", icon: "🧠", title: "Aus eigener Kraft", text: "20 richtige Antworten ohne Tipp", test: function (p) { return p.stats.correct - p.stats.hints >= 20 && p.stats.correct >= 20; } }
    ];

    function award(p, today) {
        var got = [];
        BADGES.forEach(function (b) { if (!p.badges[b.id] && b.test(p)) { p.badges[b.id] = today; got.push({ id: b.id, icon: b.icon, title: b.title, text: b.text }); } });
        return got;
    }

    function touchDay(p, today) {
        var d = p.daily[today] || (p.daily[today] = { xp: 0, correct: 0, total: 0 });
        if (p.streak.last !== today) {
            var gap = p.streak.last ? dayDiff(p.streak.last, today) : null;
            p.streak.count = gap === 1 ? p.streak.count + 1 : 1;
            p.streak.last = today; p.streak.best = Math.max(p.streak.best || 0, p.streak.count);
        }
        var days = Object.keys(p.daily).sort();
        while (days.length > 120) delete p.daily[days.shift()];
        return d;
    }

    function record(o, key, dateOverride) {
        var s = load(), k = key || SOR.accounts.key(), p = ensure(s, k), today = dateOverride || SOR.today(), d = Math.max(1, Math.min(3, o.difficulty || 1));
        var day = touchDay(p, today), before = level(p.xp).level, m = p.mastery[o.topicId] || (p.mastery[o.topicId] = { score: 0, correct: 0, total: 0, last: null }), starsBefore = stars(m.score), xp = 0;
        m.total += 1; m.last = today; p.stats.total += 1; day.total += 1;
        if (o.correct) {
            p.stats.combo += 1; p.stats.bestCombo = Math.max(p.stats.bestCombo, p.stats.combo);
            xp = 6 + 4 * d + (o.firstTry === false ? -3 : 0) + (o.hintUsed ? -2 : 0) + Math.min(5, Math.floor(p.stats.combo / 3));
            xp = Math.max(2, xp);
            // Meisterschaft wächst langsam und ist nach Schwierigkeit gedeckelt: 3 Sterne gibt es nur über schwere Aufgaben
            var cap = d === 1 ? 59 : d === 2 ? 89 : 100;
            m.correct += 1; if (m.score < cap) m.score = Math.min(cap, m.score + (o.firstTry === false ? 3 : 4 + 2 * d)); p.stats.correct += 1; day.correct += 1; if (o.hintUsed) p.stats.hints += 1;
        } else { p.stats.combo = 0; m.score = Math.max(0, m.score - 6); }
        var goalBefore = day.xp >= p.goal;
        p.xp += xp; day.xp += xp;
        if (!goalBefore && day.xp >= p.goal) p.stats.goalDays += 1;
        var newBadges = award(p, today), after = level(p.xp);
        SOR.storage.set(KEY, s);
        if (k !== "guest" && k.indexOf("demo:") !== 0) SOR.accounts.mirrorProgress(k, { xp: xp, correct: o.correct ? 1 : 0, total: 1, streak: p.streak.count, date: today });
        return { xp: xp, combo: p.stats.combo, levelUp: after.level > before ? after : null, stars: stars(m.score), starUp: stars(m.score) > starsBefore, score: m.score, goalReached: !goalBefore && day.xp >= p.goal, newBadges: newBadges };
    }

    function finishSession(o, key, dateOverride) {
        var s = load(), p = ensure(s, key || SOR.accounts.key()), today = dateOverride || SOR.today();
        p.stats.sessions += 1; if (o.total >= 5 && o.correct === o.total) p.stats.perfect += 1;
        var got = award(p, today); SOR.storage.set(KEY, s);
        return { newBadges: got };
    }

    function profile(key) { var s = load(); return ensure(s, key || SOR.accounts.key()); }
    function setGoal(goal, key) { var s = load(), p = ensure(s, key || SOR.accounts.key()); p.goal = Math.max(20, Math.min(300, goal)); SOR.storage.set(KEY, s); }
    function weekXp(p) { var sum = 0, i, d = new Date(); for (i = 0; i < 7; i += 1) { var k = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); if (p.daily[k]) sum += p.daily[k].xp; d.setDate(d.getDate() - 1); } return sum; }
    // Gast-Lernstand in ein neues Konto übernehmen (nur wenn das Konto noch leer ist)
    function adoptGuest(key) { var s = load(); if (!s.profiles.guest || s.profiles[key]) return false; s.profiles[key] = s.profiles.guest; delete s.profiles.guest; SOR.storage.set(KEY, s); var p = s.profiles[key]; SOR.accounts.mirrorProgress(key, { xp: p.xp, correct: p.stats.correct, total: p.stats.total, streak: p.streak.count, date: p.streak.last }); return true; }

    root.SOR_REWARDS = { record: record, finishSession: finishSession, profile: profile, level: level, stars: stars, totalStars: totalStars, difficultyFor: difficultyFor, setGoal: setGoal, weekXp: weekXp, adoptGuest: adoptGuest, BADGES: BADGES, TITLES: TITLES, KEY: KEY };
    if (typeof module !== "undefined" && module.exports) module.exports = root.SOR_REWARDS;
})(typeof window !== "undefined" ? window : globalThis);
