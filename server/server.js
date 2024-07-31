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
import GmailRegister from "./models/email.models.js";


// Create an instance of Express
const app = express();

app.use(cookiParser());

// Connect DB

connectDB();

// Define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello World!');
});


const clientid = (process.env.clientid);
const clientsecret = (process.env.clientsecret);


app.use(cors({
  origin:"http://localhost:3000",
  methods:"GET,POST,PUT,DELETE",
  credentials:true
}));

app.use(session({
  secret:"YOUR SECRET KEY",
  resave:false,
  saveUninitialized:true
}))


// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new GoogleStrategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            let user = await GmailRegister.findOne({googleId:profile.id});

            if(!user){
                user = new GmailRegister({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });

                await user.save();
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/",
    failureRedirect:"http://localhost:3000/تسجيل الدخول",
}))

app.get("/login/sucess",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:3000");
    })
})


//Data understanding middleware
app.use(express.json());

//Validate your Data
app.use(express.urlencoded({extended:true}))


//CLIENT -> MIDDLEWARE -> SERVER

app.use('/register',Accountrouter);
app.use('/userotp',otprouter);
app.use('/login',loginrouter);
app.use('/validuser',validuserrouter);

// Start the Express server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});