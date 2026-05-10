// ─── Firebase configuration ───────────────────────────────────────────────────
// Set FIREBASE_ENABLED to true and fill in your project values to enable
// cross-device account sync via Firebase Auth + Firestore.
//
// Get the config object from:
//   Firebase Console → your project → Project Settings → Your apps → Web app
//
// Required Firestore security rules (firestore.rules):
//   rules_version = '2';
//   service cloud.firestore {
//     match /databases/{db}/documents {
//       match /sor_users/{email} {
//         allow read, write: if request.auth != null && request.auth.token.email == email;
//       }
//     }
//   }
//
// Leave FIREBASE_ENABLED = false to keep using local-storage-only mode (default).
// ─────────────────────────────────────────────────────────────────────────────
const FIREBASE_CONFIG = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

const FIREBASE_ENABLED = false;
