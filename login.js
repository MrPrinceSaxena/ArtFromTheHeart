// Login Authentication Script

// Default credentials (change these!)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'artfromtheheart2025';

// Storage key for session
const SESSION_KEY = 'artfromtheheart_admin_session';

// Check if user is already logged in
function checkSession() {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
        const sessionData = JSON.parse(session);
        // Check if session is still valid (24 hours)
        const now = new Date().getTime();
        if (now - sessionData.timestamp < 24 * 60 * 60 * 1000) {
            // Session valid, redirect to admin
            window.location.href = 'admin.html';
            return true;
        } else {
            // Session expired
            localStorage.removeItem(SESSION_KEY);
        }
    }
    return false;
}

// Create session
function createSession() {
    const sessionData = {
        timestamp: new Date().getTime(),
        authenticated: true
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
}

// Handle login form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    if (!loginForm) return;
    
    // Don't check session here - let the inline script in login.html handle it
    // This prevents double-checking and flickering
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        // Clear previous error
        if (errorMessage) {
            errorMessage.style.display = 'none';
            errorMessage.textContent = '';
        }
        
        // Validate credentials
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            // Create session
            createSession();
            // Small delay before redirect for better UX
            setTimeout(function() {
                window.location.href = 'admin.html';
            }, 100);
        } else {
            // Show error
            if (errorMessage) {
                errorMessage.textContent = 'Invalid username or password. Please try again.';
                errorMessage.style.display = 'block';
            }
            // Clear password field
            const passwordField = document.getElementById('password');
            if (passwordField) {
                passwordField.value = '';
                passwordField.focus();
            }
        }
    });
});

