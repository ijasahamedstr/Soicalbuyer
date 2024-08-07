import express from 'express';
import multer from 'multer';
import moment from 'moment';
import AccountRegister from '../models/AccountRegister.models.js';

const router = express.Router();

// Configure multer storage
const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`);
    }
});

// Filter to allow only images
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true);
    } else {
        callback(new Error('Only images are allowed'), false);
    }
};

const upload = multer({
    storage: imgconfig,
    fileFilter: isImage
});

// Register user
router.post('/register', upload.single('photo'), async (req, res) => {
    const { filename } = req.file;

    if (!filename) {
        return res.status(400).json({ status: 400, message: 'Fill all the data' });
    }

    try {
        const date = moment(new Date()).format('YYYY-MM-DD');
        const userdata = new AccountRegister({
            imgpath: filename,
            date: date
        });

        const finaldata = await userdata.save();
        res.status(201).json({ status: 201, finaldata });

    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
});

// Get user data
router.get('/getdata', async (req, res) => {
    try {
        const getUser = await AccountRegister.find();
        res.status(200).json({ status: 200, getUser });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
});

// Delete user data
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const dltUser = await AccountRegister.findByIdAndDelete(id);

        if (!dltUser) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        res.status(200).json({ status: 200, dltUser });

    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
});

// Update user data
router.put('/:id', upload.single('photo'), async (req, res) => {
    const { id } = req.params;
    const { fname } = req.body;
    const filename = req.file ? req.file.filename : null;

    try {
        // Find the user by ID
        const user = await AccountRegister.findById(id);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        // Update fields
        if (fname) {
            user.fname = fname;
        }
        if (filename) {
            user.imgpath = filename;
        }

        // Save the updated user
        const updatedUser = await user.save();
        res.status(200).json({ status: 200, updatedUser });

    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
});

export default router;