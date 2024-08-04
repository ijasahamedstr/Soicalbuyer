// Import required modules
import express from "express";
import { authenticate } from "../controller/authenticate.js";
import { userLogout } from "../controller/Logout.Controller.js";



const logoutrouter = express.Router()

//CURD Functionality of Registertion

// Create the Data Register
logoutrouter.post('/',authenticate, userLogout);


export default logoutrouter;