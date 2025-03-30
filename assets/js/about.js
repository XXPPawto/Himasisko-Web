// Initialize Swiper for Gallery
document.addEventListener("DOMContentLoaded", function() {
    // Inisialisasi Swiper
    const gallerySwiper = new Swiper(".gallery-slider", {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
    });
  
    // Animate stats counting
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            clearInterval(timer);
            current = target;
          }
          stat.textContent = Math.floor(current);
        }, 16);
      });
    };
  
    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
  
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
      statsObserver.observe(aboutSection);
    }
  
    // SOLUSI 1: Nonaktifkan animasi scroll untuk mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // Nonaktifkan AOS jika ada
      if (typeof AOS !== 'undefined') {
        AOS.init({ disable: true });
      }
      
      // Paksa tampilkan semua section yang penting
      const sectionsToShow = [
        '.department-section',
        '.gallery-section',
        '.vm-section',
        '.timeline-section'
      ];
      
      sectionsToShow.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
          el.style.height = 'auto';
          el.style.transform = 'none';
        });
      });
      
      // Pastikan Swiper di-init ulang
      gallerySwiper.update();
    }
  
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  });