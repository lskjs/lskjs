import isTouchDevice from './isTouchDevice';

export default function detectHtmlClasses() {
  const classes = [];

  const uA = window.navigator.userAgent;
  if (uA.indexOf('Safari') !== -1 && uA.indexOf('Chrome') === -1) classes.push('safari');
  if (uA.indexOf('MSIE ') > 0) classes.push('ie10');
  if (uA.indexOf('Trident/') > 0) classes.push('ie11');
  if (uA.indexOf('Edge/') > 0) classes.push('edge');
  if (uA.indexOf('Firefox/') > 0) classes.push('firefox');
  classes.push(isTouchDevice() ? 'ua_touchable_yes' : 'ua_touchable_no');
  return classes;
}
