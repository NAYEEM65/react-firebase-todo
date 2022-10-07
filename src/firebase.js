import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyBPCA3DBxyzr9amMjI85y9gti11EEBL_fg",
//   authDomain: "todo-app-nayeem.firebaseapp.com",
//   projectId: "todo-app-nayeem",
//   storageBucket: "todo-app-nayeem.appspot.com",
//   messagingSenderId: "720871003447",
//   appId: "1:720871003447:web:04dde8b8c1f5dbd2c3f6b2",
// };
const firebaseConfig = {
    apiKey: 'AIzaSyAT7itdnR26DBWrgf-QjB5toB2ufMPOuTs',
    authDomain: 'react-firebase-todo-nayeem.firebaseapp.com',
    projectId: 'react-firebase-todo-nayeem',
    storageBucket: 'react-firebase-todo-nayeem.appspot.com',
    messagingSenderId: '787677637080',
    appId: '1:787677637080:web:72feee20ad33e38c71eaad',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
