function secToTime(sec) {
  let s = sec;
  let h = Math.floor(s / 3600);
  s %= 3600;
  let m = Math.floor(s / 60);
  s %= 60;
  if (h < 10) h = `0${h}`;
  if (m < 10) m = `0${m}`;
  if (s < 10) s = `0${s}`;
  if (h === '00') {
    return `${m}:${s}`;
  }
  return `${h}:${m}:${s}`;
}

export default secToTime;
