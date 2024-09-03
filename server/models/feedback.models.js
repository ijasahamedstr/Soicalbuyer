import mongoose from 'mongoose';

// Define the schema
const feedbackactiveSchema = new mongoose.Schema({
    userid: {
        type: String,
    },
    feedback: {
        type: String,
    },
});

// Create the model
const feedbackactive = mongoose.model('feedbackactive', feedbackactiveSchema);

// Export the model
export default feedbackactive;
