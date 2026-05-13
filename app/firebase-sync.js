// Second-Order Resonance – Firebase Cloud Sync
//
// Wraps Firebase Auth (email/password) and Firestore progress sync.
// Designed for graceful degradation: when Firebase is not configured or a
// network call fails the caller receives null / false and the app continues
// to work from local storage unchanged.
//
// Firestore data model
//   users/{firebaseUid}/progress (document)
//     schemaVersion : number
//     summary       : { xp, correct, total, streak, lastSessionDate, earnedAchievements }
//     dailyActivity : { [YYYY-MM-DD]: { count, xp } }
//     weeklyXp      : { [YYYY-WNN]: number }
//     lastActiveDate: string | null
//     updatedAt     : string (ISO)

(function () {
  'use strict';

  const PLACEHOLDER_PREFIX = 'REPLACE_WITH_';

  function configIsReal(cfg) {
    if (!cfg || typeof cfg !== 'object') return false;
    return Object.values(cfg).every(
      (v) => typeof v === 'string' && !v.startsWith(PLACEHOLDER_PREFIX)
    );
  }

  let _app  = null;
  let _auth = null;
  let _db   = null;

  function isReady() {
    return _auth !== null && _db !== null;
  }

  function init() {
    const cfg = window.SOR_FIREBASE_CONFIG;
    if (!configIsReal(cfg)) return;

    try {
      // Compat SDK is loaded via <script> tags before this file.
      if (typeof firebase === 'undefined') return;

      if (!firebase.apps.length) {
        _app = firebase.initializeApp(cfg);
      } else {
        _app = firebase.app();
      }
      _auth = firebase.auth();
      _db   = firebase.firestore();
    } catch (e) {
      _app = _auth = _db = null;
    }
  }

  // --- Auth helpers ---

  async function registerUser(email, password, displayName) {
    if (!isReady()) return null;
    try {
      const cred = await _auth.createUserWithEmailAndPassword(email, password);
      await cred.user.updateProfile({ displayName });
      return cred.user.uid;
    } catch (e) {
      return null;
    }
  }

  async function signIn(email, password) {
    if (!isReady()) return null;
    try {
      const cred = await _auth.signInWithEmailAndPassword(email, password);
      return cred.user.uid;
    } catch (e) {
      return null;
    }
  }

  async function signOut() {
    if (!isReady()) return;
    try { await _auth.signOut(); } catch (e) {}
  }

  function getCurrentUser() {
    if (!isReady()) return null;
    return _auth.currentUser || null;
  }

  // --- Firestore helpers ---

  function progressDocRef(uid) {
    return _db.collection('users').doc(uid).collection('progress').doc('current');
  }

  async function syncProgress(uid, progressEnvelope) {
    if (!isReady() || !uid || !progressEnvelope) return false;
    try {
      await progressDocRef(uid).set(progressEnvelope, { merge: true });
      return true;
    } catch (e) {
      return false;
    }
  }

  async function loadProgress(uid) {
    if (!isReady() || !uid) return null;
    try {
      const snap = await progressDocRef(uid).get();
      return snap.exists ? snap.data() : null;
    } catch (e) {
      return null;
    }
  }

  // --- Public API ---

  window.sorFirebaseSync = {
    init,
    isReady,
    registerUser,
    signIn,
    signOut,
    getCurrentUser,
    syncProgress,
    loadProgress
  };
})();
