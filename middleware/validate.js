const validator = require("../helpers/validate")

const storeEmployee = (req, res, next) => {
    const rule = {
        firstName: "required|string",
        lastName: "required|string",
        email: "required|email",
        phoneNumber: "required|integer",
        position: "required|string",
        department: "required|string",
        hireDate: "required|date",
    }
    validator(req.body, rule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                succuss: false,
                message: "Failed Validation",
                data: err,
            })
        } else {
            next()
        }
    })
}

module.exports = storeEmployee
