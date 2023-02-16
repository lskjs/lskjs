/* eslint-disable no-param-reassign */
export const checkLimit = (stat: any, limit: number, size: number): boolean => {
  if (Date.now() > +(stat.startedAt || 0) + size) {
    stat.startedAt = Date.now();
    stat.ignore = 0;
    stat.count = 0;
  }

  if (stat.count > limit) {
    stat.ignore += 1;
    return false;
  }
  stat.count += 1;
  return true;
};

export const checkLimits = (stats: any, limits: any): boolean => {
  const sizes = {
    sum: 1000 * 60 * 60 * 1000,
    '1hour': 60 * 60 * 1000,
    '5min': 5 * 60 * 1000,
    '1min': 60 * 1000,
    '10sec': 10 * 1000,
  };

  const checks = Object.keys(sizes)
    .reverse()
    .map((name) => {
      const size = sizes[name];
      if (!stats[name]) stats[name] = {};
      return checkLimit(stats[name], limits[name], size);
    });

  return checks.every(Boolean);
};

export default checkLimits;
