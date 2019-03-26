import React from 'react';
import RangeFilterOption from '../RangeFilterOption';
import { formatter } from '../../../utils/formatter';
import Story from '../../../Story';
import DropdownAsSelect from './DropdownAsSelect';
import FilterValue from '../../atoms/FilterValue';

import './DropdownAsSelect.g.css';

export default ({ storiesOf }) => {
  storiesOf('ui/DropdownAsSelect', module)
    .add('Default', () => (
      <Story>
        <DropdownAsSelect
          id="demo"
          trigger={(
            <FilterValue>Значение</FilterValue>
          )}
        >
          Content
        </DropdownAsSelect>
      </Story>
    ))
    .add('withRangeFilterOption', () => (
      <Story>
        <DropdownAsSelect
          id="demo"
          // ref={(e) => { this.dropdown = e; }}
          trigger={(
            <FilterValue>Значение</FilterValue>
          )}
        >
          <RangeFilterOption
            value={[10000, 20000]}
            onChange={(e) => {
              console.log(e);
            }}
            // onClose={() => {
            //   console.log('Меня зыкрывают', this.dropdown);
            //   this.dropdown.openHandler(false);
            // }}
            min={10000}
            max={2000000}
            stats={[
              3, 45, 2, 15, 80, 50, 20, 10, 15, 15, 31, 12, 50, 88, 68, 48,
            ]}
            quickValues={{
              min: [
                {
                  value: 10000,
                  title: formatter(10000),
                },
                {
                  value: 25000,
                  title: formatter(25000),
                },
                {
                  value: 50000,
                  title: formatter(50000),
                },
                {
                  value: 100000,
                  title: formatter(100000),
                },
                {
                  value: 250000,
                  title: formatter(250000),
                },
                {
                  value: 500000,
                  title: formatter(500000),
                },
                {
                  value: 750000,
                  title: formatter(750000),
                },
                {
                  value: 1000000,
                  title: formatter(1000000),
                },
                {
                  value: 2000000,
                  title: formatter(2000000),
                },
              ],
              max: [
                {
                  value: 10000,
                  title: formatter(10000),
                },
                {
                  value: 25000,
                  title: formatter(25000),
                },
                {
                  value: 50000,
                  title: formatter(50000),
                },
                {
                  value: 100000,
                  title: formatter(100000),
                },
                {
                  value: 250000,
                  title: formatter(250000),
                },
                {
                  value: 500000,
                  title: formatter(500000),
                },
                {
                  value: 750000,
                  title: formatter(750000),
                },
                {
                  value: 1000000,
                  title: formatter(1000000),
                },
                {
                  value: 2000000,
                  title: formatter(2000000),
                },
              ],
            }}
          />
        </DropdownAsSelect>
      </Story>
    ));
};
