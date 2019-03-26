import React from 'react';
import Editor from './Editor';
import Editor2 from './Editor2';
import Editor3 from './Editor3';
import Editor4 from './Editor4';
import Editor5 from './Editor5';
import Story from '../Story';
import markdownToValue from './markdownToValue';
import jsonToValue from './jsonToValue';
import md from './example.md';
import md2 from './example2.md';
// import ObserverDEV from './ObserverDEV';

const value = jsonToValue(require('./value'));

const initialValue = markdownToValue(md);
const initialValue2 = markdownToValue(md2);


export default ({ storiesOf, action }) => (
  storiesOf('Editor', module)
    .add('default', () => (
      <Story>
        <Editor
          initialValue={initialValue}
          placeholder="Write some markdown..."
        />
      </Story>
    ))
    .add('default 2', () => (
      <Story>
        <Editor
          initialValue={value}
          placeholder="Write some markdown..."
        />
      </Story>
    ))
    .add('Editor2 ', () => (
      <Story>
        <Editor2
          value={value}
        />
      </Story>
    ))
    .add('Editor3 ', () => (
      <Story>
        <Editor3
          value={value}
        />
      </Story>
    ))
    .add('Editor4 ', () => (
      <Story>
        <Editor4
          value={value}
        />
      </Story>
    ))
    .add('Editor5 blank', () => (
      <Story>
        <Editor5
          onChange={(values) => {
            console.log(values);
          }}
        />
      </Story>
    ))
    .add('Editor5 default', () => (
      <Story>
        <Editor5
          initialValue={initialValue2}
          onChange={(values) => {
            console.log(values);
          }}
        />
      </Story>
    ))
    // .add('json', () => (
    //   <Story>
    //     <DEV json={{ test: 123 }} />
    //   </Story>
    // ))
);

