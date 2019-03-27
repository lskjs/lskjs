import flattenDeep from 'lodash/flattenDeep';
import get from 'lodash/get';
import uniq from 'lodash/uniq';
import Promise from 'bluebird';

const DEBUG = __DEV__;

export default ({ config }) => {
  Promise.config = () => {}; // херов багфикс для телеграма
  let TelegramBot;
  if (!config) {
    DEBUG && console.log('!tbot.config');
    return null;
  }
  try {
    TelegramBot = require('node-telegram-bot-api');
  } catch (err) {
    DEBUG && console.log('TelegramBot init', err);
    return null;
  }

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
      const debugIds = getIds('debug');
      debugIds.forEach((id) => {
        try {
          tbot.sendMessage(id, `#debug ${args[0]} => ${JSON.stringify(ids)}\n\n${text}`).catch((err) => { console.log('tbot.sendMessage err', err); });
        } catch (err) {
          DEBUG && console.log('tbot.sendMessage err', err);
        }
      });
      ids.forEach((id) => {
        try {
          // console.log('this.tbot.sendMessage', id);
          tbot.sendMessage(id, text).catch((err) => { console.log('tbot.sendMessage err', err); });
        } catch (err) {
          DEBUG && console.log('tbot.sendMessage err', err);
        }
      });
    };
    tbot.notify = (text) => {
      tbot.broadcast('notify', text);
    };
    // this.tbot.notify('Всем приветик в этом чатике');
  } catch (err) {
    DEBUG && console.log('TelegramBot', err);
  }

  return tbot;
};
