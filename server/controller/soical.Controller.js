import SocialDB from "../models/soical.models.js";


// Insert Social Account Service
export const socialAccountInsert = async (req, res) => {
    const { userid, social_username, social_type, social_dec, social_amount, social_code, sstatus, accountpassword, accountgmail, accountgmailpassword, accountdec } = req.body;

    try {
        // Input validation
       

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
            social_code,
            sstatus,
            accountpassword,
            accountgmail,
            accountgmailpassword,
            accountdec
        });

        // Save the document to the database
        await newSocialAccount.save();
        res.status(201).json({ message: "Service account successfully created", userData: newSocialAccount });
    } catch (error) {
        console.error("Error in socialAccountInsert:", error.message); // Log only the error message for better readability
        res.status(500).json({ error: "An error occurred while creating the service account. Please try again later." });
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



// single Acccount View 

export const soicalSingleDetails = async (req, res) => {
    try {
        const soicalRegister = await SocialDB.findById(req.params.id);
        if (soicalRegister == null) {
            return res.status(404).json({ message: "Cannot Find Acoount" });
        }
        else {
            res.json(soicalRegister);

        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// All Acccount Update

export const SoicalAccountUpdate  = async (req, res) => {

    const { id } = req.params;
    const { social_dec} = req.body;
    const { Promotional_Title } = req.body;
    const { social_amount} = req.body;
    const {  discount } = req.body;

    try {
        // Find the user by ID
        const user = await SocialDB.findById(id);

        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        // Update user details
        if (social_dec) {
            user.social_dec = social_dec;
        }
        if (Promotional_Title) {
            user.Promotional_Title = Promotional_Title;
        }
        if (social_amount) {
            user.social_amount = social_amount;
        }
        if (discount) {
            user.discount = discount;
        }
       
    // Save the updated user data
        const updatedUser = await user.save();

        res.status(200).json({ status: 200, updatedUser });
    } catch (error) {
        res.status(401).json({ status: 401, error });
    }
};


// All Acccount Delete

export const soicalAccountDelete = async (req, res) => {
    const AccountId =  req.params.id;
    
    try {
         await SocialDB.deleteOne({_id: AccountId})
         res.json({message:"Acoount deleted!"});
    } catch (error) {
     res.status(500).json({message:error.message})
    }
 };
 

