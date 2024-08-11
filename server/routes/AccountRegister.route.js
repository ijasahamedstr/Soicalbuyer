// Import required modules
import express from "express";
import {AccountCreate, AccountDelete, AccountIndex, AccountSingleDetails, AccountUpdate} from "../controller/AccountRegister.Controller.js";
import multer from 'multer';


const router = express.Router()


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

//CURD Functionality of Registertion

// Create the Data Register
router.post('/',AccountCreate);

// View the Data Register
router.get('/',AccountIndex);

// View the Single Data Register
router.get("/:id",AccountSingleDetails)


//Update Data Register
router.put('/:id',upload.single('photo'),AccountUpdate);

//Delete Data Register

router.delete('/:id',AccountDelete);

export default router;