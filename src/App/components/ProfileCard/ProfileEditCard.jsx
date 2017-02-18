import { PropTypes } from 'react'
import { inject, observer } from 'mobx-react'
import { autobind } from 'core-decorators'
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  ControlLabel,
  InputGroup,
  HelpBlock
} from 'react-bootstrap'
import Icons from '../Icons'
import Card from '../Card'
import A from '../A'
import LoginCard from '../LoginCard'
import FormCard from './FormCard';

// @inject("user")
// @observer
export default class ProfileEditCard extends FormCard {
  static contextTypes = {
    history: PropTypes.object.isRequired,
  };

  @autobind
  async handleSubmit(e) {

    // errors: [
    //   profile.firstname: {
    //     type: 'Letter 8',
    //     message: 'asdasfghfgjf hfghgf h',
    //   }
    // ]
    // data : {
    //   email:'asdas',
    //   username: "asdasd",
    //   profile: {
    //   firstname:
    // }
    //
    // }
    this.setState({
      status: 'wait',
    })
    return super.handleSubmit(e)
    .then(() => {
      this.setState({
        status: 'ok',
      })
      // this.context.history.push('/cabinet')
      window.location = '/cabinet'
    })
    .catch((err) => {
      this.setState({
        status: 'error',
      })
    })
  }
  render() {
    const fields = [
      {
        // icon: <Icons.lock />,
        placeholder: 'Имя',
        path: 'info.firstname',
      },
      {
        // icon: <Icons.lock />,
        placeholder: 'Фамилия',
        path: 'info.lastname',
      },
      {
        // icon: <Icons.lock />,
        placeholder: 'Контактный телефон',
        path: 'contacts.phone',
      },
      {
        // icon: <Icons.lock />,
        placeholder: 'Контактный Email',
        path: 'contacts.email',
      },
      {
        // icon: <Icons.lock />,
        placeholder: 'Профиль ВКонтакте',
        path: 'contacts.vk',
      },
      {
        // icon: <Icons.lock />,
        placeholder: 'Аккаунт Telegram',
        path: 'contacts.telegram',
      },
      {
        // icon: <Icons.lock />,
        placeholder: 'Навыки (через запятую)',
        path: 'info.skills',
      },
      {
        // icon: <Icons.lock />,
        placeholder: 'О себе',
        path: 'info.about',
      },
    ]
    return (
      <div>
        <Card wrap title='Редактирование профиля'>
          <form onSubmit={this.handleSubmit}>
            <For each="item" index="idx" of={fields}>
              <FormGroup
                controlId="formBasicText"
                // validationState='success'
              >
                <InputGroup>
                  <InputGroup.Addon>
                    {item.icon}
                  </InputGroup.Addon>
                  <FormControl
                    type="text"
                    placeholder={item.placeholder}
                    value={this.getStatePath('data.' + item.path) || ''}
                    onChange={this.handleChangeField('data.' + item.path)}
                  />
                  {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
                </InputGroup>
                <FormControl.Feedback />
                {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
              </FormGroup>
            </For>
            <Button bsStyle='primary' block type='submit'>
              <If condition={this.state.status === 'wait'}>
                <Icons.loading />
              </If>
              Сохранить
            </Button>
          </form>
        </Card>
      </div>
    );
  }
}
