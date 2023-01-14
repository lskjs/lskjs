import { getNative } from './_getNative.js';

/* Built-in method references that are verified to be native. */
export const nativeCreate = getNative(Object, 'create');

export default nativeCreate;
