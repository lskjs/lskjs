export default function isIE() {
  const ie = typeof window !== 'undefined' && (
    window.navigator.userAgent.indexOf('MSIE ') > 0 ||
    !!window.navigator.userAgent.match(/Trident.*rv\:11\./)
  );
  // ie && console.log('ie', ie);
  return ie;
}
