import express from 'express';
import { ServiceAccountInsert, ServiceIndex } from '../controller/service.Controller.js';

const servicerouter = express.Router();

// User routes
servicerouter.post('/',ServiceAccountInsert);


// View the Data Register
servicerouter.get('/', ServiceIndex);

export default servicerouter;
