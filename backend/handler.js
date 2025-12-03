const dbLogic = require("./firebaseLogic");


function registerIpcHandlers(ipcMain) {
  ipcMain.handle("db:getMissionStatement", () => dbLogic.getMissionStatement());
  ipcMain.handle("db:updateMissionStatement", (_, newStatement) => dbLogic.updateMissionStatement(newStatement));

 
}

module.exports = { registerIpcHandlers };
