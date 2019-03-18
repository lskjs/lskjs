import React from 'react';
import QueueAnim from 'rc-queue-anim';
import range from 'lodash/range';
import Story from '../Story';
import { Container, Row, Col } from '../Grid';
import BlogCard from '../UI/molecules/BlogCard';
import Incrementator from './Incrementator';


export default ({ storiesOf }) => (
  storiesOf('_cases', module)
    .add('show-animation with', () => (
      <Story>
        <Container>
          {/* <Row vertical> */}
          <QueueAnim
            type="bottom"
            delay={100}
            duration={300}
            component={Row}
            componentProps={{ vertical: true }}
          >
            {range(30).map(i => (
              <Col key={i} md={3}>
                <BlogCard
                  {...{
                    img: 'http://iarouse.com/dist-react-ant-design/v1.1.4/assets/images-demo/assets/600_400-1.jpg',
                    date: 'May 1st',
                    title: `Be Yourself ${i}`,
                    content: 'Be yourself; everyone else is already taken.',
                    tag: 'Quotes',
                    author: 'Oscar Wilde',
                  }}
                />
              </Col>
            ))}
          </QueueAnim>
          {/* </Row> */}
        </Container>
      </Story>
    ))
    .add('show-animation without', () => (
      <Story>
        <Container>
          <Row vertical>
            {range(30).map(i => (
              <Col key={i} md={3}>
                <BlogCard
                  {...{
                    img: 'http://iarouse.com/dist-react-ant-design/v1.1.4/assets/images-demo/assets/600_400-1.jpg',
                    date: 'May 1st',
                    title: `Be Yourself ${i}`,
                    content: 'Be yourself; everyone else is already taken.',
                    tag: 'Quotes',
                    author: 'Oscar Wilde',
                  }}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </Story>
    ))
    .add('show-animation-2', () => (
      <Story>
        <Incrementator count={10}>
          {count => (
            <Container>
              <QueueAnim
                type="bottom"
                delay={100}
                duration={300}
                component={Row}
                componentProps={{ vertical: true }}
              >
                {range(count).map(i => (
                  <Col key={i} md={3}>
                    <BlogCard
                      {...{
                        img: 'http://iarouse.com/dist-react-ant-design/v1.1.4/assets/images-demo/assets/600_400-1.jpg',
                        date: 'May 1st',
                        title: `Be Yourself ${i}`,
                        content: 'Be yourself; everyone else is already taken.',
                        tag: 'Quotes',
                        author: 'Oscar Wilde',
                      }}
                    />
                  </Col>
                ))}
              </QueueAnim>
            </Container>
          )}
        </Incrementator>
      </Story>
    ))
    .add('show-animation-3', () => (
      <Story>
        <Container>
          <Row vertical>
            {range(20).map(i => (
              <Col key={i} md={3}>
                <BlogCard
                  {...{
                    img: 'http://iarouse.com/dist-react-ant-design/v1.1.4/assets/images-demo/assets/600_400-1.jpg',
                    date: 'May 1st',
                    title: `Be Yourself ${i}`,
                    content: 'Be yourself; everyone else is already taken.',
                    tag: 'Quotes',
                    author: 'Oscar Wilde',
                  }}
                  // style={{ width: 280 }}
                />
              </Col>
            ))}

          </Row>
        </Container>
      </Story>
    ))
);
