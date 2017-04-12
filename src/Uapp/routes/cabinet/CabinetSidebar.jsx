import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';


import SidebarWrapper from 'lsk-admin/Admin/lib/sidebar/SidebarWrapper';
import UserPanel from 'lsk-admin/Admin/lib/sidebar/UserPanel';
import SidebarMenuWrapper from 'lsk-admin/Admin/lib/sidebar/SidebarMenuWrapper';
import SidebarMenuHeader from 'lsk-admin/Admin/lib/sidebar/SidebarMenuHeader';
import TreeMenu from 'lsk-admin/Admin/lib/sidebar/TreeMenu';

import Dashboard from 'react-icons2/mdi/view-dashboard';
import User from 'react-icons2/mdi/account';
import Users from 'react-icons2/mdi/account-multiple';
import Comments from 'react-icons2/mdi/comment-multipe-outline';
import Cards from 'react-icons2/mdi/view-carousel';


@inject('user', 'page')
@observer
export default class CabinetLayout extends Component {
  static contextTypes = {
    history: PropTypes.object.isRequired,
  }
  static propTypes = {
    user: PropTypes.object.isRequired,
    page: PropTypes.any.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedLinkId: null,
    };
  }
  onMenuClick = (item) => {
    this.setState({ selectedLinkId: item.id });
    if (item.url) {
      this.context.history.push(item.url);
    }
    return false;
  }
  render() {
    const { user, page } = this.props;

    const menus = [
      {
        title: 'КАБИНЕТ',
        show: true,
        items: [
          {
            icon: <User />,
            title: 'Профиль',
            url: `/cabinet/user/${user._id}`,
          },
          {
            icon: <Users />,
            title: 'Пользователи',
            url: '/cabinet/users',
          },
        ],
      },
      {
        title: 'ДЕВ ПАНЕЛЬ',
        show: __DEV__,
        items: [
          {
            icon: <Dashboard />,
            title: 'Дешборд',
            url: '/cabinet/dashboard',
          },
          {
            icon: <Comments />,
            title: 'Комментарии',
            url: '/cabinet/comments',
          },
          {
            icon: <Cards />,
            title: 'Предложения',
            items: [
              { title: 'Все предложения', url: '/cabinet/offers' },
              { title: 'Одно предложение', url: '/cabinet/offers/1' },
              { title: 'Создать новое', url: '/cabinet/offers/add' },
            ],
          },
        ],
      },
      {
        title: 'АДМИН ПАНЕЛЬ',
        show: user.role === 'admin' || __DEV__,
        items: [
          {
            icon: <Dashboard />,
            title: 'Дешборд',
            url: '/admin',
          },
          {
            icon: <Users />,
            // label: '6',
            title: 'Пользователи',
            url: '/admin/users',
          },
        ],
      },
    ];

    return (
      <SidebarWrapper>
        <UserPanel
          statusText="В сети"
          image={user.avatar}
          name={user.fullName}
        />
        {menus.filter(m => m.show).map((parentMenu, i) => (
          <SidebarMenuWrapper key={i}>
            <SidebarMenuHeader title={parentMenu.title} />
            {parentMenu.items.map((menu, j) => (
              <TreeMenu
                key={j}
                {...menu}
                isSelected={menu.url === page.getMeta('url')}
                onClick={() => this.onMenuClick(menu)}
                onItemClick={this.onMenuClick}
                pageUrl={page.getMeta('url')}
              />
            ))}
          </SidebarMenuWrapper>
        ))}
      </SidebarWrapper>
    );
  }
}
