import express from 'express';
import { feedbackCreate, FeedbackIndex } from '../controller/feedback.Controller.js';

const feedbackrouter = express.Router();

feedbackrouter.post('/',feedbackCreate );

// View the Data Register
feedbackrouter.get('/',FeedbackIndex);

export default feedbackrouter;


