import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import "firebase/firestore"
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,getAuth } from "firebase/auth";
// import {  signInWithPopup } from "firebase/auth";

const root = ReactDOM.createRoot(document.getElementById('root'));
const firebaseConfig = {
  apiKey: "AIzaSyDCjI7Fzhrkvr87_mvHx3MorsSNp8fkDdc",
  authDomain: "project-2945005484851165415.firebaseapp.com",
  projectId: "project-2945005484851165415",
  storageBucket: "project-2945005484851165415.appspot.com",
  messagingSenderId: "681468696016",
  appId: "1:681468696016:web:97834323ff35a6d20155d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const provider = new GoogleAuthProvider();


const auth = getAuth();
// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });

 export const Context = createContext(null)
root.render(
  // <React.StrictMode>
    <Context.Provider value={{
      auth,
      provider,
      db
    }}>
    <App />
    </Context.Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
