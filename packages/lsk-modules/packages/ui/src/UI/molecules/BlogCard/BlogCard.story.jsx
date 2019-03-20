import React from 'react';
import QueueAnim from 'rc-queue-anim';
import BlogCard from './BlogCard';
import { FlexItem, FlexContainer } from './BlogCard.styles';
import AnimatedLink from '../AnimatedLink';
import ThemeInjector from '../../../ThemeInjector';
import '../../../styles/lib/antd.g.css';

const articles = [
  {
    img: 'http://iarouse.com/dist-react-ant-design/v1.1.4/assets/images-demo/assets/600_400-1.jpg',
    date: 'May 1st',
    title: 'Be Yourself',
    content: 'Be yourself; everyone else is already taken.',
    tag: 'Quotes',
    author: 'Oscar Wilde',
  }, {
    img: 'http://iarouse.com/dist-react-ant-design/v1.1.4/assets/images-demo/assets/600_400-2.jpg',
    date: 'May 1st',
    title: "When You're in Love",
    content: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
    tag: 'Quotes',
    author: 'Dr. Seuss',
  }, {
    img: 'http://iarouse.com/dist-react-ant-design/v1.1.4/assets/images-demo/assets/600_400-3.jpg',
    date: 'May 1st',
    title: 'Once is Enough',
    content: 'You only live once, but if you do it right, once is enough.',
    tag: 'Quotes',
    author: 'Mae West',
  }, {
    img: 'http://iarouse.com/dist-react-ant-design/v1.1.4/assets/images-demo/assets/600_400-4.jpg',
    date: 'May 1st',
    title: 'Be the Change You Wish to See',
    content: 'Be the change that you wish to see in the world.',
    tag: 'Quotes',
    author: 'Mahatma Gandhi',
  }, {
    img: 'http://iarouse.com/dist-react-ant-design/v1.1.4/assets/images-demo/assets/600_400-5.jpg',
    date: 'May 1st',
    tag: 'Quotes',
    title: 'Music Matters',
    content: 'Without music, life would be a mistake',
    author: 'Friedrich Nietzsche',
  }, {
    img: 'http://iarouse.com/dist-react-ant-design/v1.1.4/assets/images-demo/assets/600_400-6.jpg',
    date: 'May 1st',
    title: 'To know a Man',
    content: "If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.",
    tag: 'Quotes',
    author: 'J.K. Rowling',
  },
];


export default ({ storiesOf }) => (
  storiesOf('ui/BlogCard', module)
    .add('BlogCard', () => (
      <ThemeInjector>
        <BlogCard
          {...articles[0]}
          style={{ width: 280 }}
        >
          <AnimatedLink
            href="//google.com"
            target="_blank"
            icon="arrow-right"
            paint="primary"
          >
            Read More
          </AnimatedLink>
        </BlogCard>
      </ThemeInjector>
    ))
    .add('BlogCard2', () => (
      <ThemeInjector>
        <FlexContainer>
          {
                articles.map((article, i) => (
                  <FlexItem
                    className="flex-item mb-4"
                  >
                    <QueueAnim type="bottom" className="ui-animate flex-items-container">
                      <BlogCard
                        key={i.toString()}
                        {...article}
                      />
                    </QueueAnim>
                  </FlexItem>
                ))
              }
        </FlexContainer>
      </ThemeInjector>
    ))
);
