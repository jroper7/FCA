require("dotenv").config();

// const API_KEY = process.env.BIBLE_API_KEY;
// const BASE = process.env.BIBLE_API_ENDPOINT;
// const BIBLE_ID = process.env.NLT_BIBLE_ID;

// console.log("BIBLE API KEY:", API_KEY ? "OK" : "MISSING");
// console.log("BASE URL:", BASE ? BASE : "MISSING");
// console.log("BIBLE ID:", BIBLE_ID ? BIBLE_ID : "MISSING");

async function getBooks() {
    // console.log("Calling getBooks...");
    try {
        const res = await fetch(`${BASE}/bibles/${BIBLE_ID}/books`, {
            headers: { "api-key": API_KEY }
        });
        const data = await res.json();
        // console.log("getBooks response:", data);
        return data;
    } catch (err) {
        console.error("getBooks error:", err);
        return null;
    }
}

async function getChapters(bookId) {
    // console.log("Calling getChapters for bookId:", bookId);
    try {
        const res = await fetch(`${BASE}/bibles/${BIBLE_ID}/books/${bookId}/chapters`, {
            headers: { "api-key": API_KEY }
        });
        const data = await res.json();
        // console.log("getChapters response:", data);
        return data;
    } catch (err) {
        console.error("getChapters error:", err);
        return null;
    }
}

async function getVerseText(chapterId, verseNumber) {
    // console.log(`Calling getVerseText for chapterId: ${chapterId}, verseNumber: ${verseNumber}`);
    try {
        const res = await fetch(`${BASE}/bibles/${BIBLE_ID}/chapters/${chapterId}/verses/${verseNumber}`, {
            headers: { "api-key": API_KEY }
        });
        const data = await res.json();
        // console.log("getVerseText response:", data);
        return data;
    } catch (err) {
        console.error("getVerseText error:", err);
        return null;
    }
}

async function getChapterVerses(chapterId) {
    try {
        // Fetch all verse IDs for the chapter
        const res = await fetch(`${BASE}/bibles/${BIBLE_ID}/chapters/${chapterId}/verses`, {
            headers: { "api-key": API_KEY }
        });
        const data = await res.json();

        const verseList = data?.data || [];

        // Fetch text for each verse
        const versesWithText = await Promise.all(
            verseList.map(async v => {
                const verseData = await getVerseById(v.id);
                return {
                    id: v.id,
                    verse: v.reference.split(':')[1],
                    text: verseData?.text || "NO TEXT"
                };
            })
        );

        return { data: versesWithText };

    } catch (err) {
        console.error("getChapterVerses error:", err);
        return { data: [] };
    }
}


// console.log("Fetching verse by ID:", verseId);
async function getVerseById(verseId) {
    try {
        // console.log("Fetching verse by ID:", verseId);

        const res = await fetch(`${BASE}/bibles/${BIBLE_ID}/verses/${verseId}`, {
            headers: { "api-key": API_KEY }
        });

        const data = await res.json();
        // console.log("Raw getVerseById response:", data);

        const verseData = data?.data;
        if (!verseData) {
            // console.log("No data found for verse:", verseId);
            return null;
        }

        const text = verseData.content;
        // console.log(`Verse ${verseId} text:`, text);

        return {
            id: verseData.id,
            reference: verseData.reference,
            text
        };

    } catch (err) {
        console.error("getVerseById error:", err);
        return null;
    }
}






module.exports = {
    getBooks,
    getChapters,
    getVerseText,
    getChapterVerses,
    getVerseById
};

