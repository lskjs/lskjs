import React, { PureComponent } from 'react';
import styles from './Button.css';
// import { inject } from 'mobx-react';

// @inject('uapp')
export default class Button extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <button className={styles.button}>
        {children}
      </button>
    );
  }
}
