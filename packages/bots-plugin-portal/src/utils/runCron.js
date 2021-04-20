import cron from 'node-cron';

import { runAction } from '.';

export default function runCron({ bot }) {
  const crons = {};
  this.rules
    .filter((rule) => {
      if (typeof rule.when === 'string' && cron.validate(rule.when)) return true;

      if (Array.isArray(rule.when)) {
        return rule.when.every((i) => typeof i === 'string' && cron.validate(i));
      }
      return false;
    })
    .forEach((rule) => {
      const { when } = rule;
      if (Array.isArray(when)) {
        when.forEach((r) => {
          crons[r] = {
            rule,
            cron: cron.schedule(r, () => {
              this.log.debug(`CRON action on '${r}'`, rule);
              runAction.call(this, { bot, ...rule });
            }),
          };
        });
        return;
      }
      crons[when] = {
        rule,
        cron: cron.schedule(rule.when, () => {
          this.log.debug(`CRON action on '${when}'`, rule);
          runAction.call(this, { bot, ...rule });
        }),
      };
    });
  return crons;
}
