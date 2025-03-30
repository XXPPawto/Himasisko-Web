// Initialize Swiper for Berita Section
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
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