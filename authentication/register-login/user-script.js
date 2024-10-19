// Utility function to get users from localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

// Utility function to save users to localStorage
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Sign-in logic
document.querySelector('.sign-in-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('signInName').value.trim();
  const password = document.getElementById('signInPassword').value.trim(); // User's password input

  const users = getUsers(); // Get all users from localStorage

  // Find user by name
  const user = users.find(user => user.name === username);

  if (user) {
    // Validate password
    if (user.id=== password) {
      user.isLoggedIn = true;
      saveUsers(users); // Update localStorage

      alert("Login successful!");

      // Redirect based on role
      if (user.role === 'student') {
        window.location.href = '/school-management/modules/student/dashboard.html';
      } else if (user.role === 'staff') {
        window.location.href = '/school-management/modules/staff/dashboard.html';
      }
    } else {
      alert("Incorrect password. Please try again.");
    }
  } else {
    alert("User not found. Please check your name.");
  }
});
