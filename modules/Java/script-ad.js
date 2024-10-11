// Fetch the header HTML and inject it into the page
fetch('/school-management/components/header/index.html')
    .then(response => response.text())  // Parse the response as plain text
    .then(data => {
        // Inject the fetched HTML content into the target div
        document.getElementById('header').innerHTML = data;

        // Once the header is loaded, retrieve the userInfo from localStorage
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));  // Get the userInfo object

        // Check if userInfo is found and contains username and role
        if (userInfo && userInfo.username && userInfo.role) {
            // Ensure that the username and role elements exist
            const usernameElement = document.getElementById('userName');
            const roleElement = document.getElementById('userRole');

            if (usernameElement && roleElement) {
                // Update the content of username and role elements
                usernameElement.textContent = userInfo.username;
                roleElement.textContent = userInfo.role;
            } else {
                console.error("Username or role elements not found in the DOM.");
            }
        } else {
            console.log("User details not found in localStorage.");
        }
    })
    .catch(error => console.error('Error loading HTML:', error));





fetch('/school-management/components/nav bar/index -admin.html')
.then(response => response.text())  // Parse the response as plain text
.then(data => {
    // Inject the fetched HTML content into the target div
    document.getElementById('navbar').innerHTML = data;
})
.catch(error => console.error('Error loading HTML:', error));



document.addEventListener('DOMContentLoaded', function() {
  // Attach an event listener to the logout button
  const logOutButton = document.getElementById('logOut');
  if (logOutButton) {
    logOutButton.addEventListener('click', function(event) {
      event.preventDefault();  // Prevent the default link behavior

      // Clear the userInfo from localStorage
      localStorage.removeItem('userInfo');

      // Redirect to the login page after logging out
      window.location.href = "/school-management/authentication/register-login/index.html";
    });
  } else {
    console.error("Logout button not found in the DOM.");
  }
});















// Function to count logged-in users by role
function countLoggedUsers() {
  let studentCount = 0;
  let adminCount = 0;
  let staffCount = 0;

  // Loop through localStorage to count roles
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const user = JSON.parse(localStorage.getItem(key));

    if (user && user.role) {
      switch (user.role) {
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

  // Display the counts in the respective tags
  document.getElementById("studentCount").textContent = studentCount;
  document.getElementById("adminCount").textContent = adminCount;
  document.getElementById("staffCount").textContent = staffCount;
}

// Call the function when the page loads
window.onload = function() {
  countLoggedUsers();
};





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


  

