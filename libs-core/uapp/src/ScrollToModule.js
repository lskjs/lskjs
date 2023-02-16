import Module from '@lskjs/module';
import scrollTo from '@lskjs/scroll';
import get from 'lodash/get';

export class ScrolltoModule extends Module {
  init() {
    this.client = scrollTo;
    this.__parent.on('resolve:start', () => {
      let to = get(this, 'history.location.hash', 0);
      if (to === '') to = 0;
      setTimeout(() => scrollTo(to, this.config), 10); // @TODO: back && go to page
    });
  }
}

export default ScrolltoModule;
