import React from 'react';
// import Form from '../Form';
// import Textarea from 'react-textarea-autosize';

import Input from './Input';

module.exports = function ({ storiesOf, action }) {
  return storiesOf('Input', module)
    .addHtml(<link rel="stylesheet" type="text/css" href="http://yastatic.net/bootstrap/3.3.6/css/bootstrap.min.css" />)
    .addHtml((
      <link
        href="https://fonts.googleapis.com/css?family=PT+Sans:400,700&amp;subset=cyrillic"
        rel="stylesheet"
      />
    ))
    .add('Default', () => (
      <Input
        onChange={action('change field')}
      />
    ))
    .add('Full width', () => (
      <Input
        block
        onChange={action('change field')}
      />
    ))
    .add('Placeholder', () => (
      <Input
        placeholder="Введите текст"
        onChange={action('change field')}
      />
    ))
    .add('Value', () => (
      <Input
        value="Уже введённый текст"
        onChange={action('change field')}
      />
    ))
    .add('Email', () => (
      <Input
        type="email"
        placeholder="Введите емейл"
        onChange={action('change field')}
      />
    ))
    .add('Password', () => (
      <Input
        type="password"
        placeholder="Введите пароль"
        onChange={action('change field')}
      />
    ))
    .add('Success state', () => (
      <Input
        validationState="success"
        value="Уже введённый текст"
        onChange={action('change field')}
      />
    ))
    .add('Error state', () => (
      <Input
        validationState="error"
        value="Уже введённый текст"
        onChange={action('change field')}
      />
    ))
    .add('Warning state', () => (
      <Input
        validationState="warning"
        value="Уже введённый текст"
        onChange={action('change field')}
      />
    ))
    // .add('Input with Form', () => (
    //   <Form
    //     validators={{
    //       text: {
    //         presence: {
    //           message: 'Поле не должно быть пустым',
    //         },
    //       },
    //     }}
    //     fields={[
    //       {
    //         name: 'text',
    //         controlType: 'input2',
    //         title: 'Инпут',
    //         control: {
    //           type: 'text',
    //           placeholder: 'Текст',
    //         },
    //       },
    //     ]}
    //     onChange={action('onChange')}
    //     onSubmit={action('onSubmit')}
    //     onError={action('onError')}
    //   />
    // ))
    .add('Textarea', () => (
      <Input
        componentClass="textarea"
        onChange={action('change field')}
      />
    ))
    .add('Textarea autosize', () => (
      <Input
        componentClass={Textarea}
        onChange={action('change field')}
      />
    ));
};
