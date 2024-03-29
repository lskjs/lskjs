import { coreJsData } from './_coreJsData.js';

/** Used to detect methods masquerading as native. */
const maskSrcKey = (function () {
  const uid = /[^.]+$/.exec((coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO) || '');
  return uid ? `Symbol(src)_1.${uid}` : '';
})();

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
export function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

export default isMasked;
