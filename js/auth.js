/* 
 * Browser-only demo authentication.
 * NOT production secure.
 * Use fictional credentials.
 */

// ========================================
// 1. STORAGE KEYS
// ========================================

const USERS_KEY = 'sneaker_demo_users_v2';
const SESSION_KEY = 'sneaker_demo_session_v2';


// ========================================
// 2. GET REGISTERED USERS
// ========================================

const getUsers = () => {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
        return [];
    }
};


// ========================================
// 3. GET CURRENT LOGGED-IN USER
// ========================================

const currentUser = () => {
    try {
        return JSON.parse(sessionStorage.getItem(SESSION_KEY));
    } catch {
        return null;
    }
};


// ========================================
// 4. EMAIL VALIDATION
// ========================================

const emailValid = (s) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
};


// ========================================
// 5. ESCAPE HTML CHARACTERS
// ========================================

const escapeText = (s) => {
    return String(s).replace(/[&<>"']/g, (c) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[c]));
};


// ========================================
// 6. DISPLAY ERROR MESSAGES
// ========================================

function showError(id, message) {
    const el = document.getElementById(id);

    if (el) {
        el.textContent = message;
        el.hidden = !message;
    }
}


// ========================================
// 7. HASH PASSWORD
// ========================================

async function hashPassword(password, salt) {
    const bytes = new TextEncoder().encode(salt + ':' + password);

    const digest = await crypto.subtle.digest(
        'SHA-256',
        bytes
    );

    return Array.from(new Uint8Array(digest))
        .map((x) => x.toString(16).padStart(2, '0'))
        .join('');
}


// ========================================
// 8. REGISTER NEW USER
// ========================================

async function register(event) {
    event.preventDefault();

    const f = event.currentTarget;

    const name = f.elements.name.value.trim();
    const email = f.elements.email.value.trim().toLowerCase();
    const password = f.elements.password.value;
    const confirm = f.elements.confirm.value;

    // Validate full name
    if (name.length < 2) {
        return showError(
            'form-error',
            'Enter your full name (at least 2 characters).'
        );
    }

    // Validate email
    if (!emailValid(email)) {
        return showError(
            'form-error',
            'Enter a valid email address.'
        );
    }

    // Validate password length
    if (password.length < 8) {
        return showError(
            'form-error',
            'Use at least 8 characters for your demo password.'
        );
    }

    // Confirm password
    if (password !== confirm) {
        return showError(
            'form-error',
            'Passwords do not match.'
        );
    }

    // Check whether account already exists
    if (getUsers().some((u) => u.email === email)) {
        return showError(
            'form-error',
            'This demo account already exists.'
        );
    }

    try {
        // Generate salt and hash password
        const salt = crypto.randomUUID();
        const hash = await hashPassword(password, salt);

        // Save registered user
        localStorage.setItem(
            USERS_KEY,
            JSON.stringify([
                ...getUsers(),
                {
                    name,
                    email,
                    salt,
                    hash
                }
            ])
        );

        // Create user session
        sessionStorage.setItem(
            SESSION_KEY,
            JSON.stringify({
                name,
                email
            })
        );

        // Redirect after registration
        location.href =
            new URLSearchParams(location.search).get('next') === 'checkout'
                ? 'checkout.html'
                : 'index.html';

    } catch {
        showError(
            'form-error',
            'Could not save demo account. Please use localhost or HTTPS.'
        );
    }
}


// ========================================
// 9. LOGIN USER
// ========================================

async function login(event) {
    event.preventDefault();

    const f = event.currentTarget;

    const email = f.elements.email.value.trim().toLowerCase();
    const password = f.elements.password.value;

    // Find registered user
    const u = getUsers().find((x) => x.email === email);

    // Validate credentials
    if (!u || await hashPassword(password, u.salt) !== u.hash) {
        return showError(
            'form-error',
            'Incorrect email or password.'
        );
    }

    // Save logged-in user session
    sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
            name: u.name,
            email: u.email
        })
    );

    // Redirect after login
    location.href =
        new URLSearchParams(location.search).get('next') === 'checkout'
            ? 'checkout.html'
            : 'index.html';
}


// ========================================
// 10. LOGOUT USER
// ========================================

function logout() {
    sessionStorage.removeItem(SESSION_KEY);

    location.href = 'index.html';
}


// ========================================
// 11. UPDATE NAVIGATION AFTER LOGIN
// ========================================

function renderAuth() {
    const el = document.getElementById('auth-links');

    if (!el) {
        return;
    }

    const u = currentUser();

    if (u) {
        // Show user greeting and logout button
        el.innerHTML = `
            <span class="greeting">
                Hi, ${escapeText(u.name.split(' ')[0])}
            </span>

            <button class="text-nav" onclick="logout()">
                Log out ↗
            </button>
        `;
    } else {
        // Show login and registration links
        el.innerHTML = `
            <a href="login.html">Log in</a>

            <a class="nav-signup" href="register.html">
                Sign up ↗
            </a>
        `;
    }
}


// ========================================
// 12. INITIALIZE AUTHENTICATION
// ========================================

document.addEventListener(
    'DOMContentLoaded',
    renderAuth
);