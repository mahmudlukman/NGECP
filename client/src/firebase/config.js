// Import the functions you need from the SDKs
import {initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9A0ToOyFYfDq6qP-myBbSW3603yKh3eU",
  authDomain: "travel-bbac0.firebaseapp.com",
  projectId: "travel-bbac0",
  storageBucket: "travel-bbac0.appspot.com",
  messagingSenderId: "656972165556",
  appId: "1:656972165556:web:fc10806606b71baebf82e1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const storage = getStorage()
