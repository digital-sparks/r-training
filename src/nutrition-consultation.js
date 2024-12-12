import Swiper from 'swiper';
import { Navigation, Keyboard, Mousewheel, Autoplay, EffectFade } from 'swiper/modules';

window.Webflow ||= [];
Webflow.push(() => {
  const testimonialSwiper = new Swiper('.testimonial-swiper_wrapper', {
    modules: [Navigation, Keyboard, Mousewheel, Autoplay, EffectFade],
    wrapperClass: 'testimonial-swiper_list',
    slideClass: 'testimonial-swiper_item',
    slidesPerView: 'auto',
    effect: 'fade',
    direction: 'horizontal',
    spaceBetween: 0,
    grabCursor: true,
    loop: true,
    speed: 300,
    parallax: true,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    autoplay: {
      enabled: false,
      delay: 4000,
      pauseOnMouseEnter: false,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '.swiper_button.is-next',
      prevEl: '.swiper_button.is-prev',
    },
    breakpoints: {
      768: {
        speed: 300,
        spaceBetween: 0,
        mousewheel: {
          enabled: true,
          forceToAxis: true,
          thresholdDelta: 5,
        },
      },
    },
    on: {
      beforeInit: (swiper) => {
        swiper.wrapperEl.style.gridColumnGap = 'unset';
      },
    },
  });
});
