/// Function to handle user logout
function logout() {
    let username = null;

    // Find the logged-in user by checking if 'isLoggedIn' is true in localStorage
    const allKeys = Object.keys(localStorage);
    for (let key of allKeys) {
        const storedUser = JSON.parse(localStorage.getItem(key));
        if (storedUser && storedUser.isLoggedIn === true) {
            username = key;  // This is the logged-in user's username
            break;
        }
    }

    // If a logged-in user is found, update their 'isLoggedIn' status
    if (username) {
        const user = JSON.parse(localStorage.getItem(username));
        user.isLoggedIn = false;  // Set 'isLoggedIn' to false

        // Update localStorage with the new state
        localStorage.setItem(username, JSON.stringify(user));

        console.log(`User ${username} has been logged out, 'isLoggedIn' set to false.`);
    } else {
        console.error("No logged-in user found.");
    }

    // Redirect to the sign-in page
    window.location.href = '/school-management/authentication/register-login/index.html';
}

// Function to redirect the user back to the dashboard
function stay() {
    let username = null;

    // Find the logged-in user by checking if 'isLoggedIn' is true in localStorage
    const allKeys = Object.keys(localStorage);
    for (let key of allKeys) {
        const storedUser = JSON.parse(localStorage.getItem(key));
        if (storedUser && storedUser.isLoggedIn === true) {
            username = key;  // This is the logged-in user's username
            break;
        }
    }

    // Check if the username was found and redirect to the appropriate dashboard based on the user's role
    if (username) {
        const storedUser = JSON.parse(localStorage.getItem(username));
        if (storedUser && storedUser.isLoggedIn) {
            switch (storedUser.role) {
                case "student":
                    window.location.href = "/school-management/modules/student/dashboard.html";
                    break;
                case "staff":
                    window.location.href = "/school-management/modules/staff/dashboard.html";
                    break;
                case "admin":
                    window.location.href = "/school-management/modules/admin/dashboard.html";
                    break;
                default:
                    alert("Role not recognized. Please contact support.");
                    window.location.href = "/school-management/authentication/register-login/index.html";
            }
        } else {
            alert("You are not logged in. Please sign in again.");
            window.location.href = "/school-management/authentication/register-login/index.html";
        }
    } else {
        alert("Session expired. Please sign in again.");
        window.location.href = '/school-management/authentication/register-login/index.html';
    }
}
