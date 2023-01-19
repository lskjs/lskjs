import { set } from '@lskjs/algos';
import { isDev } from '@lskjs/env';

console.log('hello world', set({}, 'a.b.c', 1), isDev)