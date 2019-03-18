import styled from '@emotion/styled';
import { Row as BsRow, Col as BsCol } from '../../../Grid';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import createDynamicTag from '../../../utils/createDynamicTag';

const dynamicTag = createDynamicTag('a');

const FormItem = Form.Item;

export const RememberCheckbox = styled(FormItem)`
  margin-bottom: 1.25rem;
  font-family: ${p => p.theme.fontFamily};
`;

export const FormButton = styled(Button)`
  height: auto;
  padding: .6em 3.5em;
  font-family: ${p => p.theme.fontFamily};
  text-transform: uppercase;
  letter-spacing: .5px;
  line-height: 2;
  font-size: .875em;
  display: block;
  width: 100%;
`;


export const AdditionalInfo = styled('p')`
  font-size: 0.875rem;
  margin-bottom: 0;
  font-family: ${p => p.theme.fontFamily};
  line-height: 1.5rem;
`;

export const WelcomeHeader = styled('p')`
  margin-bottom: 1.5rem;
  font-family: ${p => p.theme.fontFamily};
  text-align: center;
`;

export const InputItem = styled(FormItem)`
  padding-left: 30px;
  min-height: 100%;
  position: static;
  font-family: ${p => p.theme.fontFamily};
  padding: 6px 11px;
  height: 40px;
  font-size: 16px;
`;

export const FormWrap = styled(Form)`

`;

export const FormH2 = styled('h2')`
  text-align: center;
  font-family: ${p => p.theme.fontFamily};
  font-weight: 300;
  margin-bottom: 1.5rem;
`;

export const FormA = styled(dynamicTag)`
  &:not(.btn) {
    color: rgba(0, 0, 0, 0.87);
    text-decoration: underline;
  }
  &:not(.btn):hover {
    color: ${p => p.theme.colors.primary};
  }
  font-family: ${p => p.theme.fontFamily};
`;

export const FormContainer = styled('section')`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-family: ${p => p.theme.fontFamily};
  justify-content: center;
  ${FormH2} + ${FormWrap},
  ${WelcomeHeader} + ${FormWrap} {
    margin-top: 2.5rem;
  }
`;

export const Col = styled(BsCol)`
  padding-left: 0;
  padding-right: 0;
`;

export const Row = styled(BsRow)`
  min-height: 100vh;
  margin-left: 0;
  margin-right: 0;
  @media screen and (max-width: 992px) {
    > ${Col}:first-child {
      display: none;
    }
  }
`;

export const ImageContainer = styled('div')`
  background-image: ${p => `url(${p.image})`};
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 300px;
  @media screen and (max-width: 992px) {
    height: 0px;
    min-height: 0px;
  }
`;

export const FormWrapper = styled('div')`
  padding: 3rem;
  display: flex;
  align-items: center;
  height: 100%;
`;

