// Initialize Swiper for Card Slider
const cardSwiper = new Swiper(".cardSwiper", {
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