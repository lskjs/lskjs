import aws from 'aws-sdk';
import multerS3 from 'multer-s3';

import UploadServerModule from './UploadServerModule';

export default class S3UploadServerModule extends UploadServerModule {
  async initStorage() {
    const config = this.config.s3;
    if (!config) throw '!config.upload.s3';
    if (this.config.s3) {
      this.s3 = new aws.S3(this.config.s3);
    }
    this.storage = this.getStorage();
  }

  getStorage() {
    return multerS3({
      s3: this.s3,
      bucket: this.config.s3.bucket,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: this.config.s3.acl || 'public-read',
      key: async (req, file, cb) => {
        let filename;
        try {
          filename = this.getFilePath(req, file);
          filename = filename.replace(/\//g, '__');
        } catch (err) {
          return cb(err);
        }
        return cb(null, filename);
      },
    });
  }
}
