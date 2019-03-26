import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'antd/lib/dropdown';
import FlagIcon from '../../organisms/FlagIcon';
import LayoutHeaderListItem from '../../atoms/LayoutHeaderListItem';
import DropdownLink from './LayoutHeaderChangeLocale.styles';

class LayoutHeaderChangeLocale extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
  }
  render() {
    const { code, children } = this.props;
    return (
      <LayoutHeaderListItem
        componentClass={Dropdown}
        overlay={children}
        trigger={['click']}
        placement="bottomRight"
      >
        <DropdownLink href="#!">
          <div style={{
            display: 'inline-block',
            position: 'relative',
          }}
          >
            <FlagIcon code={code} />
          </div>
        </DropdownLink>
      </LayoutHeaderListItem>
    );
  }
}

export default LayoutHeaderChangeLocale;
