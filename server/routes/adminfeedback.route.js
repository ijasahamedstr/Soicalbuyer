// Import required modules
import express from "express";
import { AdminfeedbackCreate } from "../controller/adminfeedback.Controller.js";


const adminfeedbackrouter = express.Router()

//CURD Functionality of Registertion

// Create the Data Register
adminfeedbackrouter.post('/',AdminfeedbackCreate);


export default adminfeedbackrouter;