import GameDB from "../models/game.models.js";

// Image upload
export const GameAccountInsert = async (req, res) => {
    // Extract files and fields from the request
    const files = req.files && req.files.length > 0 ? req.files : [];
    const { userid, gameid, gamename, gametype, gamedec, gameAmount, gamegmail, gamepassword, gametitle, gamevalue, gamepurchasedec } = req.body;

    try {
        // Check if the user already exists (assuming you have a unique field for checking, e.g., userid)
        const existingUser = await GameDB.findOne({ gameid });
        if (existingUser) {
            return res.status(400).json({ error: "This user already exists." });
        }

        // Process files and store filenames (assuming multer or a similar middleware is used)
        const fileUrls = files.map((file) => file.filename);

        // Create a new document with the data
        const newGameAccount = new GameDB({
            userid,
            gameid,
            gamename,
            gametype,
            gamedec,
            gameAmount,
            
            gamegmail,
            gamepassword,
            gametitle,
            gamevalue,
            gamepurchasedec,
            userprofile: fileUrls
        });

        // Save the document to the database
        await newGameAccount.save();
        res.status(200).json({ message: "Game account successfully created", userData: newGameAccount });
    } catch (error) {
        console.error("Error in GameAccountInsert:", error);
        res.status(500).json({ error: "An error occurred while creating the game account." });
    }
};
