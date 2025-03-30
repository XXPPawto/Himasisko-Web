// Navbar Toggle dengan Animasi
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Tambahkan animasi tambahan jika perlu
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden'; // Mencegah scroll saat menu terbuka
    } else {
        document.body.style.overflow = ''; // Mengembalikan scroll
    }
});

// Close Navbar on Link Click (for mobile)
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = ''; // Mengembalikan scroll
        }
    });
});

// Dropdown Menu for Mobile
const dropdownItems = document.querySelectorAll('.dropdown__item');
dropdownItems.forEach(item => {
    const link = item.querySelector('.nav__link');
    
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            item.classList.toggle('active');
            
            // Close other dropdowns
            dropdownItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth > 768) return;
    
    const isClickInside = navMenu.contains(e.target) || navToggle.contains(e.target);
    if (!isClickInside && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = ''; // Mengembalikan scroll
        dropdownItems.forEach(item => item.classList.remove('active'));
    }
});

// Set active link based on current page
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav__link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    
    // Check if link href matches current page
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === 'profil.html' && linkPage === 'profil.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

