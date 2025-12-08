import { openModal, closeModal, setupModalOutsideClick } from './messageModal.js';


export async function loadUserMessages() {
    const list = document.getElementById("messagesList");
    const emptySection = document.getElementById("noMessages");

    if (!list) {
        console.warn("No messagesList element found");
        return;
    }

    try {
        let messages = await window.fca.db.getMessages();
        console.log("Fetched messages from backend:", messages);

        if (!Array.isArray(messages)) {
            console.error("Messages is not an array!", messages);
            return;
        }

        // Convert any Firestore Timestamps to JS Date
        messages = messages.map(msg => {
            let sentDate;
            if (msg.sentAt?.toDate) {
                sentDate = msg.sentAt.toDate();
            } else if (msg.sentAt?.seconds) {
                sentDate = new Date(msg.sentAt.seconds * 1000);
            } else if (msg.sentAt instanceof Date) {
                sentDate = msg.sentAt;
            } else {
                sentDate = new Date();
                console.warn("Message sentAt invalid, defaulting to now:", msg);
            }
            return { ...msg, sentAt: sentDate };
        });

        // Sort newest first
        messages.sort((a, b) => b.sentAt - a.sentAt);

        list.innerHTML = "";

        if (messages.length === 0) {
            emptySection.style.display = "block";
            console.log("No messages found");
            return;
        }

        emptySection.style.display = "none";

        // Use for...of instead of forEach for async safety
        for (const msg of messages) {
            const formatted = msg.sentAt.toLocaleDateString();
            const card = document.createElement("div");
            card.classList.add("message-card");

            let userId;
            try {
                userId = window.currentUserId;
                console.log("Message readBy:", msg.readBy, "UserId:", userId);
            } catch (err) {
                console.error("Error getting userId:", err);
            }

            console.log("Message readBy:", msg.readBy, "UserId:", userId);
            if (msg.readBy && Array.isArray(msg.readBy) && msg.readBy.includes(userId)) {
                card.classList.add('read');
            }

            
            // Use relative path for the icon
            card.innerHTML = `
                <div class="message-icon">
                    <img src="../assets/mail.png"/>
                </div>
                <div class="message-content">
                    <h2>${msg.title}</h2>
                    <p>${msg.main || msg.content}</p>
                </div>
                <div class="message-time">
                    <p>${formatted}</p>
                </div>
            `;

            // Click = open modal + mark as read
            card.addEventListener("click", async () => {
                console.log("Opening modal for message ID:", msg.id);
                await openMessage(msg, card, userId);
            });

            list.appendChild(card);
        }

    } catch (err) {
        console.error("Error loading user messages:", err);
    }
}

async function openMessage(msg, card, userId) {
    try {
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        if (!modalTitle || !modalBody) {
            console.warn("Modal elements not found");
            return;
        }

        modalTitle.textContent = msg.title;
        modalBody.textContent = msg.main || msg.content;

        openModal('messageModal');

        if (!card.classList.contains('read')) {
            card.classList.add('read');
            console.log("Marking message as read:", msg.id, "for user:", userId);
            await window.fca.db.markMessageRead(msg.id, userId);
        }
    } catch (err) {
        console.error("Error opening message modal:", err);
    }
}

// Close button
const closeBtn = document.querySelector('.close-btn');
if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal('messageModal'));
    console.log('Close button event listener added');
} else {
    console.warn("Close button not found");
}

// Click outside modal to close
setupModalOutsideClick('messageModal');
