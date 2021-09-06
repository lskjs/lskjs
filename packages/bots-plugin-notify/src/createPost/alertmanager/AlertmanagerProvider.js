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

${description}

${grafana ? `\n[grafana](${grafana})` : ''}\
`;

const alertsLog = ({ alerts }, provider) => alerts.map(alertLog, provider).join('\n\n------\n\n');

export const alertmanager = (message, provider) => alertsLog(message.meta, provider);

export default alertmanager;
