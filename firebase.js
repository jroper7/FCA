const { initializeApp } = require("firebase/app");
const { getFirestore, doc, getDoc, setDoc, collection, addDoc } = require("firebase/firestore");

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBZRgqiOuLUfhQlFRx9CcRvx3cngaWe6lQ",
  authDomain: "fca-indy.firebaseapp.com",
  projectId: "fca-indy",
  storageBucket: "fca-indy.firebasestorage.app",
  messagingSenderId: "373482000190",
  appId: "1:373482000190:web:293a2e216895807bef666f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = {
  db,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
};
