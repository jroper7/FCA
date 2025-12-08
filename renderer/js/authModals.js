export function showAuthModal(message, type = "error") {
  const modal = document.getElementById("authModal");
  const msg = document.getElementById("authModalMessage");
  if (!modal || !msg) return;

  msg.textContent = message;
  msg.className = type === "success" ? "auth-success" : "auth-error";

  modal.classList.remove("hidden");
}

export function hideAuthModal() {
  const modal = document.getElementById("authModal");
  if (modal) modal.classList.add("hidden");
}

export function setupAuthModal() {
  const closeBtn = document.getElementById("authModalClose");
  const modal = document.getElementById("authModal");

  if (closeBtn) closeBtn.addEventListener("click", hideAuthModal);

  if (modal) {
    // Clicking outside the modal content closes it
    modal.addEventListener("click", (e) => {
      if (e.target === modal) hideAuthModal();
    });
  }
}
