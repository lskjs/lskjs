export function secToTime(sec) {
  let h = Math.floor(sec / 3600);
  sec %= 3600;
  let m = Math.floor(sec / 60);
  let s = sec % 60;
  if (h < 10) h = `0${h}`;
  if (m < 10) m = `0${m}`;
  if (s < 10) s = `0${s}`;
  return `${h}:${m}:${s}`;
}

export default secToTime;
