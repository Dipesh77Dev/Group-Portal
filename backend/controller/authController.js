// const authService = require('../services/authService');

// module.exports = {
//     userLogin: async (req, res) => {
//         try {
//             const result = await authService.login()
//             return res.send({
//                 status: 200,
//                 data: result,
//                 message: "User Login Done"
//             })
//         }
//         catch (err) {
//             res.send(err);
//         }
//     },


//     userRegister: async (req, res) => {
//         try {
//             const result = await authService.register()
//             return res.status(200).json({
//                 status: 200,
//                 data: result,
//                 message: "User Registeration Done"
//             })
//         }
//         catch (err) {
//             res.send(err);
//             // console.log(err);
//         }
//     }
// }



const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const AuthModel = require("../models/authModel");

module.exports = {
    register: async (req, res) => {
        const { firstName, lastName, email, password, role } = req.body;
        // const newUserModel = new AuthModel(req.body);

        if (!firstName || !lastName || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please Provide Required Information",
            });
        }


        // password - 

        // const hashPassword = await bcrypt.hash(password, 10);
        const hashPassword = bcrypt.hashSync(req.body.password, 10);

        const userData = { firstName: firstName, lastName, email, hashPassword, role };

        try {
            const registerData = await AuthModel.create(userData);
            console.log(registerData);
            res.send(registerData);
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

            // AuthModel.findOne({
            //     email: req.body.email
            // }, function (err, user) {
            //     if (err) throw err;
            //     if (!user || !user.comparePassword(req.body.password)) {
            //         return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
            //     }
            //     return res.json({ token: jwt.sign({ email: user.email,  _id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" }) });
            // });

            // const user = await AuthModel.findOne({ email: req.body.email, password: req.body.password});
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