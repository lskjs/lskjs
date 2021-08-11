import Promise from 'bluebird';
import flattenDeep from 'lodash/flattenDeep';
import get from 'lodash/get';
import uniq from 'lodash/uniq';

const DEBUG = __DEV__;

export default ({ config }) => {
  Promise.config = () => {}; // херов багфикс для телеграма
  let TelegramBot;
  if (!config) {
    if (DEBUG) console.log('!tbot.config'); // eslint-disable-line no-console
    return null;
  }
  try {
    TelegramBot = require('node-telegram-bot-api');
  } catch (err) {
    if (DEBUG) console.log('TelegramBot init', err); // eslint-disable-line no-console
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
    return uniq(ids.filter((a) => a));
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
        text = args[0]; // eslint-disable-line prefer-destructuring
      } else {
        ids = getIds(args[0]);
        text = args[1]; // eslint-disable-line prefer-destructuring
      }
      const debugIds = getIds('debug');
      debugIds.forEach((id) => {
        try {
          tbot.sendMessage(id, `#debug ${args[0]} => ${JSON.stringify(ids)}\n\n${text}`).catch((err) => {
            console.log('tbot.sendMessage err', err);
          }); // eslint-disable-line no-console
        } catch (err) {
          if (DEBUG) console.error('tbot.sendMessage err', err); // eslint-disable-line no-console
        }
      });
      ids.forEach((id) => {
        try {
          // console.log('this.tbot.sendMessage', id);
          tbot.sendMessage(id, text).catch((err) => {
            console.log('tbot.sendMessage err', err);
          }); // eslint-disable-line no-console
        } catch (err) {
          if (DEBUG) console.error('tbot.sendMessage err', err); // eslint-disable-line no-console
        }
      });
    };
    tbot.notify = (text) => {
      tbot.broadcast('notify', text);
    };
    // this.tbot.notify('Всем приветик в этом чатике');
  } catch (err) {
    if (DEBUG) console.error('TelegramBot', err); // eslint-disable-line no-console
  }

  return tbot;
};
