import React from 'react';
import Col from 'reactstrap/lib/Col';
import Cover from './Cover';
import Story from '../../../Story';


export default ({ storiesOf }) => (
  storiesOf('ui/Cover', module)
    .add('Default', () => (
      <Story>
        <Cover
          image="http://iarouse.com/dist-react-ant-design/v1.1.4/assets/images-demo/covers/leone-venter-559377-cut.jpg"
          color="black"
        >
          <Cover.Title>100+ Components</Cover.Title>
          <Cover.SubTitle>
            Ant admin is a multi-purpose
            template which comes with a
            huge collection of components out of box.
          </Cover.SubTitle>
          <Cover.Divider />
          <Cover.Footer>
            All components are well designed & easy to use.
          </Cover.Footer>
        </Cover>
      </Story>
    ))
    .add('Centered', () => (
      <Story>
        <Cover
          image="http://iarouse.com/dist-react-ant-design/v1.1.4/assets/images-demo/covers/alexandre-perotto-75274-unsplash.jpg"
          color="white"
          align="center"
          overlay
        >
          <Col md={7} lg={6} style={{ margin: 'auto' }}>
            <Cover.Title>100+ Components</Cover.Title>
            <Cover.SubTitle>
              Ant admin is a multi-purpose
              template which comes with a
              huge collection of components out of box.
            </Cover.SubTitle>
            <Cover.Divider />
            <Cover.Footer>
              <Cover.Button type="primary">try it now</Cover.Button>
            </Cover.Footer>
          </Col>
        </Cover>
      </Story>
    ))
);
