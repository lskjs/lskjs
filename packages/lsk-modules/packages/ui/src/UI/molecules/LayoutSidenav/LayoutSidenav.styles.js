import styled from '@emotion/styled'
import Layout from 'antd/lib/layout';
import LayoutSidenavFooter from '../../atoms/LayoutSidenavFooter';
import LayoutSidenavBrand from '../../atoms/LayoutSidenavBrand';
import LayoutSidenavHeader from '../../atoms/LayoutSidenavHeader';

const { Sider: AntSider } = Layout;

export default styled(AntSider)`
  display: flex;
  flex-direction: column;
  font-family: ${p => p.theme.fontFamily};
  display: none;
  background-color: ${p => p.theme.colors.white};
  
  @media screen and (min-width: 768px) {
    display: flex !important;
  }

  + .ant-layout {
    transition: all .2s;
  }

  > .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }

  .ant-menu-inline,
  .ant-menu-vertical,
  .ant-menu-vertical-left {
    border-right: 0;
  }

  .ant-menu-inline .ant-menu-item,
  .ant-menu-inline .ant-menu-submenu-title {
    width: 100%;
  }
  
  &.ant-layout-sider-collapsed {
    ${LayoutSidenavHeader} {
      padding-left: 27.5px;
    }
  
    ${LayoutSidenavBrand} {
      display: none;
    }
  
    .nav-badge {
      display: none;
    }
  
    ${LayoutSidenavFooter} {
      > a {
        padding-left: 32px;
      }
      .nav-text {
        display: none;
      }
    }
  }
`;
