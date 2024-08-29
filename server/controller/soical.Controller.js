import SocialDB from "../models/soical.models.js";

// Insert Social Account Service
export const socialAccountInsert = async (req, res) => {
    // Extract fields from the request
    const { userid, social_username, social_type, social_dec, social_amount, social_code } = req.body;

    try {
        // Check if a service with the same social_username exists
        const existingService = await SocialDB.findOne({ social_username });
        if (existingService) {
            return res.status(400).json({ error: "A service with this username already exists." });
        }

        // Create a new document with the data
        const newSocialAccount = new SocialDB({
            userid,
            social_username,
            social_type,
            social_dec,
            social_amount,
            social_code
        });

        // Save the document to the database
        await newSocialAccount.save();
        res.status(201).json({ message: "Service account successfully created", userData: newSocialAccount });
    } catch (error) {
        console.error("Error in socialAccountInsert:", error);
        res.status(500).json({ error: "An error occurred while creating the service account." });
    }
};



// All Account View 
export const SoicalIndex = async (req, res) => {
    try {
        // Fetch all game registrations from the database
        const soicalRegisters = await SocialDB.find();

        // Send the data as JSON response
        res.json(soicalRegisters);
    } catch (error) {
        // Log the error for debugging purposes
        logger.error('Error fetching game registrations:', { message: error.message, stack: error.stack });

        // Send a 500 status code and error message
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};