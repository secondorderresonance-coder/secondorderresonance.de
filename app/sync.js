/**
 * SOR Cloud-Sync Service
 *
 * Wraps Firebase Auth + Firestore for optional cloud synchronisation of user
 * progress. Works as a transparent no-op when FIREBASE_CONFIG (defined in
 * sync-config.js) is null, so the rest of the app requires no conditional
 * checks beyond calling SORSync.isEnabled().
 *
 * Loading strategy: Firebase SDK scripts are injected dynamically at first
 * use so the CDN cost is only paid when cloud-sync is actually configured.
 */
(function (global) {
  'use strict';

  const FIREBASE_VERSION = '10.12.2';
  const CDN = 'https://www.gstatic.com/firebasejs/' + FIREBASE_VERSION;

  let _app    = null;
  let _auth   = null;
  let _db     = null;
  let _ready  = false;
  let _initP  = null; // singleton init promise

  // ── helpers ───────────────────────────────────────────────────────────────

  function isConfigured() {
    return typeof FIREBASE_CONFIG !== 'undefined' && FIREBASE_CONFIG !== null;
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload  = resolve;
      s.onerror = function () { reject(new Error('Failed to load ' + src)); };
      document.head.appendChild(s);
    });
  }

  // ── init ──────────────────────────────────────────────────────────────────

  async function _init() {
    if (_ready) return true;
    if (!isConfigured()) return false;

    try {
      await loadScript(CDN + '/firebase-app-compat.js');
      await loadScript(CDN + '/firebase-auth-compat.js');
      await loadScript(CDN + '/firebase-firestore-compat.js');

      _app  = firebase.initializeApp(FIREBASE_CONFIG);  // eslint-disable-line no-undef
      _auth = firebase.auth();                           // eslint-disable-line no-undef
      _db   = firebase.firestore();                      // eslint-disable-line no-undef
      _ready = true;
      return true;
    } catch (e) {
      console.warn('[SORSync] Firebase init failed:', e);
      return false;
    }
  }

  function ensureInit() {
    if (!_initP) _initP = _init();
    return _initP;
  }

  // ── push debounce ─────────────────────────────────────────────────────────

  let _pushTimer = null;
  const PUSH_DEBOUNCE_MS = 3000;

  function schedulePush(email, progressEnvelope) {
    clearTimeout(_pushTimer);
    _pushTimer = setTimeout(function () {
      pushProgress(email, progressEnvelope).catch(function () {});
    }, PUSH_DEBOUNCE_MS);
  }

  // ── public API ────────────────────────────────────────────────────────────

  /** Returns true when FIREBASE_CONFIG is set (even before SDK loads). */
  function isEnabled() {
    return isConfigured();
  }

  /**
   * Register a new user via Firebase Auth (email + password).
   * Returns the Firebase User object on success, null otherwise.
   */
  async function register(email, password) {
    if (!await ensureInit()) return null;
    try {
      var cred = await _auth.createUserWithEmailAndPassword(email, password);
      return cred.user || null;
    } catch (e) {
      console.warn('[SORSync] register error:', e.code, e.message);
      return null;
    }
  }

  /**
   * Sign in an existing user via Firebase Auth.
   * Returns the Firebase User on success, null otherwise.
   */
  async function signIn(email, password) {
    if (!await ensureInit()) return null;
    try {
      var cred = await _auth.signInWithEmailAndPassword(email, password);
      return cred.user || null;
    } catch (e) {
      console.warn('[SORSync] signIn error:', e.code, e.message);
      return null;
    }
  }

  /** Sign out from Firebase Auth (no-op when not initialised). */
  async function signOut() {
    if (!_ready || !_auth) return;
    try { await _auth.signOut(); } catch (e) { /* ignore */ }
  }

  /**
   * Push the local progress envelope to Firestore.
   * The document path is /userProgress/{uid} — isolated per authenticated user.
   * Safe to call even when not configured (returns immediately).
   */
  async function pushProgress(email, progressEnvelope) {
    if (!await ensureInit()) return;
    var user = _auth.currentUser;
    if (!user) return;
    try {
      await _db.collection('userProgress').doc(user.uid).set({
        email: email,
        progress: progressEnvelope,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (e) {
      console.warn('[SORSync] pushProgress error:', e);
    }
  }

  /**
   * Pull the progress envelope from Firestore for the current user.
   * Returns the stored progress object, or null if unavailable.
   */
  async function pullProgress() {
    if (!await ensureInit()) return null;
    var user = _auth.currentUser;
    if (!user) return null;
    try {
      var doc = await _db.collection('userProgress').doc(user.uid).get();
      if (doc.exists && doc.data() && doc.data().progress) {
        return doc.data().progress;
      }
      return null;
    } catch (e) {
      console.warn('[SORSync] pullProgress error:', e);
      return null;
    }
  }

  // ── export ────────────────────────────────────────────────────────────────

  global.SORSync = {
    isEnabled:     isEnabled,
    register:      register,
    signIn:        signIn,
    signOut:       signOut,
    pushProgress:  pushProgress,
    pullProgress:  pullProgress,
    schedulePush:  schedulePush
  };

})(window);
