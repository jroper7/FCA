export async function loadMissionStatement() {
    const missionEl = document.getElementById("missionStatement");
    if (!missionEl) return;

    try {
        const mission = await window.fca.db.getMissionStatement();
        missionEl.textContent = mission;
    } catch (err) {
        console.error("Error fetching mission statement:", err);
        missionEl.textContent = "Mission statement could not be loaded.";
    }
}

// homeHelper.js

export async function loadEvents() {
    const eventsContainer = document.getElementById("eventsList");
    if (!eventsContainer) return;

    try {
        let events = await window.fca.db.getEvents();

        events.sort((a, b) => {
            const dA = a.date?.toDate ? a.date.toDate() : new Date(a.date.seconds * 1000);
            const dB = b.date?.toDate ? b.date.toDate() : new Date(b.date.seconds * 1000);
            return dB - dA; // newest first
        });

        events.slice(0, 2).forEach(event => {
            const jsDate = event.date?.toDate ? event.date.toDate() : new Date(event.date.seconds * 1000);
            const formattedDate = jsDate.toLocaleDateString();

            const card = document.createElement("div");
            card.classList.add("event-card");

            card.innerHTML = `
                <img src="${event.image}" alt="${event.name}">
                <div class="event-info-holder">
                    <div class="event-info">
                        <h3>${event.name}</h3>
                    </div>
                    <div class="event-info-data">
                        <span>${formattedDate} | ${event.time}</span>
                    </div>
                    <div class="event-info-data">
                        <span>${event.location}</span>
                    </div>
                </div>
            `;

            eventsContainer.appendChild(card);
        });

    } catch (err) {
        console.error("Error loading events:", err);
    }
}


export async function loadMessages() {
    const list = document.getElementById("messagesList");
    if (!list) return;

    try {
        let messages = await window.fca.db.getMessages();

        // Sort newest first using sentAt timestamp
        messages.sort((a, b) => {
            const ad = a.sentAt?.toDate ? a.sentAt.toDate() : new Date(a.sentAt.seconds * 1000);
            const bd = b.sentAt?.toDate ? b.sentAt.toDate() : new Date(b.sentAt.seconds * 1000);
            return bd - ad;
        });

        messages.slice(0, 2).forEach(msg => {
            let jsDate;

            if (msg.sentAt?.toDate) jsDate = msg.sentAt.toDate();
            else if (msg.sentAt?.seconds) jsDate = new Date(msg.sentAt.seconds * 1000);
            else jsDate = new Date();

            const formattedDate = jsDate.toLocaleDateString();

            const card = document.createElement("div");
            card.classList.add("message-card");

            card.innerHTML = `
                <img src="../assets/mail.png" class="devotional-icon" />
                <div>
                    <h3>${msg.title}</h3>
                    <p>${msg.main}</p>
                </div>
                <div class="message-date">${formattedDate}</div>
            `;

            list.appendChild(card);
        });

    } catch (err) {
        console.error("Error loading messages:", err);
    }
}

export async function loadDevotionals() {
    const list = document.getElementById("user-devotionalsList");
    if (!list) return;

    try {
        // Fetch devotionals (limit to 2 for the home dashboard)
        let devotionals = await window.fca.db.devotionals.getDevotionals();

        // Sort by date, newest first
        devotionals.sort((a, b) => {
            const dA = a.date?.seconds ? new Date(a.date.seconds * 1000) : new Date();
            const dB = b.date?.seconds ? new Date(b.date.seconds * 1000) : new Date();
            return dB - dA;
        });

        // Only take the latest 2
        devotionals = devotionals.slice(0, 2);

        // Clear placeholder cards
        list.querySelectorAll('.devotional-card').forEach(c => c.remove());

        devotionals.forEach(dev => {
            const jsDate = dev.date?.seconds ? new Date(dev.date.seconds * 1000) : new Date();
            const formattedDate = jsDate.toLocaleDateString();

            const firstVerse = dev.verses[0];
            const verseText = firstVerse
                ? `${firstVerse.book} ${firstVerse.chapter}:${firstVerse.verse} - ${firstVerse.text.replace(/<[^>]+>/g,'')}`
                : '';

            const card = document.createElement("div");
            card.classList.add("devotional-card");

            card.innerHTML = `
                <img src="../assets/open-book.png" class="devotional-icon" alt="Book Icon" />
                <div>
                    <h3>${dev.title}</h3>
                    <p class="devotional-date">${formattedDate}</p>
                    <p>${verseText}</p>
                </div>
            `;

            list.appendChild(card);
        });

    } catch (err) {
        console.error("Error loading devotionals:", err);
    }
}



export function initHomePage() {
    loadMissionStatement();
    loadEvents();
    loadMessages();
    loadDevotionals();
}

document.addEventListener("DOMContentLoaded", initHomePage);
