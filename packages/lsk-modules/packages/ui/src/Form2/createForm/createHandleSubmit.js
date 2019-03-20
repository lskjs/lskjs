import avoidNestedFields from './avoidNestedFields';
import getError from '../../utils/getError';
import DEBUG from './_debug';


export default ({ flatten }) => async (values, props2) => {
  const {
    setSubmitting, props, setStatus, setFieldError, status, isSubmitting,
  } = props2;
  const { onSubmit } = props;
  if (DEBUG) console.log('Form2 handleSubmit', { status, isSubmitting }); // eslint-disable-line

  // console.log({status, isSubmitting});

  if (!isSubmitting) {
    setStatus('progress');
    try {
      if (values && flatten) values = avoidNestedFields(values);
      if (onSubmit) await onSubmit(values, props2);
      setStatus('success');
    } catch (err) {
      setFieldError('onSubmit', getError(err).message);
      setStatus('error');
    }
    setSubmitting(false);
    setTimeout(() => {
      setStatus(null);
    }, 1000);
  } else {
    console.log('STRANGE!!!!!!!');
  }
};
