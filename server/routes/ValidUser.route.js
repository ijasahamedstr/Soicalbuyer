import express from 'express';
import { ValidUser } from '../controller/ValidUser.Controller.js';
import { authenticate } from '../controller/authenticate.js';

const validuserrouter = express.Router();

validuserrouter.get('/', authenticate, ValidUser);

export default validuserrouter;
