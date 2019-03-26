import React from 'react';
import Story from '../Story';
import { Row, Col } from '../Grid';

import ScaleRippleMulti from './ScaleRippleMulti';
import ScaleRipple from './ScaleRipple';
import LineSpin from './LineSpin';
import LineScaleRandom from './LineScaleRandom';
import LineScale from './LineScale';
import LinePulseOut from './LinePulseOut';
import BallsZigZagDeflect from './BallsZigZagDeflect';
import BallsZigZag from './BallsZigZag';
import BallsTriangleTrace from './BallsTriangleTrace';
import BallSpin from './BallSpin';
import BallScaleRandom from './BallScaleRandom';
import BallScaleMulti from './BallScaleMulti';
import BallScale from './BallScale';
import BallRotate from './BallRotate';
import BallPulseSync from './BallPulseSync';
import BallPulseRise from './BallPulseRise';
import BallPulse from './BallPulse';
import BallGridPulse from './BallGridPulse';
import BallClipRotatePulse from './BallClipRotatePulse';
import BallClipRotateMultiple from './BallClipRotateMultiple';
import BallClipRotate from './BallClipRotate';
import BallBeat from './BallBeat';

const styles = {
  display: 'flex',
  flex: '0 1 auto',
  flexDirection: 'column',
  flexGrow: 1,
  flexShrink: 0,
  height: 200,
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px black dotted',
};
const Box = ({ children }) => <div style={styles}>{children}</div>;
const Name = 'div';
const color = '#1890ff';

export default ({ storiesOf }) => (
  storiesOf('Loaders', module)
    .add('default', () => (
      <Story>
        <Row>
          <Col md={2}>
            <Box>
              <LineSpin color={color} />
            </Box>
            <Name>
              {'<LineSpin />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <ScaleRipple color={color} type="rapid" />
            </Box>
            <Name>
              {'<ScaleRipple type="rapid" />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <ScaleRippleMulti color={color} />
            </Box>
            <Name>
              {'<ScaleRippleMulti />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <LineScaleRandom color={color} />
            </Box>
            <Name>
              {'<LineScaleRandom />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <LineScale color={color} />
            </Box>
            <Name>
              {'<LineScale />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <LinePulseOut color={color} type="default" />
            </Box>
            <Name>
              {'<LinePulseOut type="default" />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <LinePulseOut color={color} type="rapid" />
            </Box>
            <Name>
              {'<LinePulseOut type="rapid" />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <BallsZigZagDeflect color={color} />
            </Box>
            <Name>
              {'<BallsZigZagDeflect />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <BallsZigZag color={color} />
            </Box>
            <Name>
              {'<BallsZigZag />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <BallsTriangleTrace color={color} />
            </Box>
            <Name>
              {'<BallsTriangleTrace />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <BallSpin color={color} />
            </Box>
            <Name>
              {'<BallSpin />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <BallScaleRandom color={color} />
            </Box>
            <Name>
              {'<BallScaleRandom />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <BallScaleMulti color={color} />
            </Box>
            <Name>
              {'<BallScaleMulti />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <BallScale color={color} />
            </Box>
            <Name>
              {'<BallScale />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <BallRotate color={color} />
            </Box>
            <Name>
              {'<BallRotate />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <BallPulseSync color={color} />
            </Box>
            <Name>
              {'<BallPulseSync />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <BallPulseRise color={color} />
            </Box>
            <Name>
              {'<BallPulseRise />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <BallPulse color={color} />
            </Box>
            <Name>
              {'<BallPulse />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <BallGridPulse color={color} />
            </Box>
            <Name>
              {'<BallGridPulse />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <BallGridPulse color={color} type="beat" />
            </Box>
            <Name>
              {'<BallGridPulse type="beat" />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <BallClipRotatePulse color={color} />
            </Box>
            <Name>
              {'<BallClipRotatePulse />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <BallClipRotateMultiple color={color} />
            </Box>
            <Name>
              {'<BallClipRotateMultiple />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <BallClipRotate color={color} />
            </Box>
            <Name>
              {'<BallClipRotate />'}
            </Name>
          </Col>
          <Col md={2}>
            <Box>
              <BallBeat color={color} />
            </Box>
            <Name>
              {'<BallBeat />'}
            </Name>
          </Col>
        </Row>
      </Story>
    ))
);
