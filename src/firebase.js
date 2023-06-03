import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD0FLPsqHflG-CwxSF3GBpaS_ZKqIX25pw",
  authDomain: "bio-site-8888b.firebaseapp.com",
  projectId: "bio-site-8888b",
  storageBucket: "bio-site-8888b.appspot.com",
  messagingSenderId: "995314730416",
  appId: "1:995314730416:web:710ece96010bc6e0624275",
};

// Initialize Firebase
var app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}
export default app;
