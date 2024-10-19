// Fetch and inject the header with user info
fetch('/school-management/components/header/index.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;


        const currentUser = Object.keys(localStorage).find(key => {
            const storedUser = JSON.parse(localStorage.getItem(key));
            return storedUser && storedUser.isLoggedIn === true;
        });

        if (currentUser) {
            const userInfo = JSON.parse(localStorage.getItem(currentUser));
            
           
            if (userInfo) {
                const usernameElement = document.getElementById('userName');
                const userRoleElement = document.getElementById('userRole'); 
                const adminNameElement = document.getElementById('admName'); 

                // Update UI based on role
                if (usernameElement) usernameElement.textContent = userInfo.name;
                if (userRoleElement) userRoleElement.textContent = userInfo.role;
                if (adminNameElement) adminNameElement.textContent = userInfo.name;

            } else {
                alert("Session mismatch detected. Please sign in again.");
                window.location.href = '/school-management/authentication/register-login/index.html';
            }
        } else {
            window.location.href = '/school-management/authentication/register-login/index.html';
        }
    })
    .catch(error => console.error('Error loading header HTML:', error));

// Function to count users by role and update DOM

function countLoggedUsers() {
    let studentCount = 0;
    let staffCount = 0;
    let adminCount = 0;

    // Loop through all keys in localStorage
    Object.keys(localStorage).forEach(key => {
        const value = localStorage.getItem(key);

        // Check if the value is an array of users 
        if (key === 'users') {
            const usersArray = JSON.parse(value);
            usersArray.forEach(user => {
                if (user.isLoggedIn) {
                    switch (user.role) {
                        case 'student':
                            studentCount++;
                            break;
                        case 'staff':
                            staffCount++;
                            break;
                        case 'admin':
                            adminCount++;
                            break;
                    }
                }
            });
        } else {
            // Handle individual user entries
            const userInfo = JSON.parse(value);
            if (userInfo.isLoggedIn) {
                switch (userInfo.role) {
                    case 'student':
                        studentCount++;
                        break;
                    case 'staff':
                        staffCount++;
                        break;
                    case 'admin':
                        adminCount++;
                        break;
                }
            }
        }
    });

    // Update the DOM with the counts
    document.getElementById("studentCount").textContent = studentCount;
    document.getElementById("staffCount").textContent = staffCount;
    document.getElementById("adminCount").textContent = adminCount;
}


window.onload = function() {
    countLoggedUsers();
};







fetch('/school-management/components/nav bar/index -admin.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navBar').innerHTML = data;
    })
    .catch(error => console.error('Error loading HTML:', error));


  
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
    





function logOutAcc() {
    document.querySelector('.header').classList.add('blurred');
    document.querySelector('.nav-bar').classList.add('blurred');
    document.querySelector('.page-interface').classList.add('blurred');

   
    fetch('/school-management/authentication/prompt/logout-prompt.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('modalOverlay').innerHTML = data;
            setTimeout(() => {
                document.querySelector('.modal-overlay').classList.add('transform');
                const modalBox = document.getElementById('modalbox');
                modalBox.style.height = "400px";
            }, 100);
        })
        .catch(error => console.error('Error loading logout prompt HTML:', error));
}
