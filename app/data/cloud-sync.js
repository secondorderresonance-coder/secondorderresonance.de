// SOR Cloud-Sync adapter – Firebase Auth + Firestore when configured, no-op otherwise.
//
// Activation: create app/data/firebase-config.js that sets window.SOR_FIREBASE_CONFIG
// to your Firebase project object and load the Firebase compat SDK before this file.
//
// Without a config this module runs silently in local-only mode – nothing breaks.
window.SOR_CLOUD_SYNC = (function () {
    let _db = null;
    let _auth = null;
    let _ready = false;
    let _syncStatus = 'lokal'; // 'lokal' | 'verbunden' | 'fehler'

    function init() {
        const cfg = window.SOR_FIREBASE_CONFIG;
        if (!cfg || typeof firebase === 'undefined') return;
        try {
            if (!firebase.apps.length) firebase.initializeApp(cfg);
            _auth = firebase.auth();
            _db   = firebase.firestore();
            _ready = true;
            _syncStatus = 'verbunden';
        } catch (e) {
            _syncStatus = 'fehler';
        }
    }

    // Sign in using the same email+password already stored locally.
    async function signInWithEmail(email, password) {
        if (!_ready) return { ok: false };
        try {
            await _auth.signInWithEmailAndPassword(email, password);
            return { ok: true };
        } catch (e) {
            // Attempt to create account in Firebase if it doesn't exist yet.
            try {
                await _auth.createUserWithEmailAndPassword(email, password);
                return { ok: true };
            } catch (e2) {
                return { ok: false, error: e2.message };
            }
        }
    }

    async function signOut() {
        if (!_ready) return;
        try { await _auth.signOut(); } catch (_) {}
    }

    // Push the current account record to Firestore (fire-and-forget, no blocking).
    async function syncUp(email, accountData) {
        if (!_ready) return;
        const user = _auth.currentUser;
        if (!user) return;
        try {
            await _db.collection('sor_accounts').doc(user.uid).set(
                {
                    email,
                    progress:   accountData.progress   || {},
                    hearts:     accountData.hearts      ?? 5,
                    streakFreezes: accountData.streakFreezes ?? 0,
                    updatedAt: new Date().toISOString(),
                },
                { merge: true }
            );
        } catch (_) {}
    }

    // Pull account record from Firestore; returns the data object or null.
    async function syncDown() {
        if (!_ready) return null;
        const user = _auth.currentUser;
        if (!user) return null;
        try {
            const snap = await _db.collection('sor_accounts').doc(user.uid).get();
            return snap.exists ? snap.data() : null;
        } catch (_) {
            return null;
        }
    }

    function status() { return _syncStatus; }
    function isReady() { return _ready; }

    return { init, signInWithEmail, signOut, syncUp, syncDown, status, isReady };
})();
