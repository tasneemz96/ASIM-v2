const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');

const mongoose = require('mongoose');

var passport = require('passport');
require('./passport/setup');
const auth = require('./routes/auth');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// body parser
app.use(express.json());
// dont allow nested payloads 
app.use(express.urlencoded({ extended: false }));

// for connection to Mongo DB Atlas
// URI found in .env file
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// express session
app.use(
    session({
        secret: "this is a secret",
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth);

app.get('/', (req, res) => {
    res.send("Welcome to ASIM");
});

// for referring to Mongo DB designed schema
// schema files found in ./models 
// route files found in ./routes
const appointmentsRouter = require('./routes/appointments');
const patientsRouter = require('./routes/patients');

// routers added as middleware
app.use('/appointments', appointmentsRouter);
app.use('/patients', patientsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});