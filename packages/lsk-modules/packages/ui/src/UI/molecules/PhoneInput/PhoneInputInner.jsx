import { some, find, reduce, map, filter, includes } from 'lodash/collection';
import { findIndex, head, tail } from 'lodash/array';
import { debounce, memoize } from 'lodash/function';
import { trim, startsWith } from 'lodash/string';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { allCountries } from './countriesData';
import isNumberValid from './isNumberValid';
import Input from '../../../Input';

const isModernBrowser = Boolean(__CLIENT__ && typeof document !== 'undefined' && document.createElement('input').setSelectionRange);


const keys = {
  UP: 38,
  DOWN: 40,
  RIGHT: 39,
  LEFT: 37,
  ENTER: 13,
  ESC: 27,
  PLUS: 43,
  A: 65,
  Z: 90,
  SPACE: 32,
};

function getOnlyCountries(onlyCountriesArray) {
  if (onlyCountriesArray.length === 0) {
    return allCountries;
  }
  const selectedCountries = [];
  allCountries.forEach((country) => {
    onlyCountriesArray.forEach((selCountry) => {
      if (country.iso2 === selCountry) {
        selectedCountries.push(country);
      }
    });
  });
  return selectedCountries;
}

function excludeCountries(selectedCountries, excludedCountries) {
  if (excludedCountries.length === 0) {
    return selectedCountries;
  }
  return filter(selectedCountries, (selCountry) => {
    return !includes(excludedCountries, selCountry.iso2);
  });
}

class ReactPhoneInput extends Component {
  constructor(props) {
    super(props);
    const inputNumber = this.props.value || '';
    const onlyCountries = excludeCountries(getOnlyCountries(props.onlyCountries), props.excludeCountries);
    const selectedCountryGuess = find(onlyCountries, { iso2: this.props.defaultCountry }) || { iso2: onlyCountries[0].iso2 };
    const selectedCountryGuessIndex = findIndex(allCountries, selectedCountryGuess);
    const dialCode = (
      selectedCountryGuess
      && !startsWith(inputNumber.replace(/\D/g, ''), selectedCountryGuess.dialCode)
        ? selectedCountryGuess.dialCode || onlyCountries[0].dialCode : ''
    );
    const formattedNumber = (
      this.formatNumber(dialCode + inputNumber.replace(/\D/g, ''), selectedCountryGuess
        ? selectedCountryGuess.format : null)
    );
    const preferredCountries = filter(allCountries, (country) => {
      return some(this.props.preferredCountries, (preferredCountry) => {
        return preferredCountry === country.iso2;
      });
    });
    this.getNumber = this.getNumber.bind(this);
    this.getValue = this.getValue.bind(this);
    this.resetNumber = this.resetNumber.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.formatNumber = this.formatNumber.bind(this);
    this._cursorToEnd = this._cursorToEnd.bind(this);
    this.guessSelectedCountry = this.guessSelectedCountry.bind(this);
    this.getElement = this.getElement.bind(this);
    this.handleFlagDropdownClick = this.handleFlagDropdownClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleFlagItemClick = this.handleFlagItemClick.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this._getHighlightCountryIndex = this._getHighlightCountryIndex.bind(this);
    this._searchCountry = this._searchCountry.bind(this);
    this.searchCountry = this.searchCountry.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.getCountryDropDownList = this.getCountryDropDownList.bind(this);
    this.updateDropdownWidth = this.updateDropdownWidth.bind(this);

    this.state = {
      defaultCountry: props.defaultCountry,
      selectedCountry: selectedCountryGuess,
      highlightCountryIndex: selectedCountryGuessIndex,
      showDropDown: false,
      queryString: '',
      freezeSelection: false,
      debouncedQueryStingSearcher: debounce(this.searchCountry, 100),
      preferredCountries,
      formattedNumber,
      onlyCountries,
      // formattedNumber: props.value,
      dropdownWidth: 220,
    };
  }

