import cloneDeep from 'lodash/cloneDeep';
import sortBy from 'lodash/sortBy';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isBoolean from 'lodash/isBoolean';
import omit from 'lodash/omit';

const NULL_STRING = '@@NULL@@';

const isSimple = str => isString(str) || isNumber(str) || isBoolean(str);

export const getReverseOptionValue = value => ((value === NULL_STRING) ? null : value);
export const getOptionValue = value => ((value == null) ? NULL_STRING : value);
export const getOptionTitle = option => option.label || option.title || option.value;
export const getNormalizedOptions = (options = [], props = {}) => {
  let preOptions = [];
  if (options) {
    preOptions = cloneDeep(options).map(option => (isSimple(option) ? { value: option } : option));
    if (props.sortOptions) {
      preOptions = sortBy(preOptions, getOptionTitle);
    }

    if (props.nullOption) {
      const option = isPlainObject(props.nullOption) ? props.nullOption : {};
      // if (!option.title) option.title = t && t('form.nullOption');
      if (!option.value) option.value = null;
      preOptions.unshift(option);
    }
    // console.log({ preOptions });
    // console.log('field.options', field.options, field);
  }
  const { optionProps = {} } = props;

  return preOptions.map(option => ({
    ...optionProps,
    ...omit(option, ['value', 'title', 'label']),
    label: getOptionTitle(option),
    value: getOptionValue(option.value),
  }));
};
