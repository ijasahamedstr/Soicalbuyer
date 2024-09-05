import mongoose from 'mongoose';

const ServiceDBSchema = new mongoose.Schema({
  userid: String,
  service_heading: String,
  service_type: String,
  service_dec: String,
  service_Amount: Number,
  service_time_houre: Number,
  service_buy_Amount: Number,
  service_Staus: String,
  additionalFields: [{
    title: String,
    documentType: String
  }],
  additionalFields: [{
    title: String,
    documentType: String
  }]
  
}, { timestamps: true });

// model
const ServiceDB = mongoose.model('ServiceDB', ServiceDBSchema);

export default ServiceDB;
