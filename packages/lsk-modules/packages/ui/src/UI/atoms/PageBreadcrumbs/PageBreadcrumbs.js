import styled from '@emotion/styled'

export default styled('div')`
  font-family: ${p => p.theme.fontFamily};
  font-size: 14px;
  line-height: 1.2;
  letter-spacing: -0.1px;
  text-align: left;
  color: ${p => p.theme.colors.main};
  min-height: auto;
  margin: 4px 0 16px;
  display: flex;
  width: 100%;
  position: relative;
  word-break: break-word;
`;
