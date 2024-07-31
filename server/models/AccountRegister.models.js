import { model, Schema } from "mongoose";
import jwt from "jsonwebtoken";

// Use a correct secret key name
const SECRET_KEY = "abcdefghijklmnop";

// Define the schema
const AccountRegisterSchema = new Schema({
    fname: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    Phone: {
        type: String, // Changed from Number to String for phone number
        required: true,
        unique: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
});

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
