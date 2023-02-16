import TeleSignSDK from 'telesignsdk'; // npm audit error

const TIMEOUT = 10 * 1000; // 10 secs
const MESSAGE_TYPE = 'ARN';

export default (config = {}, log) => {
  const client = new TeleSignSDK(
    config.customerId,
    config.apiKey,
    config.endpoint,
    config.timeout || TIMEOUT,
    // userAgent
  );

  return ({ phone, text, type } = {}) => {
    if (config.trace && log) {
      log.trace('sms.send', [type, phone, text].join(' '));
    }
    if (config.debug) {
      return null;
    }
    return new Promise((resolve, reject) => {
      if (type === 'voice' || type === 'phone') {
        client.voice.call(
          (err, data) => {
            if (err) return reject(err);
            return resolve(data);
          },
          phone,
          text,
          config.messageType || MESSAGE_TYPE,
        );
      } else {
        client.sms.message(
          (err, data) => {
            if (err) return reject(err);
            return resolve(data);
          },
          phone,
          text,
          config.messageType || MESSAGE_TYPE,
        );
      }
    });
  };
};
