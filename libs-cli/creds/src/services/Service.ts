import { Err } from '@lskjs/err';
import { log } from '@lskjs/log/log';
import axios from 'axios';
import { map } from 'fishbird';

type SecretFile = {
  name: string;
  filename: string;
  credType?: string;
  content?: string;
  handler: (any) => Record<string, any>;
};
type Secrets = {
  secrets?: Record<string, string>;
  variables?: Record<string, string>;
  files?: Array<SecretFile>;
  hooks?: Array<any>;
};

export class Service {
  projectId?: string;
  projectName?: string;
  projectPath?: string;
  projectCredsUrl?: string;

  token: string;
  server: string;
  force: boolean;

  client: axios.AxiosInstance;

  constructor(options) {
    Object.assign(this, options);
    this.checkConfig();
    const clientOptions = {
      baseURL: this.getBaseUrl(),
      headers: this.getHeaders(),
    };
    this.client = axios.create(clientOptions);
    // TODO: сделать такой интерцептор
    // .catch((err) => {
    //   throw new Err(err.message, { data: err?.response?.data });
    //   // console.log(err.response.data);
    // });
  }

  checkConfig() {
    throw new Err('NOT_IMPLEMENTED');
  }
  getBaseUrl() {
    return null;
  }
  getHeaders() {
    return {};
  }
  getServiceLink() {
    return null;
  }
  getProjectName() {
    return this.projectName;
  }
  getProjectId() {
    return this.projectId;
  }
  getProjectPath() {
    return this.projectPath;
  }
  getProjectUrl() {
    return null;
  }
  getProjectCredsUrl() {
    return this.projectCredsUrl;
  }
  getProjectCICDSettingURL() {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async uploadSecret(key: string, content: string) {
    throw new Err('NOT_IMPLEMENTED');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async uploadVariable(key: string, content: string) {
    throw new Err('NOT_IMPLEMENTED');
  }

  async removeOldHooks() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async uploadHook(dataHook: any) {}

  async uploadHooks(env: Secrets): Promise<void> {
    if (!env) throw new Err('!env');
    const { hooks = [] } = env;
    try {
      await this.removeOldHooks();
    } catch (e) {
      log.error(`[ERR] Old hooks removing failed:`, e.message);
    }

    await map(hooks, async (dataHook, index) => {
      try {
        await this.uploadHook(dataHook);
        log.info(`[OK] Hook ${index} uploaded`);
      } catch (e) {
        log.error(`[ERR] Hook ${index} not uploaded:`, e.message);
      }
    });
  }

  async uploadAll(env: Secrets) {
    if (!env) throw new Err('!env');
    const { secrets = {}, variables = {}, files = [] } = env;
    await this.uploadHooks(env);
    await map(Object.entries(secrets), async ([key, value]) => {
      try {
        await this.uploadSecret(key, value);
        log.info(`[OK] Secret ${key} uploaded`);
      } catch (e) {
        log.error(`[ERR] Secret ${key} not uploaded, because`, e.message);
        log.error(e);
      }
    });
    await map(Object.entries(variables), async ([key, value]) => {
      try {
        await this.uploadVariable(key, value);
        log.info(`[OK] Variable ${key} uploaded`);
      } catch (e) {
        log.error(`[ERR] Variable ${key} not uploaded, because`, e.message);
        // log.error(e);
      }
    });
    await map(files, async ({ name, credType, content }: any) => {
      const key = name;
      const value = content;
      try {
        if (credType === 'variable') {
          await this.uploadVariable(key, value);
        } else if (credType === 'secret') {
          await this.uploadSecret(key, value);
        } else if (credType === 'skip') {
          log.debug(`[SKIP] File ${key} uploaded as ${credType}`);
          return;
        } else {
          throw new Err('unknown credType', { credType });
        }
        log.info(`[OK] File ${key} uploaded as ${credType}`);
      } catch (e) {
        log.error(`[ERR] File ${key} not uploaded as ${credType}, because`, e.message);
        // log.error(e);
      }
    });
  }
}
