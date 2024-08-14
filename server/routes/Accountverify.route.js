// Import required modules
import express from "express";
import { verify } from "../controller/verify.Controller.js";



const verifyrouter = express.Router()

//CURD Functionality of Registertion

// Create the Data Register
verifyrouter.post('/',verify);


export default verifyrouter;