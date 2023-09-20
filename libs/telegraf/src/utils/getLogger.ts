import { createLogger, ILogger } from '@lskjs/log';

const loggers: Record<string, ILogger> = {};
export const getLogger = (botInfo: { id?: number | string; username?: string }) => {
  const botUsername = botInfo?.username || botInfo?.id || 'unknown';
  const name = `bot:${botUsername}`;
  if (!loggers[botUsername]) loggers[botUsername] = createLogger(name);
  return loggers[botUsername];
};
