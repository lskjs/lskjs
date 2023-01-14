import { getNative } from './_getNative.js';

export const defineProperty = (function () {
  try {
    const func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
})();

export default defineProperty;
