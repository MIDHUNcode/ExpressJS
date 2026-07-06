import express from "express";
import routes from "./Routes/router.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import {Strategy as localStrategy} from "passport-local";
import passport from "passport";
import mongoose from "mongoose";
import { User } from "./Mongoose/UsersSchema.mjs";
import { comparePassword } from "./utils/helper.mjs";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";


const app = express();

app.use(express.json());
app.use(cookieParser("hello"));

mongoose.connect("mongodb://localhost/express")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error(`Could not connect to MongoDB ${err}`));

app.use(
    session({
        secret: "kumki",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 * 60 },
    }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy({usernameField: "user_name", passwordField: "password"},async (user_name, password, done) => {
    try{
        const user = await User.findOne({ user_name: user_name });
        if(!user){
        return done(null, false, { message: "Incorrect username" });
        }
        if (!comparePassword(password, user.password)) {
            return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
    } catch (err) {
        console.error(err);
        return done(err, false, { message: "An error occurred during authentication" });
    }
}));

passport.use(new GoogleStrategy({
    clientID: googleClientId,
    clientSecret: Google_Client_Secret,
    callbackURL: "/auth/google/cb"
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
        const user = await User.findOne({ googleId: profile.id }); 
        if (user) {
        return done(null, user);
        }
        const newUser = await User.create({
        googleId: profile.id,
        user_name: profile.displayName,
        email: profile.emails[0].value
        });
        return done(null, newUser);
  }
  catch (err) {
    console.error(err);
    return done(err, false, { message: "An error occurred during Google authentication" });
  }

}))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return done(new Error("User not found"));
        }
        done(null, user);
    } catch (err) {
        console.error(err);
        done(err,false, { message: "An error occurred during deserialization" });
    }
});

app.use(routes);

const PORT = 3000;

app.get("/", (req, res) => {
    res.cookie("user","admin",{maxAge:60000*60,signed:true});
    console.log(req.session.id);
    req.sessionStore.get(req.session.id, (err, session) => {
        if (err) {
            console.error(err);
        } else {
            console.log(session);
        }
    });
    res.send({ message: "root endpoint" });
});

app.get("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: info.message || "Incorrect username or password" });
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({ message: "Login successful", user });
        });
    })(req, res, next);
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/cb", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    res.send({ message: "Google authentication successful", user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}) 

//The OAuth client was not found.