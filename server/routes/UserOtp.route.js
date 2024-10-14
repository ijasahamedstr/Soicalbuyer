// Import required modules
import express from "express";
import { userOtpSend } from "../controller/Sentotp.Controller.js";



const otprouter = express.Router()

//CURD Functionality of Registertion

// Create the Data Register
otprouter.post('/',userOtpSend);


export default otprouter;
