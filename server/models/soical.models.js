import mongoose from 'mongoose';

const SocialDBSchema = new mongoose.Schema({
    userid: {
        type: String,
    },
    social_username: {
        type: String,
    },
    social_type: {
        type: String,
    },
    social_dec: {
        type: String,
    },
    social_amount: {
        type: Number,
        min: [0, 'Amount must be positive'], // Ensure the amount is positive
    },
    social_code: {
        type: String,
        min: [0, 'Amount must be positive'], // Ensure the amount is positive
    },
}, { timestamps: true });

// Model
const SocialDB = mongoose.model('SocialDB', SocialDBSchema);

export default SocialDB;
