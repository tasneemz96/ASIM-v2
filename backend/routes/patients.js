const router = require('express').Router();
const bcrypt = require('bcryptjs');
// load user schema 
let Patient = require('../models/patient.model');

// GET localhost:port/patients/
// retrieve all patients 
router.route('/').get((req, res) => {
    Patient.find()
        .then(patients => res.json(patients))
        .catch(err => res.status(400).json('Error: ' + err));

})

// register new user
// POST localhost:port/patients/register
router.route('/register').post((req, res) => {

    Patient.findOne({ email: req.body.email })
        .then((patient) => {
            if (!patient) {
                const email = req.body.email;
                const password = req.body.password;
                const name = req.body.name;
                const dob = Date.parse(req.body.dob);
                const sex = req.body.sex;
                const phone = Number(req.body.phone);
                const nationality = req.body.nationality;
                const insurance = Boolean(req.body.insurance);
                const handicap = Boolean(req.body.handicap);
                const diabetes = Boolean(req.body.diabetes);
                const hypertension = Boolean(req.body.hypertension);
                const alcoholism = Boolean(req.body.alcoholism);


                // create new document following exercises schema 
                const newPatient = new Patient({
                    name,
                    email,
                    password,
                    dob,
                    sex,
                    phone,
                    nationality,
                    insurance,
                    handicap,
                    diabetes,
                    hypertension,
                    alcoholism
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPatient.password, salt, (err, hash) => {
                        if (err) throw err;
                        newPatient.password = hash;
                        newPatient.save()
                            .then(() => res.json('Patient added!'))
                            .catch(err => res.status(400).json('Error: ' + err));
                    })
                })

                // add to collection 

            }
            else {
                res.json("Patient exists!");         
            }
        })

});

// get patient by ID 
// GET localhost:port/patient/:id
router.route('/:id').get((req, res) => {
    // get user by ID in JSON
    Patient.findById(req.params.id)
        .then(patient => res.json(patient))
        .catch(err => res.status(400).json('Error: ' + err));
});

// update patient by ID
// PUT localhost:port/patient/:id
router.route('/:id').put((req, res) => {
    // find user by ID, then update the returned users information and save it back
    Patient.findById(req.params.id)
        .then(patient => {
            patient.name = req.body.name;
            patient.email = req.body.email;
            patient.password = req.body.password;
            patient.dob = Date.parse(req.body.dob);
            patient.sex = req.body.sex;
            patient.phone = Number(req.body.phone);
            patient.nationality = req.body.nationality;
            patient.insurance = Boolean(req.body.insurance);
            patient.handicap = Boolean(req.body.handicap);
            patient.diabetes = Boolean(req.body.diabetes);
            patient.hypertension = Boolean(req.body.hypertension);
            patient.alcoholism = Boolean(req.body.alcoholism);

            patient.save()
                .then(() => res.json('Patient updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;
