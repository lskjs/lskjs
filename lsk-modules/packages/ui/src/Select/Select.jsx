import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import Up from 'react-icons2/mdi/chevron-up';
import Down from 'react-icons2/mdi/chevron-down';
import omit from 'lodash/omit';

class Select extends PureComponent {
  static propTypes = {
    options: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    searchable: PropTypes.bool,
  }
  static defaultProps = {
    options: [],
    value: null,
    placeholder: null,
    searchable: false,
    onChange: () => {},
  }
  render() {
    const {
      options, required, ...props
    } = this.props;
    const opt = options.map(i => ({
      label: i.title,
      ...omit(i, ['title']),
    }));

    return (
      <ReactSelect
        className="list-selector"
        options={opt}
        clearable={!required}
        required={required}
        arrowRenderer={e => (e.isOpen ? <Up /> : <Down />)}
        {...props}
      />
    );
  }
}

export default Select;
