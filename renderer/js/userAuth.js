import { showAuthModal, hideAuthModal, setupAuthModal } from './authModals.js';
import { navigateTo } from '../app.js'; // make sure app.js exports navigateTo


export function renderLoginPage() {
    const authApp = document.getElementById("authContainer");
    if (!authApp) {
        console.error("No #authContainer found in DOM");
        return;
    }

    authApp.innerHTML = `
        <div class="auth-container">
            <h2>Welcome to FCA!</h2>
            <h2>Please Login</h2>
            <input type="email" id="email" placeholder="Email" />
            <input type="password" id="password" placeholder="Password" />
            <button id="loginBtn">Login</button>
            <p>Don't have an account? <a href="#" id="goSignup">Sign up</a></p>
            <div id="authError" class="auth-error"></div>
        </div>
    `;

    document.getElementById("loginBtn").addEventListener("click", handleLogin);
    document.getElementById("goSignup").addEventListener("click", renderSignupPage);

    setupAuthModal();
}


export function renderSignupPage() {
    const authApp = document.getElementById("authContainer");
    if (!authApp) return;

    authApp.innerHTML = `
        <div class="auth-container">
            <h2>Welcome to FCA!</h2>
            <h2>Please sign up</h2>
            <input type="email" id="email" placeholder="Email" />
            <input type="password" id="password" placeholder="Password" />
            <button id="signupBtn">Sign Up</button>
            <p>Already have an account? <a href="#" id="goLogin">Login</a></p>
            <div id="authError" class="auth-error"></div>
        </div>
    `;

    document.getElementById("signupBtn").addEventListener("click", handleSignup);
    document.getElementById("goLogin").addEventListener("click", renderLoginPage);

    setupAuthModal();
}


async function handleLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const result = await window.fca.auth.login(email, password);

        if (!result.role) {
            showAuthModal(result.error || "Login failed", "error");
            return;
        }

        // Persist user info globally and in localStorage
        window.currentUserId = result.id;
        window.currentUserRole = result.role;
        localStorage.setItem("currentUserId", result.id);
        localStorage.setItem("currentUserRole", result.role);

        // Hide auth container
        document.getElementById("authContainer").style.display = "none";

        // Render nav and navigate
        if (result.role === "admin") {
            renderAdminNav();
            document.querySelector(".admin-nav").style.display = "flex";
            document.querySelector(".user-nav").style.display = "none";
            navigateTo("admin/dashboard");
        } else if (result.role === "user") {
            renderUserNav();
            document.querySelector(".user-nav").style.display = "flex";
            document.querySelector(".admin-nav").style.display = "none";
            navigateTo("user/home");
        }

    } catch (err) {
        console.error("Login error:", err);
        showAuthModal("An error occurred during login.", "error");
    }
}


async function handleSignup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const result = await window.fca.auth.signup(email, password);

        if (result.success) {
            showAuthModal("Signup successful! Please login.", "success");
            renderLoginPage();
        } else {
            showAuthModal(result.error || "Signup failed", "error");
        }
    } catch (err) {
        console.error("Signup error:", err);
        showAuthModal("An error occurred during signup.", "error");
    }
}


export function renderAdminNav() {
    const nav = document.querySelector(".admin-nav .nav-links");
    if (!nav) return;
    nav.innerHTML = `
        <li><a href="#" onclick="navigateTo('admin/dashboard')">Home</a></li>
        <li><a href="#" onclick="navigateTo('admin/devotionals')">Devotionals</a></li>
        <li><a href="#" onclick="navigateTo('admin/events')">Events</a></li>
        <li><a href="#" onclick="navigateTo('admin/message')">Messages</a></li>
    `;
}

export function renderUserNav() {
    const nav = document.querySelector(".user-nav .nav-links");
    if (!nav) return;
    nav.innerHTML = `
        <li><a href="#" onclick="navigateTo('user/home')">Home</a></li>
        <li><a href="#" onclick="navigateTo('user/devotionals')">Devotionals</a></li>
        <li><a href="#" onclick="navigateTo('user/events')">Events</a></li>
        <li><a href="#" onclick="navigateTo('user/message')">Messages</a></li>
    `;
}


export async function checkLoginStatus() {
    const storedId = localStorage.getItem("currentUserId");
    const storedRole = localStorage.getItem("currentUserRole");

    window.currentUserId = storedId || null;
    window.currentUserRole = storedRole || null;

    if (!storedId || !storedRole) return { loggedIn: false };

    // Show nav
    if (storedRole === "admin") {
        document.querySelector(".admin-nav").style.display = "flex";
        document.querySelector(".user-nav").style.display = "none";
    } else if (storedRole === "user") {
        document.querySelector(".user-nav").style.display = "flex";
        document.querySelector(".admin-nav").style.display = "none";
    }

    return { loggedIn: true, role: storedRole };
}


export function logout() {
    window.currentUserId = null;
    window.currentUserRole = null;
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("currentUserRole");

    document.querySelector(".admin-nav").style.display = "none";
    document.querySelector(".user-nav").style.display = "none";

    navigateTo("login");
}
