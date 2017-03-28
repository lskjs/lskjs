import React, { Component, PropTypes } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import Link from 'lsk-general/General/Link';

@inject('auth', 'user', 'config')
@observer
export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  }
  render() {
    const { auth, user, config } = this.props;
    const menu = [
      {
        componentClass: Link,
        href: '/cabinet',
        children: 'Кабинет',
      },
      {
        componentClass: Link,
        href: '/admin',
        children: 'Администраторская',
      },
      {
        divider: true,
      },
      {
        componentClass: Link,
        href: '/cabinet/settings',
        children: 'Настройки',
      },
      {
        componentClass: Link,
        href: '/auth/logout',
        children: 'Выход',
      },
    ];
    if (user.role !== 'admin') {
      menu.splice(1, 1);
    }
    const userTitle = (
      <span style={{ display: 'inline-block', height: 0 }}>
        <img
          width={25}
          height={25}
          src={user.avatar}
          alt={user.fullName}
          name={user.fullName}
          style={{ marginRight: 8, borderRadius: '50%' }}
        />
        <span>{user.fullName}</span>
      </span>
    );
    return (
      <Navbar staticTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link href="/">{config.siteTitle}</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {/* <Nav>
            <NavItem eventKey={1} componentClass={Link} href="/">Главная</NavItem>
            <NavItem eventKey={2} componentClass={Link} href="/admin">Админка</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav> */}
          <Nav pullRight>
            <If condition={auth.isAuth}>
              <NavDropdown eventKey={1} title={userTitle} id="user-dropdown" className="menu-user-item">
                {menu.map((item, index) => (
                  <MenuItem key={index} eventKey={`1.${index + 1}`} {...item} />
                ))}
              </NavDropdown>
            </If>
            <If condition={!auth.isAuth}>
              <NavItem eventKey={2} componentClass={Link} href="/auth/login">Войти</NavItem>
              {/* <NavItem eventKey={3} componentClass={Link} href="/auth/signup">Регистрация</NavItem> */}
            </If>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
