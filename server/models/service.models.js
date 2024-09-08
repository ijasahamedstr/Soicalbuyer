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
    type: Number, // Changed from String to Number

  },
  service_time_houre: {
    type: Number,

  },
  service_buy_Amount: {
    type: Number, // Changed from String to Number

  },
  service_Staus: {
    type: String,
    default: 'Pending'
  },
  additionalFields: [{
    title1: String, // Ensure this field is intentional
    title: String,
    amount: Number // Changed from String to Number
  }],
  additionalFields1: [{
    title: String,
    documentType: String
  }]
}, { timestamps: true });

// model
const ServiceDB = mongoose.model('ServiceDB', ServiceDBSchema);

export default ServiceDB;
