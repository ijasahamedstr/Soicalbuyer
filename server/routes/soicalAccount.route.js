import express from 'express';
import { socialAccountInsert, soicalAccountDelete, SoicalAccountUpdate, SoicalIndex, soicalSingleDetails } from '../controller/soical.Controller.js';


const soicalrouter = express.Router();

// User routes
soicalrouter.post('/',socialAccountInsert);

// View the Data Register
soicalrouter.get('/',SoicalIndex);

// View the Single Data Register
soicalrouter.get("/:id",soicalSingleDetails);

//Update Data Register
soicalrouter.put('/:id',SoicalAccountUpdate);

//Delete Data Register
soicalrouter.delete('/:id',soicalAccountDelete);

export default soicalrouter;
