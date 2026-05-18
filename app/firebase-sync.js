// SOR Cloud Sync – Firebase Auth + Firestore bridge
// -----------------------------------------------------------------------
// Setup steps:
// 1. Replace the placeholder values below with your Firebase project config.
//    Source: Firebase Console → Project Settings → General → "Your apps".
// 2. Enable Email/Password sign-in: Firebase Console → Authentication →
//    Sign-in providers → Email/Password → Enable.
// 3. Create a Firestore database (start in test mode for initial setup,
//    then apply the security rules from backend/docs/firestore.rules).
// 4. The three compat SDK scripts must be loaded BEFORE this file:
//      firebase-app-compat.js
//      firebase-auth-compat.js
//      firebase-firestore-compat.js
// -----------------------------------------------------------------------

const SOR_FIREBASE_CONFIG = {
  apiKey:            'REPLACE_WITH_YOUR_API_KEY',
  authDomain:        'REPLACE_WITH_YOUR_AUTH_DOMAIN',
  projectId:         'REPLACE_WITH_YOUR_PROJECT_ID',
  storageBucket:     'REPLACE_WITH_YOUR_STORAGE_BUCKET',
  messagingSenderId: 'REPLACE_WITH_YOUR_MESSAGING_SENDER_ID',
  appId:             'REPLACE_WITH_YOUR_APP_ID',
};

const PROGRESS_COLLECTION = 'sor_user_progress';

function _isConfigured() {
  return !SOR_FIREBASE_CONFIG.apiKey.startsWith('REPLACE_');
}

function _fb() {
  return (typeof firebase !== 'undefined') ? firebase : null;
}

window.SorSync = (function () {
  var _initialized = false;
  var _statusCallbacks = [];
  var _currentUid = null;
  var _pushTimer = null;

  function _emit(status, detail) {
    _statusCallbacks.forEach(function (cb) {
      try { cb(status, detail); } catch (_) {}
    });
  }

  function _docRef(uid) {
    var fb = _fb();
    if (!fb) return null;
    return fb.firestore().collection(PROGRESS_COLLECTION).doc(uid);
  }

  // Returns true if Firebase SDK is available and configured.
  function init() {
    if (_initialized) return true;
    if (!_isConfigured() || !_fb()) return false;
    try {
      if (!firebase.apps.length) firebase.initializeApp(SOR_FIREBASE_CONFIG);
      firebase.auth().onAuthStateChanged(function (user) {
        _currentUid = user ? user.uid : null;
        if (!user) _emit('idle');
      });
      _initialized = true;
      return true;
    } catch (e) {
      return false;
    }
  }

  function isReady() {
    return _initialized && !!_currentUid;
  }

  // Register a callback for sync status changes.
  // Callback signature: function(status, detail)
  // status values: 'idle' | 'syncing' | 'synced' | 'error'
  function onStatus(callback) {
    _statusCallbacks.push(callback);
  }

  // Sign in to Firebase with the same email/password used locally.
  // Returns a Promise<{ ok: boolean, uid?: string, error?: string }>.
  function signIn(email, password) {
    if (!_initialized) return Promise.resolve({ ok: false, error: 'not_configured' });
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function (cred) {
        _currentUid = cred.user.uid;
        return { ok: true, uid: _currentUid };
      })
      .catch(function (e) {
        return { ok: false, error: e.code || e.message };
      });
  }

  // Create a new Firebase Auth account matching the local account.
  // Returns a Promise<{ ok: boolean, uid?: string, error?: string }>.
  function register(email, password) {
    if (!_initialized) return Promise.resolve({ ok: false, error: 'not_configured' });
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function (cred) {
        _currentUid = cred.user.uid;
        return { ok: true, uid: _currentUid };
      })
      .catch(function (e) {
        return { ok: false, error: e.code || e.message };
      });
  }

  // Sign out from Firebase.
  function signOut() {
    if (!_initialized) return Promise.resolve();
    var prev = _currentUid;
    _currentUid = null;
    if (!prev) return Promise.resolve();
    return firebase.auth().signOut().catch(function () {});
  }

  // Push account progress to Firestore (password is never sent to cloud).
  // Returns a Promise<boolean>.
  function pushProgress(email, account) {
    if (!_currentUid) return Promise.resolve(false);
    var ref = _docRef(_currentUid);
    if (!ref || !account) return Promise.resolve(false);
    _emit('syncing');
    var payload = {
      email: email,
      displayName: account.displayName || '',
      avatarColor: account.avatarColor || '',
      createdAt: account.createdAt || new Date().toISOString(),
      progress: account.progress || {},
      hearts: typeof account.hearts === 'number' ? account.hearts : 5,
      streakFreezes: account.streakFreezes || 0,
      syncedAt: new Date().toISOString(),
    };
    return ref.set(payload, { merge: true })
      .then(function () { _emit('synced'); return true; })
      .catch(function (e) { _emit('error', e.message); return false; });
  }

  // Pull account progress from Firestore for the currently signed-in UID.
  // Returns a Promise<object|null>.
  function pullProgress() {
    if (!_currentUid) return Promise.resolve(null);
    var ref = _docRef(_currentUid);
    if (!ref) return Promise.resolve(null);
    _emit('syncing');
    return ref.get()
      .then(function (snap) {
        _emit('synced');
        return snap.exists ? snap.data() : null;
      })
      .catch(function (e) {
        _emit('error', e.message);
        return null;
      });
  }

  // Schedule a debounced push to avoid excessive writes during a session.
  function schedulePush(email, account, delayMs) {
    if (!_initialized || !_currentUid) return;
    clearTimeout(_pushTimer);
    _pushTimer = setTimeout(function () {
      pushProgress(email, account);
    }, delayMs || 8000);
  }

  return {
    init: init,
    isReady: isReady,
    onStatus: onStatus,
    signIn: signIn,
    register: register,
    signOut: signOut,
    pushProgress: pushProgress,
    pullProgress: pullProgress,
    schedulePush: schedulePush,
  };
}());
