document.addEventListener('DOMContentLoaded', () => {
  loadAnnouncements();
  document.getElementById('announcementForm').addEventListener('submit', createAnnouncement);
});

function loadAnnouncements() {
  const announcements = JSON.parse(localStorage.getItem('announcements')) || [];
  const announcementList = document.getElementById('announcementList');
  announcementList.innerHTML = '';

  announcements.forEach((announcement, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
          <strong>${announcement.category}: ${announcement.title}</strong> - ${announcement.content}
          <div>
            <button class="edit" onclick="editAnnouncement(${index})">Edit</button>
            <button onclick="deleteAnnouncement(${index})">Delete</button>
          </div>
      `;
      announcementList.appendChild(listItem);
  });
}

function createAnnouncement(event) {
  event.preventDefault();

  const category = document.getElementById('category').value;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  if (category && title && content) {
      const announcements = JSON.parse(localStorage.getItem('announcements')) || [];
      announcements.push({ category, title, content });

      localStorage.setItem('announcements', JSON.stringify(announcements));
      loadAnnouncements();

      // Clear form
      document.getElementById('announcementForm').reset();
  } else {
      alert('Please fill in all fields.');
  }
}

function editAnnouncement(index) {
  const announcements = JSON.parse(localStorage.getItem('announcements'));
  const announcement = announcements[index];

  // Pre-fill the form with existing announcement data
  document.getElementById('category').value = announcement.category;
  document.getElementById('title').value = announcement.title;
  document.getElementById('content').value = announcement.content;

  // Modify form to update instead of creating
  document.getElementById('announcementForm').removeEventListener('submit', createAnnouncement);
  document.getElementById('announcementForm').addEventListener('submit', function update(event) {
      event.preventDefault();

      const updatedCategory = document.getElementById('category').value;
      const updatedTitle = document.getElementById('title').value;
      const updatedContent = document.getElementById('content').value;

      announcements[index] = { category: updatedCategory, title: updatedTitle, content: updatedContent };
      localStorage.setItem('announcements', JSON.stringify(announcements));

      // Reset the form to create mode
      document.getElementById('announcementForm').reset();
      document.getElementById('announcementForm').removeEventListener('submit', update);
      document.getElementById('announcementForm').addEventListener('submit', createAnnouncement);

      loadAnnouncements();
  });
}

function deleteAnnouncement(index) {
  const announcements = JSON.parse(localStorage.getItem('announcements'));
  announcements.splice(index, 1);

  localStorage.setItem('announcements', JSON.stringify(announcements));
  loadAnnouncements();
}