  componentDidMount() {
    if (__CLIENT__) {
      document.addEventListener('keydown', this.handleKeydown);
      this.updateDropdownWidth();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultCountry &&
        nextProps.defaultCountry !== this.state.defaultCountry) {
      this.updateDefaultCountry(nextProps.defaultCountry);
    }
    this.updateDropdownWidth();
  }

  componentWillUnmount() {
    if (__CLIENT__) document.removeEventListener('keydown', this.handleKeydown);
  }

  getNumber() {
    return this.state.formattedNumber !== '+' ? this.state.formattedNumber : '';
  }

  getValue() {
    return this.getNumber();
  }

  getElement(index) {
    return ReactDOM.findDOMNode(this.refs[`flag_no_${index}`]); // eslint-disable-line
  }

  getCountryDropDownList() {
    const countryDropDownList = map(this.state.preferredCountries.concat(this.state.onlyCountries), (country, index) => {
      const itemClasses = classNames({
        country: true,
        preferred: country.iso2 === 'us' || country.iso2 === 'gb',
        active: country.iso2 === 'us',
        highlight: this.state.highlightCountryIndex === index,
      });

      const inputFlagClasses = `flag ${country.iso2}`;
      return (
        <li
          aria-hidden
          ref={`flag_no_${index}`}
          key={`flag_no_${index}`}
          data-flag-key={`flag_no_${index}`}
          className={itemClasses}
          data-dial-code="1"
          data-country-code={country.iso2}
          onClick={() => this.handleFlagItemClick(country)}
        >
          <div className={inputFlagClasses} />
          <span className="country-name">{country.name}</span>
          <span className="dial-code">{`+${country.dialCode}`}</span>
        </li>
      );
    });

    const dashedLi = (<li key="dashes" className="divider" />);
    // let's insert a dashed line in between preffered countries and the rest
    countryDropDownList.splice(this.state.preferredCountries.length, 0, dashedLi);

    const dropDownClasses = classNames({
      'country-list': true,
      hide: !this.state.showDropDown,
    });

    return (
      <ul
        ref="flagDropdownList" // eslint-disable-line
        className={dropDownClasses}
        style={{ width: this.state.dropdownWidth }}
      >
        {countryDropDownList}
      </ul>
    );
  }

  resetNumber() {
    const formattedNumber = (
      this.formatNumber(
        this.state.selectedCountry.dialCode,
        this.state.selectedCountry.format,
      )
    );
    this.setState({
      formattedNumber,
    });
  }

  updateDefaultCountry(country) {
    const newSelectedCountry = find(this.state.onlyCountries, { iso2: country });
    this.setState({
      defaultCountry: country,
      selectedCountry: newSelectedCountry,
      formattedNumber: `+${newSelectedCountry.dialCode}`,
    });
  }

  scrollTo(country, middle) {
    if (!__CLIENT__) return;
    if (!country) return;

    const container = ReactDOM.findDOMNode(this.refs.flagDropdownList); // eslint-disable-line

    if (!container) return;

    const containerHeight = container.offsetHeight;
    const containerOffset = container.getBoundingClientRect();
    const containerTop = containerOffset.top + document.body.scrollTop;
    const containerBottom = containerTop + containerHeight;

    const element = country;
    const elementOffset = element.getBoundingClientRect();

    const elementHeight = element.offsetHeight;
    const elementTop = elementOffset.top + document.body.scrollTop;
    const elementBottom = elementTop + elementHeight;
    let newScrollTop = elementTop - containerTop + container.scrollTop;
    const middleOffset = (containerHeight / 2) - (elementHeight / 2);

    if (elementTop < containerTop) {
      // scroll up
      if (middle) {
        newScrollTop -= middleOffset;
      }
      container.scrollTop = newScrollTop;
    } else if (elementBottom > containerBottom) {
      // scroll down
      if (middle) {
        newScrollTop += middleOffset;
      }
      const heightDifference = containerHeight - elementHeight;
      container.scrollTop = newScrollTop - heightDifference;
    }
  }

