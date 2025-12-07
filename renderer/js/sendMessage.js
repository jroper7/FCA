import { showDeleteModal } from "./modals.js";

export function sendMessage() {
    const form = document.getElementById("sendMessageForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const title = document.getElementById("msgTitle").value.trim();
        const main = document.getElementById("msgBody").value.trim();
        if (!main) return alert("Message body cannot be empty.");

        await window.fca.db.sendMessage({ title, main, sentAt: new Date(), readBy: {} });
        form.reset();
        await getMessages(); // refresh
    });

    const cancelBtn = document.getElementById("cancelBtn");
    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => navigateTo("admin/dashboard"));
    }
}

export async function getMessages() {
    const container = document.getElementById("messagesList");
    if (!container) return;

    container.innerHTML = ""; // clear old messages

    const messages = await window.fca.db.getMessages();
    messages.forEach(msg => container.appendChild(renderMessageRow(msg)));

    deleteMessage(); // attach listener once
}

function renderMessageRow(msg) {
    const row = document.createElement("div");
    row.classList.add("message-row");
    row.dataset.id = msg.id; // for container listener

    let dateStr = msg.sentAt?.seconds != null
        ? new Date(msg.sentAt.seconds * 1000).toLocaleString()
        : "Invalid date";

    row.innerHTML = `
        <div class="message-info">
            <span class="title">${msg.title || "Untitled"}</span>
            <span class="preview"> - ${(msg.main || "").substring(0, 40)}...</span>
            <span class="time">Time Sent: ${dateStr}</span>
        </div>
        <button class="delete-btn">Delete</button>
    `;


    
    return row;
}

let deleteAttached = false;

export function deleteMessage() {
    const container = document.getElementById("messagesList");
    if (!container || deleteAttached) return; // attach only once

    container.addEventListener("click", async (e) => {
      if (!e.target.classList.contains("delete-btn")) return;

      const row = e.target.closest(".message-row");
      const id = row.dataset.id;
      if (!id) return;

      showDeleteModal(async (confirmed) => {
        if (!confirmed) return;
        await window.fca.db.deleteMessage(id);
        row.remove();
      });

    });

    deleteAttached = true;
}
