import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import If from 'react-if';
import PropTypes from 'prop-types';
import autobind from 'core-decorators/lib/autobind';
import { formatter } from '../../../utils/formatter';
import RangeGroup from '../RangeGroup';
import { Wrapper, Values, ValueItem } from './RangeFilterOption.styles';

class RangeFilterOption extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    stats: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.object.isRequired,
    quickValues: PropTypes.shape({
      min: PropTypes.array,
      max: PropTypes.array,
    }),
    value: PropTypes.arrayOf(PropTypes.number),
  }
  static defaultProps = {
    min: null,
    max: null,
    stats: null,
    quickValues: {},
    value: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      minValue: this.getMinValue(props), // eslint-disable-line no-undef
      maxValue: this.getMaxValue(props), // eslint-disable-line no-undef
      minFocused: true,
      maxFocused: false,
      prevFocused: 'max',
      // minDisabledValues: this.getMinDisabledValues(props),
      maxDisabledValues: this.getMaxDisabledValues(props),
    };
  }
  componentWillReceiveProps(props) {
    let hasChanges = false;
    // const minDisabledValues = this.getMinDisabledValues(props, this.state);
    // if (!isEqual(minDisabledValues, this.state.minDisabledValues)) {
    //   hasChanges = true;
    // }
    const maxDisabledValues = this.getMaxDisabledValues(props, this.state);
    if (!isEqual(maxDisabledValues, this.state.maxDisabledValues)) {
      hasChanges = true;
    }
    if (hasChanges) {
      this.setState({
        // minDisabledValues,
        maxDisabledValues,
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextProps, nextState);
    const { minFocused, maxFocused } = this.state;
    if (!isEqual(minFocused, nextState.minFocused)) {
      return true;
    }
    if (!isEqual(maxFocused, nextState.maxFocused)) {
      return true;
    }
    // const prevMinDisabledValues = this.state.minDisabledValues;
    // const { minDisabledValues } = nextState;
    // if (!isEqual(prevMinDisabledValues, minDisabledValues)) {
    //   return true;
    // }
    const prevMaxDisabledValues = this.state.maxDisabledValues;
    const { maxDisabledValues } = nextState;
    if (!isEqual(prevMaxDisabledValues, maxDisabledValues)) {
      return true;
    }
    return false;
  }
  getMaxValue(props, state) {
    if (!state || typeof state.maxValue !== 'number') {
      return props.value?.[1] || props.selected?.value[1];
    }
    return state.maxValue;
  }
  getMinValue(props, state) {
    if (!state || typeof state.minValue !== 'number') {
      return props.value?.[0] || props.selected?.value[0];
    }
    return state.minValue;
  }
  // getMinDisabledValues(props, state) {
  //   const maxValue = this.getMaxValue(props, state);
  //   const { quickValues } = props;
  //   const { min = [] } = quickValues;
  //   const values = [];
  //   if (!maxValue) return [];
  //   min.forEach(({ value }) => {
  //     if (value > Number(maxValue)) {
  //       values.push(value);
  //     }
  //   });
  //   return values;
  // }
  getMaxDisabledValues(props, state) {
    const minValue = this.getMinValue(props, state);
    const { quickValues } = props;
    const { max = [] } = quickValues;
    const values = [];
    if (!minValue) return [];
    max.forEach(({ value }) => {
      if (value < Number(minValue)) {
        values.push(value);
      }
    });
    return values;
  }
  @autobind
  selectShortValue(value, type) {
    const reverse = type === 'min' ? 'max' : 'min';
    this.setState({
      [`${type}Value`]: value,
    }, () => {
      this.handleFocus(reverse);
      const { minValue, maxValue, prevFocused } = this.state;
      this.callback(minValue, maxValue);
      if (type === 'min') {
        this.setState({ prevFocused: 'min' });
      }
      if (type === 'max' && prevFocused === 'min') {
        this.setState({ prevFocused: 'max' }, () => {
          if (this.props.onClose) {
            this.props.onClose();
            // console.log('CLOSE');
          }
        });
      }
    });
  }
  @autobind
  handleFocus(type) {
    const reverse = type === 'min' ? 'max' : 'min';
    this.setState({
      [`${type}Focused`]: true,
      [`${reverse}Focused`]: false,
    });
    this[`${type}Ref`]?.focus(); // eslint-disable-line
  }
  @autobind
  callback(min, max) {
    const { onChange } = this.props;
    onChange({
      title: `${min ? formatter(min) : 'Мин.'} - ${max ? formatter(max) : 'Макс.'}`,
      value: [min, max],
    });
  }
  @autobind
  handleChangeRange([min, max]) {
    this.setState({
      minValue: min,
      maxValue: max,
      // minDisabledValues: this.getMinDisabledValues(this.props, { ...this.state, minValue: min, maxValue: max }),
      maxDisabledValues: this.getMaxDisabledValues(this.props, { ...this.state, minValue: min, maxValue: max }),
    }, () => {
      this.callback(min, max);
    });
  }
  render() {
    const {
      minFocused, maxFocused, minValue, maxValue, maxDisabledValues,
    } = this.state;
    const {
      min, max, stats, quickValues, footer,
    } = this.props;
    let minValues;
    let maxValues;
    let values;
    let selectedFocus;
    if (quickValues) {
      ({ min: minValues = [], max: maxValues = [] } = quickValues);
    }
    if (minFocused) {
      values = minValues;
      selectedFocus = 'min';
    }
    if (maxFocused) {
      values = maxValues;
      selectedFocus = 'max';
    }
    const alignValues = minFocused ? 'flex-start' : 'flex-end';
    return (
      <Wrapper>
        <RangeGroup
          min={min}
          max={max}
          value={[Number(minValue), Number(maxValue)]}
          onChange={this.handleChangeRange}
          stats={stats}
          minProps={{
            innerRef: (e) => {
              this.minRef = e?.refsInput; // eslint-disable-line no-undef
            },
            placeholder: 'Мин.',
            autoFocus: true,
            onFocus: () => {
              this.handleFocus('min');
            },
          }}
          maxProps={{
            innerRef: (e) => {
              this.maxRef = e?.refsInput; // eslint-disable-line no-undef
            },
            placeholder: 'Макс.',
            onFocus: () => {
              this.handleFocus('max');
            },
          }}
        />
        <If condition={minFocused || maxFocused}>
          <If condition={minValues || maxValues}>
            <Values>
              {values.map((item, i) => {
                const disabled = maxFocused && maxDisabledValues.includes(item.value);
                // if (minFocused) disabled = item.value >= Number(maxValue);
                // if (maxFocused) disabled = item.value <= Number(minValue);
                return (
                  <ValueItem
                    key={i} // eslint-disable-line react/no-array-index-key
                    align={alignValues}
                    disabled={disabled}
                    onClick={() => {
                      this.selectShortValue(item.value, selectedFocus);
                    }}
                  >
                    {item.title}
                  </ValueItem>
                );
              })}
            </Values>
          </If>
        </If>
        {footer}
      </Wrapper>
    );
  }
}

export default RangeFilterOption;