  formatNumber(text, pattern) {
    if (!text || text.length === 0) {
      return '+';
    }

    // for all strings with length less than 3, just return it (1, 2 etc.)
    // also return the same text if the selected country has no fixed format
    if ((text && text.length < 2) || !pattern || !this.props.autoFormat) {
      return `+${text}`;
    }

    const formattedObject = reduce(pattern, (acc, character) => {
      if (acc.remainingText.length === 0) {
        return acc;
      }

      if (character !== '.') {
        return {
          formattedText: acc.formattedText + character,
          remainingText: acc.remainingText,
        };
      }

      return {
        formattedText: acc.formattedText + head(acc.remainingText),
        remainingText: tail(acc.remainingText),
      };
    }, { formattedText: '', remainingText: text.split('') });
    return formattedObject.formattedText + formattedObject.remainingText.join('');
  }

  // put the cursor to the end of the input (usually after a focus event)
  _cursorToEnd() {
    const input = ReactDOM.findDOMNode(this.numberInput); // eslint-disable-line
    input.focus();
    if (isModernBrowser) {
      const len = input.value.length;
      input.setSelectionRange(len, len);
    }
  }

  handleFlagDropdownClick() {
    // need to put the highlight on the current selected country if the dropdown is going to open up
    this.setState({
      showDropDown: !this.state.showDropDown,
      // highlightCountry: find(this.state.onlyCountries, this.state.selectedCountry),
      highlightCountryIndex: findIndex(this.state.onlyCountries, this.state.selectedCountry),
    }, () => {
      if (this.state.showDropDown) {
        this.scrollTo(this.getElement(this.state.highlightCountryIndex + this.state.preferredCountries.length));
      }
    });
  }

  handleInput(event) {
    console.log(event);
    let formattedNumber = '+';
    let newSelectedCountry = this.state.selectedCountry;
    let { freezeSelection } = this.state;

    // Does not exceed 16 digit phone number limit
    if (event.replace(/\D/g, '').length > 16) {
      return;
    }

    // if the input is the same as before, must be some special key like enter etc.
    if (event === this.state.formattedNumber) {
      return;
    }

    if (event.length > 0) {
      // before entering the number in new format, lets check if the dial code now matches some other country
      const inputNumber = event.replace(/\D/g, '');

      // we don't need to send the whole number to guess the country... only the first 6 characters are enough
      // the guess country function can then use memoization much more effectively since the set of input it
      // gets has drastically reduced
      if (!this.state.freezeSelection || this.state.selectedCountry.dialCode.length > inputNumber.length) {
        newSelectedCountry = (
          this.guessSelectedCountry(
            inputNumber.substring(0, 6),
            this.state.onlyCountries,
            this.state.defaultCountry,
          )
        );
        freezeSelection = false;
      }
      // let us remove all non numerals from the input
      formattedNumber = this.formatNumber(inputNumber, newSelectedCountry.format);
    }

    // let caretPosition = event.target.selectionStart;
    // const oldFormattedText = this.state.formattedNumber;
    // const diff = formattedNumber.length - oldFormattedText.length;

    this.setState({
      formattedNumber,
      freezeSelection,
      selectedCountry: newSelectedCountry.dialCode.length > 0
        ? newSelectedCountry
        : this.state.selectedCountry,
    }, () => {
      // if (isModernBrowser) {
      //   if (diff > 0) {
      //     caretPosition -= diff;
      //   }

      //   if (caretPosition > 0 && oldFormattedText.length >= formattedNumber.length) {
      //     ReactDOM.findDOMNode(this.numberInput).setSelectionRange(caretPosition, caretPosition); // eslint-disable-line
      //   }
      // }

      if (this.props.onChange) {
        this.props.onChange(this.state.formattedNumber);
      }
    });
  }

