// Import required modules
import express from "express";
import { servicerequest, ServicerequestDetails, ServicerequestView } from "../controller/servicerequest.controller.js";

const servicerequestrouter = express.Router()

//CURD Functionality of Registertion

// Create the Data Register
servicerequestrouter.post('/',servicerequest);

// View the Single Data Register
servicerequestrouter.get("/:id",ServicerequestDetails)

// View the Data Register
servicerequestrouter.get('/',ServicerequestView);


export default servicerequestrouter;