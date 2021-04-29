import Err from '@lskjs/utils/Err';
import nodecron from 'node-cron';

export default function runCron({ bot }) {
  const initedCrons = [];
  this.rules.forEach((rule) => {
    if (!rule.cron) return;
    const times = Array.isArray(rule.cron) ? rule.cron : [rule.cron];
    times.forEach((time) => {
      if (!(typeof time === 'string' && nodecron.validate(time))) throw new Err('CRON_NOT_VALID', { data: { time } });
      initedCrons.push({
        time,
        rule,
        schedule: nodecron.schedule(time, () => {
          this.log.trace(`CRON action on '${time}'`, rule);
          this.runAction({ bot, ...rule });
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
