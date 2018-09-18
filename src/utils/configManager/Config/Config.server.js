import deepmerge from 'deepmerge';
import isFunction from 'lodash/isFunction';
import merge from 'lodash/merge';
import toPlainObject from 'lodash/toPlainObject';
import forEach from 'lodash/forEach';
import set from 'lodash/set';
import defaultsDeep from 'lodash/defaultsDeep';
import reverse from 'lodash/reverse';
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