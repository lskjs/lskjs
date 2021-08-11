export default function createLoggerMock(config = {}) {
  const levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];

  const level = config.level || 'trace';
  const printLevels = levels.slice(levels.indexOf(level));
  const logger2 = (type) => (...args) => {
    // console.log(printLevels, type, !printLevels.includes(type));
    if (!printLevels.includes(type)) return;
    console.log(`[${type}]`, ...args); // eslint-disable-line no-console
    if (type === 'error' || type === 'fatal') throw type;
  };

  return levels.reduce(
    (r, name) => ({
      ...r,
      [name]: logger2(name),
    }),
    {},
  );
}
