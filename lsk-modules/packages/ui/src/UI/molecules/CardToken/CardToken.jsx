import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import CreditCard from 'react-icons2/mdi/credit-card';
import autobind from 'core-decorators/lib/autobind';
import InputGroup from '../InputGroup';
import Input from '../../../Input';
import Button from '../../../Button';
import StatefulButton from '../../../StatefulButton';
import Modal, { Title, Content, Footer } from '../Modal';

@inject('t', 'uapp')
@observer
class CardToken extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
  }
  static defaultProps = {
    value: {},
    onSubmit: null,
    onChange: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }
  componentWillReceiveProps(next) {
    const { value } = this.props;
    const state = {};
    const newValue = value;
    if (newValue !== next.value) state.value = next.value;
    this.setState(state);
  }
  @autobind getValue() {
    const { value } = this.state;
    return value;
  }
  @autobind handleSubmit(value) {
    const { uapp } = this.props;
    const { token, errorMsgs } = value;
    if (!token) uapp.onError('!token');
    if (errorMsgs.length) {
      uapp.toast({
        type: 'error',
        text: errorMsgs?.join(', '),
      });
    }
    this.setState({ value: token }, this.callbackSubmit);
    this.modal.close();
  }
  @autobind callbackSubmit() {
    const { onSubmit } = this.props;
    const { value } = this.state;
    if (onSubmit) onSubmit(value);
  }
  @autobind handleChange(value) {
    this.setState({ value }, this.callbackChange);
  }
  @autobind callbackChange() {
    const { onChange } = this.props;
    const { value } = this.state;
    if (onChange) onChange(value);
  }
  @autobind initWidget(data) {
    const { uapp } = this.props;
    const style = {
      widget: {},
      field: {},
      fieldInput: {},
      fieldInputPlaceholder: {},
      fieldInputControl: {},
      fieldSubmit: {},
      fieldSubmitError: {},
      fieldSubmitButton: {
        background: '#000',
        hover: {
          background: '#ff546c',
        },
      },
    };
    const option = {
      root: '#root-widget',
      submitButton: 'submit-button',
      fields: [['number'], ['embossingName']],
      ...data,
      lang: 'en',
      style,
    };
    /* global cardDataWidget */
    const widget = cardDataWidget.init(option);
    widget.addEventListener('tokenCreateSuccess', this.handleSubmit);
    widget.addEventListener('tokenCreateError', (err) => {
      uapp.toast({
        type: 'error',
        text: err?.errorMsgs?.join(', '),
      });
    });
  }
  @autobind async handleOpen() {
    const { uapp } = this.props;
    const res = await uapp.modules.billing.stores.Transactions.getCardTokenSign();
    this.initWidget(res?.data);
  }
  @autobind renderModal(trigger) {
    const { title, onChange, t } = this.props;
    return (
      <Modal
        size="small"
        innerRef={(modal) => { this.modal = modal; }}
        trigger={trigger}
        onOpen={this.handleOpen}
        onChange={onChange && this.handleChange}
        onSubmit={this.handleSubmit}
      >
        <Title>{title}</Title>
        <Content>
          <div style={{ height: 200 }}>
            <div id="root-widget" style={{ height: 200 }} />
          </div>
        </Content>
        <Footer>
          <StatefulButton
            paint="primary"
            id="submit-button"
            onClick={this.handleSubmit}
            componentClass={Button}
          >
            {t('buttons.confirm')}
          </StatefulButton>
          <Button
            paint="primary"
            view="text"
            onClick={() => this.modal.close()}
          >
            {t('buttons.cancel')}
          </Button>
        </Footer>
      </Modal>
    );
  }
  render() {
    const { block, t } = this.props;
    const value = this.getValue();
    const trigger = value?.number
      ? (
        <InputGroup disabled uniform>
          <InputGroup.Addon icon style={{ color: '#7070ff' }}>
            <CreditCard />
          </InputGroup.Addon>
          <Input
            defaultValue={value.number}
            disabled
          />
          <InputGroup.Addon>
            <Button paint="primary" view="text">
              {t('buttons.change')}
            </Button>
          </InputGroup.Addon>
        </InputGroup>
      )
      : (
        <Button
          size="large"
          paint="primary"
          block={block}
        >
          {t('buttons.create')}
        </Button>
      );
    return this.renderModal(trigger);
  }
}

export default CardToken;
