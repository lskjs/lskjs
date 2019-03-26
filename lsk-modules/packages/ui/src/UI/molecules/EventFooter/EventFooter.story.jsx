import React from 'react';
import EventFooter from './EventFooter';
import Story from '../../../Story';

export default ({ storiesOf }) => (
  storiesOf('ui/EventFooter', module)
    .add('default', () => (
      <Story>
        <EventFooter
          event={{
            title: 'Название эвента',
            image: 'https://picsum.photos/200?random',
            _id: 1,
          }}
        >
          <div style={{ color: 'blue' }}>children element</div>
        </EventFooter>
      </Story>
    ))
);
