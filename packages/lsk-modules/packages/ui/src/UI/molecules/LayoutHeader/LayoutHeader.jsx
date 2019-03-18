import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'core-decorators/lib/autobind';
import If from 'react-if';
// import Divider from 'antd/lib/divider';
import Icon from 'antd/lib/icon';
import LayoutHeaderInner from '../../atoms/LayoutHeaderInner';
import LayoutHeaderLeft from '../../atoms/LayoutHeaderLeft';
import LayoutHeaderRight from '../../atoms/LayoutHeaderRight';
import LayoutHeaderList from '../../atoms/LayoutHeaderList';
import LayoutHeaderListItem from '../../atoms/LayoutHeaderListItem';
import Header from './LayoutHeader.styles';

class LayoutHeader extends Component {
  static propTypes = {
    logo: PropTypes.any,
    pullLeft: PropTypes.any,
    pullRight: PropTypes.any,
    collapsed: PropTypes.bool,
    mobileHidden: PropTypes.bool,
    onCollapsed: PropTypes.func,
    onCloseMobile: PropTypes.func,
    noMenu: PropTypes.bool,
  }
  static defaultProps = {
    logo: null,
    pullLeft: null,
    pullRight: null,
    collapsed: false,
    mobileHidden: false,
    onCollapsed: null,
    onCloseMobile: null,
    noMenu: false,
  }
  @autobind
  onToggleCollapsed() {
    const { onCollapsed, collapsed } = this.props;
    if (onCollapsed) onCollapsed(!collapsed);
  }
  @autobind
  onToggleHiddenMobile() {
    const { onCloseMobile, mobileHidden } = this.props;
    if (onCloseMobile) onCloseMobile(!mobileHidden);
  }
  render() {
    const {
      collapsed,
      mobileHidden,
      logo,
      pullLeft,
      pullRight,
      noMenu,
    } = this.props;
    return (
      <Header>
        <LayoutHeaderInner>
          <LayoutHeaderLeft>
            <LayoutHeaderList>
              <If condition={logo}>
                {logo}
                {/* <Divider type="vertical" key="line" /> */}
              </If>
              <If condition={!noMenu}>
                <LayoutHeaderListItem
                  componentClass="button"
                  onClick={this.onToggleCollapsed}
                  className="d-none d-md-inline-block"
                >
                  <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                </LayoutHeaderListItem>
                <LayoutHeaderListItem
                  componentClass="button"
                  className="d-md-none"
                  onClick={this.onToggleHiddenMobile}
                >
                  <Icon type={mobileHidden ? 'menu-unfold' : 'menu-fold'} />
                </LayoutHeaderListItem>
              </If>
              {pullLeft}
            </LayoutHeaderList>
          </LayoutHeaderLeft>
          <If condition={pullRight}>
            <LayoutHeaderRight>
              <LayoutHeaderList>
                {pullRight}
              </LayoutHeaderList>
            </LayoutHeaderRight>
          </If>
        </LayoutHeaderInner>
      </Header>
    );
  }
}

export default LayoutHeader;
