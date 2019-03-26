import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import If from 'react-if';
import Box from '../Box';
import Title from '../../atoms/DefaultCardTitle';
import Position from '../../atoms/DefaultCardPosition';
import Rating from '../../atoms/DefaultCardRating';

class DefaultCard extends PureComponent {
  static propTypes = {
    user: PropTypes.any,
  };
  static defaultProps = {
    user: PropTypes.any,
  };
  render() {
    const { user } = this.props;
    return (
      <Box paint="light" padded>
        <If condition={user.title}>
          <Title>{user.title}</Title>
        </If>
        <If condition={user.position}>
          <Position>{user.position}</Position>
        </If>
        <If condition={user.rating}>
          <Rating>{user.rating}</Rating>
        </If>
      </Box>
    );
  }
}
export default DefaultCard;
