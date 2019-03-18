import React from 'react';
import styled from '@emotion/styled';
import { css } from 'emotion';
import Story from '../Story';
import filterProps from '../utils/filterProps';

class Input extends React.Component {
  render() {
    const {
      type, value, inputClass, ...props
    } = this.props;
    return (
      <input
        className={inputClass}
        type={type}
        value={value}
        {...filterProps(props)}
      />
    );
  }
}

class SuperInput extends React.Component {  //eslint-disable-line
  render() {
    const { something, componentClass: ComponentClass = 'input', ...props } = this.props;

    return (
      <ComponentClass
        style={{
          background: '#f00',
        }}
        {...filterProps(props, ComponentClass)}
      />
    );
  }
}

const Block = styled(SuperInput)`
  width: 70px;
  height: 50px;
  
  ${p => (p.niceStyle && css`
    background-color: #6c757d;
    color: #17a2b8;
    border-radius: 8px;
    border: none;
  `)}
`;

export default ({ storiesOf }) => {
  storiesOf('example', module)
    .add('isuvorov2', () => (
      <Story>
        <Block
          niceStyle
          type="text"
          value="kek"
          onChange={() => {}}
          inputClass="kek"
        />
        <Block
          componentClass={Input}
          niceStyle
          type="text"
          value="kek"
          onChange={() => {}}
          inputClass="kek"
        />
      </Story>
    ));
};
