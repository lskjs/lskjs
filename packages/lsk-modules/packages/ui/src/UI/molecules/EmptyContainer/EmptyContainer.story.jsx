import React from 'react';
import Icon from 'antd/lib/icon';
import Story from '../../../Story';
import EmptyContainer from './EmptyContainer';

module.exports = ({ storiesOf }) =>
  storiesOf('hz/EmptyContainer', module)
    .add('EmptyContainer', () => {
      return (
        <Story>
          <EmptyContainer
            title="Нет событий"
            icon={
              <Icon type="close-circle" />
            }
            subtitle="Тут ничего нет...."
          />
        </Story>
      );
    });
