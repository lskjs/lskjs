import createForm from './createForm';
import injectObserver from '../utils/injectObserver';
import DEBUG from './createForm/_debug';

export default config => injectObserver(['i18', 'config', 'user'], (configParams) => {
  if (DEBUG) console.log('createFormWithI18 DEPRECATED createFormWithI18 DEPRECATED createFormWithI18 DEPRECATED createFormWithI18 DEPRECATED createFormWithI18 DEPRECATED createFormWithI18 DEPRECATED ');
  return createForm(config(configParams));
});

