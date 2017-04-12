import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';

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
import FooterWrapper from 'lsk-admin/Admin/lib/footer/FooterWrapper';

import Dashboard from 'react-icons2/mdi/view-dashboard';

import CabinetSidebar from './CabinetSidebar';


@inject('user', 'config', 'page')
@observer
export default class CabinetLayout extends Component {
  static contextTypes = {
    history: PropTypes.object.isRequired,
  }
  static propTypes = {
    user: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    page: PropTypes.any.isRequired,
    // children: PropTypes.any.isRequired,
    children: PropTypes.any,
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
  render() {
    const { user, children, page, config } = this.props;
    const title = page.getMeta('title');
    const description = page.getMeta('description');
    const breadItems = (page.state.metas || []).slice(1).map((meta, key) => ({
      key,
      title: meta.crumb && meta.crumb.title || meta.title || 'Главная',
      url: meta.crumb && meta.crumb.url || meta.url || '/',
      icon: meta.crumb && meta.crumb.icon || meta.icon,
    }));
    if (breadItems && breadItems[0] && !breadItems[0].icon) {
      breadItems[0].icon = <Dashboard />;
    }

    return (
      <LayoutWrapper color="black">
        <HeaderWrapper>
          <Logo href="/">
            <MiniLogo>
              {config.site.abbr}
            </MiniLogo>
            <LargeLogo>
              {config.site.title}
            </LargeLogo>
          </Logo>
          <Navbar controlbar={false}>
            <UserMenu
              // onLinkClick={action('onLinkClick')}
              onButtonClick={this.logout}
              image={user.avatar}
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
        <CabinetSidebar />
        <PageWrapper>
          <PageHeader title={title} description={description}>
            <Breadcrumb items={breadItems} />
          </PageHeader>
          <PageContent>
            {children}
          </PageContent>
        </PageWrapper>
        <FooterWrapper>
          <div className="pull-right hidden-xs" dangerouslySetInnerHTML={{ __html: config.site.copyright }} />
        </FooterWrapper>
      </LayoutWrapper>
    );
  }
}
