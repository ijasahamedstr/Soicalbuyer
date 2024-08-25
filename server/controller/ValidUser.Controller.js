import AccountRegister from "../models/AccountRegister.models.js";

export const ValidUser = async (req, res) => {
    try {
        // Ensure req.userId is properly populated and valid
        if (!req.userId) {
            return res.status(400).json({ status: 400, error: "User ID is missing" });
        }

        console.log(req.userId)

        // Find the user by their ID
        const ValidUserOne = await AccountRegister.findOne({ _id: req.userId });

        // Check if the user exists
        if (!ValidUserOne) {
            return res.status(404).json({ status: 404, error: "User not found" });
        }

        // Respond with the user data
        res.status(200).json({ status: 200, ValidUserOne });
    } catch (error) {
        // Handle unexpected errors
        console.error("Error in ValidUser:", error);
        res.status(500).json({ status: 500, error: "Internal Server Error" });
    }
};
