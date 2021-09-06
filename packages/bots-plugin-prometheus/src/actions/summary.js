import Bluebird from 'bluebird';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';

const statuses = {
  high: '🔥',
  warn: '❕',
  default: '❓',
};

const getText = (text, parseMode, bot) => (['Markdown', 'MarkdownV2'].includes(parseMode) ? bot.ignoreMd(text) : text);

const getEmoji = (type) => statuses[type] || statuses.default;

const getAlertname = (data, parseMode, bot) => {
  const text = `${get(data, 'labels.alertname', '')}`;
  return getText(text, parseMode, bot);
};

const getDescription = (data, bot) => {
  const text = get(data, 'annotations.description', '');
  return bot.formatCode(text);
};

const getMessageTexts = (texts, limit = 4096) => {
  const resultTexts = [];
  texts.forEach((text) => {
    if (!resultTexts.length) {
      resultTexts.push(text);
      return;
    }

    const lastText = resultTexts[resultTexts.length - 1];

    if (lastText.length + text.length > limit) {
      resultTexts.push(text);
      return;
    }
    resultTexts[resultTexts.length - 1] += text;
  });
  return resultTexts;
};

const getChats = (provider, params) => {
  const chats = params[provider];
  return Array.isArray(chats) ? chats : [chats];
};

export default async function summary({ bot, data, params }) {
  const { groupBy: groupByValue = false, parseMode } = params;
  const { provider, sendMessage } = bot;

  const chats = getChats(provider, params);
  const groupData = groupByValue ? groupBy(data, groupByValue) : data;
  return Bluebird.map(
    Object.keys(groupData),
    async (dataType) => {
      const alertData = groupData[dataType];
      const alertInfoTexts = alertData.map(
        (d) => `*${getAlertname(d, parseMode, bot)}*\n\n${getDescription}\n—————————————\n`,
      );

      const sumTexts = alertData.map((d) => `${getText('-', parseMode, bot)} ${getAlertname(d, parseMode, bot)}\n`);

      const messageTexts = getMessageTexts([
        `${getEmoji(dataType)}\n`,
        ...sumTexts,
        `\n\n${getText('=======', parseMode, bot)}\n\n`,
        ...alertInfoTexts,
      ]);
      return Bluebird.map(chats, async (chat) =>
        Bluebird.mapSeries(messageTexts, async (text) => sendMessage.call(bot, chat, text, { parse_mode: parseMode })),
      );
    },
    {
      concurrency: 10,
    },
  );
}
