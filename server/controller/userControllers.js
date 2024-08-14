import userDB from '../models/userModel.js'; // Ensure to add .js if using ES Modules

// Image upload
export const ImageUpload = async (req, res) => {
    const files = req.files && req.files.length > 0 ? req.files : [];
    const { username } = req.body;

    if (!username || files.length === 0) {
        return res.status(400).json({ error: "Username and at least one image are required" });
    }

    try {
        const existingUser = await userDB.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "This user already exists" });
        }

        const fileUrls = files.map((file) => file.filename);
        
        const newUser = new userDB({
            username,
            userprofile: fileUrls
        });

        await newUser.save();
        res.status(200).json({ message: "Images successfully uploaded", userData: newUser });
    } catch (error) {
        console.error("Error in ImageUpload:", error);
        res.status(500).json({ error: "An error occurred while uploading images" });
    }
};

// Get user data
export const getUserdata = async (req, res) => {
    try {
        const users = await userDB.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error in getUserdata:", error);
        res.status(500).json({ error: "An error occurred while retrieving user data" });
    }
};


// All Acccount Update

export const ImageUpdate = async (req, res) => {

    const { id } = req.params;
    const { username } = req.params;
    const updateFields = req.body;
    const files = req.files && req.files.length > 0 ? req.files : [];


    try {
        // Find the user by ID
        const user = await userDB.findById(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update user details
        if (username) {
            user.username = username;
        }

        // Update image if a new file is uploaded
       // Update fields
       if (files.length > 0) {
        const updatedUrls = files.map((file) => file.filename);
        updateFields.userprofile = updatedUrls;
    }


        // Save the updated user data
        const updatedUser = await user.save();

        res.status(200).json({ status: 200, updatedUser });
    } catch (error) {
        res.status(401).json({ status: 401, error });
    }
};
