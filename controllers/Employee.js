const Employee = require('../models/Employee')

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
        res.status(200).json(employees)
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

const getSingleEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
        if (!employee) {
            return res.status(404).json({
                error: 'Employee not found'
            })
        }
        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

const addEmployee = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, position, department, hireDate } = req.body;
    try {
        const data = new Employee({
            firstName,
            lastName,
            email,
            phoneNumber,
            position,
            department,
            hireDate
        })

        await data.save()
        res.status(201).json({
            message: 'Employee created successfully'
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const updateEmployee = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, position, department, hireDate } = req.body;
    try {
        const data = await Employee.findByIdAndUpdate(req.params.id, {
            firstName,
            lastName,
            email,
            phoneNumber,
            position,
            department,
            hireDate
        }, {
            new: true
        })

        if (!data) return res.status(400).json({ error: 'Employee not found' })

        res.status(200).json({
            message: 'Employee updated successfully', employee: data
        })
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const data = await Employee.findByIdAndDelete(req.params.id)

        if (!data) return res.status(404).json({ error: 'Employee not found' })
        res.status(200).json({ message: 'Employee deleted successfully', employee: data })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
module.exports = {
    getAllEmployees,
    getSingleEmployee,
    addEmployee,
    updateEmployee,
    deleteEmployee
};
