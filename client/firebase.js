// Import the functions you need from the SDKs you need
// import.meta.env = {"VITE_FIREBASE_API_KEY": "AIzaSyCVBfzJmfCjb-eXTsJBfCBDschQ1WgJ3wc", "BASE_URL": "/", "MODE": "development", "DEV": true, "PROD": false, "SSR": false};// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "merne-state-37364.firebaseapp.com",
  projectId: "merne-state-37364",
  storageBucket: "merne-state-37364.appspot.com",
  messagingSenderId: "703594732413",
  appId: "1:703594732413:web:0a6d6901a6e2356f5f4a14"
};

// Initialize Firebase
const  app = initializeApp(firebaseConfig);

export {app}
