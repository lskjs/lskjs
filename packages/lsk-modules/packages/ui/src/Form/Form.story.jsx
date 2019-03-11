import React from 'react';
import Form from './Form';
import Story from '../Story';

const value = {
  email: 'hi@coder24.ru',
  profile: {
    fio: 'Суворов Игорь Александрович',
    age: 10,
    bdate: '1990-02-15',
  },
};

const value2 = {
  firstname: 'Игорь',
  lastname: 'Суворов',
  age: 21,
};

export default ({ storiesOf, action }) => {
  return storiesOf('Form', module)
    .addHtml(<link rel="stylesheet" type="text/css" href="http://yastatic.net/bootstrap/3.3.6/css/bootstrap.min.css" />)
    .add('Fields as strings', () => (
      <Story>
        <Form
          fields={[
            'firstname',
            'lastname',
          ].map(name => ({ name, title: name }))}
          onChange={action('onChange')}
          onSubmit={action('onSubmit')}
        />
      </Story>
    ))
    .add('Fields as objects', () => (
      <Story>
        <Form
          fields={[
            {
              name: 'firstname',
              title: 'Имя',
            },
            {
              name: 'lastname',
              title: 'Фамилия',
            },
          ]}
          onChange={action('onChange')}
          onSubmit={action('onSubmit')}
        />
      </Story>
    ))
    .add('Separated fields structure and state', () => (
      <Story>
        <Form
          fields={[
            {
              name: 'firstname',
              title: 'Имя',
            },
            {
              name: 'lastname',
              title: 'Фамилия',
            },
            {
              name: 'profile.age',
              title: 'Возраст',
            },
          ]}
          value={{
            firstname: 'Игорь',
            lastname: 'Суворов',
            profile: {
              age: '20',
            },
          }}
          onChange={action('onChange')}
          onSubmit={action('onSubmit')}
        />
      </Story>
    ))
    .add('Icons and placeholder', () => (
      <Story>
        <Form
          fields={[
            {
              name: 'firstname',
              title: 'Имя',
              icon: 'И',
              control: {
                placeholder: 'Например, Василий',
              },
            },
            {
              name: 'lastname',
              title: 'Фамилия',
              icon: 'Ф',
              control: {
                placeholder: 'Например, Уткин',
              },
              help: 'Фамилия и отчество (если есть)',
            },
          ]}
          onChange={action('onChange')}
          onSubmit={action('onSubmit')}
        />
      </Story>
    ))
    .add('With default value', () => (
      <Story>
        <Form
          fields={[
            {
              name: 'firstname',
              title: 'Имя',
              value: 'Игорь',
            },
            {
              name: 'lastname',
              title: 'Фамилия',
              value: 'Суворов',
            },
          ]}
          onChange={action('onChange')}
          onSubmit={action('onSubmit')}
        />
      </Story>
    ))
    .add('Deep (with dot) data', () => (
      <Story>
        <Form
          fields={[
            {
              name: 'name.firstname',
              title: 'Имя',
              value: 'Игорь',
            },
            {
              name: 'name.lastname',
              title: 'Фамилия',
              value: 'Суворов',
            },
          ]}
          onChange={action('onChange')}
          onSubmit={action('onSubmit')}
        />
      </Story>
    ))
    .add('Custom formControl props', () => (
      <Story>
        <Form
          fields={[
            {
              name: 'email',
              title: 'Email',
              control: {
                placeholder: 'Например, utkin@mail.ru',
                type: 'email',
              },
            },
            {
              name: 'password',
              title: 'Пароль',
              control: {
                type: 'password',
              },
            },
            {
              name: 'profile.fio',
              title: 'ФИО',
              control: {
                placeholder: 'Например, Василий',
              },
            },
            {
              name: 'profile.age',
              title: 'Возраст',
              control: {
                placeholder: 'Например, 55',
                type: 'number',
              },
            },
          ]}
          onChange={action('onChange')}
          onSubmit={action('onSubmit')}
        />
      </Story>
    ))
    .add('External state data and formats', () => (
      <Story>
        <Form
          value={value}
          fields={[
            {
              name: 'email',
              title: 'Email',
              control: {
                placeholder: 'Например, utkin@mail.ru',
                type: 'email',
              },
            },
            {
              name: 'password',
              title: 'Пароль',
              control: {
                type: 'password',
              },
            },
            {
              name: 'profile.fio',
              title: 'ФИО',
              control: {
                placeholder: 'Например, Василий',
              },
            },
            {
              name: 'profile.age',
              title: 'Стаж',
              format: Number,
              control: {
                placeholder: 'Например, 55',
                type: 'number',
              },
            },
            {
              name: 'profile.bdate',
              title: 'Дата рождения',
              format: Date,
              control: {
                placeholder: 'Например, 14.02.1991',
                type: 'date',
              },
            },
          ]}
          onChange={action('onChange')}
          onSubmit={action('onSubmit')}
        />
      </Story>
    ))
    .add('Add validators', () => (
      <Story>
        <Form
          validators={{
            email: {
              presence: {
                message: 'Поле не должно быть пустым',
              },
              email: {
                message: 'Введите настоящий адрес почты.',
              },
            },
            password: {
              presence: {
                message: 'Поле не должно быть пустым',
              },
              length: {
                minimum: 6,
                message: 'Пароль должен быть больше 6 символов.',
              },
            },
          }}
          fields={[
            {
              name: 'email',
              title: 'Электронная почта',
              icon: 'Э',
              control: {
                type: 'text',
                placeholder: 'Почта',
              },
            },
            {
              name: 'password',
              title: 'Пароль',
              icon: 'П',
              control: {
                type: 'password',
                placeholder: 'Пароль',
              },
            },
          ]}
          onChange={action('onChange')}
          onSubmit={action('onSubmit')}
          onError={action('onError')}
        />
      </Story>
    ))
    .add('Add validators v2', () => (
      <Story>
        <Form
          fields={[
            {
              name: 'email',
              title: 'Электронная почта',
              icon: 'Э',
              validator: {
                presence: {
                  message: 'Поле не должно быть пустым',
                },
                email: {
                  message: 'Введите настоящий адрес почты.',
                },
              },
              control: {
                type: 'text',
                placeholder: 'Почта',
              },
            },
            {
              name: 'password',
              title: 'Пароль',
              icon: 'П',
              validator: {
                presence: {
                  message: 'Поле не должно быть пустым',
                },
                length: {
                  minimum: 6,
                  message: 'Пароль должен быть больше 6 символов.',
                },
              },
              control: {
                type: 'password',
                placeholder: 'Пароль',
              },
            },
          ]}
          onChange={action('onChange')}
          onSubmit={action('onSubmit')}
          onError={action('onError')}
        />
      </Story>
    ))
    .add('Async validator', () => {
      Form.validate.validators.asyncValidator = function (value) {
        return new Form.validate.Promise(((resolve, reject) => {
          // console.log('@@@@@');
          setTimeout(() => {
            if (value === 'foo') resolve();
            else resolve('is not foo');
          }, 1000);
        }));
      };
      return (
        <Story>
          <Form
            fields={[
              {
                name: 'email',
                title: 'Электронная почта',
                icon: 'Э',
                validator: {
                  // asyncValidator: true,
                  presence: {
                    message: 'Поле не должно быть пустым',
                  },
                  email: {
                    message: 'Введите настоящий адрес почты.',
                  },
                },
                control: {
                  type: 'text',
                  placeholder: 'Почта',
                },
              },
              {
                name: 'password',
                title: 'Пароль',
                icon: 'П',
                validator: {
                  // asyncValidator: true,
                  presence: {
                    message: 'Поле не должно быть пустым',
                  },
                  length: {
                    minimum: 6,
                    message: 'Пароль должен быть больше 6 символов.',
                  },
                },
                control: {
                  type: 'password',
                  placeholder: 'Пароль',
                },
              },
              {
                name: 'foo',
                title: 'Foo',
                icon: 'F',
                validator: {
                  asyncValidator: true,
                },
                control: {
                  type: 'password',
                  placeholder: 'Пароль',
                },
              },
            ]}
            onChange={action('onChange')}
            onSubmit={action('onSubmit')}
            onError={action('onError')}
          />
        </Story>
      );
    })
    .add('Control types', () => (
      <Story>
        <Form
          fields={[
            {
              name: 'input',
              value: 'input',
              control: {
                placeholder: 'placeholder',
              },
            },
            {
              name: 'inputPassword',
              value: 'inputPassword',
              control: {
                type: 'password',
                placeholder: 'placeholder',
              },
            },
            {
              name: 'textarea',
              value: 'defaultTextarea',
              control: {
                type: 'text',
                componentClass: 'textarea',
                placeholder: 'placeholder',
              },
            },
            {
              name: 'checkbox',
              value: 'defaultTextarea',
              control: {
                type: 'text',
                componentClass: 'textarea',
                placeholder: 'placeholder',
              },
            },

          ]}
          onChange={action('onChange')}
          onSubmit={action('onSubmit')}
          onError={action('onError')}
        />
      </Story>
    ))
    .add('Sample Signup', () => (
      <Story>
        <Form
          fields={[
            {
              name: 'email',
              title: 'Email',
              control: {
                placeholder: 'Например, utkin@mail.ru',
                type: 'email',
              },
            },
            {
              name: 'password',
              title: 'Пароль',
              control: {
                type: 'password',
              },
            },
            {
              name: 'name',
              title: 'Имя',
              control: {
                placeholder: 'Например, Василий',
              },
            },
          ]}
          submitButton="Регистрация"
          onChange={action('onChange')}
          onSubmit={action('onSubmit')}
        />
      </Story>
    ))
    .add('Sample Login', () => (
      <Story>
        <Form
          fields={[
            {
              name: 'email',
              title: 'Email',
              control: {
                placeholder: 'Например, utkin@mail.ru',
                type: 'email',
              },
            },
            {
              name: 'password',
              title: 'Пароль',
              control: {
                type: 'password',
              },
              help: (
                <div style={{ textAlign: 'right' }}>
                  <a href="#">
                    Забыли пароль?
                  </a>
                </div>
              ),
            },
          ]}
          submitButton="Войти"
          onChange={action('onChange')}
          onSubmit={action('onSubmit')}
        />
      </Story>
    ))
    .add('value vs defaultValue', () => {
      const props = {
        fields: [
          {
            name: 'firstname',
            title: 'Имя',
          },
          {
            name: 'lastname',
            title: 'Фамилия',
          },
          {
            name: 'age',
            title: 'Возраст',
          },
        ],
        onChange: action('onChange'),
        onSubmit: action('onSubmit'),
      };
      class Wrapper extends React.Component {
        constructor() {
          super();
          this.state = {
            age: value2.age || 0,
          };
        }
        render() {
          return (
            <div>
              <button onClick={() => this.setState({ age: this.state.age + 1 })}>
                age={this.state.age}
              </button>
              <table>
                <tr>
                  <th>
                    value
                  </th>
                  <th>
                    defaultValue
                  </th>
                </tr>
                <tr>
                  <td>
                    <Form
                      {...props}
                      value={{
                        ...value2,
                        ...this.state,
                      }}
                    />
                  </td>
                  <td>
                    <Form
                      {...props}
                      defaultValue={{
                        ...value2,
                        ...this.state,
                      }}
                    />
                  </td>
                </tr>
              </table>
            </div>
          );
        }
      }
      return <Wrapper />;
    });
};
