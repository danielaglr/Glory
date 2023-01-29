import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBuHyrQc6WIepnBifrHhdlksshQVBXeoj8",
  authDomain: "glory-cbcd1.firebaseapp.com",
  projectId: "glory-cbcd1",
  storageBucket: "glory-cbcd1.appspot.com",
  messagingSenderId: "862449936191",
  appId: "1:862449936191:web:ea6e07f5b45ca15dfa158a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export default app;