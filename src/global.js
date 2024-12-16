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

    // // useful for when you want to stop the lenis scroll, e.g. when opening a modal
    // $('[data-lenis-stop]').on('click', function () {
    //   lenis.stop();
    // });

    // $('[data-lenis-start]').on('click', function () {
    //   lenis.start();
    // });

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
          // toggleActions: 'play none resume reverse',
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
  let preloaderAnimation = gsap.timeline();
  document.querySelectorAll('.preloader_component').forEach((preloader) => {
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
          duration: 1.25,
          delay: 0.5,
          ease: 'power4.out',
        }
      )
      .to(content, {
        opacity: 0,
        delay: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
      .set(preloader, {
        display: 'none',
      })
      .set(cover, {
        opacity: 0,
      });
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
        const preloader = document.querySelector('.preloader_component');
        const content = preloader.querySelector('.preloader_content');

        gsap.set(preloader, { display: 'block' });
        gsap.to(content, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            window.location = destination;
          },
        });
      }
    });
  });

  // On click of the back button
  window.onpageshow = function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  };
  // ————— PRELOADER ANIMATION ————— //
});
