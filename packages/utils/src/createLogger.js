export default ({ type = 'debug', enable = __DEV__, name } = {}) => (...args) => {
  if (!enable) return;
  const messages = [];
  if (name) messages.push(`(${name})`);
  if (type === 'deprecatated') {
    messages.unshift('!DEPRECATED!');
  } else if (type === 'debug') {
    messages.unshift('[d]');
  }
  console.log(...messages, ...args); // eslint-disable-line no-console
};
