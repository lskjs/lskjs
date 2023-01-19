import { set } from '@lskjs/algos';
import { isDev } from '@lskjs/env';
import Err from '@lskjs/err';
import { Logger } from '@lskjs/log';

const log = new Logger();
log.error('hello world', set({}, 'a.b.c', 1), isDev, new Err('test'));
