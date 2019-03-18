const defaultPreloader = `
  <img
    src="/assets/loader.gif"
    alt="Loading"
    width="120"
    height="120"
    style="user-select: none;"
  />
`;

export default (preloader = defaultPreloader) => {
  if (!preloader) return '';
  return `\
  <style type="text/css">
    .loading .preloader {
      visibility: visible;
      opacity: 1;
    }
    .ua_js_no .preloader {
      visibility: visible;
      opacity: 1;
    }
    .ua_js_yes .preloader {
      visibility: hidden;
      opacity: 0;
    }
    .preloader {
        transition: opacity .8s ease-out, visibility .8s ease-out;
        height: 100%;
        min-height: 100%;
        margin: 0;
        overflow: hidden;
        user-select: none;
        cursor: progress;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10000;

        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(255, 255, 255);
    }
    .preloader-element {
      display: flex;
    }
  </style>
  <div class="preloader">
    <div class="preloader-element">
      ${preloader}
    </div>
  </div>
  `.replace(/\s+/, ' ');
};

