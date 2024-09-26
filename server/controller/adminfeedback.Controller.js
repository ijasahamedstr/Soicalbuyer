import Adminfeedbackactive from "../models/adminfeedbackrouter.models.js";

export const AdminfeedbackCreate = async (req, res) => {
    const { userid, heading, feedback } = req.body;

    try {
        // Create a new account instance
        const accountCreate = new Adminfeedbackactive({ userid, heading, feedback });

        // Save the new account to the database
        const storeData = await accountCreate.save();
        res.status(200).json(storeData);
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", details: error.message });
    }
};
