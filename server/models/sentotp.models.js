import { model, Schema } from "mongoose";
import validator from 'validator';
// Write the schema

const userOtpSchema  = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not Valid Email")
            }
        }
    },
    otp:{
        type:String,
        required:true
    }
});

// create your model
const userotp = model("userotp",userOtpSchema)

export default userotp;