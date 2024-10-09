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
import adminfeedbackrouter from "./routes/adminfeedback.route.js";
import * as cheerio from 'cheerio';
import userOtpRouter from './routes/userOtp.route.js'; // Ensure the path is correct



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


// Account Point Transfer
app.use('/adminfeedback', adminfeedbackrouter);



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
// Middleware to parse JSON requests
app.use(express.json());


async function getUserIdFromUsername(username) {
  try {
    // Fetch the Instagram profile page
    const response = await axios.get(`https://www.instagram.com/${username}/`);
    const html = response.data;

    // Load the HTML using Cheerio
    const $ = cheerio.load(html);

    // Look for script tags that contain the user ID (it's often embedded in one of these)
    const scriptTag = $('script[type="application/ld+json"]').html();

    if (!scriptTag) {
      throw new Error('Unable to locate user information in the HTML');
    }

    // Parse the JSON data from the script tag
    const userData = JSON.parse(scriptTag);

    // Extract the user ID (if it exists in the metadata)
    const userId = userData.mainEntityofPage && userData.mainEntityofPage['@id'];
    if (!userId) {
      throw new Error('Unable to find user ID in the page data');
    }

    return userId.split('/').pop(); // Extract the numeric ID from the URL
  } catch (error) {
    console.error('Error fetching Instagram user ID:', error);
    return null;
  }
}
 // app.get('/api/instagram-info', async (req, res) => {
//   const { username } = req.query;

//   console.log(username);
//   if (!username) {
//     return res.status(400).json({ error: 'Username is required' });
//   }

//   try {
//     const accessToken = 'IGQWRNdnQ5LVZAXTW5CNlp1c3lvRjFOYnhmUVEyZAW1BbHN5TDdCZAEhNM3R1Tm5EdTJFV1dIekpPVHFrYXpKS05Pcm1TTVFpNXBUeW14U1l0VnptOTJlOVFDRFEyVE52QVFLdFE2YmlvSVBDcGFHaUpVdHhtVVpvQjQZD'; // Replace with your actual access token

//     // This endpoint does not support username search directly; you need the user ID instead.
//     // Here, we're going to assume you have the user ID corresponding to the username.
//     // You would generally look up the user ID based on your own logic or stored data.

//     // Replace this with your logic to find user ID based on username
//     // const userId = await getUserIdFromUsername(username); // Placeholder function

//     if (!userId) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const userDetailsResponse = await axios.get(`https://graph.instagram.com/${userId}`, {
//       params: {
//         fields: 'id,username,full_name,biography',
//         access_token: accessToken,
//       },
//     });

//     res.json(userDetailsResponse.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error fetching user details' });
//   }
// });

// Placeholder function for fetching user ID based on username
// async function getUserIdFromUsername(username) {
//   // Implement your logic here to retrieve the user ID for the given username
//   // This might involve a database lookup or a mapping you maintain
//   return null; // Replace with actual user ID if found
// }


app.get('/api/instagram-info', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const accessToken = 'IGQWRNdnQ5LVZAXTW5CNlp1c3lvRjFOYnhmUVEyZAW1BbHN5TDdCZAEhNM3R1Tm5EdTJFV1dIekpPVHFrYXpKS05Pcm1TTVFpNXBUeW14U1l0VnptOTJlOVFDRFEyVE52QVFLdFE2YmlvSVBDcGFHaUpVdHhtVVpvQjQZD'; // Replace with your actual access token

    // First, use Instagram Basic Display API to get the user ID based on the username
    const userIdResponse = await axios.get(`https://graph.instagram.com/v12.0/${username}`, {
      params: {
        access_token: accessToken,
        fields: 'id',  // Get the user ID
      },
    });

    const userId = userIdResponse.data.id;

    // Now that we have the user ID, fetch the user details, including the bio
    const userDetailsResponse = await axios.get(`https://graph.instagram.com/${userId}`, {
      params: {
        fields: 'id,username,account_type,media_count,biography',
        access_token: accessToken,
      },
    });

    res.json(userDetailsResponse.data);
  } catch (error) {
    console.error('Error fetching Instagram user details:', error);
    res.status(500).json({ error: 'Error fetching user details' });
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