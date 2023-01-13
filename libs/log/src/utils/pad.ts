export const pad = (a: string, width = 20): string => {
  const extra = width - a.length;
  if (extra <= 0) return a;
  const start = Math.floor(extra / 2);
  const end = extra - start;
  return a.padStart(start).padEnd(end);
};

export default pad;
