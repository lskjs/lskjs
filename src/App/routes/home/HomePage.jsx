import React, { PropTypes } from 'react';
import importcss from 'importcss';
// import { Grid, Row, Col, Nav, NavItem, Card, CardBlock, CardTitle } from 'react-bootstrap';
import Component from 'lsk-general/General/Component';
import Header from '../../components/Header';
import Slide from 'lsk-general/General/Slide';

@importcss(require('./HomePage.css'))
export default class HomePage extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
  }
  render() {
    const { siteTitle, siteDescription } = this.props.config;
    return (
      <div>
        <Header siteTitle={siteTitle} />
        <Slide full center>
          <h1>{siteTitle}</h1>
          <h2>{siteDescription}</h2>
        </Slide>
      </div>
    );
  }
}
