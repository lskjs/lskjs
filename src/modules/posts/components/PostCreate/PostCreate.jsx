import React  from 'react';
import { Card, CardBlock, Button } from 'react-bootstrap';
import Form from 'lsk-general/General/Form';
import Component from 'lsk-general/General/Component';
import { autobind } from 'core-decorators';

export default ctx => (

  class PostCreate extends Component {
    @autobind
    async handleSubmit(body) {
      const { data } = await ctx.api.fetch('/api/module/posts/create', {
        method: 'POST',
        body,
      });
      this.redirect(`/cabinet/posts/${data._id}`);
    }
    render() {
      const fields = [
        {
          name: 'content',
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
                  Создать
                </Button>
              )}
            />
          </CardBlock>
        </Card>
      );
    }
  }

);
