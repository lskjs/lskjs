import flattenDeep from 'lodash/flattenDeep';
import get from 'lodash/get';
import uniq from 'lodash/uniq';
import Promise from 'bluebird';
Promise.config = () => {}; // херов багфикс для телеграма
let TelegramBot;
try {
  TelegramBot = require('node-telegram-bot-api');
} catch (err) {
  __DEV__ && console.log('TelegramBot init', err);
}

export default (ctx, module) => {
  const config = module.config.telegram;

  function getIdsRec(idOrStringOrArray) {
    if (Array.isArray(idOrStringOrArray)) {
      return flattenDeep(idOrStringOrArray.map(getIdsRec));
    }
    if (typeof idOrStringOrArray === 'string') {
      return get(config, idOrStringOrArray);
    }
    if (typeof idOrStringOrArray === 'number') {
      return idOrStringOrArray;
    }
    return null;
  }

  function getIds(idOrStringOrArray) {
    let ids = getIdsRec(idOrStringOrArray);
    if (!Array.isArray(ids)) {
      ids = [ids];
    }
    return uniq(ids.filter(a => a));
  }

  let tbot;
  try {
    tbot = new TelegramBot(config.token, { polling: true });
    tbot.broadcast = (...args) => {
      // console.log('tbot.broadcast', args);
      let ids;
      let text;
      if (args.length === 1) {
        ids = getIds('root');
        text = args[0];
      } else {
        ids = getIds(args[0]);
        text = args[1];
      }
      ids.forEach((id) => {
        try {
          // console.log('this.tbot.sendMessage', id);
          tbot.sendMessage(id, text).catch((err) => { console.log('tbot.sendMessage err', err); });
        } catch (err) {
          __DEV__ && console.log('tbot.sendMessage err', err);
        }
      });
    };
    tbot.notify = (text) => {
      tbot.broadcast('notify', text);
    };
    // this.tbot.notify('Всем приветик в этом чатике');
  } catch (err) {
    __DEV__ && console.log('TelegramBot', err);
  }

  return tbot;
};
