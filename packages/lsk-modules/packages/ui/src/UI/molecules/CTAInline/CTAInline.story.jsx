import React from 'react';
import Button from '../../../Button';
import CTAInline from './CTAInline';
import Story from '../../../Story';

export default ({ storiesOf }) => (
  storiesOf('ui/CTAInline', module)
    .add('Default', () => (
      <Story>
        <CTAInline
          title="Download it now and get up and running in minutes"
          actions={(
            <React.Fragment>
              <Button paint="primary">{"Let's"} start</Button>
              <Button paint="default">Cancel</Button>
            </React.Fragment>
          )}
        />
      </Story>
    ))
);
