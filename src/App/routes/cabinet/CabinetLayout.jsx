import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';

import DashboardIcon from 'react-icons/lib/fa/dashboard';

import LayoutWrapper from 'lsk-admin/Admin/lib/layout/LayoutWrapper';
import PageWrapper from 'lsk-admin/Admin/lib/page/PageWrapper';
import PageHeader from 'lsk-admin/Admin/lib/page/PageHeader';
import Breadcrumb from 'lsk-admin/Admin/lib/page/Breadcrumb';
import PageContent from 'lsk-admin/Admin/lib/page/PageContent';
import HeaderWrapper from 'lsk-admin/Admin/lib/header/HeaderWrapper';
import Logo from 'lsk-admin/Admin/lib/header/Logo';
import MiniLogo from 'lsk-admin/Admin/lib/header/MiniLogo';
import LargeLogo from 'lsk-admin/Admin/lib/header/LargeLogo';
import Navbar from 'lsk-admin/Admin/lib/header/Navbar';
import UserMenu from 'lsk-admin/Admin/lib/header/UserMenu';
import SidebarWrapper from 'lsk-admin/Admin/lib/sidebar/SidebarWrapper';
import UserPanel from 'lsk-admin/Admin/lib/sidebar/UserPanel';
import FooterWrapper from 'lsk-admin/Admin/lib/footer/FooterWrapper';
import SidebarSearch from 'lsk-admin/Admin/lib/sidebar/SidebarSearch';
import SidebarMenuWrapper from 'lsk-admin/Admin/lib/sidebar/SidebarMenuWrapper';
import SidebarMenuHeader from 'lsk-admin/Admin/lib/sidebar/SidebarMenuHeader';
import TreeMenu from 'lsk-admin/Admin/lib/sidebar/TreeMenu';

import Users from 'react-icons/lib/fa/group';
import Mail from 'react-icons/lib/fa/envelope';
import Posts from 'react-icons/lib/fa/th-large';

import 'lsk-admin/Admin/sass/AdminLTE.g.scss';

@inject('user') @observer
export default class AdminLayout extends Component {
  static contextTypes = {
    history: PropTypes.object.isRequired,
  }
  static defaultProps = {
    description: null,
    breadcrumbs: [],
    additionalMenus: [],
  }
  static propTypes = {
    user: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    siteTitle: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    description: PropTypes.string,
    breadcrumbs: PropTypes.array,
    additionalMenus: PropTypes.array,
  }
  onMenuClick = (item) => {
    if (item.url) {
      this.context.history.push(item.url);
    }
    return false;
  }
  logout = ({ key }) => {
    if (key === 1) {
      this.context.history.push('/cabinet/settings');
    } else {
      this.context.history.replace('/auth/logout');
    }
  }
  toDashboard = () => {
    this.context.history.push('/');
  }
  render() {
    const { user, title, description, siteTitle, children, breadcrumbs, additionalMenus } = this.props;
    const breadItems = [
      { key: 1, icon: <DashboardIcon />, title: 'Личный кабинет', url: '/cabinet' },
      ...breadcrumbs,
    ];
    const mainMenus = [
      {
        key: 1,
        id: 1,
        icon: <DashboardIcon />,
        title: 'Главная',
        url: '/cabinet',
      },
      {
        key: 2,
        id: 2,
        icon: <Users />,
        title: 'Друзья',
        label: 14,
        items: [
          { key: 21, id: 21, title: 'Все друзья',  url: '/cabinet/friends' },
          { key: 22, id: 22, title: 'Входящие заявки',  url: '/cabinet/friends/in' },
          { key: 23, id: 23, title: 'Исходящие заявки', url: '/cabinet/friends/out' },
        ],
      },
      {
        key: 3,
        id: 3,
        icon: <Posts />,
        title: 'Посты',
        url: '/cabinet/posts',
      },
      {
        key: 4,
        id: 4,
        icon: <Mail />,
        label: 10,
        title: 'Сообщения',
        url: '/cabinet/im',
      },
      {
        key: 5,
        id: 5,
        title: 'Тест',
        url: '/cabinet/test',
      },
    ];
    return (
      <LayoutWrapper color="black">
        <HeaderWrapper>
          <Logo>
            <MiniLogo onClick={this.toDashboard}>
              {siteTitle.substr(0, 2)}
            </MiniLogo>
            <LargeLogo onClick={this.toDashboard}>
              {siteTitle}
            </LargeLogo>
          </Logo>
          <Navbar controlbar={false}>
            <UserMenu
              // onLinkClick={action('onLinkClick')}
              onButtonClick={this.logout}
              image={'https://remont3.ru/templates/umedia/dleimages/noavatar.png'}
              name={user.name}
              title={`Добро пожаловать, ${user.name}`}
              description="Ваш статус"
              buttons={[
                { key: 1, text: 'Изменить', align: 'left' },
                { key: 2, text: 'Выход' },
              ]}
            />
          </Navbar>
        </HeaderWrapper>
        <SidebarWrapper>
          <UserPanel
            statusText="В сети"
            image={'https://remont3.ru/templates/umedia/dleimages/noavatar.png'}
            name={user.name}
          />
          <SidebarSearch
            placeholder="Поиск..."
            onSubmit={e => console.log(e)}
          />
          <SidebarMenuWrapper>
            <SidebarMenuHeader title="НАВИГАЦИЯ" />
              {mainMenus.map(menu => (
                <TreeMenu
                  {...menu}
                  onClick={() => this.onMenuClick(menu)}
                  onItemClick={this.onMenuClick}
                />
              ))}
          </SidebarMenuWrapper>
          <If condition={additionalMenus.length > 0}>
            <SidebarMenuWrapper>
              <SidebarMenuHeader title="АДМИН МЕНЮ" />
              {additionalMenus.map(menu => (
                <TreeMenu
                  {...menu}
                  onClick={() => this.onMenuClick(menu)}
                />
              ))}
            </SidebarMenuWrapper>
          </If>
        </SidebarWrapper>
        <PageWrapper>
          <PageHeader title={title} description={description}>
            <Breadcrumb items={breadItems} />
          </PageHeader>
          <PageContent>
            {children}
          </PageContent>
        </PageWrapper>
        <FooterWrapper>
          <div className="pull-right hidden-xs">
            <b>Version</b> 0.0.1
          </div>
          <strong>
            <span>Copyright &copy; 2016-2017 </span>
            <a href="http://github.com/isuvorov/lego-starter-kit">Lego-starter-kit</a>.
          </strong> All rights reserved.
        </FooterWrapper>
      </LayoutWrapper>
    );
  }
}
