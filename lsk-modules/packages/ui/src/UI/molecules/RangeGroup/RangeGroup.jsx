import React, { PureComponent } from 'react';
import If from 'react-if';
import PropTypes from 'prop-types';
import autobind from 'core-decorators/lib/autobind';

import InputRange from '../InputRange';
import Slider from '../Slider';

import { Graph, GraphItem } from './RangeGroup.styles';

class RangeGroup extends PureComponent {
  static propTypes = {
    validationState: PropTypes.oneOf(['success', 'warning', 'error']),
  }
  static defaultProps = {
    validationState: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }
  componentWillReceiveProps(next) {
    if (this.props.value !== next.value) this.setState({ value: next.value });
  }
  @autobind handleChange(value) {
    this.setState({ value }, this.callback);
  }
  @autobind callback() {
    const { onChange } = this.props;
    if (onChange) onChange(this.state.value);
  }
  render() {
    const { value } = this.state;
    const {
      stats = [],
      range,
      slider,
      min,
      max,
      validationState,
      minProps,
      maxProps,
      minRef,
      maxRef,
    } = this.props;
    const [innerMin, innerMax] = value || [null, null];
    const sliderValue = [innerMin || min, innerMax || max];
    const marks = {
      [min]: min,
      [max]: max,
    };
    const maxStatsValue = stats?.length ? Math.max(...stats) : 0;
    return (
      <React.Fragment>
        <If condition={slider !== false}>
          <div style={{ marginBottom: 10, marginTop: 30 }}>
            <If condition={stats?.length}>
              <Graph>
                {stats.map((item, i) => (
                  <GraphItem
                    key={i} // eslint-disable-line react/no-array-index-key
                    height={`${Math.round(item / (maxStatsValue / 100))}%`}
                  />
                ))}
              </Graph>
            </If>
            <Slider
              range
              graphs={stats?.length} // eslint-disable-line
              onChange={this.handleChange}
              value={sliderValue}
              marks={marks}
              min={min}
              max={max}
              styleWrapper={{
                marginTop: -10,
              }}
            />
          </div>
        </If>
        <If condition={range !== false}>
          <InputRange
            validationState={validationState}
            value={value}
            onChange={this.handleChange}
            min={min}
            max={max}
            minRef={minRef}
            maxRef={maxRef}
            minProps={minProps}
            maxProps={maxProps}
          />
        </If>
      </React.Fragment>
    );
  }
}

export default RangeGroup;
