import styled from '@emotion/styled'

export default styled('div')`
  text-transform: capitalize;
  font-family: ${p => p.theme.fontFamily};
  .ant-tag {
    float: right;
  }
`;
