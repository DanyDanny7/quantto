// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_ANALYTICS_API_KEY,
  authDomain: "quanttoweb.firebaseapp.com",
  projectId: "quanttoweb",
  storageBucket: "quanttoweb.appspot.com",
  messagingSenderId: "140572857722",
  appId: "1:140572857722:web:44e6a97adb255141f6b2c3",
  measurementId: "G-XBZ1L87FPN"
};

export const initGA = () => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
}

