import React, { Component } from 'react';
import DefaultSingleValue from 'react-select/lib/components/SingleValue';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
// import PropTypes from 'prop-types';
import If from 'react-if';
import { Option, Image, Title, Icon } from './SingleValue.styles';
// import omit from 'lodash/omit';

class SingleValue extends Component {
  static sCUFields = [
    'data',
    'isDisabled',
  ]
  shouldComponentUpdate(nextProps) {
    const { props } = this;
    const { sCUFields } = this.constructor;
    const params = pick(props, sCUFields);
    const nextParams = pick(nextProps, sCUFields);
    return !isEqual(params, nextParams);
  }
  render() {
    const {
      data,
      ...props
    } = this.props;
    return (
      <DefaultSingleValue data={data} {...props}>
        <Option image={data.image}>
          <If condition={!data.iconActive}>
            <Icon icon={data.icon} style={data.iconColor ? { color: data.iconColor } : {}}>
              {data.icon}
            </Icon>
          </If>
          <If condition={data.image}>
            {typeof data.image === 'string' ? <Image src={data.image} /> : data.image}
          </If>
          <Title image={data.image}>
            {data.label}
          </Title>
        </Option>
      </DefaultSingleValue>
    );
  }
}

export default SingleValue;
