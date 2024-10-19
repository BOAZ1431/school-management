// Utility function to get users from localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

// Utility function to save users to localStorage
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Function to add a new user
function addUser(role, name, email, image, yearOrDepartment) {
  const users = getUsers();
  const userId = `${name}-${role}`; // Unique ID based on name and role
  users.push({
    id: userId,
    role: role,
    name: name,
    email: email,
    image: image,
    yearOrDepartment: yearOrDepartment,
    isLoggedIn: false // Default to not logged in
  });
  saveUsers(users);
}

// Function to handle student form submission
document.getElementById('student-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const name = document.getElementById('student-name').value;
  const email = document.getElementById('student-email').value;
  const image = document.getElementById('student-image').files[0];
  const year = document.getElementById('year').value;

  if (image) {
    const reader = new FileReader();
    reader.onload = function (e) {
      addUser('student', name, email, e.target.result, year);
      displayStudents();
      document.getElementById('student-form').reset();
    };
    reader.readAsDataURL(image);
  }
});

// Function to handle staff form submission
document.getElementById('staff-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const name = document.getElementById('staff-name').value;
  const email = document.getElementById('staff-email').value;
  const image = document.getElementById('staff-image').files[0];
  const department = document.getElementById('department').value;

  if (image) {
    const reader = new FileReader();
    reader.onload = function (e) {
      addUser('staff', name, email, e.target.result, department);
      displayStaff();
      document.getElementById('staff-form').reset();
    };
    reader.readAsDataURL(image);
  }
});

// Function to display students in the table
function displayStudents() {
  const users = getUsers();
  const studentsList = document.getElementById('students-list');
  studentsList.innerHTML = '';

  users.forEach(user => {
    if (user.role === 'student') {
      const row = `
        <tr>
          <td><img src="${user.image}" alt="${user.name}'s image"></td>
          <td>${user.name}</td>
          <td>${user.yearOrDepartment}</td>
          <td>${user.email}</td>
          <td class="actions">
            <button class="edit" onclick="editUser('${user.id}', 'student')">Edit</button>
            <button class="delete" onclick="deleteUser('${user.id}')">Delete</button>
          </td>
        </tr>`;
      studentsList.insertAdjacentHTML('beforeend', row);
    }
  });
}

// Function to display staff in the table
function displayStaff() {
  const users = getUsers();
  const staffList = document.getElementById('staff-list');
  staffList.innerHTML = '';

  users.forEach(user => {
    if (user.role === 'staff') {
      const row = `
        <tr>
          <td><img src="${user.image}" alt="${user.name}'s image"></td>
          <td>${user.name}</td>
          <td>${user.yearOrDepartment}</td>
          <td>${user.email}</td>
          <td class="actions">
            <button class="edit" onclick="editUser('${user.id}', 'staff')">Edit</button>
            <button class="delete" onclick="deleteUser('${user.id}')">Delete</button>
          </td>
        </tr>`;
      staffList.insertAdjacentHTML('beforeend', row);
    }
  });
}

// Function to delete a user
function deleteUser(userId) {
  let users = getUsers();
  users = users.filter(user => user.id !== userId);
  saveUsers(users);
  displayStudents();
  displayStaff();
}

// Function to edit a user
function editUser(userId, role) {
  const users = getUsers();
  const user = users.find(user => user.id === userId);

  if (role === 'student') {
    document.getElementById('student-name').value = user.name;
    document.getElementById('student-email').value = user.email;
    document.getElementById('year').value = user.yearOrDepartment;
  } else {
    document.getElementById('staff-name').value = user.name;
    document.getElementById('staff-email').value = user.email;
    document.getElementById('department').value = user.yearOrDepartment;
  }

  // Remove the existing user before saving the edited details
  deleteUser(userId);
}

// Initial display
displayStudents();
displayStaff();
