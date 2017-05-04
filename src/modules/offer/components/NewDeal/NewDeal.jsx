import React, { Component, PropTypes } from 'react';
import { inject } from 'mobx-react';
import { autobind } from 'core-decorators';
import css from 'importcss';
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import Form from 'lsk-general/General/Form';

@inject('api', 'log')
@css(require('./NewDeal.css'))
export default class NewDeal extends Component {
  static defaultProps = {
    showModal: false,
  };
  static propTypes = {
    api: PropTypes.object.isRequired,
    log: PropTypes.object.isRequired,
    offer: PropTypes.object.isRequired,
    hideModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool,
  };
  state = {
    content: '',
  };
  @autobind
  async handleSubmit() {
    const { content } = this.state;
    const { api, log, offer, hideModal } = this.props;
    if (content.length === 0) return false;
    const res = await api.fetch('/api/module/deal', {
      method: 'POST',
      body: {
        info: {
          content,
        },
        offerId: offer._id,
      },
    });
    if (res.message === 'ok') {
      log.info('res', res);
      offer.addNewDeal(res.data);
      hideModal();
    }
    return true;
  }
  handleChangeText = (e) => {
    this.setState({ content: e.target.value });
  };
  render() {
    const { content } = this.state;
    const { showModal, hideModal } = this.props;
    return (
      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Создание нового отклика</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="formContentText">
            <ControlLabel>Ваше сообщение</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Текст сообщения"
              value={content}
              onChange={this.handleChangeText}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleSubmit} bsStyle="success">Оставить отклик</Button>
          <Button onClick={hideModal}>Отмена</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
