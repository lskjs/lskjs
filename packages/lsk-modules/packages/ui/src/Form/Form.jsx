import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'core-decorators/lib/autobind';
import DebounceInput from 'react-debounce-input';
import {
  Form as BsForm,
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  HelpBlock,
  Button,
  Col,
} from 'react-bootstrap';
import PureComponent from '../PureComponent';
import FormBase from '../FormBase';
import filterProps from '../utils/filterProps';


class Input extends PureComponent {
  @autobind
  onChange(e) {
    const { value } = e.target;
    if (this.props.onChange) this.props.onChange(value);
  }

  render() {
    return (
      <FormControl
        componentClass={DebounceInput}
        // {...this.props}
        {...filterProps(this.props, DebounceInput)}
        onChange={this.onChange}
      />
    );
  }
}

export default class Form extends FormBase {
  static Input = Input;
  static defaultProps = {
    ...FormBase.defaultProps,
    horizontal: false,

    form: false,
    format: String,
    formComponent: BsForm,
    submitButton: 'Отправить',
    submitButtonComponent: Button,
    // align: 'center',
    // bsStyle: 'primary',
  }
  static propTypes = {
    ...FormBase.propTypes,
    horizontal: PropTypes.bool,

    format: PropTypes.any,
    submitButton: PropTypes.any,
    submitButtonComponent: PropTypes.any,
    form: PropTypes.bool,
    formComponent: PropTypes.any,
    // bsStyle: PropTypes.string,
    // align: PropTypes.oneOf(['left', 'right', 'center']),
  }


  @autobind
  renderFormControl(item) {
    const { Control } = item;
    let control;
    if (Control) {
      control = (
        <Control
          value={this.getStatePath(`data.${item.name}`) || ''}
          onChange={this.handleChangeField(item.name)}
          {...item.control}
        />
      );
    } else {
      control = (
        <Input
          type="text"
          value={this.getStatePath(`data.${item.name}`) || ''}
          onChange={this.handleChangeField(item.name)}
          {...item.control}
        />
      );
    }
    return (
      <React.Fragment>
        <If condition={item.icon}>
          <InputGroup>
            <InputGroup.Addon>
              {item.icon}
            </InputGroup.Addon>
            {control}
          </InputGroup>
        </If>
        <If condition={!item.icon}>
          {control}
        </If>
        <FormControl.Feedback />
        <If condition={this.getError(item.name).state}>
          <HelpBlock>
            {this.getError(item.name).message}
          </HelpBlock>
        </If>
        <If condition={item.help}>
          <HelpBlock>
            {item.help}
          </HelpBlock>
        </If>
      </React.Fragment>
    );
  }

  renderFormGroup(itemOrName, key) {
    // console.log('renderFormGroup', {itemOrName});
    if (!itemOrName) return null;
    const { horizontal } = this.props;
    const item = typeof itemOrName === 'string' ? this.getField(itemOrName) : itemOrName;
    if (horizontal) {
      return (
        <FormGroup
          key={key || item.name}
          controlId={item.name}
          validationState={this.getError(item.name).state}
        >
          <Col componentClass={ControlLabel} sm={2}>
            {item.title}
          </Col>
          <Col sm={10}>
            {this.renderFormControl(item)}
          </Col>
        </FormGroup>
      );
    }
    return (
      <FormGroup
        key={key || item.name}
        controlId={item.name}
        validationState={this.getError(item.name).state}
      >
        <If condition={item.title}>
          <ControlLabel>
            {item.title}
          </ControlLabel>
        </If>
        {this.renderFormControl(item)}
      </FormGroup>
    );
  }

  renderFields(fields) {
    return fields.map((...args) => this.renderFormGroup(...args));
  }

  renderSubmitButton() {
    const { submitButton, submitButtonComponent: SubmitButtonComponent } = this.props;

    if (!SubmitButtonComponent) return null;
    // const style = {
    //   textAlign: align;
    //   // margin-top: $submit-button-top-offset;
    // };

    // const SubmitButtonComponent = submitButtonComponent || Button;
    let button;
    if (typeof submitButton === 'string') {
      button = (
        <SubmitButtonComponent type="submit" bsStyle="primary">
          {submitButton}
        </SubmitButtonComponent>
      );
    } else {
      button = submitButton;
    }
    //   return (
    return (
      <div style={{ textAlign: 'center' }}>
        {button}
      </div>
    );
  }

  render() {
    const { horizontal, formComponent } = this.props;
    const FormComponent = formComponent || BsForm;

    return (
      <FormComponent horizontal={horizontal} onSubmit={this.handleSubmit}>
        {this.renderFields(this._getFields())}
        {this.renderSubmitButton()}
      </FormComponent>
    );
  }
}
