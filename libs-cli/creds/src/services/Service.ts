import { Err } from '@lskjs/err';
import { log } from '@lskjs/log/log';
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
};

export class Service {
  projectId?: string;
  projectName?: string;
  projectPath?: string;
  projectCredsUrl?: string;

  token: string;
  server: string;
  force: boolean;

  constructor(options) {
    Object.assign(this, options);
    this.checkConfig();
    // this.options = options;
    // this.config = config;
    // this.server = options.server || config.server;
    // this.projectId = options.projectId || config.projectId;
    // this.token = options.token || config.token;
    // this.projectName = options.project || config.project;
  }

  checkConfig() {
    throw new Err('NOT_IMPLEMENTED');
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

  async uploadAll(env: Secrets) {
    if (!env) throw new Err('!env');
    const { secrets = {}, variables = {}, files = [] } = env;
    await map(Object.entries(secrets), async ([key, value]) => {
      try {
        await this.uploadSecret(key, value);
        log.info(`[OK] Secret ${key} uploaded`);
      } catch (e) {
        log.error(`[ERR] Secret ${key} not uploaded, because`, e.message);
      }
    });
    await map(Object.entries(variables), async ([key, value]) => {
      try {
        await this.uploadVariable(key, value);
        log.info(`[OK] Variable ${key} uploaded`);
      } catch (e) {
        log.error(`[ERR] Variable ${key} not uploaded, because`, e.message);
      }
    });
    await map(files, async ({ name, credType, content }: any) => {
      const key = name;
      const value = content;
      try {
        if (credType === 'variable') {
          await this.uploadVariable(key, value);
        } else if (credType === 'secret') {
          await this.uploadVariable(key, value);
        } else if (credType === 'skip') {
          log.debug(`[SKIP] File ${key} uploaded as ${credType}`);
          return;
        } else {
          throw new Err('unknown credType', { credType });
        }
        log.info(`[OK] File ${key} uploaded as ${credType}`);
      } catch (e) {
        log.error(`[ERR] File ${key} not uploaded as ${credType}, because`, e.message);
      }
    });
  }
}
