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


