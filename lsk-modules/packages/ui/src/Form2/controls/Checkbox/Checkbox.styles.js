import styled from '@emotion/styled';

export default styled('span')`
  ${p => (p.validationState === 'error' && `
    color: ${p.theme.colors.danger};
  `)}
`;
