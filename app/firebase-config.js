// Second-Order Resonance – Firebase project configuration
//
// How to set up:
//   1. Go to https://console.firebase.google.com
//   2. Create a project (or open an existing one).
//   3. Add a Web App: Project Settings → General → "Your apps" → </> Web
//   4. Copy the firebaseConfig object shown there and paste it below,
//      replacing every "YOUR_…" placeholder value.
//   5. Enable Email/Password sign-in:
//      Firebase console → Authentication → Sign-in method → Email/Password → Enable
//   6. Enable Firestore:
//      Firebase console → Firestore Database → Create database (start in production mode)
//      Add the security rules from docs/firestore.rules to your project.
//
// When all placeholders are replaced with real values the app automatically
// uses Firebase Auth and Firestore for cross-device account sync.
// If the placeholder values remain, the app silently falls back to
// localStorage-only mode with no cloud sync — no errors, no warnings shown.

window.SOR_FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};
