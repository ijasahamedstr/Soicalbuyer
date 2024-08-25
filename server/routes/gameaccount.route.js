import express from 'express';

import userUpload from '../multerConfig/userConfig.js'; // Ensure the .js extension
import { GameAccountInsert } from '../controller/Game.Controller.js';

const gamerouter = express.Router();

// User routes
gamerouter.post('/', userUpload.array('userimg'),GameAccountInsert);

export default gamerouter;
