import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'core-decorators/lib/autobind';
import importcss from 'importcss';
import cx from 'classnames';
import validate from 'validate.js';
import find from 'lodash/find';
import set from 'lodash/set';
import get from 'lodash/get';
import isPlainObject from 'lodash/isPlainObject';
import map from 'lodash/map';
import Component from '../Component';


export default class FormBase extends Component {
  static validate = validate;
  static defaultProps = {
    defaultValue: null,
    value: null,
    errors: null,
    fields: [],
    validators: {},
    onError: null,
    onSubmit: null,
    onChange: null,
    cacheFields: false,
  };
  static propTypes = {
    defaultValue: PropTypes.object,
    value: PropTypes.object,
    errors: PropTypes.object,
    fields: PropTypes.array,
    validators: PropTypes.object,
    onSubmit: PropTypes.func,
    onError: PropTypes.func,
    onChange: PropTypes.func,
    horizontal: PropTypes.bool,
    cacheFields: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: this.processStateData(props, 1),
      errors: {},
      // errors: props.errors || {}, // @TODO хз зачем
    };
  }

  // TODO: производительность
  _getFields() {
    const { cacheFields } = this.props;
    if (cacheFields) {
      if (this.fields) return this.fields.filter(field => field.show !== false);
    }
    let fields = [];
    if (this.getFields) {
      fields = this.getFields();
    } else if (this.props.fields != null) {
      fields = this.props.fields;
    }

    if (isPlainObject(fields)) {
      fields = map(fields, (field, name) => {
        return {
          ...field,
          name: field.name || name,
        };
      });
    }

    this.fields = fields;
    return fields.filter(field => field.show !== false);
  }

  processStateData(props, isConstructor) {
    // console.log('processStateData', isConstructor, this._getFields());
    const { fields } = props;
    const propsData = props.data || props.state || props.value;

    let data;
    if (isConstructor) {
      data = props.defaultValue || propsData;

      this._getFields().forEach((field) => {
        if (typeof get(data, field.name) === 'undefined' && typeof field.defaultValue !== 'undefined') {
          set(data, field.name, field.defaultValue);
        }
      });
    } else {
      data = propsData;
      if (!data) {
        data = this.state.data;
      }
    }
    if (!data) {
      data = {};
      this._getFields().forEach((field) => {
        set(data, field.name, field.value);
      });
    }
    // this._getFields().forEach((field) => {
    //   console.log('field.value'), field.value;
    //   set(data, field.name, field.value);
    //   // console.log('defaultValue@@@@@', field, get(data, field.name), typeof field.defaultValue !== 'undefined', typeof field.defaultValue, field.defaultValue);
    //   // // console.log();
    //   // if (!get(data, field.name) && typeof field.defaultValue !== 'undefined') {
    //   //   set(data, field.name, field.defaultValue);
    //   // }
    // });
    // console.log('processStateData', isConstructor, data);
    return data;
  }

  reset(isConstructor) {
    this.setState({
      data: this.processStateData(this.props, isConstructor),
      errors: {},
    });
  }
  componentWillReceiveProps(props) {
    this.setState({
      data: this.processStateData(props),
      errors: {},
    });
  }


  getField(name) {
    return find(this._getFields(), { name });
  }

  getError(name) {
    const { errors } = this.state;
    return errors && errors[name] || {};
  }

  @autobind
  getData() {
    return this.state.data;
  }

  getValidators() {
    const { validators, t } = this.props;
    this._getFields().forEach((field) => {
      // if (!field.validator) return ;
      validators[field.name] = field.validator || {};
      // console.log('field.required', field.required);
      if (field.required) {
        if (!validators[field.name].presence) {
          validators[field.name].presence = {
            allowEmpty: false,
            message: t ? t('form.presence') : 'form.presence',
          };
        }
      }
    });

    // console.log({validators}, this.state.data, t);
    return validators;
  }

  async getValidatorResults() {
    return this.constructor.validate.async(this.state.data, this.getValidators());
  }

  async validate() {
    try {
      // const results =
      await this.getValidatorResults();
      // console.log('validate', { results });
      return true;
    } catch (err) {
      // console.log('validate err', { err });
      const errors = {};
      for (const item in err) {
        errors[item] = {
          state: 'error',
          message: err[item][0].substr(item.length + 1),
        };
      }
      // console.log('errors', {errors});
      if (this._getFields().filter(field => !!get(errors, field.name)).length > 0) {
        this.onError(errors);
        return false;
      }
      return true;
    }
  }

  onError(errors) {
    const { onError } = this.props;
    this.setState({ errors });
    if (onError) {
      onError(errors);
    }
  }


  onChange(data) {
    const { onChange } = this.props;
    // if (this.props.validateOnChange && !this.validate()) return null;
    if (onChange) {
      onChange(data);
    }
  }

  @autobind
  handleChangeField(name, ...args) {
    // console.log('handleChangeField', name, ...args);
    return async (inputValue) => {
      await this.setFieldData(name, inputValue, ...args);
      this.props.validateOnChange && await this.validate();
      // this.props.validateOnChange && this.validate();
      this.onChange(this.getData());
    };
  }

  async onSubmit(data) {
    const { onSubmit } = this.props;
    // this.setState({ errors: {} });
    if (onSubmit) {
      await onSubmit.bind(this)(data);
    }
  }

  @autobind
  async handleSubmit(e) {
    e && e.preventDefault && e.preventDefault();
    if (await this.validate()) {
      return this.onSubmit(this.getData());
    }
  }

  @autobind
  handleCancel(e) {
    e && e.preventDefault && e.preventDefault();
    this.setState({
      data: this.processStateData(this.props),
    });
  }

  getFieldValue(name) {
    return this.getStatePath(`data.${name}`);
  }

  setFieldValue(name, inputValue) {
    const field = this.getField(name);
    let value = inputValue;
    if (field && field.format) {
      try {
        value = field.format(value);
      } catch (err) {
        typeof __DEV__ !== 'undefined' && __DEV__ && console.error('field.format(value) err', err);
      }
    }
    const { removeNull } = this.props;
    if (removeNull && value == null) {
      // console.log('removeStatePath');
      return this.removeStatePath(`data.${name}`);
    }
    return this.setStatePath(`data.${name}`, value);
  }

  setFieldData(...args) {
    return this.setFieldValue(...args);
  }
}
