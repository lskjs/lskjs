import { Component } from 'react'
import Card from '..//Card'
import A from '../A'

export default class LoginCard extends Component {
  render() {
    return (
      <Card wrap>
        <div className='text-center'>
          Уже есть аккаунт?
          &nbsp;
          <A href='/auth/login'>
             Войти
          </A>
        </div>
      </Card>
    );
  }
}
