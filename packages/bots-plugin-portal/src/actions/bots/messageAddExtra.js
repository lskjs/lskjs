import createKeyboard from '@lskjs/bots-base/utils/createKeyboard';

import Extra from '../../extra';

export default async function messageAddExtra(params) {
  const { parent: data = {}, extra = [], ctx } = params;
  this.ctx = this.ctx || ctx;

  const buttons = extra.map(({ type, ...props }) => Extra[type]?.keyboard.call(this, props));

  data.extra = createKeyboard({
    type: 'inline',
    buttons,
  });
  return { res: true, data };
}
