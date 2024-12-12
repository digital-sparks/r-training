import Swiper from 'swiper';
import { Parallax, Keyboard, Mousewheel, Autoplay } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText, ScrollTrigger);

window.Webflow ||= [];
Webflow.push(() => {
  console.log('hello (global.js)');
});
