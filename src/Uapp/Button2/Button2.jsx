import React, { PureComponent } from 'react';
import styles from './Button2.css';
import css from 'importcss';

@css(styles)
export default class Button2 extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <button className={styles.button}>
        {children}
      </button>
    );
  }
}
