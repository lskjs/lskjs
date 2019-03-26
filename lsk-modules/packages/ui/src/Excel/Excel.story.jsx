import React from 'react';
import fromJSON, { download } from './spreadsheet';
import Story from '../Story';

const exampleJSON = [
  ['title1', 'title2', 'title 3'],
  ['cell1', 'cell2', 'cell3'],
  ['cell4', 'cell5', 'cell6'],
];

export default ({ storiesOf, action }) => (
  storiesOf('Excel', module)
    .add('default', () => (
      <Story>
        <button onClick={async () => {
            const workbook = await fromJSON(exampleJSON);
            download(workbook);
        }}
        >Download spreadsheet
        </button>
      </Story>
    ))
);