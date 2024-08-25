import mongoose from 'mongoose';

// Define the schema
const notificationSchema = new mongoose.Schema({
    userid: {
        type: String,
    },
    notificationH: {
        type: String,
    },
    notificationB: {
        type: String,
    },
    date: {
        type: Date
    }
});

// Create the model
const Accountnotification = mongoose.model('Accountnotification', notificationSchema);

// Export the model
export default Accountnotification;