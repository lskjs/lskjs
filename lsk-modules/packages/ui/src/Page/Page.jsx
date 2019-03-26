import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Container from 'reactstrap/lib/Container';
// import Container from '../../atoms/PageContainer';
// import Title from '../../atoms/PageTitle';
// import Breadcrumbs from '../../atoms/PageBreadcrumbs';
import PageHeader from './PageHeader';
import PageTitle from './PageTitle';
import PageBreadcrumbs from './PageBreadcrumbs';
import PageBody from './PageBody';
import PageTabs from './PageTabs';
import PageTitleActions from '../UI/atoms/PageTitleActions';

import Block from './Page.styles';

class Page extends PureComponent {
  static Container = Container;
  static Header = PageHeader;
  static Title = PageTitle;
  static Breadcrumbs = PageBreadcrumbs;
  static TitleActions = PageTitleActions;
  static Body = PageBody;
  static Tabs = PageTabs;

  static propTypes = {
    children: PropTypes.any,
    container: PropTypes.bool,
  }
  static defaultProps = {
    children: null,
    container: false,
  }
  render() {
    const {
      children,
      container,
      ...props
    } = this.props;

    let data = children;
    if (container) {
      data = (
        <Container>
          {data}
        </Container>
      );
    }
    return (
      <Block {...props}>
        {data}
      </Block>
    );
  }
}

export default Page;
