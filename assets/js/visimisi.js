// Visi Misi Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.vm-tab');
  const items = document.querySelectorAll('.vm-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs and items
      tabs.forEach(t => t.classList.remove('active'));
      items.forEach(i => i.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Show corresponding content
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
});