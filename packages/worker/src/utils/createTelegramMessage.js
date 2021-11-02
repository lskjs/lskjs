import Err from '@lskjs/err';
import prettyStringify from '@lskjs/utils/prettyStringify';

export function createTelegramMessage({ name, err, job }) {
  const { params } = job || {};
  let code = Err.getCode(err);
  let message = Err.getMessage(err);
  if (code === message) message = null;
  if (code) code = `[${code}]`;
  let worker = process.env.SERVICE || name;
  if (worker) worker = `<${worker}>`;
  return [worker, code, message, err.data && JSON.stringify(err && err.data, null, 2), '\n', prettyStringify(params)]
    .filter(Boolean)
    .join('\n');
}

export default createTelegramMessage;
