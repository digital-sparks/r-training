import Swiper from 'swiper';
import { Parallax, Keyboard, Mousewheel, Autoplay } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText, ScrollTrigger);
import Lenis from 'lenis';

window.Webflow ||= [];
Webflow.push(() => {
  console.log('hello (global.js)');

  // ————— LENIS ————— //
  ('use strict'); // fix lenis in safari
  let lenis;
  if (Webflow.env('editor') === undefined) {
    lenis = new Lenis();

    $('[data-lenis-start]').on('click', function () {
      lenis.start();
    });

    $('[data-lenis-stop]').on('click', function () {
      lenis.stop();
    });

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
        yPercent: -5,
      },
      {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: image.parentNode,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          toggleActions: 'play none resume reverse',
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
          yPercent: -100,
          duration: 0.5,
          ease: 'power3.out',
        });
      },
      function () {
        // On unhover
        gsap.to($(this).find('.button-gsap-text'), {
          yPercent: 0,
          duration: 0.5,
          ease: 'power3.out',
        });
      }
    );
  });

  // ————— BUTTON HOVER ANIMATION ————— //
});
