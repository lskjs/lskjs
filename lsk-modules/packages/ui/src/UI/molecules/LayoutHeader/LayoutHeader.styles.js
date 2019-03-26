import styled from '@emotion/styled';
import Layout from 'antd/lib/layout';

const { Header: AntHeader } = Layout;

export default styled(AntHeader)`
  padding: 0;
  border: 0;
  font-family: ${p => p.theme.fontFamily};
  &.ant-layout-header {
    height: 60px;
    line-height: 60px;
  }

  .app-header-inner {
    height: 60px;
  }
  
  .ant-badge { 
    sup {
      box-shadow: none;
    }
  }

  color: ${p => p.theme.colors.darkGray};
  a {
    color: ${p => p.theme.colors.darkGray};
  }
`;
