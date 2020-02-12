/**
 *
 * @param {string} minSec
 *
 * -01:30 => -90
 */
export default minSec => {
  const [min, sec] = minSec.split(':').map(Number);
  const sign = min / Math.abs(min);

  return min * 60 + sec * sign;
};
