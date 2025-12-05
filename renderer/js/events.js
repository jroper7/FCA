export async function loadEvents() {
    const container = document.getElementById("events");
    if (!container) return;

    container.innerHTML = ""; // Clear old events
    const eventsList = await window.fca.db.getEvents();

    eventsList.forEach(event => {
        const row = renderEvent(event);
        container.appendChild(row);
    });
}



async function deleteEvent(eventId, rowElement) {
    const confirmed = confirm("Delete this event?");
    if (!confirmed) return;

    await window.fca.db.deleteEvent(eventId);
    rowElement.remove(); 
}

function goToEditPage(eventId) {
    navigateTo(`admin/edit-event`);
    window.currentEditId = eventId
}

function renderEvent(event) {
    const div = document.createElement("div");
    div.classList.add("event-row");

    const dateString = event.date?.toDate ? event.date.toDate().toLocaleDateString() : new Date(event.date.seconds * 1000).toLocaleDateString();
    div.innerHTML = `
        <span>${event.name} | ${dateString} | ${event.time} | ${event.location}</span>
        <div class="event-actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    div.querySelector(".edit-btn").addEventListener("click", () => {
        goToEditPage(event.id);
    });

    div.querySelector(".delete-btn").addEventListener("click", () => {
        deleteEvent(event.id, div);
    });

    return div;
}




