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

  },


  navigate: (view) => {
    // You can wire special functionality here later if needed
    window.navigateTo(view);
  },


  // Placeholder for Firebase or database functions later
  auth: {
    login: async (email, password) => {
      console.log("Login attempt:", email);
      // actual Firebase logic will go in renderer or a wrapper
    },
  },

  // Secure logger
  log: (message) => {
    console.log("Renderer:", message);
    
  },


});


