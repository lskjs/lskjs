import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CSSModules from 'react-css-modules';

import s from './StoryWrapper.css';


class ButtonGroup extends Component {
  render() {
    return <span {...this.props} styleName='ButtonGroup'>{this.props.children}</span>
  }
}
ButtonGroup = withStyles(s)(
  CSSModules(s, {
    allowMultiple: true,
    errorWhenNotFound: false
  })(
    ButtonGroup
  )
)


class Button extends Component {
  render() {
    return <button {...this.props} styleName={'Button bsStyle_' + this.props.bsStyle}>{this.props.children}</button>
  }
}
Button = withStyles(s)(
  CSSModules(s, {
    allowMultiple: true,
    errorWhenNotFound: false
  })(
    Button
  )
)

class ButtonToolbar extends Component {
  render() {
    return <span {...this.props} styleName='ButtonToolbar'>{this.props.children}</span>
  }
}

export class StoryWrapper extends Component {
    constructor(props){
      super(props)
      this.state = {
        bg: 0,
        inner: 0,
        center: true
      }
    }
    setCenter(center) {
      return (e) => {
        this.setState({center})
      }
    }
    setInner(inner) {
      return (e) => {
        this.setState({inner})
      }
    }
    setBg(bg) {
      return (e) => {
        this.setState({bg})
      }
    }

    render() {
      const bgs = [
        '//mcheck.mgbeta.ru/images/bg3.jpg',
        '//pp.vk.me/c629529/v629529020/1dd4a/JjiHPoWVrMM.jpg',
        '//cdn.mgbeta.ru/frz/bg/bg1.jpg',
        '//cdn.mgbeta.ru/frz/bg/bg2.jpg',
        '//cdn.mgbeta.ru/frz/bg/bg3.jpg',
        '//cdn.mgbeta.ru/frz/bg/bg4.jpg',
        '//cdn.mgbeta.ru/frz/bg/bg5.jpg',
        '//cdn.mgbeta.ru/frz/bg/bg6.jpg',
        '',
      ]
      const inner = [
        'no',
        'w300',
        'w600',
        'w900',
        'w100',
        'padding',
      ]


      return <div styleName={'Wrapper Wrapper_inner_' + inner[this.state.inner] + (this.state.center ? ' Wrapper_center' : '')} style={{ background: 'url("https://pp.vk.me/c629529/v629529020/1dd4a/JjiHPoWVrMM.jpg") no-repeat center center fixed', height:'100%', backgroundSize: 'cover', backgroundImage: 'url(' + bgs[this.state.bg] + ')' }}>
        <link href='//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css' rel="stylesheet" />
        <link href='//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css' rel="stylesheet" />
        <div style={{position:'absolute', right: 0, top: 0}}>
          <ButtonToolbar>
            <ButtonGroup>
              <Button onClick={this.setCenter(!this.state.center)} bsStyle={this.state.center ?  'primary' : 'default'}>center</Button>
            </ButtonGroup>
              <ButtonGroup>
                { inner.map( (inner, i) =>
                  <Button key={i} onClick={this.setInner(i)} bsStyle={this.state.inner == i ?  'primary' : 'default'}>{inner}</Button>
                )}
              </ButtonGroup>
            <ButtonGroup>
              { bgs.map( (bg, i) =>
                <Button key={i} onClick={this.setBg(i)} bsStyle={this.state.bg == i ?  'primary' : 'default'}>{i + 1}</Button>
              )}
            </ButtonGroup>
          </ButtonToolbar>

        </div>
        <div styleName='Wrapper__wrap' >
          <div styleName='Wrapper__content' >
            {this.props.children}
          </div>
        </div>
      </div>
    }
}

export default withStyles(s)(
  CSSModules(s, {
    allowMultiple: true,
    errorWhenNotFound: false
  })(
    StoryWrapper
  )
)
