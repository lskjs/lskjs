import React, { Component } from 'react';
import Navbar from './Navbar';

export default class MainLayout extends Component { //eslint-disable-line
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}
