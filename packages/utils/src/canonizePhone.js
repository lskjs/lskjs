export default function canonizePhone(str = '') {
  return str.replace(/[^0-9]+/gi, '');
}
