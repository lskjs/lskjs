import React from 'react';
import TestImonialV4 from './TestImonialV4';
import Story from '../../../Story';
import '../../../styles/lib/antd.g.css';

const articles = [
  {
    avatar: 'https://picsum.photos/200',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque ratione consequuntur ut placeat.',
    name: 'Jason Bourne',
    title: 'Senior PM',
  },
];

export default ({ storiesOf }) => (
  storiesOf('ui/TestImonialV4', module)
    .add('default', () => (
      <Story>
        <TestImonialV4 {...articles[0]} />
      </Story>
    ))
);
