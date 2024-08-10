import mongoose from 'mongoose';

// Define the schema
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    imgpath: {
        type: String,
        required: true
    },
    date: {
        type: Date
    }
});

// Create the model
const Users = mongoose.model('Users', userSchema);

// Export the model
export default Users;
