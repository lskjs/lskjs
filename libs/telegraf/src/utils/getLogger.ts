import { createLogger, ILogger } from '@lskjs/log';

const loggers: Record<string, ILogger> = {};
export const getLogger = (botInfo: any) => {
  const botUsername = botInfo?.username || botInfo?.id;
  if (!loggers[botUsername]) loggers[botUsername] = createLogger(`bot:${botUsername}`);
  return loggers[botUsername];
};
