// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import getAuth to use Firebase Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoMq72--vhp6lZMGMcmqGSkQxZPkdlgok",
  authDomain: "streetfoodz-6756c.firebaseapp.com",
  projectId: "streetfoodz-6756c",
  storageBucket: "streetfoodz-6756c.appspot.com",
  messagingSenderId: "304472454618",
  appId: "1:304472454618:web:4168c686dd02b8261e7ce3",
  measurementId: "G-SWK0GKFGNF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Firebase Authentication and export the auth object
export { auth };
