import styled from '@emotion/styled'

export const Card = styled('div')`
  display: flex;
  min-height: 120px;
  padding: 1rem;
  background-color: ${p => (p.theme.colors.white)};
  border-radius: ${p => p.theme.borderRadius};
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: ${p => p.theme.fontFamily};
`;

export const IconButton = styled('span')`
  margin: 0 1rem 0 0;
  font-size: 1rem;
  padding: 0;
  display: inline-block;
  text-align: center;
  border-radius: ${p => p.theme.borderCircle};
  height: 65px;
  width: 65px;
  font-size: 28px;
  line-height: 65px;
  i { line-height: 65px; }
  &.icon-btn-lined {
    line-height: (61px);
    i { line-height: (61px); }

    &.icon-btn-thin {
      line-height: (63px);
      i { line-height: (63px); }
    }
  }
  background-color: #66bb6a;
  color: ${p => (p.theme.colors.white)};
`;

export const BoxNum = styled('p')`
  font-size: 1.6rem;
  line-height: 1;
  font-family: ${p => p.theme.fontFamily};
  margin: 0 0 .25rem;
`;

export const TextMuted = styled('p')`
  color: ${p => (p.theme.colors.gray600)};
  font-family: ${p => p.theme.fontFamily};
`;
