import React, { Component } from 'react';
import PropTypes from 'prop-types';
import If from 'react-if';
import Tabs from 'antd/lib/tabs';
import Icon from 'antd/lib/icon';
import Wrapper from './LayoutHeaderNotificationsContent.styles';

class LayoutHeaderNotificationsContent extends Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      icon: PropTypes.string,
      title: PropTypes.string.isRequired,
      content: PropTypes.any.isRequired,
    })).isRequired,
  }
  render() {
    const { tabs } = this.props;
    return (
      <Wrapper>
        <Tabs animated={false}>
          {tabs.map(tab => (
            <Tabs.TabPane
              tab={(
                <span>
                  <If condition={tab.icon}>
                    <Icon type={tab.icon} />
                  </If>
                  {tab.title}
                </span>
              )}
              key={tab.key}
            >
              {tab.content}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Wrapper>
    );
  }
}

export default LayoutHeaderNotificationsContent;
