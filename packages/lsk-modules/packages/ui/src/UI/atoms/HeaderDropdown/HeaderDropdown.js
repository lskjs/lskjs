import styled from '@emotion/styled'
import Menu from 'antd/lib/menu';

export default styled(Menu)`
  font-family: ${p => p.theme.fontFamily};
  .ant-dropdown-menu-item {
    i {
      margin-right: .5rem;
    }
  }
`;
