import Bluebird from 'bluebird';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

export default async function checkInterview(params) {
  const BotsTelegramUserModel = await this.actionModule.module('models.BotsTelegramUserModel');

  let { forms: formNames } = params;
  const { forms } = this.app.config.bots.plugins.interview;
  if (!Array.isArray(formNames)) formNames = [formNames];

  if (isEmpty(formNames) || isEmpty(forms)) return false;

  const telegramUser = this.bot.getUser(this.ctx);
  const user = await BotsTelegramUserModel.findOne(telegramUser).lean();
  if (!user) return false;

  const results = await Bluebird.map(formNames, async (form) => {
    if (!forms[form]) return false;
    const { fields } = forms[form];
    return !fields.map((field) => get(user, `meta.interview.${form}.${field}`, undefined)).some((i) => i === undefined);
  });
  const isNotComplited = results.some((i) => i === false);
  if (!isNotComplited) return { res: true };

  return false;
}
