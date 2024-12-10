import Swiper from 'swiper';
import { Parallax, Keyboard, Mousewheel, Autoplay } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText, ScrollTrigger);

window.Webflow ||= [];
Webflow.push(() => {
  const solutionsSwiper = new Swiper('.solution-swiper_wrapper', {
    modules: [Parallax, Keyboard, Mousewheel, Autoplay],
    wrapperClass: 'solution-swiper_list',
    slideClass: 'solution-swiper_item',
    slidesPerView: 'auto',
    direction: 'horizontal',
    spaceBetween: 24,
    grabCursor: true,
    loop: true,
    speed: 550,
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
    breakpoints: {
      768: {
        speed: 900,
        spaceBetween: 32,
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
