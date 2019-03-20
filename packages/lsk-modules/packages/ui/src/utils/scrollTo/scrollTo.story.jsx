import React from 'react';
import range from 'lodash/range';
import Story from '../../Story';
import scrollTo from '.';


export default ({ storiesOf }) => (
  storiesOf('utils', module)
    .add('scrollTo', () => (
      <Story>
        <button onClick={() => scrollTo(9999)}>
          bottom
        </button>
        {range(100).map(i => (
          <div>
            {i}
          </div>
        ))}
        <button onClick={() => scrollTo(0)}>
          top
        </button>
      </Story>
    ))

);

