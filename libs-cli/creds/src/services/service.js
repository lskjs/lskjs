import Err from '@lskjs/err';

export class Service {
  constructor(options, config, force) {
    this.options = options;
    this.config = config;
    this.force = force;
    this.server = options.server || config.server;
    this.id = options.id || config.id;
    this.token = options.token || config.token;
    this.projectName = options.project || config.project;
  }

  checkConfig() {
    throw new Err('UNIMPLEMENTED');
  }

  async uploadSecret(key, content) {
    throw new Err('UNIMPLEMENTED');
  }

  async uploadVariable(key, content) {
    throw new Err('UNIMPLEMENTED');
  }

  getServiceLink() {
    return '';
  }

  getProjectName() {
    return this.projectName;
  }

  getId() {
    return this.id || '';
  }

  getCICDSettingURL() {
    return '';
  }

  async uploadEnv() {
    throw new Err('UNIMPLEMENTED');
  }
}

export default Service;
