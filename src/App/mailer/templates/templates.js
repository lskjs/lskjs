import getTemplate from './template';
export default (ctx) => {
  const Template = getTemplate(ctx);
  return {
    example: new Template({
      type: 'example',
      options: {
        subject: 'Восстановление пароля!',
      },
    }),
    reg: new Template({
      type: 'reg',
    }),
    recovery: new Template({ type: 'recovery' }),
  };
};
