import Err from '@lskjs/err';
import nodecron from 'node-cron';

export default function runCron({ bot }) {
  const initedCrons = [];
  if (!this.rules) return [];
  this.rules.forEach((rule) => {
    if (!rule.cron) return;
    const { action } = rule;
    const times = Array.isArray(rule.cron) ? rule.cron : [rule.cron];
    times.forEach((time) => {
      if (!nodecron.validate(time)) throw new Err('CRON_NOT_VALID', { data: { time } });
      initedCrons.push({
        time,
        rule,
        schedule: nodecron.schedule(time, async () => {
          this.log.trace(`CRON action on '${time}'`, rule);
          const actionModule = await this.module('action');
          actionModule.runAction(action, { bot, ...rule });
        }),
      });
    });
  });
  if (initedCrons.length) {
    this.log.debug(
      'runCron',
      initedCrons.map((cron) => cron.time),
    );
  }
  return initedCrons;
}
