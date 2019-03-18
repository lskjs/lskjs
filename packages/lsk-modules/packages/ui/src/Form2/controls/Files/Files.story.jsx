import React from 'react';
import { Form, Field } from 'formik';
import Story from '../../../Story';
import createForm from '../../createForm';
import Files from './Files';
import FormDebug from '../../FormDebug';
import Body from '../Image/DefaultBody';

const FilesFormView = props => (
  <Form>
    <Field {...props.control('files')} />
    <Field {...props.control('files2')} />
    <Field {...props.control('files2')} />
    <FormDebug {...props} />
  </Form>
);

const FilesForm = createForm({
  view: FilesFormView,
  controls: {
    files: {
      title: 'Files',
      component: Files,
      isMulti: true,
    },
    files2: {
      title: 'Files custom',
      component: Files,
      isMulti: true,
      type: 'image',
      components: {
        Body,
      },
    },
    files3: {
      title: 'Files',
      component: Files,
      isMulti: true,
    },
  },
});

export default ({ storiesOf }) =>
  storiesOf('Form2/controls', module)
    .add('Files ', () => {
      return (
        <Story>
          <FilesForm
            initialValues={{
              files: [
                'https://pp.userapi.com/c636819/v636819936/346c3/6xIvJ0BI8rs.jpg',
                'https://picsum.photos/300/200',
              ],
              files3: [
                'https://pp.userapi.com/c636819/v636819936/346c3/6xIvJ0BI8rs.jpg',
                'https://picsum.photos/300/200',
              ],
            }}
          />
        </Story>
      );
    });
