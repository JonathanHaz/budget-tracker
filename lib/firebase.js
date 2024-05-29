import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA0eCzBjdJt1kuN-TjVXnXixN221xbvxDM",
  authDomain: "expense-tracker-fd66c.firebaseapp.com",
  projectId: "expense-tracker-fd66c",
  storageBucket: "expense-tracker-fd66c.appspot.com",
  messagingSenderId: "633130889367",
  appId: "1:633130889367:web:9d51a4233b58bdef3a79d2",
  measurementId: "G-CVKFP7Q4M2"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth, provider}
export const db = getFirestore(app)