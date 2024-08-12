import express from 'express';

import userUpload from '../multerConfig/userConfig.js'; // Ensure the .js extension
import { getUserdata, ImageUpload } from '../controller/userControllers.js';

const userrouter = express.Router();

// User routes
userrouter.post('/register', userUpload.array('userimg'),ImageUpload);
userrouter.get('/getUser', getUserdata);

export default userrouter;
