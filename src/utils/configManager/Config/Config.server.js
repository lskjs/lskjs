import cloneDeep from 'lodash/cloneDeep';

import BaseConfig from './Config';
import getConfigFromEnvJson from './getConfigFromEnvJson';

export default class Config extends BaseConfig {
  exportFile(path = '.env.json') {
    const config = getConfigFromEnvJson(path);
    this._withoutEnvJson = cloneDeep(this.toObject());
    return this.merge(config);
  }
}
