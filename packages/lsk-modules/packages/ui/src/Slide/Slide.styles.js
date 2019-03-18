import styled from '@emotion/styled';
import { css } from 'emotion';

const bg = css`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
`;

const videoYoutubeStyle = css`
iframe {
    ${bg}
  }
`;

const innerStyle = css`
   z-index: 110;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

const topStyle = css`
  padding-top: 40px;
`;

const bottomStyle = css`
  padding-bottom: 40px;
`;

export const Middle = styled('div')`
  flex: 1;
  padding: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 110;
`;

export const Content = styled('div')``;

export const InnerBlock = styled('div')`${innerStyle}`;
export const InnerTable = styled('table')`${innerStyle}`;

export const TopBlock = styled('div')`${topStyle}`;
export const TopTable = styled('td')`${topStyle}`;

export const BottomBlock = styled('div')`${bottomStyle}`;
export const BottomTable = styled('td')`${bottomStyle}`;

export const SlideFrame = styled('div')`
  position: relative;
  ${props => (props.center && `
    text-align: center;
    z-index: 110;
  `)}

  ${props => (props.stretch && `
    ${Middle} {
      align-items: stretch !important;
    }
    ${Content} {
      height: 100%;
    }
  `)}

  ${props => (props.fixed && `
    ${Content} {
      ${props.theme?.mixins?.grid};
    }
  `)}

  ${props => (props.ie && `
    * {
      border: 1px transparent solid;
    }
    ${TopBlock},
    ${TopTable} {
      flex-shrink: 0;
    }
    ${BottomBlock},
    ${BottomTable} {
      flex-shrink: 0;
    }
    ${Middle} {
      flex: 1 0 auto;
    }
    ${InnerBlock},
    ${InnerTable} {
      height:100vh;
    }
  `)}
`;

export const LeftBlock = styled('div')``;
export const LeftTable = styled('td')``;
export const RightBlock = styled('div')``;
export const RightTable = styled('td')``;

export const Center = styled('div')`
  flex-grow: 1;
`;

export const Background = styled('div')`
  z-index: 100;
`;

export const NoClick = styled('div')`
  ${bg}
  z-index: 103;
`;

export const Overlay = styled('div')`
  ${bg}
  z-index: 102;
`;

export const Video = styled('div')`
  ${bg}
  z-index: 101;

  ${props => (props.youtube && videoYoutubeStyle)}
`;

export const VideoForeground = styled('div')`
  position: absolute;
  display: block;
  transform: translate3d(-50%, -50%, 0px);
  left: 50%;
  top: 50%;
  width: 1650px;
  height: 930px;
`;

export const Image = styled('div')`
  ${bg}
  z-index: 100;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const IFrameVideo = styled('iframe')`
  position: absolute;
  /*z-index: 0;*/
  width: 1888px;
  height: 1347.44px;
  top: 0px;
  left: 0px;
  overflow: hidden;
  opacity: 1;
  margin-top: -170.72px;
  margin-left: -558px;
  transition-property: opacity;
  transition-duration: 1000ms;
`;

/*

.Slide__bg-video {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -2;
  top: 0;
  left: 0;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.Slide__bg-video-inner {
  width: 100%;
  height: 100%;

  background-attachment: scroll;
  background-position: 50% 0;
  background-repeat: no-repeat;
  background-size: cover;
}

*/
