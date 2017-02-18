import { Component } from 'react'
import { inject, observer } from 'mobx-react'
import A from '../../A'
import Container from '../Container'

@inject('user')
@observer
export default class TopNavbar extends Component {
  componentDidMount() {
    this.props.user.update()
  }
  render() {
    return (
      <section className="top-navbar" style={{paddingLeft: 176}}>
        {/* <Container> */}
          <div className="title">{this.props.title}</div>
          <div className="tn-right">
            {this.props.navbar}
            <If condition={this.props.user.user2}>
              <A href="/cabinet/profile">
                <img src={this.props.user.getAvatar()} className="tn-avatar" style={{width:40, height: 40}} />
              </A>
            </If>
            {/* <button className="tnr-bell new"/> */}
            <A href="/auth/logout">
              <button className="tnr-login" />
            </A>
          </div>
        {/* </Container> */}
      </section>
    );
  }
}
