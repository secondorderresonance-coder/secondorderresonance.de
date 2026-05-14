// Firebase configuration for Second Order Resonance
// ─────────────────────────────────────────────────────────────────────────────
// Replace the placeholder values below with your actual Firebase project config.
// Get them from: Firebase Console → Project Settings → Your apps → Web app SDK snippet
//
// Steps to enable cloud sync:
// 1. Create a Firebase project at https://console.firebase.google.com
// 2. Enable Authentication → Sign-in method → Email/Password
// 3. Enable Firestore Database (production or test mode)
// 4. Add a Web app and copy the config values into this file
// 5. In Firestore → Rules, secure the users collection:
//      rules_version = '2';
//      service cloud.firestore {
//        match /databases/{database}/documents {
//          match /users/{userId}/{document=**} {
//            allow read, write: if request.auth != null && request.auth.uid == userId;
//          }
//        }
//      }
// 6. Deploy or reload the page – cloud sync activates automatically.
//
// When apiKey starts with 'YOUR_', the app runs in local-only mode (no cloud sync).
// ─────────────────────────────────────────────────────────────────────────────

window.SOR_FIREBASE_CONFIG = {
  apiKey:            'YOUR_API_KEY',
  authDomain:        'YOUR_PROJECT_ID.firebaseapp.com',
  projectId:         'YOUR_PROJECT_ID',
  storageBucket:     'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId:             'YOUR_APP_ID'
};
