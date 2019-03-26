import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autobind from 'core-decorators/lib/autobind';
import { Scrollbars } from 'react-custom-scrollbars';
import cloneDeep from 'lodash/cloneDeep';

import Checkbox from '../Checkbox';
import Block from './CheckboxesList.styles';

class CheckboxesList extends PureComponent {
  static propTypes = {
    selected: PropTypes.array,
    onChange: PropTypes.func,
    height: PropTypes.number,
    data: PropTypes.array,
    itemComponent: PropTypes.any,
  }
  static defaultProps = {
    selected: [],
    onChange: null,
    height: 254,
    data: [],
    itemComponent: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
    };
  }
  componentWillReceiveProps(next) {
    const { selected } = this.props;
    if (selected.length !== next.selected.length) {
      this.setState({ selected: next.selected });
    }
  }
  @autobind handleSelect(id) {
    const { selected = [] } = this.state;
    const isExists = selected.includes(id);
    let arr = cloneDeep(selected);
    if (isExists) {
      arr = arr.filter(i => i !== id);
    } else {
      arr.push(id);
    }
    this.setState({ selected: arr }, this.callback);
  }
  @autobind callback() {
    const { selected } = this.state;
    const { onChange } = this.props;
    if (onChange) onChange(selected);
  }
  render() {
    const { selected } = this.state;
    const { data, height, itemComponent } = this.props;
    const Item = itemComponent || Checkbox;
    // console.log(data);
    return (
      <Block>
        <Scrollbars
          universal
          autoHide
          autoHeight
          autoHeightMax={height}
        >
          {data.map((element) => {
            const props = {
              ...(!itemComponent ? {
                ...element,
                children: element.title,
                onChange: this.handleSelect,
                checked: selected.includes(element.value || element._id),
              } : {
                item: {
                  ...element,
                  _id: element.value,
                  title: element.title,
                },
                onChange: this.handleSelect,
                checked: selected.includes(element.value || element._id),
              }),
            };
            return (
              <Item
                key={element.value || element._id}
                {...props}
              />
            );
          })}
        </Scrollbars>
      </Block>
    );
  }
}

export default CheckboxesList;
