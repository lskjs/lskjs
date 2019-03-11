import React from 'react';
import Story from '../../../Story';
import Box from './Box';
import Link from '../../../Link';
import AnimatedLink from '../AnimatedLink';
import '../../../styles/lib/antd.g.css';
import UserBoxFooter from '../UserBoxFooter';
import BoxDivider from '../../atoms/BoxDivider';

export default ({ storiesOf }) => (
  storiesOf('ui/Box', module)
    .add('Default', () => (
      <Story>
        <Box padded>
          <Box.Header>
            Box Header
          </Box.Header>
          <Box.Body>
            This is the body of box component.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Tenetur, quasi nam.
          </Box.Body>
          <Box.Footer>
            <AnimatedLink
              href="//google.com"
              target="_blank"
              icon="arrow-right"
            >
              Link
            </AnimatedLink>
          </Box.Footer>
        </Box>
      </Story>
    ))
    .add('DefaultBadged', () => (
      <Story>
        <Box padded>
          <Box.Header>
            Box Header
          </Box.Header>
          <Box.Badge pill primary>
            Badge
          </Box.Badge>
          <Box.Body>
            This is the body of box component.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Tenetur, quasi nam.
          </Box.Body>
          <Box.Footer>
            <AnimatedLink
              href="//google.com"
              target="_blank"
              icon="arrow-right"
            >
              Link
            </AnimatedLink>
          </Box.Footer>
        </Box>
      </Story>
    ))
    .add('HeaderLight', () => (
      <Story>
        <Box>
          <Box.Header padded paint="light">
            Box Header
          </Box.Header>
          <Box.Body padded>
          This is the body of box component.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Tenetur, quasi nam.
          Nisi assumenda nulla consequatur perferendis, voluptatum,
          laborum provident eos amet quos, ullam possimus facilis quasi?
          Magnam optio voluptates ipsam.
          </Box.Body>
          <Box.Footer padded>
            <AnimatedLink
              href="//google.com"
              target="_blank"
              icon="arrow-right"
            >
              Link
            </AnimatedLink>
          </Box.Footer>
        </Box>
      </Story>
    ))
    .add('BodyLight', () => (
      <Story>
        <Box>
          <Box.Header padded>
            Box Header
          </Box.Header>
          <Box.Body padded paint="light">
          This is the body of box component.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Tenetur, quasi nam.
          Nisi assumenda nulla consequatur perferendis, voluptatum,
          laborum provident eos amet quos, ullam possimus facilis quasi?
          Magnam optio voluptates ipsam.
          </Box.Body>
          <Box.Footer padded>
            <AnimatedLink
              href="//google.com"
              target="_blank"
              icon="arrow-right"
            >
              Link
            </AnimatedLink>
          </Box.Footer>
        </Box>
      </Story>
    ))
    .add('WithDivider', () => (
      <Story>
        <Box>
          <Box.Header padded>
            Box Header
          </Box.Header>
          <Box.Divider />
          <Box.Body padded>
          This is the body of box component.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Tenetur, quasi nam.
          Nisi assumenda nulla consequatur perferendis, voluptatum,
          laborum provident eos amet quos, ullam possimus facilis quasi?
          Magnam optio voluptates ipsam.
          </Box.Body>
          <Box.Footer padded>
            <AnimatedLink
              href="//google.com"
              target="_blank"
              icon="arrow-right"
            >
              Link
            </AnimatedLink>
          </Box.Footer>
        </Box>
      </Story>
    ))
    .add('NoBackground', () => (
      <Story>
        <Box paint="nobackground">
          <Box.Header padded>
            Box Header
          </Box.Header>
          <Box.Body padded>
          This is the body of box component.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Tenetur, quasi nam.
          Nisi assumenda nulla consequatur perferendis, voluptatum,
          laborum provident eos amet quos, ullam possimus facilis quasi?
          Magnam optio voluptates ipsam.
          </Box.Body>
          <Box.Footer padded>
            <AnimatedLink
              href="//google.com"
              target="_blank"
              icon="arrow-right"
            >
              Link
            </AnimatedLink>
          </Box.Footer>
        </Box>
      </Story>
    ))
    .add('TransparentBox', () => (
      <Story>
        <Box paint="transparent">
          <Box.Header padded>
            Box Header
          </Box.Header>
          <Box.Body padded>
          This is the body of box component.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Tenetur, quasi nam.
          Nisi assumenda nulla consequatur perferendis, voluptatum,
          laborum provident eos amet quos, ullam possimus facilis quasi?
          Magnam optio voluptates ipsam.
          </Box.Body>
          <Box.Footer padded>
            <AnimatedLink
              href="//google.com"
              target="_blank"
              icon="arrow-right"
            >
              Link
            </AnimatedLink>
          </Box.Footer>
        </Box>
      </Story>
    ))
    .add('BlackHeader', () => (
      <Story>
        <Box>
          <Box.Header padded paint="dark">
            Box Header
          </Box.Header>
          <Box.Body padded>
          This is the body of box component.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Tenetur, quasi nam.
          Nisi assumenda nulla consequatur perferendis, voluptatum,
          laborum provident eos amet quos, ullam possimus facilis quasi?
          Magnam optio voluptates ipsam.
          </Box.Body>
          <Box.Footer padded>
            <AnimatedLink
              href="//google.com"
              target="_blank"
              icon="arrow-right"
            >
              Link
            </AnimatedLink>
          </Box.Footer>
        </Box>
      </Story>
    ))
    .add('BlackBody', () => (
      <Story>
        <Box>
          <Box.Header padded>
            Box Header
          </Box.Header>
          <Box.Body padded paint="dark">
          This is the body of box component.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Tenetur, quasi nam.
          Nisi assumenda nulla consequatur perferendis, voluptatum,
          laborum provident eos amet quos, ullam possimus facilis quasi?
          Magnam optio voluptates ipsam.
          </Box.Body>
          <Box.Footer padded>
            <AnimatedLink
              href="//google.com"
              target="_blank"
              icon="arrow-right"
            >
              Link
            </AnimatedLink>
          </Box.Footer>
        </Box>
      </Story>
    ))
    .add('Black', () => (
      <Story>
        <Box paint="dark">
          <Box.Header padded>
            Box Header
          </Box.Header>
          <Box.Body padded>
          This is the body of box component.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Tenetur, quasi nam.
          Nisi assumenda nulla consequatur perferendis, voluptatum,
          laborum provident eos amet quos, ullam possimus facilis quasi?
          Magnam optio voluptates ipsam.
          </Box.Body>
          <Box.Footer padded>
            <AnimatedLink
              href="//google.com"
              target="_blank"
              icon="arrow-right"
            >
              Link
            </AnimatedLink>
          </Box.Footer>
        </Box>
      </Story>
    ))
    .add('Blue', () => (
      <Story>
        <Box paint="primary">
          <Box.Header padded>
            Box Header
          </Box.Header>
          <Box.Body padded>
          This is the body of box component.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Tenetur, quasi nam.
          Nisi assumenda nulla consequatur perferendis, voluptatum,
          laborum provident eos amet quos, ullam possimus facilis quasi?
          Magnam optio voluptates ipsam.
          </Box.Body>
          <Box.Footer padded>
            <AnimatedLink
              href="//google.com"
              target="_blank"
              icon="arrow-right"
            >
              Link
            </AnimatedLink>
          </Box.Footer>
        </Box>
      </Story>
    ))
    .add('Aqua', () => (
      <Story>
        <Box paint="info">
          <Box.Header padded>
            Box Header
          </Box.Header>
          <Box.Body padded>
          This is the body of box component.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Tenetur, quasi nam.
          Nisi assumenda nulla consequatur perferendis, voluptatum,
          laborum provident eos amet quos, ullam possimus facilis quasi?
          Magnam optio voluptates ipsam.
          </Box.Body>
          <Box.Footer padded>
            <AnimatedLink
              href="//google.com"
              target="_blank"
              icon="arrow-right"
            >
              Link
            </AnimatedLink>
          </Box.Footer>
        </Box>
      </Story>
    ))
    .add('GreenDivided', () => (
      <Story>
        <Box paint="success">
          <Box.Header padded>
            Box Header
          </Box.Header>
          <BoxDivider />
          <Box.Body padded>
          This is the body of box component.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Tenetur, quasi nam.
          Nisi assumenda nulla consequatur perferendis, voluptatum,
          laborum provident eos amet quos, ullam possimus facilis quasi?
          Magnam optio voluptates ipsam.
          </Box.Body>
          <Box.Footer padded>
            <AnimatedLink
              href="//google.com"
              target="_blank"
              icon="arrow-right"
            >
              Link
            </AnimatedLink>
          </Box.Footer>
        </Box>
      </Story>
    ))
    .add('YellowDivided', () => (
      <Story>
        <Box paint="warning">
          <Box.Header padded>
            Box Header
          </Box.Header>
          <BoxDivider />
          <Box.Body padded>
          This is the body of box component.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Tenetur, quasi nam.
          Nisi assumenda nulla consequatur perferendis, voluptatum,
          laborum provident eos amet quos, ullam possimus facilis quasi?
          Magnam optio voluptates ipsam.
          </Box.Body>
          <Box.Footer padded>
            <AnimatedLink
              href="//google.com"
              target="_blank"
              icon="arrow-right"
            >
              Link
            </AnimatedLink>
          </Box.Footer>
        </Box>
      </Story>
    ))
    .add('RedDivided', () => (
      <Story>
        <Box paint="danger">
          <Box.Header padded>
            Box Header
          </Box.Header>
          <BoxDivider />
          <Box.Body padded>
          This is the body of box component.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Tenetur, quasi nam.
          Nisi assumenda nulla consequatur perferendis, voluptatum,
          laborum provident eos amet quos, ullam possimus facilis quasi?
          Magnam optio voluptates ipsam.
          </Box.Body>
          <Box.Footer padded>
            <AnimatedLink
              href="//google.com"
              target="_blank"
              icon="arrow-right"
            >
              Link
            </AnimatedLink>
          </Box.Footer>
        </Box>
      </Story>
    ))
    .add('UserPage', () => (
      <Story>
        <Box image="https://picsum.photos/1280/720/?random" style={{ height: 380 }}>
          <div style={{ height: 240 }} />
          <UserBoxFooter />
        </Box>
      </Story>
    ))
    .add('componentClass', () => (
      <Story>
        <Box style={{ height: 380 }} paint="primary" componentClass={Link} href="https://vk.com">
          <div style={{ height: 240 }} />
        </Box>
      </Story>
    ))
);
