// Import required modules
import express from "express";
import {AccountCreate, AccountDelete, AccountIndex, AccountSingleDetails, AccountUpdate} from "../controller/AccountRegister.Controller.js";


const router = express.Router()

//CURD Functionality of Registertion

// Create the Data Register
router.post('/',AccountCreate);

// View the Data Register
router.get('/',AccountIndex);

// View the Single Data Register
router.get("/:id",AccountSingleDetails)

//Update Data Register
router.put('/:id',AccountUpdate);

//Delete Data Register

router.delete('/:id',AccountDelete);

export default router;