const { db, doc, getDoc, getDocs, setDoc, collection, deleteDoc } = require("../firebase.js");

// GET MISSION DATA
// ADMIN
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

// USER
const updateMissionStatement = async (newStatement) => {
  const docRef = doc(db, "settings", "mission");
  await setDoc(docRef, { text: newStatement });
 
  console.log("Mission statement updated to:", newStatement);
  return newStatement;

  
}


// _____EVENTS DATA_____
//ADMIN

async function getEvents() {
  try {
    const eventsCollection = collection(db, "events");
    const eventsSnap = await getDocs(eventsCollection);
  
    const eventsList = eventsSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return eventsList;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
  
}

async function deleteEvent(eventId) {
  const eventDocRef = doc(db, "events", eventId);
  await deleteDoc(eventDocRef);
  console.log(`Event with ID ${eventId} deleted.`);

};


module.exports = {
  getMissionStatement,
  updateMissionStatement,
  getEvents,
  deleteEvent
};



