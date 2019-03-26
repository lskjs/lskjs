import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import autobind from 'core-decorators/lib/autobind';
import Promise from 'bluebird';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import cx from 'classnames';
import zoneStyle from './Files.styles';

@inject(s => ({
  upload: s.uapp.modules.upload,
}))
@observer
class Files extends Component {
  static propTypes = {
    value: PropTypes.any,
    dropText: PropTypes.string,
    buttonText: PropTypes.string,
    placeholder: PropTypes.string,
    validationState: PropTypes.oneOf(['success', 'warning', 'error']),
    info: PropTypes.string,
    onSubmit: PropTypes.func,
    onError: PropTypes.func,
    upload: PropTypes.object.isRequired,
    id: PropTypes.string,
    title: PropTypes.string,
    multiple: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.func,
    footer: PropTypes.func,
    type: PropTypes.string,
  }
  static defaultProps = {
    className: null,
    multiple: false,
    onSubmit: null,
    onError: null,
    value: null,
    info: null,
    dropText: null,
    buttonText: null,
    placeholder: null,
    validationState: null,
    id: null,
    title: null,
    children: null,
    footer: null,
    type: undefined,
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      dragged: false,
    };
    this.zone = React.createRef();
  }
  componentWillReceiveProps(next) {
    const { value } = this.props;
    if (value !== next.value) {
      this.setState({ value: next.value });
    }
  }
  @autobind
  async onDrop(files = []) {
    const {
      onSubmit,
      upload,
      onError,
      multiple,
    } = this.props;
    if (!upload) return;
    let value = null;
    try {
      const res = await Promise.map(files, file => (
        upload.uploadFile(file)
      ));
      if (multiple) value = res.map(e => e.url);
      else value = res[0] && res[0].url;
      if (onSubmit) onSubmit(value);
    } catch (err) {
      if (onError) onError(err);
      else {
        console.error('Files.onDrop', '!onError', onError, err); // eslint-disable-line
      }
    }
    this.setState({ value, dragged: false });
  }
  @autobind
  onDragged(dragged) {
    this.setState({ dragged });
  }
  @autobind
  removeFiles() {
    const { onSubmit } = this.props;
    this.setState({ value: null }, () => {
      if (onSubmit) onSubmit(null);
    });
  }
  render() {
    const { dragged, value } = this.state;
    const {
      info,
      dropText,
      buttonText,
      validationState,
      multiple,
      className,
      children,
      footer,
      type,
      id,
      title,
      ...otherProps
    } = this.props;
    const childrenProps = {
      validationState,
      refZone: this.zone,
      dragged,
      value,
      info,
      buttonText,
      onRemoveFiles: this.removeFiles,
      dropText,
      multiple,
      type,
      avatar: {
        id,
        title,
      },
    };
    return (
      <React.Fragment>
        <Dropzone
          {...otherProps}
          className={cx({
            [zoneStyle]: true,
            [className]: className,
          })}
          disableClick
          multiple={multiple}
          ref={this.zone}
          onDrop={this.onDrop}
          onDragEnter={() => this.onDragged(true)}
          onDragLeave={() => this.onDragged(false)}
        >
          {children?.(childrenProps)}
        </Dropzone>
        {footer?.(childrenProps)}
      </React.Fragment>
    );
  }
}

export default Files;
