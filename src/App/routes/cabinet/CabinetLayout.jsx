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
import SidebarMenuWrapper from 'lsk-admin/Admin/lib/sidebar/SidebarMenuWrapper';
import SidebarMenuHeader from 'lsk-admin/Admin/lib/sidebar/SidebarMenuHeader';
import TreeMenu from 'lsk-admin/Admin/lib/sidebar/TreeMenu';

import Users from 'react-icons/lib/fa/group';
import Mail from 'react-icons/lib/fa/envelope';
import Posts from 'react-icons/lib/fa/th-large';
import Zip from 'react-icons/lib/fa/file-archive-o';

import 'lsk-admin/Admin/sass/AdminLTE.g.scss';

@inject('user', 'config', 'page')
@observer
export default class CabinetLayout extends Component {
  static contextTypes = {
    history: PropTypes.object.isRequired,
  }
  static defaultProps = {
    description: null,
    breadcrumbs: [],
    additionalMenus: [],
    page: null,
  }
  static propTypes = {
    user: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    page: PropTypes.node,
    children: PropTypes.node.isRequired,
    breadcrumbs: PropTypes.array,
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
    const { user, children, breadcrumbs, page, config } = this.props;
    const title = page.getMeta('title');
    const description = page.getMeta('description');
    const breadItems = (page.state.metas || []).map((meta, key) => ({
      key,
      title: meta.crumb && meta.crumb.title || meta.title || 'title',
      url: meta.crumb && meta.crumb.url || meta.url || '/',
      icon: meta.crumb && meta.crumb.icon || meta.icon// || <DashboardIcon />,
    }));
    // [
    //   { key: 1, icon: <DashboardIcon />, title: 'Личный кабинет', url: '/cabinet' },
    //   ...breadcrumbs,
    // ];
    const mainMenus = [
      {
        icon: <DashboardIcon />,
        title: 'Главная',
        url: '/cabinet',
      },
      {
        icon: <Users />,
        title: 'Друзья',
        label: 14,
        items: [
          { title: 'Все друзья', url: '/cabinet/friends' },
          { title: 'Входящие заявки', url: '/cabinet/friends/in' },
          { title: 'Исходящие заявки', url: '/cabinet/friends/out' },
        ],
      },
      {
        icon: <Posts />,
        title: 'Посты',
        url: '/cabinet/posts',
      },
      {
        icon: <Mail />,
        label: 10,
        title: 'Сообщения',
        url: '/cabinet/im',
      },
    ];
    const adminMenu = [
      {
        icon: <DashboardIcon />,
        title: 'Панель управления',
        url: '/admin',
      },
      {
        icon: <Users />,
        label: '6',
        title: 'Пользователи',
        url: '/admin/users',
      },
      {
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
              {config.siteTitle.substr(0, 2)}
            </MiniLogo>
            <LargeLogo onClick={this.toDashboard}>
              {config.siteTitle}
            </LargeLogo>
          </Logo>
          <Navbar controlbar={false}>
            <UserMenu
              // onLinkClick={action('onLinkClick')}
              onButtonClick={this.logout}
              image={user.profile.avatar}
              name={user.fullName}
              title={`Добро пожаловать, ${user.firstName}`}
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
            image={user.profile.avatar}
            name={user.fullName}
          />
          <SidebarMenuWrapper>
            <SidebarMenuHeader title="НАВИГАЦИЯ" />
            {mainMenus.map((menu, i) => {
              menu.id = i + 1;
              const isSelected = menu.id === this.state.selectedLinkId;
              return (
                <TreeMenu
                  key={i}
                  {...menu}
                  isSelected={isSelected}
                  onClick={() => this.onMenuClick(menu)}
                  onItemClick={this.onMenuClick}
                />
              );
            })}
          </SidebarMenuWrapper>
          <If condition={user.role === 'admin'}>
            <SidebarMenuWrapper>
              <SidebarMenuHeader title="АДМИН МЕНЮ" />
              {adminMenu.map((menu, i) => {
                menu.id = mainMenus.length + i + 1;
                const isSelected = menu.id === this.state.selectedLinkId;
                return (
                  <TreeMenu
                    key={i}
                    {...menu}
                    isSelected={isSelected}
                    onClick={() => this.onMenuClick(menu)}
                    onItemClick={this.onMenuClick}
                  />
                );
              })}
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
          <div className="pull-right hidden-xs" dangerouslySetInnerHTML={{ __html: config.siteCopyright }} />
        </FooterWrapper>
      </LayoutWrapper>
    );
  }
}
