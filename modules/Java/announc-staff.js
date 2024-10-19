document.addEventListener('DOMContentLoaded', () => {
  loadStaffAnnouncements();
  setupStaffForm();
});

function loadStaffAnnouncements() {
  const announcements = JSON.parse(localStorage.getItem('announcements')) || []; // Use the common key
  const announcementList = document.getElementById('staffAnnouncementList');
  announcementList.innerHTML = '';  // Clear existing list

  announcements.forEach((announcement, index) => {
      // Display all announcements, both staff and admin
      const listItem = document.createElement('li');
      listItem.innerHTML = `
          <strong>${announcement.title}</strong>: ${announcement.content} 
          (Category: ${announcement.category})
          <button class="edit" onclick="editStaffAnnouncement(${index})">Edit</button>
      `;
      announcementList.appendChild(listItem);
  });
}


function setupStaffForm() {
  const form = document.getElementById('staffAnnouncementForm');
  form.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('staffAnnouncementTitle').value;
      const content = document.getElementById('staffAnnouncementContent').value;
      const category = document.getElementById('staffAnnouncementCategory').value;

      if (title === '' || content === '' || category === '') {
          alert("Please fill all the fields.");
          return;
      }

      const newAnnouncement = { title, content, category, type: 'staff' }; // Add type property
      const announcements = JSON.parse(localStorage.getItem('announcements')) || [];
      announcements.push(newAnnouncement);
      localStorage.setItem('announcements', JSON.stringify(announcements));

      // Clear form inputs after submission
      form.reset();

      // Reload announcements on the page
      loadStaffAnnouncements();
  });
}




function editStaffAnnouncement(index) {
  const announcements = JSON.parse(localStorage.getItem('announcements')) || [];
  const announcement = announcements[index];

  // Pre-fill the form with the selected announcement data
  document.getElementById('staffAnnouncementTitle').value = announcement.title;
  document.getElementById('staffAnnouncementContent').value = announcement.content;
  document.getElementById('staffAnnouncementCategory').value = announcement.category;

  // Change the event listener to handle the update
  const form = document.getElementById('staffAnnouncementForm');
  form.removeEventListener('submit', setupStaffForm);
  form.addEventListener('submit', function update(event) {
      event.preventDefault();

      const updatedTitle = document.getElementById('staffAnnouncementTitle').value;
      const updatedContent = document.getElementById('staffAnnouncementContent').value;
      const updatedCategory = document.getElementById('staffAnnouncementCategory').value;

      if (updatedTitle === '' || updatedContent === '' || updatedCategory === '') {
          alert("Please fill all the fields.");
          return;
      }

      // Update the announcement in place
      announcements[index] = { title: updatedTitle, content: updatedContent, category: updatedCategory, type: announcement.type };
      localStorage.setItem('announcements', JSON.stringify(announcements));

      // Clear form inputs after submission
      form.reset();
      loadStaffAnnouncements(); // Reload announcements on the page

      // Reset form to original state
      form.removeEventListener('submit', update);
      form.addEventListener('submit', setupStaffForm);
  });
}
