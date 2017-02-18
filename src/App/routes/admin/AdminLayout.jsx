import React, { Component } from 'react';

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

// import 'lsk-admin/Admin/sass/AdminLTE.g.scss';

export default class AdminLayout extends Component {
  render() {
    return (
      <LayoutWrapper color="black">
        <HeaderWrapper>
          <Logo>
            <MiniLogo>
              <b>S</b>b
            </MiniLogo>
            <LargeLogo>
              <b>Skill</b>Branch
            </LargeLogo>
          </Logo>
          <Navbar controlbar={false}>
            <UserMenu
              // onLinkClick={action('onLinkClick')}
              // onButtonClick={action('onButtonClick')}
              image={'https://remont3.ru/templates/umedia/dleimages/noavatar.png'}
              name="John Doe"
              title="Mr. John Doe"
              description="Javascript Full Stack Software Engineer"
              links={[
                { key: 1, text: 'Link 1' },
                { key: 2, text: 'Link 2' },
                { key: 3, text: 'Link 3' },
              ]}
              buttons={[
                { key: 1, text: 'Profile', align: 'left' },
                { key: 2, text: 'Logout' },
              ]}
            />
          </Navbar>
        </HeaderWrapper>
        <SidebarWrapper>
          <UserPanel
            image={'https://remont3.ru/templates/umedia/dleimages/noavatar.png'}
            name="John Doe"
          />
        </SidebarWrapper>
        <PageWrapper>
          <PageHeader
            title="Simple page"
            description="description about the simple page"
          >
            <Breadcrumb
              items={[
                { key: 1, icon: <DashboardIcon />, title: 'Home', url: '/' },
                { key: 2, title: 'Pages' },
                { key: 3, title: 'Simple' },
              ]}
            />
          </PageHeader>
          <PageContent>
            {this.props.children}
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
