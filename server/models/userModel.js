import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    userprofile: {
        type: [String], // Assuming you want an array of strings. Adjust type as necessary.
        required: true
    }
}, { timestamps: true });

// model
const userDB = mongoose.model('users', userSchema);

export default userDB;
