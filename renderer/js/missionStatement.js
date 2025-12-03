import { doc } from "firebase/firestore";

export async function loadMissionStatement() {
    const ms = document.getElementById("missionStatement");

    if (!ms) {
        console.error("Mission statement element not found");
        return;
    }

    try {
        const text = await window.fca.db.getMissionStatement();
        ms.innerText = text || "No mission statement available.";

    } catch (err) {
        console.error("Error loading mission statement:", err);     
        ms.innerText = "Error loading mission statement.";
    }
}

export async function editMissionStatement(newStatement) {
    const missionInput = document.getElementById("missionInput");
    if (!updateMissionBtn) {
        console.error("Update button not found");
        return;
    } else {

    }

    try {
        await window.fca.db.updateMissionStatement(newStatement);
        console.log("Mission statement updated successfully.");
    }
    catch (err) {
        console.error("Error updating mission statement:", err);
    }
}