import React, { Component, PropTypes } from 'react';
import css from 'importcss';
import moment from 'moment';
import {
  Card,
  CardBlock,
  Label,
} from 'react-bootstrap';
import { formatter } from '~/utils';
import Link from 'lsk-general/General/Link';

@css(require('./OfferCard.css'))
export default class OfferCard extends Component {
  static defaultProps = {
    type: null,
    price: null,
    linked: false,
  }
  static propTypes = {
    _id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    createdAt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    price: PropTypes.number,
    linked: PropTypes.boolean,
  }
  renderCard() {
    const { user, type, createdAt, title, info, price } = this.props;
    return (
      <Card styleName="card">
        <CardBlock>
          <section styleName="header">
            <img
              src={user.avatar}
              alt={user.fullName}
            />
            <div styleName="info">
              <h5>{user.fullName}</h5>
              <small>{moment(createdAt).locale('ru').fromNow()}</small>
            </div>
            {type && (
              <div styleName="type">
                {type}
              </div>
            )}
          </section>
          <section styleName="body">
            <h4>{title}</h4>
            <p>{info.content}</p>
          </section>
          <section styleName="footer">
            {price && <Label bsStyle="primary">{`${formatter(price)} руб.`}</Label>}
          </section>
        </CardBlock>
      </Card>
    );
  }
  render() {
    const { _id, linked } = this.props;
    if (linked) {
      return (
        <Link styleName="link" href={`/cabinet/offers/${_id}`}>
          {this.renderCard()}
        </Link>
      )
    }
    return this.renderCard();
  }
}
