var router = require("express").Router();

var authCheck = (req, res, next) => {
    if (!req.user) {
        // if user is not logged in
        console.log("redirecting to login page");
        res.redirect("/auth/login");
    } else {
        // if logged in
        console.log("nexting");
        next();
    }
};

router.get("/", authCheck, (req, res) => {
    console.log("redirecting to the profile page");
    res.render("profile", {user: req.user});
});

module.exports = router;