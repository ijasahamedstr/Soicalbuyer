import express from 'express';
import { feedbackCreate } from '../controller/feedback.Controller.js';

const feedbackrouter = express.Router();

feedbackrouter.post('/',feedbackCreate );

export default feedbackrouter;


