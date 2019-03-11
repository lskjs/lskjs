import SmoothScroll from './smooth-scroll';

const scroll = new SmoothScroll('a[smooth*="#"]', {
  speed: 1000,
  easing: 'easeOutCubic',
  offset: 300,
});



scroll.scrollTo = function scrollTo(id) {
  console.log('scrollTo', id);
  try {
    const anchor = document.querySelector(id);
    // console.log(anchor);
    if (!anchor) return false;
    this.animateScroll(anchor);
    return true;
  } catch (err) {
    // console.log('err', err);
    return false;
  }
};

export default scroll;
