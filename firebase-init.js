// Initializes Firebase (App, Firestore, Auth) and exposes them on `window`
// so the non-module scripts on this site (content-loader.js, feedback.js, admin.js)
// can use them without a build step. Dispatches "firebase-ready" when done,
// or "firebase-unavailable" if firebase-config.js still has placeholder values.

if (!window.FIREBASE_CONFIGURED) {
  console.warn("Firebase is not configured yet — see SETUP.md. Falling back to static content.");
  window.dispatchEvent(new CustomEvent("firebase-unavailable"));
} else {
  import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js").then(async ({ initializeApp }) => {
    const [{ getFirestore, doc, getDoc, setDoc, collection, addDoc, getDocs, deleteDoc, query, orderBy, increment, updateDoc }, { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut }] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"),
      import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js")
    ]);

    const app = initializeApp(window.FIREBASE_CONFIG);
    const db = getFirestore(app);
    const auth = getAuth(app);

    window.fb = {
      app, db, auth,
      doc, getDoc, setDoc, collection, addDoc, getDocs, deleteDoc, query, orderBy, increment, updateDoc,
      signInWithEmailAndPassword, onAuthStateChanged, signOut
    };

    window.dispatchEvent(new CustomEvent("firebase-ready"));
  }).catch((err) => {
    console.error("Firebase failed to load:", err);
    window.dispatchEvent(new CustomEvent("firebase-unavailable"));
  });
}
