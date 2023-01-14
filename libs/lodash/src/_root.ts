/* eslint-disable no-restricted-globals */
import { freeGlobal } from './_freeGlobal.js';

/** Detect free variable `self`. */
const freeSelf =
  // @ts-ignore
  typeof self === 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
export const root = freeGlobal || freeSelf || Function('return this')();

export default root;
