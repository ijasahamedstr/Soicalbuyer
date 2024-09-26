import express from 'express';
import multer from 'multer';
import { AccountActivecreate, AccountActiveDelete, AccountActiveUpdate, AccountActiveView, AccountSingleActiveDetails } from '../controller/AccountActive.Controller.js';

// Create a new router instance
const AccountActiverouter = express.Router();

// Image storage configuration
const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/AccountActive');
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
AccountActiverouter.post('/', upload.single('photo'), AccountActivecreate);


// View the Data Register
AccountActiverouter.get('/',AccountActiveView);


//Delete Data Register
AccountActiverouter.delete('/:id',AccountActiveDelete);

//Update Data Register
AccountActiverouter.put('/:id',upload.single('photo'), AccountActiveUpdate);

// View the Single Data Register
AccountActiverouter.get("/:id",AccountSingleActiveDetails)


export default AccountActiverouter;
