const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const {registerIpcHandlers} = require("./backend/handler");

process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err);
});
process.on("unhandledRejection", (reason) => {
    console.error("UNHANDLED REJECTION:", reason);
});



function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#ffffff",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      
    }
  });

  win.loadFile("renderer/index.html");
  win.webContents.on("crashed", () => {
    console.error("🔴 RENDERER CRASHED");
  });

  // Optional: Open devtools during development
  win.webContents.openDevTools();

  win.webContents.on("did-fail-load", (e, code, desc) => {
    console.error("❌ PAGE FAILED TO LOAD:", code, desc);
  });

}



app.whenReady().then(() => {
  registerIpcHandlers(ipcMain);
  createWindow();
  

  app.on("activate", () => {
    // Recreate window on macOS when clicking dock icon
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
