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

// Validation functions
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePassword = (password) => password.length >= 6;

// Sign Up form submission logic (Admin only)
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page refresh

    const name = signUpForm.querySelector("#signUpUsername").value.trim();
    const email = signUpForm.querySelector("#signUpEmail").value.trim().toLowerCase();
    const password = signUpForm.querySelector("#signUpPassword").value;
    const password2 = signUpForm.querySelector("#signUpConfirmPassword").value;
    const role = signUpForm.querySelector("#role").value;

    // Form validation
    if (!name || !email || !password || !password2 || role === "Choose a role") {
        alert("Please fill in all fields and select a valid role!");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!validatePassword(password)) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    if (password !== password2) {
        alert("Passwords do not match!");
        return;
    }

    // Admin sign-up validation (requires a special code)
    if (role === "admin") {
        document.querySelector('.container').classList.add('blurred');
        fetch('/school-management/authentication/prompt/index2.html')  // Admin code verification
            .then(response => response.text())
            .then(data => {
                document.getElementById('modalOverlay').innerHTML = data;
                setTimeout(() => {
                    document.querySelector('.modal-overlay').classList.add('transform');
                }, 100);
            });
    } else {
        alert("Sign-up is restricted to administrators only.");
    }
});

// Admin code verification for sign-up
function signUpCode() {
    const getIncode = "FRESHSTART";  // Admin-specific code
    const enterCode = document.getElementById('verificationCode').value;
    const messageElement = document.getElementById('message');

    if (enterCode === getIncode) {
        const name = signUpForm.querySelector("#signUpUsername").value.trim();
        const email = signUpForm.querySelector("#signUpEmail").value.trim().toLowerCase();
        const password = signUpForm.querySelector("#signUpPassword").value;
        const role = signUpForm.querySelector("#role").value;
        const isLoggedIn = false;  // Default to false

        const user = { name, email, password, role, isLoggedIn };
        localStorage.setItem(name, JSON.stringify(user));  // Store user data

        messageElement.textContent = "Please Wait...";
        setTimeout(() => {
            messageElement.textContent = "Access Granted! Moving to Sign In...";
            messageElement.style.color = "green";
            setTimeout(() => {
                window.location.href = '/school-management/authentication/register-login/index.html';
            }, 2000);
        }, 1000);
    } else {
        messageElement.textContent = "Invalid Code. Please try again.";
        messageElement.style.color = "red";
    }
}

// Sign In form submission logic
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = signInForm.querySelector("#signInName").value.trim();
    const password = signInForm.querySelector("#signInPassword").value; // Password is treated as the user's ID

    const storedUser = localStorage.getItem(name);


    
   

    if (storedUser) {
        const user = JSON.parse(storedUser);


        
        if(user.password === password){


            user.isLoggedIn = true; // Set login status to true
            localStorage.setItem(name, JSON.stringify(user));

            document.querySelector('.container').classList.add('blurred');
            fetch('/school-management/authentication/prompt/index1.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('modalOverlay').innerHTML = data;
                    setTimeout(() => {
                        document.querySelector('.modal-overlay').classList.add('transform');
                    }, 20);
                });
          
        }else {
            alert("Incorrect password!"); // Incorrect password feedback
        }
        
    } 
    
    else {
        alert("User not found! Please sign up first."); // User not found feedback
    }
});

// Admin code verification logic (remains unchanged)
function submitCode() {
    const validCode = "ADMIN123"; // Admin-specific code for sign-in
    const enteredCode = document.getElementById('verificationCode').value;
    const messageElement = document.getElementById('message');

    if (enteredCode === validCode) {
        messageElement.textContent = "Please Wait...";
        setTimeout(() => {
            messageElement.textContent = "Access Granted! Welcome Administrator!";
            messageElement.style.color = "green";
            setTimeout(() => {
                window.location.href = '/school-management/modules/admin/dashboard.html';
            }, 2000);
        }, 1000);
    } else {
        messageElement.textContent = "Invalid Code. Please try again.";
        messageElement.style.color = "red";
    }
}

