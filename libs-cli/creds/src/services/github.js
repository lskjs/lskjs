import Err from '@lskjs/err';
import axios from 'axios';
import _sodium from 'libsodium-wrappers';

import Service from './service';

export class GitHub extends Service {
  constructor(...props) {
    super(...props);
    this.server = this.server || 'api.github.com';
    this.baseURL = `https://${this.server}/repos/${this.projectName}`;
  }
  checkConfig() {
    if (!this.token) throw new Err('!token');
  }

  async uploadSecret(key, content) {
    const { data: publicKeyData } = await axios({
      method: 'get',
      url: `${this.baseURL}/actions/secrets/public-key`,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${this.token}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
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
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${this.token}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
  }
  getServiceLink() {
    return 'github.com';
  }

  getCICDSettingURL() {
    return `https://github.com/${this.projectName}/settings/secrets/actions`;
  }
}

export default GitHub;
