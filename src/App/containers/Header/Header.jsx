import React, { Component, PropTypes } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import Link from 'lsk-general/General/Link';
import { toJS } from 'mobx';

@inject('auth', 'user')
@observer
export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  }
  render() {
    const { auth, user } = this.props;
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link href="/">Example</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} componentClass={Link} href="/">Главная</NavItem>
          <NavItem eventKey={2} componentClass={Link} href="/admin">Админка</NavItem>
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
        <Nav pullRight>
          <If condition={auth.isAuth}>
            <NavDropdown eventKey={1} title={user.fullName} id="user-dropdown">
              <MenuItem eventKey={1.1} componentClass={Link} href="/cabinet">Профиль</MenuItem>
              <MenuItem eventKey={1.3} componentClass={Link} href="/cabinet/settings">Настройки</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={1.4} componentClass={Link} href="/auth/logout">Выход</MenuItem>
            </NavDropdown>
          </If>
          <If condition={!auth.isAuth}>
            <NavItem eventKey={2} componentClass={Link} href="/auth">Войти</NavItem>
          </If>
        </Nav>
      </Navbar>
    );
  }
}