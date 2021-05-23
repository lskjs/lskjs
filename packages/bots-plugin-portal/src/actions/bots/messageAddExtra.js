import createKeyboard from '@lskjs/bots-base/utils/createKeyboard';

import Extra from '../../extra';

export default async function messageAddExtra(params) {
  const { parent = {}, extra = [], ctx } = params;
  this.ctx = this.ctx || ctx;
  const data = {};

  const buttons = extra.map(({ type, ...props }) => Extra[type]?.keyboard.call(this, props));

  data.text = parent.text || '';
  data.extra = createKeyboard({
    type: 'inline',
    buttons,
  });

  return { res: true, data };
}
