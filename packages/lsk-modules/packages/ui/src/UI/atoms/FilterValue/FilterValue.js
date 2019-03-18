import styled from '@emotion/styled';

export default styled('div')`
  width: 100%;
  height: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  padding: 0 46px 0 12px;
  color: ${p => (!p.selected ? p.theme.colors.secondary : p.theme.colors.main)};
`;
