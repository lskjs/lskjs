import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BsCol, Content, FeatureCallout, Title, ContentItem, Button } from './Callout.styles';

class Callout extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    buttonText: PropTypes.string,
  };
  static defaultProps = {
    title: null,
    content: null,
    buttonText: null,
  }
  render() {
    const {
      title,
      content,
      buttonText,
    } = this.props;
    return (
      <FeatureCallout>
        <BsCol md={6} />
        <div className="container-fluid container-mw-xl">
          <div className="col-12 col-md-6 offset-md-6">
            <Content>
              <Title>{title}</Title>
              <ContentItem>
                {content}
              </ContentItem>
              <Button type="primary">{buttonText}</Button>
            </Content>
          </div>
        </div>
      </FeatureCallout>
    );
  }
}
export default Callout;
