import React, { Component } from 'react';
import autobind from 'core-decorators/lib/autobind';
import { debounce } from 'lodash-decorators';
import { inject, observer } from 'mobx-react';
import uniq from 'lodash/uniq';
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
  handleChange(value) {
    const { flat = false } = this.props;
    // чистим от категорий игр
    if (!flat) {
      value = value.filter(id => id.charAt(0) !== '@');
    }
    value = uniq(value);

    // console.log('handleChange');
    this.setState({ value }, () => {
      this.handleChangeDebounced();
    });
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
        onSelect={this.handleChange}
        onCheck={this.handleChange}
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
