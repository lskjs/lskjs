const cutText = (text: string = '', length: number = 100, center: number = 0, cutter: string = '...'): string => {
  if (typeof text !== 'string') return '';

  const cutterLength = cutter.length;
  const textLength = text.length;
  let subTextFrom = center - Math.floor(length / 2);
  let subTextTo = center + Math.floor(length / 2);

  if (subTextFrom < 0) {
    subTextFrom = 0;
    subTextTo = length;
  }
  if (subTextTo > textLength) {
    subTextFrom = textLength - length;
    subTextTo = length;
  }
  if (subTextFrom < 0) {
    subTextFrom = 0;
  }

  let subtext = text.substr(subTextFrom, subTextTo - subTextFrom);

  if (subTextFrom > 0) {
    subtext = `${cutter}${subtext.substr(cutterLength)}`;
  }

  if (subTextTo < textLength) {
    subtext = `${subtext.substr(0, subtext.length - cutterLength)}${cutter}`;
  }

  return subtext;
};

export default cutText;
