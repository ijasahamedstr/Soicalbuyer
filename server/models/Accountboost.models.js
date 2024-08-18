import mongoose from 'mongoose';

// Define the schema
const AccountboostSchema = new mongoose.Schema({
    userid: {
        type: String,
    },
    paccount: String,
    pdays: Number,
    pselectedPromotion: String,
    ptotalPrice: Number,

    gaccount: String,
    gdays: Number,
    gtotalPrice: Number,

    uaccount: String,
    udays: Number,
    utotalPrice: Number,

    saccount: String,
    sdays: Number,
    stotalPrice: Number
});

// Create the model
const Accountboost = mongoose.model('Accountboost', AccountboostSchema);

// Export the model
export default Accountboost;
