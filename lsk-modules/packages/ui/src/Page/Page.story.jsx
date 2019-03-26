import React from 'react';
import Story from '../Story';
import Page from './Page';
// import repeat from 'lodash/repeat';

export default ({ storiesOf, action }) => {
  return storiesOf('Page', module)
    .add('default', () => (
      <Story>
        <Page>
          Default Page
        </Page>
      </Story>
    ))
    .add('default 2', () => (
      <Story>
        <Page>
          Default Page 2
        </Page>
      </Story>
    ))
    .add('default 3', () => (
      <Story>
        <Page>
          Default Page 3
        </Page>
      </Story>
    ));
};
