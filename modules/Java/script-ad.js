fetch('/school-management/components/header/index.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;

        // Retrieve user info using the correct localStorage key pattern
        const allKeys = Object.keys(localStorage);
        let userInfo = null;

        // Loop through localStorage to find the correct userInfo
        allKeys.forEach(key => {
            if (key.includes('userInfo')) {
                userInfo = JSON.parse(localStorage.getItem(key));
            }
        });

        // If userInfo is found, update the relevant elements
        if (userInfo && userInfo.username && userInfo.role) {
            const usernameElement = document.getElementById('userName');
            const userroleElement = document.getElementById('userRole'); // For regular user
            const admNameElement = document.getElementById('admName'); // For admin

            // Check if elements exist and update their content
            if (usernameElement) usernameElement.textContent = userInfo.username;
            if (userroleElement) userroleElement.textContent = userInfo.role;
            if (admNameElement) admNameElement.textContent = userInfo.username; // Update admin name if needed
        } else {
            console.log("User details not found in localStorage.");
        }
    })
    .catch(error => console.error('Error loading HTML:', error));


// Fetch and inject the navbar
fetch('/school-management/components/nav bar/index -admin.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar').innerHTML = data;
    })
    .catch(error => console.error('Error loading HTML:', error));


    // Toggle navigation visibility
document.getElementById("navIcon").addEventListener("click", function() {
    const navbar = document.getElementById("navbar");

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



document.getElementById("navIcon").addEventListener("click", function() {


});


function logOutAcc() {

    document.querySelector('.header'&& '.navbar' && '.page-interface').classList.add('blurred');
    fetch('/school-management/authentication/prompt/logout-prompt.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('modalOverlay').innerHTML = data;
            setTimeout(() => {
                document.querySelector('.modal-overlay').classList.add('transform');
                const modalBox =  document.getElementById('modalbox');
                modalBox.style.height = "400px";

            }, 100);
        });




}





// Count users by role and update counts in the DOM
function countLoggedUsers() {
    let studentCount = 0;
    let adminCount = 0;
    let staffCount = 0;

    // Loop through all localStorage items to count users by role
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        // Check if the key includes 'userInfo'
        if (key.includes('userInfo')) {
            const userInfo = JSON.parse(localStorage.getItem(key));

            // Count the roles
            switch (userInfo.role) {
                case "student":
                    studentCount++;
                    break;
                case "admin":
                    adminCount++;
                    break;
                case "staff":
                    staffCount++;
                    break;
            }
        }
    }

    // Update the counts in the respective elements
    document.getElementById("studentCount").textContent = studentCount;
    document.getElementById("adminCount").textContent = adminCount;
    document.getElementById("staffCount").textContent = staffCount;
}


// Call the function when the page loads
window.onload = function() {
    countLoggedUsers();  // Update role counts when the page is loaded
};


