import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';
import Title from '../UI/atoms/PageTitle';
import PageTitleActions from '../UI/atoms/PageTitleActions';

@inject('page')
@observer
class PageTitle extends Component {
  render() {
    const {
      children,
      actions,
      page,
      ...props
    } = this.props;
    return (
      <Title {...props}>
        {children || get(page, 'state.meta.title')}
        {actions && (
          <PageTitleActions>
            {actions}
          </PageTitleActions>
        )}
      </Title>
    );
  }
}

export default PageTitle;
