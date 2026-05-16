// Cloud-Sync Konfiguration
// Um Cloud-Sync zu aktivieren, trage hier deine Firebase-Projektdaten ein.
// Ohne Konfiguration läuft die App weiterhin vollständig lokal (kein Datenverlust).
//
// Firebase-Projekt erstellen: https://console.firebase.google.com/
// Dann: Projekteinstellungen → Deine Apps → Webapp-Konfiguration kopieren.
//
// Aktiviere in der Firebase-Konsole:
//   - Authentication → E-Mail/Passwort
//   - Firestore Database (Produktions- oder Testmodus)
//
// Firestore-Sicherheitsregel (minimales Beispiel):
//   match /userProgress/{uid} {
//     allow read, write: if request.auth != null && request.auth.uid == uid;
//   }

const FIREBASE_CONFIG = null;

/*
Beispiel (nach eigenem Firebase-Projekt anpassen):

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSy...",
  authDomain:        "mein-projekt.firebaseapp.com",
  projectId:         "mein-projekt",
  storageBucket:     "mein-projekt.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abc123"
};
*/
