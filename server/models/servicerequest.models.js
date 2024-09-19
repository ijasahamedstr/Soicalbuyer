import mongoose from 'mongoose';

// Define the schema
const ServicerequestSchema = new mongoose.Schema({
    documentnumber: {
        type: Number,
        required: true
      },
      additionalFields: {
        type: Map,
        of: String
      },
  documentnumber: Number,
});

// Create the model
const Servicerequest = mongoose.model('Servicerequest', ServicerequestSchema);

// Export the model
export default Servicerequest;
