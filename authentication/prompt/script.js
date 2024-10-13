function submitCode() {
  // Predefined valid admin code (for demonstration purposes)
  const validCode = "ADMIN123"; 
  
  
  
  // Get the entered code from the input field
  const enteredCode = document.getElementById('verificationCode').value;
  
  // Get the message element to show feedback
  const messageElement = document.getElementById('message');
  
  // Check if the entered code matches the valid code
  if (enteredCode === validCode ) {
      
        
    messageElement.textContent = "Please Wait";
    setTimeout(()=>{
      messageElement.textContent = "Access Granted! Welcome Administrator!";
      messageElement.style.textAlign = "center";
      
    },1000);

   
    
    messageElement.style.color = "green"
    messageElement.style.fontSize = "16px"
    setTimeout(() => {
      window.location.href = '/school-management/modules/admin/dashboard.html';
    },3000); 

  }
  
    else {
    messageElement.textContent = "Invalid Code. Please try again.";
    
  }
}



const isLoggedIn = false;




function signUpCode() {
  // Predefined valid admin code (for demonstration purposes)
  const getIncode = "FRESHSTART"; 

  // Get the entered code from the input field
  const enterCode = document.getElementById('verificationCode').value;
  
  // Get the message element to show feedback
  const messageElement = document.getElementById('message');
  
  // Check if the entered code matches the valid code
  if (enterCode === getIncode ) {
    const name = signUpForm.querySelector("#signUpUsername").value.trim(); // Trim to remove extra spaces
    const email = signUpForm.querySelector("#signUpEmail").value.trim().toLowerCase(); // Make case-insensitive
    const password = signUpForm.querySelector("#signUpPassword").value;
    const password2 = signUpForm.querySelector("#signUpConfirmPassword").value;
    const role = signUpForm.querySelector("#role").value;


     
        
    const user = { name, email, password, role,isLoggedIn };
    localStorage.setItem(name, JSON.stringify(user));


    messageElement.textContent = "Please Wait";
    setTimeout(()=>{
      messageElement.textContent = "Access Granted! Moving to Sign In";
      messageElement.style.textAlign = "center";
      
    },1000);
    
    messageElement.style.color = "green"
    messageElement.style.fontSize = "16px"
    setTimeout(() => {
      window.location.href = '/school-management/authentication/register-login/index.html';
    },3000); 



  }
  
    else {
    messageElement.textContent = "Invalid Code. Please try again.";
    
  }
}


// Function to handle user logout
function logout() {
  // Retrieve the current username from localStorage or from the user info stored earlier
  const allKeys = Object.keys(localStorage);
  let username = null;


  const storedName = localStorage.getItem('name');

  // Find the username from localStorage
  for (let key of allKeys) {
      if (key.includes('userInfo')) {
          const userInfo = JSON.parse(localStorage.getItem(key));
          username = userInfo.username; // Get the username of the logged-in user
          break;
      }
  }

  // Check if the username was found
  if (username) {
    
    


      // Remove the specific user's info from localStorage
      localStorage.removeItem(username + 'userInfo'); // Remove the user info
      console.log(`User ${username} has been logged out and removed from localStorage.`); // Debugging line
  } else {
      console.error("No user information found in localStorage."); // Debugging line
  }

  // Redirect to the sign-in page
  window.location.href = '/school-management/authentication/register-login/index.html';
}

// Function to redirect the user back to the dashboard
function stay() {
  // Redirect the user back to the admin dashboard
  window.location.href = '/school-management/modules/admin/dashboard.html';
}










