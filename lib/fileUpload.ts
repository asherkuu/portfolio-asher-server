import AWS from "aws-sdk";
import path from "path";
import multer from "multer";
import multerS3 from "multer-s3";

const appDir = path.dirname(require.main.filename);

AWS.config.loadFromPath(appDir + "/config/awsconfig.json");
let s3 = new AWS.S3();

// s3 파일 업로드
export const imageUpload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET,
    key: function (req: any, file: any, cb: any) {
      let extension = path.extname(file.originalname);
      cb(null, + Date.now().toString() + extension);
    },
    acl: "public-read-write",
  }),
});

// s3 파일 삭제
export const s3delete = function (key: string) {
    return new Promise((resolve, reject) => {
      s3.deleteObject(
        {
          Bucket: process.env.S3_BUCKET,
          Key: key,
        },
        function (err, data) {
          if (!err) resolve({ success: true });
          else reject(err);
        }
      );
    });
  };