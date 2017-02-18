import { Component } from 'react'
import Card from '..//Card'
import A from '../A'

export default class SignupCard extends Component {
  render() {
    return (
      <Card wrap>
        <div className='text-center'>
          Вы еше не зарегистрированы?
          &nbsp;
          <A href='/auth/signup'>
             Создайте аккаунт
          </A>
        </div>
      </Card>
    );
  }
}
