const { get } = require("jquery");
const { db, doc, getDoc, getDocs, setDoc, collection, deleteDoc } = require("../firebase.js");

// MISSIONS
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


// _____EVENTS_____
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

async function getEventById(eventId) {
  const docRef = doc(db, "events", eventId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return docSnap.data();
}

async function updateEvent(eventId, updatedData) {
  const docRef = doc(db, "events", eventId);
  await setDoc(docRef, updatedData, { merge: true });
  console.log(`Event ${eventId} updated.`);
}

async function createEvent(eventData) {
  const eventsCollection = collection(db, "events");
  const newEventRef = doc(eventsCollection);
  await setDoc(newEventRef, eventData);
  console.log("Event created:", eventData);

}


// ____MESSAGES____


async function sendMessage(messageData) {
  const messagesCollection = collection(db, "announcements");
  const newMessageRef = doc(messagesCollection);
  await setDoc(newMessageRef, messageData);
  console.log("Message sent:", messageData);
}

async function getMessages() {
  const messagesCollection = collection(db, "announcements");
  const messagesSnap = await getDocs(messagesCollection);
  
  try {
    const messagesList = messagesSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })); 
    return messagesList;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }

}

async function deleteMessage(messageId) {
  const eventDocRef = doc(db, "announcements", messageId);
  await deleteDoc(eventDocRef);
  console.log(`Message with ID ${messageId} deleted.`);

};



module.exports = {
  getMissionStatement,
  updateMissionStatement,
  getEvents,
  deleteEvent,
  getEventById, 
  updateEvent,
  createEvent,
  sendMessage,
  getMessages,
  deleteMessage
};



