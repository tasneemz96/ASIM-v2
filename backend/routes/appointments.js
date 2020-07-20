const router = require('express').Router();
// load user schema 
let Appointment = require('../models/appointment.model');

// GET localhost:port/appointments/
// retrieve all appointments 
router.route('/').get((req, res) =>{
    Appointment.find()
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json('Error: ' + err));

});

// get appointment by ID
// GET localhost:port/appointments/:id
router.route('/:id').get((req, res) => {
    // get user by ID in JSON
    Appointment.findById(req.params.id)
        .then(appointment => res.json(appointment))
        .catch(err => res.status(400).json('Error: ' + err));
});

// get appointment by specialization
// GET localhost:port/appointments/specializations/:specialization
router.route('/specializations/:specialization').get((req, res) => {
    // get appointment by specialization in JSON
    Appointment.find({ specialization: req.params.specialization, available: true })
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json('Error: ' + err));
});

// get patient's upcoming appointments 
// GET localhost:port/appointments/patients/:patientId

router.route('/patients/:patientId').get((req, res) => {
    // get patient's appointment by patient ID in JSON
    Appointment.find({ 'patients.patientId': req.params.patiendId })
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json('Error: ' + err));
});

// post a new appointment slot
// POST localhost:port/appointments/
router.route('/').post((req, res) => {
    const doctor = req.body.doctor;
    const specialization = req.body.specialization;
    const date = Date.parse(req.body.date);
    const available = Boolean(req.body.available);
    const patients = []; 


    // create new document following exercises schema 
    const newAppointment = new Appointment({
        doctor,
        specialization,
        date,
        available,
        patients
    });

    // add to collection 
    newAppointment.save()
        .then(() => res.json('Appointment added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// update an appointment
// PUT localhost:port/appointments/:id
router.route('/:id').put((req, res) => {
    // find user by ID, then update the returned users information and save it back
    Appointment.findById(req.params.id)
    .then(appointment => {
        appointment.doctor = req.body.doctor;
        appointment.specialization = req.body.specialization;
        appointment.date = new Date(req.body.date);
        appointment.available = Boolean(req.body.available);
        var patientsList = req.body.patients;
        appointment.patients = patientsList;

        appointment.save()
            .then(() => res.json('Appointment updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

});

// book an appointment for patient 
// PUT localhost:port/appointments/:id
router.route('/book/:id').put((req, res) => {
    // find user by ID, then update the returned users information and save it back
    Appointment.findById(req.params.id)
    .then(appointment => {
        appointment.available = Boolean(false);
        var newPatient = req.body.patient;
        var newPatients = appointment.patients;
        newPatients.push(newPatient);
        appointment.patients = newPatients;

        appointment.save()
            .then(() => res.json('Appointment updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

});

// delete an appointment
// DELETE localhost:port/appointments/:id
router.route('/:id').delete((req, res) => {
    Appointment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Appointment deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));

});

// remove patient booking
// PUT localhost:port/appointments/unbook/:id
router.route('/unbook/:id').put((req, res) => {
    Appointment.findById(req.params.id)
    .then(appointment => {
        appointment.available = Boolean(true);
        var idx = appointment.patients.indexOf(appointment.patients._id==req.body.patientId);
        var newPatients = appointment.patients;
        newPatients.splice(idx);
        appointment.patients = newPatients;

        appointment.save()
            .then(() => res.json('Appointment updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;