// utils/fileUpload.js
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });
export const uploadFile = (file) => {
  return `/uploads/${file.filename}`; // Return file path or cloud URL
};