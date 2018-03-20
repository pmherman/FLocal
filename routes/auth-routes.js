var router = require("express").Router();
var passport = require("passport");

// Thing to check signin status
router.get("/status", (req, res) => {
    res.json(req.user);
});

// auth login
router.get("/login", (req, res) => {
    res.render("login", {user: req.user});
});

// auth logout
router.get("/logout", (req, res) => {
    //handle with Passport
    req.logout();
    res.redirect("/");
});

// auth with Google
router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
}));

// callback route for Google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.redirect("/profile/");
});

module.exports = router;