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



// All Account View 
export const GameIndex = async (req, res) => {
    try {
        // Fetch all game registrations from the database
        const gameRegisters = await GameDB.find();

        // Send the data as JSON response
        res.json(gameRegisters);
    } catch (error) {
        // Log the error for debugging purposes
        logger.error('Error fetching game registrations:', { message: error.message, stack: error.stack });

        // Send a 500 status code and error message
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


// single Acccount View 

export const GameSingleDetails = async (req, res) => {
    try {
        const GameRegister = await GameDB.findById(req.params.id);
        if (GameRegister == null) {
            return res.status(404).json({ message: "Cannot Find Acoount" });
        }
        else {
            res.json(GameRegister);

        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



export const GameUpdate  = async (req, res) => {

    const { id } = req.params;
    const { gametitle } = req.body;
    const { gamename } = req.body;
    const { gametype } = req.body;
    const { gamedec } = req.body;
    const { gameAmount } = req.body;
    

    try {
        // Find the user by ID
        const user = await GameDB.findById(id);

        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        // Update user details
        if (gametitle) {
            user.gametitle = gametitle;
        }
        if (gamename) {
            user.gamename = gamename;
        }
        if (gametype) {
            user.gametype = gametype;
        }
        if (gamedec) {
            user.gamedec = gamedec;
        }
        if (gameAmount) {
            user.gameAmount = gameAmount;
        }
        // Save the updated user data
        const updatedUser = await user.save();

        res.status(200).json({ status: 200, updatedUser });
    } catch (error) {
        res.status(401).json({ status: 401, error });
    }
};


// All Acccount Delete

export const GameDelete = async (req, res) => {
    const GameId =  req.params.id;
    
    try {
         await GameDB.deleteOne({_id: GameId})
         res.json({message:"Game Acoount deleted!"});
    } catch (error) {
     res.status(500).json({message:error.message})
    }
 };
 

