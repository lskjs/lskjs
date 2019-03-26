import React, { Component } from 'react';
import autobind from 'core-decorators/lib/autobind';
import { debounce } from 'lodash-decorators';
import { inject, observer } from 'mobx-react';
import uniq from 'lodash/uniq';
import flattenDeep from 'lodash/flattenDeep';
import Tree from 'antd/lib/tree';

const { TreeNode } = Tree;

@inject('uapp')
@observer
class TreeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || [],
    };
  }

  componentWillReceiveProps({ value }) {
    this.setState({
      value: value || [],
    });
  }

  @debounce(50)
  handleChangeDebounced() {
    // console.log('handleChangeDebounced');
    const { onChange } = this.props;
    if (onChange) onChange(this.state.value);
  }

  @autobind
  handleSetStateWithDebouncedCallback(value) {
    this.setState({ value: uniq(value) }, () => {
      this.handleChangeDebounced();
    });
  }

  @autobind
  handleCheck(value) {
    const { flat = false } = this.props;
    if (!flat) {
      value = value.filter(id => id.charAt(0) !== '@');
    }
    this.handleSetStateWithDebouncedCallback(value);
  }

  @autobind
  handleSelect(value) {
    const { flat = false, fields } = this.props;
    if (!flat) {
      const atElem = value.filter(id => id.charAt(0) === '@');
      const notAtElem = value.filter(id => id.charAt(0) !== '@');
      if (atElem.length) {
        const keys = atElem.map(e => e.split('@')[1]);
        const filtered = fields
          .filter(e => keys.includes(e.value))
          .map(item => item.children.map(child => child.value));
        const flatArr = flattenDeep(filtered);
        if (notAtElem.filter(item => flatArr.includes(item)).length) {
          value = notAtElem.filter(item => !flatArr.includes(item));
        } else {
          value = flatArr.concat(notAtElem);
        }
      } else if (notAtElem.length) {
        value = notAtElem;
      }
    }
    this.handleSetStateWithDebouncedCallback(value);
  }

  render() {
    const { fields = [], flat = false } = this.props;
    const { value } = this.state;
    return (
      <Tree
        defaultExpandAll
        multiple
        checkable
        checkedKeys={uniq(value)}
        selectedKeys={uniq(value)}
        onSelect={this.handleSelect}
        onCheck={this.handleCheck}
      >
        {
          (fields || []).map((category) => {
            return (
              <TreeNode title={category.title} key={flat ? category._id : `@${category._id}`}>
                {
                  category.children && category.children.map((game) => {
                    return (
                      <TreeNode title={game.title} key={game.value || game._id} />
                    );
                  })
                }
              </TreeNode>
            );
          })
        }
      </Tree>
    );
  }
}

export default TreeInput;
