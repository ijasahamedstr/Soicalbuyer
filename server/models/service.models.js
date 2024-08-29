import mongoose from 'mongoose';

const ServiceDBSchema = new mongoose.Schema({
    userid: {
        type: String,
    },

    service_heading: {
        type: String,
    },

    service_type: {
        type: String,
    },

    service_dec: {
        type: String,
    },

    service_Amount: {
        type: Number,
    },
    
    service_time_houre: {
        type: Number,
    },
    service_buy_Amount: {
        type: Number,
    },

    service_Staus: {
        type: String,
    }
}, { timestamps: true });

// model
const ServiceDB = mongoose.model('ServiceDB', ServiceDBSchema);

export default ServiceDB;
