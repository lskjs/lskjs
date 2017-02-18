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
import FormCard from '~/App/components/FormCard';



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
    const teams = [
      'team1',
      'team2',
      'team3',
      'team4',
      'team5',
      'team6',
      'team7',
    ]
    const fields = [
      {
        icon: <Icons.profileInfo />,
        placeholder: 'Имя',
        path: 'info.firstname',
      },
      {
        icon: <Icons.profileInfo />,
        placeholder: 'Фамилия',
        path: 'info.lastname',
      },
      {
        icon: <Icons.phone />,
        placeholder: 'Контактный телефон',
        path: 'contacts.phone',
      },
      {
        icon: <Icons.email />,
        placeholder: 'Контактный Email',
        path: 'contacts.email',
      },
      {
        icon: <Icons.profileInfo />,
        placeholder: 'Профиль ВКонтакте',
        path: 'contacts.vk',
      },
      {
        icon: <Icons.profileInfo />,
        placeholder: 'Аккаунт Telegram',
        path: 'contacts.telegram',
      },
      {
        icon: <Icons.profileInfo />,
        placeholder: 'Аватар URL',
        path: 'info.avatar',
      },
      {
        icon: <Icons.profileInfo />,
        placeholder: 'Фото URL',
        path: 'info.photo',
      },
      !this.props.user.isVip() ? null : {
        icon: <Icons.profileInfo />,
        placeholder: 'Команда',
        path: 'info.team',
        teams,
        component: item => <div>
          <InputGroup>
            <InputGroup.Addon>
              {item.icon}
            </InputGroup.Addon>
            <FormControl
              componentClass="select"
              placeholder={item.placeholder}
              value={this.getStatePath('data.' + item.path) || ''}
              onChange={this.handleChangeField('data.' + item.path)}
              // onChange={(e) => {console.log('onChange', e, e.target);} }
            >
              { _.map(item.teams, (team) => {
                return <option value={team}>
                  {team}
                </option>
              }) }
              {/* <option value="select">select2</option>
              <option value="select">select3</option>
              <option value="select">select4</option>
              <option value="other">...</option> */}
            </FormControl>
          </InputGroup>
          <FormControl.Feedback />
        </div>
      },
      {
        icon: <Icons.profileInfo />,
        placeholder: 'Навыки (через запятую)',
        path: 'info.skills',
      },
      {
        icon: <Icons.profileInfo />,
        placeholder: 'О себе',
        path: 'info.about',
      },
      // {
      //   icon: <Icons.profileInfo />,
      //   placeholder: 'Аватар',
      //   path: 'info.avatar',
      //   component: item => <div>
      //     <InputGroup>
      //       <InputGroup.Addon>
      //         {item.icon}
      //       </InputGroup.Addon>
      //       <FormControl
      //         componentClass="select"
      //         placeholder={item.placeholder}
      //         value={this.getStatePath('data.' + item.path) || ''}
      //         onChange={this.handleChangeField('data.' + item.path)}
      //         // onChange={(e) => {console.log('onChange', e, e.target);} }
      //       >
      //         { _.map(item.teams, (team) => {
      //           return <option value={team}>
      //             {team}
      //           </option>
      //         }) }
      //         {/* <option value="select">select2</option>
      //         <option value="select">select3</option>
      //         <option value="select">select4</option>
      //         <option value="other">...</option> */}
      //       </FormControl>
      //     </InputGroup>
      //     <FormControl.Feedback />
      //   </div>
      // },
    ].filter(u => !!u)
    return (
      <div>
        <Card wrap title='Редактирование профиля'>
          <form onSubmit={this.handleSubmit}>
            <For each="item" index="idx" of={fields}>
              <FormGroup
                // controlId="formBasicText"
                // validationState='success'
              >
                <If condition={item.component}>
                  {item.component(item)}
                  {/* <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Select</ControlLabel>
                    <FormControl componentClass="select" placeholder="select">
                      <option value="select">select</option>
                      <option value="other">...</option>
                    </FormControl>
                  </FormGroup> */}

                </If>
                <If condition={!item.component}>
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
                </If>
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
