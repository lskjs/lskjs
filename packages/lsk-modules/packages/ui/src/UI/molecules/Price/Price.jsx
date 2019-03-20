import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import autobind from 'core-decorators/lib/autobind';
import round from 'lodash/round';
import get from 'lodash/get';
import map from 'lodash/map';
import { inject, observer } from 'mobx-react';

import USD from 'react-icons2/mdi/currency-usd';
import EUR from 'react-icons2/mdi/currency-eur';
import RUB from 'react-icons2/mdi/currency-rub';
import { toShort, formatter, numberWithSpaces } from '../../../utils/formatter';


const getSign = (currency) => {
  if (currency === 'usd') return '$';
  if (currency === 'eur') return '€';
  if (currency === 'rub') return '₽';
  return '';
};

function getFormated(value, format, sign = '', dec = 2) {
  if (format === 'fullPrice') {
    return `${sign}${numberWithSpaces(value.toFixed(dec))}`;
  }
  if (format === 'formatter') {
    return formatter(value, sign);
  }
  return `${sign}${numberWithSpaces(toShort(value))}`;
}

function valueMinus(value) {
  return value < 0
    ? '—'
    : null;
}

@inject('config')
@observer
class Price extends Component {
  static defaultProps = {
    currency: 'usd',
  }

  @autobind renderBody() {
    let {
      value, valueTo,
    } = this.props;
    const {
      min, max, helper, prefix, postfix, format, currency, config,
    } = this.props;
    const curs = get(config, 'info.currencies');
    if (!value) value = min;
    if (!valueTo) valueTo = max;
    if (value) value = round(value * curs[currency], 2);
    if (valueTo) valueTo = round(valueTo * curs[currency], 2);
    const sign = getSign(currency);
    return (
    // <React.Fragment>
      <span>
        <span
          type="button"
        >
          {prefix}
          {valueMinus(value)}
          {value ? getFormated(Math.abs(value), format, sign, 2) : 0}
          {valueTo && '-'}
          {valueTo && getFormated(valueTo, format, sign, 2)}
          {postfix}
        </span>
        {helper ? <span className="price-helper">{helper}</span> : ''}
      </span>
    // </React.Fragment>
    );
  }
  render() {
    let {
      value, valueTo, placeholder,
    } = this.props;
    const {
      min, max, noTooltip, noPlaceholder, noText, prefix, config, format,
    } = this.props;

    if (!value) value = min;
    if (!valueTo) valueTo = max;
    if (!placeholder) placeholder = noText;
    const curs = get(config, 'info.currencies');
    const icons = {
      usd: <USD />,
      eur: <EUR />,
      rub: <RUB />,
    };
    if (typeof value !== 'number' && typeof valueTo !== 'number') {
      if (noPlaceholder) {
        return (
          <span
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 500,
            }}
          >
            {prefix}
            {'$ 0'}
          </span>
        );
      }
      return <span>{placeholder || 0}</span>;
    }
    if (noTooltip) {
      return this.renderBody();
    }
    // return <span>asdasd</span>
    return (
    // <span style={{ backgroundColor: 'red' }}>
    //    asd
      <OverlayTrigger
        trigger={['click', 'hover', 'focus']}
        placement="top"
        overlay={(
          <Tooltip id="tooltip-price">
            {
            map(curs, (cur, key) => {
              const price = getFormated(Math.abs(value) * cur, format);
              const valueToCur = getFormated(valueTo * cur, format);
              return (
                <div key={key}>
                  {valueMinus(value)}
                  {icons[key] || key}
                  {price}
                  {valueTo && '-'}
                  {valueTo && valueToCur}
                </div>
              );
            })
          }
          </Tooltip>
      )}
      >
        {this.renderBody()}
      </OverlayTrigger>
    //   123
    // </span>
    );
  }
}


export default Price;
