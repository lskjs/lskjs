import React from 'react';

module.exports = function ({ storiesOf, action, knob }) {
  return storiesOf('Button', module)
    .add('with text', () => (
      <button onClick={action('clicked')}>Hello button</button>
    ))
    .add('with some emoji', () => (
      <button onClick={action('clicked')}><span role="img" aria-label="so cool">😀 😎 👍 💯</span></button>
    ));
};
