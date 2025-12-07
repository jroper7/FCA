export function showDeleteModal(callback) {
    // Overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.3)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = 9999;

    // Modal box
    const modal = document.createElement("div");
    modal.style.background = "#fff";
    modal.style.padding = "20px";
    modal.style.border = "1px solid #ccc";
    modal.style.borderRadius = "5px";
    modal.style.textAlign = "center";

    modal.innerHTML = `
        <p>Are you sure you want to delete?</p>
        <button id="yesBtn">Yes</button>
        <button id="noBtn">No</button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelector("#yesBtn").addEventListener("click", () => {
        callback(true);
        document.body.removeChild(overlay);
    });

    modal.querySelector("#noBtn").addEventListener("click", () => {
        callback(false);
        document.body.removeChild(overlay);
    });
}
