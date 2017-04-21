import React, { Component } from 'react';
import { inject } from 'mobx-react';
import _ from 'lodash';
import {
  Card,
  CardBlock,
  FormControl,
} from 'react-bootstrap';

@inject('user', 'api')
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  handleOnChange() {
    return (e) => {
      const { value } = e.target;
      this.setState({ text: value });
    };
  }
  render() {
    return (
      <div>
        {JSON.stringify(this.state)}
      </div>
    );
  }
}
