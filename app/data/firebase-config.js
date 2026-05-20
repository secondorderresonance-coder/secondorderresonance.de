// SOR Cloud Sync – Firebase Configuration
// Fill in your Firebase project credentials to enable cross-device sync.
// Find them in: Firebase Console → Project Settings → Your apps → SDK setup.
// Leave apiKey as an empty string ("") to keep the app in local-only mode.
//
// Firestore Security Rules (recommended minimum):
//   rules_version = '2';
//   service cloud.firestore {
//     match /databases/{database}/documents {
//       match /user_progress/{uid} {
//         allow read, write: if request.auth != null && request.auth.uid == uid;
//       }
//     }
//   }
const FIREBASE_CONFIG = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
