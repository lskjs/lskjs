import React from 'react';
import { Col, Row } from '../Grid';
import AccountIcon from 'react-icons2/mdi/account';
import Slide from '../Slide';
import Button from '../Button';
import Callout from '../UI/molecules/Callout';
import CalloutRight from '../UI/molecules/CalloutRight';
import Cover from '../UI/molecules/Cover';
import Feature from '../UI/molecules/Feature';
import TestImonialV2 from '../UI/molecules/TestImonialV2';
import CTAInline from '../UI/molecules/CTAInline';
import Story from '../Story';
import Input from '../UI/atoms/Input';
import InputContainer from '../UI/atoms/InputContainer';
import Container from '../UI/atoms/Container';
import Header from '../UI/atoms/Header';
import Typography from '../UI/atoms/Typography';
import CTAContainer from '../UI/atoms/CTAContainer';
import CopyrightContainer from '../UI/atoms/CopyrightContainer';
import FaqContainer from '../UI/atoms/FaqContainer';
import FeatureContainer from '../UI/atoms/FeatureContainer';


export default ({ storiesOf }) => (
  storiesOf('example/landing1', module)
    .add('Default', () => (
      <Story>
        <div>
          <Cover
            image="http://iarouse.com/dist-react-ant-design/v1.1.4/assets/images-demo/covers/alexandre-perotto-75274-unsplash.jpg"
            color="white"
            align="center"
            full
            overlay
          >
            <Col md={7} lg={6} style={{ margin: 'auto' }}>
              <Cover.Title>100+ Components</Cover.Title>
              <Cover.SubTitle>
                Ant admin is a multi-purpose
                template which comes with a
                huge collection of components out of box.
              </Cover.SubTitle>
              <Cover.Divider />
              <Cover.Footer>
                <Cover.Button type="primary">try it now</Cover.Button>
              </Cover.Footer>
            </Col>
          </Cover>
          <Slide center color="#f5f5f5">
            <Container>
              <Header>
                Key features
              </Header>
              <Row>
                <FeatureContainer md={4}>
                  <Feature
                    icon={<AccountIcon />}
                    header="RESPONSIVE DESIGN"
                    content1="mobile-ready design adopt to "
                    content2="any device"
                    center="true"
                  />
                </FeatureContainer>
                <FeatureContainer md={4}>
                  <Feature
                    icon={<AccountIcon />}
                    header="RESPONSIVE DESIGN"
                    content1="mobile-ready design adopt to "
                    content2="any device"
                    center="true"
                  />
                </FeatureContainer>
                <FeatureContainer md={4}>
                  <Feature
                    icon={<AccountIcon />}
                    header="RESPONSIVE DESIGN"
                    content1="mobile-ready design adopt to "
                    content2="any device"
                    center="true"
                  />
                </FeatureContainer>
              </Row>
              <Row>
                <FeatureContainer md={4}>
                  <Feature
                    icon={<AccountIcon />}
                    header="RESPONSIVE DESIGN"
                    content1="mobile-ready design adopt to "
                    content2="any device"
                    center="true"
                  />
                </FeatureContainer>
                <FeatureContainer md={4}>
                  <Feature
                    icon={<AccountIcon />}
                    header="RESPONSIVE DESIGN"
                    content1="mobile-ready design adopt to "
                    content2="any device"
                    center="true"
                  />
                </FeatureContainer>
                <FeatureContainer md={4}>
                  <Feature
                    icon={<AccountIcon />}
                    header="RESPONSIVE DESIGN"
                    content1="mobile-ready design adopt to "
                    content2="any device"
                    center="true"
                  />
                </FeatureContainer>
              </Row>
              <Row>
                <FeatureContainer md={4}>
                  <Feature
                    icon={<AccountIcon />}
                    header="RESPONSIVE DESIGN"
                    content1="mobile-ready design adopt to "
                    content2="any device"
                    center="true"
                  />
                </FeatureContainer>
                <FeatureContainer md={4}>
                  <Feature
                    icon={<AccountIcon />}
                    header="RESPONSIVE DESIGN"
                    content1="mobile-ready design adopt to "
                    content2="any device"
                    center="true"
                  />
                </FeatureContainer>
                <FeatureContainer md={4}>
                  <Feature
                    icon={<AccountIcon />}
                    header="RESPONSIVE DESIGN"
                    content1="mobile-ready design adopt to "
                    content2="any device"
                    center="true"
                  />
                </FeatureContainer>
              </Row>
            </Container>
          </Slide>
          <Callout />
          <CalloutRight />
          <Slide center color="#f5f5f5">
            <Container>
              <Header>
                Why React
              </Header>
              <Row>
                <FaqContainer md={6}>
                  <Typography variant="h4" paragraph>
                    Develop Across All Platforms
                  </Typography>
                  <Typography variant="body">
                    Learn one way to build applications with
                    React and reuse your code and abilities to build apps for any
                    deployment target. For web, mobile web, native mobile and native desktop.
                    Declarative views make your code more predictable and easier to debug.
                  </Typography>
                </FaqContainer>
                <FaqContainer md={6}>
                  <Typography variant="h4" paragraph>
                    Develop Across All Platforms
                  </Typography>
                  <Typography variant="body">
                    Learn one way to build applications with
                    React and reuse your code and abilities to build apps for any
                    deployment target. For web, mobile web, native mobile and native desktop.
                    Declarative views make your code more predictable and easier to debug.
                  </Typography>
                </FaqContainer>
              </Row>
              <Row>
                <FaqContainer md={6}>
                  <Typography variant="h4" paragraph>
                    Develop Across All Platforms
                  </Typography>
                  <Typography variant="body">
                    Learn one way to build applications with
                    React and reuse your code and abilities to build apps for any
                    deployment target. For web, mobile web, native mobile and native desktop.
                    Declarative views make your code more predictable and easier to debug.
                  </Typography>
                </FaqContainer>
                <FaqContainer md={6}>
                  <Typography variant="h4" paragraph>
                    Develop Across All Platforms
                  </Typography>
                  <Typography variant="body">
                    Learn one way to build applications with
                    React and reuse your code and abilities to build apps for any
                    deployment target. For web, mobile web, native mobile and native desktop.
                    Declarative views make your code more predictable and easier to debug.
                  </Typography>
                </FaqContainer>
              </Row>
            </Container>
          </Slide>
          <Slide center color="#343a40">
            <Row style={{ padding: '45px 0' }}>
              <Col md={{ size: 6, offset: 3 }}>
                <TestImonialV2
                  avatar="https://picsum.photos/200"
                  content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque ratione consequuntur ut placeat."
                  name="Jason Bourne"
                  title="Senior PM"
                  paint="info"
                />
              </Col>
            </Row>
          </Slide>
          <Slide center image="http://iarouse.com/dist-react-ant-design/landing/images/covers/bench-accounting-49909-unsplash-lg.jpg">
            <Row style={{ padding: '45px 0' }}>
              <Col md={{ size: 6, offset: 3 }}>
                <Typography variant="h2" align="center">
                  Get Notified When We Update!
                </Typography>
                <InputContainer>
                  <Input
                    type="text"
                    placeholder="Email"
                  />
                </InputContainer>
                <div style={{ marginTop: '20px' }}>
                  <Button type="primary">Subscribe</Button>
                </div>
              </Col>
            </Row>
          </Slide>
          <Slide center color="#1890ff">
            <div style={{ padding: '30px 4em' }}>
              <CTAContainer lg={8}>
                <CTAInline title="Try it now, get up and running in minutes." buttonText="Download Ant" />
              </CTAContainer>
            </div>
          </Slide>
          <Slide center color="#263237">
            <CopyrightContainer>
              <Typography variant="small" color="#7a859e" align="center">
                Copyright
              </Typography>
            </CopyrightContainer>
          </Slide>
        </div>
      </Story>
    ))
);
