export default {
  allowGuest: false,
  // prefix: 'file_',
  // postfix: '',
  // formats: ['png', 'jpg', 'jpeg', 'gif'],
  // mimetypes: ['png', 'jpg', 'jpeg', 'gif'],
  // allowSetFilename: true,
  local: {
    // exteralPath: '/storage',
    path: 'storage',
    maxSize: '50mb',
  },
  s3: {
    acl: 'public-read',
    accessKeyId: '1111',
    secretAccessKey: '2222',
    bucket: '3333',
  },
};
