import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import path from 'path';

import UploadServerModule from './UploadServerModule';

export default class S3UploadServerModule extends UploadServerModule {
  async init() {
    await super.init();
    this.s3 = new aws.S3(this.config.s3);
    this.storage = multerS3({
      s3: this.s3,
      bucket: 'buzzguru',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',
      key: (req, file, cb) => {
        const filename = path.parse(file.originalname);
        cb(null, `avatar_${req.user._id}.${filename.ext}`);
      },
    });
  }
}
