import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Story from '../Story';
import Progress from './Progress';

class Wrapper extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children } = this.props;
    return (
      <div style={{
        padding: 100,
        background: '#eee',
        border: '1px solid black',
        position: 'relative',
    }}>
        <div style={{
          padding: 100,
          background: '#ccc',
          border: '1px solid black',
          position: 'relative',
      }}>
          {children}
        </div>
      </div>
    );
  }
}

export default ({ storiesOf }) => (
  storiesOf('Progress', module)
    .add('default', () => (
      <Story>
        <Wrapper>
          <Progress />
        </Wrapper>
      </Story>
    ))
    .add('50%', () => (
      <Story>
        <Wrapper>
          <Progress value={50} />
        </Wrapper>
      </Story>
    ))
    .add('isLoading', () => (
      <Story>
        <Wrapper>
          <Progress isLoading />
        </Wrapper>
      </Story>
    ))
    .add('isLoading from 30', () => (
      <Story>
        <Wrapper>
          <Progress value={30} isLoading />
        </Wrapper>
      </Story>
    ))
    .add('shadow', () => (
      <Story>
        <Wrapper>
          <Progress value={30} isLoading shadow />
        </Wrapper>
      </Story>
    ))
    .add('deep wrapping', () => (
      <Story>
        <Wrapper>
          <div>
            aaaaa
            <div>
              bbbb
              <div>
                ccccc
                <div>
                  dddd
                  <Progress value={30} isLoading />
                  wwwwww
                </div>
                xxxxxx
              </div>
              yyyyy
            </div>
            zzzzz
          </div>
        </Wrapper>
      </Story>
    ))
    .add('isLoading global', () => (
      <Story>
        <Wrapper>
          <Progress isLoading global />
        </Wrapper>
      </Story>
    ))
    .add('custom speed', () => (
      <Story>
        <Wrapper>
          <Progress value={30} speed={10} isLoading global />
        </Wrapper>
      </Story>
    ))
    .add('custom color', () => (
      <Story>
        <Wrapper>
          <Progress value={30} speed={10} isLoading global color="#0000ff" />
        </Wrapper>
      </Story>
    ))
    .add('variable props height', () => (
      <Story state={{ global: false, value: 30 }}>
        {({ global, value }, setState) => (
          <Wrapper>
            <div>
              <button onClick={() => setState({ global: !global })}>
                   global = {global ? 'true' : 'false'}
              </button>
              <button onClick={() => setState({ value: 0 })}>
                  value = 0
              </button>
              <button onClick={() => setState({ value: value + 5 })}>
                  value ++
              </button>
              <Progress
                value={value}
                speed={5}
                isLoading
                global={global}
                height={7}
              />
            </div>
          </Wrapper>
        )}
      </Story>
    ))
);
// {this.state.global ? 'true' : 'false'}
