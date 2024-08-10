import mongoose from 'mongoose';

// Define the schema
const AccountactiveSchema = new mongoose.Schema({
    userid: {
        type: String,
    },
    fname: {
        type: String,
    },
    midname: {
        type: String,
    },
    lname: {
        type: String,
    },
    documentcountry: {
        type: String,
    },
    documenttype: {
        type: String,
    },
    documentnumber: {
        type: String,
    },
    imgpath: {
        type: String,
    },
    date: {
        type: Date
    }
});

// Create the model
const Accountactive = mongoose.model('Accountactive', AccountactiveSchema);

// Export the model
export default Accountactive;
