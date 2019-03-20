import React from 'react';
import UserItem from './UserItem';
import Story from '../../../Story';


export default ({ storiesOf }) => (
  storiesOf('ui/UserItem', module)
    .add('default', () => (
      <Story>
        <UserItem
          user={{
            id: 1,
            avatar: 'https://jira.isuvorov.com/secure/projectavatar?avatarId=10324',
            title: 'Hey',
          }}
        />
      </Story>
    ))
);
