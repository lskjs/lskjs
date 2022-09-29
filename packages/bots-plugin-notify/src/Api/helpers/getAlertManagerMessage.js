import { getBool } from '../../utils';

export const getAlertManagerMessage = (req, message) => {
  const alertManagerMessage = {};

  alertManagerMessage.event = 'alert';
  alertManagerMessage.type = 'alertmanager';
  alertManagerMessage.meta = req.body;
  alertManagerMessage.isMd = getBool(req.query.isMd, false);

  return { ...message, ...alertManagerMessage };
};

export default getAlertManagerMessage;
