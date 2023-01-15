export const pad = (string: string, width = 0, fillString = ' '): string => {
  const extra = width - string.length;
  if (extra <= 0) return string;
  const start = Math.floor(extra / 2);
  const end = extra - start;
  return fillString.repeat(start) + string + fillString.repeat(end);
};

export default pad;
