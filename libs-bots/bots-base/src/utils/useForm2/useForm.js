import formMode from './form';

const { steps, createForm } = formMode;

export const useForm = async function (props) {
  const { i18, req, onChange = () => null, onSubmit, preview = true, mode = 'form', ...formSchema2 } = props;
  let { autosubmit } = props;
  const { action = 'init', values = {} } = req.query;

  if (mode === 'form') {
    // eslint-disable-next-line no-param-reassign
    if (!preview) autosubmit = true;

    const form = createForm({
      ...formSchema2,
      i18,
      initialValues: values,
    });
    if (steps[action]) {
      return steps[action]({ req, form, onSubmit, onChange, preview, autosubmit });
    }
    req.log.error('!action', action);
    return false;
  }

  if (mode === 'dialog') {
    return req.ctx.reply('Режим живого диалога пока в разработке :c');
  }
  return false;
};

export default useForm;
