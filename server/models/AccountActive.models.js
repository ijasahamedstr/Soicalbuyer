import { model, Schema } from "mongoose";

// Define the schema
const AccountActiveSchema = new Schema({
    fname:{
        type:String,
    },
    userid:{
        type:String,
    },
    imgpath:{
        type:String,
    },
    date:{
        type:Date
    }
},{timestamps:true});

// Create the model
const AccountActive = model("AccountActive", AccountActiveSchema);

export default AccountActive;
