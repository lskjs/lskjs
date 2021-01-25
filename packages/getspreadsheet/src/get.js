import { google } from 'googleapis';

export default async (auth, { fileId }) => {
  // gid
  console.log('google', auth, fileId);

  const drive = google.drive({ version: 'v3', auth });
  console.log('drive', drive);
  const { data } = await new Promise((resolve, reject) => {
    drive.files.export(
      {
        fileId,
        mimeType: 'text/csv',
      },
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      },
    );
  });
  return data;
};
