const meow = require('meow');
const got = require('got');
const fs = require('fs');
const auth = require('./auth');
const get = require('./get');


const start = async (url, filename) => {
  try {
    const s = new RegExp("/spreadsheets/d/([a-zA-Z0-9-_]+)").exec(url);
    let spreadsheetId;
    if (s) {
      spreadsheetId = s[1];
    } else {
      throw new Error('invalid url');
    }
    const sh = new RegExp("[#&]gid=([0-9]+)").exec(url);
    let sheetId;
    if (sh) {
      sheetId = sh[1];
    } else {
      throw new Error('invalid gid');
    }
    const exportURL = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?gid=${sheetId}&format=csv`;
    const response = await got(exportURL);
    let body = response.body;
    if (response.url.includes('ServiceLogin')) {
      console.log('need auth');
      const a = await auth();
      body = await get(a, { fileId: spreadsheetId, gid: sheetId });
    }
    if (filename) {
      fs.writeFileSync(`${filename}`, body, 'utf8');
    } else {
      console.log(body);
    }
  } catch (e) {
    if (e && e.statusCode == '404') {
      console.log('File not found');
    } else {
      console.log(e);
    }
  }
};
const cli = meow(`
	Usage
    $ getspreadsheet URL > name.json
	  $ getspreadsheet URL --filename name.json

	Options
	  --filename  File name

	Examples
	  $ getspreadsheet https://docs.google.com/spreadsheets/d/1_qVnTw1Cwb2Ziwta_N0p-V4_ptD6-ZypDvCIrnryNF/edit#gid=0 --filename locales.csv
	  $ getspreadsheet https://docs.google.com/spreadsheets/d/1_qVnTw1Cwb2Ziwta_N0p-V4_ptD6-ZypDvCIrnryNF/edit#gid=0 > locales.csv
`, {
    flags: {
      filename: {
        type: 'string'
      },
    },
  }
);
if (!cli.input[0]) {
  console.log('URL not found');
}
if (cli.input[0]) {
  start(cli.input[0], cli.flags.filename);
}