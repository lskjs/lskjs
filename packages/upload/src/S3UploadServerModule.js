import Err from '@lskjs/err';
import aws from 'aws-sdk';
import { filetypeextension, filetypemime } from 'magic-bytes.js';
import multerS3 from 'multer-s3';
import stream from 'stream';

import { UploadServerModule } from './UploadServerModule';

export class S3UploadServerModule extends UploadServerModule {
  async initStorage() {
    const config = this.config.s3;
    if (!config) throw new Err('!config.upload.s3');
    if (this.config.s3) {
      this.s3 = new aws.S3(this.config.s3);
    }
    this.storage = this.getStorage();
  }

  isSvg(svg) {
    const svgRegex = /^\s*(?:<\?xml[^>]*>\s*)?(?:<!doctype svg[^>]*>\s*)?<svg[^>]*>/i;
    return svgRegex.test(svg);
  }

  normalizeContentType(req, file, cb) {
    file.stream.once('data', (firstChunk) => {
      const _mime = filetypemime(firstChunk);
      const _ext = filetypeextension(firstChunk);
      const type =
        Array.isArray(_mime) && _mime.length
          ? {
              mime: _mime[0],
              ext: _ext[0],
            }
          : null;

      let mimetype = type?.mime;
      let mime = 'application/octet-stream'; // default type

      if ((!type || type.ext === 'xml') && this.isSvg(firstChunk.toString())) {
        mimetype = 'image/svg+xml';
      } else if (['text/csv'].includes(file?.mimetype)) {
        mimetype = file.mimetype;
      } else if (type) {
        mime = type.mime;
      }

      const isMIMETypeValid = this.validateMIMEType(mimetype, cb);
      if (!isMIMETypeValid) return;

      const outStream = new stream.PassThrough();
      outStream.write(firstChunk);
      file.stream.pipe(outStream);

      cb(null, mime, outStream);
    });
  }

  getStorage() {
    return multerS3({
      s3: this.s3,
      bucket: this.config.s3.bucket,
      contentType: this.normalizeContentType.bind(this),
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

export default S3UploadServerModule;
