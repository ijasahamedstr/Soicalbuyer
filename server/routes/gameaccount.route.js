import express from 'express';
import userUpload from '../multerConfig/userConfig.js'; // Ensure the .js extension
import { GameAccountInsert, GameDelete, GameIndex, GameSingleDetails, GameUpdate } from '../controller/Game.Controller.js';

const gamerouter = express.Router();

// User routes
gamerouter.post('/', userUpload.array('userimg'),GameAccountInsert);

// View the Data Register
gamerouter.get('/', GameIndex);

// View the Single Data Register
gamerouter.get("/:id",GameSingleDetails);

//Update Data Register
gamerouter.put('/:id',GameUpdate);


//Delete Data Register
gamerouter.delete('/:id',GameDelete);

export default gamerouter;
