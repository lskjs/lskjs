import Err from '@lskjs/err';
import nodecron from 'node-cron';

export default function runCron({ bot }) {
  const initedCrons = [];
  if (!this.projects) return [];
  this.projects.forEach((project) => {
    if (!project.cron) return;
    const times = Array.isArray(project.cron) ? project.cron : [project.cron];
    times.forEach((time) => {
      if (!nodecron.validate(time)) throw new Err('CRON_NOT_VALID', { data: { time } });
      initedCrons.push({
        time,
        project,
        schedule: nodecron.schedule(time, async () => {
          this.log.trace(`CRON action on '${time}'`, project);
          return this.onEvent({ bot, project });
        }),
      });
    });
  });
  if (initedCrons.length) {
    this.log.debug(
      'runCron',
      initedCrons.map((cron) => cron.cron),
    );
  }
  return initedCrons;
}
