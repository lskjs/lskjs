import Bluebird from 'bluebird';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';

const statuses = {
  high: '🔥',
  warn: '❕',
  default: '❓',
};

const ignoreMd = (text) => text.replaceAll(/[^A-Za-z0-9А-Яа-я]/gi, (c) => `\\${c}`);

const getEmoji = (type) => (statuses[type] ? statuses[type] : statuses.default);

const getAlertname = (data, parseMode) => {
  const text = `${get(data, 'labels.alertname', '')}`;
  return ['Markdown', 'MarkdownV2'].includes(parseMode) ? ignoreMd(text) : text;
};

const getDescription = (data) => {
  const text = get(data, 'annotations.description', '');
  return `\`${text}\``;
};

export default async function summary({ data, params }) {
  const { telegram, groupBy: groupByValue = false, parseMode } = params;

  const chats = Array.isArray(telegram) ? telegram : [telegram];
  const groupData = groupByValue ? groupBy(data, groupByValue) : data;

  return Bluebird.map(Object.keys(groupData), async (dataType) => {
    const alertData = groupData[dataType];
    const alertInfoText = alertData
      .map((d) => `*${getAlertname(d, parseMode)}*\n\n${getDescription(d)}`)
      .join('\n—————————————\n');

    const resultText = `${getEmoji(dataType)} *${dataType}*\n\n${alertInfoText}`;

    return Bluebird.map(chats, async (chat) => this.bot.sendMessage(chat, resultText, { parse_mode: parseMode }));
  });
}
