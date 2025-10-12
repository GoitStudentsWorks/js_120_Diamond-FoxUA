import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
  const swiperEl = document.querySelector('.events-swiper');
  if (!swiperEl) return;

  new Swiper(swiperEl, {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 24,

    breakpoints: {
      768: { slidesPerView: 2 },
      1440: { slidesPerView: 3 },
    },

    pagination: {
      el: '.ev-pagination',
      clickable: true,
      renderBullet: (index, className) =>
        `<li class="${className}" aria-label="Go to slide ${index + 1}"></li>`,
      bulletClass: 'ev-dot',
      bulletActiveClass: 'ev-dot--active',
    },

    navigation: {
      nextEl: '.events-swiper-btn-next',
      prevEl: '.events-swiper-btn-prev',
    },

    watchOverflow: true,
  });
});
