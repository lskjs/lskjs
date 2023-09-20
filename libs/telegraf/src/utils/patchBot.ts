type Callback = (method: string, ctx: any, args: any[], res: any) => Promise<void>;

// ['sendMessage', 'sendDocument', 'sendPhoto', 'sendMediaGroup']
export const patchBot = (bot: any, methods: string[], callback: Callback) => {
  methods.forEach((method) => {
    const fn = bot.telegram[method];
    // eslint-disable-next-line no-param-reassign
    bot.telegram[method] = async function (...args: any[]) {
      const res = await fn.apply(bot.telegram, args);
      const ctx = { botInfo: bot.botInfo };
      if (callback) await callback(method, ctx, args, res);
      return res;
    };
  });
};
