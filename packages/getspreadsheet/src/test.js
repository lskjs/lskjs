// node_modules/nodemon/bin/nodemon.js packages/getspreadsheet/build/test.js
import getSpreadsheet from './getSpreadsheet';

const testUrl = 'https://docs.google.com/spreadsheets/d/1yqEtc7VfCZRv4I3iqSiKSq9CkSDCU3fIKa-ZayyW_ys/edit#gid=0';

getSpreadsheet(testUrl)
  .then(res => {
    console.log('getSpreadsheet', res);
  })
  .catch(err => {
    console.log('getSpreadsheet err', err);
  });
