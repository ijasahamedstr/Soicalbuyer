import mongoose from 'mongoose';

const BankDBSchema = new mongoose.Schema({
    userId: {
        type: String,
    },

    bankAccountName: {
        type: String,
    },

    iban: {
        type: String,
    },

    accountNumber: {
        type: String,
    }
}, { timestamps: true });

// model
const BankDB = mongoose.model('BankDB', BankDBSchema);

export default BankDB;
