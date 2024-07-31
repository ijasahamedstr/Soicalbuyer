// Import required modules
import express from "express";
import { userLogin } from "../controller/Login.Controller.js";



const loginrouter = express.Router()

//CURD Functionality of Registertion

// Create the Data Register
loginrouter.post('/',userLogin);


export default loginrouter;