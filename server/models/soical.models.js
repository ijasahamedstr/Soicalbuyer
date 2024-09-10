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
    Promotional_Title: {
        type: String,
    },
    discount: {
        type: Number,
    },
    social_amount: {
        type: Number,
    },
    social_code: {
        type: String,
    },
    sstatus: {
        type: String,
    },
    accountpassword: {
        type: String,
    },
    accountgmail: {
        type: String,
    },
    accountgmailpassword: {
        type: String,
    },
    accountdec: {
        type: String,
    },
    imgpath: {
        type: String,
    },
    displayName:String,
}, { timestamps: true });

// Model
const SocialDB = mongoose.model('SocialDB', SocialDBSchema);

export default SocialDB;
