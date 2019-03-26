import animateScrollTo from './animated-scroll-to';

const defaultOptions = {
  // duration of the scroll per 1000px, default 500
  speed: 500,

  // minimum duration of the scroll
  minDuration: 250,

  // maximum duration of the scroll
  maxDuration: 1500,

  // DOM element to scroll, default window
  // Pass a reference to a DOM object
  // Example: document.querySelector('#element-to-scroll'),
  // element: window,

  // Additional offset value that gets added to the desiredOffset.  This is
  // useful when passing a DOM object as the desiredOffset and wanting to adjust
  // for an fixed nav or to add some padding.
  offset: -300,

  // should animated scroll be canceled on user scroll/keypress
  // if set to "false" user input will be disabled until animated scroll is complete
  // (when set to false, "passive" will be also set to "false" to prevent Chrome errors)
  cancelOnUserAction: true,

  // Set passive event Listeners to be true by default. Stops Chrome from complaining.
  passive: true,

  // Scroll horizontally rather than vertically (which is the default)
  horizontal: true,
};

export default function scrollTo(id, options) {
  // if (__DEV__) console.log('scrollTo', id);
  // return false;
  try {
    let value;
    if (id == null) {
      return false;
    } else if (typeof id === 'number') {
      value = id;
    } else if (typeof id === 'string') {
      const anchor = document.querySelector(id);
      if (!anchor) return false;
    } else {
      value = id;
    }
    // animateScrollTo(anchor, options);
    animateScrollTo(value, {
      // ...defaultOptions,
      offset: -200,
      ...options,
    });
    return true;
  } catch (err) {
    return false;
  }
}

