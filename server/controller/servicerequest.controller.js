

// Example route Controller handler

import Servicerequest from "../models/servicerequest.models.js";

// All Acccount Create

export const servicerequest = async (req, res) => {
    const {
        documentnumber,
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



