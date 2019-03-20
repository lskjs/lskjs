import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Menu from 'antd/lib/menu';
import get from 'lodash/get';
import { css } from '@emotion/core'

export const tabsStyle = css`
  background: transparent;
  margin: 16px 10px -1px;
`;

@inject('page', 'uapp')
@observer
class PageTabs extends Component {
  render() {
    const {
      onClick: onClickProps,
      tabs,
      tab,
      page,
      uapp,
    } = this.props;
    const selectedKeys = [
      tab || get(page, 'state.meta.tab'),
    ].filter(a => a);
    // console.log({ selectedKeys });
    const onClick = e => e.item.props.href && uapp.redirect(e.item.props.href);
    return (
      <Menu
        onClick={onClickProps || onClick}
        selectedKeys={selectedKeys}
        mode="horizontal"
        className={tabsStyle}
      >
        {/* {tabs.map(Menu.Item)} */}
        {tabs.map(props => (
          <Menu.Item {...props} />
        ))}
      </Menu>
    );
  }
}

export default PageTabs;


{ /* <Menu
onClick={(e) => {
  console.log('clicked menu', e); // eslint-disable-line no-console
}}
selectedKeys={['users']}
mode="horizontal"
className={tabsStyle}
>
<Menu.Item key="users">
  <Icon type="team" />
  <T name="cabinetSidebar.users" />
</Menu.Item>
<Menu.Item key="app" disabled>
  <Icon type="appstore" />
  Navigation Two
</Menu.Item>
Menu.SubMenu
  title={(
    <span className="submenu-title-wrapper">
      <Icon type="setting" />
      Navigation Three - Submenu
    </span>
  )}
>
  <Menu.ItemGroup title="Item 1">
    <Menu.Item key="setting:1">Option 1</Menu.Item>
    <Menu.Item key="setting:2">Option 2</Menu.Item>
  </Menu.ItemGroup>
  <Menu.ItemGroup title="Item 2">
    <Menu.Item key="setting:3">Option 3</Menu.Item>
    <Menu.Item key="setting:4">Option 4</Menu.Item>
  </Menu.ItemGroup>
</Menu.SubMenu>
<Menu.Item key="alipay">
  <a href="https://google.ru" target="_blank" rel="noopener noreferrer">
    Navigation Four - Link
  </a>
</Menu.Item>
</Menu> */ }
