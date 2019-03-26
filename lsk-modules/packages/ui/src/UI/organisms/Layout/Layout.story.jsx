import React from 'react';
import Container from 'reactstrap/lib/Container';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import AntLayout from 'antd/lib/layout';
import Tooltip from 'antd/lib/tooltip';
import Badge from 'antd/lib/badge';
import List from 'antd/lib/list';
import LayoutSidenavBrand from '../../atoms/LayoutSidenavBrand';
import LayoutSidenavContent from '../../atoms/LayoutSidenavContent';
import LayoutSidenavFooter from '../../atoms/LayoutSidenavFooter';
import LayoutSidenavHeader from '../../atoms/LayoutSidenavHeader';
import HeaderDropdown from '../../atoms/HeaderDropdown';
import LayoutNotificationIcon from '../../atoms/LayoutNotificationIcon';
import LayoutHeaderListItem from '../../atoms/LayoutHeaderListItem';
import LayoutContent from '../../atoms/LayoutContent';
import LayoutFooterElement from '../../atoms/LayoutFooterElement';
import LayoutFooterBrand from '../../atoms/LayoutFooterBrand';
import ListFooterItem from '../../atoms/ListFooterItem';
import LayoutFooter from '../../molecules/LayoutFooter';
import LayoutHeaderNotifications from '../../molecules/LayoutHeaderNotifications';
import LayoutHeaderNotificationsContent from '../../molecules/LayoutHeaderNotificationsContent';
import LayoutHeaderSearchBox from '../../molecules/LayoutHeaderSearchBox';
import LayoutHeaderUserMenu from '../../molecules/LayoutHeaderUserMenu';
import LayoutHeader from '../../molecules/LayoutHeader';
import LayoutSidebar from '../../molecules/LayoutSidebar';
import ListItem from '../../molecules/ListItem';
import Story from '../../../Story';
import '../../../styles/lib/antd.g.css';
import '../../../styles/lib/bootstrap.g.css';

import Layout from './Layout';
import { notificationsData, messagesData, tasksData, contentData } from './Layout.mock';

const notificationTabs = [
  {
    key: 'notifications',
    title: 'Уведомления (4)',
    icon: 'notification',
    content: (
      <List
        footer={(
          <ListFooterItem href="#!">
            Читать всё <Icon type="arrow-right" />
          </ListFooterItem>
        )}
        itemLayout="horizontal"
        dataSource={notificationsData}
        renderItem={item => (
          <List.Item>
            <ListItem
              icon={item.icon}
              iconProps={item.iconProps}
              title={item.title}
              date={item.datetime}
            />
          </List.Item>
        )}
      />
    ),
  },
  {
    key: 'messages',
    title: 'Сообщения (3)',
    icon: 'message',
    content: (
      <List
        footer={(
          <ListFooterItem href="#!">
            Читать всё <Icon type="arrow-right" />
          </ListFooterItem>
        )}
        itemLayout="horizontal"
        dataSource={messagesData}
        renderItem={item => (
          <List.Item>
            <ListItem
              leftComponent={item.leftComponent}
              title={item.title}
              description={item.desc}
              date={item.datetime}
            />
          </List.Item>
        )}
      />
    ),
  },
  {
    key: 'tasks',
    title: 'Задачи (4)',
    icon: 'profile',
    content: (
      <List
        footer={(
          <ListFooterItem href="#!">
            Читать всё <Icon type="arrow-right" />
          </ListFooterItem>
        )}
        itemLayout="horizontal"
        dataSource={tasksData}
        renderItem={item => (
          <List.Item>
            <ListItem
              title={item.title}
              description={item.desc}
            />
          </List.Item>
        )}
      />
    ),
  },
];

const header = (
  <LayoutHeader
    collapsed={false}
    // logo="Logo"
    onCollapsed={e => console.log('onCollapsed', e)} // eslint-disable-line no-console
    onCloseMobile={e => console.log('onCloseMobile', e)} // eslint-disable-line no-console
    pullLeft={(
      <React.Fragment>
        <Tooltip placement="bottom" title="UI Overview">
          <LayoutHeaderListItem href="#!" className="d-none d-md-inline-block">
            <Icon type="shop" />
          </LayoutHeaderListItem>
        </Tooltip>
      </React.Fragment>
    )}
    pullRight={(
      <React.Fragment>
        <LayoutHeaderSearchBox right placeholder="Поиск..." />
        <LayoutHeaderNotifications
          content={(
            <LayoutHeaderNotificationsContent tabs={notificationTabs} />
          )}
        >
          <LayoutHeaderListItem href="#!">
            <Badge count={11}>
              <LayoutNotificationIcon type="bell" />
            </Badge>
          </LayoutHeaderListItem>
        </LayoutHeaderNotifications>
        <LayoutHeaderUserMenu
          user={{
            title: 'Пользователь',
            avatar: 'https://picsum.photos/100?random',
          }}
        >
          <HeaderDropdown>
            <Menu.Item key="4" className="d-block d-md-none">
              Signed in as <strong>User</strong>
            </Menu.Item>
            <Menu.Divider className="d-block d-md-none" />
            <Menu.Item key="1" disabled>
              <Icon type="setting" />Settings
            </Menu.Item>
            <Menu.Item key="0">
              <a href="#!">
                <Icon type="info-circle-o" />About
              </a>
            </Menu.Item>
            <Menu.Item key="2">
              <a href="#!">
                <Icon type="question-circle-o" />Need Help?
              </a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">
              <a href="#!">
                <Icon type="logout" />Sign out
              </a>
            </Menu.Item>
          </HeaderDropdown>
        </LayoutHeaderUserMenu>
      </React.Fragment>
    )}
  />
);

