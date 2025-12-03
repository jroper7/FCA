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