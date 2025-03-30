// Initialize Swiper for Leadership Section
document.addEventListener("DOMContentLoaded", function() {
    // Leadership Swiper
    const leadershipSwiper = new Swiper(".leadership-slider", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // Department Members Swiper
    const departmentSwipers = document.querySelectorAll(".member-slider");
    departmentSwipers.forEach(swiper => {
        new Swiper(swiper, {
            slidesPerView: 2,
            spaceBetween: 20,
            scrollbar: {
                el: ".swiper-scrollbar",
                draggable: true,
            },
            breakpoints: {
                480: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 5,
                },
            },
        });
    });

    // Department Tab Functionality
    const deptTabs = document.querySelectorAll(".dept-tab");
    const deptPanels = document.querySelectorAll(".dept-panel");

    deptTabs.forEach(tab => {
        tab.addEventListener("click", function() {
            // Remove active class from all tabs and panels
            deptTabs.forEach(t => t.classList.remove("active"));
            deptPanels.forEach(p => p.classList.remove("active"));
            
            // Add active class to clicked tab
            this.classList.add("active");
            
            // Show corresponding panel
            const deptId = this.getAttribute("data-dept");
            document.getElementById(deptId).classList.add("active");
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
});