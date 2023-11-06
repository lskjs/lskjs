import Err from '@lskjs/err';
import axios from 'axios';

import { Service } from './service';

export class GitLab extends Service {
  constructor(...props) {
    super(...props);
    this.baseURL = `https://${this.server}/api/v4/projects/${this.id}/variables`;
  }
  checkConfig() {
    if (!this.server) throw new Err('!server');
    if (!this.id) throw new Err('!id');
    if (!this.token) throw new Err('!token');
  }

  async uploadSecret(key, content) {
    const { data: varData } = await axios({
      method: 'get',
      url: `${this.baseURL}/${key}`,
      headers: {
        'PRIVATE-TOKEN': this.token,
      },
    }).catch((err) => {
      if (!this.force) throw err;
      return { data: { value: '@lskjs/creds' } };
    });

    if (varData.value && varData.value.indexOf('@lskjs/creds') === -1 && !this.force) {
      console.log(`[IGNORE] Project ${this.id} ${key}`);
      return;
    }

    await axios({
      method: 'delete',
      url: `${this.baseURL}/${key}`,
      headers: {
        'PRIVATE-TOKEN': this.token,
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
    }).catch(() => {});

    await axios({
      method: 'post',
      url: this.baseURL,
      data: {
        key,
        variable_type: 'file',
        value: content,
        protected: true,
        // masked: true,
      },
      headers: {
        'PRIVATE-TOKEN': this.token,
      },
    });
  }
  uploadVariable() {
    console.log("GitLab uploading variable doesn't supported");
  }
  uploadEnv() {
    console.log("GitLab uploading env doesn't supported");
    return false;
  }
  getServiceLink() {
    return this.server;
  }
  getCICDSettingURL() {
    return `https://${this.server}/${this.projectName}/-/settings/ci_cd`;
  }
}

export default GitLab;
