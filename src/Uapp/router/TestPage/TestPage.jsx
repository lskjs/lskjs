import React, { PureComponent } from 'react';
// import { inject } from 'mobx-react';
// import A from '@lskjs/general/A';
import Button from '../Button';
import Button2 from '../Button2';

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
        Button 1
      </Button>
      <Button2>
        Button 5+
      </Button2>
      {/* <A>
        test a
      </A> */}
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
