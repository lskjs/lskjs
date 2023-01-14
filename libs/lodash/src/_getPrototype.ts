import { overArg } from './_overArg.js';

/** Built-in value references. */
export const getPrototype = overArg(Object.getPrototypeOf, Object);

export default getPrototype;
