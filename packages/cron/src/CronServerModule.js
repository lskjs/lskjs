import Err from '@lskjs/err';
import Module from '@lskjs/module';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import { CronJob } from 'cron';
import get from 'lodash/get';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';

import { config as defaultConfig } from './config';

export class CronServerModule extends Module {
  config = defaultConfig;
  exec(name) {
    if (!this.jobsConfigs[name]) throw new Err('!cron', { name });
    return this.jobsConfigs[name].onTick();
  }
  wrapOnTick(onTick, config) {
    const tick = onTick.bind(this);
    return async () => {
      try {
        const res = await tick(config);
        this.log.debug('[ok]', config.name);
        return res;
      } catch (err) {
        this.log.error('[error]', config.name, err);
        return { err };
      }
    };
  }
  getJobsConfigs() {
    const jobs = mapValues(this.jobs || {}, (onTick, jobName) => {
      if (false);  //eslint-disable-line
      const config = {
        ...pick(this.config, ['timeZone', 'utcOffset']),
        name: jobName,
        ...get(this, `config.jobs.${jobName}`, {}),
      };
      config.onTick = this.wrapOnTick(onTick, config);
      return config;
    });

    return jobs;
  }
  async init() {
    await super.init();
    this.jobsConfigs = this.getJobsConfigs();
    this.log.trace(
      'jobs',
      map(this.jobsConfigs, (j) => j.name),
    );
    this.jobs = mapValues(this.jobsConfigs, (config) => {
      if (!config.cronTime) throw new Err('!cronTime', { config });
      return new CronJob(config);
    });
  }
  async run() {
    await super.run();
    if (!this.config.disable) {
      await asyncMapValues(this.jobs, (job) => job.start());
      this.log.debug(
        'jobs started',
        map(this.jobsConfigs, (j) => `${j.name} ${j.cronTime}`),
      );
    } else {
      this.log.debug('disabled')
    }
  }
}

export default CronServerModule;
