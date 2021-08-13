import Bluebird from 'bluebird';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';

const statuses = {
  high: '🔥',
  warn: '❕',
  default: '❓',
};

const ignoreMd = (text) => text.replaceAll(/[^A-Za-z0-9А-Яа-я ]/gi, (c) => `\\${c}`);

const getText = (text, parseMode) => (['Markdown', 'MarkdownV2'].includes(parseMode) ? ignoreMd(text) : text);

const getEmoji = (type) => statuses[type] || statuses.default;

const getAlertname = (data, parseMode) => {
  const text = `${get(data, 'labels.alertname', '')}`;
  return getText(text, parseMode);
};

const getDescription = (data) => {
  const text = get(data, 'annotations.description', '');
  return `\`${text}\``;
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

export default async function summary({ data, params }) {
  const { telegram, groupBy: groupByValue = false, parseMode } = params;

  const chats = Array.isArray(telegram) ? telegram : [telegram];
  const groupData = groupByValue ? groupBy(data, groupByValue) : data;

  return Bluebird.map(
    Object.keys(groupData),
    async (dataType) => {
      const alertData = groupData[dataType];
      const alertInfoTexts = alertData.map(
        (d) => `*${getAlertname(d, parseMode)}*\n\n${getDescription(d)}\n—————————————\n`,
      );

      const sumTexts = alertData.map((d) => `${getText('-', parseMode)} ${getAlertname(d, parseMode)}\n`);

      const messageTexts = getMessageTexts([
        `${getEmoji(dataType)}\n`,
        ...sumTexts,
        `\n\n${getText('=======', parseMode)}\n\n`,
        ...alertInfoTexts,
      ]);

      return Bluebird.map(chats, async (chat) =>
        Bluebird.mapSeries(messageTexts, (text) => this.bot.sendMessage(chat, text, { parse_mode: parseMode })),
      );
    },
    {
      concurrency: 10,
    },
  );
}
