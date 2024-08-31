import ServiceDB from "../models/service.models.js";

// Image upload
export const ServiceAccountInsert = async (req, res) => {
    // Extract fields from the request
    const { userid, service_heading, service_type, service_dec, service_Amount, service_time_houre, service_buy_Amount, service_Staus } = req.body;

    try {
        // Optional: Add field validation here

        // Check if a service with the same heading or another unique identifier exists
        const existingService = await ServiceDB.findOne({ service_heading }); // Update this field based on your schema
        if (existingService) {
            return res.status(400).json({ error: "A service with this heading already exists." });
        }

        // Create a new document with the data
        const newServiceAccount = new ServiceDB({
            userid,
            service_heading,
            service_type,
            service_dec,
            service_Amount,
            service_time_houre,
            service_buy_Amount,
            service_Staus
        });

        // Save the document to the database
        await newServiceAccount.save();
        res.status(200).json({ message: "Service account successfully created", userData: newServiceAccount });
    } catch (error) {
        console.error("Error in ServiceAccountInsert:", error);
        res.status(500).json({ error: "An error occurred while creating the service account." });
    }
};



// All Account View 
export const ServiceIndex = async (req, res) => {
    try {
        // Fetch all game registrations from the database
        const seriviceRegisters = await ServiceDB.find();

        // Send the data as JSON response
        res.json(seriviceRegisters);
    } catch (error) {
        // Log the error for debugging purposes
        logger.error('Error fetching game registrations:', { message: error.message, stack: error.stack });

        // Send a 500 status code and error message
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
