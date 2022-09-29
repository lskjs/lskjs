import { getBool } from '../../utils';

export const getGraylogMessage = (req, message) => {
  const graylogMessage = {};

  graylogMessage.event = 'alert';
  graylogMessage.type = 'graylog';
  graylogMessage.meta = req.body;
  graylogMessage.isMd = getBool(req.query.isMd, false);

  return { ...message, ...graylogMessage };
};

export default getGraylogMessage;
