import { getNative } from './_getNative.js';
import { root } from './_root.js';

/* Built-in method references that are verified to be native. */
export const Promise = getNative(root, 'Promise');

export default Promise;
