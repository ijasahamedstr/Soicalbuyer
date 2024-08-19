// Import required modules
import express from "express";
import connectDB from "./lib/db.js";
import cors from "cors";
import Accountrouter from "./routes/AccountRegister.route.js"
import otprouter from "./routes/userOtp.route.js";
import loginrouter from "./routes/Login.route.js";
import validuserrouter from "./routes/ValidUser.route.js";
import cookiParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import logoutrouter from "./routes/Logout.route.js";
import path from 'path';
import { fileURLToPath } from 'url';
import AccountActiverouter from "./routes/AccountActive.route.js";
import userrouter from "./routes/userAuthRoutes.js";
import verifyrouter from "./routes/Accountverify.route.js";
import pointrouter from "./routes/Point.Routes.js";
import Accountboostrouter from "./routes/Accountboost.route.js";



// Create an instance of Express
const app = express();

app.use(cookiParser());

// Connect DB

connectDB();

// Define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(cors({
  origin:"http://localhost:3000",
  methods:"GET,POST,PUT,DELETE",
  credentials:true
}));


//Data understanding middleware
app.use(express.json());

//Validate your Data
app.use(express.urlencoded({extended:true}))


//CLIENT -> MIDDLEWARE -> SERVER

// User Account Create
app.use('/register',Accountrouter);

// Login 
app.use('/userotp',otprouter);
app.use('/login',loginrouter);
app.use('/validuser',validuserrouter);
app.use('/logout',logoutrouter);

// User Account verify
app.use('/verify',verifyrouter);

// Account Active 
app.use('/Accountactive',AccountActiverouter);


// Account Point Transfer
app.use('/point',pointrouter);


// User Account User boost
app.use('/boost',Accountboostrouter);


// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/AccountActive', express.static(path.join(__dirname, 'uploads/AccountActive')));
app.use('/Accountimage', express.static(path.join(__dirname, 'Accountimage')));



// multi image
// get images
app.use("/uploads",express.static("./useruploads"))

// user routes
app.use("/user/api",userrouter);



// check the integram

const API_VERSION = 'v15.0'; // or another version number
const USER_ID = 'your_user_id_here'; // replace with actual user ID

// Replace with your external API endpoint
const EXTERNAL_API_ENDPOINT = `https://graph.instagram.com/${API_VERSION}/${USER_ID}`;

app.get('http://localhost:8000/check-account', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const response = await axios.get(EXTERNAL_API_ENDPOINT, {
      params: { username }
    });

    // Adjust according to your external API's response format
    if (response.data.isGenuine) {
      res.json({ result: 'The account is genuine.' });
    } else {
      res.json({ result: 'The account is fake.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while checking the account.' });
  }
});







// Start the Express server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});