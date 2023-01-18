// Base get from https://github.com/debug-js/debug/blob/master/src/common.js

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */
export function parseNs(raw = '') {
  const on = [];
  const off = [];
  let i;
  const items = (typeof raw === 'string' ? raw : '').split(/[\s,]+/);
  for (i = 0; i < items.length; i++) {
    // eslint-disable-next-line no-continue
    if (!items[i]) continue;
    const item = items[i].replace(/\*/g, '.*?');
    if (item[0] === '-') {
      off.push(new RegExp(`^${item.slice(1)}$`));
    } else {
      on.push(new RegExp(`^${item}$`));
    }
  }
  return { on, off };
}

export default parseNs;
