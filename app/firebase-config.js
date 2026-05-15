// SOR Firebase configuration – cloud sync across devices
// Steps to enable:
//   1. Create a Firebase project at https://console.firebase.google.com
//   2. Enable Authentication (Email/Password provider)
//   3. Enable Firestore Database
//   4. Copy your web app credentials here (they are safe to publish)
//   5. Add Firestore security rules: only the signed-in user may read/write their own /user_progress/{uid}
//
// When all values remain at their placeholder defaults, the app runs in
// local-storage-only mode and nothing changes for existing users.
window.SOR_FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
