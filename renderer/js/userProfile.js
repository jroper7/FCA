export function setupProfilePage() {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            // Clear login info
            localStorage.removeItem("currentUserId");
            localStorage.removeItem("currentUserRole");
            window.currentUserId = null;
            window.currentUserRole = null;

            // Hide navs
            const adminNav = document.querySelector(".admin-nav");
            const userNav = document.querySelector(".user-nav");
            if (adminNav) adminNav.style.display = "none";
            if (userNav) userNav.style.display = "none";

            // Redirect to login
            navigateTo("login");
        });
    }
}
