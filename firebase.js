const { initializeApp } = require("firebase/app");
const { getFirestore, doc, getDoc, getDocs, setDoc, collection, addDoc } = require("firebase/firestore");

require("dotenv").config();

// Firebase config
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("FIREBASE CONFIG:", firebaseConfig);

module.exports = {
  db,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  addDoc,
};
