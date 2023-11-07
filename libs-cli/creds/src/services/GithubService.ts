import { Err } from '@lskjs/err';
import axios from 'axios';
import _sodium from 'libsodium-wrappers';

import { Service } from './Service';

export class GithubService extends Service {
  checkConfig() {
    if (!this.token) throw new Err('!token');
  }
  getBaseUrl() {
    const server = this.server || 'api.github.com';
    return `https://${server}/repos/${this.getProjectPath()}`;
  }
  getServiceLink() {
    return 'github.com';
  }
  getProjectUrl() {
    return `https://${this.getServiceLink()}/${this.projectName}`;
  }
  getProjectCICDSettingURL() {
    return `${this.getProjectUrl()}/settings/secrets/actions`;
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
      url: `${this.getBaseUrl()}/actions/secrets/public-key`,
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
      url: `${this.getBaseUrl()}/actions/secrets/${key}`,
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
      url: `${this.getBaseUrl()}/actions/variables/${key}`,
      headers: this.getHeaders(),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
    }).catch((err) => err?.response);
    if (status === 404) {
      await axios({
        method: 'post',
        url: `${this.getBaseUrl()}/actions/variables`,
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
        url: `${this.getBaseUrl()}/actions/variables/${key}`,
        data: {
          name: key,
          value: content,
        },
        headers: this.getHeaders(),
      });
    }
  }
}
