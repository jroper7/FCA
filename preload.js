const { contextBridge, ipcRenderer } = require("electron");


// const path = require("path");
console.log("PRELOAD LOADED");

process.on("uncaughtException", (err) => {
  console.error("PRELOAD UNCAUGHT EXCEPTION:", err);
});
process.on("unhandledRejection", (reason) => {
    console.error("UNHANDLED REJECTION:", reason);
});



contextBridge.exposeInMainWorld("fca", {

    readView: async (viewName) => {
    if (typeof viewName !== "string") {
      console.error("readView expected string, got:", viewName);
      return null;
    }
    return await ipcRenderer.invoke("readView", viewName);
  },

  // Navigation helper
  navigate: (view) => window.navigateTo(view),

   db: {
    
    // Mission Statement
    getMissionStatement: () => ipcRenderer.invoke("db:getMissionStatement"),
    updateMissionStatement: (text) => ipcRenderer.invoke("db:updateMissionStatement", text),

    // events 
    getEvents: () => ipcRenderer.invoke("db:getEvents"),
    deleteEvent: (eventId) => ipcRenderer.invoke("db:deleteEvent", eventId),
    getEventById: (eventId) => ipcRenderer.invoke("db:getEventById", eventId),
    updateEvent: (eventId, updatedData) => ipcRenderer.invoke("db:updateEvent", eventId, updatedData),
    createEvent: (eventData) => ipcRenderer.invoke("db:createEvent", eventData),

    // messages
    sendMessage: (messageData) => ipcRenderer.invoke("db:sendMessage", messageData),
    getMessages: () => ipcRenderer.invoke("db:getMessages"),
    deleteMessage: (messageId) => ipcRenderer.invoke("db:deleteMessage", messageId),
    markMessageRead: (id, userId) => ipcRenderer.invoke("db:markMessageRead", id, userId),

    devotionals: {
        getDevotionals: () => ipcRenderer.invoke("db:getDevotionals"),
        deleteDevotional: (devotionalId) => ipcRenderer.invoke("db:deleteDevotional", devotionalId),
        getDevotionalById: (devotionalId) => ipcRenderer.invoke("db:getDevotionalById", devotionalId),
        updateDevotional: (devotionalId, updatedData) => ipcRenderer.invoke("db:updateDevotional", devotionalId, updatedData),
        createDevotional: (devotionalData) => ipcRenderer.invoke("db:createDevotional", devotionalData)
    },

  },

  bible: {
      getBooks: () => ipcRenderer.invoke("bible:getBooks"),
      getChapters: (bookId) => ipcRenderer.invoke("bible:getChapters", bookId),
      getVerseText: (chapterId, verseNumber) => ipcRenderer.invoke("bible:getVerseText", chapterId, verseNumber),
      getChapterVerses: (chapterId) => ipcRenderer.invoke("bible:getChapterVerses", chapterId),
      getVerseById: (verseId) => ipcRenderer.invoke("bible:getVerseById", verseId)
  },

  


  
  auth: {
        login: (email, password) => ipcRenderer.invoke("auth:login", email, password),
        signup: (email, password) => ipcRenderer.invoke("auth:signup", email, password),
        logout: () => ipcRenderer.invoke("auth:logout")
  },

  

  // Secure logger
  log: (message) => {
    console.log("Renderer:", message);
    
  },


});


