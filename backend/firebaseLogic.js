const { db, doc, getDoc, setDoc } = require("../firebase.js");

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

const updateMissionStatement = async (newStatement) => {
  const docRef = doc(db, "settings", "mission");
  await setDoc(docRef, { text: newStatement });
  return newStatement;

  console.log("Mission statement updated to:", newStatement);
}

module.exports = {
  getMissionStatement,
  updateMissionStatement
};



