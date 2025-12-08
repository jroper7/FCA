let selectedVerses = [];

// Helper function
function formatDate(timestamp) {
    if (!timestamp || typeof timestamp !== "object" || !("seconds" in timestamp)) return "Invalid Date";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString(); // you can format differently if you want
}


function renderSelectedVerses() {
    const list = document.getElementById("selectedVerses");
    list.innerHTML = "";

    selectedVerses.forEach((v, i) => {
        const item = document.createElement("div");
        item.classList.add("verse-item");
        // Use the text we already fetched
        item.innerHTML = `
            <span>${v.book} ${v.chapter}:${v.verse} - ${v.text.replace(/<[^>]+>/g,'')}</span>
            <button data-index="${i}" class="remove-verse">Remove</button>
        `;
        list.appendChild(item);

        item.querySelector(".remove-verse").onclick = () => {
            selectedVerses.splice(i, 1);
            renderSelectedVerses();
        };
    });
}



function setupAddVerse() {
    const addBtn = document.getElementById("addVerseBtn");
    addBtn.onclick = async () => {
        const bookSelect = document.getElementById("bookSelect");
        const chapterSelect = document.getElementById("chapterSelect");
        const verseSelect = document.getElementById("verseSelect");

        const bookName = bookSelect.selectedOptions[0]?.text;
        const chapter = chapterSelect.selectedOptions[0]?.text;
        const verseId = verseSelect.value;

        if (!bookName || !chapter || !verseId) return alert("Fill all fields!");

        // Fetch the full verse text only now
        const verseFull = await window.fca.bible.getVerseById(verseId);
        console.log("RAW VERSE TEXT:", verseFull?.text);
        selectedVerses.push({
            book: bookName,
            chapter,
            verse: window.loadedVerses.find(v => v.id === verseId).verse,
            text: verseFull?.text.replace(/<[^>]+>/g, '').replace(/^\d+\s*/, '').trim()
        });

        renderSelectedVerses();
    };

}


async function loadBooks() {
    const bookSelect = document.getElementById("bookSelect");
    const chapterSelect = document.getElementById("chapterSelect");
    const verseSelect = document.getElementById("verseSelect");

    // Initially disable chapter and verse
    chapterSelect.disabled = true;
    verseSelect.disabled = true;

    const booksData = await window.fca.bible.getBooks();
    const books = booksData?.data || [];

    bookSelect.innerHTML = `<option value="">Select Book</option>`;
    books.forEach(b => {
        const opt = document.createElement("option");
        opt.value = b.id;
        opt.textContent = b.name;
        bookSelect.appendChild(opt);
    });

    // When book changes
    bookSelect.onchange = async () => {
        const bookId = bookSelect.value;

        // Enable chapter if a book is selected
        chapterSelect.disabled = !bookId;
        chapterSelect.innerHTML = `<option value="">Select Chapter</option>`;
        verseSelect.disabled = true;
        verseSelect.innerHTML = `<option value="">Select Verse</option>`;

        if (!bookId) return;

        const chaptersData = await window.fca.bible.getChapters(bookId);
        const chapters = chaptersData?.data || [];

        chapters.forEach(c => {
            if (c.number !== "intro") {
                const opt = document.createElement("option");
                opt.value = c.id;
                opt.textContent = c.number;
                chapterSelect.appendChild(opt);
            }
        });
    };

    // When chapter changes
    chapterSelect.onchange = async () => {
        const chapterId = chapterSelect.value;
        verseSelect.disabled = !chapterId;
        verseSelect.innerHTML = `<option value="">Select Verse</option>`;
        if (!chapterId) return;

        try {
            // Fetch only the list of verses (numbers, IDs)
            const versesData = await window.fca.bible.getChapterVerses(chapterId);
            const versesList = versesData?.data || [];

            if (versesList.length === 0) {
                verseSelect.innerHTML = `<option value="">No verses found</option>`;
                return;
            }

            // Save verse numbers locally
            window.loadedVerses = versesList.map(v => ({
                id: v.id,
                verse: v.verse || v.reference?.split(':')[1] || "?"
            }));

            // Populate dropdown with numbers only
            verseSelect.innerHTML = `<option value="">Select Verse</option>`;
            window.loadedVerses.forEach(v => {
                const opt = document.createElement("option");
                opt.value = v.id;
                opt.textContent = v.verse;
                verseSelect.appendChild(opt);
            });

            verseSelect.disabled = false;

        } catch (err) {
            console.error("Error loading verses:", err);
            verseSelect.innerHTML = `<option value="">Error loading verses</option>`;
        }
    };

}



function setupDevotionalForm() {
    const form = document.getElementById("createDevotionalForm");
    form.onsubmit = async (e) => {
        e.preventDefault();

        const title = document.getElementById("devotionalTitle").value;
        const date = document.getElementById("devotionalDate").value;

        if (!title || !date || selectedVerses.length === 0) return console.log("Fill all fields!");

        await window.fca.db.devotionals.createDevotional({
            title,
            date: new Date(date),
            verses: selectedVerses
        });

        selectedVerses = [];
        renderSelectedVerses();
        form.reset();
        renderDevotionalList();
    };
}


async function renderDevotionalList() {
    const list = document.getElementById("devotionalsList");
    list.innerHTML = "";

    const devotionals = await window.fca.db.devotionals.getDevotionals();
    devotionals.sort((a, b) => new Date(a.date) - new Date(b.date));

    devotionals.forEach(dev => {
        console.log("RAW DATE VALUE:", dev.date);
        console.log("TYPE:", typeof dev.date);
        const card = document.createElement("div");
        card.classList.add("devotional-card");

        const versesHTML = dev.verses.map(v => `
            <div class="verse-line">
                <strong>${v.book} ${v.chapter}:${v.verse}</strong>
                <p>${v.text}</p>
            </div>
        `).join("");

        card.innerHTML = `
            <div class="devotional-header">
                <h2 class="dev-title">${dev.title}</h2>
                <p class="dev-date">${formatDate(dev.date)}</p>
            </div>

            <div class="dev-verses">
                ${versesHTML}
            </div>

            <button class="deleteBtn" data-id="${dev.id}">Delete</button>
        `;


        list.appendChild(card);

        card.querySelector(".deleteBtn").onclick = async () => {
            await window.fca.db.devotionals.deleteDevotional(dev.id);
            renderDevotionalList();
        };
    });

    
}


export async function loadDevotionals() {
    renderSelectedVerses();
    setupAddVerse();
    setupDevotionalForm();
    await loadBooks();
    renderDevotionalList();
}
