import React from 'react';
import range from 'lodash/range';
import Story from '../../../Story';
import countriesList from './countriesList';
import FlagIcon from './FlagIcon';
const countries = Object.keys(countriesList);

export default ({ storiesOf }) =>
  storiesOf('ui', module)
    .add('FlagIcon ', () => {
      return (
        <Story>
          {range(2).map(i => (
            <div key={i}>
              <span>
                {i}
              </span>
              {countries.map(country => (
                <FlagIcon key={country} code={country} />
              ))}
            </div>
          ))}
        </Story>
      );
    });
