import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import getKeys from 'lodash/keys';
import intersection from 'lodash/intersection';
import isEqual from 'lodash/isEqual';
import autobind from 'core-decorators/lib/autobind';
import get from 'lodash/get';
import Plus from 'react-icons2/mdi/plus-circle';
import If from 'react-if';

import Tag from '../Tag';
import TagsWrapper from '../TagsWrapper';
import Add from '../../atoms/IconCircleButton';
import TreePicker from '../../organisms/TreePicker';
import Button from '../../../Button';

function getFieldsKeys(fields = []) {
  const keys = {};
  fields.forEach((field) => {
    keys[field.value] = field;
    (field.children || []).forEach((f) => {
      keys[f.value] = f;
    });
  });
  return keys;
}

function getAvailable(fields, values) {
  const availableKeys = Object.keys(getFieldsKeys(fields));
  values = !Array.isArray(values) ? [String(values)] : values;
  return intersection(availableKeys, values);
}

class TagsPicker extends PureComponent {
  static propTypes = {
    fields: PropTypes.array,
    value: PropTypes.array,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    triggerTitle: PropTypes.string,
    validationState: PropTypes.oneOf(['success', 'warning', 'error']),
    flat: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    maxLength: PropTypes.number,
  }
  static defaultProps = {
    fields: [],
    value: [],
    onSubmit: null,
    onChange: null,
    triggerTitle: 'Select',
    flat: false,
    validationState: null,
    disabled: false,
    readOnly: false,
    maxLength: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      // fields: props.fields,
      value: getAvailable(props.fields, props.value),
    };
  }
  componentWillReceiveProps(next) {
    const { fields, value } = this.props;
    const state = {};
    const currentValue = getAvailable(fields, value);
    const nextValue = getAvailable(next.fields, next.value);
    // if (fields !== next.fields) state.fields = next.fields;
    if (!isEqual(currentValue, nextValue)) state.value = nextValue;
    this.setState(state);
  }

  @autobind
  getValue() {
    const { value } = this.state;
    return !Array.isArray(value) ? [value] : value;
  }

  @autobind
  handleDeleteTag(id) {
    const { value } = this.state;
    this.setState({ value: value.filter(e => e !== id) }, this.callbackCombo);
  }

  @autobind
  callbackCombo() {
    this.callbackChange();
    this.callbackSubmit();
  }

  @autobind
  handleSubmit(value) {
    const { fields } = this.props;
    value = getAvailable(fields, value);
    this.setState({ value }, this.callbackSubmit);
  }

  @autobind
  callbackSubmit() {
    const { onSubmit } = this.props;
    const { value } = this.state;
    if (onSubmit) onSubmit(value);
  }

  @autobind
  handleChange(value) {
    const { fields } = this.props;
    value = getAvailable(fields, value);
    this.setState({ value }, this.callbackChange);
  }

  @autobind
  callbackChange() {
    const { onChange } = this.props;
    const { value } = this.state;
    if (onChange) onChange(value);
  }

  @autobind
  renderModal(trigger) {
    const {
      flat, title, onChange, fields, createTag,
    } = this.props;
    // const { fields } = this.state;
    const value = this.getValue();

    return (
      <TreePicker
        fields={fields}
        value={value}
        title={title}
        onChange={onChange && this.handleChange}
        onSubmit={this.handleSubmit}
        flat={flat}
        createTag={createTag}
      >
        {trigger}
      </TreePicker>
    );
  }
  render() {
    const {
      block, triggerTitle, fields, disabled, readOnly, validationState, maxLength,
    } = this.props;
    const value = this.getValue();
    const fieldsKeys = getFieldsKeys(fields);
    const trigger = value.length > 0
      ? <Add inverse disabled={disabled} />
      : (
        <Button
          paint={validationState !== 'error' ? 'primary' : 'danger'}
          block={block}
          iconLeft={<Plus />}
          disabled={disabled}
        >
          {triggerTitle}
        </Button>
      );
    return (
      <div>
        {/* <DEV json={fields} /> */}
        <If condition={value.length > 0}>
          <TagsWrapper>
            {(maxLength ? value.splice(0, maxLength) : value)
              .filter(item => !(!get(fieldsKeys, `${item}.title`) && __DEV__))
              .map(item => (
                <Tag
                  key={item}
                  id={item}
                  onClose={!readOnly ? () => this.handleDeleteTag(item) : null}
                  disabled={disabled}
                >
                  {get(fieldsKeys, `${item}.title`, '???')}
                </Tag>
            ))}
            <If condition={!readOnly}>
              {disabled ? trigger : this.renderModal(trigger)}
            </If>
          </TagsWrapper>
        </If>
        <If condition={!readOnly && value.length === 0}>
          {disabled ? trigger : this.renderModal(trigger)}
        </If>
      </div>
    );
  }
}

export default TagsPicker;
