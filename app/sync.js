// SOR Cloud Sync — Firebase Auth + Firestore foundation
// Replace SOR_FIREBASE_CONFIG with your Firebase project config to enable cloud sync.
// While null the module is inert and the app works purely with localStorage.
const SOR_FIREBASE_CONFIG = null;
/*
  To activate, replace null above with your config from Firebase Console > Project settings:
  {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "000000000000",
    appId: "1:000000000000:web:xxxxxxxxxxxxxxxx"
  }

  Firestore security rules (paste in Firebase Console > Firestore > Rules):
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /users/{uid} {
          allow read, write: if request.auth != null && request.auth.uid == uid;
        }
        match /progress/{uid} {
          allow read, write: if request.auth != null && request.auth.uid == uid;
        }
      }
    }
*/

const SORSync = (() => {
    let _auth = null;
    let _db = null;
    let _ready = false;
    let _uid = null;

    function init() {
        if (!SOR_FIREBASE_CONFIG || typeof firebase === 'undefined') return;
        try {
            if (!firebase.apps.length) firebase.initializeApp(SOR_FIREBASE_CONFIG);
            _auth = firebase.auth();
            _db = firebase.firestore();
            _ready = true;
            _auth.onAuthStateChanged(function (user) {
                _uid = user ? user.uid : null;
            });
        } catch (e) {
            console.warn('[SORSync] init failed:', e.message);
        }
    }

    function isReady() { return _ready; }
    function uid() { return _uid; }

    async function signUp(email, password, displayName) {
        if (!_ready) return { ok: false, reason: 'not-configured' };
        try {
            const cred = await _auth.createUserWithEmailAndPassword(email, password);
            await cred.user.updateProfile({ displayName });
            _uid = cred.user.uid;
            return { ok: true, uid: cred.user.uid };
        } catch (e) {
            return { ok: false, reason: e.code || 'unknown', message: e.message };
        }
    }

    async function signIn(email, password) {
        if (!_ready) return { ok: false, reason: 'not-configured' };
        try {
            const cred = await _auth.signInWithEmailAndPassword(email, password);
            _uid = cred.user.uid;
            return { ok: true, uid: cred.user.uid };
        } catch (e) {
            return { ok: false, reason: e.code || 'unknown', message: e.message };
        }
    }

    async function signOut() {
        if (!_ready) return;
        try { await _auth.signOut(); } catch (e) {}
        _uid = null;
    }

    // Stores the full account snapshot (profile + progress) under /progress/{uid}
    async function saveProgress(uid, data) {
        if (!_ready || !uid) return false;
        try {
            await _db.collection('progress').doc(uid).set(data, { merge: true });
            return true;
        } catch (e) {
            console.warn('[SORSync] saveProgress failed:', e.message);
            return false;
        }
    }

    async function loadProgress(uid) {
        if (!_ready || !uid) return null;
        try {
            const snap = await _db.collection('progress').doc(uid).get();
            return snap.exists ? snap.data() : null;
        } catch (e) {
            console.warn('[SORSync] loadProgress failed:', e.message);
            return null;
        }
    }

    return { init, isReady, uid, signUp, signIn, signOut, saveProgress, loadProgress };
})();
