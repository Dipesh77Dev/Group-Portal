const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const AuthModel = require("../models/authModel");


module.exports = {
    register: async (req, res) => {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please Provide Required Information",
            });
        }


        // password - 
        const hashPassword = await bcrypt.hash(password, 10);

        const userData = { firstName: firstName, lastName, email, hashPassword };

        try {
            const registerData = await AuthModel.create(userData);
            console.log(registerData);
            return registerData;
        }
        catch (err) {
            console.log(err);
        }
        // With Database -
        // const user = await AuthModel.findOne({ email });

        // // exisitng user
        // if (user) {
        //     return res.status(StatusCodes.BAD_REQUEST).json({
        //         message: "User already registered",
        //     });
        // } else {
        //     AuthModel.create(userData).then((data, err) => {
        //         if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
        //         else {
        //             res.status(StatusCodes.CREATED).json({ message: "User created Successfully", data });
        //         }
        //     });
        // }
    },


    login: async (req, res, next) => {
        try {
            if (!req.body.email || !req.body.password) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Please enter valid email and password to login & access our webpage",
                });
            }

            const user = await AuthModel.findOne({ email: req.body.email });

            if (user) {
                if (user.authenticate(req.body.password)) {
                    const token = jwt.sign(
                        { _id: user._id, role: user.role },
                        process.env.JWT_SECRET, { expiresIn: "30d" });
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    res.status(StatusCodes.OK).json({
                        token,
                        user: { _id, firstName, lastName, email, role, fullName },
                    });
                } else {
                    res.status(StatusCodes.UNAUTHORIZED).json({
                        message: "Something went wrong!",
                    });
                }
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: "User does not exist..!",
                });
            }
        }
        catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ error });
        }
    },
};