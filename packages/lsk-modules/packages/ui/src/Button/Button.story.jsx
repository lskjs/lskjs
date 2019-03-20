import React from 'react';
import Plus from 'react-icons2/mdi/plus';
import Facebook from 'react-icons2/mdi/facebook-box';
import Twitter from 'react-icons2/mdi/twitter-circle';
import Vk from 'react-icons2/mdi/vk';
import Youtube from 'react-icons2/mdi/youtube';
import Telegram from 'react-icons2/mdi/telegram';

import { Badge, Icon } from 'antd';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Story from '../Story';
import Link from '../Link';
import socialColors from '../utils/socialColors';
import withResponsive from './withResponsive';

const ResponsiveButton = withResponsive(Button);

export default ({ storiesOf }) => {
  storiesOf('Button', module)
    .add('default', () => (
      <React.Fragment>
        <Button
          componentClass={Link}
          href="/cabinet"
        >
          Link
        </Button>
      </React.Fragment>
    ))
    .add('paint', () => (
      <React.Fragment>
        <Button>Default</Button>
        <Button paint="primary">Primary</Button>
        <Button paint="info">Info</Button>
        <Button paint="success">Success</Button>
        <Button paint="warning">Warning</Button>
        <Button paint="danger">Danger</Button>
      </React.Fragment>
    ))
    .add('size', () => (
      <Story>
        <Button paint="primary">default</Button>
        <Button paint="primary" size="small">small</Button>
        <Button paint="primary" size="large">large</Button>
      </Story>
    ))
    .add('small', () => (
      <Story>
        <Button paint="primary" size="small">Primary</Button>
        <Button paint="danger" size="small">Danger</Button>
        <Button paint="info" size="small">Info</Button>
        <Button paint="success" size="small">Success</Button>
        <Button paint="warning" size="small">Warning</Button>
        <br />
        <Button paint="primary" size="small">Laaaaaaaaaaaaaaaaaarge text</Button>
        <br />
        <Button iconLeft={<Facebook />} paint="primary" size="small">small</Button>
        <br />
        <Button iconRight={<Twitter />} paint="primary" size="small">small</Button>
        <br />
        <Button icon={<Telegram />} paint="primary" size="small" />
        <br />
        <Button iconLeft={<Facebook />} iconRight={<Twitter />} paint="primary" size="small">small</Button>
      </Story>
    ))
    .add('props', () => (
      <Story>
        <Button paint="primary" >Default</Button>
        <Button paint="primary" view="transparent" >view=transparent</Button>
        <Button paint="primary" view="text" >view=text</Button>
        <Button paint="primary" block >block</Button>
        <Button paint="primary" disabled >disabled</Button>
        <hr />
        <Button paint="danger" >Default</Button>
        <Button paint="danger" view="transparent" >view=transparent</Button>
        <Button paint="danger" view="text" >view=text</Button>
        <Button paint="danger" block >block</Button>
        <Button paint="danger" disabled >disabled</Button>
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
          colors={socialColors.youtube}
          size="large"
          block
        >
          Youtube
        </Button>
        <Button
          colors={socialColors.facebook}
          size="large"
          block
        >
          Facebook
        </Button>
        <Button
          colors={socialColors.twitter}
          size="large"
          block
        >
          Twitter
        </Button>
        <Button
          colors={socialColors.vk}
          size="large"
          block
        >
          VK
        </Button>
        <Button
          colors={socialColors.telegram}
          size="large"
          block
        >
          Telegram
        </Button>
        <ButtonGroup padded>
          <Button icon={<Facebook />} colors={socialColors.facebook} />
          <Button icon={<Twitter />} colors={socialColors.twitter} />
          <Button icon={<Vk />} colors={socialColors.vk} />
          <Button icon={<Telegram />} colors={socialColors.telegram} />
          <Button icon={<Youtube />} colors={socialColors.youtube} />
        </ButtonGroup>
      </Story>
    ))
    .add('badge', () => (
      <Story>
        <Badge count={5}>
          <Button paint="primary">Default</Button>
        </Badge>
        <br />
        <br />
        <Badge count={0} showZero>
          <Button paint="primary">Default</Button>
        </Badge>
        <br />
        <br />
        <Badge count={<Icon type="clock-circle" style={{ color: '#f5222d' }} />}>
          <Button paint="primary">Default</Button>
        </Badge>
        <br />
        <br />
        <Badge count={1000} overflowCount={999}>
          <Button paint="primary">Default</Button>
        </Badge>
        <br />
        <br />
        <Badge count={109} style={{ backgroundColor: '#52c41a' }}>
          <Button paint="primary">Default</Button>
        </Badge>
      </Story>
    ))
    .add('dot badge', () => (
      <Story>
        <Badge dot>
          <Button paint="primary">Default</Button>
        </Badge>
      </Story>
    ))
    .add('badge with title', () => (
      <Story>
        <Badge count={5} title="Custom hover text">
          <Button paint="primary">Default</Button>
        </Badge>
        <Badge status="processing" count={5} title="Custom hover text">
          <Button paint="primary">Default</Button>
        </Badge>
      </Story>
    ))
    .add('ButtonGroup', () => (
      <Story>
        <ButtonGroup block>
          <Button>Default</Button>
          <Button paint="primary">Primary</Button>
          <Button paint="info">Info</Button>
          <Button paint="success">Success</Button>
          <Button paint="warning">Warning</Button>
          <Button paint="danger">Danger</Button>
        </ButtonGroup>
      </Story>
    ))
    .add('withResponsive', () => (
      <Story>
        <ResponsiveButton
          paint="primary"
          size="small"
          icon={<Plus />}
        >
          Responsive
        </ResponsiveButton>
      </Story>
    ))
    .add('badge status', () => (
      <Story>
        <Badge status="success" />
        <Badge status="error" />
        <Badge status="default" />
        <Badge status="processing" />
        <Badge status="warning" />
      </Story>
    ))
    .add('without ripple', () => (
      <Story>
        <Button isRipple={false} paint="primary">Primary</Button>
      </Story>
    ))
    .add('button group', () => (
      <Story>
        <ButtonGroup>
          <Button isRipple={false} paint="primary">Primary</Button>
          <Button isRipple={false} paint="primary">Primary</Button>
        </ButtonGroup>
      </Story>
    ))
    .add('button group panel', () => (
      <Story>
        <ButtonGroup panel>
          <Button paint="primary">Primary</Button>
          <Button paint="danger">Danger</Button>
          <Button paint="primary">Primary</Button>
        </ButtonGroup>
      </Story>
    ))
    .add('button group block', () => (
      <Story>
        <ButtonGroup block>
          <Button paint="primary">Primary</Button>
          <Button paint="primary">Primary</Button>
          <Button paint="primary">Primary</Button>
        </ButtonGroup>
      </Story>
    ))
    .add('button group circle', () => (
      <Story>
        <ButtonGroup>
          <Button icon={<Telegram />} paint="primary" />
          <Button icon={<Facebook />} paint="primary" />
          <Button icon={<Vk />} paint="primary" />
        </ButtonGroup>
      </Story>
    ))
    .add('button group wrapper', () => (
      <Story>
        <ButtonGroup panel>
          <Button paint="primary">Primary</Button>
          <div>
            <Button paint="danger">Danger</Button>
          </div>
          <Button paint="primary">Primary</Button>
        </ButtonGroup>
      </Story>
    ));
};
