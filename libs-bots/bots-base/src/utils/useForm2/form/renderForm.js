import { createKeyboard } from '../../createKeyboard';

export const renderForm = ({ path, action, field, form, formName, repliedMessageId }) => {
  const { fields } = form;
  if (action === 'init') {
    const text = fields.map((name) => `— ${form.controls[name].title}`).join('\n');
    return [
      `${form.title}\n\nℹ️ Форма [необходимо заполнить]:\n${text}`,
      createKeyboard({
        type: 'inline',
        buttons: [
          {
            title: `➡️ Начать`,
            value: `${path}?action=start&repliedMessageId=${repliedMessageId}&formName=${formName}`,
          },
          {
            title: `❌ Отмена`,
            value: `${path}?action=cancel&repliedMessageId=${repliedMessageId}&formName=${formName}`,
          },
        ],
      }),
    ];
  }
  const text = fields
    .map((name) => {
      const { title } = form.controls[name];
      const value = field === name ? '[✍️ заполняется]' : form.getValue(name) || '[не заполнено]';
      return `— ${title}: ${value}`;
    })
    .join('\n');

  if (action === 'set') {
    return [
      `${form.title}\n\nℹ️ Форма [в процессе заполнения]:\n${text}`,
      createKeyboard({
        type: 'inline',
        buttons: [
          {
            title: `🔄 Заполнить заново`,
            value: `${path}?action=start&repliedMessageId=${repliedMessageId}&formName=${formName}`,
          },
          {
            title: `❌ Отмена`,
            value: `${path}?action=cancel&repliedMessageId=${repliedMessageId}&formName=${formName}`,
          },
        ],
      }),
    ];
  }
  return [
    `${form.title}\n\nℹ️ Форма [ожидает подтверждения]:\n${text}`,
    createKeyboard({
      type: 'inline',
      buttons: [
        {
          title: `✅ Подтвердить`,
          value: `${path}?action=submit&repliedMessageId=${repliedMessageId}&formName=${formName}`,
        },
        {
          title: `🔄 Заполнить заново`,
          value: `${path}?action=start&repliedMessageId=${repliedMessageId}&formName=${formName}`,
        },
        {
          title: `❌ Отмена`,
          value: `${path}?action=cancel&repliedMessageId=${repliedMessageId}&formName=${formName}`,
        },
      ],
    }),
  ];
};

export default renderForm;
