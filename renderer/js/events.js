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


// export function initCreateEvent() {
//     const form = document.getElementById("createEventForm");
//     if (!form) return;

//     const cancelBtn = document.getElementById("cancelBtn");
//     const fileInput = document.getElementById("eventImage");
//     const uploadBox = document.querySelector(".upload-box");

//     // ---------------------------
//     // Drag & Drop Visual Behavior
//     // ---------------------------
//     uploadBox.addEventListener("click", () => fileInput.click());

//     uploadBox.addEventListener("dragover", (event) => {
//         event.preventDefault();
//         uploadBox.classList.add("drag-over");
//     });

//     uploadBox.addEventListener("dragleave", () => {
//         uploadBox.classList.remove("drag-over");
//     });

//     uploadBox.addEventListener("drop", (event) => {
//         event.preventDefault();
//         uploadBox.classList.remove("drag-over");
//         fileInput.files = event.dataTransfer.files;
//     });

//     // ------------------------
//     // Cancel Button Function
//     // ------------------------
//     cancelBtn.addEventListener("click", () => {
//         navigateTo("admin/events");
//     });

//     // ------------------------
//     // Submit / Create Event
//     // ------------------------
//     form.addEventListener("submit", async (e) => {
//         e.preventDefault();

//         const name = document.getElementById("eventName").value.trim();
//         const date = document.getElementById("eventDate").value;
//         const time = document.getElementById("eventTime").value;
//         const location = document.getElementById("eventLocation").value.trim();
//         const description = document.getElementById("eventDescription").value.trim();
//         const imageFile = fileInput.files[0] || null;

//         if (!name || !date || !time || !location) {
//             return alert("Please fill out all required fields.");
//         }

//         // Convert date to JS Date object
//         const [year, month, day] = date.split("-").map(Number);
//         const eventDate = new Date(year, month - 1, day);

//         const eventData = {
//             name,
//             date: eventDate,
//             time,
//             location,
//             description,
//             imageFile, 
//         };

//         try {
//             await window.fca.db.createEvent(eventData); // call your backend
//             console.log("Event created successfully!");
//             form.reset();
//             navigateTo("admin/events");
//         } catch (err) {
//             console.error("Error creating event:", err);
            
//         }
//     });
// }





document.addEventListener("DOMContentLoaded", () => {
    const eventId = window.currentEditId;
    if (!eventId) return;

    loadEventData(eventId);
    setupEventForm(eventId);
});