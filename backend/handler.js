const dbLogic = require("./firebaseLogic");
const bible = require("../bibleAPI.js");
const login = require("./auth.js")
const fs = require("fs");
const path = require("path");
const {app} = require("electron")


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

  // Login 
  ipcMain.handle("auth:login", (_, email, password) => login.handleLogin(email, password));
  ipcMain.handle("auth:signup", (_, email, password) => login.handleSignup(email, password));
  ipcMain.handle("auth:logout", () => ({ success: true })); // optional placeholder
 

  ipcMain.handle("readView", (event, viewName) => {
    if (typeof viewName !== "string") {
      console.error("readView called with non-string:", viewName);
      return null;
    }

    // Build absolute path
    const viewPath = path.join(app.getAppPath(), "renderer", "views", `${viewName}.html`);

    // Check file exists
    if (!fs.existsSync(viewPath)) {
      console.error("readView file not found:", viewPath);
      return null;
    }

    try {
      return fs.readFileSync(viewPath, "utf-8");
    } catch (err) {
      console.error("Failed to read view:", viewName, err);
      return null;
    }
  });
  
}

module.exports = { registerIpcHandlers };
