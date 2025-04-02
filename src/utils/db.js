import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADFWjfeeaIB8Rij0A32sA6Pp1_1JXsWuk",
  authDomain: "contact-book-2f7d9.firebaseapp.com",
  projectId: "contact-book-2f7d9",
  storageBucket: "contact-book-2f7d9.firebasestorage.app",
  messagingSenderId: "453860294703",
  appId: "1:453860294703:web:0e963c6602cf4d5d0d86da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;