import { Component } from 'react'
import { Grid } from 'react-bootstrap'

export default class Container extends Component {
  render() {
    return <Grid style={{paddingLeft:143, minWidth: 1233, paddingTop: 20}}>
      {this.props.children}
    </Grid>
  }
}
