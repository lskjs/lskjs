import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import autobind from 'core-decorators/lib/autobind';
import Promise from 'bluebird';
import PropTypes from 'prop-types';
import File from 'react-icons2/mdi/file-image';
import Remove from 'react-icons2/mdi/close-circle-outline';
import Dropzone from 'react-dropzone';
import If from 'react-if';
import cx from 'classnames';
import Avatar from '../../../Avatar';
import {
  zoneStyle,
  Drop,
  DropIcon,
  DropText,
  Overlay,
  RemoveButton,
  PlaceholderFooter,
  IconFooter,
  Footer,
  Button,
  Actions,
  Info,
  Header,
  Block,
} from './ImageUploader.styles';

@inject(s => ({
  upload: s.uapp.modules.upload,
  t: s.t,
}))
@observer
class ImageUploader extends Component {
  static propTypes = {
    accept: PropTypes.string,
    value: PropTypes.any,
    dropText: PropTypes.string,
    buttonText: PropTypes.string,
    placeholder: PropTypes.string,
    validationState: PropTypes.oneOf(['success', 'warning', 'error']),
    info: PropTypes.string,
    onSubmit: PropTypes.func,
    onError: PropTypes.func,
    t: PropTypes.func.isRequired,
    upload: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['image', 'avatar']),
    id: PropTypes.string,
    title: PropTypes.string,
  }
  static defaultProps = {
    accept: 'image/jpeg, image/png',
    onSubmit: null,
    onError: null,
    value: null,
    info: null,
    dropText: null,
    buttonText: null,
    placeholder: null,
    validationState: null,
    type: 'image',
    id: null,
    title: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      dragged: false,
    };
  }
  componentWillReceiveProps(next) {
    const { value } = this.props;
    if (value !== next.value) {
      this.setState({ value: next.value });
    }
  }
  @autobind
  async onDrop(files = []) {
    const { onSubmit, upload, onError } = this.props;
    if (!upload) return;
    let value = null;
    try {
      const res = await Promise.map(files, file => (
        upload.uploadFile(file)
      ));
      value = res[0] && res[0].url;
      if (onSubmit) onSubmit(value);
    } catch (err) {
      if (onError) onError(err);
      else {
        console.error('ImageUploader.onDrop', '!onError', onError, err); // eslint-disable-line
      }
    }
    this.setState({ value, dragged: false });
  }
  @autobind
  onDragged(dragged) {
    this.setState({ dragged });
  }
  @autobind
  removeFile() {
    const { onSubmit } = this.props;
    this.setState({ value: null }, () => {
      if (onSubmit) onSubmit(null);
    });
  }
  render() {
    const { dragged, value } = this.state;
    const {
      t,
      info,
      dropText,
      buttonText,
      placeholder,
      validationState,
      accept,
      type,
      id,
      title,
      className,
      ...otherProps
    } = this.props;
    return (
      <Dropzone
        {...otherProps}
        className={cx({
          [zoneStyle]: true,
          [className]: className,
        })}
        disableClick
        accept={accept}
        multiple={false}
        ref={(e) => { this.zone = e; }}
        onDrop={this.onDrop}
        onDragEnter={() => this.onDragged(true)}
        onDragLeave={() => this.onDragged(false)}
      >
        <If condition={dragged}>
          <Drop>
            <DropText>
              {dropText || t('upload.dropImage')}
            </DropText>
            <DropIcon>
              <File />
            </DropIcon>
          </Drop>
        </If>
        <If condition={!dragged}>
          <Block
            validationState={validationState}
            type={type}
          >
            <Header>
              <Info>
                {info || t('upload.infoImage')}
              </Info>
              <Actions>
                <Button
                  type="button"
                  onClick={() => this.zone.open()}
                >
                  {buttonText || t('upload.buttonImage')}
                </Button>
              </Actions>
            </Header>
            <Footer
              style={(value && type === 'image') ? {
                backgroundImage: `url(${value})`,
              } : {}}
            >
              <If condition={!value || type === 'avatar'}>
                <IconFooter>
                  <If condition={type === 'image'}>
                    <File />
                  </If>
                  <If condition={type === 'avatar'}>
                    <Avatar size={116} src={value} title={title} id={id} />
                  </If>
                </IconFooter>
                <PlaceholderFooter>
                  {placeholder || t('upload.placeholderImage')}
                </PlaceholderFooter>
              </If>
              <If condition={type === 'image' && value}>
                <Overlay />
                <RemoveButton
                  type="button"
                  onClick={this.removeFile}
                >
                  <Remove />
                </RemoveButton>
              </If>
            </Footer>
          </Block>
        </If>
      </Dropzone>
    );
  }
}

export default ImageUploader;
