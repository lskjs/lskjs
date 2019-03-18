export default function isTouchDevice() {
  if (typeof window !== 'undefined') {
    const el = window.document.createElement('div');
    el.setAttribute('ongesturestart', 'return;');
    return typeof el.ongesturestart === 'function';
  }
  return false;
}
