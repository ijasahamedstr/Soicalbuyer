import mongoose from 'mongoose';

// Define the schema
const AdminfeedbackactiveSchema = new mongoose.Schema({
    userid: {
        type: String,
    },
     heading: {
        type: String,
    },
    feedback: {
        type: String,
    },
});

// Create the model
const Adminfeedbackactive = mongoose.model('Adminfeedbackactive', AdminfeedbackactiveSchema);

// Export the model
export default Adminfeedbackactive;
