// Selectors for sign up and sign in buttons
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

// Event listeners for switching forms
sign_up_btn.addEventListener('click', () => {
    container.classList.add("sign-up-mode");
});
sign_in_btn.addEventListener('click', () => {
    container.classList.remove("sign-up-mode");
});

// Selectors for form inputs
const signUpForm = document.querySelector(".sign-up-form");
const signInForm = document.querySelector(".sign-in-form");

// Sign Up form submission logic
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    // Get form input values
    const name = signUpForm.querySelector("#signUpUsername").value;
    const email = signUpForm.querySelector("#signUpEmail").value;
    const password = signUpForm.querySelector("#signUpPassword").value;
    const password2 = signUpForm.querySelector("#signUpConfirmPassword").value;
    const role = signUpForm.querySelector("#role").value;

    // Check if all fields are filled
    if (name && email && password && password2 && role && role !== "Choose a role") {
        // Check if passwords match
        if (password === password2) {
            const user = { name, email, password, role };
            localStorage.setItem(name, JSON.stringify(user)); // Save user data to localStorage
            alert("Sign up successful! You can now sign in.");
            container.classList.remove("sign-up-mode"); // Switch to sign-in form
        } else {
            alert("Passwords do not match!");
        }
    } else {
        alert("Please fill in all fields and select a valid role!");
    }
});

/// Modify login logic to update counts when a user logs in
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const email = signInForm.querySelector("#signInName").value;
    const inpassword = signInForm.querySelector("#signInPassword").value;
  
    const storedUser = localStorage.getItem(email);
  
    if (storedUser) {
      const user = JSON.parse(storedUser);
  
      if (user.password === inpassword) {
        const userD = {
          username: user.name, 
          role: user.role      
       };

        switch (user.role) {
          case "student":
            alert("Login successful!");
            
            
           

            localStorage.setItem('userInfo', JSON.stringify(userD))


            window.location.href = "/school-management/modules/student/dashboard.html";
            break;
          case "staff":
            alert("Login successful!");

            

            localStorage.setItem('userInfo', JSON.stringify(userD))

            window.location.href = "/school-management/modules/staff/dashboard.html";
            break;




          case "admin":

          localStorage.setItem('userInfo', JSON.stringify(userD))

            document.querySelector('.container').classList.add('blurred');
            fetch('/school-management/authentication/prompt/index.html')
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
              })
              .then(data => {
                document.getElementById('modalOverlay').innerHTML = data;
                setTimeout(() => {
                  document.querySelector('.modal-overlay').classList.add('transform');
                }, 20);

                

              });
            break;
          default:
            alert("Role not recognized. Please contact support.");
        }
  
        // Update the counts after login
        countLoggedUsers();
      } else {
        alert("Incorrect password!");
      }
    } else {
      alert("User not found! Please sign up first.");
    }
  });
  
  
  
  
  
   