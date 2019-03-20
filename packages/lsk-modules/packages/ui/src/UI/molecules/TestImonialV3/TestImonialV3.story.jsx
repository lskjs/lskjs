import React from 'react';
import TestImonialV3 from './TestImonialV3';
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
  storiesOf('ui/TestImonialV3', module)
    .add('default', () => (
      <Story>
        <TestImonialV3 {...articles[0]} />
      </Story>
    ))
);
