const express = require('express')
const router = express.Router()
const employeeController = require('../controllers/Employee')
const validate = require('../middleware/validate')
const { isAuthenticated } = require("../middleware/authenticate")

router.get('/', employeeController.getAllEmployees)
router.get('/:id', employeeController.getSingleEmployee)
router.post('/add', validate.storeEmployee, isAuthenticated, employeeController.addEmployee)
router.put('/edit/:id', validate.storeEmployee, isAuthenticated, employeeController.updateEmployee)
router.delete('/delete/:id', isAuthenticated, employeeController.deleteEmployee)

module.exports = router
