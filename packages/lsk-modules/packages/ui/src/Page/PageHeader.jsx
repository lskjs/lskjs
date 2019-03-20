import React, { PureComponent } from 'react';
import PageTitle from './PageTitle';
import PageBreadcrumbs from './PageBreadcrumbs';
import PageTabs from './PageTabs';

class PageHeader extends PureComponent {
  render() {
    const {
      children,
      actions,
      tabs,
      tab,
      onChangeTab,
      ...props
    } = this.props;
    return (
      <div {...props}>
        {children || (
          <React.Fragment>
            <PageTitle actions={actions} />
            <PageBreadcrumbs />
            {tabs && <PageTabs tab={tab} tabs={tabs} onClick={onChangeTab} />}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default PageHeader;
