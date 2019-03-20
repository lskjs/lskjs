import { withFormik } from 'formik';
import createCreateForm from './createForm/createCreateForm';
import OnChangeListener from './OnChangeListener';
import onError from './createForm/onError';
import FormGroup from './FormGroup';

export default createCreateForm({
  OnChangeListener,
  FormGroup,
  withFormik,
  onError,
});


// Form.create({
//   View,
//   controls,
//   ....
// })

// ///

// const createForm = Form.createCreator({
//   // OnChangeListener,
//   withFormik,
//   onError,
//   inject: ['i18', 'some'],
// });

// const ViewForm = createForm({
//   View,
//   controls,
//   ....
// })

// ///

// const createForm = Form.createCreator({  
//   withFormik,
//   inject: ['i18', 'some'],
// })({
//   View,
//   controls,
//   ....
// })



