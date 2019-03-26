import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import map from 'lodash/map';

function isMiddleClickEvent(event) {
  return event.button === 1;
}

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}


function isAbsoluteUrl(url = '') {
  return url.indexOf('://') > 0 || url.indexOf('//') === 0;
}


class Link extends PureComponent {
  static defaultProps = {
    children: null,
    onClick: null,
    to: null,
    href: null,
  }
  static propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
  };

  static contextTypes = {
    history: PropTypes.object.isRequired,
  };

  getHref() {
    const { to, href, qs } = this.props;
    let toOrHref = to || href;
    if (qs) {
      if (toOrHref.indexOf('?') === -1) {
        toOrHref += '?';
      } else {
        toOrHref += '&';
      }
      toOrHref += map(qs, (val, key) => {
        if (!(isArray(val) || isPlainObject(val))) return [key, val].join('=');
        return [key, JSON.stringify(val)].join('=');
      }).join('&');
    }
    return toOrHref;
  }
  handleClick = (e) => {
    if (isMiddleClickEvent(e)) {
      return;
    }

    if (this.props.onClick) {
      this.props.onClick(e);
    }

    if (isModifiedEvent(e) || !isLeftClickEvent(e)) {
      return;
    }

    if (e.defaultPrevented === true) {
      return;
    }

    const url = this.getHref();
    if (url == null) {
      return;
    }
    if (this.props.target === '_blank' || isAbsoluteUrl(url)) {
      return;
    }
    e.preventDefault();

    this.context.history.push(url);
  };

  render() {
    const {
      to,
      href,
      qs,
      children,
      ...props
    } = this.props;
    const url = this.getHref();
    return <a href={url} {...props} onClick={this.handleClick}>{children}</a>;
  }
}

export default Link;
