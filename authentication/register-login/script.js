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



  // Get form input values
  const name = signUpForm.querySelector("#signUpUsername").value;
  const email = signUpForm.querySelector("#signUpEmail").value;
  const password = signUpForm.querySelector("#signUpPassword").value;
  const password2 = signUpForm.querySelector("#signUpConfirmPassword").value;
  const role = signUpForm.querySelector("#role").value;

// Sign Up form submission logic
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page refresh
    
    const name = signUpForm.querySelector("#signUpUsername").value.trim(); // Trim to remove extra spaces
    const email = signUpForm.querySelector("#signUpEmail").value.trim().toLowerCase(); // Make case-insensitive
    const password = signUpForm.querySelector("#signUpPassword").value;
    const password2 = signUpForm.querySelector("#signUpConfirmPassword").value;
    const role = signUpForm.querySelector("#role").value;
    const isLoggedIn = false;


    if (name && email && password && password2 && role && role !== "Choose a role") {
        // Check if passwords match
        

        if (password === password2 && role !== "admin") {
            const user = { name, email, password, role,isLoggedIn };
            localStorage.setItem(name, JSON.stringify(user)); // Save user data to localStorage
            alert("Sign up successful! You can now sign in.");
            container.classList.remove("sign-up-mode"); // Switch to sign-in form
        } else if (password === password2 && role === "admin") {
            // Handle admin sign-up with special validation
            document.querySelector('.container').classList.add('blurred');
            fetch('/school-management/authentication/prompt/index2.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('modalOverlay').innerHTML = data;
                    setTimeout(() => {
                        document.querySelector('.modal-overlay').classList.add('transform');
                    }, 100);
                });

               
        } else {
            alert("Passwords do not match!");
        }
    } else {
        alert("Please fill in all fields and select a valid role!");
    }
});


signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const name = signInForm.querySelector("#signInName").value;
    const password = signInForm.querySelector("#signInPassword").value;
  
    const storedUser = localStorage.getItem(name); // Fetch user by name
  
    if (storedUser) {
        const user = JSON.parse(storedUser);
  
        if (user.password === password) {
            
            user.isLoggedIn = true;
            localStorage.setItem(name, JSON.stringify(user)); // Save updated user data
            
            const userD = { username: user.name, role: user.role, logstate: user.isLoggedIn };
            localStorage.setItem(name + 'userInfo', JSON.stringify(userD)); // Store logged-in user info

            // Role-based redirection
            switch (user.role) {
                case "student":
                    if (logstate = true){
                    alert("Login successful! Redirecting to student dashboard.");
                    window.location.href = "/school-management/modules/student/dashboard.html";
                    break;}else{
                        window.location.href ="/school-management/authentication/register-login/index.html"
                    }
                case "staff":
                    if(logstate = true){
                    alert("Login successful! Redirecting to staff dashboard.");
                    window.location.href = "/school-management/modules/staff/dashboard.html";
                    break;}else{
                        window.location.href ="/school-management/authentication/register-login/index.html" 
                    }
                case "admin":
                    if(logstate = true){
                        document.querySelector('.container').classList.add('blurred');
                        fetch('/school-management/authentication/prompt/index1.html')
                            .then(response => response.text())
                            .then(data => {
                                document.getElementById('modalOverlay').innerHTML = data;
                                setTimeout(() => {
                                    document.querySelector('.modal-overlay').classList.add('transform');
                                }, 20);
                            });
                        break;
                    }else{
                        window.location.href ='/school-management/authentication/register-login/index.html'
                    }

                   
                default:
                    alert("Role not recognized. Please contact support.");
            }
        } else {
            alert("Incorrect password!");
        }
    } else {
        alert("User not found! Please sign up first.");
    }
});

  

