const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("fca", {
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
