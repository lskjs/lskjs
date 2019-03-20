import React from 'react';
import Image from './Image';
import Story from '../../../Story';
import '../../../styles/lib/antd.g.css';


export default ({ storiesOf }) => (
  storiesOf('ui/Image', module)
    .add('default', () => (
      <Story>
        <Image
          src="https://avatars.mds.yandex.net/get-pdb/750514/5798b2df-9998-4381-b8be-57aaf7b65e92/s375"
        />
      </Story>
    ))
    .add('non-valid link', () => (
      <Story>
        <Image
          src="https://avatars.mds.yandex.net/get-pdb/750514/5798b2df-9998-4381-b8be-57aaf7b65e9"
        />
      </Story>
    ))
    .add('without link', () => (
      <Story>
        <Image />
      </Story>
    ))
    .add('src null', () => (
      <Story>
        <Image src={null} />
      </Story>
    ))
);
