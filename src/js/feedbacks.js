document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('#feedbacks-slider', {
    // мобільна база
    slidesPerView: 1,
    spaceBetween: 24,
    grabCursor: true,
    keyboard: { enabled: true, onlyInViewport: true },
    a11y: { enabled: true },
    watchOverflow: true,

    // кастомні кнопки
    navigation: {
      nextEl: '.btn-next',
      prevEl: '.btn-prev',
      disabledClass: 'is-disabled',
      lockClass: 'is-locked'
    },

    // булети пагінації у твоєму контейнері
    pagination: {
      el: '.slider-dots',
      clickable: true,
      bulletClass: 'dot',
      bulletActiveClass: 'dot--active'
    },

    // респонсів: планшет = 2, ПК = 3
    breakpoints: {
      768:  { slidesPerView: 2 },
      1440: { slidesPerView: 3 }
    }
  });

  // Синхронізуємо aria/disabled з класом is-disabled, який ставить Swiper
  const prev = document.querySelector('.btn-prev');
  const next = document.querySelector('.btn-next');

  function syncNavAria() {
    if (prev) {
      const disabled = prev.classList.contains('is-disabled');
      prev.toggleAttribute('disabled', disabled);
      prev.setAttribute('aria-disabled', String(disabled));
    }
    if (next) {
      const disabled = next.classList.contains('is-disabled');
      next.toggleAttribute('disabled', disabled);
      next.setAttribute('aria-disabled', String(disabled));
    }
  }

  // Події Swiper
  swiper.on('init', syncNavAria);
  swiper.on('slideChange', syncNavAria);
  swiper.on('reachBeginning', syncNavAria);
  swiper.on('reachEnd', syncNavAria);
  swiper.on('fromEdge', syncNavAria);

  // первинний виклик (init стріляє автоматично, але дублювання не завадить)
  syncNavAria();

  // Додаткові стрілки з клавіатури, коли фокус на кнопці
  function onKeyNav(e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev?.click(); }
    if (e.key === 'ArrowRight'){ e.preventDefault(); next?.click(); }
  }
  prev?.addEventListener('keydown', onKeyNav);
  next?.addEventListener('keydown', onKeyNav);
});


// import Swiper from 'swiper';
// import { Navigation, Pagination, Keyboard } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// // Ініціалізація слайдера
// const swiperFeedbacks = new Swiper('.feedbacks-swiper', {
//   modules: [Navigation, Pagination, Keyboard],
//   slidesPerView: 1,       // один слайд на екрані
//   spaceBetween: 24,       // відстань між слайдами
//   loop: false,

//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true
//   },
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev'
//   },
//   keyboard: {
//     enabled: true,
//     onlyInViewport: true
//   }
// });

// const userFeedbacks = [
//   {
//     avatar:
//       './img/feedbacks-images/profile.pic.jpg',
//     username:
//       'Jane Doe',
//     userInfo: 'Book Lover, Reader',
//     message: 'Great selection, fast delivery, and beautifully packaged books. My go-to store for weekend reads!'
//   },
// ];
