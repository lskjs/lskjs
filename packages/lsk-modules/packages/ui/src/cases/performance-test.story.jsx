import React, { PureComponent } from 'react';
import range from 'lodash/range';

import Story from '../Story';

class Item extends PureComponent {
  render() {
    const { item = {}, id, title } = this.props;
    return (
      <div>
        <span>
          {id || item.id}
        </span>
        <span>
          {title || item.title}
        </span>
        <span>
          {Math.random()}
        </span>
      </div>
    );
  }
}

class PerformanceTest extends PureComponent {  //eslint-disable-line
  // state = {};
  constructor(props) {
    super(props);
    this.state = {
      count: props.count || 10,
    };
  }
  render() {
    const { count } = this.state;
    const items = range(count).map(id => ({
      id,
      title: `Title ${id}`,
    }));
    return (
      <div>
        <div>
          <button onClick={() => this.setState({ count: count - 1 })}>--</button>
          {count}
          <button onClick={() => this.setState({ count: count + 1 })}>++</button>
        </div>
        {items.map(item => <Item key={item.id} {...item} />)}

        {/*  NOT WORKING!!! */}
        {/* {items.map(item => <Item key={item.id} item={item} />)} */}

        {/*  NOT WORKING TOO!!! */}
        {/* {items.map(item => (
          <div key={item.id}>
            <span>
              {item.id}
            </span>
            <span>
              {item.title}
            </span>
            <span>
              {Math.random()}
            </span>
          </div>
        ))} */}
      </div>
    );
  }
}


export default ({ storiesOf }) => (
  storiesOf('performance', module)
    .add('10 elements', () => (
      <Story>
        <PerformanceTest />
      </Story>
    ))
    .add('100 elements', () => (
      <Story>
        <PerformanceTest count={100} />
      </Story>
    ))
    .add('1000 elements', () => (
      <Story>
        <PerformanceTest count={1000} />
      </Story>
    ))
    .add('10k elements', () => (
      <Story>
        <PerformanceTest count={10000} />
      </Story>
    ))
    .add('100k elements', () => (
      <Story>
        <PerformanceTest count={100000} />
      </Story>
    ))
    .add('grid', () => (
      <Story>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '0px 2fr 1fr',
        }}
        >

          <div style={{
            gridColumn: 1,
            overflow: 'hidden',
          }}
          >
            111
          </div>
          <div style={{
            gridColumn: 2,
            overflow: 'hidden',
          }}
          >
            222
          </div>
          <div style={{
            gridColumn: 3,
            overflow: 'hidden',
          }}
          >
            333
          </div>
        </div>
      </Story>
    ))
);
