const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    dob: { type: Date, required: true },
    sex: { type: String, required: true, },
    phone: { type: Number, required: true, },
    nationality: { type: String, required: true, },
    insurance: { type: Boolean, required: true, },
    handicap: { type: Boolean, required: true },
    diabetes: { type: Boolean, required: true },
    hypertension: { type: Boolean, required: true },
    alcoholism: { type: Boolean, required: true }
}, {
    timestamps: true,
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
