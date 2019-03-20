import React, { PureComponent } from 'react';
import autobind from 'core-decorators/lib/autobind';
import PropTypes from 'prop-types';
import { injectGlobal } from 'emotion';
import { Collapse as ReactCollapse, UnmountClosed } from 'react-collapse';
import cx from 'classnames';

injectGlobal(`
  .ReactCollapse--collapse {
    will-change: height, border-bottom;
    border-bottom: none !important;
  }
  .ReactCollapse--rest {
    overflow: visible !important;
    position: relative;
    border-bottom: 1px solid #e3e3e3 !important;
    z-index: 11;
  }
`);


class Collapse extends PureComponent {
  static propTypes = {
    show: PropTypes.bool,
    children: PropTypes.element.isRequired,
  }

  static defaultProps = {
    show: false,
  }

  static getDerivedStateFromProps(props, state) {
    if (props.show !== state.show) {
      return {
        rest: false,
        show: props.show,
        prevShow: state.show,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      rest: false,
      prevShow: false,
      show: props.show,
    };
  }

  componentDidUpdate(prevProps) {
    const { rest, prevShow } = this.state;
    if (prevShow !== prevProps.show) {
      this.toggleRestFilterBar(rest, prevShow);
    }
  }

  @autobind
  handleRenderer({ current, to }) {
    const { rest } = this.state;
    if (current !== to && !rest) return;
    this.toggleRestFilterBar(true);
  }

  toggleRestFilterBar(rest, prevShow = false) {
    clearTimeout(this.timeoutId);
    if (prevShow) {
      this.setState({ rest });
      return;
    }
    this.timeoutId = setTimeout(() => {
      this.setState({ rest });
    }, 500);
  }

  render() {
    const { children, type, ...props } = this.props;
    const { show, rest } = this.state;
    let Wrapper;

    if (type === 'collapse') {
      Wrapper = ReactCollapse;
    } else if (type === 'collapseUnmount') {
      Wrapper = UnmountClosed;
    } else {
      const style = {};
      if (!show) style.display = 'none';
      return (
        <div style={style}>
          {children}
        </div>
      );
    }
    return (
      <Wrapper
        {...props}
        isOpened={show}
        forceInitialAnimation={type === 'collapseUnmount'}
        onRender={this.handleRenderer}
        onRest={() => {
          if (show) {
            this.toggleRestFilterBar(true);
          }
        }}
        theme={{
          collapse: cx({
            'ReactCollapse--collapse': true,
            'ReactCollapse--rest': show && rest,
          }),
        }}
      >
        {children}
      </Wrapper>
    );
  }
}

export default Collapse;
