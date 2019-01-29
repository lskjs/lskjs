import React from 'react';
import autobind from 'core-decorators/lib/autobind';
import Favico from 'favico.js';
import NProgress from 'nprogress';
import SmoothScroll from '../utils/UniversalSmoothScroll';
import BaseUapp from './Uapp.common';


global.DEV = ({ children, json, pretty = true }) => ( // eslint-disable-line
  __DEV__ ? (
    <div style={{ outline: '1px dotted black' }}>
      {json
        ? (
          <pre>
            {pretty
              ? JSON.stringify(json).replace(/,"/ig, ',\n"')
              : JSON.stringify(json)}
          </pre>
        )
        : children}
    </div>
  ) : null
);

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
    this.scroll = new SmoothScroll('a[href*="asdjhashdkjasdkja"]', {
      speed: 500,
      offset: -300,
      easing: 'easeInOutCubic',
    });
  }

  prepareNotificationData = require('./helpers/prepareNotificationData').default;
  toast = require('./helpers/toast').default.bind(this);


  @autobind
  onError(err = {}, err2) {
    this.toast({
      ...this.prepareNotificationData(err, 'error'),
      ...this.prepareNotificationData(err2, 'error'),
    });
  }


  confirm(props) {
    return this.confirmRef?.open(props);
  }

  scrollTo(selector) {
    if (this.scroll) {
      if (!selector) return null;
      const field = document.querySelector(selector);
      if (!field) return null;
      this.scroll.animateScroll(field);
    }
    return null;
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
      global.NProgress = NProgress;
      NProgress.start();
    } catch (err) {
      // console.log('NProgress', err);
    }
  }
  async afterResolve(...args) {
    await super.afterResolve(...args);
    // this.page
    // document.body.scrollTop = 0; // @TODO: back
    if (this.page && this.page.renderFullTitle) {
      if (typeof document !== 'undefined') {
        document.title = this.page.renderFullTitle();
      }
      this.page.toTop();
    }
    try {
      NProgress.done();
    } catch (err) {
      // console.log('NProgress', err);
    }
    // @TODO: to @natavts favicon, meta tags
  }
}
