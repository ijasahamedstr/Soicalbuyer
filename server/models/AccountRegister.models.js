import { model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import validator from 'validator';

// Use a correct secret key name
const SECRET_KEY = "abcdefghijklmnop";

// Define the schema
const AccountRegisterSchema = new Schema({
    username: {
        type: String,
  
    },
    email:{
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not Valid Email")
            }
        }
    },
    Phone: {
        type: String, // Changed from Number to String for phone number
    },
    
    otp:{
        type:String,
    },
    bio:{
        type:String,
    },
    Accountstatus:{
        type:String,
    },
    Referrallink:{
        type:String,
    },
    Referral:{
        type:String,
    },
    Referralamount:{
        type:String,
    },
    supportcode:{
        type:String,
    },
    posts:{
        type:String,
    },
    documentationstatus:{
        type:String,
    },
    Accountlevel:{
        type:String,
    },
    currentbalance:{
        type:Number,
    },
    packagetype:{
        type:String,
    },
    packageexpirationdate:{
        type:String,
    },

    imgpath: {
        type: String,
    },
    bmgpath: {
        type: String,
    },
    reason: {
        type: String,
    },
    date: {
        type: Date
    },
    tokens: [
        {
            token: {
                type: String,
            }
        }
    ],
    googleId:String,
    displayName:String,
    image:String,
    avatar: String, // Path to avatar image
    background: String // Path to background image
},{timestamps:true});




// Token generation method
AccountRegisterSchema.methods.generateAuthtoken = async function() {
    try {
        const newToken = jwt.sign({ _id: this._id }, SECRET_KEY, {
            expiresIn: "1d"
        });

        // Add the new token to the tokens array
        this.tokens = this.tokens.concat({ token: newToken });
        await this.save();

        return newToken;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Error generating token"); // Throw an error if token generation fails
    }
};





// Create the model
const AccountRegister = model("AccountRegister", AccountRegisterSchema);

export default AccountRegister;
