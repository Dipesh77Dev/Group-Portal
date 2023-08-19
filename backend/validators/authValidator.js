const { check, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");


const validateRegisterRequest = [
    check("firstName").notEmpty().withMessage("First Name is required"),
    check("lastName").notEmpty().withMessage("Last Name is required"),
    check("email").notEmpty().withMessage("Email is required...").isEmail().withMessage("You had entered wrong email, please enter a valid email address"),
    check("password").notEmpty().withMessage("Password is required...").isLength({ min: 6 }).withMessage("Password must be at least 6 character long")
];


const validateLoginRequest = [
    check("email").notEmpty().withMessage("Email is required...").isEmail().withMessage("Valid Email required for login, please use the registered email for login..."),
    check("password").notEmpty().withMessage("Password is required...")
        .isLength({ min: 6 })
        .withMessage("Valid Password is required for login, please use the registered password for login..."),
];


const isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: errors.array()[0].msg });
    }
    next();
};


module.exports = {validateRegisterRequest, validateLoginRequest, isRequestValidated};