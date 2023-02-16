import Graceful from '@ladjs/graceful';
import Module from '@lskjs/module';
import Bree from 'bree';
import get from 'lodash/get';
import map from 'lodash/map';

import { config } from './config';


export class CronServerModule extends Module {
  config = config;
  async init() {
    await super.init();

    const jobs = map(this.jobs || {}, (job, jobName) => {
      if (false);  //eslint-disable-line
      return {
        name: jobName,
        ...get(this, `config.jobs.${jobName}`, {}),
        path: job,
        // path: job.bind(this),
      };
    });
    this.log.trace(
      'jobs',
      jobs.map((j) => j.name),
    );
    const { app } = this;

    // const jobs = []
    jobs.push({
      name: 'asdasdas',
      path: (...args) => {
        console.log('asdasdas', ...args, process.env);
      },
      workerData: {
        a: 123,
      },
      worker: {
        workerData: {
          b: 123,
        },
      },
    });

    this.bree = new Bree({
      logger: this.log,
      // ...this.config,
      root: this.config.root,
      jobs,

      worker: {
        workerData: {
          appConfig: this.app.config,
          config: this.config,
          // cronModule: this,
          // app: this.app,
        },
      },
      // jobs,
      errorHandler: (error, workerMetadata) => {
        // workerMetadata will be populated with extended worker information only if
        // Bree instance is initialized with parameter `workerMetadata: true`
        if (workerMetadata.threadId) {
          this.log.info(
            `There was an error while running a worker ${workerMetadata.name} with thread ID: ${workerMetadata.threadId}`,
          );
        } else {
          this.log.info(`There was an error while running a worker ${workerMetadata.name}`);
        }

        this.log.error(error);
        // errorService.captureException(error);
      },
    });

    this.bree.on('worker created', (name) => {
      this.log.trace('worker created', name);
      // this.log.trace(this.bree.workers[name]);
    });

    this.bree.on('worker deleted', (name) => {
      this.log.trace('worker deleted', name);
      // this.log.trace(typeof this.bree.workers[name] === 'undefined');
    });
  }
  async run() {
    await super.run();
    this.graceful = new Graceful({ brees: [this.bree] });
    this.graceful.listen();
    this.bree.start();
  }
}

export default CronServerModule;
