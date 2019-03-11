import styled from '@emotion/styled'
import AntAvatar from 'antd/lib/avatar';
import AntIcon from 'antd/lib/icon';

import removeProps from '../../../utils/removeProps';
import createDynamicTag from '../../../utils/createDynamicTag';

export const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  font-family: ${p => p.theme.fontFamily};
`;

const dynamicTagTitle = createDynamicTag('a');
export const Title = styled(dynamicTagTitle)`
  line-height: 1.625rem;
  font-size: 14px;
  margin: 5px 5px 5px 0;
  font-family: ${p => p.theme.fontFamily};
  font-weight: 500;
  color: ${p => p.theme.colors.darkGray};
`;

export const Avatar = styled(AntAvatar)`
  margin-right: 12px;
`;

export const Subtitle = styled('span')`
  line-height: 1.625rem;
  font-size: 14px;
  font-family: ${p => p.theme.fontFamily};
  margin: 5px 5px 5px 0;
  font-weight: 300;
  color: ${p => p.theme.colors.gray600};
`;

const dynamicTagCategory = createDynamicTag('a');

const removedList = ['color'];

const filteredIcon = removeProps(AntIcon, removedList);
export const Icon = styled(filteredIcon)`
  color: ${p => (p.color || p.theme.colors.gray600)};
  font-size: 12px;
`;

const filteredCategory = removeProps(dynamicTagCategory, removedList);
export const Category = styled(filteredCategory)`
  line-height: 1.625rem;
  font-size: 14px;
  font-family: ${p => p.theme.fontFamily};
  margin: 5px 0 5px 5px;
  font-weight: 400;
  color: ${p => (p.color || p.theme.colors.gray600)};
`;
