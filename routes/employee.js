const express = require('express')
const router = express.Router()
const employeeController = require('../controllers/Employee')

router.get('/', employeeController.getAllEmployees)
router.get('/:id', employeeController.getSingleEmployee)
router.post('/add', employeeController.addEmployee)
router.put('/edit/:id', employeeController.updateEmployee)
router.delete('/delete/:id', employeeController.deleteEmployee)

module.exports = router
