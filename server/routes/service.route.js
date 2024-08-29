import express from 'express';
import { ServiceAccountInsert } from '../controller/service.Controller.js';

const servicerouter = express.Router();

// User routes
servicerouter.post('/',ServiceAccountInsert);

export default servicerouter;
