import mongoose from 'mongoose';

const FieldSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  fields: [
    {
      id: { type: Number, required: true },
      title: { type: String, required: true },
      amount: { type: String, required: true }
    }
  ]
});

const AdditionalFieldSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  documentType: { type: String, required: true }
});

const ServiceSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service_heading: { type: String, required: true },
  service_type: { type: String, required: true },
  service_dec: { type: String, required: true },
  service_Amount: { type: String, required: true },
  service_time_houre: { type: String, required: true },
  service_buy_Amount: { type: String, required: true },
  service_Staus: { type: String, default: 'Pending' },
  additionalFields: [FieldSchema],
  additionalFields1: [AdditionalFieldSchema]
});


const ServiceDB = mongoose.model('ServiceDB', ServiceSchema);

export default ServiceDB;

