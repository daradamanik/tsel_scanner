import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBE7-4j-JrUBgtLsBra-VM96d_edKY0ziM",
    authDomain: "telkomsel-scanner.firebaseapp.com",
    databaseURL: "https://telkomsel-scanner-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "telkomsel-scanner",
    storageBucket: "telkomsel-scanner.firebasestorage.app",
    messagingSenderId: "574607737304",
    appId: "1:574607737304:web:c3aec85231c26f9b0c32ad",
  measurementId: "G-VQ36N6L3BV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);