  handleInputClick(evt) {
    this.setState({ showDropDown: false });
    if (this.props.onClick) {
      this.props.onClick(evt);
    }
  }

  handleFlagItemClick(country) {
    const currentSelectedCountry = this.state.selectedCountry;
    const nextSelectedCountry = find(this.state.onlyCountries, country);

    if (currentSelectedCountry.iso2 !== nextSelectedCountry.iso2) {
      // TODO - the below replacement is a bug. It will replace stuff from middle too
      const newNumber = (
        this.state.formattedNumber.replace(
          currentSelectedCountry.dialCode,
          nextSelectedCountry.dialCode,
        )
      );
      const formattedNumber = this.formatNumber(newNumber.replace(/\D/g, ''), nextSelectedCountry.format);

      this.setState({
        showDropDown: false,
        selectedCountry: nextSelectedCountry,
        freezeSelection: true,
        formattedNumber,
      }, () => {
        this._cursorToEnd();
        if (this.props.onChange) {
          this.props.onChange(formattedNumber);
        }
      });
    }
  }

  handleInputFocus(evt) {
    // if the input is blank, insert dial code of the selected country
    if (ReactDOM.findDOMNode(this.numberInput).value === '+') { // eslint-disable-line
      this.setState({
        formattedNumber: `+${this.state.selectedCountry.dialCode}`,
      }, () => setTimeout(this._cursorToEnd, 10));
    }

    if (this.props.onFocus) {
      this.props.onFocus(evt);
    }
  }

  _getHighlightCountryIndex(direction) {
    // had to write own function because underscore does not have findIndex. lodash has it
    const highlightCountryIndex = this.state.highlightCountryIndex + direction;

    if (highlightCountryIndex < 0
      || highlightCountryIndex >= (this.state.onlyCountries.length + this.state.preferredCountries.length)) {
      return highlightCountryIndex - direction;
    }

    return highlightCountryIndex;
  }

  searchCountry() {
    const probableCandidate = this._searchCountry(this.state.queryString) || this.state.onlyCountries[0];
    const probableCandidateIndex = (
      findIndex(this.state.onlyCountries, probableCandidate) + this.state.preferredCountries.length
    );

    this.scrollTo(this.getElement(probableCandidateIndex), true);

    this.setState({
      queryString: '',
      highlightCountryIndex: probableCandidateIndex,
    });
  }

  handleKeydown(event) {
    if (!this.state.showDropDown) {
      return;
    }

    // ie hack
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }

    function _moveHighlight(direction) {
      this.setState({
        highlightCountryIndex: this._getHighlightCountryIndex(direction),
      }, () => {
        this.scrollTo(this.getElement(this.state.highlightCountryIndex), true);
      });
    }

