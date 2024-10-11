function submitCode() {
  // Predefined valid admin code (for demonstration purposes)
  const validCode = "ADMIN123"; 
  
  // Get the entered code from the input field
  const enteredCode = document.getElementById('verificationCode').value;
  
  // Get the message element to show feedback
  const messageElement = document.getElementById('message');
  
  // Check if the entered code matches the valid code
  if (enteredCode === validCode) {
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

  } else {
    messageElement.textContent = "Invalid Code. Please try again.";
    
  }
}
