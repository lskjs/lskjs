import styled from '@emotion/styled';

import Col from 'reactstrap/lib/Col';
import BsButton from 'antd/lib/button';

export const BsCol = styled(Col)`
  min-height: 300px;
  background-size: cover;
  background-position: center;
  @media (min-width: 768px) {
    position:absolute;
    top: 0;
    bottom: 0;
  }
  @media (max-width: 810px) {
    margin-left: 0;
  }
  background-image: url('https://picsum.photos/200');
  margin-left: 50%;
  font-family: ${p => p.theme.fontFamily};
`;

export const Content = styled('div')`
  padding: 3em 0;
  font-family: ${p => p.theme.fontFamily};
  @media (min-width: 768px) {
    padding-top: 96px;
    padding-bottom: 96px;
  }
  @media (min-width: 992px)) {
    padding-top: 128px;
    padding-bottom: 128px;
  }
  @media (min-width: 1200px) {
    padding-top: 192px;
    padding-bottom: 192px;
  }
`;

export const Title = styled('h2')`
  font-size: 24px;
  font-family: ${p => p.theme.fontFamily};
  margin-top: 0;
  @media (min-width: 768px) {
    font-size: 32px;
    font-weight: 300;
    line-height: 1.5;
    margin: 0;
  }
`;

export const ContentItem = styled('div')`
  line-height: 1.5;
  hyphens: none;
  font-family: ${p => p.theme.fontFamily};
  margin: 26px 0;
  @media (min-width: 768px) {
    line-height: 1.5;
  }
`;

export const Button = styled(BsButton)`
  height: auto;
  padding: 10px 56px;
  font-family: ${p => p.theme.fontFamily};
  text-transform: uppercase;
  letter-spacing: .5px;
  line-height: 2;
  font-size: 12px;
`;

export const FeatureCallout = styled('div')`
  position: relative;
  font-family: ${p => p.theme.fontFamily};
  background-color: ${p => (p.theme.colors.white)};
  ${Content} {
    @media (min-width: 768px) { padding-left: 32px; }
    @media (min-width: 1200px) { padding-left: 48px; }
  }
`;
