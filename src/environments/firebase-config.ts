
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDOJjxmMOAZ1-h3iRkzuT7BY0rEsGGawg8",
  authDomain: "weatherapp-d2a7a.firebaseapp.com",
  projectId: "weatherapp-d2a7a",
  storageBucket: "weatherapp-d2a7a.appspot.com",
  messagingSenderId: "799349560661",
  appId: "1:799349560661:web:89814f0064b95f34e8cbdc",
  measurementId: "G-SVXWHTNS99"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { firebaseConfig };
