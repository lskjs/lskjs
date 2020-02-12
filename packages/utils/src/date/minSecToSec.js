/**
 *
 * @param {string} minSec
 *
 * -01:30 => -90
 */
export default (minSec) => {
  const [min, sec] = minSec.split(':').map(Number);
  const sign = min / Math.abs(min);

  return min * 60 + sec * sign;
};

const newDateThrow = (dateStr) => {
  const date = new Date(dateStr);
  if ((date).toString() === 'Invalid Date') {
    throw {
      code: 'INVALID_DATE',
      date,
      dateStr,
    };
  }
  return date;
};
const convertTimezone = (dateStr, targetOffset, fromOffset = new Date().getTimezoneOffset()) => {
  const date = newDateThrow(dateStr);
  return new Date(date + (targetOffset - fromOffset) * 60 * 1000);
};