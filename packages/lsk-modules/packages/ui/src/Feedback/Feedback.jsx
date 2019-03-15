import React, { Component } from 'react';
// import Star from '~/icons/star';
import { inject, observer } from 'mobx-react';

import Rate from 'antd/lib/rate';


import { Block, Title, Rating, FbVal, Desc } from './Feedback.styles';

@inject('t')
@observer
class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || 0,
    };
  }
  componentWillReceiveProps(next) {
    if (next.value) {
      this.setState({ value: next.value });
    }
  }
  handleChangeStar = (value) => {
    this.setState({ value }, this.callback);
  }
  callback = () => {
    const { onChange } = this.props;
    const { value } = this.state;
    if (onChange) onChange(value);
  }
  render() {
    const { value } = this.state;
    const {
      noTitle, starCount, t, message, allowHalf, disabled = true,
    } = this.props;
    return (
      <Block>
        {!noTitle && <Title>{t('conversations.bloggerFeedbackTitle')}</Title>}
        <Rating>
          <div className="table-stars">
            <Rate
              disabled={disabled}
              allowHalf={allowHalf}
              onChange={!disabled && this.handleChangeStar}
              defaultValue={value}
              count={starCount}
              // character={<Star />}
            />
          </div>
          <FbVal>
            {`${value}/${starCount}`}
          </FbVal>
        </Rating>
        {message && <Desc>«{message}»</Desc>}
      </Block>
    );
  }
}

export default Feedback;
