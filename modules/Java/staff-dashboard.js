// Utility function to get users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Fetch and inject the header with user info
fetch('/school-management/components/header/index.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
        loadCurrentUserInfo(); // Load current user info
    })
    .catch(error => console.error('Error loading header HTML:', error));

// Function to load current user info
function loadCurrentUserInfo() {
    const users = getUsers(); // Get all users from localStorage
    const currentUser = users.find(user => user.isLoggedIn === true && user.role === 'staff'); // Find logged-in user

    if (currentUser) {
        displayUserInfo(currentUser);
    } else {
        redirectToLogin();
    }
}

// Function to display the current user's info
function displayUserInfo(userInfo) {
    const usernameElement = document.getElementById('userName' );
    const userRoleElement = document.getElementById('userRole');
    const nameElement = document.getElementById('staffName' );
    

    // If the elements exist in DOM, update their content
    if (usernameElement) usernameElement.textContent = userInfo.name;
    if(userRoleElement) userRoleElement.textContent = userInfo.role;
    if (nameElement) nameElement.textContent = userInfo.name;
    
  
}

// Function to redirect to login page
function redirectToLogin() {
    window.location.href = '/school-management/authentication/register-login/index-user.html';
}

// Function to count logged-in users by role and update DOM
function countLoggedUsers() {
    const users = getUsers(); // Get all users from localStorage
    let studentCount = 0;
    let staffCount = 0;

    // Loop through users to count roles where isLoggedIn is true
    users.forEach(userInfo => {
        if (userInfo.isLoggedIn === true) {
            switch (userInfo.role) {
                case 'student':
                    studentCount++;
                    break;
                case 'staff':
                    staffCount++;
                    break;
            }
        }
    });

    // Update the DOM with the counts (add dynamic counts if needed)
    document.getElementById("studentCount").textContent = studentCount;
    document.getElementById("staffCount").textContent = staffCount;
    document.getElementById("classCount").textContent = 0;  // Static count for classes (example)
    document.getElementById("reportCount").textContent = 0;  // Static count for reports (example)

    // Display logged-in users
    displayLoggedInUsers(users); // Pass users array to the display function
}

// Function to display logged-in users' names and roles
function displayLoggedInUsers(users) {
    const userListElement = document.getElementById('loggedInUsers'); // Ensure this element exists in your HTML
    userListElement.innerHTML = ""; // Clear previous entries

    users.forEach(userInfo => {
        if (userInfo.isLoggedIn === true) {
            const userEntry = document.createElement('div');
            userEntry.textContent = `${userInfo.name} - ${userInfo.role}`;
            userListElement.appendChild(userEntry);
        }
    });
}

// Call the count function on page load
window.onload = function() {
    countLoggedUsers();
};

// Fetch and inject the navbar based on the user's role (assumed student role here)
fetch('/school-management/components/nav bar/index-staff.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navBar').innerHTML = data;
    })
    .catch(error => console.error('Error loading navbar HTML:', error));

// Toggle navigation visibility
document.getElementById("navIcon").addEventListener("click", function() {
    const navbar = document.getElementById("navBar");

    // Toggle the 'hidden' class to show or hide the div
    if (navbar.classList.contains("navbar")) {
        setTimeout(() => {
            navbar.classList.remove("navbar");
        }, 200);
    } else {
        setTimeout(() => {
            navbar.classList.add("navbar");
        }, 200);
    }
});

// Logout functionality
function logOutAcc() {
    const users = getUsers(); // Get all users from localStorage
    const currentUser = users.find(user => user.isLoggedIn === true); // Find the logged-in user

    if (currentUser) {
        currentUser.isLoggedIn = false; // Set isLoggedIn to false
        localStorage.setItem('users', JSON.stringify(users)); // Save back to localStorage

        alert("You have successfully logged out.");
        ; // Redirect to login page
    } else {
        alert('Inappropriate action detected');
        redirectToLogin();
    }
}
