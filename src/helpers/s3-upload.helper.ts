import * as AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { randomBytes } from 'crypto';
import { getFileExt } from '@/utils/util';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'ap-south-1',
});

const s3 = new AWS.S3();

const fileMimeTypesArr = ['image/jpg','image/jpeg', 'image/png', 'image/svg+xml', 'application/pdf', 'video/mp4'];

const fileFilterFn = (req, file, cb) => {
  if (fileMimeTypesArr.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb({ message: `Please provide an valid File` }, false);
  }
};

const upload = multer({
  fileFilter: fileFilterFn,
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    cacheControl: 'max-age=432000',

    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },

    key: (req, file, cb) => {
      const ext: string = getFileExt(file.originalname);
      const fileNameAlias = randomBytes(16).toString('hex');

      const fileStr = `static/uploads/${req.user.id}/${fileNameAlias}${ext}`;
      cb(null, fileStr);
    },
  }),
});
export default upload;
