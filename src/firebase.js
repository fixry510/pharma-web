import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCdbpXvdPn-iqEC2RHR4T7WYw--5a9wxZQ",
    authDomain: "pharmar-nearme.firebaseapp.com",
    databaseURL: "https://pharmar-nearme-default-rtdb.firebaseio.com",
    projectId: "pharmar-nearme",
    storageBucket: "pharmar-nearme.appspot.com",
    messagingSenderId: "984457568341",
    appId: "1:984457568341:web:116a3377bd051c729af4dc",
    measurementId: "G-TSZKX9P0E6"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);

export { db, auth };
