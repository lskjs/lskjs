import styled from '@emotion/styled';
import CoverTitle from '../../atoms/CoverTitle';
import CoverSubTitle from '../../atoms/CoverSubtitle';
import CoverFooter from '../../atoms/CoverFooter';

export default styled('div')`
  ${CoverFooter} {
    color: ${p => (p.color)};
  }
  ${CoverTitle} {
    color: ${p => (p.color)};
  }
  ${CoverSubTitle} {
    color: ${p => (p.color)};
  }
`;
