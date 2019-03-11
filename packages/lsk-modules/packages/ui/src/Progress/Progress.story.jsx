import React from 'react';
import Story from '../Story';
import Progress from './Progress';

const Wrapper = ({ children }) => (
  <div style={{ padding: 100, background: '#eee' }}>
    <div style={{ padding: 100, background: '#ccc' }}>
      {children}
    </div>
  </div>
);

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
          <Progress value={30} isLoading />
        </Wrapper>
      </Story>
    ))
    .add('global', () => (
      <Story>
        <Wrapper>
          <Progress value={30} isLoading global />
        </Wrapper>
      </Story>
    ))
);

