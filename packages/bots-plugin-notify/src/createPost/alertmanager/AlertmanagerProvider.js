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

const alertLog = ({ status, labels: { severity, alertname, instance }, annotations: { grafana, description } }) => `\
${getStatus({ status, severity })} \`${alertname}\`

${description}

${grafana ? `\n[grafana](${grafana})` : ''}\
`;

const alertsLog = ({ alerts }) => alerts.map(alertLog).join('\n\n------\n\n');

export default (message) =>
  // console.log({ message });
   alertsLog(message.meta) //eslint-disable-line
