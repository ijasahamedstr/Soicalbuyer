import { model, Schema } from "mongoose";

// Define the schema
const GmailSchema = new Schema({
    googleId:String,
    displayName:String,
    email:String,
    image:String
},{timestamps:true});


// Create the model
const GmailRegister = model("GmailRegister", GmailSchema);

export default GmailRegister;
