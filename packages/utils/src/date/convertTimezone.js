/* eslint-disable no-param-reassign */
import minSecToSec from './minSecToSec';
import newDateThrow from './newDateThrow';

export default (dateStr, targetOffset, fromOffset) => {
  const date = newDateThrow(dateStr);
  if (!fromOffset) {
    fromOffset = date.toISOString().substr(23);
    if (fromOffset === 'Z') fromOffset = 0;
  }
  if (typeof targetOffset === 'string') {
    targetOffset = -minSecToSec(targetOffset);
  }
  if (typeof fromOffset === 'string') {
    fromOffset = -minSecToSec(fromOffset);
  }

  const deltaMin = targetOffset - fromOffset;
  const delta = deltaMin * 60 * 1000;
  const res = new Date(+date + delta);
  // console.log({ date, deltaMin, delta, targetOffset, fromOffset, res });

  return res;
};
