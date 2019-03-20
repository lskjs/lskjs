import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autobind from 'core-decorators/lib/autobind';
import If from 'react-if';

import CheckboxBlank from 'react-icons2/mdi/checkbox-blank-outline';
import CheckboxCheck from 'react-icons2/mdi/checkbox-marked';

import RadioBlank from 'react-icons2/mdi/checkbox-blank-circle-outline';
import RadioCheck from 'react-icons2/mdi/checkbox-marked-circle';

import {
  Additional,
  General,
  Block,
  Icon,
  Item,
  Header,
  Label,
  Footer,
  Info,
} from './ExtendedCheckblock.styles';

class ExtendedCheckblock extends PureComponent {
  static propTypes = {
    value: PropTypes.bool,
    block: PropTypes.bool,
    children: PropTypes.any,
    label: PropTypes.string.isRequired,
    validationState: PropTypes.oneOf(['success', 'warning', 'error']),
    info: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(['radio', 'checkbox']),
  }
  static defaultProps = {
    value: false,
    block: false,
    info: null,
    onChange: null,
    validationState: null,
    children: null,
    disabled: false,
    type: 'checkbox',
  }
  @autobind
  handleClick() {
    const { onChange, value, type } = this.props;
    if (onChange) onChange(type === 'radio' ? true : !value);
  }
  render() {
    const {
      children,
      label,
      validationState,
      info,
      disabled,
      block,
      type,
      height,
      value,
    } = this.props;
    let checkIcon;
    let blankIcon;
    if (type === 'checkbox') {
      checkIcon = <CheckboxCheck />;
      blankIcon = <CheckboxBlank />;
    } else if (type === 'radio') {
      checkIcon = <RadioCheck />;
      blankIcon = <RadioBlank />;
    }
    return (
      <Block
        checked={value}
        disabled={disabled}
        hasChildren={children}
        type="button"
      >
        {/* <DEV json={{ value }} /> */}
        <General>
          <Item
            error={validationState === 'error'}
            block={block}
            onClick={this.handleClick}
            disabled={disabled}
            type="button"
            style={{ height }}
          >
            <Header>
              <Icon>
                {value ? checkIcon : blankIcon}
              </Icon>
              <Label>{label}</Label>
            </Header>
            <If condition={info}>
              <Footer>
                <Info>
                  {info}
                </Info>
              </Footer>
            </If>
          </Item>
        </General>
        <If condition={children}>
          <Additional>
            {children}
          </Additional>
        </If>
      </Block>
    );
  }
}

export default ExtendedCheckblock;
// import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
// import autobind from 'core-decorators/lib/autobind';
// import If from 'react-if';

// import CheckboxBlank from 'react-icons2/mdi/checkbox-blank-outline';
// import CheckboxCheck from 'react-icons2/mdi/checkbox-marked';

// import RadioBlank from 'react-icons2/mdi/checkbox-blank-circle-outline';
// import RadioCheck from 'react-icons2/mdi/checkbox-marked-circle';

// import {
//   Additional,
//   General,
//   Block,
//   Icon,
//   Item,
//   Header,
//   Label,
//   Footer,
//   Info,
// } from './ExtendedCheckblock.styles';

// class ExtendedCheckblock extends PureComponent {
//   static propTypes = {
//     value: PropTypes.bool,
//     block: PropTypes.bool,
//     children: PropTypes.any,
//     label: PropTypes.string.isRequired,
//     validationState: PropTypes.oneOf(['success', 'warning', 'error']),
//     info: PropTypes.string,
//     onChange: PropTypes.func,
//     disabled: PropTypes.bool,
//     type: PropTypes.oneOf(['radio', 'checkbox']),
//   }
//   static defaultProps = {
//     value: false,
//     block: false,
//     info: null,
//     onChange: null,
//     validationState: null,
//     children: null,
//     disabled: false,
//     type: 'checkbox',
//   }
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: props.value,
//     };
//   }
//   componentWillReceiveProps(next) {
//     console.log('componentWillReceiveProps', next);
//     const { value } = this.props;
//     if (value !== next.value) {
//       this.setState({ value: next.value });
//     }
//   }
//   @autobind handleClick() {
//     this.setState({ value: !this.state.value }, this.callback);
//   }
//   @autobind callback() {
//     const { onChange } = this.props;
//     const { value } = this.state;
//     if (onChange) onChange(value);
//   }
//   render() {
//     const { value } = this.state;
//     const {
//       children,
//       label,
//       validationState,
//       info,
//       disabled,
//       block,
//       type,
//       height,
//     } = this.props;
//     const checkIcon = type === 'checkbox' ? <CheckboxCheck /> : <RadioCheck />;
//     const blankIcon = type === 'checkbox' ? <CheckboxBlank /> : <RadioBlank />;
//     return (
//       <Block
//         checked={value}
//         disabled={disabled}
//         hasChildren={children}
//         type="button"
//       >
//         <General>
//           <Item
//             error={validationState === 'error'}
//             block={block}
//             onClick={this.handleClick}
//             disabled={disabled}
//             type="button"
//             style={{ height }}
//           >
//             <Header>
//               <Icon>
//                 {value ? checkIcon : blankIcon}
//               </Icon>
//               <Label>{label}</Label>
//             </Header>
//             <If condition={info}>
//               <Footer>
//                 <Info>
//                   {info}
//                 </Info>
//               </Footer>
//             </If>
//           </Item>
//         </General>
//         <If condition={children}>
//           <Additional>
//             {children}
//           </Additional>
//         </If>
//       </Block>
//     );
//   }
// }

// export default ExtendedCheckblock;
