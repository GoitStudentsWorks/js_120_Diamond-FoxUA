import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Ініціалізація слайдера
const swiperFeedbacks = new Swiper('.feedbacks-swiper', {
  modules: [Navigation, Pagination, Keyboard],
  slidesPerView: 1,       // один слайд на екрані
  spaceBetween: 24,       // відстань між слайдами
  loop: false,

  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true
  }
});

const userFeedbacks = [
  {
    avatar:
      './img/feedbacks-images/profile.pic.jpg',
    username:
      'Jane Doe',
    userInfo: 'Book Lover, Reader',
    message: 'Great selection, fast delivery, and beautifully packaged books. My go-to store for weekend reads!'
  },
];