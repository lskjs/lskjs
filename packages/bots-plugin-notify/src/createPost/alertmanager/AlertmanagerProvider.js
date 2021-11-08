const statuses = {
  firing: '🔥',
  warn: '❕',
  resolved: '✅',
  default: '❓',
};

const getStatus = ({ status, severity } = {}) =>
  (severity === 'warn' ? statuses[status] : statuses[status]) || statuses.default;

// const alertLog = ({ status, labels: { severity, alertname, instance }, annotations: { grafana, description } }) => (`\
// ${getStatus(status)} ${severity}: \`${alertname}\`
// ${instance}
// \`\`\`
// ${description}
// \`\`\`
// ${grafana ? `\n[grafana](${grafana})` : ''}\
// `);

const alertLog = (
  { status, labels: { severity, alertname, instance }, annotations: { grafana, description } },
  bot,
) => `\
${getStatus({ status, severity })} ${bot.formatCode(alertname)}

${bot.ignoreMd(description)}

${grafana ? `\n${bot.formatLink('grafana', grafana)}` : ''}\
`;

const alertsLog = ({ alerts }, bot) => alerts.map((alert) => alertLog(alert, bot)).join('\n\n------\n\n');

export function alertmanager(message, bot) {
  if (this?.debug) this.log.trace('alertmanager.message', message);
  return { msg: alertsLog(message.meta, bot) };
}

export default alertmanager;
