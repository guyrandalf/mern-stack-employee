const mongoose = require('mongoose')
const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String
    },
    position: {
        type: String,
        required: true
    },
    department: {
        type: String
    },
    hireDate: {
        type: Date,
        default: Date.now
    },
})

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee
