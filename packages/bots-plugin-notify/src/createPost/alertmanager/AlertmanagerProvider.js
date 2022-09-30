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

const alertLog = (alert, bot, isMd) => {
  const {
    status,
    labels: { severity, alertname },
    annotations: { grafana, description },
  } = alert;

  const formatedStatus = getStatus({ status, severity });
  const formatedCode = bot.formatCode(alertname, isMd);
  const formatedDescription = bot.ignoreMd(description, isMd);
  const formatedLink = `\n${bot.formatLink('grafana', grafana, isMd)}`;

  return `\
  ${formatedStatus} ${formatedCode}
  
  ${formatedDescription}
  
  ${formatedLink}\
  `;
};

const alertsLog = (message, bot) =>
  message.meta.alerts.map((alert) => alertLog(alert, bot, message.isMd)).join('\n\n------\n\n');

export function alertmanager(message, bot) {
  if (this?.debug) this.log.trace('alertmanager.message', message);
  return { msg: alertsLog(message, bot) };
}

export default alertmanager;
