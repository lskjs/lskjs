import { css } from 'emotion';
import facepaint from 'facepaint';

const breakpoints = [768, 992, 1200];
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`));

export default css(mq({
  marginRight: 'auto',
  marginLeft: 'auto',
  width: ['750px', '970px', '1170px'],
}));
