import React from 'react';
import Search from './Search';

const getFont = fontName => (
  <link
    href={`https://fonts.googleapis.com/css?family=${fontName.split(' ').join('+')}&amp;subset=cyrillic`}
    rel="stylesheet"
  />
);

module.exports = ({ storiesOf, action }) =>
  storiesOf('Search', module)
    .addHtml(getFont('PT Sans'))
    .add('Default', () => <Search placeholder="Введите название канала" onChange={action('onChange')} />)
    .add('Counted', () => <Search placeholder="Введите название канала" max={700} onChange={action('onChange')} />);
