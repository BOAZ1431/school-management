



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








function signUpCode() {
  // Predefined valid admin code (for demonstration purposes)
  const getIncode = "FRESHSTART"; 
  
  const name = signUpForm.querySelector("#signUpUsername").value;
    const email = signUpForm.querySelector("#signUpEmail").value;
    const password = signUpForm.querySelector("#signUpPassword").value;
    const role = signUpForm.querySelector("#role").value;
  
  // Get the entered code from the input field
  const enterCode = document.getElementById('verificationCode').value;
  
  // Get the message element to show feedback
  const messageElement = document.getElementById('message');
  
  // Check if the entered code matches the valid code
  if (enterCode === getIncode ) {
     
        
    const user = { name, email, password, role };
    localStorage.setItem(email, JSON.stringify(user));


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
