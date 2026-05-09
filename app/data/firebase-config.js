// SOR Firebase configuration – fill in to activate cloud sync.
//
// 1. Create a Firebase project at https://console.firebase.google.com
// 2. Enable Authentication (Email/Password) and Firestore
// 3. Replace the commented block below with your project's SDK config
// 4. Load the Firebase compat SDK before this file in index.html:
//      <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
//      <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"></script>
//      <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"></script>
//
// window.SOR_FIREBASE_CONFIG = {
//   apiKey:            "YOUR_API_KEY",
//   authDomain:        "YOUR_PROJECT.firebaseapp.com",
//   projectId:         "YOUR_PROJECT_ID",
//   storageBucket:     "YOUR_PROJECT.appspot.com",
//   messagingSenderId: "YOUR_SENDER_ID",
//   appId:             "YOUR_APP_ID"
// };

window.SOR_FIREBASE_CONFIG = null; // cloud sync disabled – local-only mode
