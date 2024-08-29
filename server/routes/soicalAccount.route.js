import express from 'express';
import { socialAccountInsert, SoicalIndex } from '../controller/soical.Controller.js';


const soicalrouter = express.Router();

// User routes
soicalrouter.post('/', socialAccountInsert);

// View the Data Register
soicalrouter.get('/', SoicalIndex);

export default soicalrouter;
