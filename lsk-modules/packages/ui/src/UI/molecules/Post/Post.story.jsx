import React from 'react';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Tag from 'antd/lib/tag';
import IconButton from '../../atoms/IconButton';
import ButtonGroup from '../../atoms/ButtonGroup';
import PostUser from '../PostUser';
import PostCommentCreate from '../PostCommentCreate';
import Story from '../../../Story';
import Post from './Post';

import '../../../styles/lib/antd.g.css';

const user = {
  title: 'Имя Фамилия',
  avatar: 'https://picsum.photos/100/?random',
};

const title = (
  <PostUser
    user={user}
    subtitle="Модератор"
    category={{
      title: 'Для всех',
    }}
  />
);

const overlayMenu = (
  <Menu>
    <Menu.Item>
      <Icon type="edit" theme="filled" />
      Редактировать
    </Menu.Item>
    <Menu.Item>
      <Icon type="delete" theme="filled" />
      Удалить
    </Menu.Item>
  </Menu>
);

const extra = (
  <Dropdown overlay={overlayMenu} placement="bottomRight" trigger="click">
    <IconButton icon="ellipsis" />
  </Dropdown>
);

const footer = (
  <ButtonGroup>
    <Button htmlType="button" icon="like">Нравится</Button>
    <Button htmlType="button" type="dashed" icon="notification">Поделиться</Button>
  </ButtonGroup>
);

const commentsBlock = (
  <React.Fragment>
    <PostCommentCreate
      user={user}
      placeholder="Написать сообщение"
    />
  </React.Fragment>
);

const tags = (
  <React.Fragment>
    <Tag color="magenta">magenta</Tag>
    <Tag color="red">red</Tag>
    <Tag color="volcano">volcano</Tag>
    <Tag color="orange">orange</Tag>
    <Tag color="gold">gold</Tag>
  </React.Fragment>
);

export default ({ storiesOf }) => (
  storiesOf('ui/Post', module)
    .add('Default', () => (
      <Story>
        <Post
          title={title}
          extra={extra}
          date="08.08.2008"
        >
          Lorem Ipsum - это текст-&quot;рыба&quot;, часто используемый в печати и вэб-дизайне.
          Lorem Ipsum является стандартной &quot;рыбой&quot;
          для текстов на латинице с начала XVI века.
          В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов,
          используя Lorem Ipsum для распечатки образцов.
        </Post>
      </Story>
    ))
    .add('With footer', () => (
      <Story>
        <Post
          title={title}
          extra={extra}
          date="08.08.2008"
          footer={footer}
        >
          Lorem Ipsum - это текст-&quot;рыба&quot;, часто используемый в печати и вэб-дизайне.
          Lorem Ipsum является стандартной &quot;рыбой&quot;
          для текстов на латинице с начала XVI века.
          В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов,
          используя Lorem Ipsum для распечатки образцов.
        </Post>
      </Story>
    ))
    .add('With footer & comments', () => (
      <Story>
        <Post
          title={title}
          extra={extra}
          date="08.08.2008"
          footer={footer}
          comments={commentsBlock}
        >
          Lorem Ipsum - это текст-&quot;рыба&quot;, часто используемый в печати и вэб-дизайне.
          Lorem Ipsum является стандартной &quot;рыбой&quot;
          для текстов на латинице с начала XVI века.
          В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов,
          используя Lorem Ipsum для распечатки образцов.
        </Post>
      </Story>
    ))
    .add('With footer & comments & tags', () => (
      <Story>
        <Post
          title={title}
          extra={extra}
          date="08.08.2008"
          footer={footer}
          comments={commentsBlock}
          tags={tags}
        >
          Lorem Ipsum - это текст-&quot;рыба&quot;, часто используемый в печати и вэб-дизайне.
          Lorem Ipsum является стандартной &quot;рыбой&quot;
          для текстов на латинице с начала XVI века.
          В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов,
          используя Lorem Ipsum для распечатки образцов.
        </Post>
      </Story>
    ))
);
