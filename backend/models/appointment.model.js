const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientsSchema = new Schema({
    _id: { type: mongoose.Types.ObjectId, required: true },
    noshow: { type: Boolean, required: true },
    booked: { type: Date, required: true},
})

const appointmentSchema = new Schema({
    doctor: { type: String, required: true },
    specialization: { type: String, required: true },
    date: { type: Date, required: true },
    available: { type: Boolean, required: true },
    patients: [patientsSchema],
}, {
    timestamps: true,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;