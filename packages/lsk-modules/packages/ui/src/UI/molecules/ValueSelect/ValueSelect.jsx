import React, { PureComponent } from 'react';
import DefaultSingleValue from 'react-select/lib/components/SingleValue';
// import PropTypes from 'prop-types';
import If from 'react-if';
import { Option, Image, Title, Icon } from './ValueSelect.styles';
// import omit from 'lodash/omit';

class ValueSelect extends PureComponent {
  render() {
    const {
      data,
      ...props
    } = this.props;
    return (
      <DefaultSingleValue data={data} {...props}>
        <Option image={data.image}>
          <If condition={!data.iconActive}>
            <Icon icon={data.icon}>
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

export default ValueSelect;
