import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { Card, CardBlock, Button } from 'react-bootstrap';
import Form from 'lsk-general/General/Form';
import Component from 'lsk-general/General/Component';
import { autobind } from 'core-decorators';

export default ctx => (

  @observer
  class PostEdit extends Component {
    static propTypes = {
      post: PropTypes.object.isRequired,
    };
    @autobind
    async handleSubmit(data) {
      const { post } = this.props;
      await post.edit(data);
      this.redirect(`/cabinet/posts/${post._id}`);
    }
    render() {
      const { post } = this.props;
      const fields = [
        {
          name: 'content',
          value: post.content,
          control: {
            placeholder: 'Контент поста',
          },
        },
        {
          name: 'category',
          value: post.category,
          control: {
            placeholder: 'Категория поста',
          },
        },
      ];
      return (
        <Card>
          <CardBlock>
            <Form
              fields={fields}
              validators={{
                content: {
                  presence: {
                    message: 'Поле не должно быть пустым.',
                  },
                },
                category: {
                  presence: {
                    message: 'Поле не должно быть пустым.',
                  },
                },
              }}
              onSubmit={this.handleSubmit}
              submitButton={(
                <Button
                  type="submit"
                  bsStyle="primary"
                  style={{
                    position: 'relative',
                  }}
                >
                  Сохранить
                </Button>
              )}
            />
          </CardBlock>
        </Card>
      );
    }
  }

);
