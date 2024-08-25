import mongoose from 'mongoose';

const GameDBSchema = new mongoose.Schema({
    userid: {
        type: String,
    },

    gameid: {
        type: String,
    },

    gamename: {
        type: String,
    },

    gametype: {
        type: String,
    },
    
    gamedec: {
        type: String,
    },
    gameAmount: {
        type: Number,
    },

    gamegmail: {
        type: String,
    },

    gamepassword: {
        type: String,
    },

    gametitle: {
        type: String,
    },

    gamevalue: {
        type: String,
    },

    gamepurchasedec: {
        type: String,
    },
    
    userprofile: {
        type: [String], // Assuming you want an array of strings. Adjust type as necessary.

    }
}, { timestamps: true });

// model
const GameDB = mongoose.model('GameDB', GameDBSchema);

export default GameDB;
