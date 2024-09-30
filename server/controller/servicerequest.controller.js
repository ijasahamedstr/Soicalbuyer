

// Example route Controller handler

import Servicerequest from "../models/servicerequest.models.js";

// All Acccount Create

export const servicerequest = async (req, res) => {
    const {
        documentnumber,
        userid,
        ...additionalFields
      } = req.body;
    
      // Validate required fields
      if (!documentnumber) {
        return res.status(400).json({ error: 'Document number is required' });
      }
    
      try {
        // Create a new service request
        const newRequest = new Servicerequest({
          documentnumber,
          userid,
          additionalFields
        });
    
        // Save to the database
        await newRequest.save();
    
        res.status(200).json({ success: 'Request processed successfully' });
      } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
};


// single Acccount View 

export const ServicerequestDetails = async (req, res) => {
  try {
      const AccountsRegister = await Servicerequest.findById(req.params.id);
      if (AccountsRegister == null) {
          return res.status(404).json({ message: "Cannot Find Acoount" });
      }
      else {
          res.json(AccountsRegister);

      }
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};


// All Acccount View 
export const ServicerequestView = async (req, res) => {
  try {

      const AcoountsRegister = await Servicerequest.find();

      res.json(AcoountsRegister);

  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};



