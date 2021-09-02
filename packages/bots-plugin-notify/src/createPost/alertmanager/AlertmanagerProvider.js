import utils from '../../utils';

const { getCode } = utils;

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
  provider,
) => `\
${getStatus({ status, severity })} ${getCode(alertname, provider)}

${description}

${grafana ? `\n[grafana](${grafana})` : ''}\
`;

const alertsLog = ({ alerts }, provider) => alerts.map(alertLog, provider).join('\n\n------\n\n');

export default (message, provider) =>
  // console.log({ message });
   alertsLog(message.meta, provider) //eslint-disable-line
