import React, { Component } from 'react'
import Container from './Container'
import LeftNavbar from './LeftNavbar'
import TopNavbar from './TopNavbar'
import BottomNavbar from './BottomNavbar'


export default class Cabinet extends Component {
  render() {
    return <div className="root-content">
      <LeftNavbar />
      <div className="main-wrapper">
        <TopNavbar title={this.props.title} />
        <section className="content-wrapper">
          <Container>
            {this.props.children}
          </Container>
        </section>
      </div>
      {/* <BottomNavbar /> */}
    </div>
  }
}
