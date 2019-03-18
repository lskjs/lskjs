import React, { Component } from 'react';
import fileTypes from '../../../utils/fileTypes';
import Box from '../Box';
import { Row, Col } from '../../../Grid/index';
import Typography from '../../atoms/Typography';
import { containerStyle, typeStyle, urlStyle } from './File.styles';

class File extends Component {
  static determineType(url) {
    let [, ext] = url.match(/.+\.(\w+)\??.*$/) || [];
    const isType = Object.keys(fileTypes).includes(ext);
    if (!isType) ext = 'other';
    return ext;
  }
  shouldComponentUpdate(nextProps) {
    return this.props.url !== nextProps.url;
  }
  render() {
    const { url } = this.props;
    const type = this.constructor.determineType(url);
    const Icon = fileTypes[type];
    return (
      <Box
        componentClass="a"
        href={url}
        target="_blank"
        className={containerStyle}
      >
        <Row>
          <Col xs={3}>
            <Icon size={32} />
          </Col>
          <Col xs={9}>
            <Typography
              color="#9b9b9b"
              variant="caption"
              className={typeStyle}
            >
              {type}
            </Typography>
            <Typography className={urlStyle}>{url}</Typography>
          </Col>
        </Row>
      </Box>
    );
  }
}

export default File;
