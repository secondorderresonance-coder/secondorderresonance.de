/*
 * SOR Core: Speicher, Konten, Klassen
 * ------------------------------------------------------------
 * Alles läuft lokal im Browser. Der Zugriff geht ausschließlich über einen
 * Speicher-Adapter, damit später ein Server (z. B. Firebase, Supabase oder das
 * Schema in backend/db/schema.sql) angeschlossen werden kann, ohne die Seiten
 * umzubauen:
 *
 *   SOR.useAdapter({ get(key) -> Objekt|null, set(key, objekt), remove(key) })
 *
 * Schlüssel:
 *   mathlevel-accounts-v1   Konten (kompatibel zur bestehenden Mathe-App)
 *   sor-school-v1           Klassen, Mitglieder, Aufträge
 *   sor-rewards-v1          Belohnungen und Lernstand (siehe rewards.js)
 *
 * Rollen: "schueler" (Standard) und "lehrkraft".
 * Passwörter werden nicht im Klartext gespeichert, sondern als gesalzener,
 * mehrfach angewendeter SHA-256-Hash. Das schützt vor zufälligem Mitlesen im
 * Browser-Speicher, ersetzt aber keine serverseitige Anmeldung.
 */
(function (root) {
    "use strict";

    var memory = {};
    var localAdapter = {
        get: function (key) {
            try { var raw = root.localStorage.getItem(key); return raw ? JSON.parse(raw) : null; }
            catch (e) { return memory[key] ? JSON.parse(memory[key]) : null; }
        },
        set: function (key, value) {
            var raw = JSON.stringify(value);
            try { root.localStorage.setItem(key, raw); } catch (e) { memory[key] = raw; }
        },
        remove: function (key) { try { root.localStorage.removeItem(key); } catch (e) { delete memory[key]; } }
    };
    var adapter = localAdapter;

    // ---------- SHA-256 (synchron) ----------
    function sha256(str) {
        var K = [], H = [], isComp = {}, cand = 2, i, j;
        var frac = function (x) { return ((x - Math.floor(x)) * 4294967296) | 0; };
        while (K.length < 64) {
            if (!isComp[cand]) { for (i = cand * cand; i < 313; i += cand) isComp[i] = true; if (H.length < 8) H.push(frac(Math.pow(cand, 0.5))); K.push(frac(Math.pow(cand, 1 / 3))); }
            cand += 1;
        }
        var bytes = unescape(encodeURIComponent(str)), len = bytes.length, words = [];
        for (i = 0; i < len; i += 1) words[i >> 2] |= bytes.charCodeAt(i) << (24 - (i % 4) * 8);
        words[len >> 2] |= 0x80 << (24 - (len % 4) * 8);
        var total = (((len + 8) >> 6) + 1) * 16;
        for (i = 0; i < total; i += 1) words[i] = words[i] | 0;
        words[total - 1] = len * 8; words[total - 2] = Math.floor(len / 536870912);
        var rr = function (x, n) { return (x >>> n) | (x << (32 - n)); };
        for (j = 0; j < total; j += 16) {
            var w = words.slice(j, j + 16), a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
            for (i = 0; i < 64; i += 1) {
                if (i >= 16) { var s0 = rr(w[i - 15], 7) ^ rr(w[i - 15], 18) ^ (w[i - 15] >>> 3), s1 = rr(w[i - 2], 17) ^ rr(w[i - 2], 19) ^ (w[i - 2] >>> 10); w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0; }
                var t1 = (h + (rr(e, 6) ^ rr(e, 11) ^ rr(e, 25)) + ((e & f) ^ (~e & g)) + K[i] + w[i]) | 0;
                var t2 = ((rr(a, 2) ^ rr(a, 13) ^ rr(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
                h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
            }
            H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0; H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
        }
        return H.map(function (x) { return ("00000000" + (x >>> 0).toString(16)).slice(-8); }).join("");
    }
    function hashPassword(password, salt) {
        var h = salt + ":" + password, i;
        for (i = 0; i < 1500; i += 1) h = sha256(h + salt);
        return h;
    }
    function randomId(len) {
        var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", out = "", i, buf;
        try { buf = new Uint8Array(len); root.crypto.getRandomValues(buf); for (i = 0; i < len; i += 1) out += chars[buf[i] % chars.length]; }
        catch (e) { for (i = 0; i < len; i += 1) out += chars[Math.floor(Math.random() * chars.length)]; }
        return out;
    }

    // ---------- Konten ----------
    var ACC_KEY = "mathlevel-accounts-v1";
    var COLORS = ["#e94560", "#8b5cf6", "#60a5fa", "#4ade80", "#f59e0b", "#ec4899"];
    function loadAcc() { var s = adapter.get(ACC_KEY); if (!s || typeof s !== "object") s = {}; if (!s.accounts || typeof s.accounts !== "object") s.accounts = {}; if (typeof s.current !== "string") s.current = null; return s; }
    function saveAcc(s) { adapter.set(ACC_KEY, s); }
    function normEmail(e) { return String(e || "").trim().toLowerCase(); }
    function publicView(id, a) { return a ? { id: id, email: a.email || id, displayName: a.displayName || id.split("@")[0], role: a.role === "lehrkraft" ? "lehrkraft" : "schueler", avatarColor: a.avatarColor || COLORS[0], grade: a.grade || null, createdAt: a.createdAt || null } : null; }
    function verifyPassword(account, password) {
        if (!account) return false;
        if (account.pwHash && account.pwSalt) return hashPassword(password, account.pwSalt) === account.pwHash;
        return !!account.password && account.password === password;
    }
    function setPassword(account, password) { account.pwSalt = randomId(16); account.pwHash = hashPassword(password, account.pwSalt); account.password = ""; }

    var accounts = {
        current: function () { var s = loadAcc(); return s.current && s.accounts[s.current] ? publicView(s.current, s.accounts[s.current]) : null; },
        key: function () { var c = accounts.current(); return c ? c.id : "guest"; },
        get: function (id) { var s = loadAcc(); return publicView(id, s.accounts[id]); },
        all: function () { var s = loadAcc(); return Object.keys(s.accounts).map(function (id) { return publicView(id, s.accounts[id]); }); },
        register: function (o) {
            var email = normEmail(o.email), name = String(o.displayName || "").trim(), pw = String(o.password || "");
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "Bitte eine gültige E-Mail-Adresse eingeben." };
            if (name.length < 2) return { ok: false, error: "Der Anzeigename braucht mindestens 2 Zeichen." };
            if (pw.length < 6) return { ok: false, error: "Das Passwort braucht mindestens 6 Zeichen." };
            var s = loadAcc();
            if (s.accounts[email]) return { ok: false, error: "Für diese E-Mail-Adresse gibt es auf diesem Gerät schon ein Konto." };
            var acc = { email: email, displayName: name, password: "", role: o.role === "lehrkraft" ? "lehrkraft" : "schueler", grade: o.grade || null, avatarColor: COLORS[email.charCodeAt(0) % COLORS.length], createdAt: new Date().toISOString(), hearts: 5, heartsLastRefill: new Date().toISOString(), progress: {} };
            setPassword(acc, pw);
            s.accounts[email] = acc; s.current = email; saveAcc(s);
            return { ok: true, account: publicView(email, acc) };
        },
        login: function (emailRaw, pw) {
            var email = normEmail(emailRaw), s = loadAcc(), acc = s.accounts[email];
            if (!acc || !verifyPassword(acc, String(pw || ""))) return { ok: false, error: "E-Mail oder Passwort stimmen nicht." };
            if (!acc.pwHash) setPassword(acc, String(pw));   // Altbestand: Klartext durch Hash ersetzen
            s.current = email; saveAcc(s);
            return { ok: true, account: publicView(email, acc) };
        },
        logout: function () { var s = loadAcc(); s.current = null; saveAcc(s); },
        update: function (id, patch) {
            var s = loadAcc(), acc = s.accounts[id]; if (!acc) return null;
            ["displayName", "role", "grade", "avatarColor"].forEach(function (k) { if (patch[k] !== undefined) acc[k] = patch[k]; });
            saveAcc(s); return publicView(id, acc);
        },
        remove: function (id) {
            var s = loadAcc(); if (!s.accounts[id]) return false;
            delete s.accounts[id]; if (s.current === id) s.current = null; saveAcc(s);
            var sc = loadSchool(); Object.keys(sc.classes).forEach(function (cid) { var c = sc.classes[cid]; c.members = c.members.filter(function (m) { return m !== id; }); if (c.teacherId === id) delete sc.classes[cid]; }); saveSchool(sc);
            var rw = adapter.get("sor-rewards-v1"); if (rw && rw.profiles && rw.profiles[id]) { delete rw.profiles[id]; adapter.set("sor-rewards-v1", rw); }
            return true;
        },
        // Auskunft: alle zu einem Konto gespeicherten Daten (ohne Passwort-Hash)
        exportData: function (id) {
            var s = loadAcc(), acc = s.accounts[id]; if (!acc) return null;
            var copy = JSON.parse(JSON.stringify(acc)); delete copy.password; delete copy.pwHash; delete copy.pwSalt;
            var rw = adapter.get("sor-rewards-v1"), sc = loadSchool();
            return { exportiertAm: new Date().toISOString(), konto: copy, lernstand: rw && rw.profiles ? rw.profiles[id] || null : null, klassen: Object.keys(sc.classes).map(function (k) { return sc.classes[k]; }).filter(function (c) { return c.teacherId === id || c.members.indexOf(id) !== -1; }).map(function (c) { return { name: c.name, code: c.code, rolle: c.teacherId === id ? "lehrkraft" : "mitglied" }; }) };
        },
        verifyPassword: verifyPassword,
        setPassword: setPassword,
        // Schreibt Lernfortschritt in die Zusammenfassung, die Mathe-App und Profilseite anzeigen
        mirrorProgress: function (id, delta) {
            var s = loadAcc(), acc = s.accounts[id]; if (!acc) return;
            if (!acc.progress || typeof acc.progress !== "object") acc.progress = {};
            var sum = acc.progress.summary || (acc.progress.summary = { correct: 0, total: 0, xp: 0, streak: 0, lastSessionDate: null, earnedAchievements: [] });
            sum.xp = (sum.xp || 0) + (delta.xp || 0); sum.correct = (sum.correct || 0) + (delta.correct || 0); sum.total = (sum.total || 0) + (delta.total || 0);
            if (delta.streak !== undefined) sum.streak = delta.streak;
            if (delta.date) { sum.lastSessionDate = delta.date; acc.progress.lastActiveDate = delta.date; }
            acc.progress.updatedAt = new Date().toISOString();
            saveAcc(s);
        }
    };

    // ---------- Klassen ----------
    var SCHOOL_KEY = "sor-school-v1";
    function loadSchool() { var s = adapter.get(SCHOOL_KEY); if (!s || typeof s !== "object") s = {}; if (!s.classes || typeof s.classes !== "object") s.classes = {}; return s; }
    function saveSchool(s) { adapter.set(SCHOOL_KEY, s); }
    var school = {
        classes: function (teacherId) { var s = loadSchool(); return Object.keys(s.classes).map(function (k) { return s.classes[k]; }).filter(function (c) { return !teacherId || c.teacherId === teacherId; }); },
        get: function (id) { return loadSchool().classes[id] || null; },
        byCode: function (code) { var c = String(code || "").trim().toUpperCase(); return school.classes().filter(function (x) { return x.code === c; })[0] || null; },
        create: function (o) {
            var s = loadSchool(), code;
            do { code = randomId(6); } while (Object.keys(s.classes).some(function (k) { return s.classes[k].code === code; }));
            var cls = { id: "kl-" + randomId(10).toLowerCase(), name: String(o.name || "Klasse").trim().slice(0, 40), grade: o.grade || null, code: code, teacherId: o.teacherId, members: [], assignments: [], demo: !!o.demo, createdAt: new Date().toISOString() };
            s.classes[cls.id] = cls; saveSchool(s); return cls;
        },
        remove: function (id) { var s = loadSchool(); delete s.classes[id]; saveSchool(s); },
        join: function (code, accountId) {
            var s = loadSchool(), c = String(code || "").trim().toUpperCase(), id = Object.keys(s.classes).filter(function (k) { return s.classes[k].code === c; })[0];
            if (!id) return { ok: false, error: "Diesen Klassencode gibt es auf diesem Gerät nicht." };
            if (s.classes[id].members.indexOf(accountId) === -1) s.classes[id].members.push(accountId);
            saveSchool(s); return { ok: true, cls: s.classes[id] };
        },
        leave: function (classId, accountId) { var s = loadSchool(), c = s.classes[classId]; if (!c) return; c.members = c.members.filter(function (m) { return m !== accountId; }); saveSchool(s); },
        addMember: function (classId, memberId) { var s = loadSchool(), c = s.classes[classId]; if (c && c.members.indexOf(memberId) === -1) { c.members.push(memberId); saveSchool(s); } },
        classesOf: function (accountId) { return school.classes().filter(function (c) { return c.members.indexOf(accountId) !== -1; }); },
        assign: function (classId, o) { var s = loadSchool(), c = s.classes[classId]; if (!c) return null; var a = { id: "au-" + randomId(8).toLowerCase(), topicId: o.topicId, title: o.title || "", due: o.due || null, createdAt: new Date().toISOString() }; c.assignments.push(a); saveSchool(s); return a; },
        unassign: function (classId, assignmentId) { var s = loadSchool(), c = s.classes[classId]; if (!c) return; c.assignments = c.assignments.filter(function (a) { return a.id !== assignmentId; }); saveSchool(s); },
        assignmentsFor: function (accountId) { var out = []; school.classesOf(accountId).forEach(function (c) { c.assignments.forEach(function (a) { out.push({ classId: c.id, className: c.name, id: a.id, topicId: a.topicId, title: a.title, due: a.due }); }); }); return out; }
    };

    // ---------- Lernstand teilen (ohne Server) ----------
    // Ein Lernstand wird als kompakter Code in einen Link gepackt. Die Lehrkraft öffnet den Link auf
    // ihrem Gerät und übernimmt den Stand in ihre Klasse. Es werden nur Anzeigename, Klassencode und
    // Lernzahlen übertragen, keine E-Mail-Adresse und kein Passwort.
    function b64e(str) { var b = typeof btoa === "function" ? btoa(unescape(encodeURIComponent(str))) : Buffer.from(str, "utf8").toString("base64"); return b.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
    function b64d(code) { var b = String(code).replace(/-/g, "+").replace(/_/g, "/"); while (b.length % 4) b += "="; return typeof atob === "function" ? decodeURIComponent(escape(atob(b))) : Buffer.from(b, "base64").toString("utf8"); }
    var share = {
        pack: function (o) {
            var rw = adapter.get("sor-rewards-v1"), p = rw && rw.profiles ? rw.profiles[o.key] : null;
            if (!p) return null;
            var m = {}, d = {}, days = Object.keys(p.daily || {}).sort().slice(-14);
            Object.keys(p.mastery || {}).forEach(function (k) { var x = p.mastery[k]; m[k] = [x.score, x.correct, x.total, x.last]; });
            days.forEach(function (k) { var x = p.daily[k]; d[k] = [x.xp, x.correct, x.total]; });
            return b64e(JSON.stringify({ v: 1, n: String(o.name || "").trim().slice(0, 40), c: String(o.classCode || "").trim().toUpperCase(), x: p.xp || 0, s: [p.streak.count || 0, p.streak.best || 0, p.streak.last || null], t: [p.stats.correct || 0, p.stats.total || 0, p.stats.sessions || 0], m: m, d: d, at: new Date().toISOString() }));
        },
        unpack: function (code) {
            try {
                var raw = String(code || "").trim(), i = raw.indexOf("lernstand="); if (i !== -1) raw = raw.slice(i + 10);
                var o = JSON.parse(b64d(raw));
                if (!o || o.v !== 1 || typeof o.n !== "string" || o.n.length < 1 || typeof o.m !== "object" || !Array.isArray(o.s) || !Array.isArray(o.t)) return null;
                return o;
            } catch (e) { return null; }
        },
        // Übernimmt einen entpackten Lernstand als Mitglied "ext:<Klasse>:<Name>" (ersetzt einen älteren Stand desselben Namens)
        importInto: function (classId, o) {
            var sc = loadSchool(), c = sc.classes[classId]; if (!c || !o) return { ok: false, error: "Klasse nicht gefunden." };
            if (o.c && o.c !== c.code) return { ok: false, error: "Dieser Lernstand gehört zu einem anderen Klassencode (" + o.c + ")." };
            var num = function (v) { return typeof v === "number" && isFinite(v) ? Math.max(0, Math.round(v)) : 0; }, day = function (v) { return typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null; };
            var name = o.n.replace(/[<>]/g, "").slice(0, 40), id = "ext:" + classId + ":" + name.toLowerCase().replace(/[^a-z0-9äöüß]+/g, "-");
            var p = { name: name, ext: true, importedAt: new Date().toISOString(), xp: num(o.x), goal: 50, daily: {}, streak: { count: num(o.s[0]), best: num(o.s[1]), last: day(o.s[2]) }, badges: {}, mastery: {}, stats: { correct: num(o.t[0]), total: num(o.t[1]), sessions: num(o.t[2]), perfect: 0, combo: 0, bestCombo: 0, goalDays: 0, hints: 0 } };
            Object.keys(o.m).slice(0, 200).forEach(function (k) { var x = o.m[k]; if (/^CM-[SE]-\d+$/.test(k) && Array.isArray(x)) p.mastery[k] = { score: Math.min(100, num(x[0])), correct: num(x[1]), total: num(x[2]), last: day(x[3]) }; });
            Object.keys(o.d || {}).slice(0, 31).forEach(function (k) { var x = o.d[k]; if (day(k) && Array.isArray(x)) p.daily[k] = { xp: num(x[0]), correct: num(x[1]), total: num(x[2]) }; });
            var rw = adapter.get("sor-rewards-v1") || {}; if (!rw.profiles) rw.profiles = {};
            var updated = !!rw.profiles[id]; rw.profiles[id] = p; adapter.set("sor-rewards-v1", rw);
            if (c.members.indexOf(id) === -1) { c.members.push(id); saveSchool(sc); }
            return { ok: true, id: id, name: name, updated: updated };
        }
    };

    root.SOR = { version: "3.0.0", storage: { get: function (k) { return adapter.get(k); }, set: function (k, v) { adapter.set(k, v); }, remove: function (k) { adapter.remove(k); } }, useAdapter: function (a) { adapter = a || localAdapter; }, accounts: accounts, school: school, share: share, sha256: sha256, randomId: randomId, today: function () { var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); } };
    if (typeof module !== "undefined" && module.exports) module.exports = root.SOR;
})(typeof window !== "undefined" ? window : globalThis);
