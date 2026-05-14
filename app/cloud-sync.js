// cloud-sync.js – Firebase Auth + Firestore sync layer for SOR accounts
// Progressive enhancement: gracefully falls back to local-only mode when
// Firebase is not configured or unavailable.
//
// Public API exposed on window.SORCloudSync:
//   init()                          – initialise Firebase (call once on page load)
//   isConfigured()                  – true when firebase-config.js has real values
//   ready()                         – true when Auth + Firestore are initialised
//   register(email, pass, profile)  – create Firebase Auth user + write Firestore
//   login(email, pass)              – sign in, return { uid, remoteProgress }
//   saveProgress(uid, progress)     – debounced write of progress to Firestore
//   logout()                        – sign out from Firebase
//   mergeProgress(local, remote)    – merge two progress envelopes (higher XP wins)

(function () {
  'use strict';

  var _auth = null;
  var _db = null;
  var _saveTimer = null;

  function isConfigured() {
    var cfg = window.SOR_FIREBASE_CONFIG;
    return (
      cfg != null &&
      typeof cfg.apiKey === 'string' &&
      cfg.apiKey.length > 0 &&
      !cfg.apiKey.startsWith('YOUR_') &&
      typeof cfg.projectId === 'string' &&
      cfg.projectId.length > 0 &&
      !cfg.projectId.startsWith('YOUR_')
    );
  }

  function init() {
    if (!isConfigured()) return;
    if (typeof firebase === 'undefined') {
      console.warn('[SOR sync] Firebase SDK not loaded.');
      return;
    }
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(window.SOR_FIREBASE_CONFIG);
      }
      _auth = firebase.auth();
      _db = firebase.firestore();
    } catch (e) {
      console.warn('[SOR sync] Firebase init failed:', e.message);
    }
  }

  function ready() {
    return _auth !== null && _db !== null;
  }

  // ── Internal Firestore helpers ──────────────────────────────────────────────

  function userRef(uid) {
    return _db.collection('users').doc(uid);
  }

  function progressRef(uid) {
    return userRef(uid).collection('progress').doc('main');
  }

  function writeProfile(uid, profile) {
    return userRef(uid).set(
      {
        email: profile.email || '',
        displayName: profile.displayName || '',
        avatarColor: profile.avatarColor || '',
        createdAt: profile.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  }

  function writeProgress(uid, progress) {
    var payload = Object.assign({}, progress, { updatedAt: new Date().toISOString() });
    return progressRef(uid).set(payload, { merge: true });
  }

  function readProgress(uid) {
    return progressRef(uid)
      .get()
      .then(function (doc) {
        return doc.exists ? doc.data() : null;
      });
  }

  // ── Public operations ───────────────────────────────────────────────────────

  function register(email, password, profile) {
    if (!ready()) return Promise.resolve({ uid: null });
    return _auth
      .createUserWithEmailAndPassword(email, password)
      .then(function (cred) {
        var uid = cred.user.uid;
        return Promise.all([
          writeProfile(uid, profile),
          writeProgress(uid, profile.progress || {}),
        ]).then(function () {
          return { uid: uid };
        });
      })
      .catch(function (e) {
        console.warn('[SOR sync] register failed:', e.message);
        return { uid: null };
      });
  }

  function login(email, password) {
    if (!ready()) return Promise.resolve({ uid: null, remoteProgress: null });
    return _auth
      .signInWithEmailAndPassword(email, password)
      .then(function (cred) {
        var uid = cred.user.uid;
        return readProgress(uid).then(function (remoteProgress) {
          return { uid: uid, remoteProgress: remoteProgress };
        });
      })
      .catch(function (e) {
        console.warn('[SOR sync] login failed:', e.message);
        return { uid: null, remoteProgress: null };
      });
  }

  function saveProgress(uid, progress) {
    if (!ready() || !uid) return;
    if (_saveTimer) clearTimeout(_saveTimer);
    _saveTimer = setTimeout(function () {
      _saveTimer = null;
      writeProgress(uid, progress).catch(function (e) {
        console.warn('[SOR sync] save failed:', e.message);
      });
    }, 2000);
  }

  function logout() {
    if (_saveTimer) {
      clearTimeout(_saveTimer);
      _saveTimer = null;
    }
    if (!ready()) return Promise.resolve();
    return _auth.signOut().catch(function () {});
  }

  // Merge two progress envelopes: prefer the one with higher total XP.
  // Daily activity and weekly XP are unioned so no history is lost.
  function mergeProgress(local, remote) {
    if (!remote) return local;
    if (!local) return remote;
    var localXp = (local.summary && local.summary.xp) || 0;
    var remoteXp = (remote.summary && remote.summary.xp) || 0;
    // Use local if it has equal or more XP
    if (localXp >= remoteXp) return local;
    // Remote has more XP: take remote summary but union activity history
    var merged = Object.assign({}, remote);
    merged.dailyActivity = Object.assign(
      {},
      local.dailyActivity || {},
      remote.dailyActivity || {}
    );
    merged.weeklyXp = {};
    var allWeeks = new Set(
      Object.keys(local.weeklyXp || {}).concat(Object.keys(remote.weeklyXp || {}))
    );
    allWeeks.forEach(function (w) {
      merged.weeklyXp[w] = Math.max(
        (local.weeklyXp && local.weeklyXp[w]) || 0,
        (remote.weeklyXp && remote.weeklyXp[w]) || 0
      );
    });
    return merged;
  }

  // ── Public API ──────────────────────────────────────────────────────────────

  window.SORCloudSync = {
    init: init,
    ready: ready,
    isConfigured: isConfigured,
    register: register,
    login: login,
    saveProgress: saveProgress,
    logout: logout,
    mergeProgress: mergeProgress,
  };
})();
