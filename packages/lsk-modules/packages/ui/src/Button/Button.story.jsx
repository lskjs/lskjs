import React from 'react';
import Button from './Button';
import Story from '../Story';

export default ({ storiesOf }) => {
  storiesOf('Button', module)
    .add('paint', () => (
      <Story>
        <Button>Default</Button>
        <Button paint="primary">Primary</Button>
        <Button paint="info">Info</Button>
        <Button paint="success">Success</Button>
        <Button paint="warning">Warning</Button>
        <Button paint="danger">Danger</Button>
      </Story>
    ))
    .add('size', () => (
      <Story>
        <Button paint="primary">default</Button>
        <Button paint="primary" size="small">small</Button>
        <Button paint="primary" size="large">large</Button>
      </Story>
    ))
    .add('props', () => (
      <Story>
        <Button paint="primary" >Default</Button>
        <Button paint="primary" view="transparent" >view=transparent</Button>
        <Button paint="primary" view="text" >view=text</Button>
        <Button paint="primary" block >block</Button>
        <Button paint="primary" disabled >disabled</Button>
      </Story>
    ))
    .add('disabled', () => (
      <Story>
        <Button disabled>Default</Button>
        <Button disabled paint="primary">Primary</Button>
        <Button disabled paint="info">Info</Button>
        <Button disabled paint="success">Success</Button>
        <Button disabled paint="warning">Warning</Button>
        <Button disabled paint="danger">Danger</Button>
      </Story>
    ))
    .add('social', () => (
      <Story>
        <Button
          colors={{
            color: '#fff',
            background: '#f70b00',
            hoverColor: '#fff',
            hoverBackground: '#990801',
            activeColor: '#fff',
            activeBackground: '#990801',
          }}
          size="large"
        >
          Youtube
        </Button>
      </Story>
    ));
};
