import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload folder
const uploadDir = path.join(__dirname, "../uploads");

// create uploads folder if not exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


// Disk storage
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    const ext = path.extname(file.originalname);

    cb(null, uniqueName + ext);
  }

});


// File filter
const fileFilter = (req, file, cb) => {

  try {

    if (file.fieldname === "resume") {

      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];

      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Only PDF, DOC, DOCX allowed for resume"), false);
      }

    }
    else if (
      file.fieldname === "profilePhoto" ||
      file.fieldname === "logo"
    ) {

      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Only image files allowed"), false);
      }

    }
    else {
      cb(null, true);
    }

  }
  catch (error) {
    cb(error, false);
  }

};


// Main upload instance
export const upload = multer({

  storage,

  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }

});


// Single file upload
export const uploadSingle = (fieldName) => {
  return upload.single(fieldName);
};


// Multiple files upload for same field
export const uploadMultiple = (fieldName, maxCount = 5) => {
  return upload.array(fieldName, maxCount);
};

// Multiple fields upload (e.g., resume + profilePhoto)
export const uploadFields = (fields) => {
  return upload.fields(fields);
};


