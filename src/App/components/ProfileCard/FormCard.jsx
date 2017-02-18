import { Component } from 'react'
import { autobind } from 'core-decorators'
import _ from 'lodash'

export default class FormCard extends Component {
  constructor(props) {
    super()
    this.state = {
      data: props.data,
    }
  }

  @autobind
  validate() {
    return true
  }

  @autobind
  getData() {
    return this.state.data
  }

  @autobind
  async handleSubmit(e) {
    if (!this.props.onSubmit) return true
    e.preventDefault();
    if (!this.validate()) {
      alert('Validation error')
      return;
    }
    return this.props.onSubmit && this.props.onSubmit(this.getData())
  }


  getStatePath(path) {
    return _.get(this.state, path)
  }

  setStatePath(path, value) {
    // console.log(111);
    const state = _.cloneDeep(this.state)
    // console.log(222);
    _.set(state, path, value)
    // console.log('2', state);
    this.setState(state)
    // console.log(555);
  }

  handleChangeField(path) {
    return (e) => {
      this.setStatePath(path, e.target.value)
      // console.log(666);
      // console.log('state', this.state);
      this.props.onChange && this.props.onChange(this.getData())
      // console.log(777);
    }
  }
}
