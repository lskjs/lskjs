export const canonize = (item = '') => String(item).replace(/[^0-9]+/gi, '');
export const regexp = /^[0-9]{9,}$/;
export default item => regexp.test(String(item));
