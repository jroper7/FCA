const dbLogic = require("./firebaseLogic");
const bible = require("../bibleAPI.js");




function registerIpcHandlers(ipcMain) {

  // MISSIONS
  ipcMain.handle("db:getMissionStatement", () => dbLogic.getMissionStatement());
  ipcMain.handle("db:updateMissionStatement", (_, newStatement) => dbLogic.updateMissionStatement(newStatement));

  // EVENTS
  ipcMain.handle("db:getEvents", () => dbLogic.getEvents());
  ipcMain.handle("db:deleteEvent", (_, eventId) => dbLogic.deleteEvent(eventId));
  ipcMain.handle("db:getEventById", (_, eventId) => dbLogic.getEventById(eventId));
  ipcMain.handle("db:updateEvent", (_, eventId, updatedData) => dbLogic.updateEvent(eventId, updatedData));
  ipcMain.handle("db:createEvent", (_, eventData) => dbLogic.createEvent(eventData));
  

  // MESSAGES
  ipcMain.handle("db:sendMessage", (_, messageData) => dbLogic.sendMessage(messageData));
  ipcMain.handle("db:getMessages", () => dbLogic.getMessages());
  ipcMain.handle("db:deleteMessage", (_, messageId) => dbLogic.deleteMessage(messageId));
  // USER
  ipcMain.handle("auth:getUserId", (_, session) => dbLogic.getUserIdFromSession(session));

  // DEVOTIONALS
  ipcMain.handle("db:getDevotionals", () => dbLogic.getDevotionals());
  ipcMain.handle("db:deleteDevotional", (_, devotionalId) => dbLogic.deleteDevotional(devotionalId));
  ipcMain.handle("db:getDevotionalById", (_, devotionalId) => dbLogic.getDevotionalById(devotionalId));
  ipcMain.handle("db:updateDevotional", (_, devotionalId, updatedData) => dbLogic.updateDevotional(devotionalId, updatedData));
  ipcMain.handle("db:createDevotional", (_, devotionalData) => dbLogic.createDevotional(devotionalData));

  // BIBLE API
  ipcMain.handle("bible:getBooks", () => bible.getBooks());
  ipcMain.handle("bible:getChapters", (_, bookId) => bible.getChapters(bookId));
  ipcMain.handle("bible:getVerseText", (_, chapterId, verseNumber) => bible.getVerseText(chapterId, verseNumber));
  ipcMain.handle("bible:getChapterVerses", (_, chapterId) => bible.getChapterVerses(chapterId));
  ipcMain.handle("bible:getVerseById", (_, verseId) => bible.getVerseById(verseId))

  
 

  
}

module.exports = { registerIpcHandlers };
