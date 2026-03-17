import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV-9BwwTBS4rG893ucFMLKYMSuA2FNF1w",
  authDomain: "der-bien.firebaseapp.com",
  projectId: "der-bien",
  storageBucket: "der-bien.firebasestorage.app",
  messagingSenderId: "311434653814",
  appId: "1:311434653814:web:076d5686fabf829c5bef57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn("Multiple tabs open, persistence can only be enabled in one tab at a a time.");
    } else if (err.code === 'unimplemented') {
      console.warn("The current browser does not support all of the features required to enable persistence.");
    }
  });

export { db };
