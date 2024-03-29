/* eslint-disable import/no-import-module-exports */
import { root } from './_root.js';

/** Detect free variable `exports`. */
const freeExports = typeof exports === 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
const freeModule =
  freeExports &&
  typeof module === 'object' &&
  module &&
  // @ts-ignore
  !module.nodeType &&
  module;

/** Detect the popular CommonJS extension `module.exports`. */
const moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
const Buffer = moduleExports ? root.Buffer : undefined;
const allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
export function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  const { length } = buffer;
  const result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

export default cloneBuffer;
