const { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword} = require("../firebase.js");

require("dotenv").config();

// Login function
async function handleLogin(email, password) {
  // Admin check
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return { role: "admin" };
  }

  // Firebase user login
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { role: "user", uid: userCredential.user.uid };
  } catch (err) {
    return { role: null, error: err.message };
  }
}

// Signup function
async function handleSignup(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, uid: userCredential.user.uid };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

module.exports = {
  handleLogin,
  handleSignup
};
