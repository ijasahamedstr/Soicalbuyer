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
import servicerequestrouter from "./routes/servicerequest.routes.js";



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


// User Account User notification
app.use('/servicerequest',servicerequestrouter);


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
const INSTAGRAM_API_URL = 'https://graph.instagram.com';
const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN; // Ensure this is defined in your .env file

app.use(cors());

// Endpoint to fetch Instagram bio based on user ID
app.get('/api/instagram/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const response = await axios.get(`https://graph.instagram.com/ijas75408?fields=id,username&access_token=${ACCESS_TOKEN}`);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching Instagram bio:', error);
    
    // Handle different types of errors
    if (error.response) {
      if (error.response.status === 401) {
        return res.status(401).json({ error: 'Unauthorized access' });
      } else if (error.response.status === 404) {
        return res.status(404).json({ error: 'User not found' });
      }
    }
    res.status(500).json({ url:error });

  }
});

/* ************************************************************* */

/*************************************************************** */
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

let cacheTimestamp = Date.now();

const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

app.get('/api/twitter-info/:username', async (req, res) => {
  const { username } = req.params; 
  if (userCache[username] && (Date.now() - cacheTimestamp < CACHE_DURATION_MS)) {
    return res.json(userCache[username]);
  }

  try {
    const user = await twitterClient.v2.userByUsername(username, {
      'user.fields': 'description', // Specify that we want the description field
    });

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
/********************************************************************************* */

/********************************************************************************* */

// Simple in-memory cache
const userCache = new Map();
const infoCache = new Map();

// Middleware
app.use(express.json());

// Resolve username to user ID
app.get('/api/resolve-username/:username', async (req, res) => {
  const { username } = req.params;
  
  if (userCache.has(username)) {
    return res.json({ userId: userCache.get(username) });
  }
  
  try {
    // Replace with actual API or service to resolve username to user ID
    const response = await axios.get(`https://some-tiktok-api.com/resolve-username/v2/user/info/${username}`);
    const userId = response.data.userId;
    
    // Cache the user ID
    userCache.set(username, userId);
    
    res.json({ userId });
  } catch (error) {
    console.error('Error resolving username:', error.message);
    res.status(500).json({ error: 'Failed to resolve username' });
  }
});

// Fetch TikTok user info by user ID
app.get('/api/tiktok-info/:userId', async (req, res) => {
  const { userId } = req.params;

  if (infoCache.has(userId)) {
    return res.json(infoCache.get(userId));
  }
  
  try {
    // Replace with actual API call to fetch user info
    const response = await axios.get(`https://developers.tiktok.com/doc/tiktok-api-v2-get-user-info/${userId}`);
    const userInfo = response.data;
    
    // Cache the user info
    infoCache.set(userId, userInfo);
    
    res.json(userInfo);
  } catch (error) {
    console.error('Error fetching user info:', error.message);
    res.status(500).json({ error: 'Failed to fetch TikTok information' });
  }
});

/************************************************************************************ */

// Start the Express server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});