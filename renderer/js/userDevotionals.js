export async function loadDevotionalsPage() {
    const list = document.getElementById("devotionalsList");
    const emptySection = document.getElementById("noDevotionals");
    const likedList = document.getElementById("likedDevotionalsList");

    // Keep track of liked devotionals (in-memory for now)
    const likedDevotionals = [];

    if (!list || !likedList) return;

    try {
        let devotionals = await window.fca.db.devotionals.getDevotionals();

        if (!Array.isArray(devotionals) || devotionals.length === 0) {
            emptySection.style.display = "block";
            return;
        }

        emptySection.style.display = "none";

        list.innerHTML = "";
        likedList.innerHTML = "";

        devotionals.forEach(dev => {
            const jsDate = dev.date?.seconds ? new Date(dev.date.seconds * 1000) : new Date();
            const formattedDate = jsDate.toLocaleDateString();

            // Combine all verses
            const verseText = dev.verses.map(v => `${v.book} ${v.chapter}:${v.verse} - ${v.text.replace(/<[^>]+>/g,'')}`).join(' ');

            const card = document.createElement("div");
            card.classList.add("devotional-card");

            card.innerHTML = `
                <div class="devotional-content">
                    <h2>${dev.title}</h2>
                    <p class="devotional-date">${formattedDate}</p>
                    <p>${verseText}</p>
                </div>
                <div class="devotional-like">&#9825;</div>
            `;

            const heart = card.querySelector(".devotional-like");
            heart.addEventListener("click", () => {
                heart.classList.toggle("liked");
                if (!likedDevotionals.includes(dev)) {
                    likedDevotionals.push(dev);
                    renderLikedDevotionals(likedDevotionals, likedList);
                } else {
                    // Remove from liked if clicked again
                    const index = likedDevotionals.indexOf(dev);
                    if (index > -1) likedDevotionals.splice(index, 1);
                    renderLikedDevotionals(likedDevotionals, likedList);
                }
            });

            list.appendChild(card);
        });

    } catch (err) {
        console.error("Error loading devotionals:", err);
    }
}

// Render liked devotionals
function renderLikedDevotionals(devotionals, container) {
    container.innerHTML = "";
    devotionals.forEach(dev => {
        const jsDate = dev.date?.seconds ? new Date(dev.date.seconds * 1000) : new Date();
        const formattedDate = jsDate.toLocaleDateString();
        const verseText = dev.verses.map(v => `${v.book} ${v.chapter}:${v.verse} - ${v.text.replace(/<[^>]+>/g,'')}`).join(' ');

        const card = document.createElement("div");
        card.classList.add("devotional-card");

        card.innerHTML = `
            <div class="devotional-content">
                <h2>${dev.title}</h2>
                <p class="devotional-date">${formattedDate}</p>
                <p>${verseText}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", loadDevotionalsPage);
