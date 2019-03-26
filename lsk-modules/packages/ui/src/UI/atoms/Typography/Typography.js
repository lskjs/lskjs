import styled from '@emotion/styled';
import { css } from '@emotion/core';

const title = css`
  font-size: 16px;
  line-height: 1.6em;
  font-weight: 500;
`;

const h4Style = css`
  font-size: 21px;
  line-height: 1.6em;
  font-weight: 400;
`;

const bodyStyle = css`
  font-size: 1rem;
  opacity: .8;
  text-align: left;
`;

const descriptionStyle = css`
  font-size: 14px;
  opacity: .8;
  text-align: left;
`;

const defaultStyle = css`
  font-size: 14px;
`;

const h2Style = css`
  position: relative;
  font-size: 2rem;
  font-weight: 200;
  color: black;
`;

const smallStyle = css`
  font-size: 12px;
`;


export default styled('div')`
  font-family: ${p => p.theme.fontFamily};
  text-align: ${p => (p.align || 'left')};
  color: ${p => (p.color || p.theme.colors.main)};
  white-space: ${p => (p.wrap || 'initial')};
  ${p => (p.wrap === 'nowrap' && css`
    text-overflow: ellipsis;
    overflow: hidden;
  `)}
  ${p => (p.paragraph && css`
    margin-bottom: .6em;
  `)}
  ${p => (p.noWrap)}
  ${(p) => {
    switch (p.variant) {
      case 'title': return title;
      case 'h4': return h4Style;
      case 'body': return bodyStyle;
      case 'description': return descriptionStyle;
      case 'h2': return h2Style;
      case 'small': return smallStyle;
      default: return defaultStyle;
    }
  }}
`;
