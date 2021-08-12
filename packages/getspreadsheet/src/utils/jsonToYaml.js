// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

export function jsonToYaml(data, options) {
  const fn = options.safe ? yaml.safeDump : yaml.dump;
  return fn(data, { indent: 2, skipInvalid: false, flowLevel: -1, ...options });
}

export default jsonToYaml;
