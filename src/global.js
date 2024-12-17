import Swiper from 'swiper';
import { Navigation, Keyboard, Mousewheel, Autoplay, EffectFade } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomEase from 'gsap/CustomEase';
gsap.registerPlugin(ScrollTrigger, CustomEase);
import Lenis from 'lenis';

window.Webflow ||= [];
Webflow.push(() => {
  // ————— LENIS ————— //
  ('use strict'); // fix lenis in safari
  let lenis;
  if (Webflow.env('editor') === undefined) {
    lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.refresh);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }
  // ————— LENIS ————— //

  // ————— GlOBAL IMAGE PARALLAX EFFECT ————— //
  document.querySelectorAll('img[data-effect=parallax]').forEach((image) => {
    gsap.set(image, { scale: 1.1 });

    // parallax effect on y scroll
    gsap.fromTo(
      image,
      {
        yPercent: 0,
      },
      {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: image.parentNode,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          // markers: true,
        },
      }
    );
  });
  // ————— GlOBAL IMAGE PARALLAX EFFECT ————— //

  // ————— BUTTON HOVER ANIMATION ————— //

  document.querySelectorAll('.button-gsap').forEach((button) => {
    $(button).hover(
      function () {
        // On hover
        gsap.to($(this).find('.button-gsap-text'), {
          yPercent: -125,
          scale: 1.05,
          transformOrigin: 'center top',
          duration: 0.4,
          ease: 'power2.out',
        });
      },
      function () {
        // On unhover
        gsap.to($(this).find('.button-gsap-text'), {
          yPercent: 0,
          scale: 1,
          duration: 0.6,
          transformOrigin: 'center top',
          ease: 'power2.out',
        });
      }
    );
  });

  // ————— BUTTON HOVER ANIMATION ————— //

  // ————— LINK HOVER ANIMATION ————— //

  document.querySelectorAll('.link-gsap').forEach((link) => {
    const text = link.querySelector('.link-gsap_text');
    const underlineWrap = link.querySelector('.link-gsap_underline-wrap');
    const underline = link.querySelector('.link-gsap_underline');

    const enterTimeline = gsap.timeline({ paused: true });
    const leaveTimeline = gsap.timeline({ paused: true });

    enterTimeline
      .to(underline, { width: '100%', duration: 0.4, ease: 'power2.out' })
      .to(text, { y: 2, duration: 0.2, ease: 'power2.out' }, '<')
      .to(underlineWrap, { y: -2, duration: 0.2, ease: 'power2.out' }, '<');

    leaveTimeline
      .to(underline, { width: '0%', duration: 0.4, ease: 'power2.out' })
      .to(text, { y: 0, duration: 0.2, ease: 'power2.out' }, '<')
      .to(underlineWrap, { y: 0, duration: 0.2, ease: 'power2.out' }, '<');

    link.addEventListener('mouseenter', () => {
      leaveTimeline.pause();
      enterTimeline.seek(0);
      enterTimeline.play();
    });

    link.addEventListener('mouseleave', () => {
      enterTimeline.pause();
      leaveTimeline.seek(0);
      leaveTimeline.play();
    });
  });

  // ————— LINK HOVER ANIMATION ————— //

  // ————— PRELOADER ANIMATION ————— //

  const preloader = document.querySelector('.preloader_component') || '';

  if (preloader) {
    let preloaderAnimation = gsap.timeline();
    CustomEase.create('preloaderEase', '.5, 0, .25, 1');
    const cover = preloader.querySelectorAll('.preloader_cover');
    const content = preloader.querySelector('.preloader_content');

    gsap.set(cover, { opacity: 1 });
    preloaderAnimation
      .fromTo(
        cover,
        {
          xPercent: -105,
        },
        {
          xPercent: -3,
          duration: 1.1,
          delay: 0.2,
          ease: 'power3.inOut',
        }
      )
      .to(content, {
        opacity: 0,
        delay: 0.15,
        duration: 0.4,
        ease: 'none',
      })
      .set(preloader, {
        display: 'none',
      })
      .set(cover, {
        opacity: 0,
      });

    document.querySelectorAll('a').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        if (
          this.hostname === window.location.host &&
          this.getAttribute('href').indexOf('#') === -1 &&
          this.getAttribute('target') !== '_blank'
        ) {
          e.preventDefault();
          const destination = this.getAttribute('href');

          gsap.set(preloader, { display: 'block' });
          gsap.to(content, {
            opacity: 1,
            duration: 0.35,
            ease: 'none',
            onComplete: () => {
              window.location = destination;
            },
          });
        }
      });
    });
  }

  // On click of the back button
  window.onpageshow = function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  };
  // ————— PRELOADER ANIMATION ————— //

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
        },
      }
    );
  });
  // ————— SERVICES IMAGE PARALLAX EFFECT ————— //

  // ––––– SERVICE SWIPER ————— //
  if (document.querySelectorAll('.services-swiper_wrapper')) {
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
      // parallax: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      // autoplay: {
      //   enabled: false,
      //   delay: 4000,
      //   pauseOnMouseEnter: false,
      //   disableOnInteraction: true,
      // },
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
  }
  // ––––– SERVICE SWIPER ————— //

  // ––––– LOCATIONS SWIPER ————— //
  if (document.querySelectorAll('.locations-swiper_wrapper')) {
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
      // parallax: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      // autoplay: {
      //   enabled: false,
      //   delay: 4000,
      //   pauseOnMouseEnter: false,
      //   disableOnInteraction: true,
      // },
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
  }
  // ––––– LOCATIONS SWIPER ————— //

  // ––––– CLIENTS SWIPER ————— //
  if (document.querySelectorAll('.clients-swiper_wrapper')) {
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
      // parallax: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      autoplay: {
        enabled: true,
        delay: 4000,
        pauseOnMouseEnter: true,
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
  }
  // ––––– CLIENTS SWIPER ————— //

  // ––––– TESTIMONIALS SWIPER ————— //
  if (document.querySelectorAll('.testimonial-swiper_wrapper')) {
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
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      autoplay: {
        enabled: true,
        delay: 4000,
        pauseOnMouseEnter: true,
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
  }
  // ––––– TESTIMONIALS SWIPER ————— //
});
