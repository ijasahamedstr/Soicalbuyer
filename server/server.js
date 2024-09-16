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
import notificationrouter from "./routes/notification.route.js";
import gamerouter from "./routes/gameaccount.route.js";
import servicerouter from "./routes/service.route.js";
import soicalrouter from "./routes/soicalAccount.route.js";
import feedbackrouter from "./routes/feedback.route.js";
import mongoose from 'mongoose';
import axios from 'axios';
import { TwitterApi } from 'twitter-api-v2'; // Ensure this is imported correctly
import bankrouter from "./routes/bank.route.js";



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


// Game Account Post 
app.use('/gameaccount',gamerouter);


// Game Account Post 
app.use('/service',servicerouter);


// Game Account Post 
app.use('/soical',soicalrouter);


// Account Point Transfer
app.use('/point',pointrouter);

// Account Point Transfer
app.use('/feedback',feedbackrouter);


// User Account User boost
app.use('/boost',Accountboostrouter);


// User Account User notification
app.use('/notification',notificationrouter);


// User Account User notification
app.use('/bank',bankrouter);


// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/useruploads', express.static(path.join(__dirname, 'useruploads')));
app.use('/uploads/AccountActive', express.static(path.join(__dirname, 'uploads/AccountActive')));
app.use('/Accountimage', express.static(path.join(__dirname, 'Accountimage')));



// multi image
// get images
// app.use("/uploads",express.static("./useruploads"))

// user routes
app.use("/user/api",userrouter);





/* ************************************************************* */
app.get('/api/users/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const response = await fetch(
      `https://api.instagram.com/v1/users/search?q=${username}&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response from Instagram API:', errorData); // Log detailed error response
      return res.status(response.status).json({ error: errorData.error_message || 'Failed to fetch user data' });
    }

    const data = await response.json();

    // Process and return user data
    const user = data.data && data.data.length > 0 ? data.data[0] : null;
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Server-side error:', error); // Log server-side error
    res.status(500).json({ error: 'Server error' });
  }
});

/* ************************************************************* */


// Start the Express server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});