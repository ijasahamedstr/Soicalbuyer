import express from 'express';
import { ServiceAccountInsert, ServiceDelete, ServiceIndex, ServiceSingleDetails, ServiceUpdate } from '../controller/service.Controller.js';

const servicerouter = express.Router();

// User routes
servicerouter.post('/',ServiceAccountInsert);


// View the Data Register
servicerouter.get('/', ServiceIndex);


// View the Single Data Register
servicerouter.get("/:id", ServiceSingleDetails);

//Update Data Register
servicerouter.put('/:id',ServiceUpdate);

//Delete Data Register

servicerouter.delete('/:id',ServiceDelete);


export default servicerouter;
