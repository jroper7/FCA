const { db, doc, getDoc } = require("../firebase.js");

// GET MISSION DATA
// USER/ADMIN

async function getMissionStatement() {
  const docRef = doc(db, "settings", "mission");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().text;
  } else {
    console.log("No such document!");
    return null;
  }
}

module.exports = {
  getMissionStatement,
};



