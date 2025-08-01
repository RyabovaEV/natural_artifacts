import 'virtual:svg-icons-register'
import Swiper from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../style/style.scss'

import { Navigation, Pagination } from 'swiper/modules';

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'fraction',
    renderFraction: function (currentClass, totalClass) {
      return `<span class="${currentClass}"></span> из <span class="${totalClass}"></span>`;
    },
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      navigation: false, // убираем стрелки
      pagination: {
        type: 'bullets',
        clickable: true,
      },
    },
    576: {
      slidesPerView: 2,
      navigation: false,
      pagination: {
        type: 'bullets',
        clickable: true,
      },
    },
    768: {
      slidesPerView: 3,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return `<span class="${currentClass}"></span> из <span class="${totalClass}"></span>`;
        },
      },
    },
    1110: {
      slidesPerView: 4,
    },
  },
});

