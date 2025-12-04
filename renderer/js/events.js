export async function loadEvents() {
    const eventsContainer = document.getElementById("events");
    if (!eventsContainer) {
        console.error("Events element not found");
        return;
    }

    try {
        const eventsList = await window.fca.db.getEvents();
        console.log("eventsList:", eventsList);

        // Clear previous content
        eventsContainer.innerHTML = "";

        if (!eventsList || eventsList.length === 0) {
            eventsContainer.innerText = "No events available.";
            return;
        }
        

        eventsList.forEach(event => {
            const div = document.createElement("div");
              const dateString = event.date?.toDate ? event.date.toDate().toLocaleDateString() : new Date(event.date.seconds * 1000).toLocaleDateString();
            div.innerText = `${event.name} | ${dateString} | ${event.time} | ${event.location}`;
            eventsContainer.appendChild(div);
        });

    } catch (err) {
        console.error("Error loading events:", err);
        eventsContainer.innerText = "Error loading events.";
    }
};


