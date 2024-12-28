import multer from 'multer';

// Storage config
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './useruploads');
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`);
    }
});

// Filter
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true);
    } else {
        callback(new Error('Only Jpg, Png, and Jpeg formats allowed'), false);
    }
};

const userUpload = multer({
    storage: storage,
    fileFilter: fileFilter
});

export default userUpload;
