import { editMissionStatement, loadMissionStatement } from "./js/missionStatement.js";
import { loadEvents, loadEventData, setupEventForm } from "./js/events.js";
import { setupCreateEventForm } from "./js/createEvent.js"; 
import { sendMessage, getMessages } from "./js/sendMessage.js";
import { loadDevotionals } from "./js/devotionals.js";

// User functions
import { initHomePage } from "./js/userHome.js";
import { loadAllEvents } from "./js/userEvent.js";
import { loadUserMessages } from "./js/userMessage.js";
import { loadDevotionalsPage } from "./js/userDevotionals.js";
import { setupProfilePage } from "./js/userProfile.js";

// Authentication
import { renderLoginPage} from "./js/userAuth.js";

export async function navigateTo(viewName) {
  if (typeof viewName !== "string") {
    console.error("navigateTo expected string, got:", viewName);
    return;
  }

  // Get HTML from handler.js via preload
  const html = await window.fca.readView(viewName);
  if (!html) {
    console.error("HTML not found for view:", viewName);
    return;
  }

  // Inject HTML into app container
  const appContainer = document.getElementById("app");
  if (!appContainer) {
    console.error("No #app container found in DOM");
    return;
  }
  appContainer.innerHTML = html;

  // Optionally initialize JS for each view
  switch (viewName) {
    case "login":
      renderLoginPage();
      break;
    case "user/home":
      initHomePage();
      break;
    case "user/events":
      await loadAllEvents();
      break;
    case "user/message":
      await loadUserMessages();
      break;
    case "user/devotionals":
      await loadDevotionalsPage();
      break;
    case "user/profile":
      setupProfilePage();
      break;
    case "admin/mission":
      await loadMissionStatement();
      const updateBtn = document.getElementById("updateMissionBtn");
      if (updateBtn) updateBtn.onclick = () => editMissionStatement();
      break;
    case "admin/events":
      setupCreateEventForm();
      await loadEvents();
      break;
    case "admin/edit-event":
      await loadEvents();
      await loadEventData(window.currentEditId);
      await setupEventForm(window.currentEditId);
      break;
    case "admin/message":
      await getMessages();
      await sendMessage();
      break;
    case "admin/devotionals":
      await loadDevotionals();
      break;
    case "admin/dashboard":
      break;
    case "admin/profile":
      setupProfilePage();
      break;
    default:
      console.warn("No JS to load for view:", viewName);
      break;
  }
}

// Expose navigateTo globally
window.navigateTo = navigateTo;

// Start app
navigateTo("login");
