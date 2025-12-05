const dbLogic = require("./firebaseLogic");


function registerIpcHandlers(ipcMain) {
  ipcMain.handle("db:getMissionStatement", () => dbLogic.getMissionStatement());
  ipcMain.handle("db:updateMissionStatement", (_, newStatement) => dbLogic.updateMissionStatement(newStatement));

  ipcMain.handle("db:getEvents", () => dbLogic.getEvents());
  ipcMain.handle("db:deleteEvent", (_, eventId) => dbLogic.deleteEvent(eventId));
 
}

module.exports = { registerIpcHandlers };
