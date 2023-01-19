// eslint-disable-next-line import/no-extraneous-dependencies
import { dump } from 'js-yaml';

export function jsonToYaml(data: any, options: any = {}) {
  // const fn = options.safe ? yaml.safeDump : yaml.dump;
  return dump(data, { indent: 2, skipInvalid: false, flowLevel: -1, ...options });
}

export default jsonToYaml;
