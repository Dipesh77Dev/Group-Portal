const express = require('express');
const router = express.Router();   


const authController = require('../controller/authController');
const { validateRegisterRequest, validateLoginRequest, isRequestValidated } = require('../validators/authValidator');


// router.post("/register", validateRegisterRequest, isRequestValidated, authController.userRegister);
// router.post("/login", validateLoginRequest, isRequestValidated, authController.userLogin);


router.post("/register", validateRegisterRequest, isRequestValidated, authController.register);
router.post("/login", validateLoginRequest, isRequestValidated, authController.login);

module.exports = router;