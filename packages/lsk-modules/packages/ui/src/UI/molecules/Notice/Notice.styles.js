import styled from '@emotion/styled'

export default styled('div')`
  min-height: 48px;
  border-radius: 3px;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 13px;

  font-family: ${p => p.theme.fontFamily};
  font-size: 11px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.83;
  letter-spacing: -0.1px;
  text-align: center;
  color: #111111;
`;
