import React from 'react';
import If from 'react-if';
import FileIcon from 'react-icons2/mdi/file-image';
import Button from '../../../Button';
import T from '../../../T';
import { Actions, Block, Drop, DropIcon, DropText, Header, Info } from './Files.styles';

const DefaultBody = ({
  dragged,
  value,
  refZone,
  onRemoveFiles,
  validationState,
}) => (
  <React.Fragment>
    <If condition={dragged}>
      <Drop>
        <DropText>
          <T name="upload.dropFiles" />
        </DropText>
        <DropIcon>
          <FileIcon />
        </DropIcon>
      </Drop>
    </If>
    <If condition={!dragged}>
      <Block
        validationState={validationState}
      >
        <Header>
          <Info>
            <T name="upload.infoFiles" />
          </Info>
          <Actions>
            <If condition={!value}>
              <Button
                type="button"
                onClick={() => refZone.current?.open()}
              >
                <T name="upload.buttonFiles" />
              </Button>
            </If>
            <If condition={value?.length}>
              <Button
                type="button"
                onClick={onRemoveFiles}
              >
                <T name="lskComponents.filesUploaderButton" />
              </Button>
            </If>
          </Actions>
        </Header>
      </Block>
    </If>
  </React.Fragment>
);

export default DefaultBody;
