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

    const userId = req.params.id;
    const { username } = req.body;
    const files = req.files;

    // Find the user
    const user = users.find(u => u._id === userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update username
    if (username) user.username = username;

    // Update profile images
    if (files && files.length > 0) {
        const newFiles = files.map(file => file.filename);
        user.userprofile = [...user.userprofile, ...newFiles];
    }

    res.json({ message: 'User updated successfully', user });
};
