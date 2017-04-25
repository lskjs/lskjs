import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { Card, CardBlock, Button } from 'react-bootstrap';
import Link from 'lsk-general/General/Link';
import Component from 'lsk-general/General/Component';
import { autobind } from 'core-decorators';

export default ctx => (

  @observer
  class Post extends Component {
    static propTypes = {
      post: PropTypes.object.isRequired,
    };
    @autobind
    async handleDelete() {
      await this.props.post.remove();
      this.redirect('/cabinet/posts');
    }
    render() {
      const { post } = this.props;
      return (
        <Card>
          <CardBlock>
            <h1>{post.user.fullName}</h1>
            <hr />
            <strong>{post._id}</strong>
            <p>{post.content}</p>
            <br />
            <Button componentClass={Link} href={`/cabinet/posts/${post._id}/edit`} bsStyle="warning">Редактировать</Button>
            <Button bsStyle="danger" onClick={this.handleDelete}>Удалить</Button>
          </CardBlock>
        </Card>
      );
    }
  }

);
