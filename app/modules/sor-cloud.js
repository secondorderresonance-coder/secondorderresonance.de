/*
 * SOR Cloud: dauerhafte Konten und Fortschritt über Supabase (EU)
 * ------------------------------------------------------------
 * Ohne Bibliothek, nur fetch gegen die Supabase-Schnittstellen (Auth und PostgREST).
 * Konfiguration in app/data/cloud-config.js. Ist sie leer, ist SOR_CLOUD.enabled false
 * und die Seite arbeitet wie bisher nur mit lokalen Konten.
 * Datenbank, Sicherheitsregeln und Mail an den Betreiber: supabase/setup.sql
 *
 *   SOR_CLOUD.enabled
 *   SOR_CLOUD.signUp({ email, password, displayName, role, grade, city }) -> Promise<{ ok, confirm, error }>
 *   SOR_CLOUD.signIn(email, password)  -> Promise<{ ok, error }>
 *   SOR_CLOUD.signOut()                -> Promise
 *   SOR_CLOUD.resetPassword(email)     -> Promise<{ ok, error }>
 *   SOR_CLOUD.user()                   -> { id, email } | null
 *   SOR_CLOUD.profile() / updateProfile(patch)
 *   SOR_CLOUD.sync()                   -> Lernstand zusammenführen und hochladen
 *   SOR_CLOUD.deleteAccount()
 *   SOR_CLOUD.globe()                  -> Promise<{ total, points: [{ city, n }] }>
 * Der lokale Spiegel (SOR.accounts.adopt) sorgt dafür, dass Belohnungen, Klassen und Profil unverändert funktionieren.
 */