const content = props => (
  <LayoutContent>
    <Container {...props}>
      <div
        style={{
          whiteSpace: 'pre-line',
        }}
      >
        {contentData}
      </div>
    </Container>
  </LayoutContent>
);

const footer = (
  <LayoutFooter>
    <LayoutFooterElement>
      © 2018 <LayoutFooterBrand target="_blank" rel="noopener noreferrer" href="//google.ru">Brand</LayoutFooterBrand>
    </LayoutFooterElement>
    <LayoutFooterElement>
      Built with Love <Icon type="heart-o" />
    </LayoutFooterElement>
  </LayoutFooter>
);

const sidebar = (
  <LayoutSidebar
    mobileHidden
    onCloseMobile={e => console.log('onCloseMobile', e)} // eslint-disable-line no-console
    hidden={false}
    collapsed={false}
    mobile={false}
  >
    <LayoutSidenavHeader>
      Logo
      <LayoutSidenavBrand href="#!">Brand</LayoutSidenavBrand>
    </LayoutSidenavHeader>
    <LayoutSidenavContent>
      <Menu
        theme="light"
        mode="inline"
        inlineCollapsed={false}
        onClick={e => console.log('onClick', e)} // eslint-disable-line no-console
        selectedKeys={['dashboard']}
      >
        <Menu.Item key="dashboard">
          <a href="#!">
            <Icon type="dashboard" />
            <span className="nav-text">Dashboard</span>
          </a>
        </Menu.Item>
        <Menu.Item key="overview">
          <a href="#!">
            <Icon type="shop" />
            <span className="nav-text">UI Overview</span>
            <span className="nav-badge badge-right badge badge-pill badge-info ml-1">100+</span>
          </a>
        </Menu.Item>
        <Menu.SubMenu
          key="submenu"
          title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}
        >
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.ItemGroup key="g2" title="Item group 1">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
          <Menu.SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
        <Menu.Item key="landing">
          <a
            href="http://iarouse.com/dist-react-ant-design/landing/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon type="link" />
            <span className="nav-text">Landing Page</span>
          </a>
        </Menu.Item>
      </Menu>
    </LayoutSidenavContent>
    <LayoutSidenavFooter>
      <a target="_blank" href="//google.ru" rel="noopener noreferrer">
        <Icon type="question-circle" />
        <span className="nav-text"><span>Help</span> & <span>Support</span></span>
      </a>
    </LayoutSidenavFooter>
  </LayoutSidebar>
);

export function noFixedLayout(props, body) {
  return (
    <React.Fragment>
      {sidebar}
      <AntLayout>
        {header}
        {body || content(props)}
        {footer}
      </AntLayout>
    </React.Fragment>
  );
}

export const fixedLayout = props => (
  <React.Fragment>
    {sidebar}
    <AntLayout>
      {header}
      <AntLayout>
        {content(props)}
        {footer}
      </AntLayout>
    </AntLayout>
  </React.Fragment>
);

export default ({ storiesOf }) => (
  storiesOf('ui/Layout', module)
    .add('Default', () => (
      <Story>
        <Layout>
          {noFixedLayout({})}
        </Layout>
      </Story>
    ))
    .add('Fixed sidebar', () => (
      <Story>
        <Layout fixed={['sidebar']}>
          {noFixedLayout({})}
        </Layout>
      </Story>
    ))
    .add('Fixed sidebar & header', () => (
      <Story>
        <Layout fixed={['sidebar', 'header']}>
          {fixedLayout({})}
        </Layout>
      </Story>
    ))
    .add('Fluid container & all fixed', () => (
      <Story>
        <Layout fixed={['sidebar', 'header']}>
          {fixedLayout({ fluid: true })}
        </Layout>
      </Story>
    ))
    .add('Boxed', () => (
      <Story>
        <Layout boxed>
          {noFixedLayout({})}
        </Layout>
      </Story>
    ))
    .add('Boxed & Fixed sidebar', () => (
      <Story>
        <Layout boxed fixed={['sidebar']}>
          {noFixedLayout({})}
        </Layout>
      </Story>
    ))
    .add('Boxed & Fixed sidebar & header', () => (
      <Story>
        <Layout boxed fixed={['sidebar', 'header']}>
          {fixedLayout({})}
        </Layout>
      </Story>
    ))
);
