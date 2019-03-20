import styled from '@emotion/styled';

export const Title = styled('h1')`
  line-height: 1.3;
  color: ${p => (p.theme.colors.darkGray)};
  font-weight: 200;
  -webkit-font-smoothing: antialiased;
  font-family: ${p => p.theme.fontFamily};
  font-size: 2.5rem;
  margin-bottom: 1.625rem;
`;

export const Lead = styled('p')`
  font-size: 1.25rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  letter-spacing: .3px;
  opacity: .9;
  font-family: ${p => p.theme.fontFamily};
`;

export const Muted = styled('div')`
  margin-top: .5rem;
  font-size: .75rem;
  font-family: ${p => p.theme.fontFamily};
  opacity: .7;
  font-style: italic;
`;

export const Wrapper = styled('div')`
  text-align: ${(p) => {
    switch (p.align) {
      case 'left': return 'left';
      case 'right': return 'right';
      case 'center': return 'center';
      default: return 'center';
    }
  }}
  
`;
