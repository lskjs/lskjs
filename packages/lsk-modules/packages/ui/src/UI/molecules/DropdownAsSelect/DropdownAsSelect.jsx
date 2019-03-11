import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import autobind from 'core-decorators/lib/autobind';
import ChevronDownIcon from 'react-icons2/mdi/chevron-down';
import { Manager, Reference, Popper } from 'react-popper';
import Outside from 'react-click-outside';
import { contentStyle, popperDisabledStyle, Content, Trigger, Icon } from './DropdownAsSelect.styles';

class SelectFilter extends PureComponent {
  static propTypes = {
    trigger: PropTypes.any,
    children: PropTypes.any,
    disabled: PropTypes.bool,
    contentWrapperProps: PropTypes.object,
    onClose: PropTypes.func,
  }

  static defaultProps = {
    trigger: null,
    children: null,
    disabled: false,
    contentWrapperProps: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      contentHeight: '100%',
    };
    this.content = React.createRef();
  }

  @autobind
  openHandler(open) {
    this.setState({ open }, () => {
      this.setState({
        contentHeight: this.content.current?.scrollHeight || '100%', // eslint-disable-line no-undef
      });
    });
  }

  @autobind
  renderContent({ ref, style, placement }) {
    const { open, contentHeight } = this.state;
    const { children, contentWrapperProps } = this.props;
    if (!open) return false;
    return (
      <Content
        innerRef={ref}
        data-placement={placement}
        height={contentHeight}
        className={contentStyle}
        style={style}
      >
        <div ref={this.content}>
          <div {...contentWrapperProps}>
            {children}
          </div>
        </div>
      </Content>
    );
  }
  @autobind
  onClickOutside() {
    const { open } = this.state;
    if (!open) return;
    this.openHandler(false);
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  render() {
    const { open } = this.state;
    const { trigger, disabled } = this.props;
    return (
      <Outside onClickOutside={this.onClickOutside}>
        <Manager>
          <Reference>
            {({ ref }) => (
              <Trigger
                innerRef={ref}
                open={!disabled ? open : false}
                disabled={disabled}
                onClick={() => !disabled && this.openHandler(!open)}
                type="button"
              >
                {trigger}
                <Icon>
                  <ChevronDownIcon />
                </Icon>
              </Trigger>
            )}
          </Reference>
          <Popper
            placement="bottom"
            eventsEnabled={open}
            modifiers={{
              flip: {
                enabled: false,
              },
              keepTogether: {
                enabled: false,
              },
              preventOverflow: {
                enabled: false,
              },
              shift: {
                enabled: false,
              },
            }}
            className={cx({
              [popperDisabledStyle]: !open,
            })}
          >
            {this.renderContent}
          </Popper>
        </Manager>
      </Outside>
    );
  }
}

export default SelectFilter;
