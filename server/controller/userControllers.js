import userDB from '../models/userModel.js'; // Ensure to add .js if using ES Modules

// Image upload
export const ImageUpload = async (req, res) => {
    const files = req.files && req.files.length > 0 ? req.files : [];
    const { username } = req.body;

    if (!username || files.length === 0) {
        return res.status(400).json({ error: "All Fields are required" });
    }

    try {
        const preuser = await userDB.findOne({ username });
        if (preuser) {
            return res.status(400).json({ error: "This User Already Exists" });
        }

        const finalUrl = files.map((file) => file.filename);
        
        const userData = new userDB({
            username,
            userprofile: finalUrl
        });

        await userData.save();
        res.status(200).json({ message: "Image successfully uploaded", userData });
    } catch (error) {
        console.error("Error in ImageUpload:", error);
        res.status(400).json({ error: error.message });
    }
};

// Get user data
export const getUserdata = async (req, res) => {
    try {
        const getUsers = await userDB.find();
        res.status(200).json(getUsers);
    } catch (error) {
        console.error("Error in getUserdata:", error);
        res.status(400).json({ error: error.message });
    }
};
