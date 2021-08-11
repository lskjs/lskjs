import styled from '@emotion/styled';
import React from 'react';
import { renderToString } from 'react-dom/server';

const MyDiv = styled('div')({ fontSize: 12 });
const App = () => <MyDiv>Text</MyDiv>;

const html = renderToString(<App />);
console.log(html);
