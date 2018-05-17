import React, { PureComponent } from 'react';
// import { inject } from 'mobx-react';
import Button from './Button';
import Button2 from './Button2';

// @inject('uapp')
export default class TestPage extends PureComponent {
  state = {
    count: 0
  }
  render() {
    const { uapp } = this.props;
    const { count } = this.state;
    return <>
      <h1>Hello World: {uapp?.name}</h1>
      <Button>
        Button
      </Button>
      <Button2>
        Button2
      </Button2>
      <div>
        {count}
        <button onClick={() => this.setState({
          count: count + 1,
        })}>
          ++
        </button>
        ??
      </div>
      <div>
        {[
          __DEV__ && '__DEV__',
          __PROD__ && '__PROD__',
          __SERVER__ && '__SERVER__',
          __CLIENT__ && '__CLIENT__',
        ].filter(a => a).join(' ')}
      </div>
    </>
  }
}
