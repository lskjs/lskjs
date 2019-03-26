import React from 'react';
import If from 'react-if';
import T from '../../../T';
import Box from '../../../UI/molecules/Box';
import File from '../../../UI/molecules/File';
import { Col, Row } from '../../../Grid';

const DefaultFooter = ({ value }) => (
  <If condition={Array.isArray(value) || value}>
    <Box paint="transparent">
      <Box.Header padded>
        <T name="lskComponents.filesCount" count={Array.isArray(value) ? value.length : 1} />
      </Box.Header>
      <Box.Body padded>
        <Row vertical gap={8}>
          {(Array.isArray(value) ? value : [value]).map((e, i) => (
            <Col key={i} sm={4}> {/* eslint-disable-line react/no-array-index-key */}
              <File url={e} />
            </Col>
          ))}
        </Row>
      </Box.Body>
    </Box>
  </If>
);

export default DefaultFooter;
