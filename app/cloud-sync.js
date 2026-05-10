/* SOR Cloud-Sync – Firebase Auth + Firestore bridge
 *
 * Requires (loaded in order before this script):
 *   1. firebase-app-compat.js
 *   2. firebase-auth-compat.js
 *   3. firebase-firestore-compat.js
 *   4. firebase-config.js  (defines FIREBASE_CONFIG and FIREBASE_ENABLED)
 *
 * All async operations fail silently with a console.warn so that the
 * existing localStorage-only flow is never interrupted.
 */
(function () {
  'use strict';

  const COLL = 'sor_users';
  let _db = null;
  let _auth = null;
  let _ready = false;

  function init() {
    if (typeof FIREBASE_ENABLED === 'undefined' || !FIREBASE_ENABLED) return;
    if (typeof firebase === 'undefined') {
      console.warn('[SOR cloud-sync] Firebase SDK not loaded');
      return;
    }
    try {
      if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
      _auth = firebase.auth();
      _db   = firebase.firestore();
      _ready = true;
    } catch (e) {
      console.warn('[SOR cloud-sync] init error:', e.message);
    }
  }

  // Register a new account in Firebase Auth and create the Firestore doc.
  async function cloudRegister(email, password, displayName, avatarColor) {
    if (!_ready) return null;
    try {
      const cred = await _auth.createUserWithEmailAndPassword(email, password);
      await _db.collection(COLL).doc(email).set({
        uid: cred.user.uid,
        email,
        displayName: displayName || email.split('@')[0],
        avatarColor: avatarColor || '#8b5cf6',
        createdAt: new Date().toISOString(),
      }, { merge: true });
      return cred.user.uid;
    } catch (e) {
      console.warn('[SOR cloud-sync] cloudRegister:', e.message);
      return null;
    }
  }

  // Sign in to Firebase Auth.
  async function cloudSignIn(email, password) {
    if (!_ready) return null;
    try {
      const cred = await _auth.signInWithEmailAndPassword(email, password);
      return cred.user.uid;
    } catch (e) {
      console.warn('[SOR cloud-sync] cloudSignIn:', e.message);
      return null;
    }
  }

  // Sign out from Firebase Auth.
  async function cloudSignOut() {
    if (!_auth) return;
    try {
      await _auth.signOut();
    } catch (e) {
      console.warn('[SOR cloud-sync] cloudSignOut:', e.message);
    }
  }

  // Write the current progress envelope to Firestore for this account.
  async function pushProgress(email, progressEnvelope) {
    if (!_ready || !email || !progressEnvelope) return;
    try {
      await _db.collection(COLL).doc(email).set(
        { progress: progressEnvelope, syncedAt: new Date().toISOString() },
        { merge: true }
      );
    } catch (e) {
      console.warn('[SOR cloud-sync] pushProgress:', e.message);
    }
  }

  // Read the stored progress envelope from Firestore; returns null on miss/error.
  async function pullProgress(email) {
    if (!_ready || !email) return null;
    try {
      const snap = await _db.collection(COLL).doc(email).get();
      if (!snap.exists) return null;
      return snap.data().progress || null;
    } catch (e) {
      console.warn('[SOR cloud-sync] pullProgress:', e.message);
      return null;
    }
  }

  // Debounced push: batches rapid saves into a single Firestore write.
  let _pushTimer = null;
  function schedulePush(email, progressEnvelope) {
    if (!_ready) return;
    clearTimeout(_pushTimer);
    _pushTimer = setTimeout(function () { pushProgress(email, progressEnvelope); }, 4000);
  }

  // Auto-init on script load.
  init();

  window.SORCloudSync = { cloudRegister, cloudSignIn, cloudSignOut, pushProgress, pullProgress, schedulePush };
})();
