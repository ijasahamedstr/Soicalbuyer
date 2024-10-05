import express from 'express';
import { Accountboostcreate, Accountgamecreate, Accountservicecreate, Accountusercreate, AcoountboostView } from '../controller/Accountboost.Controller.js';

// Create a new router instance
const Accountboostrouter = express.Router();

// Define the POST route with file upload and Image handler
Accountboostrouter.post('/',Accountboostcreate);

Accountboostrouter.post('/game',Accountgamecreate);

Accountboostrouter.post('/Users',Accountusercreate);

Accountboostrouter.post('/Services',Accountservicecreate);


// View the Data Register
Accountboostrouter.get('/',AcoountboostView);


//Delete Data Register
Accountboostrouter.delete('/:id',);

//Update Data Register
Accountboostrouter.put('/:id', );


export default Accountboostrouter;
