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
    const currentUser = users.find(user => user.isLoggedIn === true && user.role === 'student'); // Find logged-in user

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
    const nameElement = document.getElementById('studName' );
    

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
fetch('/school-management/components/nav bar/index-student.html')
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











document.addEventListener('DOMContentLoaded', () => {
    loadAnnouncements();
    setupForm();
});

function loadAnnouncements() {
    const announcements = JSON.parse(localStorage.getItem('announcements')) || [];

    const updateNewsList = [
        document.getElementById('updateNewa1'),
        document.getElementById('updateNews2'),
        document.getElementById('updateNews3')
    ];

    const eventList = [
        document.getElementById('event1'),
        document.getElementById('event2'),
        document.getElementById('event3')
    ];

    const noticeList = [
        document.getElementById('notice1'),
        document.getElementById('notice2'),
        document.getElementById('enotice3')
    ];

    // Clear previous entries
    updateNewsList.forEach(li => li.textContent = '');
    eventList.forEach(li => li.textContent = '');
    noticeList.forEach(li => li.textContent = '');

    announcements.forEach(announcement => {
        // Categorize based on the selected dropdown value
        if (announcement.category === "Event") {
            addAnnouncementToList(eventList, announcement);
        } else if (announcement.category === "Notice") {
            addAnnouncementToList(noticeList, announcement);
        } else if (announcement.category === "School Update") {
            addAnnouncementToList(updateNewsList, announcement);
        }
    });
}

function addAnnouncementToList(list, announcement) {
    for (let i = 0; i < list.length; i++) {
        if (!list[i].textContent) { // Find the first empty spot
            list[i].textContent = `${announcement.title}: ${announcement.content}`;
            break;
        }
    }
}

function setupForm() {
    const form = document.getElementById('announcementForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('announcementTitle').value;
        const content = document.getElementById('announcementContent').value;
        const category = document.getElementById('announcementCategory').value;

        if (title === '' || content === '' || category === '') {
            alert("Please fill all the fields.");
            return;
        }

        const newAnnouncement = { title, content, category };
        const announcements = JSON.parse(localStorage.getItem('announcements')) || [];
        announcements.push(newAnnouncement);
        localStorage.setItem('announcements', JSON.stringify(announcements));

        // Clear form inputs after submission
        form.reset();

        // Reload announcements on the page
        loadAnnouncements();
    });
}

function deleteAnnouncement(index) {
    const announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    announcements.splice(index, 1);
    localStorage.setItem('announcements', JSON.stringify(announcements));

    // Reload announcements after deletion
    loadAnnouncements();
}

function editAnnouncement(index) {
    const announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    const announcement = announcements[index];

    document.getElementById('announcementTitle').value = announcement.title;
    document.getElementById('announcementContent').value = announcement.content;
    document.getElementById('announcementCategory').value = announcement.category;

    // Remove the old announcement from the list for update
    announcements.splice(index, 1);
    localStorage.setItem('announcements', JSON.stringify(announcements));

    // Reload announcements
    loadAnnouncements();
}
