// createEvent.js

// Upload image to Cloudinary
async function uploadImage(file) {
    console.log("uploadImage called with file:", file);

    const url = "https://api.cloudinary.com/v1_1/dnwi5jxjv/upload"; // correct Cloudinary endpoint
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "event_upload"); // unsigned preset

    try {
        const res = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        console.log("Cloudinary response:", data);

        if (!data.secure_url) {
            console.error("No secure_url in Cloudinary response!");
        }

        return data.secure_url || "";
    } catch (err) {
        console.error("Image upload failed", err);
        return "";
    }
}

function setupImageUpload() {
    const uploadBox = document.querySelector(".upload-box");
    const fileInput = document.getElementById("eventImage");

    if (!uploadBox || !fileInput) return;

    const preview = document.createElement("img");
    preview.style.maxWidth = "100%";
    preview.style.marginTop = "10px";
    uploadBox.appendChild(preview);

    let selectedFile = null; // store the file manually

    // Click to open file dialog
    uploadBox.addEventListener("click", () => fileInput.click());

    // File selected via input
    fileInput.addEventListener("change", () => {
        selectedFile = fileInput.files[0];
        console.log("File selected via input:", selectedFile);
        if (selectedFile) preview.src = URL.createObjectURL(selectedFile);
    });

    // Drag & drop
    uploadBox.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadBox.style.background = "#f0f0f0";
    });

    uploadBox.addEventListener("dragleave", () => {
        uploadBox.style.background = "transparent";
    });

    uploadBox.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadBox.style.background = "transparent";
        selectedFile = e.dataTransfer.files[0]; // save manually
        console.log("File dropped:", selectedFile);
        if (selectedFile) preview.src = URL.createObjectURL(selectedFile);
    });

    return () => selectedFile; // return a function to get the selected file
}


// Handle form submission
export function setupCreateEventForm() {

    const form = document.getElementById("createEventForm");
    const cancelBtn = document.getElementById("cancelBtn");

    if (!form) return;

    cancelBtn.addEventListener("click", () => navigateTo("admin/events"));

    const getSelectedFile = setupImageUpload();

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        // Get selected file
        const file = getSelectedFile();

        
        console.log("Selected file:", file);

        let imageUrl = "";

        if (file) {
            imageUrl = await uploadImage(file);
            console.log("Image URL from Cloudinary:", imageUrl);
        } else {
            console.log("No file selected, skipping image upload");
        }

        const dateInput = document.getElementById("eventDate").value;
        const [year, month, day] = dateInput.split("-").map(Number);

        const event = {
            name: document.getElementById("eventName").value,
            date: new Date(year, month - 1, day),
            time: document.getElementById("eventTime").value,
            location: document.getElementById("eventLocation").value,
            description: document.getElementById("eventDescription").value,
            image: imageUrl,
        };

        console.log("Event object to save:", event);

        try {
            await window.fca.db.createEvent(event);
            console.log("Event saved to Firestore");
        } catch (err) {
            console.error("Failed to save event to Firestore:", err);
        }

        navigateTo("admin/events");
    });
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded - initializing createEvent form");
    setupCreateEventForm();
});
