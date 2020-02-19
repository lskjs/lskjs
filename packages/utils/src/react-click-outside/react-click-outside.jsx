import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ClickOutside extends Component {
  constructor(props) {
    super(props);
    this.getContainer = this.getContainer.bind(this);
    this.isTouch = false;
  }

  componentDidMount() {
    document.addEventListener('touchend', this.handle.bind(this), true);
    document.addEventListener('click', this.handle.bind(this), true);
  }

  componentWillUnmount() {
    document.removeEventListener('touchend', this.handle.bind(this), true);
    document.removeEventListener('click', this.handle.bind(this), true);
  }
  getContainer(ref) {
    this.container = ref;
  }

  handle = e => {
    if (e.type === 'touchend') this.isTouch = true;
    if (e.type === 'click' && this.isTouch) return;
    const { onClickOutside } = this.props;
    const el = this.container;
    if (el && !el.contains(e.target)) onClickOutside(e);
  };

  render() {
    const { children, onClickOutside, ...props } = this.props;
    return (
      <div {...props} ref={this.getContainer}>
        {children}
      </div>
    );
  }
}

ClickOutside.propTypes = {
  onClickOutside: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
export default ClickOutside;
