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

import Users from 'react-icons/lib/ti/group';
import Zip from 'react-icons/lib/fa/file-archive-o';

import 'lsk-admin/Admin/sass/AdminLTE.g.scss';

@inject('user') @observer
export default class AdminLayout extends Component {
  static contextTypes = {
    history: PropTypes.object.isRequired,
  }
  static defaultProps = {
    description: null,
  }
  static propTypes = {
    user: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    siteTitle: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    description: PropTypes.string,
  }
  logout = ({ key }) => {
    if (key === 1) {
      this.context.history.push('/admin/profile');
    } else {
      this.context.history.replace('/auth/logout');
    }
  }
  toDashboard = () => {
    this.context.history.push('/');
  }
  onMenuClick = (item) => {
    if (item.url) {
      this.context.history.push(item.url);
    }
    return false;
  }
  render() {
    const { user, title, description, siteTitle, children } = this.props;
    const breadItems = [
      { key: 1, icon: <DashboardIcon />, title, url: '/admin' },
    ];
    const mainMenus = [
      {
        key: 1,
        id: 1,
        icon: <DashboardIcon />,
        title: 'Главная',
        url: '/admin',
      },
      {
        key: 2,
        id: 2,
        icon: <Users />,
        label: '6',
        title: 'Пользователи',
        url: '/admin/users',
      },
      {
        key: 3,
        id: 3,
        icon: <Zip />,
        title: 'Еще кнопка',
        url: '#',
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
              links={[
                { key: 1, text: 'Link 1' },
                { key: 2, text: 'Link 2' },
                { key: 3, text: 'Link 3' },
              ]}
              buttons={[
                { key: 1, text: 'Профиль', align: 'left' },
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
              />
            ))}
          </SidebarMenuWrapper>
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
