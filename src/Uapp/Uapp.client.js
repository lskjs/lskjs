import Favico from 'favico.js';
import BaseUapp from './Uapp.common';

export default class Uapp extends BaseUapp {
  async init() {
    await super.init();
    this.app.historyConfirm = async (message, callback) => {
      const res = await this.confirm({
        title: this.t('form.confirm.title'),
        text: message || this.t('form.confirm.text'),
        cancel: this.t('form.confirm.cancel'),
        submit: this.t('form.confirm.submit'),
      });
      return callback(res);
    };
    this.favico = new Favico({
      animation: 'none',
    });
  }


  confirm(props) {
    return this.confirmRef?.open(props);
  }

  async checkVersion() {
    const data = await this.api.fetch('/api/healthcheck?info=1');
    if (__VERSION && data.__VERSION && __VERSION !== data.__VERSION) {
      window.location.reload(true);
    }
  }

  async run() {
    await super.run();
    if (__CLIENT__ && !__DEV__) {
      setTimeout(() => this.checkVersion(), 120 * 1000);
    }
  }


  async beforeResolve(...args) {
    await super.beforeResolve(...args);
    try {
      NProgress.start();
    } catch (err) {
      // console.log('NProgress', err);
    }
  }
  async afterResolve(...args) {
    await super.afterResolve(...args);
    setTimeout(this.scrollTo); // @TODO: back
    if (this.page && this.page.renderTitle && typeof document !== 'undefined') {
      document.title = this.page.renderTitle();
    }
    try {
      NProgress.done();
    } catch (err) {
      // console.log('NProgress', err);
    }
    // @TODO: to @natavts favicon, meta tags
  }
}
