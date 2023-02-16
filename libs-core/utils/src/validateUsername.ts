export const canonize = (item = '') => String(item).replace(/[^0-9a-z_]+/gi, '_');
export const regexp = /^[^0-9a-z_]{2,}$/;
export default (item) => regexp.test(String(item));
