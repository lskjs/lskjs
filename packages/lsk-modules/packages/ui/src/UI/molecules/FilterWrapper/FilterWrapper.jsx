import React, { PureComponent } from 'react';
import StatefulButton from '../../../StatefulButton';
import Button from '../../../Button';
import T from '../../../T';
import Modal, { Title, Footer, Content } from '../Modal';

class FilterWrapper extends PureComponent {
  render() {
    const {
      trigger,
      title,
    } = this.props;
    return (
      <Modal
        size="small"
        innerRef={(modal) => { this.modal = modal; }}
        trigger={trigger}
        onOpen={this.handleOpen}
        // onChange={onChange && this.handleChange}
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
            <T name="common.confirm" />
          </StatefulButton>
          <Button
            paint="primary"
            view="text"
            onClick={() => this.modal.close()}
          >
            <T name="common.cancel" />
          </Button>
        </Footer>
      </Modal>
    );
  }
}

export default FilterWrapper;