(function (root) {
    "use strict";
    var cfg = root.SOR_CLOUD_CONFIG || {}, URL_ = String(cfg.url || "").replace(/\/+$/, ""), KEY = String(cfg.key || "");
    var enabled = /^https:\/\/[a-z0-9-]+\.supabase\.(co|in)$/.test(URL_) && KEY.length > 20;
    var SKEY = "sor-cloud-session", t = function (de, en) { return root.$t ? root.$t(de, en) : de; };
    function store() { return root.SOR && SOR.storage ? SOR.storage : { get: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }, set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* privat */ } }, remove: function (k) { try { localStorage.removeItem(k); } catch (e) { /* privat */ } } }; }
    var session = store().get(SKEY);

    function headers(token, extra) {
        var h = { apikey: KEY, "Content-Type": "application/json" };
        if (token) h.Authorization = "Bearer " + token; else if (/^eyJ/.test(KEY)) h.Authorization = "Bearer " + KEY;
        Object.keys(extra || {}).forEach(function (k) { h[k] = extra[k]; });
        return h;
    }
    function call(path, o) {
        o = o || {};
        return fetch(URL_ + path, { method: o.method || "GET", headers: headers(o.token, o.headers), body: o.body ? JSON.stringify(o.body) : undefined })
            .then(function (r) { return r.text().then(function (txt) { var j = null; try { j = txt ? JSON.parse(txt) : null; } catch (e) { j = null; } return { ok: r.ok, status: r.status, json: j }; }); })
            .catch(function () { return { ok: false, status: 0, json: null }; });
    }
    function errText(res) {
        var j = res.json || {}, m = String(j.msg || j.error_description || j.message || j.error || "");
        if (res.status === 0) return t("Keine Verbindung zum Server. Bist du online?", "No connection to the server. Are you online?");
        if (/invalid login|invalid_credentials/i.test(m)) return t("E-Mail oder Passwort stimmen nicht.", "Email or password is incorrect.");
        if (/not confirmed/i.test(m)) return t("Bitte bestätige zuerst deine E-Mail-Adresse über den Link in der Mail.", "Please confirm your email address first via the link in the email.");
        if (/already registered|already exists/i.test(m)) return t("Für diese E-Mail-Adresse gibt es schon ein Konto. Melde dich an.", "There is already an account for this email address. Please sign in.");
        if (/password/i.test(m) && /6|short|weak/i.test(m)) return t("Das Passwort ist zu kurz oder zu schwach.", "The password is too short or too weak.");
        if (/rate limit|too many/i.test(m)) return t("Zu viele Versuche. Bitte warte ein paar Minuten.", "Too many attempts. Please wait a few minutes.");
        return m || t("Das hat leider nicht geklappt.", "That did not work, unfortunately.");
    }
    function keep(s) {
        if (!s || !s.access_token) return null;
        session = { access_token: s.access_token, refresh_token: s.refresh_token, expires_at: s.expires_at || Math.floor(Date.now() / 1000) + (s.expires_in || 3600), user: s.user ? { id: s.user.id, email: s.user.email } : session && session.user };
        store().set(SKEY, session); return session;
    }
    function drop() { session = null; store().remove(SKEY); }
    function token() {
        if (!session) return Promise.resolve(null);
        if (session.expires_at - Date.now() / 1000 > 60) return Promise.resolve(session.access_token);
        return call("/auth/v1/token?grant_type=refresh_token", { method: "POST", body: { refresh_token: session.refresh_token } }).then(function (r) { if (r.ok && keep(r.json)) return session.access_token; drop(); return null; });
    }

    // ---------- Profil und Lernstand ----------
    function profile() {
        return token().then(function (tk) { if (!tk) return null; return call("/rest/v1/profiles?id=eq." + session.user.id + "&select=*", { token: tk }).then(function (r) { return r.ok && r.json && r.json[0] || null; }); });
    }
    function updateProfile(patch) {
        return token().then(function (tk) { if (!tk) return false; patch.updated_at = new Date().toISOString(); return call("/rest/v1/profiles?id=eq." + session.user.id, { method: "PATCH", token: tk, body: patch, headers: { Prefer: "return=minimal" } }).then(function (r) { return r.ok; }); });
    }
    function mergeProgress(a, b) {
        if (!a) return b; if (!b) return a;
        var out = JSON.parse(JSON.stringify(a)), k;
        out.xp = Math.max(a.xp || 0, b.xp || 0);
        out.stats = out.stats || {}; for (k in (b.stats || {})) out.stats[k] = Math.max(out.stats[k] || 0, b.stats[k] || 0);
        out.badges = out.badges || {}; for (k in (b.badges || {})) if (!out.badges[k]) out.badges[k] = b.badges[k];
        out.daily = out.daily || {}; for (k in (b.daily || {})) if (!out.daily[k] || (b.daily[k].xp || 0) > (out.daily[k].xp || 0)) out.daily[k] = b.daily[k];
        out.mastery = out.mastery || {}; for (k in (b.mastery || {})) { var x = out.mastery[k], y = b.mastery[k]; if (!x || (y.total || 0) > (x.total || 0) || ((y.total || 0) === (x.total || 0) && String(y.last || "") > String(x.last || ""))) out.mastery[k] = y; }
        var sa = a.streak || {}, sb = b.streak || {}; out.streak = String(sb.last || "") > String(sa.last || "") || (sb.last === sa.last && (sb.count || 0) > (sa.count || 0)) ? JSON.parse(JSON.stringify(sb)) : sa; out.streak.best = Math.max(sa.best || 0, sb.best || 0);
        out.extra = Object.assign({}, b.extra || {}, a.extra || {});
        return out;
    }
    var pushTimer = null, syncing = false;
    function localKey() { return session && session.user ? String(session.user.email).toLowerCase() : null; }
    function push() {
        var k = localKey(); if (!k || !root.SOR_REWARDS || !SOR.accounts || SOR.accounts.key() !== k) return Promise.resolve(false);
        var p = SOR_REWARDS.raw(k); p.extra = collectExtra();
        return updateProfile({ progress: p });
    }
    // Zusätzliche lokale Fortschritte, die mitwandern (Mathe-Wunder, Tagesaufgaben, Reisepass)
    var EXTRA_KEYS = ["sor-wonders", "sor-daily-v1", "sor-passport-v1"];
    function collectExtra() { var o = {}; EXTRA_KEYS.forEach(function (k) { try { var v = localStorage.getItem(k); if (v) o[k] = JSON.parse(v); } catch (e) { /* ignorieren */ } }); return o; }
    function applyExtra(o) { if (!o) return; EXTRA_KEYS.forEach(function (k) { if (!o[k]) return; try { var cur = JSON.parse(localStorage.getItem(k) || "null"); var merged = cur && typeof cur === "object" && !Array.isArray(cur) ? Object.assign({}, o[k], cur) : o[k]; localStorage.setItem(k, JSON.stringify(merged)); } catch (e) { /* ignorieren */ } }); }
    function sync() {
        if (syncing) return Promise.resolve(false); syncing = true;
        return profile().then(function (pr) {
            if (!pr) return false;
            var acc = SOR.accounts.adopt({ email: session.user.email, displayName: pr.display_name, role: pr.role, grade: pr.grade });
            var k = acc.id; if (SOR_REWARDS.adoptGuest) SOR_REWARDS.adoptGuest(k); var local = SOR_REWARDS.raw(k), merged = mergeProgress(local, pr.progress && pr.progress.xp !== undefined ? pr.progress : null);
            applyExtra(merged.extra); delete merged.extra;
            SOR_REWARDS.replace(k, merged);
            SOR.accounts.mirrorProgress(k, { xp: merged.xp, correct: merged.stats.correct, total: merged.stats.total, streak: merged.streak.count, date: merged.streak.last });
            return push();
        }).then(function (r) { syncing = false; return r; }, function () { syncing = false; return false; });
    }
    if (enabled && root.addEventListener) root.addEventListener("sor-progress", function () { if (!session || syncing) return; clearTimeout(pushTimer); pushTimer = setTimeout(push, 1500); });

    // ---------- Anmeldung ----------
    function signUp(o) {
        var redirect = root.location ? root.location.href.split("#")[0].split("?")[0] : "";
        return call("/auth/v1/signup?redirect_to=" + encodeURIComponent(redirect), { method: "POST", body: { email: String(o.email || "").trim().toLowerCase(), password: o.password, data: { display_name: String(o.displayName || "").trim().slice(0, 30), role: o.role === "lehrkraft" ? "lehrkraft" : "schueler", grade: o.grade || null, city_id: o.city || null, lang: (root.SOR_I18N && SOR_I18N.lang) || "de" } } })
            .then(function (r) {
                if (!r.ok) return { ok: false, error: errText(r) };
                if (r.json && r.json.access_token) { keep(r.json); return sync().then(function () { return { ok: true }; }); }
                if (r.json && r.json.identities && r.json.identities.length === 0) return { ok: false, error: errText({ status: 400, json: { msg: "already registered" } }) };
                return { ok: true, confirm: true };
            });
    }
    function signIn(email, password) {
        return call("/auth/v1/token?grant_type=password", { method: "POST", body: { email: String(email || "").trim().toLowerCase(), password: password } })
            .then(function (r) { if (!r.ok || !keep(r.json)) return { ok: false, error: errText(r) }; return sync().then(function () { return { ok: true }; }); });
    }
    function signOut() {
        var tk = session && session.access_token; clearTimeout(pushTimer);
        return (tk ? push().then(function () { return call("/auth/v1/logout", { method: "POST", token: tk }); }) : Promise.resolve()).then(function () { drop(); if (root.SOR) SOR.accounts.logout(); });
    }
    function resetPassword(email) {
        var redirect = root.location ? root.location.href.split("#")[0].split("?")[0] : "";
        return call("/auth/v1/recover?redirect_to=" + encodeURIComponent(redirect), { method: "POST", body: { email: String(email || "").trim().toLowerCase() } }).then(function (r) { return r.ok ? { ok: true } : { ok: false, error: errText(r) }; });
    }
    function setPassword(pw) {
        return token().then(function (tk) { if (!tk) return { ok: false, error: t("Bitte melde dich erneut an.", "Please sign in again.") }; return call("/auth/v1/user", { method: "PUT", token: tk, body: { password: pw } }).then(function (r) { return r.ok ? { ok: true } : { ok: false, error: errText(r) }; }); });
    }
    function deleteAccount() {
        return token().then(function (tk) { if (!tk) return false; var email = session.user.email; return call("/rest/v1/rpc/delete_my_account", { method: "POST", token: tk, body: {} }).then(function (r) { if (r.ok) { drop(); if (root.SOR) SOR.accounts.remove(String(email).toLowerCase()); } return r.ok; }); });
    }
    function globe() {
        if (!enabled) return Promise.resolve({ total: 0, points: [], offline: true });
        return call("/rest/v1/rpc/globe_points", { method: "POST", body: {} }).then(function (r) {
            if (!r.ok || !Array.isArray(r.json)) return { total: 0, points: [], offline: true };
            var total = 0, pts = r.json.map(function (x) { total += x.n; return { city: x.city_id, n: x.n }; });
            return { total: total, points: pts.filter(function (p) { return p.city !== "_none"; }) };
        });
    }

    // Rückkehr aus der Bestätigungs- oder Passwort-Mail: #access_token=...&type=signup|recovery
    var recovery = false;
    if (enabled && root.location && /access_token=/.test(root.location.hash)) {
        var q = {}; root.location.hash.slice(1).split("&").forEach(function (kv) { var p = kv.split("="); q[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || ""); });
        recovery = q.type === "recovery";
        keep({ access_token: q.access_token, refresh_token: q.refresh_token, expires_in: +q.expires_in || 3600, user: null });
        try { root.history.replaceState(null, "", root.location.pathname + root.location.search); } catch (e) { /* alt */ }
        call("/auth/v1/user", { token: q.access_token }).then(function (r) { if (r.ok && r.json) { session.user = { id: r.json.id, email: r.json.email }; store().set(SKEY, session); sync().then(function () { if (root.dispatchEvent) root.dispatchEvent(new CustomEvent("sor-cloud-ready", { detail: { recovery: recovery } })); }); } });
    }

    root.SOR_CLOUD = {
        enabled: enabled, signUp: signUp, signIn: signIn, signOut: signOut, resetPassword: resetPassword, setPassword: setPassword, deleteAccount: deleteAccount,
        user: function () { return session && session.user || null; }, profile: profile, updateProfile: updateProfile, sync: sync, push: push, globe: globe, merge: mergeProgress
    };
})(window);
