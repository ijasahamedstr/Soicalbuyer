// Import required modules
import express from "express";
import { BankCreate } from "../controller/bank.Controller.js";

const bankrouter = express.Router()

//CURD Functionality of Registertion

// Create the Data Register
bankrouter.post('/',BankCreate);


export default bankrouter;