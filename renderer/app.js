import { loadMissionStatement } from "./js/missionStatement.js";

async function navigateTo(viewName) {
  const viewPath = `views/${viewName}.html`;

  try {
    const html = await fetch(viewPath).then(res => res.text());
    document.getElementById("app").innerHTML = html;

    // Switch statement to load js files
    switch(viewName) {  
      case  "user/home":
        await loadMissionStatement();
        break;
      case "admin/mission":
        await loadMissionStatement();
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
navigateTo("admin/dashboard");
