import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVcarcwt7ug55oHsezk3Z_7tKicsU7MF8",
  authDomain: "ai-productivity-app-2a314.firebaseapp.com",
  projectId: "ai-productivity-app-2a314",
  storageBucket: "ai-productivity-app-2a314.firebasestorage.app",
  messagingSenderId: "947637556640",
  appId: "1:947637556640:web:94baf1542134d3767180c5",
  measurementId: "G-G4BSPYM66P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
};
export const googleProvider = new GoogleAuthProvider();
