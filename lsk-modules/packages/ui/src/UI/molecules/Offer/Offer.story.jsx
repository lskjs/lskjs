import React from 'react';
import random from 'lodash/random';

import Offer from './Offer';
import Link from '../../../Link';
import MiniUser from '../MiniUser';
import Story from '../../../Story';
import '../../../styles/lib/antd.g.css';

export default ({ storiesOf }) => (
  storiesOf('ui/Offer', module)
    .add('default', () => (
      <Story>
        <Offer>
          <Offer.Image
            src="https://vignette.wikia.nocookie.net/absurdopedia/images/b/b3/Biohazard.png/revision/latest?cb=20071218163457"
            status="completed"
          />
          <Offer.Info>
            <Offer.Title componentClass={Link} href="https://www.google.com/">
              Title
            </Offer.Title>
            <MiniUser
              user={{
                _id: random(99),
                title: 'John Smith',
                avatar: `https://randomuser.me/api/portraits/men/${random(99)}.jpg`,
              }}
            />
          </Offer.Info>
        </Offer>
        <Offer>
          <Offer.Image
            src="https://vignette.wikia.nocookie.net/absurdopedia/images/b/b3/Biohazard.png/revision/latest?cb=20071218163457"
            status="rejected"
          />
          <Offer.Info>
            <Offer.Title componentClass={Link} href="https://www.google.com/">
              Title
            </Offer.Title>
            <MiniUser
              user={{
                _id: random(99),
                title: 'John Smith',
                avatar: `https://randomuser.me/api/portraits/men/${random(99)}.jpg`,
              }}
            />
          </Offer.Info>
        </Offer>
        <Offer>
          <Offer.Image
            src="https://vignette.wikia.nocookie.net/absurdopedia/images/b/b3/Biohazard.png/revision/latest?cb=20071218163457"
            status="closed"
          />
          <Offer.Info>
            <Offer.Title componentClass={Link} href="https://www.google.com/">
              Title
            </Offer.Title>
            <MiniUser
              user={{
                _id: random(99),
                title: 'John Smith',
                avatar: `https://randomuser.me/api/portraits/men/${random(99)}.jpg`,
              }}
            />
          </Offer.Info>
        </Offer>
      </Story>
    ))
);
