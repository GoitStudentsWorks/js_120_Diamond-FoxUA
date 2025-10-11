let eventsSwiper;

function initEventsSwiper() {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 1440 && !eventsSwiper) {
    // Активуємо свайпер тільки на планшетах і мобілках
    eventsSwiper = new Swiper('.events-swiper', {
      slidesPerView: 1,
      spaceBetween: 16,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        0: {
          slidesPerView: 1,
        },
      },
    });
  } else if (screenWidth > 1023 && eventsSwiper) {
    // Вимикаємо свайпер на десктопі
    eventsSwiper.destroy(true, true);
    eventsSwiper = null;

    // Повертаємо звичайний флекс
    const wrapper = document.querySelector('.events-list');
    wrapper.style.transform = '';
  }
}

window.addEventListener('load', initEventsSwiper);
window.addEventListener('resize', initEventsSwiper);
