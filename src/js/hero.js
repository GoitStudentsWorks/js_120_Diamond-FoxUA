const swiper = new Swiper('.hero-swiper', {
  loop: false,
  speed: 400,
  slidesPerView: 1,
  wrapperClass: 'hero-swiper-wrapper',
  slideClass: 'hero-slide',
  navigation: {
    nextEl: '.hero-right-btn',
    prevEl: '.hero-left-btn',
  }
});
