import express from 'express';
import multer from 'multer';
import { Image, ImageDelete, ImageView } from '../controller/ImageRegister.Controller.js';

// Create a new router instance
const Imagerouter = express.Router();

// Image storage configuration
const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`);
    }
});

// Image filter
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true);
    } else {
        callback(new Error('Only images are allowed'));
    }
};

const upload = multer({
    storage: imgconfig,
    fileFilter: isImage
});

// Define the POST route with file upload and Image handler
Imagerouter.post('/', upload.single('photo'), Image);


// View the Data Register
Imagerouter.get('/',ImageView);


//Delete Data Register
Imagerouter.delete('/:id',ImageDelete);




export default Imagerouter;
