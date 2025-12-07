const dbLogic = require("./firebaseLogic");


function registerIpcHandlers(ipcMain) {

  // MISSIONS
  ipcMain.handle("db:getMissionStatement", () => dbLogic.getMissionStatement());
  ipcMain.handle("db:updateMissionStatement", (_, newStatement) => dbLogic.updateMissionStatement(newStatement));

  // EVENTS
  ipcMain.handle("db:getEvents", () => dbLogic.getEvents());
  ipcMain.handle("db:deleteEvent", (_, eventId) => dbLogic.deleteEvent(eventId));
  ipcMain.handle("db:getEventById", (_, eventId) => dbLogic.getEventById(eventId));
  ipcMain.handle("db:updateEvent", (_, eventId, updatedData) => dbLogic.updateEvent(eventId, updatedData));

  // MESSAGES
  ipcMain.handle("db:sendMessage", (_, messageData) => dbLogic.sendMessage(messageData));
  ipcMain.handle("db:getMessages", () => dbLogic.getMessages());
  ipcMain.handle("db:deleteMessage", (_, messageId) => dbLogic.deleteMessage(messageId));
 
}

module.exports = { registerIpcHandlers };
