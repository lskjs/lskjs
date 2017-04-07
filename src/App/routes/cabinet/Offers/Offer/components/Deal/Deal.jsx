import React, { Component, PropTypes } from 'react';
import css from 'importcss';
import {
  Card,
  CardBlock,
  Label,
} from 'react-bootstrap';

@css(require('./Deal.css'))
export default class Deal extends Component {
  convertPartnerType(type) {
    switch (type) {
      case 1: return {
        name: 'Официальный партнёр',
        style: 'primary',
      };
      case 2: return {
        name: 'Эксклюзивный партнёр',
        style: 'info',
      };
      default: return null;
    }
  }
  render() {
    const {
      user: {
        avatar,
        fullName,
        partnerType,
      },
    } = this.props;
    return (
      <Card>
        <CardBlock>
          <section styleName="header">
            <img src={avatar} alt={fullName} title={fullName} />
            <div styleName="info">
              <h3>{fullName}</h3>
              <If condition={partnerType}>
                <Label bsStyle={this.convertPartnerType(partnerType).style}>
                  {this.convertPartnerType(partnerType).name}
                </Label>
              </If>
            </div>
          </section>
        </CardBlock>
      </Card>
    );
  }
}
