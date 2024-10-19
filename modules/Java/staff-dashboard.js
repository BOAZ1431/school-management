
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}


fetch('/school-management/components/header/index.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
        loadCurrentUserInfo(); 
    })
    .catch(error => console.error('Error loading header HTML:', error));


function loadCurrentUserInfo() {
    const users = getUsers(); 
    const currentUser = users.find(user => user.isLoggedIn === true && user.role === 'staff'); 

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

// Function to count logged-in users by role
function countLoggedUsers() {
    const users = getUsers(); 
    let studentCount = 0;
    let staffCount = 0;

   //loop to count logged in users(isLoggedin=true)
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
    document.getElementById("classCount").textContent = 0;  // 
    document.getElementById("reportCount").textContent = 0;  // 

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


window.onload = function() {
    countLoggedUsers();
};


fetch('/school-management/components/nav bar/index-staff.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navBar').innerHTML = data;
    })
    .catch(error => console.error('Error loading navbar HTML:', error));

// Toggle navigation visibility..
document.getElementById("navIcon").addEventListener("click", function() {
    const navbar = document.getElementById("navBar");
    const navIcon = document.getElementById("navic"); 

    
    navbar.classList.toggle("visible");

  
    if (navIcon.classList.contains("fa-bars")) {
        navIcon.classList.remove("fa-bars");  
        navIcon.classList.add("fa-times");   
    } else {
        navIcon.classList.remove("fa-times"); 
        navIcon.classList.add("fa-bars");     
    }
});


 //logout func.
function logOutAcc() {
    const users = getUsers(); 
    const currentUser = users.find(user => user.isLoggedIn === true); 
    if (currentUser) {
        currentUser.isLoggedIn = false; 
        localStorage.setItem('users', JSON.stringify(users)); 

        alert("You have successfully logged out.");
        redirectToLogin(); 
    } else {
        alert('Inappropriate action detected');
        redirectToLogin();
    }
}
