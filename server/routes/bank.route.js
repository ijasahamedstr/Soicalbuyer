// Import required modules
import express from "express";
import { BankCreate, BankDeatailsView } from "../controller/bank.Controller.js";

const bankrouter = express.Router()

//CURD Functionality of Registertion

// Create the Data Register
bankrouter.post('/',BankCreate);

// View the Data Register
bankrouter.get('/',BankDeatailsView);


export default bankrouter;