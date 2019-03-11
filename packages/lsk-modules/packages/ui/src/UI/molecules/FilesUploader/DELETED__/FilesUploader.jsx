import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import autobind from 'core-decorators/lib/autobind';
import Promise from 'bluebird';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import Close from 'react-icons2/mdi/close-circle-outline';
import { toShort } from '../../../utils/formatter';

import {
  Zone,
  UploaderFilename,
  Drop,
  DropText,
  Block,
  Header,
  Info,
  Actions,
  Button,
  UploaderContent,
  UploaderFile,
  UploaderSize,
} from './FilesUploader.styles';

@inject(s => ({
  upload: s.uapp.modules.upload,
  t: s.t,
}))
@observer
class FilesUploader extends Component {
  static propTypes = {
    files: PropTypes.array,
    dropText: PropTypes.string,
    buttonText: PropTypes.string,
    placeholder: PropTypes.string,
    validationState: PropTypes.oneOf(['success', 'warning', 'error']),
    info: PropTypes.string,
    onSubmit: PropTypes.func,
    onError: PropTypes.func,
    t: PropTypes.func.isRequired,
    upload: PropTypes.object.isRequired,
    maxCount: PropTypes.number,
  }
  static defaultProps = {
    onSubmit: null,
    onError: null,
    files: [],
    info: null,
    dropText: null,
    buttonText: null,
    placeholder: null,
    validationState: null,
    maxCount: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      files: props.files || [],
      dragged: false,
    };
  }
  componentWillReceiveProps(next) {
    const { files } = this.props;
    if (files !== next.files) {
      this.setState({ files: next.files });
    }
  }
  @autobind async onDrop(inputFiles = []) {
    let files = inputFiles;
    const alreadyFiles = this.state.files;
    const {
      onSubmit, upload, onError, maxCount,
    } = this.props;

    if (maxCount && files.length > maxCount) {
      files = files.slice(0, maxCount);
    }

    if (!upload) return;
    let uploaded = null;
    try {
      const res = await Promise.map(files, file => (
        upload.uploadFile(file)
      ));
      uploaded = alreadyFiles.concat(res);
      if (onSubmit) onSubmit(uploaded);
    } catch (err) {
      if (onError) onError(err);
      else {
        console.error('FilesUploader', '!onError', onError, err); // eslint-disable-line
      }
    }
    this.setState({ files: uploaded, dragged: false });
  }
  @autobind onDragged(dragged) {
    this.setState({ dragged });
  }
  @autobind removeFile(index) {
    const { files } = this.state;
    const { onSubmit } = this.props;
    files.splice(index, 1);
    this.setState({
      files,
    }, () => {
      if (onSubmit) onSubmit(files);
    });
  }
  renderConvertedFilename({ filename, url }) {
    function renderLink(body) {
      if (!url) {
        return body;
      }
      return (
        <UploaderFilename
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {body}
        </UploaderFilename>
      );
    }
    const re = /(.+)(\.[a-zA-Z0-9]+$)/;
    if (re.test(filename)) {
      const [, name, ext] = re.exec(filename);
      return renderLink((
        <div>
          <span>{name}</span><span>{ext}</span>
        </div>
      ));
    }
    return renderLink(<span>{filename}</span>);
  }
  render() {
    const { dragged, files } = this.state;
    const {
      t,
      info,
      dropText,
      buttonText,
      validationState,
      files: __,
      upload,
      maxCount,
      ...otherProps
    } = this.props;
    return (
      <div>
        <Zone
          compnentClass={Dropzone}
          {...otherProps}
          disableClick
          ref={(e) => { this.zone = e; }}
          onDrop={this.onDrop}
          onDragEnter={() => this.onDragged(true)}
          onDragLeave={() => this.onDragged(false)}
        >
          <If condition={dragged}>
            <Drop>
              <DropText>
                {dropText || t('upload.dropFiles')}
              </DropText>
            </Drop>
          </If>
          <If condition={!dragged}>
            <Block
              validationState={validationState}
            >
              <Header>
                <Info>
                  {info || t('upload.infoFiles')}
                </Info>
                <Actions>
                  <Button
                    type="button"
                    onClick={() => this.zone.open()}
                  >
                    {buttonText || t('upload.buttonFiles')}
                  </Button>
                </Actions>
              </Header>
            </Block>
          </If>
        </Zone>
        <If condition={files}>
          <UploaderContent>
            {files.map((item, index) => (
              <UploaderFile key={index}> {/* eslint-disable-line */}
                {this.renderConvertedFilename(item)}
                <If condition={item.size}>
                  <UploaderSize>
                    {`(${toShort(item.size)}b)`}
                  </UploaderSize>
                </If>
                <span
                  aria-hidden
                  type="button"
                  onClick={() => this.removeFile(index)}
                >
                  <Close />
                </span>
              </UploaderFile>
            ))}
          </UploaderContent>
        </If>
      </div>
    );
  }
}

export default FilesUploader;
