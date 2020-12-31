import mapValues from 'lodash/mapValues';
import cloneDeep from 'lodash/cloneDeep';

export const createForm = ({ controls: initControls, initialValues = {}, fields: initFields, ...other }) => {
  const controls = mapValues(initControls, (control, name) => ({
    ...control,
    title: control.title || name,
    placeholder: control.placeholder || `Введите ${control.title || name}`,
    name,
  }));
  const fields = initFields || Object.keys(controls);
  const values = cloneDeep(initialValues);
  return {
    ...other,
    values,
    controls,
    fields,
    getValues() {
      return values;
    },
    getValue(name) {
      return values[name];
    },
    async isValidField(name, raw) {
      const control = controls[name];
      const value = control.format ? control.format(raw) : raw;
      if (!control.validate) return true;
      const res = control.validate(value);
      return res;
    },
    setFieldValue(name, raw) {
      const control = controls[name];
      const value = control.format ? control.format(raw) : raw;
      values[name] = value;
    },
  };
};

export default createForm;
