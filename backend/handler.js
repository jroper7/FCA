const dbLogic = require("./firebaseLogic");


function registerIpcHandlers(ipcMain) {
  ipcMain.handle("db:getMissionStatement", () => dbLogic.getMissionStatement());
  // ipcMain.handle("db:setMissionStatement", (_, text) => dbLogic.setMissionStatement(text));

 
}

module.exports = { registerIpcHandlers };
