import React from 'react';
import Button from '../Button';
import UrlButton from './UrlButton';
import Story from '../Story';

// import '../../../Root/Storybook.g.css';

export default ({ storiesOf }) => {
  storiesOf('Button/UrlButton', module)
    .add('Default', () => (
      <Story>
        <UrlButton
          componentClass={Button}
          paint="primary"
          url="/api/v1/auth/silent?id=594bd196e0168d51ab5e60d7"
        >
          URL Button
        </UrlButton>
      </Story>
    ));
};

