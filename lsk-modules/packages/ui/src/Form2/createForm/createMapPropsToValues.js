import set from 'lodash/set';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import DEBUG from './_debug';

export default ({ controls }) => (props) => {
  if (DEBUG) console.log('Form2 mapPropsToValues', props, controls ); // eslint-disable-line

  const { initialValues } = props;
  const defaultValues = cloneDeep(initialValues) || {};
  Object.keys(controls).forEach((key) => {
    if (typeof get(defaultValues, key) !== 'undefined') return;
    if (controls[key].key) return;

    let initialValue = get(controls, `${key}.initialValue`);
    if (initialValue === 'undefined') {
      initialValue = get(controls, `${key}.defaultValue`);
      if (initialValue === 'undefined') return;
    }
    set(defaultValues, key, initialValue);
  });

  if (DEBUG) console.log('Form2 mapPropsToValues', initialValues, ' => ', defaultValues ); // eslint-disable-line
  return defaultValues;
};
