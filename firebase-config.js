// Paste your Firebase project's web config here — see SETUP.md.
// This is safe to expose publicly: Firebase client config is not a secret,
// access is controlled by the rules in firestore.rules.
window.FIREBASE_CONFIG = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE_WITH_YOUR_PROJECT.firebaseapp.com",
  projectId: "REPLACE_WITH_YOUR_PROJECT",
  storageBucket: "REPLACE_WITH_YOUR_PROJECT.appspot.com",
  messagingSenderId: "REPLACE_WITH_SENDER_ID",
  appId: "REPLACE_WITH_APP_ID"
};

window.FIREBASE_CONFIGURED = window.FIREBASE_CONFIG.apiKey !== "REPLACE_WITH_YOUR_API_KEY";
