import { Err } from '@lskjs/err';
import { log } from '@lskjs/log/log';
import axios from 'axios';

import { Service } from './Service';

export class GitlabService extends Service {
  checkConfig() {
    if (!this.server) throw new Err('!server');
    if (!this.projectId) throw new Err('!projectId');
    if (!this.token) throw new Err('!token');
  }
  getBaseUrl() {
    return `https://${this.server}/api/v4/projects/${this.getProjectId()}/variables`;
  }
  getServiceLink() {
    return this.server;
  }
  getProjectUrl() {
    return `https://${this.getServiceLink()}/${this.getProjectPath()}`;
  }
  getProjectCICDSettingURL() {
    return `${this.getProjectUrl()}/-/settings/ci_cd`;
  }
  async uploadSecret(key, content) {
    const { data: varData } = await axios({
      method: 'get',
      url: `${this.getBaseUrl()}/${key}`,
      headers: {
        'PRIVATE-TOKEN': this.token,
      },
    }).catch((err) => {
      if (!this.force) throw err;
      return { data: { value: '@lskjs/creds' } };
    });

    if (varData.value && varData.value.indexOf('@lskjs/creds') === -1 && !this.force) {
      log.warn(`[IGNORE] Project ${this.projectId} ${key}`);
      return;
    }

    await axios({
      method: 'delete',
      url: `${this.getBaseUrl()}/${key}`,
      headers: {
        'PRIVATE-TOKEN': this.token,
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
    }).catch(() => {});

    await axios({
      method: 'post',
      url: this.getBaseUrl(),
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
  async uploadVariable() {
    log.warn("GitLab uploading variable doesn't supported");
    throw new Err('NOT_IMPLEMENTED');
  }
  async uploadEnv() {
    log.warn("GitLab uploading env doesn't supported");
    throw new Err('NOT_IMPLEMENTED');
  }
}
