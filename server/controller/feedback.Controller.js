import feedbackactive from '../models/feedback.models.js';


export const feedbackCreate = async (req, res) => {
    const { userid, feedback } = req.body;

    // Validate input
    // if (!userid || !feedback) {
    //     return res.status(400).json({ error: "Please Enter All Input Data" });
    // }

    try {
        // Create a new account instance
        const accountCreate = new feedbackactive({ userid, feedback });

        // Save the new account to the database
        const storeData = await accountCreate.save();
        res.status(200).json(storeData);
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", details: error.message });
    }
};


// All Acccount View 
export const FeedbackIndex = async (req, res) => {
    try {

        const feedbackRegister = await feedbackactive.find();

        res.json(feedbackRegister);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};