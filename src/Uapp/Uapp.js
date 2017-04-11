import _ from 'lodash';
import UniversalRouter from 'universal-router';
import Core from '../Core';
import Page from './Page';

function isRightHostname(hostnames = [], hostname) {
  for (const name of hostnames) {
    // @TODO: check wildcards
    // console.log('===', name, hostname, name === '*');
    if (name === '*') return true;
    if (name === hostname) return true;
  }
  return false;
}

function findConfigByHostname(configs, hostname) {
  for (const config of configs) {
    if (config.hostnames && isRightHostname(config.hostnames, hostname)) {
      return config;
    }
    // console.log('isRightHostname(config.hosts, hostname)', isRightHostname(config.hosts, hostname));
    if (config.hosts && isRightHostname(config.hosts, hostname)) {
      // console.log('RETURN', config);
      return config;
    }
  }
  return {};
}

function getSiteConfig(props) {
  const config = props.config || {};
  const hostname = props.req.hostname;
  let siteConfig = config.site || {};
  // console.log({hostname, siteConfig});
  if (config.sites && Array.isArray(config.sites)) {
    const findedConfig = findConfigByHostname(config.sites, hostname);
    // console.log({findedConfig});
    if (findedConfig) {
      siteConfig = _.merge({}, siteConfig, findedConfig);
    }
  }
  // console.log({siteConfig});
  return siteConfig;
}

export default class Uapp extends Core {
  Page = Page;
  // constructor(props = {}) {
  //   super(...arguments);
  //   // Object.assign(this, props);
  // }

  init(props = {}) {
    super.init();
    this.config = this.getConfig(this);
    this.routes = this.getRoutes();
    // this.log = this.getLogger();
  }


  getConfig(props) {
    const site = getSiteConfig(props);
    // console.log({site});
    return {
      ...props.config,
      site,
    };
  }

  getRoutes() {
    console.log('getRoutes *********');
    return require('../ReactApp/routes').default;
  }

  resetPage() {
    if (!this.page) {
      this.page = new this.Page();
    }
    this.page.init({
      uapp: this,
    });
    return this.page;
  }

  // initV2(props = {}) {
  //   Object.assign(this, props);
  //   if (!this.page) {
  //     this.page = new this.Page();
  //   }
  //   this.page.init({}, { uapp: this })
  //   return {
  //     uapp: this,
  //     page: this.page,
  //     Page: this.Page,
  //   };
  // }

  // return page for req
  resolve(req = {}) {
    this.resetPage();
    const page = UniversalRouter.resolve(this.routes, {
      ...this.provide(),
      ...req,
    });
    if (page._page) throw '!page';
    return page
  }

  provide() {
    return {
      uapp: this,
      log: this.log,
      config: this.config,
      page: this.page,
    };
  }
}
