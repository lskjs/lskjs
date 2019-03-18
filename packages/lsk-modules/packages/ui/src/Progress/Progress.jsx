
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nanobar from 'nanobar';
import get from 'lodash/get';
import { withTheme } from 'emotion-theming';

@withTheme
class Progress extends Component {
  static propTypes = {
    global: PropTypes.bool,
    speed: PropTypes.number,
    value: PropTypes.number,
    height: PropTypes.number,
    // color: PropTypes.string,
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    isLoading: false,
    global: false,
    speed: 2,
    height: 2,
    value: null,
    // shadow: true,
    // color: null,
  }

  state = {
    value: this.props.value,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.value) {
      return {
        value: props.value,
      };
    }
    return null;
  }

  componentDidMount() {
    this.nanobar = new Nanobar({
      target: this.bar.current,
    });
    this.init();
    this.renderNanobar();
    window.progress = this;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isLoading && !this.props.isLoading) {
      clearInterval(this.timeout);
    }
    if (!prevProps.isLoading && this.props.isLoading) {
      this.init();
    }
    // if (prevProps.value !== this.props.value) {
    //   this.setState({ value: this.props.value });
    // }
    this.renderNanobar();
  }


  componentWillUnmount() {
    const { el } = this.nanobar;
    el.parentNode.removeChild(el);
    clearInterval(this.timeout);
  }
  init() {
    const { isLoading } = this.props;
    if (isLoading) {
      this.timeout = setInterval(() => {
        const { speed } = this.props;
        let value = this.state.value + speed;
        if (value < 0) value = 0;
        if (value > 100) {
          value = 100;
          clearInterval(this.timeout);
        }
        this.setState({ value });
      }, 1000);
    }
  }
  bar = React.createRef();


  renderNanobar() {
    const { theme, global } = this.props;
    const { value } = this.state;
    const { color = get(theme, 'colors.primary', '#1890ff'), shadow, top = 0 } = this.props;
    const container = this.nanobar.el;
    const bar = this.nanobar.el.children[0];

    container.style.cssText = `position: ${global ? 'fixed' : 'absolute'}; left: 0; top: ${top};  z-index: 1;`;
    console.log('container.style.cssText', container.style.cssText);

    bar.style.cssText = `
      height: ${this.props.height}px;
      ${shadow ? `box-shadow: 0 0 12px ${color}, 0 0 5px ${color};` : ''}
      overflow: hidden;
      max-width: 100%; 
      position: absolute !important;
      background-color: ${color};
      top: 0;
      left: 0;
    `;
    if (value != null) {
      this.nanobar.go(value);
    }
  }

  render() {
    return (
      <div
        id="nano"
        style={{
          position: 'absolute !important',
          top: '0',
          left: '0',
          width: '100%',
        }}
      >
        <span ref={this.bar} />
      </div>
    );
  }
}

export default Progress;
