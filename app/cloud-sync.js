// SOR Cloud Sync – Firebase Auth + Firestore bridge
// Exposes window.SORCloud with register/login/logout/saveProgress/loadProgress.
// Falls back silently to no-op stubs when Firebase is not configured or SDK is absent.
(function () {
  'use strict';

  var cfg = window.SOR_FIREBASE_CONFIG;

  function isConfigured() {
    return !!(
      cfg &&
      cfg.apiKey &&
      cfg.apiKey !== 'YOUR_API_KEY' &&
      cfg.projectId &&
      cfg.projectId !== 'YOUR_PROJECT_ID'
    );
  }

  var noopAsync = function () { return Promise.resolve({}); };
  var NOOP = {
    isConfigured: function () { return false; },
    register: noopAsync,
    login: noopAsync,
    logout: noopAsync,
    saveProgress: noopAsync,
    loadProgress: function () { return Promise.resolve(null); }
  };

  if (!isConfigured() || typeof firebase === 'undefined') {
    window.SORCloud = NOOP;
    return;
  }

  var _app, _auth, _db;
  function getApp()  { if (!_app)  _app  = firebase.initializeApp(cfg); return _app; }
  function getAuth() { if (!_auth) _auth = firebase.auth(getApp());      return _auth; }
  function getDb()   { if (!_db)   _db   = firebase.firestore(getApp()); return _db; }

  var COLL = 'user_progress';

  function register(email, password, displayName) {
    return getAuth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (cred) {
        return cred.user.updateProfile({ displayName: displayName }).then(function () {
          return { uid: cred.user.uid };
        });
      })
      .catch(function (e) { return { error: e.code || e.message }; });
  }

  function login(email, password) {
    return getAuth()
      .signInWithEmailAndPassword(email, password)
      .then(function (cred) {
        var uid = cred.user.uid;
        return getDb().collection(COLL).doc(uid).get().then(function (doc) {
          return { uid: uid, progressEnvelope: doc.exists ? doc.data() : null };
        });
      })
      .catch(function (e) { return { error: e.code || e.message }; });
  }

  function logout() {
    return getAuth().signOut().catch(function () {});
  }

  function saveProgress(uid, progressEnvelope) {
    if (!uid || !progressEnvelope) return Promise.resolve();
    return getDb()
      .collection(COLL)
      .doc(uid)
      .set(progressEnvelope, { merge: true })
      .catch(function () {});
  }

  function loadProgress(uid) {
    if (!uid) return Promise.resolve(null);
    return getDb()
      .collection(COLL)
      .doc(uid)
      .get()
      .then(function (doc) { return doc.exists ? doc.data() : null; })
      .catch(function () { return null; });
  }

  window.SORCloud = {
    isConfigured: function () { return true; },
    register: register,
    login: login,
    logout: logout,
    saveProgress: saveProgress,
    loadProgress: loadProgress
  };
})();
