import styled from '@emotion/styled';

export default styled('div')`
  width: 100%;
  height: 4px;
  background-image: linear-gradient(to right, rgba(75, 134, 198, 0.0), #7070ff),
                    linear-gradient(#f0f5fa, #f0f5fa);

  animation-name: notifyTime;
  animation-duration: 4s;

  @keyframes notifyTime {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }

  background: ${p => p.theme.colors.white};
  animation-duration: ${p => `${p.animationDuration}s`};
  opacity: 0.6;
  padding-top: 2px;
  position: absolute;
  border-radius: 250px 250px 50px 0;
  z-index: 1;
`;
