import { showDeleteModal } from "./modals.js";

// Load events 
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

// delete event function
async function deleteEvent(id, rowElement) {
    showDeleteModal(async (confirmed) => {
        if (!confirmed) return;
        await window.fca.db.deleteEvent(id);
        rowElement.remove();
    });
}
// navigate to edit page
function goToEditPage(eventId) {
    navigateTo(`admin/edit-event`);
    window.currentEditId = eventId
}

// Display event row
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



export async function loadEventData(eventId) {
    const event = await window.fca.db.getEventById(eventId);
    document.getElementById("eventName").value = event.name;
    document.getElementById("eventDate").value = event.date?.toDate 
        ? event.date.toDate().toISOString().split("T")[0] 
        : new Date(event.date.seconds * 1000).toISOString().split("T")[0];
    document.getElementById("eventTime").value = event.time;
    document.getElementById("eventLocation").value = event.location;
}


export async function setupEventForm(eventId) {
    document.getElementById("cancelBtn").addEventListener("click", () => {
        navigateTo("admin/events");
    });

    document.getElementById("editEventForm").addEventListener("submit", async (e) => {
        const dateInput = document.getElementById("eventDate").value;
        const [year, month, day] = dateInput.split("-").map(Number);
        e.preventDefault();
        const updatedEvent = {
            name: document.getElementById("eventName").value,
            date: new Date(year, month - 1, day),
            time: document.getElementById("eventTime").value,
            location: document.getElementById("eventLocation").value,
        };

        await window.fca.db.updateEvent(eventId, updatedEvent);
        navigateTo("admin/events");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const eventId = window.currentEditId;
    if (!eventId) return;

    loadEventData(eventId);
    setupEventForm(eventId);
});