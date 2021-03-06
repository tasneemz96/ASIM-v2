const express = require('express');
const router = express.Router();
const passport = require('passport');

// localhost:port/auth/login
router.route('/login').post((req, res, next) => {
    passport.authenticate("local", { failureRedirect: '/login' }, (err, user, info) => {
        if (err) {
            return res.status(400).json({ errors: err });
        }
        if (!user) {
            console.log("Invalid credentials!");
            return res.status(400).json({ errors: "No user found" });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            console.log("Logged in!");
            return res.status(200).json({ success: 'logged in' + user.id });
        });
    })(req, res, next);
});

module.exports = router;