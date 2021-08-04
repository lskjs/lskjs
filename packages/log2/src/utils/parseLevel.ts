import { reverseLevels } from '../config';
import { LoggerLevelType } from '../types';

export const parseLevel = (arg: any): LoggerLevelType | null => {
  if (typeof arg !== 'object') return null;
  // if (typeof arg === 'string' || typeof arg === 'number') {
  const rawLevel: string = arg.level || arg.l;
  const level = reverseLevels[rawLevel];
  if (!level) return null;
  return level;
};

export default parseLevel;
