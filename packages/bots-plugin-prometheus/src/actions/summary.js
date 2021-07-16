import Bluebird from 'bluebird';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';

const statuses = {
  high: '🔥',
  warn: '❕',
  default: '❓',
};

const ignoreMd = (text) => text.replaceAll(/[*|_]/gi, (c) => `\\${c}`);

const getEmoji = (type) => (statuses[type] ? statuses[type] : statuses.default);

export default async function summary({ data, params }) {
  const { telegram, groupBy: groupByValue, parseMode } = params;

  const chats = Array.isArray(telegram) ? telegram : [telegram];
  const groupData = groupBy(data, groupByValue);

  return Bluebird.map(Object.keys(groupData), async (dataType) => {
    const alertData = groupData[dataType];
    const alertInfoText = alertData.map((d) => get(d, 'labels.alertname', '')).join('\n- ');
    const text = parseMode ? ignoreMd(alertInfoText) : alertInfoText;

    const resultText = `${getEmoji(dataType)} *${dataType}*\n\n- ${text}`;

    return Bluebird.map(chats, async (chat) => this.bot.sendMessage(chat, resultText, { parse_mode: parseMode }));
  });
}
