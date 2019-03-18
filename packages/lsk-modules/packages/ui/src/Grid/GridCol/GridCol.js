import styled from '@emotion/styled';
import { css } from 'emotion';
import removeProps from '../../utils/removeProps';

/* default */
const defaultStyle = css`
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
`;

const autoStyle = css`
  flex: 0 0 auto;
  width: auto;
  max-width: none;
`;

const size1Style = css`
  flex: 0 0 8.33333%;
  max-width: 8.33333%;
`;


const size2Style = css`
  flex: 0 0 16.66667%;
  max-width: 16.66667%;
`;

const size3Style = css`
  flex: 0 0 25%;
  max-width: 25%;
`;

const size4Style = css`
  flex: 0 0 33.33333%;
  max-width: 33.33333%;
`;

const size5Style = css`
  flex: 0 0 41.66667%;
  max-width: 41.66667%;
`;

const size6Style = css`
  flex: 0 0 50%;
  max-width: 50%;
`;

const size7Style = css`
  flex: 0 0 58.33333%;
  max-width: 58.33333%;
`;

const size8Style = css`
  flex: 0 0 66.66667%;
  max-width: 66.66667%;
`;

const size9Style = css`
  flex: 0 0 75%;
  max-width: 75%;
`;

const size10Style = css`
  flex: 0 0 83.33333%;
  max-width: 83.33333%;
`;

const size11Style = css`
  flex: 0 0 91.66667%;
  max-width: 91.66667%;
`;

const size12Style = css`
  flex: 0 0 100%;
  max-width: 100%;
`;

/* small */
const defaultSmallStyle = css`
  @media (min-width: 576px) {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
  }
`;

const autoSmallStyle = css`
  @media (min-width: 576px) {
    flex: 0 0 auto;
    width: auto;
    max-width: none;
  }
`;

const sizeSmall1Style = css`
  @media (min-width: 576px) {
    flex: 0 0 8.33333%;
    max-width: 8.33333%;
  }
`;

const sizeSmall2Style = css`
  @media (min-width: 576px) {
    flex: 0 0 16.66667%;
    max-width: 16.66667%;
  }
`;

const sizeSmall3Style = css`
  @media (min-width: 576px) {
    flex: 0 0 25%;
    max-width: 25%;
  }
`;

const sizeSmall4Style = css`
  @media (min-width: 576px) {
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
  }
`;

const sizeSmall5Style = css`
  @media (min-width: 576px) {
    flex: 0 0 41.66667%;
    max-width: 41.66667%;
  }
`;

const sizeSmall6Style = css`
  @media (min-width: 576px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
`;

const sizeSmall7Style = css`
  @media (min-width: 576px) {
    flex: 0 0 58.33333%;
    max-width: 58.33333%;
  }
`;

const sizeSmall8Style = css`
  @media (min-width: 576px) {
    flex: 0 0 66.66667%;
    max-width: 66.66667%;
  }
`;

const sizeSmall9Style = css`
  @media (min-width: 576px) {
    flex: 0 0 75%;
    max-width: 75%;
  }
`;

const sizeSmall10Style = css`
  @media (min-width: 576px) {
    flex: 0 0 83.33333%;
    max-width: 83.33333%;
  }
`;

const sizeSmall11Style = css`
  @media (min-width: 576px) {
    flex: 0 0 91.66667%;
    max-width: 91.66667%;
  }
`;

const sizeSmall12Style = css`
  @media (min-width: 576px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

/* medium */
const defaultMediumStyle = css`
  @media (min-width: 768px) {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
  }
`;

const autoMediumStyle = css`
  @media (min-width: 768px) {
    flex: 0 0 auto;
    width: auto;
    max-width: none;
  }
`;

const sizeMedium1Style = css`
  @media (min-width: 768px) {
    flex: 0 0 8.33333%;
    max-width: 8.33333%;
  }
`;

const sizeMedium2Style = css`
  @media (min-width: 768px) {
    flex: 0 0 16.66667%;
    max-width: 16.66667%;
  }
`;

const sizeMedium3Style = css`
  @media (min-width: 768px) {
    flex: 0 0 25%;
    max-width: 25%;
  }
`;

const sizeMedium4Style = css`
  @media (min-width: 768px) {
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
  }
`;

const sizeMedium5Style = css`
  @media (min-width: 768px) {
    flex: 0 0 41.66667%;
    max-width: 41.66667%;
  }
