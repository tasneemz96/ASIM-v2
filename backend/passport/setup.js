const bcrypt = require('bcryptjs');
const Patient = require('../models/patient.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findByID(id, (err, user) => {
        done(err, user);
    });
});

// Local Strategy

passport.use(new LocalStrategy({
    usernameField: "email"
}, (email, password, done) => {
    Patient.findOne({ email: email })
        .then(user => {
            if (!user) {
                return done(null, false);
            }
            else {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, { messsage: "Incorrect password" });
                    }
                });
            }
        })
        .catch(err => {
            return done(null, false, { message: err });
        });
}));