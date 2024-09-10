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





















/******************************************************************** */


// Retrieve environment variables
// Replace with your Instagram Access Token
const ACCESS_TOKEN = 'YOUR_INSTAGRAM_ACCESS_TOKEN';

app.get('/api/instagram-info/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Instagram API URL to get user profile info
    const response = await axios.get(`https://graph.instagram.com/${username}?fields=id,username,media_count,account_type,full_name,biography,profile_picture_url&access_token=${ACCESS_TOKEN}`);
    
    // Return user profile data
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Instagram data:', error.message);
    res.status(500).json({ error: 'Failed to fetch Instagram information' });
  }
});


/******************************************************************** */

// Retrieve environment variables
const TIKTOK_API_KEY = process.env.TIKTOK_API_KEY;

// Ensure environment variables are set
if (!TIKTOK_API_KEY) {
  console.error('Missing TikTok API key. Please check your .env file.');
  process.exit(1);
}

app.use(express.json());

// Endpoint to resolve TikTok username to user ID
app.get('/api/resolve-username/:username', async (req, res) => {
  const { username } = req.params;
  try {
    // Placeholder: Replace with actual API call or logic to get user ID from username
    // Example:
    const response = await axios.get(`https://api.tiktok.com/username_to_id?username=${username}`, {
      headers: {
        'Authorization': `Bearer ${TIKTOK_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    const userId = response.data.userId;

    if (!userId) {
      return res.status(404).json({ error: 'User ID not found' });
    }

    res.json({ userId });
  } catch (error) {
    console.error('Error resolving username:', error.message);
    res.status(500).json({ error: 'Failed to resolve username' });
  }
});

// Endpoint to fetch TikTok user information by user ID
app.get('/api/tiktok-info/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await axios.get(`https://api.tiktok.com/user_info?user_id=${userId}`, {
      headers: {
        'Authorization': `Bearer ${TIKTOK_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      res.json(response.data);
    } else {
      console.error('Unexpected response status:', response.status);
      res.status(response.status).json({ error: 'Failed to fetch TikTok information' });
    }
  } catch (error) {
    console.error('Error fetching TikTok information:', error.message);
    res.status(500).json({ error: 'Failed to fetch TikTok information' });
  }
});






const {
  TWITTER_API_KEY,
  TWITTER_API_SECRET_KEY,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET
} = process.env;

if (!TWITTER_API_KEY || !TWITTER_API_SECRET_KEY || !TWITTER_ACCESS_TOKEN || !TWITTER_ACCESS_TOKEN_SECRET) {
  console.error('Missing Twitter API credentials. Please check your .env file.');
  process.exit(1);
}

const twitterClient = new TwitterApi({
  appKey: TWITTER_API_KEY,
  appSecret: TWITTER_API_SECRET_KEY,
  accessToken: TWITTER_ACCESS_TOKEN,
  accessSecret: TWITTER_ACCESS_TOKEN_SECRET,
});

app.use(express.json());

let userCache = {};
let cacheTimestamp = Date.now();

const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

app.get('/api/twitter-info/:username', async (req, res) => {
  const { username } = req.params;

  if (userCache[username] && (Date.now() - cacheTimestamp < CACHE_DURATION_MS)) {
    return res.json(userCache[username]);
  }

  try {
    const user = await twitterClient.v2.userByUsername(username);

    if (!user.data) {
      return res.status(404).json({ error: 'User not found' });
    }

    userCache[username] = {
      username: user.data.username,
      name: user.data.name,
      description: user.data.description,
      public_metrics: user.data.public_metrics
    };

    cacheTimestamp = Date.now(); // Update cache timestamp

    res.json(userCache[username]);
  } catch (error) {
    if (error.code === 429) { // Rate limit error
      console.error('Rate limit exceeded, try again later.');
      res.status(429).json({ error: 'Rate limit exceeded, try again later.' });
    } else {
      console.error('Error fetching Twitter user information:', error.message);
      res.status(500).json({ error: 'Failed to fetch Twitter user information' });
    }
  }
});

















//****************************************************************** */

const formDataSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});

const FormData = mongoose.model('FormData', formDataSchema);

app.post('/api/formData', async (req, res) => {
  const data = req.body;
  try {
    const formData = await FormData.findOneAndUpdate({}, data, { upsert: true, new: true });
    res.json(formData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/formData', async (req, res) => {
  try {
    const formData = await FormData.findOne();
    res.json(formData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/******************************************************************* */









// Start the Express server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});