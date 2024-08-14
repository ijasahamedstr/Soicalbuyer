import express from 'express';
import { authenticate, transferPoints } from '../controller/Point.transfer.Controller.js';

const pointrouter = express.Router();

pointrouter.post('/', authenticate, transferPoints);

export default pointrouter;
