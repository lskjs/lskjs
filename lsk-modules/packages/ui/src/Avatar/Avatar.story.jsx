import React from 'react';
import random from 'lodash/random';
import Avatar from './Avatar';
import Story from '../Story';


const rndNum = random(99);
const avatarImg = `https://randomuser.me/api/portraits/men/${rndNum}.jpg`;
const smallImg = 'http://placeimg.com/32/32/people';
const largeImg = 'http://placeimg.com/1920/1920/people';
const noProportionalImg = 'http://placeimg.com/640/320/people';

const user = () => ({
  id: random(99),
  title: 'John Smith',
  src: `https://randomuser.me/api/portraits/men/${random(99)}.jpg`,
});

export default ({ storiesOf, action, knob }) => {
  return storiesOf('Avatar', module)
    .add('Default as img (title,src)', () => (
      <Story>
        <Avatar
          title="John Smith"
          src={avatarImg}
        />
      </Story>
    ))
    .add('Alternative as User (name,avatar)', () => (
      <Story>
        <Avatar
          name="John Smith"
          avatar={avatarImg}
        />
      </Story>
    ))
    .add('Empty', () => (
      <Story>
        <Avatar />
      </Story>
    ))
    .add('props.backgroundColor', () => (
      <Story>
        <Avatar backgroundColor="#A7226E" title="Purple" />
        <Avatar backgroundColor="#EC2049" title="Pink" />
        <Avatar backgroundColor="#F26B38" title="Orange" />
        <Avatar backgroundColor="#F7DB4F" title="Yellow" />
        <Avatar backgroundColor="#2F9599" title="Blue" />
      </Story>
    ))
    .add('Empty avatar, colored by random  ', () => (
      <Story>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </Story>
    ))
    .add('Colored by title', () => (
      <Story>
        <p>
          Any titles:
        </p>
        <Avatar title="user 1" />
        <Avatar title="user 2" />
        <Avatar title="user 3" />
        <Avatar title="user 4" />
        <p>
          Same titles:
        </p>
        <Avatar title="user 1" />
        <Avatar title="user 2" />
        <Avatar title="user 3" />
        <Avatar title="user 4" />
      </Story>
    ))
    .add('Colored by id', () => (
      <Story>
        <p>
          Any users:
        </p>
        <Avatar title="user 1" id={1} />
        <Avatar title="user 2" id={2} />
        <Avatar title="user 3" id="user3" />
        <Avatar title="user 4" id={null} />
        <p>
          Same ids:
        </p>
        <Avatar title="name 1" id={1} />
        <Avatar title="name 2" id={1} />
        <Avatar title="name 3" id={1} />
      </Story>
    ))
    .add('No image', () => (
      <Story>
        <Avatar title="John Smith" />
        <Avatar title="John Smith" textScale={0.5} />
        <Avatar title="John Smith" textScale={2} />
        <Avatar title="John Smith" textScale={4} />
      </Story>
    ))
    .add('Size', () => (
      <Story>
        <Avatar {...user()} />
        <Avatar {...user()} size={32} />
        <Avatar {...user()} size={64} />
        <Avatar {...user()} size={100} />
        <Avatar {...user()} width={100} height={50} />
        <Avatar {...user()} width={50} height={100} />
      </Story>
    ))
    .add('Custom styles', () => (
      <Story>
        <div>
          <Avatar {...user()} style={{ margin: 10 }} />
          <Avatar {...user()} style={{ padding: 10 }} />
          <Avatar {...user()} style={{ border: '4px solid rgb(244, 67, 54)' }} />
          <Avatar {...user()} style={{ border: '4px solid rgba(128, 128, 128, 0.5)' }} />
          <Avatar {...user()} style={{ border: '4px solid rgba(128, 128, 128, 0.5)' }} src="//broken.site/img.png" />
        </div>
        <div>
          <Avatar {...user()} innerStyle={{ boxShadow: '1px 1px 10px 2px #333' }} />
          <Avatar {...user()} innerStyle={{ filter: 'grayscale(100%)' }} />
          <Avatar
            {...(
              {
                id: random(99),
                title: 'John Smith',
              }
            )}
            innerStyle={{ border: '4px solid rgb(244, 67, 54)' }}
          />
          <Avatar {...user()} innerStyle={{ border: '4px solid rgba(128, 128, 128, 0.5)' }} src="//broken.site/img.png" />
          <Avatar {...user()} innerStyle={{ border: '2px solid #4CAF50' }} />
          <Avatar {...user()} innerStyle={{ border: '4px solid #F44336' }} />
        </div>
      </Story>
    ))
    .add('Badge', () => (
      <Story>
        <Avatar {...user()}>
          <Avatar.Badge left top>
            <div style={{
 width: 10, height: 10, backgroundColor: '#4CAF50', borderRadius: '50%', border: '2px solid #fff',
}}
            />
          </Avatar.Badge>
        </Avatar>

        <Avatar title="Offline Smith">
          <Avatar.Badge right bottom>
            <div style={{
 width: 10, height: 10, backgroundColor: '#F44336', borderRadius: '50%', border: '2px solid #fff',
}}
            />
          </Avatar.Badge>
        </Avatar>

        <Avatar size={100} title="Offline Smith">
          <Avatar.Badge right bottom>
            <div style={{
 width: 10, height: 10, backgroundColor: '#F44336', borderRadius: '50%', border: '2px solid #fff',
}}
            />
          </Avatar.Badge>
        </Avatar>

        <Avatar size={200} title="Offline Smith">
          <Avatar.Badge right bottom>
            <div style={{
 width: 10, height: 10, backgroundColor: '#F44336', borderRadius: '50%', border: '2px solid #fff',
}}
            />
          </Avatar.Badge>
        </Avatar>

        <Avatar>
          <Avatar.Badge left top >
            <div style={{
 width: 10, height: 10, backgroundColor: '#4CAF50', borderRadius: '50%', border: '2px solid #fff',
}}
            />
          </Avatar.Badge>
          <Avatar.Badge right top >
            <div style={{
 width: 10, height: 10, backgroundColor: '#F44336', borderRadius: '50%', border: '2px solid #fff',
}}
            />
          </Avatar.Badge>
          <Avatar.Badge left bottom >
            <div style={{
 width: 10, height: 10, backgroundColor: '#574caf', borderRadius: '50%', border: '2px solid #fff',
}}
            />
          </Avatar.Badge>
          <Avatar.Badge right bottom >
            <div style={{
 width: 10, height: 10, backgroundColor: '#c6972f', borderRadius: '50%', border: '2px solid #fff',
}}
            />
          </Avatar.Badge>
        </Avatar>

        <Avatar>
          <div style={{
 width: 10, height: 10, backgroundColor: '#F44336', borderRadius: '50%', position: 'absolute', right: '24px', bottom: '24px', border: '2px solid #fff',
}}
          />
        </Avatar>
      </Story>
    ))
    .add('Shape', () => (
      <Story>
        <Avatar {...user()} shape="circle" />
        <Avatar {...user()} shape="square" />
        <Avatar {...user()} shape="rounded" />
      </Story>
    ))
    .add('Failed img', () => (
      <Story>
        <Avatar title="John Smith" src="/failed-img.png" />
      </Story>
    ))
    .add('No proportional', () => (
      <Story>
        <Avatar title="John Smith" src={smallImg} />
        <Avatar title="John Smith" src={largeImg} />
        <Avatar title="John Smith" src={noProportionalImg} />
        <Avatar title="John Smith" src={noProportionalImg} width={128} height={64} />
        <Avatar title="John Smith" src={noProportionalImg} shape="rounded" width={128} height={64} />
      </Story>
    ))
    .add('With tag a', () => (
      <Story>
        <a href="#"><Avatar {...user()} /></a>
      </Story>
    ))
    .add('Knobs', () => (
      <Story>
        <Avatar
          name={knob.text('Name')}
          title={knob.text('Title')}
          avatar={knob.text('Avatar')}
          src={knob.text('Src')}
          size={knob.number('Size', 64)}
          width={knob.number('Width')}
          height={knob.number('Height')}
          shape={knob.select('Shape', { cirlce: 'circle', rounded: 'rounded', square: 'square' }, 'circle')}
          border={knob.boolean('Border')}
          borderColor={knob.color('Border color')}
          borderWidth={knob.number('Border width')}
          borderPadding={knob.number('Border padding')}
          bgColor={knob.color('Background color')}
          textColor={knob.color('Text color')}
          textScale={knob.number('Text size scale')}
          shadow={knob.boolean('Shadow')}
          inactive={knob.boolean('Inactive')}
          style={knob.object('Custom styles', { padding: '10px' })}
        />
      </Story>
    ));
};
