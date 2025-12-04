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


export async function editMissionStatement() {
    const missionInput = document.getElementById("missionInput");
    if (!missionInput) {
        return console.error("Update input not found");   
    }

    const newStatement = missionInput.value;


    try {
        await window.fca.db.updateMissionStatement(newStatement);
        console.log("Mission statement updated successfully.");

        const ms = document.getElementById("missionStatement");
        if (ms) ms.innerText = newStatement;
        if (missionInput) missionInput.value = text || ""; 
    }
    catch (err) {
        console.error("Error updating mission statement:", err);
    }
}

const updateBtn = document.getElementById("updateMissionBtn");
if(updateBtn) {
    updateBtn.addEventListener("click", async () => {
        console.log("Button clicked → updating mission");
        await editMissionStatement();
    }); 
}