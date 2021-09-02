import Bluebird from 'bluebird';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';

const statuses = {
  high: '🔥',
  warn: '❕',
  default: '❓',
};

const ignoreMd = (text, provider) => {
  if (provider === 'telegram') return text.replaceAll(/[^A-Za-z0-9А-Яа-я ]/gi, (c) => `\\${c}`);
  return text;
};

const getText = (text, parseMode, provider) =>
  ['Markdown', 'MarkdownV2'].includes(parseMode) ? ignoreMd(text, provider) : text;

const getCode = (text, provider) => {
  if (provider === 'telegram') return `\`${text}\``;
  return `\`\`\`${text}\`\`\``;
};

const getEmoji = (type) => statuses[type] || statuses.default;

const getAlertname = (data, parseMode, provider = 'telegram') => {
  const text = `${get(data, 'labels.alertname', '')}`;
  return getText(text, parseMode, provider);
};

const getDescription = (data, provider = 'telegram') => {
  const text = get(data, 'annotations.description', '');
  return getCode(text, provider);
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
        (d) => `*${getAlertname(d, parseMode, provider)}*\n\n${getDescription(d, provider)}\n—————————————\n`,
      );

      const sumTexts = alertData.map(
        (d) => `${getText('-', parseMode, provider)} ${getAlertname(d, parseMode, provider)}\n`,
      );

      const messageTexts = getMessageTexts([
        `${getEmoji(dataType)}\n`,
        ...sumTexts,
        `\n\n${getText('=======', parseMode, provider)}\n\n`,
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
