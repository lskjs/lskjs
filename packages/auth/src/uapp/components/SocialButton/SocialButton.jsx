import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from '@lskjs/autobind';
import importcss from 'importcss';
import omit from 'lodash/omit';
import { Button  } from 'react-bootstrap';
import socials from '../../socials';

export default class SocialButton extends Component {
  state = { hover: false }

  @autobind
  toggleHover() {
    this.props.clickable && this.setState({ hover: !this.state.hover });
  }
  render() {
    const { name, clickable } = this.props;
    const value = socials[name];
    if (!value) return;
    const size = this.props.size || 50;
    const width = this.props.width || size;
    const height = this.props.height || size;

    const hoverStyle = {
      background: value.color,
      color: value.background,
    };

    const style = Object.assign(
      {
        display: 'inline-block',
        textAlign: 'center',
        cursor: clickable ? 'pointer' : 'none',
        transition: '.2s ease-in-out',
        width,
        height,
        lineHeight: `${height * 0.92}px`,
        fontSize: `${height * 0.5}px`,
        borderRadius: '50%',
        background: value.background,
        color: value.color,
      },
      this.props.style || {},
      this.state.hover && hoverStyle || {},
    );
    const Icon = value.icon;
    return (
      <span
        {...omit(this.props, ['clickable'])}
        style={style}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      >
        <Icon />
        {/* {value.icon} */}
      </span>
    );
  }
}
