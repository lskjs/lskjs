import React from 'react'; //eslint-disable-line
import _ from 'lodash';
import NotifyItem from './NotifyItem';

const user = () => ({
  name: 'Perpetuumworld',
  avatar: `https://randomuser.me/api/portraits/men/${_.random(99)}.jpg`,
  role: _.sample(['Основной канал', 'Канал', 'Рекламодатель']),
  link: '#',
});

module.exports = function ({ storiesOf, knob }) {
  return storiesOf('NotifyItem', module)
    .addHtml((
      <link
        href="https://fonts.googleapis.com/css?family=PT+Sans:400,700&amp;subset=cyrillic"
        rel="stylesheet"
      />
    ))
    .add('Default', () => (
      <NotifyItem unread={knob.boolean('Unread')} href="#">
        Ваша сделка <a href="#!">“Преролл для ролика Победи …” </a> скоро истекает.
      </NotifyItem>
    ))
    .add('User', () => (
      <NotifyItem unread={knob.boolean('Unread')} href="#" user={user()}>
        <strong>{user().name}</strong> прокоментировал вашу сделку
        <a href="#!">“Преролл для ролика Победи …”</a>
      </NotifyItem>
    ));
};
