import Link from '../../Link'
import { Component } from 'react'

export default class LeftNavbar extends Component {
  render() {
    return (
      <section className="left-navbar">
        <Link to="/">
          <img src="/front/assets/img/logo.png" className="logotype"/>
        </Link>
        <div className="menu">
          <Link to="/cabinet/profile" activeClassName="active" className="menu-item">
            <div className="mi-icon settings"/>
            <div className="mi-text">Профиль</div>
          </Link>
          {/* <Link to="/works" activeClassName="active" className="menu-item">
            <div className="mi-icon tools"/>
            <div className="mi-text">Мои работы</div>
          </Link> */}
          {/* <Link to="/cabinet/hometasks" activeClassName="active" className="menu-item">
            <div className="mi-icon book"/>
            <div className="mi-text">Мои ДЗ</div>
          </Link> */}
          {/* <Link to="/reviews" activeClassName="active" className="menu-item">
            <div className="mi-icon layers"/>
            <div className="mi-text">Публикации</div>
          </Link>
          <Link to="/news" activeClassName="active" className="menu-item">
            <div className="mi-icon news"/>
            <div className="mi-text">Новости</div>
          </Link> */}
        </div>
      </section>
    );
  }
}
