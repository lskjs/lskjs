import React from 'react';
import Callout from './Callout';
import Story from '../../../Story';

const articles = [
  {
    title: 'Architecto odit fuga facere',
    buttonText: 'Try it Now',
    content: 'Culpa eveniet labore cupiditate at maiores dignissimos, nesciunt quam porro accusantium velit quas? Nam nobis, deleniti inventore consequuntur quos vero voluptatum nostrum error porro mollitia, accusantium distinctio nemo expedita ipsum quisquam laboriosam',
  },
];

export default ({ storiesOf }) => (
  storiesOf('ui/Callout', module)
    .add('Default', () => (
      <Story>
        <Callout {...articles[0]} />
      </Story>
    ))
);
