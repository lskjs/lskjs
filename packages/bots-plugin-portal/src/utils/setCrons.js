import cron from 'node-cron';

export default function setCrons() {
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
      if (Array.isArray(rule.when)) {
        rule.when.forEach((r) => {
          crons[r] = {
            rule,
            cron: cron.schedule(r, () => {
              // TODO: Заменить на фунцию подбора action
              this.log.debug(`CRON action on '${r}'`);
            }),
          };
        });
        return;
      }
      crons[rule.when] = {
        rule,
        cron: cron.schedule(rule.when, () => {
          // TODO: Заменить на фунцию подбора action
          this.log.debug(`CRON action on '${rule.when}'`);
        }),
      };
    });
  return crons;
}
