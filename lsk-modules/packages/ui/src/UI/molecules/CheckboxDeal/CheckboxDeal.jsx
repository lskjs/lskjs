import React, { Component } from 'react';
import If from 'react-if';
import { inject, observer } from 'mobx-react';


import Checkbox from '../Checkbox';
// import Price from '../Price';


import {
  Block,
  CheckBoxWrapper,
  Title,
  PriceWrapper,
} from './CheckboxDeal.styles';


@inject('t')
@observer
class CheckboxDeal extends Component {
  render() {
    const {
      checked, onChange, item,
    } = this.props;
    return (
      <Block
        active={checked}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onChange) onChange(item._id);
        }}
      >
        <CheckBoxWrapper>
          <Checkbox
            checked={checked}
            onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
          />
        </CheckBoxWrapper>
        <Title>
          {item.title}
        </Title>
        <If condition={item.price}>
          <PriceWrapper>
            {/* <Price
              value={item.price}
              format="fullPrice"
            /> */}
          </PriceWrapper>
        </If>
      </Block>
    );
  }
}

export default CheckboxDeal;
