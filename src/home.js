import Swiper from 'swiper';
import { Navigation, Keyboard, Mousewheel, Autoplay } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText, ScrollTrigger);

window.Webflow ||= [];
Webflow.push(() => {
  // ————— SERVICES IMAGE PARALLAX EFFECT ————— //
  document.querySelectorAll('.image-absolute.is-services').forEach((image) => {
    // parallax effect on y scroll
    gsap.fromTo(
      image,
      {
        yPercent: -6,
      },
      {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: image.parentNode,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          // markers: true,
          // toggleActions: 'play none resume reverse',
        },
      }
    );
  });
  // ————— SERVICES IMAGE PARALLAX EFFECT ————— //

  const servicesSwiper = new Swiper('.services-swiper_wrapper', {
    modules: [Navigation, Keyboard, Mousewheel, Autoplay],
    wrapperClass: 'services-swiper_list',
    slideClass: 'services-swiper_item',
    slidesPerView: 'auto',
    direction: 'horizontal',
    spaceBetween: 32,
    grabCursor: true,
    loop: false,
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
    navigation: {
      nextEl: '.swiper_button.is-next',
      prevEl: '.swiper_button.is-prev',
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

  const locationsSwiper = new Swiper('.locations-swiper_wrapper', {
    modules: [Navigation, Keyboard, Mousewheel, Autoplay],
    wrapperClass: 'locations-swiper_list',
    slideClass: 'locations-swiper_item',
    slidesPerView: 'auto',
    direction: 'horizontal',
    spaceBetween: 40,
    grabCursor: true,
    loop: false,
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
    navigation: {
      nextEl: '.swiper_button.is-next',
      prevEl: '.swiper_button.is-prev',
    },
    breakpoints: {
      768: {
        speed: 900,
        spaceBetween: 40,
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

  const clientsSwiper = new Swiper('.clients-swiper_wrapper', {
    modules: [Navigation, Keyboard, Mousewheel, Autoplay],
    wrapperClass: 'clients-swiper_list',
    slideClass: 'clients-swiper_item',
    slidesPerView: 'auto',
    direction: 'horizontal',
    spaceBetween: 60,
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
    navigation: {
      nextEl: '.swiper_button.is-next',
      prevEl: '.swiper_button.is-prev',
    },
    breakpoints: {
      768: {
        speed: 900,
        spaceBetween: 60,
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
