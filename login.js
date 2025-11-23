// Login Authentication Script

// Default credentials (change these!)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'artfromtheheart2025';

// Storage key for session
const SESSION_KEY = 'artfromtheheart_admin_session';

// Flag to prevent multiple redirects
let redirecting = false;

// Check if user is already logged in
function checkSession() {
    if (redirecting) return false;
    
    try {
        const session = localStorage.getItem(SESSION_KEY);
        if (!session) return false;
        
        const sessionData = JSON.parse(session);
        const now = new Date().getTime();
        
        // Check if session is still valid (24 hours)
        if (now - sessionData.timestamp < 24 * 60 * 60 * 1000) {
            // Session valid, redirect to admin
            redirecting = true;
            window.location.replace('admin.html'); // Use replace instead of href to prevent back button issues
            return true;
        } else {
            // Session expired
            localStorage.removeItem(SESSION_KEY);
        }
    } catch (e) {
        // Invalid session data, clear it
        localStorage.removeItem(SESSION_KEY);
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
    // Make sure the page is visible immediately
    document.body.style.opacity = '1';
    const loginBox = document.querySelector('.login-box');
    if (loginBox) {
        loginBox.style.opacity = '1';
    }
    
    // Check session only once after page is fully rendered
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(function() {
        setTimeout(function() {
            if (!checkSession()) {
                // Session check passed, form is already visible
                const loginForm = document.getElementById('loginForm');
                if (loginForm) {
                    loginForm.style.opacity = '1';
                }
            }
        }, 150);
    });
    
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (redirecting) return;
        
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
            redirecting = true;
            
            // Show loading state
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'Logging in...';
                submitBtn.disabled = true;
            }
            
            // Redirect after a brief moment
            setTimeout(function() {
                window.location.replace('admin.html');
            }, 200);
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

