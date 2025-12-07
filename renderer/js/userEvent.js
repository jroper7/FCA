export async function loadAllEvents() {
    const list = document.getElementById("eventsFullList");
    const noEventsMsg = document.getElementById("noEventsMessage");
    if (!list) return;

    try {
        let events = await window.fca.db.getEvents();
        // events = [];     

        events.sort((a, b) => {
            const adate = a.date?.toDate ? a.date.toDate() : new Date(a.date.seconds * 1000);
            const bdate = b.date?.toDate ? b.date.toDate() : new Date(b.date.seconds * 1000);
            return adate - bdate;
        });

        if (events.length === 0) {
            noEventsMsg.style.display = "block";
            return;
        }

        events.forEach(event => {
            let jsDate;

            if (event.date?.toDate) jsDate = event.date.toDate();
            else if (event.date?.seconds) jsDate = new Date(event.date.seconds * 1000);
            else jsDate = new Date();

            const formattedDate = jsDate.toLocaleDateString();

            const card = document.createElement("div");
            card.classList.add("event-card");

            card.innerHTML = `
                <div class="event-image">
                    <img src="${event.image}" />
                </div>
                <div class="event-details">
                    <h2>${event.name}</h2>
                    <p>${event.description}</p>
                    <div class="event-meta">
                        <img src="../assets/clock.png" class="icon" />
                        <p>${formattedDate} | ${event.time}</p>
                    </div>
                    <div class="event-meta">
                        <img src="../assets/location.png" class="icon" />
                        <p>${event.location}</p>
                    </div>
                </div>
            `;

            list.appendChild(card);
        });

    } catch (err) {
        console.error("Error loading all events:", err);
    }
}
