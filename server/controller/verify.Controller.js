import AccountRegister from "../models/AccountRegister.models.js";

export const verify = async (req, res) => {
    const { email, otp, Accountstatus } = req.body;

    // Validate input
    if (!email || !otp || !Accountstatus) {
        return res.status(400).json({ error: "Please enter your email, OTP, and account status" });
    }

    try {
        // Find user by email
        const user = await AccountRegister.findOne({ email: email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check OTP
        if (user.otp !== otp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        // Check if account status needs to be updated
        if (user.Accountstatus !== 'Verified') {
            // Update account status
            user.Accountstatus = 'Verified';
            await user.save();
        }

        // Generate token
        const token = await user.generateAuthtoken();

        // Respond with success
        res.status(200).json({
            message: "User verification successful",
            preuser: user,
            userToken: token
        });

    } catch (error) {
        // Log the error for debugging
        console.error("Verification error:", error);

        // Respond with a generic error message
        res.status(500).json({ error: "An unexpected error occurred" });
    }
};
