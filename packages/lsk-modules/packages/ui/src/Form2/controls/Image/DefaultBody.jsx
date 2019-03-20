import React from 'react';
import If from 'react-if';
import File from 'react-icons2/mdi/file-image';
import Remove from 'react-icons2/mdi/close-circle-outline';
import T from '../../../T';
import Avatar from '../../../Avatar';

import {
  Drop,
  DropIcon,
  DropText,
  Overlay,
  RemoveButton,
  PlaceholderFooter,
  IconFooter,
  Footer,
  Button,
  Actions,
  Info,
  Header,
  Block,
} from './Image.styles';

const DefaultBody = ({
  dragged,
  value,
  refZone,
  onRemoveFiles,
  validationState,
  type = 'image',
  avatar,
}) => {
  console.log(value, type);
  return (
    <React.Fragment>
      <If condition={dragged}>
        <Drop>
          <DropText>
            <T name="upload.dropImage" />
          </DropText>
          <DropIcon>
            <File />
          </DropIcon>
        </Drop>
      </If>
      <If condition={!dragged}>
        <Block
          validationState={validationState}
          type={type}
        >
          <Header>
            <Info>
              <T name="upload.infoImage" />
            </Info>
            <Actions>
              <Button
                type="button"
                onClick={() => refZone.current?.open()}
              >
                <T name="upload.buttonImage" />
              </Button>
            </Actions>
          </Header>
          <Footer
            style={(value && type === 'image') ? {
              backgroundImage: `url(${value})`,
            } : {}}
          >
            <If condition={!value || type === 'avatar'}>
              <IconFooter>
                <If condition={type === 'image'}>
                  <File />
                </If>
                <If condition={type === 'avatar'}>
                  <Avatar size={116} src={value} title={avatar.title} id={avatar.id} />
                </If>
              </IconFooter>
              <PlaceholderFooter>
                <T name="upload.placeholderImage" />
              </PlaceholderFooter>
            </If>
            <If condition={type === 'image' && value}>
              <Overlay />
              <RemoveButton
                type="button"
                onClick={onRemoveFiles}
              >
                <Remove />
              </RemoveButton>
            </If>
          </Footer>
        </Block>
      </If>
    </React.Fragment>
  );
};

export default DefaultBody;
