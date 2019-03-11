
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Nanobar from 'nanobar';

class Progress extends Component {
  nanobar = null;
  state = { value: null };

  // static propTypes = {
  //   progress: PropTypes.number.isRequired,
  //   mountOnBody: PropTypes.bool,
  //   className: PropTypes.string,
  // };

  constructor() {
    super();
    this.bar = React.createRef();
  }

  componentDidMount() {
    const { value, mountOnBody, className } = this.props;
    // console.log(this.bar);

    this.nanobar = new Nanobar({
      classname: className,
      target: mountOnBody
        ? null
        : this.bar.parentNode,
    });

    // this.setState({ value });
    this.state.value = value;
    this.nanobar.go(value);

    this.timeout = setInterval(() => {
      const value = this.state.value + 1;
      this.setState({ value });
      this.nanobar.go(value);
    }, 1000);
  }

  componentWillReceiveProps({ value }) {
    this.setState({ value });
    this.nanobar.go(value);
  }

  componentWillUnmount() {
    const { el } = this.nanobar;
    el.parentNode.removeChild(el);
    clearInterval(this.timeout);
  }

  render() {
    return (
      <span ref={this.bar} />
    );
  }
}

export default Progress;
