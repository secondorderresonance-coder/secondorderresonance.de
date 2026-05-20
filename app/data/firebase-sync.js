// SOR Cloud Sync – Firebase Auth + Firestore bridge
// Requires FIREBASE_CONFIG (firebase-config.js) to be loaded first.
// When FIREBASE_CONFIG.apiKey is empty the module is a complete no-op.
// The Firebase compat SDK is loaded dynamically only when apiKey is set.
const SorFirebaseSync = (() => {
    'use strict';
    let _auth = null, _db = null, _ready = false, _uid = null;

    function isAvailable() { return _ready; }
    function getCurrentUid() { return _uid; }

    function _loadScript(url) {
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = url;
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    async function init(config) {
        if (!config || !config.apiKey) return;
        try {
            if (typeof firebase === 'undefined') {
                const base = 'https://www.gstatic.com/firebasejs/10.12.0';
                await _loadScript(base + '/firebase-app-compat.js');
                await _loadScript(base + '/firebase-auth-compat.js');
                await _loadScript(base + '/firebase-firestore-compat.js');
            }
            if (firebase.apps.length === 0) firebase.initializeApp(config);
            _auth = firebase.auth();
            _db = firebase.firestore();
            _ready = true;
            _auth.onAuthStateChanged(function(u) { _uid = u ? u.uid : null; });
        } catch (e) {
            console.warn('[SorSync] init:', e.message);
        }
    }

    async function register(email, password) {
        if (!_ready) return { ok: false };
        try {
            const c = await _auth.createUserWithEmailAndPassword(email, password);
            _uid = c.user.uid;
            return { ok: true };
        } catch (e) {
            return { ok: false, code: e.code };
        }
    }

    async function login(email, password) {
        if (!_ready) return { ok: false };
        try {
            const c = await _auth.signInWithEmailAndPassword(email, password);
            _uid = c.user.uid;
            return { ok: true };
        } catch (e) {
            return { ok: false, code: e.code };
        }
    }

    async function logout() {
        if (!_ready || !_auth) return;
        try { await _auth.signOut(); } catch (e) {}
        _uid = null;
    }

    async function pushProgress(progressData) {
        if (!_ready || !_uid || !_db) return false;
        try {
            await _db.collection('user_progress').doc(_uid).set(
                { progress: progressData, updatedAt: firebase.firestore.FieldValue.serverTimestamp() },
                { merge: true }
            );
            return true;
        } catch (e) {
            console.warn('[SorSync] push:', e.message);
            return false;
        }
    }

    async function pullProgress() {
        if (!_ready || !_uid || !_db) return null;
        try {
            const snap = await _db.collection('user_progress').doc(_uid).get();
            return snap.exists ? (snap.data().progress || null) : null;
        } catch (e) {
            console.warn('[SorSync] pull:', e.message);
            return null;
        }
    }

    return { init, register, login, logout, pushProgress, pullProgress, isAvailable, getCurrentUid };
})();
