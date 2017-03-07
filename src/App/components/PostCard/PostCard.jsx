import React, { Component, PropTypes } from 'react';
import { Card, CardBlock } from 'reactstrap';
import css from 'importcss';
import moment from 'moment';
import Avatar from '../Avatar';
import Link from 'lsk-general/General/Link';

function PostCard(props) {
  return (
    <Card>
      <CardBlock>
        {props.children}
      </CardBlock>
    </Card>
  );
}

PostCard.propTypes = {
  children: PropTypes.any.isRequired,
};

@css(require('./PostCard.scss'))
class Head extends Component {
  static defaultProps = {
    surname: '',
    avatar: '',
  }
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string,
    date: PropTypes.date,
    avatar: PropTypes.string,
  }
  render() {
    const { _id, name, surname, date, avatar } = this.props;
    return (
      <div styleName="card-head">
        <Avatar alt={`${name} ${surname}`} src={avatar} />
        <div styleName="card-head-info">
          <Link href={`/user/${_id}`}>{`${name} ${surname}`}</Link>
          <small>{moment(date, 'YYYYMMDD').locale('ru').fromNow()}</small>
        </div>
      </div>
    );
  }
}

PostCard.Head = Head;

export default PostCard;
