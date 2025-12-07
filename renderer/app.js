import { editMissionStatement, loadMissionStatement } from "./js/missionStatement.js";
import { loadEvents, loadEventData, setupEventForm } from "./js/events.js";
import { setupCreateEventForm } from "./js/createEvent.js"; 
import { sendMessage, getMessages } from "./js/sendMessage.js";

// User functions
import { initHomePage } from "./js/userHome.js";




async function navigateTo(viewName) {
  const viewPath = `views/${viewName}.html`;

  try {
    const html = await fetch(viewPath).then(res => res.text());
    document.getElementById("app").innerHTML = html;

    // Switch statement to load js files
    switch(viewName) {  
      case  "user/home":
        initHomePage();
        break;
      case "admin/mission":
        await loadMissionStatement();
        const updateBtn = document.getElementById("updateMissionBtn");
        if (updateBtn) {
            updateBtn.onclick = () => editMissionStatement();
        }
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
      default:
        // No additional JS to load
        break;
    }

  } catch (err) {
    console.error("Failed to load view:", viewName, err);
  }
}

window.navigateTo = navigateTo;

// Start with login page
navigateTo("user/home");
