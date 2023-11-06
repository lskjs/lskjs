import Err from '@lskjs/err';
import axios from 'axios';
import Bluebird from 'bluebird';
import _sodium from 'libsodium-wrappers';

import { Service } from './service';

export class GitHub extends Service {
  constructor(...props) {
    super(...props);
    this.server = this.server || 'api.github.com';
    this.baseURL = `https://${this.server}/repos/${this.projectName}`;
  }
  checkConfig() {
    if (!this.token) throw new Err('!token');
  }

  getHeaders() {
    return {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${this.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    };
  }

  async uploadSecret(key, content) {
    const { data: publicKeyData } = await axios({
      method: 'get',
      url: `${this.baseURL}/actions/secrets/public-key`,
      headers: this.getHeaders(),
    });

    if (!publicKeyData?.key) throw new Err('!publicKey');
    if (!publicKeyData?.key_id) throw new Err('!publicKeyId');

    await _sodium.ready;
    const sodium = _sodium;
    const binkey = sodium.from_base64(publicKeyData.key, sodium.base64_variants.ORIGINAL);
    const binsec = sodium.from_string(content);
    const encBytes = sodium.crypto_box_seal(binsec, binkey);
    const output = sodium.to_base64(encBytes, sodium.base64_variants.ORIGINAL);

    await axios({
      method: 'put',
      url: `${this.baseURL}/actions/secrets/${key}`,
      data: {
        encrypted_value: output,
        key_id: publicKeyData.key_id,
      },
      headers: this.getHeaders(),
    });
  }
  async uploadVariable(key, content) {
    const { data: varData, status } = await axios({
      method: 'get',
      url: `${this.baseURL}/actions/variables/${key}`,
      headers: this.getHeaders(),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
    }).catch((err) => err?.response);
    if (status === 404) {
      await axios({
        method: 'post',
        url: `${this.baseURL}/actions/variables`,
        data: {
          name: key,
          value: content,
        },
        headers: this.getHeaders(),
      });
    }
    if (status === 200 && varData.name.toLowerCase() === key.toLowerCase()) {
      await axios({
        method: 'patch',
        url: `${this.baseURL}/actions/variables/${key}`,
        data: {
          name: key,
          value: content,
        },
        headers: this.getHeaders(),
      });
    }
  }
  async uploadEnv(env = {}) {
    if (!env) return false;
    const { secrets = {}, variables = {} } = env;
    await Bluebird.each(Object.entries(secrets), async ([key, value]) => {
      try {
        await this.uploadSecret(key, value);
        console.log(`[OK] Secret ${key} uploaded`);
      } catch (e) {
        console.log(`[ERR] Secret ${key} not uploaded, because`, e.message);
      }
    });
    await Bluebird.each(Object.entries(variables), async ([key, value]) => {
      try {
        await this.uploadVariable(key, value);
        console.log(`[OK] Variable ${key} uploaded`);
      } catch (e) {
        console.log(`[ERR] Variable ${key} not uploaded, because`, e.message);
      }
    });
    return true;
  }
  getServiceLink() {
    return 'github.com';
  }

  getCICDSettingURL() {
    return `https://github.com/${this.projectName}/settings/secrets/actions`;
  }
}

export default GitHub;