    switch (event.which) {
      case keys.DOWN:
        _moveHighlight(1);
        break;
      case keys.UP:
        _moveHighlight(-1);
        break;
      case keys.ENTER:
        this.handleFlagItemClick(this.state.onlyCountries[this.state.highlightCountryIndex], event);
        break;
      case keys.ESC:
        this.setState({ showDropDown: false }, this._cursorToEnd);
        break;
      default:
        if ((event.which >= keys.A && event.which <= keys.Z) || event.which === keys.SPACE) {
          this.setState({
            queryString: this.state.queryString + String.fromCharCode(event.which),
          }, this.state.debouncedQueryStingSearcher);
        }
    }
  }

  handleInputKeyDown(event) {
    if (event.which === keys.ENTER) {
      this.props.onEnterKeyPress(event);
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  handleClickOutside() {
    if (this.state.showDropDown) {
      this.setState({
        showDropDown: false,
      });
    }
  }

  updateDropdownWidth() {
    const width = ReactDOM.findDOMNode(this.numberInput).offsetWidth; // eslint-disable-line
    this.setState({
      dropdownWidth: width,
    });
  }

  render() {
    const arrowClasses = classNames({
      arrow: true,
      up: this.state.showDropDown,
    });
    const inputClasses = classNames({
      'form-control': true,
      'buzz-input': true,
      'buzz-auth-input': this.props.new,
      'invalid-number': !this.props.isValid(this.state.formattedNumber.replace(/\D/g, '')),
    });

    const flagViewClasses = classNames({
      'flag-dropdown': true,
      'open-dropdown': this.state.showDropDown,
    });

    const inputFlagClasses = `flag ${this.state.selectedCountry.iso2}`;

    return (
      <div
        className={classNames({
          'react-tel-input': true,
          'react-tel-input-new': this.props.new,
        })}
      >
        <Input
          placeholder={this.props.placeholder}
          onChange={this.handleInput}
          onClick={this.handleInputClick}
          onFocus={this.handleInputFocus}
          onKeyDown={this.handleInputKeyDown}
          value={this.state.formattedNumber}
          innerRef={e => this.numberInput = e} // eslint-disable-line
          type="tel"
          className={inputClasses}
        />
        <div
          aria-hidden
          ref="flagDropDownButton" // eslint-disable-line
          className={flagViewClasses}
          onKeyDown={this.handleKeydown}
        >
          <div
            aria-hidden
            ref="selectedFlag" // eslint-disable-line
            onClick={this.handleFlagDropdownClick}
            className="selected-flag"
            title={`${this.state.selectedCountry.name}: + ${this.state.selectedCountry.dialCode}`}
          >
            <div className={inputFlagClasses}>
              <div className={arrowClasses} />
            </div>
          </div>
          {this.state.showDropDown ? this.getCountryDropDownList() : ''}
        </div>
      </div>
    );
  }
}
ReactPhoneInput.prototype._searchCountry = memoize(function (queryString) {
  if (!queryString || queryString.length === 0) {
    return null;
  }
  // don't include the preferred countries in search
  const probableCountries = filter(this.state.onlyCountries, (country) => {
    return startsWith(country.name.toLowerCase(), queryString.toLowerCase());
  }, this);
  return probableCountries[0];
});

ReactPhoneInput.prototype.guessSelectedCountry = memoize(function (inputNumber, onlyCountries, defaultCountry) {
  const secondBestGuess = find(allCountries, { iso2: defaultCountry }) || onlyCountries[0];
  let bestGuess;
  if (trim(inputNumber) !== '') {
    bestGuess = reduce(onlyCountries, (selectedCountry, country) => {
      if (startsWith(inputNumber, country.dialCode)) {
        if (country.dialCode.length > selectedCountry.dialCode.length) {
          return country;
        }
        if (country.dialCode.length === selectedCountry.dialCode.length
          && country.priority < selectedCountry.priority) {
          return country;
        }
      }

      return selectedCountry;
    }, { dialCode: '', priority: 10001 }, this);
  } else {
    return secondBestGuess;
  }

  if (!bestGuess.name) {
    return secondBestGuess;
  }

  return bestGuess;
});

ReactPhoneInput.defaultProps = {
  value: '',
  autoFormat: true,
  onlyCountries: [],
  excludeCountries: [],
  defaultCountry: 'ru',
  isValid: isNumberValid,
  onEnterKeyPress() {},
  placeholder: '+7 000 000 00 00',
  preferredCountries: [],
  onChange: null,
  onFocus: null,
  onClick: null,
  onKeyDown: null,
};

ReactPhoneInput.propTypes = {
  value: PropTypes.string,
  autoFormat: PropTypes.bool,
  defaultCountry: PropTypes.string,
  onlyCountries: PropTypes.arrayOf(PropTypes.string),
  preferredCountries: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  isValid: PropTypes.func,
  onEnterKeyPress: PropTypes.func,
  excludeCountries: PropTypes.array,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
};

export default ReactPhoneInput;
