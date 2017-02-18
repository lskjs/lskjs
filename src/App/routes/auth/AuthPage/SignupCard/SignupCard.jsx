import React, { Component } from 'react';
import {
  Card,
  CardBlock,
  CardText,
  Button,
} from 'reactstrap';
import Link from 'lsk-general/General/Link';

export default class SignupCard extends Component {
  render() {
    return (
      <Card>
        <CardBlock className="text-xs-center">
          <CardText>Если у вас нет аккаунта,<br />вы можете зарегистрироваться.</CardText>
          <Button
            color="success"
            href="/signup"
            tag={Link}
            outline
            block
          >
            Зарегистрироваться
          </Button>
        </CardBlock>
      </Card>
    );
  }
}
