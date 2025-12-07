export function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.style.display = "block";
}

export function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.style.display = "none";
}

export function setupModalOutsideClick(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal(modalId);
    });
}