// Import required modules
import express from "express";
import { servicerequest } from "../controller/servicerequest.controller.js";

const servicerequestrouter = express.Router()

//CURD Functionality of Registertion

// Create the Data Register
servicerequestrouter.post('/',servicerequest);


export default servicerequestrouter;