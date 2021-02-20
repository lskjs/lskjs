import BaseProvider from './BaseProvider';

const statuses = {
  firing: '🔥',
  resolved: '✅',
  default: '❓',
};

const getStatus = (status) => statuses[status] || statuses.default;

const alertLog = ({ status, labels: { severity, alertname, instance }, annotations: { grafana, description } }) => `\
${getStatus(status)} ${severity}: \`${alertname}\`
${instance} 
\`\`\`
${description}
\`\`\`
${grafana ? `\n[grafana](${grafana})` : ''}\
`;

const alertsLog = ({ alerts }) => alerts.map(alertLog).join('\n\n------\n\n');

export default class AlertmanagerProvider extends BaseProvider {
  onEvent(message) {
    return alertsLog(message.meta);
  }

  onReq(req, { projectConfig }) {
    // Message.create()
    const message = {
      _id: Date.now() + Math.random(),
      createdAt: new Date(),
      type: 'manual',
      project: projectConfig.name,
      sended: false,
    };

    message.event = 'alert';
    message.type = 'alertmanager';
    message.meta = req.body;

    return message;
  }
}