`;

const sizeMedium6Style = css`
  @media (min-width: 768px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
`;

const sizeMedium7Style = css`
  @media (min-width: 768px) {
    flex: 0 0 58.33333%;
    max-width: 58.33333%;
  }
`;

const sizeMedium8Style = css`
  @media (min-width: 768px) {
    flex: 0 0 66.66667%;
    max-width: 66.66667%;
  }
`;

const sizeMedium9Style = css`
  @media (min-width: 768px) {
    flex: 0 0 75%;
    max-width: 75%;
  }
`;

const sizeMedium10Style = css`
  @media (min-width: 768px) {
    flex: 0 0 83.33333%;
    max-width: 83.33333%;
  }
`;

const sizeMedium11Style = css`
  @media (min-width: 768px) {
    flex: 0 0 91.66667%;
    max-width: 91.66667%;
  }
`;

const sizeMedium12Style = css`
  @media (min-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;


/* large */
const defaultLargeStyle = css`
  @media (min-width: 992px) {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
  }
`;

const autoLargeStyle = css`
  @media (min-width: 992px) {
    flex: 0 0 auto;
    width: auto;
    max-width: none;
  }
`;

const sizeLarge1Style = css`
  @media (min-width: 992px) {
    flex: 0 0 8.33333%;
    max-width: 8.33333%;
  }
`;

const sizeLarge2Style = css`
  @media (min-width: 992px) {
    flex: 0 0 16.66667%;
    max-width: 16.66667%;
  }
`;

const sizeLarge3Style = css`
  @media (min-width: 992px) {
    flex: 0 0 25%;
    max-width: 25%;
  }
`;

const sizeLarge4Style = css`
  @media (min-width: 992px) {
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
  }
`;

const sizeLarge5Style = css`
  @media (min-width: 992px) {
    flex: 0 0 41.66667%;
    max-width: 41.66667%;
  }
`;

const sizeLarge6Style = css`
  @media (min-width: 992px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
`;

const sizeLarge7Style = css`
  @media (min-width: 992px) {
    flex: 0 0 58.33333%;
    max-width: 58.33333%;
  }
`;

const sizeLarge8Style = css`
  @media (min-width: 992px) {
    flex: 0 0 66.66667%;
    max-width: 66.66667%;
  }
`;

const sizeLarge9Style = css`
  @media (min-width: 992px) {
    flex: 0 0 75%;
    max-width: 75%;
  }
`;

const sizeLarge10Style = css`
  @media (min-width: 992px) {
    flex: 0 0 83.33333%;
    max-width: 83.33333%;
  }
`;

const sizeLarge11Style = css`
  @media (min-width: 992px) {
    flex: 0 0 91.66667%;
    max-width: 91.66667%;
  }
`;

const sizeLarge12Style = css`
  @media (min-width: 992px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;


/* extra large */
const defaultExtraStyle = css`
  @media (min-width: 1200px) {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
  }
`;

const autoExtraStyle = css`
  @media (min-width: 1200px) {
    flex: 0 0 auto;
    width: auto;
    max-width: none;
  }
`;

const sizeExtra1Style = css`
  @media (min-width: 1200px) {
    flex: 0 0 8.33333%;
    max-width: 8.33333%;
  }
`;
const sizeExtra2Style = css`
  @media (min-width: 1200px) {
    flex: 0 0 16.66667%;
    max-width: 16.66667%;
  }
`;
const sizeExtra3Style = css`
  @media (min-width: 1200px) {
    flex: 0 0 25%;
    max-width: 25%;
  }
`;
const sizeExtra4Style = css`
  @media (min-width: 1200px) {
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
  }
`;
const sizeExtra5Style = css`
  @media (min-width: 1200px) {
    flex: 0 0 41.66667%;
    max-width: 41.66667%;
  }
`;
const sizeExtra6Style = css`
  @media (min-width: 1200px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
`;
const sizeExtra7Style = css`
  @media (min-width: 1200px) {
    flex: 0 0 58.33333%;
    max-width: 58.33333%;
  }
`;
const sizeExtra8Style = css`
  @media (min-width: 1200px) {
    flex: 0 0 66.66667%;
    max-width: 66.66667%;
  }
`;
const sizeExtra9Style = css`
  @media (min-width: 1200px) {
    flex: 0 0 75%;
    max-width: 75%;
  }
`;
const sizeExtra10Style = css`
  @media (min-width: 1200px) {
    flex: 0 0 83.33333%;
    max-width: 83.33333%;
  }
`;
const sizeExtra11Style = css`
  @media (min-width: 1200px) {
    flex: 0 0 91.66667%;
    max-width: 91.66667%;
  }
`;
const sizeExtra12Style = css`
  @media (min-width: 1200px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

const filter = removeProps('div', ['xs', 'sm', 'md', 'lg', 'xl']);
export default styled(filter)`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  min-height: 1px;
  flex-shrink: 0;
  padding-right: ${p => p.theme.gridGap}px;
  padding-left: ${p => p.theme.gridGap}px;

  ${(p) => {
    if (p.xs && !['number', 'string'].includes(typeof p.xs)) {
      return defaultStyle;
    }
    switch (p.xs) {
      case 'auto': return autoStyle;
      case 1: return size1Style;
      case 2: return size2Style;
      case 3: return size3Style;
      case 4: return size4Style;
      case 5: return size5Style;
      case 6: return size6Style;
      case 7: return size7Style;
      case 8: return size8Style;
      case 9: return size9Style;
      case 10: return size10Style;
      case 11: return size11Style;
      case 12: return size12Style;
      default: return '';
    }
  }}

  ${(p) => {
    if (p.sm && !['number', 'string'].includes(typeof p.sm)) {
      return defaultSmallStyle;
    }
    switch (p.sm) {
      case 'auto': return autoSmallStyle;
      case 1: return sizeSmall1Style;
      case 2: return sizeSmall2Style;
      case 3: return sizeSmall3Style;
      case 4: return sizeSmall4Style;
      case 5: return sizeSmall5Style;
      case 6: return sizeSmall6Style;
      case 7: return sizeSmall7Style;
      case 8: return sizeSmall8Style;
      case 9: return sizeSmall9Style;
      case 10: return sizeSmall10Style;
      case 11: return sizeSmall11Style;
      case 12: return sizeSmall12Style;
      default: return '';
    }
  }}


  ${(p) => {
    if (p.md && !['number', 'string'].includes(typeof p.md)) {
      return defaultMediumStyle;
    }
    switch (p.md) {
      case 'auto': return autoMediumStyle;
      case 1: return sizeMedium1Style;
      case 2: return sizeMedium2Style;
      case 3: return sizeMedium3Style;
      case 4: return sizeMedium4Style;
      case 5: return sizeMedium5Style;
      case 6: return sizeMedium6Style;
      case 7: return sizeMedium7Style;
      case 8: return sizeMedium8Style;
      case 9: return sizeMedium9Style;
      case 10: return sizeMedium10Style;
      case 11: return sizeMedium11Style;
      case 12: return sizeMedium12Style;
      default: return '';
    }
  }}

  ${(p) => {
    if (p.lg && !['number', 'string'].includes(typeof p.lg)) {
      return defaultLargeStyle;
    }
    switch (p.lg) {
      case 'auto': return autoLargeStyle;
      case 1: return sizeLarge1Style;
      case 2: return sizeLarge2Style;
      case 3: return sizeLarge3Style;
      case 4: return sizeLarge4Style;
      case 5: return sizeLarge5Style;
      case 6: return sizeLarge6Style;
      case 7: return sizeLarge7Style;
      case 8: return sizeLarge8Style;
      case 9: return sizeLarge9Style;
      case 10: return sizeLarge10Style;
      case 11: return sizeLarge11Style;
      case 12: return sizeLarge12Style;
      default: return '';
    }
  }}

  ${(p) => {
    if (p.xl && !['number', 'string'].includes(typeof p.xl)) {
      return defaultExtraStyle;
    }
    switch (p.xl) {
      case 'auto': return autoExtraStyle;
      case 1: return sizeExtra1Style;
      case 2: return sizeExtra2Style;
      case 3: return sizeExtra3Style;
      case 4: return sizeExtra4Style;
      case 5: return sizeExtra5Style;
      case 6: return sizeExtra6Style;
      case 7: return sizeExtra7Style;
      case 8: return sizeExtra8Style;
      case 9: return sizeExtra9Style;
      case 10: return sizeExtra10Style;
      case 11: return sizeExtra11Style;
      case 12: return sizeExtra12Style;
      default: return '';
    }
  }}
`;
