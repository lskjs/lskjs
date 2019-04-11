const { google } = require('googleapis');

module.exports = async (auth, { fileId, gid }) => {
  const drive = google.drive({ version: 'v3', auth });
  const res = await new Promise((resolve, reject) => {
    drive.files.export({
      fileId,
      mimeType: 'text/csv',
    }, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    })
  });
  return res.data;
}