const { contextBridge, ipcRenderer } = require("electron");

// const path = require("path");


contextBridge.exposeInMainWorld("fca", {

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

  navigate: (view) => {
    
    window.navigateTo(view);
  },


  
  auth: {
    
    login: async (email, password) => {
      console.log("Login attempt:", email);
    },
    getUserId: () => ipcRenderer.invoke("auth:getUserId"),
    
  },

  // Secure logger
  log: (message) => {
    console.log("Renderer:", message);
    
  },


});


