import { set } from '@lskjs/algos';
import { isDev } from '@lskjs/env';
import Err from '@lskjs/err';

console.log('hello world', set({}, 'a.b.c', 1), isDev, new Err('test'))