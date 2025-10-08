import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const swiper = new Swiper(".swiper-feedbacks", {
  modules: [Navigation, Pagination],
  slidesPerView: 1,        // кількість слайдів на екрані
  spaceBetween: 24,        // відстань між ними
  loop: false,              // безкінечний цикл
  direction: "horizontal",
  pagination: {
    el: ".swiper-pagination-feedbacks",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next-feedbacks",
    prevEl: ".swiper-button-prev-feedbacks"
  },
});