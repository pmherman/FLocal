var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
var keys = require("./keys");
var db = require("../models");

passport.serializeUser((user, done) => {
    // Grabbing id from DB's primary key
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done)=>{
        // passport callback function
        // check if user exists
        db.User.findOne({where: {
            googleId: profile.id
        }
    }).then(function(currentUser) {
        if(currentUser){
            // already have a user
            console.log("Current user is: " + currentUser);
            done(null, currentUser);
        } else {
            // if not, create user
            db.User.create({
                googleId: profile.id,
                username: profile.displayName,
                thumbnail: profile._json.image.url,
                adminAccess: false
            }).then(function(newUser) {
                console.log("User created: " + newUser);
                done(null, newUser.dataValues);
            });
        }
        });
    })
)