import React, { PureComponent } from 'react';
import Navbar from './Navbar';

export default class MainLayout extends PureComponent {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}
